---
title: "How Many Digits to Report"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 11.6-11.8, pp. 201-206 (Figure 11.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Effective Sample Size and Monte Carlo Standard Error]]"
  - "[[Chains, Iterations, and Effective Sample Size]]"
  - "[[Point Estimates and Uncertainties]]"
used_by:
  - "[[Fit Fast, Fail Fast]]"
  - "[[Modeling as Software Development]]"
aliases:
  - "Significant digits"
  - "Replicability of stochastic computation"
  - "Quantile dot plot"
  - "Reporting workflow"
---

# How Many Digits to Report

> [!summary]
> An underrated practical question with a clean answer: **decide how many digits you can defend, then check
> the MCSE supports them.** Worked on the Kilpisjärvi temperature slope, Stan reports `1.97 (0.673, 3.24)`
> — but repeating with ten different seeds shows the **5% quantile varying between 0.6 and 0.7**, so the
> honest report is `2.0 (0.7, 3.2)`, or better, "**1 to 3 degrees per century (81% probability)**." Two
> memorable rules: **halving MCSE requires quadrupling the iterations**, and **relative errors below 1% are
> typically negligible, so two significant digits usually suffice.**

## Overview

> [!important] Decide the digits before deciding the iterations (Ch. 11.4, p. 199)
> "**Before we can decide how many chains and iterations to run, we need to know how many significant digits
> we want to report. Too often, we see tables filled with numbers like 1.7705. It's unlikely that all these
> digits are accurately estimated, and also unlikely that the accuracy in magnitude of one in ten thousand
> would be needed for any practical purpose (unless you are working on particle physics). Reporting too many
> digits makes it more difficult to read summary tables.**
>
> **Without any additional information, we may assume that relative errors smaller than 1% are typically
> negligible, and thus most of the time it is sufficient to report two significant digits. Accuracy to just
> one significant digit can be sufficient in the early stages of analysis and can be sensible and convenient
> even in final reporting.**"

> [!definition] The workflow for how many iterations to run (Ch. 11.4, p. 200)
> 1. **Run inference with some default number of iterations.**
> 2. **Check convergence diagnostics for all parameters.**
> 3. **Check that the ESS is big enough for reliable convergence diagnostics for all parameters.**
> 4. **Look at the posterior for quantities of interest and decide how many significant digits are needed**,
>    taking into account the posterior uncertainty (posterior sd, MAD sd, or tail quantiles).
> 5. **Check that MCSE is small enough for the desired accuracy** of the summaries to be reported.
>    - "**If the accuracy is not sufficient, report fewer digits or run more iterations.**"
>    - "**Halving MCSE requires quadrupling the number of iterations** (if the variance is finite)."
>    - "**Different quantities of interest have different MCSE and may require different numbers of
>      iterations.**"
>    - For infinite-variance quantities, "**use, for example, median instead of mean and mean absolute
>      deviation (MAD) instead of standard deviation.**"
>
> "**In early phases of iterative model building, we can often use fewer iterations and, for Hamiltonian
> Monte Carlo, fewer steps per iteration. The above workflow is for preparing final results.**"
^def-iteration-workflow

## Main Content

### The worked example

