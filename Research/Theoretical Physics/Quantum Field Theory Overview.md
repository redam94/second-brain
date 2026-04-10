---
title: "Quantum Field Theory Overview"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/theoretical-physics
  - type/overview
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "Wikipedia: Quantum field theory"
date_ingested: 2026-04-10
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Quantum Mechanics Overview]]"
used_by:
  - "[[Gauge Theory Overview]]"
aliases:
  - QFT
  - quantum field theory
---

# Quantum Field Theory Overview

> [!summary]
> Quantum field theory (QFT) combines quantum mechanics, special relativity, and classical field theory by treating particles as excited states of underlying quantum fields. It resolved the infinities of early quantum calculations through renormalization and culminated in the Standard Model — the most precisely tested theory in physics, unifying electromagnetic, weak, and strong interactions via gauge symmetry.

## Overview

QFT is the theoretical framework underlying all of modern particle physics and much of condensed matter physics. Its two key insights:
1. **Particles are quanta (excitations) of quantum fields** — there is an electron field, a photon field, etc.
2. **Interactions are mediated by gauge bosons** — force-carrying particles arising from [[Gauge Theory Overview|gauge symmetry]].

The Standard Model, a non-abelian gauge theory with group $\text{U}(1) \times \text{SU}(2) \times \text{SU}(3)$, is the culmination of QFT and accurately describes three of four fundamental forces.

## Historical Development

### From Classical Fields to QM

**Classical field theory origins**: Newton's gravity was "action at a distance." Maxwell's electromagnetism (1864) introduced fields as physical objects propagating at the speed of light, decisively refuting action at a distance.

