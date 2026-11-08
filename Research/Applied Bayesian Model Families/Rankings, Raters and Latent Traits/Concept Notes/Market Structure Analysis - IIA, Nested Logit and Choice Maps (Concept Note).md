---
title: "Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)"
tags:
  - source/ingested
  - topic/latent-traits
  - type/concept
  - doc/concept-note
source: "concept note, no raw source (cites Allenby and Rossi 1991; Elrod 1988; Elrod and Keane 1995; McFadden 1978; Train 2009)"
source_location: "Synthesis; see Elrod and Keane 1995 notes for the probit factor model"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Concept Notes"
doc_type: concept
depends_on:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]"
  - "[[Discrete Choice Models]]"
used_by:
  - "[[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]"
aliases:
  - IIA violations market structure
  - nested logit market structure
  - brand competition map
  - switching lift
  - Allenby Rossi market structure
---

# Market Structure Analysis - IIA, Nested Logit and Choice Maps (Concept Note)

> [!summary]
> Market structure analysis asks who competes with whom. The multinomial logit's independence of irrelevant alternatives (IIA) forces proportional substitution, so deviations from IIA are the signal of structure. Tools: switching matrices and switching lift, nested logit (hierarchies by form, brand or tier), latent-class segments, and low-rank "choice map" factor models of brand utilities (Elrod's Choice Map; the factor-analytic probit). Aggregation caveat: Allenby & Rossi (1991) argued that the logit with heterogeneity and a flexible demand specification does not necessarily suffer "aggregation bias". Concept note, no raw source; the original Allenby & Rossi paper has no legal open copy, so substitute reading is Elrod & Keane (1995).

## Overview

Data of interest (E84 margarine scanner panel: 516 households, 4,470 purchases of 10 products with all shelf prices; E85 cereal purchase-incidence data: household x brand 0/1 with activity and demographics). Questions: which brands are substitutes, which hierarchy (form, brand, tier) organises choice, and how to draw a map where distance reflects competition.

## Main Content

> [!definition] IIA and its testable implication
> In multinomial logit, $P_j/P_k=\exp(V_j-V_k)$ does not depend on the other alternatives. Removing or repricing brand $m$ therefore redistributes its share to the others in proportion to their shares: diversion to $j$ equals $s_j/(1-s_m)$. Observed diversion that exceeds this for similar brands is an IIA violation and evidence of structure.
> ^def-iia

> [!definition] Switching matrix and switching lift
> Count transitions between consecutive purchases: $S_{jk}=\#\{\text{purchase of }j\text{ at }t,\ k\text{ at }t+1\}$. **Switching lift** $=\dfrac{S_{jk}/\sum_kS_{jk}}{s_k}$ compares the observed share of next purchases going to $k$ after $j$ with $k$'s overall share. Under no state dependence and IIA, lift is 1; diagonal lift above 1 means loyalty or inertia; off-diagonal blocks above 1 mean substitutes.
> ^def-switching-lift

> [!definition] Nested logit
> Alternatives are partitioned into nests $B_g$. $P_j=\dfrac{e^{V_j/\lambda_g}\bigl(\sum_{k\in B_g}e^{V_k/\lambda_g}\bigr)^{\lambda_g-1}}{\sum_h\bigl(\sum_{k\in B_h}e^{V_k/\lambda_h}\bigr)^{\lambda_h}}$ for $j\in B_g$; $\lambda_g\in(0,1]$ is the within-nest dissimilarity (correlation roughly $1-\lambda_g^2$); $\lambda_g=1$ recovers multinomial logit (IIA); smaller $\lambda_g$ means closer substitutes within the nest. Competing hierarchies (nest by form, by brand, by tier) are compared on held-out purchases: the hierarchy with the best predictive log-score is the one consumers use (E84's tests).
> ^def-nested-logit

> [!definition] Choice maps from factor-structured utilities
> $\tilde u_{ij}=\alpha_j+l_j'w_i+\epsilon_{ij}$ with household loadings $w_i\sim N(c,I)$ on $M\ll J$ brand attributes $l_j$ (Elrod's Choice Map; the probit version in [[Elrod and Keane 1995 - Factor-Analytic Probit Model Specification]]). Distance between $l_j$ and $l_k$ in the map reflects closeness of competition. For purchase incidence (0/1) the Bernoulli-logit analogue is $\text{logit}\,P(y_{ij}=1)=\beta_j+\gamma_{j}'z_i+l_j'w_i$ with household activity/volume control $z_i$ (E85). A **naive map's first axis is often volume** (heavy buyers buy everything), so control for household purchase activity first - co-purchase lift is confounded by volume.
> ^def-choice-map

> [!theorem] Aggregation and the Allenby-Rossi point (stated as in the literature, verify)
> Allenby & Rossi (1991), "There is no aggregation bias: why macro logit models work" (Journal of Business & Economic Statistics 9(1)), argue that macro (aggregate) logit models are consistent with micro behaviour when heterogeneity is modelled through flexible functions of price and covariates; the vault does not hold the PDF, so treat the details as unverified recall.
> ^thm-allenby-rossi

## Examples

> [!example] Proportional diversion vs structured diversion
> **Setup.** Four brands, equal 25% share; brands 0 and 1 are close substitutes (a one-factor probit with loadings $\pm0.8$ and unique variance 1).
> **Solution.** Remove brand 0. IIA predicts $1/3$ each; the factor probit gives $(0.394,0.302,0.304)$ for brands 1, 2, 3 (simulated in the Elrod & Keane specification note).
> **Interpretation.** Brand 1 gains 39% vs 33%: diversion ratio $0.394/0.334=1.18$ is an IIA-violation fingerprint of market structure.
> ^ex-diversion

```python
import numpy as np
# switching matrix and lift from a purchase sequence per household
def switching_lift(seqs, J):
    S = np.zeros((J, J))
    for s in seqs:
        for a, b in zip(s[:-1], s[1:]): S[a, b] += 1
    share = np.bincount(np.concatenate(seqs), minlength=J)/sum(len(s) for s in seqs)
    return (S/S.sum(1, keepdims=True))/share[None, :]
rng = np.random.default_rng(0)
seqs = [rng.choice(4, size=12, p=[.4, .3, .2, .1]) for _ in range(500)]
print(switching_lift(seqs, 4).round(2))                 # all about 1.0 under IIA with no state dependence
```

PyMC-style Bernoulli-logit factor sketch for E85 (untested): `L = pm.Normal("L", 0, 1, shape=(J, M))`, `w = pm.Normal("w", 0, 1, shape=(H, M))`, `logit_p = beta[None, :] + gamma*activity[:, None] + w @ L.T`; identify rotation by constraining `L` lower-triangular with positive diagonal (or centred-loading prior); use held-out wave log-score to choose $M$.

## Relevance to marketing measurement

Cross-elasticity structure drives promotion cannibalisation, price-war exposure and assortment decisions, and belongs in any MMM that models brand-level sales jointly. IIA-based predictions systematically over-state diversion to dissimilar brands. See the BLP-style continuous-heterogeneity approach in [[Random Coefficients Logit Model]].

## Connections

- Choice models: [[Discrete Choice Models]]; heterogeneity: [[Random Coefficients Logit Model]]; probit factor model: [[Elrod and Keane 1995 - Empirical Assessment on Detergent Panel Data]].
- Factor structure/rotation issues: [[Factor Analysis and PPCA]]; latent classes: [[Monsters and Mixtures]].

## See Also

[[Elrod and Keane 1995 - Factor-Analytic Probit Market Structure - Overview]]