> [!example] The Kilpisjärvi temperature slope (Ch. 11.6, pp. 201-203)
> The linear model of [[Choosing an Initial Model]], with the slope multiplied by 100 to give **degrees per
> century**. All diagnostics pass.
>
> **What Stan prints by default:**
> ```
> variable  mean     5%   95%
> beta100   1.97  0.673  3.24
> ```
> "**By default we see 3 significant digits, which in this case is more than needed.**"
>
> **Step 1 — judge against the posterior width.** "Considering the width of the 90% interval, **it could make
> sense to report the posterior mean as 2.0 and the posterior interval as (0.7, 3.2).**"
>
> **Step 2 — consider rounding further.** "Depending on context, it might be even better to round more, and
> report that the increase is estimated to be **1 to 3 degrees per century (81% probability, which could be
> rounded to 80%)**, or **0 to 4 degrees per century (99% probability)**."
>
> > **"There is no need to stick to reporting 90% or 95% intervals."**
>
> **Step 3 — verify empirically by re-running with different seeds.** Ten repetitions:
> ```
>  mean     5%   95%
>  1.94  0.662  3.20
>  1.92  0.580  3.20
>  1.96  0.665  3.31
>  1.93  0.583  3.25
>  1.94  0.647  3.20
>  1.93  0.660  3.17
>  1.94  0.651  3.27
>  1.93  0.651  3.20
>  1.93  0.677  3.21
>  1.92  0.649  3.19
> ```
> "**For the mean, the second decimal place is varying, and the rounded value is between 1.9 and 2.0. For the
> 5% quantile, even the first significant digit is sometimes varying, and the rounded value would vary
> between 0.6 and 0.7. For the 95% quantile, the second digit is varying.**"
>
> **Step 4 — get the same answer analytically from MCSE, without re-running.**
> ```
>  variable  mcse_mean  mcse_q5  mcse_q95
>  beta100      0.0127   0.0363    0.0325
>
>  variable  ess_mean  ess_q5  ess_q95
>  beta100       3816    2525     3153
> ```
> "**If we multiply these by 2, the likely range of variation due to Monte Carlo is $\pm 0.02$ for the mean
> and $\pm 0.07$ for the 5% and 95% quantiles. From this we can interpret that it's unlikely there would be
> variation in the reported estimate for the mean, if it is reported as 2.0.**"
>
> **The key structural observation:** "**This illustrates that ESS can be different for different quantities,
> and similar ESS doesn't always correspond to similar MCSE. Here, for example, the ESS is similar for all
> quantities, but the 5% and 95% quantiles have higher MCSE than the mean.**" More generally: "**tail
> quantiles typically have lower accuracy than the posterior mean.**"
>
> **The cost of one more digit:** getting the quantile MCSE down to 0.01 "**would require about 10 times more
> iterations.**"
^ex-kilpisjarvi-digits

> [!example] Reporting a probability
> ```
>  variable  mean     mcse
>  betapos  0.993  0.00146
> ```
> "**The probability is simply estimated as a posterior mean of an indicator function $I_{\beta>0}$**" —
> which is why it has an MCSE at all.
>
> "**The MCSE here indicates that we have enough iterations for reporting that the probability of increasing
> temperature is larger than 99%. There is not much practical difference to reporting a probability of
> 99.3%, and to estimate that third digit accurately would require approximately 50 times more
> iterations.**"
>
> **And the closing redirection, which is the real point:** "**For this simple problem, sampling that many
> iterations would not be time consuming, but we might also instead consider obtaining more data to verify
> that the summer temperature in northern Finland has been increasing since 1952.**"
>
> More Monte Carlo precision is almost never the binding constraint. **Posterior uncertainty is.**

### Rough estimates before you run

> [!definition] The CLT calculation (Ch. 11.6, pp. 203-204)
> Assuming finite mean and variance and $S$ independent draws, the estimate of $E(\theta)$ is approximately
> $$\text{normal}\!\left(\hat\theta,\ \hat\sigma_\theta/\sqrt{S}\right)$$
>
> "**Given any $\hat\theta$ and $\hat\sigma_\theta$: if $S = 100$, the uncertainty is 10% of the posterior
> scale**, which would often be sufficient for initial experiments; **if $S = 10{,}000$, the uncertainty is 1%
> of the posterior scale**, which would often be sufficient for two-significant-digit accuracy."
>
> **Working in units of the posterior sd** ("we get equivalent but simpler results if we set
> $\hat\sigma_\theta = 1$"):
>
> | $S$ | MCSE | 99.7% range of variation | Accuracy |
> |---|---|---|---|
> | **100** | 0.1 | $\pm 0.3$ | "**the first significant digit would stay the same or have minor variability to one smaller or one larger digit** — near **one-significant-digit** accuracy" |
> | **2000** | 0.02 | $\pm 0.07$ | "**the first significant digit would stay the same and the second significant digit would have minor variability** — near **two-significant-digit** accuracy" |
>
> **Applied to Stan's defaults:** "**Dynamic HMC in Stan is often so efficient that $\text{ESS} > S/2$. Thus
> the default setting of 4 chains, with 1000 post-warmup iterations for each, is likely to give nearly two
> significant digits of accuracy for the posterior mean. The accuracy for 5% and 95% quantiles would be
> between one and two significant digits.**"
^def-rough-iteration-estimates

> [!warning] Why high ESS is not sufficient
> "**High ESS does not alone guarantee certain accuracy, as the MCSE depends also on the quantity of interest
> and thus in the end it is useful to check MCSEs for the values to be reported.**
>
> For example, above, **the estimate for whether the temperature increase is larger than 4 degrees per
> century has high ESS, but the indicator variable contains less information than continuous values, and thus
> a much higher ESS would be needed for two-significant-digit accuracy.**"

### Graphical display

> [!important] Prefer a plot, but do not overinterpret it (Figure 11.3, Ch. 11.6, p. 204)
> "**Instead of reporting results only with numbers (requiring the need to consider how many digits to
> report), often it is better to communicate with graphical displays, even if people are not perfect in
> reasoning from such displays**" (Kale, Kay, and Hullman 2020).
>
> **Figure 11.3 shows two encodings of the same posterior:**
> - **(a)** a density estimate with the posterior mean as a vertical line, the **80% interval shaded**, and
>   the density **truncated to show 99%** of the probability;
> - **(b)** a **quantile dot plot** — mean as a dot, 80% interval as a thick line, 99% as a thin line, and
>   **each dot representing 1% of the posterior mass.**
>
> "**It is easy to read from the plot that the mean is approximately 2, the 80% interval is approximately
> (1, 3), and the 99% interval is approximately (0, 4).**"
>
> **The tradeoffs among display types:** "**Kernel density estimates and histograms can oversmooth and hide
> part of the interesting shape of the posterior** (Gelman 2021), **whereas the quantile dot plot is likely
> to be better calibrated**" (Säilynoja, Johnson, et al. 2025). "**The shape of the tail in the estimate is
> more sensitive to choices made in the visualization and can lead to misleading inference from the plot.
> Thus, although graphical displays can be easy to read, care is needed to not overinterpret them.**"

