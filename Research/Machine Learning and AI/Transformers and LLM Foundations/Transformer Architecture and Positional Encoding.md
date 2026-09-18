---
title: Transformer Architecture and Positional Encoding
tags:
  - source/ingested
  - topic/machine-learning
  - topic/transformers
  - topic/neural-network-architecture
  - type/concept
  - doc/paper
source: "[[raw/Vaswani 2017 - Attention Is All You Need.pdf]]"
source_location: "Sec. 3 (3.1, 3.3-3.5), pp. 2-6; Sec. 5 Training, pp. 7-8; Sec. 6 Results, Tables 2-3, pp. 8-9"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Scaled Dot-Product and Multi-Head Attention]]"
  - "[[Transformers and LLM Foundations - Overview]]"
used_by:
  - "[[Autoregressive Language Modeling and Pretraining]]"
  - "[[Neural Scaling Laws]]"
  - "[[Compute-Optimal Training (Chinchilla)]]"
aliases:
  - Transformer Architecture
  - Encoder-Decoder Transformer
  - Sinusoidal Positional Encoding
  - Positional Encoding
  - Position-wise Feed-Forward Network
---

# Transformer Architecture and Positional Encoding

> [!summary]
> The original Transformer (Vaswani et al. 2017) is an **encoder-decoder** stack of $N = 6$ identical layers on each side. Every sub-layer, whether [[Scaled Dot-Product and Multi-Head Attention|multi-head attention]] or a position-wise two-layer ReLU network, is wrapped as $\mathrm{LayerNorm}(x + \mathrm{Sublayer}(x))$ at constant width $d_{\text{model}} = 512$. Because attention is order-invariant, **sinusoidal positional encodings** are added to the input embeddings; their geometric progression of frequencies makes $PE_{pos+k}$ a linear function of $PE_{pos}$. Trained with Adam, a warmup-then-inverse-square-root learning rate, dropout and label smoothing, the big model reached 28.4 BLEU on WMT14 English-German at $2.3 \times 10^{19}$ training FLOPs, a fraction of the cost of earlier systems.

## Overview

The model follows the standard sequence-transduction template (Sec. 3). The encoder maps input symbols $(x_1, \dots, x_n)$ to continuous representations $z = (z_1, \dots, z_n)$. Given $z$, the decoder emits $(y_1, \dots, y_m)$ one symbol at a time, and "at each step the model is auto-regressive, consuming the previously generated symbols as additional input when generating the next." What is new is that both halves are built from attention and per-position feed-forward layers only, with no recurrence and no convolution.

The GPT family studied in the other notes of this cluster keeps only the decoder half, without cross-attention ([[Autoregressive Language Modeling and Pretraining]]). The layer anatomy described here is otherwise unchanged; Brown et al. note that GPT-3 uses pre-normalization and alternating dense and sparse attention patterns.

## Main Content

> [!definition] Encoder and decoder layers ^def-layers
> (Sec. 3.1)
> - **Encoder layer**: (1) multi-head self-attention; (2) position-wise feed-forward network.
> - **Decoder layer**: (1) *masked* multi-head self-attention; (2) multi-head attention over the encoder output; (3) position-wise feed-forward network.
> - Every sub-layer output is $\mathrm{LayerNorm}(x + \mathrm{Sublayer}(x))$. To make the residual additions possible, all sub-layers and the embedding layers output dimension $d_{\text{model}} = 512$.
> - The decoder mask, "combined with fact that the output embeddings are offset by one position, ensures that the predictions for position $i$ can depend only on the known outputs at positions less than $i$."

> [!definition] Position-wise feed-forward network ^def-ffn
> Applied "to each position separately and identically" (Eq. 2):
>
> $$
> \mathrm{FFN}(x) = \max(0,\, xW_1 + b_1)\,W_2 + b_2 ,
> $$
>
> with input/output width $d_{\text{model}} = 512$ and inner width $d_{ff} = 2048$. Parameters are shared across positions but differ between layers; equivalently, two convolutions with kernel size 1.

Attention mixes information *across* positions; the FFN transforms each position *in place*. Most parameters live in the FFN: per layer, attention has $4 d_{\text{model}}^2$ weights ($W^Q, W^K, W^V, W^O$) and the FFN has $2 d_{\text{model}} d_{ff} = 8 d_{\text{model}}^2$.

> [!definition] Embeddings and output softmax ^def-embeddings
> Learned embeddings map tokens to $\mathbb R^{d_{\text{model}}}$; a learned linear map followed by a softmax turns decoder outputs into next-token probabilities. The same weight matrix is shared between the two embedding layers and the pre-softmax linear transformation, and in the embedding layers the weights are multiplied by $\sqrt{d_{\text{model}}}$ (Sec. 3.4).

