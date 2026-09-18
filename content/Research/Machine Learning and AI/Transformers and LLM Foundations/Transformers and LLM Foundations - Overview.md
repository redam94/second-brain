---
title: Transformers and LLM Foundations - Overview
tags:
  - source/ingested
  - topic/machine-learning
  - topic/transformers
  - topic/large-language-models
  - type/overview
  - doc/paper
source: "[[raw/Vaswani 2017 - Attention Is All You Need.pdf]]"
source_location: "Vaswani et al. 2017 Secs. 1-4; Kaplan et al. 2020 Sec. 1; Hoffmann et al. 2022 Secs. 1, 3; Brown et al. 2020 Secs. 1-2"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Overfitting and Information Criteria]]"
used_by:
  - "[[Scaled Dot-Product and Multi-Head Attention]]"
  - "[[Transformer Architecture and Positional Encoding]]"
  - "[[Autoregressive Language Modeling and Pretraining]]"
  - "[[Neural Scaling Laws]]"
  - "[[Compute-Optimal Training (Chinchilla)]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
aliases:
  - Transformer and LLM Foundations
  - LLM Foundations Overview
  - Large Language Model Foundations
---

# Transformers and LLM Foundations - Overview

> [!summary]
> Four papers define the technical core of modern large language models (LLMs). **Vaswani et al. (2017)** introduce the **Transformer**, a sequence model built only from [[Scaled Dot-Product and Multi-Head Attention|attention]], residual connections and position-wise feed-forward layers ([[Transformer Architecture and Positional Encoding]]). Trained as a next-token predictor ([[Autoregressive Language Modeling and Pretraining]]), its test loss follows smooth **power laws** in parameters $N$, data $D$ and compute $C$ (**Kaplan et al. 2020**, [[Neural Scaling Laws]]). **Hoffmann et al. (2022)** correct the allocation rule: for a fixed compute budget, parameters and tokens should grow *in equal proportion* ([[Compute-Optimal Training (Chinchilla)]]). **Brown et al. (2020)** show that a sufficiently large autoregressive model (GPT-3, 175B parameters) can perform new tasks from a handful of demonstrations in its prompt, with no gradient updates ([[In-Context Learning and Few-Shot Prompting]]).

## Overview

The cluster answers four questions in sequence.

1. **What is the function class?** A Transformer maps a sequence of token vectors to a sequence of token vectors. Its one non-standard ingredient is attention, $\mathrm{softmax}(QK^{\mathsf T}/\sqrt{d_k})V$, a content-dependent weighted average that connects every pair of positions in $O(1)$ sequential steps (Vaswani et al., Sec. 3.2, Table 1). Everything else (residual connections, layer normalization, a two-layer ReLU network applied to each position, sinusoidal position signals) is conventional.
2. **What is the training objective?** The chain rule of probability: $p(x_1,\dots,x_T) = \prod_t p(x_t \mid x_{<t})$, fitted by maximum likelihood (cross-entropy in nats per token) on web-scale text. A causal mask in the attention layer enforces the factorization, so all $T$ conditionals of a training sequence are evaluated in one parallel pass.
3. **How does performance depend on scale?** Kaplan et al. find $L(N) = (N_c/N)^{\alpha_N}$ with $\alpha_N \approx 0.076$, $L(D) = (D_c/D)^{\alpha_D}$ with $\alpha_D \approx 0.095$ and $L(C_{\min}) = (C_c^{\min}/C_{\min})^{0.050}$, holding across six to eight orders of magnitude and depending only weakly on depth, width or head count. Hoffmann et al. re-estimate the *allocation* of a budget $C \approx 6ND$ and find $N_{\text{opt}} \propto C^{0.5}$, $D_{\text{opt}} \propto C^{0.5}$ rather than Kaplan's $C^{0.73}$ and $C^{0.27}$.
4. **What does scale buy besides lower loss?** Brown et al. show the gap between zero-, one- and few-shot accuracy *widens* with model size: larger models are better "meta-learners", extracting a task from the prompt alone.

