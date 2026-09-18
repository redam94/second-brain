---
title: LLM Reasoning, Retrieval and Agents - Overview
tags:
  - source/ingested
  - topic/machine-learning
  - topic/llm
  - topic/llm-agents
  - type/overview
  - doc/paper
source: "[[raw/Yao 2022 - ReAct Reasoning and Acting.pdf]]"
source_location: "Yao et al. 2022 Secs. 1-2, 5, pp. 1-4, 9; Wei et al. 2022 Secs. 1-2, 6, pp. 2-3, 8-9; Lewis et al. 2020 Sec. 1, pp. 1-2; Ouyang et al. 2022 Sec. 1, pp. 1-4"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Transformers and LLM Foundations - Overview]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
used_by:
  - "[[Chain-of-Thought Prompting]]"
  - "[[Retrieval-Augmented Generation (RAG)]]"
  - "[[ReAct - Reasoning and Acting Agents]]"
  - "[[Tool Use and the Agent Loop]]"
  - "[[RLHF and Instruction Tuning]]"
  - "[[Reward Modeling from Human Preferences]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
aliases:
  - LLM Agents Overview
  - LLM Reasoning Overview
  - LLMs as Reasoning Systems
  - Reasoning, Retrieval and Agents
---

# LLM Reasoning, Retrieval and Agents - Overview

> [!summary]
> A pre-trained language model is a next-token predictor. Four papers from 2020–2022 define the main ways it is turned into a **reasoning system that can be trusted to do work**: [[Chain-of-Thought Prompting]] (Wei et al. 2022) elicits multi-step reasoning by demonstration; [[Retrieval-Augmented Generation (RAG)]] (Lewis et al. 2020) grounds generation in an editable external memory; [[ReAct - Reasoning and Acting Agents|ReAct]] (Yao et al. 2022) interleaves reasoning with actions in an environment, giving the modern [[Tool Use and the Agent Loop|agent loop]]; and [[RLHF and Instruction Tuning]] (Ouyang et al. 2022) changes the weights so the model follows instructions at all, using a [[Reward Modeling from Human Preferences|reward model learned from human comparisons]]. Each targets a distinct deficiency of the raw model — shallow reasoning, stale or hallucinated knowledge, no ability to act, and misaligned objectives — and [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference|evaluation]] is the cross-cutting problem.

## Overview

