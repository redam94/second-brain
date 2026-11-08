---
title: "De Blasi 2015 - Species Sampling and Unseen Species Prediction"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Sec. 4 (4.1-4.2, Eqs. 28-43, Table 2, Fig. 5), pp. 19-29"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]]"
  - "[[De Blasi 2015 - EPPF and Predictive Structure]]"
used_by:
  - "[[De Blasi 2015 - Consistency, Dependent Processes and Conclusions]]"
aliases:
  - "unseen species estimation"
  - "Good-Turing Bayesian nonparametric"
  - "species variety estimators"
  - "discovery probability"
---

# De Blasi 2015 - Species Sampling and Unseen Species Prediction

> [!summary]
> Given a sample with $k$ distinct species, Gibbs-type priors give the exact law of the number $K_m^{(n)}$ of new species in $m$ further draws, estimators of rare-species variety and of discovery probabilities. For PY they are explicit; the frequentist Good-Toulmin estimator becomes unstable once $m>n$, the Bayesian PY estimator does not.

## Main Content
**Data summaries.** $K_n$ distinct species, frequencies $N_n=(N_{1,n},\dots,N_{K_n,n})$, or frequency counts $M_n=(M_{1,n},\dots,M_{n,n})$ with $M_{i,n}$ = number of species seen exactly $i$ times; $\sum_iN_i=n$, $\sum_iM_i=K_n$, $\sum_iiM_i=n$. Targets: overall species variety $K_m^{(n)}=K_{n+m}-K_n$; rare species variety $\hat M_m^{(n)}(\tau)=\sum_{i=1}^\tau E(M_{i,n+m}\mid X_{1:n})$ (Eq. 28); local discovery probabilities $U_{n+m,i}=P(X_{n+m+1}\in\Delta_{i,n+m}\mid X_{1:n})$ (Eq. 29), $\Delta_{i,n+m}$ the labels with frequency $i$ in the enlarged sample ($i=0$: new species).

**Frequentist benchmarks.** Turing: $\check U_{n,i}=(i+1)M_{i+1,n}/n$ (Eq. 30), so $\check U_{n,0}=M_{1,n}/n$ and coverage $1-M_{1,n}/n$. Good-Toulmin: $\check U_{n+m,0}=n^{-1}\sum_{i\ge1}(-\lambda)^{i-1}iM_{i,n}$, $\check K_m^{(n)}=\sum_{i\ge1}(-1)^{i-1}\lambda^iM_{i,n}$ with $\lambda=m/n$ (Eq. 31); alternating sums give inadmissible values for $m>n$ roughly.

> [!theorem] Law of new species under Gibbs-type priors (Eq. 32)
> $$P\big(K_m^{(n)}=j\mid X_{1:n}\big)=\frac{V_{n+m,k+j}}{V_{n,k}}\frac{\mathscr C(m,j;\sigma,-n+k\sigma)}{\sigma^j},$$
> with the non-central generalised factorial coefficient $\mathscr C(m,j;\sigma,-n+k\sigma)=\frac1{j!}\sum_{r=0}^j(-1)^r\binom jr\big(n-\sigma(r+k)\big)_m$. So $K_n$ is sufficient for predicting the number of new species.

^thm-new-species-law

> [!theorem] Pitman-Yor estimators (Eqs. 34-35, 39, 42-43)
> PY$(\sigma,\theta)$: $P(K_m^{(n)}=j\mid K_n=k)=\frac{(\theta/\sigma+k)_j}{(\theta+n)_m}\mathscr C(m,j;\sigma,-n+k\sigma)$; squared-loss estimator of overall variety
> $$\hat K_m^{(n)}=\Big(k+\frac\theta\sigma\Big)\Big[\frac{(\theta+n+\sigma)_m}{(\theta+n)_m}-1\Big];$$
> Bayesian Turing analogue $\hat U_{n,i}=\dfrac{i-\sigma}{\theta+n}M_{i,n}$ ($i\ge1$) and new-species discovery probability at step $n+m+1$
> $$\hat U_{n+m,0}=\frac{\theta+k\sigma}{\theta+n}\,\frac{(\theta+n+\sigma)_m}{(\theta+n+1)_m}.$$
> General Gibbs-type: $\hat U_{n,0}=V_{n+1,k+1}/V_{n,k}$ and $\hat U_{n,i}=\frac{V_{n+1,k}}{V_{n,k}}(i-\sigma)M_{i,n}$ (Eq. 39).

^thm-py-estimators

