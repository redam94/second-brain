#!/usr/bin/env python3
"""
Convert single-line display math to multi-line format.

remark-math can treat a single-line  $$equation$$  as an inline token,
causing KaTeX to render it in inline mode where \\tag{} is not allowed.
This affects both plain paragraphs and blockquote lines.

Transforms:
    $$equation \tag{label}$$
to:
    $$
    equation \tag{label}
    $$

And similarly for blockquote-prefixed lines:
    > $$equation \tag{label}$$
to:
    > $$
    > equation \tag{label}
    > $$

Idempotent: already-multiline equations are untouched.
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

    new_text = _BLOCKQUOTE_SINGLE_LINE.sub(expand_blockquote, text)
    new_text = _PLAIN_SINGLE_LINE.sub(expand_plain, new_text)
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
