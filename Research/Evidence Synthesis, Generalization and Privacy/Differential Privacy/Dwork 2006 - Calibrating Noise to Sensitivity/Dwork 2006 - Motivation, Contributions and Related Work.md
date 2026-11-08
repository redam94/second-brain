---
title: "Dwork 2006 - Motivation, Contributions and Related Work"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Abstract and Sec. 1 (1, 1.1, 1.2, 1.3), pp. 17-22"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]"
used_by:
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
aliases:
  - DMNS 2006 motivation
  - History before differential privacy
---

# Dwork 2006 - Motivation, Contributions and Related Work

> [!summary]
> The paper starts from noisy-sum privacy ($f=\sum_i g(x_i)$, $g\in[0,1]$) studied by Dinur-Nissim, Dwork-Nissim and Blum et al., and extends it to arbitrary $f$ by calibrating noise to **sensitivity**. It replaces "evolution of confidence" privacy arguments with one clean multiplicative definition and gives separation results between interactive and non-interactive release. The related-work and discussion sections explain why earlier definitions (noise magnitude, $k$-anonymity, additive closeness) were inadequate.

## Overview

**Setting (pp. 17-18).** A trusted server (curator) holds database $x$. It either publishes once (the *non-interactive* model: "sanitized" data, synthetic data, de-identification) or answers analyst queries (the *interactive* model). The question is what condition on the server's algorithm, the *mechanism*, guarantees "not too much is revealed about any one individual".

**Previous work (p. 18).** Noisy sums $f(x)=\sum_i g(x_i)$ with $g$ mapping rows to $[0,1]$. The paper extends the analysis to general $f$ and proves privacy holds when "the standard deviation of the noise" is calibrated to the sensitivity of $f$, "roughly... the amount that a change in any single argument to $f$ can change its output". For several applications "substantially less noise is needed than was previously understood".

## Main Content

### Contributions (Sec. 1.1, pp. 19-21)

> [!definition] Contribution 1 - Definition of privacy (Sec. 2)
> Equivalence of $\varepsilon$-differential privacy to notions based on semantic security and simulation is proved (in the original; here the discussion is in Sec. 2.2 and "Appendix 4.4" pointers). *Adjacent databases* $x,x'$: one is a subset of the other and the larger contains the data of exactly one more individual. Interpretation: whatever the adversary knows beforehand, even both $x$ and $x'$, it learns "essentially the same things, with essentially the same probabilities, independent of whether the actual dataset is $x$ or $x'$."
^def-contribution-privacy

> [!example] The smoker example (p. 19)
> Suppose only the larger dataset contains Alice, and the adversary knows Alice is a smoker but not whether she has lung disease. Seeing a differentially private study may teach the adversary a strong smoking-lung disease correlation in the sampled population, and hence that Alice is at high risk. But the adversary would draw this conclusion *whether or not Alice's data were included*. Differential privacy "limits the adversary to these kinds of aggregate conclusions". It does not promise that facts true of the population stay secret.
^ex-smoker-alice

- **Multiplicative vs additive.** Traditional cryptographic definitions consider additive changes in probability. A hybrid argument shows nontrivial utility requires non-negligible (in $n$) information leakage, so the multiplicative measure is used because it "provides meaningful guarantees even when $\varepsilon$ is a small constant". Example 3 (below, in the definitions note) shows why statistical difference is insufficient.
- **Sensitivity-based analysis (Sec. 3).** Sensitivity of histograms, contingency tables and covariance matrices is independent of the output dimension, giving noise $O(1)$ where previous work used noise proportional to the dimension (and $\sqrt d$ in Blum et al. 2005). Two general classes of low-sensitivity functions: distance from a set, and functions approximable from a random sample.
- **Limits on non-interactive mechanisms (Sec. 4).** For any non-interactive DP mechanism there exist low-sensitivity $f$ that "cannot be approximated at all based on $\mathcal{M}(x)$, unless the database is very large": with $d$-bit entries the database must have $2^{\Omega(d)}$ entries to answer all low-sensitivity queries (even sum queries) with nontrivial accuracy. "This is not true in the interactive setting, since one can answer the query $f$ with little noise regardless of $n$." The separation is significant since much of the data-mining and statistical literature focused on non-interactive, "local" or randomized-response schemes.

