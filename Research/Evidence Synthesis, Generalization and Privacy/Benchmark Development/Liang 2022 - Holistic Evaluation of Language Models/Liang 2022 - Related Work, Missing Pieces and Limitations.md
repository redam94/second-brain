---
title: "Liang 2022 - Related Work, Missing Pieces and Limitations"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 9 Related work and discussion, Sec. 10 What is missing, Sec. 11 Limitations and future work, Sec. 12 Conclusion, pp. 75-84"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - HELM - Overview]]"
  - "[[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]"
used_by: []
aliases:
  - HELM limitations
  - HELM what is missing
  - HELM design checklist and gaps
  - HELM related work
---

# Liang 2022 - Related Work, Missing Pieces and Limitations

> [!summary]
> HELM situates itself among benchmarks that assign a single score (ImageNet, SQuAD), a score vector (GLUE, SuperGLUE, GEM, XTREME) or large dataset collections (GPT-3 suite, EleutherAI harness, BIG-bench), and differs by a taxonomy-first, multi-metric, standardized design that outputs a score matrix. It lists what is missing across scenarios, metrics, targeted evaluations, models and adaptation, and states three result limitations (relevance, generalizability including contamination, adaptation dependence), plus validity and reliability caveats and a Strathern's-law warning. Conclusion: transparency begets trust and standards.

## Overview

The closing sections are as important to the benchmark design as the experiments, because HELM's third principle ("recognition of incompleteness") obliges it to report its own gaps.

## Main Content

### Section 9: related work and position

- **Language modeling lineage.** From Shannon (1948) and Hale/Levy psycholinguistics through ELMo, GPT and BERT to foundation models; the evaluated models are viewed both as *foundation models* and as *natural language interfaces* (text-to-text boxes).
- **Benchmarks in NLP.** Benchmarking became core methodology in the 1980s-90s (MUC, TREC, Penn Treebank). Deep-learning era: larger benchmarks serving training and evaluation (SNLI, SQuAD), paralleling ImageNet in vision, each assigning a *single score*. General-purpose models drove suites that assign a *vector of scores* (SentEval, decaNLP, GLUE, SuperGLUE; then GEM, XTREME, GEMv2) with an optional aggregate such as the GLUE score. LM evaluation uses broader collections: Brown et al. (2020) evaluated 42 datasets; EleutherAI harness, Hugging Face Evaluate, BIG-bench centralize them.
- **What differs.** "Our concrete benchmark differs from both traditional benchmarks like ImageNet that assign a single score ... and meta-benchmarks like GLUE that assign a score vector ... Instead, we assign a score matrix to each model: for each use case, we report scores across several desiderata." The distinguishing process is the explicit two-step approach (taxonomize, then select), which also yields the list of what is missing. Appendix F compares to 33 prominent LM evaluations spanning 405 datasets in all. HELM's codebase integrates all BIG-bench scenarios, augmented with metrics beyond accuracy.

### Section 10: what is missing

> [!definition] Priorities by axis
> The paper organizes gaps along the five axes of the design: (i) scenarios, (ii) metrics, (iii) targeted evaluations, (iv) models, (v) adaptation. ^def-missing-axes

