---
title: "QFT Overview"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/physics
  - type/overview
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "Introduction; History"
date_ingested: 2026-04-16
date_updated: 2026-06-22
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[../Foundations/Wave Function and Hilbert Space]]"
  - "[[../Foundations/Schrödinger Equation and Time Evolution]]"
used_by:
  - "[[Canonical Quantization of Fields]]"
  - "[[Renormalization]]"
  - "[[Gauge Theory Overview]]"
aliases:
  - quantum field theory
  - QFT
---

# QFT Overview

> [!summary]
> Quantum field theory (QFT) is the theoretical framework that combines quantum mechanics, special relativity, and classical field theory. It describes particles as quantized excitations of underlying fields and is the foundation of the Standard Model — our best description of fundamental forces and particles.

## Overview

Quantum mechanics describes a fixed number of particles at non-relativistic speeds. Special relativity allows particle creation and annihilation. QFT reconciles both by treating particles not as fundamental objects but as **excitations of quantum fields** — operator-valued functions defined at every point in spacetime. Every particle type (electron, photon, quark, ...) has a corresponding quantum field; creating a particle means exciting that field.

### Why QFT?

| Limitation of QM | Solution in QFT |
|---|---|
| Fixed particle number | Fields can create/destroy particles |
| Non-relativistic | Built on Lorentz-invariant Lagrangians |
| Spontaneous emission unexplained | Vacuum fluctuations of the EM field drive emission |
| No antiparticles | Dirac equation in QFT predicts positrons naturally |

## Historical Development

### Quantum Electrodynamics (QED)

The first QFT, developed in the 1920s–1950s:

1. **1925–26**: Born, Heisenberg, Jordan quantize the free electromagnetic field as harmonic oscillators
2. **1927**: Dirac coins "QED" and explains spontaneous emission via vacuum fluctuations
3. **1928**: Dirac equation describes relativistic electrons; predicts spin $\frac{1}{2}$ and the $g$-factor; negative energy states imply **antimatter**
4. **1932**: Positrons discovered by Anderson — first experimental confirmation of QFT
5. **1947**: Lamb shift measured; renormalization procedure developed by Schwinger, Feynman, Dyson, Tomonaga

> [!definition] Dirac Equation
> The relativistic wave equation for spin-$\tfrac{1}{2}$ particles:
> $$\mathcal{S} = \int \bar{\psi}\left(i\hbar c\,\gamma^\mu\partial_\mu - mc^2\right)\psi\,d^4x$$
> where $\gamma^\mu$ are the Dirac gamma matrices, $\psi$ is the spinor field, and $\bar{\psi} = \psi^\dagger\gamma^0$.
^def-dirac-equation

### Standard Model

The crowning achievement of QFT (1960s–1970s):
- **Electroweak theory**: Glashow, Salam, Ward unify electromagnetism and weak force using $\text{SU}(2)\times\text{U}(1)$ gauge symmetry; spontaneous symmetry breaking via Higgs mechanism gives masses to $W^\pm$ and $Z$ bosons
- **QCD**: Fritzsch, Gell-Mann, Leutwyler describe the strong force via $\text{SU}(3)$ gauge theory (quantum chromodynamics); quarks carry "color" charge
- **Asymptotic freedom**: Gross, Wilczek, Politzer show QCD coupling decreases at high energies, making perturbation theory valid there
- **Higgs boson**: Final missing piece; detected at CERN in 2012
- **Standard Model gauge group**: $\text{SU}(3)\times\text{SU}(2)\times\text{U}(1)$ with 12 gauge bosons (photon, $W^\pm$, $Z$, 8 gluons)

## Core Concepts

### Fields and Particles

> [!definition] Quantum Field
> A quantum field $\phi(\mathbf{x}, t)$ is an operator-valued distribution: at each spacetime point there is an operator acting on the **Fock space** of particle states. A particle of a given type is a quantized excitation of the corresponding field.
^def-quantum-field

The Fock space is built from the vacuum state $|0\rangle$ by applying creation operators:
$$|n\rangle \propto (\hat{a}^\dagger)^n |0\rangle$$

### The Lagrangian Approach

QFT is formulated using a **Lagrangian density** $\mathcal{L}(\phi, \partial_\mu\phi)$. The action is:
$$\mathcal{S} = \int d^4x\,\mathcal{L}$$
Equations of motion follow from the **Euler–Lagrange equation**:
$$\partial_\mu\frac{\partial\mathcal{L}}{\partial(\partial_\mu\phi)} - \frac{\partial\mathcal{L}}{\partial\phi} = 0$$

### Feynman Diagrams

Feynman introduced a pictorial calculus for perturbation theory. Each diagram represents a term in the perturbative expansion of a scattering amplitude; vertices correspond to interactions and lines to particle propagators. This gave QFT its computational power.

### Two Formulations

| Formulation | Key Idea |
|---|---|
| **Canonical quantization** | Promote classical fields to operators; impose commutation relations |
| **Path integral** | Sum over all field histories weighted by $e^{i\mathcal{S}/\hbar}$ |

Both are equivalent and give the same physical predictions.

## Connections

- **[[../Foundations/Schrödinger Equation and Time Evolution]]**: The quantum harmonic oscillator is the prototype; QFT applies it to each field mode.
- **[[Canonical Quantization of Fields]]**: Detailed procedure for quantizing a scalar field.
- **[[Renormalization]]**: The procedure for dealing with UV divergences that arise in perturbative calculations.
- **[[Gauge Theory Overview]]**: QED, QCD, and the electroweak theory are all gauge theories.
- **[[Wave Function and Hilbert Space]]**: Hilbert space and state vectors are the quantum formalism QFT extends to fields; Fock space is built from the single-particle Hilbert space.
- **[[Uncertainty Principle]]**: The energy–time uncertainty relation underlies vacuum fluctuations and virtual particle creation in QFT.
- **[[Quantum Entanglement]]**: Entanglement arises naturally in QFT through multi-particle states in Fock space and the vacuum.

## See Also

- [[Canonical Quantization of Fields]] — quantization procedure
- [[Renormalization]] — handling UV infinities
- [[Gauge Theory Overview]] — local symmetry as the organizing principle of QFT
- [[Yang-Mills Theory and Gauge Fields]] — non-abelian gauge theories and the Standard Model
- [[Standard Model and Gauge Groups]] — Standard Model as the culmination of QFT (parallel flat-note coverage in Theoretical Physics)
- [[Quantum Field Theory - Overview]] — parallel flat-note treatment of QFT in the Theoretical Physics folder
