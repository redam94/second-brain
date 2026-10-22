---
type: citation-stub
reason: "PDF download blocked by network policy (jmlr.org ENOTFOUND). See below for full bibliographic reference."
---

# Citation: Chickering (2002)

**Authors:** David Maxwell Chickering
**Title:** Optimal Structure Identification With Greedy Search
**Journal:** Journal of Machine Learning Research, Vol. 3, pp. 507–554, 2002
**JMLR URL:** https://jmlr.org/papers/v3/chickering02b.html
**Microsoft Research:** https://www.microsoft.com/en-us/research/?p=342392

## Abstract

Introduces the Greedy Equivalence Search (GES) algorithm, which performs greedy search in the
space of equivalence classes (CPDAGs) rather than individual DAGs. Proves consistency under
faithfulness and that the forward phase (FES) provably reaches the correct equivalence class.
Proves the "Meek conjecture": from any higher-scoring DAG, there is a sequence of covered edge
reversals leading to the true structure.

## Key Results

- GES searches over CPDAGs in two phases: FES (forward) + BES (backward)
- Each insert/delete operator is computed locally (Markov blankets only)
- Consistent under standard assumptions: Markov, faithfulness, decomposable score
- Proves the Meek conjecture
- Introduces the theory of "covered edges" as reversible without score change
