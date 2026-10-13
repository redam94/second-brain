---
title: "Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - topic/survival-analysis
  - type/example
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§7 Worked illustrative example pp.20-24: §7.1 Design pp.20-21 (Eq. 2 p.20, Figure 2 p.21, n_sim calculation p.21); §7.2 Exploration pp.21-23 (Figures 3-4 p.22, Figure 5 p.23); §7.3 Analysis pp.23-24 (Table 8 p.24, Figure 6 p.25); §7.4 Conclusions p.24. Code: github.com/tpmorris/simtutorial. arXiv:1712.03198v3 page numbers."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
  - "[[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]"
  - "[[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]"
  - "[[Survival Analysis]]"
used_by:
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Morris simulation tutorial worked example
  - Exponential vs Weibull vs Cox simulation
  - Misspecified baseline hazard simulation
---

# Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox

> [!summary]
> The paper's complete demonstration of ADEMP (§7). Three proportional-hazards analyses — **exponential, Weibull, Cox** — estimate a log hazard ratio $\theta=-0.5$ from a randomised trial with $n_{\text{obs}}=500$ under two DGMs (Weibull baseline hazard with $\gamma=1$ or $\gamma=1.5$), with $n_{\text{sim}}=1{,}600$ chosen so that MCSE(bias) < 0.005. **Result:** when $\gamma=1.5$ the misspecified exponential model is **biased toward the null by 0.049 (~10% of $\theta$)**, yet its **coverage is 96.0%** because its model SE **overestimates** the empirical SE by **11.5%** — two errors cancelling. Bias-eliminated coverage (97.2%) and the zip plot expose this; the exponential's apparently better precision (+20.5% vs Weibull) is an artefact of bias. Weibull and Cox behave well throughout.
^summary-worked-example

## Overview

The example is deliberately simple "to be understood by all readers" (p.20). Stata code is at `github.com/tpmorris/simtutorial`. It also illustrates every plot and table recommended in [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]].

## Main Content

### §7.1 Design (pp.20-21)

> [!definition] Model: proportional hazards (Eq. 2, p.20)
> For patient $i$, the hazard rate (event rate at time $t$ given survival to at least $t$) is
> $$h_i(t)=h_0(t)\exp(X_i\theta)\tag{2}$$
> where $h_0(t)$ is the baseline hazard, $X_i$ a binary treatment indicator (0 = control, 1 = research arm) and $\theta$ the log hazard ratio. Exponential and Weibull models assume a form for $h_0(t)$; the Cox model does not.
^def-ph-model

> [!example] The ADEMP specification (§7.1, pp.20-21)
> **Aims.** Evaluate the impacts (1) of misspecifying the baseline hazard on the estimate of $\theta$; (2) of fitting too complex a model when an exponential is sufficient; (3) of avoiding the issue with a semiparametric model.
>
> **Data-generating mechanisms.** $n_{\text{obs}}=500$ patients ("a possible phase III trial with survival outcome"); $X_i\sim\text{Bern}(0.5)$ (simple randomisation, equal allocation); $\theta=-0.5$ (hazard ratio 0.607 to 3 dp); baseline hazard $h_0(t)=\lambda\gamma t^{\gamma-1}$ (Weibull). Two DGMs differing only in $\gamma$:
>
> | DGM | $\lambda$ | $\gamma$ | Exponential correct? | Weibull correct? |
> |---|---|---|---|---|
> | 1 | 0.1 | 1 | yes | yes |
> | 2 | 0.1 | 1.5 | **no** | yes |
>
> Stata 15, 64-bit Mersenne Twister, input seed 72789.
>
> **Estimand.** $\theta$, the log hazard ratio for $X=1$ vs $X=0$.
>
> **Methods.** (1) exponential PH model; (2) Weibull PH model; (3) Cox PH model. The exponential is correct for DGM 1 and misspecified for DGM 2; the Weibull is correct for both; the Cox makes no baseline assumption, so is not misspecified for either.
>
> **Performance measures.** Convergence, bias, coverage, empirical SE and model-based SE for $\hat\theta$.
^ex-ademp-spec

**Figure 2 (p.21).** True hazard over 0-5 years: flat lines for $\gamma=1$ ($h=0.1$ for control, $0.1\times0.607$ for treatment); rising curves for $\gamma=1.5$ ($h(t)=0.15\,t^{0.5}$ for control, reaching about 0.34 at $t=5$, and 0.607 times that for treatment).

> [!example] Choosing $n_{\text{sim}}=1{,}600$ (§7.1, p.21)
> Bias is the key measure. A small initial run gives the conservative bound $\text{SD}(\hat\theta)\le0.2$, i.e. $\text{Var}(\hat\theta)\le0.04$. Requirement: MCSE(Bias) < 0.005. Since $\text{MCSE(Bias)}=\sqrt{\text{Var}(\hat\theta)/n_{\text{sim}}}$, $n_{\text{sim}}=0.04/0.005^2=1{,}600$.
>
> Implied MCSE of coverage: at 95%, $\sqrt{95\times5/1600}=0.54$; at the worst case of 50%, 1.25. "We consider this satisfactory and so proceed with $n_{\text{sim}}=1{,}600$ (to be revised if, for example, $\text{SD}(\hat\theta)>0.2$)."
^ex-nsim-1600

