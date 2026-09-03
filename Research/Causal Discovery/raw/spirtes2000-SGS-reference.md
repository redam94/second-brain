---
type: reference-stub
reason: "PDF download blocked by network egress policy (jmlr.org and arxiv.org inaccessible in this session)"
---

# Reference: Spirtes, Glymour & Scheines (2000)

**Full citation:**
Spirtes, P., Glymour, C., & Scheines, R. (2000). *Causation, Prediction, and Search* (2nd ed.). MIT Press.

**Free PDF:** https://www.cs.cmu.edu/~scheines/pubs/cps2.pdf  
Also available via MIT Press open access.

**Key content:**
- Chapters 5–6: PC algorithm (Peter-Clark algorithm) — constraint-based causal discovery
- Causal Markov condition and faithfulness assumption (Ch. 3)
- Graphical characterization of d-separation (Ch. 2)
- FCI algorithm for hidden common causes (Ch. 6)
- The SGS algorithm (predecessor to PC; same output but exponential in degree)

**Seminal result:**
PC algorithm correctly identifies the Markov equivalence class (CPDAG) of the true DAG
in the large-sample limit, under the Causal Markov Condition, Faithfulness, and
Causal Sufficiency (no hidden common causes). Polynomial complexity in the sparse case.

**Related notes in vault:**
- [[PC Algorithm]] — the algorithm derived from this source
- [[Constraint-Based Causal Discovery]] — the general framework
- [[Markov Equivalence and CPDAGs]] — CPDAG representation used throughout
- [[DAG Structure Learning Problem]] — the problem setting
- [[Directed Acyclic Graphs]] — DAG semantics for causal inference
