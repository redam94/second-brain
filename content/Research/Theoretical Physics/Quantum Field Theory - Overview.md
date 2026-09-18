---
title: "Quantum Field Theory - Overview"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - type/overview
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "Introduction, History, Principles sections"
date_ingested: 2026-04-11
date_updated: 2026-08-10
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Quantum Mechanics - Overview]]"
  - "[[Quantum Mechanics - Mathematical Formalism]]"
used_by:
  - "[[QED and Renormalization]]"
  - "[[Gauge Theory - Overview]]"
  - "[[Standard Model and Gauge Groups]]"
aliases:
  - QFT overview
  - quantum fields
---

# Quantum Field Theory - Overview

> [!summary]
> Quantum Field Theory (QFT) is the theoretical framework combining quantum mechanics, special relativity, and classical field theory. Its key insight: particles are quantized excitations of underlying fields — the electron is a quantum of the electron field, the photon a quantum of the electromagnetic field. QFT allows particle creation and annihilation and is the language of the Standard Model.

## Overview

QFT resolves a fundamental tension: quantum mechanics handles discrete particles but is not Lorentz-covariant; special relativity allows energy-mass conversion (particle creation), which fixed-particle-number QM cannot describe. QFT unifies both by quantizing fields rather than particles.

**The central idea**: Replace classical fields $\phi(\mathbf{x}, t)$ with quantum field operators $\hat{\phi}(\mathbf{x}, t)$. Particles are excitations of these fields, created and destroyed by creation/annihilation operators.

## From Classical Fields to Quantum Fields

### Classical Scalar Field

A classical real scalar field $\phi(\mathbf{x}, t)$ with Lagrangian density:
$$
\mathcal{L} = \frac{1}{2}(\partial_\mu \phi)(\partial^\mu \phi) - \frac{1}{2}m^2\phi^2
$$

The Euler-Lagrange equations give the **Klein-Gordon equation**:
$$
\left(\frac{\partial^2}{\partial t^2} - \nabla^2 + m^2\right)\phi = 0
$$

The field can be decomposed into normal modes (Fourier expansion):
$$
\phi(\mathbf{x},t) = \int \frac{d^3p}{(2\pi)^3} \frac{1}{\sqrt{2\omega_\mathbf{p}}} \left(a_\mathbf{p} e^{-i\omega_\mathbf{p} t + i\mathbf{p}\cdot\mathbf{x}} + a_\mathbf{p}^* e^{i\omega_\mathbf{p} t - i\mathbf{p}\cdot\mathbf{x}}\right)
$$
where $\omega_\mathbf{p} = \sqrt{|\mathbf{p}|^2 + m^2}$. Each mode is a classical harmonic oscillator.

### Canonical Quantization

> [!definition] Canonical Quantization
> Promote the classical field $\phi$ to a quantum field operator $\hat{\phi}$ by replacing the mode amplitudes $a_\mathbf{p}$, $a_\mathbf{p}^*$ with **annihilation and creation operators** $\hat{a}_\mathbf{p}$, $\hat{a}_\mathbf{p}^\dagger$:
> $$
> \hat{\phi}(\mathbf{x},t) = \int \frac{d^3p}{(2\pi)^3} \frac{1}{\sqrt{2\omega_\mathbf{p}}} \left(\hat{a}_\mathbf{p} e^{-i\omega_\mathbf{p} t + i\mathbf{p}\cdot\mathbf{x}} + \hat{a}_\mathbf{p}^\dagger e^{i\omega_\mathbf{p} t - i\mathbf{p}\cdot\mathbf{x}}\right)
> $$
> The operators satisfy: $[\hat{a}_\mathbf{p}, \hat{a}_\mathbf{q}^\dagger] = (2\pi)^3 \delta(\mathbf{p} - \mathbf{q})$
>
> The **vacuum state** $|0\rangle$ satisfies $\hat{a}_\mathbf{p}|0\rangle = 0$ for all $\mathbf{p}$.
> A one-particle state with momentum $\mathbf{p}$ is $\hat{a}_\mathbf{p}^\dagger|0\rangle$.
> Particle number is not fixed — creation operators create particles from the vacuum.
^def-canonical-quantization

