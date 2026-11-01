import { Link } from "wouter";
import { ArrowLeft, Printer, ExternalLink } from "lucide-react";
import { ERAS, SOURCES, CHAPTER_SOURCES } from "@/game/data";
import { Tux } from "@/game/art";

export default function TeacherPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f3e7cf] text-[#1d2340]">
      <div className="no-print sticky top-0 z-10 flex flex-wrap items-center gap-2 border-b-[3px] border-[#1d2340] bg-[#e9dcc0] px-4 py-3">
        <Link href="/" className="pix-btn inline-flex items-center gap-1 bg-[#9fe8a8] px-3 py-1.5" data-testid="link-back-game"><ArrowLeft size={16} /> Back to game</Link>
        <button onClick={() => window.print()} className="pix-btn inline-flex items-center gap-1 bg-[#f2c14e] px-3 py-1.5" data-testid="button-print"><Printer size={16} /> Print worksheet</button>
      </div>
      <article className="mx-auto max-w-3xl p-6">
        <header className="mb-6 flex items-center gap-4 border-b-2 border-[#1d2340] pb-4">
          <Tux size={64} hat="grad" />
          <div>
            <h1 className="font-pixel text-3xl">Tux's Time Machine! Teacher Guide</h1>
            <p className="text-sm">Discussion worksheet and chapter sources. Name: ____________________ Date: __________</p>
          </div>
        </header>
        <section className="mb-6 rounded border-2 border-[#1d2340]/40 p-4 text-sm leading-relaxed">
          <p><strong>How the game works.</strong> Students play as Tux in observer mode: they never change historical outcomes, only repair anachronisms and corrupted records. Each era requires an inventory puzzle and a short patch quiz. No timers, no failure states; wrong answers can be retried.</p>
          <p className="mt-2"><strong>Labels in the game.</strong> "Invented dialogue" is fiction written for the game. "Authentic quotation" is an attributed primary-source quote. "Historical summary" paraphrases the record. Guides are composite fictional characters. This content has not been reviewed by professional historians; please verify with the linked institutions.</p>
          <p className="mt-2"><strong>Content notes.</strong> Eras 2, 3, 5, 6 and 7 involve removal, slavery, racial violence, incarceration and state violence. Eras 2 and 6 include quiet reflection spaces with no jokes.</p>
        </section>
        {ERAS.map((e) => (
          <section key={e.id} className="mb-6 break-inside-avoid border-l-4 pl-4" style={{ borderColor: e.accent }}>
            <h2 className="font-pixel text-xl">Era {e.num}: {e.title} <span className="text-sm font-sans">({e.years})</span></h2>
            <p className="text-sm italic">{e.place}</p>
            {e.contentNote && <p className="mt-1 text-sm"><strong>Content note:</strong> {e.contentNote}</p>}
            <h3 className="mt-2 font-bold">Discussion questions</h3>
            <ol className="ml-5 list-decimal space-y-3 text-sm">
              {e.discussion.map((q, i) => <li key={i}>{q}<div className="mt-1 h-10 border-b border-dotted border-[#1d2340]/50" /></li>)}
            </ol>
            {CHAPTER_SOURCES[e.id].length > 0 && <>
              <h3 className="mt-2 font-bold">Sources</h3>
              <ul className="ml-5 list-disc text-sm">
                {CHAPTER_SOURCES[e.id].map((id) => {
                  const s = SOURCES[id];
                  return <li key={id}>{s.title} ({s.date}). {s.institution}. <a className="inline-flex items-center gap-0.5 text-[#2f5aa8] underline" href={s.url} target="_blank" rel="noreferrer">{s.url}<ExternalLink size={12} /></a>{s.quote && <div className="italic">"{s.quote.text}" - {s.quote.attribution}</div>}</li>;
                })}
              </ul>
            </>}
          </section>
        ))}
      </article>
    </div>
  );
}
