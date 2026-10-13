---
title: "Jin 2017 MMM - Conclusions, Limitations and Extensions"
tags:
  - source/ingested
  - topic/market-response
  - topic/model-validation
  - type/concept
  - doc/paper
source: "[[raw/Jin-2017-Bayesian-MMM-Carryover-Shape.pdf]]"
source_location: "Sec. 1, pp. 1-2; Sec. 2.2 end and 2.3, pp. 5-6; Sec. 4.1, p. 7; Sec. 9, pp. 27-28; Acknowledgment, p. 28"
date_ingested: 2026-10-13
folder: "Market Response Models/Bayesian Media Mix Modeling"
doc_type: paper
depends_on:
  - "[[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]"
  - "[[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]]"
  - "[[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]"
used_by:
  - "[[Bayesian Media Mix Modeling - Overview]]"
aliases:
  - Jin 2017 MMM limitations
  - Jin 2017 conclusion
  - Adstock-then-shape ordering
---

# Jin 2017 MMM - Conclusions, Limitations and Extensions

> [!summary]
> The paper concludes that the flexible Bayesian MMM can be estimated well **on large datasets**. At the usual **couple of years of weekly national data**, however, its estimates may be **biased and prior-driven**, so different priors give different attribution. The remedy is **more informative data and more informative priors**, for example from hierarchical pooling across brands in a category (Wang et al. 2017) or across geos (Sun et al. 2017). The paper is open about its limits. It does not tackle **causal identification** (it defers to Chan & Perry 2017 and Chen et al. 2017). It assumes **no synergy** between media. The **order of adstock and shape** is chosen by hand. The **Gaussian white-noise** errors leave autocorrelation in the residuals. The **simulator is simplified**, and a richer one is proposed for future testing.
^summary

## Overview

This note gathers the scope limits stated in Sections 1-4 and the conclusions and future work in Section 9. Together they mark where the paper's guarantees stop.

## Main Content

> [!definition] Stated scope limits
> 1. **Causal inference is out of scope (Sec. 1, pp. 1-2).** MMMs are regressions that "infer causation from correlation". Correlated explanatory variables and other factors (Chan & Perry 2017) can drive a wedge between the two. Randomised experiments across many media are expensive and hard to scale. Propensity-score methods (Rosenbaum & Rubin 1983) are hard to use with so little data. The paper says it does **not directly address** the reliability issues raised by Chan & Perry (2017) and Chen et al. (2017, paid-search bias correction). It focuses on the Bayesian model itself.
> 2. **Controls are taken as given (Sec. 2).** Which controls to include depends on the advertiser and industry, and the paper does not cover it. Controls enter **linearly**.
> 3. **No media synergy (Sec. 2.3).** Effects are additive, which "may not be true in reality" (Zhang & Vaver 2017).
> 4. **Independent channel changes (Sec. 4.1).** ROAS/mROAS assume one channel's spend can change without affecting another's. When channels drive each other's demand and spend, metrics should be computed **jointly** for the correlated group.
> 5. **Other curvature forms are untested (Sec. 2.2).** Sigmoid/logistic functions, integrals of other distributions (such as the normal CDF), and monotone regression splines are possible. Whether they share Hill's identifiability problem is left as future work.
> 6. **Model selection is not causal selection (Sec. 8).** BIC, DIC and WAIC pick the best regression model, not the most accurate causal one.
^scope-limits

> [!definition] Order of carryover and shape (Sec. 2.3, p. 5)
> There are two ways to compose the transforms:
> - **Adstock, then shape:** $\beta\,\text{Hill}(\text{adstock}(x))$. This is preferable when per-period spend is **small relative to cumulative spend** across periods, because saturation then acts on the accumulated stock.
> - **Shape, then adstock:** $\text{adstock}(\beta\,\text{Hill}(x))$. This may be preferable when spend is **concentrated in single periods** in an on-off (flighted) pattern, because saturation then acts within each burst.
>
> The paper uses the first, which suits its data. The choice is a modelling decision the data rarely settle. It is one more analyst choice that can change attribution (compare [[Researcher Degrees of Freedom]]).
^ordering

