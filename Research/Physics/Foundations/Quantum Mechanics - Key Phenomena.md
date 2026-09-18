---
title: "Quantum Mechanics - Key Phenomena"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - type/concept
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Overview section — wave-particle duality, tunneling, entanglement, Bell; Philosophical implications"
date_ingested: 2026-04-11
folder: "Physics/Foundations"
doc_type: article
depends_on:
  - "[[Quantum Mechanics - Overview]]"
  - "[[Quantum Mechanics - Mathematical Formalism]]"
used_by:
  - "[[Quantum Field Theory - Overview]]"
aliases:
  - wave-particle duality
  - quantum entanglement phenomena
  - Bell theorem
---

# Quantum Mechanics - Key Phenomena

> [!summary]
> Quantum mechanics produces a suite of non-classical, experimentally confirmed phenomena: wave-particle duality (particles interfere like waves), quantum tunneling (particles cross classically-forbidden barriers), quantum entanglement (non-local correlations), and the violation of Bell inequalities (ruling out local hidden-variable theories). These are consequences of the [[Quantum Mechanics - Mathematical Formalism|Hilbert space formalism]].

## Wave-Particle Duality

> [!definition] Wave-Particle Duality
> Quantum objects (electrons, photons, even molecules) exhibit both particle-like and wave-like properties depending on what is measured. A single particle can produce an interference pattern when not observed, but registers as a discrete hit on a screen. The de Broglie relation connects wavelength to momentum:
> $$\lambda = \frac{h}{p}$$
^def-wave-particle

### Double-Slit Experiment

The canonical demonstration:
1. A coherent beam illuminates two parallel slits
2. Without detectors at slits: interference pattern appears on the screen (wave behavior)
3. With detectors at slits: each particle passes through exactly one slit; interference pattern disappears (particle behavior)

**Interpretation**: The particle does not have a definite path until measured. The act of observation collapses the superposition of paths.

## Quantum Tunneling

> [!definition] Quantum Tunneling
> A particle can cross a potential barrier even when its kinetic energy is less than the barrier height — classically impossible.
> The wave function has nonzero amplitude inside and beyond the barrier; the probability of tunneling decreases exponentially with barrier thickness and height.
^def-tunneling

**Applications**: radioactive decay, nuclear fusion in stars, scanning tunneling microscopy, tunnel diodes, flash memory.

## Quantum Entanglement

> [!definition] Bell's Theorem
> If nature operates according to any theory with **local hidden variables** (hidden variables that cannot influence distant systems faster than light), then correlations between measurements on entangled particles must satisfy the **Bell inequalities**. Quantum mechanics predicts violations of these inequalities for entangled states.
>
> **Experimental result**: Multiple independent Bell tests have confirmed that Bell inequalities are violated, ruling out all local hidden-variable theories.
^thm-bell

**Practical consequences**:
- Quantum key distribution (QKD) uses entanglement for secure communication
- Superdense coding sends 2 classical bits using 1 qubit + shared entanglement
- Entanglement does **not** allow faster-than-light signaling (no-communication theorem)

## Quantum Decoherence

> [!definition] Quantum Decoherence
> When a quantum system interacts with its environment, its quantum superpositions become effectively classical mixtures. This explains why macroscopic objects do not exhibit quantum interference:
> - Superpositions → probabilistic mixtures
> - Quantum correlations → classical correlations
>
> Coherence is suppressed at macroscopic scales. Near absolute zero, macroscopic quantum effects can persist (e.g., superconductivity, superfluidity).
^def-decoherence

## Quantum Interpretations

| Interpretation | Key Claim | Wave-Function Collapse |
|---------------|-----------|----------------------|
| Copenhagen | Probability is fundamental; QM is complete | Real upon measurement |
| Many-worlds (Everett) | All outcomes occur in parallel universes | Never occurs |
| Bohmian mechanics | Deterministic with hidden particle positions; explicitly nonlocal | Never; pilot wave guides particle |
| QBism | Wave function = agent's beliefs; measurement = updating beliefs | Epistemic update |

**Famous quotes on interpretation**:
- Feynman: "I think I can safely say that nobody understands quantum mechanics."
- Weinberg: "There is now in my opinion no entirely satisfactory interpretation of quantum mechanics."

## EPR Paradox and Bell's Theorem

In 1935, Einstein, Podolsky, and Rosen (EPR) argued: if quantum mechanics is complete, and locality holds, then there must be "elements of physical reality" (hidden variables) not described by the wave function.

In 1964, Bell showed EPR's locality + determinism → Bell inequalities on measurable correlations. Quantum mechanics predicts violations.

> [!example] CHSH Inequality
> The CHSH (Clauser-Horne-Shimony-Holt) version of Bell's inequality states that for any local hidden-variable theory:
> $$|S| = |E(a,b) - E(a,b') + E(a',b) + E(a',b')| \leq 2$$
> Quantum mechanics predicts $|S|_{\text{max}} = 2\sqrt{2} \approx 2.83$ for appropriate measurement settings on maximally entangled states. Experiments consistently find violations, $|S| > 2$.
^ex-chsh

## Connections

- [[Quantum Mechanics - Mathematical Formalism]] — The formalism that produces these phenomena
- [[Quantum Mechanics - Overview]] — Historical and conceptual context
- [[Quantum Field Theory - Overview]] — Relativistic extension; particle creation/annihilation; virtual particles

## See Also

- [[Gauge Theory - Overview]] — Symmetry principles underlying QFT interactions
- [[QED and Renormalization]] — Quantization of electromagnetic field; virtual photons
