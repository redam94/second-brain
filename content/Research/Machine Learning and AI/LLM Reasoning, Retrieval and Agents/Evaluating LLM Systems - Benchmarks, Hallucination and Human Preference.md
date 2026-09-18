---
title: Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference
tags:
  - source/ingested
  - topic/machine-learning
  - topic/llm
  - topic/evaluation
  - type/concept
  - doc/paper
source: "[[raw/Ouyang 2022 - InstructGPT RLHF.pdf]]"
source_location: "Ouyang et al. Secs. 3.6, 4.1-4.2, pp. 9-15; Lewis et al. 2020 Secs. 3.3, 4.3-4.5, Tables 4-5, Appendix B, pp. 5-8, 17; Yao et al. 2022 Sec. 3.3, Table 2, Sec. 4, Appendix A.2, pp. 5-8, 14; Wei et al. 2022 Secs. 3.1-3.4, Appendix D, pp. 3-7, 26-27"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Chain-of-Thought Prompting]]"
  - "[[Retrieval-Augmented Generation (RAG)]]"
  - "[[ReAct - Reasoning and Acting Agents]]"
  - "[[RLHF and Instruction Tuning]]"
  - "[[Reward Modeling from Human Preferences]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
aliases:
  - LLM Evaluation
  - Evaluating LLM Systems
  - Hallucination Measurement
  - Human Preference Evaluation
  - LLM Benchmarks
---

# Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference

> [!summary]
> The four papers in this cluster collectively use **three families of evaluation**: (1) **automatic benchmark metrics** — exact match, accuracy / solve rate, BLEU, ROUGE-L, Q-BLEU, task success rate; (2) **human judgment** — pairwise preference win rates, 1–7 Likert quality scores, binary metadata flags, and manual audits of reasoning traces; and (3) **targeted probes of failure** — hallucination rates, TruthfulQA, RealToxicityPrompts, bias benchmarks. Their shared lesson is that the three can disagree: InstructGPT wins 85% of human comparisons against GPT-3 while *regressing* on public NLP benchmarks, and models fine-tuned to do well on those benchmarks (FLAN, T0) lose to it 78–79% of the time on real user prompts. This note is restricted to what these papers' evaluation sections actually do; **LLM-as-judge** evaluation post-dates them and appears here only through its precursor, the reward model used as an automated selector.

## Overview

Evaluating a generative system is harder than evaluating a classifier because the output space is open-ended, several different outputs can be correct, and the properties of interest (helpfulness, factuality, harmlessness) are not functions of string overlap with a reference. Ouyang et al. put it sharply: public NLP datasets "are designed to capture tasks that are easy to evaluate with automatic metrics", but classification and QA are only about 18% of what API customers do, while open-ended generation and brainstorming are about 57% (Sec. 4.1).

The practical upshot is a layered design: cheap automatic metrics for iteration and regression testing, human preference as the primary outcome, and hand-labeled audits to explain *why* a system fails.

## Main Content

> [!definition] Automatic metrics used across the cluster ^def-auto-metrics
> | Metric | What it scores | Used in |
> |---|---|---|
> | **Exact match (EM)** | Generated answer string equals a reference answer | Open-domain QA in RAG (NQ, TriviaQA, WQ, CT); HotpotQA in ReAct |
> | **Accuracy / solve rate** | Final answer correct (the chain itself is not scored) | GSM8K etc. in CoT; FEVER label accuracy in RAG and ReAct |
> | **BLEU-1, ROUGE-L** | $n$-gram / longest-common-subsequence overlap with a reference | MS-MARCO abstractive QA in RAG |
> | **Q-BLEU-1** | BLEU variant "with a higher weight for matching entities", better correlated with human judgment for question generation | Jeopardy question generation in RAG |
> | **Distinct $n$-gram ratio** | Distinct / total tri-grams — generation diversity | RAG Table 5 |
> | **Success rate; score** | Episode meets *all* requirements; average fraction of desired attributes covered | ALFWorld, WebShop in ReAct |
> | **Perspective API toxicity** | Classifier score on sampled continuations | RealToxicityPrompts in InstructGPT |
> | **Entropy of paired-sentence probabilities** | Bias: an unbiased model is indifferent, hence maximum entropy | Winogender, CrowS-Pairs in InstructGPT |

