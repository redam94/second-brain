---
title: "Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Chapters 1-3 only (printed pp. 5-65): 1 The Promise of Differential Privacy; 2 Basic Terms; 3 Basic Techniques and Composition Theorems"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]"
used_by:
  - "[[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]]"
  - "[[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]"
  - "[[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]"
  - "[[Dwork Roth 2014 - Randomized Response]]"
  - "[[Dwork Roth 2014 - Laplace Mechanism]]"
  - "[[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]"
  - "[[Dwork Roth 2014 - Basic Composition and Divergence Tools]]"
  - "[[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]"
  - "[[Dwork Roth 2014 - Sparse Vector Technique]]"
aliases:
  - Dwork and Roth 2014
  - The Algorithmic Foundations of Differential Privacy
  - Dwork Roth monograph chapters 1-3
---

# Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3 - Overview

> [!summary]
> The standard textbook on differential privacy (Foundations and Trends in Theoretical Computer Science 9(3-4):211-407). Chapters 1-3 give the motivation (why anonymization and summary statistics fail), the formal definition of $(\varepsilon,\delta)$-DP with its structural properties (post-processing, group privacy), and the core toolbox: randomized response, the Laplace mechanism, the exponential mechanism, simple and advanced composition, and the sparse vector technique. Only these three chapters are captured here; later chapters (query release, boosting, lower bounds, mechanism design, learning, local and streaming models, case studies) are out of scope.

## Overview

**Authors / venue.** Cynthia Dwork (Microsoft Research) and Aaron Roth (University of Pennsylvania), *The Algorithmic Foundations of Differential Privacy*, Found. Trends Theor. Comput. Sci. 9(3-4), 2014, pp. 211-407, DOI 10.1561/0400000042. 281 PDF pages for the whole monograph; the captured chapters occupy about 60.

**The promise (p. 5).** "You will not be affected, adversely or otherwise, by allowing your data to be used in any study or analysis, no matter what other studies, data sets, or information sources, are available." Utility is nonetheless consumed: the **Fundamental Law of Information Recovery** says overly accurate answers to too many questions destroy privacy in a spectacular way, and the goal of algorithmic research is to postpone this inevitability as long as possible.

**Key point of the book's framing.** "Differential privacy is a definition, not an algorithm." For a given task and $\varepsilon$ there are many DP algorithms, some much more accurate than others.

**Headline results of Chapters 1-3.**

| Result | Statement | Note |
|---|---|---|
| Def. 2.4 | $\Pr[\mathcal{M}(x)\in S]\le e^{\varepsilon}\Pr[\mathcal{M}(y)\in S]+\delta$ for $\|x-y\|_1\le1$ | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] |
| Prop. 2.1, Thm. 2.2 | post-processing preserves $(\varepsilon,\delta)$; group of size $k$ gets $(k\varepsilon,0)$ | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] |
| Claim 3.5 | coin-flip randomized response is $(\ln3,0)$-DP | [[Dwork Roth 2014 - Randomized Response]] |
| Thm. 3.6, 3.8 | Laplace mechanism with scale $\Delta f/\varepsilon$ is $(\varepsilon,0)$-DP; error $\le\ln(k/\delta)\Delta f/\varepsilon$ whp | [[Dwork Roth 2014 - Laplace Mechanism]] |
| Claim 3.9, Thm. 3.10-3.13 | Report Noisy Max and exponential mechanism are $(\varepsilon,0)$-DP; utility loss $O(\frac{\Delta u}{\varepsilon}\ln|R|)$ | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] |
| Thm. 3.14-3.16, Lemma 3.17-3.19 | basic composition adds $\varepsilon_i$ and $\delta_i$ | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] |
| Thm. 3.20, Cor. 3.21, Thm. 3.22 | advanced composition $\varepsilon'=\sqrt{2k\ln(1/\delta')}\,\varepsilon+k\varepsilon(e^{\varepsilon}-1)$; Gaussian mechanism | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] |
| Thm. 3.23-3.28 | AboveThreshold, Sparse, NumericSparse: pay privacy only for above-threshold queries | [[Dwork Roth 2014 - Sparse Vector Technique]] |

## Main Content

### Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Preface; Ch. 1 intro (promise, smoking example, Fundamental Law) | 3-6 | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] |
| 1.1 Privacy-preserving data analysis (linkage, re-identification, differencing, auditing, summary statistics, GWAS, ordinary facts, "just a few") | 6-10 | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] |
| 1.2 Bibliographic notes | 10 | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] |
| 2.1 The model of computation | 11-12 | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] |
| 2.2 Towards defining private data analysis (nothing-is-learned, semantic security analogy) | 12-15 | [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] |
| 2.3 Formalizing DP: randomized response intro, Def. 2.1-2.4, privacy loss | 15-19 | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]], [[Dwork Roth 2014 - Randomized Response]] |
| Prop. 2.1 post-processing, Thm. 2.2 group privacy | 18-20 | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] |
| 2.3.1 What DP promises; 2.3.2 What DP does not promise | 20-23 | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]] |
| 2.3.3 Final remarks (granularity, small epsilons, formalisms, synopsis, Remark 2.1 floating point) | 23-26 | [[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]], [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] |
| 2.4 Bibliographic notes | 26-27 | [[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]] |
| 3.1 Useful probabilistic tools (Chernoff, Azuma, Stirling) | 28-29 | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] |
| 3.2 Randomized response (Claim 3.5) | 29-30 | [[Dwork Roth 2014 - Randomized Response]] |
| 3.3 Laplace mechanism (Def. 3.1-3.3, Thm. 3.6, Ex. 3.1-3.4, Fact 3.7, Thm. 3.8) | 30-35 | [[Dwork Roth 2014 - Laplace Mechanism]] |
| Report Noisy Max (Claim 3.9) | 35-37 | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] |
| 3.4 Exponential mechanism (Def. 3.4, Thm. 3.10-3.13, Ex. 3.5-3.6, Remark 3.1) | 37-41 | [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] |
| 3.5 Composition theorems (Thm. 3.14-3.16, Cor. 3.15) | 41-43 | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] |
| 3.5.1 Technicalities (Def. 3.5-3.6, Remark 3.2, Lemma 3.17-3.19) | 43-48 | [[Dwork Roth 2014 - Basic Composition and Divergence Tools]] |
| 3.5.2 Advanced composition (Def. 3.7, Thm. 3.20, Cor. 3.21, Ex. 3.7) | 48-53 | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] |
| 3.5.3 Laplace versus Gauss (Def. 3.8, Thm. 3.22) | 53-54 | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] |
| 3.5.4 Remarks on composition (weak quantification, humans and ghosts) | 54-55 | [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]] |
| 3.6 Sparse vector technique (Alg. 1-3, Thm. 3.23-3.28) | 55-64 | [[Dwork Roth 2014 - Sparse Vector Technique]] |
| 3.7 Bibliographic notes | 64-65 | the notes above (each cites its originators) |
| Ch. 4-13, Appendices A-B (Gaussian proof, composition proof) | 66-281 | not captured (out of assigned scope); Appendix A's Gaussian theorem is stated but not proved here |

## Examples

Worked examples captured with full setup, solution and interpretation: the coin-flip randomized response ([[Dwork Roth 2014 - Randomized Response]]), first names and counting queries ([[Dwork Roth 2014 - Laplace Mechanism]]), pumpkin pricing and best-of-two ([[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]), Bob's lifetime of 10,000 databases ([[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]).

## Connections

- **Marketing measurement.** The monograph's toolbox maps directly onto privacy-era measurement design: counting queries and histograms with bounded contribution (Laplace); choosing the best of $m$ candidates without releasing every score (exponential mechanism, Report Noisy Max, for example picking the top creative or channel); a privacy budget across repeated reports (composition); and monitoring many metrics but paying only when one crosses a threshold (sparse vector). The structural properties are what an analyst relies on: post-processing means any model fit on a DP release carries no extra privacy cost, and composition means every extra cut of the same users spends budget. See [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]], [[Conversion Lift Studies on Ad Platforms]] and [[Bayesian Media Mix Modeling - Overview]].
- The multiple-comparison flavour of accuracy statements (union bound over $k$ queries gives $\ln(k/\delta)$ inflation) parallels [[Multiple Testing Corrections]].

## See Also

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]] — the original paper behind the Laplace mechanism.
- [[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]] — statistical accuracy of these mechanisms.
