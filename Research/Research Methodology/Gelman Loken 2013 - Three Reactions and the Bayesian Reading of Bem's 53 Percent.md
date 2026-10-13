---
title: "Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/bayesian-statistics
  - topic/p-values
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken 2013, §4.2 Possible reactions, pp. 11-13"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]]"
  - "[[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]]"
aliases:
  - "Concession, Insistence, Contingency"
  - "Bem 53.1 percent Bayesian reanalysis"
  - "Flat prior one-sided p-value correspondence"
---

# Gelman & Loken (2013) §4.2 — Three Reactions and the Bayesian Reading of Bem's 53%

> [!summary]
> Researchers told their analysis was data-contingent can respond in three ways. **Concession**: the p-values overstate the evidence. **Insistence**: the same analysis would have been run on any data. **Contingency**: yes, the paper would differ with other data, and that is how science should work. Gelman & Loken find Insistence implausible for three stated reasons. They take Contingency seriously, but note it gives up the p-value's meaning. What remains is a Bayesian reading. With a flat prior, Bem's 53.1% hit rate ($t(99)=2.51$, one-sided $p\approx0.01$) gives more than 99% posterior probability that the true rate exceeds 0.5. That flat prior is inappropriate, and a proper analysis must condition on all comparisons, not just the highlighted one. That calls for hierarchical modeling.
^summary

## Overview

§4.2 (pp. 11-13) asks how the authors of the criticised papers might react to the charge that their analyses were data-dependent. It lays out three reactions, argues against the second, and follows the third to its consequence: once the p-value is given up, the remaining evidence has to be read in Bayesian terms, using Bem's Experiment 1 as the worked case.

## Main Content

> [!definition] Reaction 1 — Concession (p. 12)
> "Published p-values cannot generally be taken at face value because the analyses are contingent on data." The evidence for the research hypothesis is "much weaker than they had presumed." This is the response the authors hope for. It carries **no** implication of fishing or unethical behaviour: researchers naturally focus on what they did with the data in hand, "without putting much thought into how the details of their decisions could have changed under different realizations of the data."
^def-gl-concession

> [!definition] Reaction 2 — Insistence (p. 12)
> "The published analyses are the only operations that would have been done to the data." The same keep/discard rules and comparisons would have been applied to any data.
^def-gl-insistence

