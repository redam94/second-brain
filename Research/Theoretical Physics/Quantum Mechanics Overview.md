---
title: "Quantum Mechanics Overview"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - topic/theoretical-physics
  - type/overview
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Wikipedia: Quantum mechanics"
date_ingested: 2026-04-10
folder: "Theoretical Physics"
doc_type: article
depends_on: []
used_by:
  - "[[Quantum Field Theory Overview]]"
  - "[[Gauge Theory Overview]]"
aliases:
  - quantum mechanics
  - QM
---

# Quantum Mechanics Overview

> [!summary]
> Quantum mechanics is the fundamental physical theory describing matter and light at atomic and subatomic scales. It replaces classical determinism with probabilistic predictions via wave functions in Hilbert space, introduces the Schrödinger equation for time evolution, and reveals intrinsically quantum phenomena: energy quantization, wave-particle duality, the uncertainty principle, and entanglement.

## Overview

Quantum mechanics emerged in the mid-1920s from the failure of classical physics to explain black-body radiation (Planck 1900), the photoelectric effect (Einstein 1905), and atomic spectra (Bohr 1913). Key contributors: Bohr, Schrödinger, Heisenberg, Born, Dirac, Pauli. It provides the foundation for quantum chemistry, quantum biology, [[Quantum Field Theory Overview|quantum field theory]], and quantum information.

Classical mechanics is recovered as a limiting approximation at macroscopic scales (the **correspondence principle**).

## Mathematical Formalism

> [!definition] Quantum State
> The **state** of a quantum system is a normalised vector $\psi$ in a separable complex Hilbert space $\mathcal{H}$, satisfying $\langle \psi, \psi \rangle = 1$. States are defined up to a global phase: $\psi$ and $e^{i\alpha}\psi$ represent the same physical system.
>
> - For position/momentum: $\mathcal{H} = L^2(\mathbb{C})$ (square-integrable complex functions).
> - For a spin-$\tfrac{1}{2}$ particle: $\mathcal{H} = \mathbb{C}^2$.
^def-quantum-state

> [!definition] Observable
> A **physical observable** (position, momentum, energy, spin) is represented by a **Hermitian (self-adjoint) linear operator** $\hat{A}$ acting on $\mathcal{H}$. Measurement of $\hat{A}$ on state $\psi$ yields eigenvalue $\lambda$ with probability given by the **Born rule**.
^def-observable

> [!definition] Born Rule
> The probability of obtaining eigenvalue $\lambda$ (non-degenerate) when measuring observable $\hat{A}$ in state $\psi$ is:
> $$P(\lambda) = |\langle \vec{\lambda}, \psi \rangle|^2$$
> where $\vec{\lambda}$ is the normalised eigenvector corresponding to $\lambda$. After measurement, the state **collapses** to $\vec{\lambda}$.
^def-born-rule

## Schrödinger Equation and Time Evolution

> [!definition] Schrödinger Equation
> The time evolution of a quantum state is governed by:
> $$i\hbar \frac{\partial}{\partial t}\psi(t) = H\psi(t)$$
> where $H$ is the **Hamiltonian** (total energy operator) and $\hbar$ is the reduced Planck constant. The solution is:
> $$\psi(t) = e^{-iHt/\hbar}\psi(0) = U(t)\psi(0)$$
> The **time-evolution operator** $U(t) = e^{-iHt/\hbar}$ is unitary, preserving the norm of $\psi$.
^def-schrodinger

Time evolution is **deterministic**: given $\psi(0)$, $\psi(t)$ is fully determined. Randomness enters only upon **measurement** (wavefunction collapse).

## Uncertainty Principle

> [!theorem] Heisenberg Uncertainty Principle
> For position operator $\hat{X}$ and momentum operator $\hat{P}$, the canonical commutation relation is:
> $$[\hat{X}, \hat{P}] = i\hbar$$
> This implies a fundamental limit on simultaneous precision:
> $$\sigma_X \sigma_P \geq \frac{\hbar}{2}$$
> where $\sigma_X = \sqrt{\langle X^2\rangle - \langle X\rangle^2}$ is the standard deviation of position, and likewise for $\sigma_P$.
>
> More generally, for any two self-adjoint operators $A$, $B$:
> $$\sigma_A \sigma_B \geq \frac{1}{2}|\langle [A,B]\rangle|$$
^thm-heisenberg-uncertainty

