---
title: "Generative Agents Architecture - Memory, Reflection and Planning"
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/generative-agents
  - type/method
  - doc/paper
source: "[[raw/Park 2023 - Generative Agents Interactive Simulacra.pdf]]"
source_location: "Sec. 4 (architecture: 4.1 memory and retrieval, 4.2 reflection, 4.3 planning and reacting); Sec. 6 (controlled evaluation); Sec. 7 (end-to-end evaluation); Sec. 8.2-8.3 (limitations, ethics)"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[LLM-Powered Agents - Overview]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
  - "[[Emergent Phenomena in ABM]]"
used_by:
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Generative Agents
  - "Generative Agents Architecture (Memory, Reflection, Planning)"
  - Memory Stream
  - Smallville
  - Park et al 2023
---

# Generative Agents Architecture - Memory, Reflection and Planning

> [!summary]
> Park et al. (2023, UIST) introduce **generative agents**: LLM-driven agents that "simulate believable human behavior" over long horizons by wrapping the language model (gpt-3.5-turbo) in an architecture with three components — a **memory stream** with scored retrieval, periodic **reflection** that synthesises memories into higher-level inferences, and recursive **planning** with reaction. Twenty-five agents in the *Smallville* sandbox, each seeded with one paragraph of natural-language description, produced emergent **information diffusion** (party awareness $4\% \to 52\%$ of agents), **relationship formation** (network density $0.167 \to 0.74$) and **coordination** (5 of 12 invitees attended a party) without scripting. In an ablation with 100 human raters the full architecture beat every ablation *and* a human crowdworker baseline (TrueSkill $\mu = 29.89$ vs. $21.21$ for the no-memory baseline; Cohen's $d = 8.16$).

## Overview

A bare LLM prompted with a persona is *stateless*: it has no record of what the agent did an hour ago. Park et al. show this produces locally plausible but globally incoherent behaviour — an agent asked what to do at each time step "would eat lunch at 12 pm, but then again at 12:30 pm and 1 pm" (Sec. 4.3). The architecture's job is to decide **which slice of an ever-growing experience log to put in the prompt**, and to give the agent stable higher-level beliefs and intentions. Everything is stored and reasoned over as natural language.

For ABM readers, the architecture is a replacement for the agent's *state vector and transition rule*. In classical consumer ABMs the state is a handful of numbers (attitude, satisfaction, threshold — see [[Behavioral Primitives and Thresholds]], [[Consumer Utility Function Components]]); here the state is a text database, and the transition rule is "retrieve, prompt, parse".

## Main Content

> [!definition] Memory stream ^def-memory-stream
> A list of memory objects, each holding a natural-language description, a creation timestamp and a most-recent-access timestamp. The base element is an **observation** — an event directly perceived by the agent (its own actions, other agents' actions, object states). **Reflections** and **plans** are stored in the same stream and retrieved alongside observations (Sec. 4.1–4.3).

> [!algorithm] Retrieval function (Sec. 4.1) ^alg-retrieval
> Given the current situation as a query, score every memory $m$ by
>
> $$
> \text{score}(m) = \alpha_{\text{recency}}\,\text{recency}(m) + \alpha_{\text{importance}}\,\text{importance}(m) + \alpha_{\text{relevance}}\,\text{relevance}(m)
> $$
>
> with each component min-max scaled to $[0,1]$ and all $\alpha = 1$ in the implementation.
> - **Recency**: exponential decay over sandbox game-hours since the memory was last *retrieved*, decay factor $0.995$, i.e. $\text{recency}(m) \propto 0.995^{\Delta h}$.
> - **Importance**: the LLM is asked to rate "on the scale of 1 to 10, where 1 is purely mundane (e.g., brushing teeth, making bed) and 10 is extremely poignant (e.g., a break up, college acceptance)" the poignancy of the memory; scored once at creation.
> - **Relevance**: cosine similarity between the embedding of the memory text and the embedding of the query.
>
> The top-ranked memories that fit the context window are inserted in the prompt.

> [!algorithm] Reflection (Sec. 4.2) ^alg-reflection
> 1. **Trigger**: reflect when the sum of importance scores of the latest perceived events exceeds a threshold ($150$ in the implementation; roughly two or three reflections per game day).
> 2. **What to reflect on**: feed the 100 most recent memories to the LLM and ask, "Given only the information above, what are 3 most salient high-level questions we can answer about the subjects in the statements?"
> 3. **Gather evidence**: use each question as a retrieval query (reflections are eligible evidence too).
> 4. **Synthesize**: prompt "What 5 high-level insights can you infer from the above statements? (example format: insight (because of 1, 5, 3))".
> 5. **Store** each insight as a reflection with pointers to the cited memories. Because reflections can cite reflections, the agent builds a **reflection tree** whose leaves are observations and whose upper nodes are increasingly abstract self- and other-knowledge (e.g. "Klaus Mueller is dedicated to his research on gentrification").

> [!algorithm] Planning and reacting (Sec. 4.3) ^alg-planning
> 1. **Top-down day plan**: prompt with the agent's summary description and a summary of yesterday; obtain 5–8 broad chunks. A plan entry has a location, a start time and a duration.
> 2. **Recursive decomposition**: refine into hour-long chunks, then 5–15 minute actions. Plans are stored in the memory stream.
> 3. **React**: each time step, perceived observations are stored, and the LLM is asked (given the agent summary, the observation and a retrieved context summary of the observer's relationship with the observed entity) "Should [agent] react to the observation, and if so, what would be an appropriate reaction?" If yes, the plan is regenerated from that moment.
> 4. **Dialogue**: utterances are generated conditioned on each speaker's summarised memory of the other and the dialogue history, until one agent ends the conversation.

**Grounding to the world (Sec. 5).** The sandbox is a tree of areas and objects rendered to text ("there is a stove in the kitchen"). Each agent carries its own, possibly stale, subtree — agents "are not omniscient". Action locations are chosen by recursively prompting down the tree; object state changes are also LLM-inferred. Agents are initialised from a semicolon-delimited paragraph whose clauses become seed memories.

### Evidence

> [!theorem] Controlled evaluation — ablation result (Sec. 6) ^thm-ablation
> Within-subjects design: 100 Prolific participants ranked, for the same agent, interview answers from five conditions across five question categories (self-knowledge, memory, plans, reactions, reflections). TrueSkill ratings ($\mu$; $\sigma \approx 0.7$):
>
> | Condition | $\mu$ |
> |---|---|
> | Full architecture | 29.89 |
> | No reflection | 26.88 |
> | No reflection, no planning | 25.64 |
> | Human crowdworker role-play | 22.95 |
> | No memory, planning or reflection (prior state of the art) | 21.21 |
>
> Kruskal–Wallis $H(4) = 150.29$, $p < 0.001$; all Dunn post-hoc pairwise differences significant at $p < 0.001$ (Holm–Bonferroni adjusted; cf. [[Multiple Testing Corrections]]) except crowdworker vs. fully ablated. Full vs. fully ablated: $d = 8.16$.

> [!example] End-to-end emergent behaviour (Sec. 7.1) ^ex-emergence
> 25 agents, two game days, two seeded facts each known to one agent:
> - **Information diffusion**: Sam's mayoral candidacy $1 \to 8$ agents ($4\% \to 32\%$); Isabella's Valentine's party $1 \to 13$ agents ($4\% \to 52\%$). Every claimed awareness was traced to an actual dialogue in the memory stream — none hallucinated.
> - **Relationship formation**: mutual-knowledge graph density $\eta = 2|E| / \big(|V|(|V|-1)\big)$ rose from $0.167$ to $0.74$; $1.3\%$ ($n = 6$ of 453) of awareness responses were hallucinated.
> - **Coordination**: 12 agents were invited to the party; 5 attended. Of the 7 no-shows, 3 cited conflicts and 4 expressed interest but never planned to go.

This is [[Emergent Phenomena in ABM|emergence]] in the ABM sense: a population-level diffusion curve and a social network were not programmed but arose from pairwise conversations. It is the generative counterpart of the contagion rules in [[Word of Mouth Mechanisms]] and the endogenous tie formation of [[Social Network Formation in Consumer Markets]]. The intention–behaviour gap (4 interested non-attenders) is a familiar marketing phenomenon that rule-based WOM models have to add by hand.

### Failure modes (Secs. 6.5, 7.2, 8.2)

- **Retrieval failures and embellishment**: agents sometimes miss the right memory, retrieve fragments, or embellish (one agent described neighbour "Adam Smith" as author of *Wealth of Nations*). Outright fabrication of experiences was rare.
- **Location drift**: as memory grows, agents choose atypical places (lunch at the bar).
- **Norms not conveyed in language**: entering a closed store or an occupied single-person bathroom.
- **Instruction-tuning artefacts**: agents are "overly formal" and "overly cooperative"; Isabella "rarely said no" to others' suggestions and her interests drifted toward theirs — a systematic bias toward agreeableness that would *inflate* simulated social influence ([[Opinion Leaders and Social Influence]]).
- **Cost**: simulating 25 agents for two days cost "thousands of dollars in token credits" and multiple days of wall-clock time.
- **Robustness and bias**: vulnerable to prompt and memory hacking; "any imperfections in the underlying large language models will be inherited"; may fail for marginalised sub-populations. The authors insist agents "should never be a substitute for real human input in studies and design processes" (Sec. 8.3).

## Examples

A compact implementation sketch of the retrieval score (illustrative; constants from the paper):

```python
import numpy as np

def minmax(x):
    x = np.asarray(x, float)
    return (x - x.min()) / (x.max() - x.min() + 1e-12)

def retrieve(memories, query_emb, now_hours, k=10, decay=0.995):
    rec = [decay ** (now_hours - m.last_access_hours) for m in memories]
    imp = [m.importance for m in memories]                 # 1..10, LLM-rated at creation
    rel = [m.emb @ query_emb / (np.linalg.norm(m.emb) * np.linalg.norm(query_emb))
           for m in memories]
    score = minmax(rec) + minmax(imp) + minmax(rel)        # all alphas = 1
    top = np.argsort(-score)[:k]
    for i in top:
        memories[i].last_access_hours = now_hours          # retrieval refreshes recency
    return [memories[i] for i in top]
```

Note the half-life implied by $0.995$/hour is $\ln 0.5 / \ln 0.995 \approx 138$ game-hours (about 5.8 days), and that retrieval itself refreshes recency — a rehearsal effect: memories that keep being used stay accessible. In a brand-tracking ABM this is a natural mechanism for ad-stock-like persistence of brand memories, where the decay rate plays the role of the carry-over parameter.

## Connections

- [[LLM-Powered Agents - Overview]] — Gao et al.'s "how to simulate actions" challenge (planning, memory, reflection) is organised around this architecture.
- [[Agent Decision Rules and Bounded Rationality]] — limited retrieval ($k$ memories, imperfect relevance) is a form of bounded rationality implemented by attention limits rather than by noise in a utility function.
- [[Emergent Phenomena in ABM]], [[Word of Mouth Mechanisms]], [[Network Topology Effects on Diffusion]] — diffusion and network density as emergent outputs.
- [[LLM Agents vs Rule-Based Agents in ABM]] — what this buys and costs relative to rule-based agents.
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — believability is not accuracy; the evaluation here measures the former only.

## See Also

- [[Silicon Samples and Algorithmic Fidelity]] — stateless persona conditioning, the memory-free special case.
- [[Imitation and Conditioning Processes]] — rule-based social learning in the CUBES consumer simulator.
- [[ABM Validation Challenges]] — why "believable" macro patterns from "plausible" micro rules is a weak validation standard.