> [!definition] Fock Space
> The state space of a quantum field is the **Fock space**, which contains states with arbitrary particle numbers:
> $$
> |n_1, n_2, \ldots\rangle \propto (\hat{a}_{\mathbf{p}_1}^\dagger)^{n_1}(\hat{a}_{\mathbf{p}_2}^\dagger)^{n_2}\cdots|0\rangle
> $$
> This is **second quantization**: the field itself is quantized, allowing particle creation and annihilation.
^def-fock-space

### Path Integral Formulation

> [!definition] Feynman Path Integral
> The amplitude for a field to evolve from initial state $|\phi_I\rangle$ to final state $|\phi_F\rangle$ over time $T$ is:
> $$
> \langle \phi_F|e^{-iHT}|\phi_I\rangle = \int \mathcal{D}\phi(t)\, \exp\!\left\{i\int_0^T dt\, L\right\}
> $$
> where the integral is over all field configurations (all "paths" in field space). This is the **sum-over-histories** interpretation: the amplitude is the sum of $e^{iS}$ over every possible classical and non-classical field history.
^def-path-integral

## Key Historical Developments

| Year | Development | Key Figure(s) |
|------|------------|--------------|
| 1925–27 | Quantum theory of EM field; QED named | Born, Heisenberg, Jordan, Dirac |
| 1928 | Dirac equation (relativistic QM for spin-1/2) | Dirac |
| 1929–30 | Particles as field excitations; antimatter | Jordan, Wigner, Heisenberg, Pauli, Fermi |
| 1932 | Positron discovered | Anderson |
| 1947 | Lamb shift measured | Lamb & Retherford |
| ~1950 | Renormalization procedure | Schwinger, Feynman, Dyson, Tomonaga |
| 1954 | Non-Abelian gauge theories (Yang-Mills) | Yang, Mills |
| 1967–73 | Electroweak unification + QCD → Standard Model | Weinberg, Salam, Glashow, Higgs, Gross, Wilczek, Politzer |
| 2012 | Higgs boson discovered at CERN | ATLAS/CMS experiments |

## Dirac Equation and Antimatter

Dirac's 1928 equation for relativistic spin-1/2 particles:
$$
\left(i\gamma^\mu \partial_\mu - m\right)\psi = 0
$$

Key consequences:
- Predicts electron spin = 1/2 naturally
- Predicts electron $g$-factor = 2
- Negative-energy solutions → existence of **antimatter** (positrons)
- Dirac hole theory → pair production: $\gamma \to e^+ + e^-$

## Interactions in QFT

Interactions are added to the Lagrangian. For example, a quartic self-interaction for a scalar field:
$$
\mathcal{L} = \frac{1}{2}(\partial_\mu\phi)(\partial^\mu\phi) - \frac{1}{2}m^2\phi^2 - \frac{\lambda}{4!}\phi^4
$$

For small $\lambda$, the interacting theory is treated as a **perturbation** of the free theory. Each order in perturbation theory corresponds to [[QED and Renormalization|Feynman diagrams]].

## Applications Beyond Particle Physics

QFT concepts extend far beyond high-energy physics:
- **Condensed matter**: quasiparticles (phonons, magnons), superconductivity, quantum Hall effect
- **Gauge theory of superconductivity**: quantization of magnetic flux
- **Statistical field theory**: phase transitions and renormalization group
- The Higgs mechanism was first understood from superconductor theory (Nambu)

## Connections

- [[Quantum Mechanics - Overview]] — QFT's non-relativistic limit; same Hilbert space formalism
- [[QED and Renormalization]] — First successful QFT; handling infinities
- [[Gauge Theory - Overview]] — Local symmetry principles that organize all QFT interactions
- [[Standard Model and Gauge Groups]] — The full structure of the Standard Model

## See Also

- [[Quantum Mechanics - Mathematical Formalism]] — The mathematical foundations extended by QFT
- [[Gauge Theory - Overview]] — Gauge symmetry as the organizing principle of QFT
