---
title: "Andrews Kasy 2019 - Identification Using Replication Studies"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 3.1 (pp. 9-15): Def. 2, Lemma 2, Thm 1, Cor. 1-2, Thm 2, Fig 2"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]"
used_by:
  - "[[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]"
aliases:
  - "Identification of publication probability from replications"
  - "Replication asymmetry identification (Theorem 1)"
---
# Andrews Kasy 2019 - Identification Using Replication Studies

> [!summary]
> If each published original estimate $X$ has an independent replication $X^r$ of the same parameter, and selection acts only on $X$, then the joint density of $(X,X^r)$ is asymmetric with $f(b,a)/f(a,b)=p(b)/p(a)$. Hence $p(\cdot)$ is nonparametrically identified up to scale (Theorem 1), and with normal estimates and unequal variances identification persists (Corollary 1), including under sign normalisation (Corollary 2).

## Overview

This note covers Section 3.1: the replication DGP, the symmetry argument, Theorem 1 and its testable restrictions, extensions to unequal variances, normalised signs, and selection that depends on the true effect (Theorem 2), with the paper's worked picture (Fig 2).

## Main Content

> [!definition] Definition 2 - Replication data generating process
> $(\Theta_i^*,X_i^*,D_i,X_i^{*r})$ are jointly i.i.d. with
> $$\Theta_i^*\sim\mu,\quad X_i^*|\Theta_i^*\sim f_{X^*|\Theta^*},\quad D_i|X_i^*,\Theta_i^*\sim\text{Bernoulli}(p(X_i^*)),\quad X_i^{*r}\mid D_i,X_i^*,\Theta_i^*\sim f_{X^*|\Theta^*}(\cdot|\Theta_i^*).$$
> We observe i.i.d. $(X_j,X_j^r)=(X^*_{I_j},X^{*r}_{I_j})$. Key features: $(X^*,X^{*r})$ is **symmetric** in distribution, and selectivity acts only on $X^*$, not on the replication. Plausible for systematic replication projects (OSC 2015; Camerer et al. 2016) but may fail for non-systematic replications published only when they "debunk" earlier results.

^def-replication-dgp

> [!theorem] Lemma 2 - Replication density
> Conditional on $\Theta$, $f_{X,X^r|\Theta}(x,x^r|\theta)=\dfrac{p(x)}{E[p(X_i^*)|\Theta_i^*=\theta]}f_{X^*|\Theta^*}(x|\theta)f_{X^*|\Theta^*}(x^r|\theta)$. The marginal density is
> $$f_{X,X^r}(x,x^r)=\frac{p(x)}{E[p(X_i^*)]}\int f_{X^*|\Theta^*}(x|\theta)f_{X^*|\Theta^*}(x^r|\theta)\,d\mu(\theta).$$
> Hence for any $a,b$ with non-zero denominators
> $$\frac{f_{X,X^r}(b,a)}{f_{X,X^r}(a,b)}=\frac{p(b)}{p(a)}.$$
> *Proof sketch:* $D\perp X^{*r}|(X^*,\Theta^*)$ gives the product; integrating out $\Theta$ gives the marginal; the integral is symmetric in $(x,x^r)$ so cancels in the ratio.

^thm-replication-density

> [!theorem] Theorem 1 - Nonparametric identification using replication experiments
> In the setup of Definition 2, assume the support of $f_{X^*,X^{*r}}$ is of the form $A\times A$ for some measurable set $A$. Then $p(\cdot)$ is nonparametrically identified on $A$ up to scale.

^thm-replication-identification

*Argument.* By Lemma 2, $p(b)/p(a)$ is an observable density ratio for every pair in $A$; fixing $p(a_0)=1$ at one point fixes the scale. Scale is not identifiable because multiplying $p$ by a constant leaves the published distribution unchanged.

> [!theorem] Testable restrictions
> Define $h(a,b)=\log f_{X,X^r}(b,a)-\log f_{X,X^r}(a,b)$. By Lemma 2, $h(a,b)=\log p(b)-\log p(a)$, hence for any three values $a,b,c$
> $$h(a,b)+h(b,c)+h(c,a)=0.$$
> One could build a nonparametric specification test from this and an estimate of $f_{X,X^r}$; the paper instead tests restrictions of a larger identified model (Thm 2 specification, below).

^thm-cycle-restriction

### Worked picture (Fig 2)

> [!example] Illustrative example continued - selection on significance with replications
> *Setup.* $\Theta^*\sim N(1,1)$; $Z^*|\Theta^*\sim N(\Theta^*,1)$; replication $Z^{*r}|\Theta^*\sim N(\Theta^*,1)$; $p(z)=1$ for $|z|>1.96$ and $0.1$ otherwise. Region $A$: original significant, replication not ($|Z|>1.96,|Z^r|\le1.96$). Region $B$: original not significant, replication significant.
> *Solution.* By symmetry of the latent process the masses of $A$ and $B$ are equal (simulation: $0.1437$ and $0.1442$). After selection, $B$ retains only 10% of its draws. The published mass ratio is $A:B=0.1437:0.01442\approx9.97\approx10=p(\text{sig})/p(\text{insig})$ - exactly the ratio Lemma 2 predicts.
> *Interpretation.* The excess of points in $A$ over $B$ (asymmetry about the diagonal $Z=Z^r$) is the signature of selection, and its size identifies $p$ up to scale. Fig 2 draws 100 latent pairs (left) and the published subset (right, 90% of insignificant originals deleted). The simulation numbers are my replication of this setup.

