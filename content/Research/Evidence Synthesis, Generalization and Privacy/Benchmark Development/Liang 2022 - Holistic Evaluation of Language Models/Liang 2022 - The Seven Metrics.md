---
title: "Liang 2022 - The Seven Metrics"
tags:
  - source/ingested
  - topic/benchmarks
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 4.3-4.9, Figs. 17-22, Appendix C (C.1-C.7) formal definitions, pp. 25-35, 130-139"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]"
  - "[[Liang 2022 - Core Scenarios and Dataset Selection]]"
used_by:
  - "[[Liang 2022 - Findings 1 to 13 Core Scenarios]]"
  - "[[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]"
aliases:
  - HELM metrics
  - HELM accuracy calibration robustness fairness bias toxicity efficiency
  - HELM ECE selective classification
---

# Liang 2022 - The Seven Metrics

> [!summary]
> HELM measures seven categories of desiderata for each core scenario: accuracy (scenario-specific: exact match, F1, RR@K, NDCG@K, ROUGE-2, BPB), calibration (10-bin uniform-mass ECE plus selective classification acc@10% and the coverage-accuracy area), robustness (worst-case accuracy over invariance and equivariance perturbations), fairness (counterfactual perturbations and performance disparities), bias (TVD of demographic representation and stereotypical associations from uniform), toxicity (Perspective API on generations) and efficiency (training energy and CO$_2$; denoised and idealized inference runtime). The paper stresses these are contested constructs measured by specific operationalizations.

## Overview

The central rule: "measuring these 7 desiderata for the same scenarios makes explicit potential tradeoffs and helps to ensure these desiderata are not treated as second-class citizens to accuracy." Metrics are defined for black-box text-to-text models. Table 4 in the paper shows 98 of 112 (scenario, metric) pairs are measured.

## Main Content

### 1. Accuracy (Sec. 4.3, App. C.1)

An umbrella term for the standard accuracy-like metric of each scenario, averaged over test instances (so minority subpopulations can have low accuracy despite a high mean).

| Metric | Correctness condition | Default for |
|---|---|---|
| Exact match | generation equals the reference string | HellaSwag, OpenBookQA, TruthfulQA, MMLU, BLiMP |
| Quasi-exact match | equal after lower-casing and stripping whitespace, punctuation, articles | BoolQ, IMDB, CivilComments, RAFT, WikiFact, synthetic reasoning (abstract symbols), bAbI, LegalSupport, LSAT, EntityMatching, DataImputation |
| F1 (word overlap) | graded partial overlap (Rajpurkar et al. 2016) | NaturalQuestions (open and closed book), NarrativeQA, QuAC |
| RR@K | $1/\text{rank}$ of the first relevant document if rank $\le K$, else 0 ($K=10$) | MS MARCO (regular) |
| NDCG@K | normalized discounted cumulative gain with graded relevance ($K=10$) | MS MARCO (TREC) |
| ROUGE-2 | bigram overlap | CNN/DailyMail, XSUM |
| BPB | bits per byte under model probabilities | The Pile, ICE, TwitterAAE |
| F1 (set match) | set-level F1 | synthetic reasoning (natural) |
| Exact match up to indicator | compare prefixes up to a specified indicator | Dyck, GSM8K |
| Code metrics | as defined in the dataset papers | HumanEval, APPS |
| Equivalent / Equivalent (CoT) | mathematically equivalent answer | MATH |

> [!definition] NDCG@K
> With graded relevance $g_i\in\{0,1,2,3\}$ of the document at rank $i$,
> $$
> \mathrm{DCG@K}=\sum_{i=1}^{K}\frac{g_i}{\log_2(i+1)},\qquad \mathrm{NDCG@K}=\frac{\mathrm{DCG@K}}{\mathrm{IDCG@K}},
> $$
> where IDCG@K is the DCG@K of the ideal ordering (sorted by relevance grade descending). ^def-ndcg

### 2. Calibration and uncertainty (Sec. 4.4, App. C.2)

Setting: classification with $k$ labels. True label $y\in[k]$, predicted probability vector $p$ with $\sum_j p_j=1$, predicted label $\hat y=\arg\max_j p_j$, top probability $p^{\max}=\max_j p_j$.

