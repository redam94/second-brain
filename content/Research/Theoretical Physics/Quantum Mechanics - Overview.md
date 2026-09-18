---
title: "Quantum Mechanics - Overview"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - type/overview
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Overview and fundamental concepts, Examples, Relation to other theories"
date_ingested: 2026-04-11
folder: "Theoretical Physics"
doc_type: article
depends_on: []
used_by:
  - "[[Quantum Mechanics - Mathematical Formalism]]"
  - "[[Quantum Mechanics - Key Phenomena]]"
  - "[[Quantum Field Theory - Overview]]"
aliases:
  - QM overview
  - quantum theory
---

# Quantum Mechanics - Overview

> [!summary]
> Quantum mechanics (QM) is the fundamental physical theory describing the behavior of matter and light at atomic and subatomic scales. It replaced classical mechanics for small systems and is the foundation of all quantum physics, including quantum field theory, quantum chemistry, and quantum computing. Its key departure from classical physics: predictions are inherently probabilistic, not deterministic.

## Overview

Quantum mechanics governs phenomena at the scale of atoms and below. Classical mechanics works well for macroscopic objects but breaks down for:
- Discrete atomic spectra (energy levels)
- Blackbody radiation
- The photoelectric effect
- Particle-wave duality

QM is applicable to molecules, atoms, and subatomic particles. Its predictions have been verified to extraordinary precision — quantum electrodynamics (QED) agrees with experiment to within 1 part in $10^{12}$ for the magnetic properties of an electron.

## Historical Development

| Year | Contribution | Person |
|------|-------------|--------|
| 1900 | Blackbody radiation, quantized energy oscillators | Max Planck |
| 1905 | Photoelectric effect → photons as quanta of light | Albert Einstein |
| 1913 | Bohr model: discrete electron energy levels | Niels Bohr |
| 1924 | Wave-particle duality hypothesis | Louis de Broglie |
| 1925–26 | Matrix mechanics | Werner Heisenberg |
| 1925–26 | Wave mechanics / Schrödinger equation | Erwin Schrödinger |
| 1926 | Born rule (probabilistic interpretation of $|\psi|^2$) | Max Born |
| 1928 | Relativistic wave equation → predicts spin and antimatter | Paul Dirac |

## Five Core Concepts

> [!definition] Wave Function
> The **wave function** $\psi$ is a mathematical object, a vector in a complex Hilbert space $\mathcal{H}$, that encodes all information about a quantum system. Its squared modulus $|\psi(x)|^2$ gives the probability density of finding the particle at position $x$ when measured.
^def-wave-function

> [!definition] Born Rule
> The probability of obtaining measurement outcome associated with eigenvalue $\lambda$ of observable $A$ is:
> $$
> P(\lambda) = |\langle \vec{\lambda}, \psi \rangle|^2
> $$
> for non-degenerate $\lambda$, where $\vec{\lambda}$ is the unit eigenvector. For degenerate eigenvalues, $P(\lambda) = \langle \psi, P_\lambda \psi \rangle$ where $P_\lambda$ is the projector onto the eigenspace.
^def-born-rule

> [!definition] Schrödinger Equation
> The time evolution of a quantum state is governed by:
> $$
> i\hbar \frac{\partial}{\partial t}\psi(t) = H\psi(t)
> $$
> where $H$ is the **Hamiltonian** (the observable for total energy) and $\hbar$ is the reduced Planck constant. The formal solution is:
> $$
> \psi(t) = e^{-iHt/\hbar}\psi(0)
> $$
> The time-evolution operator $U(t) = e^{-iHt/\hbar}$ is **unitary**, preserving the norm of the state.
^def-schrodinger

> [!definition] Heisenberg Uncertainty Principle
> For position $\hat{X}$ and momentum $\hat{P}$, which satisfy the canonical commutation relation $[\hat{X}, \hat{P}] = i\hbar$:
> $$
> \sigma_X \sigma_P \geq \frac{\hbar}{2}
> $$
> where $\sigma_X = \sqrt{\langle X^2 \rangle - \langle X \rangle^2}$ and similarly for $\sigma_P$. More generally, for any two observables $A$ and $B$:
> $$
> \sigma_A \sigma_B \geq \frac{1}{2}|\langle [A,B] \rangle|
> $$
^def-uncertainty

> [!definition] Superposition
> If $\psi_1$ and $\psi_2$ are valid quantum states, then any normalized linear combination $\alpha\psi_1 + \beta\psi_2$ (with $|\alpha|^2 + |\beta|^2 = 1$) is also a valid quantum state. This is the **superposition principle**, which underlies interference and entanglement.
^def-superposition

## Worked Examples

