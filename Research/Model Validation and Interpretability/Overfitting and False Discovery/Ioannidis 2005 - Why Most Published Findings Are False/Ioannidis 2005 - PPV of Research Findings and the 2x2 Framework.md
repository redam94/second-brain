---
title: "Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, p. 0696 (introduction; §Modeling the Framework for False Positive Findings) and p. 0697 (Table 1; threshold (1-β)R > α)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Power Analysis and Sample Size]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]"
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
  - "[[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]"
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
aliases:
  - Positive predictive value of a research finding
  - Pre-study odds R
  - Ioannidis Table 1
  - False positive report probability (complement)
---

# Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework

> [!summary]
> Ioannidis treats a significance test as a diagnostic test applied to the pool of relationships probed in a field. With pre-study odds $R$ (true : null among tested relationships), power $1-\beta$ and Type I rate $\alpha$, the expected $2\times2$ table (Table 1) gives the post-study probability that a significant finding is true:
> $$\text{PPV}=\frac{(1-\beta)R}{R-\beta R+\alpha}.$$
> In odds form, post-study odds = $R\cdot(1-\beta)/\alpha$. A finding is more likely true than false iff $(1-\beta)R>\alpha$, which is $(1-\beta)R>0.05$ at the conventional threshold. With 80% power you need $R>1/16$, i.e. at least one true relationship per 16 nulls probed.

## Overview

**Motivation (p. 0696).** Published findings are often refuted later, in clinical trials, in traditional epidemiology and in molecular research. Several methodologists (refs 9-11) attributed the high non-replication rate to the "convenient, yet ill-founded strategy" of claiming conclusive findings from a single study judged by formal significance, typically $p<0.05$. Ioannidis argues that research "is not most appropriately represented and summarized by p-values", yet medical articles are widely read on p-values alone. Prior work (Wacholder et al. 2004 [10]; Risch 2000 [11]) had shown that the probability that a finding is true depends on the prior probability, power and significance level. This section puts that observation into a field-level accounting table.

## Main Content

### Definitions

> [!definition] Research finding (p. 0696)
> A **research finding** is "any relationship reaching formal statistical significance, e.g., effective interventions, informative predictors, risk factors, or associations." The essay deliberately targets *claimed* relationships, not null findings. Ioannidis notes that "negative" research is also useful and that "negative" is a misnomer.
^def-research-finding

> [!definition] Pre-study odds $R$ and the field model (pp. 0696-0697)
> - $R$ is the ratio of the number of "true relationships" to "no relationships" among those tested in a field. It "is characteristic of the field". It is large when a field targets highly likely relationships and tiny when a field searches for one or a few true relationships among thousands or millions of candidates.
> - Simplifying assumption: circumscribed fields where either there is only one true relationship among many hypothesized, or the power is similar for each of the several true relationships.
> - **Pre-study probability** of a relationship being true: $\pi_0=R/(R+1)$.
> - **Power** $1-\beta$: the probability of finding a true relationship ($\beta$ = Type II error rate).
> - **Type I error rate** $\alpha$: the probability of claiming a relationship when none exists.
> - $c$: the number of relationships probed in the field.
> - **Positive predictive value (PPV)**: the post-study probability that a claimed (significant) finding is true. It is the complement of what Wacholder et al. [10] call the **false positive report probability** (FPRP): $\text{FPRP}=1-\text{PPV}$.
^def-ppv-setup

### Table 1 (p. 0697): research findings and true relationships

Expected counts when $c$ relationships are probed:

| Research finding | True relationship: Yes | True relationship: No | Total |
|---|---|---|---|
| Yes | $c(1-\beta)R/(R+1)$ | $c\alpha/(R+1)$ | $c(R+\alpha-\beta R)/(R+1)$ |
| No | $c\beta R/(R+1)$ | $c(1-\alpha)/(R+1)$ | $c(1-\alpha+\beta R)/(R+1)$ |
| Total | $cR/(R+1)$ | $c/(R+1)$ | $c$ |

