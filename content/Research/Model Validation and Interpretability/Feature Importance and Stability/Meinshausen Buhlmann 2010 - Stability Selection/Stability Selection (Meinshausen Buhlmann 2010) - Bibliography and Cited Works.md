---
title: "Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - type/reference
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: References (pp. 27-30); in-text citation pages located by search of the full text"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]"
used_by:
  - "[[Randomised Lasso Consistency under Stability Selection (Theorem 2)]]"
aliases:
  - Stability Selection References
  - Meinshausen-Buhlmann 2010 Bibliography
---

# Stability Selection (Meinshausen Buhlmann 2010) - Bibliography and Cited Works

> [!summary]
> The arXiv v2 reference list has **48 entries** (pp. 27-30). The table below lists every entry with the page(s) where it is cited and what the paper uses it for. A handful of works carry most of the technical load:
> - **Zhang & Huang (2008)**: their Theorem 1 gives Lemma 4, and their $\chi^2$ argument gives Lemma 6.
> - **Zhao & Yu (2006)** and **Meinshausen & Bühlmann (2006)**: the irrepresentable / neighbourhood-stability condition.
> - **Tropp (2004)**: the exact recovery condition for OMP.
> - **Dudoit et al. (2003)**: PFER/PCER vocabulary.
> - **Freedman (1977)** and **Bühlmann & Yu (2002)**: why half-sampling without replacement approximates the bootstrap.
^summary-ss-stability-selection-meinshausen-buhlmann

## Overview

Citation pages were located by searching the full text. "p." refers to the arXiv v2 page numbers. Entries are as printed: "to appear" and "Arxiv preprint" statuses date from 2009.

**Acknowledgments (p. 27).** The authors thank anonymous referees for comments that improved the manuscript; N.M. thanks FIM (Forschungsinstitut für Mathematik) at ETH Zürich for support and hospitality. No funding or data acknowledgments beyond these appear; the riboflavin data are credited in §2.2 to DSM Nutritional Products (Switzerland).

## Main Content

### Technical foundations (used in proofs or definitions)

| Reference (as printed) | Cited on | Role in the paper |
|---|---|---|
| Zhang, C. and J. Huang (2008). The sparsity and bias of the lasso selection in high-dimensional linear regression. *Annals of Statistics* 36, 1567-1594 | pp. 12-13, 24-26 | Sparse Riesz condition (16); Theorem 1, eqs (2.20)-(2.24) used for Lemma 4; $\chi^2$ tail argument from their Thm 3 reused in Lemma 6 |
| Zhao, P. and B. Yu (2006). On model selection consistency of lasso. *JMLR* 7, 2541-2563 | pp. 2-3, 11-12, 16 | Irrepresentable condition (12) |
| Meinshausen, N. and P. Bühlmann (2006). High dimensional graphs and variable selection with the lasso. *Annals of Statistics* 34, 1436-1462 | pp. 2-3, 6, 9, 11-12, 16, 26 | Neighbourhood-stability condition; neighbourhood selection for graphs; KKT-based analysis reused in Lemma 7 |
| Tropp, J. (2004). Greed is good: algorithmic results for sparse approximation. *IEEE Trans. Inf. Theory* 50, 2231-2242 | pp. 2, 11, 16 | Exact recovery condition (19) for OMP |
| Zhang, T. (2009). On the consistency of feature selection using greedy least squares regression. *JMLR* 10, 555-568 | pp. 2, 11 | Exact recovery criterion for greedy/OMP selection |
| Dudoit, S., J. Shaffer and J. Boldrick (2003). Multiple hypothesis testing in microarray experiments. *Statistical Science* 18, 71-103 | p. 7 | PFER and per-comparison error rate terminology |
| Freedman, D. (1977). A remark on the difference between sampling with and without replacement. *JASA* 72, 681 | p. 5 | Justifies subsample size $\lfloor n/2\rfloor$ as closest to the bootstrap |
| Bühlmann, P. and B. Yu (2002). Analyzing bagging. *Annals of Statistics* 30, 927-961 | p. 5 | Same justification as Freedman (subagging) |
| Candes, E. and T. Tao (2007). The Dantzig selector. *Annals of Statistics* 35, 2312-2351 | pp. 12, 15 | Sparse-eigenvalue conditions; hard-thresholding comparison |
| van de Geer, S. (2008). High-dimensional generalized linear models and the lasso. *Annals of Statistics* 36, 614-645 | p. 12 | Sparse-eigenvalue conditions |
| Meinshausen, N. and B. Yu (2009). Lasso-type recovery of sparse representations from high-dimensional data. *Annals of Statistics* 37, 246-270 | pp. 12, 15 | Sparse eigenvalues; $\ell_2$ recovery; thresholding |
| Bickel, P., Y. Ritov and A. Tsybakov (2007). Simultaneous analysis of Lasso and Dantzig selector. *Annals of Statistics*, to appear | p. 12 | Sparse/restricted eigenvalue conditions |
| Temlyakov, V. (2000). Weak greedy algorithms. *Advances in Computational Mathematics* 12, 213-227 | p. 12 | Source of the term "weakness" for $\alpha$ |
| Wainwright, M. (2006). Sharp thresholds for high-dimensional and noisy recovery of sparsity. arXiv math.ST/0605740 | pp. 2-3, 11 | Lasso selection consistency; $s\log p=o(n)$ scaling |
| Barbieri, M. and J. Berger (2004). Optimal predictive model selection. *Annals of Statistics* 32, 870-897 | p. 7 | Median probability model (link to Def. 2) |

