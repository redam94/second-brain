---
title: Tool Use and the Agent Loop
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/llm-agents
  - type/concept
  - doc/paper
source: "[[raw/Yao 2022 - ReAct Reasoning and Acting.pdf]]"
source_location: "Yao et al. Secs. 2, 4-5, pp. 3-4, 7-9; Appendix A.3, B.2, Ethics Statement, pp. 10, 14-15. Also Wei et al. 2022 Appendix B (external calculator), p. 20; Lewis et al. 2020 Sec. 2.2 (retriever), p. 3"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[ReAct - Reasoning and Acting Agents]]"
  - "[[Chain-of-Thought Prompting]]"
  - "[[Retrieval-Augmented Generation (RAG)]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - LLM Agents
  - Agent Loop
  - Tool-Augmented Language Models
  - LLM Tool Use
  - Language Model as Policy
---

# Tool Use and the Agent Loop

> [!summary]
> An **LLM agent** is a language model used as the policy $\pi(a_t \mid c_t)$ in a closed loop: the model emits an action as text, a harness executes it against a tool or environment, and the resulting observation is appended to the context before the next call. The three source papers in this cluster supply a ladder of tool use: a **post-hoc calculator** applied to a finished chain of thought (Wei et al.), a **single learned retrieval call** made before generation (Lewis et al.), and a **multi-step, model-directed loop** over search APIs, a text game and a shopping site (Yao et al.). On ALFWorld, two-shot ReAct reaches 71% success against 45% for acting without thoughts and 37% for an imitation-learning agent trained on $10^5$ expert trajectories; on WebShop, one-shot ReAct reaches 40.0% success against 28.7–30.1% for imitation/RL baselines.

## Overview

This note abstracts the *system pattern* shared by the cluster's papers rather than any single result. "Tool" is used broadly: anything outside the model's weights that can be invoked by text and returns text — a calculator, a vector index, a Wikipedia API, a simulated household, a web shop. The reason to use tools is the same in every paper: the model's parametric knowledge and arithmetic are unreliable, so computation and facts are delegated to something that is reliable, inspectable and updatable.

Yao et al. note that ReAct is, to their knowledge, "the first demonstration of combined reasoning and action using an LLM applied to an interactive environment within a closed-loop system" (Sec. 4), building on Inner Monologue's closed loop and SayCan's LLM action proposals.

## Main Content

> [!definition] A ladder of tool integration ^def-ladder
> | Level | Who decides to call the tool? | When? | Source |
> |---|---|---|---|
> | 0. Post-hoc tool | The harness (every equation is re-evaluated with Python `eval`) | After generation | Wei et al., Appendix B: GSM8K 56.9 $\to$ 58.6 for PaLM 540B |
> | 1. Pre-generation retrieval | The architecture (always retrieve top-$K$) | Before generation | Lewis et al., Sec. 2: $p(y\mid x) \approx \sum_z p_\eta(z\mid x)\,p_\theta(y\mid x,z)$ |
> | 2. Model-directed loop | The model, conditioned on its own thoughts and all prior observations | Repeatedly, until it emits `finish` | Yao et al., Sec. 2 |
>
> Moving down the ladder shifts control from the engineer to the model, which buys flexibility (multi-hop questions, query reformulation) at the cost of new failure modes (loops, derailment by a bad observation).

