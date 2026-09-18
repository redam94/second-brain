---
title: Neural Scaling Laws
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/scaling-laws
  - type/concept
  - doc/paper
source: "[[raw/Kaplan 2020 - Scaling Laws for Neural Language Models.pdf]]"
source_location: "Sec. 1.1-1.3 (Eqs. 1.1-1.8), pp. 2-6; Sec. 2.1 (Eqs. 2.1-2.2, Table 1); Sec. 3; Sec. 4 (Eqs. 4.1-4.4, Table 2); Sec. 5 (Eqs. 5.1-5.7, Table 3); Sec. 6 (Eqs. 6.1-6.8); Appendices A-C"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Autoregressive Language Modeling and Pretraining]]"
  - "[[Transformer Architecture and Positional Encoding]]"
  - "[[Overfitting and Information Criteria]]"
used_by:
  - "[[Compute-Optimal Training (Chinchilla)]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
aliases:
  - Scaling Laws for Neural Language Models
  - Kaplan Scaling Laws
  - Power-Law Scaling of Language Models
  - Critical Batch Size
---

# Neural Scaling Laws

> [!summary]
> Kaplan et al. (2020) show that the test cross-entropy of an [[Autoregressive Language Modeling and Pretraining|autoregressive Transformer language model]] is a **power law** in each of three scale variables, non-embedding parameters $N$, dataset tokens $D$ and training compute $C$, "when not bottlenecked by the other two", with trends spanning six to eight orders of magnitude. Architecture shape (depth, width, heads) matters little at fixed $N$. A single formula $L(N,D)$ governs overfitting, a second formula $L(N,S)$ governs learning curves, and together they imply that under a fixed compute budget one should train **very large models and stop far short of convergence**, with $N_{\text{opt}} \propto C^{0.73}$ and data growing only as $C^{0.27}$. That allocation was later revised by [[Compute-Optimal Training (Chinchilla)]]; the power-law form itself has held up.

## Overview

The experiments train decoder-only Transformers on WebText2 ($2.29 \times 10^{10}$ tokens, vocabulary 50,257, context 1,024), varying model size from 768 to 1.5 billion non-embedding parameters, dataset size from 22 million to 23 billion tokens, and shape, context length and batch size (Sec. 3). Default training is Adam for $2.5 \times 10^5$ steps at batch $2^{19}$ tokens with a 3,000-step warmup and cosine decay to zero.

Two bookkeeping conventions make the trends clean:

- **Count only non-embedding parameters.** $N \approx 2 d_{\text{model}} n_{\text{layer}} (2 d_{\text{attn}} + d_{ff}) = 12\, n_{\text{layer}} d_{\text{model}}^2$ under the standard $d_{\text{attn}} = d_{ff}/4 = d_{\text{model}}$ (Eq. 2.1). With embeddings included, loss appears to depend on depth; with them excluded, all depths collapse onto one curve (Fig. 6).
- **Compute is $C \approx 6NBS$** for batch size $B$ (tokens) and $S$ steps, i.e. $6N$ FLOPs per training token, quoted in PF-days ($8.64 \times 10^{19}$ FLOPs).

## Main Content

> [!theorem] Single-variable power laws ^thm-power-laws
> (Eqs. 1.1-1.3; fitted values from Appendix A, Table 5.)
>
> $$
> L(N) = \left(\frac{N_c}{N}\right)^{\alpha_N}, \qquad \alpha_N \approx 0.076, \quad N_c \approx 8.8 \times 10^{13}
> $$
>
> for models trained to convergence on sufficiently large data;
>
> $$
> L(D) = \left(\frac{D_c}{D}\right)^{\alpha_D}, \qquad \alpha_D \approx 0.095, \quad D_c \approx 5.4 \times 10^{13} \text{ tokens}
> $$
>
> for large models with early stopping;
>
> $$
> L(C_{\min}) = \left(\frac{C_c^{\min}}{C_{\min}}\right)^{\alpha_C^{\min}}, \qquad \alpha_C^{\min} \approx 0.050, \quad C_c^{\min} \approx 3.1 \times 10^{8} \text{ PF-days}
> $$
>
> for optimally allocated compute at small batch size. The exponents are the substantive content; the scale constants "depend on the vocabulary size and tokenization and hence do not have a fundamental meaning."

The relations hold "across eight orders of magnitude in $C_{\min}$, six orders of magnitude in $N$, and over two orders of magnitude in $D$." The exponents are small: doubling $N$ multiplies loss by $2^{-0.076} \approx 0.95$.

