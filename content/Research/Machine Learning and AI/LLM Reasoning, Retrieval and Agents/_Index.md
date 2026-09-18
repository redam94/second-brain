---
title: LLM Reasoning, Retrieval and Agents - Index
tags:
  - type/index
  - source/ingested
  - topic/machine-learning
  - topic/llm
  - topic/llm-agents
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
parent: "[[Research/Machine Learning and AI/_Index|Machine Learning and AI]]"
---

# LLM Reasoning, Retrieval and Agents - Index

> [!abstract] Routing Summary
> How large language models are used as reasoning systems and agents, anchored by four primary papers: Wei et al. (2022) on chain-of-thought prompting, Lewis et al. (2020) on retrieval-augmented generation, Yao et al. (2022) on ReAct, and Ouyang et al. (2022) on InstructGPT / RLHF. Covers prompting for reasoning, grounding in external memory, the thought–action–observation agent loop, learning from human preferences, and how such systems are evaluated.
>
> - Need the big picture, a method-by-deficiency map, or relevance to measurement work? → [[LLM Reasoning, Retrieval and Agents - Overview]]
> - Need to make a model reason step by step, or know when that works (scale, ablations)? → [[Chain-of-Thought Prompting]]
> - Need to ground answers in documents, or the RAG-Sequence / RAG-Token math? → [[Retrieval-Augmented Generation (RAG)]]
> - Need the formal definition of interleaved reasoning and acting, and CoT-vs-ReAct hallucination evidence? → [[ReAct - Reasoning and Acting Agents]]
> - Need to build or reason about an agent harness (loop, action space, failure modes, safety)? → [[Tool Use and the Agent Loop]]
> - Need the SFT → reward model → PPO pipeline, the KL-penalised objective, or the alignment tax? → [[RLHF and Instruction Tuning]]
> - Need the pairwise preference loss, rater agreement, or reward over-optimisation? → [[Reward Modeling from Human Preferences]]
> - Need metrics, human-evaluation protocols, or how hallucination is measured? → [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]
> - Need the PPO-ptx objective itself? → [[RLHF and Instruction Tuning#^def-objective]]
> - Need pseudo-code for the agent loop? → [[Tool Use and the Agent Loop#^alg-agent-loop]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Cluster framing | [[LLM Reasoning, Retrieval and Agents - Overview]] | overview | Transformers and LLM Foundations; In-Context Learning | Four methods map to four deficiencies: shallow reasoning, frozen knowledge, no action, misaligned objective |
| Chain-of-thought prompting | [[Chain-of-Thought Prompting]] | method | In-Context Learning | Exemplars with rationales: GSM8K 17.9 → 56.9 (PaLM 540B); emergent near 100B parameters; "dots" and "reasoning after answer" ablations fail |
| Retrieval-augmented generation | [[Retrieval-Augmented Generation (RAG)]] | method | Transformers and LLM Foundations | $p(y\mid x) \approx \sum_z p_\eta(z\mid x)\,p_\theta(y\mid x,z)$; NQ 44.5 EM; index hot-swap updates knowledge without retraining |
| ReAct | [[ReAct - Reasoning and Acting Agents]] | method | Chain-of-Thought Prompting | $\hat{\mathcal A} = \mathcal A \cup \mathcal L$; hallucination 56% (CoT) vs 0% (ReAct) of failures; ReAct + CoT-SC best |
| Agent loop and tool use | [[Tool Use and the Agent Loop]] | concept | ReAct; CoT; RAG | Context-as-state loop; ALFWorld 71% vs 45% (Act) vs 37% (imitation); WebShop 40.0% vs 30.1%; thought editing; action-space restriction as safety lever |
| RLHF / InstructGPT | [[RLHF and Instruction Tuning]] | method | Reward Modeling; In-Context Learning | SFT → RM → PPO with per-token KL penalty ($\beta = 0.02$) and pre-training mix ($\gamma = 27.8$); 1.3B preferred to 175B GPT-3 |
| Reward modelling | [[Reward Modeling from Human Preferences]] | concept | Discrete Choice Models; GLMs | $-\log\sigma(r_w - r_l)$; all $\binom K2$ pairs per prompt as one batch element; 69.6% accuracy on held-out labelers vs 73–77% human agreement |
| Evaluation | [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] | concept | All of the above | EM / BLEU / success rate vs win rate / Likert vs failure-mode audits; benchmarks and human preference can disagree (alignment tax) |

## Notes

- [[LLM Reasoning, Retrieval and Agents - Overview]] — CONTAINS: method-by-deficiency table, parametric vs non-parametric memory, reasoning-trace and alignment definitions, four cross-paper regularities, stated limitations, relevance to marketing measurement (analyst agents, RAG over read-outs, elicitation, choice modelling, bandits/BED, ABMs), symptom-to-technique table, illustrative ReAct trace.
- [[Chain-of-Thought Prompting]] — CONTAINS: definition of chain of thought and the $\langle$input, chain, output$\rangle$ exemplar, four claimed properties, GSM8K scaling table across LaMDA/GPT-3/PaLM/Codex, three ablations (equation only, variable compute, reasoning after answer), robustness to annotators and exemplars, commonsense and symbolic (OOD length generalisation) results, 50+50 error analysis, external-calculator patch, authors' limitations, prompt example and Python harness.
- [[Retrieval-Augmented Generation (RAG)]] — CONTAINS: DPR bi-encoder and MIPS, BART generator, RAG-Sequence and RAG-Token marginal likelihoods, mixture-model reading, training with frozen document encoder, thorough vs fast decoding, open-domain QA table, generation/FEVER/diversity results, BM25 and frozen-retriever ablations, index hot-swapping experiment, document-posterior analysis, null-document and retrieval-collapse failure modes, scoring code sketch.
- [[ReAct - Reasoning and Acting Agents]] — CONTAINS: agent–environment formalism and context $c_t$, augmented action space, thought types, dense vs sparse thoughts, Wikipedia `search`/`lookup`/`finish` API, ablation-derived baselines incl. CoT-SC, HotpotQA/FEVER results table, ReAct ↔ CoT-SC back-off rules, human-labeled success/failure-mode table, fine-tuning scaling result, GPT-3 comparison, verbatim exemplar trajectory.
- [[Tool Use and the Agent Loop]] — CONTAINS: three-level ladder of tool integration, agent-loop algorithm with step budget and fallback, context-length constraint, action-space design, ALFWorld and WebShop tables, role of thoughts (ReAct-IM ablation), loop failure modes, human-in-the-loop thought editing, ethics/safety of action spaces, prompting vs training the policy, Python harness, measurement-team instantiation.
- [[RLHF and Instruction Tuning]] — CONTAINS: objective-mismatch motivation, instruction tuning vs RLHF, three-step pipeline with dataset sizes, bandit-environment definition, PPO-ptx objective (Eq. 2) with hyperparameters, Gibbs-form optimum of KL-regularised reward, preference/truthfulness/toxicity/FLAN-T0 findings, alignment tax and why raising $\beta$ does not fix it, compute cost, whose preferences, GPT-3 vs InstructGPT example, PPO-ptx step sketch.
- [[Reward Modeling from Human Preferences]] — CONTAINS: RM loss (Eq. 1) and log-odds interpretation, Bradley–Terry / random-utility reading, shift invariance and normalisation, rank-$K$ collection and per-prompt batching, 6B RM choice and initialisation, inter-labeler agreement and cross-labeler-group RM accuracy, over-optimisation and KL leash, whose utility, RM as automated judge, worked ranking-to-loss example, PyTorch loss, conjoint analogy.
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — CONTAINS: table of automatic metrics, weaknesses (label ambiguity, withheld references, right answer by wrong reasoning), win-rate/Likert/metadata protocol and its safeguards, four-option pairwise protocol with RAG results, three operationalisations of hallucination, truthfulness vs honesty, error taxonomies, toxicity/bias probes, prompt-sensitivity reporting conventions, alignment tax as evaluation finding, status of LLM-as-judge, evaluation protocol sketch, sample-size arithmetic.

## External / Cross-Folder Links

- [[Transformers and LLM Foundations - Overview]], [[In-Context Learning and Few-Shot Prompting]] — prerequisite sibling cluster in Machine Learning and AI.
- [[LLM Expert Elicitation for Bayesian Networks]], [[Code Prompts for Causal Structure]], [[Code vs Text Prompt Evaluation]], [[Fine-tuning on Conditional Statements]], [[LLM Causal Reasoning Tasks]], [[Interactive Knowledge Elicitation Method]], [[LLM-BN Decision Support Application]], [[NLP Causal Extraction Methods]], [[Entropy-Based BN Evaluation]] — LLMs for causal knowledge elicitation.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]], [[Contextual and Linear Bandits]], [[Bernoulli Bandit and Thompson Sampling Algorithm]], [[UCB and Greedy Algorithms for Bandits]], [[Bandit Models with Delayed and Censored Feedback]] — bandit view of RLHF and agent exploration.
- [[Q-learning]], [[Optimal Regime via Dynamic Programming]], [[Dynamic Treatment Regimes Framework]] — sequential decision making with history-dependent policies.
- [[Sequential and Adaptive BED]], [[Expected Information Gain]], [[Decision Analysis]] — normative theory of information gathering and action.
- [[Discrete Choice Models]], [[Random Coefficients Logit Model]], [[Logit Purchase Decision Model]], [[Generalized Linear Models]] — statistical basis of the reward model.
- [[Monsters and Mixtures]], [[Overfitting and Information Criteria]] — mixture structure of RAG; proxy over-optimisation.
- [[Power Analysis and Sample Size]], [[Multiple Testing Corrections]], [[The Experimental Ideal]] — design of human evaluations.
- [[Agent Decision Rules and Bounded Rationality]], [[ABM Methodology and Principles]], [[Emergent Phenomena in ABM]], [[Bayesian Media Mix Modeling - Overview]] — agent-based modelling and measurement context.

## Sources

- [[raw/Wei 2022 - Chain-of-Thought Prompting.pdf]] — Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q. & Zhou, D. (2022), "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models," *NeurIPS 2022*. arXiv:2201.11903.
- [[raw/Lewis 2020 - Retrieval-Augmented Generation.pdf]] — Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W., Rocktäschel, T., Riedel, S. & Kiela, D. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," *NeurIPS 2020*. arXiv:2005.11401.
- [[raw/Yao 2022 - ReAct Reasoning and Acting.pdf]] — Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K. & Cao, Y. (2023), "ReAct: Synergizing Reasoning and Acting in Language Models," *ICLR 2023*. arXiv:2210.03629.
- [[raw/Ouyang 2022 - InstructGPT RLHF.pdf]] — Ouyang, L., Wu, J., Jiang, X., et al. (2022), "Training Language Models to Follow Instructions with Human Feedback," *NeurIPS 2022*. arXiv:2203.02155.
