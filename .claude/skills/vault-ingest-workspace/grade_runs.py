#!/usr/bin/env python3
"""Grade vault-ingest eval runs against assertions."""

import json
import os
import re
from pathlib import Path

WORKSPACE = Path("/Users/redam94/Documents/second-brain/.claude/skills/vault-ingest-workspace/iteration-1")


def find_md_files(directory):
    """Find all .md files recursively."""
    return list(Path(directory).rglob("*.md"))


def find_base_files(directory):
    """Find all .base files recursively."""
    return list(Path(directory).rglob("*.base"))


def read_all_content(directory):
    """Read all .md file contents concatenated."""
    content = ""
    for f in find_md_files(directory):
        content += f.read_text(errors="ignore") + "\n"
    return content


def grade_eval0(run_type):
    """Grade BDA3 textbook ingest."""
    outputs_dir = WORKSPACE / "eval-0-bda3-textbook" / run_type / "outputs"
    md_files = find_md_files(outputs_dir)
    base_files = find_base_files(outputs_dir)
    content = read_all_content(outputs_dir)

    # Filter out index files for note count
    note_files = [f for f in md_files if "_Index" not in f.name and "_Vault_Index" not in f.name]

    results = []

    # 1. has_theorem_callouts
    has_theorem = bool(re.search(r'>\s*\[!theorem\]', content, re.IGNORECASE))
    results.append({
        "text": "has_theorem_callouts",
        "passed": has_theorem,
        "evidence": f"Found > [!theorem] callouts: {has_theorem}. Searched {len(md_files)} files."
    })

    # 2. has_definition_callouts
    has_def = bool(re.search(r'>\s*\[!definition\]', content, re.IGNORECASE))
    results.append({
        "text": "has_definition_callouts",
        "passed": has_def,
        "evidence": f"Found > [!definition] callouts: {has_def}."
    })

    # 3. has_worked_examples
    has_example = bool(re.search(r'>\s*\[!example\]', content, re.IGNORECASE))
    results.append({
        "text": "has_worked_examples",
        "passed": has_example,
        "evidence": f"Found > [!example] callouts: {has_example}."
    })

    # 4. enhanced_frontmatter (depends_on, used_by, source_location, doc_type)
    has_depends = "depends_on" in content
    has_used_by = "used_by" in content
    has_source_loc = "source_location" in content
    has_doc_type = "doc_type" in content
    all_frontmatter = has_depends and has_used_by and has_source_loc and has_doc_type
    results.append({
        "text": "enhanced_frontmatter",
        "passed": all_frontmatter,
        "evidence": f"depends_on: {has_depends}, used_by: {has_used_by}, source_location: {has_source_loc}, doc_type: {has_doc_type}"
    })

    # 5. index_routing_summary
    has_routing = bool(re.search(r'(If you need|Need .+\?.*→|Routing Summary)', content))
    results.append({
        "text": "index_routing_summary",
        "passed": has_routing,
        "evidence": f"Found routing summary pattern: {has_routing}"
    })

    # 6. concept_map_table
    has_concept_map = bool(re.search(r'Concept\s*\|.*Note', content)) or bool(re.search(r'Concept Map', content))
    results.append({
        "text": "concept_map_table",
        "passed": has_concept_map,
        "evidence": f"Found concept map table: {has_concept_map}"
    })

    # 7. multiple_atomic_notes
    num_notes = len(note_files)
    results.append({
        "text": "multiple_atomic_notes",
        "passed": num_notes >= 3,
        "evidence": f"Found {num_notes} note files (excluding indexes): {[f.name for f in note_files]}"
    })

    return results


def grade_eval1(run_type):
    """Grade p-hacking paper ingest."""
    outputs_dir = WORKSPACE / "eval-1-phacking-paper" / run_type / "outputs"
    md_files = find_md_files(outputs_dir)
    content = read_all_content(outputs_dir)

    note_files = [f for f in md_files if "_Index" not in f.name and "_Vault_Index" not in f.name]

    results = []

    # 1. preserves_argument_structure (multiple notes covering different aspects)
    has_motivation = bool(re.search(r'(motivation|problem|introduction|overview|core argument)', content, re.IGNORECASE))
    has_methods = bool(re.search(r'(method|framework|procedure|taxonomy|theoretical)', content, re.IGNORECASE))
    has_results = bool(re.search(r'(result|finding|case stud|empirical|example)', content, re.IGNORECASE))
    preserves = has_motivation and has_methods and has_results and len(note_files) >= 3
    results.append({
        "text": "preserves_argument_structure",
        "passed": preserves,
        "evidence": f"Motivation: {has_motivation}, Methods: {has_methods}, Results: {has_results}, Notes: {len(note_files)}"
    })

    # 2. has_overview_note
    has_overview = any("overview" in f.name.lower() or "garden" in f.name.lower() or "forking" in f.name.lower()
                       for f in note_files)
    results.append({
        "text": "has_overview_note",
        "passed": has_overview,
        "evidence": f"Overview note found: {has_overview}. Files: {[f.name for f in note_files if 'overview' in f.name.lower() or 'garden' in f.name.lower()]}"
    })

    # 3. enhanced_frontmatter
    has_doc_type = "doc_type" in content or 'type: paper' in content
    has_source_loc = "source_location" in content
    has_depends = "depends_on" in content
    all_fm = has_doc_type and has_source_loc and has_depends
    results.append({
        "text": "enhanced_frontmatter",
        "passed": all_fm,
        "evidence": f"doc_type/paper: {has_doc_type}, source_location: {has_source_loc}, depends_on: {has_depends}"
    })

    # 4. formal_results_stated
    has_formal = bool(re.search(r'(\[!theorem\]|\[!definition\]|procedure|formally|Definition:|Procedure \d)', content, re.IGNORECASE))
    results.append({
        "text": "formal_results_stated",
        "passed": has_formal,
        "evidence": f"Found formal statements: {has_formal}"
    })

    # 5. index_with_routing
    has_routing = bool(re.search(r'(If you need|Need .+\?.*→|Routing Summary|CONTAINS|COVERS)', content))
    results.append({
        "text": "index_with_routing",
        "passed": has_routing,
        "evidence": f"Found routing pattern in indexes: {has_routing}"
    })

    return results