### §7.2 Exploration and visualisation (pp.21-23)

1. **Missing estimates first:** none — no missing $\hat\theta_i$ or $\widehat{\text{SE}}(\hat\theta_i)$, and separation was not an issue.
2. **Figure 3 (strip plots, p.22).** For $\gamma=1$ the mean and variance of $\hat\theta_i$ are very similar across the three methods, and the mean is close to $\theta=-0.5$. Under $\gamma=1.5$ the exponential model is misspecified and its mean of $\hat\theta_i$ shifts **toward the null**, indicating bias. Model SEs differ little between methods. *Direction caveat:* the text says that under $\gamma=1.5$ "the empirical SE is slightly higher for all methods (because there are fewer events among the 500 observations...)" and that model SEs are "smaller for the upper panel ($\gamma=1$) than the lower panel ($\gamma=1.5$)". Both statements run opposite to Table 8 (EmpSE 0.209 vs 0.138-0.152; ModSE 0.208 vs 0.154) and to Figure 3's own axes (SE axis 0.18-0.26 for $\gamma=1$, 0.14-0.17 for $\gamma=1.5$).
3. **Figure 4(A) (p.22, $\gamma=1.5$).** $\hat\theta_i$ and $\widehat{\text{SE}}(\hat\theta_i)$ are highly correlated across methods. Weibull and Cox $\hat\theta_i$ are almost identical; the exponential's are systematically closer to 0. SEs are extremely similar for Weibull and Cox, and very slightly larger for the exponential.
4. **Figure 4(B).** Difference-vs-mean plots with Weibull as comparator: Exponential−Weibull differences in $\hat\theta_i$ are positive (0 to ~0.15); Cox−Weibull within about ±0.04; SE differences tiny (Cox−Weibull up to ~0.0008).
5. **Figure 5 (zip plot, p.23).** Coverage ≈ 95% everywhere, but "there are more intervals to the right of $\theta=-0.5$ than to the left, particularly for those that do not cover $\theta$," implying "the model SEs must overestimate the empirical SE, because coverage is adequate despite bias."

> [!example] Figure 3 strip plots — panel layout and axis ranges (p.22)
> Caption: "Plot of the 1,600 $\hat\theta_i$ (left panels) and $\widehat{\text{SE}}(\hat\theta)_i$ (right panels) by data-generating mechanisms, for the three analysis methods. The vertical axis is repetition number, to provide some separation between points. The yellow pipes are sample means."
>
> | Row (DGM) | Left panel: $\hat\theta_i$ axis ticks | Right panel: $\widehat{\text{SE}}(\hat\theta_i)$ axis ticks | Bands within each panel (top to bottom) |
> |---|---|---|---|
> | $\gamma=1$ | −1.5, −1, −.5, 0, .5 | .18, .2, .22, .24, .26 | Exponential, Weibull, Cox |
> | $\gamma=1.5$ | −1, −.5, 0 | .14, .15, .16, .17 | Exponential, Weibull, Cox |
>
> **How to read it.** Each method is a horizontal band of 1,600 dots. A dot's horizontal position is the estimate (or its SE) and its vertical jitter is the repetition index. The yellow pipe marks the band mean. The true $\theta=-0.5$ sits in the middle of the $\gamma=1$ $\hat\theta$ axis. Under $\gamma=1.5$ the exponential band's pipe sits to the right of the Weibull and Cox pipes, i.e. toward 0, which is the bias Table 8 quantifies (+0.049). The $\gamma=1.5$ $\hat\theta$ axis spans 1 unit against 2 units for $\gamma=1$, and its SE axis (0.14-0.17) lies wholly below the $\gamma=1$ SE axis (0.18-0.26). Both match the smaller EmpSE and ModSE under $\gamma=1.5$ in Table 8. Axis ticks transcribed from the PDF text layer; dot positions are read visually.
^ex-figure3-axes

> [!note] Verification note on the Figure 3 passage
> The two sentences flagged above are quoted from the raw text (§7.2, p.21). Table 8 and the Figure 3 axes agree with each other, so treat the Table 8 numbers as authoritative and the prose direction as a likely slip. The paper does not state the follow-up or censoring scheme, so the event-count explanation cannot be checked from the PDF alone.
^note-verification-note-figure-3

### §7.3 Analysis: Table 8 (p.24)

