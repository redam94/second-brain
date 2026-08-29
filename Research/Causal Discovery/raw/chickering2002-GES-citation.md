---
title: "Citation: Chickering 2002 — Optimal Structure Identification With Greedy Search"
doc_type: citation-stub
date_added: 2026-08-29
note: "PDF download was blocked by network egress policy on 2026-08-29. Retrieve manually from JMLR (open access)."
---

# Citation: Chickering (2002)

## Full Reference

**Title:** Optimal Structure Identification With Greedy Search  
**Author:** David Maxwell Chickering  
**Venue:** *Journal of Machine Learning Research*, Vol. 3, pp. 507–554  
**Year:** 2002  
**DOI:** —  
**PDF (open access):** https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf  
**Page count:** 48 pages  

## Abstract (from paper)

The paper proves that a two-phase greedy search over the space of Markov equivalence classes of DAGs is optimal: in the large-sample limit, GES (Greedy Equivalence Search) recovers the true CPDAG, provided the BIC score is used and the faithfulness assumption holds. This resolves the *Meek conjecture* — that the Backward Equivalence Search (BES) phase can be replaced by a forward search followed by exhaustive backward deletion. GES avoids the exponential-time exact search while provably attaining its result asymptotically.

## Download Instructions

This paper is open access via JMLR:

```bash
curl -L -o chickering2002-GES.pdf \
  "https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf"
```

## Key results

- **Theorem 15 (GES consistency):** GES returns the true CPDAG in the large-sample limit under causal faithfulness and causal sufficiency.
- **Proof of Meek conjecture:** BES after FES recovers all and only edges in the true CPDAG.
- **Score decomposability:** GES exploits the decomposability of BIC to evaluate only local score changes.

## Notes created from this source

- [[Markov Equivalence and CPDAGs]]
- [[GES Algorithm]]
- [[Causal Discovery Algorithm Comparison]]
