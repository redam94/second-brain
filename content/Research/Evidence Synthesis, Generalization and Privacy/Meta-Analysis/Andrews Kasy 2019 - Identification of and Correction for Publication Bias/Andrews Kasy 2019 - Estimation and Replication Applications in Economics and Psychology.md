---
title: "Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/example
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 5 intro, 5.1, 5.2 (pp. 25-33): Tables 1-2, Figs 5-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Identification Using Replication Studies]]"
  - "[[Andrews Kasy 2019 - Identification Using Meta-Studies]]"
  - "[[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]"
used_by:
  - "[[Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations]]"
aliases:
  - "Selection estimates in economics and psychology lab experiments"
  - "Camerer and OSC replication analysis"
---
# Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology

> [!summary]
> Fitting parametric step-function selection models by maximum likelihood to the Camerer et al. (18 economics lab experiments) and Open Science Collaboration (73 psychology z-type studies) replication data, significant results are over 30 times (economics) and over 100 times (psychology, relative to results insignificant at 10%) more likely to be published than insignificant ones. Corrected intervals change the count of "significant" results dramatically.

## Overview

The empirical specification common to all applications and the two replication-based applications: economics (Sec. 5.1, Fig 5-6, Table 1) and psychology (Sec. 5.2, Fig 7-8, Table 2). Meta-study estimates from the same data are reported alongside as a cross-check.

## Main Content

### Key identifying assumptions and estimator (Sec. 5 intro)

> [!definition] Estimation approach
> *Replication route:* identifies $p$ from asymmetry in $(X,X^r)$; assumes selection depends only on the original estimates. *Meta-study route:* assumes studies with different sample sizes on a topic do not have systematically different estimands (a variant imposed in most meta-studies); plausibility is supported by the similarity of its results to the replication route. *Estimator:* because samples are limited, parsimonious parametric models for $p$ and $\mu$ fitted by maximum likelihood (the supplement gives nonparametric-in-$\mu$ moment/GMM estimators with broadly similar results). $p$ is a **step function** with jumps at conventional critical values (and possibly at zero), normalised $p(z)=1$ for $z>1.96$ (without loss of generality, since $p$ may exceed 1 in other cells). With sign-normalised estimates $W=|Z|$, $p$ is imposed symmetric. Robustness to conditioning on year of first circulation and journal is in supplement F; the baseline (unconditional) specification is never rejected.

^def-estimation-approach

### Economics lab experiments (Camerer et al. 2016)

*Data.* Replications of all 18 between-subject lab experiment papers in the American Economic Review and Quarterly Journal of Economics, 2011-2014. Strength: all papers in a subfield, fixed window, so replications are plausibly published regardless of outcome. Caveat: Camerer et al. replicate the most important significant finding in each paper, so $p$ is the probability a result was published *and selected for replication*; corrected estimates guide interpretation of headline results.

*Histogram (Fig 5 left).* The density of $W=|Z|$ jumps at the cut-off 1.96, suggesting a jump in $p$.

> [!theorem] Replication specification (economics)
> $|\Theta^*|\sim\Gamma(\kappa,\lambda)$ (shape $\kappa$, scale $\lambda$; nests $\chi^2$ and exponential) and
> $$
> p(Z)\propto\begin{cases}\bar p&|Z|<1.96\\1&|Z|\ge1.96.\end{cases}
> $$
> $\bar p$ is the publication probability of an insignificant result relative to a significant one.

^def-spec-econ

> [!example] Table 1 - Selection estimates, economics lab experiments (robust SE in parentheses)
> | | $\kappa$ | $\lambda$ | $\bar p$ |
> |---|---|---|---|
> | Replication | 0.373 (0.266) | 2.153 (1.024) | **0.029** (0.027) |
> | | $\tilde\kappa$ | $\tilde\lambda$ | $\tilde p$ |
> | Meta-study | 1.343 (1.310) | 0.157 (0.076) | **0.038** (0.051) |
>
> *Interpretation.* $\bar p=0.029$ means insignificant results are 2.9% as likely to be published: significant results are more than 30 times ($1/0.029\approx34$) as likely. The hypothesis of no selectivity $H_0:\bar p=1$ is strongly rejected. The meta-study estimate (26 times, $1/0.038$) is similar but suggests slightly less selection; $(\kappa,\lambda)$ and $(\tilde\kappa,\tilde\lambda)$ are not comparable (the meta-study version models the mean of $X^*$ rather than $Z^*$). *Specification check:* a score test of $p(z,\theta)=p(z)$ (supplement C.1 model) gives p-value $0.53$ - no evidence selection depends on $\theta$ given $z$.

