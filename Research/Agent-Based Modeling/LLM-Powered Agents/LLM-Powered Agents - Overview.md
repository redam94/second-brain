---
title: LLM-Powered Agents - Overview
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/silicon-samples
  - type/overview
  - doc/paper
source: "[[raw/Gao 2023 - LLM Empowered Agent-Based Modeling Survey.pdf]]"
source_location: "Abstract; Secs. 2-4 and 6 (background, critical abilities, challenges, open problems)"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
  - "[[Heterogeneity in Agent Models]]"
  - "[[Emergent Phenomena in ABM]]"
used_by:
  - "[[Generative Agents Architecture - Memory, Reflection and Planning]]"
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[Homo Silicus - LLMs as Simulated Economic Agents]]"
  - "[[Persona Mixture Calibration of LLM Agents]]"
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
  - "[[Opinion Alignment Metrics for Language Models]]"
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
aliases:
  - LLM-Empowered Agent-Based Modeling
  - Generative Agent-Based Modeling
  - Silicon Subjects Overview
---

# LLM-Powered Agents - Overview

> [!summary]
> **LLM-powered agents** replace the hand-written decision rule at the heart of a classical ABM agent (threshold, logit, utility maximiser — see [[Agent Decision Rules and Bounded Rationality]]) with a call to a large language model that is *conditioned* on a natural-language description of the agent's identity, memory and situation. Gao et al. (2023) survey this emerging paradigm: they argue LLM agents satisfy the classical agent desiderata (autonomy, social ability, reactivity, pro-activeness), identify four engineering challenges (environment interface, human alignment and personalisation, action simulation via memory–reflection–planning, and evaluation), and catalogue applications in social, economic, physical, cyber and hybrid domains. The same idea appears in three neighbouring literatures covered in this cluster: **generative agents** with long-term memory ([[Generative Agents Architecture - Memory, Reflection and Planning|Park et al. 2023]]), **silicon samples** of survey respondents ([[Silicon Samples and Algorithmic Fidelity|Argyle et al. 2022]]), and **Homo silicus** as a simulated economic agent ([[Homo Silicus - LLMs as Simulated Economic Agents|Horton et al. 2023/2026]]). The central open question is **validity** — whose behaviour the model actually reproduces ([[Validity, Bias and Calibration of LLM-Simulated Populations]]).

## Overview

Gao et al. frame agent-based simulation as three components — **agents** (heterogeneous entities with attributes, behaviours and decision processes), an **environment**, and **interaction** mechanisms (agent–agent and agent–environment) — giving "a bottom-up perspective to study the macro-level phenomenons and dynamics from the individual interactions" (Sec. 2.1). This matches the vault's classical framing in [[ABM Methodology and Principles]] and [[Emergent Phenomena in ABM]].

The survey's motivation (Sec. 3) is that classical ABM struggles on exactly the dimensions where LLMs are strong:

| Classical limitation (Gao et al., Sec. 3) | LLM-agent capability |
|---|---|
| Agents perceive only pre-coded state variables | **Perception** (3.1): text is a universal interface to environments and to other agents; agents can "put themselves in real humans' shoes" |
| "Rule-based or even neural network-based agent is not intelligent enough" | **Reasoning and decision making** (3.2): plans and acts with "only limited guidance, regulations, and goals ... without the need for explicit programming or predefined rules" |
| Fixed rules cannot cope when the environment drifts far from its initial state | **Adaptive learning and evolution** (3.3): in-context learning lets agents revise strategy as the simulation evolves |
| Heterogeneity requires "extremely high complexity of parameter settings"; rules "cannot cover all dimensions of heterogeneity" | **Heterogeneity and personalising** (3.4): personas via prompting, in-context learning, or fine-tuning |

The last row is the deepest connection to the existing ABM notes. In [[Heterogeneity in Agent Models]] and [[Population Initialization and Parameter Sensitivity]], heterogeneity is a *distribution over numeric parameters* that must be calibrated ([[ABM Calibration Overview]]). With LLM agents heterogeneity is a *distribution over persona descriptions*, and the conditional behaviour $P(\text{action} \mid \text{persona}, \text{situation})$ is supplied by the pretrained model rather than estimated. This trades a calibration problem for a **validation** problem.

