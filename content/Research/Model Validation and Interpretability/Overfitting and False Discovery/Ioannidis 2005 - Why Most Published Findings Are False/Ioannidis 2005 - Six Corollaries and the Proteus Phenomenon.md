---
title: "Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "PLoS Med 2(8): e124, §Corollaries, pp. 0697-0699 (Corollaries 1-2 p. 0697; 3-5 p. 0698; 6 pp. 0698-0699; interactions among corollaries p. 0699)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]"
used_by:
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
  - "[[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]"
aliases:
  - Ioannidis corollaries
  - Proteus phenomenon
  - Hot field corollary
---

# Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon

> [!summary]
> From the PPV formulas, Ioannidis derives six qualitative corollaries. Each says that a field feature lowers the probability that a claimed finding is true, and each acts through one parameter: (1) smaller studies (power $1-\beta$); (2) smaller effect sizes (power); (3) more and less preselected tested relationships (pre-study odds $R$); (4) more flexibility in designs, definitions, outcomes and analyses (bias $u$); (5) greater financial and other interests and prejudice ($u$); (6) hotter fields with more teams (number of studies $n$). Corollary 6 yields the **Proteus phenomenon**: rapidly alternating extreme claims and opposite refutations. The factors interact and can partly offset one another.

## Overview

The section opens (p. 0697, §Corollaries, first paragraph) by tying the corollaries to the worked example: "A practical example is shown in Box 1. Based on the above considerations, one may deduce several interesting corollaries about the probability that a research finding is indeed true." Box 1 is worked through in [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]. So the corollaries are presented as deductions from the PPV formulas of Tables 1-3, not as separate empirical claims.

The corollaries (pp. 0697-0699) translate the algebra of Tables 1-3 into statements about research environments. Below, each corollary is stated in bold as in the paper, followed by the parameter it moves, the paper's examples and a generic analytics reading.

## Main Content

> [!theorem] Corollary 1: Study size (p. 0697)
> **"The smaller the studies conducted in a scientific field, the less likely the research findings are to be true."**
> *Mechanism:* small samples mean low power, and "for all functions above, the PPV for a true research finding decreases as power decreases towards $1-\beta=0.05$."
> *Paper's contrast:* large RCTs in cardiology ("several thousand subjects randomized") [14] versus most research on molecular predictors ("sample sizes 100-fold smaller") [15].
> *Analytics reading:* a geo test with eight markets, or an MMM fit to 52 weekly rows with 15 channels, sits at the small-study end. See [[Power Analysis and Sample Size]] and [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
^cor-1

> [!theorem] Corollary 2: Effect size (p. 0697)
> **"The smaller the effect sizes in a scientific field, the less likely the research findings are to be true."**
> *Mechanism:* power depends on effect size.
> *Paper's contrast:* smoking and cancer or cardiovascular disease (relative risks 3-20) versus genetic risk factors for multigenetic diseases (relative risks 1.1-1.5) [7]. Modern epidemiology is "increasingly obliged to target smaller effect sizes" [16], so the share of true findings should fall. If true effects are very small, a field "is likely to be plagued by almost ubiquitous false positive claims". If most true genetic or nutritional determinants of complex diseases had relative risks below 1.05, those fields would be "largely utopian endeavors".
> *Analytics reading:* incremental ad effects are typically a tiny share of outcome variance ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]), which is the Corollary 2 regime.
^cor-2

> [!theorem] Corollary 3: Number and preselection of tested relationships (p. 0698)
> **"The greater the number and the lesser the selection of tested relationships in a scientific field, the less likely the research findings are to be true."**
> *Mechanism:* PPV "depends a lot on the pre-study odds ($R$)".
> *Paper's contrast:* confirmatory designs such as large phase III RCTs or meta-analyses of them, versus hypothesis-generating experiments. Fields considered "highly informative and creative" for the wealth of information they test, such as microarrays and other high-throughput discovery-oriented research [4,8,17], "should have extremely low PPV."
> *Analytics reading:* automated feature screens, "test every audience x creative x placement" grids and exhaustive model searches are high-throughput discovery. See [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].
^cor-3

> [!theorem] Corollary 4: Flexibility (p. 0698)
> **"The greater the flexibility in designs, definitions, outcomes, and analytical modes in a scientific field, the less likely the research findings are to be true."**
> *Mechanism:* flexibility increases the potential to turn "negative" results into "positive" ones, i.e., it raises bias $u$.
> *Supporting points:*
> - Standardized conduct and reporting (RCTs [18-20], meta-analyses [21,22]) should raise the share of true findings.
> - Unequivocal, universally agreed outcomes (e.g., death) beat multifarious invented outcomes (e.g., scales for schizophrenia outcomes) [23].
> - Fields with stereotyped analysis methods (e.g., Kaplan-Meier plots and the log-rank test) [24] may yield more true findings than fields where methods are "still under experimentation (e.g., artificial intelligence methods) and only 'best' results are reported."
> - Bias is a problem even in the most stringent designs: there is strong evidence of selective outcome reporting, with manipulation of the outcomes and analyses reported, even for randomized trials [25]. "Simply abolishing selective publication would not make this problem go away."
> *Analytics reading:* this is the corollary most relevant to model-validation practice. Choosing among model fits by an in-sample attribution criterion (for example, total SHAP mass or coefficient significance) rather than held-out accuracy is flexibility in "analytical modes". Reporting the best of many fits is the "only 'best' results are reported" pattern. See [[Researcher Degrees of Freedom]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] and [[Cross Validation Checking]].
^cor-4