> [!theorem] Table 8: Estimates of performance (Monte Carlo SEs in parentheses) (p.24)
> | Performance measure | DGM | Exponential | Weibull | Cox |
> |---|---|---|---|---|
> | Bias | $\gamma=1$ | −0.003 (0.005) | −0.003 (0.005) | −0.002 (0.005) |
> |  | $\gamma=1.5$ | **0.049 (0.003)** | 0.005 (0.004) | 0.006 (0.004) |
> | Coverage | $\gamma=1$ | 95.4% (0.5) | 95.4% (0.5) | 95.4% (0.5) |
> |  | $\gamma=1.5$ | 96.0% (0.5) | 95.6% (0.5) | 95.8% (0.5) |
> | Bias-eliminated coverage | $\gamma=1$ | 95.6% (0.5) | 95.3% (0.5) | 95.4% (0.5) |
> |  | $\gamma=1.5$ | **97.2% (0.4)** | 95.7% (0.5) | 96.1% (0.5) |
> | Empirical SE | $\gamma=1$ | 0.209 (0.004) | 0.209 (0.004) | 0.209 (0.004) |
> |  | $\gamma=1.5$ | 0.138 (0.002) | 0.152 (0.003) | 0.151 (0.003) |
> | Relative precision gain vs. Weibull | $\gamma=1$ | 0.2% (0.1) | 0 (–) | 0.3% (0.1) |
> |  | $\gamma=1.5$ | **20.5% (0.4)** | 0 (–) | 0.6% (0.2) |
> | Model SE | $\gamma=1$ | 0.208 (<0.001) | 0.208 (<0.001) | 0.208 (<0.001) |
> |  | $\gamma=1.5$ | 0.154 (<0.001) | 0.154 (<0.001) | 0.154 (<0.001) |
> | Relative error in Model SE | $\gamma=1$ | −0.7% (1.8) | −0.7% (1.8) | −0.5% (1.8) |
> |  | $\gamma=1.5$ | **11.5% (2.0)** | 1.7% (1.8) | 2.1% (1.8) |
>
> Bold marks the concerning results (the paper highlights them in bold; which cells are bold is inferred from the text, as the extraction does not carry formatting).
^tbl-table8

**Figure 6 (lollipop plot, p.25)** shows the same numbers with Monte Carlo 95% CIs as parentheses; axes per measure: bias −0.02 to 0.06; coverage 94-97; bias-eliminated coverage 94-98; EmpSE 0.2-0.215 ($\gamma=1$) and 0.13-0.16 ($\gamma=1.5$); precision gain 0-20%; model SE ~0.208 and ~0.154; relative error −5% to 15%.

> [!example] Interpretation (§7.3, pp.23-24)
> - **Bias.** Exponential under $\gamma=1.5$: bias 0.049 toward the null, "approximately 10% of the true value. This is non-negligible." Weibull and Cox: negligible.
> - **Coverage.** Exponential is still above 95% (96.0%), "surprising in the presence of bias."
> - **Empirical SE.** Same for all at $\gamma=1$; lowest for the exponential at $\gamma=1.5$ — but "in the presence of different biases, the empirical SE is not comparable across methods" ([[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^warn-relative-precision|the $\hat\theta/2$ warning]]). Relative precision vs Weibull follows the same pattern (+20.5%).
> - **Model SE.** Same for all methods within a DGM. Hence the explanation: "the bias is cancelled out by the fact that the model SE is overestimated. This is confirmed by the relative error in Model SE" (+11.5%, MCSE 2.0).
> - **Bias-eliminated coverage** of 97.2% shows that, absent bias, the exponential's intervals would over-cover; bias pulls coverage back to 96.0%.
> - **Adequacy of $n_{\text{sim}}$.** "the Monte Carlo SEs of performance estimates are all acceptable and so we would be happy to draw conclusions about the methods based on the 1,600 repetitions."
^ex-interpretation

**Arithmetic check.** Relative precision gain vs Weibull at $\gamma=1.5$: $100\,[(0.152/0.138)^2-1]=21.3\%$ from the rounded EmpSEs, consistent with the reported 20.5% computed from unrounded values. Relative error in ModSE: $100(0.154/0.138-1)=11.6\%$ ≈ 11.5% ✓.

### §7.4 Conclusions (p.24)

"When an exponential model is misspecified, the hazard ratio can be biased. Probably not by much. Further research is needed." More seriously, two DGMs "do not cover any real breadth of scenarios"; varying $n_{\text{obs}}$, $\lambda$ and $\theta$ would have shown when issues arise.

## Examples

> [!example] The same "two wrongs make a right" pattern in marketing models (illustrative)
> A misspecified MMM (e.g. geometric adstock fitted to data generated with delayed-peak carryover — see [[Carryover (Adstock) Functional Forms]]) may underestimate a channel's ROAS while its posterior SD is inflated by the misfit. Interval coverage can look nominal. A simulation report should therefore always show **bias, coverage, bias-eliminated coverage and ModSE/EmpSE together**, never coverage alone.
^ex-same-two-wrongs-make

## Connections

- [[Survival Analysis]] — background on hazards, Cox and parametric PH models.
- The over-coverage-masks-bias pattern is a frequentist cousin of the miscalibration SBC detects ([[Simulation-Based Calibration - Overview]]).
- Cancelling errors are why [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^imp-condition-on-truth|performance should be reported conditional on true parameters]] across a range of DGMs.

## See Also

- [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] — zip and lollipop plots
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — source map
