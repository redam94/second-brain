# Source References: Constraint-Based and Score-Based Causal Discovery

> [!warning] Download status
> These papers are freely available but could not be downloaded in this session
> due to the environment's network egress policy (jmlr.org and arxiv.org blocked).
> Links are provided for manual retrieval.

---

## Primary sources ingested into notes

### PC Algorithm
- **Spirtes, P., Glymour, C., & Scheines, R. (2000).** *Causation, Prediction,
  and Search*, 2nd ed. MIT Press / CMU Technical Report.  
  Chapter 5 covers the PC algorithm; Chapter 6 covers the FCI extension for latents.
- **Spirtes, P., & Glymour, C. (1991).** "An algorithm for fast recovery of sparse
  causal graphs." *Social Science Computer Review*, 9(1), 62–72.
- **Meek, C. (1995).** "Causal inference and causal explanation with background
  knowledge." *Proceedings UAI 1995*, 403–410.  
  Defines the four orientation rules R1–R4 that complete the CPDAG after v-structure
  identification.

### Markov Equivalence Theory
- **Verma, T., & Pearl, J. (1990).** "Equivalence and synthesis of causal models."
  *Proceedings UAI 1990*, 220–227.  
  Proves that two DAGs are Markov equivalent iff they share skeleton and v-structures.

### GES (Greedy Equivalence Search)
- **Chickering, D. M. (2002).** "Optimal structure identification with greedy search."
  *Journal of Machine Learning Research*, 3, 507–554.  
  Open access: <https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf>  
  Defines GES (forward + backward phases), Insert/Delete operators, score equivalence,
  local consistency, and proves score-consistency (Theorem 15).
- **Hauser, A., & Bühlmann, P. (2012).** "Characterization and greedy learning of
  interventional Markov equivalence classes." *JMLR*, 13, 2409–2464.  
  Adds the Turn operator (third phase of GES) and extends GES to interventional data.

---

## Software

| Package | Language | Algorithms | Reference |
|---------|----------|-----------|-----------|
| `pcalg` | R (CRAN) | PC, GES, FCI, IDA | Kalisch et al. 2012, *J. Stat. Software* |
| `causal-learn` | Python (pip) | PC, GES, NOTEARS, LiNGAM, … | Zheng et al. 2024, *JMLR* 25(60) — <https://github.com/py-why/causal-learn> |
| `ges` | Python (pip) | GES (minimal) | juangamella — <https://github.com/juangamella/ges> |
