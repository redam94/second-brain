---
title: Information-Theoretic Design Objectives
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §2.1–2.3"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[Modern Bayesian Experimental Design - Overview]]"
  - "[[Expected Information Gain]]"
used_by:
  - "[[Open Challenges and Future Directions]]"
aliases:
  - EIG vs Fisher information
  - Alphabetic optimality
  - Why Bayesian experimental design
  - FIM design criteria
---

# Information-Theoretic Design Objectives

> [!summary]
> The review's case for the EIG and for a *Bayesian* approach to design. The EIG ([[Expected Information Gain]]) is the most common and best-performing BED objective, but it is one of a family $\mathbb{E}[U(\xi,\theta,y)]$ of expected-utility criteria. The classical frequentist alternative — maximizing a functional (trace/determinant) of the **Fisher information matrix (FIM)**, giving "alphabetic" A/D/E-optimality — suffers two flaws: the FIM is a *matrix* (needs a summary statistic that can vary with parameterization) and it *depends on the unknown true parameters*. Bayesian design avoids both, and is especially advantageous in adaptive settings.

## Overview

Most experimental-design problems can be formalized as choosing $\xi$ to maximize the expected utility of the data, $\mathbb{E}_{p(y\mid\xi)p(\theta\mid y,\xi)}[U(\xi,\theta,y)]$, where $U$ is a functional of the posterior. The information (KL/entropy) utility gives the EIG and is the focus of the field; alternatives include expected gain in Fisher information. This note records the objective landscape and why Bayesian information-theoretic design is preferred.

## Main Content

### The EIG and its generalizations

The EIG ([[Expected Information Gain]], Eqs. 1–3 of the review) is the expected reduction in Shannon entropy / the mutual information $\mathrm{MI}_\xi(\theta;y)$. More general BED replaces the log-score utility with **any** posterior functional $U$ (Bernardo 1979; Chaloner & Verdinelli 1995). The target $\theta$ need not be model parameters — it can be a function optimum (Bayesian optimization), an algorithm's output, or **future predictions** (prediction-oriented design / BED for downstream tasks).

### The frequentist alternative: Fisher information

Classical design most commonly maximizes a functional of the **Fisher information matrix**:
$$\mathrm{FIM}(\theta,\xi) = \mathbb{E}_{p(y\mid\theta,\xi)}\!\left[\frac{\partial\log p(y\mid\theta,\xi)}{\partial\theta}\frac{\partial\log p(y\mid\theta,\xi)}{\partial\theta}^{\!\top}\right].$$

> [!example] Why the FIM is awkward for design (Rainforth 2023 §2.3)
> **Flaw 1 — it's a matrix.** To optimize you need a scalar summary — its trace or determinant — giving the classical **alphabetic optimality criteria** (A-, D-, E-optimality). Unlike the EIG, these summaries don't fully reflect gains in the joint distribution and can vary with the model's parameterization.
> **Flaw 2 — it depends on the unknown $\theta$.** The FIM is a function of the very parameters we are trying to learn. Users must (a) use a relaxation/approximation, (b) plug in a point estimate (e.g. MLE from existing data or a worst-case value), or (c) average over a prior — but (a) introduces error, (b) ignores our uncertainty and is only locally valid (especially broken in adaptive settings where the FIM is additive only for fixed parameters), and (c) has effectively specified a Bayesian generative model anyway.

### Why take a Bayesian approach (§2.3)

- **Unified, self-consistent** incorporation of all available information; no reliance on asymptotic approximations or model restrictions.
- **Decisive in adaptive settings:** sequential decision-making under *incomplete information* requires propagating uncertainty and updating beliefs consistently — exactly what the [[Sequential and Adaptive BED|BAD]] framework's self-similarity provides and frequentist approaches violate.
- Classical approaches based on the FIM either make undesirable approximations, ignore parameter uncertainty, or end up reconstructing aspects of the Bayesian framework — so one may as well adopt BED directly.

### The caveat: model dependence

EIG-based BED is **only as good as the underlying model** $p(\theta), p(y\mid\theta,\xi)$ — we reason about data not yet gathered, so performance is tied to how well the model matches reality. This motivates the misspecification discussion in [[Open Challenges and Future Directions]].

## Connections

- **Specializes to** Bayesian active learning, Bayesian optimization, and adaptive design optimization for particular choices of target $\theta$ and utility $U$.
- **Generalizes / replaces** classical alphabetic-optimality and FIM-based design — the frequentist counterpart in [[Research Methodology/Experimental Design/_Index|experimental design]].
- **Contrasts with** expected-Fisher-information design, which is itself recoverable as a special case of the general Bayesian utility framework (Chaloner & Verdinelli).

## See Also
- [[Expected Information Gain]] — the objective itself, in full
- [[Bayesian Experimental Design - Overview]] — how the EIG sits across the three ingested papers
- [[Open Challenges and Future Directions]] — the model-misspecification caveat
- [[Research Methodology/Experimental Design/_Index|Experimental Design (frequentist)]] — power, Type S/M, the classical view
