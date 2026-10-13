---
title: "Ioannidis 2005 - Why Most Published Findings Are False - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - type/overview
  - doc/paper
source: "[[raw/Ioannidis 2005 - Why Most Published Research Findings Are False.pdf]]"
source_location: "Ioannidis JPA (2005), 'Why most published research findings are false', PLoS Medicine 2(8): e124, pp. 0696-0701 (Essay). Whole paper: Summary; introduction; Modeling the Framework for False Positive Findings (Table 1); Bias (Table 2, Fig. 1); Testing by Several Independent Teams (Table 3, Fig. 2); Corollaries 1-6; Box 1; Most Research Findings Are False for Most Research Designs and for Most Fields (Table 4); Claimed Research Findings May Often Be Simply Accurate Measures of the Prevailing Bias; How Can We Improve the Situation?; References 1-37."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Ioannidis 2005 - Why Most Published Findings Are False"
doc_type: paper
depends_on:
  - "[[Multiple Testing Corrections]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Researcher Degrees of Freedom]]"
used_by:
  - "[[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]]"
  - "[[Ioannidis 2005 - Bias Parameter u and Reverse Bias]]"
  - "[[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]]"
  - "[[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]]"
  - "[[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]]"
  - "[[Ioannidis 2005 - Table 4 PPV by Study Design]]"
  - "[[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]]"
  - "[[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]"
  - "[[Ioannidis 2005 - Reference List and Citation Map]]"
  - "[[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]"
aliases:
  - Ioannidis 2005
  - Why Most Published Research Findings Are False
  - Ioannidis PLoS Medicine 2005
  - PPV of research findings
---

# Ioannidis 2005 - Why Most Published Findings Are False - Overview

> [!summary]
> **Question.** Given that a study has declared a relationship "statistically significant", what is the probability that the relationship is real? **Answer.** Treat each research finding as a diagnostic test applied to a field's pool of hypotheses. The post-study probability of truth is the **positive predictive value** $\text{PPV}=(1-\beta)R/(R-\beta R+\alpha)$, where $R$ is the field's pre-study odds that a probed relationship is true, $1-\beta$ is power and $\alpha$ is the Type I error rate. A finding is more likely true than false only if $(1-\beta)R>\alpha$. Two further forces, **bias** $u$ (analyses that become "findings" because of design, analysis or reporting choices) and **$n$ independent teams** testing the same question, both pull PPV down toward the pre-study probability $R/(R+1)$. Under parameter values the author considers typical (Table 4), PPV is about 0.85 for a well-powered RCT with 1:1 prior odds, 0.20 for a well-powered exploratory epidemiological study and 0.001-0.0015 for discovery research with massive testing. Six corollaries follow: small studies, small effects, many untargeted hypotheses, flexible analysis, conflicts of interest and "hot" fields all lower the chance that a claimed finding is true.

## Overview

The essay (6 journal pages, PLoS Medicine "Essay" section) is the most cited statement of the base-rate argument against reading single significant results at face value. Its main move is to stop asking "how surprising is the data under the null?" (the p-value) and instead ask "what fraction of significant results in this field are true?" It answers with a $2\times 2$ table of findings against truth, so the question becomes Bayes' rule with a field-level prior. The essay was written for biomedical research. The argument applies to any setting that screens many candidate effects with a significance filter, for example a marketing analytics team testing dozens of creatives, audiences and channel coefficients and then reporting the "winners".

**Contribution.**
1. A closed-form PPV for a single study (Table 1), for a study with bias $u$ (Table 2) and for $n$ independent studies on the same question (Table 3).
2. Six qualitative corollaries linking field characteristics to PPV.
3. A worked example (Box 1) and a design-scenario table (Table 4). Under the author's assumptions, most designs fall below PPV = 0.5.
4. The "null field" argument: in a field with no true effects, the distribution of claimed effect sizes measures the field's net bias.
5. Remedies: large low-bias studies targeted at high-$R$ questions, judging the totality of evidence, registration and protocols, and explicit estimation of $R$.

**Headline numbers** (verified by recomputation, see [[Ioannidis 2005 - Table 4 PPV by Study Design]]):

