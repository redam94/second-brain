---
title: "Gauge Theory Overview"
tags:
  - source/ingested
  - topic/gauge-theory
  - topic/theoretical-physics
  - type/overview
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Wikipedia: Gauge theory"
date_ingested: 2026-04-10
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Quantum Mechanics Overview]]"
  - "[[Quantum Field Theory Overview]]"
used_by: []
aliases:
  - gauge invariance
  - gauge symmetry
  - Yang-Mills theory
---

# Gauge Theory Overview

> [!summary]
> A gauge theory is a field theory whose Lagrangian is invariant under local (position-dependent) transformations from a Lie group — the gauge group. This local symmetry requires the introduction of gauge fields (one per group generator), whose quanta are gauge bosons (photon, W/Z bosons, gluons). The Standard Model is a non-abelian gauge theory with group U(1)×SU(2)×SU(3), unifying electromagnetic, weak, and strong interactions.

## Overview

Gauge theories are the most successful framework in fundamental physics. The essential idea: physical descriptions contain redundant **degrees of freedom** (the gauge). Different mathematical configurations can describe the same physical situation. The set of redundancy transformations forms a **Lie group** — the gauge group. Demanding that the Lagrangian be invariant under *local* (spacetime-point-dependent) gauge transformations **forces** the introduction of gauge fields that carry the interactions.

**Historical sequence**:
- Classical electromagnetism (Maxwell, 1865): first gauge theory (implicit).
- Weyl (1918, 1929): named "gauge invariance"; connected to U(1) phase symmetry in QM.
- Yang & Mills (1954): non-abelian (SU(2)) gauge theory.
- Standard Model (1970s): U(1) × SU(2) × SU(3) gauge theory.
- General relativity: gauge theory with diffeomorphism symmetry (coordinate invariance).

## Global vs. Local Symmetry

> [!definition] Global Symmetry
> A **global symmetry** is a transformation that acts **identically at every spacetime point**. The parameter of the transformation is a constant (not a function of position).
>
> Example: rotating all vectors in a theory by the same angle everywhere.
^def-global-symmetry

> [!definition] Local Symmetry (Gauge Symmetry)
> A **local symmetry** is a transformation where the parameter **varies from point to point** in spacetime — it is a smooth function of $(x,t)$.
>
> Local symmetry is strictly stronger than global symmetry: a global symmetry is just a special case where the local parameter happens to be constant.
^def-local-symmetry

A gauge theory **extends** a global symmetry to a local symmetry. This extension is non-trivial: derivatives of fields pick up extra terms when the transformation parameter is position-dependent, which must be cancelled by introducing gauge fields.

## Gauge Fields and Gauge Bosons

> [!definition] Gauge Field
> When a global symmetry is made local, a **gauge field** (connection, or Ehresmann connection) must be introduced for each generator of the Lie group. The gauge field enters the Lagrangian through the **covariant derivative**:
> $$D_\mu = \partial_\mu - igA_\mu^a T^a$$
> where $A_\mu^a$ are the gauge field components, $T^a$ are the Lie algebra generators, and $g$ is the coupling constant.
>
> The gauge field has its own kinetic term (the **field strength tensor**), making it dynamical. When the theory is quantized, the quanta of the gauge field are **gauge bosons**.
^def-gauge-field

**Procedure** for constructing a gauge theory from a global symmetry:
1. Start with a Lagrangian invariant under a global symmetry.
2. Promote the symmetry parameter to a local function of spacetime.
3. Compute how derivatives transform — extra terms appear.
4. Introduce gauge fields $A_\mu$ to cancel the extra terms (replace $\partial_\mu \to D_\mu$).
5. Add a kinetic term for $A_\mu$ itself.

## Classical Gauge Theory: Electromagnetism

The simplest gauge theory. The electric and magnetic fields are related to potentials:
$$\mathbf{E} = -\nabla V - \frac{\partial \mathbf{A}}{\partial t}, \qquad \mathbf{B} = \nabla \times \mathbf{A}$$

**Gauge freedom**: the same physical fields $\mathbf{E}, \mathbf{B}$ are produced by different potentials related by a gauge transformation:
$$\mathbf{A} \mapsto \mathbf{A} + \nabla f, \qquad V \mapsto V - \frac{\partial f}{\partial t}$$

for any twice-differentiable function $f(x,t)$. The gauge group is U(1): the group of complex phases.

## Scalar O(n) Gauge Theory (Example)

