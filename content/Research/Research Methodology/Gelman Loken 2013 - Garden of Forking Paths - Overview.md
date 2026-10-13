---
title: "Gelman Loken 2013 - Garden of Forking Paths - Overview"
tags:
  - source/ingested
  - topic/research-methodology
  - topic/multiple-comparisons
  - topic/model-validation
  - type/overview
  - doc/paper
source: "[[raw/p_hacking.pdf]]"
source_location: "Gelman & Loken, working paper dated 14 Nov 2013, pp. 1-17 (all sections, references)"
date_ingested: 2026-10-13
folder: "Research Methodology"
doc_type: paper
depends_on:
  - "[[Garden of Forking Paths]]"
  - "[[Researcher Degrees of Freedom]]"
  - "[[Multiple Testing Corrections]]"
  - "[[Type S and Type M Errors]]"
used_by:
  - "[[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]]"
  - "[[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]]"
  - "[[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]]"
  - "[[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]]"
  - "[[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]]"
  - "[[Forking Paths and Bayesian Approaches]]"
  - "[[Gelman Loken 2013 - Front Matter, Borges Epigraph and References]]"
aliases:
  - "Gelman Loken 2013 - Overview"
  - "Garden of Forking Paths paper"
  - "Why multiple comparisons can be a problem even without fishing"
---

# Gelman & Loken (2013) — The Garden of Forking Paths: Overview

> [!summary]
> Gelman & Loken argue that a multiple-comparisons problem exists **even when a researcher runs only one analysis and had a research hypothesis in advance**: if the details of data exclusion, coding, subgroup choice and main-effect-vs-interaction focus would have been different had the data been different, the analysis is $T(y;\varphi(y))$, not a pre-registered $T(y;\varphi)$. The published p-value then cannot be taken at face value. The authors illustrate this with four published psychology studies (arm circumference and redistribution, Bem's ESP, ovulation and vote intention, ovulation and red/pink clothing). They then discuss three ways researchers might respond, a Bayesian reading of Bem's 53.1% hit rate, and remedies: preregistration, pre-publication replication, and analysing all comparisons with multilevel models.
^summary

## Overview

The full title says what the paper is for: *"The garden of forking paths: Why multiple comparisons can be a problem, even when there is no 'fishing expedition' or 'p-hacking' and the research hypothesis was posited ahead of time"* (p. 1). It is a short (15 pp. of text) frequentist argument plus case studies. It has **no theorems, tables or figures**. Its formal content is the four-way taxonomy of testing procedures in §1.2. The vault's older concept notes ([[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Forking Paths and Bayesian Approaches]]) cover the main idea. This note set records the paper section by section.

**Authors and front matter.** Andrew Gelman (Department of Statistics, Columbia University) and Eric Loken (Department of Human Development and Family Studies, Penn State University). The authors thank Ed Vul, Howard Wainer, Macartan Humphreys and E. J. Wagenmakers, and acknowledge partial support from the National Science Foundation (p. 1 footnotes). The title is taken from Borges's 1941 story *El jardín de senderos que se bifurcan* ("The Garden of Forking Paths"; English translation by D. A. Yates, 1964, in *Labyrinths*), and the paper opens with an epigraph from it:

> [!quote] Epigraph (p. 1)
> "I thought of a labyrinth of labyrinths, of one sinuous spreading labyrinth that would encompass the past and the future . . . I felt myself to be, for an unknown period of time, an abstract perceiver of the world." — Borges (1941)
^quote-epigraph

Details, the abstract and the full bibliography: [[Gelman Loken 2013 - Front Matter, Borges Epigraph and References]].

**Research question.** Can a data analysis that "feels" like a single, theory-driven test still be subject to multiple comparisons?

**Contribution.**
1. A notation that separates pre-registered tests $T(y;\varphi)$, data-contingent tests $T(y;\varphi(y))$ and fishing $T(y;\varphi^{\text{best}}(y))$ (§1.2). See [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]].
2. The claim that the problematic procedure is #3 (data-contingent), not #4 (fishing). Researchers deny #4 and assume they are therefore doing #2.
3. The point that **one scientific hypothesis maps to many statistical hypotheses** (§2.2), so "the hypothesis was stated in advance" does not fix $\varphi$.
4. The observation that two studies with nearly the same design, in the same journal and the same year, made different data-analytic choices and both reached $p<0.05$ (§3.1). This is used as evidence that "standard practice" is itself flexible.
5. Remedies matched to field (§4.3-4.4). Where new data are cheap, run a pre-registered replication. Where they are not (observational fields), analyse all comparisons, for example with multilevel models.

