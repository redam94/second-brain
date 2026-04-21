---
title: "Renormalization"
tags:
  - source/ingested
  - topic/quantum-field-theory
  - topic/physics
  - type/concept
  - doc/article
source: "[[raw/Quantum field theory]]"
source_location: "History — Infinities and renormalization; Non-renormalizability"
date_ingested: 2026-04-16
folder: "Physics/Quantum Field Theory"
doc_type: article
depends_on:
  - "[[Canonical Quantization of Fields]]"
  - "[[QFT Overview]]"
used_by:
  - "[[Yang-Mills Theory and Gauge Fields]]"
aliases:
  - renormalization
  - UV divergence
  - running coupling
  - asymptotic freedom
---

# Renormalization

> [!summary]
> Perturbative calculations in QFT produce divergent (infinite) integrals corresponding to virtual particles with arbitrarily high momenta. Renormalization systematically removes these divergences by absorbing them into a redefinition of physical parameters (mass, charge). The result is a finite, predictive theory — and the celebrated prediction of the electron's anomalous magnetic moment demonstrates its extraordinary accuracy.

## Overview

When Dirac and others first computed higher-order corrections in QED, they found infinite results. For decades these infinities seemed to signal a breakdown of the theory. The breakthrough came around 1950: Schwinger, Feynman, Dyson, and Tomonaga showed that **all infinities in QED can be absorbed into the measured values of mass and charge** — a procedure called renormalization. This is now understood as reflecting the fact that physical parameters observed at low energies differ from "bare" parameters in the Lagrangian due to quantum corrections.

## The Problem: UV Divergences

In perturbation theory, higher-order Feynman diagrams involve **loop integrals** over all internal momenta:
$$\int_0^\infty d^4k \, (\text{propagator})^n$$
These integrals often diverge as $k \to \infty$ — these are **ultraviolet (UV) divergences**. They arise because QFT assumes the theory is valid at all energy scales, which is physically unreasonable.

**Examples of divergent quantities:**
- Electron self-energy: $m_\text{phys} - m_\text{bare} \to \infty$
- Vacuum polarization (photon self-energy)
- Vertex corrections

## The Solution: Renormalization

> [!definition] Renormalization
> Renormalization is the procedure of systematically removing UV divergences by:
> 1. **Regularization**: Introduce a cutoff $\Lambda$ (or use dimensional regularization) to make integrals finite
> 2. **Absorb divergences**: Rewrite the Lagrangian as $\mathcal{L} = \mathcal{L}_\text{ren} + \mathcal{L}_\text{counter}$, where counter-terms cancel the divergences
> 3. **Renormalization conditions**: Fix the finite parts by requiring physical parameters (mass, charge) match their measured values
> 4. **$\Lambda \to \infty$**: Take the limit; all physical predictions are finite
^def-renormalization

As Tomonaga explained: "The mass and charge observed in experiments are not the original \[bare\] mass and charge but the mass and charge as modified by field reactions, and they are finite."

### Renormalizability

Not all QFTs can be renormalized. Dyson proved in 1949:

> [!theorem] Dyson's Renormalizability Criterion
> A theory is **renormalizable** if all UV divergences can be absorbed into a finite number of redefinitions of physical parameters. This requires that all coupling constants have non-negative mass dimension.
^thm-renormalizability

- **Renormalizable**: QED, QCD, electroweak theory, $\phi^4$ theory
- **Non-renormalizable**: Fermi theory of the weak interaction, general relativity as a QFT

Non-renormalizability doesn't mean a theory is wrong — it means it is an effective field theory, valid only up to some energy scale.

## Running Coupling Constant

Renormalization reveals that coupling constants **depend on the energy scale** $\mu$ at which they are measured. This is the **running coupling**:
$$\frac{d\alpha}{d\ln\mu} = \beta(\alpha)$$
where $\beta(\alpha)$ is the beta function, computed from loop diagrams.

> [!definition] Asymptotic Freedom
> In **QCD** (the theory of the strong force), the coupling constant $\alpha_s$ *decreases* as energy increases:
> $$\alpha_s(\mu) \to 0 \text{ as } \mu \to \infty$$
> This is called **asymptotic freedom**, discovered by Gross, Wilczek, and Politzer (1973 Nobel Prize). At high energies, quarks interact weakly and perturbation theory is valid; at low energies, the coupling is large — quarks are confined inside hadrons.
^def-asymptotic-freedom

Conversely, in QED, the fine-structure constant $\alpha$ increases at higher energies (Landau pole), but this is at energy scales far beyond any experiment.

## Key Prediction: Anomalous Magnetic Moment

The most precise test of QFT: the electron's **anomalous magnetic moment** $a_e = (g-2)/2$.

| Order | QED prediction | Experimental value |
|---|---|---|
| 1-loop | $\alpha/(2\pi) \approx 0.00116$ | — |
| 5-loop | $a_e \approx 0.00115965218073$ | $0.00115965218059 \pm 0.00000000000028$ |

Agreement to 12 significant figures — the most precise prediction in all of science.

## The Lamb Shift

The Lamb shift (1947) was the experimental trigger for renormalization:
- Lamb and Retherford measured a tiny energy difference between $2S_{1/2}$ and $2P_{1/2}$ levels in hydrogen that should be degenerate by the Dirac equation
- Bethe estimated this shift by noting that virtual photons with energies above the electron mass contribute negligibly; Schwinger/Feynman made it exact
- This confirmed that **vacuum fluctuations are real** and that renormalized QFT is predictive

## Connections

- **[[Canonical Quantization of Fields]]**: Loop integrals over virtual quanta (created and destroyed by ladder operators) produce the divergences that renormalization cures.
- **[[Gauge Theory Overview]]**: Ward identities in gauge theories constrain the renormalization; they ensure that gauge invariance is preserved after renormalization.
- **[[Yang-Mills Theory and Gauge Fields]]**: Non-abelian gauge theories are renormalizable ('t Hooft, 1971); asymptotic freedom makes QCD tractable.

## See Also

- [[QFT Overview]] — broader context for renormalization
- [[Canonical Quantization of Fields]] — source of the divergent integrals
- [[Yang-Mills Theory and Gauge Fields]] — asymptotic freedom in QCD
