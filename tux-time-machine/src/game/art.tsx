import type { Era, Hotspot } from "./data";

export function Tux({ hat = "none", facing = 1, walking = false, size = 96 }: { hat?: string; facing?: number; walking?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 32 36" width={size} height={size * 1.125} shapeRendering="crispEdges" style={{ transform: `scaleX(${facing})` }} aria-hidden>
      <g className={walking ? "anim-bob" : ""}>
        {/* body */}
        <rect x="9" y="8" width="14" height="22" fill="#1d2340" />
        <rect x="7" y="12" width="18" height="16" fill="#1d2340" />
        <rect x="11" y="14" width="10" height="15" fill="#f3e7cf" />
        <rect x="10" y="17" width="12" height="10" fill="#f3e7cf" />
        {/* head */}
        <rect x="10" y="3" width="12" height="9" fill="#1d2340" />
        <rect x="12" y="5" width="3" height="3" fill="#f3e7cf" />
        <rect x="17" y="5" width="3" height="3" fill="#f3e7cf" />
        <rect x="13" y="6" width="1" height="2" fill="#1d2340" />
        <rect x="18" y="6" width="1" height="2" fill="#1d2340" />
        <rect x="14" y="9" width="5" height="2" fill="#f2a43a" />
        <rect x="15" y="11" width="3" height="1" fill="#e2603a" />
        {/* flippers */}
        <rect x="5" y="14" width="3" height="9" fill="#1d2340" />
        <rect x="24" y="14" width="3" height="9" fill="#1d2340" />
        {/* feet */}
        <rect x="9" y="30" width="6" height="3" fill="#f2a43a" />
        <rect x="17" y="30" width="6" height="3" fill="#f2a43a" />
        {/* scarf */}
        <rect x="9" y="12" width="14" height="2" fill="#2f7d78" />
        <rect x="20" y="13" width="2" height="5" fill="#2f7d78" />
        {hat === "tricorn" && <g><rect x="7" y="1" width="18" height="3" fill="#2a2a3a" /><rect x="11" y="-1" width="10" height="3" fill="#2a2a3a" /><rect x="7" y="1" width="2" height="1" fill="#f2c14e" /><rect x="23" y="1" width="2" height="1" fill="#f2c14e" /></g>}
        {hat === "engineer" && <g><rect x="9" y="0" width="14" height="4" fill="#5a7ab0" /><rect x="9" y="1" width="14" height="1" fill="#f3e7cf" /><rect x="20" y="3" width="6" height="1" fill="#5a7ab0" /></g>}
        {hat === "goggles" && <g><rect x="9" y="1" width="14" height="3" fill="#7a4a2a" /><rect x="11" y="4" width="4" height="3" fill="#9fe8a8" /><rect x="17" y="4" width="4" height="3" fill="#9fe8a8" /></g>}
        {hat === "beret" && <g><rect x="8" y="1" width="15" height="3" fill="#b23a3a" /><rect x="14" y="0" width="2" height="1" fill="#b23a3a" /></g>}
        {hat === "grad" && <g><rect x="6" y="1" width="20" height="2" fill="#1d2340" /><rect x="11" y="2" width="10" height="3" fill="#2a2f50" /><rect x="22" y="3" width="1" height="5" fill="#f2c14e" /></g>}
      </g>
    </svg>
  );
}