**Key findings (claims).**
- Researcher degrees of freedom "do not feel like degrees of freedom because, conditional on the data, each choice appears to be deterministic" (p. 11).
- The problem is made worse by low power: small effects, small samples, large measurement error and high variation (p. 3, citing Button et al. 2013). See [[Type S and Type M Errors]].
- Once analysis is admitted to be data-contingent, "the p-value argument disappears" (p. 12). A Bayesian reading needs an informed prior and should condition on all the data, which may call for hierarchical modeling (p. 13).

## Source Map

Every section of the source and the note that captures it:

| Source section | Pages | Content | Note |
|---|---|---|---|
| Title, Borges epigraph, Abstract, affiliations, acknowledgments | p. 1 | Thesis statement; Borges source of the title; Columbia / Penn State; thanks to Vul, Wainer, Humphreys, Wagenmakers; NSF support | this note; [[Gelman Loken 2013 - Front Matter, Borges Epigraph and References]] |
| §1 Multiple comparisons doesn't have to feel like fishing; §1.1 Background | pp. 1-2 | "Good stories" passage; Gelman (2013a) "fishing expeditions" quote; the line-thrown-into-the-lake image and the authors' alternative account; two reasons the authors regret the terms | [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]] |
| §1.2 Theoretical framework | pp. 2-3 | Four testing procedures; frequentist counterfactual reasoning; hypothetical Democrats/Republicans math-test example; Humphreys et al. (2013) "least noisy measure" fallacy; low-power context | [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable]] |
| §2 Choices of main effects or interactions; §2.1 Fat arms and political attitudes | pp. 4-5 | "As expected, found only among males"; three samples (Denmark, US, Argentina), two of college students (countries not named); interaction without main effect; age confound in the two student samples; scale-item removal (α = .72, α = .65); "consistency … achieved in spite of this noise" | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| §2.2 Appearance or non-appearance of ESP | pp. 5-6 | "Significance anywhere" framing; Bem (2011) Exp. 1; Wagenmakers et al. (2011) earlier criticism; Bem-Utts-Johnson reply quoted in full; one-to-many mapping of scientific to statistical hypotheses | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| §2.3 Menstrual cycle and vote intentions | pp. 6-8 | Durante et al. (2013); "two studies with large and diverse samples" (contrast §3.1 "small sample of internet participants", p. 9); between-subject design; implausible 20-point effect; relationship-status coding | [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] |
| §3 Choices in data processing and data analysis (intro) | p. 8 | Beall & Tracy (2013) red/pink; Tracy & Beall reply | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| §3.1 Data exclusion and coding rules | pp. 8-10 | Samples: ~100 internet adults + 24 college students; inclusion violations (9/24, 22%, ages to 47, 31% excluded); red+pink pooling; fertile-window definitions (6-14 vs 7-14 / 17-25 vs 10-17 vs 12-17) | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| §3.2 Choices in combining information from separate studies | p. 10 | Pool vs isolate vs contrast samples; opposite stories both fit | [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]] |
| §4.1 Summary | pp. 10-11 | Average over all paths; Feynman path-diagram analogy; "machine for producing and publicizing random patterns"; papers are exploratory | [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]] |
| §4.2 Possible reactions | pp. 11-13 | Concession / Insistence / Contingency; Bem 53.1% Bayesian reading; Greenland & Poole (2013) | [[Gelman Loken 2013 - Three Reactions and the Bayesian Reading of Bem's 53 Percent]] |
| §4.3 The way forward | pp. 13-14 | Opening argument (noise without preconceptions vs "evidently clear" analysis that is still $\varphi(y)$); preregistration and its limits; pre-publication replication; Nosek-Spies-Motyl (power > 99%, p = .59); multilevel modeling for observational fields | [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]] |
| §4.4 Toward a positive message | pp. 14-15 | p-values as protection turned against itself; Mosteller; scientists "keenly aware of the risks of data dredging"; exploratory vs confirmatory; "half as many original experiments" | [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]] |
| References | pp. 15-17 | **31** references, three never cited in the text (Gelman 2014; Gelman & Tuerlinckx 2000; Gelman & Weakliem 2009) | [[Gelman Loken 2013 - Front Matter, Borges Epigraph and References]] |
| Tables / figures | — | none in source | — |

