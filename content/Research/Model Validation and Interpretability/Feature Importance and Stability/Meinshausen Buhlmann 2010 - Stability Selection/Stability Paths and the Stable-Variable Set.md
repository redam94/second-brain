---
title: "Stability Paths and the Stable-Variable Set"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/variable-selection
  - type/concept
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §2 intro (p. 4); §2.1 Stability paths, Def. 1, eq. (5), Remark 1 (pp. 4-5); Fig. 1 (p. 5); §2.2 Example I (pp. 5-6); §2.3 Stability selection, Def. 2, eqs (6)-(7) (pp. 6-7)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]"
used_by:
  - "[[Stability Selection PFER Bound (Theorem 1) and Its Proof]]"
  - "[[Stability Selection for Gaussian Graphical Models and Computational Cost]]"
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
aliases:
  - Stability Path
  - Selection Probability (Stability Selection)
  - Stable Variables
  - Stability Selection Algorithm
---

# Stability Paths and the Stable-Variable Set

> [!summary]
> For any selector $\hat S^\lambda$, the **selection probability** $\hat\Pi^\lambda_k$ is the probability, over random half-samples drawn without replacement (and any internal randomisation), that variable $k$ is selected. Plotting $\hat\Pi^\lambda_k$ against $\lambda$ gives the **stability path**. The **stable set** keeps every variable whose maximum selection probability over $\Lambda$ reaches $\pi_{thr}$. On riboflavin gene-expression data with 4082 permuted (null) genes, the stability path separates the 6 real genes far better than the Lasso path. Cross-validation, by contrast, admits 14 null genes.
^summary-ss-stability-paths-and-the-stable-variable

## Overview

Stability selection takes a generic tuning parameter $\lambda\in\Lambda\subseteq\mathbb R^+$ (§2, p. 4). It can be the $\ell_1$ penalty in (2) or (4), the number of forward-selection or orthogonal-matching-pursuit steps, or the number of boosting iterations. For every $\lambda$ there is a structure estimate $\hat S^\lambda\subseteq\{1,\dots,p\}$. A large number of steps means *less* regularisation, the opposite of a large penalty, "but this does not cause conceptual problems." The data $Z^{(1)},\dots,Z^{(n)}$ are assumed i.i.d. throughout §2.

A **regularisation path** shows coefficients $\{\hat\beta^\lambda_k;\lambda\in\Lambda,k=1..p\}$. A **stability path** shows instead the probability of each variable being selected under random resampling.

## Main Content

> [!definition] Definition 1 - Selection probabilities (§2.1, eq. 5, p. 4)
> Let $I$ be a random subsample of $\{1,\dots,n\}$ of size $\lfloor n/2\rfloor$, drawn **without replacement**. Write $\hat S^\lambda=\hat S^\lambda(I)$ for the selected set computed on $I$. For every set $K\subseteq\{1,\dots,p\}$,
> $$
> \hat\Pi^\lambda_K=P^*\big(K\subseteq\hat S^\lambda(I)\big).
> $$
> **Remark 1:** $P^*$ is with respect to the random subsampling *and* any other randomness in $\hat S^\lambda$ (e.g. the randomised Lasso of §3.1).
^def-ss-selection-prob

**Why $\lfloor n/2\rfloor$.** Half-sampling "resembles most closely the bootstrap" (Freedman 1977; Bühlmann & Yu 2002) while being computationally efficient. Subsampling in a related context is also used by Valdar et al. (2009).

> [!definition] Stability path (§2.1, p. 5)
> For each variable $k$, the **stability path** is $\{\hat\Pi^\lambda_k:\lambda\in\Lambda\}$. It complements the coefficient path plot.
^def-ss-stability-path

**Sets of variables.** Definition 1 covers sets $K$, not just singletons. One could monitor a group of functionally related variables (e.g. all lags of one media channel) by how often *at least one* member is chosen, or how often *all* are chosen. The rest of the paper uses individual variables.

> [!definition] Definition 2 - Stable variables (§2.3, eq. 7, p. 6)
> For a cutoff $0<\pi_{thr}<1$ and a set of regularisation parameters $\Lambda$, the **set of stable variables** is
> $$
> \hat S^{stable}=\Big\{k:\max_{\lambda\in\Lambda}\hat\Pi^\lambda_k\ge\pi_{thr}\Big\}.
> $$
^def-ss-stable-set

**Contrast with traditional selection (eq. 6).** Ordinary selection picks *one* element of $\{\hat S^\lambda;\lambda\in\Lambda\}$. This has two problems: the true $S$ may not be in that list, and even if it is, finding the right $\lambda$ is hard in high dimensions. Stability selection instead perturbs the data many times and keeps everything that appears in a large fraction of the resulting sets. The result need not equal $\hat S^\lambda$ for any single $\lambda$.

