---
title: Chain-of-Thought Prompting
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/prompting
  - type/method
  - doc/paper
source: "[[raw/Wei 2022 - Chain-of-Thought Prompting.pdf]]"
source_location: "Secs. 2-6, pp. 2-9; Appendix A.1-A.2, B (Tables 1-4), D, pp. 15-27"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[In-Context Learning and Few-Shot Prompting]]"
  - "[[Transformers and LLM Foundations - Overview]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[ReAct - Reasoning and Acting Agents]]"
  - "[[Tool Use and the Agent Loop]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
  - "[[Q - In-Context Learning as Amortized Bayesian Inference]]"
aliases:
  - CoT
  - CoT Prompting
  - Chain of Thought
  - Step-by-Step Reasoning Prompts
---

# Chain-of-Thought Prompting

> [!summary]
> **Chain-of-thought (CoT) prompting** (Wei et al., NeurIPS 2022) augments each few-shot exemplar from a pair $\langle \text{input}, \text{output}\rangle$ to a triple $\langle \text{input}, \textit{chain of thought}, \text{output}\rangle$, where the chain of thought is a short series of natural-language intermediate reasoning steps. No weights are updated. With only eight hand-written exemplars, PaLM 540B moves from 17.9% to 56.9% on the GSM8K math-word-problem benchmark, beating a fine-tuned GPT-3 with a verifier (55%). The gain is an **emergent ability of scale**: below roughly 100B parameters CoT is neutral or harmful, because small models produce "fluent but illogical" chains.

## Overview

Standard [[In-Context Learning and Few-Shot Prompting|few-shot prompting]] (Brown et al. 2020) shows the model input–output pairs and asks it to emit the answer directly. Wei et al. observe that this works poorly on tasks requiring multi-step reasoning and, more importantly, that the scaling curve for such tasks is often *flat*: making the model bigger does not help. Their fix combines two older ideas — rationale-augmented training (costly, needs large rationale datasets) and in-context learning (cheap, but weak at reasoning) — by putting the rationales *inside the prompt*.

The paper evaluates five model families (GPT-3/InstructGPT 350M–175B, LaMDA 422M–137B, PaLM 8B–540B, UL2 20B, Codex) with greedy decoding on three task groups: arithmetic (GSM8K, SVAMP, ASDiv, AQuA, MAWPS), commonsense (CSQA, StrategyQA, BIG-bench Date and Sports Understanding, SayCan) and symbolic (last-letter concatenation, coin flip). The headline claim is that standard prompting "only provides a lower bound on the capabilities of large language models" (Sec. 6).

## Main Content

> [!definition] Chain of thought ^def-cot
> A **chain of thought** is "a coherent series of intermediate reasoning steps that lead to the final answer for a problem" (Sec. 2). **Chain-of-thought prompting** supplies a few demonstrations of such chains as exemplars in a few-shot prompt, so that the model generates its own chain before the final answer at test time. Writing $x$ for the question, $r$ for the rationale and $y$ for the answer, the prompt is $(x_1, r_1, y_1), \dots, (x_k, r_k, y_k), x_{\text{test}}$ and the model autoregressively decodes $r_{\text{test}}$ and then $y_{\text{test}}$ — so the answer is conditioned on the generated reasoning.

**Four properties claimed (Sec. 2).** (1) Decomposition lets the model allocate more computation (more generated tokens) to problems needing more steps. (2) The chain gives "an interpretable window into the behavior of the model", useful for debugging — with the caveat that fully characterising the supporting computation "remains an open question". (3) It applies in principle to any task a human can solve via language. (4) It is elicited from off-the-shelf models with no fine-tuning.

> [!theorem] Empirical finding — CoT is an emergent ability of scale ^thm-emergence
> On arithmetic benchmarks (Table 2, Appendix B), CoT "does not positively impact performance for small models, and only yields performance gains when used with models of $\sim$100B parameters" (Sec. 3.2). GSM8K solve rates, standard $\to$ CoT:
>
> | Model | Standard | CoT |
> |---|---|---|
> | LaMDA 8B | 3.2 | 1.6 |
> | LaMDA 137B | 6.5 | 14.3 |
> | GPT-3 6.7B | 4.0 | 2.4 |
> | GPT-3 175B | 15.6 | 46.9 |
> | PaLM 8B | 4.9 | 4.1 |
> | PaLM 62B | 9.6 | 29.9 |
> | PaLM 540B | 17.9 | 56.9 |
> | Codex | 19.7 | 63.1 |
>
> Prior supervised best on GSM8K: 55% (fine-tuned GPT-3 175B + verifier, Cobbe et al. 2021).

Two further regularities: gains are larger on harder problems (GSM8K more than doubles, while the single-step SingleOp subset of MAWPS is flat or slightly negative — PaLM 540B 94.1 $\to$ 94.1), and the multi-step MultiArith subset jumps from 42.2 to 94.7 for PaLM 540B (Table 3).

> [!example] Ablations — what is actually doing the work? (Sec. 3.3, Fig. 5) ^ex-ablations
> Three alternative prompts test competing explanations, using LaMDA 137B and PaLM 540B on GSM8K:
> - **Equation only** — emit just the equation before the answer. Little help on GSM8K (the semantics are too hard to translate directly), though it does help on one- and two-step datasets.
> - **Variable compute only** — emit a string of dots ("...") of the same length as the equation, isolating "more tokens = more compute". Performs about the same as baseline, so extra computation alone is not the mechanism.
> - **Reasoning after answer** — give the chain *after* the answer, testing whether CoT merely activates relevant knowledge. Also about baseline, so the answer genuinely depends on the sequentially generated reasoning.

