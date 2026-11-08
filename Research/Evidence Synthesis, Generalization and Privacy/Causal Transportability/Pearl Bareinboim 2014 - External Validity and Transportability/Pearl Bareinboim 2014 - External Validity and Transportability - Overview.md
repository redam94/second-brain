---
title: "Pearl Bareinboim 2014 - External Validity and Transportability - Overview"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/overview
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Statistical Science 29(4), 579-595 (arXiv 1503.01603), whole paper"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Do-Calculus in Summary Causal DAGs]]"
used_by:
  - "[[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]]"
  - "[[Pearl 2014 - Motivating Examples and Transport Formulas]]"
  - "[[Pearl 2014 - Selection Diagrams and Definition of Transportability]]"
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
  - "[[Pearl 2014 - Appendix Derivations of Transport Formulas]]"
  - "[[Pearl 2014 - Conclusions, Extensions and Limits]]"
  - "[[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]]"
aliases:
  - Pearl Bareinboim transportability overview
  - External Validity From Do-Calculus to Transportability
---

# Pearl Bareinboim 2014 - External Validity and Transportability - Overview

> [!summary]
> Pearl and Bareinboim replace the usual list of "threats to external validity" with a list of **licenses to transport**: explicit graphical assumptions (selection diagrams) under which a causal effect learned in an experiment on population $\Pi$ can be recomputed for a different population $\Pi^*$ where only observational data exist. The central result is a do-calculus criterion: an effect is transportable if the selection variables $S$ can be separated from the do-operator by the rules of do-calculus, and for common cases this reduces to **S-admissibility** (Theorems 2 and 3), which also yields the exact reweighting formula to use.

## Overview

**Research question.** Under what conditions can the causal effect $P(y\mid do(x))$ measured experimentally in a study population $\Pi$ be used to infer $P^*(y\mid do(x))$ in a target population $\Pi^*$, given observational data from $\Pi^*$ and a statement of where the two populations are believed to differ?

**Why it matters.** The standard literature (Campbell and Stanley's "external validity", Manski, "heterogeneity", meta-analysis, hierarchical models) lists *threats* and averages studies. It does not say, from first principles, when transfer is *licensed*, nor which reweighting is correct. The paper shows that the correct formula depends on the *causal location* of the difference, not on statistical differences alone: the same observed disparity $P(z)\neq P^*(z)$ requires reweighting in one causal story and no adjustment at all in another.

**Contributions.**
1. A formal language for population differences: the **selection diagram** (Definition 4), an SCM diagram plus square $S$-nodes that point at the mechanisms suspected to differ.
2. A formal definition of **transportability** (Definition 5), plus three special cases: trivial (Def. 6), direct (Def. 7) and the link to identifiability.
3. A sufficient-and-necessary reduction to do-calculus (Theorem 1) and two usable graphical theorems (Theorems 2 and 3) built on **S-admissibility** (Definition 8).
4. Ten worked examples, including the surrogate endpoint case, and the derivation of the transport formulas (3.1), (3.4), (5.9), (5.10).
5. A pointer to completeness results and to **meta-transportability** (pooling many heterogeneous source studies).

**Key result in one line.** If a set $Z$ of observed pre-treatment covariates is S-admissible, i.e. $(Y\perp S\mid Z,X)_{D_{\overline X}}$, then
$$P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\,P^*(z)$$
and no further data from $\Pi$ are needed beyond the $z$-specific experimental effect.

## Main Content

### Source Map

| Paper section | arXiv PDF pages | Content | Covered in |
|---|---|---|---|
| Abstract | 1 | transportability, selection diagrams, do-calculus reduction | this note |
| 1. Introduction: Threats vs. Assumptions | 1-3 | threats vs. licenses, why assumptions are avoided, SEM/diagram language, outline, footnotes 1-2 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 2.1 Causal models as inference engines | 3 | inputs I-1..I-3, outputs O-1..O-3, Fig. 1 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 2.2 Assumptions in nonparametric models | 3-4 | Definition 1 (SEM), Eq. 2.1, Fig. 2 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 2.3 Interventions, counterfactuals, causal effects | 4-5 | $do(x)$, Eqs. 2.2-2.3 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 2.4 Identification, d-separation | 5-6 | Definition 2, Definition 3 | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 2.5 Rules of do-calculus | 6 | Rules 1-3, Eqs. 2.5-2.7, completeness | [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] |
| 3. Motivating examples | 6-9 | Examples 1-3, Eqs. 3.1-3.4, Fig. 3 | [[Pearl 2014 - Motivating Examples and Transport Formulas]] |
| 4.1 Selection diagrams and variables | 9-10 | Definition 4, Fig. 4, footnotes 15-18 | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] |
| 4.2 Transportability: definitions and examples | 10-12 | Definitions 5-7, Theorem 1, Examples 4-6, Manski remark | [[Pearl 2014 - Selection Diagrams and Definition of Transportability]] |
| 5. Graphical criterion | 12-14 | Theorem 2, Definition 8, Corollaries 1-2, Theorem 3, Examples 7-10, Figs. 5-7, Eqs. 5.1-5.10 | [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] |
| 6. Conclusions | 14-15 | worst-case analysis, statistical transportability, meta-analysis, extensions, caveats | [[Pearl 2014 - Conclusions, Extensions and Limits]] |
| Appendix | 15-16 | derivations of Eqs. 5.9 and 5.10 | [[Pearl 2014 - Appendix Derivations of Transport Formulas]] |
| Acknowledgments, References | 16-18 | funding, bibliography | not reproduced; referenced where cited |
| (added) marketing reading | n/a | geo/lift transport worked example | [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]] |

## Examples

Three transport formulas from the paper, all for the same experimental data $P(y\mid do(x),z)$ but different causal stories (details in [[Pearl 2014 - Motivating Examples and Transport Formulas]]):

| Story (Fig.) | Role of $Z$ | Correct transport formula |
|---|---|---|
| Age differs between cities (3a/4a) | pre-treatment, $S\to Z$ | $P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)P^*(z)$ (3.1) |
| Language proxy for unmeasured age, age distribution the same (3b/4b) | proxy, $S\to Z$ via age-to-skill link | $P^*(y\mid do(x))=P(y\mid do(x))$ (3.2), no reweighting |
| Biomarker on the causal path, $S\to Z$ (3c/4c) | post-treatment mediator | $P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)P^*(z\mid x)$ (3.4) |

## Connections

- The language builds on [[Directed Acyclic Graphs]] and the three rules summarized in [[Do-Calculus in Summary Causal DAGs]]; identification background is in [[DAGs and Causal Identification]].
- The paper's own statement that traditional synthesis "averages out" differences contrasts with the Bayesian pooling in [[Hierarchical Models]] and with meta-analysis methods in the sibling cluster; Pearl and Bareinboim argue transport exploits commonalities instead.
- The estimator-level counterpart (weighting by $P(S=1\mid X)$) is reviewed in [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]. The 2016 PNAS survey that places this paper inside a unified taxonomy is [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]].
- Marketing: transporting a geo or conversion-lift result to a new market, or to a later period, is exactly Example 1 with markets for cities ([[Geo-Experiment Methodology - Overview]], [[Conversion Lift Studies on Ad Platforms]]). See [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## See Also

- [[Potential Outcomes Framework]], [[Causal Estimands]], [[Instrumental Variables]] (z-identification is a nonparametric cousin, see the 2016 note on confounding).
- Sibling sources in this cluster: [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]] (identification and doubly robust estimation for trial-to-target inference) and [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] (site selection bias, marketing implications).
