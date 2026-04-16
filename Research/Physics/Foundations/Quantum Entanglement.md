---
title: "Quantum Entanglement"
tags:
  - source/ingested
  - topic/quantum-mechanics
  - topic/physics
  - type/concept
  - doc/article
source: "[[raw/Quantum mechanics]]"
source_location: "Composite systems and entanglement"
date_ingested: 2026-04-16
folder: "Physics/Foundations"
doc_type: article
depends_on:
  - "[[Wave Function and Hilbert Space]]"
used_by:
  - "[[QFT Overview]]"
aliases:
  - entanglement
  - Bell's theorem
  - quantum decoherence
---

# Quantum Entanglement

> [!summary]
> Quantum entanglement occurs when two systems interact such that the joint state cannot be written as a product of individual states. Entangled systems exhibit non-classical correlations; Bell's theorem proves these correlations cannot be explained by any local hidden-variable theory. Entanglement is the key resource in quantum computing and quantum communication.

## Overview

When two quantum systems combine, the state of the composite system lives in the **tensor product** of their individual Hilbert spaces. Not all composite states are separable (product states) — the superposition principle allows entangled states where measuring one subsystem instantly affects the statistics of the other, regardless of distance. This seemingly paradoxical feature (which Einstein called "spooky action at a distance") is now experimentally confirmed.

## Composite Systems

> [!definition] Tensor Product Hilbert Space
> For two quantum systems $A$ and $B$ with Hilbert spaces $\mathcal{H}_A$ and $\mathcal{H}_B$, the combined system has Hilbert space:
> $$\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B$$
> If system $A$ is in state $\psi_A$ and system $B$ in state $\psi_B$, the combined state is the **product state** $\psi_A \otimes \psi_B$.
^def-tensor-product

## Entangled States

> [!definition] Entanglement
> A state $\Psi \in \mathcal{H}_{AB}$ is **entangled** if it cannot be written as a product state $\psi_A \otimes \psi_B$. For example, if $\psi_A, \phi_A \in \mathcal{H}_A$ and $\psi_B, \phi_B \in \mathcal{H}_B$ are valid states, then:
> $$\Psi = \frac{1}{\sqrt{2}}\left(\psi_A \otimes \psi_B + \phi_A \otimes \phi_B\right)$$
> is a valid joint state that is **not separable** — it is entangled.
^def-entanglement

For an entangled state, it is **impossible** to describe either subsystem $A$ or $B$ by a state vector alone. One must use a **reduced density matrix** $\rho_A = \text{tr}_B(\Psi\Psi^\dagger)$, which is obtained by tracing over the other system. Knowing $\rho_A$ and $\rho_B$ individually does not reconstruct $\Psi$.

## Bell's Theorem

> [!theorem] Bell's Theorem
> If nature operates according to any theory of *local* hidden variables, then the predictions of that theory are constrained in a quantifiable way (Bell inequalities). Quantum mechanics predicts — and experiments confirm — violations of these inequalities. Therefore, quantum correlations cannot be explained by any local hidden-variable theory.
^thm-bells-theorem

Bell tests (experiments testing Bell inequalities) have been performed many times; results are consistently incompatible with local hidden variables. This means that the non-classical correlations of entanglement are a fundamental feature of nature, not an artifact of incomplete knowledge.

**Key implication**: Entanglement does NOT allow faster-than-light communication (proven by the no-communication theorem) — but it does allow correlations that cannot be explained classically.

## Quantum Decoherence

When a quantum system interacts with its environment, it becomes entangled with that environment — a process called **quantum decoherence**. The system's quantum superpositions effectively disappear (from the perspective of measurements on the system alone), explaining why macroscopic objects do not exhibit quantum behavior.

> [!definition] Decoherence
> A quantum system interacting with an environment $E$ evolves from:
> $$\psi_\text{system} \otimes \psi_E \quad\to\quad \sum_n c_n\, \phi_n^\text{system} \otimes \phi_n^E$$
> After tracing out the environment, the reduced density matrix of the system becomes approximately diagonal in the "pointer basis", suppressing quantum interference terms.
^def-decoherence

## Applications

| Application | Role of Entanglement |
|---|---|
| Quantum computing | Entangled qubits provide exponential parallelism for certain problems |
| Quantum key distribution | Entangled pairs enable cryptographic security based on physics |
| Superdense coding | 1 entangled pair + 1 qubit transmits 2 classical bits |
| Quantum teleportation | Transfer quantum state using classical bits + shared entanglement |

## Connections

- **[[Wave Function and Hilbert Space]]**: Entanglement is a direct consequence of the tensor-product structure of composite Hilbert spaces and the superposition principle.
- **[[QFT Overview]]**: Quantum field theory treats entanglement at the level of field modes; vacuum entanglement plays a role in Hawking radiation and the Unruh effect.

## See Also

- [[Wave Function and Hilbert Space]] — the state formalism underlying entanglement
- [[QFT Overview]] — entanglement in the field-theory context