function Landmarks({ era }: { era: Era }) {
  const m = era.mid;
  const a = era.accent;
  switch (era.id) {
    case "revolution":
      return (
        <g>
          {[18, 40, 120, 142].map((x, i) => (
            <g key={i}>
              <polygon points={`${x},56 ${x + 9},40 ${x + 18},56`} fill="#e9dcc0" />
              <polygon points={`${x + 9},40 ${x + 18},56 ${x + 11},56`} fill="#cbb894" />
              <rect x={x + 8} y={49} width="2" height="7" fill={m} />
            </g>
          ))}
          <rect x="74" y="30" width="1" height="26" fill={m} />
          <rect x="75" y="30" width="10" height="6" fill={a} />
          <rect x="75" y="30" width="4" height="3" fill="#f3e7cf" />
        </g>
      );
    case "cherokee":
      return (
        <g>
          {[8, 30, 140].map((x, i) => (
            <g key={i}><rect x={x + 3} y="40" width="2" height="16" fill="#4a3a2a" /><polygon points={`${x},44 ${x + 4},26 ${x + 8},44`} fill={m} /></g>
          ))}
          <rect x="88" y="40" width="34" height="16" fill="#8a5a3a" />
          {[42, 46, 50].map((y) => <rect key={y} x="88" y={y} width="34" height="1" fill="#6a4228" />)}
          <polygon points="85,40 105,30 125,40" fill="#5a3a2a" />
          <rect x="100" y="46" width="6" height="10" fill="#3a2a1a" />
          <rect x="91" y="44" width="5" height="4" fill="#f2c14e" />
        </g>
      );
    case "freedom":
      return (
        <g>
          <rect x="96" y="34" width="30" height="22" fill="#d9c6a4" />
          <polygon points="94,34 111,24 128,34" fill={a} />
          <rect x="108" y="14" width="6" height="12" fill="#d9c6a4" />
          <polygon points="107,14 111,6 115,14" fill={a} />
          <rect x="108" y="44" width="6" height="12" fill="#5a3a2a" />
          {[99, 118].map((x) => <rect key={x} x={x} y="40" width="5" height="6" fill="#7aa8c8" />)}
          <rect x="20" y="44" width="40" height="1" fill="#5a3a2a" />
        </g>
      );
    case "railroad":
      return (
        <g>
          <polygon points="0,50 30,18 52,40 80,12 112,44 136,22 160,46 160,60 0,60" fill={m} />
          {[[30, 18], [80, 12], [136, 22]].map(([x, y], i) => <polygon key={i} points={`${x - 6},${y + 7} ${x},${y} ${x + 6},${y + 7}`} fill="#f3f0ea" />)}
          <rect x="0" y="54" width="160" height="2" fill="#4a3a2a" />
          {Array.from({ length: 20 }).map((_, i) => <rect key={i} x={i * 8 + 2} y="53" width="3" height="4" fill="#6a4a2a" />)}
          {[40, 60, 80, 100].map((x) => <rect key={x} x={x} y="44" width="2" height="10" fill="#6a4a2a" />)}
          <rect x="38" y="43" width="66" height="2" fill="#6a4a2a" />
        </g>
      );
    case "immigration":
      return (
        <g>
          <rect x="0" y="46" width="160" height="10" fill="#5a7a9a" />
          {[2, 30, 60, 100, 130].map((x) => <rect key={x} x={x} y="49" width="10" height="1" fill="#9ab8d4" />)}
          <rect x="70" y="30" width="70" height="22" fill="#e6dccb" />
          <polygon points="66,30 105,20 144,30" fill="#5a4a4a" />
          {[76, 88, 100, 112, 124].map((x) => <rect key={x} x={x} y="36" width="6" height="6" fill="#3f4f6a" />)}
        </g>
      );
    case "ww2":
      return (
        <g>
          <rect x="0" y="10" width="160" height="46" fill="#d6c7a0" />
          {[10, 50, 90, 130].map((x) => <rect key={x} x={x} y="10" width="8" height="46" fill="#bfae86" />)}
          <rect x="0" y="8" width="160" height="4" fill="#8a7a5a" />
          {[22, 62, 102].map((x, i) => <g key={x}><rect x={x} y="18" width="22" height="16" fill="#f3e7cf" /><rect x={x + 2} y="20" width="18" height="2" fill={i === 1 ? "#b23a2e" : a} /><rect x={x + 2} y="24" width="12" height="1" fill="#8a7a5a" /><rect x={x + 2} y="27" width="15" height="1" fill="#8a7a5a" /></g>)}
        </g>
      );
    case "rights":
      return (
        <g>
          {[[0, 20, 22], [24, 28, 14], [42, 16, 20], [118, 24, 18], [140, 14, 20]].map(([x, y, w], i) => (
            <g key={i}><rect x={x} y={y} width={w} height={56 - y} fill={m} />{Array.from({ length: 4 }).map((_, j) => <rect key={j} x={x + 3} y={y + 4 + j * 7} width={w - 6} height="2" fill="#f2c14e" opacity=".5" />)}</g>
          ))}
          <path d="M64 56 Q91 22 118 56" stroke="#a8a8b8" strokeWidth="3" fill="none" />
          <rect x="62" y="48" width="58" height="3" fill="#8a8a9a" />
        </g>
      );
    case "space":
      return (
        <g>
          {Array.from({ length: 40 }).map((_, i) => <rect key={i} x={(i * 37) % 160} y={(i * 17) % 34} width="1" height="1" fill="#f3e7cf" opacity={0.4 + (i % 3) * 0.2} />)}
          <rect x="128" y="10" width="4" height="30" fill="#e6e0d4" />
          <polygon points="126,12 130,2 134,12" fill="#e2603a" />
          <rect x="126" y="36" width="8" height="4" fill="#9a9aaa" />
          <rect x="10" y="32" width="90" height="24" fill="#5a6290" />
          {[16, 30, 44, 58, 72, 86].map((x) => <rect key={x} x={x} y="38" width="8" height="6" fill="#f2c14e" opacity=".7" />)}
        </g>
      );
    default:
      return (
        <g>
          <rect x="0" y="6" width="160" height="50" fill="#e6d6b6" />
          <rect x="0" y="48" width="160" height="2" fill="#a8885a" />
          {[[14, 14, 24, 18, "#2f7d78"], [48, 12, 18, 24, "#e2603a"], [104, 14, 22, 16, "#2f5aa8"], [134, 12, 16, 22, "#7a2f4a"]].map(([x, y, w, h, c], i) => (
            <g key={i}><rect x={Number(x) - 1} y={Number(y) - 1} width={Number(w) + 2} height={Number(h) + 2} fill="#8a6a3a" /><rect x={x} y={y} width={w} height={h} fill={String(c)} opacity=".75" /></g>
          ))}
          {[30, 80, 130].map((x) => <polygon key={x} points={`${x - 8},0 ${x + 8},0 ${x + 14},10 ${x - 14},10`} fill="#f2c14e" opacity=".2" />)}
        </g>
      );
  }
}

