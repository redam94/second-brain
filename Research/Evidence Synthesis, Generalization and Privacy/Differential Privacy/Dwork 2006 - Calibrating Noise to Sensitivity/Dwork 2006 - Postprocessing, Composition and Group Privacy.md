---
title: "Dwork 2006 - Postprocessing, Composition and Group Privacy"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 2.1 Fundamental Properties (Prop. 2.4, Lemmas 2.5, 2.6, Def. 2.7, Lemma 2.8) pp. 27-29; Sec. 2.2 Bibliographic Notes and Discussion pp. 29-31"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
used_by:
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
  - "[[Dwork 2006 - Low-Sensitivity Functions and Applications]]"
aliases:
  - Closure under postprocessing (DMNS 2006)
  - Simple composition lemma (DMNS 2006)
  - Group privacy lemma (DMNS 2006)
---

# Dwork 2006 - Postprocessing, Composition and Group Privacy

> [!summary]
> Three structural properties of $\varepsilon$-DP: anything computed from a private output (without more access to the data) is still $\varepsilon$-DP; privacy losses add under (adaptive) composition up to a budget; and $(1,\varepsilon/k)$-DP implies $(k,\varepsilon)$-DP for groups of size $k$. Section 2.2 collects interpretations (immunity to auxiliary information, hypothesis-testing, game-theoretic, utility) and variants such as $(\varepsilon,\delta)$-DP.

## Overview

These properties are what make DP *programmable*: complex analyses are built from private primitives. The paper notes (Sec. 2.2) that postprocessing and composition "did not appear in the initial version, although they were known at the time and have since become folklore". The notation is for non-interactive mechanisms, but "the discussion applies equally well to the interactive case".

## Main Content

### Immunity to auxiliary information

Differential privacy "makes no reference to an input distribution, and it makes sense regardless of what other information the adversary has - or will have in the future - about the data set."

### Postprocessing

> [!theorem] Proposition 2.4 - Closure under postprocessing (p. 27)
> Let $g$ be a randomized function. If $\mathcal{M}$ is an $\varepsilon$-differentially private mechanism, then $\mathcal{M}'=g\circ\mathcal{M}$ is $\varepsilon$-differentially private.
^thm-postprocessing

> [!proof]- Proof (p. 27)
> Fix an event $S$ in the output space of $g$ and neighbouring $x,x'$. Write $g(z)=\tilde g(z;R)$ with $\tilde g$ deterministic and $R$ the randomness of $g$. Then $\Pr(g(\mathcal{M}(x))\in S)=\Pr((\mathcal{M}(x),R)\in\tilde g^{-1}(S))$. For each value $r$ of $R$, let $S_r=\{s:(s,r)\in\tilde g^{-1}(S)\}$. By DP of $\mathcal{M}$, $\Pr(\mathcal{M}(x)\in S_r)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S_r)$, hence $\Pr(\tilde g(\mathcal{M}(x),R)\in S\mid R=r)\le e^{\varepsilon}\Pr(\tilde g(\mathcal{M}(x'),R)\in S\mid R=r)$. Average over $R$ (independent of the data) to conclude.

### Composition

> [!theorem] Lemma 2.5 - Simple composition (p. 28)
> Let $\mathcal{M}_1,\dots,\mathcal{M}_k$ be a fixed sequence of mechanisms, $\mathcal{M}_i$ being $\varepsilon_i$-DP. Their joint output $\mathcal{M}(x)=(\mathcal{M}_1(x),\dots,\mathcal{M}_k(x))$ is $\varepsilon$-DP for $\varepsilon=\sum_{i=1}^k\varepsilon_i$. (Independent randomness per mechanism.)
^thm-simple-composition