### Source errata noticed during the audit
- p. 3: the text says "$T(y;\varphi(y))$ as described in item #4 above". In the framework of p. 2, $T(y;\varphi(y))$ is item **#3**. This is a numbering slip in the source.
- p. 2: "Simmons et al. (2001)" should be 2011. The reference list gives 2011.
- p. 14: "the probability is something 5%" is missing a word ("something like 5%"). The same sentence also has "would be been".
- p. 1: "decisions on what data to exclude or exclude" is a typo, presumably for "include or exclude".
- p. 8: "the ages of the wome included" is a typo for "women".
- p. 8: the criticism of Beall & Tracy is cited as "Gelman, 2013" with no a/b suffix. The reference list has only 2013a and 2013b. Tracy & Beall's reply ("Too good does not always mean not true") answers the Slate article, so 2013a is almost certainly meant.
- pp. 14-15: §4.3 says "All three of the papers we have discussed here could have followed this strategy" (p. 14), but §4.4 says "all four of the examples discussed above" (p. 15). The paper discusses four studies (Petersen et al.; Bem; Durante et al.; Beall & Tracy), so "three" is the slip.
- p. 14: "comparions" for "comparisons".
- p. 13 (§4.2): "Bem or others might argue that we would being unfair as Bayesians to assigning such a pessimistic prior" has two slips. "would being" should be "would be", and "to assigning" should be "in assigning" (or "to assign").
- The 2026-10-13 audit corrected an earlier count of "33 references" in this note. The source lists 31.

## Main Content — the argument in one paragraph

A p-value is a statement about hypothetical replications of the data. If on different data the researcher would have excluded different cases, coded a variable differently, pooled or split samples differently, or reported an interaction instead of a main effect, then the reference distribution must range over those different analyses as well. This holds whether or not anyone ran more than one test. Scientists with strong theories, analysing one dataset at a time, experience their choices as forced by theory. A flexible theory, a one-to-many mapping to statistical hypotheses and noisy small samples together make $p<0.05$ easy to reach. The fix is not to stop exploring. It is to label exploratory work as exploratory, confirm with pre-registered replication where possible, and otherwise model all comparisons jointly.

## Examples

The four case studies are covered in [[Gelman Loken 2013 - Main Effects vs Interactions Case Studies]] and [[Gelman Loken 2013 - Data Exclusion, Coding and Pooling Forks in the Red-Pink Study]]. A runnable null-data simulation of the paper's *hypothetical* political math-test example (single pre-registered test about 5% false positives vs about 17% for "any of five reasonable paths") is in [[Gelman Loken 2013 - Four Testing Procedures and the Data-Contingent Decision Variable#^ex-partisan-math-sim]].

> [!example] Marketing-analytics translation (vault illustration, not in source)
> An analyst has 104 weeks of media data and a hypothesis that a channel "works." If the overall coefficient is null, it is natural to look at the effect in the holiday quarter, in one region, or as an interaction with price promotion. If adstock decay looks implausible, they refit with a different transformation. Each step is defensible, but the space of $\varphi$ is large. A reported $p<0.05$ (or a narrow credible interval from the chosen specification) overstates the evidence unless $\varphi$ was fixed in advance or all variants are modeled jointly. See [[Model Selection and Exploratory Analysis]] and [[Model Selection and Overfitting]].
^example-marketing-analytics-translation

## Connections

- **Same family, different emphasis.** [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] *simulates* how much analytic flexibility inflates false positives. Gelman & Loken argue that the flexibility need not be conscious. [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] supplies the PPV arithmetic for why such findings are often false.
- **Low power.** [[Type S and Type M Errors]] and [[Power Analysis and Sample Size]] formalise "noisy small-sample estimates that reach significance are exaggerated."
- **Bayesian remedies.** [[Partial Pooling as Multiple Comparisons Correction]], [[Hierarchical Models]], [[Multiple Comparisons - Bayesian Perspective]].
- **Pre-commitment.** [[Pre-registration and Open Science - Overview]], [[Prediction vs Postdiction]], [[Limits and Objections to Pre-registration]] (Gelman & Loken's own reservations appear in §4.3).
- **Validation analogues in predictive modeling.** Pre-publication replication is the "external validation" idea (p. 14). Compare [[Cross Validation Checking]], [[Forecast Evaluation and Backtesting]], [[Cross-Fitting and Sample Splitting]].
- **Disambiguation.** [[Garden of Forking Data]] is McElreath's counting metaphor for Bayesian updating. It is unrelated except that both borrow Borges's title.

## See Also
- [[Garden of Forking Paths]] — original concept note (aliases "Forking paths", "p-hacking")
- [[Researcher Degrees of Freedom]] — catalogue of analytic forks
- [[Forking Paths and Bayesian Approaches]] — Bayesian response
- [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]
- [[The Peeking Problem and Optional Stopping]] — data-dependent stopping as one more fork
