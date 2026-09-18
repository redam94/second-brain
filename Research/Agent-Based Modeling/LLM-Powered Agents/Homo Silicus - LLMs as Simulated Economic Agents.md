---
title: Homo Silicus - LLMs as Simulated Economic Agents
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/behavioral-economics
  - topic/silicon-samples
  - type/concept
  - doc/paper
source: "[[raw/Horton 2023 - Homo Silicus LLMs as Simulated Economic Agents.pdf]]"
source_location: "arXiv 2301.07543v2 (Feb 2026 revision, with Filippas and Manning): Sec. 1 (argument); Sec. 2.1-2.5 (five experiments, Figs. 1-5, Tables 1-2); Sec. 3.1-3.3 (why it works, theory analogy, Fig. 7, p. 31); Sec. 5 (conclusion)"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[LLM-Powered Agents - Overview]]"
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
  - "[[Discrete Choice Models]]"
used_by:
  - "[[Persona Mixture Calibration of LLM Agents]]"
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
aliases:
  - Homo Silicus
  - Homo silicus
  - LLMs as Simulated Economic Agents
  - Horton 2023
  - Horton Filippas Manning 2026
  - In Silico Experiments
---

# Homo Silicus - LLMs as Simulated Economic Agents

> [!summary]
> Horton (2023; substantially revised 2026 with Filippas & Manning) argues that LLMs, "because of how they are trained and designed, are implicit computational models of humans — a *Homo silicus*". Like *Homo economicus*, such an agent "can be given endowments, information, preferences, and so on, and then their behavior can be explored in scenarios" — but by **simulation**, not deduction. Five "recapitulations" of classic studies (price-gouging fairness, dictator games, status quo bias, the prospect-theory fourfold pattern without risk, and a minimum-wage hiring experiment) yield "qualitatively similar results to the original", and the differences are claimed to be "generative for future research". The paper's conceptual thesis: **"Homo silicus is best understood as theory in flexibly executable form"**, and results "will still require empirical confirmation".

> [!note] Version
> The raw PDF is the February 2026 v2, which replaces the original single-author GPT-3 experiments (now Appendix A) with dozens of contemporary models, adds two experiments (Oprea 2024; Horton 2025), a persona-mixture calibration step, and an open-source package (EDSL). Section numbers below refer to v2.

## Overview

Economic research asks either (a) "What would *Homo economicus* do?" — deduce behaviour from a maintained model — or (b) "What did *Homo sapiens* actually do?". *Homo silicus* adds a third option that *looks* like (b) — design an experiment, collect responses, run regressions — but is epistemically closer to (a): "LLM experimentation is more akin to the practice of economic theory, despite superficially looking like empirical research" (Sec. 1). Its proposed uses are those of a toy model or a pilot: "cheaply and easily explore a parameter space, test whether behaviors seem sensitive to the precise wording of various questions, generate data that will 'look like' the actual data, and inform power calculations" (cf. [[Power Analysis and Sample Size]]).

Why might it work? LLMs (i) are trained to respond as humans would and (ii) hold two kinds of **social information** (Secs. 1, 3.1, Fig. 6): *latent* — text in which people "reason about and discuss economic matters: what to buy, how to bargain, how to shop"; and *explicit* — the published social-science literature. The second is double-edged: it "can also make brittle simulations appear robust because models may simply regurgitate problematic and memorized results".

## Main Content

> [!definition] Homo silicus ^def-homo-silicus
> An LLM treated as an implicit computational model of a human decision maker. The researcher **endows** it — by prepending persona text to the prompt — with preferences, beliefs, information or resources, places it in a scenario described in natural language, and samples its responses (typically at temperature 1) across many replicates and models. "Unlike the one *Homo economicus* that is rational, there are many *Homo silici*" (Sec. 4.6).

### The five recapitulations (Sec. 2)

The authors write "recapitulate" rather than "replicate": the aim is to see "how simulations behave in empirical scenarios where we already understand the analogous human behavior".

