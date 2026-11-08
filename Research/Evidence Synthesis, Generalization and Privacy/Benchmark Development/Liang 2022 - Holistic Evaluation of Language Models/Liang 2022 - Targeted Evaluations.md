---
title: "Liang 2022 - Targeted Evaluations"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 5 (5.1-5.7), Sec. 8.5 human evaluation, Table 8, Appendix E pointer, pp. 35-43, 73-75, 141-154"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Core Scenarios and Dataset Selection]]"
  - "[[Liang 2022 - The Seven Metrics]]"
used_by:
  - "[[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]"
aliases:
  - HELM targeted evaluations
  - HELM language knowledge reasoning disinformation copyright
---

# Liang 2022 - Targeted Evaluations

> [!summary]
> Beyond the 16 user-facing core scenarios, HELM runs 7 targeted evaluations (26 scenarios) that probe components of capability (language, knowledge, reasoning) and harm (memorization and copyright, disinformation, bias, toxicity generation). They give fine-grained scientific insight on primitives, where the core scenarios give clarity on practical utility. 21 of the scenarios were new to mainstream LM evaluation.

## Overview

"Evaluation serves multiple functions and the relevant function can depend on the stakeholder (for example researchers have different evaluation needs from policymakers)." The targeted evaluations follow the same structure as the scenario taxonomy: capabilities are the canonical primitives (language, knowledge, reasoning), and harms follow the taxonomies of Bommasani et al. (2021), Weidinger et al. (2022), Bender et al. (2021) and Rauh et al. (2022), with disinformation and copyright as first-order concerns when models reach malicious actors (dual use).

## Main Content

### 5.1 Language: language modeling and minimal pairs

Two complementary resolutions (Hale 2001, Levy 2008, Chomsky 1957).
- **Language modeling.** Input is an English text sequence; the model assigns a conditional log probability to every token; metric is **bits per byte** (invariant to tokenization; Gao et al. 2021a). Datasets: WikiText-103; **The Pile** (22 sub-corpora, 5 prioritized: arXiv, BookCorpus2, Enron Emails and others for domain coverage); **TwitterAAE** (over 50 million tweets with demographic proportions; 50,000 sampled from the 830,000 tweets with the highest African American proportion and 7.3 million with highest White proportion); **ICE** (International Corpus of English: Canada, Jamaica, Kenya, Hong Kong, India, Ireland, Singapore, the Philippines, Tanzania, USA). TwitterAAE and ICE measure performance disparities across English varieties; the paper cites Blodgett et al. (2020) on stigmatization risks and Kachru's center-periphery framing.
- **Minimal pairs.** A pair differing in one token, one acceptable and one not; the model is correct if it assigns higher probability to the acceptable sequence. Dataset: **BLiMP** (12 linguistic phenomena, 67 paradigms, 1,000 synthetic minimal pairs per paradigm; syntax, morphology, semantics).

### 5.2 Knowledge

- **Knowledge-intensive QA**: HellaSwag, OpenBookQA (commonsense), TruthfulQA (truthfulness), MMLU (specialized knowledge, 57 domains). Footnote: knowledge means knowledge *currently used by the interface*, which could sit in an external knowledge base.
- **Fact completion (WikiFact)**: a new dataset. Prompts such as "The capital of France is __" (cf. LAMA probe, about 40 relation types). For 12 domains (humanities such as law, social sciences such as economics, STEM such as biomedicine, other general facts), 2-7 Wikidata relations each were chosen and given a manual prompt template, **86 relation types in total**; triples from the January 2022 Wikidata dump, dropping triples lacking Wikipedia pages for subject or object; **1,000 triples sampled per property**. Metric: 5-shot Accuracy@K for $K=1,5$, where any alias of a correct object counts as correct.

### 5.3 Reasoning

*Synthetic primitives (isolating reasoning from language and knowledge):*
- **Non-ampliative** (conclusion already in the premises; Peirce): pattern matching and variable substitution with abstract symbols following LIME (Wu et al. 2021); deduction in natural language following Clark et al. (2020).
- **Ampliative** (needs further assumptions, induction and abduction): rule induction (`rule_induct`; infer the rule from two examples) and function regression (`numeracy_prediction`; symbolic regression from a few examples).
- **Recursive hierarchy**: generalized Dyck languages $D_3$ (three bracket pairs), complete the closing-bracket sequence of a prefix; 500 evaluation examples of length 52-100, two-shot, strict exact match.
- **State tracking**: bAbI (20 tasks: transitive inference, coreference, negation, conjunction, disjunction, spatial and temporal reasoning, deduction, induction; single-word answers).

*Realistic reasoning:*
- Mathematical: GSM8K and MATH (multi-step to numerical answer).
- Code synthesis: HumanEval (164 handwritten problems) and APPS (10,000 problems); zero-shot evaluation.
- Legal: **LegalSupport**, new comparative legal entailment (which of two cases most persuasively supports the argument), mined from real opinions.
- Logical: LSAT analytical reasoning (constraint-satisfaction word problems, 5 answers; 5 in-context examples, about 170 tokens each).
- Structured data: entity matching (Beer, Abt-Buy, iTunes-Amazon dirty from the Magellan benchmark) and data imputation (Restaurant, Buy).

### 5.4 Memorization and copyright

Prompts compiled from three sources: (i) 1,000 randomly sampled **BooksCorpus** books (copyrighted; varying numbers of tokens from the beginning of random paragraphs); (ii) **20 bestsellers** in BooksCorpus (first paragraph; likelier repeated in training); (iii) 2,000 randomly sampled functions from the **Linux kernel** (GPL licensed; varying numbers of lines from the top of each function). Metrics: exact regurgitation (longest common sequence normalized by prefix length) and near-exact reproduction (edit distance and edit similarity, Lee et al. 2021). Caveats: only one completion sampled per prompt (token-credit constraint) so worst-case extraction is underpowered; numbers "do not (unconditionally) quantify the degree of legal risk" because fair use depends on use case, transformativeness and amount (the ComicMix / Dr. Seuss case is cited as a non-fair-use example).

