---
title: "Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/concept
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), Psychological Science 22(11), pp. 1359-1360: Abstract; untitled introduction (three costs of false positives, definition of researcher degrees of freedom, two causes of exploratory behavior, reaction-time outlier survey)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Researcher Degrees of Freedom]]"
  - "[[Garden of Forking Paths]]"
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
used_by:
  - "[[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]"
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks]]"
aliases:
  - Simmons 2011 introduction
  - Flexibility-ambiguity problem
  - Self-serving interpretation of analytic ambiguity
---

# Simmons 2011 - Ambiguity, Motivated Reasoning and the Cost of False Positives

> [!summary]
> The opening of Simmons, Nelson & Simonsohn (2011, pp. 1359-1360) sets up the problem the rest of the paper quantifies. A false positive is singled out as "perhaps the most costly error", for three reasons: false positives persist, they waste resources and they cost a field its credibility. The mechanism is **researcher degrees of freedom** (the general concept lives in [[Researcher Degrees of Freedom]]). The paper's specific diagnosis is that flexibility is exploited because of **(a) ambiguity** about the right analytic choice and **(b) the desire for significance**, which motivated reasoning turns into sincere, self-justified decisions. Malice is not needed. A survey of about 30 *Psychological Science* articles shows how much ambiguity there is: the papers used more than a dozen different cut-offs for "too fast" and "too slow" reaction times.
^summary

## Overview

This note covers the paper's **motivation**: what the problem is and why it arises. It does not repeat the general taxonomy of analytic choices, which is in [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]]. The paper adds three things to those notes:

1. an explicit **cost argument** for why false positives deserve priority over false negatives;
2. a **behavioural mechanism** (ambiguity × motivated reasoning) instead of an appeal to fraud;
3. an **empirical illustration of ambiguity**, the reaction-time exclusion rules found in published articles.

The abstract states the paper's two goals. The first is to show that flexibility "dramatically increases actual false-positive rates" despite the nominal ≤ .05 standard. The second is to offer "a simple, low-cost, and straightforwardly effective disclosure-based solution": six requirements for authors and four guidelines for reviewers ([[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]).

## Main Content

### The premise: errors are inevitable (p. 1359)

The introduction opens with a statement of what science is for, and the rest of the paper argues from it (first paragraph, p. 1359):

> "Our job as scientists is to discover truths about the world. We generate hypotheses, collect data, and examine whether or not the data are consistent with those hypotheses. Although we aspire to always be accurate, errors are inevitable."

Once error is accepted as unavoidable, the question becomes which error to worry about most. The next sentence answers it: "Perhaps the most costly error is a false positive, the incorrect rejection of a null hypothesis."

### Why false positives are the costliest error (p. 1359)

The authors define a **false positive** as "the incorrect rejection of a null hypothesis" and give three costs:

| # | Cost | Argument in the paper |
|---|---|---|
| 1 | **Persistence** | Null results have many possible causes, so a failure to replicate is "never conclusive". Prestigious journals rarely publish null findings or exact replications, so researchers have little incentive to try. |
| 2 | **Waste** | False positives "inspire investment in fruitless research programs and can lead to ineffective policy changes." |
| 3 | **Credibility** | "a field known for publishing false positives risks losing its credibility." |

The paper's central claim (p. 1359) is that despite the nominal 5% ceiling, "current standards for disclosing details of data collection and analyses make false positives vastly more likely", so that "it is unacceptably easy to publish 'statistically significant' evidence consistent with any hypothesis."

### The construct: researcher degrees of freedom (p. 1359)

> [!definition] Definition: Researcher degrees of freedom (Simmons et al. 2011, p. 1359)
> The decisions a researcher makes "in the course of collecting and analyzing data", illustrated by the paper's own list of questions:
> - Should more data be collected?
> - Should some observations be excluded?
> - Which conditions should be combined and which ones compared?
> - Which control variables should be considered?
> - Should specific measures be combined or transformed or both?
>
> It is "rare, and sometimes impractical" to make all of these decisions in advance. It is "common (and accepted practice)" to explore alternatives, "search for a combination that yields 'statistical significance'", and report only what "worked". The arithmetic consequence: "the likelihood of at least one (of many) analyses producing a falsely positive finding at the 5% level is necessarily greater than 5%."
^def-rdf-simmons

