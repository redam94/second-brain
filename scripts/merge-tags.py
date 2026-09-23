#!/usr/bin/env python3
"""
Merge near-duplicate tags in vault frontmatter (Research/, Questions-and-Answers/, Clippings/).

Only the `tags:` list in YAML frontmatter is rewritten, line by line, so the rest of each
note keeps its formatting. A note that ends up with the same tag twice keeps one copy.
Run with --dry-run to preview. Extend MERGES when new duplicates appear.
"""

import re
import sys
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
VAULT_FOLDERS = ["Research", "Questions-and-Answers", "Clippings"]

MERGES = {
    # Synonyms and abbreviations
    "topic/llm": "topic/large-language-models",
    "topic/market-response-models": "topic/market-response",
    "topic/bayesian": "topic/bayesian-statistics",
    "topic/bayesian-inference": "topic/bayesian-statistics",
    "topic/multilevel-models": "topic/hierarchical-models",
    "topic/ab-testing": "topic/online-experimentation",
    "topic/experiments": "topic/experimental-design",
    "topic/asymptotic-theory": "topic/asymptotics",
    "topic/statistical-power": "topic/power-analysis",
    "topic/time-to-event": "topic/survival-analysis",
    "topic/imputation": "topic/multiple-imputation",
    "topic/model-selection": "topic/model-comparison",
    "topic/evaluation": "topic/model-evaluation",
    "topic/bonferroni": "topic/multiple-comparisons",
    "topic/generative-agents": "topic/llm-agents",
    "topic/marketing-science": "topic/marketing",
    "topic/marketing-management": "topic/marketing",
    # Same concept split across namespaces: method/ is for software and named algorithms
    "method/bayesian": "topic/bayesian-statistics",
    "method/mcmc": "topic/mcmc",
    "method/discrete-choice": "topic/discrete-choice",
    "method/random-utility": "topic/discrete-choice",
    "method/factor-analysis": "topic/factor-analysis",
    "topic/stan": "method/stan",
    # Casing
    "topic/ARIMA": "topic/arima",
    "topic/VAR": "topic/var",
}

FRONTMATTER = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
TAG_ITEM = re.compile(r"^(\s*-\s*)([\"']?)([^\"'\s]+)\2\s*$")


def rewrite_tags(frontmatter: str, changes: Counter) -> str:
    out, in_tags, seen = [], False, set()
    for line in frontmatter.split("\n"):
        if re.match(r"^tags:\s*$", line):
            in_tags, seen = True, set()
            out.append(line)
            continue
        inline = re.match(r"^tags:\s*\[(.*)\]\s*$", line)
        if inline:
            tags = [t.strip().strip("\"'") for t in inline.group(1).split(",") if t.strip()]
            merged = []
            for t in tags:
                new = MERGES.get(t, t)
                if new != t:
                    changes[f"{t} -> {new}"] += 1
                if new not in merged:
                    merged.append(new)
            out.append(f"tags: [{', '.join(merged)}]")
            continue
        if in_tags:
            item = TAG_ITEM.match(line)
            if item:
                prefix, quote, tag = item.groups()
                new = MERGES.get(tag, tag)
                if new != tag:
                    changes[f"{tag} -> {new}"] += 1
                if new in seen:
                    continue  # duplicate after merging
                seen.add(new)
                out.append(f"{prefix}{quote}{new}{quote}")
                continue
            in_tags = False
        out.append(line)
    return "\n".join(out)


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    changes, touched = Counter(), 0
    for folder in VAULT_FOLDERS:
        for path in (REPO_ROOT / folder).rglob("*.md"):
            text = path.read_text(encoding="utf-8")
            m = FRONTMATTER.match(text)
            if not m:
                continue
            updated = rewrite_tags(m.group(1), changes)
            if updated != m.group(1):
                touched += 1
                if not dry_run:
                    path.write_text(f"---\n{updated}\n---\n" + text[m.end():], encoding="utf-8")
    for change, n in sorted(changes.items()):
        print(f"{n:4d}  {change}")
    print(f"{'Would update' if dry_run else 'Updated'} {touched} notes.")


if __name__ == "__main__":
    main()
