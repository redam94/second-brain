---
title: "QED and Renormalization"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/quantum-electrodynamics
  - type/concept
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "Quantum electrodynamics, Infinities and renormalization, Standard model sections"
date_ingested: 2026-04-11
folder: "Theoretical Physics"
doc_type: article
depends_on:
  - "[[Quantum Field Theory - Overview]]"
  - "[[Quantum Mechanics - Mathematical Formalism]]"
used_by:
  - "[[Gauge Theory - Overview]]"
  - "[[Standard Model and Gauge Groups]]"
aliases:
  - quantum electrodynamics
  - QED
  - renormalization
  - Feynman diagrams
---

# QED and Renormalization

> [!summary]
> Quantum Electrodynamics (QED) is the quantum field theory of the electromagnetic interaction between photons and charged particles (electrons, positrons). It was the first complete, successful QFT. Its development required inventing the renormalization procedure to handle infinite loop corrections — replacing bare (infinite) parameters with measured finite quantities. QED is the most precisely tested theory in physics, accurate to 1 part in $10^{12}$.

## Overview

QED combines quantum mechanics with special relativity to describe how light and matter interact. Its core difficulty was that naive perturbative calculations produced infinite answers (the "ultraviolet divergences"). Renormalization resolved this by recognizing that the infinite quantities correspond to unmeasurable bare parameters that should be replaced by observed masses and charges.

## Quantum Electrodynamics

> [!definition] QED
> QED is the quantum field theory of electrons, positrons, and photons. Its Lagrangian (in natural units $\hbar = c = 1$) is:
> $$
> \mathcal{L}_{\text{QED}} = \bar{\psi}(i\gamma^\mu D_\mu - m)\psi - \frac{1}{4}F_{\mu\nu}F^{\mu\nu}
> $$
> where:
> - $\psi$ = electron/positron Dirac spinor field
> - $D_\mu = \partial_\mu + ieA_\mu$ = covariant derivative (couples matter to EM field)
> - $A_\mu$ = electromagnetic four-potential (photon field)
> - $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$ = electromagnetic field tensor
> - $m$ = electron mass, $e$ = electron charge
>
> QED has **U(1) gauge symmetry** — it is the simplest abelian gauge theory.
^def-qed

Key predictions verified by QED:
- Anomalous magnetic moment of the electron: $g-2 \approx 0.00231930$ (theory matches experiment to 12 significant figures)
- Lamb shift in hydrogen atom spectrum
- Compton scattering, photoelectric effect, pair production

## Perturbative Infinities

In QED, higher-order perturbative calculations produce infinite quantities. For example:
- **Electron self-energy**: the mass correction from an electron emitting and reabsorbing a virtual photon is infinite
- **Vacuum polarization**: the EM field can briefly create virtual $e^+e^-$ pairs; this creates infinite corrections to the photon propagator
- **Vertex correction**: an electron interacting with an external field can emit and reabsorb virtual photons; infinite

These arise from loop integrals that diverge at high momenta (ultraviolet divergences):
$$\int_0^\Lambda \frac{d^4k}{k^2} \sim \Lambda^2 \to \infty \text{ as } \Lambda \to \infty$$

## Renormalization

> [!definition] Renormalization
> Renormalization is the systematic procedure for removing ultraviolet divergences from perturbative QFT calculations. The key insight (Schwinger, Feynman, Dyson, Tomonaga ~1950):
>
> **The infinite bare parameters (mass $m_0$, charge $e_0$) are not physical observables.** What we measure are the renormalized (physical) mass $m$ and charge $e$. We can absorb the infinities into the unobservable bare parameters:
> $$
> m_0 = m + \delta m, \quad e_0 = e + \delta e
> $$
> where $\delta m$ and $\delta e$ are (infinite) counterterms. After subtraction, all observable quantities are finite.
>
> Tomonaga (Nobel lecture): "The mass and charge observed in experiments are not the original mass and charge but the mass and charge as modified by field reactions, and they are finite... This procedure is called the renormalization of mass and charge."
^def-renormalization

> [!theorem] Renormalizability (Dyson, 1949)
> A QFT is **renormalizable** if all ultraviolet divergences can be absorbed into a finite number of parameters (masses, couplings) by redefining them. This is only possible for a restricted class of theories.
> - QED: renormalizable ✓
> - Fermi's theory of weak interactions: non-renormalizable ✗
> - Standard Model (electroweak + QCD): renormalizable ✓
^thm-renormalizability

## Feynman Diagrams

> [!definition] Feynman Diagrams
> Feynman diagrams are pictorial representations of the terms in the perturbative expansion of a scattering amplitude. Each diagram corresponds to a specific mathematical expression (Feynman rules).
>
> For QED, the basic elements are:
> - **Electron propagator** (solid line with arrow): $\frac{i(\not{p} + m)}{p^2 - m^2 + i\epsilon}$
> - **Photon propagator** (wavy line): $\frac{-ig_{\mu\nu}}{k^2 + i\epsilon}$
> - **Vertex** (electron emits/absorbs photon): $-ie\gamma^\mu$
>
> The scattering amplitude for a process is the sum of all Feynman diagrams with the same external lines (particles in and out), organized by powers of the coupling constant $e$.
^def-feynman-diagrams

> [!example] Compton Scattering
> A photon scatters off an electron ($\gamma + e^- \to \gamma + e^-$). At leading order (tree level), two diagrams contribute:
> 1. Electron absorbs incoming photon, emits outgoing photon
> 2. Electron emits outgoing photon first, then absorbs incoming
>
> The amplitude is $\mathcal{M} \propto e^2 [\text{sum of propagators}]$. The cross section agrees with the Klein-Nishina formula, which has been experimentally verified.

## The Path from QED to the Standard Model

| Theory | Symmetry Group | Gauge Bosons | Force |
|--------|---------------|-------------|-------|
| QED | U(1) | Photon (1) | Electromagnetism |
| Electroweak | SU(2) × U(1) | W$^\pm$, Z$^0$, photon (4) | Weak + EM |
| QCD | SU(3) | Gluons (8) | Strong nuclear |
| Standard Model | SU(3) × SU(2) × U(1) | 12 total | All except gravity |

The **Higgs mechanism** (spontaneous symmetry breaking) gives mass to W and Z bosons while keeping the photon massless. The Higgs boson was detected at CERN in 2012.

**Asymptotic freedom** (Gross, Wilczek, Politzer 1973): In QCD, the strong coupling constant decreases at high energies, making perturbation theory applicable for high-energy collisions.

## The Lamb Shift and Precision Tests

The Lamb shift — a tiny splitting between the $2S_{1/2}$ and $2P_{1/2}$ energy levels of hydrogen — was measured by Lamb and Retherford in 1947. It cannot be explained by the Dirac equation alone but arises from quantum fluctuations in the electromagnetic field (virtual photon emissions). Its successful calculation using QED renormalization was a landmark validation of the theory.

## Connections

- [[Quantum Field Theory - Overview]] — The broader framework of which QED is a part
- [[Gauge Theory - Overview]] — QED is the simplest U(1) gauge theory; non-abelian gauge theories extend it
- [[Standard Model and Gauge Groups]] — QED is embedded in the full Standard Model
- [[Quantum Mechanics - Mathematical Formalism]] — The Hilbert space formalism and perturbation theory

## See Also

- [[Gauge Theory - Overview]] — Local symmetry principles that make QED internally consistent
- [[Standard Model and Gauge Groups]] — QED generalized to SU(3)×SU(2)×U(1)