| Scenario | $1-\beta$ | $R$ | $u$ | PPV |
|---|---|---|---|---|
| Adequately powered RCT, little bias, 1:1 odds | 0.80 | 1:1 | 0.10 | 0.85 |
| Underpowered exploratory epidemiological study | 0.20 | 1:10 | 0.30 | 0.12 |
| Discovery research with massive testing | 0.20 | 1:1,000 | 0.80 | 0.0010 |
| Box 1 GWAS, no bias, single study | 0.60 | $10^{-4}$ | 0 | $\approx 12\times10^{-4}$ |
| Box 1 GWAS, bias $u=0.10$, single study | 0.60 | $10^{-4}$ | 0.10 | $\approx 4.4\times10^{-4}$ |
| Box 1 GWAS, ten bias-free teams, one significant | 0.60 | $10^{-4}$ | 0 ($n=10$) | printed $1.5\times10^{-4}$; **recomputed from Table 3: $\approx2.5\times10^{-4}$** (see caveat) |

> [!warning] Caveat on Box 1's ten-team figure
> Box 1 (p. 0699) prints $1.5\times10^{-4}$ for ten bias-free teams with one significant result. Plugging the Box 1 inputs ($1-\beta=0.60$, $\alpha=0.05$, $R=10^{-4}$, $n=10$) into the paper's own Table 3 formula gives $\text{PPV}_{10}\approx R(1-0.4^{10})/(R+1-0.95^{10})\approx2.5\times10^{-4}$. The printed value can only be reproduced under assumptions the paper does not state: an effective per-study $\alpha\approx0.10$, or about 21 teams. [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]] tests eight candidate explanations. Quote $2.5\times10^{-4}$ as the value implied by the model and $1.5\times10^{-4}$ as the printed value. The qualitative conclusion holds under both: ten teams leave PPV within a factor of about 1.5-2.5 of the prior, against a 12-fold gain for a single study.
^box1-ten-team-caveat

The essay's one-sentence thesis, printed as a pull-quote on p. 0696: "It can be proven that most claimed research findings are false."

## Main Content

### Summary (abstract), item by item (p. 0696)

The Summary box on p. 0696 has three moves. Quotations are checked against the PDF text.

> [!definition] Abstract structure
> 1. **Concern.** "There is increasing concern that most current published research findings are false."
> 2. **Determinants.** "The probability that a research claim is true may depend on study power and bias, the number of other studies on the same question, and, importantly, the ratio of true to no relationships among the relationships probed in each scientific field." These are $1-\beta$, $u$, $n$ and $R$ respectively.
> 3. **Six conditions that lower the chance a finding is true**, which become Corollaries 1-6. A finding is less likely to be true:
>    - when the studies conducted in a field are smaller (Corollary 1);
>    - when effect sizes are smaller (Corollary 2);
>    - when there is a greater number and lesser preselection of tested relationships (Corollary 3);
>    - where there is greater flexibility in designs, definitions, outcomes and analytical modes (Corollary 4);
>    - when there is greater financial and other interest and prejudice (Corollary 5);
>    - when more teams are involved in a scientific field in chase of statistical significance (Corollary 6).
> 4. **Simulation claim.** "Simulations show that for most study designs and settings, it is more likely for a research claim to be false than true." The "simulations" are the deterministic formula evaluations of Table 4; see [[Ioannidis 2005 - Table 4 PPV by Study Design]].
> 5. **Bias claim.** "Moreover, for many current scientific fields, claimed research findings may often be simply accurate measures of the prevailing bias." See [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]].
> 6. **Purpose.** "In this essay, I discuss the implications of these problems for the conduct and interpretation of research." See [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]].
^def-abstract-structure

### Introduction (p. 0696)

The introduction is a single paragraph with four claims:

1. Published findings "are sometimes refuted by subsequent evidence, with ensuing confusion and disappointment."
2. Refutation is seen "across the range of research designs, from clinical trials and traditional epidemiological studies [1–3] to the most modern molecular research [4,5]." Refs 1-3 are about clashes between randomised and observational evidence (e.g. vitamin studies). Refs 4-5 are about microarray cancer-outcome prediction and the replication validity of genetic associations. See [[Ioannidis 2005 - Reference List and Citation Map]].
3. "There is increasing concern that in modern research, false findings may be the majority or even the vast majority of published research claims [6–8]. However, this should not be surprising." Refs 6-8 are about genetic association and microarray "noise discovery".
4. "It can be proven that most claimed research findings are false." This sentence is repeated as the pull-quote. The essay then says it "will examine the key factors that influence this problem and some corollaries thereof." Here "proven" means *derived under the model's assumptions with typical parameter values*, not a theorem about actual fields. See the assumptions table in [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]].

