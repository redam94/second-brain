---
title: "Ioannidis 2005 - Bias Parameter u and Reverse Bias"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §Bias, p. 0697 (definition of u, PPV with bias, Table 2, reverse bias); Figure 1, p. 0698"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
  - "[[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]"
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
  - "[[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]"
aliases:
  - Ioannidis bias parameter u
  - Ioannidis Table 2
  - Ioannidis Figure 1
  - Reverse bias (Ioannidis)
---

# Ioannidis 2005 - Bias Parameter u and Reverse Bias

> [!summary]
> Bias is modelled as a fraction $u$ of analyses that "would not have been research findings" but get reported as findings anyway because of design, data, analysis or presentation choices. Assuming $u$ is the same whether or not the relationship is true, Table 2 gives
> $$\text{PPV}_u=\frac{(1-\beta)R+u\beta R}{R+\alpha-\beta R+u-u\alpha+u\beta R}.$$
> PPV falls as $u$ grows whenever $1-\beta>\alpha$, and at $u=1$ it collapses to the pre-study probability $R/(R+1)$: a fully biased literature is uninformative. Figure 1 plots PPV against $R\in[0,1]$ for four bias levels at power 0.80, 0.50 and 0.20. Reverse bias, where true findings get lost, is modelled the same way but is argued to be less common.

## Overview

