---
title: "Q: Partial pooling shows up as hierarchical models, James–Stein / empirical Bayes shrinkage, global-local shrinkage priors, the Gamma-Gamma and NBD customer models, global forecasting models and LLM pretraining. What is the shared mechanism, and when does pooling hurt?"
tags:
  - type/qa
  - topic/bayesian-statistics
  - topic/hierarchical-models
  - topic/machine-learning
  - topic/customer-lifetime-value
  - topic/forecasting
date_asked: 2026-09-18
answered_from:
  - "[[Hierarchical Models]]"
  - "[[Hierarchical Linear Models]]"
  - "[[Partial Pooling as Multiple Comparisons Correction]]"
  - "[[Empirical Bayes - Overview]]"
  - "[[James-Stein Estimator]]"
  - "[[Stein's Paradox and Risk Dominance]]"
  - "[[Empirical Bayes Interpretation of Shrinkage]]"
  - "[[Robbins Formula and Poisson Empirical Bayes]]"
  - "[[Global-Local Shrinkage Priors]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
  - "[[Gamma-Gamma Model of Monetary Value]]"
  - "[[Pareto-NBD Model]]"
  - "[[BG-NBD Model]]"
  - "[[Bayesian and Hierarchical Extensions of CLV Models]]"
  - "[[Local vs Global Forecasting Models]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
  - "[[Time-Series Foundation Models (Chronos)]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
  - "[[Building Up to a Hierarchical Model - Coronavirus Testing]]"
  - "[[Type S and Type M Errors]]"
  - "[[Bayesian Estimation and Priors for MMM]]"
  - "[[Hierarchical Inference in Gaussian Models]]"
  - "[[Computational Troubleshooting]]"
  - "[[Modeling Ideas to Address Computing Problems]]"
related_questions:
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
aliases:
  - "Partial pooling from eight schools to LLM pretraining"
  - "When does borrowing strength hurt"
  - "Shared mechanism of shrinkage across statistics and ML"
---

# Partial pooling shows up as hierarchical models, James–Stein / empirical Bayes shrinkage, global-local shrinkage priors, the Gamma-Gamma and NBD customer models, global forecasting models and LLM pretraining. What is the shared mechanism, and when does pooling hurt?

> [!summary]
> The shared mechanism has three parts: (1) many parallel units are treated as draws from one population distribution; (2) that distribution is **learned from the pooled (marginal) data** rather than assumed; (3) each unit's estimate is a compromise between its own data and the population, with the weight set by relative precision. Hierarchical Bayes, James–Stein, the Gamma-Gamma and NBD models are *literally* this algebra; global-local priors are the same idea with a heavy-tailed population; global forecasters and LLM pretraining share steps (1)–(2) but individualise through *inputs*, not through a unit-level posterior. Pooling hurts when the "others" are the wrong others, when there are too few groups to learn the between-group scale, when a Gaussian population crushes real outliers, when funnel geometry breaks the sampler, and when scale heterogeneity or distribution shift makes one shared function a biased fit.

## Answer

### The mechanism in one equation

[[Hierarchical Models]] starts from **exchangeability**: if nothing distinguishes the groups a priori, de Finetti's theorem lets us write $\theta_j \mid \mu,\tau \sim \mathcal N(\mu,\tau^2)$, and "exchangeability implies a prior, not the other way around." The posterior mean is then a precision-weighted average ([[Hierarchical Models#^partial-pooling-formula]]):

$$
\hat\theta_j \approx \frac{\sigma_j^{-2}\,y_j + \tau^{-2}\,\mu}{\sigma_j^{-2}+\tau^{-2}} = \mu + B_j\,(y_j-\mu),\qquad B_j=\frac{\tau^2}{\tau^2+\sigma_j^2}.
$$

