---
title: "Pearl 2014 - Marketing Application Transporting Geo and Lift Results"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/example
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Application of Secs. 3-5 (Eqs. 3.1, 3.4, Cor. 1, Thm 3); the marketing scenarios are this vault's interpretation, not the paper's"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - Motivating Examples and Transport Formulas]]"
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
used_by:
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - Transporting a geo test to a new market
  - Marketing transportability worked example
---

# Pearl 2014 - Marketing Application Transporting Geo and Lift Results

> [!summary]
> The paper's LA-to-NYC examples map onto a daily marketing-measurement problem: a randomized geo or conversion-lift test gives an experimental effect in the test markets, and the question is what the same media change would do in other markets or later periods where only observational data exist. The transport formulas say *which* reweighting is licensed, depending on whether the differing variable is pre-treatment (Eq. 3.1) or post-treatment (Eq. 3.4). **This note is an interpretation: the paper itself discusses only medical and demographic examples.**

## Overview

Mapping (our reading):

| Paper object | Marketing counterpart |
|---|---|
| $\Pi$ (study population) | markets / audiences in the geo or lift test |
| $\Pi^*$ (target population) | rollout markets, another country, next year's campaign |
| $X$ | media spend level (randomized in the test; chosen by planners otherwise) |
| $Y$ | incremental sales or conversions |
| $Z$ pre-treatment, $S\to Z$ | market size, baseline brand strength, customer mix, seasonality state |
| $Z$ post-treatment | branded search, site visits, add-to-cart rate (react to ads) |
| $S\to Y$ present | competitor activity, creative fatigue, a different attribution window: a *mechanism* difference that **breaks** S-admissibility |
| $S\to X$ only | different planner allocation rule: ignorable (Example 5, Corollary 2) |
| Latent $X\leftrightarrow Y$ arc | planner targeting on unobserved demand: removed in the test by randomization |

Related vault notes on the experiments themselves: [[Geo-Experiment Methodology - Overview]], [[Time-Based Regression Estimator for Geo Experiments]], [[Conversion Lift Studies on Ad Platforms]].

## Main Content

### Case A: market-mix shift, pre-treatment stratifier (Eq. 3.1)

Test markets are small-skewed, rollout markets are large-skewed; the effect of spend varies by tier; tier is pre-treatment and, by assumption, the only thing $S$ changes.

> [!example] Worked example
> **Setup.** Stratum-specific incremental ROAS (incremental revenue per dollar) measured in the test: small 1.8, medium 1.2, large 0.7. Test-market mix $P(z)=(0.50,\,0.30,\,0.20)$; rollout mix $P^*(z)=(0.10,\,0.30,\,0.60)$.
>
> **Naive carry-over (direct transport, Definition 7).** $0.5(1.8)+0.3(1.2)+0.2(0.7)=1.40$.
>
> **Transport formula (3.1).** $P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)P^*(z)$ gives $0.1(1.8)+0.3(1.2)+0.6(0.7)=0.96$.
>
> **Interpretation.** The headline 1.40 overstates the rollout return by about 46% because the test over-sampled markets where spend is most productive. The licensing assumption is S-admissibility of tier: nothing else about the rollout markets changes how spend turns into sales given tier (no $S\to Y$). Competitor intensity, creative, or channel mix differences each break that assumption unless they are also measured and added to $Z$.
^example-case-a

### Case B: post-treatment mediator (Eq. 3.4)

Test shows spend raises branded-search $Z$ (a mediator) and sales $Y$. In the rollout region the *response of branded search to spend* is weaker ($S\to Z$ with $X\to Z$), but given $Z$ the mechanism to sales is the same.

