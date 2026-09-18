---
title: "Yang–Mills Theory and Gauge Fields"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/physics
  - type/theorem
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Classical gauge theory — Yang–Mills Lagrangian; Quantization of gauge theories"
date_ingested: 2026-04-16
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[Gauge Theory - Overview]]"
  - "[[Renormalization]]"
used_by: []
aliases:
  - Yang-Mills theory
  - non-abelian gauge theory
  - field strength tensor
  - gauge anomaly
---

# Yang–Mills Theory and Gauge Fields

> [!summary]
> Yang–Mills theory generalizes electromagnetism to non-abelian (non-commutative) Lie groups, producing theories where the gauge bosons themselves carry charge and self-interact. This framework underlies the Standard Model of particle physics, with gauge groups SU(3) (strong force) and SU(2)×U(1) (electroweak force), and is renormalizable thanks to 't Hooft's 1971 proof.

## Overview

In QED the gauge group is U(1) — an abelian group where transformations commute. In 1954, Yang and Mills generalized gauge theory to non-abelian groups (where group elements don't commute), starting with SU(2). This introduced a crucial new feature: the gauge bosons themselves carry the charge they mediate, leading to cubic and quartic self-interaction terms in the Lagrangian. Non-abelian gauge theories proved to be the key to understanding the weak and strong nuclear forces.

## The Yang–Mills Lagrangian

### Field Strength Tensor

For a gauge field with Lie group generators $T^a$ satisfying $[T^a, T^b] = if^{abc}T^c$, the **field strength tensor** is:

> [!definition] Non-Abelian Field Strength Tensor
> $$
> F_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + g\sum_{b,c}f^{abc}A_\mu^b A_\nu^c
> $$
> where $f^{abc}$ are the **structure constants** of the Lie algebra. The extra non-linear term $gf^{abc}A_\mu^b A_\nu^c$ (absent in QED) leads to gauge boson self-interactions.
^def-field-strength-tensor

In differential geometry notation: $\mathbf{F} = d\mathbf{A} + \mathbf{A}\wedge\mathbf{A}$.

### Yang–Mills Action

> [!theorem] Yang–Mills Action
> The Lagrangian for the gauge field alone (the kinetic term for gauge bosons) is:
> $$
> \mathcal{L}_\text{gf} = -\frac{1}{2}\text{tr}(F^{\mu\nu}F_{\mu\nu}) = -\frac{1}{4}F^{a\mu\nu}F_{\mu\nu}^a
> $$
> The full gauge-invariant Lagrangian is:
> $$
> \mathcal{L} = \mathcal{L}_\text{loc} + \mathcal{L}_\text{gf} = \mathcal{L}_\text{global} + \mathcal{L}_\text{int} + \mathcal{L}_\text{gf}
> $$
^thm-yang-mills-action

In differential geometry: $\frac{1}{4g^2}\int\text{tr}[\star F\wedge F]$ where $\star$ is the Hodge star operator.

### Self-Interactions

In non-abelian gauge theories, the $f^{abc}A_\mu^bA_\nu^c$ term in $F_{\mu\nu}^a$ generates **cubic** ($A^3$) and **quartic** ($A^4$) vertices in the Lagrangian. Gauge bosons interact with each other — unlike photons in QED, which do not interact directly. This is the origin of confinement in QCD and the non-linear nature of the strong force.

## The Standard Model

> [!definition] Standard Model Gauge Group
> The Standard Model is a non-abelian gauge theory with gauge group:
> $$
> \text{SU}(3) \times \text{SU}(2) \times \text{U}(1)
> $$
> **Gauge bosons (12 total)**:
> - **U(1)**: 1 gauge boson → photon $\gamma$ (after symmetry breaking)
> - **SU(2)**: 3 gauge bosons → $W^+$, $W^-$, $Z^0$ (after symmetry breaking)
> - **SU(3)**: 8 gauge bosons → gluons (mediating the strong force)
^def-standard-model-gauge-group

### Spontaneous Symmetry Breaking (Higgs Mechanism)

The electroweak gauge bosons $W^\pm$ and $Z^0$ are massive, but Yang–Mills gauge bosons are naturally massless. The **Higgs mechanism** (Higgs, Brout, Englert, Guralnik, Hagen, Kibble, 1964) solves this:
- A scalar Higgs field $\phi$ has a non-zero vacuum expectation value $\langle\phi\rangle \neq 0$
- This spontaneously breaks SU(2)×U(1) → U(1)$_\text{EM}$
- Three gauge bosons ($W^\pm$, $Z^0$) acquire mass by "eating" the Goldstone bosons; the photon remains massless
- The physical Higgs boson is the remaining scalar fluctuation; detected at CERN in 2012

## Quantization and Renormalizability

### Gauge Fixing

Quantizing Yang–Mills theories requires **gauge fixing** to remove the redundancy of gauge freedom. In non-abelian theories, the **Faddeev–Popov procedure** introduces auxiliary **ghost fields** (anticommuting scalars) to correctly account for the Jacobian of the gauge-fixing condition. The result is the **BRST quantization** procedure.

### Renormalizability

> [!theorem] Yang–Mills Theories Are Renormalizable
> Non-abelian Yang–Mills theories are renormalizable. Proved by Gerard 't Hooft in 1971. This result rescued the electroweak theory (which had been considered non-renormalizable) and confirmed the Standard Model as a valid quantum field theory.
^thm-ym-renormalizable

### Gauge Anomalies

A classical gauge symmetry can be **broken by quantum corrections** — this is called a **gauge anomaly**. Anomalies make the theory inconsistent. In the Standard Model, anomaly cancellation requires:
- Equal numbers of quarks and leptons (in generations)
- Specific hypercharge assignments

## Wilson Loop and Gauge Invariance

> [!definition] Wilson Loop
> A gauge-invariant observable along a closed path $\gamma$:
> $$
> W(\gamma) = \chi^{(\rho)}\left(\mathcal{P}\left\{e^{\oint_\gamma A}\right\}\right)
> $$
> where $\chi^{(\rho)}$ is the character of representation $\rho$ and $\mathcal{P}$ is path ordering. Wilson loops are the basic gauge-invariant observables in lattice gauge theory.
^def-wilson-loop

## Connections

- **[[Gauge Theory - Overview]]**: Yang–Mills generalizes abelian gauge theory to non-commutative groups.
- **[[Renormalization]]**: Asymptotic freedom in QCD (SU(3) Yang–Mills) makes the running coupling small at high energies, justifying perturbation theory.
- **[[Quantum Field Theory - Overview]]**: The Standard Model — the culmination of QFT — is Yang–Mills theory with gauge group SU(3)×SU(2)×U(1).

## See Also

- [[Gauge Theory - Overview]] — abelian gauge theory and the covariant derivative
- [[Renormalization]] — asymptotic freedom and the running coupling
- [[Quantum Field Theory - Overview]] — the Standard Model in context
