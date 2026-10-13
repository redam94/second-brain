---
title: "Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/replication-crisis
  - topic/model-validation
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken 2013, §4.1 Summary, §4.3 The way forward, §4.4 Toward a positive message, pp. 10-15"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]]"
  - "[[Pre-registration and Open Science - Overview]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Limits and Objections to Pre-registration]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Pre-publication replication"
  - "Two-part exploratory-then-confirmatory design"
  - "Machine for producing and publicizing random patterns"
---

# Gelman & Loken (2013) §4 — The Way Forward: Preregistration, Replication and Analysing All Comparisons

> [!summary]
> The discussion argues that p-values must be judged by **averaging over the whole garden of paths**, which the authors compare to Feynman path diagrams. It classifies the case-study papers as **exploratory** and proposes remedies by setting. Where new data are cheap (psychology), pair each exploratory study with a **pre-registered replication** (the Nosek-Spies-Motyl "two-part" design, whose >99%-powered replication returned $p = .59$). Where data are fixed (political science, economics, sociology), **analyse all relevant comparisons**, ideally with multilevel models. The authors also say plainly that they could not pre-register most of their own work.
^summary

## Overview

This note covers the paper's closing discussion: §4.1 (Summary, pp. 10-11), §4.3 (The way forward, pp. 13-14) and §4.4 (Toward a positive message, pp. 14-15). §4.2, on how researchers might react, is in [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]].

## Main Content

### §4.1 Summary (pp. 10-11)

> [!theorem] Averaging over all paths (p. 11)
> "The researcher degrees of freedom do not feel like degrees of freedom because, conditional on the data, each choice appears to be deterministic. But if we average over all possible data that could have occurred, we need to look at the entire garden of forking paths and recognize how each path can lead to statistical significance in its own way." Averaging over all paths "is the fundamental principle underlying p-values and statistical significance". The authors liken it to Feynman's path diagrams for quantum indeterminacy.
^thm-gl-average-paths

- **Scope.** The examples are high-profile, small-sample social-psychology studies. Similar problems are expected in medical research, but psychology examples need "minimal technical knowledge regarding drug mechanisms, imaging, genes, and so forth" (p. 11).
- **Common structure.** Each published analysis tells a story consistent with the motivating hypothesis. Other data patterns, which "could easily have occurred by chance" at these sample sizes, would have led to different analyses (main effects vs interactions, other subsets) equally supporting the hypothesis. The result is "a sort of machine for producing and publicizing random patterns" (p. 11).
- **Not a claim of falsity.** "We are not saying the scientific claims in these papers are necessarily wrong." The evidence "is not as strong as stated." The authors doubt that even the **direction** of the effects would reappear in pre-registered replications (Button et al. 2013; Nosek, Spies & Motyl 2013). The general hypotheses could have some validity even if the specific claims do not hold (p. 11).
- **Reclassification.** "We view these papers—despite their statistically significant p-values—as exploratory", which calls for awareness of "their uncertainty and fragility." Science should be creative, but "we have to watch out for a system that allows any hunch to be ratcheted up to a level of statistical significance that is then taken as scientific proof", and these concerns apply "in our own research, not just in that of others" (p. 11).
- **Retraction of "fishing".** "When we described these sorts of research as 'fishing expeditions,' we were making a mistake." What is happening may be reasonable choices made noisy by "small sample size and measurement error" (p. 11).

### §4.3 The way forward (pp. 13-14)

> [!quote] Opening argument of §4.3 (p. 13)
> "There are many roads to statistical significance, and if data are gathered with no preconceptions at all, it is obvious that statistical significance can be obtained from pure noise, just by repeatedly performing comparisons, excluding data in different ways, examining different interactions and controlling for different predictors, and so forth. Realistically, though, a researcher will come into a study with strong substantive hypotheses, to the extent that, for any given dataset, the appropriate analysis can seem evidently clear. But, even if the chosen data analysis is a deterministic function of the observed data, this does not eliminate the multiple comparisons problem. P-values are based on what would have happened under other possible datasets."
^quote-gl-way-forward-opening

The argument has three steps. (1) With **no preconceptions**, significance from pure noise is obvious: this is fishing, procedure #4. (2) Real researchers arrive with **strong hypotheses**, so for each dataset one analysis "can seem evidently clear". (3) That analysis is still a deterministic function $\varphi(y)$ of the data, procedure #3, and the p-value's reference set ranges over the other datasets, where $\varphi(y)$ would have differed. Strong prior hypotheses change how the choice *feels*, not the multiplicity. See [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable#^def-gl-proc3]].