The cluster sits on top of [[Transformers and LLM Foundations - Overview]] and [[In-Context Learning and Few-Shot Prompting]]: everything here takes a pre-trained transformer as given and asks how to *use* it. The four source papers are tightly connected — ReAct takes CoT as its reasoning baseline and FEVER (RAG's benchmark) as a task, cites RAG as the supervised state of the art, and observes that InstructGPT-family models are better ReAct agents; CoT evaluates the InstructGPT models.

A useful organising device is to ask, for each method, **what is changed** and **which deficiency is addressed**.

| Method | What is changed | Deficiency addressed | Headline evidence |
|---|---|---|---|
| Chain-of-thought | The *prompt* (exemplars include reasoning) | Flat scaling on multi-step reasoning | GSM8K 17.9% $\to$ 56.9% with PaLM 540B; emergent at about 100B parameters |
| RAG | The *architecture / context* (retrieved passages as a latent variable) | Knowledge is frozen in weights, unattributable, hallucinated | NQ 44.5 EM with 626M trainable parameters vs 36.6 for closed-book T5-11B; index hot-swap |
| ReAct / agent loop | The *action space* ($\hat{\mathcal A} = \mathcal A \cup \mathcal L$) and the control flow | Reasoning is ungrounded; acting is unplanned | Hallucination 56% $\to$ 0% of failures on HotpotQA; ALFWorld 71% vs 37% for imitation learning |
| RLHF | The *weights* (SFT, then PPO against a reward model) | Objective mismatch: next-token prediction is not instruction following | 1.3B InstructGPT preferred to 175B GPT-3; under 2% of pre-training compute |

## Main Content

> [!definition] Parametric vs non-parametric memory ^def-memory
> Lewis et al. call the generator's weights the **parametric memory** and the retrievable document index the **non-parametric memory**. Parametric knowledge is fast and fluent but cannot be inspected, attributed or updated without training; non-parametric knowledge is "human-readable" and "human-writable". RAG, ReAct's Wikipedia API and any tool call are all ways of moving a computation or a fact out of the parametric memory.

> [!definition] Reasoning trace ^def-trace
> Generated text that is not the answer and has no external effect, but conditions later generation: a **chain of thought** (Wei et al.) or a **thought** $\hat a_t \in \mathcal L$ (Yao et al.). Because decoding is autoregressive, the trace functions as working memory — Wei et al.'s ablation shows a trace placed *after* the answer gives no benefit.

> [!definition] Alignment (operational) ^def-alignment
> Ouyang et al., following Askell et al.: a model is aligned if it is **helpful** (follows instructions and infers intent), **honest** (measured in practice as truthfulness) and **harmless**. RLHF aligns to "the stated preferences of a specific group of people (mostly our labelers and researchers), rather than any broader notion of 'human values'".

> [!theorem] Four recurring empirical regularities ^thm-regularities
> 1. **Standard prompting is a lower bound on capability** (Wei et al., Sec. 6). The same frozen model solves three times as many GSM8K problems when shown how to reason; the same GPT-3 is dispreferred to a 100$\times$ smaller fine-tuned sibling.
> 2. **Internal reasoning hallucinates; external grounding constrains reasoning.** CoT is "more accurate in formulating reasoning structure but can easily suffer from hallucinated facts"; ReAct is grounded but less flexible (47% reasoning errors vs 16%). The best prompting results combine them, switching on a confidence signal (Yao et al., Sec. 3.2–3.3).
> 3. **Scale gates prompting; fine-tuning removes the gate.** CoT is harmful below about 100B parameters; prompted ReAct is the *worst* method at 8B/62B — but after fine-tuning on 3,000 trajectories ReAct-8B beats every prompted 62B method. A small amount of targeted training data substitutes for orders of magnitude of scale, the same conclusion InstructGPT reaches for instruction following.
> 4. **What is easy to measure is not what matters.** Benchmark gains and human preference can move in opposite directions (the alignment tax), and up to 29% of benchmark "failures" are label artefacts.

**A composite system.** A deployed assistant typically stacks all four: an RLHF-tuned model (so it follows the system prompt), prompted or trained to reason step by step, running inside an agent loop whose tools include a retriever over private documents, and monitored with human-preference and hallucination metrics. The papers supply the evidence for each layer separately; none evaluates the full stack.

**Limits the authors state.** No guarantee that a chain of thought is correct or faithful to the model's computation (Wei); retrieval can collapse and sources can be wrong or biased (Lewis); agents loop, derail on bad observations, are bounded by context length, and can take harmful actions if the action space allows (Yao); aligned models still fabricate, over-hedge, and follow harmful instructions, and reflect a narrow labeler pool (Ouyang).

### Relevance to marketing measurement and applied work

- **Analyst agents over measurement assets.** The [[Tool Use and the Agent Loop|agent loop]] is the template for an assistant that queries a warehouse, launches a geo-lift or [[Bayesian Media Mix Modeling - Overview|MMM]] fit, reads diagnostics, and writes up results. The ReAct evidence argues for (i) visible thoughts an analyst can edit, (ii) a read-only or sandboxed action space, and (iii) a step budget with a fallback. Model fitting and arithmetic should be *tools*, never generated text — the external-calculator result is the small-scale proof.
- **RAG over institutional knowledge.** Experiment read-outs, model cards and methodology notes (including this vault) are a non-parametric memory: answers become attributable, and updating knowledge after a new test is an index write rather than a retrain.
- **LLMs as elicitation instruments.** The vault's Knowledge Elicitation cluster — [[LLM Expert Elicitation for Bayesian Networks]], [[Code Prompts for Causal Structure]], [[LLM Causal Reasoning Tasks]], [[Fine-tuning on Conditional Statements]] — uses LLMs to propose causal structure and priors. CoT-style prompting, propose-then-verify loops and retrieval of domain documents are the levers for improving such elicitation, and the hallucination findings here are the reason a verification stage is needed before an elicited DAG feeds a Bayesian causal model.
- **Preference learning is choice modelling.** The reward model is a logistic paired-comparison model — the same machinery as conjoint and [[Discrete Choice Models]] — and RLHF's KL-regularised optimisation is a worked example of optimising against an estimated utility without leaving the region where the estimate is trustworthy, a concern shared with budget optimisation on a fitted response surface.
- **Adaptive information gathering.** An agent deciding what to look up next is doing informal [[Sequential and Adaptive BED|sequential experimental design]]; RLHF's RL step is formally a [[Contextual and Linear Bandits|contextual bandit]]. The bandit and BED notes give the principled versions of what these systems do heuristically.
- **LLM-driven agents in ABMs.** Replacing hand-coded [[Agent Decision Rules and Bounded Rationality|decision rules]] with language-conditioned policies is an active direction for consumer simulation; the agent-loop formalism ($\pi(a_t \mid c_t)$ with text observations) is the interface such models would use.

## Examples

**Choosing a technique from the symptom.**

| Symptom | First thing to try | Why (evidence) |
|---|---|---|
| Wrong answers on multi-step quantitative questions | CoT exemplars + a calculator/code tool | GSM8K 17.9 $\to$ 56.9 $\to$ 58.6 with external calculator |
| Confident but false or outdated facts | Retrieval (RAG), or a search tool in a loop | Factuality preferred 42.7% vs 7.1%; hot-swapped index tracks world changes |
| Multi-hop questions where the second query depends on the first answer | ReAct loop rather than single-shot retrieval | Thought-directed `search` / `lookup`; Act-only fails to synthesise |
| Model ignores the instruction and "continues the document" | Instruction-tuned / RLHF model (or few-shot prefix as a stopgap) | 71% preference even over few-shot-prompted GPT-3 |
| Agent repeats itself or stalls | Step budget + fallback to self-consistent CoT; better retrieval | ReAct $\to$ CoT-SC: 35.1 EM, best on HotpotQA |
| Model self-consistency is low (majority answer in fewer than half the samples) | Escalate to external evidence | CoT-SC $\to$ ReAct: 64.6%, best on FEVER |

A compact trace showing all the pieces on one task ("Did the Q3 paid-social geo test show significant lift?"):

```text
Thought 1: I need the test read-out, then check whether the interval excludes zero.
Action 1:  retrieve[paid social geo test Q3 read-out]            <- RAG as a tool
Observation 1: "...lift 4.1% (90% CrI 0.6%-7.8%), 12 treated DMAs, 6-week test..."
Thought 2: The interval excludes 0 at 90%. I should confirm the pre-period fit was adequate.
Action 2:  lookup[pre-period MAPE]
Observation 2: "Pre-period MAPE 2.3%."
Thought 3: Fit is adequate. Answer with the numbers and the source.
Action 3:  finish[Yes - 4.1% lift (90% CrI 0.6-7.8%); pre-period MAPE 2.3%. Source: Q3 read-out.]
```

(The task and numbers are illustrative; the format is ReAct's.)

## Connections

- [[Chain-of-Thought Prompting]] — reasoning by demonstration; emergence with scale; ablations.
- [[Retrieval-Augmented Generation (RAG)]] — latent-document marginalisation, DPR + BART, hot-swappable memory.
- [[ReAct - Reasoning and Acting Agents]] — augmented action space; grounded vs internal reasoning.
- [[Tool Use and the Agent Loop]] — the general loop, action-space design, decision-making results, failure modes, human thought editing.
- [[RLHF and Instruction Tuning]] — SFT $\to$ RM $\to$ PPO; KL penalty; alignment tax.
- [[Reward Modeling from Human Preferences]] — pairwise logistic loss; rater agreement; over-optimisation.
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — metrics, human evaluation protocols, error taxonomies.
- [[Transformers and LLM Foundations - Overview]] and [[In-Context Learning and Few-Shot Prompting]] — prerequisites in the sibling cluster.

## See Also

- [[LLM Expert Elicitation for Bayesian Networks]], [[Code Prompts for Causal Structure]], [[Fine-tuning on Conditional Statements]], [[LLM Causal Reasoning Tasks]] — LLMs applied to causal knowledge elicitation.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] and [[Q-learning]] — classical sequential decision making and RL-adjacent methods already in the vault.
- [[Sequential and Adaptive BED]] and [[Expected Information Gain]] — normative theory of choosing the next query.
- [[Decision Analysis]] — utilities and actions, the frame for both reward modelling and agent safety.
- [[ABM Methodology and Principles]] — the other sense of "agent" in this vault.
