---
title: Autoregressive Language Modeling and Pretraining
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/language-modeling
  - type/concept
  - doc/paper
source: "[[raw/Brown 2020 - Language Models are Few-Shot Learners.pdf]]"
source_location: "Brown et al. 2020 Secs. 2.1-2.3, Tables 2.1-2.2, Fig. 3.1, Sec. 5, Appendix D; Kaplan et al. 2020 Secs. 1.3, 2, 3.2.1; Vaswani et al. 2017 Secs. 3, 3.1, 3.2.3; Hoffmann et al. 2022 Appendix D.2"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Transformer Architecture and Positional Encoding]]"
  - "[[Scaled Dot-Product and Multi-Head Attention]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Neural Scaling Laws]]"
  - "[[Compute-Optimal Training (Chinchilla)]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
aliases:
  - Next-Token Prediction
  - Causal Language Modeling
  - LLM Pretraining
  - Decoder-Only Transformer
  - GPT-3 Training Setup
---

# Autoregressive Language Modeling and Pretraining

> [!summary]
> An autoregressive language model factorizes the probability of a token sequence by the chain rule, $p(x_{1:T}) = \prod_t p(x_t \mid x_{<t})$, and is trained by maximum likelihood: minimize the average cross-entropy (in nats per token) of the next token. A **decoder-only Transformer** with a causal attention mask evaluates all $T$ conditionals of a sequence in one parallel pass. **Pretraining** means fitting this objective once on a very large, general text corpus (GPT-3: 175B parameters, 300B tokens, about $3.14 \times 10^{23}$ FLOPs) and then reusing the model for many tasks via fine-tuning or [[In-Context Learning and Few-Shot Prompting|prompting]]. The loss decomposes into an irreducible entropy term, an approximation term that shrinks with parameters $N$, and an estimation/optimization term that shrinks with data $D$: the structure exploited by [[Neural Scaling Laws]] and [[Compute-Optimal Training (Chinchilla)]].

## Overview

The three LLM papers in this cluster share one setup. Kaplan et al. "optimize the autoregressive log-likelihood (i.e. cross-entropy loss) averaged over a 1024-token context" using "decoder-only Transformer models" (Sec. 2). Brown et al. use "the same model and architecture as GPT-2" scaled to 175B parameters with a 2048-token context (Sec. 2.1). Hoffmann et al. study "large autoregressive transformers" and define the loss as next-token cross-entropy (Appendix D.2). The autoregressive choice is pragmatic: Brown et al. focus on this model class "because it is straightforward to both sample and compute likelihoods" (Sec. 5). Both operations are needed, sampling for free-form generation and likelihood for scoring multiple-choice answers.

## Main Content

> [!definition] Autoregressive language model ^def-ar-lm
> Let $x_1, \dots, x_T$ be tokens from a finite vocabulary $\mathcal Y$. The model specifies
>
> $$
> p_\theta(x_1, \dots, x_T) = \prod_{t=1}^{T} p_\theta(x_t \mid x_1, \dots, x_{t-1}),
> $$
>
> where each conditional is a softmax over $\mathcal Y$ computed from the Transformer's output at position $t-1$. The factorization is exact (chain rule); the modeling assumption lies entirely in the parametric form of the conditionals. In Hoffmann's notation a predictor $f: \mathcal X \to \mathcal D(\mathcal Y)$ maps a past of length $s \in [0, s_{\max}]$ to a distribution over the next token.

> [!definition] Training loss and perplexity ^def-loss
> The loss is the average negative log-likelihood per token,
>
> $$
> L(\theta) = -\frac{1}{T} \sum_{t=1}^{T} \log p_\theta(x_t \mid x_{<t}),
> $$
>
> reported in **nats** by Kaplan et al. (Sec. 1.3: "the cross entropy loss in nats ... averaged over the tokens in a context"). **Perplexity** is $\exp(L)$. Hoffmann et al. also report bits-per-byte, which normalizes away the tokenizer. Minimizing expected $L$ is minimizing $\mathrm{KL}(p_{\text{data}} \,\Vert\, p_\theta)$ plus the entropy of the data, the same log-score logic as in [[Overfitting and Information Criteria]].

