# Audit Report: Processing raw/Factor analysis.md

## Source

- **Raw file**: `Research/raw/Factor analysis.md`
- **Source URL**: https://www.pymc.io/projects/examples/en/latest/case_studies/factor_analysis.html
- **Content**: PyMC tutorial on factor analysis and probabilistic PCA (PPCA), covering model formulation, identifiability problems, constrained parametrisation, amortized inference, minibatch ADVI, and post-hoc factor score recovery.

## Notes Created

### 1. Factor Analysis and PPCA.md
- **Path**: `Research/Bayesian Statistics/Advanced Models/Factor Analysis and PPCA.md`
- **Role**: Main hub note for the topic. Covers model formulation, relation to PCA, identifiability problem, constrained parametrisation, amortized inference, post-hoc F recovery, reconstruction quality, and scalability comparison table.
- **Tags**: `source/ingested`, `topic/bayesian`, `topic/dimensionality-reduction`, `method/factor-analysis`, `method/ppca`
- **Wikilinks out**: Identifiability in Latent Variable Models, Amortized Inference, Post-hoc Factor Score Recovery, Nonparametric Models Overview, Generalized Linear Models, Approximation Methods, Confirmatory Factor Analysis and SEM, raw/Factor analysis

### 2. Identifiability in Latent Variable Models.md
- **Path**: `Research/Bayesian Statistics/Advanced Models/Identifiability in Latent Variable Models.md`
- **Role**: Atomic concept note on non-identifiability in latent variable models. Covers the rotational invariance problem, MCMC diagnostic symptoms, the constrained parametrisation fix (lower-triangular W with positive increasing diagonal), and PyMC implementation including `expand_packed_block_triangular`.
- **Tags**: `source/ingested`, `topic/bayesian`, `topic/identifiability`, `topic/latent-variables`, `method/factor-analysis`
- **Wikilinks out**: Factor Analysis and PPCA, Computational Troubleshooting, Confirmatory Factor Analysis and SEM

### 3. Amortized Inference.md
- **Path**: `Research/Bayesian Statistics/Advanced Models/Amortized Inference.md`
- **Role**: Atomic concept note on the amortized inference strategy. Covers motivation, the marginalization trick ($X \mid W \sim \mathcal{N}(0, WW^\top + \sigma^2 I)$), tradeoff table, PyMC implementation for both MCMC and minibatch ADVI, and usage guidelines.
- **Tags**: `source/ingested`, `topic/bayesian`, `topic/scalability`, `topic/variational-inference`, `method/amortized-inference`
- **Wikilinks out**: Post-hoc Factor Score Recovery, Factor Analysis and PPCA, Approximation Methods, Efficient MCMC

### 4. Post-hoc Factor Score Recovery.md
- **Path**: `Research/Bayesian Statistics/Advanced Models/Post-hoc Factor Score Recovery.md`
- **Role**: Atomic concept note on recovering factor scores after amortized inference. Covers conjugate posterior derivation, xarray-einstats implementation, reconstruction check, and practical notes on uncertainty propagation.
- **Tags**: `source/ingested`, `topic/bayesian`, `topic/latent-variables`, `topic/conjugate-prior`, `method/factor-analysis`
- **Wikilinks out**: Amortized Inference, Factor Analysis and PPCA, Probability and Bayesian Inference, Multiparameter Models

### 5. _Index.md (updated)
- **Path**: `Research/Bayesian Statistics/Advanced Models/_Index.md`
- **Role**: Section index updated to include the three new atomic notes (Identifiability, Amortized Inference, Post-hoc Factor Score Recovery) alongside existing entries.

## Structure Decisions

- **Atomic decomposition**: The raw tutorial was split into one hub note (Factor Analysis and PPCA) and three atomic concept notes. The hub provides the full picture; the atomic notes are reusable concepts that apply beyond just factor analysis (e.g., identifiability applies to mixture models, amortized inference applies to VAEs).
- **Folder placement**: All notes placed in `Research/Bayesian Statistics/Advanced Models/` to match the existing `Factor Analysis and PPCA.md` location in the vault.
- **Frontmatter conventions**: Followed vault patterns -- `source/ingested` tag, `raw` field linking to source, `date_ingested`, `aliases`, `folder` field.
- **Wikilinks**: Cross-linked to existing vault notes (Approximation Methods, Computational Troubleshooting, Generalized Linear Models, etc.) and between the new notes.
- **Code preservation**: Key PyMC code snippets retained where they illustrate implementation patterns (makeW, expand_packed_block_triangular, amortized model, xarray-einstats post-hoc recovery).
- **Callouts**: Used `> [!abstract]`, `> [!warning]`, and `> [!tip]` callouts matching vault style.

## Files Summary

| File | Type | Lines |
|------|------|-------|
| Factor Analysis and PPCA.md | Hub note | ~120 |
| Identifiability in Latent Variable Models.md | Atomic concept | ~100 |
| Amortized Inference.md | Atomic concept | ~95 |
| Post-hoc Factor Score Recovery.md | Atomic concept | ~90 |
| _Index.md | Section index | ~40 |
| **Total** | **5 files** | **~445** |
