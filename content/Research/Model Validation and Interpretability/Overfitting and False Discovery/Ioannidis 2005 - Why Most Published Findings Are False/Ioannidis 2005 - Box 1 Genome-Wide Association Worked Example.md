---
title: "Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/example
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, Box 1 'An Example: Science at Low Pre-Study Odds', p. 0699"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]"
used_by:
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
aliases:
  - Ioannidis Box 1
  - Science at low pre-study odds
  - Schizophrenia GWAS PPV example
---

# Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example

> [!summary]
> Box 1 runs the three PPV formulas on a whole-genome association study: 100,000 polymorphisms, about 10 truly associated with schizophrenia (odds ratio about 1.3), 60% power at $\alpha=0.05$. Pre-study probability is $10^{-4}$. A just-significant hit raises it about 12-fold, to $12\times10^{-4}$. With bias $u=0.10$ (flexible inclusion, post hoc subgroups, changed definitions, selective reporting) it is $4.4\times10^{-4}$. With ten bias-free teams and one significant result the paper reports $1.5\times10^{-4}$, "hardly any higher" than the prior. Recomputing that last figure from Table 3 gives about $2.5\times10^{-4}$, which supports the same conclusion.

## Overview

Box 1 (p. 0699) shows that at very low $R$ a significant result changes very little. It is the template for any discovery screen: a feature-importance sweep over thousands of candidate drivers behaves the same way, as does a search over every audience-by-creative cell.

## Main Content

> [!example] Box 1 setup (p. 0699)
> - A team performs a whole-genome association study testing whether any of **100,000** gene polymorphisms is associated with susceptibility to schizophrenia.
> - Given what is known about heritability, probably around **ten** polymorphisms are truly associated, with similar odds ratios around **1.3** and similar power to detect any of them. This satisfies the "similar power" simplification of [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework|the framework]].
> - $R=10/100{,}000=10^{-4}$. Pre-study probability $R/(R+1)\approx10^{-4}$.
> - Power: **60%** to detect OR = 1.3 at $\alpha=0.05$.
^ex-box1-setup

> [!example] Step 1: a single unbiased study
> $$
> \text{PPV}=\frac{(1-\beta)R}{(1-\beta)R+\alpha}=\frac{0.6\times10^{-4}}{0.6\times10^{-4}+0.05}=\frac{0.00006}{0.05006}\approx1.20\times10^{-3}.
> $$
> Paper: for a p-value "barely crossing the 0.05 threshold", the post-study probability "increases about 12-fold compared with the pre-study probability, but it is still only $12\times10^{-4}$." The 12-fold factor is the likelihood ratio $(1-\beta)/\alpha=0.6/0.05$.
^ex-box1-step1

> [!example] Step 2: add bias $u=0.10$
> Bias enters through manipulated design, analysis and reporting that push more relationships across $p=0.05$ than a perfectly adhered-to protocol with complete reporting would. Box 1 lists: "serendipitous inclusion or exclusion of certain patients or controls, post hoc subgroup analyses, investigation of genetic contrasts that were not originally specified, changes in the disease or control definitions, and various combinations of selective or distorted reporting of the results." It adds that commercially available "data mining" packages "are proud of their ability to yield statistically significant results through data dredging."
> $$
> \text{PPV}_u=\frac{0.6\times10^{-4}+0.1\cdot0.4\times10^{-4}}{10^{-4}+0.05-0.4\times10^{-4}+0.1-0.005+0.1\cdot0.4\times10^{-4}}=\frac{0.64\times10^{-4}}{0.14506}\approx4.4\times10^{-4}.
> $$
> Matches the paper's $4.4\times10^{-4}$. Bias cuts the PPV by almost two-thirds. The ten true associations are swamped: about 5,000 nulls reach significance by chance ($\alpha$) and bias tips roughly 9,500 more ($u(1-\alpha)$ of 99,990) into significance.
^ex-box1-step2

> [!example] Step 3: ten independent bias-free teams
> Paper: when ten teams perform similar experiments and one finds a formally significant association, "the probability that the research finding is true is only $1.5\times10^{-4}$, hardly any higher than the probability we had before any of this extensive research was undertaken!"
> Recomputation with the Table 3 formula, $n=10$:
> $$
> \text{PPV}_{10}=\frac{R(1-0.4^{10})}{R+1-0.95^{10}-R\cdot0.4^{10}}=\frac{0.99990\times10^{-4}}{10^{-4}+1-0.59874}\approx\frac{10^{-4}}{0.40136}\approx2.5\times10^{-4}.
> $$
> **Discrepancy (flagged by this note, not by the paper):** the printed value $1.5\times10^{-4}$ does not follow from Table 3 with these inputs. Getting 1.5 would need a family-wise false-positive rate of about 0.67 rather than 0.40. That would mean more than ten looks, or a different definition of the event, and the paper does not state either. The candidates are tested in the table below. Either value leaves PPV within a factor of about 2.5 of the prior and about five to eight times lower than the single-study value, so the conclusion stands.
^ex-box1-step3

