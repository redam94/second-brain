---
title: Silicon Samples and Algorithmic Fidelity
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/silicon-samples
  - topic/survey-methodology
  - type/concept
  - doc/paper
source: "[[raw/Argyle 2022 - Out of One Many Silicon Samples.pdf]]"
source_location: "Sec. 2 (GPT-3 as conditional distribution, p. 3); Sec. 3 (algorithmic fidelity and four criteria, pp. 4-5); Sec. 4 (silicon sampling, p. 5); Secs. 5-7 (Studies 1-3, pp. 6-13); Table 1"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[LLM-Powered Agents - Overview]]"
  - "[[Poststratification]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[Homo Silicus - LLMs as Simulated Economic Agents]]"
  - "[[Opinion Alignment Metrics for Language Models]]"
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - Silicon Sampling
  - Silicon Samples
  - Algorithmic Fidelity
  - Out of One Many
  - Argyle et al 2022
  - Synthetic Survey Respondents
---

# Silicon Samples and Algorithmic Fidelity

> [!summary]
> Argyle, Busby, Fulda, Gubler, Rytting & Wingate (2022; published in *Political Analysis* 2023) propose that a language model is not one biased respondent but a **mixture of many conditional response distributions**, and that "structured curation of the conditioning context" can select the distribution of a particular human sub-population. They name the quality of this correspondence **algorithmic fidelity**, give four criteria for it, and introduce **silicon sampling**: generate one synthetic respondent per real survey respondent by conditioning GPT-3 on that person's first-person socio-demographic backstory, so that the synthetic sample inherits the *population's* covariate distribution rather than the internet's. In U.S. political data, human judges could not tell GPT-3 word lists from human ones ($61.7\%$ vs. $61.2\%$ judged human), silicon vote choice matched ANES respondents with tetrachoric correlations of $0.90$, $0.92$ and $0.94$ (2012/2016/2020), and the inter-item association structure (Cramér's $V$) was reproduced with mean difference $-0.026$.

## Overview

The paper reframes "algorithmic bias". Rather than "a singular, macro-level feature of the model", bias is "a complex reflection of the many various patterns of association between ideas, attitudes, and contexts present among humans" — the model does "not contain just one bias, but many". If so, conditioning on an identity profile selects "from among a diverse and frequently disjoint set of response distributions within the model, each closely aligned with a real human sub-population" (Sec. 1).

In ABM terms this is a recipe for [[Heterogeneity in Agent Models|agent heterogeneity]] without behavioural parameters: each agent is a row of demographic and attitudinal covariates, and the LLM supplies $P(\text{response} \mid \text{covariates})$. The paper's scope is explicitly the **population distribution**, not individuals: "This does not imply that the model can simulate a specific individual" and correspondence is not evaluated "at the individual level" (Secs. 3, 7).

## Main Content

> [!definition] Language model as conditional distribution (Sec. 2) ^def-lm-conditional
> A language model is $p(x_n \mid x_1, \dots, x_{n-1})$ over tokens from a fixed vocabulary. The conditioning tokens are the **context**. Changing the context reweights outputs; because sampling is stochastic, one context yields a *distribution* of completions.

> [!definition] Algorithmic fidelity (Sec. 3) ^def-algorithmic-fidelity
> "The degree to which the complex patterns of relationships between ideas, attitudes, and socio-cultural contexts within a model accurately mirror those within a range of human sub-populations." The core assumption is that generated texts are selected "not from a single overarching probability distribution, but from a combination of many distributions".

> [!definition] Four criteria for algorithmic fidelity (Sec. 3) ^def-four-criteria
> 1. **Social Science Turing Test** — generated responses are indistinguishable from parallel human texts.
> 2. **Backward Continuity** — responses are consistent with the conditioning context, "such that humans viewing the responses can infer key elements of that input".
> 3. **Forward Continuity** — responses "proceed naturally from the conditioning context", reflecting its form, tone and content.
> 4. **Pattern Correspondence** — responses "reflect underlying patterns of relationships between ideas, demographics, and behavior that would be observed in comparable human-produced data".
>
> No numerical thresholds are proposed; "the best metric is repeated support for each criteria across multiple data sources, different measures, and across many groups." Fidelity must be established **per domain and per group** before use.

