---
title: Modern Bayesian Experimental Design - Overview
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/overview
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Statistical Science 2023, full review"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
  - "[[Sequential and Adaptive BED]]"
used_by:
  - "[[Information-Theoretic Design Objectives]]"
  - "[[The Computational Revolution in EIG Estimation]]"
  - "[[Optimization and Gradient Schemes for BED]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
  - "[[Open Challenges and Future Directions]]"
aliases:
  - Modern Bayesian Experimental Design
  - Rainforth 2023
  - BED review
---

# Modern Bayesian Experimental Design - Overview

> [!summary]
> **Rainforth, Foster, Ivanova & Bickford Smith (2023), *Modern Bayesian Experimental Design* (Statistical Science).** A review arguing that recent ML advances have *transformed* BED from a computationally crippled niche into a practically deployable framework. It organizes the field around: the **EIG objective** and why it beats classical Fisher-information criteria; a "**computational revolution**" in EIG estimation (nested estimation, debiasing/MLMC, variational bounds, implicit models); **stochastic-gradient design optimization**; the leap **from designs to policies** (deep adaptive design); and open challenges (misspecification, active-learning links, scaling).

## Overview

BED chooses experiment designs $\xi$ to maximize the information gathered about a target $\theta$. Despite elegant information-theoretic foundations dating to Lindley (1956), its uptake was long held back by crippling computational bottlenecks — especially in the *adaptive* setting where decisions must be made in real time. This review (from the group behind [[Variational BOED - Overview|Foster 2019]] and [[Unified SGD BOED - Overview|Foster 2020]]) is a guide to the developments that broke those bottlenecks and to where the field is heading.

## Main Content

### Structure of the review and note map

| Review section | Content | Note |
|----------------|---------|------|
| §2 Information-theoretic design | EIG (Eqs. 1–3), BAD (§2.2), why Bayesian vs frequentist/FIM (§2.3) | [[Information-Theoretic Design Objectives]] + [[Expected Information Gain]] + [[Sequential and Adaptive BED]] |
| §3 A computational revolution | nested estimation (§3.1), debiasing/MLMC (§3.2), variational & implicit (§3.3) | [[The Computational Revolution in EIG Estimation]] |
| §3.4 Optimization | stochastic-gradient schemes, the unified gradient approach | [[Optimization and Gradient Schemes for BED]] |
| §4 From designs to policies | deep adaptive design (DAD), policy networks, total EIG | [[From Designs to Policies (Deep Adaptive Design)]] |
| §5 Future directions | policy-based BAD, active-learning links, misspecification, models/applications | [[Open Challenges and Future Directions]] |

### The three big messages

1. **The EIG is the right objective**, and modern estimators finally make it cheap to estimate *and* optimize — see [[The Computational Revolution in EIG Estimation]] and [[Optimization and Gradient Schemes for BED]].
2. **Policies, not just designs.** The biggest recent leap is **deep adaptive design (DAD)**: learn a design *policy* $\pi_\phi(h_{t-1})\mapsto\xi_t$ upfront, so adaptive experiments need *no* inference or optimization during deployment, and can be non-myopic — see [[From Designs to Policies (Deep Adaptive Design)]].
3. **BED is now viable for large, complex, implicit-likelihood models** — practitioners should embrace flexible accurate models rather than restrict to easy-to-estimate ones.

### Where this review sits relative to the other two ingested papers

The review *synthesizes and generalizes* both Foster papers: Foster 2019's variational estimators appear as the §3.3.1 variational bounds; Foster 2020's unified SGA appears as the §3.4 stochastic-gradient scheme (their Eq. 15). It then goes *beyond* both into policy-based methods (DAD, iDAD, RL approaches) that postdate them.

## Connections

- **Generalizes** [[Variational BOED - Overview|Foster 2019]] and [[Unified SGD BOED - Overview|Foster 2020]] into a unified narrative of the field.
- **Frames** BED's relationship to Bayesian active learning, Bayesian RL, and classical (alphabetic-optimality / FIM) design — see [[Information-Theoretic Design Objectives]] and [[Open Challenges and Future Directions]].
- **Forward pointer:** policy-based adaptive design ([[From Designs to Policies (Deep Adaptive Design)]]) is the review's signature "what's new since 2019" contribution.

## See Also
- [[Information-Theoretic Design Objectives]] — EIG vs FIM, why Bayesian
- [[The Computational Revolution in EIG Estimation]] — nested → debiased → variational → implicit
- [[Optimization and Gradient Schemes for BED]] — stochastic-gradient design
- [[From Designs to Policies (Deep Adaptive Design)]] — amortized policies
- [[Open Challenges and Future Directions]] — misspecification, active learning, scaling