> [!algorithm] The agent loop (after Yao et al., Sec. 2) ^alg-agent-loop
> **Inputs:** task description; few-shot exemplar trajectories; action space $\mathcal A$ with an executor; step budget $T$.
> 1. Initialise context $c_1 = (\text{exemplars}, \text{task}, o_1)$.
> 2. For $t = 1, \dots, T$:
>    1. Sample $\hat a_t \sim \pi_{\text{LLM}}(\cdot \mid c_t)$ from the augmented space $\hat{\mathcal A} = \mathcal A \cup \mathcal L$.
>    2. If $\hat a_t \in \mathcal L$ (a thought): set $c_{t+1} = (c_t, \hat a_t)$; no environment call.
>    3. If $\hat a_t \in \mathcal A$: execute it, receive $o_{t+1}$, set $c_{t+1} = (c_t, \hat a_t, o_{t+1})$.
>    4. If $\hat a_t$ is the terminal action (`finish[answer]`, `buy`), stop.
> 3. If the budget is exhausted with no answer, **fall back** (the paper backs off to self-consistent CoT after 7 steps on HotpotQA and 5 on FEVER — correct trajectories that long are only 0.84% and 1.33% of cases).
>
> The "memory" of the agent is nothing but $c_t$: the policy is stationary and all state lives in the growing prompt. This is also the binding constraint the authors name in their conclusion — "complex tasks with large action spaces require more demonstrations to learn well, which unfortunately can easily go beyond the input length limit of in-context learning".

**Designing the action space.** The Wikipedia API (`search`, `lookup`, `finish`) is deliberately minimal; ALFWorld uses text commands (`go to coffeetable 1`, `take paper 2`, `use desklamp 1`); WebShop uses `search`, choose-product, choose-option and `buy`. In each case actions are short strings with a fixed grammar that the harness can parse, and observations are plain text.

> [!theorem] Empirical findings on interactive decision making (Sec. 4, Tables 3–4) ^thm-decision
> **ALFWorld** (134 unseen games, 6 task types, instances with 50+ locations needing 50+ expert steps; success rate %):
>
> | Method | All tasks |
> |---|---|
> | Act, best of 6 prompts | 45 |
> | ReAct, average | 57 |
> | ReAct, best of 6 | **71** |
> | ReAct-IM (Inner-Monologue-style thoughts), best of 6 | 53 |
> | BUTLER (imitation learning, $10^5$ expert trajectories per task type), best of 8 | 37 |
>
> Even the worst ReAct prompt (48%) beats the best trial of Act and BUTLER; the relative gain of ReAct over Act across six controlled trials ranges from 33% to 90%, averaging 62%.
>
> **WebShop** (1.18M real products, 12k instructions, 500 test instructions):
>
> | Method | Score | Success rate |
> |---|---|---|
> | Act (one-shot) | 62.3 | 30.1 |
> | ReAct (one-shot) | 66.6 | **40.0** |
> | Imitation learning (1,012 human trajectories) | 59.9 | 29.1 |
> | IL + RL (+10,587 instructions) | 62.4 | 28.7 |
> | Human expert | 82.1 | 59.6 |

**What the thoughts are for.** Without thoughts, Act "fails to correctly decompose goals into smaller subgoals, or loses track of the current state of the environment". The ReAct-IM ablation restricts thoughts to restating the current goal and sub-goal (dense external-feedback style): it loses 18 points, because it lacks thoughts that decide *when a sub-goal is complete*, *what the next one is*, and that invoke commonsense priors about where objects are likely to be (Appendix B.2). On WebShop, thoughts bridge "the gap between noisy observations and actions" — e.g. recognising that option strings `39x18x18inch` and `blue` satisfy "space-saving ottoman bench".

**Failure modes of the loop.** From the HotpotQA audit in [[ReAct - Reasoning and Acting Agents]]: (i) **looping** — regenerating the previous thought and action, attributed partly to greedy decoding; (ii) **derailment by uninformative observations** — 23% of failures follow an empty or useless search result; (iii) reduced reasoning flexibility relative to free-form CoT. From RAG: (iv) **retrieval collapse** — the retriever returns the same documents regardless of input and the generator learns to ignore them.

> [!definition] Human-in-the-loop thought editing ^def-thought-edit
> Because the policy is conditioned on its own visible reasoning, a human can steer the agent by **editing a thought** rather than retraining or scripting actions. In Yao et al. Appendix A.3 (Fig. 5), removing one hallucinated sentence from Act 17 and adding a hint at Act 23 turns a failing ALFWorld trajectory into a success — "from typing tens of actions to only editing a couple of thoughts". This is impossible for Act-only or RL policies, where "a human cannot change the model parameters, and changing a few actions might not edit the rest of the model behavior".

