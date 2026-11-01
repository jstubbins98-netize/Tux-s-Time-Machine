import { useEffect, useRef, useState } from "react";
import { Tux } from "./art";
import { speak, speechSupported } from "./store";
import "./intro-cutscene.css";

type Stage = "lab" | "warn" | "portal" | "scatter" | "arrive";
type Beat = { who: "tux" | "term"; text: string; stage: Stage; caption: string };

const BEATS: Beat[] = [
  { who: "tux", stage: "lab", caption: "~/lab  23:47", text: "It compiled. First try. No warnings I care to read. Behold: chrono.c, the engine of my time machine." },
  { who: "term", stage: "lab", caption: "$ gcc -o chrono chrono.c", text: "Build complete. Nine modules linked: navigation, calendar, translator, archive, and five more with very confident names." },
  { who: "term", stage: "warn", caption: "warning: 1 issue", text: "Warning: the history archive has unchecked pointers. Recommend running the tests before you run the universe." },
  { who: "tux", stage: "warn", caption: "warning: ignored", text: "Tests are for people who doubt themselves. I will doubt myself later, in the past. Executing." },
  { who: "term", stage: "portal", caption: "./chrono --launch", text: "Segmentation fault in the timeline. Portal unstable. Please hold on to something that is not the machine." },
  { who: "term", stage: "scatter", caption: "core dumped x9", text: "The machine has split into nine modules and scattered them across American history. Each one is now somewhere very old." },
  { who: "tux", stage: "arrive", caption: "1781  Yorktown, Virginia", text: "Fields, tents, and a lot of people in serious coats. Terminal, what year is it?" },
  { who: "term", stage: "arrive", caption: "observer_mode = 1", text: "1781. A safety patch did survive: observer mode. You cannot change history here. You can only listen, look, and learn." },
  { who: "term", stage: "arrive", caption: "TODO.txt", text: "Your records were corrupted in the crash. Talk with people, collect real sources, and repair each record to recover a module." },
  { who: "tux", stage: "arrive", caption: "git checkout home", text: "So the bug fix is learning history properly. Fine. Nine modules, then home. And next time, I read the warnings." },
];

const MOD_COLORS = ["#e2603a", "#2f7d78", "#f2c14e", "#2f5aa8", "#7a2f4a", "#9fe8a8", "#c8553d", "#5a7ab0", "#e9dcc0"];

function Scene({ stage }: { stage: Stage }) {
  if (stage === "arrive") {
    return (
      <svg className="ic-bg" viewBox="0 0 160 80" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges" aria-hidden>
        {["#f2c9a0", "#f0d3ae", "#eedcbc", "#ece3c8"].map((c, i) => <rect key={i} x="0" y={i * 12} width="160" height="13" fill={c} />)}
        <rect x="124" y="8" width="12" height="12" fill="#fff4d6" opacity=".8" />
        <polygon points="0,46 22,34 48,42 74,30 100,40 126,28 160,40 160,58 0,58" fill="#8aa07a" opacity=".8" />
        {[14, 36, 112, 136].map((x) => <g key={x}><polygon points={`${x},56 ${x + 9},40 ${x + 18},56`} fill="#e9dcc0" /><polygon points={`${x + 9},40 ${x + 18},56 ${x + 11},56`} fill="#cbb894" /></g>)}
        <rect x="76" y="30" width="1" height="26" fill="#5a4a3a" /><rect x="77" y="30" width="10" height="6" fill="#2f5aa8" />
        <rect x="0" y="56" width="160" height="24" fill="#7a8a4a" />
        <g className="ic-drift" style={{ ["--dx" as string]: "0px", ["--dy" as string]: "-2px" }}>
          <circle cx="58" cy="50" r="7" fill="none" stroke="#2fd6c8" strokeWidth="1.5" opacity=".7" />
        </g>
        <rect x="100" y="60" width="4" height="4" fill="#f2c14e" className="ic-blink" />
      </svg>
    );
  }
  const shaking = stage === "portal" || stage === "scatter";
  return (
    <svg className="ic-bg" viewBox="0 0 160 80" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges" aria-hidden>
      <rect width="160" height="80" fill={stage === "lab" ? "#2a3050" : "#262a46"} />
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 20} y="0" width="1" height="58" fill="#1d2340" />)}
      <rect x="6" y="10" width="26" height="14" fill="#3a4466" /><rect x="8" y="12" width="22" height="10" fill="#172033" />
      <rect x="10" y="14" width="12" height="1" fill="#9fe8a8" /><rect x="10" y="17" width="16" height="1" fill={stage === "lab" ? "#9fe8a8" : "#f2c14e"} />
      <rect x="10" y="20" width="3" height="1" fill="#9fe8a8" className="ic-blink" />
      <rect x="4" y="30" width="34" height="3" fill="#6a4a2a" /><rect x="8" y="33" width="2" height="25" fill="#4a3a1a" /><rect x="32" y="33" width="2" height="25" fill="#4a3a1a" />
      <rect x="14" y="27" width="8" height="3" fill="#f3e7cf" /><rect x="24" y="26" width="5" height="4" fill="#e2603a" />
      <g className={shaking ? "ic-shake" : ""}>
        <rect x="96" y="20" width="44" height="38" fill="#4a5480" />
        <rect x="98" y="22" width="40" height="34" fill="#3a4466" />
        <g className={stage === "lab" ? "" : "ic-spin"}>
          <circle cx="118" cy="38" r="13" fill={stage === "portal" || stage === "scatter" ? "#2fd6c8" : "#172033"} opacity={stage === "warn" ? .6 : 1} />
          <circle cx="118" cy="38" r="9" fill="none" stroke="#f3e7cf" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="117" y="27" width="2" height="5" fill="#f2c14e" />
        </g>
        {[100, 132].map((x) => <rect key={x} x={x} y="24" width="4" height="4" fill={stage === "lab" ? "#9fe8a8" : "#e2603a"} className={stage === "warn" ? "ic-blink" : ""} />)}
        <rect x="104" y="58" width="4" height="4" fill="#1d2340" /><rect x="128" y="58" width="4" height="4" fill="#1d2340" />
      </g>
      {stage === "scatter" && MOD_COLORS.map((c, i) => {
        const a = (i / 9) * Math.PI * 2;
        return <rect key={i} x="116" y="36" width="5" height="5" fill={c} stroke="#1d2340" strokeWidth=".5" className="ic-fly"
          style={{ ["--dx" as string]: `${Math.round(Math.cos(a) * 60)}px`, ["--dy" as string]: `${Math.round(Math.sin(a) * 34)}px`, animationDelay: `${i * 0.06}s` }} />;
      })}
      {stage === "warn" && <g><rect x="44" y="6" width="44" height="12" fill="#f2c14e" /><rect x="46" y="8" width="40" height="8" fill="#1d2340" /><rect x="48" y="11" width="4" height="2" fill="#f2c14e" /><rect x="54" y="11" width="28" height="1" fill="#f3e7cf" /></g>}
      <rect x="0" y="58" width="160" height="22" fill="#3a3248" />
      {Array.from({ length: 10 }).map((_, i) => <rect key={i} x={i * 16} y="58" width="1" height="22" fill="#2a2438" />)}
    </svg>
  );
}

