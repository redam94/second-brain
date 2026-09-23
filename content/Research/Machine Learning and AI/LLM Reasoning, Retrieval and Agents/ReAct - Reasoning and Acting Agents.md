---
title: ReAct - Reasoning and Acting Agents
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/llm-agents
  - type/method
  - doc/paper
source: "[[raw/Yao 2022 - ReAct Reasoning and Acting.pdf]]"
source_location: "Secs. 1-3, pp. 1-7; Appendix A.1, C.1, pp. 14-18"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Chain-of-Thought Prompting]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[Tool Use and the Agent Loop]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
aliases:
  - ReAct
  - Reason and Act
  - ReAct Prompting
  - Thought-Action-Observation Loop
---

# ReAct - Reasoning and Acting Agents

> [!summary]
> **ReAct** (Yao et al., ICLR 2023) prompts a frozen LLM to emit **reasoning traces ("thoughts") and task-specific actions in an interleaved manner**. Formally it enlarges the agent's action space from $\mathcal A$ to $\hat{\mathcal A} = \mathcal A \cup \mathcal L$, where $\mathcal L$ is the space of language: a thought changes nothing in the environment and returns no observation, but it updates the context on which later actions are conditioned. Thoughts let the model plan, track progress and handle exceptions (*reason to act*); actions fetch external information that grounds the thoughts (*act to reason*). On HotpotQA, [[Chain-of-Thought Prompting|CoT]]'s dominant failure is hallucinated facts (56% of failures) while ReAct's is 0%; combining ReAct with self-consistent CoT gives the best prompting results (35.1 EM HotpotQA, 64.6% FEVER).

## Overview

Before ReAct, two lines of work were separate. *Reasoning* work — [[Chain-of-Thought Prompting]] — showed LLMs can derive answers through intermediate steps, but the chain is "a static black box": the model reasons only over its internal representations, is "not grounded in the external world", and therefore suffers "fact hallucination and error propagation" (Sec. 1). *Acting* work (SayCan, WebGPT, Inner Monologue) used LLMs to propose actions in interactive environments but did not have them "reason abstractly about high-level goals or maintain a working memory to support acting".

ReAct's motivating analogy is human inner speech while cooking: between physical actions we verbally track progress ("now that everything is cut, I should heat up the pot"), handle exceptions ("I don't have salt, so let me use soy sauce"), and notice when information is missing ("how do I prepare dough? Let me search"). The paper tests the idea on knowledge-intensive reasoning (HotpotQA, FEVER; this note) and on interactive decision making (ALFWorld, WebShop; see [[Tool Use and the Agent Loop]]), all with PaLM-540B and between one and six in-context examples.

## Main Content

> [!definition] Agent–environment setup ^def-setup
> At step $t$ an agent receives an observation $o_t \in \mathcal O$ and takes an action $a_t \in \mathcal A$ following a policy $\pi(a_t \mid c_t)$, where the **context** is the full history
> $$
> c_t = (o_1, a_1, \dots, o_{t-1}, a_{t-1}, o_t).
> $$
> Learning $\pi$ is hard when the map $c_t \mapsto a_t$ "is highly implicit and requires extensive computation" (Sec. 2).

> [!definition] ReAct's augmented action space ^def-react
> ReAct sets $\hat{\mathcal A} = \mathcal A \cup \mathcal L$. An action $\hat a_t \in \mathcal L$ — a **thought** or reasoning trace — "does not affect the external environment, thus leading to no observation feedback". Its only effect is on the context:
> $$
> c_{t+1} = (c_t, \hat a_t).
> $$
> Because $\mathcal L$ is unbounded, learning in $\hat{\mathcal A}$ "requires strong language priors" — supplied here by a frozen LLM prompted with a few human-written trajectories of thoughts, actions and observations.

**Kinds of useful thought (Sec. 2).** Decomposing the goal and creating a plan; injecting commonsense knowledge; extracting the important part of an observation; tracking progress and transitioning between sub-plans; handling exceptions and adjusting the plan.

**Dense vs sparse thoughts.** For reasoning-heavy tasks, thoughts and actions strictly alternate, giving thought–action–observation steps. For long-horizon decision-making tasks, thoughts appear only "sparsely in the most relevant positions of a trajectory", and the model itself decides when to think.

> [!definition] The Wikipedia action space (Sec. 3.1) ^def-wiki-actions
> 1. `search[entity]` — returns the first 5 sentences of the entity's wiki page, or else the top-5 similar entity names.
> 2. `lookup[string]` — returns the next sentence on the current page containing the string (simulating Ctrl+F).
> 3. `finish[answer]` — ends the episode with an answer.
> This is deliberately "significantly weaker than state-of-the-art lexical or neural retrievers" such as the dense retriever in [[Retrieval-Augmented Generation (RAG)]]; the point is to force retrieval to be driven by explicit reasoning.

**Baselines by ablation (Sec. 3.2).** From each ReAct exemplar the authors delete components: *Standard* (no thoughts, actions, observations), *CoT* (thoughts only), *Act* (actions and observations only), plus *CoT-SC* — self-consistency, sampling 21 CoT trajectories at temperature 0.7 and taking the majority answer.

> [!theorem] Empirical findings on HotpotQA and FEVER (Table 1, PaLM-540B) ^thm-results
>
> | Method | HotpotQA (EM) | FEVER (Acc) |
> |---|---|---|
> | Standard | 28.7 | 57.1 |
> | CoT | 29.4 | 56.3 |
> | CoT-SC (21 samples) | 33.4 | 60.4 |
> | Act | 25.7 | 58.9 |
> | ReAct | 27.4 | 60.9 |
> | CoT-SC $\to$ ReAct | 34.2 | **64.6** |
> | ReAct $\to$ CoT-SC | **35.1** | 62.0 |
> | Supervised SoTA | 67.5 | 89.5 |
>
> ReAct beats Act on both tasks (reasoning guides acting and synthesises the final answer). ReAct beats CoT on FEVER but trails it slightly on HotpotQA. All prompting methods remain far below supervised systems.

