---
title: "Strobl 2008 - Simulation Results for Conditional Importance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §3 Results (all paras.), Figure 3"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]"
  - "[[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]"
  - "[[Conditional Permutation Importance (Strobl 2008 Algorithm)]]"
used_by:
  - "[[Strobl 2008 - Discussion, mtry Guidance and Limitations]]"
aliases:
  - Strobl 2008 Figure 3
  - Strobl 2008 Simulation Results
---

# Strobl 2008 - Simulation Results for Conditional Importance

> [!summary]
> Over 500 replications of the 12-predictor design, **marginal** permutation importance does not reproduce the true coefficient pattern. It strongly overstates the correlated predictors $X_1$–$X_4$, most of all at small `mtry`. **Conditional** importance, with $Z$ = all variables correlated with $X_j$ at $r \ge .2$, does much better. The correlated $X_1, X_2$ ($\beta = 5$) move much closer to the uncorrelated $X_5, X_6$ ($\beta = -5$), while $X_3, X_4$ fall. The text calls the result "almost equal", but the digitized Figure 3 medians are still about 1.5–2× higher. Correlated variables with small or zero coefficients are still overstated, but much less. Conditional importance also has **lower variance** at every `mtry`. Variability rises with `mtry`.
^summary-simresults

## Overview

This note records §3 and Figure 3. The design is in [[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles#^ex-sim-design]]. The two scores compared are the marginal permutation importance ([[Strobl 2008 - Permutation Importance Null Hypotheses#^def-vi-forest]]) and the conditional one ([[Conditional Permutation Importance (Strobl 2008 Algorithm)#^alg-cpi]]).

## Main Content

**Figure 3** ("Permutation importance"): median permutation importance over 500 replications for the **marginal** scheme (dashed) and the **conditional** scheme (solid, per the caption; in the published image both lines are in fact dashed and the schemes are distinguished by colour, red squares vs blue circles; see [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]), with inter-quartile ranges, for each of the 12 variables. There is one panel for each of `mtry` = 1, 3, 8, each with its own y-scale (0-30, 0-60, 0-100). The caption notes that the ordering of variables on the plot is arbitrary.

**Settings.** 500 iterations. Conditioning set: all variables with empirical correlation $r \ge .2$ with $X_j$. In this design that means $X_1$–$X_4$ condition on each other, and $X_5$–$X_{12}$ have, in expectation, no conditioning variables.

> [!theorem] Finding 1: marginal importance misrepresents the DGP (§3, para. 2)
> Under the ordinary permutation scheme, "the importance scores of the correlated predictor variables are highly overestimated." The coefficient pattern is not recovered. The effect is **largest for small `mtry`**, because correlated variables are more likely to reach top positions in a tree when their correlated competitors are not available as split candidates.
^thm-res-marginal

> [!theorem] Finding 2: conditional importance tracks the true pattern better (§3, para. 3)
> 1. $X_1, X_2$ (correlated, $\beta = 5$) "show an almost equal level of importance" as $X_5, X_6$ (uncorrelated, $\beta=-5$). Fig. 3 readings are 16/20/31 vs 9/13/16 at `mtry` = 1/3/8, so closer than under marginal permutation but not equal.
> 2. $X_3$ ($\beta=2$) and $X_4$ ($\beta=0$), which are correlated, **decrease**.
> 3. For small and zero coefficients, correlated variables still score above their uncorrelated counterparts ($X_3$ vs $X_7$, $X_4$ vs $X_8$). The overestimation remains but is "to a much lesser extent". The proposed reason is that uncorrelated variables are chosen less often and lower in trees (Fig. 1), so they have less chance to earn a high importance.
> 4. The remaining preference for correlated variables depends on `mtry` and is strongest at small `mtry`.
^thm-res-conditional

> [!theorem] Finding 3: variance and the `mtry` trade-off (§3, para. 3)
> - The variability of the importance **increases with `mtry`**, while prediction accuracy is expected to be higher at smaller `mtry`.
> - **Within each `mtry` level, conditional importance has lower variability than unconditional importance.**
^thm-res-variance

> [!theorem] Finding 4: two different tasks (§3, para. 4)
> - **Picking influential variables out of a correlated set** (the Archer & Kimes / Nicodemus & Shugart task). Comparing $X_1$–$X_3$ with $X_4$, conditional importance shows the *same pattern* as marginal importance with **notably smaller variation**, which may improve identification.
> - **Comparing correlated with uncorrelated predictors.** Conditional importance is "much better suited" than the original.
> - For **piecewise-constant** response functions, which recursive partitioning fits more easily, the benefit of conditioning is "even stronger than presented here".
^thm-res-tasks

### Summary table: text statements vs figure readings

Column "§3 text" gives only what the text says. Cells marked *(inferred)* are not stated in §3 and come from §2.4 logic or the design. The numbers are medians digitized from Figure 3 for `mtry` = 1 / 3 / 8 ([[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^ex-fig3-values]]).

| Variable | $\beta$ | Correlated? | §3 text: marginal | §3 text: conditional | Fig. 3 marginal median | Fig. 3 conditional median |
|---|---|---|---|---|---|---|
| $X_1, X_2$ | 5 | yes | "highly overestimated" | "almost equal level" to $X_5, X_6$ | 29 / 50 / 70 | 16 / 20 / 31–33 |
| $X_3$ | 2 | yes | "highly overestimated" | decreases; still overestimated vs uncorrelated | 27 / 35 / 17 | 14 / 12 / 8 |
| $X_4$ | 0 | yes | "highly overestimated" | decreases; still overestimated vs uncorrelated | 26 / 27 / 7 | 13 / 8 / 3 |
| $X_5, X_6$ | −5 | no | *(inferred: not discussed)* | reference level for $X_1, X_2$ | ≈9 / 13 / 16 | 9 / 13 / 16 |
| $X_7$ | −2 | no | *(inferred: not discussed separately)* | the "uncorrelated" comparator for small coefficients | ≈1.6 / 1.2 / 0.4 | 1.6 / 1.2 / 0.4 |
| $X_8$–$X_{12}$ | 0 | no | *(inferred: not discussed separately)* | the "uncorrelated" comparator for zero coefficients | ≈0 | ≈0 |

**The `mtry` grid.** The panels of Figure 3 (and Figure 1) are `mtry` = 1, 3 and 8. The text never gives these values.

**A discrepancy between text and figure.** The digitized conditional medians for $X_1$ vs $X_5$ are 16 vs 9, 20 vs 13 and 31 vs 16. Conditioning shrinks the correlated/uncorrelated ratio from about 3.2–4.4× to about 1.5–2×, but the two are not "almost equal" as §3 para. 3 says. Also, by the $X_1/X_5$ ratio the *marginal* inflation of the strong correlated drivers grows with `mtry`. The §3 statement "most pronounced for small values of mtry" fits the weak and null correlated variables: the marginal $X_3, X_4$ are near $X_1$ at `mtry = 1` and fall back at `mtry = 8`. See [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^thm-fig3-readings]].

## Examples

> [!example] Reading the result as a validation check (generic)
> Before trusting a driver ranking from a tree ensemble on correlated marketing inputs, rerun this kind of matched-pair simulation with your own correlation structure, sample size (e.g. 104 weekly rows) and `mtry`. Plant a zero-effect variable that correlates with a strong channel. If its marginal importance clearly exceeds that of an independent small-effect channel, rank comparisons between correlated and uncorrelated channels are not reliable in that setting.
^example-simresults-2

## Connections

- **Reporting gaps against ADEMP.** The text gives no sample size per data set, no Monte Carlo standard errors and no numerical table. Results are shown only as median and IQR in a figure. The `mtry` grid {1, 3, 8} appears only in the figure panels. The digitized values in [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] partly fill this gap. See [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] for the checklist this would be judged against.
- The leftover correlated-variable bias links the two mechanisms. Conditioning fixes the *permutation* null ([[Strobl 2008 - Permutation Importance Null Hypotheses]]) but not the *selection* preference ([[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]).
- The coarse grid and the oracle calculation in [[Strobl 2008 - Permutation Importance Null Hypotheses#^ex-oracle]] help explain why conditional $X_1$ lands *near* $X_5$ (and still above it in Fig. 3) instead of far below it, which is where exact conditioning on $X_2$–$X_4$ would put it.

## See Also

- [[Strobl 2008 - Peptide-Binding Application]]
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
