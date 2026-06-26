---
title: "Table 2 Fallacy"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/research-methodology
  - type/concept
  - doc/article
source: "[[raw/These Are Not the Effects You Are Looking For]]"
source_location: "Introduction; Logic of Regression Adjustment; Conclusion"
date_ingested: 2026-06-26
folder: "Research Methodology"
doc_type: article
depends_on:
  - "[[DAGs and Causal Identification]]"
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Logic of Regression Adjustment]]"
  - "[[Nuisance Parameter Bias Simulation]]"
aliases:
  - Table 2 fallacy
  - mutual adjustment fallacy
  - nuisance parameter misinterpretation
---

# Table 2 Fallacy

> [!summary]
> The Table 2 Fallacy is the practice of presenting regression confounders (nuisance parameters) alongside the treatment of interest and interpreting their coefficients as total causal effects. Because the adjustment set that identifies the treatment effect almost never simultaneously identifies the confounders themselves, such interpretations are statistically and causally invalid — and often severely biased.

## Overview

Named by Westreich and Greenland (2013), the Table 2 Fallacy describes a pervasive practice in social science, epidemiology, economics, and political science: a researcher fits a multivariable regression to estimate the causal effect of treatment $X$ on outcome $Y$ while adjusting for a set of confounders $\{Z_1, Z_2, \ldots\}$. The results table then presents *all* coefficients — not just $X$'s — with stars, confidence intervals, and causal-sounding language. Subsequent papers cite these confounder coefficients as theoretically meaningful contributions.

The fallacy is pernicious because it appears rigorous. The model is correctly specified for identifying $X \to Y$; the mistake is in assuming that same specification also identifies $Z_k \to Y$ for each confounder.

> [!definition] Table 2 Fallacy
> The **Table 2 Fallacy** is the erroneous practice of presenting and interpreting regression coefficients for confounders (nuisance parameters) included in an adjustment set as if they were valid total-effect estimates. The fallacy arises because the adjustment set chosen to identify the treatment effect $X \to Y$ does not generally satisfy the identification conditions for any other causal path in the same model.
^def-table2-fallacy

## The Core Argument

### What Regression Adjustment Does

When the goal is to estimate the causal effect of $X$ on $Y$, we select a **valid adjustment set** $\mathcal{Z} = \{z_1, z_2, z_3\}$ that satisfies the backdoor criterion relative to the path $X \to Y$ (see [[DAGs and Causal Identification]]). Under this condition and the Stable Unit Treatment Value Assumption (SUTVA), regression adjustment consistently estimates:

$$\text{PATE} = \int E[Y(X=1, Z)] - E[Y(X=0, Z)] \, dZ$$

Critically, $\mathcal{Z}$ is a *sacrifice* made to block backdoor paths into $X$. Its members are chosen to satisfy the backdoor criterion for $X \to Y$ — not for $z_k \to Y$.

### Why Confounders Cannot Be Jointly Identified

Consider the DAG in the Nafa (2022) example: $X, Y, \{Z, W, L, J\}$ are measured; $\{U, V\}$ are unobserved. The adjustment set $\{Z, W, L, J\}$ blocks all backdoor paths for $X \to Y$.

But paths like $J \to Y$ and $Z \to Y$ are confounded by biasing paths $J \leftarrow V \to Y$ and $Z \leftarrow U \to Y$. Since $U$ and $V$ are unobserved, **it is mathematically impossible to simultaneously identify both $X \to Y$ and $Z \to Y$ without additional identifying assumptions**.

> [!theorem] Non-Joint Identification of Adjustment Sets
> Let $\mathcal{Z}$ be a valid adjustment set for the causal path $X \to Y$ in a DAG $\mathcal{G}$. For any $z_k \in \mathcal{Z}$, the same adjustment set $\mathcal{Z}$ does not generally satisfy the backdoor criterion for the path $z_k \to Y$. Identification of $z_k \to Y$ requires a separate, valid adjustment set for that path, which may require conditioning on variables not included in $\mathcal{Z}$ and leaving others out.
^thm-non-joint-identification

In the simple confounded DAG ($X \leftarrow Z \to Y$, $Z \leftarrow U \to Y$), the biasing path $Z \leftarrow U \to Y$ cannot be blocked without measuring $U$. If $U$ is unobserved, $Z$'s coefficient in any regression of $Y$ on $X$ and $Z$ is biased for $Z$'s causal effect — regardless of how large $n$ is.

### The Logic Applies Regardless of Inferential Framework

Nafa (2022) notes that the problem is not Bayesian versus frequentist. A correctly specified Bayesian model with weakly informative priors will still return posterior distributions for confounder coefficients that systematically miss the true value when the path is unidentified. Larger samples make matters *worse*: as $n \to \infty$, the posterior concentrates around the biased value with increasing certainty.

## Downstream Consequences

1. **Scientific literature accumulation of false knowledge**: Papers citing a biased confounder coefficient as a causal estimate create a chain of pseudo-scientific claims.
2. **Magnitude errors compound**: Subsequent meta-analyses, effect-size aggregations, and theory-building built on Table 2 estimates inherit and amplify the original bias.
3. **Graduate training propagation**: Teaching students to "interpret every coefficient" instills poor practices that propagate through academic generations.

> [!example] What the Simulations Show
> See [[Nuisance Parameter Bias Simulation]]. When the unobserved confounder $U$ is correlated with $Z$:
> - 90% credible intervals for $Z$'s coefficient capture the true value only **0–1% of the time**
> - Coverage rates for nuisance parameters $J$, $L$, $W$ are 6–29% even under the favorable condition where $Z$ and $U$ are independent
> - These error rates do **not** improve with sample size — they get worse as $n$ grows from 2,500 to 10,000
^ex-simulation-summary

## When Multiple Identification Is Possible

There is one way to escape the fallacy: adopt additional identifying assumptions that permit joint identification. If one can defend the assumption that $U$ is conditionally independent of $Z$ (e.g., through a natural experiment, instrumental variables, or domain-specific arguments), then both $X \to Y$ and $Z \to Y$ may be jointly identified using the adjustment set $\{L, W, J\}$ (excluding $Z$ from the adjustment set for its own identification).

This requires:
- A separate DAG analysis for each causal path of interest
- Explicit identification strategy for each path
- Separate defense of the required assumptions

## Connections

- [[DAGs and Causal Identification]] — The backdoor criterion defines when an adjustment set is valid for a specific path; the Table 2 Fallacy is the error of assuming one valid set works for all paths simultaneously
- [[Logic of Regression Adjustment]] — What the adjustment set actually identifies: the PATE for the primary treatment only
- [[Nuisance Parameter Bias Simulation]] — Empirical demonstration of the magnitude of bias under this fallacy
- [[Potential Outcomes Framework]] — The potential outcomes definition of causal effects underlying the fallacy
- [[Garden of Forking Paths]] — Related methodological failure: implicit multiple comparisons from data-contingent analysis
- [[Researcher Degrees of Freedom]] — Related failure mode: the flexibility in choosing which confounders to "interpret"

## See Also

- [[Bayesian Propensity Score Weighting]] — Correct approach: use DAG to select adjustment set for the treatment, then focus interpretation solely on the treatment effect
- [[The Selection Problem]] — The fundamental challenge that makes adjustment necessary and limits what can be identified
- [[Observational vs Experimental Methods in Advertising]] — Activity bias as a case where confounders (activity) cause 10–1000x overestimates when treated as if identified
