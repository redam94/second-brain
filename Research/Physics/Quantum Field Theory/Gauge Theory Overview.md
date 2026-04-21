---
title: "Gauge Theory Overview"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/physics
  - type/overview
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Description — Global and local symmetries; Gauge fields; Classical gauge theory"
date_ingested: 2026-04-16
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[QFT Overview]]"
used_by:
  - "[[Yang-Mills Theory and Gauge Fields]]"
aliases:
  - gauge invariance
  - local symmetry
  - gauge field
  - covariant derivative
  - gauge boson
---

# Gauge Theory Overview

> [!summary]
> A gauge theory is a field theory whose Lagrangian is invariant under local (position-dependent) symmetry transformations forming a Lie group. To maintain this invariance when the symmetry parameter varies in spacetime, one must introduce a gauge field (which becomes the mediator of a fundamental force). When quantized, gauge fields give rise to gauge bosons. All fundamental forces except gravity are gauge theories.

## Overview

The key insight of gauge theory: **local symmetry demands interaction**. If you require that a theory be invariant not just under global symmetry transformations (the same everywhere), but under *local* ones (different at each spacetime point), the derivative terms in the Lagrangian break invariance. To restore it, one must introduce a new dynamical field — the **gauge field**. The photon, $W^\pm$, $Z$ bosons, and gluons are all gauge bosons arising from this mechanism.

## Global vs. Local Symmetry

> [!definition] Global Symmetry
> A theory has a **global symmetry** under a group $G$ if the Lagrangian is invariant when all fields are transformed simultaneously by a *constant* group element. Example: rotating all field values by the same angle everywhere in spacetime.
^def-global-symmetry

> [!definition] Local Symmetry (Gauge Symmetry)
> A theory has a **local symmetry** (gauge symmetry) if the Lagrangian is invariant under transformations where the group element $G(x)$ varies *continuously* from point to point in spacetime. Local symmetry is a stronger constraint — a global symmetry is a special case where $G(x) = \text{const}$.
^def-local-symmetry

## The Problem with Local Transformations

Consider the O($n$) global symmetry of $n$ scalar fields:
$$\mathcal{L} = \frac{1}{2}(\partial_\mu\Phi)^T\partial^\mu\Phi - \frac{1}{2}m^2\Phi^T\Phi$$
Under a global rotation $\Phi \to G\Phi$ (constant $G \in O(n)$), both $\Phi$ and $\partial_\mu\Phi$ transform identically — invariance holds.

Under a **local** transformation $\Phi \to G(x)\Phi$, the derivative fails:
$$\partial_\mu(G(x)\Phi) = G(x)\partial_\mu\Phi + (\partial_\mu G)\Phi \neq G(x)\partial_\mu\Phi$$
The extra term $(\partial_\mu G)\Phi$ breaks invariance.

## The Gauge Field and Covariant Derivative

> [!definition] Gauge Covariant Derivative
> To restore local invariance, replace the ordinary derivative $\partial_\mu$ with the **gauge covariant derivative**:
> $$D_\mu = \partial_\mu - igA_\mu$$
> where $A_\mu$ is the **gauge field** (a Lie-algebra-valued 1-form) and $g$ is the **coupling constant** (interaction strength). By construction, $D_\mu\Phi$ transforms as $\Phi$ itself: $(D_\mu\Phi)' = G(x)D_\mu\Phi$.
^def-covariant-derivative

The gauge field $A_\mu$ must transform as:
$$A_\mu' = G A_\mu G^{-1} - \frac{i}{g}(\partial_\mu G)G^{-1}$$

The gauge field can be expanded in terms of Lie algebra generators $T^a$:
$$A_\mu = \sum_a A_\mu^a T^a$$
There are as many gauge fields as there are generators of the symmetry group.

> [!definition] Gauge Transformation
> A **gauge transformation** changes the choice of local coordinate basis (section of the fiber bundle). Two field configurations related by a gauge transformation represent the **same physical situation**. Gauge invariance is a redundancy, not a symmetry with physical consequences.
^def-gauge-transformation

## Classical Electromagnetism as a Gauge Theory

> [!example] Electromagnetism: U(1) Gauge Theory
> **Setup**: The electron field $\psi$ has global U(1) symmetry $\psi \to e^{i\theta}\psi$. Localizing this: $\theta \to \theta(x)$.
>
> **Covariant derivative**: $D_\mu = \partial_\mu - i\frac{e}{\hbar}A_\mu$
>
> **Identification**: $A_\mu(x)$ is the **electromagnetic four-potential**; $e$ is the electric charge.
>
> **Interaction Lagrangian**: $\mathcal{L}_\text{int} = J^\mu A_\mu$, where $J^\mu = \frac{e}{\hbar}\bar{\psi}\gamma^\mu\psi$ is the electric four-current.
>
> **QED Lagrangian**:
> $$\mathcal{L}_\text{QED} = \bar{\psi}\left(i\hbar c\,\gamma^\mu D_\mu - mc^2\right)\psi - \frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu}$$
>
> **Conclusion**: The entire electromagnetic interaction arises from demanding U(1) local invariance of the free Dirac Lagrangian.
^ex-qed-gauge-theory

**Classical gauge freedom**: Potentials $V \to V - \partial f/\partial t$ and $\mathbf{A} \to \mathbf{A} + \nabla f$ leave $\mathbf{E}$ and $\mathbf{B}$ unchanged for any twice-differentiable $f(x,t)$. This is the original gauge invariance of classical electrodynamics (Maxwell, 1864).

## Gauge Fields as Force Mediators

When the gauge theory is **quantized**, the quanta of the gauge field are called **gauge bosons**:

| Gauge Theory | Gauge Group | Gauge Boson(s) |
|---|---|---|
| QED | U(1) | Photon ($\gamma$) |
| Weak force | SU(2) | $W^\pm$, $Z^0$ |
| QCD | SU(3) | 8 gluons |
| Standard Model | U(1)×SU(2)×SU(3) | All of the above |
| General Relativity | Diffeomorphisms | Graviton (proposed) |

## Mathematical Formalism

In differential geometry, a **gauge** is a choice of local section of a principal bundle $P$ with structure group $G$. The gauge field $A_\mu$ is a **connection 1-form** (Ehresmann connection) on this bundle. The **curvature** (field strength) is:
$$\mathbf{F} = d\mathbf{A} + \mathbf{A}\wedge\mathbf{A}$$
where $d$ is the exterior derivative and $\wedge$ is the wedge product. For an abelian group (e.g., U(1)), $\mathbf{A}\wedge\mathbf{A} = 0$ and $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$ is the electromagnetic field tensor.

## Connections

- **[[QFT Overview]]**: All known fundamental interactions (except gravity) are gauge theories within the QFT framework.
- **[[Yang-Mills Theory and Gauge Fields]]**: Non-abelian (SU($n$), $n>1$) gauge theories; the field strength tensor is non-linear.
- **[[Renormalization]]**: Ward identities arising from gauge invariance constrain renormalization and ensure the photon remains massless.
- **[[Canonical Quantization of Fields]]**: Quantizing gauge theories requires gauge fixing (Faddeev–Popov ghosts) due to the redundancy.

## See Also

- [[Yang-Mills Theory and Gauge Fields]] — non-abelian gauge theories and the Standard Model
- [[QFT Overview]] — gauge theory in the broader QFT context
- [[Renormalization]] — gauge invariance constrains renormalization
