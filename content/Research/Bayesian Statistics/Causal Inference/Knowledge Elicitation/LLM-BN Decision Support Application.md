---
title: "LLM-BN Decision Support Application"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-networks
  - topic/llm
  - type/example
  - doc/paper
source: "[[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]]"
source_location: "§6, pp. 9-10"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
used_by: []
aliases:
  - sleep health BN decision support
---

# LLM-BN Decision Support Application

> [!summary]
> The LLM-generated Bayesian network is applied as a decision support tool for the Sleep Health and Lifestyle dataset. Conditional probability tables (CPTs) are populated from data; Bayesian inference enables probabilistic queries about stress, sleep quality, and health conditions given observed evidence. Two worked examples demonstrate clinical reasoning about nurses and doctors.

## Overview

Once the BN structure is established (via LLM expert elicitation), it is operationalized as a decision support system by:
1. Populating **Conditional Probability Tables (CPTs)** for each node from the dataset
2. Performing **probabilistic inference** (using Bayes' formula)
3. Querying the network with observed evidence to compute posterior probabilities over target variables

**Implementation:** PyAgrum library (Python) for BN creation and inference.

## Bayesian Inference Framework

The BN propagates evidence using Bayes' formula:

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

where $P(A \mid B)$ is the posterior probability, $P(B \mid A)$ is the likelihood, $P(A)$ is the prior, and $P(B)$ is the marginal probability of the evidence.

Inference in the BN updates marginal distributions of all nodes when evidence is provided at any node — enabling both **predictive** (cause → effect) and **diagnostic** (effect → cause) reasoning.

## CPT Structure

The BN consists of 10 nodes. Key CPTs (from Fig. 5 in paper):
- **Sleep Duration**: Low (<7 hrs) / Normal (≥7 hrs)
- **Stress Level**: Low / Moderate / High
- **Quality of Sleep**: Bad / Normal / Good

## Worked Examples

> [!example] Example 1: Impact of Sleep Quality on Nurses' Stress
> **Setup:** A nurse with poor sleep quality (Sleep Duration = Low) and low physical activity.
>
> **Query:** What is the probability of High stress?
>
> **Result:**
> - Poor sleep quality → P(High stress) = **41.56%** (vs. 18.40% for normal or 4.32% for good sleep quality)
> - Good sleep quality → P(Low stress) = **92.41%**
>
> **Interpretation:** Strong connection between sleep quality and stress levels. Nurses without adequate rest face a significantly higher probability of high stress.

> [!example] Example 2: Impact of Health Conditions on Stress and Sleep Duration
> **Setup:** A male doctor with a sleep disorder (insomnia) engaging in moderate physical activity.
>
> **Query:** How do health conditions influence stress levels and sleep duration?
>
> **Method:** Query the CPT values for stress and sleep duration given Sleep_Disorder = insomnia and Gender = male, Occupation = doctor.
>
> **Result:** (Specific numerical output from Table 6 in paper) The BN accounts for occupation-specific factors — doctors and nurses have different work stressors and shift patterns captured through the Occupation node.

## Two Types of BN Inference

| Type | Direction | Example |
|------|-----------|---------|
| **Predictive inference** | Cause → Effect | "Given low sleep duration, what is the probability of high stress?" |
| **Diagnostic inference** | Effect → Cause | "Given high stress, what is the most probable cause among observed variables?" |

## Connections

- Built on [[LLM Expert Elicitation for Bayesian Networks]] for the BN structure
- Demonstrates practical value of [[Entropy-Based BN Evaluation]] — a structured BN produces more useful conditional probabilities
- Related to [[Bayesian Outcome Models]] — different context (Bayesian networks vs Bayesian regression), but same core idea of probabilistic inference over causal structures

## See Also

- [[Shaposhnyk 2025 - Overview]] — paper context
- [[LLM Expert Elicitation for Bayesian Networks]] — how the BN was built
- [[Directed Acyclic Graphs]] — BNs are DAGs; d-separation and causal identification concepts transfer directly
- [[Model Checking]] — validating BN conditional probability tables via posterior-predictive-style checks