export default function IntroCutscene({ onComplete, narration, reducedMotion }: { onComplete: () => void; narration: boolean; reducedMotion: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [i, setI] = useState(0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const beat = BEATS[i];
  const last = i === BEATS.length - 1;

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (speechSupported()) window.speechSynthesis.cancel();
    if (ref.current?.open) ref.current.close();
    onCompleteRef.current();
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;
  const next = () => (last ? finish() : setI((n) => Math.min(n + 1, BEATS.length - 1)));
  const nextFn = useRef(next);
  nextFn.current = next;

  useEffect(() => {
    const d = ref.current;
    const prev = document.activeElement as HTMLElement | null;
    if (d && !d.open) { try { d.showModal(); } catch { d.setAttribute("open", ""); } }
    nextRef.current?.focus();
    const onCancel = (e: Event) => { e.preventDefault(); finishRef.current(); };
    d?.addEventListener("cancel", onCancel);
    return () => {
      d?.removeEventListener("cancel", onCancel);
      if (d?.open) d.close();
      if (speechSupported()) window.speechSynthesis.cancel();
      prev?.focus?.();
    };
  }, []);

  useEffect(() => {
    speak(narration, `${beat.who === "tux" ? "Tux" : "Terminal"}: ${beat.text}`);
  }, [i, narration, beat]);

  useEffect(() => { if (last) nextRef.current?.focus(); }, [last]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); finish(); return; }
    if ((e.key === "Enter" || e.key === " ") && !(e.target instanceof HTMLButtonElement)) {
      e.preventDefault(); nextFn.current();
    }
  };

  const tuxPos = beat.stage === "arrive" ? "22%" : beat.stage === "scatter" ? "30%" : "38%";

  return (
    <dialog ref={ref} className={`ic-dialog${reducedMotion ? " ic-rm" : ""}`} aria-labelledby="ic-title" aria-describedby="ic-text" onKeyDown={onKey}>
      <div className="ic-wrap" tabIndex={-1}>
        <div className="ic-top">
          <h2 id="ic-title" className="ic-title">Prologue: chrono.c</h2>
          <div className="ic-progress" role="progressbar" aria-valuemin={1} aria-valuemax={BEATS.length} aria-valuenow={i + 1} aria-label={`Scene ${i + 1} of ${BEATS.length}`}>
            {BEATS.map((_, k) => <span key={k} className={k <= i ? "on" : ""} />)}
          </div>
        </div>
        <div className="ic-stage" key={beat.stage}>
          <Scene stage={beat.stage} />
          <div className="ic-tux" style={{ left: tuxPos }}>
            <Tux size={96} hat={beat.stage === "lab" || beat.stage === "warn" ? "goggles" : "none"} walking={beat.stage === "arrive" && !reducedMotion} />
          </div>
          <div className="ic-caption">{beat.caption}</div>
        </div>
        <div className="pix-panel ic-box ic-enter" key={i}>
          <div className="ic-avatar" aria-hidden>
            {beat.who === "tux" ? <Tux size={44} /> : <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#9fe8a8" }}>&gt;_</span>}
          </div>
          <div aria-live="polite" aria-atomic="true">
            <p className="ic-speaker" style={{ color: beat.who === "tux" ? "#e2603a" : "#2f7d78" }}>{beat.who === "tux" ? "Tux" : "Terminal"}</p>
            <p id="ic-text" className={`ic-line${beat.who === "term" ? " term" : ""}`}>{beat.text}</p>
          </div>
        </div>
        <div className="ic-nav">
          <button type="button" className="pix-btn" onClick={finish}>Skip intro</button>
          <span className="ic-hint">Enter or Space to continue, Escape to skip</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="pix-btn" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}>Back</button>
            <button type="button" ref={nextRef} className="pix-btn primary" onClick={() => nextFn.current()}>{last ? "Begin adventure" : "Next"}</button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
