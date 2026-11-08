---
title: "Andrews Kasy 2019 - Setting and the Truncated Sampling Model"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/definition
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 2 (pp. 5-8): Setting, Definition 1, Lemma 1, Fig 1, Sec. 2.2"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]"
used_by:
  - "[[Andrews Kasy 2019 - Identification Using Replication Studies]]"
  - "[[Andrews Kasy 2019 - Identification Using Meta-Studies]]"
  - "[[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]"
aliases:
  - "Truncated sampling process"
  - "Publication bias selection model"
---
# Andrews Kasy 2019 - Setting and the Truncated Sampling Model

> [!summary]
> A population of latent studies draws true effects $\Theta^*\sim\mu$ and results $X^*|\Theta^*$; each is published with probability $p(X^*)$. Published results then follow a reweighted density whose reweighting factor is $p(x)$, and the likelihood for a given $x$ is scaled by $E[p(X^*)|\Theta^*=\theta]$. This single truncation formula drives everything else in the paper.

## Overview

This note defines the data-generating process, derives the truncated likelihood, works through the paper's ten-fold-selectivity example (bias and coverage), and records the alternative observability and manipulation settings.

## Main Content

> [!definition] Definition 1 - Truncated sampling process
> The triples $(\Theta_i^*,X_i^*,D_i)$ are jointly i.i.d. across latent studies $i$ with
> $$
> \Theta_i^*\sim\mu,\qquad X_i^*\mid\Theta_i^*\sim f_{X^*|\Theta^*}(x\mid\Theta_i^*),\qquad D_i\mid X_i^*,\Theta_i^*\sim\text{Bernoulli}\big(p(X_i^*)\big).
> $$
> $D_i=1$ means the study is published. Let $I_0=0$, $I_j=\min\{i>I_{j-1}:D_i=1\}$ and $\Theta_j=\Theta^*_{I_j}$; we observe i.i.d. draws $X_j=X^*_{I_j}$. The density $f_{X^*|\Theta^*}$ is known and continuous; $\Theta^*,X^*$ are scalar; $p$ is the conditional publication probability and reflects both researcher and journal decisions (not disentangled).

^def-truncated-sampling

The case where all latent studies estimate the same parameter is nested by taking $\mu$ degenerate.

> [!theorem] Lemma 1 - Truncated likelihood
> Under Definition 1, the density of a published $X$ given its true effect $\Theta=\theta$ is
> $$
> f_{X|\Theta}(x|\theta)=f_{X^*|\Theta^*,D}(x|\theta,1)=\frac{p(x)}{E[p(X_i^*)\mid\Theta_i^*=\theta]}\,f_{X^*|\Theta^*}(x|\theta).\tag{1}
> $$
> *Proof sketch:* Bayes' rule: $f(x|\theta,D=1)=P(D=1|x,\theta)f(x|\theta)/P(D=1|\theta)$ and $P(D=1|x,\theta)=p(x)$ because $D\perp\Theta^*\mid X^*$.

^thm-truncated-likelihood

For fixed $\theta$, selection **reweights** the distribution of published results by $p(\cdot)$. As $\theta$ varies for fixed $x$, the likelihood is scaled by $E[p(X^*)|\Theta^*=\theta]$, the publication probability of a latent study with effect $\theta$.

**Study-level covariates.** The conditional independence $D\perp\Theta^*|X^*$ may hold only conditional on observables $W^*$ (journal, topic, design). Then (1) becomes $f_{X|\Theta,W}(x|\theta,w)=p(x,w)f_{X^*|\Theta^*}(x|\theta,w)/E[p(X^*,W^*)|\Theta^*=\theta]$. The paper conditions on journal and year of first circulation in robustness checks (supplement) but suppresses $W$ in theory.

### Illustrative example (Sec. 2.1)

