// All historical content for Tux's Time Machine.
// Dialogue marked kind "invented" is fictional dialogue written for the game.
// Dialogue marked kind "quote" is an attributed primary-source quotation.
// Dialogue marked kind "summary" is a labeled paraphrase / summary of the record.

export type LineKind = "invented" | "quote" | "summary";

export interface DialogueChoice {
  label: string;
  next: string | null; // null closes dialogue
}
export interface DialogueNode {
  speaker: string;
  kind: LineKind;
  text: string;
  cite?: string;
  choices: DialogueChoice[];
}

export interface Hotspot {
  id: string;
  name: string;
  x: number; // % of scene width (center)
  y: number; // % of scene height (bottom anchor)
  art: "person" | "desk" | "crate" | "glitch" | "terminal" | "board" | "wall" | "shelf" | "reflection" | "quilt" | "case";
  color?: string;
  look: string;
  talk?: string; // dialogue node id
  take?: string; // item id
  takeText?: string;
  reflection?: boolean;
}

export interface Item {
  id: string;
  name: string;
  desc: string;
  glyph: string; // short label drawn on the tile
}

export interface Source {
  id: string;
  title: string;
  date: string;
  institution: string;
  url: string;
  summary: string;
  quote?: { text: string; attribution: string };
}

export interface Era {
  id: string;
  num: number;
  title: string;
  years: string;
  place: string;
  module: string;
  sky: [string, string];
  far: string;
  mid: string;
  ground: string;
  accent: string;
  hat?: string;
  contentNote?: string;
  intro: string;
  guide: { name: string; role: string };
  hotspots: Hotspot[];
  dialogue: Record<string, DialogueNode>;
  puzzle: { item: string; target: string; success: string; wrong: string };
  hints: [string, string, string];
  quiz: { prompt: string; options: string[]; correct: number; explain: string };
  sourceId: string;
  reflection?: { title: string; body: string[] };
  discussion: string[];
}

export const ITEMS: Record<string, Item> = {
  quill: { id: "quill", name: "Goose quill", desc: "A freshly cut quill. Dry as a compiler log.", glyph: "QL" },
  ink: { id: "ink", name: "Iron-gall ink pot", desc: "Dark ink used for 18th-century documents.", glyph: "INK" },
  inkedquill: { id: "inkedquill", name: "Inked quill", desc: "Quill + ink. Ready to restore a record.", glyph: "IQ" },
  syllabary: { id: "syllabary", name: "Syllabary chart", desc: "A printed chart of Sequoyah's 85-character Cherokee syllabary.", glyph: "SYL" },
  signatures: { id: "signatures", name: "Signature sheet", desc: "A copy of the 100 signatures on the Declaration of Sentiments, 1848.", glyph: "SIG" },
  ledger: { id: "ledger", name: "Payroll ledger", desc: "Central Pacific payroll pages listing work gangs by headman name.", glyph: "LDG" },
  rubbing: { id: "rubbing", name: "Rubbing paper", desc: "Thin paper and charcoal for recording carved text without harming it.", glyph: "RUB" },
  stamp: { id: "stamp", name: "1947 date stamp", desc: "A court clerk's stamp. The ink says 1947.", glyph: "47" },
  ribbon: { id: "ribbon", name: "Typewriter ribbon", desc: "A fresh newsroom ribbon. Smells like deadlines.", glyph: "RBN" },
  fortran: { id: "fortran", name: "FORTRAN manual", desc: "An IBM FORTRAN manual, the kind Dorothy Vaughan taught her team from.", glyph: "FTN" },
  labels: { id: "labels", name: "Exhibit labels", desc: "Blank museum labels for the Codex case.", glyph: "LBL" },
  modules: { id: "modules", name: "Module bundle", desc: "All eight repaired modules, humming politely.", glyph: "MOD" },
  codexkit: { id: "codexkit", name: "Codex kit", desc: "Labels + module bundle. Ready to install in the case.", glyph: "CDX" },
};

export const RECIPES: { a: string; b: string; out: string; text: string }[] = [
  { a: "quill", b: "ink", out: "inkedquill", text: "Tux dips the quill. One small drip for a penguin." },
  { a: "labels", b: "modules", out: "codexkit", text: "Tux clips each module to a label. The Codex kit compiles with zero warnings." },
];