Table 1 ([[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]) assumes every test is conducted and reported exactly as planned. The *Bias* subsection (p. 0697) relaxes that. This is where [[Researcher Degrees of Freedom]], the [[Garden of Forking Paths]], selective reporting and conflicts of interest enter the arithmetic.

## Main Content

> [!definition] Bias and the parameter $u$ (p. 0697)
> **Bias** is "the combination of various design, data, analysis, and presentation factors that tend to produce research findings when they should not be produced."
> $u$ is "the proportion of probed analyses that would not have been 'research findings,' but nevertheless end up presented and reported as such, because of bias."
> - Bias is distinct from **chance variability**, which makes some findings false "even though the study design, data, analysis, and presentation are perfect."
> - Bias "can entail manipulation in the analysis or reporting of findings". Selective or distorted reporting is a typical form.
> - **Assumption:** $u$ does not depend on whether a true relationship exists. Ioannidis calls this "not an unreasonable assumption, since typically it is impossible to know which relationships are indeed true."
^def-bias-u

### Mechanics: where $u$ acts

$u$ moves a fraction of the **"No" row** of Table 1 into the "Yes" row, in both columns:
- Among true relationships, the $\beta$ share that would have been missed: a fraction $u$ of them now become findings. Bias rescues some true negatives-by-chance, so $u\beta R$ is added to true positives.
- Among null relationships, the $(1-\alpha)$ share that would correctly be non-significant: a fraction $u$ of them become findings, so $u(1-\alpha)$ is added to false positives.

### Table 2 (p. 0697): research findings and true relationships in the presence of bias

| Research finding | True relationship: Yes | True relationship: No | Total |
|---|---|---|---|
| Yes | $(c[1-\beta]R+uc\beta R)/(R+1)$ | $(c\alpha+uc(1-\alpha))/(R+1)$ | $c(R+\alpha-\beta R+u-u\alpha+u\beta R)/(R+1)$ |
| No | $(1-u)c\beta R/(R+1)$ | $(1-u)c(1-\alpha)/(R+1)$ | $c(1-u)(1-\alpha+\beta R)/(R+1)$ |
| Total | $cR/(R+1)$ | $c/(R+1)$ | $c$ |

*Transcription note:* the PDF prints the Yes/No cell as "$c\alpha+uc(1-\alpha)/(R+1)$" without outer parentheses. The row total and the PPV formula only add up with the whole numerator divided by $(R+1)$, as written above.

> [!theorem] PPV with bias and its monotonicity in $u$ (p. 0697)
> $$\text{PPV}_u=\frac{[1-\beta]R+u\beta R}{R+\alpha-\beta R+u-u\alpha+u\beta R}.$$
> PPV decreases with increasing $u$ "unless $1-\beta\le\alpha$, i.e., $1-\beta\le0.05$ for most situations."
>
> **Proof sketch (added here; the paper states the result without proof).** Write $\text{PPV}_u=(A+uB)/(C+uD)$ with $A=(1-\beta)R$, $B=\beta R$, $C=R+\alpha-\beta R$, $D=1-\alpha+\beta R$. A linear-fractional function of $u$ is monotone, with derivative sign equal to $\operatorname{sign}(BC-AD)$. Dividing by $R>0$:
> $$\tfrac{1}{R}(AD-BC)=(1-\beta)(1-\alpha+\beta R)-\beta(R+\alpha-\beta R)=1-\alpha-\beta .$$
> So $\text{PPV}_u$ is strictly decreasing in $u$ iff $1-\beta>\alpha$, constant iff $1-\beta=\alpha$, and increasing iff power is below $\alpha$. $\square$
^thm-ppv-bias

> [!theorem] Limit: total bias makes findings uninformative (derived)
> At $u=1$: $\text{PPV}_1=\dfrac{(1-\beta)R+\beta R}{R+\alpha-\beta R+1-\alpha+\beta R}=\dfrac{R}{R+1}$, the pre-study probability.
> When every probed analysis is reported as a finding, being a finding says nothing about truth. Intermediate $u$ moves PPV along a monotone path from the Table 1 value toward this floor.
^thm-bias-limit

### Figure 1 (p. 0698): PPV vs pre-study odds for bias levels $u$

*Caption:* "PPV (Probability That a Research Finding Is True) as a Function of the Pre-Study Odds for Various Levels of Bias, $u$". Panel A is power = 80%, panel B 50%, panel C 20%. The caption's own list reads "power of 0.20, 0.50, and 0.80". The x-axis is pre-study odds $R$ from 0 to 1, the y-axis is post-study probability PPV (%), and the legend shows $u$ = 0.05, 0.20, 0.50, 0.80. Curves rise concavely from 0 at $R=0$. Higher $u$ gives lower curves, and the spread between curves shrinks as power falls.

**Grid A: the legend's reading.** Values recomputed from $\text{PPV}_u$ for the legend's $u$ values ($\alpha=0.05$; PPV in %). These are *not* the plotted curves (see the resolution below):

| Power | $u$ | $R$=0.05 | 0.10 | 0.25 | 0.50 | 1.00 |
|---|---|---|---|---|---|---|
| 0.80 | 0.05 | 29 | 45 | 68 | 81 | 89 |
| 0.80 | 0.20 | 15 | 26 | 47 | 64 | 78 |
| 0.80 | 0.50 | 8 | 15 | 30 | 46 | 63 |
| 0.80 | 0.80 | 6 | 11 | 23 | 37 | 54 |
| 0.50 | 0.05 | 21 | 35 | 57 | 73 | 84 |
| 0.50 | 0.20 | 11 | 20 | 38 | 56 | 71 |
| 0.50 | 0.50 | 7 | 13 | 26 | 42 | 59 |
| 0.50 | 0.80 | 5 | 10 | 22 | 36 | 53 |
| 0.20 | 0.05 | 11 | 20 | 38 | 55 | 71 |
| 0.20 | 0.20 | 7 | 13 | 27 | 43 | 60 |
| 0.20 | 0.50 | 5 | 10 | 22 | 36 | 53 |
| 0.20 | 0.80 | 5 | 9 | 21 | 34 | 51 |

**Grid B: what is actually plotted.** Recomputed for $u$ = 0, 0.05, 0.20, 0.80 (PPV in %). These reproduce the published curves:

| Power | Plotted colour (legend label) | Actual $u$ | $R$=0.05 | 0.10 | 0.20 | 0.25 | 0.50 | 1.00 |
|---|---|---|---|---|---|---|---|---|
| 0.80 | blue ("u=0.05") | 0 | 44 | 62 | 76 | 80 | 89 | 94 |
| 0.80 | red ("u=0.20") | 0.05 | 29 | 45 | 62 | 68 | 81 | 89 |
| 0.80 | green ("u=0.50") | 0.20 | 15 | 26 | 41 | 47 | 64 | 78 |
| 0.80 | orange ("u=0.80") | 0.80 | 6 | 11 | 19 | 23 | 37 | 54 |
| 0.50 | blue | 0 | 33 | 50 | 67 | 71 | 83 | 91 |
| 0.50 | red | 0.05 | 21 | 35 | 52 | 57 | 73 | 84 |
| 0.50 | green | 0.20 | 11 | 20 | 33 | 38 | 56 | 71 |
| 0.50 | orange | 0.80 | 5 | 10 | 18 | 22 | 36 | 53 |
| 0.20 | blue | 0 | 17 | 29 | 44 | 50 | 67 | 80 |
| 0.20 | red | 0.05 | 11 | 20 | 33 | 38 | 55 | 71 |
| 0.20 | green | 0.20 | 7 | 13 | 23 | 27 | 43 | 60 |
| 0.20 | orange | 0.80 | 5 | 9 | 17 | 21 | 34 | 51 |

> [!warning] Resolution: the Figure 1 legend does not match the plotted curves (verified from the rendered PDF, p. 0698)
> I rendered p. 0698 at 300 dpi and read the curves off the axes. The endpoints at $R=1$ are about 94 / 89 / 78 / 54 in panel A (power 80%), 91 / 84 / 71.5 / 52.5 in panel B (50%) and 80 / 71 / 60 / 51 in panel C (20%). The values at $R=0.2$ in panel A are about 76 / 62 / 41 / 19. Every reading agrees with Grid B to within about 1 point. It disagrees with Grid A by 5-17 points for the top three curves. For example, panel A's blue curve ends at 94, but $u=0.05$ would give 89. Panel A's green curve ends at 78, but $u=0.50$ would give 63.
> **Conclusion:** the figure plots $u\in\{0,\,0.05,\,0.20,\,0.80\}$. The legend labels $u\in\{0.05,\,0.20,\,0.50,\,0.80\}$ are shifted by one position for the first three curves. No $u=0.50$ curve is drawn, and the top curve is the no-bias Table 1 PPV. Only the orange $u=0.80$ curve is labelled correctly. The paper does not mention this. The likely cause is a mislabelled legend in the published figure. The qualitative message (more bias means lower PPV, with the gap narrowing as power falls) holds under either reading. Use Grid B to quote numbers "from Figure 1", and Grid A to quote PPV at the legend's $u$ values.
^fig1-legend-mismatch

### Reverse bias (p. 0697)

True findings can also be annulled by **reverse bias**:
- large measurement error, so relationships are "lost in noise" [12];
- investigators using data inefficiently or failing to notice significant relationships;
- conflicts of interest that "bury" significant findings [13].

Ioannidis notes there is "no good large-scale empirical evidence" on how often reverse bias occurs, but judges it probably less common. He also expects measurement error and inefficient data use to be "becoming less frequent problems" as technology and analytic sophistication improve. Reverse bias can be modelled in the same way as bias (a fraction of would-be findings moved into the "No" row). Like bias, it should not be confused with chance misses.

## Examples

> [!example] How much bias does it take? (power 0.80, $R=1/4$)
> No bias: $\text{PPV}=0.2/(0.2+0.05)=0.80$.
> $u=0.10$: numerator $(1-\beta)R+u\beta R=0.2+0.1\cdot0.05=0.205$. Denominator $=(R+\alpha-\beta R)+u(1-\alpha+\beta R)=(0.25+0.05-0.05)+0.1\,(0.95+0.05)=0.35$. $\text{PPV}=0.205/0.35=0.59$.
> $u=0.30$: $(0.2+0.015)/(0.25+0.30)=0.39$.
> **Interpretation:** a modest share of nudged analyses (one in ten nulls tipped over by flexible choices) takes a well-powered study in a promising field from 80% to under 60% credibility.
^ex-bias-effect

> [!example] Marketing-analytics forms of $u$ (generic)
> Picking the adstock decay or saturation form *after* seeing which one gives a significant channel coefficient. Dropping "outlier" weeks from 52-156 rows of weekly media data until a lift test reads positive. Reporting only the KPI (revenue vs. orders vs. new customers) on which a campaign "worked". Each of these turns a would-be null into a "finding" whatever the truth, which is exactly the $u$ mechanism. [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] quantifies how fast such choices inflate the false-positive rate.
^ex-marketing-u-forms

## Connections

- [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]]: the behavioural sources of $u$.
- [[Forking Paths and Bayesian Approaches]]: modelling all paths jointly instead of picking one.
- [[Pre-registration and Open Science - Overview]]: the main institutional lever for lowering $u$.
- [[Limits and Objections to Pre-registration]]: why $u$ cannot be driven to zero in exploratory work.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]: once significance is the target, adversarial and regressional Goodhart effects push $u$ up.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]: Corollaries 4 and 5 are statements about $u$.
- [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]: at $R=0$, observed effects measure the bias.
