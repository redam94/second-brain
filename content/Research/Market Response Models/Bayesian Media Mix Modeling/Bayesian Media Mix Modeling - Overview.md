---
title: Bayesian Media Mix Modeling - Overview
tags:
  - source/ingested
  - topic/market-response
  - type/overview
  - doc/paper
  - topic/mcmc
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Secs. 1-2, pp. 1-6; Sec. 9, pp. 27-28; References pp. 33-34; Source Map covers all of pp. 1-34"
date_ingested: 2026-06-17
date_updated: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[ROAS, mROAS, and Optimal Media Mix]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]"
  - "[[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]"
  - "[[Jin 2017 MMM - Conclusions, Limitations and Extensions]]"
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
  - "[[Model Validation and Interpretability - Overview]]"
aliases:
  - MMM
  - Media Mix Model
  - Marketing Mix Model
  - Jin 2017 MMM
---

# Bayesian Media Mix Modeling - Overview

> [!summary]
> Media mix models (MMM) are regression models advertisers use to measure media effectiveness and guide budget allocation. Jin, Wang, Sun, Chan & Koehler (Google, 2017) propose an MMM with flexible functional forms for two phenomena linear regression cannot capture — **carryover** (advertising's lagged effect) and **shape** (saturation / diminishing returns) — estimated in a **Bayesian** framework so prior knowledge can compensate for the low information content of a single MMM dataset. Key finding: the model recovers parameters well on large data, but for typical small samples (a couple of years of weekly data) the priors dominate and estimates can be biased; the optimal media mix derived from the model has large variance and must be trusted cautiously.
^summary

## Overview

An MMM relates aggregated sales (weekly or monthly, national or geo-level) to media spend across channels plus control variables (price, distribution, seasonality, macro factors). It descends from the marketing "4Ps" tradition (Borden 1964; McCarthy 1978) and is fundamentally a regression that infers causation from observational correlation. Randomized experiments across media are expensive and rarely feasible, so observational regression remains the workhorse despite its causal fragility (see [[Activity Bias in Advertising]] for one such confound).

Two well-documented features of advertising response break the classic linear decision model (Guadagni & Little 1983):

1. **Carryover / lag effect** — a portion of an ad's impact occurs in periods *after* the exposure (delayed consumer response, inventory effects, word-of-mouth). Modeled via the **adstock** transformation. See [[Carryover (Adstock) Functional Forms]].
2. **Shape / saturation effect** — response is not linear in spend; high spend yields diminishing returns (the "shape effect", Tellis 2006). Modeled via a curvature function. See [[Shape (Saturation) Effects]].

Because these transformations make the model **nonlinear in the parameters**, ordinary least squares / MLE is awkward, and the paper turns to **Bayesian estimation via MCMC** (see [[Bayesian Estimation and Priors for MMM]]). The Bayesian framing is motivated less by philosophy than by data scarcity: as Chan & Perry (2017) note, the information content within a single MMM dataset is low relative to the number of parameters, so **priors** drawn from industry experience or prior/related media-mix models are essential.

## Main Content

> [!definition] The MMM regression equation (combined model)
> **Data form (Sec. 2 intro, p. 2).** Citing Chan & Perry (2017), the paper notes that MMM data come in several forms: daily or weekly, national or geo-level. **Weekly national data is the most commonly used**, and the paper's model is written for it. Geo-level data reappear in Sec. 9 as a way to get more information (Sun et al. 2017). The paper does not try to choose the control variables, since they vary by advertiser and industry; it proposes a general model and estimation method for any MMM.
>
> For weekly national data over weeks $t = 1,\dots,T$, with $M$ media channels and $C$ control variables, the response (sales, or log-sales) $y_t$ is modeled as
> $$
> y_t = \tau + \sum_{m=1}^{M} \beta_m \,\text{Hill}\!\left(x^{*}_{t,m};\,\mathcal{K}_m,\mathcal{S}_m\right) + \sum_{c=1}^{C} \gamma_c z_{t,c} + \epsilon_t,
> $$
> where
> - $x^{*}_{t,m} = \text{adstock}(x_{t-L+1,m},\dots,x_{t,m};\,w_m,L)$ is the carryover-transformed spend of channel $m$ (Eq. 1, see [[Carryover (Adstock) Functional Forms]]);
> - $\text{Hill}(\cdot)$ is the shape/saturation transform with shape (slope) $\mathcal{S}_m$ and half-saturation $\mathcal{K}_m$ (see [[Shape (Saturation) Effects]]);
> - $\beta_m \ge 0$ is the regression coefficient (maximum effect) of channel $m$;
> - $\tau$ is baseline sales (intercept), $\gamma_c$ the effect of control variable $z_{t,c}$;
> - $\epsilon_t$ is white noise, uncorrelated, constant variance.
>
> Media effects are assumed **additive** (no synergy/interaction between channels — a simplification, cf. Zhang & Vaver 2017). Carryover is applied *before* shape (adstock then Hill), which is appropriate when per-period spend is small relative to cumulative spend.
^combined-model

> [!definition] Why Bayesian
> Bayesian inference treats parameters $\Phi$ as random variables with a posterior $p(\Phi \mid \mathbf{y}, \mathbf{X}) \propto \mathcal{L}(\mathbf{y}\mid \mathbf{X},\mathbf{Z},\Phi)\,\pi(\Phi)$. The prior $\pi(\Phi)$ injects external knowledge to offset the weak signal in a single dataset, and the full posterior (not just a point estimate) supplies credible intervals and propagates parameter uncertainty into downstream attribution metrics (ROAS, mROAS, optimal mix).
^why-bayesian

## Examples

> [!example] Shampoo advertiser case study (preview)
> The model is applied to 2.5 years of weekly volume-sales data for a shampoo advertiser (TV, magazines, display, YouTube, search), with price/distribution/promotion as controls. Four functional-form specifications are compared by BIC; the most parsimonious (geometric adstock + reach transformation, BIC 51.49 vs 98.12 for the most flexible) wins on the complexity penalty alone, since the negative log-likelihoods differ by at most 0.06. The posterior of the retention rate reproduces its prior, the Hill and reach models disagree about 3- to 4-fold on magazines mROAS, and the optimal TV/magazine split has spikes at both a 0% and a 100% TV share with the posterior mean (about 0.47) between them — the data cannot reliably guide allocation. Residual autocorrelation (about 0.6 at lag 1) remains to lag 15. Full treatment, with every table and figure reading, in [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]; the BIC concept summary is in [[MMM Model Selection and Application]].
^shampoo-advertiser-case-study

## Connections

- **Carryover** generalizes the classic distributed-lag idea: the geometric-decay adstock weight is the continuous/marketing analog of the **Koyck lag**. See [[Carryover (Adstock) Functional Forms]] and [[Carryover Effects and Distributed Lags]].
- **Shape** corresponds to the concave-vs-S-shaped response debate in [[Shape of the Marketing Response Function]].
- Empirical advertising-elasticity generalizations (~0.10 short-run) provide priors and sanity checks for $\beta_m$; see [[Advertising and Promotion Effects]].
- Bayesian/MCMC machinery: [[Bayesian Estimation and Priors for MMM]], [[MCMC Basics]], [[Bayesian Linear Regression]].

## Source Map

*Added by the 2026-10-13 coverage audit.* Source: Jin, Wang, Sun, Chan & Koehler, "Bayesian Methods for Media Mix Modeling with Carryover and Shape Effects", Google Inc., 14 April 2017, 34 pp. Every section, equation, table and figure maps to a note:

| Source location | Content | Note |
|---|---|---|
| Abstract, Sec. 1 (pp. 1-2) | MMM definition, 4Ps, causation-from-correlation caveat, carryover and shape motivation, paper roadmap | this note; scope limits in [[Jin 2017 MMM - Conclusions, Limitations and Extensions#^scope-limits]] |
| Sec. 2 intro (p. 2) | data forms per Chan & Perry (daily/weekly, national/geo; weekly national most common), notation $x_{t,m}$, $z_{t,c}$, controls not selected | this note ^combined-model |
| Sec. 2.1, Eqs. 1-3, Fig. 1 (pp. 3-4) | adstock, geometric decay, delayed adstock, choosing $L$ (common vs per-medium, a properly chosen $L$ helps, large $L$ approximates infinity), $L=13$ | [[Carryover (Adstock) Functional Forms]] (choosing $L$ ^choosing-L; Fig. 1 weights table ^figure1; delayed does not nest geometric ^not-nested) |
| Sec. 2.2, Eqs. 4-6, Fig. 2, footnotes 1-2 (pp. 3-5) | Hill, $\beta$Hill, reach transform, identifiability examples, reach/GRP definitions | [[Shape (Saturation) Effects]] |
| Sec. 2.3, Eq. 7 (pp. 5-6) | adstock-then-shape order, additive model | this note ^combined-model; [[Jin 2017 MMM - Conclusions, Limitations and Extensions#^ordering]] |
| Sec. 3, Eqs. 8-9, footnote 3 (pp. 6-7) | MLE vs posterior, Gibbs/slice vs Stan/HMC, prior rationale, support, Sec. 3 citation map | [[Bayesian Estimation and Priors for MMM]]; [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] |
| Sec. 4.1, Eqs. 10-11, Fig. 3 (pp. 7-9) | ROAS, mROAS, change/pre/post periods, why restrict the window (^window-rationale), perturbation-spread caveat, MLE plug-in, posterior plug-in rule | [[ROAS, mROAS, and Optimal Media Mix]]; Fig. 3 in [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results#^attribution-windows]] |
| Sec. 4.2, Eqs. 12-16 (pp. 9-10) | constrained optimal mix, flight pattern ($M$ free parameters; multiplicative alternative), two Bayesian approaches, extension to >2 channels | [[ROAS, mROAS, and Optimal Media Mix#^optimal-mix]]; algorithm in [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results#^alg-opt]] |
| Sec. 5.1, Eq. 17, Tables 1-3, Fig. 4 (pp. 10-13) | simulated DGP, generating parameters, signal strength, priors, sampler timing | [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] |
| Sec. 5.2, Figs. 5-6 (pp. 13-15) | simulated ROAS/mROAS recovery, optimisation scenarios I/II, figure readings | [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]] (^fig5, ^fig5-readings, ^fig6) |
| Sec. 6, Table 4, Figs. 7-8 (pp. 14-19) | 500-replicate sample-size study, two vs sixty years, curve underestimation, per-panel Fig. 7 readings, Fig. 8 scales, multi-prior bias mechanism | [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]] (arms in rows, about 104 vs 3,120 weeks, scenario-dependent required size and Stan run-time link ^sixty-year-rows; ^table4, ^fig7, ^fig7-panels, ^fig8, ^bias-mechanism) |
| Sec. 7.1, Table 5, Figs. 9-10 (pp. 19-20) | prior on $\beta$ sensitivity, Fig. 10 panels | [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation#^table5]]; [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation#^fig10]] |
| Sec. 7.2, Table 6, Figs. 11-12 (pp. 20-22) | prior on $K$ sensitivity, $K$ inside vs outside data range, zero prior mass on $K=2$, Fig. 11 densities, Fig. 12 panels | [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation#^table6]]; [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation#^fig11]]; [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation#^fig12]] |
| Sec. 8, Table 7, Eq. 18, Table 9 (pp. 22-24) | four specifications, BIC selection | [[MMM Model Selection and Application]]; footnotes 5-7 in [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors#^table9]] |
| Sec. 8, Table 8, Fig. 13, footnote 4 (pp. 22-23) | shampoo data and provenance, priors "similar" to Table 3, control/media correlations, orthogonalisation, run times | [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]] |
| Sec. 8, Figs. 14-17 (pp. 24-27) | per-model ROAS/mROAS with approximate medians, TV/magazine optimisation with mode/line positions, posterior vs prior with $\alpha$/$\theta$ densities and $\beta$Hill medians, residual and sales ACF by lag | [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]] (^fig14, ^fig15, ^fig16, ^fig17) |
| Sec. 9 (pp. 27-28) | conclusions, hierarchical extensions, richer simulators | [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] |
| Appendix: Stan code (pp. 28-30) | full Stan program; code map incl. geometric-adstock change and `ec` upper bound | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation#^stan-code]]; [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation#^code-map]] |
| Acknowledgment (p. 28) | thanks to colleagues for support, comments and discussions | [[Jin 2017 MMM - Conclusions, Limitations and Extensions#^acknowledgment]] |
| Appendix: Fig. 18 (pp. 31-32) | single-dataset posteriors, panels (a)-(f) read against Table 1 truths, sampler unstated | [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors#^fig18]] |
| References (pp. 33-34) | all 31 references | full reference map below (^reference-map) |

### Reference Map (pp. 33-34)

Every reference in the paper, where it is used, and where the vault covers it.

| Reference | Used in the paper for | Vault note |
|---|---|---|
| Bertsekas (2014) *Constrained Optimization and Lagrange Multiplier Methods* | solving the budget-constrained optimum, Eqs. 12-13 (Sec. 4.2) | [[ROAS, mROAS, and Optimal Media Mix#^optimal-mix]] |
| Borden (1964); McCarthy (1978) | marketing-mix / 4Ps origin (Sec. 1) | this note, Overview |
| Carpenter et al. (2016) Stan | HMC sampler (Sec. 3, Appendix) | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] |
| Chan & Perry (2017) | low information content of MMM data; noisy real data (Secs. 1, 5.1) | [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] |
| Chen et al. (2017) bias correction for paid search | causal-reliability issues the paper does not address (Sec. 1, p. 2) | [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] |
| Friedman, Hastie & Tibshirani (2009), p. 212 | radial-kernel reading of delayed adstock (Sec. 2.1) | [[Carryover (Adstock) Functional Forms#^delayed-adstock]] |
| Gelfand & Smith (1990); Geman & Geman (1984) | Gibbs sampling (Sec. 3) | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]; [[MCMC Basics]] |
| Gelman (2006) "Prior distribution", pp. 1634-1637 | priors with the same support give similar posteriors when the data are informative; the prior dominates when they are not (Sec. 3) | [[Bayesian Estimation and Priors for MMM]]; [[Influence of Likelihood and Prior]] |
| Gelman & Rubin (1992) | $\hat R$ convergence check, reported as equal to or close to 1 for all shampoo models (Table 8 caption) | [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]; [[What to Do About Convergence Problems]] |
| Gesztelyi et al. (2012); Hill (1910) | pharmacological origin of the Hill function (Sec. 2.2) | [[Shape (Saturation) Effects]] |
| Guadagni & Little (1983) | linear decision models of marketing (Sec. 1) | this note, Overview |
| Hanssens, Parsons & Schultz (2003) *Market Response Models* | geometric decay as the standard carryover form; negative-binomial delayed alternative (Sec. 2.1) | [[Carryover (Adstock) Functional Forms]]; [[Market Response Models - Overview]]; [[Carryover Effects and Distributed Lags]] |
| Hartigan (2012) *Bayes Theory*; Hoff (2009) *A First Course in Bayesian Statistical Methods* | quantile-based credible intervals (Sec. 3) | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] |
| Hoffman & Gelman (2014) NUTS | HMC (Sec. 3) | [[HMC and Stan in Practice]] |
| Jin, Shobowale, Koehler & Case (2012) | reach-vs-GRP curve, Eq. 6 (Sec. 2.2) | [[Shape (Saturation) Effects]] |
| Lehmann & Casella (1998), p. 449 | variance and asymptotics of the MLE, Eq. 8 (Sec. 3) | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] |
| Neal (2003) slice sampling; Scott (2016) BOOM | custom Gibbs sampler; Fig. 8 plotting (Secs. 3, 6) | [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]] |
| Rosenbaum & Rubin (1983) | propensity-score methods, hard to use with the little data an MMM has (Sec. 1, p. 2) | [[Jin 2017 MMM - Conclusions, Limitations and Extensions]] |
| Schwarz (1978) | BIC, Eq. 18 (Sec. 8) | [[MMM Model Selection and Application]]; [[Overfitting and Information Criteria]] |
| Spiegelhalter, Best, Carlin & van der Linde (2002) | **DIC** as an alternative to BIC (Sec. 8, p. 23) | [[Overfitting and Information Criteria]]; [[Model Comparison]] |
| Vehtari, Gelman & Gabry (2015); Watanabe (2010) | **WAIC / PSIS-LOO** as alternatives to BIC (Sec. 8, p. 23). The paper adds that all these criteria pick the best regression model, "not the model with the most accurate causal inference" | [[Model Selection Using Predictive Performance]]; [[Overfitting and Information Criteria]] |
| Tellis (2006) "Modeling marketing mix" | names the **carryover** and **shape** problems that the paper sets out to address (Secs. 1-2) | this note, Overview; [[Shape of the Marketing Response Function]] |
| Wang et al. (2017); Sun et al. (2017) | hierarchical category-level and geo-level extensions (Secs. 3, 9) | [[Jin 2017 MMM - Conclusions, Limitations and Extensions]]; [[Hierarchical Models]] |
| Zhang & Vaver (2017) AMSS | synergy and cross-channel effects; simulation-based evaluation (Secs. 2.3, 4.1, 9) | [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] |
^reference-map

> [!warning] Headline validation result (Sec. 6, Table 4)
> With **two years** of weekly data and correctly located, weakly informative priors, the fitted $\beta$Hill response curves are **underestimated by 18-40%** for every channel. With **sixty years** the bias drops to between -0.2% and +10.4%. The authors note that sixty years is a simulation device and not a practical option. Details: [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)#^table4]].
^headline-validation-result

## See Also

- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]
- [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]]
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]
- [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]
- [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]]
- [[Jin 2017 MMM - Conclusions, Limitations and Extensions]]
- [[Carryover (Adstock) Functional Forms]]
- [[Shape (Saturation) Effects]]
- [[Bayesian Estimation and Priors for MMM]]
- [[ROAS, mROAS, and Optimal Media Mix]]
- [[MMM Model Selection and Application]]
- [[_Index|Index: Bayesian Media Mix Modeling]]
- [[Hierarchical Models]] — geo-level and brand-level MMMs pool channel parameters through hierarchical priors
- [[Model Validation and Interpretability - Overview]] — validation checklist for MMMs and driver rankings
