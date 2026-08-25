# Canonical References: Constraint-Based and Score-Based Causal Structure Learning

**Note:** These papers are freely available online but could not be downloaded directly
during this ingest run due to network proxy restrictions. Canonical citations and access
paths are provided below for manual retrieval.

---

## Primary Sources

### Spirtes, Glymour & Scheines (2000) — PC Algorithm

**Citation:** Spirtes, P., Glymour, C., & Scheines, R. (2000).
*Causation, Prediction, and Search* (2nd ed.). MIT Press.

**Free access:** The 2nd edition is available open-access from the Carnegie Mellon
Philosophy Department. Search: "Causation Prediction Search MIT Press PDF" or visit
the CMU philosophy page for Spirtes.

**Content relevant to PC notes:** Chapter 5 (The PC Algorithm), Chapter 3
(d-Separation and Markov Equivalence), Chapter 6 (FCI for latent confounders).

**PC algorithm originally published as:**
Spirtes, P., & Glymour, C. (1991). "An algorithm for fast recovery of sparse causal
graphs." *Social Science Computer Review*, 9(1), 62–72.

---

### Chickering (2002) — GES Algorithm

**Citation:** Chickering, D. M. (2002). "Optimal structure identification with greedy
search." *Journal of Machine Learning Research*, 3, 507–554.

**Free access:** JMLR is open access. Direct URL:
https://jmlr.org/papers/v3/chickering02b.html (PDF linked from there).

**Content relevant to GES notes:** Full paper. Key sections: §2 (Equivalence classes
and the search space), §3 (Insert and Delete operators), §4 (GES algorithm and
correctness proof), §5 (Experiments).

---

### Hauser & Bühlmann (2012) — Turning Phase Extension

**Citation:** Hauser, A., & Bühlmann, P. (2012). "Characterization and greedy learning
of interventional Markov equivalence classes of directed acyclic graphs." *Journal of
Machine Learning Research*, 13, 2409–2464.

**Notes:** Adds the Turning phase to GES (making it score-optimal) and introduces
interventional equivalence classes. Also open-access on JMLR.

---

### Meek (1995) — Orientation Rules

**Citation:** Meek, C. (1995). "Causal inference and causal explanation with background
knowledge." *Proceedings of UAI 1995*, 403–410.

**Notes:** Provides the 4 orientation rules (R1–R4) used in Phase 3 of PC and after
BES in GES to complete orientation of the CPDAG.

---

## Secondary Sources (Code / Implementations)

### causal-learn (Python)
- Repository: https://github.com/py-why/causal-learn
- PC implementation: `causallearn/search/ConstraintBased/PC.py`
- GES implementation: `causallearn/search/ScoreBased/GES.py`
- Paper: Zheng et al. (2024), JMLR Vol. 25

### NOTEARS (arXiv:1803.01422)
- Provides context: benchmarks PC and GES as constraint-based / score-based baselines
- Describes both approaches in §2.2 "Landscape of prior approaches"
- Already ingested as: [[raw/1803.01422-NOTEARS.pdf]]
