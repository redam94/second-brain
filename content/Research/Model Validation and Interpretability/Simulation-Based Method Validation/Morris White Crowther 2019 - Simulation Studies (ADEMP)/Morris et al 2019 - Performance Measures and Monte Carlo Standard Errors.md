---
title: "Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "§3.5 pp.8-9; §5.2 pp.14-17 (Table 6 p.15, Figure 1 p.16, Table 7 p.17); Table 2 p.4. arXiv:1712.03198v3 page numbers. Table 6 checked against the rendered PDF page, not only the text extraction."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]"
  - "[[Effective Sample Size and Monte Carlo Standard Error]]"
used_by:
  - "[[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]"
  - "[[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]"
  - "[[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]]"
  - "[[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]"
aliases:
  - Performance measures for simulation studies
  - Monte Carlo SE of performance measures
  - Bias-eliminated coverage
  - Empirical SE vs model SE
  - Randomisation validity vs confidence validity
  - Relative error in model SE
---

# Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors

> [!summary]
> The technical core of Morris, White & Crowther (2019). **Table 6** defines nine performance measures — bias, empirical SE, relative % increase in precision, MSE, average model SE, relative % error in model SE, coverage, bias-eliminated coverage, and rejection % (power / type I error) — each with its estimator and its **Monte Carlo standard error** (the SE due to finite $n_{\text{sim}}$). §5.2 explains how to read them: measures must be read **jointly**; (root) MSE comparisons flip with $n_{\text{obs}}$ (Figure 1, crossover at $n_{\text{obs}}=60$); under-coverage from bias **worsens** as $n_{\text{obs}}$ grows; **bias-eliminated coverage** splits poor coverage into bias vs interval width but "should not be regarded as a performance measure in its own right"; and conditional coverage by tertile of model SE (Table 7: 98.0 / 95.5 / 91.5%) is not a cause for concern.
^summary-performance-mcse

## Overview

Performance measures are estimated from the $n_{\text{sim}}$ rows of the *estimates* dataset, so each is itself an estimate with sampling error. "Monte Carlo standard errors quantify simulation uncertainty: they provide an estimate of the SE of (estimated) performance due to using finite $n_{\text{sim}}$. The Monte Carlo SE targets the sampling distribution of repeatedly running the same simulation study (with $n_{\text{sim}}$ repetitions) under different random-number seeds" (§5.2, p.14). The paper suppresses hats on performance measures in §5.2 but stresses they are estimates. Notation is defined in [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-notation|Table 2]].

This is the same idea as MCMC Monte Carlo error ([[Effective Sample Size and Monte Carlo Standard Error]]) one level up: MCSE across independent *repetitions of a study*, not across draws within one fit. Because repetitions are independent, no ESS correction is needed.

## Main Content

### Table 6 — definitions, estimates and Monte Carlo SEs (p.15)

