---
title: Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§II.A pp. 1946-1947, Figure I, fn. 7; §III.D pp. 1965-1966, fns. 21-23"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]"
  - "[[Shape (Saturation) Effects]]"
used_by:
  - "[[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]"
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
aliases:
  - Lewis-Rao campaign ROI model
  - Optimal per-person ad spend c-star
  - Break-even ad spend c_h
---

# Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI

> [!summary]
> Lewis & Rao model a campaign by its cost per user $c$ and a concave sales response $\beta(c)$. Two spend levels matter: $c^*$, where marginal gross profit equals marginal cost (optimal spend), and $c_h$, where average ROI hits zero. Between them the firm overadvertises yet still sees positive average ROI, so an average-ROI experiment cannot tell it to cut back. Locating $c^*$ needs *marginal* ROI, whose variance scales with $1/(c_2-c_1)^2$, which makes it far harder to estimate than the already-imprecise average ROI.
^lr-model-summary

## Overview

The paper's statistical argument rests on a deliberately minimal economic model (§II.A). It side-steps broader optimization issues, takes the target population as given, and asks only: *given a certain expenditure and delivery of ads, what is the rate of ROI?* Section III.D returns to the same model to show why the harder question, how much to spend, is practically unanswerable.

## Main Content

> [!definition] Definition: Campaign (§II.A, p. 1946)
> A **campaign** is a set of advertisements delivered to a set of consumers through a single channel over a specified period of time using one "creative" (all messaging content such as pictures, text and audio).
^def-lr-campaign

> [!definition] Definition: Campaign economics (§II.A, p. 1946)
> - $c$: cost per user, the only choice variable ("how much I advertise to each consumer"); for a given channel it determines the number of impressions each user sees.
> - $\beta(c)$: per-person sales effect, a **continuous concave** function of $c$. Consumer heterogeneity can be added as a mean-zero multiplicative parameter on $\beta$ and integrated out, leaving a representative consumer.
> - $m$: gross margin. Gross profit per person is $\beta(c)\,m$; net profit is $\beta(c)\,m-c$.
> - Return on investment:
> $$\text{ROI}(c)=\frac{\beta(c)\,m-c}{c}.$$
^def-lr-roi

Footnote 7 justifies concavity with evidence from Lewis (2010) and Sahni (2013) and notes it could be weakened to "concave in the region of current spending", i.e. returns are neither infinite nor locally convex. See [[Shape (Saturation) Effects]] for the MMM analogue.

> [!definition] Definition: Optimal and break-even spend (§II.A and §III.D, Figure I)
> - $c^*$ solves $\beta'(c^*)\,m=1$: the gross-profit curve's tangent is parallel to the 45-degree cost line. $c^*$ is optimal per-person spend and defines the **ROI target** $\dfrac{\beta(c^*)\,m-c^*}{c^*}$.
> - $c_h$ solves $\beta(c_h)\,m=c_h$: the gross-profit curve crosses the cost line, so ROI is exactly 0%.
^def-lr-cstar-ch

**Figure I (p. 1947), "The Advertiser's Problem".** Horizontal axis: cost per user $c$. Vertical axis: gross profit $\beta(c)\cdot m$. A concave blue curve starts at the origin; a red 45-degree line is cost; a black tangent touches the curve at $c^*$; the curve crosses the cost line at $c_h$. Three regions are labeled:

| Region | Label in figure | Average ROI | Marginal return | Action |
|---|---|---|---|---|
| $c<c^*$ | "c<c*" | positive (too high) | marginal profit > marginal cost | underadvertising: spend more |
| $c^*<c<c_h$ | "ROI>0%, c>c*" | positive | negative | overadvertising: spend less, although ROI looks fine |
| $c>c_h$ | "ROI<0%, c>c*" | negative | negative | clearly cut |

In the middle region the decision may interact with the decision-maker's "average marginal bias" (confusing average and marginal rates; de Bartolome 1995).

**Why the campaign is the unit.** In reality several creatives run and ad quantity per person is stochastic (it depends on user activity), but the campaign is "an important operational unit in marketing"; the authors note a Google Scholar search for the exact phrase "advertising campaign" returned 48,691 documents (p. 1947).

### Marginal ROI (§III.D)

The natural design to trace $\beta(c)$ is a multi-cell experiment with exogenously varied cost per person (fn. 21 points to Johnson, Lewis & Reiley 2015). Each cell gives one point in $(c,\beta(c))$ space.

> [!theorem] Marginal profit and the variance of marginal ROI (§III.D, p. 1966, fn. 22)
> For two spend levels $0<c_1<c_2$, the marginal profit of moving from $c_1$ to $c_2$ is
> $$\big(\beta(c_2)m-c_2\big)-\big(\beta(c_1)m-c_1\big)=m\big(\beta(c_2)-\beta(c_1)\big)-(c_2-c_1).$$
> With $\Delta c=c_2-c_1$ acting as the effective cost per exposed user,
> $$\operatorname{Var}\big(\text{ROI}(\Delta c)\big)=\left(\frac{m}{\Delta c}\right)^{2}\operatorname{Var}\big(\hat\beta(c_2)-\hat\beta(c_1)\big).$$
^thm-lr-marginal-roi-variance

Two things make this hard:
1. $\Delta c$ is much smaller than a stand-alone campaign's cost, so the test behaves like the very-low-dose experiments on the left of Figure II, which already had the worst ROI standard errors (see [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]).
2. By concavity, the expected profit differential itself shrinks as $c$ rises: the signal falls as the noise rises.

Ideally one would find the $c$ at which the marginal profit estimate equals the cost of capital, "but achieving such precise estimates is essentially impossible" (p. 1966).

**Creative testing** (fn. 23): the same logic applies to comparing two creatives; they can be distinguished only when their performance differs by a relatively wide margin.

## Examples

> [!example] Example: Why a positive ROI does not mean "keep spending"
> Take $\beta(c)=a\sqrt c$ with $m=0.5$. Then $c^*$ solves $0.5\cdot a/(2\sqrt{c^*})=1$, so $c^*=a^2/16$, and $c_h$ solves $0.5a\sqrt{c_h}=c_h$, so $c_h=a^2/4=4c^*$. Average ROI at $c$ is $0.5a/\sqrt c-1$: $+100\%$ at $c^*$, $0\%$ at $4c^*$. A campaign at $2c^*$ has ROI $\approx+41\%$ while its marginal return is negative. A well-powered average-ROI experiment would correctly report "profitable" and the firm would still be overspending by a factor of two. (Illustrative functional form, not from the paper.)
^ex-lr-sqrt-response

## Connections
- [[Shape (Saturation) Effects]] and [[Carryover (Adstock) Functional Forms]] — MMM parameterizations of $\beta(c)$; the paper's point is that the curvature that defines $c^*$ is the least identifiable feature.
- [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]] — the 5-percentage-point hypothesis pair is the closest analogue to a marginal-ROI test.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — response-curve extrapolation in aggregate data.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]
