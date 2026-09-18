---
title: "Wave Function and Hilbert Space"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - topic/physics
  - type/definition
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Mathematical formulation"
date_ingested: 2026-04-16
folder: "Physics/Foundations"
doc_type: article
depends_on: []
used_by:
  - "[[Schrödinger Equation and Time Evolution]]"
  - "[[Uncertainty Principle]]"
  - "[[Quantum Entanglement]]"
  - "[[Canonical Quantization of Fields]]"
aliases:
  - quantum state
  - Born rule
  - wavefunction
---

# Wave Function and Hilbert Space

> [!summary]
> In quantum mechanics, the state of a system is fully described by a wave function — a normalized vector in a complex Hilbert space. Physical quantities (observables) correspond to Hermitian operators, and measurement outcomes are eigenvalues drawn from a probability distribution given by the Born rule.

## Overview

Classical physics describes a particle by its exact position and momentum. Quantum mechanics replaces this with a *state vector* $\psi$ that encodes probability amplitudes for all possible measurement outcomes. The mathematical arena is a separable complex Hilbert space $\mathcal{H}$, which may be infinite-dimensional. This framework successfully explains atomic spectra, the photoelectric effect, spin, and the discrete energy levels of bound systems.

## Mathematical Formulation

### The State Postulate

> [!definition] Quantum State
> The state of a quantum mechanical system is a vector $\psi$ belonging to a separable complex Hilbert space $\mathcal{H}$. The state is normalized:
> $$\langle \psi, \psi \rangle = 1$$
> and is defined up to a global phase: $\psi$ and $e^{i\alpha}\psi$ represent the same physical system.
^def-quantum-state

The possible states form the *projective space* of $\mathcal{H}$.

**Examples of Hilbert spaces:**
- Position/momentum of a particle: $\mathcal{H} = L^2(\mathbb{R})$, the space of square-integrable complex-valued functions on the real line
- Spin-$\tfrac{1}{2}$ particle: $\mathcal{H} = \mathbb{C}^2$ with the standard inner product

### Observables

> [!definition] Observable
> A physical quantity (position, momentum, energy, spin) is represented by a Hermitian (self-adjoint) linear operator $\hat{A}$ acting on $\mathcal{H}$.
^def-observable

A quantum state $\psi$ is an **eigenstate** of $\hat{A}$ with eigenvalue $\lambda$ if $\hat{A}\psi = \lambda\psi$. In general $\psi$ is a superposition of eigenstates.

### Born Rule

> [!theorem] Born Rule
> When observable $\hat{A}$ is measured on state $\psi$:
> - If eigenvalue $\lambda$ is **non-degenerate**, the probability of obtaining $\lambda$ is $|\langle \vec{\lambda}, \psi \rangle|^2$, where $\vec{\lambda}$ is the unit eigenvector.
> - If eigenvalue $\lambda$ is **degenerate**, the probability is $\langle \psi, P_\lambda \psi \rangle$, where $P_\lambda$ is the projector onto the eigenspace.
> - For continuous spectra, these formulas give a **probability density**.
^thm-born-rule

### Wavefunction Collapse

After a measurement yields result $\lambda$:
- **Non-degenerate case**: state collapses to $\vec{\lambda}$
- **General case**: state collapses to $\displaystyle \frac{P_\lambda \psi}{\sqrt{\langle \psi, P_\lambda \psi \rangle}}$

This collapse is the source of the measurement problem in quantum foundations.

### Superposition

A quantum state may be a **linear combination** (superposition) of eigenstates:
$$\psi = \sum_n c_n \phi_n, \quad \sum_n |c_n|^2 = 1$$
where $|c_n|^2$ is the probability of measuring eigenvalue $\lambda_n$.

## Connections

- **[[Schrödinger Equation and Time Evolution]]**: $\psi$ evolves deterministically between measurements according to $i\hbar\,\partial_t\psi = H\psi$.
- **[[Uncertainty Principle]]**: Non-commuting observables cannot both be precisely defined simultaneously.
- **[[Quantum Entanglement]]**: Composite systems live in tensor-product Hilbert spaces; entanglement arises when the state cannot be factored.
- **[[Canonical Quantization of Fields]]**: QFT promotes classical fields to operator-valued distributions, generalizing this single-particle formalism.

## See Also

- [[Schrödinger Equation and Time Evolution]] — time dynamics of the state vector
- [[Uncertainty Principle]] — limits on simultaneous eigenvalues of non-commuting observables
- [[Quantum Entanglement]] — non-separable states of composite systems
- [[Quantum Mechanics - Mathematical Formalism]] — Theoretical Physics companion note covering Dirac notation, operators, and commutation relations at a higher level of abstraction
- [[Quantum Mechanics - Overview]] — big-picture survey of quantum mechanics connecting to the Theoretical Physics notes cluster
- [[Quantum Field Theory - Overview]] — quantum field theory generalises this single-particle Hilbert space formalism to many-body field operators
