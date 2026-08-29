---
title: "Citation: Spirtes, Glymour & Scheines 2000 — Causation, Prediction, and Search"
doc_type: citation-stub
date_added: 2026-08-29
note: "PDF download was blocked by network egress policy on 2026-08-29. A free PDF is available via the University of Amsterdam repository."
---

# Citation: Spirtes, Glymour & Scheines (2000)

## Full Reference

**Title:** Causation, Prediction, and Search (2nd Edition)  
**Authors:** Peter Spirtes, Clark Glymour, Richard Scheines  
**Venue:** MIT Press / Adaptive Computation and Machine Learning  
**Year:** 2000 (2nd ed.; 1st ed. 1993, Springer)  
**ISBN:** 0-262-19440-6  
**Free PDF:** https://archive.illc.uva.nl/cil/uploaded_files/inlineitem/Spirtes_Glymour_Scheines_2000_Causation_Prediction_.pdf  
**Page count:** 543 pages  

## Contents relevant to PC algorithm

- **Chapter 3:** Causation and Prediction — the IC (Inductive Causation) algorithm, precursor to PC
- **Chapter 5:** Discovery Algorithms for Causally Sufficient Structures — **PC algorithm** (Algorithm 5.4.1, pp. 84–88)
- **Chapter 6:** Discovery Algorithms When Causal Sufficiency is Unknown — FCI and CI algorithms

## Download Instructions

```bash
curl -L -o spirtes2000-CPS.pdf \
  "https://archive.illc.uva.nl/cil/uploaded_files/inlineitem/Spirtes_Glymour_Scheines_2000_Causation_Prediction_.pdf"
```

## Key results

- **Theorem 5.4.2 (PC consistency):** PC returns the true CPDAG in the large-sample limit under faithfulness and causal sufficiency.
- **Algorithm 5.4.1:** The PC algorithm — complete, pseudocode-level specification.
- **Faithfulness assumption (CFA):** foundational for all constraint-based methods.
- **FCI algorithm (Ch. 6):** extension to latent variables / non-sufficiency (out of scope for current notes).

## Notes created from this source

- [[PC Algorithm]]
- [[Markov Equivalence and CPDAGs]]