> [!example] 2.1 Fairness and price gouging (Kahneman, Knetsch & Thaler 1986) ^ex-gouging
> Vignette: a hardware store raises snow-shovel prices from \$15 to \$20 after a storm; ~82% of original human subjects called it unfair. GPT-4 agents endowed with political personas ("You are a socialist" … "You are a libertarian") rate increases to \$16, \$20, \$40, \$100; 100 draws per cell, 2,400 observations. Results: a **dose–response** in the size of the hike and a **monotone political gradient** (right-leaning agents "more sanguine about gouging"). Across dozens of prompt permutations (temperature, adversarial rewording, round-trip translation) the authors "were unable to invert the relationship".

> [!example] 2.2 Social preferences (Charness & Rabin 2002) ^ex-dictator
> Unilateral dictator games with GPT-4o, Claude-Sonnet-3.5, Llama-3-70B and DeepSeek. **Persona-less models differ from humans and from each other** (Llama more selfish; others efficiency-minded) even though the original paper "is almost certainly included in the training data". Agents told "You only care about fairness between players" / "...the total payoff of both players" / "...your own payoff" follow the instruction almost perfectly. This obedience is then exploited to build a calibrated mixture — see [[Persona Mixture Calibration of LLM Agents]].

> [!example] 2.3 Status quo bias (Samuelson & Zeckhauser 1988) ^ex-status-quo
> 24 agents (12 beliefs about car vs. highway safety × car-owner or not) choose among four budget splits under four status-quo framings, across five models. Choices are analysed with a **conditional logit** over the four alternatives (Table 1) with model-specific coefficients on the auto share, a status-quo indicator, and distance from the status quo. All models show "considerable status quo bias", GPT-4o least. The within-subject design is possible only because "AI agents have no memory unless we explicitly provide them with information about their previous decisions".

> [!example] 2.4 Fourfold pattern without risk (Oprea 2024) ^ex-oprea
> Certainty equivalents for box lotteries at $p \in \{0.05, \dots, 0.95\}$ in a risky **lottery** condition and a deterministic **mirror** condition (payoff equals the expected value), for personas "very bad at math" / "average at math" / "mathematical genius" / none, on five models; $4 \times 2 \times 2 \times 19 \times 5 \times 10 = 15{,}200$ observations. Lottery and mirror conditions "move in lockstep"; weaker models and low-math personas show the prospect-theory X-shape, capable models with high ability return expected values. The authors read this as "suggestive evidence in support of Oprea's complexity-driven interpretation" while conceding that "real human data are necessary".

> [!example] 2.5 Minimum wage and labour–labour substitution (Horton 2025) ^ex-minwage
> An AI employer must hire one of two dishwasher applicants (experienced asking \$12–\$17, inexperienced asking \$13), with or without a \$15 minimum that forces bids up; 24 scenarios × 43 models × 5 runs. Regressions with model fixed effects and model-clustered errors: the minimum wage raises the hired wage by about \$1.3/hour and hired experience by about one month — and by ~50% more / ~3 months when a \$12 reference wage is stated. Direction matches the field experiment.

### Theory in executable form (Sec. 3.2)

Charness and Rabin's parametric model for the dictator,

$$
U_B(\pi_A, \pi_B) = (\rho\, r + \sigma\, s)\,\pi_A + (1 - \rho\, r - \sigma\, s)\,\pi_B ,
$$

with $r = \mathbf 1[\pi_B \ge \pi_A]$ and $s = \mathbf 1[\pi_B \le \pi_A]$, cannot absorb new context (e.g. that half the pairs are friends) without new assumptions and re-estimation, and "is useless" for structurally different games. The same is true of the fixed-form rules in classical ABMs ([[Agent Decision Rules and Bounded Rationality]], [[Consumer Utility Function Components]]) and of conventional ML predictors. LLMs, by contrast, have "a strong 'inductive bias' for social science prediction problems": rewrite the scenario in the prompt and they impute the rest.