1. **Scenarios.** *Tasks*: other tasks may be more discriminative or consequential (parsing, NLI, data-to-text generation, a self-identified oversight); new tasks appear from deployment (copy-writing, story and email generation). *Domains*: what (biomedical and clinical, financial, education, customer service not covered; LegalSupport has limited realism), when (language, knowledge and society change; StreamingQA; historic and ancient texts), who (age, socioeconomic status absent; metadata may conflict with speaker privacy; native versus non-native speakers; caste in India). *Languages*: English only; improve coverage of English varieties in consequential use cases rather than only language modeling; cultural sensitivity.
2. **Metrics.** Table 3 desiderata not measured. Priorities: user experience (models as interfaces), linguistic plausibility, provenance/credibility. For measured metrics: realistic perturbation generation (Dhole et al. 2021; Ziems et al. 2022), availability of contrast sets and demographic metadata, unverified validity of bias measures, reliance on PerspectiveAPI despite flaws (desire for protocols reflecting different groups' perspectives), and disclosure needed for efficiency measurement.
3. **Targeted evaluations.** Missing capabilities (planning) and harms (spam and fraud generation; dehumanization, denigration, condescension). Improvements: pragmatics and discourse for language; deeper domain knowledge and social and cultural knowledge (SocialIQA) for knowledge; broader domain-specific and multi-hop reasoning (HotPotQA); privacy (PII) and knowledge of training data for copyright; trained annotators and user studies for disinformation; context-situated bias and toxicity.
4. **Models.** (a) Accessible but unevaluated models (Galactica released on the same day; Flan-T5, Tk-Instruct, BLOOMZ; newer commercial APIs); (b) disclosed but inaccessible (Gopher, Chinchilla, LaMDA, PaLM, U-PaLM) with a recommendation of developer-mediated research access; (c) undisclosed models, raising the question of how to benchmark models whose existence is unknown.
5. **Adaptation.** Chain-of-thought and other prompting strategies, parameter-efficient methods (adapters), fine-tuning, interoperability across scenarios, metrics and models, tracking resources and access level for fair comparison, and non-ML adaptation (new interaction modes, continual learning).

### Section 11: limitations

*Of the results.*
1. **Relevance to practical use.** Real deployments specialize models (fine-tune on much more than 5 examples). GPT-J (6B) performs poorly but may suit contexts with limited hardware and in-distribution data. Practitioners should first identify scenarios and metrics pertinent to their use and prioritize them.
2. **Generalizability.** Contamination undermines validity; documented evidence in Appendix G is limited.
3. **Adaptation.** Trends depend on prompting; fine-tuning or optimized prompts may differ; low-level decisions such as decoding hyperparameters were not studied.

*Of the implementation (11.2).* Mainly the lack of coverage of what is missing; the holistic approach generalizes to other modalities (sign, speech, images, code, video, proteins; Tamkin et al.).

*Of the design (11.3): validity and reliability.* In measurement modeling terms (Loevinger, Messick, Jacobs and Wallach), many datasets can instantiate a scenario but differ in how well they reflect the construct, and no unified standard ensures dataset validity. Because benchmarks incentivize optimization, validity is critical in light of **Strathern's Law** ("When a measure becomes a target, it ceases to be a good measure"; also Goodhart 1984). Reliability: measures should not be overly sensitive to annotators or other undesired variation; uniform evidence is lacking.

### Section 12: conclusion

Transparency begets trust and standards. Benchmarks are "models for social change" that set the agenda; benchmark design confers power and tends to come from privileged, high-resourced institutions (Koch et al. 2021), including this work from CRFM at Stanford. The authors therefore foreground design decisions and limitations, release open-source tools and raw predictions, encourage community-driven benchmarks "holistic, pluralistic and democratic" (Birhane et al. 2022), and hope holistic evaluation extends to other foundation models.

## Examples

> [!example] Applying HELM's design principles to a new domain
> A checklist derived from the paper's own method: (1) define the taxonomy of use cases and desiderata first; (2) select a minimal covering set, preferring user-facing cases and datasets carrying auxiliary structure for extra metrics; (3) measure every desideratum for every selected use case where well-defined; (4) fix and report the adaptation (prompt, seeds, decoding) and repeat to estimate variance; (5) flag known contamination and model versions; (6) publish raw outputs; (7) publish an explicit "missing" list and the validity caveats. ^ex-design-checklist

## Connections

- The "score single / vector / matrix" taxonomy places [[Deng 2009 - ImageNet - Overview]] and [[Wang 2018 - GLUE - Overview]] in the lineage.
- Strathern's Law and Goodhart: [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- Validity and reliability of measures: [[Model Validation and Interpretability - Overview]] and [[Forecast Evaluation and Backtesting]] for the time-series analogue.
- LLM evaluation practice: [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]].

**Relevance to marketing measurement.** The explicit "what is missing" ledger and the validity/reliability framing carry directly to publishing an MMM or incrementality benchmark: state which channels, regions, objectives and confounding structures are not represented, and which of the measures (for example ROAS bias) have unverified construct validity.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Appendix Guide]]