### 5.5 Disinformation

Disinformation is false information disseminated with intent to deceive; effective campaigns need convincing content and network propagation. Following Buchanan et al. (2021) two generation tasks:
- **Narrative reiteration**: generate headlines that support a thesis. Data: Misinformation Reaction Frames (Gabriel et al. 2022): 114 COVID headlines clustered into 38 clusters and 147 climate headlines into 49 clusters, with a hand-written thesis per cluster (e.g. "COVID-19 is a man-made disease").
- **Narrative wedging**: social-media posts encouraging division or voting behavior; the same 11 prompts as Buchanan et al., targeting religious groups (Christians, Jews, Muslims).

**Human evaluation (Sec. 8.5, Table 8).** Six models were evaluated (text-davinci-002, Anthropic-LM v4-s3 (52B), OPT (175B), OPT (66B), davinci (175B), GLM (130B); TNLG v2 was not included because annotation was started before all results arrived). Annotators from Amazon Mechanical Turk, paid \$15.00/hour (a task took about 11 minutes; paid \$5.50 per task); each generation judged by three annotators; secret words in the instructions check attention; annotators were told text may be offensive or false. Significance by paired bootstrap tests (10,000 samples), $p<0.05$. Results:
- *Reiteration*: all models averaged above 3 (scale 1 to 5) on supporting the thesis. Style (looks like a real headline): text-davinci-002, Anthropic-LM and OPT (175B) above 4 (davinci also); OPT (66B) and GLM (130B) much lower. text-davinci-002 significantly better than Anthropic-LM ($p=0.028$), GLM ($p=0.028$), OPT (175B) ($p=0.002$) and davinci ($p=0.000$) on supporting the thesis.
- *Wedging* (scores -1 to 1): no clear winner on addressing the intended audience (ratings around 0 with high variance); text-davinci-002 best at supporting the intended goal; Anthropic-LM best at generating divisive text; GLM (130B) poor on style (it often failed to stop at the END token); no model overtly hostile on average (below 1.0), while text-davinci-002 and Anthropic-LM were the only models where all annotators agreed at least one generation was overtly hostile.
- *Diversity* (self-BLEU and entropy): Cohere models and T5 (11B) had very high self-BLEU (generations nearly identical); Anthropic-LM, OPT, GPT-3 and Jurassic models had low self-BLEU ($<10.0$); Instruct series higher.
- Conclusion: models can promote desired arguments in a style of interest with diverse generations, but targeting specific audiences remains hard.

### 5.6 Bias (targeted)

Complements generation-based bias metrics with **BBQ** (Bias Benchmark for QA; Parrish et al. 2022), a question-answering framing with nine demographic categories (US EEOC-based: age, disability status, gender, nationality and others), chosen over StereoSet and CrowS-Pairs (Nadeem et al. 2020; Nangia et al. 2020) whose validity is critiqued by Blodgett et al. (2021). BBQ may still suffer similar concerns but is judged comparatively better and more realistic. Both accuracy and bias score are used (ambiguous vs disambiguated contexts).

### 5.7 Toxicity (targeted)

Toxicity *generation* under prompts, using two datasets to relate prompt toxicity to completion toxicity. **RealToxicityPrompts** (Gehman et al. 2020): prompts from OpenWebText, stratified by Perspective API toxicity into 4 bins ([0, .25), [.25, .50), [.50, .75), [.75, 1.00]) with 25k sentences sampled from each. **BOLD** (Dhamala et al. 2021): prompts are the first 6-9 words of Wikipedia articles mentioning a profession, gender, race, religion or political ideology, so toxicity can be stratified by social category; the prompts are more neutral, so toxic completions are even less justifiable. Completions are scored with Perspective API (caveats in [[Liang 2022 - The Seven Metrics]]).

## Examples

> [!example] Why minimal pairs are cheap and informative
> BLiMP's scoring needs no generation: for each pair $(s^+,s^-)$ compute log-probabilities and mark correct iff $\log p(s^+)>\log p(s^-)$. With 67 paradigms $\times$ 1,000 pairs $=67{,}000$ pairs, and a model with per-paradigm accuracy near 0.5 is at chance on that phenomenon. Because both strings differ in one token, length and frequency confounds are largely controlled. ^ex-minimal-pairs

```python
import numpy as np
def minimal_pair_accuracy(logp_good, logp_bad):
    logp_good, logp_bad = np.asarray(logp_good), np.asarray(logp_bad)
    return float(np.mean(logp_good > logp_bad))

rng = np.random.default_rng(1)
good = rng.normal(-20, 2, 1000); bad = good - rng.normal(0.5, 2, 1000)
print(minimal_pair_accuracy(good, bad))
```

## Connections

- The reasoning primitives and realistic tasks parallel [[Chain-of-Thought Prompting]] benchmarks; the code and math evaluations relate to [[LLM Reasoning, Retrieval and Agents - Overview]].
- Memorization and privacy risk (personally identifying information is named as a missing extension in Sec. 10.3) is the empirical counterpart of the formal privacy guarantees studied in the Differential Privacy cluster.
- The bias and toxicity discussion emphasizes measurement validity, echoing [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].

**Relevance to marketing measurement.** The pairing of "core use-case scores" with "targeted diagnostics of primitives" mirrors evaluating an MMM both on holdout forecast accuracy and on targeted tests (parameter recovery on simulated data, placebo tests); see [[Wang 2018 - Diagnostic Dataset]] for the same two-layer pattern in GLUE.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]
