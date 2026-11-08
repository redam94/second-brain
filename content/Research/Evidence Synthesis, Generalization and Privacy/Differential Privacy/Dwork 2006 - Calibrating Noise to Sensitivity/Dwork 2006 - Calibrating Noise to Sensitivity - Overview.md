---
title: "Dwork 2006 - Calibrating Noise to Sensitivity - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Whole paper, J. Privacy and Confidentiality 7(3), pp. 17-51 (2016-17 reprint of TCC 2006): Sec. 1 Introduction, Sec. 2 Definitions, Sec. 3 Sensitivity and Privacy, Sec. 4 Separating Interactive from Non-Interactive Mechanisms, References"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Dwork 2006 - Motivation, Contributions and Related Work]]"
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
  - "[[Dwork 2006 - Postprocessing, Composition and Group Privacy]]"
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
  - "[[Dwork 2006 - Low-Sensitivity Functions and Applications]]"
  - "[[Dwork 2006 - Sensitivity in General Metric Spaces]]"
  - "[[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]"
  - "[[Dwork 2006 - Proof of the Separation Lemma]]"
aliases:
  - Dwork McSherry Nissim Smith 2006
  - Calibrating Noise to Sensitivity in Private Data Analysis
  - DMNS 2006
---

# Dwork 2006 - Calibrating Noise to Sensitivity - Overview

> [!summary]
> Dwork, McSherry, Nissim and Smith introduce **$\varepsilon$-differential privacy** (originally "$\varepsilon$-indistinguishability") and show that adding Laplace noise of scale $S(f)/\varepsilon$, where $S(f)$ is the **global $\ell_1$ sensitivity** of the query $f$, is enough to release $f(x)$ privately, independent of database size and (for histograms, contingency tables, covariance) of output dimension. They also prove that *non-interactive* private releases must be tailored to a query class, whereas an *interactive* Laplace mechanism can answer any single low-sensitivity query with $O(1/\varepsilon)$ error. This is the founding paper of the field.

## Overview

**Authors / venue.** Cynthia Dwork, Frank McSherry, Kobbi Nissim, Adam Smith. Preliminary version at TCC 2006 (pp. 265-284); this source is the 2016-17 *Journal of Privacy and Confidentiality* reprint with revised terminology (set-difference metric instead of Hamming, composition and post-processing lemmas added, bibliographic notes after each section). Pages cited below are the journal pages 17-51.

**Research question.** A trusted curator holds a sensitive database $x$ and wants to answer queries $f(x)$ with noise. How should the noise be *calibrated*, and what definition of privacy loss makes that calibration meaningful against an adversary with arbitrary side information?

**Contributions (Sec. 1.1, pp. 19-20).**
1. *Definition* of $\varepsilon$-differential privacy as a multiplicative bound on output distributions of neighbouring databases, with closure under composition and post-processing (Sec. 2).
2. *Sensitivity-based calibration*: Laplace noise $\mathrm{Lap}(S(f)/\varepsilon)$ per coordinate gives $\varepsilon$-DP, even adaptively (Sec. 3.1), with noise independent of dimension for histograms, contingency tables and covariance matrices (Sec. 3.2).
3. *General metric spaces* generalisation of the noise mechanism (Sec. 3.3).
4. *Separation* of interactive from non-interactive mechanisms: any non-interactive $\varepsilon$-DP release needs $2^{\Omega(d)}$ rows to approximate most $d$-bit parity-sum queries (Sec. 4).

**Key results at a glance.**

| Result | Statement | Note |
|---|---|---|
| Def. 2.1 | $\Pr(\mathcal{M}(x)\in S)\le e^{\varepsilon}\Pr(\mathcal{M}(x')\in S)$ for neighbours $x,x'$ | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] |
| Prop. 2.4, Lemmas 2.5, 2.6, 2.8 | post-processing free; $\varepsilon$ adds under composition; $(k,\varepsilon)$ group privacy from $(1,\varepsilon/k)$ | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] |
| Prop. 3.3, Thm. 3.4 | $f(x)+\mathrm{Lap}(S(f)/\varepsilon)^d$ is $\varepsilon$-DP, also adaptively | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] |
| Lemma 3.5, Sec. 3.2 | histograms: $S=1$; mean/covariance via a $3\varepsilon$ mechanism; sample-complexity bound $S(f)\le 2\sigma$ | [[Dwork 2006 - Low-Sensitivity Functions and Applications]] |
| Thm. 3.7 | exponential-type sampling $\propto\exp(\varepsilon d_Z(y,f(x))/2S_Z(f))$ is $\varepsilon$-DP | [[Dwork 2006 - Sensitivity in General Metric Spaces]] |
| Thm. 4.1, Prop. 4.2 | non-interactive / local mechanisms need $n=2^{\Omega(d)}$-ish rows | [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] |
| Lemma 4.3, Claim 4.4 | random pairwise-independent subsets approximate the output distribution | [[Dwork 2006 - Proof of the Separation Lemma]] |