**Robustness to tuning.** $\pi_{thr}$ is a tuning parameter, but "the results vary surprisingly little for sensible choices in a range of the cutoff" (§2.3, p. 7). Results also depend little on $\lambda$ or $\Lambda$.

**Bayesian parallel.** Barbieri & Berger (2004) show predictive optimality of the **median probability model**: variables with posterior inclusion probability $\ge1/2$, as opposed to the single highest-posterior model. $\hat S^{stable}$ is the resampling analogue, with $\pi_{thr}$ in place of $1/2$. Lee et al. (2003) and Sha et al. (2004) are applied examples. See [[Spike-and-Slab Prior for Covariate Selection]].

> [!algorithm] Stability selection (assembled from Defs 1-2, §2.6 and §2.4)
> **Input:** data $Z^{(1..n)}$; base selector $\hat S^\lambda$; grid $\Lambda$; threshold $\pi_{thr}$; number of subsamples $B$ (paper: about 100).
> 1. For $b=1,\dots,B$: draw $I_b\subset\{1..n\}$ of size $\lfloor n/2\rfloor$ without replacement. If the selector is randomised (e.g. randomised Lasso), draw its random weights too.
> 2. For each $\lambda\in\Lambda$ compute $\hat S^\lambda(I_b)$. For a path algorithm (LARS, coordinate descent), compute the whole path once.
> 3. Estimate $\hat\Pi^\lambda_k=\frac1B\sum_b\mathbf 1\{k\in\hat S^\lambda(I_b)\}$ for all $k$ and $\lambda$.
> 4. Return $\hat S^{stable}=\{k:\max_{\lambda\in\Lambda}\hat\Pi^\lambda_k\ge\pi_{thr}\}$.
> 5. (Error control) Choose $\Lambda$ so that the average number of variables selected anywhere on the path, $q_\Lambda$, satisfies $q_\Lambda^2/((2\pi_{thr}-1)p)\le$ target $E(V)$. See [[Stability Selection PFER Bound (Theorem 1) and Its Proof]].
^alg-ss-stability-selection

## Examples

> [!example] Example I - Riboflavin gene expression, permutation experiment (§2.2, Fig. 1, pp. 5-6)
> **Data.** DSM Nutritional Products data: $n=115$ samples, response = log riboflavin (vitamin B2) production rate of *Bacillus subtilis*, $p=4088$ log gene-expression covariates covering essentially the whole genome. Linear model (1), target $S=\{k:\beta_k\ne0\}$.
> **Construction of known nulls.** Randomly permute all but 6 of the 4088 genes across samples. The **same permutation** is applied to all permuted genes, which keeps their mutual dependence intact. The 6 unpermuted genes are drawn at random from the 200 genes with the highest marginal association with the response. The permuted genes are known noise.
> **Fig. 1 left (Lasso path).** $\lambda$ is rescaled so that $\lambda=1$ is the smallest value giving the null model and $\lambda=0$ is Basis Pursuit. Three relevant genes stand out, but the other three are "hidden within the paths of noise (permuted) genes". Selecting all 6 means admitting many noise variables.
> **Fig. 1 middle (stability path, Lasso).** At least four relevant genes separate clearly. The first 4 variables chosen by stability selection are all truly non-permuted.
> **Fig. 1 right (stability path, randomised Lasso, weakness $\alpha=0.2$).** All 6 unpermuted genes rise above every permuted gene before any noise variable enters.
> **Cross-validation.** The CV-chosen Lasso model includes **14 permuted variables** (p. 6). This matches earlier findings that prediction-optimal $\lambda$ over-selects (Meinshausen & Bühlmann 2006; Leng et al. 2006).
> **Interpretation.** With the stability path, choosing $\lambda$ is "much less critical" and relevant variables have a better chance of selection.
^ex-ss-riboflavin

### Fig. 1 - approximate plot readings (p. 5)

The paper gives no numbers for Fig. 1. The values below were read by eye from the rendered figure and are accurate to about ±0.02-0.05. The $\lambda$ axis runs from 1.0 (null model) on the left to 0.0 (Basis Pursuit) on the right. Red solid = the 6 unpermuted genes; black dashed = the 4082 permuted genes.