> [!theorem] Table 6: Performance measures, estimators and Monte Carlo SEs (p.15)
> | Performance measure | Definition | Estimate | Monte Carlo SE of estimate |
> |---|---|---|---|
> | **Bias** | $E[\hat\theta]-\theta$ | $\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}\hat\theta_i-\theta$ | $\sqrt{\dfrac{1}{n_{\text{sim}}(n_{\text{sim}}-1)}\sum_{i=1}^{n_{\text{sim}}}(\hat\theta_i-\bar\theta)^2}$ |
> | **EmpSE** | $\sqrt{\text{Var}(\hat\theta)}$ | $\sqrt{\dfrac{1}{n_{\text{sim}}-1}\sum_{i=1}^{n_{\text{sim}}}(\hat\theta_i-\bar\theta)^2}$ | $\dfrac{\widehat{\text{EmpSE}}}{\sqrt{2(n_{\text{sim}}-1)}}$ |
> | **Relative % increase in precision (B vs A)** \* | $100\left(\dfrac{\text{Var}(\hat\theta_A)}{\text{Var}(\hat\theta_B)}-1\right)$ | $100\left(\left(\dfrac{\widehat{\text{EmpSE}}_A}{\widehat{\text{EmpSE}}_B}\right)^2-1\right)$ | $200\left(\dfrac{\widehat{\text{EmpSE}}_A}{\widehat{\text{EmpSE}}_B}\right)^2\sqrt{\dfrac{1-\text{Corr}(\hat\theta_A,\hat\theta_B)^2}{n_{\text{sim}}-1}}$ |
> | **MSE** | $E[(\hat\theta-\theta)^2]$ | $\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}(\hat\theta_i-\theta)^2$ | $\sqrt{\dfrac{\sum_{i=1}^{n_{\text{sim}}}\left[(\hat\theta_i-\theta)^2-\widehat{\text{MSE}}\right]^2}{n_{\text{sim}}(n_{\text{sim}}-1)}}$ |
> | **Average ModSE** \* | $\sqrt{E[\widehat{\text{Var}}(\hat\theta)]}$ | $\sqrt{\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}\widehat{\text{Var}}(\hat\theta_i)}$ | $\sqrt{\dfrac{\widehat{\text{Var}}[\widehat{\text{Var}}(\hat\theta)]}{4n_{\text{sim}}\times\widehat{\text{ModSE}}^2}}$ † |
> | **Relative % error in ModSE** \* | $100\left(\dfrac{\text{ModSE}}{\text{EmpSE}}-1\right)$ | $100\left(\dfrac{\widehat{\text{ModSE}}}{\widehat{\text{EmpSE}}}-1\right)$ | $100\left(\dfrac{\widehat{\text{ModSE}}}{\widehat{\text{EmpSE}}}\right)\sqrt{\dfrac{\widehat{\text{Var}}[\widehat{\text{Var}}(\hat\theta)]}{4n_{\text{sim}}\times\widehat{\text{ModSE}}^4}+\dfrac{1}{2(n-1)}}$ † |
> | **Coverage** | $\Pr(\hat\theta_{\text{low}}\le\theta\le\hat\theta_{\text{upp}})$ | $\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}1(\hat\theta_{\text{low},i}\le\theta\le\hat\theta_{\text{upp},i})$ | $\sqrt{\dfrac{\widehat{\text{Cover}}\times(1-\widehat{\text{Cover}})}{n_{\text{sim}}}}$ |
> | **Bias-eliminated coverage** | $\Pr(\hat\theta_{\text{low}}\le\bar\theta\le\hat\theta_{\text{upp}})$ | $\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}1(\hat\theta_{\text{low},i}\le\bar\theta\le\hat\theta_{\text{upp},i})$ | $\sqrt{\dfrac{\widehat{\text{B-E Cover}}\times(1-\widehat{\text{B-E Cover}})}{n_{\text{sim}}}}$ |
> | **Rejection % (power or type I error)** | $\Pr(p_i\le\alpha)$ | $\dfrac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}1(p_i\le\alpha)$ | $\sqrt{\dfrac{\widehat{\text{Power}}\times(1-\widehat{\text{Power}})}{n_{\text{sim}}}}$ |
>
> \* Monte Carlo SEs are **approximate** for relative % increase in precision, average ModSE and relative % error in ModSE.
>
> † $\displaystyle\widehat{\text{Var}}[\widehat{\text{Var}}(\hat\theta)]=\frac{1}{n_{\text{sim}}-1}\sum_{i=1}^{n_{\text{sim}}}\left\{\widehat{\text{Var}}(\hat\theta_i)-\frac{1}{n_{\text{sim}}}\sum_{j=1}^{n_{\text{sim}}}\widehat{\text{Var}}(\hat\theta_j)\right\}^2.$
>
> For EmpSE, relative precision and relative error, the MCSE formulas **assume $\hat\theta$ is normally distributed**; robust SEs exist for non-normal $\hat\theta$ (White & Carlin 2010) (§5.2, p.14). The "$2(n-1)$" in the relative-error row is printed with $n$, not $n_{\text{sim}}$; by analogy with the EmpSE row it is $n_{\text{sim}}$.
^thm-table6

