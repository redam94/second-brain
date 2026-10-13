---
title: "Chan Perry 2017 - Challenges in Media Mix Modeling - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/market-response
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Chan Perry 2017 - Challenges and Opportunities in Media Mix Modeling.pdf]]"
source_location: "Whole paper: Chan & Perry (2017), 'Challenges And Opportunities In Media Mix Modeling', Google Inc. white paper, 16 pp. (Abstract-§6 pp.1-15, references pp.15-16)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
used_by:
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]"
aliases:
  - Chan and Perry 2017
  - Chan & Perry 2017
  - Challenges and Opportunities in Media Mix Modeling
  - MMM challenges
  - Media mix model limitations
  - Why MMMs are hard to validate
---

# Chan Perry 2017 - Challenges in Media Mix Modeling - Overview

> [!summary]
> Chan & Perry (Google, 2017) is a short, candid catalogue of why regression media mix models (MMMs) often fail to
> deliver **causal** ROAS, and what might help. Three groups of problems: **data limitations** ("three years of national
> weekly data is only 156 data points", often for 20+ channels at 3-4 parameters each, against a rule of thumb of 7-10
> points per parameter; correlated channels; narrow spend ranges), **selection bias** (ad targeting, seasonal targeting,
> funnel effects, endogenous controls), and **model selection and uncertainty** (on a real dataset, five specifications
> all reach $R^2$ = 0.98-0.99 and four reach 6-8% holdout MAPE, yet their sales predictions differ by up to 50% and
> their budget recommendations disagree). Remedies: better data, Bayesian priors, category and geo pooling,
> demand-proxy controls, graphical models, and **validation on simulated data whose ground truth is known but
> withheld** (§5.6), backed by transparency with end users (§6).
^summary

## Research Question and Contribution

**Question.** Can a regression MMM fitted to aggregate observational data give trustworthy answers to the causal
questions advertisers ask (past ROAS, response to spend changes, optimal allocation), and if not, what would improve it?

**Contribution.** Not a new estimator but a structured diagnosis from practitioners at a major ad platform:

1. A potential-outcomes argument that the naive on/off contrast = causal effect + **selection bias**, and that matching
   is infeasible at MMM scale (§2).
2. A reference regression form (Eq. 3) and five conditions under which its estimates are "more trustworthy" (§3).
3. A taxonomy of failures, each tied to one or more of those conditions (§4), illustrated with two stylized figures
   and a real five-model case study.
4. A research agenda (§5) that the same group pursued in companion papers: Bayesian MMM (Jin et al. 2017), category
   models (Wang et al. 2017), geo models (Sun et al. 2017), paid-search bias correction (Chen et al. 2017) and the
   simulator AMSS (Zhang & Vaver 2017).

## Key Findings

| Finding | Location | Note |
|---|---|---|
| Naive comparison = effect on treated periods + selection bias; matching needs full overlap, impossible with ~156 correlated rows | §2.2, p.3-4 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] |
| Typical MMM: 156 rows, 20+ channels x 3-4 params vs. 7-10 rows/param | §4.1.1, p.6 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] |
| Correlated channels: equal-fit, equal-holdout surfaces that disagree off-pattern (Fig. 1) | §4.1.2, pp.6-7 | same |
| Narrow range: curves with $R^2$ = 0.8 diverge outside data; mROAS OK, average ROAS poor (Fig. 2) | §4.1.3, pp.7-8 | same |
| Selection bias is "perhaps" the largest hurdle; targeting, seasonality, funnels, endogenous price | §4.2, pp.8-9 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]] |
| Predictive accuracy cannot eliminate models with wrong ROAS | §4.3.1, p.10 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] |
| Five plausible models: up to 50% disagreement in predicted sales; conflicting allocations (Figs. 3-4) | §4.3.2, pp.10-12 | same |
| Bayesian, category, geo, demand-control and graphical models as remedies (Fig. 5) | §5.1-5.5, pp.12-14 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] |
| Simulation with known (optionally withheld) truth; transparency about model choice and prior influence | §5.6-6, pp.14-15 | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] |

