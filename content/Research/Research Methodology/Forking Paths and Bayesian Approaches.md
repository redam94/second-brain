---
title: "Forking Paths and Bayesian Approaches"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/bayesian-statistics
  - topic/multiple-comparisons
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-10-13
folder: "Research Methodology"
aliases:
  - "Bayesian approach to multiple comparisons"
doc_type: concept
source_location: "p_hacking.pdf pp. 1-14"
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Gelman Loken 2013 - Garden of Forking Paths - Overview]]"
  - "[[The Experimental Ideal]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Multiple Comparisons - Bayesian Perspective]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
  - "[[Q - Differences Between Frequentist and Bayesian Statistics]]"
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
---

# Forking Paths and Bayesian Approaches

> [!summary]
> The [[Garden of Forking Paths]] problem is fundamentally about frequentist p-values being invalid when analysis is data-contingent. Bayesian and multilevel approaches offer a principled alternative by regularizing estimates and naturally accounting for multiplicity.
^summary

## Why P-Values Are Vulnerable

The p-value's interpretation depends on the sampling distribution of the test statistic *under repetition of the same procedure*. But if the procedure itself changes with the data ($T(y; \phi(y))$), the standard sampling distribution is wrong. The p-value is computed as if the test were pre-specified when it wasn't.

## The Bayesian Alternative

Gelman & Loken (§4.2, p. 12) write that "once the claim of statistical significance is abandoned, one can take a Bayesian, or approximately Bayesian, view and consider the observed comparison as evidence of the underlying effect."

Bem's ESP result (53.1% hit rate, $t(99)=2.51$, $p = .01$, $d=0.25$) shows that **the answer depends on the prior**:

- **Flat or locally flat prior** (the true hit rate equally likely anywhere in $[0,1]$): the posterior probability that the hit rate exceeds 0.5 is **over 99%**. This is one reading of the one-sided p-value of 0.01 (Greenland & Poole 2013).
- **An informed, skeptical prior** (the one the authors consider appropriate, since there was no track record of 53% precognition success and Bem's experiments failed to replicate): the posterior probability of a real effect is far lower than the flat-prior number.

The authors add that the Bayesian analysis must condition on *all* the data, not only the single highlighted comparison, which "can require additional effort in the form of hierarchical modeling" (p. 13). Details: [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]].

## Hierarchical Models as Natural Regularization

[[Hierarchical Models]] provide a structural solution to the multiple comparisons problem:

- **Partial pooling**: estimates for many groups are automatically shrunk toward the grand mean
- Groups with less data are regularized more heavily
- This is equivalent to an implicit multiplicity correction — but derived from the model structure, not an ad hoc penalty
- The James-Stein phenomenon: pooled estimates dominate unpooled ones

## Practical Recommendations

1. **Use multilevel models** when studying effects across many groups or conditions
2. **Report uncertainty**: full posterior intervals convey strength of evidence better than p-values
3. **Pre-register** analyses to reduce (but not eliminate) forking paths
4. **Regularize**: priors that incorporate domain knowledge prevent extreme estimates from noisy data

## See Also

- [[Garden of Forking Paths]] — the problem statement
- [[Researcher Degrees of Freedom]] — the sources of analytic flexibility
- [[Multiple Testing Corrections]] — the frequentist alternative (Bonferroni, FDR) for multiplicity
- [[Hierarchical Models]] — the Bayesian structural solution via partial pooling
- [[Model Checking]] — evaluating whether the model is adequate
- [[The Experimental Ideal]] — pre-registration as a complementary (frequentist) safeguard
- [[Asymptotics and Frequentist Connections]] — how Bayesian and frequentist inference relate formally
- [[Power Analysis and Sample Size]] — under-powered studies amplify forking paths; Bayesian posterior simulation as an alternative to power calculations
- [[Pre-registration and Open Science - Overview]] — how to actually pre-register (the practice this note recommends)
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — argues Bayesian statistics adds degrees of freedom; a counterpoint

## What the Paper Actually Says About Bayes (coverage audit 2026-10-13)

> [!note] Precision on the Bem example
> The example above is shorthand. Gelman & Loken's exact argument (§4.2, pp. 12-13) has three steps:
> 1. With a **flat or locally flat prior**, Bem's 53.1% hit rate ($t(99)=2.51$, $p=.01$, $d=0.25$) gives a posterior probability **over 99%** that the true rate exceeds 0.5. This is one reading of the one-sided p-value (Greenland & Poole 2013). Worked: $\Phi(2.51)\approx0.994$.
> 2. That prior is **inappropriate**: a new idea with a poor track record, and Bem's results failed to replicate. The authors defend a more pessimistic prior as reasonable given the available information. Alternatively, a pre-registered p-value could be convincing.
> 3. The posterior must condition on **all** the data, not just the highlighted comparison. "An appropriate Bayesian analysis can require additional effort in the form of hierarchical modeling" (p. 13).
>
> Full treatment, including a table of how skeptical priors shrink the estimate: [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]].
^note-precision-on-the-bem-example

> [!warning] The authors' own caveat on multilevel models (§4.3, p. 14)
> Multilevel modeling "can resolve multiple-comparisons issues" (citing Gelman, Hill & Yajima 2012), but "the practical difficulties of such an approach are not trivial". With few comparisons or a highly structured problem, "inference can be sensitive to model assumptions". The authors call general approaches to analysing multiple potential comparisons "an area for future research." See [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons#^alg-gl-remedies]].
^warning-the-authors-own-caveat-on

Paper hub: [[Gelman Loken 2013 - Garden of Forking Paths - Overview]].