## Main Content

> [!definition] LLM-empowered agent ^def-llm-agent
> An agent whose perception–decision–action loop is mediated by a large language model. The LLM receives a text rendering of (i) a **profile/persona**, (ii) retrieved **memory**, and (iii) the current **observation**, and emits text that is parsed into an action, utterance, plan or survey response. Gao et al. (Sec. 2.2) emphasise that such agents extend beyond a bare LLM by adding environment interfaces, memory, reflection and planning modules.

> [!definition] Classical agent desiderata (Sec. 2.1) ^def-agent-desiderata
> - **Autonomy** — operate without direct human intervention.
> - **Social ability** — interact with other agents (cooperatively or competitively) to model networks, opinion dynamics, markets.
> - **Reactivity** — perceive and respond to environmental change, and learn from experience.
> - **Pro-activeness** — exhibit goal-directed behaviour rather than purely responding.
>
> Gao et al. add that "like humans, agents cannot make perfectly rational choices due to limitations of knowledge and computational capacity" — the same bounded-rationality premise as [[Agent Decision Rules and Bounded Rationality]].

> [!definition] Four challenges of LLM agent-based simulation (Sec. 4) ^def-four-challenges
> 1. **Environment construction and interface** (4.1) — virtual/sandbox vs. real environments; text as the I/O channel; agent–agent communication either direct (dialogue) or indirect (through environment rules, e.g. a shared labour market).
> 2. **Human alignment and personalisation** (4.2) — inject domain knowledge and "controllable heterogeneity" via **prompt engineering** (personas, rules, examples) or **tuning** (fine-tuning on domain/user data).
> 3. **How to simulate actions** (4.3) — **planning** (task decomposition), **memory** (an external store with organise/update/retrieve operations because histories exceed the context window), and **reflection** (feedback loops that revise memory and strategy). See [[Generative Agents Architecture - Memory, Reflection and Planning]].
> 4. **Evaluation** (4.4) — realness validation at **micro level** (does an individual agent's next action match a real individual's?) and **macro level** (does the population reproduce real regularities, e.g. opinion dynamics or Okun's law?); **explanations** elicited from the agents themselves; and **ethics** evaluation (bias, harmful output).

The micro/macro split in (4) is the LLM-era restatement of the dilemma in [[ABM Validation Challenges]]: classical ABMs usually can only be validated at the macro level because micro rules are unobservable; LLM agents can additionally be validated at the micro level against individual survey or experimental responses, which is exactly what [[Silicon Samples and Algorithmic Fidelity]] and [[Opinion Alignment Metrics for Language Models]] do.

### Application domains (Sec. 5)

- **Social sciences (5.1).** Social-network simulators (S³) initialised from real social-media data reproduce emotion, attitude and information propagation; LLM transmission chains reproduce human content biases (stereotype-consistent, negative, threat-related content is preferentially passed on — Acerbi et al.), directly relevant to [[Word of Mouth Mechanisms]]; silicon survey respondents (Argyle et al.).
- **Economic systems (5.2).** Behavioural-economics replications (Horton), repeated prisoner's dilemma with prompted preferences (cooperative/selfish/altruistic personas shift cooperation rates), auctions, and macro simulations in which LLM households/workers reproduce macro regularities.
- **Physical, cyber and hybrid domains (5.3–5.5).** Mobility/urban agents, web-browsing agents, recommender-system user simulators, and mixed social-economic-physical sandboxes.

### Open problems (Sec. 6)

Efficiency of scaling up (6.1; batch prompting gives up to $5\times$ token/time savings, but large societies remain costly), benchmarks for *simulation* quality rather than task solving (6.2), open platforms (6.3), robustness to adversarial prompts and out-of-distribution settings — including attacks that propagate between agents (6.4), and ethical risks: persona-assigned ChatGPT can produce up to $6\times$ more toxic output, personas collapse to "flattened caricatures", and biases can be "further amplified in the transmission chain in multi-agent settings" (6.5).

### Relevance to marketing measurement / applied work

- **Synthetic consumers for pre-testing.** Silicon samples can pilot survey instruments, concept tests and conjoint-style choice tasks before fielding; Horton et al. stress the use for exploring a design space and informing power calculations ([[Power Analysis and Sample Size]], [[Geo-Experiment Design and Power Analysis]]), not for replacing human data.
- **Richer WOM and diffusion micro-rules.** Classical consumer ABMs hard-code WOM as a utility term or contagion probability ([[Word of Mouth Mechanisms]], [[Product Adoption and Diffusion Models]]). Generative agents produce diffusion *endogenously* from conversation and memory, offering a way to stress-test those reduced-form rules.
- **Priors, not posteriors.** For Bayesian workflows ([[Bayesian Media Mix Modeling - Overview]]) the defensible role of an LLM population is as a source of *prior* structure or simulated data for [[Prior Predictive Checking]], to be corrected by real data — the logic of [[Persona Mixture Calibration of LLM Agents]] and of reweighting by [[Poststratification]].
- **Validity is the binding constraint.** Steered LLMs mis-represent many demographic groups and collapse within-group variance ([[Opinion Alignment Metrics for Language Models]]); any measurement use needs a human benchmark.

## Examples

A minimal LLM-agent step, showing where the classical decision rule is replaced (illustrative sketch, not from the paper):

```python
def step(agent, env, llm):
    obs = env.describe_visible(agent)                 # 4.1 environment -> text
    agent.memory.add(obs)
    context = agent.memory.retrieve(query=obs, k=20)  # 4.3.2 memory
    # 4.2 personalisation: the persona text is where heterogeneity lives
    prompt = f"""{agent.persona}
Relevant memories: {context}
Current situation: {obs}
What do you do next? Answer with one action from {env.action_space(agent)}."""
    action = parse(llm(prompt, temperature=1.0))      # replaces utility/threshold rule
    env.apply(agent, action)
    if agent.memory.importance_since_reflection() > 150:
        agent.reflect(llm)                            # 4.3.3 reflection
```

In a classical consumer ABM the line marked "replaces" would be, e.g., the two-stage threshold-plus-logit rule of [[Logit Purchase Decision Model]]. See [[LLM Agents vs Rule-Based Agents in ABM]] for the trade-offs this substitution creates.

## Connections

- [[Generative Agents Architecture - Memory, Reflection and Planning]] — the reference architecture for challenge 3 (actions).
- [[Silicon Samples and Algorithmic Fidelity]] — persona conditioning for survey populations; micro-level evaluation.
- [[Homo Silicus - LLMs as Simulated Economic Agents]] — LLM agents as "theory in flexibly executable form".
- [[Persona Mixture Calibration of LLM Agents]] — fitting a population of personas to human data.
- [[LLM Agents vs Rule-Based Agents in ABM]] — head-to-head comparison with classical agents.
- [[Opinion Alignment Metrics for Language Models]] and [[Validity, Bias and Calibration of LLM-Simulated Populations]] — evaluation and failure modes.
- [[Agent Decision Rules and Bounded Rationality]], [[Heterogeneity in Agent Models]], [[Emergent Phenomena in ABM]], [[ABM Validation Challenges]], [[ABM Calibration Overview]] — the classical counterparts of each component.

## See Also

- [[ABM in Marketing Strategy]] — the rule-based marketing ABM these agents could extend.
- [[Opinion Leaders and Social Influence]] and [[Network Topology Effects on Diffusion]] — social-influence structure that LLM-agent societies must also represent.
- [[LLM Expert Elicitation for Bayesian Networks]] — another use of LLMs as a stand-in for human judgement in the vault.
- [[Discrete Choice Models]] — the statistical model typically fitted to (human or silicon) choice data.
- [[Tool Use and the Agent Loop]] — the agent loop underlying LLM-driven simulated agents
