---
title: Scaled Dot-Product and Multi-Head Attention
tags:
  - source/ingested
  - topic/machine-learning
  - topic/transformers
  - topic/attention
  - type/concept
  - doc/paper
source: "[[raw/Vaswani 2017 - Attention Is All You Need.pdf]]"
source_location: "Sec. 3.2 (3.2.1-3.2.3), pp. 3-5; footnote 4; Sec. 4 and Table 1, pp. 6-7; Table 3 rows (A)-(B), p. 9"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Transformers and LLM Foundations - Overview]]"
used_by:
  - "[[Transformer Architecture and Positional Encoding]]"
  - "[[Autoregressive Language Modeling and Pretraining]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
aliases:
  - Self-Attention
  - Scaled Dot-Product Attention
  - Multi-Head Attention
  - Attention Mechanism
  - Query Key Value Attention
---

# Scaled Dot-Product and Multi-Head Attention

> [!summary]
> An attention function maps "a query and a set of key-value pairs to an output": a weighted sum of the values, with weights given by a compatibility function between the query and each key (Vaswani et al., Sec. 3.2). The Transformer uses **scaled dot-product attention**, $\mathrm{softmax}(QK^{\mathsf T}/\sqrt{d_k})V$, where the $1/\sqrt{d_k}$ factor keeps the softmax out of its saturated, vanishing-gradient regime. **Multi-head attention** runs $h$ such functions in parallel on learned low-dimensional projections and concatenates the results, so that different heads can attend to different positions and representation subspaces at the same total cost. Read statistically, an attention head is a **Nadaraya-Watson kernel smoother** with a learned, asymmetric exponential kernel.

## Overview

Before 2017, attention was an add-on to recurrent encoder-decoder models: the decoder's hidden state queried the encoder's hidden states. Vaswani et al. make attention the *only* mechanism that moves information between positions. Three properties motivate the choice (Sec. 4, Table 1):

- **Path length.** A self-attention layer connects any two positions in $O(1)$ sequential operations; a recurrent layer needs $O(n)$ and a convolution with kernel width $k$ needs $O(\log_k n)$ stacked layers. Short paths make long-range dependencies easier to learn.
- **Parallelism.** All positions are processed at once, with $O(1)$ sequential operations per layer compared with $O(n)$ for recurrence.
- **Cost.** Per-layer complexity is $O(n^2 d)$ compared with $O(n d^2)$ for recurrence, so self-attention is cheaper whenever sequence length $n$ is smaller than representation dimension $d$. The quadratic term in $n$ is the price, and the reason later work restricts attention to neighborhoods of size $r$ (complexity $O(rnd)$, path length $O(n/r)$).

## Main Content

> [!definition] Scaled dot-product attention ^def-sdpa
> Let $Q \in \mathbb R^{n_q \times d_k}$ hold queries, $K \in \mathbb R^{n_k \times d_k}$ keys and $V \in \mathbb R^{n_k \times d_v}$ values, one per row. Then (Eq. 1)
>
> $$
> \mathrm{Attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^{\mathsf T}}{\sqrt{d_k}}\right) V ,
> $$
>
> with the softmax applied row-wise. Row $i$ of the output is $\sum_j a_{ij} v_j$ with weights
>
> $$
> a_{ij} = \frac{\exp(q_i^{\mathsf T} k_j / \sqrt{d_k})}{\sum_{l} \exp(q_i^{\mathsf T} k_l / \sqrt{d_k})}, \qquad a_{ij} \ge 0, \quad \sum_j a_{ij} = 1 .
> $$

The paper contrasts this with **additive attention**, which scores compatibility with a one-hidden-layer feed-forward network. The two have similar theoretical complexity, but dot-product attention "is much faster and more space-efficient in practice, since it can be implemented using highly optimized matrix multiplication code" (Sec. 3.2.1).

