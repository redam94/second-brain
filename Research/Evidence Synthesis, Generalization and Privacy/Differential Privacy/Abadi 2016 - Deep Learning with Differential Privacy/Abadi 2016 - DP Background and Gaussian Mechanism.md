---
title: "Abadi 2016 - DP Background and Gaussian Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 1 (threat model) and Sec. 2.1, pp. 1-3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]"
used_by:
  - "[[Abadi 2016 - DP-SGD Algorithm and Implementation]]"
  - "[[Abadi 2016 - Moments Accountant Theorems and Proofs]]"
aliases:
  - Abadi Gaussian mechanism background
  - Abadi approximate DP definition
---

# Abadi 2016 - DP Background and Gaussian Mechanism

> [!summary]
> The paper uses approximate $(\varepsilon,\delta)$-DP over adjacent datasets that differ in one example, the Gaussian additive-noise mechanism calibrated to $\ell_2$ sensitivity, and the "privacy accountant" idea of McSherry. A single Gaussian mechanism satisfies infinitely many $(\varepsilon,\delta)$ pairs, which is the limitation the moments accountant removes.

## Overview

Section 2.1 fixes the notation used everywhere else in the paper: adjacency, the DP definition, sensitivity, the Gaussian mechanism, composition, and the three-step blueprint for designing a private additive-noise mechanism. Section 1 supplies the threat model.

## Main Content

> [!definition] Definition 1: $(\varepsilon,\delta)$-differential privacy
> A randomized mechanism $\mathcal M:\mathcal D\to\mathcal R$ with domain $\mathcal D$ and range $\mathcal R$ satisfies $(\varepsilon,\delta)$-DP if for any two adjacent inputs $d,d'\in\mathcal D$ and any subset of outputs $S\subseteq\mathcal R$,
> $$\Pr[\mathcal M(d)\in S]\le e^{\varepsilon}\Pr[\mathcal M(d')\in S]+\delta.$$
> Adjacent means the datasets differ in a single entry: one image-label pair present in one and absent in the other (add/remove adjacency). The $\delta$ term (Dwork et al.) allows plain $\varepsilon$-DP to be broken with probability $\delta$, and $\delta$ should preferably be smaller than $1/|d|$.
^def-abadi-dp

**Properties the paper relies on.**
- *Composability*: a mechanism built from DP components is DP; this enables modular design.
- *Group privacy*: graceful degradation if inputs are correlated, such as several records contributed by one person.
- *Robustness to auxiliary information*: guarantees are unaffected by side information the adversary holds.

> [!definition] Sensitivity and the Gaussian mechanism
> For a real-valued $f:\mathcal D\to\mathbb R$ the sensitivity is $S_f=\max_{d,d'\text{ adjacent}}|f(d)-f(d')|$. The Gaussian noise mechanism is
> $$\mathcal M(d)\triangleq f(d)+\mathcal N(0,S_f^2\sigma^2),$$
> i.e. noise with standard deviation $S_f\sigma$. A single application satisfies $(\varepsilon,\delta)$-DP if $\delta\ge\tfrac45\exp\!\big(-(\sigma\varepsilon)^2/2\big)$ and $\varepsilon<1$ (Dwork and Roth, Theorem 3.22). The analysis can be applied post hoc, and there are infinitely many $(\varepsilon,\delta)$ pairs satisfying it.
^def-abadi-gaussian

Note that $\delta\ge\tfrac45e^{-(\sigma\varepsilon)^2/2}$ is the same as $\sigma\ge\sqrt{2\ln(1.25/\delta)}/\varepsilon$, the familiar calibration, since $4/5=1/1.25$.

**Composition and accounting.** Repeated additive-noise mechanisms compose by the basic composition theorem or by advanced composition theorems and refinements. Tracking accumulated privacy loss and enforcing a policy is the job of the **privacy accountant** (McSherry). The paper's blueprint for a DP additive-noise mechanism has three steps: (1) approximate the functionality by a sequential composition of bounded-sensitivity functions; (2) choose the noise parameters; (3) perform the privacy analysis of the resulting mechanism. Sections 3-4 follow this exactly.

**Threat model (Section 1).** Protection holds against an adversary with full knowledge of the training mechanism and access to the model parameters. This matters for on-device models, where parameters may be exposed. Because the guarantee concerns one record, the adversary may even control some or all of the other training data (as in crowdsourcing). Model-inversion attacks (Fredrikson et al.) need only black-box access; the paper's adversary is stronger.

## Examples

> [!example] What the classical Gaussian formula gives for $\sigma=4$
> Setup: Gaussian mechanism with noise multiplier $\sigma=4$, unit sensitivity. Target $\varepsilon=0.9$ (must be below 1).
> Solution: $(\sigma\varepsilon)^2/2=(3.6)^2/2=6.48$, so $\delta\ge0.8\,e^{-6.48}\approx1.2\times10^{-3}$. To reach $\delta=10^{-5}$, solve $0.8\,e^{-(\sigma\varepsilon)^2/2}=10^{-5}$, i.e. $\varepsilon=\sqrt{2\ln(0.8/10^{-5})}/\sigma=\sqrt{22.58}/4\approx1.19$, which is above 1 and so outside the theorem's validity range.
> Interpretation: for one step with $\sigma=4$ the textbook theorem cannot even certify $\delta=10^{-5}$. The moments accountant avoids this restriction by working with the exact moments of the privacy loss ([[Abadi 2016 - Moments Accountant Theorems and Proofs]]). This worked number is a recomputation, not a figure from the paper.
^ex-abadi-gauss-sigma4

## Connections

- Used by: [[Abadi 2016 - DP-SGD Algorithm and Implementation]] (the Gaussian mechanism applied per step).
- The same Gaussian mechanism is analyzed exactly by Renyi divergence in [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] and by hypothesis testing in [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- A deployed count-release system that chooses zCDP over this $(\varepsilon,\delta)$ formulation: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]]
- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] — the source of the Gaussian-mechanism condition and advanced composition used here.
- [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] — the definition in textbook form.