> [!theorem] Conclusions (Sec. 9, pp. 27-28)
> 1. The flexible-form model can be estimated by Bayesian MCMC. ROAS, mROAS and the optimal mix come from posterior draws.
> 2. **Large-scale simulations:** the model is estimated **well on large data** but **may be biased** at the typical sample size of a couple of years of weekly national data.
> 3. In that regime, priors have a **large impact** on posteriors. Different priors can give **quite different posteriors and attribution metrics**.
> 4. It is therefore "very important to gather more powerful data sets and use more informative priors" (p. 28).
> 5. **Shampoo data:** there is not enough information to estimate carryover and shape. BIC picks the most parsimonious forms. TV/magazines optimisation shows that predicted sales vary **less across mixes than across parameter uncertainty**.
^conclusions

> [!definition] Extensions proposed (Sec. 3 and Sec. 9)
> - **Category pooling (Wang et al. 2017):** pool similar brands in a category into a **hierarchical Bayesian** model with brand-level random effects for media and controls. This yields informative priors for a single brand's national model.
> - **Geo-level data (Sun et al. 2017):** fit a similar hierarchical model with shape and adstock on geo-level data instead of national data. In simulation, both approaches estimate the transformation parameters well thanks to the much larger data, and then supply priors for national-only fits.
> - **Richer mechanisms:** since residual autocorrelation remains (Fig. 17), move to **multi-stage regression** or **graphical models** of how media affect sales.
> - **Richer simulators:** the paper's simulator is simplified. Zhang & Vaver's (2017) simulator includes media synergy and should be used to test the model on more realistic data.
^extensions

> [!info] Acknowledgment (p. 28)
> The authors thank Tony Fagan and Penny Chu for encouragement and support; Wiesner Vos, Steve Scott, Bob Bell and Michael Perry for comments that improved the paper; and Jon Vaver, Stephanie Zhang, Zhe Chen, Aiyou Chen, Shi Zhong, Conor Sontag, Felipe Gonzalez and Xiaojing Huang for discussions. Several of these names are authors of the companion Google measurement papers the paper cites: Scott (BOOM library, used for the Gibbs sampler and Fig. 8), Perry (Chan & Perry 2017), and Vaver and Zhang (the Zhang & Vaver 2017 simulator).
^acknowledgment

## Examples

> [!example] Applying the conclusions to an MMM audit (generic)
> A reviewer of a weekly MMM with about 2-3 years of data could ask, based on this paper:
> 1. Were posteriors compared with priors for each carryover and shape parameter? A posterior equal to the prior means the data said nothing (Fig. 16).
> 2. Was attribution recomputed under at least two defensible priors on the effect scale? In Table 5, switching the $\beta$ prior moves the curve bias by about 11-21 percentage points.
> 3. Was the optimiser's recommendation reported with its posterior distribution (approach B), and is the recommended budget near historical spend?
> 4. Do the residuals show leftover autocorrelation?
> 5. Was the model checked on simulated data with known truth that resembles this dataset (signal strength, correlation, spend range)?
^applying-the-conclusions-to

## Connections

- The follow-on critique of MMM practice: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Chan Perry 2017 - Selection Bias in MMM (Ad Targeting, Seasonality, Funnels, Endogenous Controls)]], [[Chan Perry 2017 - Why Experiments and Matching Fall Short for MMM Questions]].
- Richer ground-truth simulator: [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].
- Hierarchical pooling as a source of informative priors: [[Hierarchical Models]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]].
- Experimental evidence on how far observational ad measurement can drift from the truth: [[Experimental Benchmarks for Observational Ad Measurement]], [[Activity Bias in Advertising]], [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- Model-risk framing (effective challenge, outcome analysis): [[SR 11-7 - Model Risk Management Guidance - Overview]].
- Explanation vs prediction: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]].

## See Also

- [[Bayesian Media Mix Modeling - Overview]] — source map
- [[Jin 2017 MMM - Sample Size vs Bias Study (Two vs Sixty Years)]]
- [[Jin 2017 MMM - Shampoo Case Study Data, Diagnostics and Posteriors]]