## Source Map

Every section, equation and figure of the paper and the note that holds it.

| Source item | Pages | Note |
|---|---|---|
| Abstract | 1 | this note; [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] |
| §1 Introduction (three causal questions; roadmap) | 1-2 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] |
| §2 Causal Inference (intro) | 2 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] |
| §2.1 Randomized experiments | 2 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions#^def-cp-rct]] |
| §2.2 Potential outcomes; selection-bias decomposition | 2-3 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions#^def-cp-selection-decomp]] |
| Eq. (1) matching estimator and overlap requirement | 3-4 | [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions#^def-cp-matching]] |
| §3 Regression (intro) | 4 | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] |
| §3.1 MMM Data (data types; data-quality problems) | 4-5 | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^def-cp-mmm-data]] |
| §3.2 Eq. (2) general regression MMM | 5 | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^def-cp-general-mmm]] |
| §3.2 Eq. (3) additive MMM | 5 | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^def-cp-additive-mmm]] |
| §3.2 five trustworthiness conditions | 6 | [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification#^thm-cp-trust-conditions]] |
| §4 Challenges (intro) | 6 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]] |
| §4.1.1 Limited amount of data | 6 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)#^thm-cp-sample-size-gap]] |
| §4.1.2 Correlated input variables | 6-7 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)#^thm-cp-collinearity]] |
| Figure 1 (two response planes) | 7 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)#^ex-cp-fig1]] |
| §4.1.3 Limited range of data | 7-8 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)#^thm-cp-avg-vs-marginal]] |
| Figure 2 (extrapolation uncertainty, four curves) | 8 | [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)#^ex-cp-fig2]] |
| §4.2 Selection bias (definition via $d_t$) | 8 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)#^def-cp-selection-bias-regression]] |
| §4.2.1 Ad targeting | 8 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)#^thm-cp-targeting-bias]] |
| §4.2.2 Seasonality | 9 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)#^thm-cp-seasonality-bias]] |
| §4.2.3 Funnel effects | 9 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)#^thm-cp-funnel-bias]] |
| §4.2.3 endogenous controls (price) | 9 | [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)#^thm-cp-endogenous-controls]] |
| §4.3 Model selection and uncertainty (intro); footnote 1 | 9-10 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)]] |
| §4.3.1 Model selection | 10 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)#^thm-cp-selection-by-fit]] |
| §4.3.2 Model uncertainty (five models); footnote 2 | 10-11 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)#^ex-cp-five-models]] |
| Figure 3 (sales vs. budget, five models) | 11 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)#^ex-cp-fig3]] |
| Figure 4 (optimal spend by channel, five models) | 12 | [[Chan Perry 2017 - Five Plausible MMMs (Model Selection and Model Uncertainty)#^ex-cp-fig4]] |
| §5 Opportunities (intro; better data) | 11-12 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^def-cp-opportunity-areas]] |
| §5.1 Bayesian modeling | 12-13 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^thm-cp-bayesian-benefits]] |
| §5.2 Category models | 13 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^def-cp-category-model]] |
| §5.3 Geo models | 13 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^def-cp-geo-model]] |
| §5.4 Control variables | 13-14 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^thm-cp-demand-controls]] |
| §5.5 Graphical models; Figure 5 (media funnel) | 14 | [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)#^ex-cp-fig5]] |
| §5.6 Model validation | 14-15 | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency#^thm-cp-simulation-uses]] |
| §6 Final remarks | 15 | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency#^thm-cp-transparency]] |
| Acknowledgment | 15 | [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] |
| References (19 entries) | 15-16 | this note, "References" below |

## How to Read This Note Set

1. Start with [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]] for the causal framing.
2. [[Chan Perry 2017 - MMM Data Sources and the Additive Regression Specification]] fixes notation (Eqs. 2-3).
3. The three challenge notes (data limitations, selection bias, five plausible models) are independent of each other.
4. [[Chan Perry 2017 - Opportunities (Better Data, Bayesian, Category, Geo, Controls, Graphs)]] maps remedies to failures.
5. [[Chan Perry 2017 - Simulation-Based MMM Validation and Transparency]] is the bridge to the rest of this cluster
   (simulator design and simulation-study methodology).

