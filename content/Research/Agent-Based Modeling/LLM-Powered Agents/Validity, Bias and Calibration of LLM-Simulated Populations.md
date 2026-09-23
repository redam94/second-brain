---
title: "Validity, Bias and Calibration of LLM-Simulated Populations"
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/silicon-samples
  - topic/validation
  - topic/calibration
  - type/concept
  - doc/paper
source: "[[raw/Horton 2023 - Homo Silicus LLMs as Simulated Economic Agents.pdf]]"
source_location: "Horton et al. Sec. 3.3 (Fig. 7, ground truth, prediction-powered inference) and Sec. 4.1-4.6 (critiques); Santurkar et al. Sec. 4 and Limitations; Argyle et al. Secs. 3-4, 6; Park et al. Secs. 6.5, 7.2, 8.2-8.3; Gao et al. Secs. 4.4, 6.4-6.5"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[Opinion Alignment Metrics for Language Models]]"
  - "[[Homo Silicus - LLMs as Simulated Economic Agents]]"
  - "[[Persona Mixture Calibration of LLM Agents]]"
  - "[[ABM Validation Challenges]]"
  - "[[Poststratification]]"
used_by:
  - "[[LLM-Powered Agents - Overview]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Validity of Silicon Samples
  - LLM Simulation Validity
  - Bias in LLM-Simulated Populations
  - Threats to Validity for LLM Agents
---

# Validity, Bias and Calibration of LLM-Simulated Populations

> [!summary]
> An LLM-simulated population can be wrong in ways a rule-based ABM or a human sample cannot. This note consolidates the threats identified across the cluster's five sources into a taxonomy — **composition** (whose text trained the model), **conditional fidelity** (does a persona prompt select the right response distribution), **variance compression and caricature**, **post-training artefacts** (left-liberal skew; over-cooperative agents), **memorisation and performativity**, **temporal and domain limits**, **prompt sensitivity and prompt hacking**, **identification failures from imputed context**, and **multi-agent amplification** — and the remedies on offer: reweighting ([[Poststratification]]), theory-grounded personas and mixture calibration, distributional validation metrics, prompt-permutation robustness with open code, and anchoring to human ground truth (including prediction-powered inference). The consensus of even the most optimistic authors: simulations are for **piloting, exploration and theory-building**; results "will still require empirical confirmation" (Horton et al.) and agents "should never be a substitute for real human input" (Park et al.).

## Overview

[[ABM Validation Challenges]] notes that classical ABMs are hard to validate because micro rules are unobservable and only macro patterns can be compared with data. LLM agents invert the situation: micro behaviour *can* be compared with individual-level human data (surveys, experiments), but the *rule itself is unknown to the modeller*. Validity therefore has to be established empirically, per domain and per sub-population — Argyle et al.'s requirement of "repeated, consistent evidence" across "multiple data sources, different measures, and across many groups".

Gao et al. (Sec. 4.4) organise evaluation at two levels, which is a useful frame for everything below:

- **Micro-level realness** — does an agent's response distribution match the corresponding humans'?
- **Macro-level realness** — does the simulated system reproduce aggregate regularities (diffusion curves, opinion dynamics, market shares)?

plus explanation audits (ask the agent why) and ethics checks.

## Main Content

### A taxonomy of threats

> [!definition] Threats to the validity of LLM-simulated populations ^def-threats
> | # | Threat | Evidence in sources |
> |---|---|---|
> | 1 | **Composition bias** — training text over-represents "humans creating public writing"; marginals $P(B)$ are skewed | Argyle Sec. 4; Horton 4.1 |
> | 2 | **Conditional infidelity** — persona prompt does not retrieve the group's true $P(V \mid B)$ | Santurkar 4.2: steering helps but "none of the disparities ... disappear"; Argyle Table 1: pure independents poorly predicted |
> | 3 | **Variance compression / caricature** — within-group diversity collapses to the mode | Santurkar 4.1: text-davinci-003 "typically assigns > 0.99 probability to one of the options"; Gao 6.5: "flattened caricatures"; Horton fn. 18 |
> | 4 | **Post-training skew** — RLHF moves opinions toward liberal, educated, high-income groups; makes agents polite and agreeable | Santurkar 4.1; Park 7.2: agents "overly cooperative", Isabella "rarely said no" |
> | 5 | **Under-served groups** | Santurkar: 65+, Mormon, widowed; Park 8.2: marginalised populations "due to limited data availability" |
> | 6 | **Topic inconsistency** — fidelity on one topic does not transfer | Santurkar 4.3: "a patchwork of disparate opinions" |
> | 7 | **Stated vs. revealed preference** — models learn what people *say* | Horton 4.1 (argues the critique is "only superficially persuasive") |
> | 8 | **Memorisation and performativity** — agents replay published findings or behave as theory says they should | Horton 4.2; Sec. 1: may "make brittle simulations appear robust" |
> | 9 | **Temporal limits** — events after the training cutoff | Argyle Study 2: 2020 correlations held but the marginal error changed sign |
> | 10 | **Incoherent world models** — good predictions from a wrong internal map | Horton 4.3 (Vafa et al. taxi-map example) |
> | 11 | **Hallucination and memory errors** in stateful agents | Park 6.5.2, 7.1: embellishment; 1.3% hallucinated acquaintance claims |
> | 12 | **Prompt sensitivity and prompt hacking** — researcher degrees of freedom | Horton 4.5; Santurkar robustness checks |
> | 13 | **Imputed-context confounding** — unspecified details are filled in, possibly as a function of treatment | Horton 4.6 (Gui & Toubia 2023) |
> | 14 | **Multi-agent amplification** — biases compound along transmission chains; conformity and homophily exploitable | Gao 6.4–6.5 |
> | 15 | **Model drift and deprecation** — results tied to a model version | Horton Sec. 1: GPT-3 results relegated to an appendix |

