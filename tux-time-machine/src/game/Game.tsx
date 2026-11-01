import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, Eye, Fish, Hand, Map as MapIcon, MessageCircle, Settings as Gear, Sparkles, Terminal, Wrench, Crown } from "lucide-react";
import { ERAS, ITEMS, RECIPES, CHAPTER_SOURCES, type Hotspot } from "./data";
import { Tux, SceneBackdrop, HotspotArt } from "./art";
import { useGameState, blip, speak } from "./store";
import {
  DialoguePanel, TerminalPanel, MapPanel, CodexPanel, ShopPanel, SettingsPanel, ConfirmPanel,
  ContentNotePanel, ReflectionPanel, IntroPanel, ModulePanel, VictoryScreen,
} from "./panels";

type Panel =
  | null
  | { k: "dialogue"; node: string }
  | { k: "terminal" | "map" | "codex" | "shop" | "settings" | "confirm" | "reflection" | "intro" | "module" | "victory" };

type Verb = "look" | "talk" | "use" | "take";
const VERBS: { v: Verb; label: string; Icon: typeof Eye; pos: [number, number] }[] = [
  { v: "look", label: "Look", Icon: Eye, pos: [0, -1] },
  { v: "talk", label: "Talk", Icon: MessageCircle, pos: [1, 0] },
  { v: "use", label: "Use", Icon: Wrench, pos: [0, 1] },
  { v: "take", label: "Take", Icon: Hand, pos: [-1, 0] },
];