> [!theorem] Joint law $L(N,D)$ and the overfitting criterion ^thm-lnd
> (Eqs. 1.5, 4.1-4.4.)
>
> $$
> L(N, D) = \left[ \left(\frac{N_c}{N}\right)^{\alpha_N/\alpha_D} + \frac{D_c}{D} \right]^{\alpha_D},
> $$
>
> with joint fit $\alpha_N = 0.076$, $\alpha_D = 0.103$, $N_c = 6.4 \times 10^{13}$, $D_c = 1.8 \times 10^{13}$ (Table 2). The relative overfitting penalty $\delta L \equiv L(N,D)/L(N,\infty) - 1$ depends only on the combination $N^{\alpha_N/\alpha_D}/D$:
>
> $$
> \delta L \approx \left( 1 + \left(\frac{N}{N_c}\right)^{\alpha_N/\alpha_D} \frac{D_c}{D} \right)^{\alpha_D} - 1 .
> $$
>
> Requiring $\delta L$ to stay below the seed-to-seed noise in the loss ($\approx 0.02$) gives
>
> $$
> D \gtrsim (5 \times 10^{3})\, N^{0.74} \quad \text{tokens}.
> $$

The functional form was chosen by three principles (Sec. 4.1): (1) it must permit rescaling under a change of tokenizer; (2) it must reduce to $L(N)$ as $D \to \infty$ and to $L(D)$ as $N \to \infty$; (3) it should be analytic in $1/D$ at $D = \infty$, because "overfitting should be related to the variance or the signal-to-noise ratio of the dataset, and this scales as $1/D$". The authors call the third "more speculative". The fit is excellent except at the smallest dataset ($\approx 2 \times 10^7$ tokens). The sub-linear rule means "every time we increase the model size 8x, we only need to increase the data by roughly 5x to avoid a penalty."

> [!theorem] Learning-curve law $L(N,S)$ ^thm-lns
> (Eqs. 1.6, 5.6; Table 3.) After an initial transient, in the infinite-data limit,
>
> $$
> L(N, S_{\min}) = \left(\frac{N_c}{N}\right)^{\alpha_N} + \left(\frac{S_c}{S_{\min}}\right)^{\alpha_S},
> \qquad \alpha_S \approx 0.76, \quad S_c \approx 2.1 \times 10^{3},
> $$
>
> where $S_{\min}$ is the number of steps that would have been needed at very large batch size.

> [!definition] Critical batch size ^def-bcrit
> Training to a fixed loss with $S$ steps and $E = BS$ examples satisfies $(S/S_{\min} - 1)(E/E_{\min} - 1) = 1$ (Eq. 5.1). The critical batch size is $B_{\text{crit}}(L) \equiv E_{\min}/S_{\min}$; training there costs $2 S_{\min}$ steps and $2 E_{\min}$ examples, a near-optimal time/compute compromise. Empirically
>
> $$
> B_{\text{crit}}(L) \approx \frac{B_*}{L^{1/\alpha_B}}, \qquad B_* \approx 2 \times 10^{8} \text{ tokens}, \quad \alpha_B \approx 0.21,
> $$
>
> independent of model size and roughly doubling for every 13% decrease in loss (Fig. 10). The adjustments $S_{\min} = S/(1 + B_{\text{crit}}/B)$ and $C_{\min} = C/(1 + B/B_{\text{crit}})$ (Eqs. 5.4-5.5) standardize runs made at a fixed batch size.

> [!theorem] Compute-efficient allocation (Kaplan version) ^thm-kaplan-allocation
> Substituting $S_{\min} = C_{\min}/(6NB)$ into $L(N,S_{\min})$ and minimizing over $N$ at fixed compute gives (Eqs. 1.7-1.8, 6.1-6.5, Appendix B):
>
> $$
> \alpha_C^{\min} = \frac{1}{1/\alpha_S + 1/\alpha_B + 1/\alpha_N}, \qquad
> N \propto C_{\min}^{\alpha_C^{\min}/\alpha_N}, \quad
> B \propto C_{\min}^{\alpha_C^{\min}/\alpha_B}, \quad
> S \propto C_{\min}^{\alpha_C^{\min}/\alpha_S}.
> $$
>
> The predicted $\alpha_C^{\min} \approx 0.054$ and $N \propto C_{\min}^{0.71}$ agree with the direct empirical fits $\alpha_C^{\min} \approx 0.050$, $N \propto C_{\min}^{0.73}$, $B \propto C_{\min}^{0.24}$, $S \propto C_{\min}^{0.03}$, and one-epoch data $D_{\text{opt}} \propto C_{\min}^{0.27}$ (Table 6). At the optimum one trains to a loss about $\alpha_N/\alpha_S \approx 10\%$ above the converged loss (Eq. B.5).

Hence the headline advice: "we attain optimal performance by training very large models and stopping significantly short of convergence." Each 10x of compute should buy roughly 5x more parameters and 2x more data (Fig. 14). Relative to training to within 2% of convergence, compute-efficient training "uses 7.7x fewer parameter updates, 2.7x more parameters, and 65% less compute to reach the same loss" (Appendix B.3). The optimum is flat: models between 0.6x and 2.2x the optimal size cost only 20% more compute (Fig. 12).

### Other findings

