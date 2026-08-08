# Sources: Constraint-Based and Score-Based Causal Discovery

> **Note on PDF availability:** The PDFs for the papers below are freely available online
> (JMLR is open-access; the Spirtes et al. book is hosted on CMU's servers) but could not
> be downloaded in this session due to network egress proxy restrictions on external academic
> domains. Notes were written from synthesis of established algorithmic knowledge and the
> references already in the vault (NOTEARS paper §2, landscape table).

## Primary Sources

### PC Algorithm
- **Spirtes, Glymour & Scheines (2000)** — *Causation, Prediction, and Search*, 2nd Ed., MIT Press.
  - PDF available: https://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/.g/scottd/fullbook.pdf
  - PC algorithm: Chapters 5–6 (pp. 73–151)
  - Causal Markov condition, faithfulness assumption: Chapter 3
- **Spirtes & Glymour (1991)** — "An Algorithm for Fast Recovery of Sparse Causal Graphs,"
  *Social Science Computer Review* 9(1): 62–72. Original PC paper.

### GES (Greedy Equivalence Search)
- **Chickering (2002)** — "Optimal Structure Identification With Greedy Search,"
  *Journal of Machine Learning Research* 3: 507–554.
  - PDF available: http://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
  - Proves the Meek Conjecture; defines Insert/Delete/Turn operators; GES consistency theorem.
- **Chickering (1995)** — "A Transformational Characterization of Equivalent Bayesian Network
  Structures," *UAI* 1995. The transformational characterization underpinning GES.

### Markov Equivalence
- **Verma & Pearl (1990)** — "Equivalence and Synthesis of Causal Models," *UAI* 1990.
  - Original characterization of Markov equivalence classes (same skeleton + same v-structures).
- **Meek (1995)** — "Causal Inference and Causal Explanation with Background Knowledge," *UAI* 1995.
  - The four Meek orientation rules; pattern / CPDAG representation.

## Related in Vault
- [[raw/1803.01422-NOTEARS.pdf]] — Zheng et al. (2018); §2 discusses PC, GES as prior methods.