> [!example] Journal that is ten times more likely to publish significant results
> *Setup.* Experiments report $Z_i^*\sim N(\Theta_i^*,1)$ (normality as an asymptotic approximation; $\text{Var}=1$ is a scale normalisation). The journal publishes $Z^*\in[-1.96,1.96]$ with probability $p=0.1$ and results outside that interval with probability $1$: $p(z)=0.1+0.9\cdot\mathbf 1(|z|>1.96)$. Compare the usual estimator $\hat\Theta_j=Z_j$ and the usual interval $[Z_j-1.96,Z_j+1.96]$.
> *Solution.* By Lemma 1, $f_{Z|\Theta}(z|\theta)=p(z)\varphi(z-\theta)/\big[0.1\,\Pr(|N(\theta,1)|\le1.96)+\Pr(|N(\theta,1)|>1.96)\big]$. The median of the published $Z$ solves $F_{Z|\Theta}(m|\theta)=1/2$ and the coverage of the usual interval is $F(\theta+1.96|\theta)-F(\theta-1.96|\theta)$. Recomputed numerically (script below):
>
> | $\theta$ | median of published $Z$ | median bias | coverage of naive 95% CI |
> |---|---|---|---|
> | 0.0 | 0.000 | 0.000 | 0.655 |
> | 0.5 | 1.318 | 0.818 | 0.803 |
> | 1.0 | 2.143 | 1.143 | 0.886 |
> | 2.0 | 2.576 | 0.576 | 0.951 |
> | 3.0 | 3.169 | 0.169 | 0.968 |
>
> *Interpretation.* Published results over-estimate the magnitude of the effect (for $\theta>0$ the median is above $\theta$; at $\theta=0$ the median bias is zero only by symmetry, yet the interval already covers just 65.5%), and nominal 95% intervals **under-cover for small $\theta$ and over-cover for somewhat larger $\theta$**, matching the paper's Fig 1. These numbers are my recomputation of the model in the paper's text, not a table printed in it.

^ex-ten-fold-selectivity

```python
import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

C, P_INS = 1.96, 0.1          # p(z) = 0.1 on [-C, C], 1 outside

def mass(a, b, th):           # integral of phi(z - th) over [a, b]
    return norm.cdf(b - th) - norm.cdf(a - th)

def trunc_cdf(x, th):         # F_{X|Theta}(x | th) for the published z-statistic
    xi = min(max(x, -C), C)
    num = P_INS * mass(-C, xi, th) + mass(-np.inf, min(x, -C), th) + (mass(C, x, th) if x > C else 0.0)
    den = P_INS * mass(-C, C, th) + mass(-np.inf, -C, th) + mass(C, np.inf, th)
    return num / den

for th in [0, 0.5, 1, 2, 3]:
    med = brentq(lambda x: trunc_cdf(x, th) - .5, -10, 15)
    cov = trunc_cdf(th + C, th) - trunc_cdf(th - C, th)
    print(f"theta={th}: median={med:.3f} bias={med-th:.3f} coverage={cov:.3f}")
```

### Alternative observability (Sec. 2.2)

> [!definition] Observability variants
> **Truncated (baseline):** observe $X^*$ only when $D=1$ - likelihood (1).
> **Censoring:** the existence of unpublished studies is known (e.g. from pre-registrations) without their results. Observe i.i.d. $(Y,D)$ with $Y=D\cdot X^*$; likelihood
> $$
> f_{Y,D|\Theta^*}(x,d|\theta^*)=d\cdot p(x)f_{X^*|\Theta^*}(x|\theta)+(1-d)\big(1-E[D_i|\Theta_i^*=\theta^*]\big).
> $$
> **Unpublished results observed** (as in Franco, Malhotra and Simonovits 2014): likelihood $f_{X^*,D|\Theta^*}(x,d|\theta)=p(x)^d(1-p(x))^{1-d}f_{X^*|\Theta^*}(x|\theta)$.
> In both richer cases the truncated likelihood (1) arises as a limited-information (conditional) likelihood, conditioning on publication decisions (and, in the third case, on unpublished results), so identification and inference remain valid; extra information can only add insight.

^def-observability

### Manipulation of results

The analysis takes $f_{X^*|\Theta^*}$ as **known**, which limits scope for researchers to inflate latent results (Brodeur et al. 2016). Forms of $p$-hacking that fit the model: running many independent analyses (each following known $f_{X^*|\Theta^*}$) and writing up only significant ones is a special case. More general manipulation is represented by $p$ depending on both $X^*$ and $\Theta^*$, handled in Section 3.1.3 ([[Andrews Kasy 2019 - Identification Using Replication Studies]]).

## Examples

The ten-fold-selectivity example above; its continuation with replication data is in [[Andrews Kasy 2019 - Identification Using Replication Studies]], with meta-study data in [[Andrews Kasy 2019 - Identification Using Meta-Studies]], and with corrected inference in [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]].

## Connections

- The standard funnel-plot picture of the same selection: [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]].
- $p$-hacking and forking paths as sources of selection: [[Researcher Degrees of Freedom]], [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].

### Relevance to marketing measurement

$D_i$ is "this test result made it into the experiment library"; $X^*$ is the estimated lift; $p(\cdot)$ is how much the team favours significant, positive, or surprising lifts. The censoring variant corresponds to a test registry that logs that a test ran but not its outcome.

## See Also

- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
