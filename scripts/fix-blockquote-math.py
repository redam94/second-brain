#!/usr/bin/env python3
"""
Normalize display-math fences so KaTeX/remark-math renders them reliably.

Two distinct failure modes are fixed:

1. Single-line display math.  remark-math can treat a single-line
   $$equation$$  as an inline token, rendering it in inline mode where
   \\tag{} (and environments like aligned) are not allowed.

       $$equation \tag{label}$$        -> $$\n equation \tag{label} \n$$
       > $$equation \tag{label}$$       -> > $$\n > equation \tag{label} \n > $$

2. Multi-line "glued" fences.  When the opening $$ has content on the same
   line (e.g. `$$\\begin{aligned}`), remark-math drops the \\begin and
   swallows the closing $$, producing invalid LaTeX.  A glued closing fence
   (`\\end{aligned}$$`) likewise fails to close the block, so consecutive
   blocks lose the one in the middle.  Both fences must sit on their own line:

       $$\\begin{aligned}     ->   $$
       ...                          \\begin{aligned}
       \\end{aligned}$$             ...
                                    \\end{aligned}
                                    $$

Idempotent: fences already on their own line are untouched.
Run after sync-content.sh, before the Quartz build.
"""

import sys
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Matches:  > [optional spaces] $$ <content> $$ [optional trailing space]
# on a single blockquote line. Non-greedy, no re.DOTALL.
_BLOCKQUOTE_SINGLE_LINE = re.compile(r'^(>\s*)\$\$(.+?)\$\$[ \t]*$', re.MULTILINE)

# Matches a plain (non-blockquote) single-line display math block.
# The line must start with $$ (after optional leading whitespace) and end with $$.
_PLAIN_SINGLE_LINE = re.compile(r'^([ \t]*)\$\$([^>].+?)\$\$[ \t]*$', re.MULTILINE)


def _split_glued_fences(text: str) -> str:
    """Put glued multi-line $$ fences onto their own line.

    Only touches lines that contain exactly one `$$` with content glued to it
    (an opener `$$<content>` or a closer `<content>$$`). Lines that are a bare
    fence, hold a complete single-line block (two `$$`), or have no `$$` are
    left untouched, which keeps the pass idempotent.
    """
    out: list[str] = []
    for line in text.split("\n"):
        # Preserve a leading blockquote / indentation prefix so the split
        # fence keeps the same nesting (e.g. "> " or "    ").
        m = re.match(r'^(\s*(?:>\s*)?)(.*)$', line)
        prefix, body = m.group(1), m.group(2)

        if body.count("$$") != 1:
            out.append(line)
            continue

        if body.startswith("$$") and len(body) > 2:
            # Glued opener: "$$<content>"
            out.append(f"{prefix}$$")
            out.append(f"{prefix}{body[2:].strip()}")
        elif body.endswith("$$") and len(body) > 2:
            # Glued closer: "<content>$$"
            out.append(f"{prefix}{body[:-2].rstrip()}")
            out.append(f"{prefix}$$")
        else:
            out.append(line)

    return "\n".join(out)


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")

    def expand_blockquote(m: re.Match) -> str:
        prefix = m.group(1)          # e.g. "> " or ">  "
        content = m.group(2).strip()
        return f"{prefix}$$\n{prefix}{content}\n{prefix}$$"

    def expand_plain(m: re.Match) -> str:
        indent = m.group(1)          # leading whitespace, usually empty
        content = m.group(2).strip()
        return f"{indent}$$\n{indent}{content}\n{indent}$$"

    # Expand single-line blocks first, then split any remaining glued
    # multi-line fences (each pass leaves the other's output alone).
    new_text = _BLOCKQUOTE_SINGLE_LINE.sub(expand_blockquote, text)
    new_text = _PLAIN_SINGLE_LINE.sub(expand_plain, new_text)
    new_text = _split_glued_fences(new_text)
    if new_text == text:
        return False
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> None:
    if len(sys.argv) > 1:
        files = [Path(p) for p in sys.argv[1:]]
    else:
        content_dir = REPO_ROOT / "content"
        if not content_dir.is_dir():
            sys.exit(f"content/ directory not found: {content_dir}")
        files = list(content_dir.rglob("*.md"))

    changed = [f for f in files if fix_file(f)]

    if changed:
        print(f"Fixed blockquote math in {len(changed)} file(s):")
        for f in changed:
            print(f"  {f.relative_to(REPO_ROOT)}")
    else:
        print("No blockquote math fixes needed.")


if __name__ == "__main__":
    main()
