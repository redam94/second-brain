---
type: reference
title: "Optimal Structure Identification With Greedy Search"
---

# Bibliographic Reference

**Author:** David Maxwell Chickering  
**Year:** 2002  
**Journal:** Journal of Machine Learning Research, vol. 3, pp. 507–554  
**URL (JMLR):** https://jmlr.org/papers/v3/chickering02b.html  
**Note on availability:** JMLR domain is unreachable from this session's network policy. Paper freely available at JMLR.

## Abstract / Summary

Proves the "Meek Conjecture": greedy search over the space of Markov equivalence classes (represented as CPDAGs) is complete and optimal in the large-sample limit. Introduces Greedy Equivalence Search (GES), a two-phase algorithm that (1) adds edges (FES phase) and (2) deletes edges (BES phase) using locally computable score functions. Shows consistency: GES returns the CPDAG of the true data-generating DAG when the score (BIC) is consistent and the faithfulness assumption holds.

**Key contributions:**
1. Proof of the Meek Conjecture: if DAG H is an I-map of DAG G, there is a path of covered-edge reversals from G to H preserving I-map property
2. Locally computable score functions that make GES scalable
3. Two-phase greedy search in equivalence-class space (FES + BES)
4. Consistency theorem for the large-sample limit
