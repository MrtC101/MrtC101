/**
 * ATS-parseability harness.
 *
 * For each language, extracts the CV PDF's text with several libraries
 * (pdf.js here, pypdf/pdfplumber/pdfminer via tools/cv, pdftotext if
 * installed), dumps each result to tests/ats/output/ for manual review,
 * then checks that every sentence from the source YAML appears
 * contiguously in each dump (a date or duration spliced mid-sentence
 * breaks contiguity and fails the check).
 *
 * Run with: bun run ats
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const ROOT = join(import.meta.dir, "../..");
const OUT = join(import.meta.dir, "output");
const LANGS = ["en", "es"];

const stripMd = (s: string) =>
  s.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*|\*/g, "");

/** Lowercase and keep only letters/digits, so hyphenation, line breaks and
 *  punctuation differences between extractors don't cause false failures. */
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

const words = (s: string) =>
  s
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 3);

interface Needle {
  label: string;
  text: string;
}

function needlesFrom(yamlPath: string): Needle[] {
  const cv = parse(readFileSync(yamlPath, "utf8")).cv;
  const needles: Needle[] = [
    { label: "name", text: cv.name },
    { label: "email", text: cv.email },
    { label: "headline", text: cv.headline },
    { label: "location", text: cv.location },
  ];
  for (const [section, entries] of Object.entries(cv.sections) as [string, any[]][]) {
    entries.forEach((e, i) => {
      const at = `${section}[${i}]`;
      if (typeof e === "string") needles.push({ label: at, text: e });
      if (e.company) needles.push({ label: `${at}.company`, text: e.company });
      if (e.position) needles.push({ label: `${at}.position`, text: e.position });
      if (e.institution) needles.push({ label: `${at}.institution`, text: e.institution });
      if (e.area) needles.push({ label: `${at}.area`, text: e.area });
      if (e.details) needles.push({ label: `${at}.details`, text: e.details });
      if (e.bullet) needles.push({ label: `${at}.bullet`, text: e.bullet });
      if (e.summary)
        // check summary sentence by sentence: extractors are allowed to
        // wrap lines, not to interleave foreign text between sentences
        String(e.summary)
          .split(/(?<=\.)\s+/)
          .filter((s: string) => s.trim())
          .forEach((s: string, j: number) =>
            needles.push({ label: `${at}.summary.${j}`, text: s }),
          );
      (e.highlights ?? []).forEach((h: string, j: number) =>
        needles.push({ label: `${at}.highlights[${j}]`, text: h }),
      );
    });
  }
  return needles.map((n) => ({ ...n, text: stripMd(String(n.text)) }));
}

async function pdfjsExtract(pdfPath: string): Promise<string> {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await getDocument({ data: new Uint8Array(readFileSync(pdfPath)) }).promise;
  let text = "";
  for (let p = 1; p <= doc.numPages; p++) {
    const content = await (await doc.getPage(p)).getTextContent();
    for (const item of content.items as any[]) {
      text += item.str + (item.hasEOL ? "\n" : " ");
    }
    text += "\n";
  }
  return text;
}

mkdirSync(OUT, { recursive: true });
let failed = false;

for (const lang of LANGS) {
  const pdf = join(ROOT, `public/Martin_Cogo_CV_${lang}.pdf`);
  const yaml = join(ROOT, `src/assets/cv_${lang}.yaml`);

  writeFileSync(join(OUT, `pdfjs_${lang}.txt`), await pdfjsExtract(pdf));

  const py = Bun.spawnSync(
    ["uv", "run", "python", "extract_texts.py", pdf, OUT, lang],
    { cwd: join(ROOT, "tools/cv") },
  );
  if (py.exitCode !== 0) throw new Error(py.stderr.toString());

  const poppler = Bun.spawnSync(["pdftotext", pdf, join(OUT, `pdftotext_${lang}.txt`)]);
  if (poppler.exitCode !== 0) console.warn("pdftotext not available, skipping");

  const needles = needlesFrom(yaml);
  console.log(`\n=== ${lang} — ${needles.length} needles ===`);
  for (const file of readdirSync(OUT).filter((f) => f.endsWith(`_${lang}.txt`)).sort()) {
    const raw = readFileSync(join(OUT, file), "utf8");
    const haystack = norm(raw);
    const missing = needles.filter((n) => !haystack.includes(norm(n.text)));
    const lib = file.replace(`_${lang}.txt`, "").padEnd(12);

    // Word integrity: whole words must survive as standalone tokens, so text
    // extracted without spaces ("Inventedamobileapplication...") fails even
    // though the space-stripped contiguity check above can't see it. The
    // threshold tolerates a few words lost to legitimate de-hyphenation.
    const tokens = new Set(words(raw));
    const expected = [...new Set(needles.flatMap((n) => words(n.text)))];
    const found = expected.filter((w) => tokens.has(w));
    const ratio = found.length / expected.length;
    const wordsOk = ratio >= 0.95;

    if (missing.length === 0 && wordsOk) {
      console.log(
        `  ${lib} PASS (${needles.length}/${needles.length}, words ${found.length}/${expected.length})`,
      );
    } else {
      failed = true;
      console.log(`  ${lib} FAIL (${needles.length - missing.length}/${needles.length})`);
      for (const m of missing)
        console.log(`      missing ${m.label}: "${m.text.slice(0, 70)}"`);
      if (!wordsOk)
        console.log(
          `      word integrity ${(ratio * 100).toFixed(1)}% — sample lost words: ${expected
            .filter((w) => !tokens.has(w))
            .slice(0, 8)
            .join(", ")}`,
        );
    }
  }
}

process.exit(failed ? 1 : 0);