| Paper | Contribution | Headline number |
|---|---|---|
| Vaswani et al. 2017 | Attention-only encoder-decoder | 28.4 BLEU EN-DE, 41.8 BLEU EN-FR after 3.5 days on 8 P100 GPUs |
| Kaplan et al. 2020 | Power laws $L(N)$, $L(D)$, $L(C)$, joint $L(N,D)$ | $\alpha_N \approx 0.076$, $\alpha_D \approx 0.095$, $\alpha_C^{\min} \approx 0.050$ |
| Hoffmann et al. 2022 | Compute-optimal $N$ vs $D$; Chinchilla 70B on 1.4T tokens | $N_{\text{opt}}, D_{\text{opt}} \propto C^{0.5}$; MMLU 67.6% vs Gopher 60.0% |
| Brown et al. 2020 | GPT-3 175B; in-context learning | LAMBADA 86.4% few-shot; TriviaQA 71.2% few-shot |

## Main Content

> [!definition] Transformer ^def-transformer
> A sequence transduction model "based solely on attention mechanisms, dispensing with recurrence and convolutions entirely" (Vaswani et al., Abstract). Each layer applies multi-head attention and a position-wise feed-forward network, each wrapped as $\mathrm{LayerNorm}(x + \mathrm{Sublayer}(x))$. See [[Transformer Architecture and Positional Encoding]].

> [!definition] Large language model (as used in these papers) ^def-llm
> A Transformer (in Kaplan, Brown and Hoffmann: **decoder-only**) trained to "autoregressively model language", i.e. to minimize the cross-entropy of the next token given the preceding context, on hundreds of billions of tokens. The scale variables are $N$ (non-embedding parameters in Kaplan; all parameters in Hoffmann), $D$ (training tokens) and $C \approx 6ND$ (training FLOPs). See [[Autoregressive Language Modeling and Pretraining]].

> [!theorem] The empirical regularities that organize the field ^thm-regularities
> These are empirical laws, not theorems in the mathematical sense.
> 1. **Scale over shape.** Loss "depends strongly on scale, weakly on model shape" (Kaplan, Sec. 1.1, Sec. 3.1).
> 2. **Power laws.** Loss is a power law in each of $N$, $D$, $C$ "when not bottlenecked by the other two" (Kaplan, Eqs. 1.1-1.3).
> 3. **Joint law and overfitting.** $L(N,D) = \left[(N_c/N)^{\alpha_N/\alpha_D} + D_c/D\right]^{\alpha_D}$ (Kaplan, Eq. 1.5), or in Hoffmann's additive form $\hat L(N,D) = E + A/N^{\alpha} + B/D^{\beta}$ (Eq. 2).
> 4. **Compute-optimal allocation.** Minimizing $\hat L$ subject to $6ND = C$ gives $N_{\text{opt}} \propto C^{\beta/(\alpha+\beta)}$ and $D_{\text{opt}} \propto C^{\alpha/(\alpha+\beta)}$ (Hoffmann, Eq. 4); all three of Hoffmann's estimation approaches put both exponents near $0.5$.
> 5. **In-context learning improves with scale.** Few-shot performance "increases more rapidly" with model size than zero-shot performance (Brown, Fig. 1.3).

### Reading order

- Start with [[Scaled Dot-Product and Multi-Head Attention]] for the mechanism, then [[Transformer Architecture and Positional Encoding]] for how it is assembled and trained.
- [[Autoregressive Language Modeling and Pretraining]] fixes the objective, the loss units and the $C \approx 6ND$ accounting that the scaling notes rely on.
- [[Neural Scaling Laws]] and [[Compute-Optimal Training (Chinchilla)]] should be read as a pair: the second is a methodological correction of the first.
- [[In-Context Learning and Few-Shot Prompting]] covers what the pretrained model can do at inference time.

### Relevance to marketing measurement and applied work