The general concept, with its taxonomy of variable, processing and modelling choices, is owned by [[Researcher Degrees of Freedom]]. This paper coined the term, and its contribution is to put numbers on the inflation ([[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]).

### The mechanism: ambiguity plus desire (pp. 1359-1360)

> [!theorem] Claim: Exploratory flexibility is not malicious (Simmons et al. 2011, pp. 1359-1360)
> The behaviour "is not the by-product of malicious intent, but rather the result of two factors: (a) ambiguity in how best to make these decisions and (b) the researcher's desire to find a statistically significant result."
>
> **Supporting literature (motivated reasoning):** Babcock & Loewenstein (1997), Dawson, Gilovich & Regan (2002), Gilovich (1983), Hastorf & Cantril (1954), Kunda (1990) and Zuckerman (1979) document that people are self-serving when they interpret ambiguous information and are adept at reaching justifiable conclusions that match their desires.
>
> **Implication:** faced with an ambiguous analytic choice, researchers "will tend to conclude, with convincing self-justification, that the appropriate decisions are those that result in statistical significance (p ≤ .05)."
^claim-ambiguity-desire

The point matters for remedies. If the cause were fraud, the remedy would be policing. Because the cause is ambiguity met by motivated reasoning, the remedy the paper proposes is **disclosure**: make the forks visible so readers can judge them. The paper later concedes that disclosure "will not help in the unusual case of willful deception" (p. 1362).

### Evidence of ambiguity: reaction-time outlier rules (p. 1360)

> [!example] Example: Outlier exclusion rules in about 30 *Psychological Science* articles (p. 1360)
> **Setup.** The authors read roughly 30 articles that analysed reaction times and recorded how each treated outliers.
>
> **Findings.** Most (but not all) excluded responses that were "too fast", but the threshold varied:
> - **Too fast:** fastest 2.5%; "faster than 2 standard deviations from the mean" (the paper's wording, p. 1360); faster than 100, 150, 200 or 300 ms.
> - **Too slow:** slowest 2.5% or 10%; 2, 2.5 or 3 SD slower than the mean; 1.5 SD slower than *that condition's* mean; slower than 1,000, 1,200, 1,500, 2,000, 3,000 or 5,000 ms.
>
> **Interpretation.** "None of these decisions is necessarily incorrect, but that fact makes any of them justifiable and hence potential fodder for self-serving justifications." When every choice is defensible, the choice actually made carries no information about whether it was picked after seeing the data.
^ex-rt-outliers

*Inference (this note's tally and arithmetic, not figures from the paper):* the paper gives no count of rules. It lists them qualitatively, and counting the list gives 6 "too fast" rules and 12 "too slow" rules. Crossing them, plus "no exclusion" on each side, gives roughly 7 × 13 ≈ 90 combinations, and at least 6 × 12 = 72 even without the no-exclusion options. That is a large set of defensible exclusion pipelines for one preprocessing decision, before any choice about the test. The paper itself makes only the qualitative point that the rules "varied enormously".

## Examples

> [!example] Example: The same ambiguity in marketing analytics (generic illustration)
> Take a weekly media-response dataset with 52-156 rows. An analyst has to decide how to treat holiday weeks (drop, dummy or leave in), which promotional-pressure control to include, whether to model the KPI in levels or logs, and which adstock decay to fix. Each choice is defensible, as the reaction-time cut-offs were. If the analyst wants a "significant" channel effect for a stakeholder deck, Simmons et al.'s mechanism predicts that the chosen specification will be the one that produces it, and the analyst will sincerely believe it is the right one. Disclosure here would mean reporting the alternative specifications next to the headline (compare [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^req-5-6|Requirements 5-6]]).
^ex-generic-application

## Connections

- The general concept and a fuller taxonomy of forks: [[Researcher Degrees of Freedom]]. Gelman & Loken's extension, under which flexibility inflates errors even when only one analysis is run, is in [[Garden of Forking Paths]].
- The population-level consequence (low post-study probability of truth when analyses are flexible) is Ioannidis's Corollary 4: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- The persistence argument links to the replication literature: [[The Replication Crisis and Multiple Levels of Variation]].
- Optimising a proxy (significance) instead of the goal (truth) is a Goodhart-type failure: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]: paper map
- [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]: the two staged experiments
- [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]: how large the inflation is
- [[Q - Common Pitfalls in Statistical Modeling]]
