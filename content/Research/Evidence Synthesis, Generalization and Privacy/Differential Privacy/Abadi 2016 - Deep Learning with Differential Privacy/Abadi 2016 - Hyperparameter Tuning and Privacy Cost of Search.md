---
title: "Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 3.3 and Appendix D (Theorem D.1), pp. 5-6 and 13-14"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - Moments Accountant Theorems and Proofs]]"
  - "[[Abadi 2016 - DP-SGD Algorithm and Implementation]]"
used_by:
  - "[[Abadi 2016 - MNIST and CIFAR-10 Experiments]]"
aliases:
  - private hyperparameter search
  - Gupta et al Theorem 10.2 use
---

# Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search

> [!summary]
> Trying several hyperparameter settings on private data costs privacy: naively the costs add. Because only the best model is kept, Theorem D.1 (Gupta et al.) shows the search can be done at a total cost near $\varepsilon+8\varepsilon_0$, so about 6,700 settings can be tried on a 10,000-example validation set at $\varepsilon=4$ with at most a 1% accuracy loss. Theory also gives rules of thumb for lot size, learning rate and noise.

## Overview

Section 3.3 identifies the hyperparameters that trade privacy, accuracy and performance. The experiments (Figure 5) show that accuracy depends more on training parameters such as lot size and noise level than on network structure.

## Main Content

**Guidance from theory and experiment.**
- Accuracy is more sensitive to batch (lot) size and noise level than to network topology.
- DP optimization of **convex** objectives is best with batch sizes as small as 1; non-convex learning is less stable and benefits from larger lots. Yet by Theorem 1 making lots too large raises the privacy cost, so a reasonable tradeoff is to take the number of lots per epoch of the same order as the desired number of epochs. (Experiments find the best lot size is about $\sqrt N$.)
- Unlike non-private training, the learning rate need not be decreased to a very small value, because private training never reaches that regime. A small benefit comes from starting large and decaying linearly to a smaller value over a few epochs, then holding constant.
- If several settings are tried, one can add all costs (possibly via the moments accountant), or do better as below.

> [!theorem] Theorem D.1 (Gupta et al., Theorem 10.2)
> Let $\mathcal M$ be an $\varepsilon$-differentially private mechanism such that for a query function $q$ with sensitivity 1 and a parameter $Q$, $\Pr_{r\sim\mathcal M(d)}[q(d,r)\ge Q]\ge p$ for some $p\in(0,1)$. Then for any $\delta>0$ and any $\varepsilon_0\in(0,\tfrac12)$ there is a mechanism $\mathcal M'$ with:
> - $\Pr_{r\sim\mathcal M'(d)}\big[q(d,r)\ge Q-\tfrac{4}{\varepsilon_0}\log\tfrac1{\varepsilon_0\delta p}\big]\ge1-\delta$;
> - $\mathcal M'$ makes $\big(\tfrac1{\varepsilon_0\delta p}\big)^2\log\tfrac1{\varepsilon_0\delta p}$ calls to $\mathcal M$;
> - $\mathcal M'$ is $(\varepsilon+8\varepsilon_0)$-differentially private.
^thm-gupta-d1

**Application to hyperparameter search.** Suppose each of $K$ hyperparameter choices yields a DP mechanism $\mathcal M_i$. Let $\tilde{\mathcal M}$ pick a random choice and run $\mathcal M_i$. Let $q(d,r)$ be the number of validation examples labeled correctly by outcome $r$ and $Q$ a target accuracy. If one setting achieves at least $Q$, $\tilde{\mathcal M}$ meets the preconditions with $p=1/K$, so with high probability the mechanism implied by the theorem achieves accuracy close to $Q$. The proof of Theorem D.1 actually gives the stronger $\max(\varepsilon,8\varepsilon_0)$-DP for this use.

## Examples

> [!example] How many settings can be tried
> Setup: target accuracy 95% on a validation set of size 10,000, so $Q=9{,}500$; take $\varepsilon_0=0.5$ and $\delta=0.05$.
> Solution: the accuracy loss in counts is $\tfrac4{\varepsilon_0}\ln\tfrac1{\varepsilon_0\delta p}=8\ln\tfrac{40}{p}$. A 1% loss is 100 counts, so we need $100>8\ln(40/p)$, i.e. $\ln(40/p)<12.5$, i.e. $p>40/e^{12.5}\approx1/6{,}700$. With $\varepsilon_0=0.5$ the extra privacy cost is $8\varepsilon_0=4$, hence "one can try 6,700 different parameter settings at privacy cost $\varepsilon=4$ for the validation set."
> Interpretation: the bound is generous in the number of candidates because the cost is logarithmic in $K=1/p$, but it is a worst-case bound and the privacy cost of 4 is not small. In the paper's experiments no more than about 100 settings were tried and the actual $p$ is much larger than $1/K$, so a smaller $\varepsilon_0$ should suffice.
^ex-hparam-6700

```python
import numpy as np
eps0, delta = 0.5, 0.05
loss_budget = 100                       # 1% of 10,000 validation examples
# need loss_budget > (4/eps0) * ln(1/(eps0*delta*p))
p_min = 1.0 / (eps0 * delta) / np.exp(loss_budget * eps0 / 4)
print(p_min, 1.0 / p_min)               # about 1.49e-4  ->  1/p ~ 6,700
print("extra privacy cost 8*eps0 =", 8 * eps0)
```

## Connections

- Tuning that peeks at private data leaks information; the same logic appears in the census paper, where the TDA was deliberately tuned on 2010 data and not on the 2020 data it protects: [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]].
- Selecting the best of many fitted models and reporting it is a multiplicity problem even without privacy: [[Model Selection and Overfitting]].
- Marketing relevance: tuning an MMM or a conversion-prediction model on user-level private data consumes privacy budget just like training does; see [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]].

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Abadi 2016 - MNIST and CIFAR-10 Experiments]]
