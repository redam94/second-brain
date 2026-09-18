---
title: Opinion Alignment Metrics for Language Models
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/silicon-samples
  - topic/validation
  - topic/survey-methodology
  - type/method
  - doc/paper
source: "[[raw/Santurkar 2023 - Whose Opinions Do Language Models Reflect.pdf]]"
source_location: "Sec. 2 (OpinionQA construction); Sec. 3.1-3.2 (prompting, opinion distributions, Eq. 1 alignment); Sec. 4.1 (representativeness, Eq. 2, Figs. 2-4a); Sec. 4.2 (steerability, Fig. 4b); Sec. 4.3 (consistency, Figs. 5-6); Sec. 5 related work; Limitations"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[LLM-Powered Agents - Overview]]"
used_by:
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
aliases:
  - OpinionQA
  - Whose Opinions Do Language Models Reflect
  - Representativeness Steerability Consistency
  - Santurkar et al 2023
  - Wasserstein Opinion Alignment
---

# Opinion Alignment Metrics for Language Models

> [!summary]
> Santurkar, Durmus, Ladhak, Lee, Liang & Hashimoto (2023) build **OpinionQA** — 1,498 multiple-choice questions from 15 Pew American Trends Panel surveys, with weighted human answer distributions for the U.S. population and **60 demographic groups** — and define three metrics that compare a language model's answer *distribution* with human ones using a normalised **1-Wasserstein distance** over ordinal answer options: **representativeness** (default, unprompted alignment), **steerability** (alignment to a group when prompted with that group's identity) and **consistency** (whether the best-aligned group is the same across topics). Across 9 models (350M–178B; OpenAI and AI21) they find misalignment with the U.S. public "on par with the Democrat-Republican divide on climate change"; human-feedback tuning makes it *worse* and shifts alignment toward liberal, high-income, well-educated groups; steering helps only modestly; and RLHF models collapse to a group's **modal** answer (e.g. ">99% approval rating for Joe Biden"). It is the main empirical counterweight to the optimism of [[Silicon Samples and Algorithmic Fidelity]].

## Overview

If an LLM is to supply $P(\text{response} \mid \text{persona})$ for a silicon sample or an LLM-based ABM, three things must hold: the default model should not be wildly skewed, persona prompts must actually move the distribution to the *right* place, and they must do so *across* topics. Santurkar et al. operationalise each. Their framework is "a probe rather than a benchmark": matching human opinion perfectly is not necessarily desirable for a deployed assistant — but for *simulation* purposes it is precisely the target, which makes these metrics directly usable as micro-level validation statistics for ABM agent populations ([[ABM Validation Challenges]]).