The paper remarks that this holds even when later mechanisms are chosen adaptively. The formal adaptive model: at round $i=1,\dots,k$ ($k$ finite but not fixed in advance) the analyst specifies a positive number $\varepsilon_i$ and an $\varepsilon_i$-DP mechanism $\mathcal{M}_i$; the curator returns $a_i\leftarrow\mathcal{M}_i(x)$. The transcript is the sequence of triples $(\varepsilon_i,\mathcal{M}_i,a_i)$.

> [!theorem] Lemma 2.6 - Adaptive composition with a budget (p. 28)
> Suppose the curator $\mathcal{M}$ stops answering in the first round $j$ where $\sum_{i=1}^{j}\varepsilon_i>\varepsilon$, so that $\sum_i\varepsilon_i\le\varepsilon$ for all answered rounds. Then $\mathcal{M}$ is $\varepsilon$-differentially private.
^thm-adaptive-composition

> [!proof]- Proof (pp. 28-29; $k=2$, discrete $O$)
> Fix neighbours $x,x'$ and the analyst's coins (or take a deterministic analyst). Let $\mathcal{M}_1$ be the first mechanism chosen. The second depends on the first output $a$: call it $\mathcal{M}_2^{(a)}$ with privacy loss $\varepsilon_2^{(a)}$. For an event $S\subseteq O\times O$ let $S_a=\{s:(a,s)\in S\}$. Then
> $$\Pr(\mathcal{M}(x)\in S)=\sum_{a\in O}\Pr(\mathcal{M}_1(x)=a)\Pr(\mathcal{M}_2^{(a)}(x)\in S_a).$$
> DP of $\mathcal{M}_1$ and of each $\mathcal{M}_2^{(a)}$ bounds each factor by $e^{\varepsilon_1}$ and $e^{\varepsilon_2^{(a)}}$ times the corresponding factor at $x'$. Since $\varepsilon_1+\varepsilon_2^{(a)}\le\varepsilon$ for all $a$ (budget rule), $\Pr(\mathcal{M}(x)\in S)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S)$. Induction extends to all finite $k$. The decision to stop is not disclosive, since it depends only on the $\varepsilon_i$ values, which the analyst chose.

Two consequences stated in the paper: (i) DP algorithms can be built modularly (an interactive protocol is DP if each round is; later rounds may depend on earlier outputs); (ii) running DP mechanisms on *different* datasets still composes for individuals appearing in several, e.g. two hospitals with overlapping patients running $\varepsilon$-DP algorithms produce a joint output that is $2\varepsilon$-DP. "Many natural approaches to defining privacy do not yield composable definitions."

### Group privacy

> [!definition] Definition 2.7 - $(k,\varepsilon)$-differential privacy (p. 29)
> $\mathcal{M}$ is $(k,\varepsilon)$-DP if for all pairs $x,x'$ with $d_{\triangle}(x,x')\le k$, all adversaries and all events $S$: $\Pr(\mathcal{M}(x)\in S)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S)$. One says "$\varepsilon$-DP for groups of size $k$".
^def-group-privacy

> [!theorem] Lemma 2.8 - Group privacy (p. 29)
> Every $(1,\varepsilon/k)$-DP mechanism is also $(k,\varepsilon)$-DP.
^thm-group-privacy

> [!proof]- Proof (p. 29)
> Take a chain of at most $k$ databases connecting $x$ to $x'$, changing one entry at a time. The probability of any event changes by a factor $\exp(\pm\varepsilon/k)$ per step, so $\frac{\Pr(\mathcal{M}(x)\in S)}{\Pr(\mathcal{M}(x')\in S)}\in\exp(\pm\varepsilon/k)^k=\exp(\pm\varepsilon)$.

### Interpretations and variants (Sec. 2.2, pp. 29-31)

