---
title: "Andrews Kasy 2019 - Identification Using Meta-Studies"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 3.2 (pp. 16-18): Def. 3, Lemma 3, Thm 3, Cor. 3, Fig 3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]"
used_by:
  - "[[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]"
aliases:
  - "Identification of publication probability from meta-studies"
  - "Meta-study identification (Theorem 3)"
---
# Andrews Kasy 2019 - Identification Using Meta-Studies

> [!summary]
> Meta-studies report estimates with varying standard errors. If the true effect is independent of the standard error across latent studies and publication depends only on the z-statistic, then the published distribution at a larger standard error is **not** a noised-up copy of that at a smaller one; the deviation identifies $p(\cdot)$ and $\mu$ up to scale (Theorem 3).

## Overview

This note covers Section 3.2: the meta-study DGP, the conditional density of the z-statistic given $\sigma$, Theorem 3, the sign-normalised corollary, and dependence of publication on $\sigma$.

## Main Content

> [!definition] Definition 3 - Meta-study data generating process
> $(\sigma_i^*,\Theta_i^*,X_i^*,D_i)$ are jointly i.i.d. with
> $$
> \sigma_i^*\sim\mu_\sigma,\quad\Theta_i^*|\sigma_i^*\sim\mu_\Theta,\quad X_i^*|\Theta_i^*,\sigma_i^*\sim N(\Theta_i^*,\sigma_i^{*2}),\quad D_i|X_i^*,\Theta_i^*,\sigma_i^*\sim\text{Bernoulli}\big(p(X_i^*/\sigma_i^*)\big).
> $$
> Observed: i.i.d. draws $(X_j,\sigma_j)=(X^*_{I_j},\sigma^*_{I_j})$. Write $Z_i^*=X_i^*/\sigma_i^*$ and $Z_j=X_j/\sigma_j$. **Key identifying assumption:** $\Theta^*$ is statistically independent of $\sigma^*$ (studies with larger samples do not have systematically different estimands); publication depends on the z-statistic alone.

^def-metastudy-dgp

> [!theorem] Lemma 3 - Meta-study density
> In Definition 3 the conditional density of $Z$ given $\sigma$ is
> $$
> f_{Z|\sigma}(z|\sigma)=\frac{p(z)}{E[p(Z^*)\mid\sigma]}\int\varphi\!\Big(z-\frac\theta\sigma\Big)d\mu_\Theta(\theta).
> $$
> Consequently for $\sigma_2>\sigma_1$
> $$
> \frac{f_{Z|\sigma}(z|\sigma_2)}{f_{Z|\sigma}(z|\sigma_1)}=\frac{E[p(Z^*)|\sigma=\sigma_1]}{E[p(Z^*)|\sigma=\sigma_2]}\cdot\frac{\int\varphi(z-\theta/\sigma_2)d\mu_\Theta}{\int\varphi(z-\theta/\sigma_1)d\mu_\Theta},
> $$
> where the first factor does not depend on $z$.

^thm-lemma3

The ratio on the left is identified; the idea is to invert the right-hand side to recover $\mu_\Theta$, which then identifies $p$.

> [!theorem] Theorem 3 - Nonparametric identification using meta-studies
> In Definition 3, suppose the support of $\sigma$ contains an open interval. Then $p(\cdot)$ is identified up to scale and $\mu_\Theta$ is identified as well.

^thm-metastudy-identification

*Proof idea (supplement):* consider $\partial_\sigma\log f_{Z|\sigma}(z|\sigma)$; the $z$-free normalising factor drops out, leaving a function of $\mu_\Theta$ alone, which can be inverted. I have not reproduced the proof (it is in the supplement, not the PDF).

> [!theorem] Corollary 3 - Sign-normalised estimates
> In Definition 3, assume additionally that $p$ is symmetric, $p(x/\sigma)=p(-x/\sigma)$. If we observe i.i.d. $(|X|,\sigma)$, then $p$ is nonparametrically identified on $\mathbb R$ up to scale and the distribution of $|\Theta^*|$ is identified.

^thm-cor3

> [!definition] Dependence on the standard error
> If $D_i|\cdot\sim\text{Bernoulli}(p(X_i^*/\sigma_i^*)\,q(\sigma_i^*))$, Theorem 3 still identifies $p$. The generalised model is observationally equivalent to Definition 3 with the distribution of $\sigma^*$ reweighted by $q(\sigma)/E[q(\sigma^*)]$.

^def-q-sigma

### Worked picture (Fig 3)

> [!example] Illustrative example continued - selection on significance with varying $\sigma$
> *Setup.* $\Theta^*\sim N(1,1)$ independent of $\sigma^*$; $X^*|\Theta^*,\sigma^*\sim N(\Theta^*,\sigma^{*2})$; $p(X^*/\sigma^*)=1$ if $|X^*/\sigma^*|>1.96$ and $0.1$ otherwise. Compare two standard deviations, $A$ (small) and $B$ (large) in Fig 3.
> *Solution.* Latent: the distribution of $X^*$ at larger $\sigma$ is the small-$\sigma$ distribution convolved with normal noise. Published: statistically insignificant observations are missing at larger $\sigma$ (the insignificant band $|X|<1.96\sigma$ widens with $\sigma$), so published $X$ tend to be larger on average at larger $\sigma$.
> *Interpretation.* The failure of the convolution relationship in the published data is attributed to selection; how the published conditional distribution of $X$ varies with $\sigma$ identifies $p$ up to scale.

^ex-fig3

Because the meta-study route relies on the independence assumption, the paper cross-checks it against the replication route in the Camerer and OSC data: the estimates are similar, though meta-study estimates suggest somewhat less selection ([[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]).

## Examples

Fig 3 example above. Multiple estimates per study (minimum-wage data): the model's conditional independence only needs $D_i\perp(\Theta_i^*,\sigma_i^*)|X_i^*/\sigma_i^*$; the paper clusters standard errors by study ([[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]).

## Connections

- Egger-type regressions rely on a related intuition (small-sample estimates are larger when selected): [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]], [[Sterne 2011 - Tests for Asymmetry and the Egger Regression]].
- Replication-based alternative: [[Andrews Kasy 2019 - Identification Using Replication Studies]].
- Hierarchical models for $\mu_\Theta$ (the upper level): [[Meager 2019 - Hierarchical Model Specifications]].

### Relevance to marketing measurement

The repository of lift tests is a meta-study: each test has an estimate and a standard error. The independence assumption (true lift not related to test size) is the one to defend - budgets and test durations are often correlated with the channel and thus with true effect sizes, which breaks the assumption exactly as Sterne et al. warn about size-effect correlations.

## See Also

- [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Sterne 2011 - Funnel Plots and the Causes of Asymmetry]]