### The interpretation of "closure" (p. 19)

Differential privacy "satisfies a number of important properties. Foremost among these are closure under composition and postprocessing. It is these properties that permit differentially private programming, that is, the construction of privacy-preserving algorithms for sophisticated analytical tasks from the creative combination of differentially private primitives." Footnote 1 records that the original version called the notion $\varepsilon$-indistinguishability.

### Related work (Sec. 1.2, pp. 20-22)

| Strand | What it did | What was wrong or limited |
|---|---|---|
| Statistical disclosure control (Adam and Wortmann 1989; Denning 1980) | Input perturbation (modify data, answer from modified data) and output perturbation (exact answers, noisy output) | Inherent limitations of each, reduced interest in CS community |
| Agrawal and Srikant 2000 | Learn original input distribution from an input-perturbed database; privacy = noise magnitude | Ignores what an adversary knowing the underlying distribution can infer (Agrawal and Aggarwal 2001) |
| Evfimievski, Gehrke, Srikant 2003 | Worst-case change in a priori to a posteriori beliefs | Special case of Def. 2.1 for limited input-perturbation protocols; "$\gamma$-amplification" with $\gamma=e^{\varepsilon}$ is the local version (footnote 4) |
| Dinur-Nissim 2003, Dwork-Nissim 2004, Blum et al. 2005 (SuLQ) | Semantic-security-style definitions; noisy sums; if queries unrestricted, noise must be linear in $n$ (unbounded adversary) or $\Omega(\sqrt n)$ (polynomially bounded), otherwise the database is reconstructed almost exactly; with only a sublinear number of queries, $o(\sqrt n)$ noise suffices | Allowed large privacy loss with negligible probability; noise grew with number of queries |
| $k$-anonymity (Sweeney 2002), protection against isolation (Chawla et al.) | Syntactic and geometric notions | $k$-anonymity does not capture semantic privacy. The techniques here give protection against isolation |

Definition 2.1 is the same as Evfimievski et al. (2003) adapted to general interactive protocols; an equivalent semantic-security-flavoured formulation is close to the Dinur-Nissim line, which tolerated a large loss of privacy "with negligible probability".

### Discussion (Sec. 1.3, p. 22)

- Differential privacy has become central, "the first definition that ensures precise and meaningful guarantees in the presence of arbitrary side information".
- First large-scale public implementation of a variant: US Census Bureau's OnTheMap (Machanavajjhala et al. 2008). The local model (randomize before collection) was deployed for browser telemetry (Erlingsson et al. 2014, RAPPOR) and for learning trending behaviours (Federighi 2016).
- This version is an update of the TCC paper "with revisions to presentation and terminology" and does not survey subsequent work. Pointers: Dwork and Roth (2014), Vadhan (2016), Hardt et al. (2016), Ligett et al. (2016).

## Examples

Examples of what the paper means by "privacy" and "non-privacy" are in the Alice smoker example above and the three numbered examples in [[Dwork 2006 - Differential Privacy Definition and Basic Examples]].

## Connections

- Why this matters for measurement practice: the paper's smoker example is precisely the situation in lift or MMM reporting. A published aggregate effect (for example, an incrementality estimate for an audience segment) necessarily reveals population-level facts that apply to individuals. DP does not hide those; it hides the membership or contribution of any one person. This is the right mental model when privacy-preserving measurement APIs add noise.
- The pre-DP history (reconstruction below $\Omega(\sqrt n)$ noise) is why aggregate reports alone are not "safe"; see [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] for the measurement-side consequences of privacy limits.

## See Also

- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]
- [[Dwork Roth 2014 - Motivation, Attacks and Why Anonymization Fails]] (the textbook version of the same motivation)
