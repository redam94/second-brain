---
title: "Conditional Permutation Importance (Strobl 2008 Algorithm)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §2.5 A new, conditional permutation scheme (grid requirements, cutpoint grid, 4-step algorithm, choice of Z, computational remarks); threshold r >= .2 from §3"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Permutation Importance Null Hypotheses]]"
  - "[[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]"
  - "[[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]"
used_by:
  - "[[Strobl 2008 - Simulation Results for Conditional Importance]]"
  - "[[Strobl 2008 - Peptide-Binding Application]]"
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
aliases:
  - Conditional Permutation Importance
  - Conditional Variable Importance Algorithm
  - Tree-Partition Conditional Permutation
  - varimp conditional
---

# Conditional Permutation Importance (Strobl 2008 Algorithm)

> [!summary]
> The conditional permutation importance permutes $X_j$ only **within cells of a grid** built from each tree's own cutpoints on the conditioning variables $Z$. This approximates the conditional-independence null $(X_j \perp Y)\mid Z$ for predictors of any scale. For each tree: (1) compute OOB accuracy; (2) take every cutpoint the tree uses on each variable in $Z$ and treat it as a bisector of the **whole** sample space; (3) permute $X_j$ within the resulting cells and recompute OOB accuracy; (4) take the difference and average over trees. $Z$ can be all other variables (the most conservative choice), variables whose correlation with $X_j$ exceeds a threshold (the paper uses $r \ge .2$), variables chosen by conditional-inference $p$-values, or a user-chosen set. Grid complexity is limited by **tree depth**, not by $p$.
^summary-cpi

## Overview

Conditioning on $Z = z$ is easy when $Z$ is categorical, as in CARTscans. It is hard when $Z$ contains many variables of mixed type, including continuous ones. The paper's idea is to use the discretization the forest has already learned. This concept is owned by this note in the vault. The general permutation-importance concept belongs to [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].

## Main Content

### Requirements for the conditioning grid (§2.5, para. 1)

The grid within which $X_j$ is permuted should:
1. (i) apply to variables of **different types**;
2. (ii) be **as parsimonious as possible**. The justification given in §2.5 para. 3: by using the cutpoints of the current tree, the scheme can "create a grid that may be more parsimonious than the full factorial approach of [22]" (CARTscans, which crosses all levels of the conditioning variables). A tree only splits $Z_k$ where that helps prediction, so many potential cells never appear;
3. (iii) be **computationally feasible**.

Proposal: for each tree, define the grid from **the partition of the feature space induced by that tree**. The scheme is not tied to one tree algorithm: "In principle, any partition derived from a classification tree can be used to define the permutation grid" (§2.5, para. 2). The paper's own implementation uses partitions from **unbiased conditional inference trees** (Hothorn et al., ref. [31]; see [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] for why unbiased split selection matters), which use binary splitting as in CART. That partition (a) was already learned from the data, (b) contains splits on categorical, ordered and continuous variables, and (c) is therefore an "internally available" discretization of the feature space.

> [!definition] Tree-induced conditional permutation grid (§2.5, paras. 2-3)
> Fix tree $t$ and the conditioning set $Z$. For each $Z_k \in Z$, collect all cutpoints $c_{k,1}, \dots, c_{k,m_k}$ at which tree $t$ splits on $Z_k$ (anywhere in the tree). The grid is the **cross-product of the intervals or category subsets** these cutpoints create on each $Z_k$:
> $$\mathcal{G}^{(t)}(Z) = \Big\{ \textstyle\prod_{k} A_{k,\ell_k} \Big\},\qquad A_{k,\ell}\ \text{the cells of } Z_k \text{ cut at } c_{k,1},\dots,c_{k,m_k}.$$
> - **Binary splitting** (as in CART and conditional-inference trees): a categorical variable with $k$ categories is divided into at most $k$ subsets, possibly fewer.
> - **Continuous variables**: each binary split adds a cutpoint, which gives a coarser or finer grid on that variable.
> - **Deliberate departure from the tree structure.** In the tree, a cutpoint applies only *within its node*, so it cuts part of the space, not all of it. For ease of computation the grid treats **every cutpoint as a bisector of the entire sample space**. CARTscans makes the same simplification.
^def-cpi-grid