**Robustness (Sec. 3.4, Fig. 6).** Prompting methods are notoriously exemplar-sensitive (GPT-3 on SST-2 ranges from 54.3% to 93.4% across exemplar permutations, Zhao et al. 2021). For CoT, chains written by three different annotators, a deliberately concise style, and three sets of exemplars sampled from the GSM8K training set all outperform standard prompting by a large margin on LaMDA 137B; results are also robust to exemplar order and number (Appendix A.2).

**Commonsense and symbolic reasoning (Secs. 4–5).** With PaLM 540B, CoT beats the prior state of the art on StrategyQA (75.6% vs 69.4%) and an unaided sports enthusiast on Sports Understanding (95.4% vs 84%); gains on CSQA are minimal. On the symbolic tasks, exemplars show only 2-step problems and the test set has 3–4 steps (out-of-domain): standard prompting fails outright while CoT gives upward scaling curves, i.e. CoT "facilitates length generalization".

**Error analysis (Sec. 3.2, Appendix D).** For LaMDA 137B on GSM8K, of 50 correct answers all but two had logically correct chains. Of 50 wrong answers, 46% were *almost correct* (8% calculator error only, 16% symbol-mapping error, 22% one step missing) and 54% had major semantic or coherence errors. Scaling PaLM 62B $\to$ 540B fixes a large share of the one-step-missing and semantic-understanding errors (Appendix A.1).

> [!definition] External calculator post-processing ^def-ext-calc
> Because many chains are right except for arithmetic, the authors run Python `eval` on every equation in the generated chain and propagate the corrected values forward by string matching (Appendix B, Table 1). This lifts PaLM 540B on GSM8K from 56.9 to 58.6 and LaMDA 137B from 14.3 to 17.8. It is the simplest instance of [[Tool Use and the Agent Loop|tool use]]: the model plans, a deterministic tool computes.

**Limitations stated by the authors (Sec. 6).** (i) Emulating human reasoning "does not answer whether the neural network is actually 'reasoning'"; (ii) annotation cost is trivial for few-shot use but could be prohibitive for fine-tuning; (iii) "there is no guarantee of correct reasoning paths", which can yield both correct and incorrect answers; (iv) emergence only at large scale makes CoT costly to serve. Point (iii) is precisely what [[ReAct - Reasoning and Acting Agents|ReAct]] later quantifies: 56% of CoT failures on HotpotQA are hallucinated facts.

## Examples

The canonical exemplar (Fig. 1). Standard prompting demonstrates `A: The answer is 11.`; CoT demonstrates the reasoning:

```text
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls.
   Each can has 3 tennis balls. How many tennis balls does he have now?
A: Roger started with 5 balls. 2 cans of 3 tennis balls each is 6
   tennis balls. 5 + 6 = 11. The answer is 11.

Q: The cafeteria had 23 apples. If they used 20 to make lunch and
   bought 6 more, how many apples do they have?
A:
```

With the standard exemplar the model answers `27` (wrong); with the CoT exemplar it generates "The cafeteria had 23 apples originally. They used 20 to make lunch. So they had 23 - 20 = 3. They bought 6 more apples, so they have 3 + 6 = 9. The answer is 9."

A minimal harness with the calculator patch of [[#^def-ext-calc]]:

```python
import re

def cot_answer(llm, exemplars: str, question: str) -> str:
    chain = llm(f"{exemplars}\nQ: {question}\nA:", temperature=0)  # greedy, as in the paper
    # post-hoc external calculator: recompute the right-hand side of every "a op b = c"
    fix = lambda m: f"{m.group(1)}= {eval(m.group(1))}"
    chain = re.sub(r"(\d[\d\.\s\+\-\*/\(\)]*[\+\-\*/][\d\.\s\(\)]+)=\s*[\d\.]+", fix, chain)
    # (the paper also propagates corrected values into later equations by string matching)
    return re.search(r"The answer is (.+?)\.?\s*$", chain).group(1)
```

An applied analogue: asking an LLM "is this geo test adequately powered?" tends to give a confident one-word answer; a CoT exemplar that walks through effect size, variance, number of geos and test duration before concluding produces an auditable chain whose individual steps can be checked against a real [[Power Analysis and Sample Size|power calculation]].

## Connections

- [[In-Context Learning and Few-Shot Prompting]] — CoT is few-shot prompting with richer exemplars; it inherits exemplar sensitivity but changes the scaling curve.
- [[Transformers and LLM Foundations - Overview]] — autoregressive decoding is why generated reasoning tokens can condition the final answer, and why "reasoning after answer" fails.
- [[ReAct - Reasoning and Acting Agents]] — interleaves CoT-style thoughts with environment actions to ground them; uses CoT and self-consistency (CoT-SC) as baselines and as a fallback.
- [[Tool Use and the Agent Loop]] — the external calculator is a one-shot tool call; agents generalise it to a loop.
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — solve-rate benchmarks, manual chain audits and error taxonomies used here.
- [[Code Prompts for Causal Structure]] and [[Code vs Text Prompt Evaluation]] — a different way to structure intermediate reasoning (conditional code rather than prose) for causal tasks.
- [[LLM Causal Reasoning Tasks]] — abductive and counterfactual generation tasks where explicit intermediate structure also helps.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]] — cluster map.
- [[RLHF and Instruction Tuning]] — the GPT-3 models evaluated here (`text-davinci-002`) are InstructGPT-family models; instruction tuning changes how readily chains are elicited.
- [[Emergent Phenomena in ABM]] — a different, mechanistic sense of "emergence" (macro patterns from micro rules) worth contrasting with "emergent abilities of scale".
- [[LLM Expert Elicitation for Bayesian Networks]] — an applied pipeline where an LLM's stated reasoning is verified by a second model.
