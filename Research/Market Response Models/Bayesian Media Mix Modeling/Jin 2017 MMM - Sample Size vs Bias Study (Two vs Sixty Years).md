---
title: "Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - topic/mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 6, pp. 14-19 (Table 4, Figures 7-8); Sec. 7, pp. 19-21 (Tables 5-6, for the bias mechanism); Sec. 3, p. 7 and Sec. 5.1, p. 11 (sampler run times)"
date_updated: 2026-10-13
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]]"
  - "[[Shape (Saturation) Effects]]"
  - "[[Carryover (Adstock) Functional Forms]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
used_by:
  - "[[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]"
  - "[[Jin 2017 MMM - Conclusions, Limitations and Extensions]]"
  - "[[MMM Model Selection and Application]]"
  - "[[Bayesian Media Mix Modeling - Overview]]"
aliases:
  - Jin 2017 sample size study
  - Two years vs sixty years MMM simulation
  - Jin Table 4
  - MMM small-sample response-curve underestimation
---

# Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)

> [!summary]
> Section 6 of Jin, Wang, Sun, Chan & Koehler (2017) repeats the Section 5 estimation on **500 simulated datasets** at two sample sizes — **two years** (104 weeks) and **sixty years** of weekly data (about 3,120 weeks, 30 times as many rows) — with the same priors (Table 3). With two years, every channel's $\beta$Hill response curve is **underestimated by 18-40%** (Table 4). Media 1 has the largest bias even though its signal is as strong as Media 2's, because its true slope $S=1$ makes the shape harder to identify. With sixty years the curves are recovered almost exactly (bias between -0.2% and +10.4%), yet the individual shape parameters $K, S, \beta$ still **vary widely across datasets**: the curve is identified but its parameters are not. The authors trace the small-sample bias to the priors. Sixty years of history is a **simulation device**, and the paper says it is not a practical recommendation.
^summary

## Overview

A single simulated dataset (Section 5) cannot show whether the estimator is biased, because one run mixes estimator error with the randomness of that particular dataset. Section 6 therefore turns the Section 5 example into a small **Monte Carlo study**. It is an early, clear example of the simulate-fit-compare loop that the vault describes in [[Designing Simulated-Data Experiments]] and formalises with the ADEMP framework in [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]. The finding underlies the main warning of Section 9 of the paper: with typical MMM data, the model returns what the priors say.

## Main Content

### Design (ADEMP reading)

> [!definition] Simulation design of Section 6 (pp. 14-16)
> - **Aim.** Find out whether finite samples give biased media effects, and how bias and variance change with sample size.
> - **Data-generating mechanism.** Same as Section 5. There are 3 media and 1 control (price), and media spend is a yearly sinusoid plus white noise, scaled to $[0,1]$. Price is an ARIMA series. Sales follow Eq. (7) with **delayed adstock + $\beta$Hill** and the true parameters of Table 1: $\alpha=(0.6,0.8,0.8)$, $\theta=(5,3,4)$, $K=(0.2,0.2,0.2)$, $S=(1,2,2)$, $\beta=(0.8,0.6,0.3)$, $L=13$, $\tau=4$, $\gamma=-0.5$, noise $\sim N(0,0.05^2)$. See [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]].
> - **Factor varied.** Sample size: **two years** vs **sixty years** of weekly data. The priors stay fixed at Table 3 in both arms.
> - **Replicates.** $n_{\text{sim}} = 500$ datasets per arm, each from a different random seed.
> - **Estimands.** The transformation parameters $\alpha_m,\theta_m,K_m,S_m$, the coefficients $\beta_m$, and the **response curve** $\beta_m\text{Hill}(x;K_m,S_m)$ evaluated at $x=0.5$ and $x=1$.
> - **Method.** The Bayesian model of Eq. (7), fitted by MCMC with the Table 3 priors.
> - **Point estimator per dataset.** The **posterior median**. The authors pick the median over the mean "because the mean is more sensitive to skewed distributions, which occur quite often in our example" (p. 16).
> - **Performance measure.** Relative bias of the **mean of the 500 posterior medians** against the truth, $\big(\overline{\hat\vartheta} - \vartheta\big)/\vartheta$. Spread is shown graphically by density plots of the 500 medians (Fig. 7) and overlays of the 500 median curves (Fig. 8).
^sec6-design

