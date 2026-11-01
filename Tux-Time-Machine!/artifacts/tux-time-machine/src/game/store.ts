import { useCallback, useEffect, useState } from "react";
import { ERAS } from "./data";

export interface Settings {
  textSize: "md" | "lg" | "xl";
  narration: boolean;
  sound: boolean;
  reducedMotion: boolean;
}

export interface GameState {
  version: 1;
  chapter: number;
  unlocked: number;
  inventory: string[];
  taken: string[]; // `${era}:${hotspot}`
  sources: string[];
  puzzles: string[];
  modules: string[];
  patches: string[];
  fish: number;
  hats: string[];
  hat: string;
  notesAck: string[];
  hintLevel: Record<string, number>;
  quizTries: Record<string, number>;
  introSeen: boolean;
  storySeen: boolean;
  won: boolean;
  settings: Settings;
}

const KEY = "tux-time-machine-save-v1";

export const freshState = (): GameState => ({
  version: 1,
  chapter: 0,
  unlocked: 0,
  inventory: [],
  taken: [],
  sources: [],
  puzzles: [],
  modules: [],
  patches: [],
  fish: 0,
  hats: ["none"],
  hat: "none",
  notesAck: [],
  hintLevel: {},
  quizTries: {},
  introSeen: false,
  storySeen: false,
  won: false,
  settings: { textSize: "md", narration: false, sound: true, reducedMotion: false },
});

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    const base = freshState();
    const s = { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings || {}) } } as GameState;
    s.chapter = Math.min(Math.max(0, s.chapter), ERAS.length - 1);
    return s;
  } catch {
    return freshState();
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
    const html = document.documentElement;
    html.dataset.text = state.settings.textSize;
    html.dataset.rm = state.settings.reducedMotion ? "1" : "0";
  }, [state]);
  const update = useCallback((fn: (s: GameState) => GameState) => setState((s) => fn(s)), []);
  const reset = useCallback(() => {
    setState((s) => ({ ...freshState(), settings: s.settings, introSeen: false }));
  }, []);
  return { state, update, reset };
}

export function readSave(): GameState {
  return load();
}

// --- tiny sound kit ---
let ctx: AudioContext | null = null;
export function blip(enabled: boolean, kind: "ok" | "bad" | "pick" | "win" | "tap" = "tap") {
  if (!enabled) return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    const seq: Record<string, number[]> = { ok: [523, 659, 784], bad: [220, 196], pick: [660, 880], win: [523, 659, 784, 1046], tap: [440] };
    seq[kind].forEach((f, i) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = "square";
      o.frequency.value = f;
      const t = ctx!.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(ctx!.destination);
      o.start(t);
      o.stop(t + 0.13);
    });
  } catch {
    /* ignore */
  }
}

export const speechSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;
export function speak(enabled: boolean, text: string) {
  if (!enabled || !speechSupported()) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.98;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}