export function SceneBackdrop({ era }: { era: Era }) {
  const bands = 8;
  return (
    <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" shapeRendering="crispEdges" aria-hidden>
      {Array.from({ length: bands }).map((_, i) => {
        const t = i / (bands - 1);
        return <rect key={i} x="0" y={i * 7} width="160" height="7.2" fill={mix(era.sky[0], era.sky[1], t)} />;
      })}
      {era.id !== "space" && era.id !== "ww2" && era.id !== "museum" && <rect x="122" y="8" width="12" height="12" fill="#fff4d6" opacity=".8" />}
      <polygon points="0,46 20,34 44,42 70,30 96,40 124,28 160,40 160,58 0,58" fill={era.far} opacity=".75" />
      <Landmarks era={era} />
      <rect x="0" y="56" width="160" height="34" fill={era.ground} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="0" y={58 + i * 5} width="160" height="1" fill="#000" opacity={0.04 + i * 0.01} />
      ))}
      {Array.from({ length: 30 }).map((_, i) => <rect key={"d" + i} x={(i * 53) % 160} y={60 + ((i * 29) % 28)} width="2" height="1" fill="#000" opacity=".08" />)}
    </svg>
  );
}

function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return "#" + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

export function HotspotArt({ h, solved }: { h: Hotspot; solved: boolean }) {
  const c = h.color || "#5a4a6a";
  switch (h.art) {
    case "person":
      return (
        <svg viewBox="0 0 20 34" width="58" height="98" shapeRendering="crispEdges" aria-hidden>
          <rect x="6" y="1" width="8" height="8" fill="#6b4a33" />
          <rect x="5" y="0" width="10" height="3" fill="#2a2030" />
          <rect x="7" y="4" width="2" height="1" fill="#1d2340" /><rect x="11" y="4" width="2" height="1" fill="#1d2340" />
          <rect x="4" y="9" width="12" height="14" fill={c} />
          <rect x="2" y="10" width="2" height="10" fill={c} /><rect x="16" y="10" width="2" height="10" fill={c} />
          <rect x="8" y="9" width="4" height="3" fill="#f3e7cf" opacity=".7" />
          <rect x="5" y="23" width="4" height="10" fill="#2a2a3a" /><rect x="11" y="23" width="4" height="10" fill="#2a2a3a" />
        </svg>
      );
    case "desk":
      return (
        <svg viewBox="0 0 30 20" width="96" height="64" shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="6" width="28" height="3" fill="#7a4a2a" /><rect x="3" y="9" width="2" height="11" fill="#5a3a1a" /><rect x="25" y="9" width="2" height="11" fill="#5a3a1a" />
          <rect x="6" y="3" width="8" height="3" fill="#f3e7cf" /><rect x="16" y="2" width="6" height="4" fill="#2f5aa8" />
        </svg>
      );
    case "crate":
      return (
        <svg viewBox="0 0 24 20" width="76" height="64" shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="3" width="22" height="16" fill="#a8743a" /><rect x="1" y="3" width="22" height="2" fill="#7a4a2a" /><rect x="1" y="10" width="22" height="1" fill="#7a4a2a" /><rect x="11" y="3" width="2" height="16" fill="#7a4a2a" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 24 30" width="70" height="88" shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="2" width="20" height="16" fill="#3a4466" /><rect x="4" y="4" width="16" height="11" fill="#172033" />
          <rect x="5" y="6" width="8" height="1" fill="#9fe8a8" /><rect x="5" y="9" width="11" height="1" fill="#9fe8a8" /><rect x="5" y="12" width="3" height="1" fill="#f2c14e" />
          <rect x="8" y="18" width="8" height="10" fill="#4a5480" /><rect x="4" y="27" width="16" height="3" fill="#2a3050" /><rect x="18" y="20" width="3" height="3" fill="#e2603a" />
        </svg>
      );
    case "board":
      return (
        <svg viewBox="0 0 26 26" width="82" height="82" shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="2" width="22" height="16" fill="#5a3a2a" /><rect x="3" y="3" width="20" height="14" fill="#f3e7cf" />
          <rect x="5" y="5" width="9" height="7" fill={c === "#5a4a6a" ? "#8aa0b8" : c} opacity=".6" /><rect x="15" y="6" width="6" height="1" fill="#5a4a4a" /><rect x="15" y="9" width="5" height="1" fill="#5a4a4a" /><rect x="5" y="14" width="15" height="1" fill="#5a4a4a" />
          <rect x="7" y="18" width="2" height="8" fill="#5a3a2a" /><rect x="17" y="18" width="2" height="8" fill="#5a3a2a" />
        </svg>
      );
    case "wall":
      return (
        <svg viewBox="0 0 30 30" width="110" height="110" shapeRendering="crispEdges" aria-hidden>
          <rect x="0" y="0" width="30" height="30" fill="#c4a87a" />
          {[0, 6, 12, 18, 24].map((x) => <rect key={x} x={x} y="0" width="1" height="30" fill="#9a7a4a" />)}
          {Array.from({ length: 14 }).map((_, i) => <rect key={i} x={3 + (i % 4) * 6} y={4 + Math.floor(i / 4) * 6} width="3" height="3" fill="#5a3a1a" opacity={solved ? 0.9 : 0.5} />)}
        </svg>
      );
    case "shelf":
      return (
        <svg viewBox="0 0 26 30" width="80" height="92" shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="1" width="24" height="28" fill="#6a4a2a" />
          {[4, 13, 22].map((y) => <rect key={y} x="3" y={y} width="20" height="1" fill="#3a2a1a" />)}
          {[["#2f5aa8", 4], ["#e2603a", 7], ["#2f7d78", 10], ["#f2c14e", 15], ["#7a2f4a", 18]].map(([cc, x], i) => <rect key={i} x={Number(x)} y={i < 3 ? 6 : 15} width="2" height="7" fill={String(cc)} />)}
        </svg>
      );
    case "quilt":
      return (
        <svg viewBox="0 0 30 24" width="100" height="80" shapeRendering="crispEdges" aria-hidden>
          <rect x="0" y="1" width="30" height="1" fill="#5a3a2a" />
          {Array.from({ length: 16 }).map((_, i) => <rect key={i} x={2 + (i % 4) * 6} y={3 + Math.floor(i / 4) * 5} width="6" height="5" fill={["#c8553d", "#f2c14e", "#2f7d78", "#e9dcc0"][(i + Math.floor(i / 4)) % 4]} />)}
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 26 32" width="86" height="106" shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="20" width="22" height="12" fill="#6a4a2a" />
          <rect x="3" y="4" width="20" height="16" fill="#cfe6ec" opacity=".55" /><rect x="3" y="4" width="20" height="1" fill="#fff" opacity=".8" />
          {solved && Array.from({ length: 8 }).map((_, i) => <rect key={i} x={5 + (i % 4) * 4} y={8 + Math.floor(i / 4) * 6} width="3" height="4" fill={["#e2603a", "#2f7d78", "#f2c14e", "#2f5aa8"][i % 4]} />)}
        </svg>
      );
    case "reflection":
      return (
        <svg viewBox="0 0 20 30" width="60" height="90" shapeRendering="crispEdges" aria-hidden>
          <rect x="9" y="10" width="2" height="20" fill="#5a4a3a" />
          <rect x="7" y="6" width="6" height="6" fill="#f2c14e" opacity=".85" />
          <rect x="8" y="4" width="4" height="2" fill="#f2c14e" opacity=".5" />
          <rect x="5" y="28" width="10" height="2" fill="#5a4a3a" />
        </svg>
      );
    case "glitch":
      return (
        <svg viewBox="0 0 30 16" width="100" height="54" shapeRendering="crispEdges" aria-hidden className={solved ? "" : "anim-glitch"}>
          <rect x="1" y="1" width="28" height="14" fill={solved ? "#f3e7cf" : "#e9dcc0"} stroke="#1d2340" strokeWidth="1" />
          {solved ? (
            <><rect x="4" y="4" width="18" height="1" fill="#2f7d78" /><rect x="4" y="7" width="14" height="1" fill="#2f7d78" /><rect x="4" y="10" width="20" height="1" fill="#2f7d78" /></>
          ) : (
            <><rect x="4" y="4" width="10" height="2" fill="#e2603a" /><rect x="16" y="4" width="8" height="2" fill="#2fd6c8" /><rect x="6" y="8" width="18" height="1" fill="#e2603a" /><rect x="3" y="11" width="9" height="2" fill="#c03ad6" /><rect x="14" y="11" width="10" height="1" fill="#1d2340" /></>
          )}
        </svg>
      );
  }
}