> [!definition] The two arms in rows, and what the sampler timing implies (Sec. 6, p. 16; Sec. 3, p. 7; Sec. 5.1, p. 11)
> | Arm | Weekly rows per dataset | Datasets | Total rows fitted |
> |---|---|---|---|
> | Two years | about 104 | 500 | about 52,000 |
> | Sixty years | about 3,120 ($60\times 52$) | 500 | about 1.56 million |
>
> (Row counts are my arithmetic. The paper states only "two years" and "sixty years of weekly data".)
>
> - **Sample size needed depends on the scenario.** The paper does not claim sixty years is the threshold for unbiasedness. It says "The actual sample size required for the estimates to be unbiased vary for different scenarios" (p. 19). Sixty years is simply one large arm that shows the bias vanishes asymptotically under *this* DGP. My reading: weaker signals (like Media 3), slope $S=1$, or $K$ outside the spend range (Sec. 7.2) would plausibly need more data. The paper reports no intermediate sizes (e.g. 5 or 10 years), so the sample size at which the bias becomes acceptable is **not identified** by this study.
> - **Computation.** Sec. 3 (p. 7) says the STAN sampler finishes "within a reasonable time on a data set of a few hundred data points" but "could take quite a few hours or even a couple of days on larger data sets of a few thousand data points", because the transformation parameters are highly correlated. A sixty-year replicate (about 3,120 rows) is exactly that "few thousand" size, and the arm has 500 of them. The paper does **not say which sampler** fitted the Sec. 6 replicates. The custom C++ Gibbs/slice sampler (52 s for 10,000 iterations on a two-year dataset, p. 11) is the one the authors call "much more efficient", and the scale of the sixty-year arm suggests it was the practical choice. This is my inference, not a stated fact. See [[Jin 2017 MMM - STAN Sampler Code and MCMC Implementation]].
> - **Practical reading.** A sample large enough to remove the bias is also one where STAN-style HMC becomes slow on this model. The authors' remedies in Sec. 9 (category pooling, geo-level data) add rows across units, not across time.
^sixty-year-rows

### Table 4 — relative bias of the $\beta$Hill curves

> [!theorem] Result: response curves are underestimated with two years and recovered with sixty (Table 4, p. 16)
> Relative difference between the mean of the posterior medians of $\beta\text{Hill}$ and the true value:
>
> | | $x=0.5$, two years | $x=0.5$, sixty years | $x=1$, two years | $x=1$, sixty years |
> |---|---|---|---|---|
> | Media 1 | **-39.7%** | -0.2% | **-32.5%** | -0.2% |
> | Media 2 | **-25.6%** | 3.4% | **-18.1%** | 3.3% |
> | Media 3 | **-39.0%** | 10.4% | **-25.3%** | 10.4% |
>
> **Conditions.** These numbers hold for the Section 5 data-generating process, with strong signal (media explain about 6-19% of sales variance each, noise 12.9%; see Table 2), weakly correlated media, spend spread across $[0,1]$, and the Table 3 priors, which include half-normal$(0,1)$ on $\beta$, beta$(2,2)$ on $K$ and gamma$(3,1)$ on $S$.
>
> **Reading.** All six two-year entries are negative: the bias is **systematic underestimation**, not noise. The bias is larger at $x=0.5$ than at $x=1$ for every channel. With sixty years the bias is negligible for Media 1 and 2. Media 3, the weakest channel, keeps a small **positive** bias of about +10% at both points.
^table4

> [!example] What the Table 4 percentages mean in curve units (worked example, my computation from Table 1 values)
> True curve values $\beta\,\text{Hill}(x) = \beta/(1+(x/K)^{-S})$:
>
> | | true at $x=0.5$ | implied 2-yr mean median | true at $x=1$ | implied 2-yr mean median |
> |---|---|---|---|---|
> | Media 1 ($K$=0.2, $S$=1, $\beta$=0.8) | 0.571 | $0.571\times(1-0.397)\approx 0.345$ | 0.667 | $0.667\times(1-0.325)\approx 0.450$ |
> | Media 2 ($K$=0.2, $S$=2, $\beta$=0.6) | 0.517 | $\approx 0.385$ | 0.577 | $\approx 0.473$ |
> | Media 3 ($K$=0.2, $S$=2, $\beta$=0.3) | 0.259 | $\approx 0.158$ | 0.288 | $\approx 0.215$ |
>
> **Interpretation.** At realistic sample sizes, a typical analyst would credit Media 1 with only about two-thirds of its true contribution at full spend. ROAS scales with the area under this curve, so it would be understated by a similar amount. This matches the Section 5.2 single-dataset result: Media 1's ROAS is more biased than Media 2's (see [[Jin 2017 MMM - Simulated ROAS, mROAS and Optimization Results]]).
^what-the-table-4

