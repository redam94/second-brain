#!/usr/bin/env python3
"""
Fix partial-path wikilinks to _Index files in content/.

With markdownLinkResolution: "shortest", Quartz slugifies the wikilink text
to produce the href.  A link like:

    [[Bayesian Statistics/_Index|Bayesian Statistics]]

generates href  /Bayesian-Statistics/_Index  but the page lives at
/Research/Bayesian-Statistics/_Index.

Algorithm
---------
1. Walk content/ and record the full path (relative to content/) for every
   _Index.md file.
2. For each full path, generate every shorter suffix that could appear as a
   wikilink (e.g. "Bayesian Statistics/_Index" for a file at
   "Research/Bayesian Statistics/_Index").
3. Discard any short form that maps to more than one full path (ambiguous —
   leave those links alone).
4. Rewrite wikilinks in every .md file whose path matches a short form.

Idempotent: links already using the full path are not touched.
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = REPO_ROOT / "content"

# Captures [[ and the link path, stopping before |, \|, #, or ]]
# Group 1 = "[["   Group 2 = path text
_WIKILINK_PATH = re.compile(r"(\[\[)([^\]#|\\]+?)(?=[#|\\]|\]\])")


def build_mapping(content_dir: Path) -> dict[str, str]:
    """
    Return {short_form: full_path} for every unambiguous _Index short form.

    A short form is any suffix of the full path that:
      - has at least one parent directory (i.e. not bare "_Index")
      - is shorter than the full path
      - is not shared by two or more _Index files
    """
    # short_form -> list of full paths that share it
    candidates: dict[str, list[str]] = {}

    for f in sorted(content_dir.rglob("_Index.md")):
        full = f.relative_to(content_dir).with_suffix("").as_posix()
        parts = Path(full).parts  # e.g. ('Research', 'Bayesian Statistics', '_Index')

        # Generate suffixes of length 2..len-1 (skip full path and bare '_Index')
        for i in range(1, len(parts) - 1):
            short = "/".join(parts[i:])
            candidates.setdefault(short, []).append(full)

    mapping = {
        short: paths[0]
        for short, paths in candidates.items()
        if len(paths) == 1
    }

    return mapping


def fix_file(path: Path, mapping: dict[str, str]) -> bool:
    text = path.read_text(encoding="utf-8")

    def rewrite(m: re.Match) -> str:
        link_path = m.group(2).strip()
        full = mapping.get(link_path)
        if full:
            return m.group(1) + full  # '[[' + corrected path
        return m.group(0)

    new_text = _WIKILINK_PATH.sub(rewrite, text)
    if new_text == text:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    if not CONTENT_DIR.is_dir():
        sys.exit(f"content/ not found: {CONTENT_DIR}")

    mapping = build_mapping(CONTENT_DIR)
    if not mapping:
        print("No _Index path mappings found — nothing to fix.")
        return

    # Show ambiguous cases so the author knows which links can't be auto-fixed
    all_candidates: dict[str, list[str]] = {}
    for f in CONTENT_DIR.rglob("_Index.md"):
        full = f.relative_to(CONTENT_DIR).with_suffix("").as_posix()
        parts = Path(full).parts
        for i in range(1, len(parts) - 1):
            short = "/".join(parts[i:])
            all_candidates.setdefault(short, []).append(full)

    ambiguous = {s: ps for s, ps in all_candidates.items() if len(ps) > 1}
    if ambiguous:
        print(f"Skipping {len(ambiguous)} ambiguous short form(s) (use full path manually):")
        for short, paths in sorted(ambiguous.items()):
            print(f"  [[{short}]] → could be: {', '.join(paths)}")

    print(f"\nApplying {len(mapping)} unambiguous path prefix fix(es)...")

    files = list(CONTENT_DIR.rglob("*.md"))
    changed = [f for f in files if fix_file(f, mapping)]

    if changed:
        print(f"Fixed _Index links in {len(changed)} file(s):")
        for f in changed:
            print(f"  {f.relative_to(REPO_ROOT)}")
    else:
        print("No _Index link fixes needed.")


if __name__ == "__main__":
    main()
