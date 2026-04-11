#!/usr/bin/env python3
"""
Regenerate the Recent Q&A section of content/index.md from the 5 most
recent files in content/Questions-and-Answers/.

Reads each Q&A file's frontmatter (date_asked, title, tags) and the first
sentence of its [!summary] callout, then rewrites the block between the
'## Recent Q&A' and '## Research Notes' headings in index.md.

Run after sync-content.sh so content/ is up to date.
"""

import re
import sys
from datetime import date
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is required: pip install pyyaml")

REPO_ROOT = Path(__file__).resolve().parent.parent
QA_DIR = REPO_ROOT / "content" / "Questions-and-Answers"
INDEX_FILE = REPO_ROOT / "content" / "index.md"

SECTION_START = "## Selected Analyses"
SECTION_END = "## Knowledge Base"


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------

def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Return (frontmatter dict, body text) or ({}, full text) on failure."""
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        return {}, text
    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return {}, text
    return fm, text[m.end():]


def extract_summary(body: str) -> str:
    """Pull the first sentence from the [!summary] callout."""
    m = re.search(r">\s*\[!summary\]\n((?:>.*\n?)+)", body)
    if not m:
        return ""
    lines = [re.sub(r"^>\s?", "", ln).strip() for ln in m.group(1).splitlines()]
    full = " ".join(ln for ln in lines if ln)
    # Strip inline LaTeX so the home page summary stays readable
    full = re.sub(r"\$[^$]+\$", "", full).strip()
    # Take up to the first sentence break (at least 60 chars so we don't
    # cut at a trivial abbreviation)
    sentence = re.match(r"(.{60,}?[.!?])(?:\s|$)", full)
    if sentence:
        return sentence.group(1)
    # Fall back: first 280 chars, break at a word boundary
    if len(full) > 280:
        return full[:280].rsplit(" ", 1)[0] + "..."
    return full


def format_topics(tags: list[str]) -> str:
    """Convert ['topic/bayesian-statistics', 'type/qa'] → 'Bayesian Statistics'."""
    topics = [
        t[len("topic/"):].replace("-", " ").title()
        for t in tags
        if t.startswith("topic/")
    ]
    return " · ".join(topics) if topics else "General"


def parse_qa_file(path: Path) -> dict | None:
    """Return a metadata dict for one Q&A file, or None if unparseable."""
    text = path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(text)

    date_asked = fm.get("date_asked")
    if not date_asked:
        return None
    # PyYAML may parse YAML dates as datetime.date already
    if not isinstance(date_asked, date):
        try:
            date_asked = date.fromisoformat(str(date_asked))
        except ValueError:
            return None

    raw_title = fm.get("title", path.stem)
    # Strip leading "Q: " / "Q - " artefacts from the title
    display_title = re.sub(r"^Q[:\-]\s*", "", raw_title, flags=re.IGNORECASE).strip()
    # Sentence-case if the title is ALL CAPS or starts lowercase
    if display_title and display_title[0].islower():
        display_title = display_title[0].upper() + display_title[1:]

    return {
        "stem": path.stem,           # used for the wikilink
        "title": display_title,
        "date": date_asked,
        "topics": format_topics(fm.get("tags", [])),
        "summary": extract_summary(body),
    }


# ---------------------------------------------------------------------------
# Formatting
# ---------------------------------------------------------------------------

def format_date(d: date) -> str:
    # %-d removes the leading zero on macOS/Linux; fall back gracefully
    try:
        return d.strftime("%B %-d, %Y")
    except ValueError:
        return d.strftime("%B %d, %Y").replace(" 0", " ")


def render_entry(entry: dict) -> str:
    lines = [
        f"### [[{entry['stem']}|{entry['title']}]]",
        f"*{format_date(entry['date'])} · {entry['topics']}*",
        "",
        entry["summary"],
        "",
        "---",
        "",
    ]
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Index update
# ---------------------------------------------------------------------------

def update_index(entries: list[dict]) -> None:
    text = INDEX_FILE.read_text(encoding="utf-8")

    new_block_lines = [SECTION_START, ""]
    for entry in entries:
        new_block_lines.append(render_entry(entry))
    new_block = "\n".join(new_block_lines) + "\n\n"

    pattern = re.compile(
        rf"{re.escape(SECTION_START)}.*?(?={re.escape(SECTION_END)})",
        re.DOTALL,
    )
    if not pattern.search(text):
        sys.exit(
            f"Could not find '{SECTION_START}' … '{SECTION_END}' markers in index.md"
        )

    updated = pattern.sub(new_block, text)
    INDEX_FILE.write_text(updated, encoding="utf-8")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    if not QA_DIR.is_dir():
        sys.exit(f"Q&A directory not found: {QA_DIR}")

    qa_files = [f for f in QA_DIR.glob("*.md") if f.name != "_Index.md"]
    entries = [e for f in qa_files if (e := parse_qa_file(f)) is not None]

    if not entries:
        print("No Q&A files found — index.md left unchanged.")
        return

    entries.sort(key=lambda e: e["date"], reverse=True)
    top5 = entries[:5]

    update_index(top5)

    print(f"Updated index.md with {len(top5)} Q&A entries:")
    for e in top5:
        print(f"  {e['date']}  {e['title']}")


if __name__ == "__main__":
    main()