^ex-fig2-regions

### Generalisations (Sec. 3.1.2)

**Different variances.** Replication sample sizes differ from originals, and may depend on $Z^*$ (power calculations in OSC and Camerer et al. make $\sigma^*$ increase with $|Z^*|$ but unrelated to $\Theta^*$ conditionally). Normalising the original's variance to one:
$$\Theta_i^*\sim\mu,\;Z_i^*|\Theta_i^*\sim N(\Theta_i^*,1),\;D_i|Z_i^*,\Theta_i^*\sim\text{Bernoulli}(p(Z_i^*)),\;\sigma_i^*|Z_i^*,D_i,\Theta_i^*\sim f_{\sigma|Z^*},\;Z_i^{*r}|\sigma_i^*,Z_i^*,D_i,\Theta_i^*\sim N(\Theta_i^*,\sigma_i^{*2}).\tag{2}$$

> [!theorem] Corollary 1
> In the setup (2), given i.i.d. draws of $(Z,Z^r)$ (and $\sigma$), $p(\cdot)$ is nonparametrically identified on $\mathbb R$ up to scale, and $\mu$ is identified as well. *Proof idea:* recover the symmetric setting by (de)convolving $Z^r$ with normal noise given $Z$ and $\sigma$, then apply Theorem 1; normality allows recovery of $\mu$.

^thm-cor1

**Normalised sign.** In the paper's datasets the sign of the initial estimate is set positive and the sign of $Z^r$ adjusted (the studies examine different outcomes, so relative signs are arbitrary).

> [!theorem] Corollary 2
> In the setup (2), assume $p$ is symmetric, $p(z)=p(-z)$, and $f_{\sigma|Z^*}(\sigma|z)=f_{\sigma|Z^*}(\sigma|-z)$. If we observe $(W,W^r)=\text{sign}(Z)\cdot(Z,Z^r)$, then $p(\cdot)$ is nonparametrically identified on $\mathbb R$ up to scale and the distribution of $|\Theta^*|$ is identified.

^thm-cor2

### Selection depending on the true effect (Sec. 3.1.3)

Publication may depend on other findings in the manuscript or on unreported results, so $D\perp\Theta^*|X^*$ may fail. Allow $D_i|Z_i^*,\Theta_i^*\sim\text{Bernoulli}(p(Z_i^*,\Theta_i^*))$ in a model otherwise as (2) (display (3)); this accommodates alternative specifications and robustness checks not in the replication data.

> [!theorem] Theorem 2
> In the setup (3), $f_{Z|\Theta}$ is nonparametrically identified. The joint density of $(Z,Z^r,\sigma,\Theta)$ is
> $$f_{Z,Z^r,\sigma,\Theta}(z,z^r,\sigma,\theta)=\frac{p(z,\theta)}{E[p(Z^*,\Theta^*)]}\varphi(z-\theta)\,\frac1\sigma\varphi\!\Big(\frac{z^r-\theta}{\sigma}\Big)f_{\sigma|Z^*}(\sigma|z)\,\frac{d\mu}{d\nu}(\theta).$$
> Without restrictions $p(z,\theta)$ is not identified (divide $p$ by $g(\theta)$ and multiply $d\mu/d\nu$ by $g(\theta)$ for an observationally equivalent model), but $p(z,\theta)$ is identified up to a $\theta$-dependent normalisation, since $f_{Z|\Theta}(z|\theta)/f_{Z^*|\Theta^*}(z|\theta)=p(z,\theta)/E[p(Z^*,\Theta^*)|\Theta^*=\theta]$; e.g. impose $\sup_zp(z,\theta)=1$.

^thm-theorem2

This is used for specification checks: the applications fit a parametric version and test $p(z,\theta)=p(z)$ (score tests, p-values 0.53 and 0.42; see [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]).

## Examples

Fig 2 example above (regions $A$ and $B$). A second use: if only 5%-significant originals are ever published ($p\approx 0$ otherwise), region $B$ is empty and the ratio $f(b,a)/f(a,b)$ diverges - the extreme case behind the McCrary et al. conservative tests ([[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]).

## Connections

- Meta-analytic alternative that needs no replications: [[Andrews Kasy 2019 - Identification Using Meta-Studies]].
- How often significant results "replicate" even without selection: [[Andrews Kasy 2019 - Relation to Existing Approaches and Meta-Regressions]].
- Estimates from the Camerer and OSC data: [[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]].

### Relevance to marketing measurement

A re-run (hold-out) of a geo test in a comparable market is a replication $X^r$ of the same $\Theta$. If your team only re-runs tests that looked strong, selection acts on $X$ only and the assumptions of Theorem 1 hold; if re-runs happen only for tests that look suspicious, they do not.

## See Also

- [[Andrews Kasy 2019 - Setting and the Truncated Sampling Model]]
- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Geo-Experiment Methodology - Overview]]
