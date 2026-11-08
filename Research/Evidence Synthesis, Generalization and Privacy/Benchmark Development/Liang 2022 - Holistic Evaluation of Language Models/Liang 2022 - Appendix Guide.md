---
title: "Liang 2022 - Appendix Guide"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Appendices A-J, pp. 118-162 (section-level summary only)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - HELM - Overview]]"
used_by: []
aliases:
  - HELM appendices
  - HELM appendix map
---

# Liang 2022 - Appendix Guide

> [!summary]
> The 45 pages of appendices (A-J, after the reference list) hold per-dataset details, formal metric definitions, perturbation lists, targeted-evaluation implementation, the comparison of 33 prior LM evaluations (405 datasets), known contamination evidence, a prioritization section, model provenance and adaptation defaults. This guide maps each appendix to the vault note that already captures its substance and flags what was summarized at section level only.

## Overview

Per the ingest scope, appendices are summarized at section level. Where the main text and an appendix overlap (formal metric definitions in C, adaptation in J), the content is captured in full in the topical notes.

## Main Content

| Appendix | Content (section level) | Where captured |
|---|---|---|
| A. Author contributions | Who contributed what; lead authors and major contributors | not reproduced |
| B. Core scenarios (B.1 QA, B.2 IR, B.3 summarization, B.4 sentiment, B.5 toxicity detection, B.6 misc. classification) | Dataset-by-dataset construction, sizes, prompts and examples | [[Liang 2022 - Core Scenarios and Dataset Selection]] (selection rationale and problem settings); per-dataset statistics not reproduced |
| C. General metrics (C.1 accuracy, C.2 calibration and uncertainty, C.3 robustness, C.4 fairness, C.5 bias and stereotypes, C.6 toxicity, C.7 efficiency) | Formal definitions and estimators | [[Liang 2022 - The Seven Metrics]] (accuracy table, ECE and selective classification, worst-case robustness, TVD bias, efficiency formulas) |
| C.7 efficiency estimation details (Table 9) | Worked energy and CO$_2$ estimates by model | summarized below |
| D. Perturbations (D.1 robustness; D.2 fairness) | Robustness perturbations (D.1; natural, NL-Augmenter based): lowercase, contractions and expansions, common misspellings (from Wikipedia's list), extra spaces, and related typo-style changes. Fairness perturbations (D.2), applied deterministically to the input and matched in the reference: SAE to AAE dialect lexical mapping (Ziems et al. 2022), gender-pronoun conversion (Lauscher et al. 2022), gender-term conversion (Garg et al. 2018, Bolukbasi et al. 2016), and first-name conversion by race or gender (Caliskan et al. 2017; US-Census-derived associations that may not be time-invariant). The authors expect these to overestimate disparities, which helps highlight fairness concerns | [[Liang 2022 - The Seven Metrics]] (principles); word lists not reproduced |
| E. Targeted evaluations (E.1 language, E.2 knowledge with Wikidata relation tables 10-11, E.3 reasoning, E.4 memorization and copyright, E.5 disinformation, E.6 bias, E.7 toxicity) | Implementation detail, prompts, WikiFact relations and templates | [[Liang 2022 - Targeted Evaluations]] |
| F. Comparison with other evaluations (Table 12) | 33 prominent LM evaluations enumerating 405 datasets; a 405 x 33 binary matrix on GitHub; documents low and uneven overlap between models' evaluations | [[Liang 2022 - HELM - Overview]] (17.9% vs 96.0% coverage) |
| G. Contamination (Table 13) | Evidence of train-test contamination disclosed by model creators; a consequentialist view (focus on whether validity is compromised, independent of intent) | [[Liang 2022 - Models and Adaptation via Prompting]] |
| H. Priority system | Handling the benchmark's large computational cost (numerous queries per model) by prioritizing runs | not detailed here; consult the PDF |
| I. Models | Provenance of each of the 30 models (J-1, Anthropic-LM, BLOOM, T0++, Cohere, GPT-J, GPT-NeoX, T5, UL2, OPT, TNLG v2, GPT-3 and InstructGPT variants, Codex, GLM, YaLM) | [[Liang 2022 - Models and Adaptation via Prompting]] (Table 5) |
| J. Adaptation (J.1 formatting test instances, J.2 formatting the rest of the prompt, J.3 decoding parameters, J.4 adaptation methods; Table 14 defaults) | Detailed prompt construction and per-scenario defaults | [[Liang 2022 - Models and Adaptation via Prompting]] |

### Notable specifics from the appendices read

- **Training-emissions estimates (Table 9 and C.7).** Using $e=n\cdot W\cdot t\cdot\text{PUE}$ with PUE $=1.1$: davinci (175B) estimated at 10,000 V100s (330 W average draw), 79.2 MWh/day, 87.12 MWh/day with PUE, 429 gCO$_2$/kWh; TNLG v2 (530B): 36 days $\times$ 24 h $\times$ 4,480 A100s $\times$ 0.4 kW $\times$ 1.1 $\approx$ 1,703.1 MWh, 405.3 tCO$_2$ at 0.238 kg/kWh (California); OPT-175B: 33 days, 992 A100s, 345.7 MWh, 127.2 tCO$_2$ (367.8 g/kWh); OPT-66B: 33 days, 512 A100s, 178.4 MWh, 65.6 tCO$_2$; YaLM: 65 days, 800 A100s, 549.1 MWh, 196.0 tCO$_2$ (357 g/kWh); BLOOM: 117 days, 384 A100s, 474.4 MWh, 30.4 tCO$_2$ (64 g/kWh, France). The paper stresses these are rough estimates, likely underestimates (no CPU accounting; no life-cycle chip emissions).
- **Default multiple-choice adaptation (J.4).** Follow prior work where one method is established; otherwise default to **joint** unless the choices are natural continuations of the input (for example HellaSwag), in which case use **separate**. Reasons for preferring joint: one query per question rather than per choice, usable in-context examples, and direct comparison of choices (handles "none of the above").
- **In-context example policy (J.2).** 5 examples by default, adaptively fewer for long examples relative to the model's window; class-coverage selection in order of decreasing class frequency; examples fixed across instances; 3 repetitions for variance.
- **Decoding (J.3).** Temperature, stop condition (max tokens and stop sequences) and number of completions; temperature 0 corresponds to argmax decoding.

## Examples

> [!example] Reproducing one emissions estimate
> TNLG v2 (530B): 36 days $\times$ 24 h $=864$ h; GPUs $=4{,}480$ A100s at 0.4 kW $=1{,}792$ kW; energy $=864\times1792\times1.1\approx1{,}703{,}000$ kWh $=1{,}703.1$ MWh (matches). Emissions $=1{,}703{,}000\ \text{kWh}\times0.238\ \text{kg/kWh}\approx405{,}300$ kg $=405.3$ tCO$_2$. ^ex-emissions-check

```python
def training_emissions(days, n_gpu, kw, pue, kg_per_kwh):
    kwh = days*24*n_gpu*kw*pue
    return kwh/1000, kwh*kg_per_kwh/1000   # MWh, tonnes CO2

print(training_emissions(36, 4480, 0.4, 1.1, 0.238))   # (1703.1, 405.3)
print(training_emissions(33, 992, 0.4, 1.1, 0.3678))   # (345.7, 127.1); the paper prints 127.2 (rounding of intermediate values)
print(training_emissions(117, 384, 0.4, 1.1, 0.064))   # (474.4, 30.4)
```

## Connections

- Formal metric definitions: [[Liang 2022 - The Seven Metrics]].
- Gaps and caveats: [[Liang 2022 - Related Work, Missing Pieces and Limitations]].
- Scaling and compute accounting context: [[Neural Scaling Laws]].

**Relevance to marketing measurement.** The emissions worked example is a transparent template for reporting the computational cost of a measurement pipeline (sampler hours times power times PUE times grid intensity).

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Models and Adaptation via Prompting]]
