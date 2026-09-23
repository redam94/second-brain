#!/usr/bin/env python3
"""
Turn links into raw/ source folders into plain text in content/.

raw/ folders (source PDFs and clippings) are excluded from the published site via
ignorePatterns, so wikilinks to them would 404. The vault keeps the links for Obsidian;
only the synced copy in content/ is rewritten. Frontmatter is left alone (not rendered).
"""

import re
from pathlib import Path

CONTENT_DIR = Path(__file__).resolve().parent.parent / "content"

# [[path/raw/file.pdf|alias]], ![[raw/file.pdf]] and [text](../raw/file.pdf)
WIKILINK = re.compile(r"!?\[\[((?:[^\]|]*/)?raw/[^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]")
MDLINK = re.compile(r"!?\[([^\]]*)\]\((?:[^)\s]*/)?raw/[^)\s]+\)")
FRONTMATTER = re.compile(r"\A---\n.*?\n---\n", re.DOTALL)


def label(match: re.Match) -> str:
    target, alias = match.group(1), match.group(2)
    return alias or Path(target).stem


def main() -> None:
    files = links = 0
    for path in CONTENT_DIR.rglob("*.md"):
        if "raw" in path.relative_to(CONTENT_DIR).parts:
            continue
        text = path.read_text(encoding="utf-8")
        fm = FRONTMATTER.match(text)
        head, body = (text[: fm.end()], text[fm.end():]) if fm else ("", text)
        body, n1 = WIKILINK.subn(label, body)
        body, n2 = MDLINK.subn(lambda m: m.group(1), body)
        if n1 or n2:
            files += 1
            links += n1 + n2
            path.write_text(head + body, encoding="utf-8")
    print(f"Unlinked {links} raw/ references in {files} files.")


if __name__ == "__main__":
    main()