### Which assumptions reproduce the printed $1.5\times10^{-4}$?

Because the numerator $R(1-0.4^{10})\approx10^{-4}$ is essentially fixed, $\text{PPV}\approx10^{-4}/F$, where $F$ is the probability that at least one null study is significant. The printed value requires $F\approx0.667$. The table below tests the candidate readings (all computed with $R=10^{-4}$, power 0.6).

| Candidate reading of "ten teams, one significant" | $F$ (null side) | PPV | Reproduces 1.5? |
|---|---|---|---|
| Table 3 as printed: $n=10$, $\alpha=0.05$, no bias | $1-0.95^{10}=0.401$ | $2.49\times10^{-4}$ | no |
| More teams: $n=20$ | $0.642$ | $1.56\times10^{-4}$ | approximately |
| More teams: $n=21$ | $0.659$ | $1.52\times10^{-4}$ | **yes** (needs $n\approx21.4$) |
| Per-study $\alpha=0.10$ (e.g. two-sided 0.05 counted in both directions), $n=10$ | $1-0.9^{10}=0.651$ | $1.53\times10^{-4}$ | **yes** |
| Combine $u=0.10$ with $n=10$ (per-study rates $0.64$ true, $0.145$ null) | $1-0.855^{10}=0.791$ | $1.26\times10^{-4}$ | no, overshoots |
| "Exactly one of ten significant" (binomial) | $10\cdot0.05\cdot0.95^{9}=0.315$; true side $10\cdot0.6\cdot0.4^9=0.0016$ | $5\times10^{-7}$ | no |
| Confusing $\beta$ with power ($1-0.6^{10}$ in numerator) | $0.401$ | $2.48\times10^{-4}$ | no |
| Bonferroni within teams ($\alpha=0.005$ each) | $0.049$ | $2.0\times10^{-3}$ | no |

**Reading.** Two simple readings match the printed figure. One is an effective per-study false-positive rate of about 0.10, which is what happens if a "significant association" in either direction is counted at a nominal 0.05 per tail. The other is about 21 teams rather than ten. Neither is stated in Box 1. The text explicitly says "even in the absence of any bias", so applying $u=0.10$ is ruled out by the wording, and the numbers rule it out too. The most likely explanation is the $\alpha\approx0.10$ reading or a simple arithmetic slip. The source cannot settle which. All readings agree on the qualitative claim: ten teams leave the PPV within a factor of about 2.5 of the prior, compared with 12-fold for one team.
^ex-box1-discrepancy-analysis

### Summary of the cascade

| Scenario | PPV | Multiple of prior ($10^{-4}$) |
|---|---|---|
| Prior | $1.0\times10^{-4}$ | 1 |
| One unbiased study, just significant | $12\times10^{-4}$ | 12 |
| One study with $u=0.10$ | $4.4\times10^{-4}$ | 4.4 |
| Ten bias-free teams, one significant (paper) | $1.5\times10^{-4}$ | 1.5 |
| Same, recomputed from Table 3 | $2.5\times10^{-4}$ | 2.5 |

```python
a, p, R = 0.05, 0.6, 1e-4
b = 1 - p
single = p*R / (p*R + a)                                          # 1.199e-3
biased = (p*R + 0.1*b*R) / (R + a - b*R + 0.1 - 0.1*a + 0.1*b*R)  # 4.41e-4
teams  = R*(1 - b**10) / (R + 1 - (1 - a)**10 - R*b**10)         # 2.49e-4
```

## Examples

> [!example] Analytics analogue: screening 5,000 candidate drivers (generic)
> A demand model screens 5,000 candidate covariates (weather variables, search trends, competitor promotions, lags) for "significant" association with sales. Domain knowledge suggests about 5 matter, so $R\approx10^{-3}$. With 60% power, a just-significant driver has $\text{PPV}=0.6\cdot10^{-3}/(0.6\cdot10^{-3}+0.05)\approx1.2\%$. Report it only after replication on held-out periods ([[Cross Validation Checking]]) or after stability selection ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]), not on the p-value.
^ex-driver-screen

## Connections

- [[Multiple Testing Corrections]]: a genome-wide threshold (e.g., $5\times10^{-8}$) is the practical response. Lowering $\alpha$ raises the likelihood ratio $(1-\beta)/\alpha$.
- [[Garden of Forking Paths]]: the Step 2 manipulations are a catalogue of forking paths.
- [[Spike-and-Slab Prior for Covariate Selection]] and [[Global-Local Shrinkage Priors]]: Bayesian selection priors with a prior inclusion probability that plays the role of $R/(R+1)$.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Table 4 PPV by Study Design]]: the last two rows generalize Box 1.