export const SOURCES: Record<string, Source> = {
  armistead: {
    id: "armistead",
    title: "Lafayette's certificate for James Armistead",
    date: "1784",
    institution: "Library of Congress (search) / Library of Virginia",
    url: "https://www.loc.gov/search/?q=James+Armistead+Lafayette",
    summary:
      "Summary: In 1784 the Marquis de Lafayette wrote a testimonial praising the intelligence work of James, an enslaved man from Virginia who had gathered information inside British lines in 1781. James used it to support his petition to the Virginia General Assembly, which granted his freedom in 1787. He later took the surname Lafayette.",
  },
  wheatley: {
    id: "wheatley",
    title: "Phillis Wheatley, letter to Samson Occom",
    date: "1774",
    institution: "Library of Congress (search)",
    url: "https://www.loc.gov/search/?q=Phillis+Wheatley",
    summary:
      "Wheatley, the first African American woman to publish a book of poetry (1773), wrote to the Mohegan minister Samson Occom criticizing the hypocrisy of enslavers who claimed to love liberty.",
    quote: {
      text: "In every human Breast, God has implanted a Principle, which we call Love of Freedom.",
      attribution: "Phillis Wheatley, letter to Samson Occom, 1774",
    },
  },
  phoenix: {
    id: "phoenix",
    title: "Cherokee Phoenix, first issue",
    date: "February 21, 1828",
    institution: "Western Carolina University Hunter Library / Cherokee Phoenix",
    url: "https://www.wcu.edu/library/DigitalCollections/CherokeePhoenix/",
    summary:
      "Summary: The Cherokee Phoenix, edited by Elias Boudinot at New Echota, was the first newspaper published by a Native American nation and printed in both English and Sequoyah's syllabary.",
  },
  seneca: {
    id: "seneca",
    title: "Declaration of Sentiments",
    date: "July 1848",
    institution: "National Park Service, Women's Rights NHP",
    url: "https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm",
    summary: "Adopted at Seneca Falls, New York, and signed by 100 people: 68 women and 32 men, including Frederick Douglass.",
    quote: {
      text: "We hold these truths to be self-evident: that all men and women are created equal.",
      attribution: "Declaration of Sentiments, Seneca Falls Convention, 1848",
    },
  },
  douglass: {
    id: "douglass",
    title: "Frederick Douglass, Fourth of July address",
    date: "July 5, 1852",
    institution: "Library of Congress (search)",
    url: "https://www.loc.gov/search/?q=Frederick+Douglass+Fourth+of+July",
    summary: "Speaking in Rochester, Douglass challenged a nation celebrating liberty while holding millions in slavery.",
    quote: { text: "What, to the American slave, is your 4th of July?", attribution: "Frederick Douglass, Rochester, NY, 1852" },
  },
  railroad: {
    id: "railroad",
    title: "Chinese Railroad Workers in North America Project",
    date: "1864-1869 (research ongoing)",
    institution: "Stanford University",
    url: "https://web.stanford.edu/group/chineserailroad/cgi-bin/website/",
    summary:
      "Summary: Thousands of Chinese workers, by many estimates the majority of the Central Pacific workforce, built the line through the Sierra Nevada. The best-known photograph of the 1869 Promontory Summit ceremony does not show them. In 2014 the U.S. Department of Labor inducted Chinese railroad workers into its Hall of Honor.",
  },
  angel: {
    id: "angel",
    title: "Poetry on the walls of Angel Island Immigration Station",
    date: "1910-1940",
    institution: "Angel Island Immigration Station Foundation",
    url: "https://www.aiisf.org/",
    summary:
      "Summary: Detained Chinese immigrants, held under exclusion laws, carved and brushed poems onto barrack walls describing longing, anger and hope. The walls were later painted over; a park ranger noticed the carvings in 1970, and they were preserved.",
  },
  wells: {
    id: "wells",
    title: "Ida B. Wells, Southern Horrors: Lynch Law in All Its Phases",
    date: "1892",
    institution: "Library of Congress (search)",
    url: "https://www.loc.gov/search/?q=Ida+B.+Wells+Southern+Horrors",
    summary: "Summary: Journalist Ida B. Wells used careful documentation, including newspaper reports and statistics, to expose lynching and the false justifications offered for it.",
  },
  ww2: {
    id: "ww2",
    title: "Navajo Code Talkers, Tuskegee Airmen, Manzanar",
    date: "1942-1945",
    institution: "National Archives / National Park Service / Densho",
    url: "https://densho.org/",
    summary:
      "Summary: Navajo Marines built a code from the Navajo language that was never broken. The Tuskegee Airmen were the first Black military aviators in the U.S. Army Air Forces. After Executive Order 9066 (1942), about 120,000 people of Japanese ancestry, most of them U.S. citizens, were forcibly removed and incarcerated, including at Manzanar, California.",
  },
  mendez: {
    id: "mendez",
    title: "Mendez v. Westminster",
    date: "Decided 1946, affirmed on appeal 1947",
    institution: "National Archives (search)",
    url: "https://www.archives.gov/search?query=Mendez+v.+Westminster",
    summary:
      "Summary: After the war, Gonzalo and Felicitas Mendez and other families challenged the segregation of Mexican American children in Orange County schools. The Ninth Circuit affirmed in 1947, and California ended school segregation laws that year, seven years before Brown v. Board of Education.",
  },
  rights: {
    id: "rights",
    title: "Selma, the Voting Rights Act, Delano and Stonewall",
    date: "1962-1970",
    institution: "National Park Service / National Archives",
    url: "https://www.nps.gov/semo/index.htm",
    summary:
      "Summary: Dolores Huerta co-founded the National Farm Workers Association in 1962 and popularized the rallying cry Si se puede in 1972. Marchers were attacked on the Edmund Pettus Bridge in Selma on March 7, 1965; the Voting Rights Act became law that August. The Stonewall uprising in New York, June 1969, became a turning point for LGBTQ+ rights.",
  },
  nasa: {
    id: "nasa",
    title: "Katherine Johnson and Dorothy Vaughan at NACA / NASA Langley",
    date: "1943-1986",
    institution: "NASA",
    url: "https://www.nasa.gov/search/?q=Katherine%20Johnson",
    summary:
      "Summary: Dorothy Vaughan led the segregated West Area Computing unit and taught herself and her staff FORTRAN as electronic computers arrived. Katherine Johnson calculated trajectories; before John Glenn's 1962 orbit he asked that she check the electronic computer's numbers. Later connection: in the 1980s, IBM engineer Mark Dean co-developed technology for the IBM PC.",
  },
};

export const HATS = [
  { id: "none", name: "No hat", cost: 0 },
  { id: "tricorn", name: "Tricorn", cost: 3 },
  { id: "engineer", name: "Engineer cap", cost: 4 },
  { id: "goggles", name: "Pilot goggles", cost: 5 },
  { id: "beret", name: "Newsroom beret", cost: 5 },
  { id: "grad", name: "Mortarboard", cost: 8 },
];

const TERM = (look: string): Hotspot => ({
  id: "terminal",
  name: "Time machine terminal",
  x: 90,
  y: 80,
  art: "terminal",
  look,
});

