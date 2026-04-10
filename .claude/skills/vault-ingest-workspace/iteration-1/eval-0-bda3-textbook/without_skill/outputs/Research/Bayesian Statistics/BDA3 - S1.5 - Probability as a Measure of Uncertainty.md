---
title: "Section 1.5: Probability as a Measure of Uncertainty"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
section: 1.5
tags:
  - source/textbook/section
  - topic/bayesian-statistics
  - topic/probability
  - topic/philosophy-of-statistics
created: 2026-04-09
---

# Section 1.5: Probability as a Measure of Uncertainty

> [!info] Part of [[BDA3 - Ch01 - Probability and Inference]]

## Overview

This section discusses the philosophical foundations for using probability as a measure of uncertainty in Bayesian statistics. In the Bayesian paradigm, probability is used as the fundamental measure or yardstick of uncertainty for *any* unknown quantity, not just for repeatable random events.

## Mathematical Definition of Probability

Probabilities are numerical quantities that are:
- Nonnegative
- Additive over mutually exclusive outcomes
- Sum to 1 over all possible mutually exclusive outcomes

## Two Classical Justifications for $\Pr(\text{heads}) = \frac{1}{2}$

1. **Symmetry or exchangeability argument**: probability = (number of favorable cases) / (number of possibilities), assuming equally likely possibilities. This is really a physical argument based on assumptions about forces at work.

2. **Frequency argument**: probability = relative frequency obtained in a long sequence of identical, independent tosses.

Both arguments are subjective in some sense -- they require judgments about equally likely events, identical measurements, and independence.

## Why Probability for Uncertainty?

Three main rationales are commonly advanced:

### 1. Analogy to Physical Randomness
Physical randomness induces uncertainty, so it is natural to describe uncertainty in the language of random events. Common terms like "probably" and "unlikely" suggest this extension.

### 2. Axiomatic / Normative Approach
Related to decision theory: reasonable axioms (ordering, transitivity, etc.) imply that uncertainty *must* be represented in terms of probability. The authors view this as suggestive but not compelling.

### 3. Coherence of Bets
> [!abstract] Definition: Coherence
> Define the probability $p$ attached to an event $E$ as the fraction $p \in [0,1]$ at which you would exchange $\$p$ for a return of $\$1$ if $E$ occurs. The **principle of coherence** states that your assignment of probabilities should be such that it is not possible to make a definite gain by betting with you.

It can be proved that probabilities constructed under this principle must satisfy the basic axioms of probability theory.

**Limitations of the betting rationale:**
- Exact odds are required for all events -- how can you assign exact odds when you are not sure?
- If a betting partner has information you do not, it might not be wise to take the bet

## Subjectivity and Objectivity

- All statistical methods using probability are subjective (rely on mathematical idealizations)
- Bayesian methods are sometimes called *especially* subjective because of their reliance on a [[Prior Distribution|prior distribution]]
- In practice, scientific judgment is necessary to specify *both* the likelihood and the prior parts of the model
- When there is replication (many exchangeable units), features of a probability distribution can be estimated from data, making the analysis more "objective"
- If an experiment is replicated, the parameters of the prior distribution can themselves be estimated from data (see [[BDA3 - Ch05 - Hierarchical Models]])

## Connections

- The guiding principle: the state of knowledge about anything unknown is described by a probability distribution
- This philosophical stance underpins all of Bayesian inference
- [[Exchangeability]] plays a key role in bridging subjectivity and objectivity
- Connects to [[BDA3 - S1.6 - Example Football Point Spreads]] for a practical illustration of probability assignment