> [!theorem] Why divide by $\sqrt{d_k}$ ^thm-scaling
> Assume the components of $q$ and $k$ are independent with mean $0$ and variance $1$. Then
>
> $$
> q \cdot k = \sum_{i=1}^{d_k} q_i k_i \quad \text{has mean } 0 \text{ and variance } d_k
> $$
>
> (footnote 4). Unscaled logits therefore have standard deviation $\sqrt{d_k}$; for large $d_k$ they push the softmax "into regions where it has extremely small gradients". Dividing by $\sqrt{d_k}$ restores unit variance regardless of head dimension. The paper cites the observation that additive attention outperforms *unscaled* dot-product attention for large $d_k$, and introduces the scaling "to counteract this effect".

> [!definition] Multi-head attention ^def-mha
> With $h$ heads and learned projections $W_i^Q \in \mathbb R^{d_{\text{model}} \times d_k}$, $W_i^K \in \mathbb R^{d_{\text{model}} \times d_k}$, $W_i^V \in \mathbb R^{d_{\text{model}} \times d_v}$ and $W^O \in \mathbb R^{h d_v \times d_{\text{model}}}$,
>
> $$
> \mathrm{MultiHead}(Q,K,V) = \mathrm{Concat}(\mathrm{head}_1, \dots, \mathrm{head}_h)\, W^O,
> \qquad
> \mathrm{head}_i = \mathrm{Attention}(QW_i^Q,\, KW_i^K,\, VW_i^V).
> $$
>
> The base model uses $h = 8$ and $d_k = d_v = d_{\text{model}}/h = 64$. "Due to the reduced dimension of each head, the total computational cost is similar to that of single-head attention with full dimensionality" (Sec. 3.2.2).

The motivation is that a single softmax-weighted average blurs: "Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this." The same averaging is why the Background section describes attention as having "reduced effective resolution".

> [!definition] The three uses of attention in the Transformer ^def-three-uses
> (Sec. 3.2.3)
> 1. **Encoder self-attention.** $Q$, $K$, $V$ all come from the previous encoder layer; every position attends to every position.
> 2. **Encoder-decoder (cross) attention.** Queries come from the previous decoder layer; keys and values come from the encoder output, so each decoder position attends over the whole input.
> 3. **Masked decoder self-attention.** Each position may attend only to positions up to and including itself. This is implemented "by masking out (setting to $-\infty$) all values in the input of the softmax which correspond to illegal connections", which preserves the autoregressive property used in [[Autoregressive Language Modeling and Pretraining]].

### Ablation evidence

Table 3 of the paper varies heads at constant compute on English-to-German (newstest2013 dev). Rows (A): $h = 1$ ($d_k = 512$) gives 24.9 BLEU, $h = 4$ gives 25.5, $h = 8$ and $h = 16$ give 25.8, $h = 32$ ($d_k = 16$) falls back to 25.4: "single-head attention is 0.9 BLEU worse than the best setting, quality also drops off with too many heads." Rows (B): reducing $d_k$ to 16 or 32 with other settings fixed lowers BLEU to 25.1 and 25.4, which the authors read as evidence "that determining compatibility is not easy and that a more sophisticated compatibility function than dot product may be beneficial." Kaplan et al. later find that, at fixed non-embedding parameter count, language-model loss varies only a few percent across head counts ([[Neural Scaling Laws]]).

### Attention as kernel smoothing (interpretive, not from the paper)

Write $\kappa(q, k) = \exp(q^{\mathsf T} k/\sqrt{d_k})$. A head's output is

$$
\hat f(q_i) = \frac{\sum_j \kappa(q_i, k_j)\, v_j}{\sum_j \kappa(q_i, k_j)},
$$

which is the Nadaraya-Watson kernel regression estimator with "inputs" $k_j$, "responses" $v_j$ and evaluation point $q_i$. If queries and keys have fixed norms, $q^{\mathsf T}k = -\tfrac12\lVert q - k\rVert^2 + \text{const}$ and $\kappa$ is a Gaussian RBF kernel with squared bandwidth $\sqrt{d_k}$. Differences from classical smoothing are instructive:

- The kernel acts in a *learned* feature space ($W^Q x$ and $W^K x$), and because $W^Q \ne W^K$ it is not symmetric.
- The "responses" $v_j = W^V x_j$ are learned too.
- Compare the [[Gaussian Process Regression]] posterior mean $k(x_*, X)\,(K + \sigma^2 I)^{-1} y$: also a linear smoother, but its weights involve the inverse Gram matrix, can be negative and need not sum to one. Attention weights are a convex combination, so an attention output always lies in the convex hull of the values. The RKHS view in [[Kernel Quadrature and Kernel Means]] (weighted sums of kernel evaluations as embeddings of measures) is the closest formal relative: row $i$ of the attention matrix is a probability measure over positions and the output is the mean of $v$ under that measure.
- Multi-head attention is then an additive model over $h$ smoothers, each with its own metric.

## Examples

**Hand computation.** Take $d_k = 2$, one query $q = (1, 0)$, three keys $k_1 = (1,0)$, $k_2 = (0,1)$, $k_3 = (1,1)$ and scalar values $v = (10, 20, 40)$.

- Dot products: $(1, 0, 1)$. Scaled by $\sqrt 2$: $(0.707, 0, 0.707)$.
- Softmax: $e^{0.707} = 2.028$, $e^0 = 1$, so weights are $(0.401, 0.198, 0.401)$.
- Output: $0.401 \cdot 10 + 0.198 \cdot 20 + 0.401 \cdot 40 \approx 24.0$.

Now suppose the same geometry occurred with $d_k = 64$ and logits eight times larger ($\sqrt{64} = 8$ standard deviations instead of one). Without scaling the logits $(8, 0, 8)$ give weights $(0.49992, 0.00017, 0.49992)$: the second key is effectively invisible and its gradient is near zero. This is the saturation that the $1/\sqrt{d_k}$ factor prevents.

**Code sketch (NumPy).**

```python
import numpy as np

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def attention(Q, K, V, causal=False):
    d_k = Q.shape[-1]
    scores = Q @ K.swapaxes(-1, -2) / np.sqrt(d_k)       # (n_q, n_k)
    if causal:                                            # illegal connections -> -inf
        n_q, n_k = scores.shape[-2:]
        scores = np.where(np.tril(np.ones((n_q, n_k), bool)), scores, -np.inf)
    return softmax(scores) @ V

def multi_head(X, WQ, WK, WV, WO, causal=False):
    # WQ, WK, WV: lists of h projection matrices; WO: (h*d_v, d_model)
    heads = [attention(X @ q, X @ k, X @ v, causal) for q, k, v in zip(WQ, WK, WV)]
    return np.concatenate(heads, axis=-1) @ WO
```

With `causal=True` row $t$ of the weight matrix is supported on positions $1,\dots,t$, which makes the layer a learned, content-dependent distributed-lag operator; contrast the fixed geometric or Weibull lag weights in [[Carryover (Adstock) Functional Forms]].

## Connections

- [[Transformer Architecture and Positional Encoding]]: where attention sits inside each layer, and why position signals must be added, since the weighted sum above is invariant to the order of the key-value pairs.
- [[Autoregressive Language Modeling and Pretraining]]: the causal mask turns self-attention into a valid model of $p(x_t \mid x_{<t})$.
- [[In-Context Learning and Few-Shot Prompting]]: demonstrations in the prompt influence predictions only through attention over earlier positions.
- [[Neural Scaling Laws]]: head count and head dimension barely matter once non-embedding parameter count is fixed.
- [[Gaussian Process Regression]]: kernel-weighted prediction with an inverse Gram matrix; attention is the normalized-kernel (Nadaraya-Watson) cousin.
- [[Kernel Quadrature and Kernel Means]]: outputs as means of a function under a data-dependent probability measure.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[Hilbert Space Gaussian Processes]]: low-rank basis-function approximations of kernels, the classical route to avoiding $O(n^2)$ kernel costs.
- [[Carryover (Adstock) Functional Forms]]: fixed lag kernels in media mix models.
- [[Compute-Optimal Training (Chinchilla)]]: Table 4 lists Chinchilla's 64 heads with key/value size 128, showing the same construction at 70B scale.