**Risk.** The ReAct ethics statement is explicit that "hooking up a large language model with an action space to interact with external environments ... has potential dangers, e.g. looking up inappropriate or private information, or taking harmful actions". Their mitigation is by construction: read-only websites and no irreversible actions (the agent "cannot really buy products"). Restricting the action space remains the primary safety lever for any deployed agent.

**Prompting vs training the policy.** Prompted ReAct is the weakest of four methods at 8B/62B scale but the strongest after fine-tuning on 3,000 self-generated successful trajectories; WebGPT-style systems instead learn the policy with imitation and RL from human feedback (see [[RLHF and Instruction Tuning]]). The authors suggest multi-task training and RL as the route to "stronger agents".

## Examples

A minimal harness implementing [[#^alg-agent-loop]]:

```python
import re

def run_agent(llm, tools: dict, exemplars: str, task: str, max_steps: int = 7, fallback=None):
    ctx = f"{exemplars}\n\nQuestion: {task}\n"
    for t in range(1, max_steps + 1):
        step = llm(ctx + f"Thought {t}:", stop=[f"Observation {t}:"])   # thought + action
        ctx += f"Thought {t}:{step}"
        m = re.search(r"Action \d+:\s*(\w+)\[(.*?)\]", step)
        if m is None:                       # thought only: context updated, no env call
            continue
        name, arg = m.group(1).lower(), m.group(2)
        if name == "finish":
            return arg
        obs = tools[name](arg) if name in tools else f"Unknown action {name}."
        ctx += f"\nObservation {t}: {obs}\n"
    return fallback(task) if fallback else None     # e.g. CoT-SC majority vote
```

An applied instantiation for a measurement team: tools `query_warehouse[sql]`, `fit_geo_lift[config]`, `lookup_experiment[id]` and `finish[summary]`, all read-only or sandboxed. A thought such as "the pre-period has only 3 weeks; I should check whether the synthetic-control fit is adequate before reporting lift" is exactly the progress-tracking / exception-handling reasoning that separates ReAct from Act — and, per [[#^def-thought-edit]], an analyst can correct it in place.

## Connections

- [[ReAct - Reasoning and Acting Agents]] — formal definition of the augmented action space and the knowledge-task results.
- [[Chain-of-Thought Prompting]] — level-0 tool use (the external calculator) and the reasoning component of every thought.
- [[Retrieval-Augmented Generation (RAG)]] — level-1 tool use with a learned, differentiable retriever.
- [[Dynamic Treatment Regimes Framework]], [[Optimal Regime via Dynamic Programming]] and [[Q-learning]] — classical sequential decision making with history-dependent rules $d_k(\bar s_k, \bar a_{k-1})$; an LLM agent uses the same history-conditioned policy form but obtains it from a language prior instead of backward induction on a value function.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] and [[UCB and Greedy Algorithms for Bandits]] — principled exploration; prompted agents explore only heuristically (the paper notes human experts "perform significantly more product explorations and query re-formulations").
- [[Sequential and Adaptive BED]] — choosing the next query to maximise information, the normative version of "decide what to search next".
- [[Decision Analysis]] — an agent that takes consequential actions needs an explicit utility and action set; restricting $\mathcal A$ is the loop's main safety control.
- [[Agent Decision Rules and Bounded Rationality]] and [[ABM Methodology and Principles]] — "agent" in the ABM sense: many simple rule-followers producing macro dynamics, versus one language-conditioned policy solving a task.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]]
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — success rate, score, and best-of-$k$ prompt reporting for agents.
- [[LLM Expert Elicitation for Bayesian Networks]] and [[LLM-BN Decision Support Application]] — multi-LLM pipelines for causal structure elicitation and decision support.
- [[Bandit Models with Delayed and Censored Feedback]] — sparse, delayed rewards, the regime ALFWorld and WebShop are chosen to represent.