**Consequences of the bisector choice.** The grid is finer than the tree's partition. Small cells can add variance, though "our simulation results indicate that in practice this is not a critical issue". The authors' principle is that "conditioning too strictly has no negative effect, while a lack of conditioning produces artefacts as observed for the unconditional permutation importance" (§2.5, para. 3).

### The algorithm (§2.5, "In summary …")

> [!algorithm] Conditional permutation importance (Strobl et al. 2008, §2.5)
> **Input:** fitted forest $\{f^{(t)}\}_{t=1}^{ntree}$ with OOB sets $\overline{\mathcal B}^{(t)}$; variable of interest $X_j$; conditioning set $Z$.
>
> For each tree $t = 1,\dots,ntree$:
> 1. **OOB accuracy before permutation** (as in Eq. 1):
> $$\mathrm{acc}^{(t)} = \frac{\sum_{i\in\overline{\mathcal B}^{(t)}} I\big(y_i = \hat y_i^{(t)}\big)}{|\overline{\mathcal B}^{(t)}|}.$$
> 2. **Build the grid.** For every $Z_k \in Z$, extract the cutpoints at which tree $t$ splits $Z_k$, and bisect the sample space at each cutpoint. This gives cells $\mathcal G^{(t)}(Z)$.
> 3. **Permute within cells.** "Within this grid permute the values of $X_j$" (step 3, verbatim wording). This gives $\mathbf{x}_{i,\pi_j\mid Z}$. Recompute the accuracy:
> $$\mathrm{acc}^{(t)}_{\pi_j\mid Z} = \frac{\sum_{i\in\overline{\mathcal B}^{(t)}} I\big(y_i = \hat y_{i,\pi_j\mid Z}^{(t)}\big)}{|\overline{\mathcal B}^{(t)}|},\qquad \hat y_{i,\pi_j\mid Z}^{(t)} = f^{(t)}(\mathbf{x}_{i,\pi_j\mid Z}).$$
> 4. **Tree importance:** $VI^{(t)}_{\text{cond}}(X_j) = \mathrm{acc}^{(t)} - \mathrm{acc}^{(t)}_{\pi_j\mid Z}$.
>
> **Output:** $VI_{\text{cond}}(X_j) = \frac{1}{ntree}\sum_t VI^{(t)}_{\text{cond}}(X_j)$.
>
^alg-cpi

> [!note] Editorial interpretations (not stated in the paper)
> The four steps above transcribe §2.5. Two practical details are **this note's reading, not the source's**:
> - **Which observations are shuffled.** The paper says only "within this grid permute the values of $X_j$" and then scores accuracy on the OOB sample $\overline{\mathcal B}^{(t)}$. It does not say whether the shuffle is done among the OOB rows of each cell only. Permuting among OOB rows within each cell (as in the pseudo-code below) is the natural reading, mirroring Eq. 1, but it is an assumption.
> - **Regression.** The paper defines the measure only for classification accuracy (binary/categorical response). Using OOB MSE with the sign reversed (importance = MSE after − MSE before) is the obvious extension, not something the paper states.
^note-cpi-2

```python
# Pseudo-code sketch (not from the paper)
def conditional_vi(forest, X, y, j, Z, metric):
    scores = []
    for tree, oob in forest.trees_with_oob():
        Xo, yo = X[oob], y[oob]
        base = metric(yo, tree.predict(Xo))
        cuts = {k: tree.cutpoints(k) for k in Z}          # step 2
        cell = cell_ids(Xo[:, list(Z)], cuts)              # bisect whole space
        Xp = Xo.copy()
        for c in unique(cell):                             # step 3
            idx = where(cell == c)
            Xp[idx, j] = permutation(Xo[idx, j])
        scores.append(base - metric(yo, tree.predict(Xp)))  # step 4 (accuracy)
    return mean(scores)
```

