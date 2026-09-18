---
title: "Canonical Quantization of Fields"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/physics
  - type/concept
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "Principles — Classical fields; Canonical quantization"
date_ingested: 2026-04-16
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[Quantum Field Theory - Overview]]"
  - "[[../Foundations/Schrödinger Equation and Time Evolution]]"
  - "[[../Foundations/Uncertainty Principle]]"
used_by:
  - "[[Renormalization]]"
  - "[[Gauge Theory - Overview]]"
aliases:
  - second quantization
  - ladder operators
  - Fock space
  - Klein-Gordon field
---

# Canonical Quantization of Fields

> [!summary]
> Canonical quantization promotes a classical field to a quantum operator field by analogy with the quantum harmonic oscillator. For the scalar (Klein–Gordon) field, each Fourier mode becomes an independent harmonic oscillator with its own ladder operators. Particles are excitations of these modes; the vacuum has non-zero zero-point energy.

## Overview

Just as quantum mechanics promotes classical position $x$ to an operator $\hat{x}$, quantum field theory promotes a classical field $\phi(\mathbf{x},t)$ to an operator field $\hat{\phi}(\mathbf{x},t)$. The procedure is guided by analogy with the **quantum harmonic oscillator** — the simplest quantum system with a continuous degree of freedom. In QFT, each normal mode (Fourier component) of the field is an independent harmonic oscillator.

## Classical Scalar Field

> [!definition] Scalar Field Lagrangian
> For a real scalar field $\phi(\mathbf{x},t)$ of mass $m$, the Lagrangian density is:
> $$\mathcal{L} = \frac{1}{2}\dot{\phi}^2 - \frac{1}{2}(\nabla\phi)^2 - \frac{1}{2}m^2\phi^2$$
> where $\dot{\phi} = \partial\phi/\partial t$ and $\nabla$ is the spatial gradient.
^def-scalar-lagrangian

Applying the Euler–Lagrange equation yields the **Klein–Gordon equation**:

> [!theorem] Klein–Gordon Equation
> $$\left(\frac{\partial^2}{\partial t^2} - \nabla^2 + m^2\right)\phi = 0$$
> This is the relativistic wave equation for a spin-0 particle of mass $m$.
^thm-klein-gordon

### Mode Expansion

The Klein–Gordon equation is a wave equation; its general solution is a superposition of normal modes via Fourier transform:
$$\phi(\mathbf{x},t) = \int\frac{d^3p}{(2\pi)^3}\frac{1}{\sqrt{2\omega_\mathbf{p}}}\left(a_\mathbf{p}\,e^{-i\omega_\mathbf{p}t + i\mathbf{p}\cdot\mathbf{x}} + a_\mathbf{p}^*\,e^{i\omega_\mathbf{p}t - i\mathbf{p}\cdot\mathbf{x}}\right)$$
where $\omega_\mathbf{p} = \sqrt{|\mathbf{p}|^2 + m^2}$ is the dispersion relation. Each mode at momentum $\mathbf{p}$ behaves as a harmonic oscillator with frequency $\omega_\mathbf{p}$.

## Quantization Procedure

### Quantum Harmonic Oscillator Analogy

For the classical harmonic oscillator, $x(t) = \frac{1}{\sqrt{2\omega}}ae^{-i\omega t} + \text{c.c.}$

Quantization promotes $x \to \hat{x}$ and $a, a^* \to \hat{a}, \hat{a}^\dagger$ (annihilation and creation operators):
$$\hat{x}(t) = \frac{1}{\sqrt{2\omega}}\hat{a}\,e^{-i\omega t} + \frac{1}{\sqrt{2\omega}}\hat{a}^\dagger e^{i\omega t}$$

> [!definition] Ladder Operator Commutation Relation
> $$[\hat{a}, \hat{a}^\dagger] = 1$$
> This is the field-theoretic version of the canonical commutation relation $[\hat{X},\hat{P}]=i\hbar$.
^def-ladder-commutation

