---
title: Persona Mixture Calibration of LLM Agents
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/large-language-models
  - topic/calibration
  - topic/silicon-samples
  - type/method
  - doc/paper
source: "[[raw/Horton 2023 - Homo Silicus LLMs as Simulated Economic Agents.pdf]]"
source_location: "Sec. 2.2 (Figs. 3-4; mixture weights, out-of-sample MSE); Sec. 3.2 (theory as instruction; atheoretical personas); Sec. 3.3 and fn. 14 (ground truth, prediction-powered inference, fine-tuning alternative); fn. 7"
date_ingested: 2026-09-18
folder: "Agent-Based Modeling/LLM-Powered Agents"
doc_type: paper
depends_on:
  - "[[Homo Silicus - LLMs as Simulated Economic Agents]]"
  - "[[ABM Calibration Overview]]"
  - "[[Heterogeneity in Agent Models]]"
used_by:
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
  - "[[LLM Agents vs Rule-Based Agents in ABM]]"
aliases:
  - Persona Mixture Calibration
  - Theory-Grounded Agents
  - Calibrated Samples of AI Agents
  - Mixture of Personas
---

# Persona Mixture Calibration of LLM Agents

> [!summary]
> An off-the-shelf LLM is a poor stand-in for a human population, but an LLM told to follow a *simple, theory-defined rule* follows it almost perfectly. Horton, Filippas & Manning (Sec. 2.2, following Manning & Horton 2025) turn this into a calibration method: define a small set of **theory-grounded personas**, record each persona's choice probabilities on a set of calibration tasks, and find the **simplex-constrained mixture weights** that best reproduce aggregate human choices. Sample a population of agents from those weights and deploy it on *new* tasks. In the Charness–Rabin games the calibrated populations halved out-of-sample error on structurally different two-stage games (MSE $0.094$ vs. $0.182$ for persona-less agents). This is the LLM-agent analogue of calibrating the type distribution in a classical heterogeneous-agent ABM.

## Overview

[[ABM Calibration Overview]] describes calibration as searching for agent-level parameters that reproduce macro data — hard because the micro-to-macro map is nonlinear, stochastic and expensive ([[Genetic Algorithm Calibration for ABM]], [[History Matching for ABMs]], [[Approximate Bayesian Computation for ABMs]]). With LLM agents the behavioural "parameters" are text, which cannot be searched by gradient or GA in any obvious way. Persona-mixture calibration sidesteps this by **fixing a finite dictionary of interpretable behavioural types and calibrating only their population shares**. The map from shares to aggregate choice frequencies is *linear* (when agents act independently), so calibration is a small convex program.

The approach depends on an empirical regularity reported in Sec. 2.2: persona-less models differ markedly from human subjects and from each other, but persona-endowed agents "followed the instructions tied to their assigned type almost perfectly". Instruction-following — "the central post-training objective of modern LLMs" — is the reliable capability; the latent world model is not (Sec. 3.2).

## Main Content

> [!definition] Theory-grounded persona ^def-theory-grounded
> A persona "motivated by some theory that we generally understand, can clearly evaluate, and reasonably expect to predict the relevant human behavior". In the dictator-game application the three types mirror the Charness–Rabin social-preference model:
> - **Efficient** — "You only care about the total payoff of both players"
> - **Inequity-averse** — "You only care about fairness between players"
> - **Self-interested** — "You only care about your own payoff"

> [!algorithm] Persona mixture calibration (Sec. 2.2) ^alg-mixture
> 1. **Choose types** $k = 1, \dots, K$ from theory and write each as an explicit instruction.
> 2. **Characterise each type.** For each calibration task $g = 1,\dots,G$ run the persona many times (100 plays at temperature 1 in the paper) and record $p_{kg}$, the share choosing a reference option ("Left"). Type $k$ is the vector $v_k = (p_{k1}, \dots, p_{kG})$.
> 3. **Human target.** $v_H = $ the human choice shares on the same tasks; for Charness–Rabin's six unilateral games, $v_{CR} = (.52, .67, .27, 1, .78, .68)$.
> 4. **Fit weights** for each LLM separately:
>
> $$
> \hat w = \arg\min_{w}\ \Big\lVert \sum_{k=1}^K w_k v_k - v_H \Big\rVert^2
> \quad \text{s.t.} \quad \sum_k w_k = 1,\ \ w_k \ge 0 .
> $$
>
> 5. **Sample a population**: draw $N$ agents (100 in the paper) with types $\sim \text{Categorical}(\hat w)$.
> 6. **Validate out of sample** on tasks "plausibly governed by the same theory" but with different structure; compare with the persona-less baseline.