### Choosing the conditioning set $Z$ (§2.5, para. after algorithm)

| Strategy | Description | Paper's comment |
|---|---|---|
| All other variables | $Z = X_{-j}$, as in the initial notation | "the most conservative – or rather overcautious" |
| Correlation threshold | Variables whose empirical correlation with $X_j$ exceeds a moderate threshold (Pearson, for continuous variables) | Stated to be used "in the following simulation study and application example". §3 gives $r \ge .2$; §4 (peptide application) **does not report the threshold value** |
| Conditional-inference $p$-values | Association $p$-values from the Hothorn et al. framework | Comparable across variable types; "an intuitive and objective means" of choosing $Z$ |
| User choice | Variables selected for a substantive hypothesis that involves particular independencies | — |

### Computational remarks (§2.5, final paras.)

- **Neither many conditioning variables nor large $p$ is a problem.** Importance is computed tree by tree, and each tree's grid uses only that tree's partition. Small cells could in principle make the permutation less stable, but in practice grid complexity is **bounded by tree depth**.
- **Tree depth does not depend on $p$.** It depends on properties of the data, above all the ratio of relevant to noise variables (usually low, e.g. in genomics). It also depends on tuning: `mtry`, the split criterion and stopping rules. Lin & Jeon note that limiting depth can even improve accuracy.
- **Coverage across trees.** The conditioning variables need not all appear in the same tree as $X_j$. Different trees can represent different combinations, provided the forest is large enough.

## Examples

> [!example] A two-variable grid (illustrative, not in the paper)
> Suppose a tree splits $Z_1$ (TV GRPs) at 120 near the root, and, inside the right branch only, splits $Z_1$ again at 300 and $Z_2$ (price index) at 0.95. Treating each cutpoint as a global bisector gives the grid $\{Z_1<120,\ 120\le Z_1<300,\ Z_1\ge 300\} \times \{Z_2<0.95,\ Z_2\ge 0.95\}$, which has 6 cells. The tree itself has only 4 leaves. To score paid social $X_j$ conditionally, its OOB values are shuffled only among weeks in the same cell. A heavy-TV, low-price week therefore only receives a paid-social value seen in another heavy-TV, low-price week. With 104 weekly OOB rows the cells hold about 17 weeks on average. That is enough to permute, and the over-fine grid is the source of the "small cell" variance the paper mentions.
^example-cpi-3

> [!example] Practical use (generic)
> With per-segment tree models of a shared aggregate KPI, compute both marginal and conditional importance and treat a large gap as a diagnostic. A channel whose importance collapses under conditioning is mostly a *proxy* for its correlated partners. Its marginal rank should not drive allocation.
^example-cpi-4

## Connections

- **Software.** The paper says the method will appear in the next release of `party` (§5). It was later released as `varimp(..., conditional = TRUE)`. Later revisions (`permimp`, Debeer & Strobl 2020) changed the threshold and grid logic; that is context outside this source.
- **Related ideas.** Knockoff and conditional-randomization tests, and conditional-sampling SHAP ([[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]]), also aim at $(X_j\perp Y)\mid Z$. They do it with a generative model of $X_j \mid Z$ rather than a tree grid.
- **Stays on the data manifold.** Because the dependence between $X_j$ and $Z$ is kept, this method avoids the extrapolation problem in [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Researcher choices.** The threshold, the conditioning strategy and `mtry` are all analyst choices. Report sensitivity to them instead of picking the most convenient ranking ([[Researcher Degrees of Freedom]]).

## See Also

- [[Strobl 2008 - Permutation Importance Null Hypotheses]]: why within-$Z$ permutation tests the right null.
- [[Strobl 2008 - Simulation Results for Conditional Importance]], [[Strobl 2008 - Peptide-Binding Application]]: the evidence.
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
