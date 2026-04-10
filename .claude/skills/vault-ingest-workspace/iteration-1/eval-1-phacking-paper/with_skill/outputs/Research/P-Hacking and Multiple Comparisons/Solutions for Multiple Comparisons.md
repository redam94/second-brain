---
title: "Solutions for Multiple Comparisons"
tags:
  - source/ingested
  - topic/statistics
  - topic/research-methodology
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Section 4, pp. 10-15"
date_ingested: 2026-04-09
folder: "Research/P-Hacking and Multiple Comparisons"
doc_type: paper
depends_on:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Theoretical Framework for Multiple Comparisons]]"
  - "[[Case Studies in Forking Paths]]"
  - "[[Data Processing and Analysis Choices]]"
used_by: []
aliases:
  - preregistration
  - pre-publication replication
  - solutions to p-hacking
---

# Solutions for Multiple Comparisons

> [!summary]
> Gelman and Loken discuss several approaches to address the garden of forking paths problem: preregistration of analysis protocols, pre-publication replication, Bayesian analysis with appropriate priors, multilevel modeling, and a shift from single-comparison focus to comprehensive analysis of all relevant comparisons. They emphasize that the goal is not to constrain scientific creativity but to recognize that data-contingent analyses are exploratory and should be treated as such.

## Overview

The discussion section (Section 4) moves from diagnosis to prescription. The authors identify three possible researcher reactions to the forking paths critique (concession, insistence, contingency) and then outline constructive paths forward. Importantly, they note that demanding strict preregistration may be too restrictive for many applied fields.

## Main Content

### Three Possible Researcher Reactions

The paper identifies how researchers might respond to the forking paths critique:

1. **Concession**: Accept that published p-values cannot be taken at face value because analyses are data-contingent. This is the authors' preferred response.

2. **Insistence**: Claim that the published analysis was the only one that would have been performed regardless of the data. Gelman and Loken find this implausible for three reasons:
   - If the protocol was truly pre-decided, why not preregister it?
   - Different researchers studying the same phenomenon make different data-analytic choices (e.g., Beall-Tracy vs. Durante)
   - There is generally a gap between stated scientific hypotheses and tested statistical hypotheses

3. **Contingency**: Acknowledge that different data would have led to different analyses, but argue this is appropriate -- a paper should report what was found, not what was expected. Gelman and Loken are sympathetic but note this undermines the p-value argument entirely: once analysis is contingent on data, the claim that the observed result would occur less than 5% of the time under the null disappears.

### Preregistration

> [!definition] Definition: Preregistration (Humphreys et al., 2013; Monogan, 2013)
> **Preregistration** is the practice of defining the entire data-collection and data-analysis protocol ahead of time, before seeing the data. This converts Procedure #3 (data-contingent) into Procedure #2 (preregistered) from the [[Theoretical Framework for Multiple Comparisons]].
^def-preregistration

**Limitations of preregistration acknowledged by Gelman and Loken:**
- In many applied fields (political science, economics, sociology), researchers analyze existing public data that has already been studied by others -- preregistration would be meaningless
- The most important hypotheses often arise only after looking at the data
- Preregistration may "strait-jacket" science by preventing valuable iterative analysis

**Where preregistration makes sense:**
- Fields like psychology where data collection is inexpensive and experiments can be replicated
- When data analysis choices are truly not affected by the data (as Bem and Beall-Tracy claimed)

### Pre-Publication Replication

> [!definition] Definition: Pre-Publication Replication (Nosek et al., 2013)
> **Pre-publication replication** involves performing two experiments: the first exploratory but theory-based, and the second purely confirmatory with a preregistered protocol. This preserves scientific creativity while providing genuine evidential value.
^def-prepub-replication

> [!example] Example: Failed Pre-Publication Replication (Nosek et al., 2013; discussed p. 14)
> **Setup:** Nosek, Spies, and Motyl (2013) found a large, statistically significant relationship between perceptual judgment and political attitudes, supported by substantive theory. Rather than publishing, they gathered a large new sample and performed a preregistered replication.
>
> **Result:** The replication had over 99% power based on the original effect size, but failed with $p = .59$.
>
> **Interpretation:** This illustrates how even well-motivated, theoretically grounded findings with strong initial significance can fail to replicate when the analysis is preregistered, supporting the claim that initial significance was likely an artifact of researcher degrees of freedom.

### Bayesian Approaches

The paper discusses Bayesian analysis as an alternative framework:

- Abandoning the claim of statistical significance allows treating observed data as evidence about effect size
- A Bayesian analysis requires specifying an appropriate prior, which should reflect the plausibility of the effect
- For novel effects (like ESP), a flat or uniform prior is inappropriate -- a pessimistic prior reflecting the low base rate of genuine precognition should be used
- The correct Bayesian analysis must condition on *all* the data, not just the single comparison that was highlighted
- This requires hierarchical/multilevel modeling, which adds complexity

### Multilevel Modeling

> [!definition] Definition: Multilevel Approach to Multiple Comparisons (Gelman et al., 2012)
> Rather than focusing on a single comparison, analyze all relevant comparisons simultaneously using multilevel (hierarchical) models. This approach naturally handles multiplicity by partially pooling estimates toward a common mean, providing built-in skepticism about extreme results.
^def-multilevel

**Practical challenges:**
- When the number of comparisons is small or the problem is highly structured, inference can be sensitive to model assumptions
- Researchers must still decide which comparisons are "relevant" -- another source of degrees of freedom
- Developing general approaches for analyzing multiple potential comparisons is an area for future research

### Distinguishing Exploratory from Confirmatory

The paper advocates for a return to the distinction between exploratory and confirmatory data analysis (de Groot, 1956; Tukey, 1977):

- Data-contingent analyses should be viewed as **exploratory**, regardless of how significant the p-values appear
- **Confirmatory** evidence requires preregistered replication
- Recognizing this distinction does not invalidate exploratory work -- it simply requires appropriate humility about the strength of evidence

## Connections

- All solutions address the core problem of [[Researcher Degrees of Freedom]]
- Preregistration converts Procedure #3 to Procedure #2 in [[Theoretical Framework for Multiple Comparisons]]
- The case studies in [[Case Studies in Forking Paths]] and [[Data Processing and Analysis Choices]] motivate these solutions
- Bayesian approaches connect to broader topics in Bayesian statistics and hierarchical modeling

## See Also

- [[Researcher Degrees of Freedom]] -- the problem being addressed
- [[Garden of Forking Paths - Overview]] -- full paper context
- [[Theoretical Framework for Multiple Comparisons]] -- the formal framework