> [!theorem] Silicon sampling corrects skewed marginals (Sec. 4) ^thm-silicon-sampling
> Let $V$ be an outcome (e.g. vote) and $B$ a backstory. The model represents
>
> $$
> P(V, B_{\text{GPT3}}) = P(V \mid B_{\text{GPT3}})\, P(B_{\text{GPT3}}),
> $$
>
> but $P(B_{\text{GPT3}})$ — the distribution of authors on the internet — differs from the target $P(B_{\text{True}})$, so the unconditioned marginal $P(V) = \int_B P(V, B_{\text{GPT3}})$ is skewed. Silicon sampling draws backstories from a representative survey and computes
>
> $$
> \hat P(V) = \sum_{b} P_{\text{LM}}(V \mid B = b)\, P_{\text{ANES}}(B = b).
> $$
>
> "As long as GPT-3 models the conditional distribution $P(V \mid B)$ well, we can explore patterns in any designated population."

This is structurally identical to [[Poststratification]]: a model for the conditional response, averaged over the target population's covariate distribution. In MRP the conditional model is a multilevel regression fitted to a (non-representative) sample; in silicon sampling it is a pretrained LLM with **no fitted parameters and no uncertainty quantification**. The identifying assumption is the same — the conditional $P(V \mid B)$ transports from the "sample" (the training corpus) to the population — and fails in the same way: if the people who write about politics online differ from non-writers *within* a demographic cell, reweighting cells cannot fix it (selection on unobservables). The authors flag the analogy to Simpson's paradox: the aggregate completions of an unconditioned model can differ drastically from the patterns within sub-populations.

### Evidence

> [!example] Study 1 — free-form partisan descriptors (Sec. 5) ^ex-study1
> Silicon replication of Rothschild et al.'s "Pigeonholing Partisans": each backstory is a first-person template ("Ideologically, I describe myself as conservative. Politically, I am a strong Republican. Racially, I am white. I am male. ... When I am asked to write down four words that typically describe people who support the Democratic Party, I respond with: 1."). 2,873 Lucid evaluators rated 7,675 human and GPT-3 lists (each list rated by three people).
> - **Turing test**: $61.7\%$ of human lists and $61.2\%$ of GPT-3 lists were judged human (two-tailed $p = 0.44$).
> - **Content**: similar shares rated as mentioning traits ($72.3\%$ human vs. $66.5\%$ GPT-3) and as extreme ($39.8\%$ vs. $41.0\%$).
> - **Backward continuity**: raters inferred the writer's party well above the $33\%$ chance rate from both sources, but better from human lists ($60.1\%$ vs. $52.8\%$, $p < .001$) — silicon text carries *less* identifying signal.

> [!example] Study 2 — vote prediction (Sec. 6, Table 1) ^ex-study2
> Backstories built from ten ANES variables (race/ethnicity, gender, age, ideology, party ID, political interest, church attendance, discussing politics, flag patriotism, state). The model's probability of completing "In [year], I voted for..." with the Republican candidate is recorded and dichotomised at $0.5$.
>
> | Year | GPT-3 mean $P(\text{Rep})$ | ANES share Rep | Tetrachoric corr. |
> |---|---|---|---|
> | 2012 | 0.391 | 0.404 | 0.90 |
> | 2016 | 0.432 | 0.477 | 0.92 |
> | 2020 | 0.472 | 0.412 | 0.94 |
>
> More than half of subgroup tetrachoric correlations are $\geq 0.90$ in every year. The exception is **pure independents**, especially in 2020. The 2020 election postdates GPT-3's 2019 training cutoff, yet correlation remained high — but note the **marginal** flipped from under- to over-predicting the Republican by 6 points.

