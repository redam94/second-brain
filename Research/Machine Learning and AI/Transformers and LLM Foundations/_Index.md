---
title: Transformers and LLM Foundations - Index
tags:
  - type/index
  - source/ingested
  - topic/machine-learning
  - topic/transformers
  - topic/large-language-models
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
parent: "[[Machine Learning and AI/_Index|Machine Learning and AI]]"
---

# Transformers and LLM Foundations - Index

> [!abstract] Routing Summary
> The technical core of modern large language models, from four primary papers: Vaswani et al. (2017) on the Transformer, Kaplan et al. (2020) on scaling laws, Hoffmann et al. (2022) on compute-optimal training (Chinchilla), and Brown et al. (2020) on GPT-3 and in-context learning.
>
> - Need the big picture, or the relevance to marketing measurement? → [[Transformers and LLM Foundations - Overview]]
> - Need the attention formula, the $\sqrt{d_k}$ argument, multi-head attention, or attention as a kernel smoother? → [[Scaled Dot-Product and Multi-Head Attention]]
> - Need the layer anatomy, feed-forward block, sinusoidal positional encoding, training recipe or BLEU results? → [[Transformer Architecture and Positional Encoding]]
> - Need the next-token objective, causal masking, perplexity, GPT-3's data mix, or $C \approx 6ND$? → [[Autoregressive Language Modeling and Pretraining]]
> - Need the power laws $L(N)$, $L(D)$, $L(C)$, the overfitting law $L(N,D)$, or critical batch size? → [[Neural Scaling Laws]]
> - Need to split a compute budget between parameters and tokens (about 20 tokens per parameter)? → [[Compute-Optimal Training (Chinchilla)]]
> - Need zero-, one- and few-shot prompting, how it is evaluated, and where it fails? → [[In-Context Learning and Few-Shot Prompting]]
> - Need the closed-form efficient frontier? → [[Compute-Optimal Training (Chinchilla)#^thm-frontier|$N_{\text{opt}} = G(C/6)^{\beta/(\alpha+\beta)}$]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Cluster framing | [[Transformers and LLM Foundations - Overview]] | overview | Probability and Bayesian Inference; Overfitting and Information Criteria | Architecture, objective, scaling and in-context learning in one chain; $C \approx 6ND$ ties the papers together |
| Attention | [[Scaled Dot-Product and Multi-Head Attention]] | concept | Overview | $\mathrm{softmax}(QK^{\mathsf T}/\sqrt{d_k})V$; $q \cdot k$ has variance $d_k$; $h = 8$ heads at equal cost; Nadaraya-Watson reading |
| Transformer architecture | [[Transformer Architecture and Positional Encoding]] | concept | Attention | $\mathrm{LayerNorm}(x + \mathrm{Sublayer}(x))$; FFN with $d_{ff} = 4 d_{\text{model}}$; $PE_{pos+k}$ linear in $PE_{pos}$; 28.4 BLEU EN-DE |
| Autoregressive LM and pretraining | [[Autoregressive Language Modeling and Pretraining]] | concept | Architecture; Attention | $p(x) = \prod_t p(x_t \mid x_{<t})$; causal mask; loss in nats per token; risk decomposition $E + A/N^\alpha + B/D^\beta$ |
| Scaling laws | [[Neural Scaling Laws]] | concept | Autoregressive LM | $\alpha_N \approx 0.076$, $\alpha_D \approx 0.095$, $\alpha_C^{\min} \approx 0.050$; $D \gtrsim 5 \times 10^3 N^{0.74}$; $N_{\text{opt}} \propto C^{0.73}$ |
| Compute-optimal training | [[Compute-Optimal Training (Chinchilla)]] | method | Scaling laws | Three approaches give $N_{\text{opt}}, D_{\text{opt}} \propto C^{0.5}$; Chinchilla 70B on 1.4T tokens beats Gopher 280B |
| In-context learning | [[In-Context Learning and Few-Shot Prompting]] | concept | Autoregressive LM; Attention; Scaling laws | Few-shot gains grow with model size; LAMBADA 86.4%, TriviaQA 71.2%; WiC at chance |

## Notes

- [[Transformers and LLM Foundations - Overview]] — CONTAINS: four-paper summary table, definitions of Transformer and LLM, five organizing empirical regularities, reading order, relevance to marketing measurement (LLM elicitation, scaling-law design, attention as lag kernel, amortization), GPT-3 compute worked example.
- [[Scaled Dot-Product and Multi-Head Attention]] — CONTAINS: query-key-value definition, Eq. 1, variance argument for $1/\sqrt{d_k}$, multi-head definition with projection shapes, three uses of attention (encoder, cross, masked decoder), Table 1 complexity comparison, head-count ablations, kernel-smoothing interpretation compared with GP regression, hand computation, NumPy sketch.
- [[Transformer Architecture and Positional Encoding]] — CONTAINS: encoder and decoder layer anatomy, residual plus LayerNorm, FFN Eq. 2, weight tying, sinusoidal encoding with rotation-matrix proof, learned-embedding ablation, training recipe (Adam, warmup schedule Eq. 3, dropout, label smoothing), Table 2 BLEU and FLOPs, Table 3 ablations, parameter-count check of the 65M base model.
- [[Autoregressive Language Modeling and Pretraining]] — CONTAINS: chain-rule factorization, cross-entropy and perplexity, causal masking, decoder-only definition, pretraining compared with fine-tuning, tokenization caveats, GPT-3 model sizes (Table 2.1) and data mixture (Table 2.2), Hoffmann risk decomposition, Transformer compared with LSTM context use, objective limitations, contamination, training-step pseudocode.
- [[Neural Scaling Laws]] — CONTAINS: $N \approx 12 n_{\text{layer}} d_{\text{model}}^2$, $C \approx 6NBS$, Eqs. 1.1-1.8 with fitted constants, $L(N,D)$ design principles and overfitting criterion, $L(N,S)$ learning-curve law, critical batch size, Kaplan allocation exponents, shape independence, transfer, the $L(C_{\min})$ and $L(D)$ contradiction and entropy conjecture, caveats, curve-fitting sketch.
- [[Compute-Optimal Training (Chinchilla)]] — CONTAINS: constrained optimization statement, why Kaplan differed (learning-rate schedule, small models, curvature), three estimation approaches, Huber and log-sum-exp fitting, closed-form frontier with derivation, Table 2 exponents with bootstrap intervals, Table 3 sizes, 20 tokens per parameter, Chinchilla compared with Gopher results, limitations, numerical evaluation of the fitted law, media-budget allocation analogy.
- [[In-Context Learning and Few-Shot Prompting]] — CONTAINS: meta-learning inner and outer loop, FT/FS/1S/0S definitions, evaluation protocol including likelihood normalization, scaling of ICL with model size, results table (LAMBADA, TriviaQA, arithmetic, SuperGLUE, WiC), limitations, hierarchical-Bayes and amortized-inference reading, prompt formats, few-shot classifier sketch.

## External / Cross-Folder Links

- [[LLM Expert Elicitation for Bayesian Networks]], [[LLM Causal Reasoning Tasks]], [[Code Prompts for Causal Structure]], [[Code vs Text Prompt Evaluation]], [[Code Prompt Aspects Analysis]], [[Fine-tuning on Conditional Statements]], [[LLM-BN Decision Support Application]] — applied uses of LLMs for causal knowledge elicitation.
- [[Gaussian Process Regression]], [[Kernel Quadrature and Kernel Means]], [[Hilbert Space Gaussian Processes]] — kernel-weighted prediction and basis-function kernels, the classical relatives of attention and positional encoding.
- [[Overfitting and Information Criteria]], [[Cross Validation Checking]], [[Posterior Predictive Checking]], [[Prior Predictive Checking]] — cross-entropy, held-out loss and predictive checking.
- [[Hierarchical Models]], [[Simulation-Based and Amortized Inference]] — partial pooling and amortization as readings of in-context learning.
- [[Power Analysis and Sample Size]], [[Geo-Experiment Design and Power Analysis]], [[Bayesian Experimental Design - Overview]] — design-stage extrapolation under a fixed budget.
- [[ROAS, mROAS, and Optimal Media Mix]], [[Shape (Saturation) Effects]], [[Carryover (Adstock) Functional Forms]], [[Bayesian Media Mix Modeling - Overview]] — budget allocation under diminishing returns, and fixed lag kernels.
- [[Probability and Bayesian Inference]], [[Single Marketing Time Series]], [[Local Linear Trend and Seasonality]], [[Effective Sample Size and Monte Carlo Standard Error]], [[Simultaneous Inference via Multiplier Bootstrap]] — supporting background.

## Sources

- [[raw/Vaswani 2017 - Attention Is All You Need.pdf]] — Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L. & Polosukhin, I. (2017), "Attention Is All You Need," *NeurIPS 2017*. arXiv:1706.03762.
- [[raw/Kaplan 2020 - Scaling Laws for Neural Language Models.pdf]] — Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., Gray, S., Radford, A., Wu, J. & Amodei, D. (2020), "Scaling Laws for Neural Language Models." arXiv:2001.08361.
- [[raw/Hoffmann 2022 - Training Compute-Optimal Large Language Models.pdf]] — Hoffmann, J., Borgeaud, S., Mensch, A., et al. (2022), "Training Compute-Optimal Large Language Models." arXiv:2203.15556.
- [[raw/Brown 2020 - Language Models are Few-Shot Learners.pdf]] — Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al. (2020), "Language Models are Few-Shot Learners," *NeurIPS 2020*. arXiv:2005.14165.