> [!example] Free Particle
> A free particle has Hamiltonian $H = \frac{P^2}{2m} = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2}$.
> The general solution to the Schrödinger equation is a superposition of plane waves:
> $$
> \psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\hat{\psi}(k,0)e^{i(kx - \frac{\hbar k^2}{2m}t)}\,dk
> $$
> A Gaussian wave packet $\psi(x,0) = \frac{1}{\sqrt[4]{\pi a}}e^{-x^2/(2a)}$ has momentum distribution:
> $$
> \hat{\psi}(k,0) = \sqrt[4]{\frac{a}{\pi}}e^{-ak^2/2}
> $$
> Smaller $a$ (narrower position) → wider momentum spread, and vice versa — illustrating the uncertainty principle. The packet's center moves at constant velocity (like a classical particle) but spreads over time.

> [!example] Particle in a Box (Infinite Potential Well)
> For a particle confined to $0 \leq x \leq L$ with infinite walls, the time-independent Schrödinger equation $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} = E\psi$ with boundary conditions $\psi(0) = \psi(L) = 0$ gives:
> - Allowed wave functions: $\psi_n(x) = C\sin(k_n x)$, where $k_n = \frac{n\pi}{L}$, $n = 1, 2, 3, \ldots$
> - **Quantized energy levels**: $E_n = \frac{\hbar^2 \pi^2 n^2}{2mL^2} = \frac{n^2 h^2}{8mL^2}$
> This is the simplest model showing **energy quantization** from boundary conditions alone.
^ex-particle-in-box

> [!example] Quantum Harmonic Oscillator
> For potential $V(x) = \frac{1}{2}m\omega^2 x^2$, the eigenstates are:
> $$
> \psi_n(x) = \sqrt{\frac{1}{2^n n!}}\left(\frac{m\omega}{\pi\hbar}\right)^{1/4} e^{-\frac{m\omega x^2}{2\hbar}} H_n\!\left(\sqrt{\frac{m\omega}{\hbar}}x\right), \quad n = 0, 1, 2, \ldots
> $$
> where $H_n$ are Hermite polynomials. The **energy levels** are:
> $$
> E_n = \hbar\omega\left(n + \frac{1}{2}\right)
> $$
> The ground state ($n=0$) has non-zero energy $E_0 = \frac{\hbar\omega}{2}$ — the **zero-point energy**, a consequence of the uncertainty principle.
^ex-harmonic-oscillator

## Relation to Other Theories

| Theory | Relationship to QM |
|--------|-------------------|
| Classical mechanics | QM reduces to CM for large quantum numbers (correspondence principle); classical mechanics derived from QM in the macroscopic limit |
| Special relativity | QM + SR → quantum field theory; the Dirac equation is the relativistic QM wave equation for spin-1/2 particles |
| General relativity | No consistent quantum gravity yet; string theory and loop quantum gravity are active research areas |
| Statistical mechanics | Quantum statistical mechanics underlies thermodynamics of matter at low temperatures |
| Quantum field theory | QFT is QM applied to fields, allowing particle creation/annihilation |

## Key Interpretations

- **Copenhagen interpretation** (Bohr, Heisenberg): the wave function collapse on measurement is irreducible; probability is fundamental, not epistemic
- **Many-worlds interpretation** (Everett, 1956): no collapse; all outcomes occur in branching parallel universes
- **Bohmian mechanics**: deterministic but explicitly nonlocal; adds a real particle position guided by the wave function
- **QBism / Relational QM**: modern Copenhagen-type interpretations emphasizing the role of the observer

## Connections

- [[Quantum Mechanics - Mathematical Formalism]] — Hilbert space formalism, operators, uncertainty principle, entanglement
- [[Quantum Mechanics - Key Phenomena]] — Double-slit, tunneling, wave-particle duality, Bell's theorem
- [[Quantum Field Theory - Overview]] — QFT extends QM to relativistic, multi-particle systems
- [[Gauge Theory - Overview]] — Gauge symmetry organizes QFT interactions

## See Also

- [[Quantum Field Theory - Overview]] — The relativistic, field-theoretic extension of QM
- [[Gauge Theory - Overview]] — Symmetry principles that constrain QFT interactions
- [[QED and Renormalization]] — The first successful quantum field theory
- [[Physics/Foundations/Wave Function and Hilbert Space|Wave Function & Hilbert Space]] — structured subfolder note covering the same Hilbert space formalism in more depth
- [[Physics/Foundations/Schrödinger Equation and Time Evolution|Schrödinger Equation & Time Evolution]] — structured subfolder note on time evolution and the unitary operator $U(t)$
- [[Physics/Foundations/Uncertainty Principle|Uncertainty Principle]] — structured subfolder note on Heisenberg's uncertainty relation
- [[Physics/Foundations/Quantum Entanglement|Quantum Entanglement]] — structured subfolder note on non-local correlations and Bell's theorem
