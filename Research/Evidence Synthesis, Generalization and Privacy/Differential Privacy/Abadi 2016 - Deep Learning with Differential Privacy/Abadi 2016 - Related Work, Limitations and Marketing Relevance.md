---
title: "Abadi 2016 - Related Work, Limitations and Marketing Relevance"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 6 Related Work and Sec. 7 Conclusions, pp. 9-10 (marketing section is this vault's synthesis)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]"
  - "[[Abadi 2016 - MNIST and CIFAR-10 Experiments]]"
used_by:
  - "[[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]"
aliases:
  - DP-SGD related work and limitations
  - Abadi privacy-era measurement relevance
---

# Abadi 2016 - Related Work, Limitations and Marketing Relevance

> [!summary]
> The paper positions DP-SGD against secure computation, k-anonymity, convex private learning and earlier neural-network privacy schemes, and names the moments accountant as closely related to Renyi DP and concentrated DP. Open problems are other architectures (LSTMs), closing the CIFAR-10 accuracy gap and adaptive parameter control. For marketing measurement the paper is relevant as a template for training predictive models on user-level data under a quantified budget; the paper itself says nothing about advertising.

## Overview

Section 6 organizes related work along three axes: privacy guarantees, learning algorithm and model class. Section 7 concludes with results and future directions. The last part of this note is the vault's own grounded reading for marketing-measurement work and is labelled as inference.

## Main Content

### Section 6: related work

- **Privacy guarantees.** Early privacy-preserving learning used secure function evaluation / multi-party computation, where data are split between parties; here the data are held centrally and the concern is leakage from the output (the model). k-anonymity and related notions generalize and suppress identifying attributes but have strong theoretical and empirical limitations in high-dimensional, diverse data. The paper keeps raw records intact and perturbs derived quantities (gradients) instead of sanitizing inputs.
- **Learning algorithm.** The common target is convex optimization (empirical risk minimization), amenable to many techniques; concurrent work by Wu et al. achieves 83% on MNIST via convex ERM. Multi-layer neural networks are non-convex and trained by SGD, whose theoretical guarantees are poorly understood. For CIFAR the paper uses DP PCA (Dwork et al.).
- **Model class.** The first end-to-end DP system on the Netflix Prize (McSherry and Mironov) identified sufficient statistics computable by a Gaussian mechanism; no such statistics exist for the paper's networks. Shokri and Shmatikov's distributed training uses additive noise from a sensitivity estimate and per-parameter accounting; by the paper's preferred measure the total privacy loss per participant on MNIST exceeds several thousand. Phan et al. perturb objective functions for autoencoders.
- **Relation to other accounting notions.** The moments accountant is closely related to Renyi DP (Mironov), which proposes scaled $\alpha(\lambda)$ as a privacy quantifier. Concurrent work of Bun and Steinke defines (zero-)concentrated DP via a linear upper bound on $\alpha(\lambda)$ generalizing Dwork and Rothblum. See [[Mironov 2017 - Renyi Divergence and the RDP Definition]].

### Section 7: conclusions

DNNs can be trained with modest total privacy loss, computed over entire models with many parameters: MNIST 97% and CIFAR-10 73% at $(8,10^{-5})$-DP. Because the method acts on gradient computations, it adapts to NAG, momentum, AdaGrad and SVRG. The moments accountant may be of independent interest for automated analysis of complex composite mechanisms beyond advanced composition. Future work: LSTMs for language modelling, larger datasets and further accuracy gains.

### Limitations and caveats (read from the text)

> [!definition] Caveats explicit or implicit in the paper
> 1. **Sampling model.** Analysis assumes each example enters a lot independently with probability $q$; the implementation permutes and partitions for efficiency. The paper states this difference openly.
> 2. **Fixed schedule.** Privacy parameters and the number of iterations are fixed in advance to avoid adaptive-parameter attacks (odometer vs filter distinction).
> 3. **Public data assumption.** Pretrained convolutional layers (CIFAR) assume a public dataset exists; privacy of that data is not protected.
> 4. **Accuracy gap.** About 7 points on CIFAR-10 versus the non-private model.
> 5. **Clipping bias.** Clipping destroys unbiasedness of the gradient estimate, and the clipping bound trades bias against noise.
> 6. **Adjacency.** Guarantees are for add/remove of one example; user-level privacy requires group-privacy scaling when one user contributes many records.
^def-abadi-caveats

### Marketing-measurement relevance (inference, not from the paper)

The user works in marketing measurement and Bayesian causal inference. The grounded connections are:

1. **Per-record vs aggregate privacy.** DP-SGD protects individual training rows in a *model-training* setting. Typical marketing-mix modelling (MMM) uses aggregate time series, where a single user's influence is already small; DP is more directly relevant when user-level data (conversions, impressions, device or household graphs) feed a predictive model, as in conversion-modelling or lookalike systems.
2. **Budget accounting is the contribution.** The $(\varepsilon,\delta)$ you can claim after $T$ training steps depends on the accountant, not just on $\sigma$. A team reporting "DP training" without a stated accountant, $q$, $T$ and $\delta$ has not communicated a guarantee.
3. **Utility cost is task dependent** (MNIST drop 1.3 points vs CIFAR-10 about 7). Any DP-trained attribution or response model should be benchmarked against its non-private counterpart on the same holdout, with the privacy parameters reported.
4. **Tuning consumes budget** ([[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]]), which echoes the practice of tuning MMM priors and adstock/saturation settings on the same data; see [[Bayesian Media Mix Modeling - Overview]].
5. **Experiments.** Results from lift or geo experiments are aggregate and already low-sensitivity; the privacy question there is how the platform reports them; see [[Conversion Lift Studies on Ad Platforms]] and [[Geo-Experiment Methodology - Overview]]. This paper does not address those reporting channels.

## Examples

> [!example] Reporting a DP-trained model honestly
> Setup: a conversion-propensity model trained with DP-SGD on 2 million user rows, lot size 4,000 ($q=0.002$), $\sigma=1.1$, 5,000 steps.
> What must be reported: $q$, $\sigma$, $C$, $T$, $\delta$ (below $1/N=5\times10^{-7}$), the accountant used, and the resulting $\varepsilon$ from [[Abadi 2016 - Moments Accountant Theorems and Proofs]]. Also report holdout performance of the non-private model trained on the same data. The numbers here are illustrative placeholders, not results from the paper.
^ex-reporting

## Connections

- Hypothesis-testing semantics of the guarantee (what an attacker can infer) are in [[Dong Roth Su 2022 - Trade-off Functions and f-DP]].
- A production DP release where the unit is a count table rather than a model: [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]].

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
