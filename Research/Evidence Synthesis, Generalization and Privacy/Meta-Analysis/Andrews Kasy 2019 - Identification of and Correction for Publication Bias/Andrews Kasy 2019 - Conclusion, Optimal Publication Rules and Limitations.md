---
title: "Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/concept
  - doc/paper
source: "[[raw/Andrews 2019 - Identification of and Correction for Publication Bias.pdf]]"
source_location: "Sec. 6 Conclusion (pp. 40-41); assumptions across the paper"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Andrews Kasy 2019 - Identification of and Correction for Publication Bias"
doc_type: paper
depends_on:
  - "[[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]]"
  - "[[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]"
used_by:
  []
aliases:
  - "Andrews Kasy 2019 conclusions and limitations"
  - "Optimal publication rules (Andrews and Kasy)"
---
# Andrews Kasy 2019 - Conclusion, Optimal Publication Rules and Limitations

> [!summary]
> The paper contributes identification of selective publication, bias-corrected inference for known selection, and applications showing selection varies widely across literatures. Practical advice: apply the methods to assess selectivity in a literature and correct individual estimates; readers should adjust published results in intermediate z-ranges (around 2) downwards while taking near-zero or very large (z above about 4) estimates at face value. Result-blind publication restores standard inference, but an optimal rule may itself depend on results.

## Overview

Conclusion section and a consolidated list of assumptions and limitations (collected from across the paper) useful when judging whether the methods transfer to another setting.

## Main Content

### The three contributions

1. Nonparametric identification of selectivity (the conditional publication probability) as a function of empirical findings ([[Andrews Kasy 2019 - Identification Using Replication Studies]], [[Andrews Kasy 2019 - Identification Using Meta-Studies]]).
2. Bias-corrected estimators and confidence sets when the form of selectivity is known ([[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]).
3. Applications documenting the varying scale and kind of selectivity ([[Andrews Kasy 2019 - Estimation and Replication Applications in Economics and Psychology]], [[Andrews Kasy 2019 - Meta-Study Applications - Minimum Wage and Deworming]]).

### Implications for empirical research

> [!definition] Practical advice from the conclusion
> (1) Researchers conducting a meta-analysis may apply the methods to assess selectivity in a literature and to correct individual estimates, tests and confidence sets (the authors provide code on their webpages for a flexible family of selection models). (2) Readers may adjust published point estimates and intervals as in Section 4. If publication probabilities jump at the 5% threshold but do not otherwise depend on findings, then effects close to zero or very far from zero (z-statistic above about 4) can be taken at face value; in intermediate ranges, particularly z around 2, magnitudes should be adjusted downwards. (3) Do **not** adopt the corrected cut-offs as publication standards: that creates an arms race of selectivity and invalidates the corrections again.

^def-practical-advice

### Optimal publication rules

> [!theorem] Result-blind review is not obviously optimal
> One reading is that publication should be non-selective (e.g. result-blind review), restoring unbiasedness and size control of standard inference. But in a stylised model (supplement K) where policy makers decide on published findings, can read only limited numbers of publications, and editors maximise the same social welfare, expected welfare is maximised by publishing results that let policy makers **update the most relative to their priors** - favouring surprising findings, hence violating non-selectivity. A more general theory of optimal publication is left for future research.

^thm-optimal-publication

### Assumptions and limitations (collected)

| Assumption / limitation | Where it appears | What fails if violated |
|---|---|---|
| $f_{X^*|\Theta^*}$ known, normal in applications | Sec. 2, 4 | corrections depend on the latent-result model; excludes arbitrary manipulation unless it fits a selection model |
| Selection depends on $X^*$ only ($D\perp\Theta^*|X^*$), or the Thm 2 generalisation | Sec. 2, 3.1.3 | $p$ not identified; $f_{X|\Theta}$ still identified |
| Replication unaffected by selection | Sec. 3.1 | breaks if replications are published only when they debunk |
| $\Theta^*\perp\sigma^*$ for meta-studies | Sec. 3.2 | meta-study identification fails; mean-effect interpretations shift |
| $p$ identified only up to scale | Sec. 1, 3 | fine for inference on $\Theta$ (scale cancels) |
| Parametric $p$, $\mu$ and small samples (18, 73, ~1000, 22) | Sec. 5 | imprecise estimates, especially deworming |
| Conditional on $\Theta$ for correction: scalar parameters | Sec. 4 | vector-valued parameters handled in the supplement |
| Camerer: most important significant result replicated | Sec. 5.1 | $p$ = published and selected for replication |
| OSC: sample limited to z/t-like statistics | Sec. 5.2 | 73 of 100 studies; sensitivity checked |

## Examples

A concrete reading of the advice: in the ten-fold-selectivity model a published $z=4$ has median-unbiased estimate $3.975$ (about face value), whereas $z=2$ gives $0.717$ (see [[Andrews Kasy 2019 - Median-Unbiased Estimation and Corrected Confidence Sets]]).

## Connections

- Funnel plots and Egger tests as informal diagnostics: [[Sterne 2011 - Funnel Plot Asymmetry - Overview]].
- Hierarchical modelling and pooling across studies, which cite this paper for identification of the upper level: [[Meager 2019 - Hierarchical Model Specifications]].
- Preregistration and analysing all comparisons as remedies on the researcher side: [[Gelman Loken 2013 - Way Forward - Preregistration, Replication and Analyzing All Comparisons]].

### Relevance to marketing measurement

A measurement team can reduce $p(\cdot)$ at the source by logging every test result regardless of outcome (a result-blind repository). Where that is not possible, estimate how selective logging has been (replication or meta-study route) before turning logged lifts into priors.

## See Also

- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Ioannidis 2005 - Remedies, Limitations and Later Critiques]]
