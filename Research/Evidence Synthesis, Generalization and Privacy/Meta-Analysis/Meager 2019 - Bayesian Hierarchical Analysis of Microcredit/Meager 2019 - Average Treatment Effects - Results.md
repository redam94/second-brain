---
title: "Meager 2019 - Average Treatment Effects - Results"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
source_location: "Sec. III (pp. 71-74): Table 2, Figs 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
depends_on:
  - "[[Meager 2019 - Hierarchical Model Specifications]]"
  - "[[Meager 2019 - Pooling Factors and Measuring External Validity]]"
used_by:
  - "[[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]"
  - "[[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]"
aliases:
  - "Microcredit average treatment effects Table 2"
  - "Hierarchical vs full-pooling average effects"
---
# Meager 2019 - Average Treatment Effects - Results

> [!summary]
> Posterior mean effects of microcredit access are small and positive on profit, expenditures, revenues, consumption and durables (and slightly negative on temptation goods), all with 95% intervals including zero. Full-pooling OLS declares revenues and temptation goods "significant"; the hierarchical model does not, because it incorporates cross-site heterogeneity into uncertainty about $\tau$.

## Overview

Section III: estimation of $\tau$ for six outcomes with model (2) (and the independent robustness variant), comparison with full-pooling OLS, and the interpretation for policy.

## Main Content

> [!example] Table 2 - Average treatment effect of microcredit ($\tau$), USD PPP per fortnight
> | Outcome | Model | Posterior mean $\tilde\tau$ | 2.5th | 25th | 75th | 97.5th |
> |---|---|---|---|---|---|---|
> | Profit | BHM (joint) | 6.8 | -3.0 | 1.8 | 10.4 | 24.5 |
> | | BHM (independent) | 7.3 | -4.7 | 1.9 | 11.2 | 27.5 |
> | | Full pooling | 7.3 | -1.8 | 4.1 | 10.4 | 16.3 |
> | Expenditures | BHM (joint) | 6.7 | -2.3 | 2.6 | 9.7 | 22.1 |
> | | BHM (independent) | 8.4 | -3.9 | 3.44 | 12.0 | 27.6 |
> | | Full pooling | 13.0 | -2.6 | 7.7 | 18.4 | 28.6 |
> | Revenues | BHM (joint) | 14.5 | -1.4 | 6.6 | 19.9 | 43.5 |
> | | BHM (independent) | 19.9 | -6.2 | 9.0 | 28.1 | 60.1 |
> | | Full pooling | 22.5 | 4.6 | 16.3 | 28.6 | 40.4 |
> | Consumption | BHM (joint) | 3.4 | -6.3 | 0.8 | 5.9 | 13.2 |
> | | BHM (independent) | 3.8 | -11.3 | 0.4 | 7.1 | 22.2 |
> | | Full pooling | 4.6 | -1.1 | 2.6 | 6.6 | 10.4 |
> | Consumer durables | BHM (joint) | 1.8 | -3.9 | 0.7 | 2.9 | 8.3 |
> | | BHM (independent) | 2.1 | -11.3 | 0.5 | 3.4 | 16.2 |
> | | Full pooling | 2.3 | -23.9 | -6.7 | 11.3 | 28.5 |
> | Temptation goods | BHM (joint) | -0.8 | -3.3 | -1.3 | -0.2 | 1.3 |
> | | BHM (independent) | -0.8 | -3.6 | -1.3 | -0.2 | 1.4 |
> | | Full pooling | -0.6 | -1.1 | -0.8 | -0.5 | -0.2 |
>
> *Notes (as printed).* "BHM (joint)" is described as the model estimating effects on both the mean (location) and dispersion of the outcome (dispersion measured by mean absolute deviations) - this wording sits oddly with model (2) in the text, which jointly models control mean and treatment effect; I reproduce it as printed. "BHM (independent)" does not exploit correlation between control means and treatment effects (robustness). Full pooling is OLS of outcome on treatment with country fixed effects and country-clustered standard errors. The full-pooling consumer-durables row (95% interval $-23.9$ to $28.5$ with a 25th-75th range of $-6.7$ to $11.3$) is as printed. $p$-values for $\tau=0$ (full pooling) and Hochberg-adjusted: profit 0.1/0.2; expenditures 0.0/0.1; revenues 0.1/0.2; consumption 0.1/0.2; durables 0.9/0.9; temptation 0.0/0.0 (rounded as printed).