def grade_eval2(run_type):
    """Grade query about theorems."""
    outputs_dir = WORKSPACE / "eval-2-query-theorems" / run_type / "outputs"
    answer_file = outputs_dir / "query_answer.md"

    if not answer_file.exists():
        return [
            {"text": "cites_specific_sources", "passed": False, "evidence": "No answer file found"},
            {"text": "structured_answer_format", "passed": False, "evidence": "No answer file found"},
            {"text": "identifies_gaps", "passed": False, "evidence": "No answer file found"},
        ]

    content = answer_file.read_text(errors="ignore")
    results = []

    # 1. cites_specific_sources
    has_wikilinks = bool(re.search(r'\[\[.*\]\]', content))
    has_pages = bool(re.search(r'(Ch\.|Chapter|pp?\.|page)', content, re.IGNORECASE))
    results.append({
        "text": "cites_specific_sources",
        "passed": has_wikilinks and has_pages,
        "evidence": f"Wikilinks: {has_wikilinks}, Page/chapter refs: {has_pages}"
    })

    # 2. structured_answer_format
    has_summary = bool(re.search(r'(summary|## Answer|\[!summary\])', content, re.IGNORECASE))
    has_details = bool(re.search(r'(## Details|### Details|## Findings)', content, re.IGNORECASE))
    has_sources = bool(re.search(r'(## Sources|### Sources|Source\s*\|)', content, re.IGNORECASE))
    structured = has_summary and (has_details or has_sources)
    results.append({
        "text": "structured_answer_format",
        "passed": structured,
        "evidence": f"Summary: {has_summary}, Details: {has_details}, Sources table: {has_sources}"
    })

    # 3. identifies_gaps
    has_gaps = bool(re.search(r'(gap|missing|no .*found|not .*covered|consider ingesting|no dedicated|absent)', content, re.IGNORECASE))
    results.append({
        "text": "identifies_gaps",
        "passed": has_gaps,
        "evidence": f"Identifies gaps: {has_gaps}"
    })

    return results


def save_grading(eval_dir, run_type, results):
    """Save grading.json."""
    grading = {"expectations": results}
    out_path = WORKSPACE / eval_dir / run_type / "grading.json"
    out_path.write_text(json.dumps(grading, indent=2))
    print(f"  Saved {out_path}")


def main():
    print("=== Grading Eval 0: BDA3 Textbook ===")
    for run_type in ["with_skill", "without_skill"]:
        print(f"\n  {run_type}:")
        results = grade_eval0(run_type)
        for r in results:
            status = "PASS" if r["passed"] else "FAIL"
            print(f"    [{status}] {r['text']}: {r['evidence']}")
        save_grading("eval-0-bda3-textbook", run_type, results)

    print("\n=== Grading Eval 1: P-Hacking Paper ===")
    for run_type in ["with_skill", "without_skill"]:
        print(f"\n  {run_type}:")
        results = grade_eval1(run_type)
        for r in results:
            status = "PASS" if r["passed"] else "FAIL"
            print(f"    [{status}] {r['text']}: {r['evidence']}")
        save_grading("eval-1-phacking-paper", run_type, results)

    print("\n=== Grading Eval 2: Query Theorems ===")
    for run_type in ["with_skill", "without_skill"]:
        print(f"\n  {run_type}:")
        results = grade_eval2(run_type)
        for r in results:
            status = "PASS" if r["passed"] else "FAIL"
            print(f"    [{status}] {r['text']}: {r['evidence']}")
        save_grading("eval-2-query-theorems", run_type, results)

    print("\n=== Summary ===")
    for run_type in ["with_skill", "without_skill"]:
        total = 0
        passed = 0
        for eval_dir in ["eval-0-bda3-textbook", "eval-1-phacking-paper", "eval-2-query-theorems"]:
            grading_path = WORKSPACE / eval_dir / run_type / "grading.json"
            data = json.loads(grading_path.read_text())
            for e in data["expectations"]:
                total += 1
                if e["passed"]:
                    passed += 1
        print(f"  {run_type}: {passed}/{total} passed ({100*passed/total:.0f}%)")


if __name__ == "__main__":
    main()
