---
title: "Standard Model and Gauge Groups"
tags:
  - source/ingested
  - topic/gauge-theory
  - topic/quantum-field-theory
  - type/concept
  - doc/article
source: "[[raw/Gauge theory]]"
source_location: "Standard Model section; also [[raw/Quantum field theory]] Standard Model section"
date_ingested: 2026-04-11
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Gauge Theory - Overview]]"
  - "[[QED and Renormalization]]"
used_by: []
aliases:
  - Standard Model
  - SU(3) SU(2) U(1)
  - gauge bosons
---

# Standard Model and Gauge Groups

> [!summary]
> The Standard Model of particle physics is a gauge theory with symmetry group SU(3)×SU(2)×U(1) that describes the electromagnetic, weak, and strong fundamental forces via 12 gauge bosons. It successfully predicts all known particle physics phenomena except gravity. The Higgs mechanism gives mass to W and Z bosons via spontaneous symmetry breaking.

## Overview

The Standard Model unifies three of the four fundamental forces of nature in a single gauge-theoretic framework. Its gauge group $\text{SU}(3) \times \text{SU}(2) \times \text{U}(1)$ determines the structure of all non-gravitational interactions.

## Gauge Group Structure

> [!definition] Standard Model Gauge Group
> $$
> G_\text{SM} = \text{SU}(3)_c \times \text{SU}(2)_L \times \text{U}(1)_Y
> $$
> where:
> - $\text{SU}(3)_c$ — color symmetry → quantum chromodynamics (QCD)
> - $\text{SU}(2)_L$ — weak isospin (acts only on left-handed particles) → weak force
> - $\text{U}(1)_Y$ — weak hypercharge
>
> The electromagnetic $\text{U}(1)_\text{em}$ is not a subgroup of SU(2)×U(1) directly; it emerges after electroweak symmetry breaking.
^def-sm-gauge-group

## Gauge Bosons

| Force | Symmetry | Generator Count | Gauge Bosons | Discovered |
|-------|----------|----------------|-------------|-----------|
| Electromagnetism | U(1)$_\text{em}$ | 1 | Photon $\gamma$ (massless) | Classical |
| Weak | SU(2)×U(1) | 4 → 3 massive + 1 massless | $W^+$, $W^-$, $Z^0$ (massive), $\gamma$ | 1983 |
| Strong | SU(3)$_c$ | 8 | 8 gluons $g$ (massless but confined) | 1970s |
| **Total** | SU(3)×SU(2)×U(1) | 12 | — | — |

## The Higgs Mechanism

> [!definition] Spontaneous Symmetry Breaking (Higgs Mechanism)
> The electroweak symmetry SU(2)×U(1) is **spontaneously broken** by the Higgs field $\phi$ acquiring a non-zero vacuum expectation value:
> $$
> \langle \phi \rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}0 \\ v\end{pmatrix}, \quad v \approx 246 \text{ GeV}
> $$
>
> This breaks SU(2)×U(1) → U(1)$_\text{em}$, giving mass to $W^\pm$ and $Z^0$ while keeping the photon massless. The longitudinal degrees of freedom of the massive gauge bosons are "eaten" Goldstone bosons.
>
> The remaining physical scalar field is the **Higgs boson** $H$, observed at CERN in 2012 with mass $m_H \approx 125$ GeV.
^def-higgs-mechanism

## Matter Content

The Standard Model includes 12 matter fermions (6 quarks + 6 leptons) organized in 3 generations:

| Generation | Quarks | Leptons |
|-----------|--------|---------|
| 1st | up $(u)$, down $(d)$ | electron $e^-$, electron neutrino $\nu_e$ |
| 2nd | charm $(c)$, strange $(s)$ | muon $\mu^-$, muon neutrino $\nu_\mu$ |
| 3rd | top $(t)$, bottom $(b)$ | tau $\tau^-$, tau neutrino $\nu_\tau$ |

Quarks carry color charge (SU(3) representation) and are confined inside hadrons. Leptons do not carry color.

## Quantum Chromodynamics (QCD)

> [!definition] QCD
> QCD is the SU(3) gauge theory of the strong force. Quarks carry one of three **color charges** (red, green, blue) and interact by exchanging **gluons** (the 8 gauge bosons of SU(3)).
>
> Key properties:
> - **Color confinement**: isolated quarks are never observed; they are always bound in color-neutral hadrons
> - **Asymptotic freedom** (Gross, Wilczek, Politzer 1973): the strong coupling $\alpha_s$ decreases at high energies → perturbation theory works at high energy
> - Gluons carry color charge and self-interact (three-gluon and four-gluon vertices)
^def-qcd

## Electroweak Unification

The electromagnetic and weak forces are unified in electroweak theory:

1. **Glashow (1960)**: non-abelian SU(2)×U(1) gauge theory unifies electromagnetic and weak interactions
2. **Salam and Ward (independently)**: same theory
3. **Problem**: the theory was non-renormalizable
4. **Higgs, Brout, Englert et al. (1964)**: spontaneous symmetry breaking can give gauge bosons mass while preserving renormalizability
5. **Weinberg (1967)**: combined electroweak + Higgs mechanism → complete electroweak theory
6. **'t Hooft (1971)**: proved non-abelian gauge theories with spontaneous symmetry breaking are renormalizable

## Predictions and Precision Tests

The Standard Model has made extraordinarily precise predictions:
- Anomalous magnetic moment of electron: $g_e/2 - 1 \approx 0.00115965$ (agreement to 12 decimal places)
- Existence and properties of $W^\pm$ (1983), $Z^0$ (1983), top quark (1995), Higgs boson (2012)
- Electroweak precision tests at LEP, SLC, Tevatron
- QCD predictions at the LHC

## Open Questions

The Standard Model does not include:
- **Gravity**: no consistent QFT of gravity; general relativity is not incorporated
- **Dark matter**: no candidate particle in the SM
- **Neutrino masses**: the SM assumes massless neutrinos, but neutrino oscillations require mass
- **Matter-antimatter asymmetry**: the SM's CP violation is insufficient to explain the observed asymmetry

Beyond Standard Model (BSM) proposals: supersymmetry (SUSY), extra dimensions, grand unified theories (GUT: SU(5), SO(10)), string theory.

## Connections

- [[Gauge Theory - Overview]] — The mathematical framework organizing the Standard Model
- [[QED and Renormalization]] — The U(1) abelian gauge theory sub-component
- [[Quantum Field Theory - Overview]] — The broader QFT framework
- [[Quantum Mechanics - Mathematical Formalism]] — Symmetry and conservation laws (Noether)

## See Also

- [[Gauge Theory - Overview]] — Local symmetry as the organizing principle
- [[QED and Renormalization]] — Simplest gauge theory; precision tests
- [[Quantum Field Theory - Overview]] — Second quantization and Fock spaces
