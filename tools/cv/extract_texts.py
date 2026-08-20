"""Extract text from a PDF with each Python library and write one dump per library.

Usage: uv run python extract_texts.py <pdf> <out_dir> <tag>
Writes <out_dir>/<lib>_<tag>.txt
"""

import sys
from pathlib import Path


def main() -> None:
    pdf, out_dir, tag = sys.argv[1], Path(sys.argv[2]), sys.argv[3]
    out_dir.mkdir(parents=True, exist_ok=True)
    
    from pypdf import PdfReader

    text = "\n".join(page.extract_text() or "" for page in PdfReader(pdf).pages)
    (out_dir / f"pypdf_{tag}.txt").write_text(text)

    import pdfplumber

    with pdfplumber.open(pdf) as doc:
        text = "\n".join(page.extract_text() or "" for page in doc.pages)
    (out_dir / f"pdfplumber_{tag}.txt").write_text(text)

    from pdfminer.high_level import extract_text

    (out_dir / f"pdfminer_{tag}.txt").write_text(extract_text(pdf))


if __name__ == "__main__":
    main()
