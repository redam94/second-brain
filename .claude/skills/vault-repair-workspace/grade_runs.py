#!/usr/bin/env python3
"""Grade vault-repair eval runs against assertions."""

import json
import re
from pathlib import Path

WORKSPACE = Path("/Users/redam94/Documents/second-brain/.claude/skills/vault-repair-workspace/iteration-1")


def find_md_files(directory):
    return list(Path(directory).rglob("*.md"))


def read_all_content(directory):
    content = ""
    for f in find_md_files(directory):
        content += f.read_text(errors="ignore") + "\n"
    return content


def grade_eval0(run_type):
    """Grade frontmatter repair."""
    outputs_dir = WORKSPACE / "eval-0-frontmatter-repair" / run_type / "outputs"
    md_files = find_md_files(outputs_dir)
    content = read_all_content(outputs_dir)

    note_files = [f for f in md_files if "_Index" not in f.name and "audit" not in f.name.lower()]
    results = []

    results.append({
        "text": "has_depends_on",
        "passed": "depends_on" in content,
        "evidence": f"depends_on found in content: {'depends_on' in content}"
    })

    results.append({
        "text": "has_used_by",
        "passed": "used_by" in content,
        "evidence": f"used_by found in content: {'used_by' in content}"
    })

    results.append({
        "text": "has_doc_type",
        "passed": "doc_type" in content,
        "evidence": f"doc_type found in content: {'doc_type' in content}"
    })

    results.append({
        "text": "has_source_location",
        "passed": "source_location" in content,
        "evidence": f"source_location found in content: {'source_location' in content}"
    })

    # Check content preservation: notes should have substantial content (>20 lines each)
    preserved = True
    short_files = []
    for f in note_files:
        lines = f.read_text(errors="ignore").strip().split("\n")
        if len(lines) < 20:
            preserved = False
            short_files.append(f"{f.name}: {len(lines)} lines")
    results.append({
        "text": "preserves_content",
        "passed": preserved and len(note_files) >= 5,
        "evidence": f"{len(note_files)} notes found. Short files: {short_files if short_files else 'none'}"
    })

    audit_files = [f for f in md_files if "audit" in f.name.lower()]
    results.append({
        "text": "has_audit_report",
        "passed": len(audit_files) > 0,
        "evidence": f"Audit report files: {[f.name for f in audit_files]}"
    })

    return results


def grade_eval1(run_type):
    """Grade orphan processing."""
    outputs_dir = WORKSPACE / "eval-1-orphan-processing" / run_type / "outputs"
    md_files = find_md_files(outputs_dir)
    content = read_all_content(outputs_dir)

    note_files = [f for f in md_files if "_Index" not in f.name and "audit" not in f.name.lower()]

    results = []

    results.append({
        "text": "creates_multiple_notes",
        "passed": len(note_files) >= 3,
        "evidence": f"Created {len(note_files)} notes: {[f.name for f in note_files]}"
    })

    has_formal = bool(re.search(r'>\s*\[!(definition|theorem|example)\]', content, re.IGNORECASE))
    results.append({
        "text": "has_formal_callouts",
        "passed": has_formal,
        "evidence": f"Found formal callouts (definition/theorem/example): {has_formal}"
    })

    has_depends = "depends_on" in content
    has_used_by = "used_by" in content
    has_doc_type = "doc_type" in content
    has_source_loc = "source_location" in content
    all_fm = has_depends and has_used_by and has_doc_type
    results.append({
        "text": "has_full_frontmatter",
        "passed": all_fm,
        "evidence": f"depends_on: {has_depends}, used_by: {has_used_by}, doc_type: {has_doc_type}, source_location: {has_source_loc}"
    })

    # Check for links to existing vault concepts
    existing_concepts = ["Bayesian", "MCMC", "ADVI", "prior", "posterior", "latent", "hierarchical"]
    links_found = []
    for concept in existing_concepts:
        if re.search(rf'\[\[.*{concept}.*\]\]', content, re.IGNORECASE):
            links_found.append(concept)
    results.append({
        "text": "links_to_existing_vault",
        "passed": len(links_found) >= 2,
        "evidence": f"Found wikilinks referencing: {links_found}"
    })

    return results


def grade_eval2(run_type):
    """Grade full audit."""
    outputs_dir = WORKSPACE / "eval-2-full-audit" / run_type / "outputs"
    audit_files = list(outputs_dir.rglob("audit*.md"))

    if not audit_files:
        return [
            {"text": "identifies_orphaned_raws", "passed": False, "evidence": "No audit report found"},
            {"text": "identifies_missing_frontmatter", "passed": False, "evidence": "No audit report found"},
            {"text": "structured_report", "passed": False, "evidence": "No audit report found"},
        ]

    content = audit_files[0].read_text(errors="ignore")
    results = []

    has_orphan = bool(re.search(r'(orphan|unprocessed|no.*corresponding|no.*processed|no.*note)', content, re.IGNORECASE))
    results.append({
        "text": "identifies_orphaned_raws",
        "passed": has_orphan,
        "evidence": f"Mentions orphaned/unprocessed raw files: {has_orphan}"
    })

    has_fm = bool(re.search(r'(depends_on|used_by|doc_type|source_location|missing.*front|front.*missing|enhanced)', content, re.IGNORECASE))
    results.append({
        "text": "identifies_missing_frontmatter",
        "passed": has_fm,
        "evidence": f"Identifies missing enhanced frontmatter: {has_fm}"
    })

    has_sections = content.count("#") >= 3
    has_counts = bool(re.search(r'\d+\s*(notes?|files?|missing|broken|found)', content, re.IGNORECASE))
    structured = has_sections and has_counts
    results.append({
        "text": "structured_report",
        "passed": structured,
        "evidence": f"Has sections: {has_sections} (count: {content.count('#')}), has counts: {has_counts}"
    })

    return results


def save_grading(eval_dir, run_type, results):
    grading = {"expectations": results}
    out_path = WORKSPACE / eval_dir / run_type / "grading.json"
    out_path.write_text(json.dumps(grading, indent=2))
    print(f"  Saved {out_path}")


def main():
    for eval_name, grade_fn in [
        ("eval-0-frontmatter-repair", grade_eval0),
        ("eval-1-orphan-processing", grade_eval1),
        ("eval-2-full-audit", grade_eval2),
    ]:
        print(f"\n=== {eval_name} ===")
        for run_type in ["with_skill", "without_skill"]:
            print(f"\n  {run_type}:")
            results = grade_fn(run_type)
            for r in results:
                status = "PASS" if r["passed"] else "FAIL"
                print(f"    [{status}] {r['text']}: {r['evidence']}")
            save_grading(eval_name, run_type, results)

    print("\n=== Summary ===")
    for run_type in ["with_skill", "without_skill"]:
        total = passed = 0
        for eval_dir in ["eval-0-frontmatter-repair", "eval-1-orphan-processing", "eval-2-full-audit"]:
            data = json.loads((WORKSPACE / eval_dir / run_type / "grading.json").read_text())
            for e in data["expectations"]:
                total += 1
                passed += int(e["passed"])
        print(f"  {run_type}: {passed}/{total} passed ({100*passed/total:.0f}%)")


if __name__ == "__main__":
    main()
