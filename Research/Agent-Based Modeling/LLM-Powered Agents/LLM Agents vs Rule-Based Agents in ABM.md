---
title: LLM Agents vs Rule-Based Agents in ABM
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/validation
  - type/concept
  - doc/paper
source: "[[raw/Gao 2023 - LLM Empowered Agent-Based Modeling Survey.pdf]]"
source_location: "Gao et al. Secs. 2.1, 3.1-3.4, 4.2, 4.4, 6.1, 6.4-6.5; supplemented by Horton et al. Sec. 4.4 and fn. 18-19, and Park et al. Secs. 7.2, 8.2"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[LLM-Powered Agents - Overview]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
  - "[[Heterogeneity in Agent Models]]"
  - "[[ABM Calibration Overview]]"
  - "[[ABM Validation Challenges]]"
used_by:
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - LLM vs Rule-Based Agents
  - Generative ABM vs Classical ABM
  - Hybrid LLM-Rule ABM
---

# LLM Agents vs Rule-Based Agents in ABM

> [!summary]
> A classical ABM agent is a **transparent, cheap, hand-specified function** of a small numeric state; an LLM agent is an **opaque, expensive, pretrained function** of an arbitrary text state. Gao et al. (2023) argue that the second kind resolves ABM's chronic weaknesses — brittle rules, unmanageable heterogeneity parameters, inability to adapt — while Horton et al. argue it also answers the economist's objection that in simulation "the researcher is both judge and jury". The price is paid in cost, reproducibility, scale and, above all, a new kind of validity risk: the behavioural rule is no longer *assumed by the modeller* but *inherited from a training corpus and post-training process* nobody fully observes. The practical frontier is **hybrid designs** that keep rules where mechanisms are known and use LLMs where they are not.

## Overview

The existing ABM notes describe three families of decision rule ([[Agent Decision Rules and Bounded Rationality]]): threshold activation of behavioural primitives (Ben Said et al.), utility-plus-logit purchase ([[Logit Purchase Decision Model]]), and simple probabilistic adoption (Bonabeau). All are **closed-form maps** from a low-dimensional state to an action probability, with a handful of parameters to be calibrated ([[ABM Calibration Overview]]). Their shared virtues are speed (millions of agent-steps per second), exact reproducibility given a seed, and interpretability. Their shared vice, in Gao et al.'s words, is that "using rules to drive agent behaviors only captures certain aspects of heterogeneity but could lack the depth to encapsulate the full spectrum of diverse behaviors, preferences, and decision-making processes" (Sec. 3.4).

## Main Content

### Side-by-side