**Known weaknesses surfaced by the papers themselves.** EM penalises correct-but-differently-worded answers: in ReAct's audit, 28–29% of "failures" for both CoT and ReAct are **label ambiguity** — "right prediction but did not match the label precisely" — and some HotpotQA labels are simply outdated (Appendix A.2). Reference-based metrics break when the reference needs information the system was not given: RAG's MS-MARCO setup withholds gold passages, so questions like "What is the weather in Volcano, CA?" cannot match the reference. And final-answer accuracy says nothing about the reasoning: Wei et al. found 2 of 50 correct GSM8K answers reached by a wrong chain, and Yao et al. found 14% of CoT's *correct* HotpotQA answers rested on hallucinated reasoning or facts (6% for ReAct).

> [!definition] Human preference evaluation (Ouyang et al., Sec. 3.6) ^def-human-pref
> - **Win rate against a fixed baseline.** For each model, "how often its outputs are preferred to a baseline policy" — the 175B SFT model, chosen because "its performance is near the middle of the pack". Error bars are 95% confidence intervals.
> - **Likert 1–7** overall quality per response.
> - **Binary metadata** per output (Table 3): fails to follow the instruction; inappropriate for a customer assistant; **hallucination**; satisfies explicit constraint; sexual / violent content; denigrates a protected class; gives harmful advice; expresses opinion or moral judgment.
>
> **Design safeguards.** Train / validation / test splits are **by user ID**, so test prompts come from customers never seen in training. A separate pool of **held-out labelers** who produced no training data checks that the model has not merely overfit to its raters. Because prompts written for InstructGPT may disadvantage GPT-3, results are repeated on prompts originally submitted to GPT-3 models. During training labelers prioritise helpfulness; in final evaluation they prioritise truthfulness and harmlessness.

> [!definition] Pairwise comparative evaluation with four options (Lewis et al., Sec. 3.3) ^def-pairwise-four
> Evaluators see an input and two generations (BART vs RAG; which model appears as "A" or "B" is randomised per example "to avoid any biases for screen position", annotators may research the topic online, and gold-labeled check items screen out unreliable annotators — Appendix B) and choose: **A better / B better / both good / neither good**, separately for **factuality** — "whether a statement can be corroborated by trusted external sources" — and **specificity** — "high mutual dependence between the input and output". Over 452 pairs (Table 4):
>
> | | Factuality | Specificity |
> |---|---|---|
> | BART better | 7.1% | 16.8% |
> | RAG better | 42.7% | 37.4% |
> | Both good | 11.7% | 11.8% |
> | Both poor | 17.7% | 6.9% |
> | No majority | 20.8% | 20.1% |
>
> The "both" options stop forced choices from manufacturing a difference, and the "no majority" row reports rater disagreement instead of hiding it.

> [!definition] Hallucination — three operationalisations ^def-hallucination
> 1. **Closed-domain fabrication** (Ouyang et al.): on tasks where "the output should not contain information that is not present in the input" (summarisation, closed-domain QA), a labeler flags invented content. Rate: 41% for GPT-3 vs 21% for InstructGPT.
> 2. **Uncorroborated statement** (Lewis et al.): a generation is non-factual if it cannot be "corroborated by trusted external sources"; measured by pairwise human comparison.
> 3. **Hallucinated reasoning trace or fact** (Yao et al., Table 2): a human reads the full trajectory. Accounts for 56% of CoT's failures and 0% of ReAct's on HotpotQA.
>
> Ouyang et al. add a conceptual caution: *honesty* would require "comparing the model's actual output to its 'belief' about the correct output, and since the model is a big black box, we can't infer its beliefs" — so they measure **truthfulness** instead, via (1) and **TruthfulQA**. With an "Instruction+QA" prompt allowing "I have no comment", PPO models "err on the side of being truthful and uninformative rather than confidently saying a falsehood".

> [!example] Error taxonomies as an evaluation instrument ^ex-taxonomy
> Both prompting papers sample about 50 successes and 50 failures and hand-label them. Wei et al. classify wrong GSM8K chains by *the minimal edit needed to fix them* (calculator error 8%, symbol-mapping 16%, one step missing 22%, major semantic/coherence errors 54%). Yao et al. classify by *failure mechanism* (reasoning error, search-result error, hallucination, label ambiguity). Both taxonomies point directly at interventions — a calculator tool; better retrieval or a CoT fallback — which a scalar accuracy cannot.

**Harm-related probes (Ouyang et al., Sec. 4.2).** RealToxicityPrompts is run three ways (no instruction, "respectful" instruction, explicitly toxic instruction) with both Perspective API and human raters on 1,729 prompts; the conclusion depends on the condition (less toxic when asked to be respectful; no difference unprompted; *more* toxic when asked to be). Prompts were sampled uniformly over input toxicity, so "absolute toxicity numbers are inflated" — a reminder that the prompt-sampling design is part of the metric.

