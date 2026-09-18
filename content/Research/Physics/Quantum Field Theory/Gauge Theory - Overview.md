---
title: "Gauge Theory - Overview"
tags:
  - source/ingested
  - topic/gauge-theory
  - topic/quantum-field-theory
  - topic/physics
  - type/overview
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Description (Global and local symmetries; Gauge fields), History, Classical gauge theory, Mathematical formalism"
date_ingested: 2026-04-11
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[Quantum Field Theory - Overview]]"
  - "[[Quantum Mechanics - Overview]]"
used_by:
  - "[[Standard Model and Gauge Groups]]"
  - "[[QED and Renormalization]]"
  - "[[Yang-Mills Theory and Gauge Fields]]"
aliases:
  - gauge symmetry
  - local symmetry
  - Yang-Mills
  - gauge invariance
  - gauge field
  - covariant derivative
  - gauge boson
---

# Gauge Theory - Overview

> [!summary]
> A gauge theory is a field theory whose Lagrangian is invariant under a continuous group of local (spacetime-dependent) transformations forming a Lie group — the gauge group. Maintaining this invariance when the symmetry parameter varies in spacetime forces the introduction of new fields (gauge fields), which become the mediators of the fundamental forces; when quantized, they give rise to gauge bosons. All fundamental interactions except gravity are described by gauge theories: QED (U(1)), electroweak (SU(2)×U(1)), and QCD (SU(3)).

## Overview

The central idea of gauge theory: **local symmetry generates (indeed demands) interactions**. Start from a free-field Lagrangian with only a global symmetry. If you require that the theory be invariant not just under global transformations (the same everywhere) but under *local* ones (chosen independently at each spacetime point), the derivative terms in the Lagrangian break invariance. To restore it, one must introduce a new dynamical field — the **gauge field** — which then mediates interactions between the matter particles. The photon, $W^\pm$, $Z$ bosons, and gluons are all gauge bosons arising from this mechanism.

**Key examples**:
- QED: U(1) gauge symmetry → photon as gauge boson → electromagnetic force
- Electroweak: SU(2)×U(1) → $W^\pm$, $Z$, photon → electroweak force
- QCD: SU(3) → 8 gluons → strong force

## Main Content

### Global vs. Local Symmetry

> [!definition] Global Symmetry
> A theory has a **global symmetry** under a group $G$ if its Lagrangian is invariant under a transformation that is performed *identically at every point* in spacetime — all fields are transformed simultaneously by a *constant* group element, so the parameters of the transformation are constants.
>
> Example: rotating all scalar fields by the same O($n$) rotation $\Phi \mapsto G\Phi$ with $G$ constant, i.e. rotating all field values by the same angle everywhere in spacetime.
^def-global-symmetry

> [!definition] Local Symmetry (Gauge Symmetry)
> A theory has a **local (gauge) symmetry** if its Lagrangian is invariant under transformations whose parameters can vary independently (and continuously) from point to point in spacetime: $\Phi(x) \mapsto G(x)\Phi(x)$.
>
> Local symmetry is a stronger constraint — global symmetry is the special case where $G(x) = \text{const}$.
^def-local-symmetry

### The Problem with Local Transformations

Consider the O($n$) global symmetry of $n$ scalar fields:
$$
\mathcal{L} = \frac{1}{2}(\partial_\mu\Phi)^\mathsf{T}\partial^\mu\Phi - \frac{1}{2}m^2\Phi^\mathsf{T}\Phi
$$
Under a global rotation $\Phi \mapsto G\Phi$ (constant $G \in O(n)$), both $\Phi$ and $\partial_\mu\Phi$ transform identically — invariance holds.

Under a **local** transformation $\Phi \mapsto G(x)\Phi$, ordinary derivatives fail to transform covariantly:
$$
\partial_\mu(G(x)\Phi) = G(x)\partial_\mu\Phi + (\partial_\mu G)\Phi \neq G(x)\partial_\mu\Phi
$$
The extra term $(\partial_\mu G)\Phi$ spoils the invariance of the Lagrangian. The solution is to introduce a gauge field.

### Gauge Fields and Covariant Derivatives

> [!definition] Gauge Covariant Derivative
> To restore local gauge invariance, replace the ordinary derivative $\partial_\mu$ with the **gauge covariant derivative**:
> $$
> D_\mu = \partial_\mu - igA_\mu
> $$
> where:
> - $g$ = **coupling constant** (interaction strength)
> - $A_\mu(x)$ = **gauge field** (a Lie-algebra-valued 1-form / connection)
>
> By construction, $D_\mu\Phi$ transforms as $\Phi$ itself: $(D_\mu\Phi)' = G(x)\,D_\mu\Phi$.
^def-covariant-derivative

