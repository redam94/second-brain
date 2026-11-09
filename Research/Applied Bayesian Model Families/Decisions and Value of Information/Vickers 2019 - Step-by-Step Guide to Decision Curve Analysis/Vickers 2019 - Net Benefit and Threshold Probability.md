---
title: "Vickers 2019 - Net Benefit and Threshold Probability"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/definition
  - doc/paper
source: "[[raw/Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis.pdf]]"
source_location: "Introduction p. 1; Steps 3-4, pp. 3-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis"
doc_type: paper
depends_on:
  - "[[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]"
  - "[[Decision Analysis]]"
used_by:
  - "[[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]]"
  - "[[Vickers 2019 - Ten Questions and Limits of Decision Curves]]"
aliases:
  - Net benefit formula
  - Threshold probability and exchange rate
---

# Vickers 2019 - Net Benefit and Threshold Probability

> [!summary]
> Net benefit converts false positives into true-positive units at the exchange rate given by the odds of the threshold probability $p_t$. The threshold encodes how many unnecessary interventions one accepts to catch one case; it is both the preference and the decision rule.

## Overview

The paper states the formula in its Introduction and then explains the *meaning* of each ingredient in Steps 3 and 4. This note collects the formal pieces and adds derivations the paper omits (marked as such).

## Main Content

> [!definition] Net benefit
> For a model giving predicted probability $\hat p$, call a patient positive when $\hat p\ge p_t$. Then
> $$NB(p_t)=\text{sens}(p_t)\cdot\pi-\big(1-\text{spec}(p_t)\big)(1-\pi)\,w,\qquad w=\frac{p_t}{1-p_t},$$
> with prevalence $\pi$. Equivalently $NB=\frac{TP}{n}-\frac{FP}{n}\,w$.
^def-net-benefit-dca

> [!definition] Threshold probability
> The minimum probability of disease at which intervention would be warranted. It is the unit of "preference". A threshold of $p_t$ corresponds to odds $w=p_t/(1-p_t)$: the doctor is saying one missed case is as bad as $1/w$ unnecessary interventions.
^def-threshold-prob

> [!definition] Reference strategies
> *Intervene for none*: $NB\equiv0$. *Intervene for all*: $NB_{\text{all}}(p_t)=\pi-(1-\pi)\,w$, which crosses zero at $p_t=\pi$.
^def-all-none

> [!theorem] Why the odds weight is right (derivation not in the paper)
> Let the benefit of treating a true case be $B$ and the harm of treating a non-case be $H$. Treat a patient with risk $p$ iff $pB-(1-p)H\ge0$, i.e. iff $p\ge p_t=H/(H+B)$, so $H/B=p_t/(1-p_t)=w$. Expected utility per patient of a policy, in units of $B$, is $\text{TP rate}\cdot1-\text{FP rate}\cdot w=NB$. Net benefit is therefore expected utility rescaled so that a true positive is worth 1 and treat-none is worth 0. *Proof sketch complete.*
^thm-nb-utility

### Interpretations given in the paper

- **Units.** "The unit of net benefit is true positives. A net benefit of 0.07, for instance, means '7 true positives for every 100 patients in the target population.'" The same value can arise from many TP/FP combinations, as the same net profit arises from many income/expenditure pairs.
- **Net-profit analogy.** A wine importer buys EUR 1m of wine, sells for USD 1.5m, exchange rate 1.25: net profit $1.5\text{m}-1\text{m}\times1.25=$\$250,000. In diagnosis, income = true positives, expenditure = false positives, exchange rate = false positives worth one true positive (from $p_t$). The same logic matches net monetary or net health benefit with willingness to pay.
- **Odds reading.** 10% $\Leftrightarrow$ odds 1:9 $\Leftrightarrow$ "number-needed-to-test of 10".
- **Plausible range.** The curve in Fig. 2 stops at 20% because "we would consider it unreasonable for any patient or doctor to demand greater than 20% risk before accepting biopsy"; the range is context dependent.
- **Treatment effect is implicit in the threshold.** A drug cutting cardiac risk by 10% relative from a 10% baseline, with an absolute 1% risk of a serious side effect of equal harm, has a minimum threshold of 10%; a 20% relative reduction gives 5%. More effective treatment means a lower threshold.
- **Net reduction in interventions** (Step 5): $NB_{\text{avoided}}=\frac{TN}{n}-\frac{FN}{n}\cdot\frac{1}{w}$, a version for when "intervene for all" is the standard (this is the standard rescaling by $(1-p_t)/p_t$; the paper only reports the interpretation).

## Examples

Prostate example, pt = 10%: prevalence 0.10, test sens 0.40, spec 0.90. $w=1/9$. $NB_{\text{test}}=0.40(0.10)-0.10(0.90)(1/9)=0.04-0.01=0.030$; $NB_{\text{all}}=0.10-0.90/9=0$. At $p_t=5\%$: $0.0353$ vs treat-all $0.0526$, so treat-all wins for very low thresholds. At $p_t=20\%$: $0.0175$ vs $-0.125$. (All computed here from the paper's stated parameters; see the code in [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]].)

## Connections
- This is expected-utility decision theory with utilities collapsed to a single ratio; compare [[Decision Analysis]].
- For calibration versus discrimination, see Q5 in [[Vickers 2019 - Ten Questions and Limits of Decision Curves]].

## See Also
- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]