**Reporting conventions for prompted systems.** Prompt sensitivity is large (GPT-3 on SST-2 ranges 54.3–93.4% across exemplar orderings, cited in Wei et al.). The papers respond by averaging over 5 seeds with shuffled exemplar order (CoT, LaMDA), testing alternative annotators and exemplar sets (CoT Sec. 3.4), and reporting both **average and best-of-6 prompts** (ReAct on ALFWorld: 57 vs 71). Best-of-$k$ numbers are optimistic selections and should be compared only with other best-of-$k$ numbers.

**The alignment tax as an evaluation finding.** Measuring *both* human preference and public benchmarks is what revealed that PPO improves the former while degrading SQuADv2, DROP, HellaSwag and WMT translation, and that PPO-ptx repairs most of it (see [[RLHF and Instruction Tuning#^def-alignment-tax]]). A single-metric evaluation would have missed either the gain or the cost.

**Automated judges.** None of the four papers uses an LLM to grade outputs. The closest device is the [[Reward Modeling from Human Preferences|reward model]] used as a selector — for the SFT checkpoint, the FLAN/T0 checkpoints, and the prompted-GPT-3 prefix — with a known accuracy of about 70% against held-out humans (vs 73–77% human–human agreement). Any model-based judge inherits the same two questions: what is its agreement with people, and how does that compare with people's agreement with each other?

## Examples

A minimal protocol for evaluating an internal RAG or agent system, assembled from the practices above:

```python
def evaluate(system, baseline, test_set, raters):
    # 1. Split by *user / source*, never by row (Ouyang Sec. 3.2)
    assert not (test_set.user_ids & system.training_user_ids)

    # 2. Automatic metrics for regression tracking
    auto = {"exact_match": mean(em(system(x), y) for x, y in test_set),
            "task_success": mean(all_requirements_met(system(x)) for x, _ in test_set)}

    # 3. Pairwise human preference with 4 options, order randomised (Lewis Sec. 3.3)
    votes = [raters.compare(x, *shuffle([system(x), baseline(x)]),
                            options=["A", "B", "both good", "neither"]) for x, _ in test_set]
    win_rate, ci95 = proportion_ci(votes)            # report interval, plus "no majority" share

    # 4. Closed-domain hallucination flag (Ouyang Table 3)
    halluc = mean(raters.flag_unsupported(x, system(x)) for x, _ in test_set.closed_domain)

    # 5. Audit 50 successes + 50 failures with a fixed taxonomy (Wei App. D; Yao Table 2)
    audit = raters.label_failure_modes(sample(test_set, 100, stratify="correct"))
    return auto, win_rate, ci95, halluc, audit
```

Sample-size intuition: InstructGPT's headline $85 \pm 3\%$ is a binomial proportion; a $\pm 3$-point 95% interval at $p = 0.85$ needs roughly $n \approx 1.96^2 \times 0.85 \times 0.15 / 0.03^2 \approx 545$ independent comparisons, and about 1,070 at $p = 0.5$ — the same arithmetic as any [[Power Analysis and Sample Size|power calculation]] for a proportion.

## Connections

- [[Chain-of-Thought Prompting]] — solve-rate benchmarks, robustness checks, chain audits.
- [[Retrieval-Augmented Generation (RAG)]] — EM, BLEU/ROUGE/Q-BLEU, pairwise factuality/specificity, retrieval-quality checks against gold evidence (71% top-1, 90% top-10 on FEVER).
- [[ReAct - Reasoning and Acting Agents]] and [[Tool Use and the Agent Loop]] — success/failure-mode taxonomy; success rate and best-of-$k$ reporting for agents.
- [[RLHF and Instruction Tuning]] and [[Reward Modeling from Human Preferences]] — human preference as both training signal and evaluation metric, with the circularity risk that implies; held-out labelers are the control.
- [[Power Analysis and Sample Size]] and [[Multiple Testing Corrections]] — sizing human evaluations and comparing many model variants on one test set.
- [[The Experimental Ideal]] — randomised, blinded presentation order in pairwise comparisons is the same logic as randomised treatment assignment.
- [[Code vs Text Prompt Evaluation]] — automatic and human evaluation of LLM causal-reasoning outputs in the Knowledge Elicitation cluster.
- [[Entropy-Based BN Evaluation]] — another entropy-based quality score, there for elicited Bayesian networks rather than bias probes.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]]
- [[In-Context Learning and Few-Shot Prompting]] — source of the prompt sensitivity that evaluation must average over.
- [[Overfitting and Information Criteria]] — benchmark overfitting and proxy-metric over-optimisation are the evaluation-side analogue.
- [[Decision Analysis]] — choosing among systems when metrics conflict requires an explicit utility over them.