> [!definition] Combining internal and external knowledge ^def-backoff
> - **ReAct $\to$ CoT-SC**: if ReAct fails to return an answer within 7 (HotpotQA) or 5 (FEVER) steps, back off to CoT-SC.
> - **CoT-SC $\to$ ReAct**: if the majority answer among $n$ CoT-SC samples occurs fewer than $n/2$ times — "internal knowledge might not support the task confidently" — back off to ReAct.
> The hybrids reach the 21-sample CoT-SC score using only 3–5 samples (Fig. 2). The second rule is an uncertainty-triggered information-acquisition policy: pay for external evidence only when the model's own answers disagree.

**Human error analysis (Table 2).** 50 correct and 50 incorrect trajectories per method on HotpotQA:

| Category | ReAct | CoT |
|---|---|---|
| Success — true positive (correct reasoning and facts) | 94% | 86% |
| Success — false positive (hallucinated reasoning or facts) | 6% | 14% |
| Failure — reasoning error (incl. repetitive loops) | 47% | 16% |
| Failure — search result error (empty or unhelpful) | 23% | – |
| Failure — hallucination | 0% | 56% |
| Failure — label ambiguity | 29% | 28% |

The trade-off is explicit: grounding buys factuality but the interleaved structure "reduces its flexibility in formulating reasoning steps". A ReAct-specific pathology is **looping** — repeating the previous thought and action — and a single uninformative search "derails the model reasoning".

**Fine-tuning (Sec. 3.3, Fig. 3).** With smaller models (PaLM-8B/62B), *prompted* ReAct is the worst of the four methods: learning both to reason and to act from a few examples is hard. After fine-tuning on just 3,000 self-generated correct trajectories (a STaR-style bootstrap) it becomes the best: fine-tuned PaLM-8B ReAct beats all PaLM-62B prompting methods, and fine-tuned 62B beats all 540B prompting methods. Fine-tuning Standard or CoT "essentially teaches models to memorize (potentially hallucinated) knowledge facts", while fine-tuning ReAct/Act teaches the transferable skill of *looking things up*. GPT-3 (`text-davinci-002`) prompted with ReAct beats PaLM-540B (30.8 vs 29.4 EM on HotpotQA; 78.4 vs 70.9 on ALFWorld), "possibly because it is finetuned with human instruction following" — see [[RLHF and Instruction Tuning]].

## Examples

A HotpotQA exemplar from the prompt (Appendix C.1), abridged:

```text
Question: What is the elevation range for the area that the eastern sector
          of the Colorado orogeny extends into?
Thought 1: I need to search Colorado orogeny, find the area that the eastern
           sector of the Colorado orogeny extends into, then find the
           elevation range of the area.
Action 1:  Search[Colorado orogeny]
Observation 1: The Colorado orogeny was an episode of mountain building (an
           orogeny) in Colorado and surrounding areas.
Thought 2: It does not mention the eastern sector. So I need to look up
           eastern sector.
Action 2:  Lookup[eastern sector]
Observation 2: (Result 1 / 1) The eastern sector extends into the High Plains
           and is called the Central Plains orogeny.
Thought 3: The eastern sector of Colorado orogeny extends into the High
           Plains. So I need to search High Plains and find its elevation range.
Action 3:  Search[High Plains]
Observation 3: High Plains refers to one of two distinct land regions
Thought 4: I need to instead search High Plains (United States).
Action 4:  Search[High Plains (United States)]
...
```

Thought 1 decomposes the question, Thought 2 extracts what the observation lacks, Thought 3 synthesises an intermediate fact, Thought 4 reformulates a failed search. In the paper's Figure 1 (a question about which other device can control the program the Apple Remote was designed for) the CoT-only baseline confidently hallucinates "iPhone, iPad, and iPod Touch", the Act-only baseline retrieves the right pages but ends with a nonsensical `Finish[yes]`, and ReAct reaches "keyboard function keys" after recovering from a failed search.

## Connections

- [[Chain-of-Thought Prompting]] — the reasoning-only special case ($\hat a_t \in \mathcal L$ always); ReAct's thoughts are CoT steps conditioned on observations.
- [[Retrieval-Augmented Generation (RAG)]] — single-shot learned retrieval vs ReAct's multi-step, language-directed retrieval through a crude API.
- [[Tool Use and the Agent Loop]] — generalises the thought–action–observation cycle to arbitrary tools and environments; covers ALFWorld, WebShop and human-in-the-loop thought editing.
- [[Sequential and Adaptive BED]] — each `search` is an experiment chosen in light of everything observed so far; the CoT-SC $\to$ ReAct rule is a crude "acquire data only when posterior disagreement is high" policy (compare [[Expected Information Gain]]).
- [[Dynamic Treatment Regimes Framework]] and [[Optimal Regime via Dynamic Programming]] — the same history-dependent policy formalism $\pi(a_t \mid c_t)$, but with a learned value function instead of a language prior.
- [[LLM Expert Elicitation for Bayesian Networks]] — a propose-then-verify dual-LLM pipeline; ReAct instead verifies against an external source.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]]
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — the success/failure-mode taxonomy above as an evaluation instrument.
- [[Agent Decision Rules and Bounded Rationality]] — rule-based agents in ABMs; LLM agents replace hand-coded decision rules with a language-conditioned policy.
- [[Contextual and Linear Bandits]] — one-step contextual decision making, the horizon-1 analogue of this setup.
