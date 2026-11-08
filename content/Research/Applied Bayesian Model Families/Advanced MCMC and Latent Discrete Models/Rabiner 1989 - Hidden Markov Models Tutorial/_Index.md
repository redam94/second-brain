---
title: "Index: Rabiner 1989 - Hidden Markov Models Tutorial"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Advanced MCMC and Latent Discrete Models]]"
date_updated: 2026-11-08
concept_count: 14
---

# Rabiner 1989 - Hidden Markov Models Tutorial

> [!abstract] Routing Summary
> This folder fully captures Rabiner (1989), *A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition* (Proc. IEEE 77(2):257-286): Markov chains and the HMM definition, forward-backward, posterior decoding, Viterbi, Baum-Welch, model types, durations, scaling and multiple sequences, initialisation, speech applications and Tables 1-2. 8 notes. Motivating PyMC examples: E24, E48, E59, E57. The scanned PDF has no text layer; pages were read visually.
> - Need the paper on one page or the section map? → [[Rabiner 1989 - HMM Tutorial - Overview]]
> - Need the HMM definition, three problems, weather example or geometric duration? → [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]]
> - Need the forward/backward algorithm, its cost, or the numpy/PyMC forward? → [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]
> - Need $\gamma$, posterior decoding or Viterbi? → [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]
> - Need Baum-Welch formulas, EM interpretation or a numpy run? → [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]
> - Need left-right/ergodic models, mixtures, AR-HMM, duration HMMs or MMI/MDI? → [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]]
> - Need scaling, multiple sequences, initial estimates or smoothing with little data? → [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]
> - Need speech applications, Tables 1-2 or the limitations of HMMs? → [[Rabiner 1989 - Speech Recognition Applications and Results]]
> - Need label switching, NHMMs, movement HMMs or dwell times in a Bayesian setting? → [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| HMM $\lambda=(A,B,\pi)$ | [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]] | definition | — | observation is a probabilistic function of a hidden chain |
| Geometric dwell | [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]] | definition | Markov chain | $\bar d_i=1/(1-a_{ii})$ |
| Forward algorithm | [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]] | theorem | HMM | $O(N^2T)$ vs $O(TN^T)$ |
| Backward variable | [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]] | definition | forward | $\beta_t(i)$ recursion |
| State posterior $\gamma$ | [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]] | definition | [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]] | $\alpha\beta/P(O|\lambda)$ |
| Viterbi | [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]] | theorem | forward | single best path by DP |
| Baum-Welch | [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]] | theorem | [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]] | EM; monotone likelihood, local maxima |
| Left-right / ergodic | [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]] | definition | HMM | $a_{ij}=0$ for $j<i$ |
| Explicit duration HMM | [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]] | theorem | forward | $D^2/2$ cost factor |
| Scaling | [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]] | theorem | forward-backward | $\log P=-\sum\log c_t$ |
| Multiple sequences | [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]] | theorem | Baum-Welch | weight by $1/P_k$ |
| Table 1 isolated digits | [[Rabiner 1989 - Speech Recognition Applications and Results]] | example | HMM/CD | 0.2-1.8% error |
| Table 2 connected digits | [[Rabiner 1989 - Speech Recognition Applications and Results]] | example | level building | 0.78-2.94% (UL) test |
| Limitations of HMMs | [[Rabiner 1989 - Speech Recognition Applications and Results]] | concept | — | independence, emission and Markov assumptions |

## Notes

- [[Rabiner 1989 - HMM Tutorial - Overview]] — CONTAINS: research question, contributions, headline result, Source Map, PyMC examples, marketing relevance.
- [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]] — CONTAINS: Markov chain; weather example; duration; coin/urn; elements of an HMM; three problems; code.
- [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]] — CONTAINS: Direct enumeration; forward and backward algorithms; identity; log-space numpy; PyMC scan sketch.
- [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]] — CONTAINS: State posterior; posterior decoding; Viterbi; decoder comparison; code.
- [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]] — CONTAINS: $\xi$, expected counts; Baum-Welch; EM; Lagrange characterisation; numpy run; EM vs Bayesian.
- [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]] — CONTAINS: Left-right; mixtures; AR-HMM; null/tying; explicit duration; MMI/MDI; distance.
- [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]] — CONTAINS: Scaling theorem; multiple sequences; initial estimates; insufficient data; scaling demo.
- [[Rabiner 1989 - Speech Recognition Applications and Results]] — CONTAINS: Isolated word and connected digit systems; LPC/VQ; k-means; duration postprocessor; Tables 1-2; limitations.

## Sources
- Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition — Rabiner LR (1989), Proc. IEEE 77(2):257-286, 30 pages (scanned; pp. 257-286 of the journal).

## See Also
- [[Model Building with Latent Variables - Animal Movement]], [[The Kalman Filter]], [[Marginal Likelihood via the Kalman Filter]], [[State-Space Models and the Kalman Filter - Overview]].
- [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]], [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]].