Key design choice: compare **whole distributions**, not modal answers. Earlier work (including Argyle et al.'s dichotomised vote) checks whether the model picks the group's dominant view; OpinionQA asks "whether LMs can match the spectrum of opinions of a group rather than its modal opinion" (Sec. 5).

## Main Content

> [!definition] Human and model opinion distributions (Secs. 2.2, 3.1) ^def-opinion-dist
> For question $q$ with answer set $A(q)$ and respondent $h$'s answer $F(h,q)$, the human distribution over a respondent set $H$ is
>
> $$
> D_H(q) = \sum_{h \in H} w_h\, F(h, q), \qquad \sum_{h\in H} w_h = 1,
> $$
>
> using Pew's survey weights "to correct sampling biases". $D_O$ is for all respondents, $D_G$ for demographic group $G$. The model distribution $D_m(q)$ is obtained by prompting with the question in multiple-choice format, reading the **next-token log-probabilities** of the answer letters, and exponentiating and normalising over non-refusal options. Refusal probability is tracked separately.

> [!definition] Opinion alignment (Eq. 1) ^def-alignment
> Map the $N$ ordinal options to integers $1,\dots,N$ (a trailing hedge such as "Neither" goes to the mean) and let $\mathcal{WD}$ be the 1-Wasserstein distance. Then
>
> $$
> \mathcal A(D_1, D_2; Q) = \frac{1}{|Q|} \sum_{q \in Q} \left( 1 - \frac{\mathcal{WD}\big(D_1(q), D_2(q)\big)}{N - 1} \right) \in [0,1].
> $$
>
> Wasserstein is used because KL or total variation ignore ordinal structure: if all humans answer "A great deal", a model answering "A fair amount" and one answering "Not at all" would be judged equally wrong.

> [!definition] Three metrics ^def-three-metrics
> - **Representativeness** (Eq. 2): $\mathcal R^O_m(Q) = \mathcal A(D_m, D_O, Q)$ for the overall population; $\mathcal R^G_m(Q) = \mathcal A(D_m, D_G, Q)$ for group $G$. No prompt context. Cannot equal 1 for all groups at once, since groups disagree.
> - **Steerability**: $\mathcal S^G_m(Q) = \frac{1}{|Q|}\sum_{q} \max_{c_G \in \{\text{QA},\,\text{BIO},\,\text{PORTRAY}\}} \mathcal A\big(D_m(q; c_G), D_G(q)\big)$ — alignment to $G$ when the prompt carries group context $c_G$, taking the best of three styles: **QA** (group given as the answer to a prior survey question), **BIO** (free-text self-description, "akin to Argyle et al."), **PORTRAY** ("pretend you are a Democrat").
> - **Consistency**: with $G^{\text{best}}_m = \arg\max_G \frac{1}{T}\sum_{T'} \mathcal R^G_m(Q_{T'})$, define $\mathcal C_m = \frac{1}{T}\sum_{T} \mathbf 1\big[\arg\max_G \mathcal R^G_m(Q_T) = G^{\text{best}}_m\big]$ — the fraction of topics on which the model's best-aligned group equals its overall best-aligned group.

### Findings

> [!theorem] Empirical results (Sec. 4) ^thm-findings
> **Representativeness (4.1).**
> - "None of the models are perfectly representative of the general populace"; human-feedback-tuned models "are actually worse" (text-davinci-003 vs. davinci).
> - **Every one of the 60 human demographic groups is more representative of the overall population than any LM** considered.
> - $\mathcal R^O_m$ for most models is comparable to the alignment "of agnostic and orthodox people on abortion or Democrats and Republicans on climate change".
> - Base LMs align most with "lower income, moderate, and Protestant or Roman Catholic groups"; OpenAI instruct models with "liberal, high income, well-educated, and not religious" people — matching the demographics of InstructGPT crowdworkers.
> - Poorly represented by all models: **65+, Mormon, widowed**.
> - **Modal collapse**: text-davinci-003 "typically assigns > 0.99 probability to one of the options" and "seems to converge to the modal views of liberals and moderates"; RL-based human feedback "pushes the model to almost embody caricatures of those groups (e.g., 99% approval of Joe Biden)". A modal analysis would wrongly conclude the model is highly representative of Democrats, "where in reality its representation collapses the diversity of opinions".
>
> **Steerability (4.2).** Steering toward 22 groups on 500 contentious questions: "Most LMs (with the exception of ada) do become somewhat more representative of a sub-population post-steering. However, none of the disparities in group opinion alignment of an LM disappear after steering." Typically alignment improves "by a constant factor" for all groups, preserving the ranking of who is served well.
>
> **Consistency (4.3).** Scores are "fairly low — indicating that they are expressing a patchwork of disparate opinions"; even generally liberal text-davinci-002/003 align with conservatives on religion.

**Robustness.** Results were replicated under different prompt templates and permuted answer order. **Limitations** acknowledged: U.S.-only and WEIRD; ATP social-desirability issues; and multiple-choice probing may not transfer to open-ended generation.

### Implications for LLM-based ABM and silicon samples

