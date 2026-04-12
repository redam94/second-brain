---
title: "Gauge Theory - Overview"
tags:
  - source/ingested
  - topic/gauge-theory
  - topic/quantum-field-theory
  - type/overview
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Description, Classical gauge theory, Mathematical formalism"
date_ingested: 2026-04-11
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Quantum Field Theory - Overview]]"
  - "[[Quantum Mechanics - Overview]]"
used_by:
  - "[[Standard Model and Gauge Groups]]"
  - "[[QED and Renormalization]]"
aliases:
  - gauge symmetry
  - local symmetry
  - Yang-Mills
---

# Gauge Theory - Overview

> [!summary]
> A gauge theory is a field theory whose Lagrangian is invariant under a continuous group of local (spacetime-dependent) transformations — the gauge group. This local symmetry forces the existence of new fields (gauge fields) and mediating particles (gauge bosons). Gauge theories describe all fundamental interactions: QED (U(1)), electroweak (SU(2)×U(1)), and QCD (SU(3)).

## Overview

The central idea of gauge theory: **local symmetry generates interactions**. Starting from a free-field Lagrangian with only a global symmetry, demanding that the symmetry hold locally (at each spacetime point independently) forces the introduction of gauge fields. These gauge fields then mediate interactions between matter particles.

**Key examples**:
- QED: U(1) gauge symmetry → photon as gauge boson → electromagnetic force
- Electroweak: SU(2)×U(1) → W$^\pm$, Z, photon → electroweak force
- QCD: SU(3) → 8 gluons → strong force

## Global vs. Local Symmetry

> [!definition] Global Symmetry
> A Lagrangian has **global symmetry** if it is invariant under a transformation that is performed *identically at every point* in spacetime. The parameters of the transformation are constants.
>
> Example: rotating all scalar fields by the same O(n) rotation $\Phi \mapsto G\Phi$ with $G$ constant.
^def-global-symmetry

> [!definition] Local Symmetry (Gauge Symmetry)
> A Lagrangian has **local (gauge) symmetry** if it is invariant under transformations where the parameters can vary independently at each spacetime point: $\Phi(x) \mapsto G(x)\Phi(x)$.
>
> Global symmetry is a special case of local symmetry where $G(x) = \text{const}$.
^def-local-symmetry

**The problem with making symmetry local**: When $G$ depends on $x$, ordinary derivatives fail to transform covariantly:
$$\partial_\mu(G\Phi) \neq G(\partial_\mu\Phi) \quad \text{if } G = G(x)$$

This spoils the invariance of the Lagrangian. The solution is to introduce a gauge field.

## Gauge Fields and Covariant Derivatives

> [!definition] Gauge Field and Covariant Derivative
> To restore local gauge invariance, replace ordinary derivatives with **gauge covariant derivatives**:
> $$
> D_\mu = \partial_\mu - igA_\mu
> $$
> where:
> - $g$ = coupling constant (interaction strength)
> - $A_\mu(x)$ = **gauge field** (Lie algebra-valued connection)
>
> The gauge field must transform as:
> $$
> A'_\mu = GA_\mu G^{-1} - \frac{i}{g}(\partial_\mu G)G^{-1}
> $$
> to ensure $(D_\mu\Phi)' = G(D_\mu\Phi)$.
>
> The gauge field $A_\mu$ can be expanded in terms of Lie algebra generators $T^a$:
> $$
> A_\mu = \sum_a A_\mu^a T^a
> $$
> There is **one gauge field component per generator** of the Lie algebra.
^def-gauge-field

> [!definition] Gauge Boson
> When the gauge field theory is quantized, the quanta of the gauge field $A_\mu$ are the **gauge bosons** — the force carriers.
> - U(1) gauge theory → 1 gauge boson: the **photon**
> - SU(2) gauge theory → 3 gauge bosons (one per generator): $W^+$, $W^-$, $W^0$
> - SU(3) gauge theory → 8 gauge bosons: the **gluons**
^def-gauge-boson

## Yang-Mills Lagrangian

> [!definition] Yang-Mills Action
> The Lagrangian for the gauge field itself (which gives gauge bosons kinetic energy and allows them to propagate) is:
> $$
> \mathcal{L}_\text{gf} = -\frac{1}{4}F^{a\mu\nu}F_{\mu\nu}^a
> $$
> where the **field strength tensor** $F_{\mu\nu}^a$ is:
> $$
> F_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + g\sum_{b,c}f^{abc}A_\mu^b A_\nu^c
> $$
> and $f^{abc}$ are the **structure constants** of the Lie algebra.
>
> For abelian (U(1)) gauge theory, the $f^{abc}$ terms vanish and this reduces to the familiar electromagnetic field strength $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$.
>
> For non-abelian gauge theories (SU(2), SU(3)), the gauge bosons self-interact — unlike photons, gluons carry color charge and interact with each other.
^def-yang-mills

