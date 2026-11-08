---
title: "Blei 2003 - Variational Inference and Parameter Estimation"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Sec. 5.1-5.3 (Eqs. 4-9, Figs 5-6), Appendix A (A.1-A.4), pp. 1004-1008, 1015-1022"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Blei 2003 - LDA Generative Model and Exchangeability]]"
  - "[[Mean-Field Family and Coordinate Ascent VI (CAVI)]]"
used_by:
  - "[[Blei 2003 - Smoothed LDA, Examples and Experiments]]"
aliases:
  - "LDA variational EM"
  - "LDA variational inference"
  - "LDA E-step updates"
---

# Blei 2003 - Variational Inference and Parameter Estimation

> [!summary]
> The posterior $p(\theta,\mathbf z\mid\mathbf w,\alpha,\beta)$ is intractable (coupling of $\theta$ and $\beta$). Dropping the $w$ edges gives a mean-field family $q(\theta,\mathbf z\mid\gamma,\phi)=q(\theta\mid\gamma)\prod_nq(z_n\mid\phi_n)$; minimising KL yields closed-form coordinate updates, and variational EM estimates $\alpha,\beta$.

## Main Content
**Why exact inference fails (5.1).** $p(\mathbf w\mid\alpha,\beta)=\frac{\Gamma(\sum\alpha_i)}{\prod\Gamma(\alpha_i)}\int\prod_i\theta_i^{\alpha_i-1}\prod_n\sum_i\prod_j(\theta_i\beta_{ij})^{w_n^j}d\theta$ is intractable because of the coupling between $\theta$ and $\beta$ in the sum over topics (Dickey 1983, hypergeometric functions). Alternatives: Laplace, variational, MCMC.

> [!definition] Variational family (Eq. 4)
> $q(\theta,\mathbf z\mid\gamma,\phi)=q(\theta\mid\gamma)\prod_{n=1}^Nq(z_n\mid\phi_n)$, $\gamma$ a Dirichlet parameter, $\phi_n$ multinomial parameters; chosen by $(\gamma^*,\phi^*)=\arg\min D_{KL}(q\Vert p(\theta,\mathbf z\mid\mathbf w,\alpha,\beta))$ (Eq. 5), equivalent to maximising the ELBO (Jensen lower bound).

^def-lda-variational-family

> [!theorem] Coordinate updates (Eqs. 6-8, Appendix A.3)
> $$
> \phi_{ni}\propto\beta_{iw_n}\exp\{E_q[\log\theta_i\mid\gamma]\},\qquad\gamma_i=\alpha_i+\sum_{n=1}^N\phi_{ni},\qquad E_q[\log\theta_i\mid\gamma]=\Psi(\gamma_i)-\Psi\Big(\sum_{j=1}^k\gamma_j\Big).
> $$

^thm-lda-updates

Proof sketch: write the ELBO terms; the $\phi_n$ term is $\sum_i\phi_{ni}\{E_q\log\theta_i+\log\beta_{iw_n}-\log\phi_{ni}\}$, maximised under $\sum_i\phi_{ni}=1$ by the stated softmax; the $\theta$ term is a Dirichlet with natural parameter $\alpha_i+\sum_n\phi_{ni}-1$; $E[\log\theta_i]=\Psi(\alpha_i)-\Psi(\sum\alpha_j)$ follows from the exponential-family form of the Dirichlet (A.1: derivative of the log normaliser equals the expected sufficient statistic).

Interpretation: $\gamma$ is a posterior Dirichlet given expected counts $E[z_n\mid\phi_n]$; $\phi$ is Bayes' rule with $p(z_n)$ replaced by $\exp E_q\log\theta$. Algorithm (Fig. 6): initialise $\phi^0_{ni}=1/k$, $\gamma_i=\alpha_i+N/k$; repeat updating $\phi$ then $\gamma$ until convergence. Cost per iteration $O((N+1)k)$; iterations needed are about $N$, so roughly $N^2k$ per document. $\gamma^*(\mathbf w)$ is a document-specific representation on the topic simplex.

> [!theorem] Variational EM (5.3, A.4)
> E-step: compute $(\gamma_d^*,\phi_d^*)$ for every document. M-step: maximise the bound over $\alpha,\beta$. The conditional multinomial has the closed form $\beta_{ij}\propto\sum_{d=1}^M\sum_{n=1}^{N_d}\phi^*_{dni}w_{dn}^j$ (Eq. 9); $\alpha$ is updated by Newton-Raphson on a Hessian of the form $\text{diag}(h)+\mathbf 1z\mathbf 1^T$ whose inverse is obtained in linear time by the matrix inversion lemma (A.2): $(H^{-1}g)_i=(g_i-c)/h_i$ with $c=\sum_jg_j/h_j\big/(z^{-1}+\sum_jh_j^{-1})$.

^thm-lda-vem

## Examples
> [!example] E-step on a toy document
> Two topics over four words, $\beta=\begin{pmatrix}.5&.4&.05&.05\\.05&.05&.45&.45\end{pmatrix}$, $\alpha=(.5,.5)$, document $w=(0,1,0,1,2)$. The fixed point gives $\gamma\approx(4.83,\,1.17)$: almost all expected words are assigned to topic 1.

^ex-lda-estep

```python
import numpy as np
from scipy.special import digamma

def estep(w, beta, alpha, iters=100):
    k, N = beta.shape[0], len(w)
    gamma = alpha + N / k
    for _ in range(iters):
        phi = beta[:, w].T * np.exp(digamma(gamma) - digamma(gamma.sum()))
        phi /= phi.sum(1, keepdims=True)
        gamma = alpha + phi.sum(0)
    return gamma, phi

beta = np.array([[.5, .4, .05, .05], [.05, .05, .45, .45]])
print(estep(np.array([0, 1, 0, 1, 2]), beta, np.array([.5, .5]))[0])   # [4.83 1.17]
```

## Connections
General theory: [[The ELBO and KL Divergence Minimization]], [[Mean-Field Family and Coordinate Ascent VI (CAVI)]], [[Stochastic and Black-Box Variational Inference]] (the route to large corpora). MCMC alternative mentioned in Sec. 8: collapsed Gibbs (Griffiths and Steyvers 2002).

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]]
