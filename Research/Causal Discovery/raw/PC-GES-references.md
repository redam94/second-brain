# PC Algorithm & GES — Paper References

**Note:** PDF downloads for these papers were attempted but blocked by the network egress proxy
(policy denial on arxiv.org, jmlr.org, and all accessed mirror domains). The papers are freely
available online at the URLs listed below.

---

## PC Algorithm

### Kalisch & Bühlmann (2007)
- **Title:** "Estimating High-Dimensional Directed Acyclic Graphs with the PC-Algorithm"
- **Venue:** Journal of Machine Learning Research, Vol. 8, pp. 613–636
- **Free PDF:** https://arxiv.org/pdf/math/0510436 (arXiv:math/0510436)
- **Notes generated from:** Section 2 (PC algorithm), Section 3 (consistency theory), Section 4 (extensions)

### Spirtes, Glymour & Scheines (2000)
- **Title:** *Causation, Prediction, and Search*, 2nd edition
- **Publisher:** MIT Press (originally Springer 1993)
- **Content:** Chapters 5–6 define the PC algorithm and the Causal Faithfulness Condition

---

## GES — Greedy Equivalence Search

### Chickering (2002)
- **Title:** "Optimal Structure Identification with Greedy Search"
- **Venue:** Journal of Machine Learning Research, Vol. 3, pp. 507–554
- **Free PDF:** https://jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
- **Notes generated from:** Full paper; key results in §2 (Meek conjecture), §4 (Forward phase), §5 (Backward phase), §6 (Consistency theorem)

---

## Software Implementations
- **R:** `pcalg` package (Kalisch et al.) — `pc()` and `ges()` functions
- **Python:** `causal-learn` library (formerly `causaldag`) — `PC`, `GES` classes
- **Python (GES only):** `ges` package (Juan Gamella) — https://github.com/juangamella/ges

---

## Related Papers
- Meek (1997) — "Graphical Models: Selecting causal and statistical models" — defines the four Meek orientation rules
- Chickering (1995) — "A Transformational Characterization of Equivalent Bayesian Network Structures" — proves skeleton + v-structures ⟺ Markov equivalence
- Verma & Pearl (1990) — "Equivalence and synthesis of causal models" — original Markov equivalence characterization