## Main Content

### Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract | 17 | this note; [[Dwork 2006 - Motivation, Contributions and Related Work]] |
| 1 Introduction (intro, line of work) | 17-19 | [[Dwork 2006 - Motivation, Contributions and Related Work]] |
| 1.1 Contributions | 19-21 | [[Dwork 2006 - Motivation, Contributions and Related Work]] |
| 1.2 Related Work (perturbation, definitional work, sum queries) | 20-22 | [[Dwork 2006 - Motivation, Contributions and Related Work]] |
| 1.3 Discussion (impact, deployments) | 22 | [[Dwork 2006 - Motivation, Contributions and Related Work]] |
| 2 Definitions (Def. 2.1, Remark 2.1, Examples 1-3, Def. 2.2-2.3) | 23-27 | [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] |
| 2.1 Fundamental Properties (Prop. 2.4, Lemmas 2.5, 2.6, Def. 2.7, Lemma 2.8) | 27-29 | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] |
| 2.2 Bibliographic Notes and Discussion (interpretations, variants) | 29-31 | [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] |
| 3 Sensitivity and Privacy; Def. 3.1, Example 4 | 31-32 | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] |
| 3.1 Calibrating Noise (Def. 3.2, Prop. 3.3, Thm. 3.4) | 32-33 | [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] |
| 3.2 Useful Insensitive Functions (disjoint analyses, distance from property, mean/covariance, Lemma 3.5) | 34-36 | [[Dwork 2006 - Low-Sensitivity Functions and Applications]] |
| 3.3 Sensitivity in General Metric Spaces (Def. 3.6, Thm. 3.7, Remark 3.1) | 36-37 | [[Dwork 2006 - Sensitivity in General Metric Spaces]] |
| 3.4 Bibliographic Notes (Gaussian, smooth sensitivity, PTR, linear queries, exponential mechanism) | 38 | [[Dwork 2006 - Sensitivity in General Metric Spaces]] |
| 4 Separating Interactive from Non-Interactive (Obs. 1, Thm. 4.1) | 38-40 | [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] |
| 4.1 Local mechanisms (Prop. 4.2) | 40-41 | [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] |
| 4.2 Proving the separation results (hybrid argument) | 41-43 | [[Dwork 2006 - Proof of the Separation Lemma]] |
| 4.3 Random subsets approximate output distribution (Lemma 4.3, Claim 4.4) | 43-44 | [[Dwork 2006 - Proof of the Separation Lemma]] |
| 4.4 Bibliographic Notes (lower bounds) | 45 | [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] |
| Acknowledgments, References | 45-51 | not captured (bibliography); key cited works named inline in the notes |

## Examples

The three worked examples in the paper (randomized response, Laplace-noised count, and the failure of statistical distance) are fully reproduced with computations in [[Dwork 2006 - Differential Privacy Definition and Basic Examples]]. The mean/covariance mechanism is worked in [[Dwork 2006 - Low-Sensitivity Functions and Applications]].

## Connections

- Relevance to marketing measurement: the Laplace mechanism with a bounded per-user contribution is the standard building block of privacy-preserving aggregate reporting (noisy conversion counts by campaign or geo). Because the noise law and scale $S(f)/\varepsilon$ are public, a Bayesian analyst can write the noise into the likelihood as known measurement error (see [[Bayesian Media Mix Modeling - Overview]]). The cost is $O(1/\varepsilon)$ per released count regardless of how many users contributed, so large aggregates are almost unaffected while small cells (campaign by day) are not. See also [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].
- Companion foundations: the textbook treatment of the same material is [[Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview]]; the statistical re-reading (hypothesis-testing interpretation, rates of convergence) is [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]].

## See Also

- [[Power Analysis and Sample Size]] (the hypothesis-testing language used to interpret $\varepsilon$)