The recommended discipline is to make theory the *instruction*: "Economic theory maps naturally into such instructions: it declares state variables and constraints, specifies an objective, and implies decision rules." Explicit instructions "require far less from the LLM's underlying world model", are checkable in simple test cases, and reveal where extrapolation fails. Supporting evidence: theory-based personas improve out-of-sample fit while "atheoretical or scientifically meaningless traits" (hobbies, favourite TV shows) do not (Manning & Horton 2025, as cited).

> [!theorem] The confusion-matrix view of AI simulation (Sec. 3.3, Fig. 7) ^thm-confusion
> Relative to true propositions about the social world, simulation results fall in four regions: **AI true positives**, **true negatives**, **false positives** (spurious results the simulation supports) and **false negatives** (true findings it fails to predict). "Without a correct causal model, no statistical procedure can, ex ante, guarantee performance in novel settings"; to draw "unequivocal inferences" one needs "some sort of ground truth or gold standard dataset". When a human sample exists, **prediction-powered inference** combines it with LLM predictions on unlabelled inputs to give estimators that "remain unbiased for the target parameter", with precision increasing in the predictor's accuracy.

> [!definition] When simulations are most informative (Sec. 5) ^def-when-informative
> "AI simulations are most informative when mechanisms can be written as clear instructions, the domain is well represented in digital text, and researchers can benchmark on related tasks with human data when possible." The authors note that large demonstrations of out-of-sample predictive power are in text-rich domains: psychology lab experiments and **digital marketing experiments** (Hewitt et al. 2024, as cited).

## Examples

A two-cell in-silico pilot in the spirit of Sec. 2.1, written against a generic client (illustrative):

```python
import itertools, pandas as pd

personas = ["You are a socialist.", "You are a moderate.", "You are a libertarian."]
prices   = [16, 20, 40, 100]
stub = ("A hardware store has been selling snow shovels for $15. The morning after a "
        "large snowstorm, the store raises the price to ${p}. Rate this action as: "
        "(1) Very Unfair, (2) Unfair, (3) Acceptable, (4) Completely Fair. Answer with the number.")

rows = []
for persona, p in itertools.product(personas, prices):
    for rep in range(100):                                   # temperature 1 -> a distribution
        r = llm(system=persona, user=stub.format(p=p), temperature=1.0)
        rows.append(dict(persona=persona, price=p, rating=int(r.strip()[0])))
df = pd.DataFrame(rows)
# Robustness (Sec. 4.5): rerun under paraphrases, translations, other models; publish the code.
```

A pricing or promotion researcher could use the same skeleton to map *perceived fairness* of surge pricing or shrinkflation by segment before fielding a human survey, then use the silicon effect sizes only to set priors and sample sizes — never as the estimate.

## Connections

- [[Silicon Samples and Algorithmic Fidelity]] — demographic conditioning for surveys; Horton et al. prefer *theory-grounded* personas over demographic ones, arguing (fn. 18) that traits like "respond as a 30-year-old male" demand a coherent world model of identity × setting and may "default to caricatures".
- [[Persona Mixture Calibration of LLM Agents]] — the method extracted from Sec. 2.2.
- [[LLM Agents vs Rule-Based Agents in ABM]] — the paper's Sec. 4.4 defence against "these are just agent-based models", including the Lucas-critique argument.
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — memorisation, prompt hacking, imputation and identification (Sec. 4).
- [[Discrete Choice Models]] and [[Logit Purchase Decision Model]] — the conditional logit is the analysis model for silicon choices in Sec. 2.3, exactly as for human choices.
- [[Agent Decision Rules and Bounded Rationality]] — status quo bias and complexity-driven heuristics appear *without being programmed*.

## See Also

- [[LLM-Powered Agents - Overview]]
- [[ABM vs Equation-Based Modeling]] — an earlier "simulation vs. deduction" comparison in the vault.
- [[Potential Outcomes Framework]] — the language used in Sec. 4.6 to discuss how unspecified prompt details can vary with treatment.
- [[Market and Financial Simulation]] — classical ABM market simulations.
