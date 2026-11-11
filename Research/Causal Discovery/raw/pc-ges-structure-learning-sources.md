# Sources: PC Algorithm and GES Structure Learning

> [!note] Download status
> PDF downloads were attempted on 2026-11-11 but blocked by the session's egress proxy.
> All sources below are freely available online at the URLs listed.

## Primary Sources

**Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd Ed., MIT Press
- PC algorithm: Chapter 5 (The PC Algorithm), Chapter 3 (Conditional Independence and d-separation)
- Free PDF: https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/glossary/causation.pdf
- Also at: https://ics.uci.edu/~dechter/courses/ics-295cr/spring-2021/reading/Causation_Prediction_and_Search.pdf

**Chickering, D.M. (2002)** — "Optimal Structure Identification With Greedy Search", *JMLR* 3:507–554
- GES (Greedy Equivalence Search): proof of Meek Conjecture and GES consistency theorem
- Free PDF: https://jmlr.org/papers/volume3/chickering02b/chickering02b.pdf

**Chickering, D.M. (1995)** — "A Transformational Characterization of Equivalent Bayesian Network Structures", *UAI 1995*
- Covered-edge reversal characterization of Markov equivalence

**Meek, C. (1995)** — "Causal Inference and Causal Explanation with Background Knowledge", *UAI 1995*
- Meek orientation rules R1–R4 for CPDAG completion

**Verma, T. & Pearl, J. (1990)** — "Equivalence and Synthesis of Causal Models", *UAI 1990*
- Theorem: two DAGs are Markov equivalent iff same skeleton and same v-structures

**Kalisch, M. & Bühlmann, P. (2007)** — "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm", *JMLR* 8:613–636
- High-dimensional consistency of PC under faithfulness + sparsity; pcalg R package
- Free PDF: https://jmlr.org/papers/volume8/kalisch07a/kalisch07a.pdf

**Glymour, Zhang & Spirtes (2019)** — "Review of Causal Discovery Methods Based on Graphical Models", *Frontiers in Genetics* 10:524
- Comprehensive review covering PC, GES, LiNGAM, FCI, NOTEARS
- Open access: https://www.frontiersin.org/journals/genetics/articles/10.3389/fgene.2019.00524/full

## Software
- **pcalg** (R): https://cran.r-project.org/web/packages/pcalg/ — PC, GES, FCI, RFCI, LINGAM
- **causal-learn** (Python): https://github.com/py-why/causal-learn — Python port of Tetrad methods including PC, GES
- **Tetrad** (Java): https://github.com/cmu-phil/tetrad — original Carnegie Mellon implementation
