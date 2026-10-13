---
title: "Strobl 2008 - Peptide-Binding Application"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §4 Example: Relating amino acid sequence to phenotype in peptide-binding data (3 paras.), Figure 4"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]]"
  - "[[Conditional Permutation Importance (Strobl 2008 Algorithm)]]"
  - "[[Strobl 2008 - Permutation Importance Null Hypotheses]]"
used_by:
  - "[[Strobl 2008 - Discussion, mtry Guidance and Limitations]]"
aliases:
  - Strobl 2008 Figure 4
  - Peptide-Binding Conditional Importance Example
---

# Strobl 2008 - Peptide-Binding Application

> [!summary]
> The method is applied to peptide-binding data previously analysed by Segal et al.: $n = 310$ amino-acid sequences, a binary binding outcome, and **104 continuous, highly correlated predictors** (13 physicochemical properties × 8 positions). A **bagging** forest is fit (1000 trees, `mtry = 104`). The top few predictors are the same under both schemes. Further down, conditioning **reverses the order** of three highlighted variables. Marginally, h2y8 (rank 8) and flex8 (rank 9) sit above pol3 (rank 11). Conditionally, pol3 is rank 7, above flex8 (8) and h2y8 (9). h2y8 and flex8 are correlated with influential covariates, notably pol8, whereas pol3 is correlated only with non-influential ones.
^summary-peptide

## Overview

This is the only real-data illustration in the paper. The Background (§1, para. 2) explains why amino-acid *properties* are studied at all: some had been shown by Xia & Li to be relevant in DNA and protein evolution. It also says in advance that this application, "as often in practical problems", turns out to have many highly correlated predictors. The example shows that the marginal-vs-conditional choice changes *rankings* in practice, not only in a simulated design.

## Main Content

> [!example] Data and model (§4, para. 1)
> | Item | Value |
> |---|---|
> | Source | Peptide-binding data analysed with recursive partitioning by Segal et al. |
> | Observations | $n = 310$ amino-acid sequences |
> | Variables | 105 in total: 1 response + 104 predictors |
> | Response | Binding property, coded binary (binding / no binding) |
> | Predictors | 13 amino-acid properties (e.g. volume, polarity, bulkiness, flexibility, aromaticity, charge) at each of 8 positions = 104 continuous variables |
> | Forest | 1000 trees, `mtry = 104` = **bagging** (all predictors are candidates at every split; no random restriction) |
> | Importance | Unconditional vs conditional permutation scheme |
> | Conditioning set $Z$ | Pearson-correlation threshold: $Z$ = predictors whose empirical correlation with $X_j$ exceeds "a certain moderate threshold" (§2.5 says this rule is used "in the following simulation study and application example"). **The threshold value used in §4 is not reported.** The simulation (§3) used $r \ge .2$; it is not stated whether the same value was used here. |
>
> Variable names combine the property and the position, e.g. "pol3" = polarity at position 3, "flex8" = flexibility at position 8, "h2y8" = property "h2y" at position 8 (the paper does not expand this abbreviation).
^ex-peptide-data

**Figure 4** ("Example: peptide-binding data"): marginal (top) and conditional (bottom) permutation importance for all 104 predictors. The three variables of interest are highlighted, and pol8 is marked with \*. The paper notes that the absolute values of the scores should not be interpreted.

> [!theorem] Finding: conditioning reorders mid-ranked predictors (§4, paras. 1-2)
> - The few highest-scoring predictors, some of which run off the plotting area, would be selected under either scheme.
> - For the next tier, the **ranking depends strongly on the scheme**:
>
> | Variable | Marginal rank | Conditional rank |
> |---|---|---|
> | h2y8 | 8 | 9 |
> | flex8 | 9 | 8 |
> | pol3 | 11 | 7 |
>
> - The change is largest for large `mtry`, as expected, but similar effects occur at smaller `mtry`. This implies fits at other `mtry` values, but **those values and their results are not reported anywhere in the paper**. Figure 4 shows only `mtry = 104`.
^thm-peptide-rerank

### What Figure 4 shows numerically (digitized)

The bar heights below were read from the published image ([[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance#^ex-fig4-values]]). The paper warns that absolute values should not be interpreted, so they are useful for *relative* comparisons only.

| | Marginal VI | Conditional VI | Change |
|---|---|---|---|
| h2y8 | ≈0.0117 (rank 8) | ≈0.0018 (rank 9) | −85% |
| flex8 | ≈0.0063 (rank 9) | ≈0.0024 (rank 8) | −60% |
| pol3 | ≈0.0038 (rank 11) | ≈0.0036 (rank 7) | ≈ −5% |
| pol8 (\*) | off the plot (top 5) | ≈0.0103 (rank 3) | reduced |

- **Top tier.** 5 bars run off the marginal panel (above about 0.014) and 2 off the conditional panel. pol8 is one of the five marginal off-scale bars.
- **Who the top-ranked variables are.** Apart from pol8, the figure does not label the top-ranked predictors and the text does not name them. **Their identities cannot be recovered from the paper.** The order of the 104 predictors along the x-axis is not explained either.
- **Mechanism of the reversal.** pol3 barely moves. The reversal happens because h2y8 and flex8 lose most of their marginal importance.
- **Scale.** The y-axis is labelled 0 and 0.005, with a tick at 0.010. Because the response is binary, the scores are decreases in OOB accuracy (Eq. 1).

### Explanation (§4, paras. 2-3)

- **h2y8 and flex8** are correlated with **influential** covariates, so conditioning removes the importance they borrowed from them. In particular, h2y8 is highly correlated with **pol8** (polarity at position 8).
- **pol3** is correlated only with **non-influential** covariates, so its importance barely changes.
- **pol8** has high importance (also reduced by conditioning). Segal et al. had already found it influential. They suggested it may stand for an effect of the eighth *position* in the raw sequence, while Xia & Li's results point to an effect of the polarity *property* itself.

> [!theorem] Conclusion of the application (§4, final para.)
> In data with complex correlations among predictors, importance rankings "can be severely affected by the underlying permutation scheme". Conditional permutation moderates the scores of correlated predictors, so the truly influential predictors have a better chance of being detected.
^thm-peptide-conclusion

## Examples

> [!example] Marketing parallel (illustrative)
> Swap amino-acid properties for creative or audience attributes measured across 8 placements: reach, frequency, viewability, completion rate, and so on. Attributes at the same placement are highly correlated, like h2y8 and pol8. A placement-level attribute can rank high marginally only because it tracks the placement's true driver. Conditioning on the other attributes at the same placement corrects this.
^example-peptide-2

## Connections

- **Bagging as a special case.** `mtry = p` means every split sees all competitors. Fig. 1 does not cover `mtry = p`, but at its largest value (`mtry = 8` of 12) a zero-coefficient proxy ($X_4$) wins the root split only about 5% of the time, although still more often than the uncorrelated drivers. With the split-selection effect weakest at high `mtry`, the permutation-scheme effect ([[Strobl 2008 - Permutation Importance Null Hypotheses]]) still reorders rankings, which shows that mechanism 2 matters on its own.
- **Unknown truth.** With no ground truth, "pol3 is really more important" (§4) is a model-based claim. Treat it as a hypothesis to check, ideally with external validation or experiments ([[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] shows the marketing version of this caution).
- **Stability.** Rank changes of 1-4 places among 104 variables are within the range that seed-to-seed or subsample variation could produce. [[Strobl 2008 - Discussion, mtry Guidance and Limitations]] requires enough trees to rule this out, and [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] gives a formal tool.

## See Also

- [[Strobl 2008 - Simulation Results for Conditional Importance]]
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
