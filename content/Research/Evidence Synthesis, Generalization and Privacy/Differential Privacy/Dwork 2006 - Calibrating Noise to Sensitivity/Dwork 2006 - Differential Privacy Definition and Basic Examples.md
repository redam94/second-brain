---
title: "Dwork 2006 - Differential Privacy Definition and Basic Examples"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 2 (Definitions), Def. 2.1-2.3, Remark 2.1, Examples 1-3, pp. 23-27"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Motivation, Contributions and Related Work]]"
used_by:
  - "[[Dwork 2006 - Postprocessing, Composition and Group Privacy]]"
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
  - "[[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]"
aliases:
  - epsilon-differential privacy definition (DMNS 2006)
  - epsilon-indistinguishability
  - Randomized response with epsilon (DMNS 2006)
---

# Dwork 2006 - Differential Privacy Definition and Basic Examples

> [!summary]
> A mechanism is $\varepsilon$-differentially private if its output distribution changes by at most a factor $e^{\varepsilon}$ when one individual's data is added, removed or changed. Randomized response and Laplace-noised counts are the two canonical examples: both are $\varepsilon$-DP, but the Laplace count has error $O(1/\varepsilon)$ while randomized response has error $\Theta(\sqrt n/\varepsilon)$. Statistical (total-variation) closeness is not a substitute, as Example 3 shows.

## Overview

The paper models an interaction between a database access protocol $\mathcal{M}$ run on a static dataset $x$ and a computationally unbounded, probabilistic adversary $\mathcal{A}$. $\mathrm{View}_{\mathcal{M},\mathcal{A}}(x)$ is the list of messages exchanged plus the adversary's internal state and random choices; randomness comes from the coins of $\mathcal{M}$ and $\mathcal{A}$. For non-interactive schemes there is no dependence on $\mathcal{A}$ and one writes $\mathcal{M}(x)$.

## Main Content

### Data model and neighbours