> [!example] Reported weights and out-of-sample result ^ex-weights
> Optimal $(w_E, w_I, w_S)$ = (efficient, inequity-averse, self-interested):
>
> | Model | $w_E$ | $w_I$ | $w_S$ |
> |---|---|---|---|
> | Llama-3-70B | 0.49 | 0.00 | 0.51 |
> | Claude-Sonnet-3.5 | 0.44 | 0.00 | 0.56 |
> | GPT-4o | 0.37 | 0.10 | 0.53 |
> | DeepSeek | 0.44 | 0.00 | 0.56 |
>
> Out-of-sample test: Charness–Rabin **two-stage** games (Person A either accepts an allocation or passes the choice to Person B). Each of 100 sampled agents plays each game 5 times in each role; persona-less controls play 100 times. Across models the calibrated sample's MSE against human shares is $0.094$, "about half" of the persona-less $0.182$ (Fig. 4).

Two points of interpretation the authors stress:

- **The types become ambiguous out of sample, and it still helps.** In the unilateral games each instruction maps mathematically to a choice (only Berk26 is equivocal for efficiency). In the two-stage games "self-interested" no longer pins down an action — e.g. in Berk27 should Person A take a certain 500 or gamble on 800 vs. 0 depending on B? — so the LLM must *interpret* the theory in the new setting. That interpretive step is what a fixed parametric utility cannot do.
- **Fit is not proof of mechanism.** "Are we actually learning that human dictators behave like mixtures of efficient, inequity-averse, and self-interested types? ... For now, that inference is too strong." But the pattern that theory-based personas help while "hobbies or favorite TV shows" do not is "structured signal" about which theories are promising (Sec. 3.2).

### Relation to other calibration strategies

| Strategy | What is tuned | Cost | Interpretability | Source |
|---|---|---|---|---|
| Demographic conditioning | nothing — shares fixed from census/survey margins | none | personas are descriptive, not mechanistic | [[Silicon Samples and Algorithmic Fidelity]] |
| **Persona mixture** | type shares $w$ | tiny convex fit after $K \times G$ simulation cells | high — shares of named behavioural types | this note |
| Prompt optimisation | the persona text itself | many LLM calls; risk of overfitting | medium — Xie et al. (2025, as cited) find optimised prompts invoke the constructs economists expect | Sec. 3.2 fn. 13 |
| Fine-tuning on human data | model weights | heavy; "catastrophic forgetting" | low; "sacrifices many of the lessons learned from identifying the appropriate theory-grounded agents" | fn. 14 |
| Prediction-powered inference | nothing — LLM predictions debiased by a labelled human sample | needs human ground truth | estimator remains unbiased | Sec. 3.3 |

Footnote 7 notes the mixture idea has been explored by others as well (Leng et al. 2024; Xie et al. 2025; Bui et al. 2025).

### Statistical caveats (reader's notes, not from the paper)