export const ERAS: Era[] = [
  {
    id: "revolution",
    num: 1,
    title: "Ink and Intelligence",
    years: "1776-1781",
    place: "Continental camp near Yorktown, Virginia",
    module: "FLUX_CAPACITOR.o",
    sky: ["#f6c89a", "#e98a64"],
    far: "#9a6a7a",
    mid: "#5d4a63",
    ground: "#c9a86a",
    accent: "#2f5aa8",
    intro:
      "Tux lands in a 1781 army camp. The time machine log screams: RECORD CORRUPTED - spy credit set to NULL. Remember observer mode: watch history, repair only the broken records.",
    guide: { name: "Corporal Ada Pell", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Corporal Ada Pell", x: 14, y: 82, art: "person", color: "#2f5aa8", look: "A tired corporal with a lantern. The badge reads: composite fictional guide.", talk: "g0" },
      { id: "james", name: "James Armistead", x: 32, y: 76, art: "person", color: "#6b3d2a", look: "James, an enslaved man who volunteered to serve under Lafayette and gathered intelligence inside British camps.", talk: "j0" },
      { id: "oneida", name: "Oneida provisioner", x: 48, y: 72, art: "person", color: "#7a4b2a", look: "An Oneida ally carrying corn. The Oneida Nation fought alongside the Patriots.", talk: "o0" },
      { id: "desk", name: "Field desk", x: 64, y: 78, art: "desk", look: "A folding field desk with Phillis Wheatley's 1773 book of poems on it. And a quill.", take: "quill", takeText: "Tux takes the quill. It is, technically, a feather. He has complicated feelings." },
      { id: "crate", name: "Supply crate", x: 76, y: 88, art: "crate", look: "Flour, flints, and a pot of iron-gall ink.", take: "ink", takeText: "Tux pockets the ink pot. Carefully. Penguins and ink have a history." },
      { id: "dispatch", name: "Corrupted dispatch log", x: 56, y: 92, art: "glitch", look: "A ledger entry flickers: INTELLIGENCE SOURCE = NULL. The record of who did the work has been wiped." },
      TERM("The time machine terminal. A sticky note says: never ignore -Wall again."),
    ],
    dialogue: {
      g0: { speaker: "Corporal Ada Pell", kind: "invented", text: "A penguin in a tricorn-less state of shock. You are the one with the humming box?", choices: [{ label: "What happened here?", next: "g1" }, { label: "Who is Phillis Wheatley?", next: "g2" }, { label: "Bye!", next: null }] },
      g1: { speaker: "Corporal Ada Pell", kind: "invented", text: "Your box sparked and our dispatch log lost a name. The general's reports depend on knowing which sources to trust.", choices: [{ label: "I will fix only the record.", next: null }] },
      g2: { speaker: "Phillis Wheatley (quotation)", kind: "quote", text: "In every human Breast, God has implanted a Principle, which we call Love of Freedom.", cite: "Letter to Samson Occom, 1774", choices: [{ label: "Powerful. Thank you.", next: null }] },
      j0: { speaker: "James Armistead", kind: "invented", text: "I carry messages and listen. The British think I serve them. I serve Lafayette.", choices: [{ label: "What happens after the war?", next: "j1" }, { label: "Your name is missing from a log.", next: "j2" }] },
      j1: { speaker: "Record summary", kind: "summary", text: "After the war James was returned to slavery. With Lafayette's 1784 testimonial he petitioned Virginia, and was freed in 1787. He took the name Lafayette.", choices: [{ label: "Close", next: null }] },
      j2: { speaker: "James Armistead", kind: "invented", text: "Then write it back. Do not change what happened, only what was erased.", choices: [{ label: "Observer mode. Understood.", next: null }] },
      o0: { speaker: "Oneida provisioner", kind: "invented", text: "Our nation chose to stand with the colonists. We fought at Oriskany and brought food to hungry soldiers.", choices: [{ label: "Tell me about Valley Forge.", next: "o1" }, { label: "Thank you.", next: null }] },
      o1: { speaker: "Record summary", kind: "summary", text: "Oneida tradition remembers Polly Cooper carrying corn to Valley Forge in 1778 and teaching soldiers to prepare it. The alliance came at great cost to Oneida communities.", choices: [{ label: "Close", next: null }] },
    },
    puzzle: { item: "inkedquill", target: "dispatch", success: "Tux restores the entry: SOURCE = James (later James Armistead Lafayette). The log stops flickering.", wrong: "That will not write on an 18th-century ledger." },
    hints: [
      "The dispatch log needs something that can write. Is there a writing tool in camp?",
      "Take the quill from the field desk and the ink pot from the supply crate. A dry quill writes nothing.",
      "Select the quill, then the ink pot in your inventory to combine them into the Inked quill. Select the Inked quill and Use it on the Corrupted dispatch log.",
    ],
    quiz: {
      prompt: "PATCH 1/9 > Why did Lafayette write a testimonial for James in 1784?",
      options: ["To support James's petition for his freedom", "To promote James to general", "To change the outcome of Yorktown", "To hire James as a printer"],
      correct: 0,
      explain: "Lafayette's certificate helped James petition the Virginia legislature, which freed him in 1787.",
    },
    sourceId: "armistead",
    discussion: [
      "Why might the work of spies like James Armistead be left out of official records?",
      "Phillis Wheatley wrote about the 'Love of Freedom' in 1774. Whose freedom was the Revolution fighting for, and whose was ignored?",
      "What did the Oneida Nation gain and lose by allying with the Patriots?",
    ],
  },
  {
    id: "cherokee",
    num: 2,
    title: "Eighty-Five Characters",
    years: "1821-1838",
    place: "New Echota, Cherokee Nation (present-day Georgia)",
    module: "SYNTAX_CORE.o",
    sky: ["#bfe0d6", "#7fb7b0"],
    far: "#6f8f8a",
    mid: "#3f6a63",
    ground: "#a7b47a",
    accent: "#a8452f",
    contentNote:
      "This chapter includes the forced removal of the Cherokee Nation (the Trail of Tears), during which thousands of people died. A reflection space is included. It is quiet and contains no jokes or puzzles.",
    intro:
      "New Echota, 1828. The printing office is busy with the first issue of the Cherokee Phoenix. But the press has been infected: an autocorrect bug keeps replacing syllabary characters with Latin letters.",
    guide: { name: "Printer's apprentice Wren", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Apprentice Wren", x: 13, y: 84, art: "person", color: "#a8452f", look: "An apprentice with inky fingers. Badge: composite fictional guide.", talk: "g0" },
      { id: "sequoyah", name: "Sequoyah", x: 30, y: 76, art: "person", color: "#4a5f8a", look: "Sequoyah, the Cherokee scholar who created a writing system for the Cherokee language, completed around 1821.", talk: "s0", take: "syllabary", takeText: "Sequoyah's students hand Tux a printed syllabary chart. Learnable in days, they say. Tux is impressed: that is better documentation than most software." },
      { id: "boudinot", name: "Editor Elias Boudinot", x: 46, y: 74, art: "person", color: "#3d3d5c", look: "Elias Boudinot, editor of the Cherokee Phoenix.", talk: "b0" },
      { id: "press", name: "Glitched printing press", x: 62, y: 86, art: "glitch", look: "The press output reads 'CHEROKEE PHOENIX' in English only. The Cherokee columns are scrambled into Latin letters. Classic encoding bug." },
      { id: "reflect", name: "Reflection: 1838", x: 78, y: 74, art: "reflection", look: "A quiet place to read about what came next.", reflection: true },
      TERM("Terminal: SYNTAX_CORE missing. Character encoding errors detected."),
    ],
    dialogue: {
      g0: { speaker: "Apprentice Wren", kind: "invented", text: "Careful, the type is still warm. The Phoenix prints in English and Cherokee, side by side.", choices: [{ label: "Why two languages?", next: "g1" }, { label: "Later!", next: null }] },
      g1: { speaker: "Record summary", kind: "summary", text: "The bilingual paper informed Cherokee readers and argued the Nation's case to an English-speaking public as Georgia and the U.S. pushed for removal.", choices: [{ label: "Close", next: null }] },
      s0: { speaker: "Sequoyah", kind: "invented", text: "Each character is a syllable. When people saw my daughter read my words aloud, they believed.", choices: [{ label: "May I borrow a chart?", next: "s1" }, { label: "How many characters?", next: "s2" }] },
      s1: { speaker: "Sequoyah", kind: "invented", text: "Take one from my students. Use the Take verb on me, little bird.", choices: [{ label: "Thank you.", next: null }] },
      s2: { speaker: "Record summary", kind: "summary", text: "The syllabary has 85 characters (86 in early versions). Within a few years, many Cherokee people could read and write in their own language.", choices: [{ label: "Close", next: null }] },
      b0: { speaker: "Elias Boudinot", kind: "invented", text: "Our first issue goes out February 21, 1828. Our readers deserve their own language on the page.", choices: [{ label: "The press is glitching.", next: "b1" }] },
      b1: { speaker: "Elias Boudinot", kind: "invented", text: "Then set it right with the true characters. A chart of the syllabary would let you check every sort.", choices: [{ label: "On it.", next: null }] },
    },
    puzzle: { item: "syllabary", target: "press", success: "Tux checks each sort against the chart. The Cherokee columns print true. SYNTAX_CORE recompiled.", wrong: "That does not fix character encoding." },
    hints: [
      "The press is mixing up characters. You need a reference for the correct ones.",
      "Sequoyah's students have syllabary charts. Use Take on Sequoyah.",
      "Take the Syllabary chart from Sequoyah, select it in your inventory, then Use it on the Glitched printing press.",
    ],
    quiz: {
      prompt: "PATCH 2/9 > What made the Cherokee Phoenix historically significant?",
      options: ["It was the first newspaper published by a Native American nation, printed in English and Cherokee", "It was the first newspaper in Georgia", "It was printed only in English", "It was published after removal in Oklahoma"],
      correct: 0,
      explain: "First issued in 1828 at New Echota, it was bilingual and edited by Elias Boudinot.",
    },
    sourceId: "phoenix",
    reflection: {
      title: "Reflection: The Trail of Tears",
      body: [
        "In 1830 Congress passed the Indian Removal Act. The Cherokee Nation fought removal in court and in print, and won a key Supreme Court case, Worcester v. Georgia, in 1832. The federal government did not enforce it.",
        "In 1838 and 1839, U.S. soldiers forced about 16,000 Cherokee people from their homes and marched them west to Indian Territory. Thousands died from disease, exposure and hunger. Estimates are often given as about 4,000.",
        "The Cherokee Nation rebuilt in the west and continues today, as do the Eastern Band of Cherokee Indians and the United Keetoowah Band.",
        "Take a moment before you continue.",
      ],
    },
    discussion: [
      "Why would a writing system matter for a nation defending its sovereignty?",
      "The Cherokee won Worcester v. Georgia but were still removed. What does that tell us about laws and enforcement?",
      "How do Cherokee communities keep the language alive today?",
    ],
  },
  {
    id: "freedom",
    num: 3,
    title: "Self-Evident",
    years: "1848-1858",
    place: "Western New York: Seneca Falls and Rochester",
    module: "LIBERTY_LINKER.o",
    sky: ["#f1dba0", "#d7a75a"],
    far: "#8a7a5a",
    mid: "#5a5a3a",
    ground: "#9caa6a",
    accent: "#7a2f4a",
    contentNote: "This chapter discusses slavery and escape from enslavement. Tubman and Douglass are presented through summaries and accurately attributed quotations.",
    intro: "Upstate New York, 1848. A convention at the Wesleyan Chapel has just adopted a declaration, but the time glitch erased its signature list. Total signers: 0. That is not right.",
    guide: { name: "Clerk Hollis Maybry", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Clerk Hollis Maybry", x: 12, y: 84, art: "person", color: "#7a2f4a", look: "A meeting clerk with a pencil behind each ear. Composite fictional guide.", talk: "g0" },
      { id: "douglass", name: "Frederick Douglass", x: 28, y: 75, art: "person", color: "#3a2a22", look: "Frederick Douglass, who escaped slavery in 1838 and published The North Star newspaper in Rochester.", talk: "d0" },
      { id: "tubman", name: "Harriet Tubman (story panel)", x: 43, y: 72, art: "board", look: "A panel about Harriet Tubman: she escaped slavery in 1849 and returned about 13 times to guide roughly 70 people to freedom.", talk: "t0" },
      { id: "quilt", name: "Quilt on a line", x: 58, y: 70, art: "quilt", look: "A lovely quilt. Some modern stories claim quilts held secret Underground Railroad map codes. Historians have found no evidence from the period for that; it is treated as later folklore. Real escapes relied on people, word of mouth, and enormous courage." },
      { id: "table", name: "Meeting table", x: 70, y: 84, art: "desk", look: "Papers from the convention, including a copy of the signature sheet.", take: "signatures", takeText: "Tux takes the signature sheet copy. One hundred names. He counts twice, like a good unit test." },
      { id: "decl", name: "Corrupted Declaration", x: 52, y: 93, art: "glitch", look: "The Declaration of Sentiments displays: SIGNERS = 0. That is a corrupted record." },
      TERM("Terminal: LIBERTY_LINKER awaiting a valid signer count."),
    ],
    dialogue: {
      g0: { speaker: "Clerk Hollis Maybry", kind: "invented", text: "Elizabeth Cady Stanton and Lucretia Mott organized this. Some say it went too far. Some say not far enough.", choices: [{ label: "What did it say?", next: "g1" }, { label: "See you.", next: null }] },
      g1: { speaker: "Declaration of Sentiments (quotation)", kind: "quote", text: "We hold these truths to be self-evident: that all men and women are created equal.", cite: "Seneca Falls, 1848", choices: [{ label: "Close", next: null }] },
      d0: { speaker: "Frederick Douglass", kind: "invented", text: "I signed that declaration. The rights of women and the end of slavery are bound together.", choices: [{ label: "Your 1852 speech?", next: "d1" }, { label: "Thank you.", next: null }] },
      d1: { speaker: "Frederick Douglass (quotation)", kind: "quote", text: "What, to the American slave, is your 4th of July?", cite: "Rochester, NY, July 5, 1852", choices: [{ label: "Close", next: null }] },
      t0: { speaker: "Record summary", kind: "summary", text: "Tubman relied on networks of free Black communities, abolitionists, and her own knowledge of the land. She later served as a scout and spy for the Union Army.", choices: [{ label: "Close", next: null }] },
    },
    puzzle: { item: "signatures", target: "decl", success: "SIGNERS = 100 (68 women, 32 men). LIBERTY_LINKER resolved all symbols.", wrong: "The Declaration needs the real signer list, not that." },
    hints: [
      "The Declaration's signer count was wiped. Where would convention papers be kept?",
      "Look at the meeting table. Take what is there.",
      "Take the Signature sheet from the Meeting table, select it, and Use it on the Corrupted Declaration.",
    ],
    quiz: {
      prompt: "PATCH 3/9 > Which statement about Underground Railroad quilt codes is accurate?",
      options: ["Historians have found no period evidence for quilt map codes; the idea is later folklore", "Every safe house used a standard quilt code", "Tubman designed the quilt codes", "Quilt codes were printed in The North Star"],
      correct: 0,
      explain: "Quilt-code stories appeared much later. Documented escapes relied on people and networks.",
    },
    sourceId: "seneca",
    discussion: [
      "Why do you think Douglass supported women's rights at Seneca Falls?",
      "Why do myths like the quilt code spread, and how can we check a historical claim?",
      "What risks did Tubman take, and why did she keep returning?",
    ],
  },
  {
    id: "railroad",
    num: 4,
    title: "Missing From the Frame",
    years: "1864-1869",
    place: "Sierra Nevada and Promontory Summit, Utah Territory",
    module: "RAIL_SCHEDULER.o",
    sky: ["#dce6ef", "#9fb6cc"],
    far: "#b9c3cf",
    mid: "#6a7a8e",
    ground: "#c9b494",
    accent: "#b23a2e",
    intro: "High in the Sierra. The time glitch hit the archive: the famous 1869 photo caption now reads WORKERS: NOT FOUND. The workers were real. The records exist. Time to cross-reference.",
    guide: { name: "Archivist Lin Okafor-Moss", role: "Composite fictional guide (present-day archivist, visiting)" },
    hotspots: [
      { id: "guide", name: "Archivist Lin", x: 12, y: 84, art: "person", color: "#b23a2e", look: "A present-day archivist with a clipboard. Composite fictional guide.", talk: "g0" },
      { id: "worker", name: "Railroad crew headman", x: 30, y: 74, art: "person", color: "#2f4a6a", look: "A crew headman organizing his gang's supplies. Chinese workers did some of the hardest, most dangerous work on the line.", talk: "w0" },
      { id: "tent", name: "Paymaster's tent", x: 48, y: 76, art: "crate", look: "Boxes of payroll records, organized by work gang.", take: "ledger", takeText: "Tux borrows a payroll ledger. Rows of names and wages. Data never lies, but it can be ignored." },
      { id: "shelf", name: "Supply depot list", x: 64, y: 72, art: "board", look: "Tea, rice, dried fish, vegetables, ordered through Chinese merchants. Workers often paid for their own food while white workers received board." },
      { id: "caption", name: "Corrupted photo caption", x: 58, y: 93, art: "glitch", look: "Caption: Promontory Summit, 1869. WORKERS: NOT FOUND. The famous photo omitted Chinese workers; the archive should not." },
      TERM("Terminal: RAIL_SCHEDULER needs a valid crew roster."),
    ],
    dialogue: {
      g0: { speaker: "Archivist Lin", kind: "invented", text: "We cannot change who was in the photograph. We can make sure the record tells the whole story.", choices: [{ label: "How?", next: "g1" }, { label: "Later.", next: null }] },
      g1: { speaker: "Archivist Lin", kind: "invented", text: "Payroll, supply orders, letters. Cross-reference them. That is how historians recover omitted people.", choices: [{ label: "Archive mode: on.", next: null }] },
      w0: { speaker: "Railroad crew headman", kind: "invented", text: "My crew is paid less than others, and we buy our own food. In 1867 thousands of us stopped work to demand fair pay and hours.", choices: [{ label: "What happened?", next: "w1" }] },
      w1: { speaker: "Record summary", kind: "summary", text: "The June 1867 strike ended after about a week when the company cut off food supplies. It remains one of the largest labor actions of its era.", choices: [{ label: "Close", next: null }] },
    },
    puzzle: { item: "ledger", target: "caption", success: "Cross-referenced: caption updated with a note on Chinese crews documented in payroll records. RAIL_SCHEDULER online.", wrong: "The caption needs documentary evidence." },
    hints: [
      "The caption says workers were not found. What kind of record proves who worked here?",
      "Payroll lists crews and wages. Visit the Paymaster's tent.",
      "Take the Payroll ledger from the Paymaster's tent, select it, then Use it on the Corrupted photo caption.",
    ],
    quiz: {
      prompt: "PATCH 4/9 > What does the famous 1869 Promontory Summit photograph leave out?",
      options: ["The Chinese workers who built much of the Central Pacific line", "The locomotives", "The railroad executives", "The golden spike ceremony"],
      correct: 0,
      explain: "Chinese workers were omitted from the iconic image; recovery projects use payroll and other records.",
    },
    sourceId: "railroad",
    discussion: [
      "Who decides who appears in a famous photograph?",
      "What sources besides photos can tell us who did the work?",
      "Why did Chinese workers strike in 1867?",
    ],
  },
  {
    id: "immigration",
    num: 5,
    title: "Words on the Wall",
    years: "1882-1924",
    place: "Angel Island, San Francisco Bay, and Memphis",
    module: "IO_BUFFER.o",
    sky: ["#d8dde8", "#a3aec7"],
    far: "#8a96ad",
    mid: "#4f5d78",
    ground: "#b8a88c",
    accent: "#3a6b5a",
    contentNote: "This chapter mentions immigration detention under the Chinese Exclusion Act and Ida B. Wells's reporting on racial violence (lynching). Details are summarized, not depicted.",
    intro: "Angel Island Immigration Station. The archive card for the barracks reads: POEMS FOUND: NONE. But Tux can see carved characters in the wooden walls.",
    guide: { name: "Docent Rosa Tanaka-Bell", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Docent Rosa", x: 12, y: 84, art: "person", color: "#3a6b5a", look: "A soft-spoken docent. Composite fictional guide.", talk: "g0" },
      { id: "wall", name: "Carved barrack wall", x: 34, y: 70, art: "wall", look: "Chinese characters carved and brushed into the wood. The detainees wrote poems about waiting, longing, anger and hope." },
      { id: "wells", name: "Ida B. Wells", x: 52, y: 76, art: "person", color: "#4a2f3a", look: "Journalist Ida B. Wells, visiting via the time-stream from her Memphis newspaper office.", talk: "i0" },
      { id: "desk", name: "Conservator's desk", x: 70, y: 82, art: "desk", look: "Rubbing paper and charcoal: tools to record carvings without harming them.", take: "rubbing", takeText: "Tux takes rubbing paper. Non-destructive read access only." },
      { id: "card", name: "Corrupted archive card", x: 52, y: 94, art: "glitch", look: "Archive card: POEMS FOUND: NONE. Clearly wrong." },
      TERM("Terminal: IO_BUFFER cannot read input. Need a faithful copy of the source."),
    ],
    dialogue: {
      g0: { speaker: "Docent Rosa", kind: "invented", text: "Many people were held here for weeks or months under exclusion laws. The poems are their own words, so we treat them carefully.", choices: [{ label: "What happened to the walls?", next: "g1" }, { label: "Thank you.", next: null }] },
      g1: { speaker: "Record summary", kind: "summary", text: "The walls were painted over. In 1970 a park ranger noticed the carvings, and community members and scholars pushed to preserve and translate them.", choices: [{ label: "Close", next: null }] },
      i0: { speaker: "Ida B. Wells", kind: "invented", text: "I count, I cite, I publish. Facts carefully gathered are hard to dismiss.", choices: [{ label: "What did you investigate?", next: "i1" }, { label: "Any advice?", next: "i2" }] },
      i1: { speaker: "Record summary", kind: "summary", text: "In 1892 Wells published Southern Horrors, documenting lynchings and challenging the false claims used to excuse them. Her press was destroyed and she was threatened, but she kept reporting.", choices: [{ label: "Close", next: null }] },
      i2: { speaker: "Ida B. Wells", kind: "invented", text: "Make a faithful copy of the evidence before anyone can erase it.", choices: [{ label: "Copy that.", next: null }] },
    },
    puzzle: { item: "rubbing", target: "wall", success: "Tux makes a careful rubbing. The archive card updates: POEMS FOUND: over 200, recorded and preserved. IO_BUFFER flushed.", wrong: "The wall needs a gentle, non-destructive tool." },
    hints: [
      "The archive card is wrong because no one recorded the carvings. Record them first.",
      "The Conservator's desk has a tool for copying carvings without damaging them.",
      "Take the Rubbing paper from the Conservator's desk, select it, and Use it on the Carved barrack wall.",
    ],
    quiz: {
      prompt: "PATCH 5/9 > Why were many Chinese immigrants detained at Angel Island?",
      options: ["Exclusion laws targeted Chinese immigrants for extra scrutiny and restriction", "The station was a hotel", "All immigrants were held for one year", "They chose to stay"],
      correct: 0,
      explain: "The Chinese Exclusion Act of 1882 and later laws restricted Chinese immigration until 1943.",
    },
    sourceId: "angel",
    discussion: [
      "Why might people carve poems into walls while detained?",
      "How did Ida B. Wells use evidence as a tool for justice?",
      "Why is preserving and translating sources important?",
    ],
  },
  {
    id: "ww2",
    num: 6,
    title: "Codes and Courtrooms",
    years: "1942-1947",
    place: "Records Hall: Pacific, Alabama, Manzanar, Orange County",
    module: "CRYPTO_STACK.o",
    sky: ["#e7d9b9", "#b9a57a"],
    far: "#8b8a6a",
    mid: "#555a46",
    ground: "#a99a72",
    accent: "#2e4f7a",
    contentNote: "This chapter includes the wartime incarceration of Japanese Americans. A quiet reflection space is included with no jokes or puzzles.",
    intro: "A Records Hall spanning 1942 to 1947. The timeline board has a bug: Mendez v. Westminster is filed under 1942 wartime. It belongs after the war.",
    guide: { name: "Clerk Sam Begay-Ortiz", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Clerk Sam", x: 11, y: 84, art: "person", color: "#2e4f7a", look: "A records clerk with a cardigan full of pencils. Composite fictional guide.", talk: "g0" },
      { id: "navajo", name: "Navajo Code Talker exhibit", x: 26, y: 72, art: "board", look: "Navajo Marines created and used a code based on the Navajo language in the Pacific. It was never broken. Their work stayed classified until 1968.", talk: "n0" },
      { id: "tuskegee", name: "Tuskegee Airmen exhibit", x: 40, y: 72, art: "board", look: "The Tuskegee Airmen trained in Alabama and flew combat missions in Europe, including bomber escort with the 332nd Fighter Group, while facing segregation at home." },
      { id: "reflect", name: "Reflection: Manzanar", x: 54, y: 70, art: "reflection", look: "A quiet space about Manzanar.", reflection: true },
      { id: "clerk", name: "Court clerk's desk", x: 70, y: 82, art: "desk", look: "Postwar court filings and a date stamp.", take: "stamp", takeText: "Tux takes the 1947 date stamp. Chronology is a dependency graph." },
      { id: "timeline", name: "Glitched timeline board", x: 48, y: 94, art: "glitch", look: "The board shows Mendez v. Westminster under 1942. Wrong: it was decided in 1946 and affirmed in 1947, after the war." },
      TERM("Terminal: CRYPTO_STACK failed chronology check."),
    ],
    dialogue: {
      g0: { speaker: "Clerk Sam", kind: "invented", text: "Every exhibit in this hall is a different story. Keep the dates straight and the stories stay true.", choices: [{ label: "Tell me about Mendez.", next: "g1" }, { label: "Later.", next: null }] },
      g1: { speaker: "Record summary", kind: "summary", text: "Mendez v. Westminster was a postwar case. Families challenged segregation of Mexican American children in California schools; the appeals court affirmed in 1947.", choices: [{ label: "Close", next: null }] },
      n0: { speaker: "Record summary", kind: "summary", text: "The original 29 Navajo recruits developed the code in 1942. Hundreds more served. They were awarded Congressional Gold and Silver Medals in 2001.", choices: [{ label: "Close", next: null }] },
    },
    puzzle: { item: "stamp", target: "timeline", success: "Mendez v. Westminster is restamped 1947, postwar. CRYPTO_STACK passes chronology check.", wrong: "The board needs the correct date, not that." },
    hints: [
      "One case is filed in the wrong year. You need a way to correct its date.",
      "The court clerk's desk has a date stamp.",
      "Take the 1947 date stamp from the Court clerk's desk, select it, and Use it on the Glitched timeline board.",
    ],
    quiz: {
      prompt: "PATCH 6/9 > Which is correct about Mendez v. Westminster?",
      options: ["A postwar case affirmed in 1947 that ended segregation of Mexican American students in California", "A 1942 wartime military case", "A case about the Navajo code", "Decided after Brown v. Board"],
      correct: 0,
      explain: "It came after WWII and seven years before Brown v. Board (1954).",
    },
    sourceId: "mendez",
    reflection: {
      title: "Reflection: Manzanar",
      body: [
        "In February 1942, Executive Order 9066 led to the forced removal of about 120,000 people of Japanese ancestry from the West Coast. Most were U.S. citizens. No one was charged with a crime.",
        "Manzanar, in California's Owens Valley, held more than 10,000 people at its peak. Families lived in crowded barracks behind barbed wire and guard towers, and still built gardens, schools and newspapers.",
        "In 1988 the U.S. government formally apologized and paid redress to surviving incarcerees.",
        "Take a moment before you continue.",
      ],
    },
    discussion: [
      "Why is it important to keep wartime and postwar events distinct?",
      "How did Navajo Code Talkers and Tuskegee Airmen serve a country that did not treat them equally?",
      "What did the 1988 apology for incarceration acknowledge?",
    ],
  },
  {
    id: "rights",
    num: 7,
    title: "Si Se Puede",
    years: "1962-1970",
    place: "Delano, Selma, and Greenwich Village",
    module: "RIGHTS_DAEMON.o",
    sky: ["#f4c9a8", "#e0865f"],
    far: "#c27a6a",
    mid: "#6a3f4f",
    ground: "#d1b07a",
    accent: "#2d6b7a",
    contentNote: "This chapter mentions violence against peaceful marchers at Selma in 1965 and the police raid that sparked the Stonewall uprising.",
    intro: "A newsroom where three movements meet on the wire. A front page has been corrupted: VOTING RIGHTS ACT SIGNED 2065. Off by a century. Somebody fix the typewriter.",
    guide: { name: "Reporter Dee Marlowe", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Reporter Dee", x: 12, y: 84, art: "person", color: "#2d6b7a", look: "A reporter with three deadlines and one pencil. Composite fictional guide.", talk: "g0" },
      { id: "huerta", name: "Dolores Huerta", x: 29, y: 74, art: "person", color: "#8a3a2a", look: "Dolores Huerta, labor organizer and co-founder of the National Farm Workers Association.", talk: "h0" },
      { id: "selma", name: "Selma wire photo", x: 45, y: 70, art: "board", look: "Marchers on the Edmund Pettus Bridge, March 7, 1965.", talk: "s0" },
      { id: "stonewall", name: "Stonewall wire report", x: 60, y: 70, art: "board", look: "June 28, 1969: patrons of the Stonewall Inn resisted a police raid.", talk: "st0" },
      { id: "type", name: "Typewriter desk", x: 74, y: 84, art: "desk", look: "A typewriter and a fresh ribbon.", take: "ribbon", takeText: "Tux takes the ribbon. Ready to print the correct year." },
      { id: "front", name: "Corrupted front page", x: 50, y: 94, art: "glitch", look: "VOTING RIGHTS ACT SIGNED 2065. That is a typo of historic proportions." },
      TERM("Terminal: RIGHTS_DAEMON awaiting accurate headline."),
    ],
    dialogue: {
      g0: { speaker: "Reporter Dee", kind: "invented", text: "Farm fields, a bridge, a bar in New York. Different places, same question: who gets full rights?", choices: [{ label: "Fix the headline how?", next: "g1" }, { label: "Bye.", next: null }] },
      g1: { speaker: "Reporter Dee", kind: "invented", text: "Retype it. The ribbon is on the typewriter desk.", choices: [{ label: "Close", next: null }] },
      h0: { speaker: "Dolores Huerta", kind: "invented", text: "Organizing is patient work. One house meeting, then another.", choices: [{ label: "Your famous slogan?", next: "h1" }] },
      h1: { speaker: "Record summary", kind: "summary", text: "Huerta popularized the rallying cry 'Si se puede' (Yes, it can be done) during a 1972 fast in Arizona. She co-founded the NFWA with Cesar Chavez in 1962.", choices: [{ label: "Close", next: null }] },
      s0: { speaker: "Record summary", kind: "summary", text: "State troopers attacked peaceful voting-rights marchers, including John Lewis. Televised images shocked the nation; the Voting Rights Act was signed August 6, 1965.", choices: [{ label: "Close", next: null }] },
      st0: { speaker: "Record summary", kind: "summary", text: "Days of protest followed the raid. Activists including Marsha P. Johnson and Sylvia Rivera became associated with the era; the first pride marches took place in 1970.", choices: [{ label: "Close", next: null }] },
    },
    puzzle: { item: "ribbon", target: "front", success: "Tux retypes: VOTING RIGHTS ACT SIGNED, AUGUST 6, 1965. RIGHTS_DAEMON started.", wrong: "That will not reprint a headline." },
    hints: [
      "The headline has the wrong year. You need to reprint it.",
      "The typewriter desk has what a printing typewriter needs.",
      "Take the Typewriter ribbon from the Typewriter desk, select it, and Use it on the Corrupted front page.",
    ],
    quiz: {
      prompt: "PATCH 7/9 > When did the Voting Rights Act become law?",
      options: ["August 1965, months after the Selma marches", "July 1776", "June 1969", "1947"],
      correct: 0,
      explain: "Signed August 6, 1965, after the Selma to Montgomery marches.",
    },
    sourceId: "rights",
    discussion: [
      "How did nonviolent protest at Selma influence federal law?",
      "What tactics did farmworker organizers like Huerta use?",
      "Why is Stonewall remembered as a turning point?",
    ],
  },
  {
    id: "space",
    num: 8,
    title: "Check the Math",
    years: "1943-1986",
    place: "NACA / NASA Langley, Hampton, Virginia",
    module: "ORBIT_MATH.o",
    sky: ["#1f2a52", "#3f4f86"],
    far: "#2e3a66",
    mid: "#46527e",
    ground: "#8a90a8",
    accent: "#f2c14e",
    intro: "Langley, 1962. John Glenn launches soon. The IBM 7090 has been hit by the glitch: it is displaying a modern update screen. Dorothy Vaughan would know what to do.",
    guide: { name: "Technician Rae Holloway", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Technician Rae", x: 12, y: 84, art: "person", color: "#f2c14e", look: "A technician with punch cards in every pocket. Composite fictional guide.", talk: "g0" },
      { id: "johnson", name: "Katherine Johnson", x: 30, y: 74, art: "person", color: "#5a3a5a", look: "Katherine Johnson, mathematician who calculated flight trajectories.", talk: "k0" },
      { id: "vaughan", name: "Dorothy Vaughan", x: 46, y: 74, art: "person", color: "#2f6a6a", look: "Dorothy Vaughan, supervisor of West Area Computing.", talk: "v0" },
      { id: "shelf", name: "Manual shelf", x: 62, y: 74, art: "shelf", look: "Programming manuals.", take: "fortran", takeText: "Tux takes the FORTRAN manual. Finally, a language he can debug." },
      { id: "ibm", name: "Glitched IBM 7090", x: 76, y: 86, art: "glitch", look: "The mainframe says: INSTALLING UPDATE 1 OF 4,071. Do not turn off your computer. In 1962. Unacceptable." },
      { id: "dean", name: "Later connection: Mark Dean", x: 46, y: 95, art: "board", look: "Later connection, not 1962: in the 1980s IBM engineer Mark Dean co-developed technology for the IBM PC, and in 1999 led a team that built a gigahertz chip." },
      TERM("Terminal: ORBIT_MATH awaiting correct program."),
    ],
    dialogue: {
      g0: { speaker: "Technician Rae", kind: "invented", text: "The machine is fast but it still needs people who understand it.", choices: [{ label: "Close", next: null }] },
      k0: { speaker: "Katherine Johnson", kind: "invented", text: "Numbers tell you where a spacecraft will be. I check them until I am sure.", choices: [{ label: "John Glenn asked for you?", next: "k1" }] },
      k1: { speaker: "Record summary", kind: "summary", text: "Before his 1962 orbital flight, Glenn asked that Johnson verify the electronic computer's trajectory calculations. She later worked on Apollo, and received the Presidential Medal of Freedom in 2015.", choices: [{ label: "Close", next: null }] },
      v0: { speaker: "Dorothy Vaughan", kind: "invented", text: "When the machines came, I learned FORTRAN and taught my team. Nobody gets left behind.", choices: [{ label: "The 7090 is glitching.", next: "v1" }] },
      v1: { speaker: "Dorothy Vaughan", kind: "invented", text: "Then reprogram it properly. The manual is on the shelf.", choices: [{ label: "Yes ma'am.", next: null }] },
    },
    puzzle: { item: "fortran", target: "ibm", success: "Tux follows the manual. The 7090 runs the trajectory program. ORBIT_MATH linked.", wrong: "The mainframe needs a program in its own language." },
    hints: [
      "The mainframe needs a correct program, written in the language of its era.",
      "Dorothy Vaughan mentions a manual on the shelf.",
      "Take the FORTRAN manual from the Manual shelf, select it, and Use it on the Glitched IBM 7090.",
    ],
    quiz: {
      prompt: "PATCH 8/9 > How is Mark Dean connected to this chapter?",
      options: ["As a later 1980s connection: he co-developed IBM PC technology", "He programmed the 1962 Glenn mission", "He supervised West Area Computing", "He built the IBM 7090 in 1943"],
      correct: 0,
      explain: "Dean's work came decades later; he is a later connection in computing history.",
    },
    sourceId: "nasa",
    discussion: [
      "Why did Dorothy Vaughan teach her team FORTRAN?",
      "Why would an astronaut trust a person to check a computer?",
      "How does Mark Dean's later work connect to the story of computing?",
    ],
  },
  {
    id: "museum",
    num: 9,
    title: "The Codex",
    years: "Present day",
    place: "A community history museum",
    module: "CODEX_MAIN.o",
    sky: ["#efe4d0", "#d9c6a4"],
    far: "#c8b28a",
    mid: "#8a6f52",
    ground: "#b48a5a",
    accent: "#e2603a",
    intro: "Present day. The time machine coasts into a museum after hours. The curator has an empty case labeled CODEX. Eight modules, eight stories. Time to put the record together.",
    guide: { name: "Curator Imani Reyes-Whitfield", role: "Composite fictional guide" },
    hotspots: [
      { id: "guide", name: "Curator Imani", x: 14, y: 84, art: "person", color: "#e2603a", look: "The curator, holding a coffee and a label maker. Composite fictional guide.", talk: "g0" },
      { id: "labels", name: "Label drawer", x: 32, y: 80, art: "crate", look: "Blank exhibit labels.", take: "labels", takeText: "Tux takes blank exhibit labels." },
      { id: "machine", name: "Module rack", x: 50, y: 76, art: "shelf", look: "The time machine's eight repaired modules, ready to be bundled.", take: "modules", takeText: "Tux unplugs the eight modules into a bundle. The machine sighs." },
      { id: "case", name: "Empty Codex case", x: 68, y: 78, art: "case", look: "A glass case labeled CODEX. Empty, for now." },
      TERM("Terminal: CODEX_MAIN.o: final link step pending."),
    ],
    dialogue: {
      g0: { speaker: "Curator Imani", kind: "invented", text: "A museum's job is not to make history neat. It is to make it honest, with sources people can check.", choices: [{ label: "What goes in the case?", next: "g1" }, { label: "Was this reviewed by historians?", next: "g2" }] },
      g1: { speaker: "Curator Imani", kind: "invented", text: "Your modules, each with a label. Combine the labels and the modules first.", choices: [{ label: "Close", next: null }] },
      g2: { speaker: "Curator Imani", kind: "invented", text: "This game has not been reviewed by professional historians. Follow the Codex links to the institutions and read the sources yourself.", choices: [{ label: "Good practice.", next: null }] },
    },
    puzzle: { item: "codexkit", target: "case", success: "The Codex lights up: eight eras, eight sources, one honest record.", wrong: "The case needs labeled modules." },
    hints: [
      "The case needs the modules, each with a label.",
      "Take labels from the Label drawer and the bundle from the Module rack, then combine them.",
      "Select Exhibit labels, then Module bundle to combine into the Codex kit. Select the Codex kit and Use it on the Empty Codex case.",
    ],
    quiz: {
      prompt: "PATCH 9/9 > What did observer mode allow Tux to do?",
      options: ["Repair anachronisms and corrupted records, never change historical outcomes", "Change the outcome of wars", "Delete uncomfortable history", "Rewrite quotations"],
      correct: 0,
      explain: "Tux only fixed the records. History stays as it happened.",
    },
    sourceId: "wheatley",
    discussion: [
      "Which person from the game would you add to a museum exhibit, and why?",
      "What makes a source trustworthy?",
      "Whose stories are still missing from the record?",
    ],
  },
];

export const CHAPTER_SOURCES: Record<string, string[]> = {
  revolution: ["armistead", "wheatley"],
  cherokee: ["phoenix"],
  freedom: ["seneca", "douglass"],
  railroad: ["railroad"],
  immigration: ["angel", "wells"],
  ww2: ["ww2", "mendez"],
  rights: ["rights"],
  space: ["nasa"],
  museum: [],
};