- **LLMs as tools in a causal workflow.** The vault already uses LLMs for structure elicitation ([[LLM Expert Elicitation for Bayesian Networks]], [[LLM Causal Reasoning Tasks]], [[Code Prompts for Causal Structure]]). Those notes treat the model as a black box; this cluster explains what the box is, why prompt format and demonstrations matter ([[In-Context Learning and Few-Shot Prompting]]), and why its outputs are next-token predictions rather than calibrated beliefs (Brown et al., Sec. 5, state that GPT-3 "is not necessarily well-calibrated").
- **Scaling laws are a design-stage tool.** Fitting a parametric learning curve on cheap pilot runs and extrapolating to choose the one expensive run is the same logic as [[Power Analysis and Sample Size]] and [[Geo-Experiment Design and Power Analysis]]: decide $N$ and $D$ before spending the budget. Hoffmann's constrained minimization is formally the same problem as budget allocation across channels with diminishing returns in [[ROAS, mROAS, and Optimal Media Mix]]: equalize marginal returns subject to a linear cost constraint.
- **Attention is a learned, content-dependent lag kernel.** A media mix model fixes the carryover weights in advance ([[Carryover (Adstock) Functional Forms]]); causal self-attention learns weights over past positions that depend on the content of each position. This is the basis of Transformer time-series models and relates to kernel smoothers and [[Gaussian Process Regression]].
- **Amortization.** In-context learning, where a single pretrained network adapts to a new dataset in one forward pass, is closely related to the amortized posterior estimators of [[Simulation-Based and Amortized Inference]], which are increasingly used for ABM calibration.

## Examples

**One accounting identity ties the four papers together.** Training compute is $C \approx 6ND$ FLOPs (Kaplan, Sec. 2.1: $2N$ per token forward, twice that backward). For GPT-3, $N = 175 \times 10^9$ and $D = 300 \times 10^9$ give

$$
C \approx 6 \times 1.75\times10^{11} \times 3\times10^{11} = 3.15 \times 10^{23}\ \text{FLOPs} \approx 3.6 \times 10^{3}\ \text{PF-days},
$$

matching the $3.14 \times 10^{23}$ FLOPs and $3.64 \times 10^{3}$ PF-days reported in Brown et al. (Appendix D), where one PF-day is $8.64 \times 10^{19}$ FLOPs. Gopher used $5.76 \times 10^{23}$ FLOPs with $N = 280$B and $D = 300$B; Hoffmann et al. spend the same budget on $N = 70$B and $D = 1.4$T and obtain a uniformly better model. At roughly 20 tokens per parameter (Hoffmann, Table 3), a compute-optimal 175B model would need about 3.7T tokens, more than twelve times what GPT-3 saw.

## Connections

- [[Scaled Dot-Product and Multi-Head Attention]]: the core operation, its $\sqrt{d_k}$ scaling and its reading as a kernel smoother.
- [[Transformer Architecture and Positional Encoding]]: encoder-decoder stacks, feed-forward sublayers, sinusoidal positions, training recipe and ablations.
- [[Autoregressive Language Modeling and Pretraining]]: objective, causal masking, tokenization, datasets and the risk decomposition.
- [[Neural Scaling Laws]]: Kaplan's power laws, critical batch size and the $L(N,D)$ overfitting law.
- [[Compute-Optimal Training (Chinchilla)]]: Hoffmann's three estimation approaches and the closed-form efficient frontier.
- [[In-Context Learning and Few-Shot Prompting]]: zero-, one- and few-shot evaluation and its limits.
- [[Overfitting and Information Criteria]]: cross-entropy, KL divergence and out-of-sample deviance are the same quantities the scaling laws track.
- [[Probability and Bayesian Inference]]: the chain rule factorization underlying the training objective.

## See Also

- [[LLM Expert Elicitation for Bayesian Networks]], [[LLM Causal Reasoning Tasks]], [[Code Prompts for Causal Structure]], [[Fine-tuning on Conditional Statements]], [[Code vs Text Prompt Evaluation]]: applied uses of LLMs already in the vault.
- [[Gaussian Process Regression]] and [[Kernel Quadrature and Kernel Means]]: kernel-weighted prediction, the closest classical relative of attention.
- [[Hierarchical Models]]: partial pooling across tasks as an analogy for in-context adaptation.
- [[Simulation-Based and Amortized Inference]]: neural networks that amortize inference across datasets.
- [[Power Analysis and Sample Size]] and [[Bayesian Experimental Design - Overview]]: design-stage extrapolation and allocation of a fixed budget.
- [[Bayesian Media Mix Modeling - Overview]]: the applied setting in which diminishing-returns curves and budget allocation recur.
