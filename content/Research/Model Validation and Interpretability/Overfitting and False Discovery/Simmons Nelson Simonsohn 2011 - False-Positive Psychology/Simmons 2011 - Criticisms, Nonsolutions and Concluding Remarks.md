---
title: "Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), pp. 1364-1365: General Discussion ('Criticisms': 'Not far enough', 'Too far'; 'Nonsolutions': correcting alpha levels, using Bayesian statistics, conceptual replications, posting materials and data); 'Concluding Remarks'; Acknowledgments; Declaration of Conflicting Interests"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]"
used_by:
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
aliases:
  - Simmons 2011 General Discussion
  - Simmons 2011 nonsolutions
  - Why Bayesian statistics does not fix researcher degrees of freedom
---

# Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks

> [!summary]
> The General Discussion (pp. 1364-1365) answers two kinds of criticism. **Not far enough:** disclosure does not fix the file drawer, and authors have disincentives to disclose. **Too far:** the rules seem to rule out exploratory work. It then rejects four alternative policies as less practical, less effective or both: **Bonferroni-style alpha correction**, **switching to Bayesian statistics**, **conceptual replications** and **posting materials and data**. The concluding remarks restate the mechanism (self-serving interpretation of ambiguity, not deception) and close with: "We should embrace these disclosure requirements as if the credibility of our profession depended on them. Because it does."
^summary

## Overview

This section defends the [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines|disclosure solution]] against criticism and against alternatives that were popular in 2011. Two of the rejections, Bayesian statistics and data posting, are often proposed as remedies, which gives them lasting interest. The paper's position is narrow: these may be worth pursuing "for other reasons", but they "do not address the problem of researcher degrees of freedom" (p. 1365).

## Main Content

### Criticism 1: "Not far enough" (p. 1364)

> [!theorem] Objection and reply: the file-drawer problem (p. 1364)
> **Objection.** Disclosure "does not lead to the disclosure of all degrees of freedom". It cannot reveal studies that were never reported because they did not "work" (the **file-drawer problem**). One fix is a public repository of all studies, successful or not (citing Ioannidis 2005 and Schooler 2011).
>
> **Reply.** The authors are sympathetic but list practical problems: how is submission enforced, and how does one ensure that study descriptions are understandable and properly classified? More importantly, a repository "must adhere to our disclosure policy, for it is impossible to interpret study results, whether successful or not, unless researcher degrees of freedom are disclosed." The repository is "an ambitious long-term extension of our recommended solution, not a substitute."
^crit-file-drawer

> [!theorem] Objection and reply: disincentives to disclose (p. 1364)
> **Objection (from a reviewer of the paper).** Authors have "tremendous disincentives" to disclose the degrees of freedom they exploited.
>
> **Reply.** If editors and reviewers enforce the rules, authors have *stronger* incentives to disclose accurately. The solution "turns inconsequential sins of omission (leaving out inconvenient facts) into consequential, potentially career-ending sins of commission (writing demonstrably false statements)." Journals that enforce it "will create a virtuous cycle of transparency and accountability that eliminates the disincentive problem."
^crit-disincentive

The mechanism behind the second reply: once a list of measures that begins with "only" is required ([[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^tbl-2|Requirements 3-4]]), leaving a measure off is no longer silence. It is a false statement.

### Criticism 2: "Too far" (pp. 1364-1365)

> [!theorem] Objection and reply: exploratory research (pp. 1364-1365)
> **Objection.** The guidelines might prevent exploratory research, for example when researchers do not know which dependent measures will respond to the manipulation, or how to score or combine them.
>
> **Reply.** "We all should of course engage in exploratory research", but it must either be **reported as such** (following the six requirements) or be **complemented with (and possibly only report) confirmatory research consisting of exact replications** of the design and analysis that "worked" in the exploratory phase.
^crit-exploratory

This is the explore-then-confirm split that later became standard. See [[Prediction vs Postdiction]] and [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].

### Nonsolutions (p. 1365)

The authors "considered and rejected" four policy changes.

> [!definition] Nonsolution 1: Correcting alpha levels (p. 1365)
> **Proposal.** Adjust the critical $\alpha$ for the number of degrees of freedom used, in the manner of Bonferroni, as with multiple-hypothesis testing. Something similar has been proposed for medical trials that monitor outcomes as they progress (Pocock 1977, group sequential methods).
>
> **Why rejected.** (i) Given "the broad and ambiguous set of degrees of freedom", it is unclear which ones, and how many, contributed to a finding, so their effect on the false-positive rate is unknown. (ii) Unless there is an explicit rule for adjusting $\alpha$ for each degree of freedom *and for their combinations* (the paper points to the bottom three rows of Table 1, where the combined rates are far above the sum of the single-fork excesses), "the additional ambiguity may make things worse by introducing new degrees of freedom."
^nonsol-alpha

Formally, Bonferroni needs the number of tests $k$ and controls $\Pr(\text{any rejection})\le k\cdot\alpha/k=\alpha$. With researcher degrees of freedom, $k$ is unobserved and data-dependent, and the forks are correlated (see the Table 1 results in [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]), so neither the correction nor its conservativeness can be computed. See [[Multiple Testing Corrections]].

