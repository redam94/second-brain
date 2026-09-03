---
type: reference-stub
reason: "PDF download blocked by network egress policy (jmlr.org inaccessible in this session)"
---

# Reference: Kalisch & Bühlmann (2007)

**Full citation:**
Kalisch, M., & Bühlmann, P. (2007). Estimating high-dimensional directed acyclic graphs with
the PC-algorithm. *Journal of Machine Learning Research*, 8, 613–636.

**Free PDF:** https://jmlr.org/papers/volume8/kalisch07a/kalisch07a.pdf

**Key content:**
- Extends the PC algorithm to the high-dimensional, sparse setting (p ≫ n)
- Proves uniform consistency under the Gaussian faithfulness assumption when neighborhood size
  grows slower than n: if the maximum degree k = O(n^a) for 0 < a < 1/(2γ), where γ controls
  the partial correlation CI test's power, then PC recovers the skeleton and v-structures
- Introduces **PC-stable**: a modification of PC that removes the order-dependence of the
  original algorithm (the original PC's output depends on the variable ordering; PC-stable
  uses a fixed conditioning set at each step)
- Fisher's z-test for partial correlations under Gaussian assumptions, at the α significance level

**Seminal result:**
Under sparsity (bounded degree growing as O(n^a)), PC is uniformly consistent for the
true CPDAG skeleton and v-structures even when p → ∞ faster than n. This makes PC
practically applicable to genomics, fMRI, and other high-dimensional domains.

**Related notes in vault:**
- [[PC Algorithm]] — the algorithm extended in this source
- [[Constraint-Based Causal Discovery]] — the general framework
- [[Markov Equivalence and CPDAGs]] — CPDAG representation