> [!definition] Gauge Field
> To ensure $(D_\mu\Phi)' = G(D_\mu\Phi)$, the **gauge field** $A_\mu$ must transform as:
> $$
> A'_\mu = GA_\mu G^{-1} - \frac{i}{g}(\partial_\mu G)G^{-1}
> $$
>
> The gauge field can be expanded in terms of the Lie algebra generators $T^a$:
> $$
> A_\mu = \sum_a A_\mu^a T^a
> $$
> There is **one gauge field component per generator** of the Lie algebra — as many gauge fields as there are generators of the symmetry group.
^def-gauge-field

> [!definition] Gauge Transformation
> A **gauge transformation** changes the choice of local coordinate basis (section of the fiber bundle). Two field configurations related by a gauge transformation represent the **same physical situation**. Gauge invariance is a redundancy, not a symmetry with physical consequences.
^def-gauge-transformation

### Gauge Bosons: Gauge Fields as Force Mediators

> [!definition] Gauge Boson
> When the gauge field theory is **quantized**, the quanta of the gauge field $A_\mu$ are the **gauge bosons** — the force carriers.
> - U(1) gauge theory → 1 gauge boson: the **photon**
> - SU(2) gauge theory → 3 gauge bosons (one per generator): $W^+$, $W^-$, $W^0$
> - SU(3) gauge theory → 8 gauge bosons: the **gluons**
^def-gauge-boson

| Gauge Theory | Gauge Group | Gauge Boson(s) |
|---|---|---|
| QED | U(1) | Photon ($\gamma$) |
| Weak force | SU(2) | $W^\pm$, $Z^0$ |
| QCD | SU(3) | 8 gluons |
| Standard Model | U(1)×SU(2)×SU(3) | All of the above |
| General Relativity | Diffeomorphisms | Graviton (proposed) |

### Yang-Mills Lagrangian

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

### Non-Abelian Gauge Theories

When the gauge group is non-abelian (e.g., SU(2), SU(3)):
- The gauge bosons themselves carry "charge" (color charge for gluons, weak isospin for W/Z)
- Gauge bosons self-interact (3- and 4-boson vertices)
- The field strength tensor has an extra non-linear term: $F_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + gf^{abc}A_\mu^b A_\nu^c$
- This leads to **asymptotic freedom** in QCD: strong coupling decreases at high energies

### Noether's Theorem and Conservation Laws

> [!theorem] Gauge Symmetry → Conserved Currents
> By Noether's theorem, every continuous global symmetry of a Lagrangian gives rise to a conserved current. For O($n$) global symmetry:
> $$
> J_\mu^a = i\partial_\mu\Phi^\mathsf{T} T^a \Phi
> $$
> with one conserved current per generator.
>
> For U(1): the single conserved current is the **electric current** $J^\mu = \frac{e}{\hbar}\bar{\psi}\gamma^\mu\psi$, and the conserved charge is the **electric charge**.
^thm-noether-gauge

### Geometric Interpretation (Mathematical Formalism)

In differential geometry, gauge theory is the theory of **connections on principal fiber bundles**. A **gauge** is a choice of local section of a principal bundle $P$ with structure group $G$:
- **Base space**: spacetime $M$
- **Fiber**: the gauge group $G$ at each point
- **Gauge field** $A_\mu$: a Lie-algebra-valued 1-form — the connection form (Ehresmann connection) on the bundle
- **Field strength** $F_{\mu\nu}$: the curvature of the connection
- **Gauge transformation**: change of local section of the principal bundle

The curvature is
$$
\mathbf{F} = d\mathbf{A} + \mathbf{A}\wedge\mathbf{A}
$$
where $d$ is the exterior derivative and $\wedge$ is the wedge product. For an abelian group (e.g., U(1)), $\mathbf{A}\wedge\mathbf{A} = 0$ and $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$ is the electromagnetic field tensor: the physical electromagnetic field is the curvature of a U(1) connection. The condition "zero curvature everywhere" means the gauge field can be removed by a gauge transformation (it is pure gauge).

### Historical Development