> [!note] Where the MCSE formulas come from (derivation sketch, not in the paper)
> - **Bias / mean:** $\bar\theta$ is a sample mean of $n_{\text{sim}}$ i.i.d. draws, so $\text{SE}(\bar\theta)=\text{SD}(\hat\theta)/\sqrt{n_{\text{sim}}}$, estimated by $\widehat{\text{EmpSE}}/\sqrt{n_{\text{sim}}}$ — the formula above.
> - **EmpSE:** for normal data, $\text{Var}(s^2)\approx 2\sigma^4/(n_{\text{sim}}-1)$; the delta method on $s=\sqrt{s^2}$ gives $\text{SE}(s)\approx\sigma/\sqrt{2(n_{\text{sim}}-1)}$.
> - **MSE:** the sample mean of $(\hat\theta_i-\theta)^2$, so its SE is the SD of those squared errors over $\sqrt{n_{\text{sim}}}$.
> - **Coverage / rejection:** a binomial proportion, $\sqrt{p(1-p)/n_{\text{sim}}}$.
> - **Relative precision:** delta method on $\log(s_A^2/s_B^2)$; the correlation term reflects that methods are applied to the **same** simulated datasets ([[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^def-same-data|§4.3]]), which shrinks the MCSE of a comparison when $\hat\theta_A,\hat\theta_B$ are highly correlated.
> - **ModSE:** delta method on the square root of the mean of $\widehat{\text{Var}}(\hat\theta_i)$: $\text{SE}(\sqrt{\bar v})\approx\text{SE}(\bar v)/(2\sqrt{\bar v})$ with $\text{SE}(\bar v)^2=\widehat{\text{Var}}[\widehat{\text{Var}}]/n_{\text{sim}}$.
^note-mcse-derivation

### How to read each measure (§5.2, pp.14-17)

> [!important] Read measures jointly (§5.2, p.14)
> "For interpretation of results, performance measures should usually be considered jointly (one could prefer a method with zero variance by conveniently ignoring bias)."
^imp-read-measures-jointly

**Bias (p.14).** "Bias is frequently of central interest, and quantifies whether a method targets $\theta$ on average. Frequentist theory holds unbiasedness to be a key property." Variants:
- The **mean** $\bar\theta$ is often reported instead; it has the same MCSE (it differs by the constant $\theta$).
- **Relative bias** ($\text{bias}/\theta$) eases comparison when $\theta$ differs across DGMs, but needs $|\theta|>0$.
- Small biases may be accepted "because of other good properties."

**Empirical SE (p.14).** Measures precision/efficiency; depends only on $\hat\theta_i$, not on $\theta$; estimates the long-run SD of $\hat\theta_i$. Synonyms found in the review: "empirical standard deviation", "Monte Carlo standard deviation", "observed SE", "sampling SE". Hard to interpret for one method unless compared with a lower bound (e.g. Cramér-Rao); relative precision is the usual comparison.

> [!warning] Relative precision with biased methods (§5.2, p.14)
> "If either method is biased, relative precision should be interpreted with caution because an estimator that is biased towards the null can have small empirical SE as a result of the bias: $\hat\theta_i/2$ has smaller empirical SE than $\hat\theta_i$."
^warn-relative-precision

**MSE (p.14).** $\text{MSE}=\text{bias}^2+\text{Var}(\hat\theta)$. It looks like a natural single summary ("low variance is penalised for bias"), but "for method comparisons, the relative influence of bias and of variance on the MSE tends to vary with $n_{\text{obs}}$ (except when all methods are unbiased), making generalisation of results difficult." Root MSE is favoured for display because it is on the EmpSE scale.