- **History.** Originally called *indistinguishability*; "differential privacy" was suggested by Michael Schroeder and first used in Dwork (2006). Failures to compose in other approaches: Ganta et al. (2008). Stronger composition for relaxations: Dwork-Rothblum-Vadhan (2010), Dwork-Rothblum (2016), Bun-Steinke (2016).
- **Semantic-privacy / prior-vs-posterior.** The paper's definition of semantic privacy bounds a Bayesian adversary's posterior relative to its prior under assumptions on the prior's form; such assumptions are known to be necessary (Dwork 2006; Dwork-Naor 2010; Kifer-Machanavajjhala 2011).
- **Game-theoretic (McSherry-Talwar 2007).** If individual $i$ has nonnegative utility $u_i:O\to\mathbb{R}_{\ge0}$ over outcomes, then for neighbours differing in $i$'s data: $E[u_i(\mathcal{M}(x))]\le e^{\varepsilon}E[u_i(\mathcal{M}(x'))]$ and $\ge e^{-\varepsilon}E[u_i(\mathcal{M}(x'))]$, so there is little incentive to misreport.
- **Hypothesis-testing (Wasserman-Zhou 2010).** Fix an $\varepsilon$-DP mechanism, an i.i.d. data distribution, an index $i$ and disjoint sets $S,T$ of possible values of $x_i$. Any test of $H_1:x_i\in S$ versus $x_i\in T$ based on $\mathcal{M}(x)$ and full knowledge of the product distribution and mechanism satisfies
  $$1-\beta\le e^{\varepsilon}\alpha,\tag{3}$$
  with $\alpha$ the significance level and $1-\beta$ the power. "The test rejects the hypothesis with approximately the same probability regardless of whether the hypothesis is true." Proved in [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]].
- **Variants.** $(\varepsilon,\delta)$-DP (first stated in Dwork et al. 2006a) adds $+\delta$ to inequality (1); when $\delta\ll1/n$ it has semantics similar to $\varepsilon$-DP (Kasiviswanathan-Smith 2008). Other variants incorporate graphs, dependencies among records, adversarial uncertainty, computation, and better composition.

## Examples

**Two hospitals (p. 28).** Hospital 1 runs $\varepsilon$-DP $\mathcal{M}_1$ on its patients, hospital 2 runs $\varepsilon$-DP $\mathcal{M}_2$ on its own. View both as operating on parts of one combined dataset; a patient in both is protected at level $2\varepsilon$ by Lemma 2.5.

**Group of size 3.** If a household of 3 shares a survey and each query is $(1,\varepsilon/3)$-DP, Lemma 2.8 gives $(3,\varepsilon)$: the household as a whole is protected at level $\varepsilon$. Equivalently an $\varepsilon$-DP mechanism protects a group of $k$ only at $k\varepsilon$.

```python
# Budgeted adaptive curator (Lemma 2.6): refuse once total epsilon would exceed budget
import numpy as np
class Curator:
    def __init__(self, data, budget, rng=None):
        self.x, self.budget, self.spent = np.asarray(data), budget, 0.0
        self.rng = rng or np.random.default_rng(0)
    def count(self, predicate, eps):
        if self.spent + eps > self.budget:
            return None                       # refusal depends only on eps's, so it is not disclosive
        self.spent += eps
        return predicate(self.x).sum() + self.rng.laplace(0, 1/eps)   # sensitivity 1
c = Curator(np.arange(1000), budget=1.0)
print(c.count(lambda v: v < 500, 0.4), c.count(lambda v: v < 100, 0.4), c.count(lambda v: v > 900, 0.4))  # third is None
```

## Connections

- In measurement terms, the budget rule is the formal version of "each additional report on the same users spends privacy": repeated breakdowns of the same conversion data (by channel, geo, week) are compositions, and the total $\varepsilon$ is the sum unless advanced composition is used ([[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]).
- Postprocessing is why a modeller may fit an MMM or lift model *to* a DP-released table without extra privacy cost, provided the model never touches the raw data again. See [[Bayesian Media Mix Modeling - Overview]].

## See Also

- [[Dwork 2006 - Differential Privacy Definition and Basic Examples]]
- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
- [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]
- [[Dwork Roth 2014 - Basic Composition and Divergence Tools]]
