# Citations: Constraint-Based and Score-Based Causal Discovery

> **Note**: PDF downloads were attempted on 2026-10-05 but blocked by the network egress proxy
> (arXiv.org, JMLR.org, stat.ethz.ch all inaccessible). Notes were written from training
> knowledge of these well-documented papers.

## Primary Sources

### PC Algorithm

1. **Spirtes, P., Glymour, C., & Scheines, R. (2000).**
   *Causation, Prediction, and Search*, 2nd ed. MIT Press.
   - Free (MIT Press Open Access): https://mitpress.mit.edu/books/causation-prediction-and-search
   - The foundational constraint-based causal discovery textbook. PC algorithm in Chapter 5.

2. **Kalisch, M., & Bühlmann, P. (2007).**
   Estimating high-dimensional directed acyclic graphs with the PC-algorithm.
   *Journal of Machine Learning Research*, 8, 613–636.
   - arXiv preprint: https://arxiv.org/abs/math/0510436
   - Proves uniform consistency of PC in high dimensions (p grows as n^a for any a).

3. **Spirtes, P., & Glymour, C. (1991).**
   An algorithm for fast recovery of sparse causal graphs.
   *Social Science Computer Review*, 9(1), 62–72.
   - Original PC algorithm paper (precursor to the book).

### GES

4. **Chickering, D. M. (2002).**
   Optimal structure identification with greedy search.
   *Journal of Machine Learning Research*, 3, 507–554.
   - Free: https://jmlr.org/papers/v3/chickering02b.html
   - Proves GES finds the true CPDAG under faithfulness + consistency conditions.

5. **Chickering, D. M. (2002a).**
   Learning equivalence classes of Bayesian-network structures.
   *Journal of Machine Learning Research*, 2, 445–498.
   - Free: https://jmlr.org/papers/v2/chickering02a.html
   - Characterizes Markov equivalence classes; foundations for GES.

### Markov Equivalence

6. **Verma, T., & Pearl, J. (1990).**
   Equivalence and synthesis of causal models.
   *Proceedings of the Sixth Conference on Uncertainty in Artificial Intelligence*, 220–227.
   - Proves two DAGs are Markov equivalent iff same skeleton and v-structures.

7. **Andersson, S. A., Madigan, D., & Perlman, M. D. (1997).**
   A characterization of Markov equivalence classes for acyclic digraphs.
   *Annals of Statistics*, 25(2), 505–541.

### Meek Rules

8. **Meek, C. (1995).**
   Causal inference and causal explanation with background knowledge.
   *Proceedings of the Eleventh Conference on Uncertainty in Artificial Intelligence*, 403–410.
   - The four orientation propagation rules used in PC after v-structure identification.

### Beyond Causal Sufficiency (FCI)

9. **Spirtes, P., Meek, C., & Richardson, T. (1995).**
   Causal inference in the presence of latent variables and selection bias.
   *Proceedings of the Eleventh Conference on Uncertainty in Artificial Intelligence*, 499–506.
   - FCI algorithm (Fast Causal Inference): PC variant for non-causally-sufficient settings.

## Software

- **pcalg** (R): https://cran.r-project.org/web/packages/pcalg/
  Kalisch et al. (2012). *Journal of Statistical Software*, 47(11).
- **causal-learn** (Python): https://causal-learn.readthedocs.io/
  Implements PC, GES, FCI, and other algorithms.