> [!example] Study 3 — association structure (Sec. 7) ^ex-study3
> An interview-style template feeds eleven 2016 ANES answers and asks GPT-3 for the twelfth. Cramér's $V$ is computed for every item pair in the human data and between the conditioning values and the GPT-3 answer. The mean difference in $V$ is $-0.026$; weak human associations are weak in silicon and strong ones strong.

### Reading the evidence critically

- Study 2 conditions on **party ID and ideology**, which almost determine U.S. presidential vote; high tetrachoric correlations are therefore a weak test of the LLM's *own* knowledge. A logistic regression on the same ten covariates is the natural baseline; the paper's appendix reports a backstory-element ablation and a comparison across alternative *language models*, but the main text does not benchmark against a fitted statistical model (reader's critique, not the authors').
- Pattern correspondence in Study 3 is between *inputs and one predicted output*, not the joint distribution of several generated outputs.
- Marginals err by 1–6 points with sign changes across years — larger than typical survey error targets.
- Later work finds much weaker fidelity with broader topics, newer RLHF-tuned models, and distributional (not modal) metrics: see [[Opinion Alignment Metrics for Language Models]] and [[Validity, Bias and Calibration of LLM-Simulated Populations]].

## Examples

**Worked reweighting.** Suppose two strata: $b_1$ (heavy internet writers) and $b_2$. The LLM's conditionals are $P(V{=}1 \mid b_1) = 0.30$, $P(V{=}1 \mid b_2) = 0.60$. If the corpus has $P(b_1) = 0.7$, the unconditioned model says $0.7(0.30) + 0.3(0.60) = 0.39$. If the target population has $P(b_1) = 0.4$, the silicon-sample estimate is $0.4(0.30) + 0.6(0.60) = 0.48$. The nine-point gap is entirely compositional; any remaining error comes from the conditionals.

**Pipeline sketch** (illustrative):

```python
def backstory(row):  # first-person template, Argyle et al. Fig. 1
    return (f"Ideologically, I describe myself as {row.ideology}. "
            f"Politically, I am a {row.party}. Racially, I am {row.race}. "
            f"I am {row.gender}. In terms of my age, I am {row.age_group}. ")

def silicon_sample(survey_df, question_stub, options, lm):
    out = []
    for _, row in survey_df.iterrows():            # one silicon subject per human
        logp = lm.next_token_logprobs(backstory(row) + question_stub, options)
        p = softmax(logp)                           # distribution, not a single draw
        out.append(dict(id=row.id, w=row.survey_weight, **dict(zip(options, p))))
    return pd.DataFrame(out)                        # then weight by w -> poststratified estimate
```

For a marketing application, replace the ANES with a nationally representative consumer panel and the vote stub with a purchase-intent or brand-choice stub; then validate against the panel's *held-out* answers before trusting any unobserved question. Choice outputs can be analysed with the same [[Discrete Choice Models]] used for human respondents.

## Connections

- [[Poststratification]] — silicon sampling is poststratification with an LLM as the cell-level model.
- [[Heterogeneity in Agent Models]] and [[Population Initialization and Parameter Sensitivity]] — backstories from a real survey are a principled population initialisation for an LLM-based ABM.
- [[Homo Silicus - LLMs as Simulated Economic Agents]] — Horton et al. cite this paper for the point that "there is not a single LLM but rather a model capable of being conditioned to take on different personas".
- [[Opinion Alignment Metrics for Language Models]] — Santurkar et al.'s BIO steering prompt is "akin to Argyle et al.", and their results temper this paper's optimism.
- [[ABM Validation Challenges]] — the four criteria are micro-level validation standards that classical ABMs can rarely meet.

## See Also

- [[LLM-Powered Agents - Overview]]
- [[Hierarchical Models]] — the fitted alternative for small-cell estimation.
- [[Persona Mixture Calibration of LLM Agents]] — fitting persona weights to data instead of fixing them from census margins.
- [[Generative Agents Architecture - Memory, Reflection and Planning]] — adds state and interaction to otherwise stateless silicon subjects.