| Panel | Red (relevant) genes | Black (permuted) genes | Separation |
|---|---|---|---|
| **Left: Lasso coefficients $\hat\beta^\lambda$** | Three enter at once near $\lambda\approx0.95$: a peak of $\approx0.6$ at $\lambda\approx0.87$ falling to $\approx0.43$ at $\lambda=0$; one rising to $\approx0.5$ near $\lambda\approx0.75$ then falling back towards 0 at small $\lambda$; one at $\approx0.35$ drifting to $\approx0.27$. One negative path falls to $\approx-0.35$ by $\lambda\approx0.4$ and ends near $-0.43$. Of the other two, one enters around $\lambda\approx0.75$ and ends near $0.55$; the last stays near zero and ends around $-0.13$. | Coefficients fan out as $\lambda$ falls, reaching about $+0.85$ and $-0.8$ at $\lambda=0$. Most lie within $\pm0.4$. | **None.** By mid-path, the red paths with smaller magnitudes sit inside the black cloud. These are the "hidden" genes in the text, but the figure does not identify which 3 the authors mean. |
| **Middle: Lasso stability path $\hat\Pi^\lambda_k$** | Top: jumps to $\approx0.9$ by $\lambda\approx0.85$, plateaus at $\approx0.92$, ends $\approx0.85$. Next two peak at $\approx0.79$ and $\approx0.74$ near $\lambda\approx0.8$, then decline to $\approx0.55$ and $\approx0.52$. Fourth: $\approx0.44$ at $\lambda\approx0.8$, rising to $\approx0.55$. Fifth and sixth rise slowly to $\approx0.45$ and $\approx0.41$ at $\lambda=0$. | The bulk lies below $\approx0.25$. A few early entrants reach $\approx0.40$ around $\lambda\approx0.75$, and the highest permuted path reaches about $0.45$-$0.47$ near $\lambda\approx0.1$-0. | The top **4** red paths sit above every black path for most of the range. Below about 0.5, red genes 5-6 are mixed with the highest permuted genes. |
| **Right: randomised Lasso, $\alpha=0.2$** | Top: $\approx0.63$ by $\lambda\approx0.8$, staying at $0.6$-$0.65$. Second: $\approx0.61$ near $\lambda\approx0.7$, then falling to $\approx0.47$. Third: plateau at $\approx0.50$, ending $\approx0.42$. Fourth: rises from $\approx0.35$ to $\approx0.47$. Fifth: rises to $\approx0.36$. Sixth: rises from $\approx0.15$ ($\lambda\approx0.7$) to $\approx0.33$ at $\lambda=0$. | All selection probabilities are compressed, because random penalty weights lower every $\hat\Pi$. The bulk lies below $\approx0.15$. The highest permuted path is about $0.25$ for most of the path and about $0.29$ at $\lambda\approx0$. | **All 6** red paths end above the highest black path (sixth red $\approx0.33$ vs top noise $\approx0.29$ at $\lambda\approx0$). Over $\lambda\in[0.6,0.3]$ the sixth red gene is still close to the top of the cloud. |

**Take-aways from the readings.**
- On the Lasso stability path, any threshold in roughly $(0.47,0.74)$ picks exactly the top 4 genes and no noise. No single threshold picks all 6.
- Under $\alpha=0.2$ the absolute probabilities are lower, below $\approx0.65$. A fixed $\pi_{thr}=0.9$ would select nothing on this panel. The ordering is what improves, and $\pi_{thr}$ must be set together with $q_\Lambda$ via Theorem 1 ([[Stability Selection PFER Bound (Theorem 1) and Its Proof]]), not read off as a universal cut-off.
- The CV-chosen Lasso fit admits 14 permuted genes (text, p. 6). That is consistent with the left panel, where the red paths are hard to separate.

**Related literature on unstable gene lists (§2.2).** Selected gene sets are known to be unstable (Ein-Dor et al. 2005; Michiels et al. 2005). Davis et al. (2006) argue for "consensus" signatures. Zucknick et al. (2008) measure stability of molecular profiles with the Jaccard index.

> [!example] The permutation-null trick in a marketing setting
> **Setup:** A driver model of weekly sales on 40 candidate media and control series.
> **Steps:**
> 1. Append 40 copies of the candidate drivers, all permuted in time by the **same** permutation, so that the decoys keep their mutual correlation.
> 2. Run the selector on the augmented data.
> 3. Read the stability paths: any decoy whose path rises to the height of real drivers shows how far real drivers' selection frequencies can be trusted.
>
> **Caveat:** Permuting time series destroys autocorrelation, so for serially dependent data a block permutation is the closer analogue. This adaptation is not from the paper.
^example-ss-the-permutation-null-trick

## Connections

- Selection probabilities are a resampling-based **feature-importance stability** measure. Compare the bias of single-fit importance scores in [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] and model-to-model variability in [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- CV's tendency to admit noise variables is a case of [[Model Selection and Overfitting]]. Evaluating many $\lambda$ values and reporting the best is a forking path ([[Garden of Forking Paths]]).
- Group selection probabilities, such as "any lag of channel $j$", fit naturally with adstock-lag feature sets in MMM ([[MMM Model Selection and Application]]).

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]]
- [[Randomised Lasso and the Irrepresentable Condition]] - the randomised selector behind Fig. 1 right