^ex-table1

*Bias correction (Fig 6).* Using $\bar p=0.029$, the median-unbiased estimates "track the replication estimates fairly well but are smaller than the original estimates in many cases". Even without Bonferroni correction, **12 of the 18 adjusted confidence sets include zero, compared with just 2 of the original sets**. (Fig 6: top, original/adjusted/replication estimates per study; bottom, original 95% CI vs adjusted CI with Bonferroni endpoints.)

### Psychology lab experiments (Open Science Collaboration 2015)

*Data.* Replications of 2008 studies in Psychological Science, JPSP, and JEP:LMC; 158 articles were available, 111 assigned, 100 replications completed in time; 84 of the 100 replicate the final result of the original paper. Because not all test statistics are z-like, the paper keeps studies using z- or t-statistics or $\chi^2$/F with one numerator degree of freedom (squares of z/t): **73 studies**. Robustness: 52 with denominator df $\ge30$ (similar results); and the subset with protocols approved by the original authors (Gilbert et al. 2016 critique) - similar but less selection.

*Histogram (Fig 7).* Jump at 1.96 and possibly at 1.64.

> [!theorem] Replication specification (psychology)
> $|\Theta^*|\sim\Gamma(\kappa,\lambda)$ and
> $$
> p(Z)\propto\begin{cases}\bar p_1&|Z|<1.64\\\bar p_2&1.64\le|Z|<1.96\\1&|Z|\ge1.96.\end{cases}
> $$
> ^def-spec-psych

> [!example] Table 2 - Selection estimates, psychology lab experiments (robust SE in parentheses)
> | | $\kappa$ | $\lambda$ | $\bar p_1$ ($|Z|<1.64$) | $\bar p_2$ ($1.64\le|Z|<1.96$) |
> |---|---|---|---|---|
> | Replication | 0.315 (0.143) | 1.308 (0.334) | **0.009** (0.005) | **0.205** (0.088) |
> | | $\tilde\kappa$ | $\tilde\lambda$ | $\tilde p_1$ | $\tilde p_2$ |
> | Meta-study | 0.974 (0.549) | 0.153 (0.053) | **0.017** (0.009) | **0.306** (0.135) |
>
> *Interpretation.* Results significant at 5% are over a hundred times ($1/0.009\approx111$) as likely to be published as results insignificant at 10%, and nearly five times ($1/0.205\approx4.9$) as likely as results significant at 10% but not 5%. No selectivity is strongly rejected. Meta-study estimates (59 and 3.3 times) again suggest somewhat less selection. Score test of $p(z,\theta)=p(z)$: p-value $0.42$.

^ex-table2

*Bias correction (Fig 8).* Adjusted estimates "track the replication estimates fairly well for studies with small original z-statistics, though the fit is worse for studies with larger original z-statistics." Of the 73 original 95% confidence sets, **62 exclude zero; only 28 of the adjusted sets do**.

### Summary across the two replication datasets

| Dataset | $N$ | Selectivity (rep.) | Score test p | Orig. CIs excl. 0 | Adjusted CIs excl. 0 |
|---|---|---|---|---|---|
| Camerer et al. (economics) | 18 | 34x | 0.53 | 16 of 18 (since 2 of 18 include zero) | 6 of 18 (12 include zero) |
| OSC (psychology) | 73 | 111x / 4.9x | 0.42 | 62 | 28 |

(The economics counts are derived arithmetic from "twelve adjusted include zero, two original include zero".)

## Examples

Table 1 and Table 2 above are the worked empirical results. A reading exercise: if a psychology result has $|z|=1.8$, its estimated publication probability relative to $|z|\ge1.96$ is about $0.205$, so under the fitted model such a result appears in print only about one time in five relative to a significant one.

## Connections

- How $p$ is identified: [[Andrews Kasy 2019 - Identification Using Replication Studies]], [[Andrews Kasy 2019 - Identification Using Meta-Studies]].
- How adjusted intervals are computed: [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]].
- Fields where false positives are likely: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].

### Relevance to marketing measurement

The 5% / 10% step-function parametrisation is a template for estimating "how much more likely does a significant lift get documented" in an experiment library, if some tests were also re-run. The paper's numbers are from academic journals; they say nothing quantitative about advertising tests.

## See Also

- [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