> [!definition] Sinusoidal positional encoding ^def-positional-encoding
> Added to the input embeddings at the bottom of both stacks (Sec. 3.5):
>
> $$
> PE_{(pos,\,2i)} = \sin\!\left(pos / 10000^{2i/d_{\text{model}}}\right), \qquad
> PE_{(pos,\,2i+1)} = \cos\!\left(pos / 10000^{2i/d_{\text{model}}}\right).
> $$
>
> Each dimension is a sinusoid; "the wavelengths form a geometric progression from $2\pi$ to $10000 \cdot 2\pi$."

> [!theorem] Relative offsets are linear maps ^thm-pe-linear
> For any fixed offset $k$, $PE_{pos+k}$ is a linear function of $PE_{pos}$ (Sec. 3.5). Writing $\omega_i = 10000^{-2i/d_{\text{model}}}$, each sine-cosine pair is rotated by the angle $\omega_i k$:
>
> $$
> \begin{pmatrix} \sin \omega_i (pos + k) \\ \cos \omega_i (pos + k) \end{pmatrix}
> =
> \begin{pmatrix} \cos \omega_i k & \sin \omega_i k \\ -\sin \omega_i k & \cos \omega_i k \end{pmatrix}
> \begin{pmatrix} \sin \omega_i\, pos \\ \cos \omega_i\, pos \end{pmatrix}.
> $$
>
> The rotation matrix does not depend on $pos$, so a single linear projection inside an attention head can implement "attend $k$ positions back". The authors hypothesized this "would allow the model to easily learn to attend by relative positions".

Learned positional embeddings gave "nearly identical results" (Table 3 row (E): 25.7 BLEU compared with 25.8 for the base model). The sinusoidal version was kept "because it may allow the model to extrapolate to sequence lengths longer than the ones encountered during training."

### Why this design: layer-type comparison

| Layer type | Complexity per layer | Sequential operations | Maximum path length |
|---|---|---|---|
| Self-attention | $O(n^2 d)$ | $O(1)$ | $O(1)$ |
| Recurrent | $O(n d^2)$ | $O(n)$ | $O(n)$ |
| Convolutional | $O(k n d^2)$ | $O(1)$ | $O(\log_k n)$ |
| Self-attention (restricted to $r$ neighbors) | $O(r n d)$ | $O(1)$ | $O(n/r)$ |

(Table 1; $n$ sequence length, $d$ representation dimension, $k$ kernel width.)

> [!algorithm] Training recipe ^alg-training
> (Sec. 5)
> 1. **Data.** WMT14 English-German, about 4.5M sentence pairs, byte-pair encoding with a shared vocabulary of about 37,000 tokens; English-French, 36M sentences, 32,000 word-pieces. Batches of roughly 25,000 source and 25,000 target tokens.
> 2. **Optimizer.** Adam with $\beta_1 = 0.9$, $\beta_2 = 0.98$, $\epsilon = 10^{-9}$.
> 3. **Learning rate** (Eq. 3), linear warmup then inverse-square-root decay, with $warmup\_steps = 4000$:
>
> $$
> lrate = d_{\text{model}}^{-0.5} \cdot \min\!\left(step^{-0.5},\; step \cdot warmup\_steps^{-1.5}\right).
> $$
>
> 4. **Regularization.** Dropout $P_{drop} = 0.1$ on each sub-layer output before the residual addition and on the sum of embeddings and positional encodings; label smoothing $\epsilon_{ls} = 0.1$, which "hurts perplexity, as the model learns to be more unsure, but improves accuracy and BLEU score."
> 5. **Hardware.** One machine with 8 P100 GPUs. Base model: 100,000 steps at 0.4 s/step (12 hours). Big model: 300,000 steps at 1.0 s/step (3.5 days).
> 6. **Inference.** Average the last 5 (base) or 20 (big) checkpoints; beam search with beam size 4 and length penalty $\alpha = 0.6$.

### Results

| Model | EN-DE BLEU | EN-FR BLEU | Training FLOPs (EN-DE) |
|---|---|---|---|
| GNMT + RL | 24.6 | 39.92 | $2.3 \times 10^{19}$ |
| ConvS2S | 25.16 | 40.46 | $9.6 \times 10^{18}$ |
| ConvS2S ensemble | 26.36 | 41.29 | $7.7 \times 10^{19}$ |
| Transformer (base) | 27.3 | 38.1 | $3.3 \times 10^{18}$ |
| Transformer (big) | 28.4 | 41.8 | $2.3 \times 10^{19}$ |

