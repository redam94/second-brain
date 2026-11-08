---
title: "Index: Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Counting the Unobserved]]"
date_updated: 2026-11-08
concept_count: 4
---

# Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models

> [!abstract] Routing Summary
> Full capture of Aleshin-Guendel (arXiv:2008.09865): identifiability of latent class models for multiple-systems estimation, standing in for Manrique-Vallier (2016). 4 notes.
> - One-page summary and source map? -> [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]
> - $M_{th}$ model, likelihood factorisation, Definition 1? -> [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]
> - Lemma 1 and Theorem 1 (moments)? -> [[Aleshin-Guendel 2020 - Mixed-Moments Theorem]]
> - Theorem 2 ($2J\le K$), Table 1, LCMCR implications? -> [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| $M_{th}$ model | [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]] | definition | - | latent $\lambda_i\sim Q$ |
| Identifiability (Def. 1) | [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]] | definition | likelihood | $\tilde\pi_Q=\tilde\pi_R\Rightarrow\pi_{Q,0}=\pi_{R,0}$ |
| Lemma 1, Theorem 1 | [[Aleshin-Guendel 2020 - Mixed-Moments Theorem]] | theorem | Def. 1 | proportional moments |
| Theorem 2 | [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] | theorem | Theorem 1 | identifiable iff $2J\le K$ |
| Table 1 counterexample | [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] | example | Theorem 2 | $\pi_0=0.316$ vs $0.219$ |

## Notes

- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]] — CONTAINS: summary, swap rationale, E109/E69 links, Source Map.
- [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]] — CONTAINS: Eq. 1-3, Definition 1, $\mathcal Q_J$.
- [[Aleshin-Guendel 2020 - Mixed-Moments Theorem]] — CONTAINS: Lemma 1, Theorem 1 with proofs, $K=2$ check.
- [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]] — CONTAINS: Theorem 2 proof sketch, counterexample, Table 1 verified, LCMCR implications.

## Sources
- Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation — arXiv:2008.09865v1, 8 pp.

## See Also
- [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]], [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]], [[Concept - Unseen Species and Latent Class Links]].