> [!definition] Causal masking and the decoder-only Transformer ^def-causal
> Self-attention is masked so that position $i$ attends only to positions $\le i$ (Vaswani et al., Sec. 3.2.3: illegal connections are set to $-\infty$ before the softmax), and inputs are offset by one position so that "the predictions for position $i$ can depend only on the known outputs at positions less than $i$" (Sec. 3.1). A decoder-only model is the Transformer decoder with the encoder and cross-attention removed. Because the mask, not the order of computation, enforces causality, a single forward pass over a length-$T$ sequence yields all $T$ conditional distributions and therefore $T$ training signals. Generation is sequential: sample $x_t$, append, repeat.

> [!definition] Pretraining ^def-pretraining
> Fit $\theta$ once by minimizing $L$ on a large, broad corpus with no task labels ("unsupervised pre-training", Brown et al., Fig. 1.1). Downstream use is either **fine-tuning** (further gradient updates on a task dataset, "typically thousands to hundreds of thousands of labeled examples") or **in-context learning** (no weight updates). Brown et al. describe the pretraining stage as the outer loop of a meta-learning process in which the model "develops a broad set of skills and pattern recognition abilities".

### Tokenization

Tokens are sub-word units. Vaswani et al. use byte-pair encoding with about 37,000 shared tokens; Kaplan et al. and Brown et al. use a reversible byte-pair tokenizer with $n_{\text{vocab}} = 50257$; Chinchilla uses a SentencePiece tokenizer. All loss values are per token, so absolute losses are not comparable across tokenizers. Kaplan et al. stress that the constants $N_c$, $D_c$ in their laws "depend on the vocabulary size and tokenization and hence do not have a fundamental meaning" (Sec. 1.2).

### The GPT-3 pretraining configuration

| Model | $n_{\text{params}}$ | $n_{\text{layers}}$ | $d_{\text{model}}$ | $n_{\text{heads}}$ | $d_{\text{head}}$ | Batch (tokens) | Learning rate |
|---|---|---|---|---|---|---|---|
| GPT-3 Small | 125M | 12 | 768 | 12 | 64 | 0.5M | $6.0 \times 10^{-4}$ |
| GPT-3 XL | 1.3B | 24 | 2048 | 24 | 128 | 1M | $2.0 \times 10^{-4}$ |
| GPT-3 13B | 13.0B | 40 | 5140 | 40 | 128 | 2M | $1.0 \times 10^{-4}$ |
| GPT-3 175B | 175.0B | 96 | 12288 | 96 | 128 | 3.2M | $0.6 \times 10^{-4}$ |

(Brown et al., Table 2.1, selected rows; eight sizes were trained, all for 300B tokens, all with $n_{\text{ctx}} = 2048$ and $d_{ff} = 4 d_{\text{model}}$.) Larger models use larger batches and smaller learning rates, with batch size guided by the gradient noise scale (Sec. 2.3).

| Dataset | Tokens | Weight in mix | Epochs over 300B tokens |
|---|---|---|---|
| Common Crawl (filtered) | 410B | 60% | 0.44 |
| WebText2 | 19B | 22% | 2.9 |
| Books1 | 12B | 8% | 1.9 |
| Books2 | 55B | 8% | 0.43 |
| Wikipedia | 3B | 3% | 3.4 |

(Table 2.2.) Common Crawl was reduced from 45TB of compressed plaintext to 570GB by quality filtering against reference corpora and fuzzy document-level deduplication. Sampling is deliberately *not* proportional to size: higher-quality sources are seen 2-3 times, which "accepts a small amount of overfitting in exchange for higher quality training data" (Sec. 2.2).

> [!theorem] Risk decomposition of the pretraining loss ^thm-risk-decomposition
> (Hoffmann et al., Appendix D.2, Eq. 9.) Let $f^\star$ be the Bayes predictor, $f_N$ the best Transformer with $N$ parameters under the *expected* risk, and $\bar f_{N,D}$ the model actually obtained by a single pass of gradient steps over $D$ tokens. Then
>
> $$
> L(N, D) = \underbrace{L(f^\star)}_{\text{Bayes risk: entropy of text}}
> + \underbrace{L(f_N) - L(f^\star)}_{\text{function approximation, depends on } N}
> + \underbrace{L(\bar f_{N,D}) - L(f_N)}_{\text{stochastic approximation, depends on } D} .
> $$
>
> This motivates the parametric form $\hat L(N,D) = E + A/N^{\alpha} + B/D^{\beta}$, fitted as $E = 1.69$, $\alpha = 0.34$, $\beta = 0.28$. The third term is not classical overfitting: in the sub-epoch regime every token is fresh, so the smoothed training loss is "an unbiased estimate of the test loss" (Hoffmann, footnote 2). It measures how far finitely many stochastic gradient steps remain from the optimum.