### Replicability of stochastic computation

> [!definition] Computational replicability with probabilistic accuracy (Ch. 11.7, p. 205)
> "**When using stochastic inference algorithms, it is difficult to obtain exact replicability. Even if the
> same software release and pseudo-random number generator seed were used, tiny differences in the software
> libraries, compilers, compiler options, operating systems, and hardware may lead to obtaining different
> posterior draws.**
>
> **Although the posterior draws are not necessarily bit-by-bit replicable, the results can be
> probabilistically valid, and the same conclusions would be made.**"
>
> "**If small variation is allowed** — for example, if a minor difference in the second significant digit is
> allowed when the computation would be repeated — **then fewer iterations are needed. We may say that in
> these cases, even if we don't get exact replicability, we get computational replicability with sufficient
> probabilistic accuracy.**"
^def-computational-replicability

> [!warning] On fixing the random seed
> "**Setting the random seed to a fixed value can be sometimes useful in early parts of the workflow and
> demonstrative case studies, but if a fixed seed is used for final reporting, it may raise doubt that the
> seed has been hand picked from many tested seeds. Without fixing the seed, running more iterations may be
> needed to get replicable results to the specified number of significant digits.**"
>
> **When the threshold matters, check it:** "if the computed 95% posterior interval for a risk ratio is
> $(1.02, 1.63)$, and the reporting rules depend on whether the posterior interval excludes the value 1, then
> **it would be a good idea to check the precision on this endpoint.**"

> [!important] Seeds and simulated data
> "**When using simulated data, the simulation process can be such that some simulated data sets are
> problematic to model. We may then intentionally select a dataset that can be used to illustrate a specific
> behavior (by fixing a seed or by saving the specific realization). Alternatively, sometimes we may want to
> use such simulations that with any random simulated data, the interesting results do replicate.**"
>
> Both practices are legitimate; the distinction is whether you are **illustrating a phenomenon** or
> **establishing that it is generic** — a distinction worth stating explicitly in any write-up.

## Connections

- The digit-counting discipline is the reporting-side analogue of
  [[From Inference to Decision]]'s argument against thresholds: **precision beyond what the data support is
  a form of overclaiming.**
- "Consider obtaining more data instead" is the recurring redirection of the whole chapter — Monte Carlo
  error is the cheapest source of uncertainty to reduce and therefore rarely the one that matters.
- Seed-fixing concerns connect to reproducibility practice in [[Modeling as Software Development]].

## See Also
- [[Effective Sample Size and Monte Carlo Standard Error]] — the quantities being applied here
- [[Chains, Iterations, and Effective Sample Size]] — how long to run, from the convergence side
- [[Point Estimates and Uncertainties]] — which summary to report before deciding its precision
- [[Visualizing High-Dimensional Inference]] — graphical display at larger scale