### Base procedures and algorithms

| Reference | Cited on | Role |
|---|---|---|
| Tibshirani, R. (1996). Regression shrinkage and selection via the lasso. *JRSS-B* 58, 267-288 | pp. 3, 11 | Lasso (2) |
| Chen, S., S. Donoho and M. Saunders (2001). Atomic decomposition by basis pursuit. *SIAM Review* 43, 129-159 | pp. 3, 11 | Basis pursuit / Lasso |
| Donoho, D. and M. Elad (2003). Optimally sparse representation in general (nonorthogonal) dictionaries via $\ell_1$-minimization. *PNAS* 100, 2197-2202 | p. 1 | $\ell_1$ approaches to sparse discrete problems |
| Efron, B., T. Hastie, I. Johnstone and R. Tibshirani (2004). Least angle regression. *Annals of Statistics* 32, 407-451 | pp. 10, 12 | LARS; cost $O(np\min\{n,p\})$ (§2.6); solving the reweighted Lasso |
| Friedman, J., T. Hastie, H. Hoefling and R. Tibshirani (2007). Pathwise coordinate optimization. *Annals of Applied Statistics* 1, 302-332 | pp. 10, 12 | Coordinate-wise Lasso solvers; the implementation behind the §2.6 timing (about 10 s for $p=1000$, $n=100$) |
| Meier, L., S. van de Geer and P. Bühlmann (2008). The group lasso for logistic regression. *JRSS-B* 70, 53-71 | p. 12 | Coordinate-wise solvers |
| Friedman, J., T. Hastie and R. Tibshirani (2008). Sparse inverse covariance estimation with the graphical lasso. *Biostatistics* 9, 432-441 | pp. 3, 9 | Graphical Lasso (4); Example II |
| Banerjee, O. and L. El Ghaoui (2008). Model selection through sparse maximum likelihood estimation. *JMLR* 9, 485-516 | p. 9 | Sparse inverse covariance estimation |
| Yuan, M. and Y. Lin (2007). Model selection and estimation in the gaussian graphical model. *Biometrika* 94, 19-35 | pp. 2-3, 9, 11-12 | Graphical-model penalised likelihood; irrepresentable condition |
| Bickel, P. and E. Levina (2008). Regularized estimation of large covariance matrices. *Annals of Statistics* 36, 199-227 | p. 9 | Covariance regularisation |
| Rothman, A., P. Bickel, E. Levina and J. Zhu (2008). Sparse permutation invariant covariance estimation. *EJS* 2, 494-515 | p. 9 | Sparse covariance estimation |
| Lauritzen, S. (1996). *Graphical Models*. Oxford University Press | pp. 3, 9 | Conditional-independence graphs |
| Mallat, S. and Z. Zhang (1993). Matching pursuits with time-frequency dictionaries. *IEEE Trans. Signal Processing* 41, 3397-3415 | p. 4 | OMP / matching pursuit as tuning-by-steps selectors |
| Freund, Y. and R. Schapire (1996). Experiments with a new boosting algorithm. *ICML* 148-156 | pp. 2, 4 | Boosting as an iterative selector |
| Fan, J. and J. Lv (2008). Sure independence screening for ultra-high dimensional feature space. *JRSS-B* 70, 849-911 | p. 16 | Iterative SIS contains OMP as a special case |
| Zhang, T. (2008). Adaptive forward-backward greedy algorithm for sparse learning with linear models. *NIPS* | p. 16 | FoBa |
| Zhang, C.-H. (2007). Penalized linear unbiased selection. Tech. Rep. 2007-003, Rutgers | p. 16 | MC+ |
| Zou, H. (2006). The adaptive lasso and its oracle properties. *JASA* 101, 1418-1429 | pp. 11-12, 15 | Adaptive Lasso; irrepresentable condition |
| Huang, J., S. Ma and C.-H. Zhang (2008). Adaptive lasso for sparse high-dimensional regression models. *Statistica Sinica* 18, 1603-1618 | p. 12 | Adaptive Lasso in high dimensions |
| Leng, C., Y. Lin and G. Wahba (2006). A note on the lasso and related procedures in model selection. *Statistica Sinica* 16, 1273-1284 | p. 6 | Prediction-optimal $\lambda$ over-selects (CV picks noise) |
| Bach, F. (2008). Bolasso: model consistent lasso estimation through the bootstrap. arXiv:0804.1302 | p. 14 | Bolasso, closest related method (intersection over bootstrap fits) |
| Breiman, L. (2001). Random Forests. *Machine Learning* 45, 5-32 | pp. 2, 11 | Inspiration for adding randomisation |