> [!definition] Dataset, set-difference metric, neighbours (p. 23)
> A dataset is a finite multiset over a domain $D$ (typically $\{0,1\}^d$ or $\mathbb{R}^d$), represented as a histogram vector $x\in\mathbb{N}^{|D|}$ whose $i$-th entry counts occurrences of the $i$-th element of $D$. The distance is $d_{\triangle}(x,x')=\|x-x'\|_1$ (size of the symmetric difference). Datasets are **neighbours** (adjacent) if $d_{\triangle}(x,x')=1$.
^def-dataset-neighbors

> [!example] Remark 2.1 - Hamming vs set difference (p. 24)
> The preliminary version used vectors of known length $n$ and Hamming distance $d_H$. Embed ordered lists as sets $x=\{(1,\tilde x_1),\dots,(n,\tilde x_n)\}\subset[n]\times D$. Two such sets differing in one row have $d_{\triangle}=2$, so an $\varepsilon$-DP mechanism under set difference is $2\varepsilon$-DP under Hamming: $\Pr[\mathcal{M}(x)\in S]\le e^{2\varepsilon}\Pr[\mathcal{M}(x')\in S]$. Results extend to Hamming with "only minor changes", with "subtly different interpretations".
^ex-hamming-factor-two

### The definition

> [!definition] Definition 2.1 - $\varepsilon$-differential privacy (non-interactive; p. 23)
> A randomized function $\mathcal{M}:\mathbb{N}^{D}\times\Omega\to O$ is **$\varepsilon$-differentially private** if for all neighbouring datasets $x,x'$ and for all measurable events $S\subseteq O$,
> $$
> \Pr(\mathcal{M}(x)\in S)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S).\tag{1}
> $$
> The probability is over the coin flips of $\mathcal{M}$. $\varepsilon$ is a bound on the **privacy loss** and is "a parameter chosen by policy".
^def-eps-dp

Consequences the paper states (pp. 24-25):

- **Multiplicative, not additive.** One can have two distributions at arbitrarily small statistical distance whose ratio $\Pr(\mathcal{M}(x)\in S)/\Pr(\mathcal{M}(x')\in S)$ is infinite (a point where one assigns probability zero).
- **Worst case over pairs, randomness only in $\mathcal{M}$.** Except for constant mechanisms, deterministic mechanisms cannot be differentially private.
- **Singleton events suffice** in the usual cases: for discrete $O$ it suffices that $\Pr(\mathcal{M}(x)=t)\le e^{\varepsilon}\Pr(\mathcal{M}(x')=t)$ for all $t$; for continuous $O$ with density $p_x$ it suffices that $p_x(t)\le e^{\varepsilon}p_{x'}(t)$ for all $t$.
- **Multiplicative distance.** DP says $\mathcal{M}(x)$ and $\mathcal{M}(x')$ are close in the metric $\sup_{S}\left|\ln\frac{p(S)}{q(S)}\right|=\inf\{\varepsilon: p(S)\le e^{\varepsilon}q(S)\text{ and }q(S)\le e^{\varepsilon}p(S)\ \forall S\}$. Write $A\approx_{\varepsilon}B$ if the distributions of random variables $A,B$ are within multiplicative distance $\varepsilon$. The logarithm makes the triangle inequality usable.

> [!definition] Definition 2.3 - $\varepsilon$-DP for interactive mechanisms (p. 27)
> An interactive mechanism $\mathcal{M}$ is $\varepsilon$-differentially private if for all neighbouring $x,x'$, **all adversaries $\mathcal{A}$**, and all measurable sets $S$ of views,
> $$
> \Pr(\mathrm{View}_{\mathcal{M},\mathcal{A}}(x)\in S)\le e^{\varepsilon}\Pr(\mathrm{View}_{\mathcal{M},\mathcal{A}}(x')\in S).\tag{2}
> $$
> Usually one does not need this: designing each round as a non-interactive $\varepsilon_i$-DP mechanism and using the composition lemma suffices.
^def-eps-dp-interactive

### Example 1 - randomized response

> [!example] Example 1 (Warner 1965), pp. 25-26
> **Setup.** $n$ known individuals, each with a secret bit $x_i\in\{0,1\}$ (for example, engages in an embarrassing activity). Neighbours differ in one person's bit. For $b\in\{0,1\}$ let $R(b)$ be a Bernoulli variable with $\Pr(R(b)=b)=\dfrac{e^{\varepsilon}}{e^{\varepsilon}+1}$ and $\Pr(R(b)=1-b)=\dfrac{1}{e^{\varepsilon}+1}$. Mechanism: $\mathcal{M}(x_1,\dots,x_n)=(R(x_1),\dots,R(x_n))$.
>
> **Privacy.** For neighbours differing in entry $i$ and output $y$, $\frac{\Pr(\mathcal{M}(x)=y)}{\Pr(\mathcal{M}(x')=y)}=\frac{\Pr(R(x_i)=y_i)}{\Pr(R(x_i')=y_i)}\in e^{\pm\varepsilon}$, since all other coordinates cancel.
>
> **Estimator.** $g(y)=\sum_i\dfrac{(e^{\varepsilon}+1)y_i-1}{e^{\varepsilon}-1}$ is unbiased for the number of 1's, with standard deviation $\Theta(\sqrt n/\varepsilon)$ as $n\to\infty$, $\varepsilon\to0$. It supports estimating proportions of 1's in *any* subset of individuals "with no further privacy loss".
^ex-randomized-response

> [!proof]- Derivation of the estimator's variance (derived here)
> Let $q=e^{\varepsilon}/(e^{\varepsilon}+1)$. Then $E[y_i\mid x_i]=q x_i+(1-q)(1-x_i)=(1-q)+(2q-1)x_i$ with $2q-1=\frac{e^{\varepsilon}-1}{e^{\varepsilon}+1}$ and $1-q=\frac{1}{e^{\varepsilon}+1}$, so $E\left[\frac{(e^{\varepsilon}+1)y_i-1}{e^{\varepsilon}-1}\mid x_i\right]=\frac{1+(e^{\varepsilon}-1)x_i-1}{e^{\varepsilon}-1}=x_i$ (unbiased). Conditional on $x$, $\mathrm{Var}(y_i)=q(1-q)=\frac{e^{\varepsilon}}{(e^{\varepsilon}+1)^2}$, so each term has variance $\frac{(e^{\varepsilon}+1)^2}{(e^{\varepsilon}-1)^2}\cdot\frac{e^{\varepsilon}}{(e^{\varepsilon}+1)^2}=\frac{e^{\varepsilon}}{(e^{\varepsilon}-1)^2}\approx\frac{1}{\varepsilon^2}$ for small $\varepsilon$. Summing $n$ independent terms: $\mathrm{sd}=\sqrt n\,e^{\varepsilon/2}/(e^{\varepsilon}-1)\approx\sqrt n/\varepsilon$.

### Example 2 - Laplace noise on a count

> [!definition] Definition 2.2 - Laplace distribution (p. 25)
> $\mathrm{Lap}(\lambda)$ has density $h(y)=\frac{1}{2\lambda}\exp(-|y|/\lambda)$, mean $0$ and standard deviation $\sqrt2\lambda$. (The later Definition 3.2 in the same paper prints the exponent as $e^{-\lambda|x|}$, a typographical slip for $e^{-|y|/\lambda}$, as the mean/sd and the proofs show.)
^def-laplace-dist

> [!example] Example 2 - noisy count (p. 25)
> **Setup.** $D=\{0,1\}$, $f(x)=x(1)$ is the number of 1's, using the histogram representation, so neighbours satisfy $\|x-x'\|_1=1$. **Mechanism.** $\mathcal{M}(x)=f(x)+Y$, $Y\sim\mathrm{Lap}(1/\varepsilon)$.
>
> **Privacy.** For any reals $y,y'$, $h(y)/h(y')\le e^{|y-y'|/\lambda}$. Since $f(x),f(x')$ differ by at most one, the ratio of densities at $t$ is $\frac{h(t-f(x))}{h(t-f(x'))}\le e^{\varepsilon|f(x)-f(x')|}\le e^{\varepsilon}$.
>
> **Utility.** Noise magnitude is about $1/\varepsilon$ **independent of $n$**, a factor roughly $\sqrt n$ smaller than randomized response in Example 1. The same mechanism releases the total count $x(0)+x(1)$.
^ex-laplace-count

The paper's moral: "for a given goal, there may be several differentially private algorithms with the same privacy parameter and different levels of success". For fixed $\varepsilon$ the definition specifies a *set of acceptable algorithms*.

### Why non-negligible leakage, and why the multiplicative measure

In Example 2, to get a reasonable approximation of $f(x)$ one needs $\varepsilon$ at least about $1/\|x\|$ ($\|x\|$ = number of entries). That is large by cryptographic standards, where leakage should fall faster than any polynomial. But it is *necessary*: if neighbouring databases induce distributions at distance $\varepsilon\ll1/\|x\|$, then any two databases of size $\|x\|$ induce distributions at distance at most $\varepsilon\|x\|$ (triangle inequality along a chain), close to zero, so "no statistic about the database can be usefully approximated".

> [!example] Example 3 - why total variation is not enough (p. 26)
> **Setup.** Each entry includes identifying information making it unique (name or SSN). Candidate "sanitization" $\mathcal{M}$: independently output each element of $x$ with probability $\varepsilon$ (a subsample).
>
> **Statistical difference.** If $x,x'$ differ in a single position, the statistical difference between $\mathcal{M}(x)$ and $\mathcal{M}(x')$ is exactly $\varepsilon$ (the probability the one differing element appears), identical otherwise.
>
> **Yet it leaks.** About an $\varepsilon$ fraction of individuals is revealed in full; when $\varepsilon\ge1/\|x\|$ the expected size of the released set is at least 1.
>
> **DP status.** Not $\varepsilon'$-DP for *any* finite $\varepsilon'$: if $x'=x\cup\{x_0\}$, the event "output includes $x_0$" has probability $0$ under $x$ and $\varepsilon$ under $x'$. The authors find unpalatable "a 'lottery' philosophy that sacrifices a small number of individuals on every invocation."
^ex-total-variation-fails

## Examples

Numerical check of Examples 1 and 2 (own code; the paper has no tables):

```python
import numpy as np
rng = np.random.default_rng(0)
n, p, eps = 100_000, 0.3, 1.0
x = rng.random(n) < p                      # secret bits

# Example 1: eps-randomized response, unbiased estimator of sum(x)
q = np.exp(eps) / (np.exp(eps) + 1)
y = np.where(rng.random(n) < q, x, ~x)
est_rr = (((np.exp(eps) + 1) * y - 1) / (np.exp(eps) - 1)).sum()
sd_rr = np.sqrt(n) * np.exp(eps / 2) / (np.exp(eps) - 1)   # conditional sd, derived above

# Example 2: Laplace(1/eps) on the count
est_lap = x.sum() + rng.laplace(0, 1 / eps)

print(est_rr, est_lap, x.sum(), "RR sd ~", round(sd_rr), "Laplace sd ~", round(np.sqrt(2) / eps, 2))
```

With $\varepsilon=1$, $n=10^5$ the randomized-response standard deviation is about $\sqrt n\,e^{0.5}/(e-1)\approx 303$ people while the Laplace count has sd $\sqrt2\approx1.4$: a factor of about 200 apart, matching the paper's "$\sqrt n$" claim (up to constants). Local randomization needs no trusted curator; that is its price.

## Connections

- The trust-model distinction here (curator-held vs randomize-before-collection) is the same as the difference between a clean-room aggregate report and on-device noising in privacy-preserving measurement. Local noise costs $\sqrt n$ more error, which matters when a lift study is small. See [[Conversion Lift Studies on Ad Platforms]].
- The "$\varepsilon\gtrsim1/n$ for any utility" argument is the formal reason tiny cells (small geos, rare conversions) cannot be reported privately and accurately at once; compare [[Geo-Experiment Design and Power Analysis]].

## See Also

- [[Dwork 2006 - Postprocessing, Composition and Group Privacy]]
- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
- [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] ($(\varepsilon,\delta)$ generalisation and the histogram-based textbook definition)
- [[Dwork Roth 2014 - Randomized Response]]