The framework section then defines a **research finding** as any relationship reaching formal statistical significance. It notes that "'Negative' research is also very useful" and that "'Negative' is actually a misnomer", but restricts attention to claimed (positive) relationships. See [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]].

### Publication context (front matter, p. 0696 sidebar)

| Item | Content |
|---|---|
| Section | **Essay**. The sidebar states: "The Essay section contains opinion pieces on topics of broad interest to a general medical audience." |
| Citation | Ioannidis JPA (2005) Why most published research findings are false. *PLoS Med* 2(8): e124. DOI 10.1371/journal.pmed.0020124 |
| Author affiliations | Department of Hygiene and Epidemiology, University of Ioannina School of Medicine, Ioannina, Greece; and Institute for Clinical Research and Health Policy Studies, Department of Medicine, Tufts-New England Medical Center, Tufts University School of Medicine, Boston, Massachusetts, USA |
| Competing interests | "The author has declared that no competing interests exist." |
| Licence | Open access, Creative Commons Attribution License (unrestricted use, distribution and reproduction with proper citation); © 2005 John P. A. Ioannidis |
| Abbreviation | PPV, positive predictive value |
| Length | 6 pages (pp. 0696-0701), 4 tables, 2 figures, 1 box, 37 references |

> [!warning] Genre matters
> The paper is an **opinion essay** built on an analytical model. It is not an empirical study. The model contains no estimated data. Its parameter values ($R$, $u$, power) are the author's judgments about typical settings. The essay's influence comes from the clarity of the PPV argument. Its specific percentages are only as good as those assumed inputs, which is the basis of later critiques such as Goodman and Greenland's (see [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]).
^warn-genre

### Source Map

Full section, table and figure checklist mapped to the note that captures it.

| Source element | Location | Note |
|---|---|---|
| Front matter: Essay-section disclaimer, citation/DOI, affiliations, competing interests, CC-BY licence | p. 0696 sidebar | this note, §Publication context |
| Summary (abstract), six determinants, simulation and prevailing-bias claims | p. 0696 | this note, §Summary (abstract), item by item |
| Introduction: refutation across designs [1-5], false findings may be the majority [6-8], "it can be proven" | p. 0696 | this note, §Introduction; [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] |
| §Modeling the Framework for False Positive Findings: definition of research finding, $R$, $c$, $\alpha$, $\beta$, PPV formula, condition $(1-\beta)R>\alpha$ | pp. 0696-0697 | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] |
| Table 1 (findings vs true relationships) | p. 0697 | [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] |
| §Bias: definition of bias, $u$, PPV with bias, monotonicity in $u$ | p. 0697 | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] |
| Table 2 (findings in the presence of bias) | p. 0697 | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] |
| Reverse bias paragraph | p. 0697 | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] |
| Figure 1 (PPV vs $R$ for $u$ levels, three power panels; legend mislabelled, plotted curves are $u$=0/0.05/0.20/0.80) | p. 0698 | [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] |
| §Testing by Several Independent Teams: PPV for $n$ studies, unequal powers | p. 0697 | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] |
| Table 3 (findings in the presence of multiple studies) | p. 0698 | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] |
| Figure 2 (PPV vs $R$ for $n$ = 1, 5, 10, 50, three power panels; panel-vs-legend check) | p. 0699 | [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] |
| §Corollaries 1-6 (small studies; small effects; many and less selected relationships; flexibility; interests and prejudice; hot fields) | pp. 0697-0699 | [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] |
| Proteus phenomenon; interactions among corollaries | p. 0699 | [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] |
| Box 1 (science at low pre-study odds, GWAS example) | p. 0699 | [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]] |
| §Most Research Findings Are False for Most Research Designs and for Most Fields | pp. 0699-0700 | [[Ioannidis 2005 - Table 4 PPV by Study Design]] |
| Table 4 (PPV for 9 design scenarios) | p. 0700 | [[Ioannidis 2005 - Table 4 PPV by Study Design]] |
| §Claimed Research Findings May Often Be Simply Accurate Measures of the Prevailing Bias (null fields, 60-nutrient example) | pp. 0700-0701 | [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]] |
| §How Can We Improve the Situation? (large studies, totality of evidence, registration, estimating $R$) | p. 0701 | [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]] |
| References 1-37 (full bibliographic entries, citation site and supported claim for each) | p. 0701 | [[Ioannidis 2005 - Reference List and Citation Map]] |
| Published commentary | not in PDF | summarized as external context in [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]] |

