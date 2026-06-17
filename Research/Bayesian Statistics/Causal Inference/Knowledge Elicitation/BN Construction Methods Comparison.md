---
title: "BN Construction Methods Comparison"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-networks
  - topic/knowledge-elicitation
  - type/concept
  - doc/paper
source: "[[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]]"
source_location: "§5.1–5.3, pp. 4-8"
date_ingested: 2026-04-10
date_updated: 2026-06-15
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on: []
used_by:
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[Entropy-Based BN Evaluation]]"
aliases:
  - BN I BN II BN III comparison
---

# BN Construction Methods Comparison

> [!summary]
> Three approaches to constructing a Bayesian network are compared on the Sleep Health and Lifestyle dataset: (I) human expert knowledge, (II) information-criteria-based structure learning (BIC/MIIC), and (III) LLM-based expert elicitation. BN III (LLM) achieves the lowest entropy, fewer logical inconsistencies, and strong SEM validation.

## Overview

The paper frames the three BN construction strategies as:

```
Data → Stats. (BIC/MIIC) → BN II → Decision Support
     ↗ Expert knowledge   → BN I  ↗
     ↘ LLM elicitation    → BN III↗
```

All three BNs are constructed on the *Sleep Health and Lifestyle Dataset* (400 rows, 13 columns; variables: sleep duration, stress level, physical activity, BMI, occupation, gender, age, heart rate, quality of sleep, sleep disorder, daily steps).

## BN I — Human Expert

**Method:** Researchers with limited domain knowledge manually specify edges based on common sense and existing literature.

**Structure (10 nodes):**
- Age, Gender → Occupation → Physical_Activity_Level → Stress_Level → Heart_Rate
- Daily_Steps → Physical_Activity_Level
- BMI_Category → Physical_Activity_Level
- Stress_Level → Sleep_Duration → Quality_of_Sleep

**SEM Validation:** All relationships statistically significant except:
- Physical_Activity → Stress_Level (p > 0.05)
- Stress_Level → Heart_Rate (p > 0.05)

**Key problem:** Human expert graph shows causal direction inconsistencies — e.g., graph indicates Stress_Level → Occupation, but logically occupation influences stress, not vice versa.

## BN II — Information Criteria (BIC/MIIC)

**Methods:**
- **MIIC** (Multivariate Information-based Inductive Causation): identifies dependencies via conditional mutual information; good at finding latent confounders
- **BIC** (Bayesian Information Criterion): $\text{BIC} = -2\log L + k \log n$, where $L$ = likelihood, $k$ = free parameters, $n$ = data points. Scores candidate graphs by penalized likelihood.

**Key problem:** BIC graphs frequently misidentify causal directions (e.g., Occupation impacts Age and Gender, whereas these should be root causes). Statistical associations in the data do not guarantee correct causal directionality.

**SEM validation:** Most relationships significant, except Stress_Level → Occupation (p = 0.0708).

## BN III — LLM Expert Elicitation

See [[LLM Expert Elicitation for Bayesian Networks]] for full methodology.

**Structure highlights (Fig. 4):**
- Gender → Sleep_Disorder, Occupation, Sleep_Duration
- Daily_Steps → Physical_Activity_Level → BMI_Category
- Occupation → Stress_Level; Sleep_Duration → Stress_Level
- Stress_Level → Quality_of_Sleep; Sleep_Duration → Quality_of_Sleep

**SEM validation:** All statistically significant except Physical_Activity → Quality_of_Sleep (p = 0.5989).

**Advantage:** Logically consistent causal directions; fewer backward edges; confounders identified.

## Entropy Comparison

See [[Entropy-Based BN Evaluation]] for full entropy analysis. Summary:

| Method | Mean $H$ | Min $H$ | Median $H$ |
|--------|----------|---------|-----------|
| LLM | **1.42** | **0.89** | 1.29 |
| BIC | 1.48 | 0.91 | 1.32 |
| Expert | 1.48 | 0.93 | 1.21 |

Lower entropy = more structured, clearer dependencies. LLM wins on mean and min entropy.

## Connections

- Provides context for [[LLM Expert Elicitation for Bayesian Networks]] (methodology of BN III)
- Quantitative evaluation in [[Entropy-Based BN Evaluation]]
- Application in [[LLM-BN Decision Support Application]]

## See Also

- [[Shaposhnyk 2025 - Overview]] — paper context
- [[Entropy-Based BN Evaluation]] — quantitative comparison
- [[LLM Expert Elicitation for Bayesian Networks]] — full BN III methodology
- [[Directed Acyclic Graphs]] — the causal DAG theory that underpins BN structure and d-separation
