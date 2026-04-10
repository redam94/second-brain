---
title: "Chapter 1: Probability and Inference"
source: "[[BDA3 - Bayesian Data Analysis]]"
chapter: 1
part: "I - Fundamentals of Bayesian Inference"
tags:
  - source/textbook/chapter
  - topic/bayesian-statistics
  - topic/probability
  - topic/statistical-inference
created: 2026-04-09
---

# Chapter 1: Probability and Inference

> [!info] Part of [[BDA3 - Bayesian Data Analysis]]
> Part I: Fundamentals of Bayesian Inference

## Summary

This chapter introduces the foundations of Bayesian data analysis: the three-step process of model specification, posterior computation, and model evaluation. It establishes notation, presents [[Bayes' Theorem]] as the core mechanism of inference, and illustrates the framework with discrete examples from genetics and spell checking. The chapter also discusses the philosophical basis for using probability as a measure of uncertainty and demonstrates probability assignment through a football point-spreads example.

## Sections

1. [[BDA3 - S1.1 - Three Steps of Bayesian Data Analysis]]
2. [[BDA3 - S1.2 - General Notation for Statistical Inference]]
3. [[BDA3 - S1.3 - Bayesian Inference]]
4. [[BDA3 - S1.4 - Discrete Examples Genetics and Spell Checking]]
5. [[BDA3 - S1.5 - Probability as a Measure of Uncertainty]]
6. [[BDA3 - S1.6 - Example Football Point Spreads]]
7. [[BDA3 - S1.7 - Example Calibration for Record Linkage]]
8. [[BDA3 - S1.8 - Some Useful Results from Probability Theory]]

## Key Concepts Introduced

- [[Three Steps of Bayesian Data Analysis]]
- [[Bayes' Theorem]]
- [[Prior Distribution]]
- [[Posterior Distribution]]
- [[Likelihood Function]]
- [[Prior Predictive Distribution]]
- [[Posterior Predictive Distribution]]
- [[Exchangeability]]
- [[Likelihood Principle]]

## Key Equations

### Bayes' Rule (Eq. 1.1)
$$p(\theta|y) = \frac{p(\theta,y)}{p(y)} = \frac{p(\theta)p(y|\theta)}{p(y)}$$

### Unnormalized Posterior (Eq. 1.2)
$$p(\theta|y) \propto p(\theta)p(y|\theta)$$

### Prior Predictive Distribution (Eq. 1.3)
$$p(y) = \int p(\theta)p(y|\theta)\,d\theta$$

### Posterior Predictive Distribution (Eq. 1.4)
$$p(\tilde{y}|y) = \int p(\tilde{y}|\theta)p(\theta|y)\,d\theta$$

### Posterior Odds (Eq. 1.5)
$$\frac{p(\theta_1|y)}{p(\theta_2|y)} = \frac{p(\theta_1)}{p(\theta_2)} \cdot \frac{p(y|\theta_1)}{p(y|\theta_2)}$$

## Connections

- Leads into [[BDA3 - Ch02 - Single-Parameter Models]] for first worked-out parametric examples
- Notation conventions used throughout the entire book
- [[Exchangeability]] concept developed further in [[BDA3 - Ch05 - Hierarchical Models]]