> [!theorem] Corollary 5: Financial and other interests and prejudice (p. 0698)
> **"The greater the financial and other interests and prejudices in a scientific field, the less likely the research findings are to be true."**
> *Mechanism:* conflicts of interest and prejudice may increase bias $u$.
> *Supporting points:* conflicts of interest are very common in biomedical research [26] and inadequately and sparsely reported [26,27]. Prejudice need not be financial: belief in a theory or commitment to one's own findings, studies done to earn promotion or tenure, and prestigious investigators suppressing refuting findings through peer review, "thus condemning their field to perpetuate false dogma". Empirical evidence shows expert opinion is "extremely unreliable" [28].
> *Analytics reading:* the analyst whose bonus, budget or vendor contract depends on a channel "working" is in the Corollary 5 position. Independent validation exists to counter this: see [[SR 11-7 - Model Risk Management Guidance - Overview]] (effective challenge) and [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
^cor-5

> [!theorem] Corollary 6: Hot fields (pp. 0698-0699)
> **"The hotter a scientific field (with more scientific teams involved), the less likely the research findings are to be true."**
> *Mechanism:* "seemingly paradoxical", it follows from Table 3: the PPV of isolated findings falls as more teams work on the same field ([[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]). It also has a behavioural channel. With many teams and massive data, "timing is of the essence in beating competition", so each team prioritizes its most impressive "positive" results. "Negative" results become attractive to disseminate only once another team has published a "positive" association on the same question, when it may be attractive to refute a claim in a prestigious journal.
> This may explain why fields that draw wide attention see "major excitement followed rapidly by severe disappointments".
^cor-6

> [!definition] Proteus phenomenon (p. 0699, ref. [29])
> The term **Proteus phenomenon** "has been coined to describe this phenomenon of rapidly alternating extreme research claims and extremely opposite refutations" (Ioannidis & Trikalinos 2005 [29]). Empirical evidence suggests the sequence of extreme opposites is very common in molecular genetics.
^def-proteus

### Interactions among the corollaries (p. 0699)

The corollaries treat each factor separately, but the factors "often influence each other":
- Investigators in fields where true effects are *perceived* small may run larger studies than those in fields with perceived large effects, so Corollary 2 partly offsets Corollary 1.
- Prejudice may prevail in a hot field, which further undermines PPV (Corollaries 5 and 6 compound).
- Highly prejudiced stakeholders may even create a barrier that aborts efforts to obtain and disseminate opposing results.
- Conversely, a hot field or strong invested interests may *promote* larger studies and better standards, raising PPV.
- Massive discovery-oriented testing may yield so many significant relationships that investigators "have enough to report and search further". They then refrain from data dredging and manipulation, which lowers $u$ even as $R$ is low.

### Summary table: corollary to parameter

| # | Field feature | Parameter moved | Direction of PPV |
|---|---|---|---|
| 1 | Smaller studies | $1-\beta\downarrow$ | $\downarrow$ |
| 2 | Smaller effect sizes | $1-\beta\downarrow$ | $\downarrow$ |
| 3 | More, less preselected relationships | $R\downarrow$ | $\downarrow$ |
| 4 | Flexible designs, definitions, outcomes, analyses | $u\uparrow$ | $\downarrow$ |
| 5 | Financial and other interests, prejudice | $u\uparrow$ | $\downarrow$ |
| 6 | Hotter field, more teams | $n\uparrow$ (and $u\uparrow$ via competition) | $\downarrow$ |

## Examples

> [!example] A "hot" marketing question (generic)
> Suppose a new ad format becomes fashionable. Dozens of agencies and in-house teams run small tests (Corollaries 1, 6) on noisy short-term KPIs (Corollary 2). They are free to choose the metric and the window (Corollary 4), and the vendor selling the format publishes the case studies (Corollary 5). The first published case study showing a large lift is then a near-textbook low-PPV claim. A later wave of "it doesn't work" reports would be the Proteus pattern, not evidence that the effect has changed.
^ex-hot-marketing-question

## Connections

- [[Type S and Type M Errors]]: Corollaries 1-2 also predict exaggerated magnitudes among the true positives (winner's-curse inflation).
- [[Pre-registration vs Registered Reports]]: registered reports attack Corollary 6's publication asymmetry directly.
- [[Model Selection and Overfitting]] and [[Model Selection Using Predictive Performance]]: held-out evaluation as a standardized "analytical mode" (Corollary 4).
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: the predictive-accuracy culture that Corollary 4's AI example points toward, and its own risk of "best result" reporting.

## See Also

- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]]
- [[Ioannidis 2005 - Table 4 PPV by Study Design]]: corollaries in numbers.
- [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]: what to do about each lever.