### Figure 7 — parameter recovery by sample size

> [!theorem] Result: carryover parameters are recoverable, shape parameters are not (Figure 7, pp. 17-18)
> Figure 7 shows densities of the 500 posterior medians (black = two years, light blue = sixty years, dashed line = mean of medians, red line = truth) for (a) $\alpha$, (b) $\theta$, (c) $S$, (d) $K$ and (e) $\beta$.
> 1. **Delay $\theta$:** low bias and moderate uncertainty for all three media **even with two years**. With sixty years it is almost unbiased with very small variance. (For Media 1 the axis spans roughly 4.4-5.6 around the true value 5. For Media 3 the two-year density covers roughly 0-9.)
> 2. **Retention $\alpha$:** somewhat more bias and uncertainty with two years. Precise and accurate with sixty years.
> 3. **Adstock parameters overall:** recovered better for Media 1 and 2 than for the weak Media 3.
> 4. **Shape parameters $K$, $S$, $\beta$:** much harder to estimate. **Even with sixty years**, the bias is low but the posterior medians "vary widely". With two years they show high variance **and** large bias.
^fig7

> [!example] Figure 7 panel by panel (approximate values read off the plotted densities, pp. 17-18)
> The values below are my eyeball readings of the figure, not numbers printed in the paper. "Mean" is the dashed line, the mean of the 500 posterior medians; "truth" is the red line.
>
> | Panel | Medium (truth) | Two years (black) | Sixty years (light blue) |
> |---|---|---|---|
> | (a) $\alpha$ | Media 1 (0.6) | broad, about 0.3-0.8, flat peak (density ~5) near 0.6; mean ~0.58, just left of truth | sharp spike (density ~27) at 0.6; mean on truth |
> | (a) $\alpha$ | Media 2 (0.8) | broad, about 0.45-0.9 (density ~5); mean ~0.75, **below** truth | spike (density ~38) at 0.8; mean on truth |
> | (a) $\alpha$ | Media 3 (0.8) | very broad, about 0.37-0.9, mode near 0.6 (density ~4.5); mean ~0.64, **well below** truth | spike (density ~22) at 0.8; mean on truth |
> | (b) $\theta$ | Media 1 (5) | about 4.5-5.5 (axis 4.4-5.6), peak ~2.5; mean ~5.03, essentially on truth | spike (density ~14) at 5 |
> | (b) $\theta$ | Media 2 (3) | about 2.0-4.0 (axis to 4.5), peak ~1.5; mean on truth | spike (density ~6) at 3 |
> | (b) $\theta$ | Media 3 (4) | very wide, about 0-10 (axis 0-9+), peak ~0.65 near 4; mean ~4.1 | narrow spike (density ~1.7) at 4 |
> | (c) $S$ | Media 1 (1) | about 0.5-3.5, mode ~1.6; mean ~1.65, **far above** truth | peak (density ~2.3) just below 1; mean ~1.03 |
> | (c) $S$ | Media 2 (2) | about 1-4, mode ~1.7-1.8; mean ~1.97, on truth | similar spread, mode ~1.9; mean on truth |
> | (c) $S$ | Media 3 (2) | about 1-5 (axis to ~5), mode ~1.75; mean ~2.07 | almost the same shape as two years; mean ~1.95 |
> | (d) $K$ | Media 1 (0.2) | about 0.15-0.75, broad (density ≤ 4); mean ~0.38, **above** truth | peak (density ~12) at about 0.21; mean ~0.22 |
> | (d) $K$ | Media 2 (0.2) | mode ~0.25, long right tail to ~0.65 (density ~5); mean ~0.32 | spike (density ~20) at 0.2; mean on truth |
> | (d) $K$ | Media 3 (0.2) | about 0.15-0.8 (axis 0-0.8), flat (density ~3); mean ~0.41 | peak (density ~12) at 0.2; mean on truth |
> | (e) $\beta$ | Media 1 (0.8) | about 0.25-1.3, mode ~0.6 (density ~3.3); mean ~0.58, **below** truth | still broad, about 0.3-1.35, mode ~0.85 (density ~2.4); mean ~0.82 |
> | (e) $\beta$ | Media 2 (0.6) | about 0.25-1.0, mode ~0.55 (density ~3.5); mean ~0.57 | mode ~0.62 (density ~5); mean ~0.62 |
> | (e) $\beta$ | Media 3 (0.3) | about 0.05-0.85, mode ~0.25 (density ~4.9); mean ~0.27 | mode ~0.33 (density ~4.7); mean ~0.34 |
>
> **Pattern.** With two years, $K$ is biased **upward** and $\beta$ **downward** for all three media, and $S$ is biased upward for Media 1. Each of these moves lowers the curve on $[0,1]$. With sixty years the adstock parameters collapse to spikes on the truth, but the $\beta$ medians stay wide (Media 1 spans about 0.3-1.35). That is the "vary widely" statement in numbers. For Media 3 the sixty-year $\beta$ mean (~0.34) is above 0.3, which fits the +10.4% curve bias in Table 4.
^fig7-panels