## Limitations of the Paper

- **No formal results.** Claims are argued from examples and the authors' experience; no bias bounds or theorems are
  derived (the funnel-bias size is deferred to Angrist & Krueger 1999).
- **Case study is anonymized.** Dataset, channels and model details in §4.3.2 are not disclosed, so the five-model
  exercise cannot be reproduced; per-model $R^2$ and MAPE are reported only as ranges.
- **Remedies are pointers.** Each §5 opportunity defers to a companion paper (Chen et al. 2017 is marked "Forthcoming"; the others are cited only as research.google.com papers);
  the white paper itself does not show that the remedies resolve the §4 problems.
- **Author position.** The authors work at an ad platform whose paid-search channel is the paper's main selection-bias
  example; the paper recommends a bias correction for that channel rather than claiming a particular ROAS.
- **No published discussants.** The PDF is a white paper with no attached commentary.

## Connections

- **Companion modeling paper.** Jin et al. (2017) is the "better models" answer of §5.1; see
  [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Estimation and Priors for MMM]],
  [[Carryover (Adstock) Functional Forms]], [[Shape (Saturation) Effects]], [[ROAS, mROAS, and Optimal Media Mix]],
  and [[MMM Model Selection and Application]] (whose sample-size simulation confirms §4.1.1 numerically; detail in
  [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]). The Jin simulation design and its Stan code, which
  is a concrete instance of the §5.5 remark that graphical models "can be fitted for example using the STAN package", are in [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]
  and [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]; the prior-dependence warning of §6 is quantified in
  [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]].
- **Companion simulator.** [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] is the §5.6
  simulator; its worked example uses 156 observed weeks.
- **Simulation-study methodology.** [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Experiments.** [[Geo-Experiment Methodology - Overview]], [[User-Level Ad Experiments - Overview]],
  [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]],
  [[Experimental Benchmarks for Observational Ad Measurement]],
  [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- **Multiplicity of good models.** [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]],
  [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]], [[Garden of Forking Paths]],
  [[Researcher Degrees of Freedom]].