- **Shape barely matters.** At fixed $N$, loss varies by a few percent across wide ranges of aspect ratio, feed-forward ratio and head dimension; an $(n_{\text{layer}}, d_{\text{model}}) = (6, 4288)$ model is within 3% of $(48, 1600)$ (Fig. 5).
- **Large models are more sample-efficient**, reaching the same loss in fewer steps and fewer tokens (Figs. 2, 4).
- **Transfer.** Loss on other distributions (Books, Wikipedia, Common Crawl) is a power law in $N$ with nearly the same exponent and a roughly constant offset; it "depends almost exclusively on the in-distribution validation loss" (Sec. 3.2.2).
- **Transformers beat LSTMs** at equal $N$ because they keep improving on later tokens in the context (Fig. 7).

### Where the laws must fail

Loss cannot fall to zero because text has non-zero entropy. More sharply (Sec. 6.3): avoiding overfitting needs $D \propto N^{0.74} \propto C_{\min}^{0.54}$, yet compute-efficient single-epoch training supplies only $D \propto C_{\min}^{0.26}$. The two curves $L(C_{\min})$ and $L(D(C_{\min}))$ cross near $C^* \sim 10^{4}$ PF-days, $N^* \sim 10^{12}$ parameters, $D^* \sim 10^{12}$ tokens, $L^* \sim 1.7$ nats/token, though the authors warn these values are highly uncertain, varying by an order of magnitude in either direction with the fitted exponents. The authors conjecture that $L^*$ estimates the entropy of natural language. For comparison, Hoffmann et al. later fit an irreducible term $E = 1.69$ with a different tokenizer and corpus. Appendix C states the central caveat plainly: "we do not have a solid theoretical understanding for any of our proposed scaling laws."

## Examples

**Using the laws as a planning tool.**

- *How much data for a 1B-parameter model?* $D \gtrsim 5 \times 10^3 \times (10^9)^{0.74} \approx 2.3 \times 10^{10}$ tokens, which is why the 22B-token WebText2 sufficed for all models below $10^9$ parameters.
- *What does 10x compute buy?* Loss falls by the factor $10^{-0.050} \approx 0.89$. Optimal $N$ grows by $10^{0.73} \approx 5.4$x and tokens by $10^{0.27} \approx 1.9$x.
- *Predicted converged loss.* At $N = 1.5 \times 10^9$: $(8.8 \times 10^{13}/1.5 \times 10^9)^{0.076} \approx 2.30$ nats per token.

**Fitting a scaling law from pilot runs.**

```python
import numpy as np
from scipy.optimize import curve_fit

# pilot results: non-embedding params N, tokens D, final test loss L
def L_ND(X, log_Nc, log_Dc, aN, aD):                     # Kaplan Eq. (1.5)
    N, D = X
    return ((np.exp(log_Nc) / N) ** (aN / aD) + np.exp(log_Dc) / D) ** aD

theta, cov = curve_fit(L_ND, (N, D), L, p0=[np.log(1e14), np.log(1e13), 0.08, 0.10])
# extrapolate to the planned run and propagate the fit uncertainty in cov
```

This is an extrapolation exercise with the usual hazards. The fitted exponent is a slope in log-log space estimated from small-scale runs and applied orders of magnitude outside the data. Hoffmann et al. show that precisely this step, extrapolating from small models under a fixed learning-rate schedule, biased Kaplan's allocation exponents. A Bayesian fit with a [[Prior Predictive Checking|prior predictive check]] on the implied losses at target scale, and posterior uncertainty carried through to the design decision, is the natural upgrade.

## Connections

- [[Compute-Optimal Training (Chinchilla)]]: re-estimates the allocation and finds $N_{\text{opt}} \propto C^{0.5}$; read together with this note.
- [[Autoregressive Language Modeling and Pretraining]]: defines $L$, $N$, $D$ and $C \approx 6ND$.
- [[Overfitting and Information Criteria]]: $\delta L$ is an overfitting penalty that grows with a parameter-to-data ratio, in the spirit of the parameter-count penalties of AIC and WAIC, but measured directly on held-out loss and with a sub-linear exponent $N^{0.74}/D$.
- [[Power Analysis and Sample Size]]: both are design-stage calculations that use an assumed functional form to choose sample size before the expensive study is run. The scaling-law analogue of effect size is the exponent; the analogue of power is predicted loss at target scale.
- [[Shape (Saturation) Effects]]: power-law diminishing returns in each input, the same qualitative shape as media response curves.
- [[In-Context Learning and Few-Shot Prompting]]: GPT-3 was sized using these laws and extends the $L(C)$ trend by two more orders of magnitude.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[Transformer Architecture and Positional Encoding]]
- [[Cross Validation Checking]]: held-out loss as the target of model evaluation.
- [[Geo-Experiment Design and Power Analysis]]: simulation-based design under a fixed budget.
- [[Effective Sample Size and Monte Carlo Standard Error]]: another setting in which error falls as a power of effort ($S^{-1/2}$) and the practical question is how much effort to buy.