The position and momentum operators are Fourier transforms of each other; making the position distribution narrow (small $a$) broadens the momentum distribution and vice versa. In position space, $p_i$ is replaced by $-i\hbar \frac{\partial}{\partial x}$.

## Composite Systems and Entanglement

> [!definition] Composite System
> For two quantum systems $A$ and $B$ with Hilbert spaces $\mathcal{H}_A$ and $\mathcal{H}_B$, the composite system lives in:
> $$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B$$
> Not all states in $\mathcal{H}_{AB}$ are **separable** (product states $\psi_A \otimes \psi_B$). Non-separable states are **entangled**.
^def-entanglement

An example of an entangled two-qubit state:
$$\frac{1}{\sqrt{2}}(\psi_A \otimes \psi_B + \phi_A \otimes \phi_B)$$

Entangled systems cannot be described independently: knowing the reduced density matrix of each subsystem is insufficient to reconstruct the full state. This connects to **quantum decoherence** (entanglement with environment) and limits of the classical approximation.

Entanglement enables quantum computing and quantum key distribution, but **does not allow faster-than-light communication** (no-communication theorem).

## Examples

### Free Particle

Hamiltonian $H = \frac{P^2}{2m} = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2}$.

The general solution is a superposition of plane waves:
$$\psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty} \hat{\psi}(k,0) e^{i(kx - \frac{\hbar k^2}{2m}t)} dk$$

A Gaussian wave packet $\psi(x,0) = (\pi a)^{-1/4} e^{-x^2/(2a)}$ illustrates the uncertainty principle: smaller $a$ → sharper position, broader momentum; larger $a$ → opposite. The packet **spreads over time**.

### Particle in a Box

Infinite potential well of width $L$: $V=0$ inside, $V=\infty$ outside. Boundary conditions force:
$$k = \frac{n\pi}{L}, \quad n=1,2,3,\ldots$$

Energy eigenvalues (quantized):
$$E_n = \frac{\hbar^2 \pi^2 n^2}{2mL^2} = \frac{n^2 h^2}{8mL^2}$$

This illustrates **energy quantization**: bound states have discrete energies, not continuous.

### Quantum Harmonic Oscillator

Potential $V(x) = \frac{1}{2}m\omega^2 x^2$. Using the **ladder method** (Dirac), eigenstates are:
$$\psi_n(x) = \sqrt{\frac{1}{2^n n!}}\left(\frac{m\omega}{\pi\hbar}\right)^{1/4} e^{-\frac{m\omega x^2}{2\hbar}} H_n\!\left(\sqrt{\frac{m\omega}{\hbar}}\, x\right)$$

with energy levels:
$$E_n = \hbar\omega\!\left(n + \tfrac{1}{2}\right)$$

The zero-point energy $E_0 = \frac{\hbar\omega}{2} > 0$ is a purely quantum effect with no classical analog.

## Symmetries and Conservation Laws

Any Hermitian operator $A$ that commutes with $H$ ($[A,H]=0$) represents a **conserved quantity**. This is the quantum analog of **Noether's theorem**: every continuous symmetry corresponds to a conservation law (energy ↔ time translation, momentum ↔ spatial translation, angular momentum ↔ rotation).

## Formulations

Multiple mathematically equivalent formulations:
1. **Matrix mechanics** (Heisenberg): observables as matrices, states as vectors.
2. **Wave mechanics** (Schrödinger): differential wave equation.
3. **Transformation theory** (Dirac): unifies the above.
4. **Path integral formulation** (Feynman): amplitude = sum over all classical and non-classical paths.

## Connections

- **[[Quantum Field Theory Overview]]**: QFT extends QM to relativistic, multi-particle regimes by quantising the fields themselves. The Schrödinger equation is non-relativistic; QFT resolves this.
- **[[Gauge Theory Overview]]**: Gauge invariance in QED arises from requiring local U(1) phase symmetry of the quantum mechanical wave function of a charged particle.

## See Also
- [[Quantum Field Theory Overview]] — relativistic extension of QM, particle creation/annihilation
- [[Gauge Theory Overview]] — local symmetry principles and gauge bosons
