---
title: "Prior Distribution"
aliases:
  - "Prior"
  - "prior distribution"
  - "prior probability"
tags:
  - concept/definition
  - topic/bayesian-statistics
created: 2026-04-09
---

# Prior Distribution

## Definition

> [!abstract] Definition
> The **prior distribution** $p(\theta)$ represents the state of knowledge (or uncertainty) about the parameter $\theta$ *before* observing the data $y$. It is one of the two components of the joint model $p(\theta, y) = p(\theta)p(y|\theta)$.

## Role in Bayesian Inference

In [[Bayes' Theorem]]:
$$p(\theta|y) \propto p(\theta) \cdot p(y|\theta)$$

The prior encodes:
- Background scientific knowledge
- Results from previous experiments
- Constraints on parameter values
- Degrees of uncertainty

## Types of Priors

| Type | Description | See |
|------|-------------|-----|
| Informative | Encodes specific prior knowledge | [[BDA3 - Ch02 - Single-Parameter Models]] S2.4 |
| Noninformative | Designed to "let the data speak" | [[BDA3 - Ch02 - Single-Parameter Models]] S2.8 |
| Weakly informative | Constrains to reasonable range without dominating | [[BDA3 - Ch02 - Single-Parameter Models]] S2.9 |
| Conjugate | Chosen so the posterior has the same functional form | [[BDA3 - Ch02 - Single-Parameter Models]] |
| Hierarchical | Parameters of the prior are themselves given priors | [[BDA3 - Ch05 - Hierarchical Models]] |

## Subjectivity

All statistical methods involve subjective choices. The prior is sometimes criticized as uniquely subjective, but in practice both the likelihood and the prior require scientific judgment to specify. When replication is available, the prior's influence is diminished; in hierarchical models, prior parameters can be estimated from data.

## References

- [[BDA3 - S1.3 - Bayesian Inference]] -- role in Bayes' rule
- [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]] -- concrete prior specifications
- [[BDA3 - S1.5 - Probability as a Measure of Uncertainty]] -- philosophical basis