### Properties established empirically

- **Transformers use long contexts; LSTMs do not.** Kaplan et al. (Sec. 3.2.1, Fig. 7) find LSTMs match Transformers on early tokens but "cannot match the Transformer performance for later tokens": the LSTM's per-token loss plateaus after fewer than 100 tokens while the Transformer's keeps improving across the full 1024-token context.
- **Loss improvement transfers.** Loss on other text distributions tracks in-distribution loss with a roughly constant offset (Kaplan, Sec. 3.2.2), and Brown et al. report that "improvements in cross-entropy loss lead to consistent performance gains across a broad spectrum of natural language tasks" (Sec. 3).
- **Limits of the objective.** Brown et al. (Sec. 5) list: no bidirectional context (hurting tasks that compare two passages, such as WiC and ANLI); every token weighted equally, with no "notion of what is most important to predict"; no grounding in other modalities; and poor pretraining sample efficiency, since the model sees far more text during pretraining than a human sees in a lifetime. They suggest learning the objective from humans and fine-tuning with reinforcement learning as future directions.
- **Contamination.** Web-scale corpora may contain benchmark test sets; Brown et al. (Sec. 4) measure overlap and flag affected results. A filtering bug left some overlaps in the training data, and retraining was too expensive to repeat.

## Examples

**Loss, perplexity and compute for GPT-3.**

- Zero-shot Penn Treebank perplexity is 20.5 (Brown et al., Table 3.1), i.e. a loss of $\ln 20.5 \approx 3.02$ nats per unit. On LAMBADA the few-shot perplexity of the final word is 1.92 ($0.65$ nats).
- Training compute: forward pass $\approx 2N$ FLOPs per token, backward pass twice that, so $C \approx 6ND$ (Kaplan, Sec. 2.1). With $N = 1.746 \times 10^{11}$ and $D = 3 \times 10^{11}$ this is $3.14 \times 10^{23}$ FLOPs, or $3.64 \times 10^{3}$ PF-days (Brown et al., Appendix D). The context-dependent attention term $2 n_{\text{layer}} n_{\text{ctx}} d_{\text{model}}$ is negligible when $d_{\text{model}} \gg n_{\text{ctx}}/12$.

**Training step, schematically.**

```python
# tokens: (batch, T+1) integer array drawn from the corpus mixture
inputs, targets = tokens[:, :-1], tokens[:, 1:]          # offset by one position
logits = decoder_only_transformer(inputs, causal=True)   # (batch, T, n_vocab)
loss = cross_entropy(logits, targets).mean()             # nats per token
loss.backward(); optimizer.step()                        # ~6N FLOPs per token in total

# generation: repeat  x_next ~ softmax(logits[:, -1]);  append;  re-run
```

**A statistical reading.** The model is a very high-order categorical autoregression: an AR($p$) model with $p$ up to $n_{\text{ctx}}$, a nonlinear link, and coefficients (attention weights) that depend on the content of the lags. Classical marketing time-series models ([[Single Marketing Time Series]]) fix both the order and the lag weights in advance.

## Connections

- [[Transformer Architecture and Positional Encoding]]: the decoder stack reused here; the original encoder-decoder already generated autoregressively.
- [[Scaled Dot-Product and Multi-Head Attention]]: the $-\infty$ mask that implements causality.
- [[Neural Scaling Laws]]: how $L$ varies with $N$, $D$ and $C$ under this objective.
- [[Compute-Optimal Training (Chinchilla)]]: uses the risk decomposition above to allocate $C \approx 6ND$.
- [[In-Context Learning and Few-Shot Prompting]]: what the pretrained conditional distribution can do when the conditioning text contains a task description.
- [[Overfitting and Information Criteria]]: cross-entropy, KL divergence and held-out log score; the irreducible term $E$ is the entropy of the data-generating process.
- [[Probability and Bayesian Inference]]: chain rule and conditional probability.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[Fine-tuning on Conditional Statements]]: a fine-tuning application already in the vault.
- [[LLM Causal Reasoning Tasks]]: zero-shot generation tasks that rely on exactly this conditional sampling.
- [[Cross Validation Checking]]: held-out predictive evaluation in the Bayesian workflow.
- [[Single Marketing Time Series]]
