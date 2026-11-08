---
title: "Liang 2022 - Experiments Meta-Analysis and Prompting Ablations"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 8.1 Meta-analysis (Figs. 24-30), Sec. 8.2 Prompting analysis (Figs. 31-33), pp. 47-60"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - The Seven Metrics]]"
  - "[[Liang 2022 - Models and Adaptation via Prompting]]"
  - "[[Liang 2022 - Findings 1 to 13 Core Scenarios]]"
used_by:
  - "[[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]"
aliases:
  - HELM meta-analysis
  - HELM win rate
  - HELM prompting analysis
  - HELM inter-metric correlations
---

# Liang 2022 - Experiments Meta-Analysis and Prompting Ablations

> [!summary]
> Section 8.1 analyzes the full results grid across models and metrics: accuracy, robustness and fairness are extremely correlated; calibration and bias relations are scenario-dependent; toxicity is near-constant; efficiency correlates weakly with accuracy. Head-to-head win rates rank models (text-davinci-002 wins accuracy comparisons more than 90% of the time). Section 8.2 quantifies how brittle the results are to prompt choices: seed variance, number of in-context examples, prompt formatting, and the multiple-choice adaptation method.

## Overview

The 30 models x 16 scenarios x 7 metrics grid is large enough to ask cross-cutting questions that single-metric benchmarks cannot answer: how do metrics relate? how do models compare head-to-head? how does accuracy relate to time, access, scale and perplexity? How sensitive is everything to adaptation?

## Main Content

### 8.1 Meta-analysis

**Inter-metric relationships.** Two resources: Fig. 24 plots accuracy against each of the six other metrics per scenario (calibration error ECE-10; bias in gender representation; denoised inference time for efficiency); Fig. 25 reports, per scenario, the Pearson correlation between each pair of metrics across models (Spearman gave qualitatively similar trends).

- *Accuracy, robustness, fairness*: "across all scenarios ... extremely strongly correlated". The authors note this is partly contingent on how robustness and fairness were measured; it aligns with Miller et al. (2021), who find in-domain and out-of-domain accuracy lie on a line. The result about fairness is "quite surprising" given prior work finds fairness-accuracy trade-offs, but their measurement and the few-shot prompting setting differ.
- *Calibration*: scenario-dependent, even for similar scenarios. For two commonsense QA scenarios: in OpenBookQA accuracy and calibration are positively related (correlation greater than 0.8), whereas in HellaSwag accuracy and *calibration error* are strongly correlated (greater than 0.85), i.e. higher accuracy goes with worse calibration. More robust and more fair models can be less well calibrated.
- *Generative harms*: toxicity correlations with other metrics are near zero on average because toxicity rates are low and constant (clear exception: NarrativeQA). Gender-representation bias shows positive correlation with accuracy and, on average across scenarios, a correlation above 0.5 with fairness: "models that tend to have better fairness performance ... tend to have worse gender bias". Bias and toxicity are sometimes anti-correlated (less gender-biased models more toxic in some scenarios), so measuring one harm is not enough and reducing one may have side effects on the other.
- *Efficiency*: weak correlations; no overarching accuracy-efficiency trade-off; scenario-dependent, especially for denoised time, which reflects input and output length distributions.

**Direct model comparisons (Fig. 26).**

> [!definition] Head-to-head win rate
> For a metric (for example accuracy), the win rate of model $m$ is the fraction of head-to-head comparisons against all other models, across all scenarios, in which $m$ is better on that metric:
> $$W_m=\frac{1}{S\,(M-1)}\sum_{s=1}^{S}\sum_{m'\ne m}\mathbb{I}\big[\text{metric}_s(m)\ \text{better than}\ \text{metric}_s(m')\big],$$
> with $S$ scenarios and $M$ models (this formalizes the Fig. 26 caption: 1.0 if a model is highest for every scenario; 0.5 means a coin flip against a random scenario and a random second model). Efficiency is excluded from head-to-head comparisons, as it must be read together with accuracy. ^def-win-rate

- text-davinci-002 is clearly most accurate, winning more than 90% of head-to-head accuracy comparisons; TNLG v2 (530B) second; Anthropic-LM v4-s3 (52B) third. Since the first and third share instruction tuning but differ more than 10x in size from TNLG v2, instruction-tuning and human feedback look efficient.
- *Thresholding by scale*: every model with accuracy win rate clearly above chance (55% or more) has more than 50B parameters; the one large outsider, YaLM (100B), has a win rate below 25%, possibly because of heavy training on Russian. Within the top ten, scale is less predictive of rank (BLOOM 176B and J1-Jumbo 178B at the bottom of the tier; Anthropic-LM 52B and Cohere xlarge 52.4B in the top half). Within a family, scale is perfectly monotonically related to accuracy win rate (OpenAI and Cohere variants). Poor small-model results mostly reflect prompting ill-suited to them (fine-tuning may suit them better).
- Robustness and fairness rankings resemble accuracy rankings, with exceptions (BLOOM relatively better on robustness and fairness than on accuracy; OPT and GLM swap positions). Toxicity and bias rankings differ: T0++ (11B) is the most toxic model yet among the three least gender-biased, while davinci (175B) is among the four most biased but one of the less toxic.