(Table 2. The abstract and Table 2 give 41.8 for English-French; the running text of Sec. 6.1 says 41.0.) The big model beats all earlier systems, including ensembles, on English-German by more than 2 BLEU. A 4-layer Transformer also reached 91.3 F1 on WSJ constituency parsing with only 40K training sentences and 92.7 semi-supervised, showing that the architecture is not translation-specific (Sec. 6.3).

**Ablations (Table 3, newstest2013 dev).** Rows (C): deeper and wider is better: 2 layers give 23.7 BLEU, 6 layers 25.8 (base), $d_{\text{model}} = 1024$ gives 26.0, $d_{ff} = 4096$ gives 26.2. Rows (D): removing dropout drops BLEU to 24.6, "dropout is very helpful in avoiding over-fitting." The big model ($d_{\text{model}} = 1024$, $d_{ff} = 4096$, $h = 16$, $P_{drop} = 0.3$, 213M parameters) reaches 26.4 dev BLEU and perplexity 4.33, compared with the base model's 25.8 and 4.92 at 65M parameters. "Bigger models are better" is the first hint of the regularity quantified in [[Neural Scaling Laws]].

## Examples

**Counting the base model's parameters.** Kaplan et al. (Eq. 2.1) give the non-embedding count of a decoder-only Transformer as $N \approx 12\, n_{\text{layer}}\, d_{\text{model}}^2$ when $d_{ff} = 4 d_{\text{model}}$: $4d^2$ for attention plus $8d^2$ for the FFN. Apply the same bookkeeping to the base encoder-decoder with $d = 512$:

- Encoder: $6 \times 12 d^2 = 6 \times 3.15\text{M} = 18.9$M.
- Decoder: each layer has a second attention block, so $6 \times 16 d^2 = 25.2$M.
- Shared embedding / softmax matrix: $37{,}000 \times 512 = 18.9$M.
- Total $\approx 63$M, against the 65M reported in Table 3. The remainder is biases, layer-norm gains and vocabulary-size rounding. (This is a back-of-envelope check, not a computation from the paper.)

**Positional encoding in code.**

```python
import numpy as np

def positional_encoding(n_pos, d_model):
    pos = np.arange(n_pos)[:, None]
    i = np.arange(d_model // 2)[None, :]
    angle = pos / 10000 ** (2 * i / d_model)
    pe = np.empty((n_pos, d_model))
    pe[:, 0::2], pe[:, 1::2] = np.sin(angle), np.cos(angle)
    return pe
```

The inner product $PE_{pos}^{\mathsf T} PE_{pos+k} = \sum_i \cos(\omega_i k)$ depends only on the offset $k$: the encoding induces a *stationary* kernel over positions built from a bank of cosines. This is the same idea as a basis-function approximation to a stationary Gaussian-process kernel, where fixed sinusoid-like eigenfunctions are computed once and a linear model is fitted on top ([[Hilbert Space Gaussian Processes]]). Seasonal components in structural time-series models ([[Local Linear Trend and Seasonality]]) serve the analogous purpose of telling a model where it is within a cycle.

## Connections

- [[Scaled Dot-Product and Multi-Head Attention]]: the mixing operation inside every layer; it is permutation-invariant, which is why positional encodings are needed at all.
- [[Autoregressive Language Modeling and Pretraining]]: keeps the masked decoder stack, drops the encoder and cross-attention.
- [[Neural Scaling Laws]]: parameterizes this architecture by $(n_{\text{layer}}, d_{\text{model}}, d_{ff}, n_{\text{heads}})$ and finds loss nearly independent of shape at fixed $N$.
- [[Compute-Optimal Training (Chinchilla)]]: Chinchilla is this architecture at 80 layers and $d_{\text{model}} = 8192$ with $d_{ff} = 4 d_{\text{model}}$.
- [[Overfitting and Information Criteria]]: dropout and label smoothing are regularizers in the same sense as regularizing priors; note the trade-off the paper reports between perplexity (a proper log score) and BLEU.
- [[Hilbert Space Gaussian Processes]]: sinusoidal basis functions as a stationary kernel approximation.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[In-Context Learning and Few-Shot Prompting]]
- [[Gaussian Process Regression]]
- [[Local Linear Trend and Seasonality]]
- [[Single Marketing Time Series]]: classical sequence models for marketing data, for contrast with attention-based sequence models.