### Notes in this set

- [[Ioannidis 2005 - PPV of Research Findings and the 2x2 Framework]] covers the model setup, Table 1, the PPV derivation, the likelihood-ratio reading and the "more likely true than false" threshold.
- [[Ioannidis 2005 - Bias Parameter u and Reverse Bias]] covers Table 2, PPV with bias, a proof that PPV falls in $u$ iff $1-\beta>\alpha$, the $u\to1$ limit, Figure 1 (with a check against the rendered page showing that the legend is mislabelled: the plotted curves are $u$ = 0, 0.05, 0.20, 0.80) and reverse bias.
- [[Ioannidis 2005 - Multiple Independent Teams and PPV Erosion]] covers Table 3, PPV for $n$ studies, the unequal-power generalization, Figure 2 and the $n\to\infty$ limit.
- [[Ioannidis 2005 - Six Corollaries and the Proteus Phenomenon]] covers all six corollaries with the parameter each one moves, how they interact, and the Proteus phenomenon.
- [[Ioannidis 2005 - Box 1 Genome-Wide Association Worked Example]] works through Box 1 numerically, including a discrepancy in the multiple-teams figure (printed $1.5\times10^{-4}$ vs $2.5\times10^{-4}$ recomputed from Table 3).
- [[Ioannidis 2005 - Table 4 PPV by Study Design]] transcribes Table 4 and recomputes it, adding the bias-free PPV for each row.
- [[Ioannidis 2005 - Null Fields and Claimed Effects as Measures of Bias]] covers null fields, the nutrient example and why large effects are a warning sign.
- [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]] covers the four remedies, the modelling assumptions and external commentary.
- [[Ioannidis 2005 - Reference List and Citation Map]] transcribes all 37 references and records, for each one, where it is cited and which claim it supports.

## Examples

### Why it matters for model validation and marketing analytics

- **Pre-study odds are a property of the search, not the study.** A model-selection loop that tries hundreds of adstock/saturation specifications, or a feature-importance screen over thousands of variables, operates at low $R$. A significant coefficient found that way has a low PPV even when each individual test is honest. See [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] and [[Garden of Forking Paths]].
- **Bias $u$ is what [[Researcher Degrees of Freedom]] look like at field level.** [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] measures by simulation how much flexibility inflates $\alpha$. Ioannidis shows what that inflation does to PPV.
- **The many-teams result applies to many analysts.** If several analysts, vendors or model runs attack the same KPI question and only the "significant" story is circulated, PPV falls exactly as in Table 3.
- **Underpowered experiments.** Ad experiments often have power far below 0.5 ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]). Corollaries 1-2 then predict that most "winning" test cells are false positives, or have exaggerated magnitudes ([[Type S and Type M Errors]]).

## Connections

- [[Multiple Testing Corrections]]: Benjamini-Hochberg FDR control is the frequentist counterpart of keeping $1-\text{PPV}$ small within one family of tests. Ioannidis's point is that the family that matters is the whole field, which no single report can correct for.
- [[Multiple Comparisons - Bayesian Perspective]] and [[Partial Pooling as Multiple Comparisons Correction]]: hierarchical shrinkage is an operational way to bring a low prior $R$ into estimation.
- [[The Replication Crisis and Multiple Levels of Variation]]: the empirical crisis this paper anticipated.
- [[Pre-registration and Open Science - Overview]]: the institutional response to $u$.
- [[Constructing Priors for Effect Sizes]]: how to state $R$ (and effect-size priors) explicitly.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: Table 4 is a deterministic "simulation" of the formulas. A Monte Carlo version is easy to build (see the code in [[Ioannidis 2005 - Table 4 PPV by Study Design]]).
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: contrasting view, judging models by predictive accuracy rather than significance.
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]: small samples are the root of Corollary 1. The same problem appears in prediction-model development.

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]: owner of the analytic-flexibility simulations that operationalize $u$.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]: selecting on a significance proxy is a regressional-Goodhart problem.
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]: error control for variable selection at low $R$.
- [[Type S and Type M Errors]]: the magnitude-and-sign view of the same underpowered-study problem.
- [[Model Selection and Overfitting]]: overfitting as the modelling analogue of data dredging.
- [[Breiman 2001 - Critique of Data Models - Goodness of Fit, Multiplicity and Predictive Accuracy]] — critique of significance claims under unchecked models
