---
title: Lindley's Information Measure
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Lindley 1956 - On a Measure of the Information Provided by an Experiment.pdf]]"
source_location: "Ann. Math. Stat. 27(4):986–1005, 1956"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Foundations"
doc_type: paper
depends_on:
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Expected Information Gain]]"
  - "[[Sequential and Adaptive BED]]"
  - "[[Information-Theoretic Design Objectives]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
aliases:
  - Lindley 1956
  - Lindley information
  - Average information of an experiment
  - On a Measure of the Information Provided by an Experiment
---

# Lindley's Information Measure

> [!summary]
> **Lindley (1956), *On a Measure of the Information Provided by an Experiment* (Annals of Mathematical Statistics).** The founding paper of Bayesian experimental design. Adapting Shannon's information theory to statistics, Lindley defines the **average information provided by an experiment** as the expected reduction in (negative-)entropy of the parameter $\theta$ from prior to posterior — exactly the modern **expected information gain** ([[Expected Information Gain]]) / mutual information $I(\theta;x)$. He proves it is non-negative (Thm 1), additive (Thm 2), sufficiency-invariant, concave/diminishing in repeated sampling (Thms 3–6), defines a prior-free *partial order* on experiments (more informative for **all** priors), relates it to Blackwell's ordering (Thm 9), and applies it to design: **perform the experiment of greatest expected information, and continue until a preassigned amount is attained** — recovering the Wald SPRT and a determinant (D-optimality) criterion.

## Overview

Shannon introduced two ideas: that information is a statistical concept (defined relative to a frequency distribution), and that there is an essentially unique functional of that distribution measuring its information content. Lindley's purpose is to apply these to **an experiment rather than a message**: replace the transmitted message $x$ by knowledge of parameters $\theta$ *before* an experiment, and the received message by knowledge *after*. Comparing the two quantifies the information the experiment provides.

Crucially, Lindley argues that **prior distributions — "though usually anathema to the statistician" — are essential** to the notion of experimental information: if the prior is concentrated on a single $\theta$ (the state of nature is known), no experiment can be informative. This makes the paper a foundational Bayesian document.

## Main Content

### The measure

Lindley works with an experiment $\mathcal{E}=\{\mathbf{X},\mathcal{B},\Theta,P\}$: outcome space $\mathbf{X}$, parameter space $\Theta$, and densities $p(x\mid\theta)$. With prior $p(\theta)$, the marginal is $p(x)=\int p(x\mid\theta)p(\theta)\,d\theta$ (Eq. 1) and Bayes' theorem $p(\theta\mid x)=p(x\mid\theta)p(\theta)/p(x)$ (Eq. 2).

> [!definition] Definition: Information of a distribution (Lindley 1956, Eqs. 3–5)
> The amount of information in the prior is $\mathcal{I}_0 = \int p(\theta)\log p(\theta)\,d\theta = E_\theta\log p(\theta)$, and after observing $x$, in the posterior, $\mathcal{I}_1(x) = \int p(\theta\mid x)\log p(\theta\mid x)\,d\theta$.
> **Sign convention (important):** Lindley uses $+\int p\log p$ — the *negative* of Shannon entropy — deliberately reversed, so that a distribution *concentrated* on one value has **maximum** information and a *spread* distribution has less. This is the reverse of the communications engineer's scale.
^def-info-distribution

> [!definition] Definition 1 & 2: Information provided by an experiment (Lindley 1956, Eqs. 6–7)
> The information provided by experiment $\mathcal{E}$ with prior $p(\theta)$ **when the observation is $x$** is
> $$
> \mathcal{I}(\mathcal{E},p(\theta),x) = \mathcal{I}_1(x) - \mathcal{I}_0.
> $$
> The **average information provided by the experiment** (Definition 2) averages over outcomes via $p(x)$:
> $$
> \boxed{\;\mathcal{I}(\mathcal{E},p(\theta)) = E_x\!\left[\mathcal{I}_1(x) - \mathcal{I}_0\right] = E_x\!\left[\int p(\theta\mid x)\log p(\theta\mid x)\,d\theta\right] - \int p(\theta)\log p(\theta)\,d\theta.\;}
> $$
> This is exactly the modern **expected information gain** $\mathrm{H}[p(\theta)]-\mathbb{E}_x\mathrm{H}[p(\theta\mid x)]$ — see [[Expected Information Gain]].
^def-average-info

> [!theorem] Equivalent forms (Lindley 1956, Eqs. 8–11)
> The average information has several equivalent expressions, including the **symmetric joint form**
> $$
> \mathcal{I}(\mathcal{E},p(\theta)) = \iint p(x,\theta)\log\frac{p(x,\theta)}{p(x)p(\theta)}\,dx\,d\theta = E_\theta E_x\log\frac{p(\theta\mid x)}{p(\theta)} = E_x E_\theta\log\frac{p(x\mid\theta)}{p(x)},
> $$
> which manifestly shows the **symmetry between $x$ and $\theta$** (it is the mutual information $I(\theta;x)$) and its **invariance under one-to-one reparameterization of $\Theta$**. Lindley notes this expression "occurs in Shannon's theory for the rate of transmission along a channel." (The single-outcome $\mathcal{I}_1(x)-\mathcal{I}_0$ is *not* invariant; the average is.)
^thm-equiv-forms