> [!definition] Expected calibration error (population)
> $$
> \mathrm{ECE}=\mathbb{E}\Big|\,p^{\max}-\Pr\big(y=\hat y\mid p^{\max}\big)\Big|.
> $$
> (The paper writes the expectation of the absolute difference between the model's top probability and the probability that it is correct given that top probability.) ^def-ece

> [!definition] Finite-sample ECE with uniform-mass bins
> Sort the $n$ examples by $p^{\max}$ and partition into $m$ bins of equal size $n_i$ (sizes differ by at most 1; "uniform-mass" bins, Kumar et al. 2019; default $m=10$). With $\hat p_i$ the mean top probability in bin $i$ and $\hat a_i$ the accuracy in bin $i$,
> $$
> \widehat{\mathrm{ECE}}_m=\sum_{i=1}^{m}\frac{n_i}{n}\,\big|\hat p_i-\hat a_i\big|.
> $$
> ^def-ece-binned

> [!definition] Selective classification
> Coverage at threshold $t$: $c(t)=\Pr(p^{\max}\ge t)$. Selective accuracy: $a(t)=\Pr(y=\hat y\mid p^{\max}\ge t)$ (defined when $c(t)>0$). The **selective coverage-accuracy area** (SCAA) is the area under the curve of $a$ against $c$:
> $$
> \mathrm{SCAA}=\int a(t)\,dc(t).
> $$
> **acc@10%** is $a(t')$ at the threshold $t'$ with $c(t')=0.1$: accuracy on the 10% of examples the model is most confident about. Finite-sample: with data sorted by decreasing $p^{\max}$, $a_r$ is the accuracy of the $r$ most confident examples, $\widehat{\text{acc}}@C\%=a_{\lfloor nC/100\rfloor}$ and $\widehat{\mathrm{SCAA}}=\frac1n\sum_{r=1}^{n}a_r$. ^def-selective-classification

Selective classification captures something different from calibration: many models can rank which examples are hard even when raw probabilities are off. Figure 17 worked example (2 bins for illustration): bin means 0.15 and 0.85, giving ECE $=\tfrac48(0.35)+\tfrac48(0.1)=0.225$.

### 3. Robustness (Sec. 4.5, App. C.3, D.1)

Local robustness only (distribution shift needs subpopulation annotations and knowledge of training data; adversarial robustness needs many adaptive queries).

> [!definition] Worst-case robustness
> Let $m(\text{model}(x),y)$ be the scenario's basic metric, and $T_1,\dots,T_k$ transformations (including the identity). Then
> $$
> \mathrm{Accuracy}=\frac1n\sum_{i}m(\text{model}(x_i),y_i),\qquad \mathrm{Robustness}=\frac1n\sum_{i}\min_{j}\,m\big(\text{model}(T_j(x_i)),y_i\big).
> $$
> Because the identity is included, Robustness $\le$ Accuracy. With accuracy as $m$, an instance counts correct only if it is correct on all its perturbations. ^def-worst-case-robustness

- **Invariance**: natural, mild, semantics-preserving perturbations (capitalization, common misspellings, typos; NL-Augmenter based). Only for text classification, question answering and information retrieval, because gold-standard changes are hard to specify for long-form generation.
- **Equivariance**: semantics-*altering* perturbations from **contrast sets** (Gardner et al. 2020) via counterfactually augmented data; available only for BoolQ and IMDB.

### 4. Fairness (Sec. 4.6, App. C.4, D.2)

Following Khani and Liang (2020), two operationalizations:
- **Counterfactual fairness** (Dwork et al. 2012; Kusner et al. 2017): accuracy on perturbed test instances that swap group terms. *Speaker* property: Standard American English vs African American English (dialect perturbation); *subject* properties: race and binary gender (e.g. "He bends down..." to "She bends down..."). Restricted to classification, QA and IR. Computed like robustness: per-group accuracy on perturbed instances and the worst case across them.
- **Performance disparities**: subgroup accuracy when instances carry group metadata (speaker gender, nationality, spoken vs written; subject gender, sex, race, religion, disability status), compared manually; the paper defers choosing an aggregate fairness score to context.

The paper raises the question of whether language models should (attempt to) speak particular dialects, and notes that LM norms need not match human norms.

### 5. Bias and stereotypes (Sec. 4.7, App. C.5)

> [!definition] Social bias
> Following Blodgett et al. (2020) and Beukeboom and Burgers (2019): "a systematic asymmetry in language choice". Fairness is about disparities in task accuracy across groups; bias is a property of generations with no explicit tie to task accuracy. ^def-social-bias

> [!definition] Demographic representation
> For $k$ groups with word lists $A_i$ (binary gender: $k=2$; race with White, Hispanic, Asian: $k=3$) and generations $\mathcal Y$, let $C(w,y)$ count token $w$ in generation $y$. Group counts $C(i)=\sum_{w\in A_i}\sum_{y\in\mathcal Y}C(w,y)$, observed distribution $P_{\mathrm{obs}}(i)=C(i)/\sum_{l}C(l)$, and with uniform reference $P_{\mathrm{ref}}$,
> $$
> \text{demographic representation}=\mathrm{TVD}(P_{\mathrm{obs}},P_{\mathrm{ref}}),
> $$
> bounded above by $\frac{k-1}{k}$ (0.5 for gender, $2/3$ for race). ^def-demographic-representation

> [!definition] Stereotypical associations
> For a target term $t$ (e.g. "mathematician") count group words only in generations where $t$ appears: $C^t(i)=\sum_{w\in A_i}\sum_{y\in\mathcal Y}C(w,y)\,\mathbb I[C(t,y)>0]$, compute the same TVD to uniform per term, and average over a term set $\mathcal T$ (for example professions) for a single number. ^def-stereotypical-associations

The paper notes count-based measures are brittle (e.g. differential linguistic marking such as "female nurse" vs "male nurse"), and that predictive validity of such measures for downstream bias is contested. Reported for scenarios that involve generation.

### 6. Toxicity (Sec. 4.8, App. C.6)

Toxicity is treated as an *instance-level* property of generations, measured with the Perspective API (Lees et al. 2022); the reported quantity is the fraction of generations labeled toxic (Fig. 21: 1 toxic of 3 generations gives $1/3$). The authors chose Perspective over newer detectors because its limitations are extensively analyzed, and acknowledge the construct depends on context and annotators (Sap et al. 2019; Gordon et al. 2022; Rauh et al. 2022).

### 7. Efficiency (Sec. 4.9, App. C.7)

- **Training**: energy $e$ (kWh) and emissions $e_{\mathrm{CO_2}}$ (kg), using creators' reported numbers where available, otherwise
$$
e=n_{\mathrm{GPU}}\cdot W_{\mathrm{GPU}}\cdot t_{\mathrm{train}}\cdot\mathrm{PUE},\qquad e_{\mathrm{CO_2}}=c_{\mathrm{region}}\cdot e,
$$
with $W_{\mathrm{GPU}}$ the average GPU draw in kW, $t_{\mathrm{train}}$ hours, PUE set to 1.1, and $c_{\mathrm{region}}$ the datacenter's carbon intensity (US national average if unknown). Training runtimes are not reported since they are rarely disclosed and ignore the number of accelerators.
- **Inference**: per-request runtime cannot compare providers (hardware, software, contention). Two surrogates are computed: **denoised inference runtime** (the provider's own hardware and software with performance-variation noise removed) and **idealized inference runtime** (uniform optimized hardware/software). The runtime model is $\text{total time}=F(\text{num\_prompt\_tokens})+g\cdot\text{num\_output\_tokens}$, where $F$ maps prompt length to encoding time and $g$ is per-additional-output-token time.

## Examples

> [!example] ECE with uniform-mass bins (Figure 17 reproduced)
> Eight predictions with top probabilities $[0.0,0.1,0.2,0.3,0.7,0.8,0.9,1.0]$; with two bins of four, the means are 0.15 and 0.85. If the low bin has accuracy 0.5 and the high bin 0.75, then $\widehat{\mathrm{ECE}}_2=\tfrac12|0.15-0.5|+\tfrac12|0.85-0.75|=0.175+0.05=0.225$, matching the figure. ^ex-ece-fig17

```python
import numpy as np

def ece_uniform_mass(pmax, correct, m=10):
    order = np.argsort(pmax)
    p, c = np.asarray(pmax)[order], np.asarray(correct)[order]
    bins = np.array_split(np.arange(len(p)), m)
    return sum(len(b)/len(p) * abs(p[b].mean() - c[b].mean()) for b in bins)

pmax = [0.0,0.1,0.2,0.3,0.7,0.8,0.9,1.0]
corr = [1,1,0,0, 1,1,1,0]            # bin accuracies 0.5 and 0.75
print(ece_uniform_mass(pmax, corr, m=2))   # 0.225

def scaa(pmax, correct):
    order = np.argsort(-np.asarray(pmax))
    c = np.asarray(correct)[order]
    return float(np.mean(np.cumsum(c)/np.arange(1, len(c)+1)))
print(scaa(pmax, corr))
```

> [!example] Demographic-representation TVD
> Suppose generations mention male terms 30 times and female terms 10 times: $P_{\mathrm{obs}}=(0.75,0.25)$, uniform reference $(0.5,0.5)$, so $\mathrm{TVD}=\tfrac12(|0.75-0.5|+|0.25-0.5|)=0.25$, half the maximum possible 0.5. ^ex-tvd-bias

```python
import numpy as np
def tvd_to_uniform(counts):
    p = np.asarray(counts, float); p /= p.sum()
    return 0.5*np.abs(p - 1/len(p)).sum()
print(tvd_to_uniform([30, 10]))       # 0.25
print(tvd_to_uniform([1, 0]))         # 0.5, the maximum for k=2
# worst-case robustness over perturbations
acc = np.array([[1,1,0],[1,0,0],[1,1,1]])  # instance x perturbation correctness (col 0 = identity)
print(acc[:,0].mean(), acc.min(axis=1).mean())  # accuracy 1.0, robustness 0.333
```

## Connections

- ECE and selective classification relate to probabilistic scoring: [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] and coverage guarantees in [[Conformal Prediction - Overview]].
- Worst-case robustness over a perturbation set is an invariance test of the kind GLUE's diagnostic minimal pairs approximate ([[Wang 2018 - Diagnostic Dataset]]).
- The efficiency formulas link to compute-cost accounting in [[Neural Scaling Laws]].

**Relevance to marketing measurement.** All seven have an MMM analogue: accuracy (bias and RMSE of channel ROI against experiments), calibration (credible-interval coverage; reliability diagrams for predicted lift), robustness (worst-case estimate across plausible data cleaning or prior choices, which mirrors the min-over-transformations definition), fairness (error disparities across geos or segments), and efficiency (compute cost of the sampler). The robustness definition is a ready template for a sensitivity-analysis report.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Targeted Evaluations]]
- [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]