- **Time-series validity.** [[Granger 2003 - Spurious Regression and Cointegration - Overview]],
  [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- **Governance.** [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].

## References (as listed in the paper, pp.15-16)

Transcribed in full from the paper's reference list, including the volume, page, venue, DOI and URL details it gives.
Where the paper says "forthcoming" or gives a URL, that is kept.

1. Angrist, J. & Krueger, A. B. (1999). Empirical strategies in labor economics. In O. C. Ashenfelter & D. Card (Eds.),
   *Handbook of Labor Economics* (Vol. 3, pp. 1277-1366). Cited in §4.2.3 for the size of funnel bias.
2. Berry, S., Levinsohn, J. & Pakes, A. (1995). Automobile prices in market equilibrium. *Econometrica*, 63(4), 841-890.
   doi:10.2307/2171802. Cited in footnote 1 (pp.9-10, §4.3) as an example of the demand-modeling literature.
3. Borden, N. H. (1964). The concept of the marketing mix. *Journal of Advertising Research*, 4(2), 2-7. Cited in §1.
4. Chan, D., Ge, R., Gershony, O., Hesterberg, T. & Lambert, D. (2010). Evaluating online ad campaigns in a pipeline:
   causal models at scale. In *Proceedings of the 16th ACM SIGKDD International Conference on Knowledge Discovery and
   Data Mining* (pp. 7-16). KDD '10. Washington, DC, USA: ACM. doi:10.1145/1835804.1835809. Cited in §2.2.
5. Chen, A., Chan, D., Perry, M., Jin, Y., Sun, Y., Wang, Y. & Koehler, J. (2017). Bias correction for paid search in
   media mix modeling. *Forthcoming* on research.google.com. Cited in §5.4 (p.14) only: search query volume as a control for underlying demand.
6. Deaton, A. & Muellbauer, J. (1980). An almost ideal demand system. *American Economic Review*, 70(3), 312-326.
   Cited in footnote 1 (pp.9-10, §4.3) alongside Berry, Levinsohn & Pakes (1995).
7. Hinkelmann, K. & Kempthorne, O. (2008). *Design and Analysis of Experiments, Volume 1: Introduction to Experimental
   Design* (2nd ed.). John Wiley and Sons. Cited in §2.1.
8. Imbens, G. W. & Rubin, D. M. (2015). *Causal Inference for Statistics, Social, and Biomedical Sciences: An
   Introduction* (1st ed.). Cambridge University Press. Cited in §2.2 (Rubin causal model).
9. Jin, Y., Wang, Y., Sun, Y., Chan, D. & Koehler, J. (2017). Bayesian methods for media mix modeling with carryover and
   shape effects. research.google.com. Cited in §3.2 (p.5) and §5.1 (p.13); see [[Bayesian Media Mix Modeling - Overview]].
10. Lambert, D. & Pregibon, D. (2007). More bang for their bucks: assessing new features for online advertisers. In
    *Proceedings of the 1st International Workshop on Data Mining and Audience Intelligence for Advertising*
    (pp. 7-15). ADKDD '07. San Jose, CA: ACM. doi:10.1145/1348599.1348601. Cited in §2.2.
11. Lewis, R. A. & Rao, J. M. (2015). The unfavorable economics of measuring the returns to advertising. *Quarterly
    Journal of Economics*, 130(4), 1941-1973. doi:10.1093/qje/qjv023. Cited in §2.1 (experiments are hard to power) and §4.3.1 (p.10: sales variance far exceeds
    media-spend variance, so ad spend is a weak signal); see
    [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]].
12. McCarthy, J. E. (1978). *Basic Marketing: A Managerial Approach* (6th ed.). Homewood, IL: R.D. Irwin. Cited in §1.
13. Pearl, J. (2009). *Causality: Models, Reasoning and Inference* (2nd ed.). Cambridge University Press. Cited in §4.2.3 (p.9: graphical models as an alternative for funnel effects) and §5.5 (p.14).
14. Quandt, R. E. (1964). Estimating the effectiveness of advertising: some pitfalls in econometric methods. *Journal of
    Marketing Research*, 1(2), 51-60. doi:10.2307/3149922. Cited in §4.3 (p.9): the difficulty of specifying the sales
    response process is "long-acknowledged".
15. Stan Development Team. (2015). *Stan Modeling Language User's Guide and Reference Manual*, version 2.10.0. Retrieved
    from http://mc-stan.org/. Cited in §5.5.
16. Sun, Y., Wang, Y., Jin, Y., Chan, D. & Koehler, J. (2017). Geo-level Bayesian hierarchical media mix modeling.
    research.google.com. Cited in §3.1 (pp.4-5: mixing data granularities in one model) and §5.3 (p.13).
17. Vaver, J. & Koehler, J. (2011). Measuring ad effectiveness using geo experiments. research.google.com. Retrieved
    from https://research.google.com/pubs/pub38355.html. Cited in §2.1.
18. Wang, Y., Jin, Y., Sun, Y., Chan, D. & Koehler, J. (2017). A hierarchical Bayesian approach to improve media mix
    models using category data. research.google.com. Cited in §5.2.
19. Zhang, S. S. & Vaver, J. (2017). Introduction to the Aggregate Marketing System Simulator. research.google.com.
    Cited in §5.6; see [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].

## See Also

- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Chan Perry 2017 - Challenges in Media Mix Modeling/_Index|Index: Chan Perry 2017 - Challenges in Media Mix Modeling]]
- [[Potential Outcomes Framework]]
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]]
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — predicting under unlike conditions needs process models
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — ADEMP form of validating MMMs on known truth
- [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] — known-truth simulation as a compensating control
- [[Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity]] — targeting-induced selection at user level
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]] — full paper map of the cited argument