Three of these deserve elaboration because they interact with methods elsewhere in the vault.

**Threats 1–3 and poststratification.** Silicon sampling fixes threat 1 by averaging the model's conditionals over a representative covariate distribution — formally [[Poststratification]]. But poststratification is only as good as the cell-level model. Threat 2 is *bias* in the cell means; threat 3 is *under-dispersion* within cells. Reweighting repairs neither. In a multilevel-regression-and-poststratification workflow, cell estimates come with posterior uncertainty and are partially pooled toward data ([[Hierarchical Models]]); an LLM's cell "estimate" has no standard error and no data to pool toward unless the analyst supplies it.

**Threat 4 and social-influence dynamics.** Over-agreeable agents bias exactly the parameters that WOM and opinion-leader models care about — persuasion probability, conformity, tie formation ([[Word of Mouth Mechanisms]], [[Opinion Leaders and Social Influence]], [[Imitation and Conditioning Processes]]). Park et al.'s network density rising from $0.167$ to $0.74$ in two days, and an agent whose interests drift toward whatever others suggest, should be read as an upper bound on sociability rather than an estimate of it.

> [!theorem] Imputed-context confounding (Horton et al., Sec. 4.6) ^thm-imputation
> Even with perfect randomisation of the prompt manipulation, "editing a prompt to change one factor may inadvertently cause other factors to change". If the scenario leaves a relevant variable $Z$ unspecified, the LLM imputes $Z$ from what *is* specified — including the treatment $T$. The contrast then estimates the effect of $T$ *together with* the induced change in imputed $Z$. In the minimum-wage simulation, omitting a reference wage let the model infer one from the applicants' wage asks (which the minimum wage alters); stating a \$12 reference wage changed the estimated effect on hired wage by nearly 50% and on experience from about one to about three months. The authors classify this as an **external-validity** problem shared with sparse lab vignettes given to humans, and recommend specifying context, robustness checks and additional simulations.

In [[Potential Outcomes Framework]] terms: the unit's response is $Y(t, z)$ but the experiment delivers $Y(t, Z(t))$ with $Z(t)$ the model's imputation. The randomised contrast is a valid *total* effect for that prompt; it is not the *controlled direct* effect $Y(1, z) - Y(0, z)$ the researcher usually has in mind.

### Remedies and what each does

> [!algorithm] A validation-and-calibration protocol (synthesis of the sources) ^alg-protocol
> 1. **Scope the claim.** Piloting, design stress-testing, power analysis and hypothesis generation tolerate low fidelity; using silicon responses *as estimates* does not (Horton Sec. 2.2).
> 2. **Fix composition**: draw personas from a representative frame and weight them (Argyle; [[Poststratification]]).
> 3. **Prefer theory-grounded instructions** to bare demographics where a mechanism is known (Horton 3.2), and **calibrate type shares** to human data ([[Persona Mixture Calibration of LLM Agents]]).
> 4. **Validate micro-level distributions**, not modes, per segment and topic, using a distributional distance such as the normalised Wasserstein alignment ([[Opinion Alignment Metrics for Language Models]]). Check *dispersion* explicitly.
> 5. **Validate macro-level patterns** against known regularities (Gao 4.4), as for any ABM ([[ABM Validation Challenges]]).
> 6. **Test on held-out, structurally different tasks** (Horton's two-stage games; Argyle's multiple studies) — and, where possible, on tasks that post-date the training cutoff to separate memorisation from generalisation.
> 7. **Prompt-permutation robustness**: vary temperature, paraphrase, translate and back-translate, reorder options, swap models; report all variants (Horton 4.5; Santurkar Sec. 3).
> 8. **Publish code and prompts**; re-run when models change (Horton 4.5, Sec. 5).
> 9. **Anchor to human ground truth.** With a labelled human sample, use **prediction-powered inference**: LLM predictions on unlabelled inputs act "like additional observations that are corrected using the ground truth sample", giving estimators that "remain unbiased for the target parameter" with precision increasing in predictive accuracy (Horton 3.3).
> 10. **Audit multi-agent runs** for hallucinated memories (trace claims to the memory stream, as Park et al. did) and for amplification along chains.

**Fine-tuning** on human data is an alternative to steps 3–4 (Gao 4.2; Horton fn. 14) but is heavier, risks catastrophic forgetting and sacrifices interpretability.