> [!example] Worked example
> $E[\text{incremental sales}\mid do(x),z]=1+2x+3z$ (shared across regions). Branded-search response: test region $P(Z{=}1\mid x)=0.20+0.40x$; rollout region $P^*(Z{=}1\mid x)=0.20+0.10x$.
> - Test effect of going from $x{=}0$ to $x{=}1$: $2+3(0.40)=3.2$.
> - Transported effect (3.4): $\sum_z E[\cdot\mid do(x),z]\,P^*(z\mid x)$ contrasted over $x$ gives $2+3(0.10)=2.3$.
> - Using (3.1) with a marginal $P^*(z)$ would give only the direct part, $2.0$, ignoring the mediated path.
>
> The $P^*(z\mid x)$ needed is *observed* in the rollout region at the spend levels it actually runs, provided $X$ and $Z$ are not confounded there (Example 8 uses exactly this unconfoundedness). If they are confounded, a second small experiment is required (footnote 14).
^example-case-b

```python
import numpy as np
roas  = np.array([1.8, 1.2, 0.7]); p_src = np.array([.50,.30,.20]); p_tgt = np.array([.10,.30,.60])
print(roas @ p_src, roas @ p_tgt)                 # 1.4 (naive), 0.96 (Eq. 3.1)
lift  = lambda x, z: 1.0 + 2.0*x + 3.0*z
pz_s  = lambda x: .20 + .40*x; pz_t = lambda x: .20 + .10*x
eff   = lambda pz: sum(lift(1,z)*(pz(1) if z else 1-pz(1)) - lift(0,z)*(pz(0) if z else 1-pz(0)) for z in (0,1))
print(eff(pz_s), eff(pz_t))                       # 3.2 (test region), 2.3 (Eq. 3.4)
```

(Checked output: `1.4 0.96` and `3.2 2.3`.)

### Case C: surrogate in time (the paper's "same place, different times")

The paper's surrogate-endpoint story has two studies at the same location at different times. In marketing the analogue is a test run in a prior year when branded search and share of voice had different levels than today. Treat time as the "population": add an $S$-node on the variables whose mechanisms moved (competitor spend, inflation, platform algorithm). The same diagnostic applies: if $S$ points into the intermediate $Z$ only, use (3.4); if it points into $Y$ (e.g. a new attribution window), the effect is **not** transportable from the old test.

### What to check before reporting a transported number

1. Is the stratifier pre-treatment? If a channel's own spend moves it, use the (3.4)-type formula.
2. Is there any $S\to Y$ left after conditioning on $Z$? Unmeasured competitor or creative changes imply no S-admissible set (Fig. 5(a), Fig. 6(f)); report the effect as not transportable rather than imputing.
3. Is positivity plausible, i.e. does the test contain markets of every tier present in the rollout? This is an estimator-level requirement from the potential-outcomes literature, see [[Degtiar 2023 - Identifying Assumptions]]; the nonparametric theory here silently needs $P(y\mid do(x),z)$ to exist for every $z$ with $P^*(z)>0$.
4. Use the formula's measurement list: only the factors named in it need to be estimated in the test; the rest come from target observational data.

## Examples

> [!example] Relation to Bayesian MMM
> A media-mix model fitted on national data and a geo test target the same causal object ($P(y\mid do(x))$), but they live in different populations/periods. A transport formula tells you *which MMM parameters can be calibrated by a given test*: only those whose mechanism is declared invariant (no $S$-node) between the test setting and the MMM's population. This reasoning is compatible with using geo-test results as informative priors in [[Bayesian Estimation and Priors for MMM]], but the paper itself does not discuss MMM.

## Connections

- Estimator versions of Case A (post-stratification, IPPW, doubly robust): [[Degtiar 2023 - Marketing Application Transporting Experiment Results]] and [[Degtiar 2023 - Weighting and Matching Methods]].
- Hierarchical alternative that pools across markets rather than transporting: [[Hierarchical Models]].
- Observational calibration of lift: [[Conversion Lift Studies on Ad Platforms]].
- Source theory: [[Pearl 2014 - Motivating Examples and Transport Formulas]], [[Pearl 2014 - S-Admissibility and the Graphical Criterion]].

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
