---
type: reference-stub
reason: "PDF download blocked by network egress policy (jmlr.org inaccessible in this session)"
---

# Reference: Chickering (2002)

**Full citation:**
Chickering, D. M. (2002). Optimal structure identification with greedy search.
*Journal of Machine Learning Research*, 3, 507–554.

**Free PDF:** https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

**Key content:**
- Greedy Equivalence Search (GES): a two-phase score-based algorithm over equivalence classes
- Forward (insert) phase: greedily adds edges to CPDAG until no BIC improvement
- Backward (delete) phase: greedily removes edges until no BIC improvement
- Proof of the Meek conjecture (Meek 1997): GES is asymptotically consistent under faithfulness
- Efficient CPDAG operators: Insert, Delete, and their scoring formulas
- Connection to perfect elimination orderings (PEOs)

**Seminal result (Theorem 15 in Chickering 2002):**
Assuming faithfulness and a consistent score (e.g. BIC), GES returns the CPDAG of the
true data-generating DAG in the large-sample limit. No exponential-time search required —
the equivalence-class structure allows efficient operator scoring.

**Related notes in vault:**
- [[Greedy Equivalence Search]] — the algorithm described in this source
- [[Markov Equivalence and CPDAGs]] — the equivalence-class representation GES operates over
- [[DAG Structure Learning Problem]] — the problem setting (Program 4, combinatorial)
- [[NOTEARS Experiments]] — compares NOTEARS empirically against GES/FGS
