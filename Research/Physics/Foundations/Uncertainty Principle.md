---
title: "Uncertainty Principle"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - topic/physics
  - type/theorem
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Uncertainty principle"
date_ingested: 2026-04-16
date_updated: 2026-06-15
folder: "Physics/Foundations"
doc_type: article
depends_on:
  - "[[Wave Function and Hilbert Space]]"
used_by:
  - "[[Schrödinger Equation and Time Evolution]]"
  - "[[Canonical Quantization of Fields]]"
aliases:
  - Heisenberg uncertainty principle
  - canonical commutation relation
---

# Uncertainty Principle

> [!summary]
> The Heisenberg uncertainty principle is a fundamental theorem of quantum mechanics: no quantum state can simultaneously have a precise value for both position and momentum. It follows from the canonical commutation relation $[\hat{X}, \hat{P}] = i\hbar$ and generalizes to any pair of non-commuting observables.

## Overview

The uncertainty principle is not a statement about experimental imprecision — it is a fundamental feature of quantum states. It reflects the fact that position and momentum operators do not commute: measuring one disturbs the other. The principle underlies the stability of atoms (electrons cannot collapse into the nucleus), the non-zero ground-state energy of the harmonic oscillator, and the zero-point fluctuations of quantum fields.

## Canonical Commutation Relation

> [!definition] Canonical Commutation Relation
> The position operator $\hat{X}$ and momentum operator $\hat{P}$ satisfy:
> $$[\hat{X}, \hat{P}] = \hat{X}\hat{P} - \hat{P}\hat{X} = i\hbar$$
> More generally, for any pair of self-adjoint operators $A$ and $B$:
> $$[A, B] = AB - BA$$
^def-canonical-commutation

**In position space**, the momentum operator acts as a derivative:
$$\hat{P} = -i\hbar \frac{\partial}{\partial x}$$
This means the position and momentum representations are **Fourier transforms** of each other: a narrow position distribution corresponds to a broad momentum distribution, and vice versa.

## Heisenberg Uncertainty Principle

> [!theorem] Heisenberg Uncertainty Principle
> For any quantum state $\psi$, define the standard deviations of position and momentum:
> $$\sigma_X = \sqrt{\langle X^2 \rangle - \langle X \rangle^2}, \quad \sigma_P = \sqrt{\langle P^2 \rangle - \langle P \rangle^2}$$
> Then:
> $$\sigma_X\,\sigma_P \geq \frac{\hbar}{2}$$
^thm-heisenberg-uncertainty

**General form** (Robertson inequality): For any two self-adjoint operators $A$, $B$:
$$\sigma_A\,\sigma_B \geq \frac{1}{2}\left|\langle [A, B] \rangle\right|$$

The Heisenberg relation $\sigma_X\sigma_P \geq \hbar/2$ is the special case with $[A,B] = i\hbar$.

## Physical Consequences

| Consequence | Explanation |
|---|---|
| Atomic stability | Electrons confined near nucleus would have huge $\sigma_P$, raising kinetic energy — they settle at a stable orbital radius |
| Zero-point energy | Harmonic oscillator ground state energy $\hbar\omega/2 \neq 0$ because a state with $E=0$ would require both $X=0$ and $P=0$, violating the principle |
| Quantum tunneling | A particle can penetrate barriers because its position is not sharply defined |
| Vacuum fluctuations | Quantum fields have non-zero fluctuations even in the ground state; this drives spontaneous emission |

## Gaussian Wave Packet Illustration

A Gaussian wave packet $\psi(x,0) = ({\pi a})^{-1/4} \exp(-x^2/2a)$ achieves the **minimum uncertainty** $\sigma_X\sigma_P = \hbar/2$. As $a \to 0$ (sharp position), $\sigma_P \to \infty$; as $a \to \infty$ (sharp momentum), $\sigma_X \to \infty$.

## Connections

- **[[Wave Function and Hilbert Space]]**: The uncertainty principle follows from the structure of operators on $\mathcal{H}$ and the Born rule.
- **[[Schrödinger Equation and Time Evolution]]**: The free-particle example demonstrates that a wave packet spreads over time, increasing $\sigma_X$ while $\sigma_P$ stays constant.
- **[[Canonical Quantization of Fields]]**: The same commutation relation $[\hat{a}, \hat{a}^\dagger] = 1$ for ladder operators in QFT is the field-theoretic version of this principle.

## See Also

- [[Wave Function and Hilbert Space]] — the state formalism from which the principle derives
- [[Schrödinger Equation and Time Evolution]] — time evolution and spreading of wave packets
- [[Canonical Quantization of Fields]] — vacuum fluctuations in QFT as a consequence