The decisive feature is that $\tau$ is **informed by how much the groups actually vary**: similar $y_j$ push $\hat\tau\to0$ (complete pooling), dispersed $y_j$ push toward no pooling. [[Empirical Bayes - Overview]] names the move that makes this possible — the marginal $f(z)=\int g(\mu) f_\mu(z)\,d\mu$ is observable, so features of the prior can be recovered "without that prior ever being specified," but "a single problem provides no leverage on the prior." [[James-Stein Estimator]] is the plug-in version: the marginal $z\sim\mathcal N(0,(A+1)I)$ gives $E\{(N-2)/S\}=1/(A+1)$, so the unknown Bayes factor is replaced by a data estimate. [[Empirical Bayes Interpretation of Shrinkage]] gives the equivalences: EB is the plug-in approximation to a full hierarchical model (it "ignores uncertainty in the estimated prior"), and the same shrinkage is a ridge penalty $\sum(z_i-\mu_i)^2+\lambda\sum(\mu_i-\bar z)^2$ with $\lambda$ estimated.

> [!theorem] Theorem: Z-score shrinkage factor ([[Partial Pooling as Multiple Comparisons Correction#^thm-zscore-shrinkage]])
> For a comparison of two groups under the normal-normal model,
> $$
> z_{\text{Bayes}} = \frac{\bar y_j-\bar y_k}{\sqrt2\,\sigma_{\bar y}}\cdot\frac{1}{\sqrt{1+\sigma_{\bar y}^2/\sigma_\theta^2}},
> $$
> so the correction is strongest exactly when between-group variance is small relative to sampling variance. In the eight-schools simulation this cuts "at least one significant comparison" from 47% of replications to 5% and raises correct-sign claims from 63% to 89%.

This is why [[Type S and Type M Errors]] recommends multilevel models: shrinkage repairs the point estimates that underpowered comparisons exaggerate, rather than only widening intervals.

### The same idea in seven costumes

| Instance | Units | Population distribution | How it is learned | How a unit is individualised | Pooling weight |
|---|---|---|---|---|---|
| Normal hierarchical model, [[Hierarchical Linear Models]] | schools, states, geos | $\mathcal N(\mu,\tau^2)$ (or $\mathcal N(\mu_{\alpha\beta},\Sigma)$ for intercepts and slopes) | hyperprior + MCMC | own posterior $\theta_j$ | $\tau^2/(\tau^2+\sigma_j^2)$ |
| [[James-Stein Estimator]] (parametric EB) | 18 batters | $\mathcal N(M,A)$ | plug-in from marginal sum of squares | $\bar z + \hat B(z_i-\bar z)$ | $1-(N-3)\sigma_0^2/S$ |
| [[Robbins Formula and Poisson Empirical Bayes]] | policyholders | unspecified $g$ | empirical count frequencies | $(x+1)\hat f(x+1)/\hat f(x)$ | implicit in $\hat f$ |
| [[Global-Local Shrinkage Priors]] | regression coefficients | $\mathcal N(0,\tau^2\lambda_j^2)$, $\lambda_j\sim C^+(0,1)$ | global $\tau$ shared, local $\lambda_j$ per coefficient | $\bar\beta_j=(1-\kappa_j)\hat\beta_j$ | $\kappa_j = 1/(1+n\sigma^{-2}\tau^2s_j^2\lambda_j^2)$ |
| [[Gamma-Gamma Model of Monetary Value]]; [[Pareto-NBD Model]], [[BG-NBD Model]] | customers | gamma on spend rate $\nu$; gamma on $\lambda$, gamma/beta on dropout | marginal maximum likelihood | conjugate update, e.g. $r\to r+x$, $\alpha\to\alpha+T$ | $w(x)=(q-1)/(px+q-1)$ |
| [[DeepAR and Global Autoregressive Neural Forecasters]], [[Time-Series Foundation Models (Chronos)]] | series | shared weights $\Theta$ (optionally an item embedding) | SGD on $\sum_i\sum_t\log\ell$ over all series | conditioning on own lags, scale $\nu_i$, covariates | none explicit |
| LLM pretraining + [[In-Context Learning and Few-Shot Prompting]] | documents / tasks | pretrained next-token distribution | outer loop of gradient descent | $K$ demonstrations in the prompt | none explicit |

Two more appearances: [[Hierarchical Inference in Gaussian Models]] uses the evidence $p(y\mid\Theta)$ (type-II likelihood) to calibrate a solver's one free scale and draws the same EB-vs-full-Bayes line; [[Bayesian Estimation and Priors for MMM]] notes the MMM can be made hierarchical across brands or geos "to manufacture more informative priors."

### What is genuinely the same, and what only looks similar

**Identical algebra.** The Gamma-Gamma conditional expectation ([[Gamma-Gamma Model of Monetary Value]], Eq. 5) is "the weighted average of the population mean … and the observed average transaction value," with $px$ playing the role of data precision and $q-1$ the prior's. With CDNOW parameters $w(1)=0.305$ and $w(7)=0.059$; at $x=0$ the forecast is the population mean. [[Bayesian and Hierarchical Extensions of CLV Models]] says it outright: the classical CLV models "are already two-level hierarchical models" fitted by parametric empirical Bayes, with a proposed third level so young cohorts "borrow" from old ones. EB and full Bayes barely differ with tens of thousands of customers; the gap "matters for small or young cohorts."

**Same family, different target.** Global-local priors pool *coefficients toward zero* rather than *groups toward a mean*, and replace the single Gaussian population by a scale mixture. The $\kappa_j$ formula "holds for any scale-mixture-of-Gaussians prior"; ridge (all $\lambda_j$ fixed) is ordinary Gaussian pooling, while the horseshoe's U-shaped prior on $\kappa_j$ expects *two kinds* of unit: noise, and signals that should escape.

**Looks similar, is structurally different.** [[Local vs Global Forecasting Models]] maps local/global onto no pooling/complete pooling *of parameters*, and says a global network with a learned item embedding "behaves like partial pooling … regularised by early stopping rather than by a hyperprior." The forecast for series $i$ differs from series $j$ "only through the inputs." [[In-Context Learning and Few-Shot Prompting]] makes the parallel claim for LLMs — a population distribution learned from many groups, "then sharpened for a new group by a few observations" — but explicitly labels it "interpretive, not from the paper," and keeps Brown et al.'s caveat that the model "is not necessarily well-calibrated."

*Synthesis:* the dividing line is **where unit-specific information lives and what sets the amount of pooling**. In the statistical instances each unit has its own parameter with a posterior, and one interpretable quantity ($\tau$, $A$, $q$, the global scale) sets the pooling weight and can be given a prior and sensitivity-tested. In the ML instances the unit's information lives in the context window and the amount of pooling is an implicit property of a learned function: there is no $\tau$ to inspect, so the only diagnostics are predictive (backtests, coverage). That is why the ML versions scale to $10^5$–$10^6$ units where hierarchical priors "scale poorly," and why their failures are harder to see.

### When pooling hurts

**1. The wrong "others" (non-exchangeable units).** Efron's schematic ends with "**Which others?** is the central design question." The applied notes repeat the warning: BG/NBD should be fitted "separately by cohort"; in the MRP extension of [[Building Up to a Hierarchical Model - Coronavirus Testing]], without a zip-level predictor "the multilevel model will just partially pool most of the zip code adjustments to zero." The repair is to pool toward a *regression surface*, not a grand mean: JS shrinkage toward a fitted line (Efron eq. 1.39), covariates that rescale the mixing distribution in CLV models (note 019), group-level predictors in MRP. See [[Q - Exchangeability and What Replaces It When It Fails]].

**2. Too few groups to learn the between-group scale.** BDA3's boundary warning: with $J<5$ the posterior for $\tau$ can collapse to zero, and a flat prior can be improper. In the coronavirus case 13 specificity studies tolerate a weak hyperprior, but with only **3** sensitivity studies a $\text{normal}^+(0,1)$ hyperprior lets prevalence reach 16% when 1.5% tested positive; $\text{normal}^+(0,0.3)$ gives $(0.1\%, 2.1\%)$. Both directions fail: too-wide hyperpriors "dominate the data, leading to inflated uncertainty"; too-narrow ones mean "all values are pooled, and uncertainty is artificially deflated." The frequentist mirror is the JS penalty $R^{(JS)}/R^{(Bayes)} = 1+2/(NA)$: 20% at $N=10, A=1$, but (own calculation) a factor of 3 at $N=4$, $A=0.25$.

**3. Real outliers under a Gaussian population.** [[Stein's Paradox and Risk Dominance]] is explicit that the guarantee is for **total** squared error. In Efron's simulation the outlier $\mu_{10}=4$ has MSE 2.04 under JS versus 1.08 under the MLE; Clemente (.400 early, .346 true) is shrunk to .294. Remedies in the vault: the limited-translation estimator ($D=1$ costs about 10% of the JS gain), half-$t$ hyperpriors "when outlier groups are plausible," and heavy-tailed local scales — ridge "over-shrinks large signals." The opposite failure also exists: under weak likelihoods the horseshoe leaves large coefficients unregularized, hence the slab of width $c$ in [[Horseshoe and Regularized Horseshoe Priors]]; and the default global scale $C^+(0,1)$ "ignores $\sigma$ and $n$," unlike $\tau_0 = \frac{p_0}{D-p_0}\frac{\sigma}{\sqrt n}$.

**4. Funnel geometry.** A computational rather than statistical cost: [[Computational Troubleshooting]] notes hierarchical models "often exhibit funnel pathologies when group-level variance approaches zero." Fixes are the non-centered parameterization $\theta_j=\mu+\tau\eta_j$, marginalising the group effects, or (with "the honesty they require") zero-avoiding priors ([[Modeling Ideas to Address Computing Problems]]). Global-local priors need the same treatment.

**5. Scale heterogeneity and distribution shift in global models.** DeepAR's power-law item velocities defeat grouping, standardisation and uniform sampling; without per-series scaling and scale-weighted sampling the relative risk on `ec-sub` is 1.17 instead of 0.77 ([[Local vs Global Forecasting Models]], scale-heterogeneity warning). One likelihood family for all series is a second trap (Gaussian head on counts: 1.19–1.21). With few idiosyncratic series a well-specified local model wins (a correct AR(1)/AR(2) beats Chronos). Pretrained models fail silently outside their range: Chronos clips at $15\times$ the mean scale, under-predicts exponential trends and sees no covariates.

**6. A wrong population model, left uncorrected by weak data.** [[Bayesian Estimation and Priors for MMM]] shows the general risk: when "sample size is small and signal weak, the data is not strong enough to correct prior-induced bias" — so a pooled prior learned from unlike brands is inherited, not overruled. The CLV models add structural versions: Gamma-Gamma assumes spend is independent of frequency (correlation 0.11 on CDNOW; "must test"), and BG/NBD cannot let a never-repeating customer be dead, which is where it stops mimicking Pareto/NBD.

*Synthesis:* modes 3 and 6 combine into a decision-theoretic rule. Pooling optimises an average over units; if the decision concerns one named unit whose membership in the population is doubtful, individual risk is what matters and the dominance theorem offers no protection.

### Practical Implications

- **Geo- or brand-level MMM.** Pool channel effects when units are many (dozens) and exchangeable *given* covariates, and put those covariates (market size, category, baseline penetration) in the group-level mean. With 3–5 brands the hyperprior on $\tau$ is an informative modelling decision: run the hyperprior sweep (or power-scaling) from the coronavirus case and report how interval width, not the median, moves.
- **Many geo or user-level experiments, subgroup lifts.** Model the set of lift estimates hierarchically rather than applying Bonferroni; expect the biggest "winners" to shrink most. For a unit you have prior reason to think is different (a flagship market), model it separately or use a heavy-tailed population or limited translation.
- **CLV-based bidding.** Trust $\bar z$ only after roughly 7–8 transactions; a new customer gets the cohort mean, so the cohort definition *is* the targeting assumption. Fit by acquisition cohort and test spend–frequency independence.
- **Counterfactual forecasts for geo tests.** Backtest local (BSTS), global (DeepAR with DMA embedding) and zero-shot (Chronos) with rolling origins and prefer the one whose pre-period interval coverage is closest to nominal; check clipping around promotions.
- **ABM calibration across markets.** A hierarchical prior over market-specific ABM parameters is the same construction; with few markets the between-market scale needs an informative prior, as $\sigma_\delta$ did.

> [!tip] Checklist before pooling
> 1. Who are "the others," and what covariates make them exchangeable?
> 2. How many groups inform the between-group scale? Fewer than about 5: set an informative hyperprior and sweep it.
> 3. Is any unit a plausible outlier that matters individually? Use half-$t$ / horseshoe-type tails or cap the shrinkage.
> 4. Is the loss total or individual?
> 5. Do units differ by orders of magnitude in scale? Rescale per unit and weight the sampling.
> 6. Sampler: non-centered by default; check divergences.
> 7. Validate predictively by group (coverage, posterior predictive checks), not only in aggregate.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Hierarchical Models]], [[Hierarchical Linear Models]] | Exchangeability, precision-weighted mean, hyperpriors, boundary warning |
| [[Partial Pooling as Multiple Comparisons Correction]], [[Type S and Type M Errors]] | Z-score shrinkage; why shrinkage beats threshold corrections |
| [[Empirical Bayes - Overview]], [[Empirical Bayes Interpretation of Shrinkage]], [[Robbins Formula and Poisson Empirical Bayes]] | Learning the prior from the marginal; EB vs full Bayes vs ridge; "which others?" |
| [[James-Stein Estimator]], [[Stein's Paradox and Risk Dominance]] | Risk penalty $1+2/(NA)$, total vs individual risk, limited translation |
| [[Global-Local Shrinkage Priors]], [[Horseshoe and Regularized Horseshoe Priors]] | $\kappa_j$, $\tau_0$, slab regularisation |
| [[Gamma-Gamma Model of Monetary Value]], [[Pareto-NBD Model]], [[BG-NBD Model]], [[Bayesian and Hierarchical Extensions of CLV Models]] | Conjugate customer-level shrinkage, EB vs full Bayes, cohorts, structural limits |
| [[Local vs Global Forecasting Models]], [[DeepAR and Global Autoregressive Neural Forecasters]], [[Time-Series Foundation Models (Chronos)]] | Pooling analogy, scale heterogeneity, ablations, pretrained-model limits |
| [[In-Context Learning and Few-Shot Prompting]] | Interpretive reading of ICL as pooling over tasks; calibration caveat |
| [[Building Up to a Hierarchical Model - Coronavirus Testing]] | Few-groups failure, hyperprior sweep, MRP needs group-level predictors |
| [[Bayesian Estimation and Priors for MMM]], [[Hierarchical Inference in Gaussian Models]] | Prior dominance with weak data; evidence / type-II likelihood |
| [[Computational Troubleshooting]], [[Modeling Ideas to Address Computing Problems]] | Funnel pathology and its fixes |
| BDA3 | Ch. 5, pp. 101–138 |
| multiple2f | Gelman, Hill & Yajima (2009), Secs. 3.2, 4 |

## Related Concepts

- [[Multiple Comparisons - Bayesian Perspective]] — the testing-side use of the same pooling
- [[Regularized Horseshoe (Finnish Horseshoe)]] and [[Choosing the Global Scale and Effective Nonzeros]] — controlling the global scale and the slab
- [[Shifted-Beta-Geometric Model for Contractual Retention]] — the cohort-pooled contractual model
- [[Hierarchical Forecast Reconciliation (MinT)]] — sharing information *after* forecasting, through aggregation constraints rather than shared parameters
- [[Overfitting and Information Criteria]] — the bias–variance trade-off underneath all of this
- [[Q - Exchangeability and What Replaces It When It Fails]] — the assumption behind failure mode 1
- [[Q - In-Context Learning as Amortized Bayesian Inference]] — the LLM row of the table examined in detail
- [[Q - Using Experiment Results as Priors in a Bayesian MMM]] — pooling across evidence sources rather than units

## Gaps

- No dedicated vault note on **exchangeability** itself (partial/conditional exchangeability); it is covered only inside [[Hierarchical Models]].
- **Hierarchical geo- or brand-level MMM** (Sun et al. 2017; Wang et al. 2017) is mentioned in [[Bayesian Estimation and Priors for MMM]] but not ingested, so the MMM advice above is synthesis from the general hierarchical notes.
- No treatment of **robust or mixture population distributions** for group effects (Student-$t$ random effects, two-groups / local FDR models) beyond the half-$t$ hyperprior remark and the horseshoe.
- The formal locality/globality argument (Montero-Manso & Hyndman 2021) is not ingested; evidence comes from DeepAR and Chronos only. Nothing on negative transfer in multi-task learning.
- The LLM row rests on an interpretation the vault itself labels as such; no ingested paper formalises pretraining as learning a prior over tasks.

## Follow-Up Questions

- For a 40-geo MMM, how should group-level predictors be chosen so that geos are exchangeable given them, and how would you test it?
- What does a limited-translation or heavy-tailed random-effects prior look like for channel effects, and how much total-risk gain does it give up?
- Can simulation-based calibration detect a mis-set hyperprior on $\tau$ when $J$ is small?