## Classical Example: Electrodynamics

> [!example] Deriving QED from U(1) Gauge Symmetry
> Start with the free Dirac Lagrangian for an electron:
> $$
> \mathcal{S} = \int \bar{\psi}(i\hbar c\,\gamma^\mu\partial_\mu - mc^2)\psi\, d^4x
> $$
>
> This has the **global U(1) symmetry**: $\psi \mapsto e^{i\theta}\psi$ for constant $\theta$.
>
> Demanding **local U(1) symmetry**: $\psi(x) \mapsto e^{i\theta(x)}\psi(x)$ requires the covariant derivative:
> $$
> D_\mu = \partial_\mu - i\frac{e}{\hbar}A_\mu
> $$
>
> The resulting interaction term is:
> $$
> \mathcal{L}_\text{int} = \frac{e}{\hbar}\bar{\psi}(x)\gamma^\mu\psi(x)A_\mu(x) = J^\mu(x)A_\mu(x)
> $$
>
> This is exactly the **minimal coupling** of electromagnetism! The electromagnetic field $A_\mu$ is forced into existence by demanding local phase invariance. The full QED Lagrangian is:
> $$
> \mathcal{L}_\text{QED} = \bar{\psi}(i\hbar c\,\gamma^\mu D_\mu - mc^2)\psi - \frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu}
> $$
^ex-qed-from-gauge

## Historical Development

| Year | Event |
|------|-------|
| 1918 | Weyl proposes *Eichinvarianz* (scale invariance) as a local symmetry of general relativity |
| 1929 | Weyl, Fock, London: replace scale factor with complex phase → U(1) gauge symmetry |
| 1929 | Weyl's paper establishes modern gauge invariance concept |
| 1941 | Pauli's review popularizes gauge invariance |
| 1954 | Yang and Mills: non-abelian SU(2) gauge theory (Yang-Mills theory) |
| 1960s | Glashow, Salam, Ward: electroweak unification via gauge theory |
| 1967 | Weinberg: electroweak theory with Higgs mechanism |
| 1971 | 't Hooft proves non-abelian gauge theories are renormalizable |
| 1973 | Fritzsch, Gell-Mann, Leutwyler: QCD as SU(3) gauge theory |

## Geometric Interpretation

In differential geometry, gauge theory is the theory of **connections on principal fiber bundles**:
- **Base space**: spacetime $M$
- **Fiber**: the gauge group $G$ at each point
- **Gauge field** $A_\mu$: a Lie-algebra-valued 1-form (connection form)
- **Field strength** $F_{\mu\nu}$: the curvature of the connection, $\mathbf{F} = d\mathbf{A} + \mathbf{A}\wedge\mathbf{A}$
- **Gauge transformation**: change of local section of the principal bundle

The physical electromagnetic field is the curvature of a U(1) connection. The condition "zero curvature everywhere" means the gauge field can be removed by a gauge transformation (it's pure gauge).

## Noether's Theorem and Conservation Laws

> [!theorem] Gauge Symmetry → Conserved Currents
> By Noether's theorem, every continuous global symmetry of a Lagrangian gives rise to a conserved current. For O(n) global symmetry:
> $$
> J_\mu^a = i\partial_\mu\Phi^\mathsf{T} T^a \Phi
> $$
> with one conserved current per generator.
>
> For U(1): the single conserved current is the **electric current** $J^\mu = \bar{\psi}\gamma^\mu\psi$, and the conserved charge is the **electric charge**.
^thm-noether-gauge

## Non-Abelian Gauge Theories

When the gauge group is non-abelian (e.g., SU(2), SU(3)):
- The gauge bosons themselves carry "charge" (color charge for gluons, weak isospin for W/Z)
- Gauge bosons self-interact (3- and 4-boson vertices)
- The field strength tensor has an extra non-linear term: $F_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + gf^{abc}A_\mu^b A_\nu^c$
- This leads to **asymptotic freedom** in QCD: strong coupling decreases at high energies

## Connections

- [[Quantum Field Theory - Overview]] — Gauge theory is the organizing principle of QFT
- [[QED and Renormalization]] — QED is the U(1) gauge theory; renormalization handles divergences
- [[Standard Model and Gauge Groups]] — Full Standard Model: SU(3)×SU(2)×U(1)
- [[Quantum Mechanics - Mathematical Formalism]] — Noether's theorem, symmetry generators

## See Also

- [[Standard Model and Gauge Groups]] — The particle physics application of gauge theory
- [[QED and Renormalization]] — The simplest example: U(1) gauge theory
