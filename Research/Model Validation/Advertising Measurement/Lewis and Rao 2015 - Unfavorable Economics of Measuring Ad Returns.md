---
title: "Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns"
tags:
  - source/ingested
  - topic/model-validation
  - topic/advertising-measurement
  - topic/statistical-power
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "QJE 130(4), 1941–1973; quote checked against working paper 'On the Near Impossibility of Measuring the Returns to Advertising' (2013), Abstract"
citation: "Lewis, R. A. & Rao, J. M. (2015). The unfavorable economics of measuring the returns to advertising. Quarterly Journal of Economics, 130(4), 1941–1973."
date_ingested: 2026-10-13
folder: "Model Validation/Advertising Measurement"
doc_type: paper
depends_on:
  - "[[Power Analysis and Sample Size]]"
  - "[[The Experimental Ideal]]"
  - "[[Activity Bias in Advertising]]"
used_by:
  - "[[Gordon et al 2019 - Advertising Measurement at Facebook]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Blake et al 2015 - Paid Search Effectiveness Field Experiment]]"
aliases:
  - "Lewis Rao 2015"
  - "On the Near Impossibility of Measuring the Returns to Advertising"
  - "Unfavorable economics of measuring the returns to advertising"
---

# Lewis and Rao 2015 - Unfavorable Economics of Measuring Ad Returns

> [!summary]
> Lewis & Rao analyse a collection of large randomized display-advertising experiments at Yahoo! and show that, because individual sales are extremely volatile relative to the small per-person effect any profitable campaign needs, even experiments with millions of users often cannot distinguish a wildly profitable campaign from a money-losing one. The same arithmetic implies that a tiny amount of unmodelled selection swamps observational estimates. For model validation the lesson is that ad-effect signals are faint: a model claiming precise, confident ad effects from modest data is more likely reporting noise or confounding than truth.

## Overview

**Citation:** Lewis, R. A. & Rao, J. M. (2015). *Quarterly Journal of Economics* 130(4), 1941–1973. Circulated earlier as "On the Near Impossibility of Measuring the Returns to Advertising" (2013).

**Research question:** How much statistical information do advertisers actually have about the return on their advertising? The paper uses 25 large field experiments run by US retailers and financial-services firms on Yahoo!, with randomized control groups, to quantify the precision attainable — and contrasts it with what observational methods can claim.

## Main Content

### The signal-to-noise problem

Consider a campaign that reaches $N$ people per arm at cost $c$ per person. To break even it must raise expected sales (in margin terms) per person by roughly $c$, a few cents to perhaps a dollar. But per-person sales over the campaign window are highly variable — most people buy nothing, a few buy a lot — so the standard deviation of individual sales $\sigma$ is large relative to both the mean and the required effect. The paper documents that the standard deviation of sales is typically many times the mean (on the order of ten times in their data).

> [!theorem] Precision of an experimental ROI estimate
> With $N$ subjects per arm, outcome standard deviation $\sigma$, and per-person ad cost $c$, the difference-in-means estimate of the per-person effect $\hat\Delta$ has standard error $\sigma\sqrt{2/N}$. Since $\text{ROI} = (\Delta - c)/c$ (with $\Delta$ in margin terms),
> $$ \operatorname{SE}(\widehat{\text{ROI}}) \approx \frac{\sigma}{c}\sqrt{\frac{2}{N}}. $$
> Because $\sigma/c$ is very large for typical campaigns, $N$ must be enormous — often far beyond the size of a single campaign — before the confidence interval excludes both $-100\%$ (no effect) and break-even. Equivalently, the share of sales variance explained by a profitable campaign (its implied $R^2$) is minuscule.
^thm-roi-precision

### Main results

- Across the 25 experiments, most had confidence intervals on ROI too wide to tell, at conventional levels, whether the campaign paid for itself.
- Distinguishing modest differences in ROI (e.g. a 10% vs 50% return) would require sample sizes far larger than most campaigns can deliver, even for very large advertisers.
- **Observational methods are hopeless by comparison.** Since the true ad effect explains a tiny fraction of the variation in sales, an unobserved confounder (such as differences in shopping intent or online activity between exposed and unexposed users — see [[Activity Bias in Advertising]]) needs to explain only an even tinier fraction to generate a bias as large as the effect itself. Covariate adjustment cannot be shown to remove bias of that size.
- The authors frame this as an economic limit: the information required to optimize advertising is costly to obtain, which helps explain persistent disagreement about ad effectiveness and the likelihood of sizeable misallocation.

## Key Passages

> "selection bias unaccounted for by observational methods only needs to explain a tiny fraction of sales variation to severely bias observational estimates" — Lewis & Rao (2015), WP Abstract

## Implications for Model Validation

- **Expect wide intervals.** Honest uncertainty on advertising effects is large; a model that reports narrow intervals or stable channel rankings from a few years of weekly data should be treated with suspicion (compare [[Chan and Perry 2017 - Challenges in Media Mix Modeling]], where a typical MMM has 156 data points).
- **Run a power calculation before trusting or commissioning a test.** The SE formula above, with the outcome's actual variance, tells you whether a validation experiment could detect the effect sizes the model claims. See [[Power Analysis and Sample Size]].
- **Small biases dominate faint signals.** When the true effect is a small slice of variance, model-selection flexibility and confounding are large relative to signal — the conditions under which [[Ioannidis 2005 - Why Most Published Research Findings Are False|most findings are false]] (Ioannidis's Corollary 2: smaller effects, lower probability of truth).
- **Aggregation does not escape the arithmetic.** Moving from individual to weekly aggregated data reduces the number of observations; it does not make the effect larger relative to noise.

## Connections

- Experimental evidence of observational bias: [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]], [[Gordon et al 2019 - Advertising Measurement at Facebook]], [[Activity Bias in Advertising]].
- Small samples and many candidate predictors: [[Riley et al 2020 - Sample Size for Prediction Models]], [[Simmons et al 2011 - False-Positive Psychology]].
- Testing whether a method can recover faint effects at realistic sample sizes: [[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]], [[Zhang and Vaver 2017 - Aggregate Marketing System Simulator]].

## See Also

- [[Power Analysis and Sample Size]] — the tools to plan an adequately powered test
- [[Type S and Type M Errors]] — with low power, significant estimates exaggerate magnitude and can have the wrong sign
- [[Activity Bias in Advertising]] — the selection mechanism from the same research group
- [[Observational vs Experimental Methods in Advertising]] — context for the observational/experimental contrast
- [[The Experimental Ideal]] — why randomization is the benchmark