### Figure 8 — the curves themselves

> [!theorem] Result: the curve is identified even when its parameters are not (Figure 8, p. 18)
> Figure 8 overlays the 500 posterior-median $\beta$Hill curves for each medium, with darker shading for higher density (drawn with the R package `boom`). The red line is the true curve and the blue line is the mean of the medians.
> - **(a) Two years:** for all three media the blue mean curve lies **below** the red truth. Media 1 has the largest gap.
> - **(b) Sixty years:** all curves sit tightly on the truth, with very low bias and small variance.
>
> **Why Media 1 is worst.** Its signal strength is similar to Media 2's (18.1% vs 19.4% of variance, Table 2). Its true $S=1$, however, is exactly the regime in which very different $(K,S,\beta)$ triples give near-identical curves on the observed range (Section 2.2, Figure 2). The data therefore cannot pin the curve down and the prior pulls it. See the identifiability warning in [[Shape (Saturation) Effects#^identifiability]].
>
> **Curve vs parameters.** Combining Figs. 7 and 8: with sixty years the *curve* is estimated very well while $K,S,\beta$ separately are not. This is near-unidentifiability. The likelihood constrains a function of the parameters, not each parameter.
>
> **Figure layout and scales (read off the plot).** Six panels: row (a) two years, row (b) sixty years, columns Media 1-3. The x-axis is media spend 0-1 in every panel. The y-axis tops out at about **0.8 for Media 1**, **0.7 for Media 2** and **0.5 for Media 3**. Each panel holds **500 curves**, one posterior-median curve per simulated dataset, drawn as black or grey lines with darker shading where curves are denser (caption, p. 18).
>
> | Medium | true $\beta$Hill(1) (red) | two-year blue mean at $x=1$ (approx.) | two-year band at $x=1$ (approx.) | sixty-year blue vs red at $x=1$ |
> |---|---|---|---|---|
> | Media 1 | 0.667 | ~0.45, clearly below red over the whole range | ~0.2-0.8 (very wide) | on top of red |
> | Media 2 | 0.577 | ~0.47, below red | ~0.2-0.7 | slightly above (~0.59), tight band |
> | Media 3 | 0.288 | ~0.21, below red | ~0.05-0.5 (very wide) | above (~0.32 vs 0.29), visible gap |
>
> At two years the gap between the blue mean and the red truth is visible from about $x=0.1$ onward. For Media 1 it is about 0.2 in curve units at full spend, about a third of the true value. At sixty years the blue and red lines overlap for Media 1. For Media 2 they are almost overlapping. For Media 3 there is a small, constant gap with blue above red, which is the +10.4% in Table 4. The sixty-year bands are much narrower, but still visibly grey around the mean, most of all for the weak Media 3.
^fig8

### Mechanism and caveat