**Asymptotics (Eq. 36).** Conditionally on $X_{1:n}$, $K_m^{(n)}/m^\sigma\to Z_{n,k}$ a.s. as $m\to\infty$, with $Z_{n,k}\overset d=B_{k+\theta/\sigma,\,n/\sigma-k}\,U_{(\theta+n)/\sigma}$ ($B$ beta, $U_q$ with density $f_{U_q}(u)=\frac{\Gamma(q\sigma+1)}{\sigma\Gamma(q+1)}u^{q-1-1/\sigma}f_\sigma(u^{-1/\sigma})$, $f_\sigma$ the positive $\sigma$-stable density). Setting $n=k=0$ recovers the $\sigma$-diversity. Credible intervals via simulation of $Z_{n,k}$. **Rare species (Sec. 4.2).** $\hat M_m^{(n)}(\tau)=\hat N_m^{(n)}(\tau)+\hat O_m^{(n)}(\tau)$ (new species with frequency $\le\tau$ plus old species updated to frequency $\le\tau$); explicit sufficient statistic $(K_n,M_{1,n},\dots,M_{\tau,n})$ for old species (Eq. 37), $K_n$ for new (Eq. 38). PY: $\hat N_{i,m}=\binom mi(1-\sigma)_{i-1}(\theta+k\sigma)\frac{(\theta+n+\sigma)_{m-i}}{(\theta+n)_m}$; $M_{i,n+m}/m^\sigma\to\frac{\sigma(1-\sigma)_{i-1}}{i!}Z_{n,k}$. For discovery of species with frequency $i$ in the enlarged sample: Eq. 40 and, for PY, Eq. 43.

**Application (Table 2, Fig. 5).** Naegleria gruberi ESTs from two cDNA libraries (Susko and Roger 2004). Frequency counts $M_i$, $n$ and distinct genes $j$:

| Library | $M_1$ | $M_2$ | $M_3$ | $M_4$ | $M_5$ | $M_6$ | $M_7$ | $M_8$ | $M_9$ | $M_{10}$ | $M_{11}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Aerobic | 346 | 57 | 19 | 12 | 9 | 5 | 4 | 2 | 4 | 5 | 4 |
| Anaerobic | 491 | 72 | 30 | 9 | 13 | 5 | 3 | 1 | 2 | 0 | 1 |

| Library | $M_{12}$ | $M_{13}$ | $M_{14}$ | $M_{15}$ | $M_{16}$ | $M_{17}$ | $M_{18}$ | $M_{27}$ | $M_{55}$ | $j$ | $n$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Aerobic | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 473 | 959 |
| Anaerobic | 0 | 1 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 631 | 969 |

Empirical-Bayes $(\sigma,\theta)=(0.66,155.5)$; compare $\check U_{n+m,0}$ (Good-Toulmin) with $\hat U_{n+m,0}$ (PY) for $m=1..2000$. The Good-Toulmin estimator is erratic for $m$ large relative to $n$; both agree for small $m$; the anaerobic library shows clearly higher gene diversity. One can choose the additional sample size $m$ as the largest value with discovery probability above a cost-based threshold. Footnote: estimators (40) and (43) correct a minor inaccuracy in the earlier discovery-probability estimators of the authors' reference [19].

## Examples
> [!example] Recomputing the aerobic library (runnable)
> $n=959$, $k=473$, $\sigma=0.66$, $\theta=155.5$. Turing gives $\check U_{n,0}=346/959=0.361$; PY gives $\hat U_{n,0}=(155.5+0.66\cdot473)/(155.5+959)=0.420$. As $m$ grows the Good-Toulmin estimator oscillates and diverges while PY decays smoothly:
>
> | $m$ | GT $\check U_{n+m,0}$ | PY $\hat U_{n+m,0}$ | GT $\check K_m^{(n)}$ | PY $\hat K_m^{(n)}$ |
> |---|---|---|---|---|
> | 0 | 0.361 | 0.420 | 0 | 0 |
> | 500 | 0.311 | 0.370 | 167 | 196 |
> | 959 | 0.366 | 0.340 | 305 | 359 |
> | 1500 | $1.8\times10^9$ | 0.314 | $4.8\times10^{10}$ | 535 |
> | 2000 | $9.9\times10^{15}$ | 0.296 | $3.6\times10^{17}$ | 688 |

^ex-naegleria-aerobic

```python
import numpy as np
from scipy.special import gammaln
M = {1:346,2:57,3:19,4:12,5:9,6:5,7:4,8:2,9:4,10:5,11:4,12:1,16:1,17:1,18:1,27:1,55:1}
n = sum(i*c for i, c in M.items()); k = sum(M.values())     # 959, 473
sig, th = 0.66, 155.5
lr = lambda x, m: gammaln(x + m) - gammaln(x)
U_py = lambda m: (th + k*sig)/(th + n) * np.exp(lr(th + n + sig, m) - lr(th + n + 1, m))
K_py = lambda m: (k + th/sig) * (np.exp(lr(th + n + sig, m) - lr(th + n, m)) - 1)
U_gt = lambda m: sum((-m/n)**(i-1) * i * c for i, c in M.items()) / n
K_gt = lambda m: sum((-1)**(i-1) * (m/n)**i * c for i, c in M.items())
for m in (0, 500, 959, 1500, 2000):
    print(m, round(U_gt(m), 3), round(U_py(m), 3), round(K_gt(m), 1), round(K_py(m), 1))
```

## Relevance to marketing measurement
Replace species by SKUs, creative variants, keywords or customers. $\hat K_m^{(n)}$ answers "how many *new* distinct items will appear in the next $m$ transactions", $\hat U_{n+m,0}$ "what fraction of the next transactions will be a first-seen item". The exchangeability and the discrete-support assumptions are strong; check with held-out time splits.

## Connections
[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]], [[De Blasi 2015 - EPPF and Predictive Structure]]. Related vault area on unseen counts: [[Pareto-NBD Model]].

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]]