- **Identification.** With $K$ types and $G$ tasks the design matrix $V = [v_1 \cdots v_K]$ must have full column rank and the tasks must *separate* the types. If two personas choose identically on every calibration task their shares are not identified. Choosing calibration tasks is an experimental-design problem.
- **No uncertainty.** The paper reports point weights. A Bayesian version is immediate: $w \sim \text{Dirichlet}(\alpha)$, human counts $y_g \sim \text{Binomial}(n_g, \sum_k w_k p_{kg})$ — a finite mixture with *known* components — yielding a posterior over shares that can be propagated to out-of-sample predictions and checked with [[Posterior Predictive Checking]]. Partial pooling of $w$ across LLMs or across human sub-populations is a natural [[Hierarchical Models|hierarchical]] extension.
- **Aggregate vs. individual heterogeneity.** Matching aggregate shares does not identify whether humans are a mixture of pure types or homogeneous randomisers; both produce the same $v_H$. Individual-level choice data and a latent-class [[Discrete Choice Models|discrete choice model]] would be required.
- **Interaction breaks linearity.** Once agents interact (WOM, imitation), aggregate outcomes are no longer linear in $w$, and one is back to simulation-based calibration ([[HM-ABC Calibration Framework]]) — but over a $K{-}1$ dimensional simplex rather than an unstructured parameter space.

## Examples

**Worked example with idealised personas.** The six unilateral games, written as (A's payoff, B's payoff) with B the dictator, are Barc2: L (400,400) / R (750,375); Barc8: L (300,600) / R (700,500); Berk15: L (200,700) / R (600,600); Berk23: L (800,200) / R (0,0); Berk26: L (0,800) / R (400,400); Berk29: L (400,400) / R (750,400). A *perfectly adherent* agent chooses Left with probability:

- efficient (max total): $v_E = (0, 0, 0, 1, 0, 0)$ — treating the Berk26 tie as Right, which matches the GPT-4o vector quoted in the paper;
- inequity-averse (min payoff gap): $v_I = (1, 0, 0, 0, 0, 1)$;
- self-interested (max own payoff): $v_S = (1, 1, 1, 1, 1, 0.5)$ — Berk29 is a tie for B.

```python
import numpy as np
from scipy.optimize import minimize

V   = np.c_[[0,0,0,1,0,0], [1,0,0,0,0,1], [1,1,1,1,1,.5]]   # columns: E, I, S
vCR = np.array([.52, .67, .27, 1, .78, .68])

mse = lambda w: np.mean((V @ w - vCR) ** 2)
res = minimize(mse, np.ones(3) / 3, method="SLSQP", bounds=[(0, 1)] * 3,
               constraints={"type": "eq", "fun": lambda w: w.sum() - 1})
print(res.x.round(2))        # -> [0.32 0.12 0.57]
```

The idealised solution $(0.32, 0.12, 0.57)$ is close to the paper's empirical GPT-4o weights $(0.37, 0.10, 0.53)$, confirming that the fitted shares are driven mostly by the game structure and the human data rather than by LLM idiosyncrasies. The fit is imperfect (in-sample MSE $\approx 0.044$): e.g. the mixture predicts $0.57$ Left in Berk15 where humans chose Left only $27\%$ of the time, a signal that the three-type dictionary is too coarse.

**Marketing translation (synthesis).** Types could be "price-minimiser", "quality-seeker", "brand-loyal/habitual" and "socially-influenced"; calibration tasks are observed choice shares across a handful of price/promotion scenarios; the out-of-sample target is a new scenario (a new pack size, a competitor entry). The calibrated type shares then initialise a consumer ABM ([[Population Initialization and Parameter Sensitivity]], [[ABM in Marketing Strategy]]).

## Connections

- [[Homo Silicus - LLMs as Simulated Economic Agents]] — parent paper and the "theory as flexible instruction" argument.
- [[ABM Calibration Overview]], [[Approximate Bayesian Computation for ABMs]], [[Uncertainty Quantification for ABM Calibration]] — classical calibration; this method is the low-dimensional, linear special case.
- [[Heterogeneity in Agent Models]] — heterogeneity as a discrete distribution over behavioural types.
- [[Behavioral Attitudes in CUBES]] — a rule-based consumer simulator that likewise represents consumers as mixtures of behavioural attitudes.
- [[Validity, Bias and Calibration of LLM-Simulated Populations]] — where this sits among validity remedies.

## See Also

- [[Poststratification]] — the complementary reweighting: fixed *demographic* cell shares rather than fitted *behavioural* type shares.
- [[Silicon Samples and Algorithmic Fidelity]]
- [[Logit Purchase Decision Model]]
- [[LLM-Powered Agents - Overview]]