> [!theorem] Attribution of the bias to the priors (p. 16 and p. 19; tested in Sec. 7)
> **Claim.** The small-sample bias comes from the prior distributions. When the sample is small and the signal weak, the posterior is mostly determined by the priors, and the data is "not strong enough to correct any bias introduced by the priors" (p. 19). The sample size needed for unbiasedness depends on the scenario. Section 7 tests this directly by changing the priors (see [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]).
>
> **The paper names "the prior distributions" in general, not one prior.** Sec. 7 shows that at least two of the Table 3 priors move the two-year bias. My sketch of how each contributes:
> 1. **Prior on $\beta$ (half-normal$(0,1)$, mode at 0).** It pulls the maximum effect toward zero, and the weak, partly unidentified likelihood along the $(K,S,\beta)$ ridge does not resist. Sec. 7.1 (Table 5): replacing it with uniform$(0,3)$, which puts more mass on large $\beta$, cuts the Media 2 bias at $x=1$ from -18.0% to -1.5%. Replacing half-normal$(0,1)$ with **normal$(0,1)$ changes almost nothing** (Media 2: -25.5% vs -25.6% at $x=0.5$, -18.0% vs -18.0% at $x=1$). On the positive half-line the two have the same shape, so it is the scale and mode of the prior that matter, not the sign constraint.
> 2. **Prior on $K$ (beta$(2,2)$, mean 0.5 against a true 0.2).** It pushes $K$ upward, which matches the upward shift of the two-year $K$ medians in Fig. 7d. A larger $K$ moves the half-saturation point right and lowers the curve at low spend. Sec. 7.2 (Table 6, Scenario I, Media 2): switching to uniform$(0,1)$ cuts the bias from **-25.5% to -16.0% at $x=0.5$** and from **-18.0% to -9.2% at $x=1$**. Uniform$(0,10)$ gives -21.2% and -10.2%.
> 3. **No single prior removes the bias.** Under every prior tested, every two-year Media 2 entry stays negative, except the uniform$(0,3)$-on-$\beta$ case, which gets close to zero. The authors warn that this gain does not generalise (p. 20). The bias is a property of the prior *ensemble* combined with a weak likelihood. See [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] for the full Tables 5-6.
>
> The 0.1-point gap between the Table 4 Media 2 entries (-25.6%, -18.1%) and the half-normal / beta$(2,2)$ entries in Tables 5-6 (-25.5%, -18.0%) is presumably Monte Carlo noise across separate 500-dataset runs. The paper does not explain it.
^bias-mechanism

> [!warning] Sixty years is a simulation device, not advice (p. 19)
> The authors stress that lengthening history is "not the recommended way to increase sample size in real problems". Market demand, macroeconomic conditions and other factors change a great deal over long periods, so a sixty-year series would break the stationarity the model assumes. Section 9 points to other ways of getting more information: pooling brands within a category (Wang et al. 2017) and geo-level data (Sun et al. 2017) in hierarchical Bayesian models. See [[Jin 2017 MMM - Conclusions, Limitations and Extensions]].
^sixty-years-caveat

## Examples

> [!example] Marketing-analytics reading
> A typical national weekly MMM has 104-156 rows (see [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]). Table 4 says that, **even when the model is correctly specified** and the signal is stronger than in most real datasets, the fitted saturation curves of a two-year model can be 18-40% too low, and the error is driven by the priors. A model with a lower in-sample error can therefore still give attribution that is mostly the prior. Prior-sensitivity reruns and [[Prior Predictive Checking]] belong in any MMM validation.
^marketing-analytics-reading

## Connections

- **Simulation methodology.** The study reports bias as the mean of posterior medians but gives **no Monte Carlo standard errors**, coverage or empirical SE. Morris et al. would add these (see [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]], [[Effective Sample Size and Monte Carlo Standard Error]]). With 500 replicates, the +3.4% vs +3.3% differences are probably within MC error.
- **Calibration checks.** The study checks frequentist bias of a Bayesian estimator under a fixed truth. [[Simulation-Based Calibration - Overview]] checks a different property, posterior calibration when the truth is drawn from the prior, and the two are complementary.
- **Prior vs likelihood.** Mechanism discussed in [[Influence of Likelihood and Prior]] and [[Tail Behavior and Prior-Likelihood Conflict]].
- **Same lesson elsewhere.** [[Chan Perry 2017 - MMM Data Limitations (156 Rows, Correlated Channels, Narrow Spend Range)]]. The AMSS simulator studies (see [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]) extend this kind of ground-truth testing to richer data-generating processes.
- **Prediction-model sample size.** A related frequentist view of "how much data is enough" is in [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map for this paper
- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] — the data-generating process used here
- [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]] — Section 7 follow-up
- [[MMM Model Selection and Application]] — earlier summary of the same finding
- [[Designing Simulated-Data Experiments]]
