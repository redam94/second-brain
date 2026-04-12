#!/usr/bin/env python3
"""
Convert single-line blockquote display math to multi-line format.

remark-math treats  > $$equation$$  on a single line as an inline token,
causing KaTeX to render it in inline mode where \\tag{} is not allowed.

Transforms:
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
# on a single line. The content group is non-greedy and single-line only
# (no re.DOTALL), so multi-line equations are never matched.
_SINGLE_LINE = re.compile(r'^(>\s*)\$\$(.+?)\$\$[ \t]*$', re.MULTILINE)


def fix_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")

    def expand(m: re.Match) -> str:
        prefix = m.group(1)          # e.g. "> " or ">  "
        content = m.group(2).strip()
        return f"{prefix}$$\n{prefix}{content}\n{prefix}$$"

    new_text = _SINGLE_LINE.sub(expand, text)
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