| Year | Event |
|------|-------|
| 1864–65 | Maxwell's formulation of electrodynamics already contains the original (classical) gauge invariance of the potentials — unnoticed at the time |
| 1918 | Weyl proposes *Eichinvarianz* (scale invariance) as a local symmetry of general relativity |
| 1929 | Weyl, Fock, London: replace scale factor with complex phase → U(1) gauge symmetry |
| 1929 | Weyl's paper establishes modern gauge invariance concept |
| 1941 | Pauli's review popularizes gauge invariance |
| 1954 | Yang and Mills: non-abelian SU(2) gauge theory (Yang-Mills theory) |
| 1960s | Glashow, Salam, Ward: electroweak unification via gauge theory |
| 1967 | Weinberg: electroweak theory with Higgs mechanism |
| 1971 | 't Hooft proves non-abelian gauge theories are renormalizable |
| 1973 | Fritzsch, Gell-Mann, Leutwyler: QCD as SU(3) gauge theory |

## Examples

> [!example] Classical Gauge Freedom of the Electromagnetic Potentials
> The potentials can be shifted by
> $$
> V \mapsto V - \frac{\partial f}{\partial t}, \qquad \mathbf{A} \mapsto \mathbf{A} + \nabla f
> $$
> for any twice-differentiable $f(x,t)$, leaving $\mathbf{E}$ and $\mathbf{B}$ unchanged. This is the original gauge invariance of classical electrodynamics (Maxwell, 1864–65).

> [!example] Deriving the Electromagnetic Interaction from U(1) Gauge Symmetry
> **Setup**: Start with the free Dirac action for an electron field $\psi$:
> $$
> \mathcal{S} = \int \bar{\psi}(i\hbar c\,\gamma^\mu\partial_\mu - mc^2)\psi\, d^4x
> $$
> This has the **global U(1) symmetry** $\psi \mapsto e^{i\theta}\psi$ for constant $\theta$.
>
> **Localizing**: Demanding **local U(1) symmetry**, $\theta \to \theta(x)$, i.e. $\psi(x) \mapsto e^{i\theta(x)}\psi(x)$, requires the covariant derivative:
> $$
> D_\mu = \partial_\mu - i\frac{e}{\hbar}A_\mu
> $$
>
> **Identification**: $A_\mu(x)$ is the **electromagnetic four-potential**; $e$ is the electric charge.
>
> **Interaction Lagrangian**:
> $$
> \mathcal{L}_\text{int} = \frac{e}{\hbar}\bar{\psi}(x)\gamma^\mu\psi(x)A_\mu(x) = J^\mu(x)A_\mu(x)
> $$
> where $J^\mu = \frac{e}{\hbar}\bar{\psi}\gamma^\mu\psi$ is the electric four-current.
>
> This is exactly the **minimal coupling** of electromagnetism! The electromagnetic field $A_\mu$ is forced into existence by demanding local phase invariance.
^ex-qed-from-gauge

> [!example] Electromagnetism: U(1) Gauge Theory and the QED Lagrangian
> Adding the gauge-field (Yang-Mills) term for the abelian field strength $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$ to the locally invariant Dirac Lagrangian of the previous example gives the full **QED Lagrangian**:
> $$
> \mathcal{L}_\text{QED} = \bar{\psi}\left(i\hbar c\,\gamma^\mu D_\mu - mc^2\right)\psi - \frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu}
> $$
>
> **Conclusion**: The entire electromagnetic interaction arises from demanding U(1) local invariance of the free Dirac Lagrangian.
^ex-qed-gauge-theory

## Connections

- **[[Quantum Field Theory - Overview]]** — Gauge theory is the organizing principle of QFT: all known fundamental interactions (except gravity) are gauge theories within the QFT framework.
- **[[QED and Renormalization]]** — QED is the U(1) gauge theory; renormalization handles its divergences.
- **[[Standard Model and Gauge Groups]]** — The full Standard Model: SU(3)×SU(2)×U(1).
- **[[Yang-Mills Theory and Gauge Fields]]** — Non-abelian (SU($n$), $n>1$) gauge theories; the field strength tensor is non-linear.
- **[[Renormalization]]** — Ward identities arising from gauge invariance constrain renormalization and ensure the photon remains massless.
- **[[Canonical Quantization of Fields]]** — Quantizing gauge theories requires gauge fixing (Faddeev–Popov ghosts) due to the redundancy.
- **[[Quantum Mechanics - Mathematical Formalism]]** — Noether's theorem, symmetry generators.

## See Also

- [[Standard Model and Gauge Groups]] — the particle physics application of gauge theory
- [[QED and Renormalization]] — the simplest example: U(1) gauge theory
- [[Yang-Mills Theory and Gauge Fields]] — non-abelian gauge theories and the Standard Model
- [[Quantum Field Theory - Overview]] — gauge theory in the broader QFT context
- [[Renormalization]] — gauge invariance constrains renormalization