> [!definition] Nonsolution 2: Using Bayesian statistics (p. 1365)
> **Proposal.** Analyse experiments with Bayesian rather than frequentist methods (citing Wagenmakers, Wetzels, Borsboom & van der Maas 2011).
>
> **Why rejected.** "Although the Bayesian approach has many virtues, it actually increases researcher degrees of freedom." (i) It "offers a new set of analyses (in addition to all frequentist ones) that authors could flexibly try out on their data". (ii) It requires "additional judgments (e.g., the prior distribution) on a case-by-case basis, providing yet more researcher degrees of freedom."
^nonsol-bayes

The vault has counterpoints. A Bayesian likelihood-principle analysis is unaffected by the stopping rule ([[Q - Does Peeking Matter for a Bayesian]]). Hierarchical partial pooling addresses multiplicity structurally ([[Multiple Comparisons - Bayesian Perspective]], [[Forking Paths and Bayesian Approaches]]). Neither removes forks in *model specification*, which is the paper's point. Prior choice can itself be disciplined by prior predictive checks and [[Simulation-Based Calibration - Overview|SBC]], which turns a hidden fork into a checkable one.

> [!definition] Nonsolution 3: Conceptual replications (p. 1365)
> **Proposal.** Rely on conceptual replications, which test the same idea with a different design, as evidence of robustness.
>
> **Why rejected.** Unlike exact replications, they "do not bind researchers to make the same analytic decisions across studies", so they are "unfortunately misleading as a solution". Authors "may choose two of three conditions in Study 1 and report one measure, but choose a different pair of conditions and a different measure in Study 2. Indeed, that is what we did in the experiments reported here."
^nonsol-conceptual

Each conceptual replication gets its own fresh set of forks, so a run of "successful" conceptual replications can be a run of independently p-hacked results. See the dropped "Hot Potato" condition and the switched DV in [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]].

> [!definition] Nonsolution 4: Posting materials and data (p. 1365)
> **Proposal.** Require authors to make original materials and data public.
>
> **Position.** The authors are "strongly supportive" of this for other reasons, but it does not address the problem. (i) It puts "too high a cost on readers and reviewers to examine, in real time, the credibility of a particular claim". Readers should not need to download data and rerun analyses "to learn the importance of controlling for father's age", or read pages of supplements "to learn that the researchers simply dropped the 'Hot Potato' condition." (ii) If a journal allows a condition to be left out of the report, "it would presumably also allow its redaction from the raw data and 'original' materials, making the entire transparency effort futile."
^nonsol-data

### Concluding remarks (p. 1365)

> [!theorem] Conclusion (p. 1365)
> "Our goal as scientists is not to publish as many articles as we can, but to discover and disseminate truth." The authors say they themselves "often lose sight of this goal, yielding to the pressure to do whatever is justifiable to compile a set of studies that we can publish." This "is not driven by a willingness to deceive but by the self-serving interpretation of ambiguity", which lets researchers convince themselves that "whichever decisions produced the most publishable outcome must have also been the most appropriate." The disclosure requirements impose "minimal costs on authors, readers, and reviewers". They "will not rid researchers of publication pressures, but they will limit what authors are able to justify as acceptable to others and to themselves." The closing lines: "We should embrace these disclosure requirements as if the credibility of our profession depended on them. Because it does."
^concl

**Back matter.** Acknowledgments: all three authors contributed equally, and author order is "alphabetical, controlling for father's age (reverse-coded)", a joke referring back to Study 2. The authors declare no conflicts of interest.

## Examples

> [!example] Example: Why "just use Bayesian MMM" does not close the forks (generic)
> A Bayesian media-mix model gives posterior intervals for every channel, but it adds forks: prior on ROI, prior on adstock decay, saturation family, likelihood, and choice of which of several converged fits to present. If an analyst tries several ROI priors until a favoured channel's posterior clears a threshold, the posterior is as hacked as a p-value would be. Under Simmons et al.'s logic the fix is disclosure: report the prior-sensitivity results and every fit attempted. Prior predictive checks and [[Simulation-Based Calibration - Overview|SBC]] make the prior choice auditable, and [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview|simulated ground truth]] shows how often the procedure *as actually run* recovers the true effects.
^ex-generic-application

## Connections

- Alpha correction and its limits: [[Multiple Testing Corrections]]. Valid sequential alternatives to Pocock-style corrections: [[Always-Valid p-values and the mSPRT]].
- Bayesian rebuttals and nuances: [[Forking Paths and Bayesian Approaches]], [[Multiple Comparisons - Bayesian Perspective]], [[Q - Does Peeking Matter for a Bayesian]].
- The file-drawer problem at field level, and why repositories alone do not fix PPV: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- Explore-then-confirm in pre-registration practice: [[Pre-registration and Open Science - Overview]], [[Limits and Objections to Pre-registration]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
- [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]
- [[Garden of Forking Paths]]: Gelman & Loken's argument that forks matter even without explicit searching