### The core theorems

> [!theorem] Theorem 1 — Non-negativity (any experiment is informative on average)
> $\mathcal{I}(\mathcal{E}) \ge 0$, with equality **iff** $p(x\mid\theta)$ does not depend on $\theta$ (except on a null set). Proof: a convexity (Jensen) inequality on $x\log x$. **Interpretation:** provided the outcome density varies with $\theta$, the experiment is informative on average — though a *particular surprising* $x$ can reduce information ($\mathcal{I}_1(x)-\mathcal{I}_0<0$ is possible).
^thm1-nonneg

> [!theorem] Theorem 2 — Additivity / chain rule (Lindley 1956, Eqs. 12–13)
> For an experiment yielding $x=(x_1,x_2)$, $\mathcal{I}(\mathcal{E}_1) + \mathcal{I}(\mathcal{E}_2\mid\mathcal{E}_1) = \mathcal{I}(\mathcal{E})$, where $\mathcal{I}(\mathcal{E}_2\mid\mathcal{E}_1)$ is the average information from $x_2$ after $\mathcal{E}_1$ has been performed and $x_1$ observed. This is the **additivity postulate** Shannon required, and underlies the additivity of incremental EIGs in [[Sequential and Adaptive BED|sequential design]].
> **Corollary (sufficiency):** if $x_1$ is *sufficient* for $x$ (Neyman–Fisher), then $\mathcal{I}(\mathcal{E}_1)=\mathcal{I}(\mathcal{E})$ — no information is lost by reducing to a sufficient statistic; an insufficient statistic strictly loses information.
^thm2-additive

> [!theorem] Theorems 3–6 — Diminishing returns and concavity
> - **Thm 3:** for *independent* experiments, $\mathcal{I}(\mathcal{E}_2\mid\mathcal{E}_1)\le\mathcal{I}(\mathcal{E}_2)$ — an independent repeat is *less* informative performed second than first (diminishing marginal utility of equidistributed observations). Hence $\mathcal{I}(\mathcal{E}_1)+\mathcal{I}(\mathcal{E}_2)\ge\mathcal{I}(\mathcal{E})$ for independent experiments.
> - **Thm 4:** for $n$ independent identical repetitions, $j_n := \mathcal{I}(\mathcal{E}^{(n)})$ is a **concave, increasing** function of $n$.
> - **Thm 5:** $\mathcal{I}(\mathcal{E},p(\theta))$ is a **concave** function of the prior $p(\theta)$.
> - **Thm 6:** for a *mixture* experiment (sample from $\lambda p_1+(1-\lambda)p_2$), $\mathcal{I}(\mathcal{E})\le\lambda\mathcal{I}(\mathcal{E}_1)+(1-\lambda)\mathcal{I}(\mathcal{E}_2)$ — **convex** in the outcome densities: it is better to take a fixed sample size than to "mix" sample sizes of the same average.
^thm-concavity

### Comparing experiments without a prior (the partial order)

> [!definition] Definition 4 — "More informative (S)" (Lindley 1956, Eq. 17)
> $\mathcal{E}_1$ is **more informative** than $\mathcal{E}_2$ (written $\mathcal{E}_1 > \mathcal{E}_2$) if $\mathcal{I}(\mathcal{E}_1,p(\theta))\ge\mathcal{I}(\mathcal{E}_2,p(\theta))$ **for all priors** $p(\theta)$, strictly for some. This is a *partial* order: there exist pairs comparable under no single criterion, judgeable only with a specific prior.
^def-more-informative

> [!theorem] Theorem 9 — Relation to Blackwell's ordering
> If $\mathcal{E}_1$ is **sufficient** for $\mathcal{E}_2$ in Blackwell's sense ($\mathcal{E}_1\supset\mathcal{E}_2$ — an experimenter with $\mathcal{E}_1$ can reproduce $\mathcal{E}_2$ by a random device), then $\mathcal{E}_1$ is **not less informative (S)**: $\mathcal{E}_1\ge\mathcal{E}_2$. So **Blackwell's ordering implies Lindley's**, but the **converse is false** (demonstrated by the binomial-dichotomy example, Fig. 1: there are experiments more informative in Lindley's sense that are not Blackwell-comparable). Lindley's ordering is *coarser* — more pairs are comparable — which he views as a "satisfactory feature."
^thm9-blackwell

Lindley contrasts his information ordering with the decision-theoretic comparisons of Blackwell and of Bohnenblust–Shapley–Sherman (loss-function based), arguing that **gaining knowledge about nature is a legitimate purpose of experimentation distinct from reaching decisions**.

