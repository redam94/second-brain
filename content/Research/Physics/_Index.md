---
title: "Index: Physics"
tags:
  - type/index
  - source/ingested
  - topic/physics
parent: "[[Research/_Index|Research]]"
date_updated: 2026-09-18
concept_count: 14
---

# Physics

> [!abstract] Routing Summary
> This folder covers theoretical physics, from the foundations of quantum mechanics to quantum field theory and gauge theories. Contains 14 notes across 2 sub-topics. On 2026-09-18 the parallel `Theoretical Physics/` folder (a second ingest of the same three sources) was merged into this one: duplicate overviews were combined and the remaining notes moved into the sub-topics below.
> - Need quantum mechanics (overview, formalism, phenomena, wave functions, uncertainty, entanglement)? → [[Foundations/_Index|Foundations]]
> - Need quantum field theory, QED, renormalization, gauge theory, or the Standard Model? → [[Research/Physics/Quantum Field Theory/_Index|Quantum Field Theory]]

## Sub-topics

| Sub-topic | Notes | Domain |
|-----------|-------|--------|
| [[Foundations/_Index\|Foundations]] | 7 | QM overview, mathematical formalism, key phenomena, wave functions, Schrödinger equation, uncertainty principle, entanglement |
| [[Research/Physics/Quantum Field Theory/_Index\|Quantum Field Theory]] | 7 | QFT overview, canonical quantization, QED, renormalization, gauge theory, Yang–Mills, Standard Model |

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|------------|------------|
| QM big picture | [[Quantum Mechanics - Overview]] | overview | — | QM predicts probabilities; states live in Hilbert space |
| QM formalism | [[Quantum Mechanics - Mathematical Formalism]] | concept | [[Quantum Mechanics - Overview]] | Observables are Hermitian operators; Born rule |
| QM phenomena | [[Quantum Mechanics - Key Phenomena]] | concept | [[Quantum Mechanics - Overview]] | Duality, tunneling, Bell's theorem |
| Wave function & Hilbert space | [[Wave Function and Hilbert Space]] | definition | — | State as vector in $\mathcal{H}$; Born rule |
| Schrödinger equation | [[Schrödinger Equation and Time Evolution]] | theorem | [[Wave Function and Hilbert Space]] | $i\hbar\,\partial_t\psi = H\psi$ |
| Uncertainty principle | [[Uncertainty Principle]] | theorem | [[Wave Function and Hilbert Space]] | $\sigma_X\sigma_P \geq \hbar/2$ |
| Quantum entanglement | [[Quantum Entanglement]] | concept | [[Wave Function and Hilbert Space]] | Non-separable states; Bell's theorem |
| QFT overview | [[Quantum Field Theory - Overview]] | overview | [[Quantum Mechanics - Overview]] | Fields as operator-valued distributions; particles as excitations |
| Canonical quantization | [[Canonical Quantization of Fields]] | concept | [[Quantum Field Theory - Overview]] | Ladder operators; Fock space |
| QED and Feynman diagrams | [[QED and Renormalization]] | concept | [[Quantum Field Theory - Overview]] | QED accurate to 1 in $10^{12}$ |
| Renormalization | [[Renormalization]] | concept | [[Canonical Quantization of Fields]] | Remove UV divergences; running coupling |
| Gauge theory | [[Gauge Theory - Overview]] | overview | [[Quantum Field Theory - Overview]] | Local symmetry → gauge boson |
| Yang–Mills theory | [[Yang-Mills Theory and Gauge Fields]] | theorem | [[Gauge Theory - Overview]] | Non-abelian gauge fields |
| Standard Model | [[Standard Model and Gauge Groups]] | concept | [[Gauge Theory - Overview]] | $\text{U}(1)\times\text{SU}(2)\times\text{SU}(3)$ |

## Sources

- Quantum mechanics — Wikipedia: Quantum mechanics (2026-04-10)
- Quantum field theory — Wikipedia: Quantum field theory (2026-04-10)
- Gauge theory — Wikipedia: Gauge theory (2026-04-10)

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Probabilistic reasoning (conceptual bridge)
- [[Research/Category Theory/_Index|Category Theory]] — the mathematical language behind fiber bundles and symmetry
- [[Research/_Index|Research]] — Parent index