export default function Game() {
  const { state, update, reset } = useGameState();
  const era = ERAS[state.chapter];
  const [panel, setPanel] = useState<Panel>(state.introSeen ? null : { k: "intro" });
  const [menu, setMenu] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const [caption, setCaption] = useState(era.intro);
  const [tux, setTux] = useState({ x: 22, facing: 1, walking: false });
  const [scale, setScale] = useState(1);
  const sceneRef = useRef<HTMLDivElement>(null);
  const walkTimer = useRef<number | undefined>(undefined);
  const s = state.settings;

  const say = useCallback((t: string) => {
    setCaption(t);
    speak(s.narration, t);
  }, [s.narration]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.max(0.5, Math.min(1.25, el.clientWidth / 1100))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // reset local scene state on era change
  useEffect(() => {
    setCaption(ERAS[state.chapter].intro);
    setTux({ x: 22, facing: 1, walking: false });
    setMenu(null);
    setSelected(null);
  }, [state.chapter]);

  const needsNote = !!era.contentNote && !state.notesAck.includes(era.id) && !(panel && "k" in panel && panel.k === "map");
  const puzzleDone = state.puzzles.includes(era.id);

  const walkTo = (x: number, after?: () => void) => {
    const nx = Math.max(6, Math.min(94, x));
    const dist = Math.abs(nx - tux.x);
    const ms = s.reducedMotion ? 0 : Math.min(900, dist * 18);
    setTux((t) => ({ x: nx, facing: nx < t.x ? -1 : 1, walking: ms > 0 }));
    window.clearTimeout(walkTimer.current);
    walkTimer.current = window.setTimeout(() => {
      setTux((t) => ({ ...t, walking: false }));
      after?.();
    }, ms);
  };

  const close = useCallback(() => {
    if (menu) return setMenu(null);
    if (panel && "k" in panel && panel.k === "intro") update((st) => ({ ...st, introSeen: true }));
    setPanel(null);
  }, [menu, panel, update]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") { close(); return; }
      if (panel) return;
      if (e.key === "h" || e.key === "H") { setHighlight((v) => !v); return; }
      if (e.key === "m" || e.key === "M") { setPanel({ k: "map" }); return; }
      if (e.key === "i" || e.key === "I") { document.querySelector<HTMLElement>("[data-inv-first]")?.focus(); return; }
      if (menu && ["1", "2", "3", "4"].includes(e.key)) {
        const h = era.hotspots.find((x) => x.id === menu);
        if (h) act(h, VERBS[Number(e.key) - 1].v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const earnModuleIfReady = (eraId: string) => {
    update((st) => {
      if (st.modules.includes(eraId) || !st.puzzles.includes(eraId) || !st.patches.includes(eraId)) return st;
      const idx = ERAS.findIndex((e) => e.id === eraId);
      return { ...st, modules: [...st.modules, eraId], fish: st.fish + 3, unlocked: Math.max(st.unlocked, Math.min(ERAS.length - 1, idx + 1)) };
    });
  };

  // watch for both conditions to award module
  useEffect(() => {
    if (state.puzzles.includes(era.id) && state.patches.includes(era.id) && !state.modules.includes(era.id)) {
      earnModuleIfReady(era.id);
      blip(s.sound, "win");
      setPanel({ k: "module" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.puzzles, state.patches, era.id]);

  const act = (h: Hotspot, v: Verb) => {
    setMenu(null);
    blip(s.sound, "tap");
    if (v === "look") {
      say(h.look);
      if (h.reflection) setPanel({ k: "reflection" });
      return;
    }
    if (v === "talk") {
      if (h.art === "terminal") return setPanel({ k: "terminal" });
      if (h.reflection) return setPanel({ k: "reflection" });
      if (h.talk) { speak(s.narration, era.dialogue[h.talk].text); return setPanel({ k: "dialogue", node: h.talk }); }
      return say(`Tux makes polite conversation with the ${h.name.toLowerCase()}. It does not reply. Rude, but historically accurate.`);
    }
    if (v === "take") {
      if (!h.take) return say(h.art === "person" ? "Tux does not take people. That is the opposite of the whole point." : `Tux considers taking the ${h.name.toLowerCase()}. Observer mode says no.`);
      const key = `${era.id}:${h.id}`;
      if (state.taken.includes(key)) return say("Tux already took what he needed here.");
      if (h.take === "modules" && state.modules.length < 8) return say("The rack is still missing modules. Finish the earlier eras first.");
      update((st) => ({ ...st, taken: [...st.taken, key], inventory: [...st.inventory, h.take!] }));
      blip(s.sound, "pick");
      return say(h.takeText || `Tux takes the ${ITEMS[h.take].name}.`);
    }
    // use
    if (selected) {
      if (h.id === era.puzzle.target && selected === era.puzzle.item && !puzzleDone) {
        update((st) => ({
          ...st,
          inventory: st.inventory.filter((i) => i !== selected),
          puzzles: [...st.puzzles, era.id],
          sources: Array.from(new Set([...st.sources, ...CHAPTER_SOURCES[era.id]])),
          fish: st.fish + 1,
        }));
        setSelected(null);
        blip(s.sound, "ok");
        return say(`${era.puzzle.success} +1 fish. Source added to the Codex. Now run the patch quiz at the terminal.`);
      }
      if (h.art === "terminal") return setPanel({ k: "terminal" });
      blip(s.sound, "bad");
      return say(h.id === era.puzzle.target ? era.puzzle.wrong : `Using the ${ITEMS[selected].name} on the ${h.name.toLowerCase()} does nothing. No harm done.`);
    }
    if (h.art === "terminal") return setPanel({ k: "terminal" });
    if (h.id === era.puzzle.target && puzzleDone) return say("Already repaired. It looks great.");
    say("Select an item in the inventory first, then choose Use.");
  };

  const clickHotspot = (h: Hotspot) => {
    walkTo(h.x + (h.x > tux.x ? -6 : 6), () => setMenu(h.id));
  };

  const clickItem = (id: string) => {
    if (!selected) { setSelected(id); return say(`${ITEMS[id].name}: ${ITEMS[id].desc} Now pick another item to combine, or Use it on something.`); }
    if (selected === id) { setSelected(null); return; }
    const r = RECIPES.find((x) => (x.a === selected && x.b === id) || (x.b === selected && x.a === id));
    if (r) {
      update((st) => {
        const inv = [...st.inventory];
        [selected, id].forEach((rm) => inv.splice(inv.indexOf(rm), 1));
        return { ...st, inventory: [...inv, r.out] };
      });
      setSelected(r.out);
      blip(s.sound, "ok");
      return say(`${r.text} Got: ${ITEMS[r.out].name}.`);
    }
    blip(s.sound, "bad");
    setSelected(id);
    say(`${ITEMS[selected].name} and ${ITEMS[id].name} do not combine. Selected ${ITEMS[id].name} instead.`);
  };

  const goEra = (i: number) => {
    update((st) => ({ ...st, chapter: i }));
    setPanel(null);
  };

  const menuHot = menu ? era.hotspots.find((h) => h.id === menu) : null;
  const moduleCount = state.modules.length;

  return (
    <div className="min-h-[100dvh] w-full bg-[#e9dcc0] text-[#1d2340]">
      {/* top chrome */}
      <header className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-3 pt-3">
        <div className="pix-panel flex items-center gap-2 px-3 py-1.5">
          <Tux hat={state.hat} size={28} />
          <div className="leading-none">
            <h1 className="font-pixel text-lg">Tux's Time Machine!</h1>
            <p className="text-[11px] uppercase tracking-wider text-[#5a4a3a]">Observer mode | Era {era.num}/9</p>
          </div>
        </div>
        <div className="pix-panel flex items-center gap-1.5 px-2 py-1.5" aria-label={`Modules ${moduleCount} of 9`} data-testid="status-modules">
          {ERAS.map((e) => (
            <span key={e.id} title={e.module} className={`h-4 w-3 border border-[#1d2340] ${state.modules.includes(e.id) ? "bg-[#f2c14e]" : e.id === era.id ? "bg-[#9fe8a8]" : "bg-[#d6c8a8]"}`} />
          ))}
        </div>
        <div className="pix-panel flex items-center gap-1 px-2 py-1.5 font-pixel" data-testid="text-fish"><Fish size={16} /> {state.fish}</div>
        <nav className="ml-auto flex flex-wrap gap-1.5" aria-label="Game menu">
          {[
            { k: "map", label: "Map", Icon: MapIcon, c: "#9fe8a8" },
            { k: "codex", label: "Codex", Icon: BookOpen, c: "#f2c14e" },
            { k: "terminal", label: "Terminal", Icon: Terminal, c: "#8fb4e8" },
            { k: "shop", label: "Hats", Icon: Crown, c: "#f3a98a" },
            { k: "settings", label: "Settings", Icon: Gear, c: "#e9dcc0" },
          ].map(({ k, label, Icon, c }) => (
            <button key={k} data-testid={`button-open-${k}`} onClick={() => setPanel({ k: k as "map" })} className="pix-btn flex items-center gap-1 px-2.5 py-1.5 text-sm" style={{ background: c }}>
              <Icon size={16} /> <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
          <button data-testid="button-highlight" aria-pressed={highlight} onClick={() => setHighlight((v) => !v)} className={`pix-btn flex items-center gap-1 px-2.5 py-1.5 text-sm ${highlight ? "bg-[#f2c14e]" : "bg-[#f3e7cf]"}`}>
            <Sparkles size={16} /> <span className="hidden sm:inline">Hotspots (H)</span>
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-3 pb-4 pt-3">
        {/* era title strip */}
        <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
          <h2 className="font-pixel text-2xl sm:text-3xl" data-testid="text-era-title">{era.title}</h2>
          <span className="text-sm text-[#5a4a3a]">{era.years} | {era.place}</span>
          <span className="ml-auto text-xs text-[#5a4a3a]">Guide: {era.guide.name} ({era.guide.role})</span>
        </div>

        {/* scene */}
        <div
          key={era.id}
          ref={sceneRef}
          className="anim-iris relative aspect-[4/3] w-full select-none overflow-hidden rounded-md border-[3px] border-[#1d2340] shadow-[6px_6px_0_#1d2340] sm:aspect-[16/9]"
          data-testid="scene"
        >
          <SceneBackdrop era={era} />
          {/* walkable ground */}
          <div
            className="absolute inset-x-0 bottom-0 top-[62%] cursor-pointer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setMenu(null);
              walkTo(((e.clientX - r.left) / r.width) * 100);
            }}
            aria-hidden
          />
          {era.hotspots.map((h) => {
            const solved = h.id === era.puzzle.target && puzzleDone;
            return (
              <button
                key={h.id}
                data-testid={`hotspot-${h.id}`}
                onClick={() => clickHotspot(h)}
                aria-label={`${h.name}. Press Enter for Look, Talk, Use, Take.`}
                className="group absolute flex flex-col items-center focus:outline-none"
                style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `translate(-50%, -100%) scale(${scale})`, transformOrigin: "50% 100%", zIndex: Math.round(h.y) }}
              >
                <span className={`relative ${highlight ? "ring-pulse rounded-full" : ""} transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1`}>
                  <HotspotArt h={h} solved={solved} />
                </span>
                <span className={`pointer-events-none mt-1 whitespace-nowrap rounded border-2 border-[#1d2340] bg-[#f3e7cf] px-1.5 py-0.5 font-pixel text-xs ${highlight ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}>
                  {h.name}
                </span>
              </button>
            );
          })}
          {/* Tux */}
          <div
            className="pointer-events-none absolute"
            style={{ left: `${tux.x}%`, top: "92%", transform: `translate(-50%, -100%) scale(${scale})`, transformOrigin: "50% 100%", transition: s.reducedMotion ? "none" : "left .85s cubic-bezier(.4,0,.3,1)", zIndex: 92 }}
            data-testid="sprite-tux"
          >
            <Tux hat={state.hat} facing={tux.facing} walking={tux.walking} size={88} />
          </div>
          {/* radial verb menu */}
          {menuHot && (
            <div className="absolute z-[95]" style={{ left: `${Math.max(12, Math.min(88, menuHot.x))}%`, top: `${Math.max(24, Math.min(72, menuHot.y - 22))}%` }} role="menu" aria-label={`Actions for ${menuHot.name}`}>
              <div className="anim-pop relative h-0 w-0">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-[#1d2340] px-2 py-0.5 font-pixel text-xs text-[#f3e7cf]">{menuHot.name}</div>
                {VERBS.map(({ v, label, Icon, pos }, i) => (
                  <button
                    key={v}
                    role="menuitem"
                    autoFocus={i === 0}
                    data-testid={`verb-${v}`}
                    onClick={() => act(menuHot, v)}
                    className="pix-btn absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-[#f2c14e] text-[11px] leading-none"
                    style={{ left: pos[0] * 62, top: pos[1] * 54 }}
                  >
                    <Icon size={18} />
                    <span className="mt-0.5">{v === "use" && selected ? `Use ${ITEMS[selected].glyph}` : `${i + 1} ${label}`}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* caption */}
          <div className="absolute inset-x-2 top-2 z-[96] sm:inset-x-auto sm:left-3 sm:max-w-[60%]" aria-live="polite">
            <p className="rounded border-2 border-[#1d2340] bg-[#f3e7cf]/95 px-3 py-2 text-sm leading-snug shadow-[3px_3px_0_#1d2340] sm:text-base" data-testid="text-caption">{caption}</p>
          </div>
        </div>

        {/* inventory */}
        <section className="pix-panel mt-4 flex flex-wrap items-center gap-3 p-3" aria-label="Inventory">
          <div className="min-w-[8rem]">
            <p className="font-pixel text-lg leading-none">Inventory</p>
            <p className="text-xs text-[#5a4a3a]">{selected ? `Selected: ${ITEMS[selected].name}` : "Tap an item to select. Tap two to combine."}</p>
          </div>
          <ul className="flex flex-1 flex-wrap gap-2">
            {state.inventory.length === 0 && <li className="rounded border-2 border-dashed border-[#1d2340]/40 px-4 py-3 text-sm text-[#5a4a3a]">Empty flippers. Try Take on things in the scene.</li>}
            {state.inventory.map((id, i) => (
              <li key={id + i}>
                <button
                  data-inv-first={i === 0 ? true : undefined}
                  data-testid={`item-${id}`}
                  aria-pressed={selected === id}
                  onClick={() => clickItem(id)}
                  title={ITEMS[id].desc}
                  className={`pix-btn flex h-16 w-20 flex-col items-center justify-center px-1 ${selected === id ? "bg-[#f2c14e] -translate-y-1" : "bg-[#fbf3e2]"}`}
                >
                  <span className="font-pixel text-lg leading-none text-[#e2603a]">{ITEMS[id].glyph}</span>
                  <span className="mt-1 text-center text-[10px] leading-tight">{ITEMS[id].name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 text-xs">
            <span className={`rounded border-2 border-[#1d2340] px-2 py-1 ${puzzleDone ? "bg-[#9fe8a8]" : "bg-[#e9dcc0]"}`}>Record {puzzleDone ? "repaired" : "corrupt"}</span>
            <span className={`rounded border-2 border-[#1d2340] px-2 py-1 ${state.patches.includes(era.id) ? "bg-[#9fe8a8]" : "bg-[#e9dcc0]"}`}>Patch {state.patches.includes(era.id) ? "applied" : "pending"}</span>
          </div>
        </section>
      </main>

      {/* panels */}
      {needsNote && <ContentNotePanel era={era} onAck={() => update((st) => ({ ...st, notesAck: [...st.notesAck, era.id] }))} onMap={() => setPanel({ k: "map" })} />}
      {!needsNote && panel && "node" in panel && (
        <DialoguePanel
          node={era.dialogue[panel.node]}
          onClose={close}
          onChoose={(n) => {
            if (n) { setPanel({ k: "dialogue", node: n }); speak(s.narration, era.dialogue[n].text); } else setPanel(null);
          }}
        />
      )}
      {panel?.k === "intro" && !needsNote && <IntroPanel era={era} onClose={close} />}
      {panel?.k === "terminal" && !needsNote && (
        <TerminalPanel
          era={era}
          state={state}
          onClose={close}
          onHint={() => update((st) => {
            const lvl = st.hintLevel[era.id] || 0;
            const cost = lvl >= 1 && st.fish > 0 ? 1 : 0;
            speak(s.narration, era.hints[lvl]);
            return { ...st, fish: st.fish - cost, hintLevel: { ...st.hintLevel, [era.id]: Math.min(3, lvl + 1) } };
          })}
          onAnswer={(i) => {
            const ok = i === era.quiz.correct;
            blip(s.sound, ok ? "ok" : "bad");
            update((st) => ({
              ...st,
              quizTries: { ...st.quizTries, [era.id]: (st.quizTries[era.id] || 0) + 1 },
              patches: ok && !st.patches.includes(era.id) ? [...st.patches, era.id] : st.patches,
              fish: ok && !st.patches.includes(era.id) && !(st.quizTries[era.id]) ? st.fish + 1 : st.fish,
            }));
            if (ok && !puzzleDone) say("Patch applied. The record still needs repairing before the module compiles.");
            return ok;
          }}
        />
      )}
      {panel?.k === "map" && <MapPanel state={state} onGo={goEra} onClose={close} />}
      {panel?.k === "codex" && <CodexPanel state={state} onClose={close} />}
      {panel?.k === "shop" && (
        <ShopPanel
          state={state}
          onClose={close}
          onBuy={(id, cost) => { blip(s.sound, "pick"); update((st) => (st.fish >= cost ? { ...st, fish: st.fish - cost, hats: [...st.hats, id], hat: id } : st)); }}
          onWear={(id) => update((st) => ({ ...st, hat: id }))}
        />
      )}
      {panel?.k === "settings" && (
        <SettingsPanel
          settings={s}
          onClose={close}
          onChange={(p) => update((st) => ({ ...st, settings: { ...st.settings, ...p } }))}
          onNewGame={() => setPanel({ k: "confirm" })}
        />
      )}
      {panel?.k === "confirm" && (
        <ConfirmPanel
          onNo={() => setPanel(null)}
          onYes={() => { window.speechSynthesis?.cancel?.(); reset(); setPanel({ k: "intro" }); }}
        />
      )}
      {panel?.k === "reflection" && !needsNote && <ReflectionPanel era={era} onClose={close} narrate={(t) => speak(true, t)} />}
      {panel?.k === "module" && (
        <ModulePanel
          era={era}
          onStay={() => setPanel(null)}
          onNext={() => {
            if (era.num === ERAS.length) { update((st) => ({ ...st, won: true })); setPanel({ k: "victory" }); }
            else goEra(state.chapter + 1);
          }}
        />
      )}
      {panel?.k === "victory" && (
        <VictoryScreen state={state} onCodex={() => setPanel({ k: "codex" })} onMap={() => setPanel({ k: "map" })} onNewGame={() => setPanel({ k: "confirm" })} onClose={() => setPanel(null)} />
      )}
    </div>
  );
}
