import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ExternalLink, Fish, Lock, Check, X, Printer, Volume2 } from "lucide-react";
import { ERAS, HATS, SOURCES, type DialogueNode, type Era } from "./data";
import { Tux } from "./art";
import { speechSupported, type GameState, type Settings } from "./store";

export function Modal({ title, onClose, children, wide, tone = "parchment", label }: { title: string; onClose?: () => void; children: ReactNode; wide?: boolean; tone?: "parchment" | "terminal" | "quiet"; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const el = ref.current?.querySelector<HTMLElement>("[data-autofocus], button, a, input, select");
    el?.focus();
    return () => prev?.focus?.();
  }, []);
  const toneCls = tone === "terminal" ? "terminal border-[3px] border-[#9fe8a8]/40 rounded-md shadow-[6px_6px_0_#0d1220]" : tone === "quiet" ? "bg-[#ece6dc] border-2 border-[#6a6458] rounded-md" : "pix-panel";
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1d2340]/55 p-3" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={label || title} className={`${toneCls} anim-rise w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[88dvh] overflow-y-auto p-5`}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className={`font-pixel text-xl leading-tight ${tone === "terminal" ? "text-[#f2c14e]" : "text-[#1d2340]"}`}>{title}</h2>
          {onClose && (
            <button data-testid="button-close-modal" onClick={onClose} aria-label="Close (Escape)" className={`rounded p-1 ${tone === "terminal" ? "text-[#9fe8a8] hover:bg-white/10" : "hover:bg-black/5"}`}>
              <X size={20} />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

const KIND_LABEL = { invented: "Invented dialogue", quote: "Authentic quotation", summary: "Historical summary" } as const;
const KIND_CLS = { invented: "bg-[#e9dcc0] text-[#5a4a3a]", quote: "bg-[#2f7d78] text-[#f3e7cf]", summary: "bg-[#2f5aa8] text-[#f3e7cf]" } as const;

export function DialoguePanel({ node, onChoose, onClose }: { node: DialogueNode; onChoose: (next: string | null) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-5" role="dialog" aria-label={`Conversation with ${node.speaker}`}>
      <div className="pix-panel anim-rise mx-auto max-w-3xl p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="font-pixel text-lg text-[#e2603a]" data-testid="text-speaker">{node.speaker}</span>
          <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${KIND_CLS[node.kind]}`}>{KIND_LABEL[node.kind]}</span>
          <button onClick={onClose} aria-label="Close conversation" className="ml-auto rounded p-1 hover:bg-black/5" data-testid="button-close-dialogue"><X size={18} /></button>
        </div>
        <p className={`text-lg leading-snug ${node.kind === "quote" ? "font-serif italic border-l-4 border-[#2f7d78] pl-3" : ""}`} data-testid="text-dialogue">
          {node.kind === "quote" ? `"${node.text}"` : node.text}
        </p>
        {node.cite && <p className="mt-1 text-sm text-[#5a4a3a]">Source: {node.cite}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {node.choices.map((c, i) => (
            <button key={i} data-autofocus={i === 0 ? true : undefined} autoFocus={i === 0} data-testid={`button-choice-${i}`} onClick={() => onChoose(c.next)} className="pix-btn bg-[#f2c14e] px-3 py-1.5 text-left">
              {i + 1}. {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TerminalPanel({ era, state, onHint, onAnswer, onClose }: { era: Era; state: GameState; onHint: () => void; onAnswer: (i: number) => boolean; onClose: () => void }) {
  const level = state.hintLevel[era.id] || 0;
  const puzzle = state.puzzles.includes(era.id);
  const patch = state.patches.includes(era.id);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const nextCost = level >= 1 && state.fish > 0 ? 1 : 0;
  return (
    <Modal title={`tux@timemachine:~/${era.id}$`} tone="terminal" onClose={onClose} wide label="Time machine terminal">
      <div className="space-y-1 text-sm">
        <p>$ make {era.module}</p>
        <p>[{puzzle ? "OK" : "  "}] interaction puzzle: {puzzle ? "record repaired" : "corrupted record still present"}</p>
        <p>[{patch ? "OK" : "  "}] patch quiz: {patch ? "applied" : "pending"}</p>
      </div>
      <div className="mt-4 rounded border border-[#9fe8a8]/30 p-3">
        <p className="mb-2 text-[#f2c14e]">$ man tux-hints</p>
        {level === 0 && <p className="text-sm opacity-80">No hints read yet. Hints escalate from gentle to exact.</p>}
        {era.hints.slice(0, level).map((h, i) => (
          <p key={i} className="mb-1 text-sm" data-testid={`text-hint-${i}`}>
            HINT {i + 1}: {h}
          </p>
        ))}
        {level < 3 && (
          <button data-testid="button-hint" onClick={onHint} className="mt-2 rounded border border-[#9fe8a8] px-3 py-1 text-sm hover:bg-[#9fe8a8]/15">
            {level === 0 ? "Read hint 1 (free)" : nextCost ? `Read hint ${level + 1} (tip 1 fish)` : `Read hint ${level + 1} (free - no fish needed)`}
          </button>
        )}
      </div>
      <div className="mt-4 rounded border border-[#9fe8a8]/30 p-3">
        <p className="mb-2 text-[#f2c14e]">{era.quiz.prompt}</p>
        {patch ? (
          <p className="text-sm">Patch applied. {era.quiz.explain}</p>
        ) : (
          <div className="grid gap-2">
            {era.quiz.options.map((o, i) => (
              <button
                key={i}
                data-testid={`button-answer-${i}`}
                onClick={() => {
                  const ok = onAnswer(i);
                  setFeedback(ok ? { ok, text: era.quiz.explain } : { ok, text: "Segfault in reasoning. No harm done - try another answer." });
                }}
                className="rounded border border-[#9fe8a8]/50 px-3 py-2 text-left text-sm hover:bg-[#9fe8a8]/15"
              >
                [{String.fromCharCode(65 + i)}] {o}
              </button>
            ))}
          </div>
        )}
        {feedback && <p role="status" className={`mt-2 text-sm ${feedback.ok ? "text-[#9fe8a8]" : "text-[#f2a43a]"}`}>{feedback.text}</p>}
      </div>
    </Modal>
  );
}

export function MapPanel({ state, onGo, onClose }: { state: GameState; onGo: (i: number) => void; onClose: () => void }) {
  return (
    <Modal title="Era map" onClose={onClose} wide>
      <p className="mb-3 text-sm text-[#5a4a3a]">Completed and unlocked eras can be revisited anytime.</p>
      <ol className="grid gap-2 sm:grid-cols-3">
        {ERAS.map((e, i) => {
          const open = i <= state.unlocked;
          const done = state.modules.includes(e.id);
          return (
            <li key={e.id}>
              <button
                data-testid={`button-era-${e.id}`}
                disabled={!open}
                onClick={() => onGo(i)}
                className="pix-btn relative flex h-full w-full flex-col items-start overflow-hidden p-3 text-left"
                style={{ background: open ? `linear-gradient(180deg, ${e.sky[0]}, ${e.sky[1]})` : "#cfc4ae" }}
              >
                <span className="text-xs opacity-80">ERA {e.num} - {e.years}</span>
                <span className="text-base font-semibold leading-tight">{e.title}</span>
                <span className="mt-1 text-xs opacity-80">{e.place}</span>
                <span className="absolute right-2 top-2">{done ? <Check size={18} /> : !open ? <Lock size={16} /> : null}</span>
                {i === state.chapter && <span className="mt-1 rounded bg-[#1d2340] px-1.5 text-xs text-[#f3e7cf]">You are here</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </Modal>
  );
}

export function CodexPanel({ state, onClose }: { state: GameState; onClose: () => void }) {
  const ids = Object.keys(SOURCES);
  return (
    <Modal title={`Source Codex (${state.sources.length}/${ids.length})`} onClose={onClose} wide>
      <p className="mb-3 text-sm text-[#5a4a3a]">Sources unlock as you repair records. Links go to the holding institutions so you can read them yourself. Not reviewed by professional historians.</p>
      <ul className="grid gap-3">
        {ids.map((id) => {
          const s = SOURCES[id];
          const have = state.sources.includes(id);
          return (
            <li key={id} className={`rounded border-2 border-[#1d2340]/30 p-3 ${have ? "bg-[#fbf3e2]" : "bg-[#e3d8c0] opacity-70"}`} data-testid={`card-source-${id}`}>
              {have ? (
                <>
                  <p className="font-pixel text-lg">{s.title}</p>
                  <p className="text-xs uppercase tracking-wide text-[#5a4a3a]">{s.date} | {s.institution}</p>
                  {s.quote && <blockquote className="my-2 border-l-4 border-[#2f7d78] pl-3 font-serif italic">"{s.quote.text}" <span className="not-italic text-sm">- {s.quote.attribution}</span></blockquote>}
                  <p className="text-sm">{s.summary}</p>
                  <a href={s.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#2f5aa8] underline" data-testid={`link-source-${id}`}>
                    Visit institution <ExternalLink size={14} />
                  </a>
                </>
              ) : (
                <p className="font-pixel flex items-center gap-2"><Lock size={14} /> Locked source - repair more records</p>
              )}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

export function ShopPanel({ state, onBuy, onWear, onClose }: { state: GameState; onBuy: (id: string, cost: number) => void; onWear: (id: string) => void; onClose: () => void }) {
  return (
    <Modal title="Hat Rack" onClose={onClose} wide>
      <p className="mb-3 flex items-center gap-2 text-sm"><Fish size={16} /> You have {state.fish} fish. Hats are purely cosmetic. Fish are earned by repairing records and compiling modules.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {HATS.map((h) => {
          const owned = state.hats.includes(h.id);
          const worn = state.hat === h.id;
          return (
            <div key={h.id} className="flex flex-col items-center rounded border-2 border-[#1d2340]/30 bg-[#fbf3e2] p-3">
              <Tux hat={h.id} size={56} />
              <p className="font-pixel mt-1">{h.name}</p>
              {owned ? (
                <button data-testid={`button-wear-${h.id}`} disabled={worn} onClick={() => onWear(h.id)} className="pix-btn mt-2 bg-[#9fe8a8] px-3 py-1 text-sm">{worn ? "Wearing" : "Wear"}</button>
              ) : (
                <button data-testid={`button-buy-${h.id}`} disabled={state.fish < h.cost} onClick={() => onBuy(h.id, h.cost)} className="pix-btn mt-2 bg-[#f2c14e] px-3 py-1 text-sm">Buy - {h.cost} fish</button>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export function SettingsPanel({ settings, onChange, onNewGame, onClose }: { settings: Settings; onChange: (s: Partial<Settings>) => void; onNewGame: () => void; onClose: () => void }) {
  const sup = speechSupported();
  const Row = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex items-center justify-between gap-3 border-b border-[#1d2340]/15 py-3"><span>{label}</span>{children}</div>
  );
  const Toggle = ({ on, onClick, id, disabled }: { on: boolean; onClick: () => void; id: string; disabled?: boolean }) => (
    <button role="switch" aria-checked={on} data-testid={`toggle-${id}`} disabled={disabled} onClick={onClick} className={`pix-btn w-20 px-2 py-1 text-sm ${on ? "bg-[#2f7d78] text-[#f3e7cf]" : "bg-[#e9dcc0]"}`}>{on ? "On" : "Off"}</button>
  );
  return (
    <Modal title="Settings" onClose={onClose}>
      <Row label="Text size">
        <div className="flex gap-1">
          {(["md", "lg", "xl"] as const).map((t) => (
            <button key={t} data-testid={`button-text-${t}`} onClick={() => onChange({ textSize: t })} aria-pressed={settings.textSize === t} className={`pix-btn px-3 py-1 ${settings.textSize === t ? "bg-[#f2c14e]" : "bg-[#e9dcc0]"}`}>{t === "md" ? "A" : t === "lg" ? "A+" : "A++"}</button>
          ))}
        </div>
      </Row>
      <Row label={sup ? "Narration (read text aloud)" : "Narration unavailable in this browser - all text stays on screen"}>
        <Toggle id="narration" on={settings.narration && sup} disabled={!sup} onClick={() => onChange({ narration: !settings.narration })} />
      </Row>
      <Row label="Sound effects"><Toggle id="sound" on={settings.sound} onClick={() => onChange({ sound: !settings.sound })} /></Row>
      <Row label="Reduce motion"><Toggle id="motion" on={settings.reducedMotion} onClick={() => onChange({ reducedMotion: !settings.reducedMotion })} /></Row>
      <div className="mt-4 rounded bg-[#e9dcc0] p-3 text-sm">
        <p className="font-pixel mb-1">Keyboard</p>
        <p>H highlight hotspots | Tab move between controls | Enter open verbs | 1-4 pick a verb | Escape close | M map | I inventory focus</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/teacher" className="pix-btn inline-flex items-center gap-1 bg-[#9fe8a8] px-3 py-1.5" data-testid="link-teacher"><Printer size={16} /> Teacher mode</Link>
        <button data-testid="button-new-game" onClick={onNewGame} className="pix-btn bg-[#e2603a] px-3 py-1.5 text-[#f3e7cf]">New game...</button>
      </div>
    </Modal>
  );
}

export function ConfirmPanel({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <Modal title="Start a new game?" onClose={onNo}>
      <p>This erases your chapters, inventory, sources, modules, fish and hats. Settings are kept. This cannot be undone.</p>
      <div className="mt-4 flex gap-2">
        <button data-autofocus data-testid="button-cancel-new" onClick={onNo} className="pix-btn bg-[#e9dcc0] px-4 py-2">Keep playing</button>
        <button data-testid="button-confirm-new" onClick={onYes} className="pix-btn bg-[#e2603a] px-4 py-2 text-[#f3e7cf]">Erase and restart</button>
      </div>
    </Modal>
  );
}

export function ContentNotePanel({ era, onAck, onMap }: { era: Era; onAck: () => void; onMap: () => void }) {
  return (
    <Modal title={`Content note: Era ${era.num}`} tone="quiet">
      <p className="leading-relaxed">{era.contentNote}</p>
      <p className="mt-2 text-sm text-[#5a5448]">Teachers may wish to preview this chapter. You can return to the map at any time.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button data-autofocus data-testid="button-ack-note" onClick={onAck} className="pix-btn bg-[#2f7d78] px-4 py-2 text-[#f3e7cf]">I understand, continue</button>
        <button data-testid="button-note-map" onClick={onMap} className="pix-btn bg-[#e9dcc0] px-4 py-2">Back to era map</button>
      </div>
    </Modal>
  );
}

export function ReflectionPanel({ era, onClose, narrate }: { era: Era; onClose: () => void; narrate: (t: string) => void }) {
  if (!era.reflection) return null;
  return (
    <Modal title={era.reflection.title} tone="quiet" onClose={onClose} label="Quiet reflection">
      <div className="space-y-3 leading-relaxed text-[#2a2a2a]">
        {era.reflection.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => narrate(era.reflection!.body.join(" "))} className="pix-btn inline-flex items-center gap-1 bg-[#e9dcc0] px-3 py-1.5" data-testid="button-read-reflection"><Volume2 size={16} /> Read aloud</button>
        <button data-autofocus onClick={onClose} className="pix-btn bg-[#d8d0c2] px-3 py-1.5" data-testid="button-close-reflection">Return</button>
      </div>
    </Modal>
  );
}

export function IntroPanel({ era, onClose }: { era: Era; onClose: () => void }) {
  return (
    <Modal title="BUG REPORT #1781" tone="terminal" onClose={onClose}>
      <div className="space-y-2 text-sm leading-relaxed">
        <p>warning: implicit declaration of function 'stabilize_timeline' [-Wimplicit]</p>
        <p className="text-[#f2a43a]">Tux: "It's just a warning." (It was not just a warning.)</p>
        <p>The time machine exploded into 9 modules scattered across American history. Glitches are corrupting records in every era.</p>
        <p className="text-[#f2c14e]">OBSERVER MODE: you may not change what happened. You may only repair anachronisms and corrupted records.</p>
        <p>Each era: explore, talk, take an item, Use it to repair the record, then pass the terminal patch quiz to compile a module.</p>
        <p>Click the ground to walk. Click anything to Look / Talk / Use / Take. Press H to highlight hotspots. Nothing can hurt you and wrong answers can be retried forever.</p>
        <p className="opacity-80">{era.intro}</p>
      </div>
      <button data-autofocus data-testid="button-start" onClick={onClose} className="mt-4 rounded border-2 border-[#9fe8a8] bg-[#9fe8a8] px-4 py-2 font-pixel text-[#172033] hover:bg-[#c6f5cb]">Start exploring</button>
    </Modal>
  );
}

export function ModulePanel({ era, onNext, onStay }: { era: Era; onNext: () => void; onStay: () => void }) {
  const last = era.num === ERAS.length;
  return (
    <Modal title="Module compiled" onClose={onStay}>
      <div className="flex items-center gap-4">
        <div className="anim-pop grid h-16 w-16 place-items-center rounded border-[3px] border-[#1d2340] bg-[#f2c14e] font-pixel text-sm">{era.num}/9</div>
        <div>
          <p className="font-mono text-sm">{era.module} ... linked</p>
          <p>+3 fish. {last ? "The Codex is complete." : "The next era is unlocked."}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button data-autofocus data-testid="button-next-era" onClick={onNext} className="pix-btn bg-[#e2603a] px-4 py-2 text-[#f3e7cf]">{last ? "See the victory screen" : "Travel to next era"}</button>
        <button data-testid="button-stay" onClick={onStay} className="pix-btn bg-[#e9dcc0] px-4 py-2">Stay and explore</button>
      </div>
    </Modal>
  );
}

export function VictoryScreen({ state, onCodex, onMap, onNewGame, onClose }: { state: GameState; onCodex: () => void; onMap: () => void; onNewGame: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1d2340] text-[#f3e7cf]" role="dialog" aria-label="Victory">
      <div className="anim-iris mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center p-6 text-center">
        <p className="font-mono text-sm text-[#9fe8a8]">$ ./timemachine --status  =&gt;  0 warnings, 0 errors</p>
        <h1 className="font-pixel mt-3 text-5xl text-[#f2c14e] sm:text-6xl">Codex Complete</h1>
        <div className="my-6 anim-bob"><Tux hat={state.hat} size={120} /></div>
        <p className="max-w-xl text-lg">Tux rebuilt the time machine without changing a single historical outcome. He just made sure the record remembered the people who were there.</p>
        <div className="mt-6 grid w-full grid-cols-3 gap-2 sm:grid-cols-9">
          {ERAS.map((e) => (
            <div key={e.id} className="rounded border-2 border-[#f3e7cf]/30 p-2 text-xs" style={{ background: e.sky[1] + "55" }}>
              <p className="font-pixel">{e.num}</p>
              <p className="truncate">{e.years}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm opacity-80">{state.sources.length} sources collected | {state.fish} fish | Lesson learned: never ignore -Wall.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button data-autofocus onClick={onCodex} className="pix-btn bg-[#f2c14e] px-4 py-2 text-[#1d2340]" data-testid="button-victory-codex">Open Codex</button>
          <button onClick={onMap} className="pix-btn bg-[#9fe8a8] px-4 py-2 text-[#1d2340]" data-testid="button-victory-map">Revisit eras</button>
          <Link href="/teacher" className="pix-btn bg-[#f3e7cf] px-4 py-2 text-[#1d2340]" data-testid="link-victory-teacher">Teacher worksheet</Link>
          <button onClick={onClose} className="pix-btn bg-[#f3e7cf] px-4 py-2 text-[#1d2340]" data-testid="button-victory-museum">Back to museum</button>
          <button onClick={onNewGame} className="pix-btn bg-[#e2603a] px-4 py-2 text-[#f3e7cf]" data-testid="button-victory-new">New game</button>
        </div>
      </div>
    </div>
  );
}
