---
title: "Blei 2003 - LDA Generative Model and Exchangeability"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/definition
  - doc/paper
source: "[[raw/Blei Ng Jordan 2003 - Latent Dirichlet Allocation.pdf]]"
source_location: "Secs. 1-3 (Eqs. 1-3, Fig. 1), pp. 993-1000"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Blei 2003 - Latent Dirichlet Allocation"
doc_type: paper
depends_on:
  - "[[Blei 2003 - Latent Dirichlet Allocation - Overview]]"
used_by:
  - "[[Blei 2003 - Related Models and the Topic Simplex]]"
  - "[[Blei 2003 - Variational Inference and Parameter Estimation]]"
aliases:
  - "LDA generative process"
  - "latent Dirichlet allocation model"
---

# Blei 2003 - LDA Generative Model and Exchangeability

> [!summary]
> Terminology: words (vocabulary items $1..V$ as unit-basis vectors), documents (sequences of $N$ words), corpora ($M$ documents). LDA draws $\theta\sim\text{Dir}(\alpha)$ per document, a topic $z_n\sim\text{Mult}(\theta)$ per word, then $w_n\sim\text{Mult}(\beta_{z_n})$. Exchangeability of words and topics within a document plus de Finetti's theorem motivates the mixture form.

## Main Content
**Notation.** A word is $w$ with $w^v=1$ and $w^u=0$ ($u\ne v$); a document $\mathbf w=(w_1,\dots,w_N)$; a corpus $D=\{\mathbf w_1,\dots,\mathbf w_M\}$. The model is not tied to text (collaborative filtering, image retrieval, bioinformatics).

> [!definition] LDA generative process (Sec. 3)
> For each document: (1) $N\sim\text{Poisson}(\xi)$; (2) $\theta\sim\text{Dir}(\alpha)$; (3) for each of $N$ words: $z_n\sim\text{Multinomial}(\theta)$ and $w_n\sim p(w_n\mid z_n,\beta)$, a multinomial with $\beta_{ij}=p(w^j=1\mid z^i=1)$ ($\beta$ is $k\times V$).
> Simplifying assumptions: $k$ fixed and known; $\beta$ a fixed quantity to estimate; the Poisson length is ancillary and ignored.

^def-lda-generative

> [!definition] Dirichlet density (Eq. 1)
> $p(\theta\mid\alpha)=\dfrac{\Gamma(\sum_i\alpha_i)}{\prod_i\Gamma(\alpha_i)}\theta_1^{\alpha_1-1}\cdots\theta_k^{\alpha_k-1}$ on the $(k-1)$-simplex; exponential family, conjugate to the multinomial.

^def-dirichlet-density

> [!theorem] Joint, document and corpus likelihood (Eqs. 2-3)
> $$
> p(\theta,\mathbf z,\mathbf w\mid\alpha,\beta)=p(\theta\mid\alpha)\prod_{n=1}^Np(z_n\mid\theta)p(w_n\mid z_n,\beta),
> $$
> $$
> p(\mathbf w\mid\alpha,\beta)=\int p(\theta\mid\alpha)\Big(\prod_{n=1}^N\sum_{z_n}p(z_n\mid\theta)p(w_n\mid z_n,\beta)\Big)d\theta,\quad p(D\mid\alpha,\beta)=\prod_{d=1}^M p(\mathbf w_d\mid\alpha,\beta).
> $$

^thm-lda-likelihood

Three levels: $\alpha,\beta$ corpus-level (sampled once), $\theta_d$ document-level, $z_{dn},w_{dn}$ word-level. This differs from a Dirichlet-multinomial *clustering* model, which samples the cluster once per document: in LDA the topic node is resampled within the document, so a document can exhibit multiple topics. The structure is a conditionally independent hierarchical model (Kass and Steffey 1989), and $\alpha,\beta$ are estimated by parametric empirical Bayes in the simple implementation.

> [!theorem] Exchangeability and the continuous mixture of unigrams (Secs. 3.1-3.2)
> Words and topics are assumed infinitely exchangeable within a document; by de Finetti, $p(\mathbf w,\mathbf z)=\int p(\theta)\prod_np(z_n\mid\theta)p(w_n\mid z_n)\,d\theta$. Marginalising $z$: $p(w\mid\theta,\beta)=\sum_zp(w\mid z,\beta)p(z\mid\theta)$, so LDA is a **continuous mixture of unigrams** $p(\mathbf w\mid\alpha,\beta)=\int p(\theta\mid\alpha)\prod_np(w_n\mid\theta,\beta)d\theta$, with only $k+kV$ parameters but a multimodal density on the word simplex (Fig. 2).

^thm-lda-exchangeable

## Examples
> [!example] Marginalising the topics
> Take $k=3,V=6$. For a 5-word document the likelihood given $\theta$ and $\beta$ is $\prod_n(\theta^T\beta)_{w_n}$, the product of mixture word probabilities; summing over all $3^5$ topic assignments gives exactly the same number. This is the identity used to "sum out token topics" in gradient-based samplers (see [[Blei 2003 - LDA Beyond Text Baskets and Sessions]]).

^ex-lda-marginalise-z

```python
import numpy as np
rng = np.random.default_rng(0)
K, V, N = 3, 6, 5
phi = rng.dirichlet(np.ones(V) * .5, K); th = rng.dirichlet(np.ones(K) * .5)
w = rng.integers(0, V, N)
explicit = np.prod([sum(th[k] * phi[k, wn] for k in range(K)) for wn in w])
print(explicit, np.prod((th @ phi)[w]))      # equal
```

## Connections
[[Hierarchical Models]] for the shared-hyperparameter structure. Compare with DP-based clustering: [[Teh 2010 - DP Mixture Models and Applications]].

## See Also
[[Blei 2003 - Latent Dirichlet Allocation - Overview]]
