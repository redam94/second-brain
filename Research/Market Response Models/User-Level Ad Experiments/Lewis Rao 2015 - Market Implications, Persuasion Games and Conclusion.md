---
title: Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/concept
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§I p. 1945 (four implications); §V pp. 1969-1971, fns. 27-28; Online Appendix Table II (described only)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
  - "[[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]"
used_by:
  - "[[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]"
aliases:
  - Weak selective pressure on advertising spend
  - Media buyer persuasion game (Lewis-Rao)
  - Quantitative veneer of advertising metrics
---

# Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion

> [!summary]
> Because reliable feedback on ad returns is scarce, the authors draw four market-level implications: (1) weak "selective pressure" lets similar firms differ in ad spend by up to an order of magnitude; (2) noisy ROI estimates create moral hazard in reporting inside the firm (a Shin 1994 persuasion game in which media buyers pass on good news and filter bad, and managers rationally discount); (3) informative RCTs need tens of millions of users per cell, which only the largest publishers can supply, creating a new economy of scale; (4) the market as a whole may hold incorrect beliefs about advertising's causal impact, a problem masked by a "quantitative veneer" that consulting or supplements lack.
^lr-implications-summary

## Overview

Section V turns from measurement to economics. It also makes explicit two assumptions maintained up to that point: (i) the firm *cares* about measuring ROI and (ii) measurements are *reported faithfully*.

### Preview of the implications in §I (p. 1945)
The introduction lists the same implications before the formal analysis. The quotations below are checked against the raw text.

> [!example] The four implications as previewed in §I (p. 1945)
> 1. **Selective pressure.** "scarce information means there is little 'selective pressure' on advertising levels across firms." Supplemental data on several major industries show otherwise similar firms "often have vastly differing levels of advertising expenditure" even though they have access to the same technology.
> 2. **Scale advantage for publishers.** If experimentation becomes more common, as digital ad delivery suggests it will, "massive publishers will be conferred an additional strategic advantage of scale", because only they can supply RCTs large enough to give reliable feedback.
> 3. **Strategic misreporting.** Imprecise signals on returns "introduce issues of strategic misreporting within the firm".
> 4. **A false sense of precision.** Firms make other investments with hard-to-measure returns, such as management consulting (Bloom et al. 2013) or mergers. The difference is that "the metrics and methods used in the advertising industry produce a veneer of quantitative certitude not typically found in these other circumstances." So using RCTs to reveal the true uncertainty, and to expose the biases of non-experimental techniques, has "very different implications for the advertising market" (pp. 1945-1946).
^ex-lr-implications-preview

The §I caveats just before this list set the scope. The results are unlikely to hold for firms or products with low baseline sales volatility, such as those that get nearly all customers from advertising or have little baseline awareness. Higher per-person spend helps power, but diminishing returns mean an unfavorable result is more likely exactly when the return becomes measurable. High-cost media such as mailed catalogs face the same problem (p. 1945; detail in [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]).

For a modeled-data version of the same "veneer" problem, see [[Garden of Forking Paths]]: flexible choices produce precise-looking numbers whose real uncertainty is much larger.

## Main Content

### 1. Weak competitive pressure on ad spending
Online Appendix Table II (not in the raw file) shows that otherwise similar firms (size, margins, product mix) in the same market often differ in advertising expenditure by up to an order of magnitude. The authors stress this is "by no means a rigorous analysis" but is consistent with very different beliefs about ad efficacy persisting.

### 2. Strategic misreporting inside the firm

> [!theorem] Persuasion-game argument (§V p. 1970, applying Shin 1994; fn. 27)
> **Setup.** A media buyer is paid a bonus based on the manager's posterior belief about campaign ROI. The manager does not know which campaigns have verifiable ROI estimates.
> **Equilibrium.** The buyer reports good news when available and filters bad news, which is easy because experimental estimates are noisy and the truth is hard to uncover even in the long run. Anticipating this, the manager is skeptical, and that skepticism limits the flow of information about ad effectiveness within the firm.
> **Variant (fn. 27).** Estimates are always reported, but the manager is unsure which evaluation specification was used; this methodological "wiggle room" creates a similar dynamic.
> **Lesson.** Inference difficulty does not only make measurement hard; it exacerbates agency problems.
^thm-lr-persuasion-game

The fn. 27 variant is the organizational form of [[Researcher Degrees of Freedom]] and the [[Garden of Forking Paths]]: when windows, filters, covariates and outcome definitions are free choices and the signal is tiny, a reporter can almost always find a favourable specification ([[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]). When the reported lift becomes the buyer's target, it is also a textbook setting for Goodhart effects ([[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).

### 3. Economies of scale for publishers
The multipliers imply advertisers could narrow intervals to acceptable tolerances with well-designed experiments of **tens of millions of users per treatment cell**. Large advertisers committed to experimentation could afford this, but only the largest publishers can supply the scale. Rising demand for experimentation "has the potential to create a new economy of scale" and shape the organization of ad-supported industries (§V; previewed in §I).

### 4. The market may have incorrect beliefs
The paper gives a micro-founded reason why it is unclear whether advertising's total impact justifies aggregate expenditure; prices and media allocations may differ substantially from full-information levels. Wider experimentation and cheaper technology are therefore potentially disruptive.

> [!example] Example: Other markets with poorly measured returns (pp. 1970-1971, fn. 28)
> - **Management consulting**: Bloom et al. (2013) argue expenditures rarely involve a well-formed counterfactual.
> - **Vitamins and supplements** (a \$20 billion industry): a 12-year, 40,000-person RCT (cited by the paper as the Physicians Health Study II, Lee et al. 2005, following 39,876 healthy women) could not rule out any ex ante reasonable effect; the 95% CI for vitamin E on heart attacks ran from a 23% risk reduction to an 18% risk increase.
> The difference is that advertising "has a quantitative veneer that belies the true underlying uncertainty" (p. 1971).
^ex-lr-other-markets

### Conclusion (p. 1971)
Using one of the largest collections of ad RCTs to date, inferring advertising effects is "exceedingly difficult". The findings do not apply to every firm or delivery channel but, the authors argue, do apply to the majority of advertising dollars. Improved experimentation technology will likely improve the economics but, if realized, will shape the industry's organization in ways tied to the measurement challenges documented.

## Examples

> [!example] Example: How much room does noise give a media buyer to filter? (illustrative)
> Take the median retail ROI standard error from Table II, 26%. A campaign whose true ROI is exactly 0% still produces an estimate above +26% with probability about 16% (one standard error, normal approximation). A buyer who runs six such break-even campaigns therefore has at least one "+26% or better" result to report with probability $1-0.84^6\approx65\%$. If the manager cannot tell which campaigns had verifiable estimates, or which specification was used (fn. 27), reporting only that one is cheap, and the manager's rational response is the skepticism the paper describes. (My numbers; the paper gives the argument qualitatively, applying Shin 1994.)
^ex-lr-filtering-noise

## Connections
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — low power plus flexible analysis and selective reporting lowers the probability that a claimed lift is real.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — a practitioner account of the same uncertainty in modeled (non-experimental) ad measurement.
- [[Multiple Testing Corrections]] — the statistical antidote when many campaigns, creatives and specifications are compared.
- [[Customer Lifetime Value - Overview]] — long-run value that short-window experiments cannot see.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]