The **Hamiltonian** of the quantum harmonic oscillator is:
$$\hat{H} = \hbar\omega\,\hat{a}^\dagger\hat{a} + \frac{1}{2}\hbar\omega$$

The $\frac{1}{2}\hbar\omega$ is the **zero-point energy** — the non-zero ground-state energy.

### Quantum Field as Operator

The canonical quantization of the scalar field promotes $a_\mathbf{p} \to \hat{a}_\mathbf{p}$ and $a_\mathbf{p}^* \to \hat{a}_\mathbf{p}^\dagger$:
$$[\hat{a}_\mathbf{p}, \hat{a}_{\mathbf{p}'}^\dagger] = (2\pi)^3\,\delta^{(3)}(\mathbf{p} - \mathbf{p}')$$

These operators satisfy:
- $\hat{a}_\mathbf{p}|0\rangle = 0$ — the vacuum state has no particles in mode $\mathbf{p}$
- $\hat{a}_\mathbf{p}^\dagger|0\rangle$ — a single particle of momentum $\mathbf{p}$ 

## Fock Space

> [!definition] Fock Space
> The Hilbert space of a quantum field is the **Fock space** $\mathcal{F}$, built from the vacuum $|0\rangle$ by acting with creation operators:
> $$|n_{\mathbf{p}_1}, n_{\mathbf{p}_2}, \ldots\rangle \propto (\hat{a}_{\mathbf{p}_1}^\dagger)^{n_1}(\hat{a}_{\mathbf{p}_2}^\dagger)^{n_2}\cdots|0\rangle$$
> where $n_{\mathbf{p}_i}$ is the number of particles in mode $\mathbf{p}_i$. Particle number is not fixed — the Fock space simultaneously describes states with any number of particles.
^def-fock-space

### Vacuum State and Zero-Point Energy

The vacuum $|0\rangle$ is the lowest-energy state. Its energy is:
$$E_\text{vac} = \sum_\mathbf{p} \frac{1}{2}\hbar\omega_\mathbf{p}$$
This is **infinite** (summing over all modes). In practice this infinite constant is subtracted (normal ordering). The *fluctuations* around the vacuum are physical and drive spontaneous emission, the Casimir effect, and Lamb shift.

## Summary: Classical → Quantum

| Classical | Quantum |
|---|---|
| Field amplitude $\phi(\mathbf{x},t)$ | Operator $\hat{\phi}(\mathbf{x},t)$ |
| Fourier coefficient $a_\mathbf{p}$ | Annihilation operator $\hat{a}_\mathbf{p}$ |
| Complex conjugate $a_\mathbf{p}^*$ | Creation operator $\hat{a}_\mathbf{p}^\dagger$ |
| Energy of mode | $\hbar\omega_\mathbf{p}(\hat{n}_\mathbf{p} + \tfrac{1}{2})$ |
| Field configuration | Fock space state $|n_{\mathbf{p}_1},\ldots\rangle$ |

## Connections

- **[[../Foundations/Schrödinger Equation and Time Evolution]]**: The quantum harmonic oscillator (particle in parabolic potential) is the exact prototype.
- **[[../Foundations/Uncertainty Principle]]**: The commutation $[\hat{a},\hat{a}^\dagger]=1$ is the ladder-operator form of $[\hat{X},\hat{P}]=i\hbar$.
- **[[Renormalization]]**: Perturbative calculations in QFT using these operators produce UV-divergent integrals that require renormalization.
- **[[Gauge Theory - Overview]]**: The photon field is a spin-1 gauge field; its quantization follows the same procedure with additional constraints.

## See Also

- [[Quantum Field Theory - Overview]] — conceptual context and motivation
- [[Renormalization]] — handling the infinities that arise
- [[Gauge Theory - Overview]] — gauge bosons as quantized gauge fields