> [!theorem] PPV of a single study without bias (p. 0697)
> $$\text{PPV}=\frac{(1-\beta)R}{R-\beta R+\alpha}=\frac{(1-\beta)R}{(1-\beta)R+\alpha}.$$
> A research finding is more likely true than false ($\text{PPV}>1/2$) if and only if
> $$(1-\beta)R>\alpha ,$$
> which with the near-universal $\alpha=0.05$ reads $(1-\beta)R>0.05$.
>
> **Proof.** PPV is the Yes-row ratio of Table 1: true positives $c(1-\beta)R/(R+1)$ over all positives $c(R+\alpha-\beta R)/(R+1)$. The factors $c$ and $(R+1)$ cancel. $\text{PPV}>1/2$ iff true positives exceed false positives, i.e. $(1-\beta)R>\alpha$. $\square$
^thm-ppv-no-bias

### Odds form and the likelihood ratio

The formula is Bayes' rule. Divide the true-positive count by the false-positive count:
$$
\underbrace{\frac{\text{PPV}}{1-\text{PPV}}}_{\text{post-study odds}}=\underbrace{R}_{\text{pre-study odds}}\times\underbrace{\frac{1-\beta}{\alpha}}_{\text{likelihood ratio of "significant"}} .
$$
- A significant result is evidence with likelihood ratio $(1-\beta)/\alpha$. At 80% power and $\alpha=0.05$ that ratio is 16. At 60% power it is 12, which is the "12-fold" increase in Box 1 ([[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]). At 20% power it is 4.
- **No significance test can turn low $R$ into high PPV.** With $R=10^{-3}$ and LR = 16, post-study odds are 0.016.
- This uses only the event $p<\alpha$, not the observed p-value. Box 1 accordingly speaks of a p-value "barely crossing the 0.05 threshold". A much smaller p-value carries more evidence, which is the point behind Lindley's paradox [32] and Senn's "two cheers" [34], both cited later in the essay.

> [!example] Threshold values of $R$
> Minimum pre-study odds for $\text{PPV}>0.5$ at $\alpha=0.05$:
>
> | Power $1-\beta$ | $R_{\min}=\alpha/(1-\beta)$ | Equivalent "1 true per k nulls" |
> |---|---|---|
> | 0.95 | 0.053 | 1 : 19 |
> | 0.80 | 0.0625 | 1 : 16 |
> | 0.50 | 0.10 | 1 : 10 |
> | 0.20 | 0.25 | 1 : 4 |
> | 0.05 | 1.0 | 1 : 1 |
>
> If power equals $\alpha$, a significant result is uninformative: PPV equals the pre-study probability.
^ex-threshold-r

## Examples

> [!example] A creative-testing program (generic marketing illustration)
> A team screens 200 ad-creative variants per quarter against control, each test at $\alpha=0.05$ with about 50% power for the lift size that matters. Past programmes suggest about 1 variant in 20 genuinely beats control, so $R=1/19$. Expected outcome: $200\cdot\tfrac{1}{20}\cdot0.5=5$ true winners and $200\cdot\tfrac{19}{20}\cdot0.05=9.5$ false winners, so $\text{PPV}=5/14.5\approx0.34$. About two out of three "winners" rolled out are noise, before any bias or peeking ([[The Peeking Problem and Optional Stopping]]).
^ex-creative-testing

```python
def ppv(power, R, alpha=0.05):
    """Ioannidis (2005) Table 1: P(true | significant)."""
    return power * R / (power * R + alpha)

ppv(0.5, 1/19)   # 0.345
ppv(0.8, 1.0)    # 0.941 -- the bias-free value behind Table 4 row 1
```

## Connections

- [[Multiple Testing Corrections]]: Benjamini-Hochberg controls the expected value of $1-\text{PPV}$ (the FDR) within a declared family by tightening the per-test $\alpha$. Here $\alpha$ is fixed and $R$ varies across fields.
- [[Constructing Priors for Effect Sizes]] and [[Prior Predictive Checking]]: ways to make $R$ (and its continuous analogue, an effect-size prior) explicit.
- [[Power Analysis and Sample Size]]: $1-\beta$ is the second lever in the formula.
- [[Statistical and Scientific Inference]]: the gap between a statistical decision and a scientific claim.
- [[Sharp vs Weak Null Hypotheses]]: the $2\times2$ model assumes each relationship is either exactly null or "true". The critiques note revisits this ([[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]).

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]: source map.
- [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]: Table 2 extends this table with bias.
- [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]: Table 3 extends it with $n$ studies.
- [[Type S and Type M Errors]]: what goes wrong in magnitude even when the sign is right.