> [!example] Figure 1: Bias, EmpSE, root MSE and coverage vs $n_{\text{obs}}$ for three hypothetical methods (p.16)
> - **Method A:** unbiased but imprecise (root MSE = EmpSE).
> - **Method B:** biased, bias constant in $n_{\text{obs}}$, more precise ("as is often the case with biased methods").
> - **Method C:** biased with bias $\propto 1/\sqrt{n_{\text{obs}}}$, same precision as B.
>
> Panels (x-axis $n_{\text{obs}}$ from 10 to 90): bias; empirical SE (B and C coincide); root MSE; coverage of nominal 95% normal-based CIs of *correct width*, so bias is the only source of under-coverage.
>
> Findings:
> - **Root MSE:** B beats A for $n_{\text{obs}}<60$; A beats B for $n_{\text{obs}}>60$. "The lesson is that comparisons of (root) MSE are more sensitive to choice of $n_{\text{obs}}$ than comparisons of bias or empirical SE alone."
> - **Coverage:** B's coverage deteriorates as $n_{\text{obs}}$ increases; C's under-coverage is constant.
> - **Approximate panel values (read from the rendered figure, p.16; not tabulated in the paper):**
>
> | Panel | y-axis range | Method A | Method B | Method C |
> |---|---|---|---|---|
> | Bias | 0-3 | 0 throughout | ≈1, flat | ≈2 at $n_{\text{obs}}=10$, falling below 1 by $n_{\text{obs}}\approx 30$-40 and to ≈0.7 at 90 |
> | Empirical SE | 0-3 | ≈3 at 10, falling to ≈1 at 90 | ≈2 at 10, falling to ≈0.7 at 90 (B and C coincide) | same as B |
> | Root MSE | 0-3 | ≈3 at 10 → ≈1 at 90 | ≈2.2 at 10 → ≈1.2 at 90 (flattens because bias floor = 1) | ≈2.8 at 10 → ≈1 at 90 |
> | Coverage % | 40-100 | ≈95, flat | ≈93 at $n_{\text{obs}}=10$, declining roughly linearly to ≈50 at 90 | ≈82-83, flat |
>
> On the coverage panel B crosses below C at roughly $n_{\text{obs}}\approx 30$; the root-MSE A/B crossover at $n_{\text{obs}}=60$ is stated in the text (p.14).
> - **Design implication:** whenever MSE is a performance measure, or coverage is assessed in the presence of bias, "data-generating mechanisms should include a range of values of $n_{\text{obs}}$."
>
> MSE "is nonetheless an important performance measure – particularly when the aims of a method relate to prediction rather than estimation."
^ex-figure1

**Average model SE (p.14).** The root-mean of squared model SEs. "The aim of the model SE is that $E(\text{ModSE}^2)=\text{EmpSE}^2$. The model SE explicitly targets the empirical SE. If it systematically misses, this represents a bias in the estimation of model SE." Report the **relative error** $100(\text{ModSE}/\text{EmpSE}-1)$ (some prefer the plain ratio).