^ex-table2

Figures. Fig 1: posterior mean, 50% interval (box) and 95% interval (line) of $\tau$ for each outcome, BHM vs pooled-OLS sampling distribution. Fig 2: same for the independent specification. Fig 3: study-specific effects $\{\tau_k\}$ (BHM posterior) against no-pooling OLS estimates $\{\hat\tau_k\}$ for each site, one panel per outcome (A profit, B revenues, D consumption, E consumer durables, F temptation goods; panel C is expenditures by elimination, as it was not legible in the PDF text layer). Fig 4: the independent model's version of Fig 3.

### Interpretation

> [!definition] Magnitudes
> The effect is "likely to be positive but small in magnitude relative to control group average outcomes, and there is a substantial probability of essentially zero impact". Profit: posterior mean about US\$7 PPP per two weeks versus a control mean of about US\$95 and a control SD of about US\$160, i.e. under 8% of mean profit and under 5% of the SD ($6.8/95=7.2\%$, $6.8/160=4.3\%$). There is only about a 15% approximate chance that the average impact is negative and also no more than 15% chance of an impact of US\$13 PPP per two weeks. Little evidence microcredit generally harms borrowers (as critics feared) and little evidence it transforms households into prosperous entrepreneurs (as advocates claimed).

^def-magnitudes

> [!theorem] Why the hierarchical model puts more mass near zero than full pooling
> The full-pooling model can neither detect heterogeneity nor incorporate it into the uncertainty about $\tau$. Figure 3 shows that in almost all cases the **more precisely estimated studies are closest to zero**, and with substantial pooling this cluster of precise near-zero studies pulls the imprecise, widely dispersed studies toward zero. Hence for revenues and temptation goods, where full-pooling OLS (at 5%) declares significance, the central 95% posterior interval of the BHM includes zero comfortably; for temptation goods this survives a Hochberg multiple-testing correction. The paper attributes the difference to avoiding a "statistical significance filter".

^thm-why-more-mass-near-zero

*Comparison with other analyses.* Banerjee, Karlan and Zinman (2015) conjectured that pooling the six 2015 studies would yield beneficial significant impacts on profit, business expenditures and temptation spending; four isolated $\hat\tau_k$ on profit were positive and reasonably large but not significant, and pooling does raise power, so the conjecture was reasonable - but not borne out by the hierarchical model. Vivalt (2016) reports a small negative impact of microcredit on profit but aggregates a different set of studies including observational ones (a potentially different quantity). Classical meta-analytic techniques "often underestimate the uncertainty in the predicted impact in future contexts, and can misleadingly declare statistical significance" for some outcomes, though both approaches agree effects on the six outcomes are uncertain and may be close to zero.

## Examples

*Reading the profit row.* BHM joint: mean 6.8, central 50% interval $[1.8,10.4]$, 95% interval $[-3.0,24.5]$. The OLS interval $[-1.8,16.3]$ is narrower than the BHM interval on both ends (it ignores heterogeneity, which the BHM carries into the uncertainty about $\tau$), while the central estimates agree closely (7.3 vs 6.8).

## Connections

- Model and pooling definitions: [[Meager 2019 - Hierarchical Model Specifications]], [[Meager 2019 - Pooling Factors and Measuring External Validity]].
- The "significance filter" and false positives from selective reading: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].
- Next-site predictions: [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]].

### Relevance to marketing measurement

The Table 2 lesson - a pooled estimate that ignores between-experiment heterogeneity can look significant while the hierarchical posterior includes zero - is exactly the risk when pooling geo or lift tests into a channel ROAS prior.

## See Also

- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
- [[Conversion Lift Studies on Ad Platforms]]