**Quantum mechanics** (1925–1926, Heisenberg, Born, Schrödinger, Dirac, Pauli) handled single non-relativistic particles. But the [[Quantum Mechanics Overview#Schrödinger Equation and Time Evolution|Schrödinger equation]] treats time differently from space — it is not Lorentz covariant and cannot describe photon creation/annihilation.

### Quantum Electrodynamics (QED)

> [!definition] Quantum Electrodynamics (QED)
> QED is the quantum field theory of electromagnetic interactions. It describes how charged particles (electrons, positrons) interact by exchanging photons — the gauge bosons of the U(1) gauge group.
>
> Founded by Dirac (1927), who coined the term and explained **spontaneous emission** via vacuum fluctuations (zero-point energy of the EM field). QED predicts the electron's anomalous magnetic moment to 1 part in $10^{12}$.
^def-qed

**Dirac equation** (1928): relativistic wave equation for spin-$\tfrac{1}{2}$ particles. Consequences:
- Electron spin $= \tfrac{1}{2}$.
- Electron $g$-factor $= 2$.
- Correct hydrogen fine structure.
- **Predicted antimatter**: negative-energy states implied positrons (confirmed by Anderson, 1932).

### Infinities and Renormalization

Early perturbative calculations in QED produced **divergent (infinite) integrals**, e.g., the electron self-energy. For ~20 years this blocked progress.

> [!definition] Renormalization
> **Renormalization** is the systematic procedure for removing infinities from perturbative QFT calculations by absorbing them into a finite number of observable physical quantities (mass, charge, field normalization).
>
> Developed ~1950 by Schwinger, Feynman, Dyson, and Tomonaga. The idea: the "bare" mass and charge appearing in the Lagrangian differ from measured values by infinite radiative corrections. We **substitute the measured (physical) values** for the bare ones, rendering all predictions finite and in agreement with experiment.
^def-renormalization

As Tomonaga explained: *"the mass and charge observed in experiments are not the original mass and charge but the mass and charge as modified by field reactions, and they are finite... we may adopt the procedure of substituting experimental values for them phenomenologically. This procedure is called the renormalization of mass and charge."*

A theory is **renormalizable** if all infinities can be removed by redefining a finite number of parameters (QED is renormalizable; most theories are not).

### Feynman Diagrams

> [!definition] Feynman Diagrams
> **Feynman diagrams** are pictorial representations of terms in the perturbative expansion of the S-matrix (scattering amplitude). Each diagram corresponds to a process: particles propagate along lines, interact at vertices.
>
> - Each line and vertex has a corresponding mathematical factor.
> - The scattering amplitude for a process = sum over all topologically distinct Feynman diagrams (each weighted by coupling constant to appropriate power).
> - Higher-order diagrams involve loops, which generate the divergences requiring renormalization.
^def-feynman-diagrams

## The Standard Model

> [!definition] Standard Model
> The **Standard Model** is a non-abelian gauge QFT with symmetry group:
> $$G_{\text{SM}} = \text{U}(1) \times \text{SU}(2) \times \text{SU}(3)$$
> It contains:
> - 12 gauge bosons: photon (U(1)), three weak bosons W$^\pm$, Z (SU(2)), eight gluons (SU(3))
> - Six quarks, six leptons (matter fields)
> - Higgs boson (mass generation via spontaneous symmetry breaking)
>
> The Standard Model accurately describes electromagnetic, weak, and strong interactions, but does not incorporate gravity.
^def-standard-model

### Key Developments Toward the Standard Model

**Yang-Mills theories** (1954, Yang & Mills): Non-abelian gauge theories based on SU(2), generalising QED's U(1). Unlike photons, Yang-Mills gauge bosons carry charge and self-interact.

**Electroweak unification** (Glashow 1960, Salam & Ward, Weinberg 1967): Unified electromagnetic and weak forces in a SU(2)×U(1) gauge theory. Initially non-renormalizable.

**Spontaneous symmetry breaking / Higgs mechanism** (Higgs, Brout, Englert, et al., 1964): Massless gauge bosons acquire mass when the gauge symmetry is spontaneously broken. This made the electroweak theory renormalizable (proved by 't Hooft, 1971).

**Quantum chromodynamics (QCD)** (1970s): SU(3) gauge theory of the strong interaction. Key property: **asymptotic freedom** — the coupling constant decreases at high energies, making perturbative calculations valid at short distances.

**Quark model extended to electroweak** (Glashow, Iliopoulos, Maiani, 1970): Completed the Standard Model.

## Non-renormalizability and the Limits of Perturbation Theory

**Non-renormalizable theories**: Most QFTs, including Fermi's theory of the weak interaction, are non-renormalizable — infinitely many counterterms are needed to absorb infinities. Such theories are only valid up to some energy scale (effective field theories).

**Strong coupling problem**: Perturbation theory (Feynman diagrams) requires the coupling constant to be small. QCD has coupling $\sim 1$ at low energies, making perturbative methods invalid — lattice QCD and other non-perturbative techniques are required.

## Mathematical Framework

QFT is built on the **path integral formulation** and the **canonical quantization** of fields:

$$Z = \int \mathcal{D}\phi \, e^{iS[\phi]/\hbar}$$

where $Z$ is the partition function, $S[\phi]$ is the classical action, and the integral is over all field configurations. Observable quantities are computed as correlation functions of fields.

The Lagrangian density $\mathcal{L}$ encodes the field content and interactions. Gauge invariance of $\mathcal{L}$ (under the relevant Lie group) is the defining property of a gauge theory — see [[Gauge Theory Overview]].

## Connections

- **[[Quantum Mechanics Overview]]**: QFT is the relativistic, many-body extension of QM. Single-particle QM emerges as the non-relativistic limit of QFT.
- **[[Gauge Theory Overview]]**: All fundamental interactions in the Standard Model are gauge theories. QED is U(1) gauge theory; the full Standard Model is U(1)×SU(2)×SU(3).

## See Also
- [[Quantum Mechanics Overview]] — the non-relativistic foundation
- [[Gauge Theory Overview]] — the local symmetry principle underlying all fundamental interactions
