---
title: "Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart"
tags:
  - source/ingested
  - topic/model-validation
  - topic/goodhart
  - topic/selection-bias
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law.pdf]]"
source_location: "arXiv:1803.04585v4, §1 'Regressional Goodhart', eq. (1), p.2; ref. [5] (Lewis 2014, 'Why the tails come apart')"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Manheim Garrabrant 2018 - Variants of Goodhart's Law"
doc_type: paper
depends_on:
  - "[[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]]"
used_by:
  - "[[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]"
  - "[[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]"
  - "[[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]]"
aliases:
  - Regressional Goodhart
  - Tails Come Apart
  - Why the Tails Come Apart
---

# Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart

> [!summary]
> **Regressional Goodhart**: when you select on a proxy $M=G+\text{noise}$, you select for the noise as well as for the goal. The states with the highest $M$ are, on average, those whose noise is most positive, so their true $G$ falls predictably short of $M$. Selection still helps ($E[G\mid M>c]$ rises with $c$), but the proxy overstates what you get. In the Gaussian case the gap grows linearly in $c$. The paper calls this "the most fundamental" Goodhart effect: it "cannot be avoided" with any inexact metric. Statisticians know it as regression to the mean and the winner's curse. It is the mechanism behind optimistic in-sample model selection and inflated "best-model" effect sizes.
^summary

## Overview

This is the first of the four categories (p.2). It needs only selection, with no intervention, no change of regime and no adversary. It also goes by "Tails come apart", after a 2014 essay by Gregory Lewis (ref. [5]): even when two variables are strongly correlated, the most extreme case on one is rarely the most extreme case on the other.

## Main Content

> [!definition] Regressional Goodhart (§1, p.2)
> "When selecting for a proxy measure, you select not only for the true goal, but also for the difference between the proxy and the goal. This is also known as 'Tails come apart.'"
^def-regressional

> [!definition] Simple model, eq. (1) (p.2)
> $$
> M = G + \text{normal}(\mu,\sigma^2) \tag{1}
> $$
> Here $G$ is the goal, $M$ the proxy, and the additive noise $\varepsilon=M-G\sim N(\mu,\sigma^2)$ is independent of $G$.
>
> The paper's reasoning: "Due to the noise, a point with a large M value will likely have a large G value, but also a large noise value. Thus, when M is large, you can expect G to be predictably smaller than M. Despite the lack of bias, for large values of c the values of G when M > c is expected to be higher than otherwise."
^def-regressional-model

> [!theorem] Claim: unavoidability (§1, p.2)
> "While this is the simplest Goodhart effect, it is also the most fundamental: it cannot be avoided. No matter what measure is chosen for optimization, an inexact metric necessarily leads to a divergence between the goal and the metric in the tail."
^thm-regressional-unavoidable

The paper states this informally and gives no proof. The Gaussian derivation below is a vault addition that makes the claim exact.

> [!theorem] Gaussian regressional shrinkage (vault derivation of eq. (1))
> Let $G\sim N(\mu_G,\tau^2)$ and $\varepsilon\sim N(\mu,\sigma^2)$ be independent, with $M=G+\varepsilon$. Then
> $$
> E[G\mid M=m]=\mu_G+\underbrace{\frac{\tau^2}{\tau^2+\sigma^2}}_{\lambda\in(0,1)}\,(m-\mu-\mu_G),
> $$
> so the expected shortfall $m-E[G\mid M=m]=(1-\lambda)(m-\mu_G)+\lambda\mu$ grows linearly in $m$.
>
> For threshold selection,
> $$
> E[G\mid M\ge c]=\mu_G+\lambda\,\big(E[M\mid M\ge c]-\mu-\mu_G\big),\qquad E[M\mid M\ge c]=\mu_M+s_M\frac{\phi(z_c)}{1-\Phi(z_c)},
> $$
> where $\mu_M=\mu_G+\mu$, $s_M^2=\tau^2+\sigma^2$ and $z_c=(c-\mu_M)/s_M$. Two consequences follow:
> 1. **Selection still pays.** $E[G\mid M\ge c]$ increases in $c$, which is the paper's "the values of G when M > c is expected to be higher than otherwise".
> 2. **The proxy over-promises by a growing amount.** The gap $E[M-G\mid M\ge c]$ grows without bound as $c\to\infty$.
>
> The proxy also gets worse at *ranking* within the selected set, because conditioning on $M\ge c$ cuts the variance of $M$ ([[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation#^sim-regressional]] has the numbers).
>
> **Proof sketch.** $(G,M)$ is bivariate normal with $\operatorname{Cov}(G,M)=\tau^2$. The conditional mean of a bivariate normal is linear with slope $\operatorname{Cov}/\operatorname{Var}(M)=\lambda$. Then take expectations over $M\mid M\ge c$, using the inverse Mills ratio for the truncated normal mean.
^thm-gaussian-shrinkage

### Interpretation

- **Bias and Goodhart are different things.** With $\mu=0$ the proxy is unbiased *unconditionally*, $E[M]=E[G]$, and yet it is biased *conditional on being selected*. The paper's "Despite the lack of bias" makes exactly this point. Debiasing a metric does not remove regressional Goodhart.
- **The cure is shrinkage, not a better point estimate.** The gap is $(1-\lambda)$ times the distance from the mean, so the best predictor of $G$ given a selected $M$ shrinks $M$ towards the mean with the reliability ratio $\lambda$. This is the logic of [[James-Stein Estimator]], [[Empirical Bayes Interpretation of Shrinkage]] and [[Partial Pooling as Multiple Comparisons Correction]].
- **Optimization power matters.** Picking the maximum of $K$ candidates is equivalent to $c$ at the $1-1/K$ quantile. The expected overstatement grows roughly like $s_M(1-\lambda)\sqrt{2\ln K}$, so a search over thousands of variants overstates far more than a search over two.

## Examples

> [!example] Best-of-$K$ model selection (vault illustration)
> An analyst evaluates $K$ candidate models by a hold-out score $M_k=G_k+\varepsilon_k$, where $G_k$ is the model's true out-of-sample skill and $\varepsilon_k$ is the hold-out sampling error. With a short weekly hold-out (8-13 weeks), $\sigma$ is large relative to the true spread $\tau$ of skill across reasonable specifications, so $\lambda$ is small. The winning model's hold-out score then mostly reflects its luck. This is why [[Model Selection and Overfitting]] recommends nested validation, or reporting the winner's score on fresh data. It is also why [[Cross-Validation for Time Series Prediction]] warns against tuning on the same folds used for reporting.
^ex-best-of-model-selection

> [!example] Inflated effect sizes in significant findings
> Filtering studies on $p<0.05$ is threshold selection on a noisy proxy for the true effect. Significant estimates exaggerate magnitude: Type M error ([[Type S and Type M Errors]]). The same mechanism drives [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] and the false positives in [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]].
^ex-inflated-effect-sizes-in

## Connections

- **Selection on outcome-correlated variables**: [[The Selection Problem]].
- **Choosing the analysis that "works"** is regressional Goodhart on the analyst's own pipeline: [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]].
- **Stability selection** limits it by asking for selection *across* subsamples: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- **Rashomon sets**: many near-equal models exist, so the argmax among them is largely noise-driven: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].

## See Also
- [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] — the next category, where the relationship itself changes in the tail
- [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] — ignored causes that *worsen* regressional Goodhart
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]