**Accuracy over time (Fig. 27).** GPT-3's release set a strong baseline above T5 (11B). Further upward movement mostly arrives with Anthropic-LM v4-s3 (52B), about 18 months later (December 2021), the first evaluated model using RLHF; NaturalQuestions shows a monotone improvement in between.

**Accuracy by access (Fig. 28).** Accuracy generally follows limited access > closed > open. The best public model is usually within 5 points of the best non-open model, with exceptions in knowledge-intensive scenarios (MMLU, NaturalQuestions closed-book, TruthfulQA) and both information retrieval scenarios. Caveats: some models undisclosed or disclosed late; Gopher, Chinchilla, PaLM not evaluated; no open model yet trained with significant RLHF.

**Predicting accuracy (Figs. 29-30).** Scale (parameters) agnostic to family is a poor, "chaotic" predictor of accuracy; jumps around 12B and 50B coincide with T0++ and Anthropic-LM and are confounded with training procedure. BPB on The Pile versus downstream accuracy is "similarly messy", confounded by contamination. Training FLOPs data was too sparse for an analysis.

### 8.2 Prompting analysis

Done on a subset of models (excluding commercial models for monetary cost and TNLG v2 for wait times).

- **Choice of in-context examples (Fig. 31).** With fixed examples per run and 3 seeds, the accuracy range (best minus worst) has median below 0.03 for 24 of 28 models (exceptions YaLM (100B), davinci (175B), curie (6.7B), ada (350M)). Some scenarios have high variance for all models: NaturalQuestions (open-book) median range 0.1730, for example davinci (175B) F1 of 0.376, 0.611, 0.636 across three example sets.
- **Number of in-context examples (Fig. 32).** Maximum $n\in\{0,1,2,4,8,16\}$ (fit as many as the window allows). Every model improves from $n=0$ to $n=1$ (sometimes from 0% accuracy), except CNN/DailyMail, where zero-shot is better for almost all models (perhaps one-shot poor reference summaries mislead length behavior). Beyond $n=1$, no consistent benefit; sole exception OPT (175B), monotone in shots on NaturalQuestions (open-book), IMDB and CivilComments.
- **Formatting of prompt.** Ad hoc changes to instructions, input and output prefixes. Best formatting is not consistent across models (poor interoperability): one variant gives Anthropic-LM v4-s3 (52B) 67.3% on NaturalQuestions (open-book) but BLOOM (176B) drops from about 60% to 8.5%; possible tokenizer interactions. For GLM (130B) the prompt "I am an expert AI assistant who is here to help you with the following." with input prefix "Passage: ", input suffix a closing quote, and output prefix "Answer:" is best across NaturalQuestions (open-book), CNN/DailyMail, IMDB, CivilComments.
- **Multiple-choice adaptation method (Fig. 33).** Separate vs joint (see [[Liang 2022 - Models and Adaptation via Prompting]]): very large sensitivity, best method differs across models and scenarios (finding 23: 79.1% vs 30.2% for OPT (175B) on HellaSwag).

## Examples

> [!example] Win-rate computation on a toy grid
> Three models A, B, C, two scenarios with accuracies: scenario 1: A 0.8, B 0.7, C 0.6; scenario 2: A 0.5, B 0.6, C 0.4. Comparisons per model: $S(M-1)=2\cdot2=4$. A wins vs B and C in scenario 1 (2 wins) and vs C in scenario 2 (1 win): $W_A=3/4$. B wins vs C in 1 (1), vs A and C in 2 (2): $W_B=3/4$. C wins none: $W_C=0$. Check: sum $=1.5=\tfrac{M}{2}$ ($\sum_m W_m = M/2$ when there are no ties because each of the $S\binom M2$ pairs gives exactly one win and $S\binom M2/(S(M-1))=M/2$). ^ex-win-rate

```python
import numpy as np
acc = np.array([[0.8,0.7,0.6],[0.5,0.6,0.4]])   # scenarios x models
S, M = acc.shape
wins = np.zeros(M)
for s in range(S):
    for m in range(M):
        wins[m] += sum(acc[s,m] > acc[s,k] for k in range(M) if k != m)
print(wins/(S*(M-1)), (wins/(S*(M-1))).sum())   # [0.75 0.75 0.], sum 1.5

# seed-variance summary: range over 3 in-context-example draws
runs = np.array([0.376, 0.611, 0.636])
print(runs.max()-runs.min())    # 0.26
```

## Connections

- Correlations across models per scenario are a small meta-analysis of benchmark results; the correlation heterogeneity across scenarios is the benchmark analogue of effect heterogeneity in the Meta-Analysis cluster of this folder.
- Seed variance and prompt sensitivity are measurement-reliability concerns tied to [[Researcher Degrees of Freedom]].
- Accuracy-versus-scale analysis: [[Neural Scaling Laws]]; in-context example scaling: [[In-Context Learning and Few-Shot Prompting]].

**Relevance to marketing measurement.** The cross-scenario correlation and win-rate analyses show how to summarize many method-by-dataset results without a single scalar. Win rates are rank-based (robust to scale differences between datasets), which suits comparing estimators across campaigns whose error magnitudes differ widely. The seed and prompt ablations map to reporting variation due to random seeds, priors and data-prep choices in Bayesian MMM comparisons.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]
- [[Liang 2022 - Related Work, Missing Pieces and Limitations]]
