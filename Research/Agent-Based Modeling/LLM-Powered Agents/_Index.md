---
title: LLM-Powered Agents - Index
tags:
  - type/index
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/silicon-samples
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
parent: "[[Agent-Based Modeling/_Index|Agent-Based Modeling]]"
---

# LLM-Powered Agents - Index

> [!abstract] Routing Summary
> Large language models as the decision engine of simulated agents: generative agents with memory, "silicon samples" of survey respondents, *Homo silicus* economic subjects, and the validity problems all three share. Anchored by Gao et al. (2023 survey), Park et al. (2023), Argyle et al. (2022), Horton, Filippas & Manning (2023/2026) and Santurkar et al. (2023). Complements the rule-based consumer ABM, calibration, WOM and diffusion notes elsewhere in Agent-Based Modeling.
>
> - Need the big picture / where to start? → [[LLM-Powered Agents - Overview]]
> - Need the memory stream, retrieval score, reflection and planning loop (Smallville)? → [[Generative Agents Architecture - Memory, Reflection and Planning]]
> - Need to simulate survey respondents from demographic backstories, or the four fidelity criteria? → [[Silicon Samples and Algorithmic Fidelity]]
> - Need LLMs as experimental subjects in economics (fairness, dictator games, status quo bias, minimum wage)? → [[Homo Silicus - LLMs as Simulated Economic Agents]]
> - Need to fit a population of personas to human choice data? → [[Persona Mixture Calibration of LLM Agents#^alg-mixture|simplex-constrained mixture weights]]
> - Need to decide between LLM agents, rule-based agents, or a hybrid? → [[LLM Agents vs Rule-Based Agents in ABM]]
> - Need a metric for how well an LLM matches a group's opinion *distribution*? → [[Opinion Alignment Metrics for Language Models#^def-alignment|Wasserstein alignment; representativeness / steerability / consistency]]
> - Need the threat taxonomy and a validation protocol before trusting silicon data? → [[Validity, Bias and Calibration of LLM-Simulated Populations#^alg-protocol|validation-and-calibration protocol]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| LLM-empowered ABM paradigm | [[LLM-Powered Agents - Overview]] | overview | ABM Methodology; Agent Decision Rules; Heterogeneity | Four LLM abilities (perception, reasoning, adaptation, heterogeneity) and four challenges (environment, alignment/personalisation, action simulation, evaluation); micro vs. macro evaluation |
| Generative agents | [[Generative Agents Architecture - Memory, Reflection and Planning]] | method | Overview; Emergent Phenomena | score = recency ($0.995^{\Delta h}$) + importance (LLM 1–10) + relevance (cosine); reflection at importance sum > 150; party awareness 4%→52%, density 0.167→0.74; full architecture TrueSkill 29.89 vs 21.21, $d=8.16$ |
| Silicon sampling | [[Silicon Samples and Algorithmic Fidelity]] | concept | Overview; Poststratification | $\hat P(V)=\sum_b P_{LM}(V\mid b)P_{ANES}(b)$; four fidelity criteria; tetrachoric 0.90/0.92/0.94; Cramér's $V$ mean diff $-0.026$ |
| Homo silicus | [[Homo Silicus - LLMs as Simulated Economic Agents]] | concept | Silicon Samples; Decision Rules; Discrete Choice | Five recapitulations; "theory in flexibly executable form"; confusion-matrix view; results need empirical confirmation |
| Persona mixture calibration | [[Persona Mixture Calibration of LLM Agents]] | method | Homo Silicus; ABM Calibration Overview | $\min_w \lVert\sum_k w_k v_k - v_H\rVert^2$ on the simplex; out-of-sample MSE 0.094 vs 0.182 |
| LLM vs rule-based agents | [[LLM Agents vs Rule-Based Agents in ABM]] | concept | Overview; Decision Rules; Calibration; Validation | Calibration burden becomes validation burden; "judge and jury" and Lucas-critique arguments; hybrid designs |
| Opinion alignment metrics | [[Opinion Alignment Metrics for Language Models]] | method | Silicon Samples | $\mathcal A = 1-\mathcal{WD}/(N-1)$; every human group beats every LM on representativeness; steering modest; RLHF modal collapse |
| Validity and calibration | [[Validity, Bias and Calibration of LLM-Simulated Populations]] | concept | all of the above; ABM Validation Challenges; Poststratification | 15-threat taxonomy; imputed-context confounding; 10-step validation protocol; prediction-powered inference |

## Notes

- [[LLM-Powered Agents - Overview]] — CONTAINS: LLM-agent definition, classical agent desiderata, Gao et al.'s four abilities and four challenges, micro/macro evaluation, application domains, open problems (scaling, benchmarks, robustness, ethics), relevance to marketing measurement, minimal agent-step sketch.
- [[Generative Agents Architecture - Memory, Reflection and Planning]] — CONTAINS: memory stream definition, retrieval scoring formula and constants, reflection algorithm and reflection trees, recursive planning and reaction, environment grounding, ablation results table, emergent diffusion/network/coordination numbers, failure modes, retrieval code sketch.
- [[Silicon Samples and Algorithmic Fidelity]] — CONTAINS: LM-as-conditional-distribution, algorithmic fidelity definition, four criteria, silicon-sampling marginal-correction identity and its equivalence to poststratification, Studies 1–3 results, critical reading, worked reweighting example, pipeline sketch.
- [[Homo Silicus - LLMs as Simulated Economic Agents]] — CONTAINS: Homo silicus definition, latent vs. explicit social information, five recapitulated experiments with designs and numbers, Charness–Rabin utility, theory-as-instruction argument, Fig. 7 confusion matrix, prediction-powered inference, when simulations are informative, in-silico pilot sketch.
- [[Persona Mixture Calibration of LLM Agents]] — CONTAINS: theory-grounded persona definition, six-step mixture algorithm, reported weights per model, out-of-sample MSE, comparison table of calibration strategies, identification/uncertainty caveats with Bayesian extension, worked constrained-least-squares example.
- [[LLM Agents vs Rule-Based Agents in ABM]] — CONTAINS: side-by-side comparison table, Gao's four advantages, Horton's "judge and jury" and Lucas-critique arguments, cost catalogue, four hybrid design patterns, same-decision two-agent example.
- [[Opinion Alignment Metrics for Language Models]] — CONTAINS: OpinionQA construction, human/model opinion distributions, Wasserstein alignment (Eq. 1), representativeness/steerability/consistency definitions, empirical findings, implications for ABM, hand-computed alignment examples, metric code.
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — CONTAINS: 15-row threat taxonomy with source evidence, poststratification limits, social-influence bias, imputed-context confounding in potential-outcomes terms, 10-step protocol, four-outcomes definition, disagreements across sources, brand-tracker checklist, dispersion check code.

## External / Cross-Folder Links

- [[Agent Decision Rules and Bounded Rationality]], [[Logit Purchase Decision Model]], [[Consumer Utility Function Components]] — the rule-based decision models LLM agents replace or complement.
- [[Heterogeneity in Agent Models]], [[Population Initialization and Parameter Sensitivity]] — numeric heterogeneity vs. persona heterogeneity.
- [[ABM Calibration Overview]], [[Approximate Bayesian Computation for ABMs]], [[History Matching for ABMs]], [[HM-ABC Calibration Framework]] — classical calibration.
- [[ABM Validation Challenges]] — micro vs. macro validation.
- [[Word of Mouth Mechanisms]], [[Opinion Leaders and Social Influence]], [[Network Topology Effects on Diffusion]], [[Product Adoption and Diffusion Models]], [[Emergent Phenomena in ABM]] — social dynamics that generative agents produce endogenously.
- [[ABM in Marketing Strategy]] — marketing applications.
- [[Poststratification]], [[Hierarchical Models]], [[Posterior Predictive Checking]], [[Prior Predictive Checking]] — Bayesian workflow tools for reweighting and checking silicon populations.
- [[Discrete Choice Models]] — analysis model for human and silicon choice data.
- [[Potential Outcomes Framework]], [[Multiple Testing Corrections]], [[Power Analysis and Sample Size]] — experimental-design concepts used in the validity discussion.
- [[LLM Expert Elicitation for Bayesian Networks]] — LLMs as stand-ins for human experts elsewhere in the vault.

## Sources

- [[raw/Gao 2023 - LLM Empowered Agent-Based Modeling Survey.pdf]] — Gao, C., Lan, X., Li, N., Yuan, Y., Ding, J., Zhou, Z., Xu, F. & Li, Y. (2023), "Large Language Models Empowered Agent-based Modeling and Simulation: A Survey and Perspectives," arXiv:2312.11970.
- [[raw/Park 2023 - Generative Agents Interactive Simulacra.pdf]] — Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P. & Bernstein, M. S. (2023), "Generative Agents: Interactive Simulacra of Human Behavior," UIST '23, arXiv:2304.03442.
- [[raw/Argyle 2022 - Out of One Many Silicon Samples.pdf]] — Argyle, L. P., Busby, E. C., Fulda, N., Gubler, J., Rytting, C. & Wingate, D. (2022), "Out of One, Many: Using Language Models to Simulate Human Samples," arXiv:2209.06899.
- [[raw/Horton 2023 - Homo Silicus LLMs as Simulated Economic Agents.pdf]] — Horton, J. J., Filippas, A. & Manning, B. S. (2023; v2 2026), "Large Language Models as Simulated Economic Agents: What Can We Learn from Homo Silicus?", arXiv:2301.07543.
- [[raw/Santurkar 2023 - Whose Opinions Do Language Models Reflect.pdf]] — Santurkar, S., Durmus, E., Ladhak, F., Lee, C., Liang, P. & Hashimoto, T. (2023), "Whose Opinions Do Language Models Reflect?", arXiv:2303.17548.