### Resampling and stability precedents, and applications

| Reference | Cited on | Role |
|---|---|---|
| Monti, S., P. Tamayo, J. Mesirov and T. Golub (2003). Consensus clustering. *Machine Learning* 52, 91-118 | p. 3 | Resampling-based clustering validation |
| Bhattacharjee, A. et al. (2005). Classification of human lung carcinomas by mRNA expression profiling. *PNAS* | p. 3 | Early consensus-clustering application |
| Valdar, W., C. Holmes, R. Mott and J. Flint (2009). Mapping in structured populations by resample-based model averaging. *Genetics*, to appear | p. 5 | Subsampling advocated in a related context |
| Ein-Dor, L. et al. (2005). Outcome signature genes in breast cancer: is there a unique set? *Bioinformatics* 21, 171-178 | p. 6 | Instability of selected gene sets |
| Michiels, S., S. Koscielny and C. Hill (2005). Prediction of cancer outcome with microarrays. *The Lancet* 365, 488-492 | p. 6 | Instability of selected gene sets |
| Davis, C. et al. (2006). Reliable gene signatures for microarray classification. *Bioinformatics* 22, 2356-2363 | p. 6 | "Consensus" gene signatures, close in spirit |
| Zucknick, M., S. Richardson and E. Stronach (2008). Comparing the characteristics of gene expression profiles. *SAGMB* 7 | p. 6 | Jaccard-index stability of molecular profiles |
| Lee, K. et al. (2003). Gene selection: a Bayesian variable selection approach. *Bioinformatics* 19, 90-97 | p. 7 | Applied Bayesian posterior inclusion probabilities |
| Sha, N. et al. (2004). Bayesian variable selection in multinomial probit models. *Biometrics* 60, 812-819 | p. 7 | Same |
| Conlon, E., X. Liu, J. Lieb and J. Liu (2003). Integrating regulatory motif discovery and genome-wide expression analysis. *PNAS* 100, 3339-3344 | p. 19 | Motif regression design (F) |
| van de Geer, S. and H. van Houwelingen (2004). High-dimensional data: $p\gg n$ in mathematical statistics and bio-medical applications. *Bernoulli* 10, 939-943 | p. 1 | Overview of high-dimensional problems |

The three tables have 15 + 22 + 11 = 48 rows, one for each printed entry.

## Examples

> [!example] Following the proof chain outward
> To check Lemma 4's constants (see the eq. (26) note in [[Randomised Lasso Consistency under Stability Selection (Theorem 2)#^note-ss-eq26-constant]]), go to Zhang & Huang (2008), Theorem 1 and eqs (2.20)-(2.24). This is the single external result the consistency proof depends on.
^example-ss-following-the-proof-chain

## Connections

- The Bayesian precedents (Barbieri & Berger, Lee et al., Sha et al.) connect stability selection to posterior inclusion probabilities; compare [[Spike-and-Slab Prior for Covariate Selection]].
- The instability-of-gene-signatures literature is the biomedical analogue of fragile driver lists in marketing models. See [[Stability Selection - Discussion, Limitations and Practice]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]