> [!algorithm] Remedies by research setting (pp. 13-15)
> 1. **Preregistration** (Humphreys, Sanchez & Windt 2013; Monogan 2013): define the entire data-collection and data-analysis protocol in advance.
>    - *Authors' limits:* for "most of our own research projects this strategy hardly seems possible". "Our most important hypotheses could never have been formulated ahead of time". Re-analysing much-studied public data on elections, the economy and public opinion makes preregistration "close to meaningless."
>    - *Where it fits:* fields where more data are easy to get, such as psychology. Bem and Beall & Tracy, who say their choices were not data-affected, could pre-register future protocols "so that their future p-values will not be questioned."
>    - *Caveat:* "we do not want demands of statistical purity to strait-jacket our science". The most valuable analyses come from iterating with the data (Tukey 1980; Box 1997). Researchers should recognise "a large space of decision variables $\varphi$ corresponding to a single research hypothesis" and analyse with that generality in mind.
> 2. **Pre-publication replication** (p. 14), related to **external validation** in statistics and computer science:
>    1. Run an exploratory but theory-based experiment.
>    2. Run a purely confirmatory second experiment with its own **pre-registered** protocol.
>    3. Publish both. Unsuccessful replications should still be published (e.g. in *PLoS One*), though the **file-drawer problem** remains.
>
>    The source says "All three of the papers we have discussed here could have followed this strategy" (p. 14), though four studies are discussed (arm circumference, Bem, Durante et al., Beall & Tracy), and §4.4 later says "all four of the examples discussed above" (p. 15). All four were cheap, non-invasive volunteer experiments, so they could have done this. The authors guess roughly a 5% chance that each would replicate significantly under a preset protocol, "but the data could (probabilistically) prove us wrong."
> 3. **Analyse all comparisons** (observational fields, p. 14): "We cannot easily gather data on additional wars, or additional financial crises, or additional countries." Start by analysing "all relevant comparions [sic], not just focusing on whatever happens to be statistically significant." **Multilevel modeling** can resolve multiple-comparison issues (Gelman, Hill & Yajima 2012), but with few comparisons or highly structured problems inference "can be sensitive to model assumptions". General approaches are "an area for future research."
> 4. **Sharpen the exploratory/confirmatory distinction** (de Groot 1956; Tukey 1977) when pre-registered replication is impossible (p. 15).
^alg-gl-remedies

> [!example] Nosek, Spies & Motyl (2013): pre-publication replication in practice (p. 14)
> An experiment on perceptual judgment and political attitudes, motivated by substantive theory, found a large significant relationship. Rather than publishing, the authors collected a large new sample under predetermined protocols and analysis. Based on the initial estimate, the replication had **over 99% power**. Result: **$p = .59$**, unsuccessful. Gelman & Loken "suspect this sort of thing would happen" for the papers they discuss.
^ex-gl-nosek

> [!example] Why the >99% power was illusory (vault gloss)
> Power was computed from the initial *significant* estimate, which is selected from the garden and therefore inflated (a Type M error). True power at the real, much smaller effect was far lower. Planning replications from a significant pilot estimate is optimistic for exactly this reason. See [[Type S and Type M Errors]] and [[Power Analysis and Sample Size]].
^example-why-the-99-power-was

### §4.4 Toward a positive message (pp. 14-15)

- "Criticism is easy, doing research is hard." The authors' own work reports uncertainty intervals, and so implicit significance claims, "without concern for selection bias or multiple comparisons". They decline the role of "statistician as scold" (Gelman 2013b).
- **The irony.** "P-values are a method of protecting researchers from declaring truth based on patterns in noise". Through data-dependent analysis they "lend credence to noisy claims based on small samples". Without p-values, nobody would credit a population claim "based on two survey questions asked to 100 volunteers on the internet and 24 college students" (pp. 14-15).
- **Mosteller.** "It is easy to lie with statistics, but easier without them" (paraphrased by G&L, p. 15).
- **Refining hypotheses is good practice.** "In our experience, it is good scientific practice to refine one's research hypotheses in light of the data" (p. 15). The positive message rests on the authors' "strong feeling that scientists are interested in getting closer to the truth."
- **Scientists already guard against dredging.** "Working scientists are also keenly aware of the risks of data dredging, and they use confidence intervals and p-values as a tool to avoid getting fooled by noise. Unfortunately, a byproduct of all this struggle and care is that, when a statistically significant pattern does show up, it is natural to get excited and believe it" (p. 15). The care that goes into avoiding false patterns is what makes the patterns that survive feel trustworthy.
- **Why honest scientists over-believe.** "It is the very fact that scientists generally don't cheat, generally don't go fishing for statistical significance, that they are inclined to draw strong conclusions when they do encounter a pattern that is strong enough to cross the p < .05 threshold" (p. 15).
- **Closing proposals.** Absent preregistration, analysis choices *will* be data-dependent, even when theory-motivated. Prefer "an analysis of all the data rather than a focus on a single comparison". Where data are cheap, perhaps researchers should "perform half as many original experiments in each paper and just pair each new experiment with a pre-registered replication" (p. 15).

## Examples

> [!example] Applying the remedies to a marketing-measurement workflow (vault illustration)
> - *Exploratory → confirmatory:* use historical weekly data to explore model specifications, then confirm the chosen specification's channel effects with a pre-registered geo experiment or a held-out period. See [[Forecast Evaluation and Backtesting]].
> - *Analyse all comparisons:* report every channel × region effect from one hierarchical model instead of highlighting the significant ones. See [[Partial Pooling as Multiple Comparisons Correction]].
> - *Simulation check:* run the whole data-contingent pipeline on simulated data with known effects to measure how often it "finds" something. See [[Designing Simulated-Data Experiments]], [[Simulated-Data Experimentation as Virtual Replication]], and [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
^example-applying-the-remedies-to-a

## Connections
- [[Pre-registration and Open Science - Overview]] · [[Pre-registration vs Registered Reports]] · [[Limits and Objections to Pre-registration]] — Gelman & Loken's §4.3 reservations are an early statement of the "exploratory work can't be pre-registered" objection.
- [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]] — sample splitting is a within-dataset version of pre-publication replication. Compare [[Cross-Fitting and Sample Splitting]].
- [[The Replication Crisis and Multiple Levels of Variation]] — the wider Bayesian-workflow view.
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — disclosure-based remedies (a complement to these).
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — external validation as the predictive culture's built-in guard.

## See Also
- [[Gelman Loken 2013 - Garden of Forking Paths - Overview]]
- [[Forking Paths and Bayesian Approaches]]
- [[Multiple Comparisons - Bayesian Perspective]]