> [!theorem] Why Insistence is implausible — three reasons (p. 12)
> 1. **"If the data analysis protocol really were decided ahead of time, why not preregister it?"**
> 2. **Different choices appear in studies of the same topic in the same subfield.** Beall & Tracy and Durante et al. used different exclusion rules and cycle days (see [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study#^ex-gl-two-studies]]).
> 3. **A gap between the stated scientific and the tested statistical hypotheses.** With two groups or conditions: significant overall → report; significant in one group only → report; difference (interaction) significant → report. Each is "fully consistent with a research hypothesis", but they "represent different analyses, different paths that can be taken." Example: Bem et al.'s non-erotic images can be read as a control condition *or* as a separate confirmatory study.
^thm-gl-insistence

> [!definition] Reaction 3 — Contingency (p. 12)
> "Yes, had the data gone differently the published analysis would have been different, but that's exactly the point: we found what we found." For example, if only pink (not red) had been significant, Beall & Tracy's paper "would indeed be different, all the way to its title", and "a scientific paper should report what has been found, not merely what has been expected."
^def-gl-contingency

> [!theorem] Consequence of Contingency (p. 12)
> The authors are "sympathetic" to Contingency, but: "Once we recognize that analysis is contingent on data, the p-value argument disappears—one can no longer argue that, if nothing were going on, that something as extreme as what was observed would occur less than 5% of the time."
^thm-gl-contingency

### The Bayesian (or approximately Bayesian) reading (pp. 12-13)

Having given up the significance claim, "one can take a Bayesian, or approximately Bayesian, view and consider the observed comparison as evidence of the underlying effect."

> [!example] Bem's Experiment 1 under a flat prior (worked)
> **Data (quoted by G&L from Bem 2011):** "Across all 100 sessions, participants correctly identified the future position of the erotic pictures significantly more frequently than the 50% hit rate expected by chance: 53.1%, t(99) = 2.51, p = .01, d = 0.25."
>
> **Paper's statement (pp. 12-13).** With a flat prior on the true hit probability $\theta$ ("equally likely to be anywhere between 0 and 1") or, more generally, a locally flat prior, the posterior gives $\Pr(\theta>0.5\mid y) > 0.99$. "This is one interpretation of the one-sided p-value of 0.01" (Greenland & Poole 2013).
>
> **Reproducing it (vault derivation).** Treat the session-level mean as approximately normal: $\hat\theta = 53.1\%$, and $\text{SE} = (53.1-50)/2.51 \approx 1.235$ percentage points. Under a flat prior the posterior is $\theta\mid y \sim N(53.1,\,1.235^2)$, so
> $$\Pr(\theta>50\mid y)=\Phi\!\left(\tfrac{3.1}{1.235}\right)=\Phi(2.51)\approx 0.994 = 1-p_{\text{one-sided}}.$$
> The flat-prior posterior tail probability equals one minus the one-sided p-value. This is the Greenland-Poole correspondence.
^ex-gl-bem-flat

**Why the flat prior is wrong here (p. 13).**
- The Bem study is "typical of scientific research in that a new idea is being evaluated, in a context where various earlier tries were not so successful."
- There was "no track record of conditions under which subjects could consistently achieve 53% success in a precognition experiment". Bem's own experiments "failed to replicate in independent trials."
- They expect that "Bem or others might argue that we would being unfair as Bayesians to assigning such a pessimistic prior" (p. 13; the grammar slip is in the source and is listed in the Overview errata). They give two responses. First, it is a prior "we judge to be reasonable given available information". Second, a convincing case could instead be made "via a p-value obtained from a preregistered study". "But without preregistration or the equivalent, it is difficult to take p = 0.01 as evidence for much of anything."

> [!theorem] Condition on everything (p. 13)
> "The correct Bayesian result also should be conditional on all the data, not just on the single comparison that is highlighted. It is not appropriate to condition on a single comparison while ignoring all the other non-significant comparisons that were not done, hence an appropriate Bayesian analysis can require additional effort in the form of hierarchical modeling."
^thm-gl-condition-all

> [!example] How much a skeptical prior moves the estimate (vault illustration, not in source)
> Keep the normal likelihood $N(53.1, 1.235^2)$ and use a prior $\theta\sim N(50,\tau^2)$ (percentage points):
>
> | Prior sd $\tau$ | Posterior mean | Posterior sd | $\Pr(\theta>50\mid y)$ |
> |---|---|---|---|
> | flat ($\infty$) | 53.10 | 1.235 | 0.994 |
> | 2.0 | 52.24 | 1.051 | 0.984 |
> | 1.0 | 51.23 | 0.777 | 0.943 |
> | 0.5 | 50.44 | 0.463 | 0.827 |
>
> Shrinkage mainly pulls the **magnitude** toward 50% (a Type M correction; see [[Type S and Type M Errors]]). A continuous prior centred at 50 still leaves sizeable $\Pr(\theta>50)$, because it puts half its mass above 50. A prior that gives real weight to "no effect at all" (a point mass at 50), as Gelman & Loken's "pessimistic prior" implies, lowers that probability much further. Neither calculation fixes the selection problem. Per [[#^thm-gl-condition-all]], the likelihood should include the erotic/non-erotic, first-half/second-half and sex-split comparisons jointly, which is a hierarchical model over comparisons.
^ex-gl-bem-skeptical

## Examples
- Flat-prior reading of Bem's 53.1%: [[#^ex-gl-bem-flat]].
- Skeptical-prior shrinkage table (vault illustration): [[#^ex-gl-bem-skeptical]].

## Connections
- [[Forking Paths and Bayesian Approaches]] — the vault's earlier treatment. An earlier version of that note said the flat-prior posterior was "barely distinguishable from chance". It has since been corrected to match the source: under a flat prior the posterior probability that the rate exceeds 0.5 is over 99%. The paper's point is that the flat prior is the wrong prior.
- [[Partial Pooling as Multiple Comparisons Correction]], [[Hierarchical Models]], [[James-Stein Estimator]] — the hierarchical modeling the paper calls for.
- [[Multiple Comparisons - Bayesian Perspective]] · [[Prior Predictive Checking]] — checking whether a flat prior is reasonable before using it.
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — the prior-odds argument in PPV form.
- [[Prediction vs Postdiction]] — the authors' "pre-registered p-value" escape route.

## See Also
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]]
- [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]]
- [[Q - Differences Between Frequentist and Bayesian Statistics]]
