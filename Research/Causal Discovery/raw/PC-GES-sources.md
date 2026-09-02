# Sources: PC Algorithm and GES

*Note: PDF downloads for these sources were blocked by the egress proxy policy during ingestion (2026-09-02). All sources listed below are freely available online.*

## Primary Sources

### PC Algorithm
- **Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd ed., MIT Press.
  - Freely available: [https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/.g/scottd/fullbook.pdf](https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/.g/scottd/fullbook.pdf)
  - DOI: 10.7551/mitpress/1754.001.0001
  - Chapters 5–6 cover the PC algorithm and its soundness/completeness proofs.

- **Spirtes & Glymour (1991)** — "An algorithm for fast recovery of sparse causal graphs," *Social Science Computer Review* 9(1): 62–72.

- **Meek (1995)** — "Causal inference and causal explanation with background knowledge," *UAI 1995*, pp. 403–411.
  - Establishes the orientation rules (Meek rules) used in PC Phase 2.

### GES (Greedy Equivalence Search)
- **Chickering (2002)** — "Optimal structure identification with greedy search," *Journal of Machine Learning Research* 3: 507–554.
  - Freely available (JMLR open access): [https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf](https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf)

- **Hauser & Bühlmann (2012)** — "Characterization and greedy learning of interventional Markov equivalence classes of directed acyclic graphs," *JMLR* 13: 2409–2464.
  - Extends GES to interventional data; adds the Turning phase.

### Markov Equivalence
- **Verma & Pearl (1990)** — "Equivalence and synthesis of causal models," *UAI 1990*.
  - Characterizes Markov equivalence via skeleton + v-structures.

- **Andersson, Madigan & Perlman (1997)** — "A characterization of Markov equivalence classes for acyclic digraphs," *Annals of Statistics* 25(2): 505–541.
  - Formal CPDAG construction algorithm.

## Implementations

- **pcalg** (R): Kalisch, Mächler, Colombo, Maathuis & Bühlmann (2012), *Journal of Statistical Software* 47(11).
- **causal-learn** (Python): Zheng, Huang, Chen, Ramsey, Sanchez-Romero, Glymour & Zhang (2024), *JMLR* 25(60): 1–8.
- **ges** (Python): juangamella/ges on GitHub — implementation of Chickering (2002).

## Survey References

- **Vowels, Camgoz & Sherr (2022)** — "D'ya like DAGs? A survey on structure learning and causal discovery," *ACM Computing Surveys* 55(4): 1–36.
  - Freely available: https://personalpages.surrey.ac.uk/r.bowden/publications/2022/Vowels_ACM2022pp.pdf
