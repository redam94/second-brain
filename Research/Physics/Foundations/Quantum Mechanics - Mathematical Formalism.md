---
title: "Quantum Mechanics - Mathematical Formalism"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - type/concept
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Mathematical formulation section"
date_ingested: 2026-04-11
folder: "Physics/Foundations"
doc_type: article
depends_on:
  - "[[Quantum Mechanics - Overview]]"
used_by:
  - "[[Quantum Mechanics - Key Phenomena]]"
  - "[[QED and Renormalization]]"
  - "[[Gauge Theory - Overview]]"
aliases:
  - Hilbert space formalism
  - quantum operators
---

# Quantum Mechanics - Mathematical Formalism

> [!summary]
> The rigorous mathematical structure of quantum mechanics is built on Hilbert spaces, Hermitian operators as observables, and the Born rule for probabilities. This note covers the postulates: state vectors, observables, measurement, time evolution, and composite systems including entanglement.

## Overview

The mathematical formalism of QM requires tools from functional analysis, linear algebra, and complex analysis. The state of a system is a normalized vector in a complex Hilbert space; physical quantities are Hermitian operators; measurements give eigenvalues with Born-rule probabilities.

## Postulates

> [!definition] State Space Postulate
> The state of a quantum system is a normalized vector $\psi \in \mathcal{H}$, where $\mathcal{H}$ is a separable complex Hilbert space with $\langle \psi, \psi \rangle = 1$.
> - States are defined up to a global phase: $\psi$ and $e^{i\alpha}\psi$ describe the same physical state
> - The possible states are points in the **projective Hilbert space**
> - For position/momentum: $\mathcal{H} = L^2(\mathbb{C})$ (square-integrable functions)
> - For spin-1/2: $\mathcal{H} = \mathbb{C}^2$ with the standard inner product
^def-state-space

> [!definition] Observable Postulate
> Physical quantities (position, momentum, energy, spin) are represented by **Hermitian (self-adjoint) operators** acting on $\mathcal{H}$.
> - A quantum state $\psi$ is an **eigenstate** of observable $A$ with eigenvalue $a$ if $A\psi = a\psi$
> - More generally, $\psi$ is a superposition of eigenstates: $\psi = \sum_n c_n \phi_n$ where $A\phi_n = a_n \phi_n$
^def-observable

> [!definition] Born Rule (Measurement Postulate)
> When observable $A$ is measured on state $\psi$:
> - The outcome is one of the eigenvalues $a_n$ of $A$
> - For non-degenerate $a_n$: $P(a_n) = |\langle \phi_n, \psi \rangle|^2$ (squared inner product with eigenvector)
> - For degenerate $a_n$: $P(a_n) = \langle \psi, P_n \psi \rangle$ where $P_n$ is the projector onto the eigenspace
> - After measurement giving result $a_n$, the state **collapses** to $\phi_n$ (non-degenerate case)
^def-born-rule-formal

> [!definition] Time Evolution Postulate
> Between measurements, the state evolves unitarily:
> $$i\hbar \frac{d}{dt}|\psi(t)\rangle = H|\psi(t)\rangle$$
> with solution $|\psi(t)\rangle = U(t)|\psi(0)\rangle$ where $U(t) = e^{-iHt/\hbar}$ is unitary.
> - **Unitarity** preserves normalization and probability
> - Any observable $A$ that commutes with $H$ is conserved: $[A, H] = 0 \Rightarrow \langle A \rangle$ constant
^def-time-evolution

## Uncertainty Principle

> [!theorem] Heisenberg Uncertainty Principle
> For position $\hat{X}$ and momentum $\hat{P}$ satisfying the **canonical commutation relation**:
> $$[\hat{X}, \hat{P}] = \hat{X}\hat{P} - \hat{P}\hat{X} = i\hbar$$
> it follows that:
> $$\sigma_X \sigma_P \geq \frac{\hbar}{2}$$
> where $\sigma_X = \sqrt{\langle X^2 \rangle - \langle X \rangle^2}$ is the standard deviation of $X$.
>
> **General form**: For any two observables $A$, $B$:
> $$\sigma_A \sigma_B \geq \frac{1}{2}|\langle [A, B] \rangle|$$
>
> **Fourier duality**: Position and momentum operators are Fourier transforms of each other. In position space, $\hat{P} = -i\hbar \frac{\partial}{\partial x}$. This is why the uncertainty principle follows from the mathematical properties of Fourier pairs.
^thm-uncertainty

## Composite Systems and Entanglement

> [!definition] Composite System
> For two quantum systems $A$ and $B$ with Hilbert spaces $\mathcal{H}_A$ and $\mathcal{H}_B$, the combined system has:
> $$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B$$
> A **separable (product) state** has the form $\psi_A \otimes \psi_B$.
^def-composite

> [!definition] Quantum Entanglement
> A state in $\mathcal{H}_{AB}$ is **entangled** if it cannot be written as a product state $\psi_A \otimes \psi_B$.
> Example of an entangled state:
> $$\frac{1}{\sqrt{2}}(\psi_A \otimes \psi_B + \phi_A \otimes \phi_B)$$
> Properties of entangled states:
> - Cannot describe component systems individually by state vectors
> - Described by **reduced density matrices**: $\rho_A = \text{Tr}_B(\rho_{AB})$
> - Measuring one subsystem instantly constrains the other, regardless of distance
> - Enables quantum computing, quantum key distribution, superdense coding
^def-entanglement

## Symmetries and Conservation Laws

> [!theorem] Quantum Noether Theorem
> If observable $A$ commutes with the Hamiltonian $H$, then $\langle A \rangle$ is conserved under time evolution:
> $$[A, H] = 0 \implies \frac{d}{dt}\langle A \rangle = 0$$
> This is the quantum analog of Noether's theorem: every differentiable symmetry of the Hamiltonian corresponds to a conservation law.
^thm-noether-qm

## Equivalent Formulations

| Formulation | Key Object | Invented By |
|------------|------------|-------------|
| Matrix mechanics | Infinite matrices for observables | Heisenberg (1925) |
| Wave mechanics | Wave function $\psi(x,t)$ and PDE | Schrödinger (1926) |
| Dirac transformation theory | Bra-ket notation unifying both | Dirac (1930s) |
| Feynman path integrals | Sum over all paths from $a$ to $b$ | Feynman (1948) |

All formulations are mathematically equivalent but provide different intuitions.

## Connections

- [[Quantum Mechanics - Overview]] — Historical context and physical intuition
- [[Quantum Mechanics - Key Phenomena]] — Physical implications: interference, tunneling, Bell's theorem
- [[Quantum Field Theory - Overview]] — Extends this formalism to relativistic multi-particle systems via field quantization
- [[Gauge Theory - Overview]] — Gauge symmetry is a local version of the symmetries described by Noether's theorem

## See Also

- [[Quantum Mechanics - Key Phenomena]] — Observable consequences of this formalism
- [[QED and Renormalization]] — How path integrals and perturbation theory are applied in QFT