> [!definition] Coverage, randomisation validity and confidence validity (§5.2, p.15)
> **Coverage** is "the probability that a confidence interval contains $\theta$."
> - **Randomisation validity** (Neyman's original): *exactly* $100(1-\alpha)\%$ of intervals contain $\theta$.
> - **Confidence validity:** *at least* $100(1-\alpha)\%$ do.
>
> Because the latter is less well known, "over- and under-coverage are sometimes regarded as similarly bad." Randomisation validity is usually preferred because it implies shorter intervals, "but this is not always the case!" — some procedures give both shorter intervals and higher coverage (Meng 1994; Rubin 1996).
^def-coverage-validity

> [!theorem] Sources of under- and over-coverage (§5.2, p.16)
> Under-coverage is to be expected if:
> 1. $\text{Bias}\neq 0$;
> 2. $\text{ModSE}<\text{EmpSE}$;
> 3. the distribution of $\hat\theta$ is not normal and intervals assume normality;
> 4. $\widehat{\text{Var}}(\hat\theta_i)$ is too variable.
>
> Over-coverage tends to occur when $\text{ModSE}^2>\text{EmpSE}^2$, with or without issues (1) and (3).
>
> **Growth with $n_{\text{obs}}$:** under-coverage due to bias "will tend to deteriorate as $n_{\text{obs}}$ increases (unless bias reduces at or faster than a rate of $1/\sqrt{n_{\text{obs}}}$). Intuitively, as $n_{\text{obs}}$ increases, confidence intervals zero-in on the wrong value."
>
> *Sketch:* with $z_{\alpha/2}$-intervals of correct width $\sigma/\sqrt{n}$ around an estimator with bias $b$, coverage is $\Phi(z_{\alpha/2}-b\sqrt n/\sigma)-\Phi(-z_{\alpha/2}-b\sqrt n/\sigma)$, which falls to 0 as $b\sqrt n\to\infty$ and is constant when $b\propto 1/\sqrt n$ — methods B and C of Figure 1.
^thm-coverage-sources

> [!definition] Bias-eliminated coverage (§5.2, p.16)
> Coverage of the confidence intervals for $\bar\theta$ instead of $\theta$:
> $$
> \widehat{\text{B-E Cover}}=\frac{1}{n_{\text{sim}}}\sum_{i=1}^{n_{\text{sim}}}1(\hat\theta_{\text{low},i}\le\bar\theta\le\hat\theta_{\text{upp},i}).
> $$
> It decomposes poor coverage into the part due to bias (eliminated) and the part due to incorrect interval width (remaining). "We emphasise that bias-eliminated coverage should not be regarded as a performance measure in its own right. It is to be used for understanding how coverage performance is influenced by bias vs. width of confidence intervals." For the Figure 1 methods, it would be equal for all three.
^def-bias-eliminated-coverage

**Rejection rates (p.16).** Power and type I error are of principal interest for null-hypothesis targets and for comparing designs. $p$-values may come from a Wald statistic $\hat\theta_i/\widehat{\text{SE}}(\hat\theta_i)$ or directly (e.g. a likelihood-ratio test). "An appropriate test would reject a proportion $\alpha$ of the $n_{\text{sim}}$ repetitions when the null is true and as often as possible when it is false. The obvious warning is that if the test does not control type I error at level $\alpha$, power should be interpreted with caution."

### Conditional performance (§5.2, pp.16-17)

Sometimes conditional performance matters, especially for designs that make decisions on early data. Two Vol. 34 studies examined two-stage trials where the estimand is selected after stage 1 (treatment effect in a selected subpopulation; effect of a selected treatment); both estimators were designed to be conditionally unbiased. Kimani, Todd & Stallard reported bias **conditional on each possible selection**, Carreras, Gutjahr & Brannath **averaged across** selections. The former "is stricter and arguably more appropriate since, having selected an estimand, the observer is not interested in the other case" (pp.16-17). The authority cited for that preference is Efron & Hastie (2016) [50], *Computer Age Statistical Inference* (Cambridge University Press). The paper gives no page or chapter; *context (not in the paper):* the book discusses inference after model selection, where conditioning on the selection actually made is the standard argument. Refs: Kimani, Todd & Stallard (2015) [48], *Stat Med* 34(18):2581-2601; Carreras, Gutjahr & Brannath (2015) [49], *Stat Med* 34(8):1317-1333.

> [!example] Table 7: Coverage conditional on the size of ModSE (p.17)
> **Setup.** $n_{\text{obs}}=30$ draws from $y\sim N(\mu,\sigma^2)$ with $\mu=0,\sigma^2=1$; 95% CIs for $\mu$ from the $t$-distribution; $n_{\text{sim}}=30{,}000$. Coverage overall and by tertile of model SE.
>
> | Approach | $n_{\text{sim}}$ analysed | Coverage (Monte Carlo SE) |
> |---|---|---|
> | All observations | 30,000 | 95.0% (0.1%) |
> | Conditional: ModSE in highest third | 10,000 | 98.0% (0.1%) |
> | Conditional: ModSE in middle third | 10,000 | 95.5% (0.2%) |
> | Conditional: ModSE in lowest third | 10,000 | 91.5% (0.3%) |
>
> **Interpretation.** Coverage is below nominal when the sample SD is small and above when it is large. "Poor conditional performance in this sense should not cause concern. Further, it is unhelpful for an analyst faced with a dataset: one would not in practice know in which tertile of possible model SEs a particular model SE lies."
^ex-table7

> [!important] Condition on true parameters, not on estimates (§5.2, p.17)
> "Estimating performance conditional on true (rather than sample-estimated) parameters that vary across data-generating mechanisms is where methods should be expected to provide good performance, and we do not recommend averaging over these" (as done informally by Gutman & Rubin 2013).
^imp-condition-on-truth

The list is not exhaustive: other measures exist (e.g. "the proportion of times the correct dose is selected by dose–finding designs") "and others that we have not yet thought of" (p.17). For complex measures, Boos & Osborne (2015) give resampling-based MCSEs (§8, p.26); the Stata `simsum` and R `rsimsum` packages automate Table 6.

## Examples

> [!example] Worked MCSE arithmetic
> With $n_{\text{sim}}=1{,}600$ and $\widehat{\text{EmpSE}}=0.152$ (the Weibull model in the paper's example, $\gamma=1.5$):
> - $\text{MCSE(Bias)}=0.152/\sqrt{1600}=0.0038\approx0.004$ ✓ (Table 8 reports 0.004).
> - $\text{MCSE(EmpSE)}=0.152/\sqrt{2\cdot1599}=0.0027\approx0.003$ ✓ (Table 8: 0.003).
> - Coverage 95.6%: $\sqrt{0.956\cdot0.044/1600}=0.0051$, i.e. 0.5 percentage points ✓.
>
> These reproduce the published Monte Carlo SEs; see [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^tbl-table8|Table 8]].
^ex-worked-mcse-arithmetic

> [!example] Coverage of forecast intervals in a backtest
> A team checks whether its 80% forecast intervals are calibrated by running 250 rolling-origin backtests and finds 74% coverage. MCSE $=\sqrt{0.74\cdot0.26/250}=2.8$ pp, so 74% is about 2.1 MCSE below 80% — suggestive, not conclusive. With autocorrelated backtest windows the effective number of independent repetitions is smaller and the MCSE larger (see [[Forecast Evaluation and Backtesting]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]). Illustrative, not from the paper.
^ex-coverage-forecast-intervals-backtest

> [!important] Morris's fixed-$\theta$ repetitions vs a single fake-data fit
> [[Designing Simulated-Data Experiments]] (Bayesian workflow) fits a model to **one** simulated dataset at chosen parameter values and checks that the posterior moves away from the prior and that its intervals "concentrate on the data-generating values". It states that "even a single simulation run can often reveal blatant errors" but that one run is "not sufficient" to declare that everything works.
>
> Table 6 is what that one run becomes when it is repeated $n_{\text{sim}}$ times at the **same** $\theta$:
>
> | Single fake-data fit | Morris performance measure (Table 6) | What the repetition adds |
> |---|---|---|
> | Posterior mean near the true value? | **Bias** $\bar\theta-\theta$, MCSE $\text{EmpSE}/\sqrt{n_{\text{sim}}}$ | Separates systematic error from one-draw noise |
> | Is the posterior narrower than the prior? | **Empirical SE**; **relative precision** vs a comparator | Measures informativeness against another method, not against the prior |
> | Does the interval contain the truth? | **Coverage**, MCSE $\sqrt{\text{Cov}(1-\text{Cov})/n_{\text{sim}}}$ | One hit or miss is a single Bernoulli draw; coverage needs hundreds |
> | Is the posterior SD plausible? | **Average model SE** vs EmpSE (**relative error**) | Checks the method's own reported uncertainty against its actual spread |
>
> Two differences remain. (1) Morris holds $\theta$ fixed, so a Bayesian method is judged on **frequentist** properties at that $\theta$ (DGM pitfall 2 in [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^warn-dgm-pitfalls|§3.2]]). The Bayesian guarantee holds only when $\theta$ is averaged over the prior, which is what [[Simulation-Based Calibration - Overview|SBC]] and [[Data-Averaged Posterior Self-Consistency]] test. (2) Morris attaches a Monte Carlo SE to every check. The single fake-data fit has no notion of Monte Carlo error, so a "recovered" parameter in one run carries no stated precision. *Synthesis by the note author, not from the paper.*
^imp-vs-single-fake-data

## Connections

- **Coverage concepts elsewhere:** [[Marginal vs Conditional Coverage]] and [[Split Conformal Prediction and the Coverage Guarantee]] make the same marginal-vs-conditional distinction as Table 7.
- **Bias, variance and model SE:** model SE vs empirical SE is the frequentist check on whether reported uncertainty is honest — the same question as [[Data-Averaged Posterior Self-Consistency]] for Bayesian posteriors.
- **Asymptotics:** [[Asymptotics and Frequentist Connections]].
- **Feature-importance simulations in this run** that report bias, power or coverage across many repetitions: [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

## See Also

- [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] — turning these MCSEs into $n_{\text{sim}}$
- [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] — how to display them
- [[How Many Digits to Report]] — rounding to Monte Carlo precision