| Dimension | Rule-based agent | LLM-powered agent |
|---|---|---|
| **State** | numeric vector (attitude, threshold, satisfaction) | text: persona + memory stream + observation ([[Generative Agents Architecture - Memory, Reflection and Planning]]) |
| **Decision rule** | explicit function chosen by modeller | conditional distribution of a pretrained LM given the prompt |
| **Bounded rationality** | imposed via noise, thresholds, limited information | *emerges* — e.g. status quo bias and complexity-driven risk attitudes appear unprogrammed ([[Homo Silicus - LLMs as Simulated Economic Agents]]) — but may also be *absent* where humans have it (capable models return expected values) |
| **Heterogeneity** | distribution over numeric parameters; "extremely high complexity of parameter settings" (Gao 3.4) | distribution over persona texts via prompting, in-context learning or fine-tuning; "controllable heterogeneity" (Gao 4.2) |
| **Interaction** | contagion probabilities, utility terms, network weights ([[Word of Mouth Mechanisms]]) | natural-language dialogue; information content, not just valence, is transmitted |
| **Adaptation to novel environments** | none beyond coded rules | in-context; agents "dynamically adjust their actions and strategies" (Gao 3.2–3.3) |
| **Calibration target** | behavioural parameters ([[Genetic Algorithm Calibration for ABM]], [[HM-ABC Calibration Framework]]) | persona shares, prompts, or nothing ([[Persona Mixture Calibration of LLM Agents]]) |
| **Validation** | mostly macro patterns ([[ABM Validation Challenges]]) | micro *and* macro; plus agents can be interviewed for explanations (Gao 4.4) |
| **Cost / scale** | negligible per step; $10^4$–$10^6$ agents routine | Park et al.: 25 agents × 2 game-days cost "thousands of dollars" and days of compute; batch prompting gives up to $5\times$ (Gao 6.1) |
| **Reproducibility** | exact with seed | depends on model version, temperature, provider; models are deprecated (Horton's original GPT-3 results moved to an appendix) |
| **Sensitivity analysis** | Sobol/Morris over parameters ([[Global Sensitivity Analysis - Overview]]) | no parameter vector; robustness is assessed by prompt permutations, paraphrase, translation, model swaps |
| **Failure modes** | mis-specified rule; wrong parameters | hallucination, caricature, over-cooperation from instruction tuning, memorised results, prompt hacking, bias amplification along transmission chains |

### What LLM agents add

> [!definition] The four claimed advantages (Gao et al., Sec. 3) ^def-four-advantages
> 1. **Perception** — text as universal interface to environment and other agents.
> 2. **Reasoning and decision making** — act sensibly "with only limited guidance, regulations, and goals ... without the need for explicit programming or predefined rules".
> 3. **Adaptive learning and evolution** — cope with environments that drift far from initial conditions (the survey's "Rip Van Winkle" point).
> 4. **Heterogeneity and personalising** — "capturing complex internal characteristics with internal human-like cognitive complexity" and "specialized and customized characteristics with prompting, in-context learning, or fine-tuning".

> [!theorem] Horton et al.'s defence against "it's just an ABM" (Sec. 4.4) ^thm-judge-and-jury
> "Economists generally take a dim view of simulation-based approaches because the researcher is both judge and jury: you program the agents and then see what they do." Schelling (1971) is "the exception that proves the rule" because the model was so simple "there was no card up his sleeve". By contrast, "*Homo silicus* is not under direct researcher control. We can influence [it] with endowments of beliefs, experiences, and so on ... But we remain constrained by the fact that what determines behavior is the underlying model, not our direct [programming]."
>
> **Lucas critique corollary.** Classical agents' behavioural rules are fixed parameters, yet they should be "endogenous responses shaped by the prevailing policy environment". LLM-based agents "mitigate this concern because they can engage in flexible reasoning about environmental changes rather than following" fixed rules. Footnote 19 adds that the Lucas critique "may help explain why agent-based models have had relatively little uptake in mainstream economics".

The Lucas-critique point matters for marketing ABMs: a consumer whose WOM sensitivity or promotion response is a fixed coefficient ([[Consumer Utility Function Components]]) cannot respond to a *regime change* — permanent price cuts teaching consumers to wait for deals, say. An LLM consumer can, in principle, reason about the new regime. Whether it reasons *like real consumers* is an empirical question.

### What they cost

- **Transfer of the specification burden, not its removal.** The modeller no longer chooses a functional form but now chooses a prompt template, persona vocabulary, memory policy, model and temperature — all of which move results. Horton et al. (Sec. 4.5) call the resulting garden of forking paths "prompt hacking", "conceptually similar to the problem of p-hacking" (cf. [[Multiple Testing Corrections]]).
- **Unknown micro-validity.** Steered LLMs mis-represent many groups and compress within-group variance ([[Opinion Alignment Metrics for Language Models]]). Demographic personas in particular "assume the LLM can coherently represent how those traits interact with the strategic setting"; when not, the simulation "may deteriorate or default to caricatures" (Horton fn. 18; Gao 6.5 on "flattened caricatures").
- **Systematic social biases of the *agent population*.** Park et al. observed agents that were "overly cooperative" and "rarely said no"; in a WOM or opinion-dynamics model this inflates persuasion rates and conformity ([[Opinion Leaders and Social Influence]]). Gao et al. (6.4) note LLM societies display conformity and homophily that "could be exploited by adversaries", and (6.5) that biases "could be further amplified in the transmission chain".
- **Norms and physical constraints not expressed in text are ignored** (Park 7.2: entering closed shops, occupied bathrooms) — rule-based environments enforce these trivially.
- **Scale.** Emergent phenomena that depend on large $N$ or long horizons — tipping, lock-in, fat-tailed cascades ([[Market Share Equilibrium and Lock-In]], [[Network Topology Effects on Diffusion]]) — are out of reach at 25 agents. Monte Carlo replication, the backbone of stochastic ABM analysis, is also rationed by cost.

### Hybrid designs (synthesis; not proposed verbatim in any one source)

The sources jointly suggest a division of labour:

1. **LLM as rule generator, rules as simulator.** Use silicon experiments offline to *estimate* a reduced-form rule — e.g. fit a conditional logit to persona-conditioned LLM choices (as Horton et al. do in their status-quo study) — then run the cheap fitted rule at scale. The LLM output is treated as a **prior** on rule parameters, subsequently updated by real data with [[Approximate Bayesian Computation for ABMs|ABC]] or [[History Matching for ABMs|history matching]].
2. **Rules for physics and accounting, LLM for judgement.** Budgets, prices, stock, opening hours and network structure stay in code; the LLM is called only for decisions with rich context (what to say about a product, whether to switch brands after a bad experience). Gao et al.'s "indirect interaction through predefined rules" (Sec. 4.1) — agents who "work in the same factory" interacting via the economic system — is this pattern.
3. **Sparse LLM calls with caching.** Call the LLM once per (persona type × situation class), cache the response distribution, and sample from the cache for the $10^5$ agents of that type — equivalent to tabulating $P(a \mid \text{type}, \text{situation})$.
4. **Theory-grounded personas** rather than free-form ones, so that behaviour is auditable in simple test cases ([[Persona Mixture Calibration of LLM Agents]]).

## Examples

**Same decision, two agents.** A consumer decides whether to repurchase brand A after a friend complains about it.

*Rule-based* (after [[Logit Purchase Decision Model]]): utility $U = \beta_q q - \beta_p p + \beta_w \cdot \text{WOM}$, with $\text{WOM}$ decremented by one unit of negative WOM; purchase if $U > \alpha$ and $\text{logit}^{-1}(U) > u$, $u \sim \text{Uniform}(0,1)$. The effect of the complaint is $\beta_w$ — the same for every complaint from every friend about every attribute.

*LLM-based*: the persona ("budget-conscious parent of two; has bought brand A for three years; trusts her sister's opinions on food"), the retrieved memories (three satisfactory purchases; sister's complaint that the new recipe "tastes artificial"), and the shelf situation go into the prompt; the model returns a choice and, on request, a rationale. The complaint's effect now depends on *who* said it, *what* it was about and the agent's history — richer, but with no guarantee the implied "$\beta_w$" matches any real population, and no parameter to calibrate if it does not.

A hybrid would run the LLM version over a designed grid of (persona type × tie strength × complaint attribute), fit $\beta_w$ as a function of those factors, and simulate at scale with the fitted rule.

## Connections

- [[Agent Decision Rules and Bounded Rationality]] — the rule families being compared against.
- [[Heterogeneity in Agent Models]] — numeric vs. textual heterogeneity.
- [[ABM Calibration Overview]] and [[ABM Validation Challenges]] — calibration burden shifts to validation burden.
- [[Emergent Phenomena in ABM]] — emergence requires scale and replication, which LLM agents currently ration.
- [[ABM vs Equation-Based Modeling]] — the previous rung of the same ladder: each step (equations → rules → LLMs) buys behavioural richness at the cost of tractability and transparency.
- [[Homo Silicus - LLMs as Simulated Economic Agents]], [[Generative Agents Architecture - Memory, Reflection and Planning]], [[LLM-Powered Agents - Overview]].

## See Also

- [[Validity, Bias and Calibration of LLM-Simulated Populations]]
- [[ABM in Marketing Strategy]]
- [[ABM Methodology and Principles]]
- [[Local vs Global Sensitivity Analysis]]