### The design principle

> [!quote] The Lindley design rule (§2, §6)
> *"Perform that experiment for which the expected gain in information is the greatest, and continue experimentation until a preassigned amount of information has been attained."*

This is the seed of all of [[Bayesian Experimental Design - Overview|Bayesian optimal experimental design]]: maximize the EIG to choose designs, and use an information threshold as a stopping rule for [[Sequential and Adaptive BED|sequential experiments]].

## Examples

> [!example] Normal experiment — smaller variance is more informative (§6, Eq. 19)
> For $\mathcal{E}(\sigma)$ with $x\sim\mathcal{N}(\theta,\sigma^2)$, Lindley shows $\mathcal{E}(\sigma_1)>\mathcal{E}(\sigma_2)$ when $\sigma_1<\sigma_2$ (smaller-variance experiment more informative for *all* priors), via the stochastic transformation $x_2'=x_1+u$. With a normal prior $\mathcal{N}(\mu,\tau^2)$:
> $$
> \mathcal{I}(\mathcal{E}(\sigma),p_\tau) = \tfrac12\log\!\left(1+\tau^2/\sigma^2\right), \qquad j_n = \tfrac12\log\!\left(1+ n\tau^2/\sigma^2\right).
> $$
> The $n$-sample formula illustrates Theorem 4 (concave, increasing) and, notably, **$j_n$ grows without limit** — contrast with the usual precision measure $n/\sigma^2$.

> [!example] Multivariate normal — the determinant (D-optimality) criterion (§6)
> For $k$-dimensional $x\sim\mathcal{N}(\theta,C)$ with prior $\theta\sim\mathcal{N}(\mu,A)$:
> $$
> \mathcal{I}(\mathcal{E}(C),p_A) = \tfrac12\log\frac{|A+C|}{|C|}.
> $$
> Under near-ignorance ($A^{-1}C$ small), comparison reduces approximately to $|C_2|>|C_1|$ — i.e. **design via the determinant of the dispersion matrix**, the criterion later known as **D-optimality** (Lindley notes the determinant criterion was used by Wald). This is the historical bridge from Lindley's measure to classical [[Information-Theoretic Design Objectives|alphabetic optimality]].

> [!example] Sequential sampling = the Wald SPRT (§6, Eqs. 20–21)
> Stopping when the posterior information first reaches a threshold $\delta$ recovers classical sequential tests. For a binomial dichotomy $\Theta=\{\theta_1,\theta_2\}$, the stopping rule "continue while $1-A<p_n(\theta_1)<A$" is *exactly* a **Wald sequential probability ratio test** of $\theta_1$ vs $\theta_2$:
> $$
> \frac{1-A}{A}\,\frac{p(\theta_2)}{p(\theta_1)} < \frac{p(x_1,\dots,x_n\mid\theta_1)}{p(x_1,\dots,x_n\mid\theta_2)} < \frac{A}{1-A}\,\frac{p(\theta_2)}{p(\theta_1)}.
> $$
> For the normal experiment, the optimum sequential scheme is of **fixed sample size** $n\ge(2\pi e\,\sigma^2\tau^2 - \sigma^2 e^{-2\delta})/(\tau^2 e^{-2\delta})$; for repeated **binomial trials** with a Beta prior family $p_{ab}(\theta)\propto\theta^{a-1}(1-\theta)^{b-1}$ (Eq. 22), the stopping boundary is approximately $(a+b)^3=\lambda ab$ (Fig. 2) — formalizing the "common-sense" intuition that repeatedly observing the *same* outcome (e.g. "the sun rises") accumulates more information than a mixture.

## Connections

- **Originates** the [[Expected Information Gain|EIG]] objective that every modern method ([[Variational BOED - Overview|Foster 2019]], [[Unified SGD BOED - Overview|Foster 2020]], [[Modern Bayesian Experimental Design - Overview|Rainforth 2023]]) estimates and optimizes. The three reviewed papers all cite this as the foundational reference.
- **Theorem 2 (additivity)** is the ancestor of the additive incremental/total EIG in [[Sequential and Adaptive BED]] and [[From Designs to Policies (Deep Adaptive Design)|deep adaptive design]].
- **The determinant criterion** prefigures the Fisher-information/alphabetic-optimality view contrasted in [[Information-Theoretic Design Objectives]].
- **Builds on** Shannon (1948) and the Kullback–Leibler (1951) information; relates to Blackwell's *Comparison of Experiments* (1951–53).

## See Also
- [[Expected Information Gain]] — the modern statement of Lindley's average-information measure
- [[Bayesian Experimental Design - Overview]] — how this foundation flows into the three reviewed papers
- [[Information-Theoretic Design Objectives]] — EIG vs Fisher-information, the determinant-criterion lineage
- [[Sequential and Adaptive BED]] — additivity and information-threshold stopping rules
- [[Decision Analysis]] — the decision-theoretic view Lindley contrasts his information measure against
