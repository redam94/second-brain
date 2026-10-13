---
title: "Ioannidis 2005 - Table 4 PPV by Study Design"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - type/example
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §Most Research Findings Are False for Most Research Designs and for Most Fields, pp. 0699-0700; Table 4, p. 0700"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
used_by:
  - "[[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]"
  - "[[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]"
aliases:
  - Ioannidis Table 4
  - Most research findings are false for most research designs
  - PPV by research design
---

# Ioannidis 2005 - Table 4 PPV by Study Design

> [!summary]
> Table 4 plugs representative values of power, pre-study odds and bias into the bias formula ($\alpha=0.05$, single study) for nine design archetypes. Only the two confirmatory scenarios, an adequately powered low-bias RCT and a confirmatory meta-analysis of good RCTs, exceed PPV = 0.5 (both 0.85). A meta-analysis of small inconclusive studies scores 0.41, early-phase trials 0.17-0.23, exploratory epidemiology 0.12-0.20 and massive-testing discovery research 0.001-0.0015. "In the described framework, a PPV exceeding 50% is quite difficult to get." Every row reproduces exactly from the formula. A bias-free column added here shows that bias accounts for most of the gap in the middle rows.

## Overview

This section (pp. 0699-0700) supports the title claim. The paper calls Table 4 "the results of simulations using the formulas developed". In fact the numbers are deterministic evaluations of $\text{PPV}_u$ ([[Ioannidis 2005 - Bias Parameter u and Reverse Bias#^thm-ppv-bias|bias theorem]]) at chosen parameter values. The parameter values are the author's judgment of what is "characteristic of specific study designs and settings", and the conclusions rest on them.

## Main Content

### Table 4 (p. 0700): PPV for combinations of power, $R$ and bias

Footnote: "The estimated PPVs (positive predictive values) are derived assuming $\alpha=0.05$ for a single study."

| $1-\beta$ | $R$ | $u$ | Practical example (paper) | PPV (paper) | PPV recomputed | PPV if $u=0$ (added) |
|---|---|---|---|---|---|---|
| 0.80 | 1:1 | 0.10 | Adequately powered RCT with little bias and 1:1 pre-study odds | 0.85 | 0.850 | 0.941 |
| 0.95 | 2:1 | 0.30 | Confirmatory meta-analysis of good-quality RCTs | 0.85 | 0.852 | 0.974 |
| 0.80 | 1:3 | 0.40 | Meta-analysis of small inconclusive studies | 0.41 | 0.405 | 0.842 |
| 0.20 | 1:5 | 0.20 | Underpowered, but well-performed phase I/II RCT | 0.23 | 0.231 | 0.444 |
| 0.20 | 1:5 | 0.80 | Underpowered, poorly performed phase I/II RCT | 0.17 | 0.172 | 0.444 |
| 0.80 | 1:10 | 0.30 | Adequately powered exploratory epidemiological study | 0.20 | 0.204 | 0.615 |
| 0.20 | 1:10 | 0.30 | Underpowered exploratory epidemiological study | 0.12 | 0.116 | 0.286 |
| 0.20 | 1:1,000 | 0.80 | Discovery-oriented exploratory research with massive testing | 0.0010 | 0.0010 | 0.0040 |
| 0.20 | 1:1,000 | 0.20 | As in previous example, but with more limited bias (more standardized) | 0.0015 | 0.0015 | 0.0040 |

### The narrative (pp. 0699-0700)

- **Well-powered RCT, 50% pre-study chance:** "eventually true about 85% of the time."
- **Confirmatory meta-analysis of good-quality RCTs:** similar. Potential bias probably increases, but power and pre-test chances are higher than for a single trial.
- **Meta-analysis of inconclusive studies**, where pooling is used to "correct" the low power of single studies: "probably false if $R\le1{:}3$." The large $u=0.40$ encodes the selection and heterogeneity of what gets pooled.
- **Underpowered, early-phase clinical trials:** true about one in four times, or less often if bias is present.
- **Exploratory epidemiology:** worse, especially when underpowered. Even well-powered studies "may have only a one in five chance being true, if $R=1{:}10$."
- **Discovery research with massive testing:** tested relationships exceed true ones 1,000-fold (e.g., 30,000 genes tested, of which 30 may be the true culprits [30,31]). PPV per claimed relationship is "extremely low, even with considerable standardization of laboratory and statistical methods, outcomes, and reporting thereof to minimize bias."

> [!theorem] Section claim (pp. 0699-0700)
> Under the framework and Table 4 parameterization, for most research designs and most fields a claimed finding has $\text{PPV}<0.5$: it is more likely false than true. Only confirmatory, high-$R$, high-power, low-$u$ settings escape.
> **Scope:** this is conditional on the assumed $(1-\beta,R,u)$ values. The essay gives no empirical estimates of $R$ or $u$ for these designs (see [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]).
^thm-most-false

### Readings of the added column

- In rows 3, 6 and 7, bias halves or worse the bias-free PPV. With 80% power and $R=1{:}10$, an honest exploratory study would be right 62% of the time, but with $u=0.3$ it is right 20% of the time.
- In the last two rows bias barely matters in absolute terms: $R$ is so low that PPV is about 0.004 even without bias.
- In rows 4-5, cutting $u$ from 0.80 to 0.20 helps much less (0.17 to 0.23) than raising power would. At $u=0$, raising power from 0.20 to 0.80 lifts PPV from 0.44 to 0.76.

## Examples

> [!example] A Monte Carlo version of Table 4 (ADEMP-style)
> Table 4 can be turned into a simulation study ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]): **A**im, estimate PPV; **D**ata-generating mechanism, $c$ hypotheses of which a share $R/(R+1)$ are true, each test significant with probability $1-\beta$ or $\alpha$, and then a share $u$ of non-significant results flipped to "significant"; **E**stimand, PPV; **M**ethod, count; **P**erformance, Monte Carlo SE of the PPV estimate.
^ex-monte-carlo-table4

```python
import numpy as np
rng = np.random.default_rng(0)

def simulate_ppv(power, R, u, alpha=0.05, c=1_000_000):
    true = rng.random(c) < R / (R + 1)
    sig = np.where(true, rng.random(c) < power, rng.random(c) < alpha)
    sig |= (~sig) & (rng.random(c) < u)          # bias: tip a share u of non-findings
    ppv = true[sig].mean()
    mcse = np.sqrt(ppv * (1 - ppv) / sig.sum())
    return ppv, mcse

rows = [(0.80, 1, .10), (0.95, 2, .30), (0.80, 1/3, .40), (0.20, 1/5, .20),
        (0.20, 1/5, .80), (0.80, 1/10, .30), (0.20, 1/10, .30)]
for r in rows:
    print(r, simulate_ppv(*r))   # matches Table 4 to MC error
```

> [!example] Marketing-analytics archetypes on the same scale (illustrative, not from the paper)
> | Archetype | $1-\beta$ | $R$ | $u$ | PPV |
> |---|---|---|---|---|
> | Pre-registered geo holdout for a channel with prior evidence of effect | 0.80 | 1:1 | 0.10 | 0.85 |
> | Small A/B test of a new creative idea | 0.30 | 1:5 | 0.20 | 0.27 |
> | MMM channel coefficient "significant" after a specification search | 0.50 | 1:3 | 0.40 | 0.35 |
> | Driver screen over thousands of candidate covariates | 0.50 | 1:1,000 | 0.30 | 0.0019 |
>
> Values computed with the same formula. The parameter choices are illustrative.
^ex-marketing-archetypes

## Connections

- [[Experimental Benchmarks for Observational Ad Measurement]]: observational ad-effect estimates behave like high-$u$ rows (systematic overstatement).
- [[Bayesian Estimation and Priors for MMM]] and [[Q - Using Experiment Results as Priors in a Bayesian MMM]]: importing high-PPV experimental evidence into low-PPV observational models.
- [[Designing Simulated-Data Experiments]] and [[Simulated-Data Experimentation as Virtual Replication]]: simulation as a way to learn the error rates of one's own pipeline.
- [[Power Analysis and Sample Size]]: power is the cheapest lever when $R$ is moderate.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]
- [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]: the $R\to0$ limit.
