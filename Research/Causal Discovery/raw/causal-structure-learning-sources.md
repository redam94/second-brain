# Causal Structure Learning — Source References

> Notes on PC algorithm, GES, CPDAG, and constraint-based causal discovery
> were written from the following freely-available sources. PDF downloads
> were blocked by the environment's egress proxy policy (2026-10-12);
> the URLs below are the canonical free-access locations.

## PC Algorithm — Primary Reference

**Kalisch, M. and Bühlmann, P. (2007)**
"Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm."
*Journal of Machine Learning Research*, 8, 613–636.

- arXiv preprint (math/0510436): https://arxiv.org/abs/math/0510436
- JMLR page: https://jmlr.org/papers/v8/kalisch07a.html
- Proves uniform consistency of PC under faithfulness when $d$ grows with $n$.

## GES — Primary Reference

**Chickering, D. M. (2002)**
"Optimal Structure Identification With Greedy Search."
*Journal of Machine Learning Research*, 3, 507–554.

- JMLR page: https://jmlr.org/papers/v3/chickering02b.html
- Proves the Meek conjecture; establishes GES consistency.

## PC Algorithm — Original Algorithm

**Spirtes, P., Glymour, C., and Scheines, R. (2000)**
*Causation, Prediction, and Search*, 2nd edition. MIT Press.

- Original PC algorithm description in Chapter 5.
- ResearchGate / course-page copies circulate; check for current access.

## Markov Equivalence / CPDAG Characterization

**Verma, T. and Pearl, J. (1990)**
"Equivalence and synthesis of causal models." *UAI 1990*, 220–227.
(Characterizes Markov equivalence via shared skeleton and v-structures.)

**Meek, C. (1995)**
"Causal inference and causal explanation with background knowledge."
*UAI 1995*, 403–410.
(Meek's orientation rules R1–R4 for completing a CPDAG.)

## Order-Independent PC

**Colombo, D. and Maathuis, M. H. (2014)**
"Order-Independent Constraint-Based Causal Structure Learning."
*Journal of Machine Learning Research*, 15, 3741–3782.
arXiv:1211.3295

## R Package

**Kalisch, M., Mächler, M., Colombo, D., Maathuis, M. H. and Bühlmann, P. (2012)**
"Causal Inference Using Graphical Models with the R Package pcalg."
*Journal of Statistical Software*, 47(11).
https://www.jstatsoft.org/article/view/v047i11
