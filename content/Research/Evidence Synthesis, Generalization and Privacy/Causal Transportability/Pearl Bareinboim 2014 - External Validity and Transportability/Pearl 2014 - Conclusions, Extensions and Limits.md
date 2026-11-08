---
title: "Pearl 2014 - Conclusions, Extensions and Limits"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Sec. 6 Conclusions, arXiv pp. 14-15 (journal pp. 592-593); Acknowledgments and References pp. 16-18"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
  - "[[Pearl 2014 - Appendix Derivations of Transport Formulas]]"
used_by:
  - "[[Bareinboim 2016 - Transportability and Data Fusion]]"
aliases:
  - Transportability limits and extensions
  - Meta-transportability
  - Statistical transportability
---

# Pearl 2014 - Conclusions, Extensions and Limits

> [!summary]
> The paper's results are *worst-case* nonparametric licenses: they assume any variable may be an effect modifier, and they require the analyst to state where populations differ. The authors claim the knowledge required is no more demanding than that needed for any principled causal analysis, point to extensions (transporting statistical findings, limited experiments, meta-transportability) and list what the paper does *not* handle: measurement error, selection bias, finite-sample variability, graph uncertainty and unmeasured confounding between arbitrary nodes.

## Overview

Section 6 is short, but it states the paper's scope, its positioning against meta-analysis and hierarchical models, and the two extensions that became the 2013-2016 follow-up literature. The reference list (Acknowledgments and References, pp. 16-18) is not reproduced; the works cited in this vault's notes are named inline.

## Main Content

### What the formalism delivers

1. A **representational language** (selection diagrams) for making assessments of how target populations differ precise, and for deciding whether target causal relations can be inferred from experimental findings.
2. When inference is possible, Theorems 2 and 3 yield **transport formulae**: principled recalibrations of the transported relation.
3. The formulae tell the investigator **which measurements to take** in both the experimental study and the target, minimizing measurement cost and sample variability (see (5.9)-(5.10): variables absent from the formula need not be measured).

### Worst-case character

"The inferences licensed by Theorem 2 and 3 represent worst case analysis, since we have assumed, in the tradition of nonparametric modeling, that every variable may potentially be an effect-modifier (or moderator)." If the analyst is willing to assume certain relationships are **noninteractive or monotonic** (as in additive models), additional transport licenses can be issued beyond those sanctioned by Theorems 2 and 3.

> [!definition] Statistical transportability (the authors' extension)
> Although the results concern transferring *causal* information from experimental to observational studies, the method can also benefit **transporting statistical findings from one observational study to another** (Pearl and Bareinboim 2011). Two rationales: (i) information from the first study may let researchers avoid repeated measurement of certain variables in the target; (ii) pooling data from both populations raises the precision with which their *commonalities* are estimated and, indirectly, the precision of the transported relation. Substantial reduction in sampling variability can be achieved through this decomposition (Pearl 2012b).
^def-statistical-transportability

### Relation to meta-analysis

The same data-sharing philosophy "can be used to guide Meta-Analysis (Glass 1976; Hedges and Olkin 1985; Rosenthal 1995; Owen 2009), where one attempts to combine results from many experimental and observational studies, each conducted on a different population and under a different set of conditions, so as to construct an aggregate measure of effect size that is 'better,' in some formal sense, than any one study in isolation."

| Aspect | Traditional meta-analysis | Transportability-based synthesis |
|---|---|---|
| Treatment of between-study differences | "average out" (inverse-variance weights, partial pooling) | exploit **commonalities**, discard areas of disparity |
| Role of causal structure | none explicit | selection diagram locates differences |
| Regime distinction (experimental vs observational) | rarely explicit | explicit inputs ($P$, $I$, $P^*$) |
| Evaluation | simulation | identifiability / completeness results |

"By pooling together commonalities and discarding areas of disparity, we gain maximum use of the available samples (Bareinboim and Pearl 2013c)."

### Two extensions the paper points to

> [!definition] Limited experiments and meta-transportability
> - Bareinboim and Pearl (2013a): transportability when only a **limited set of experiments** can be run at the source environment.
> - Bareinboim and Pearl (2013c): **meta-transportability**, pooling experimental results from multiple disparate sources to synthesize a consistent estimate of a causal relation at yet another environment, potentially different from each of them. Such synthesis "may be feasible from multiple sources even in cases where it is not feasible from any one source in isolation."
^def-meta-transportability

Both are developed in [[Bareinboim 2016 - Transportability and Data Fusion]].

### Assumptions and caveats (as stated)

- The method relies on the analyst possessing **sufficient background knowledge** to determine, at least qualitatively, where two populations may differ from one another. This is "not vastly different from that required in any principled approach to causation in observational studies, since judgement about possible effects of omitted factors is crucial in any such analysis."
- Even partially available knowledge is useful: the analysis shows what knowledge is needed and "how sensitive conclusions are to knowledge that we do not possess."
- **Not addressed**: measurement errors, selection bias, finite sample variability, uncertainty about graph structure, the possible existence of unmeasured confounders between any two nodes. These "plague any problem in causal analysis, regardless of whether they are represented formally or ignored by avoiding formalism".
- "The methods offered in this paper are representative of what theory permits us to do in ideal situations, and the graphical representation... makes the assumptions explicit and transparent. Transparency is essential for reaching tentative consensus among researchers."

### Cross-source comparison: licenses in this paper vs. estimator assumptions in the review

| This paper | Degtiar and Rose (potential outcomes) |
|---|---|
| Absence of $S\to Y$ given $Z$ (S-admissibility) | conditional exchangeability for selection, $Y^a\perp S\mid X$ |
| Observed $P^*(z)$ for reweighting | positivity of selection plus data on the target covariate distribution |
| Causal location of $S$ (pre vs post treatment) | SUTVA for selection; post-treatment differences handled by principal stratification |

See [[Degtiar 2023 - Identifying Assumptions]].

## Examples

> [!example] Caveats checklist before using a transport formula in marketing measurement
> 1. Write down every way the new market could differ in *mechanism* (media costs, competitor activity, creative fatigue, measurement/attribution). Each is a candidate $S$-node. Leaving one out is the same as asserting invariance.
> 2. Confirm the covariates you reweight on are *not* themselves caused by the treatment (otherwise use the (3.4)-type formula).
> 3. Run the "which measurements do I actually need" check before fielding a second experiment.
> 4. If a required S-admissible set is unmeasured, the effect is not transportable from these data (see Fig. 5(a), Fig. 6(f)).

## Connections

- Meta-analytic counterpart and why averaging can mislead: [[Hierarchical Models]] and the sibling meta-analysis cluster.
- Review that operationalizes these ideas with estimators: [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]].
- Overall taxonomy: [[Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview]].

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
- [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]]
