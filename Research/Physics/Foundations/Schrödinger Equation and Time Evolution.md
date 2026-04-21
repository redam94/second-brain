---
title: "Schrödinger Equation and Time Evolution"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - topic/physics
  - type/theorem
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Time evolution of a quantum state; Examples"
date_ingested: 2026-04-16
folder: "Physics/Foundations"
doc_type: article
depends_on:
  - "[[Wave Function and Hilbert Space]]"
used_by:
  - "[[Canonical Quantization of Fields]]"
  - "[[QFT Overview]]"
aliases:
  - Schrödinger equation
  - time evolution operator
  - stationary states
---

# Schrödinger Equation and Time Evolution

> [!summary]
> The Schrödinger equation governs how a quantum state evolves in time. Time evolution is deterministic and unitary, driven by the Hamiltonian. Key solved systems include the free particle, the particle in a box, and the quantum harmonic oscillator — these serve as building blocks for quantum field theory.

## Overview

Between measurements, a quantum state $\psi(t)$ evolves continuously and deterministically according to the **Schrödinger equation**. The Hamiltonian $H$, representing total energy, is the generator of this evolution. Because $H$ is Hermitian, evolution is unitary — probabilities are conserved. The Schrödinger equation is the quantum analogue of Newton's second law.

## The Schrödinger Equation

> [!theorem] Time-Dependent Schrödinger Equation
> The time evolution of a quantum state $\psi(t)$ in a Hilbert space $\mathcal{H}$ is governed by:
> $$i\hbar \frac{\partial}{\partial t}\psi(t) = H\psi(t)$$
> where $H$ is the Hamiltonian operator (total energy) and $\hbar$ is the reduced Planck constant.
^thm-schrodinger

### Solution: Time-Evolution Operator

The formal solution is:
$$\psi(t) = e^{-iHt/\hbar}\,\psi(0) \equiv U(t)\,\psi(0)$$

> [!definition] Time-Evolution Operator
> $U(t) = e^{-iHt/\hbar}$ is **unitary**: $U^\dagger U = I$. This ensures the norm of $\psi$ is preserved, i.e., probabilities sum to 1 at all times.
^def-time-evolution-op

### Conservation Laws

Any observable $A$ that **commutes with $H$** (i.e. $[A, H] = 0$) is conserved: its expectation value $\langle A \rangle$ does not change in time. This is the quantum version of **Noether's theorem**: symmetries of the Hamiltonian correspond to conservation laws.

## Stationary States

Eigenstates of $H$ are **stationary states**: their probability distributions are time-independent:
$$H\phi_n = E_n\phi_n \implies \psi(t) = e^{-iE_n t/\hbar}\phi_n$$
The time-dependent phase factor $e^{-iE_n t/\hbar}$ does not affect any observable.

The **time-independent Schrödinger equation** is:
$$H\psi = E\psi$$

## Worked Examples

> [!example] Free Particle (1D)
> **Setup**: A particle with no external forces; $H = P^2/(2m) = -(\hbar^2/2m)\,d^2/dx^2$.
>
> **Solution**: General solution is a superposition of plane waves:
> $$\psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\hat{\psi}(k,0)\,e^{i(kx - \frac{\hbar k^2}{2m}t)}\,dk$$
> where $\hat{\psi}(k,0)$ is the Fourier transform of the initial state and $p = \hbar k$.
>
> **Key result**: A Gaussian wave packet moves at constant velocity but **spreads** over time — position uncertainty grows while momentum uncertainty stays constant. This illustrates the uncertainty principle.
^ex-free-particle

> [!example] Particle in a Box (1D)
> **Setup**: Zero potential inside $[0,L]$, infinite walls outside. Time-independent Schrödinger eq.:
> $$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} = E\psi$$
>
> **Boundary conditions**: $\psi(0) = \psi(L) = 0$.
>
> **Solution**: $\psi_n(x) = \sqrt{2/L}\sin(n\pi x/L)$ with quantized energies:
> $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}, \quad n = 1, 2, 3, \ldots$$
>
> **Interpretation**: Energy is **quantized** — only discrete values are allowed. The lowest energy (ground state, $n=1$) is non-zero, a consequence of the uncertainty principle.
^ex-particle-in-box

> [!example] Quantum Harmonic Oscillator
> **Setup**: $H = P^2/(2m) + \frac{1}{2}m\omega^2 X^2$.
>
> **Solution via ladder operators**: Define $\hat{a} = \sqrt{m\omega/2\hbar}(\hat{X} + i\hat{P}/m\omega)$ and $\hat{a}^\dagger$ (its adjoint). Then:
> $$H = \hbar\omega\left(\hat{a}^\dagger\hat{a} + \tfrac{1}{2}\right)$$
> Energy levels: $E_n = \hbar\omega(n + 1/2)$, $n = 0, 1, 2, \ldots$
>
> **Interpretation**: The zero-point energy $\hbar\omega/2$ is non-zero even in the ground state. This exact same algebra reappears in quantum field theory, where $\hat{a}$ and $\hat{a}^\dagger$ become particle annihilation and creation operators.
^ex-qho

## Connections

- **[[Wave Function and Hilbert Space]]**: $\psi$ lives in $\mathcal{H}$; the Hamiltonian is a self-adjoint operator on $\mathcal{H}$.
- **[[Uncertainty Principle]]**: The free-particle Gaussian wave packet directly demonstrates position-momentum uncertainty.
- **[[Canonical Quantization of Fields]]**: The quantum harmonic oscillator is the prototype — QFT quantizes fields mode-by-mode as independent harmonic oscillators.

## See Also

- [[Wave Function and Hilbert Space]] — the state $\psi$ that evolves
- [[Uncertainty Principle]] — consequences of the non-commuting position and momentum operators
- [[Canonical Quantization of Fields]] — the harmonic oscillator generalized to fields
