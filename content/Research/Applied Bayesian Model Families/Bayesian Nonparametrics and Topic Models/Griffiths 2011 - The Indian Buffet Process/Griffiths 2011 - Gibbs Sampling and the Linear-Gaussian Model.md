---
title: "Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Sec. 4.7 and Sec. 5 (Eqs. 17-26, Figs 7-9), pp. 1202-1211"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - The Indian Buffet Process and Its Properties]]"
used_by:
  - "[[Griffiths 2011 - Applications of the IBP]]"
aliases:
  - "IBP Gibbs sampler"
  - "linear-Gaussian binary feature model"
  - "infinite linear-Gaussian model"
---

# Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model

> [!summary]
> Gibbs sampling under the IBP uses $P(z_{ik}=1\mid z_{-i,k})=m_{-i,k}/N$ for used features plus $\text{Poisson}(\alpha/N)$ new features. In the linear-Gaussian model $X=ZA+\varepsilon$ the loadings integrate out, giving a closed marginal likelihood that depends only on the $K_+$ used columns of $Z$.

## Main Content
**Prior conditionals (4.7).** Finite model: $P(z_{ik}=1\mid z_{-i,k})=\dfrac{m_{-i,k}+\alpha/K}{N+\alpha/K}$ (Eq. 17). Infinite case, taking customer $i$ as last: $P(z_{ik}=1\mid z_{-i,k})=m_{-i,k}/N$ for $m_{-i,k}>0$ (Eq. 18), and the number of new features for object $i$ is $\text{Poisson}(\alpha/N)$. Algorithm: iterate over rows; for each column with $m_{-i,k}>0$ resample $z_{ik}$; delete columns with $m_{-i,k}=0$; append $\text{Poisson}(\alpha/N)$ new columns with ones in row $i$. For posterior sampling multiply by the likelihood $p(X\mid Z)$ (parameters integrated out), but footnote 5 notes this is a heuristic rather than a valid MCMC kernel, because the order of updates depends on the chain state. The remedies are in Meeds et al. (2007) and Teh et al. (2007).

> [!definition] Finite linear-Gaussian model (Sec. 5.1, Eqs. 19-20)
> $x_i\mid z_i,A\sim\text{N}(z_iA,\sigma_X^2I)$, i.e. $X=ZA+E$ with $A$ a $K\times D$ weight matrix and prior $A_{kd}\sim\text{N}(0,\sigma_A^2)$.

^def-linear-gaussian-binary

> [!theorem] Marginal likelihood (Eq. 21) and infinite limit (Eq. 26)
> With $M=(Z^TZ+\frac{\sigma_X^2}{\sigma_A^2}I)^{-1}$,
> $$
> p(X\mid Z,\sigma_X,\sigma_A)=\frac{\exp\{-\frac{1}{2\sigma_X^2}\text{tr}(X^T(I-ZMZ^T)X)\}}{(2\pi)^{ND/2}\sigma_X^{(N-K)D}\sigma_A^{KD}\,|Z^TZ+\frac{\sigma_X^2}{\sigma_A^2}I|^{D/2}}.
> $$
> For $Z=[Z_+\ Z_0]$ the $K_0$ empty columns drop out: the infinite-model likelihood equals the finite model on the $K_+$ used columns (Eq. 26).

^thm-lg-marginal

Efficient updates use rank-one inverse updates: $M_{-i}=M-\frac{Mz_i^Tz_iM}{z_iMz_i^T-1}$ and $M=M_{-i}-\frac{M_{-i}z_i^Tz_iM_{-i}}{z_iM_{-i}z_i^T+1}$ (Eqs. 23-24). New-feature counts are handled by truncation. Posterior mean weights: $E[A\mid X,Z]=(Z^TZ+\frac{\sigma_X^2}{\sigma_A^2}I)^{-1}Z^TX$.

**Demonstrations (5.3).**
- *Synthetic 6x6 images* (Fig. 8): 100 images from binary combinations of 4 feature images (weights 1.0, $\sigma_X=0.5$, $\sigma_A=1.0$, start $K_+=1$): the sampler discovered 4 features within 200 iterations; true $K_+=4$.
- *Photographs* (Fig. 9): 100 images (240x320) of up to four objects (a $20 bill, a Klein bottle, a handaxe, a cellphone), each image represented by mean plus 99 principal components; $\sigma_A,\sigma_X,\alpha$ initialised at 0.5, 1.7, 1 and sampled with Metropolis steps; stabilised after about 100 of 1000 iterations at about seven features; the four most frequent features indicated presence of the $20 bill and absence of the other three objects; three rarer features coded small location shifts.

## Examples
> [!example] Verify the closed-form marginal
> Check numerically that Eq. 21 equals the Gaussian density of each column of $X$ under covariance $\sigma_A^2ZZ^T+\sigma_X^2I$.

^ex-lg-marginal-check

```python
import numpy as np
from scipy.stats import multivariate_normal as mvn
rng = np.random.default_rng(1)
N, K, D, sx, sa = 8, 3, 4, 0.5, 1.0
Z = rng.integers(0, 2, (N, K)); A = rng.normal(0, sa, (K, D))
X = Z @ A + rng.normal(0, sx, (N, D))

def loglik(X, Z, sx, sa):
    N, D = X.shape; K = Z.shape[1]
    G = Z.T @ Z + (sx**2 / sa**2) * np.eye(K)
    t = np.trace(X.T @ (np.eye(N) - Z @ np.linalg.inv(G) @ Z.T) @ X)
    return (-0.5*N*D*np.log(2*np.pi) - (N-K)*D*np.log(sx) - K*D*np.log(sa)
            - 0.5*D*np.linalg.slogdet(G)[1] - t/(2*sx**2))

direct = sum(mvn(np.zeros(N), sa**2*Z@Z.T + sx**2*np.eye(N)).logpdf(X[:, d]) for d in range(D))
print(loglik(X, Z, sx, sa), direct)   # identical (-33.777...)
```

## PyMC-style sketch (untested)
```python
# Practical approach in PyMC (E31): finite approximation with a large K and
# pi_k ~ Beta(alpha/K, 1), Z_ik ~ Bernoulli(pi_k) marginalised/enumerated via a custom
# collapsed Gibbs step, since NUTS cannot sample Z. Summaries must be label-free:
# number of active features K+, co-possession matrix Z Z^T, reconstruction ZA.
```

## Connections
Mean-field VI for the IBP (Doshi-Velez et al. 2009) and accelerated sampling are summarised in [[Griffiths 2011 - Applications of the IBP]]. Continuous analogue: [[Factor Analysis and PPCA]]. MCMC background: [[MCMC Basics]], [[Efficient MCMC]].

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]]