1. **Variance compression is the first-order problem for simulation.** A population of agents whose answers concentrate on the modal option will understate disagreement, overstate consensus, and therefore mis-simulate any dynamics driven by minorities or by opinion diversity — polarisation, niche adoption, negative WOM ([[Word of Mouth Mechanisms]], [[Opinion Leaders and Social Influence]]). In ABM language, the agent [[Heterogeneity in Agent Models|heterogeneity]] is artificially collapsed *within* each persona cell.
2. **Reweighting cannot repair bad conditionals.** [[Poststratification]] of persona cells corrects $P(B)$ but requires $P(V \mid B)$ to be right; steerability measures exactly that, and it is only modestly better than the default.
3. **Who is mis-modelled matters commercially.** The groups worst served (65+, widowed, some religious groups, and for RLHF models lower-income and conservative respondents) are large consumer segments.
4. **Validation must be topic-specific.** Low consistency means fidelity established on one topic (e.g. politics, as in Argyle et al.) does not license use on another (e.g. health or product attitudes) — echoing Argyle et al.'s own caveat that fidelity must be shown "with respect to both the domain of study and the demographic groups of interest".
5. **Use log-probabilities when available.** Reading the answer distribution from token log-probs gives $D_m(q)$ exactly in one call, avoiding Monte Carlo noise from sampled completions — but chat-tuned APIs often hide log-probs, forcing repeated sampling at temperature 1 as in Horton et al.

## Examples

**Computing alignment by hand.** For 1-D distributions on integers, $\mathcal{WD}$ is the sum of absolute differences of CDFs. Four options (A great deal / A fair amount / Not too much / Not at all):

- Humans $D_G = (0.1, 0.2, 0.3, 0.4)$, CDF $(0.1, 0.3, 0.6, 1)$.
- Model $D_m = (0.4, 0.3, 0.2, 0.1)$, CDF $(0.4, 0.7, 0.9, 1)$.
- $\mathcal{WD} = 0.3 + 0.4 + 0.3 + 0 = 1.0$; alignment $= 1 - 1.0/3 = 0.667$.

Modal collapse: if humans are $(0.35, 0.30, 0.20, 0.15)$ and the model puts all mass on the modal option $(1,0,0,0)$, then CDF differences are $(0.65, 0.35, 0.15, 0)$, $\mathcal{WD} = 1.15$, alignment $= 0.617$ — a model that gets the mode exactly right but has no spread scores *lower* than the model in the first example (0.667), whose distribution slopes the wrong way. Mode-matching is not distribution-matching. The paper's extreme case: humans all on option 1, model all on option 4 gives $\mathcal{WD} = 3$ and alignment $0$; model all on option 2 gives alignment $0.667$.

```python
import numpy as np

def alignment(D1, D2):
    """D1, D2: arrays (n_questions, N) of ordinal answer distributions."""
    N = D1.shape[1]
    wd = np.abs(np.cumsum(D1, 1) - np.cumsum(D2, 1))[:, :-1].sum(1)
    return np.mean(1 - wd / (N - 1))

def steerability(Dm_by_style, DG):
    """Dm_by_style: dict style -> (n_questions, N); best style chosen per question."""
    N = DG.shape[1]
    per_q = np.stack([1 - np.abs(np.cumsum(D, 1) - np.cumsum(DG, 1))[:, :-1].sum(1) / (N - 1)
                      for D in Dm_by_style.values()])
    return per_q.max(0).mean()
```

The same functions validate any silicon consumer panel: replace Pew with a brand tracker's weighted answer distributions by segment, and report $\mathcal R$, $\mathcal S$ and $\mathcal C$ per segment and topic *before* using the silicon panel for anything else.

## Connections

- [[Silicon Samples and Algorithmic Fidelity]] — the claim under test; BIO steering mirrors Argyle et al.'s backstories. Santurkar et al.'s distributional, many-topic test is a stricter version of Argyle's "Pattern Correspondence".
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — places these findings alongside other validity threats and remedies.
- [[Poststratification]] — survey weights enter on the human side ($w_h$); reweighting personas on the model side cannot fix conditional misalignment.
- [[Homo Silicus - LLMs as Simulated Economic Agents]] — Horton et al. cite this paper (fn. 18) as an instance of low fidelity from purely demographic prompts, arguing for theory-grounded instructions instead.
- [[ABM Validation Challenges]] — a concrete micro-level validation metric for agent populations.

## See Also

- [[LLM-Powered Agents - Overview]]
- [[Posterior Predictive Checking]] — the same logic (compare simulated to observed distributions with a discrepancy measure) in Bayesian workflow.
- [[Persona Mixture Calibration of LLM Agents]] — one remedy: fit mixtures of personas to the human distribution instead of trusting a single steered prompt.