> [!definition] The four outcomes of relying on a simulation (Horton et al., Fig. 7) ^def-four-outcomes
> Treating simulation results as predictions about true propositions: **true positives** and **true negatives** help; **false positives** "introduce spurious results"; **false negatives** "fail to predict legitimate findings". "Without a correct causal model, no statistical procedure can, ex ante, guarantee performance in novel settings." A mitigating observation: the bar is human expert forecasting, which is itself "surprisingly poor".

### Where the sources disagree

- **Demographic conditioning.** Argyle et al. find it works well (U.S. politics, GPT-3 base model, mostly modal/binary metrics). Santurkar et al. find it modest and uneven (many topics, distributional metric, including RLHF models). Horton et al. side with the sceptics on demographics but argue theory-grounded instructions fare better. The findings are reconcilable: fidelity is **domain-, model- and metric-specific**, and base models preserve distributional spread better than RLHF models.
- **Is memorisation bad?** Horton et al.: not if it is the "good student's" memorisation of generalisable principles; and "performativity may be a desirable feature ... assuming the underlying theory is correct". For measurement this is cold comfort: a silicon consumer that exhibits loss aversion *because it read Kahneman* validates nothing about consumers.
- **Does one need to understand the model?** Horton et al. invoke Simon's "sciences of the artificial" and Friedman's as-if defence; Gao et al. call for interpretability and benchmarks.

## Examples

**Checklist applied to a silicon brand-tracker panel (synthesis).** A team wants synthetic respondents to extend a quarterly brand survey.

| Step | Concrete action | Pass criterion |
|---|---|---|
| Composition | personas = rows of last wave's respondents with survey weights | weighted persona margins equal panel margins |
| Micro validity | hold out 20% of questions; compute alignment $\mathcal A$ by segment | $\mathcal A$ for each segment $\geq$ between-wave human alignment for that segment (the noise ceiling) |
| Dispersion | compare entropy of silicon vs. human answer distributions | ratio near 1; flag segments with ratio $< 0.7$ |
| Consistency | repeat by topic block (awareness, consideration, price perception) | no block where the best-aligned segment differs from the intended one |
| Robustness | 5 paraphrases × 2 models × option-order shuffles | conclusions invariant |
| Temporal | include a campaign launched after the model cutoff | expect failure; supply campaign description in context and re-test |
| Use | PPI: combine silicon predictions for unfielded questions with a small fresh human sample | interval covers later full-sample value |

The human–human noise ceiling is the key idea borrowed from Santurkar et al.'s finding that *every* human demographic group was closer to the overall population than any model: alignment numbers mean nothing without such a reference scale.

**Dispersion check in code** (illustrative):

```python
import numpy as np
def entropy(D):                     # D: (n_questions, N) rows sum to 1
    return -(D * np.log(D + 1e-12)).sum(1)
ratio = entropy(D_silicon) / entropy(D_human)
print("median dispersion ratio:", np.median(ratio))   # << 1 signals modal collapse
```

## Connections

- [[ABM Validation Challenges]] and [[ABM Calibration Overview]] — classical counterparts; LLM agents move the burden from calibration to validation.
- [[Poststratification]] — fixes composition only; shares the transportability assumption on conditionals.
- [[Opinion Alignment Metrics for Language Models]] — the measurement tools for threats 2, 3 and 6.
- [[Persona Mixture Calibration of LLM Agents]] — the calibration remedy.
- [[Silicon Samples and Algorithmic Fidelity]] — the four fidelity criteria as minimum standards.
- [[Homo Silicus - LLMs as Simulated Economic Agents]] — source of the critique catalogue and the "theory, not data" framing.
- [[Generative Agents Architecture - Memory, Reflection and Planning]] — failure modes specific to stateful, interacting agents.
- [[LLM Agents vs Rule-Based Agents in ABM]] — how these threats compare with rule mis-specification.
- [[Multiple Testing Corrections]] — prompt hacking as a forking-paths problem.
- [[Potential Outcomes Framework]] — formalising imputed-context confounding.

## See Also

- [[LLM-Powered Agents - Overview]]
- [[Posterior Predictive Checking]] and [[Prior Predictive Checking]] — the Bayesian-workflow analogue of comparing simulated to observed distributions; silicon data is best treated as prior-predictive, not as observations.
- [[Uncertainty Quantification for ABM Calibration]]
- [[LLM Expert Elicitation for Bayesian Networks]] — related validity questions when LLMs stand in for human experts.
- [[Power Analysis and Sample Size]] — a low-risk use of silicon pilots.

## Sources

- Horton 2023 - Homo Silicus LLMs as Simulated Economic Agents — Horton, Filippas & Manning, arXiv 2301.07543v2.
- Santurkar 2023 - Whose Opinions Do Language Models Reflect — Santurkar et al., arXiv 2303.17548.
- Argyle 2022 - Out of One Many Silicon Samples — Argyle et al., arXiv 2209.06899.
- Park 2023 - Generative Agents Interactive Simulacra — Park et al., arXiv 2304.03442.
- Gao 2023 - LLM Empowered Agent-Based Modeling Survey — Gao et al., arXiv 2312.11970.