> [!example] Global-to-Local Gauge Symmetry
> **Setup**: $n$ non-interacting scalar fields $\varphi_i$ of equal mass $m$, with action:
> $$\mathcal{S} = \int d^4x \sum_{i=1}^n \left[\frac{1}{2}\partial_\mu\varphi_i \partial^\mu\varphi_i - \frac{1}{2}m^2\varphi_i^2\right]$$
> This action has a **global** O($n$) symmetry: rotating the fields rigidly.
>
> **Making it local**: Allow the rotation angle to depend on $(x,t)$. The derivative terms are no longer invariant — they acquire extra terms proportional to $\partial_\mu\theta(x,t)$.
>
> **Gauge field**: Introduce a gauge field $A_\mu$ that transforms as $A_\mu \mapsto A_\mu + \partial_\mu\theta$ to cancel the extra terms. Replace $\partial_\mu \to D_\mu = \partial_\mu - igA_\mu$. Add the kinetic term $-\frac{1}{4}F_{\mu\nu}F^{\mu\nu}$ for $A_\mu$.
>
> **Result**: The originally non-interacting fields now interact via the gauge field. Local symmetry **generates** interactions.

## Non-Abelian Gauge Theories: Yang-Mills

> [!definition] Yang-Mills Theory
> A **Yang-Mills theory** is a gauge theory based on a **non-abelian** (non-commutative) Lie group $G$, such as SU(2) or SU(3). Unlike U(1) (QED), the gauge bosons of a non-abelian theory carry charge and **self-interact** (since the structure constants $f^{abc}$ of the Lie algebra are non-zero).
>
> The field strength tensor generalises to:
> $$F_{\mu\nu}^a = \partial_\mu A_\nu^a - \partial_\nu A_\mu^a + g f^{abc} A_\mu^b A_\nu^c$$
> The cubic and quartic self-interaction terms $\sim f^{abc}$ have no analog in electromagnetism.
^def-yang-mills

Yang-Mills (1954) based SU(2) on isospin conservation of protons and neutrons — a prototype for the weak force and ultimately the Standard Model.

**Asymptotic freedom** (Gross, Politzer, Wilczek, 1973): in non-abelian gauge theories, the coupling constant *decreases* at high energies. This makes QCD (SU(3)) weakly coupled at short distances (allowing perturbation theory) and strongly coupled at long distances (confinement of quarks).

## The Standard Model as a Gauge Theory

> [!definition] Standard Model Gauge Group
> The gauge group of the Standard Model is:
> $$G_{\text{SM}} = \text{U}(1)_Y \times \text{SU}(2)_L \times \text{SU}(3)_c$$
> - **U(1)$_Y$** (hypercharge): 1 gauge boson → the photon (after electroweak symmetry breaking)
> - **SU(2)$_L$** (weak isospin): 3 gauge bosons → W$^+$, W$^-$, Z (acquire mass via Higgs mechanism)
> - **SU(3)$_c$** (colour): 8 gauge bosons → gluons (massless, confine quarks)
>
> Total: 12 gauge bosons.
^def-sm-gauge-group

The photon and W/Z bosons emerge after **electroweak symmetry breaking**: the Higgs field acquires a vacuum expectation value, breaking SU(2)$_L$ × U(1)$_Y$ to U(1)$_{\text{em}}$. This is why W and Z are massive while the photon is massless.

## Gauge Theories in Quantum Field Theory

Quantising a gauge theory requires care: the gauge symmetry implies **redundant degrees of freedom** in the path integral, which would naively be overcounted. Solutions:

- **Gauge fixing**: choose a representative from each gauge orbit (Lorenz gauge, Coulomb gauge).
- **BRST quantization**: for non-abelian theories, introduce **Faddeev-Popov ghost fields** (unphysical auxiliary fields) to maintain consistency of the perturbative expansion.

## Geometric Interpretation

Gauge theories have a beautiful geometric formulation in terms of **fiber bundles**:
- The spacetime manifold is the **base space**.
- At each spacetime point, the **fiber** is the gauge group (or a representation of it).
- The gauge field is a **connection** on this bundle.
- The field strength is the **curvature** of the connection.
- A non-zero field strength means the gauge field cannot be eliminated globally by a gauge transformation.

This is analogous to the curvature of spacetime in general relativity (which is itself a gauge theory with the diffeomorphism group as gauge group).

## Connections

- **[[Quantum Field Theory Overview]]**: All fundamental forces in the Standard Model are gauge QFTs. QED is U(1) gauge theory; the full SM is U(1)×SU(2)×SU(3).
- **[[Quantum Mechanics Overview]]**: The U(1) gauge symmetry of QED arises from requiring the quantum-mechanical wave function of a charged particle to be invariant under local phase rotations $\psi \to e^{i\alpha(x)}\psi$.

## See Also
- [[Quantum Field Theory Overview]] — canonical quantization, renormalization, Feynman diagrams
- [[Quantum Mechanics Overview]] — the non-relativistic quantum mechanical foundation
