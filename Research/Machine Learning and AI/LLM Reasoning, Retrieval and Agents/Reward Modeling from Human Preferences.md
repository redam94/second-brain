---
title: Reward Modeling from Human Preferences
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/rlhf
  - topic/preference-learning
  - type/concept
  - doc/paper
source: "[[raw/Ouyang 2022 - InstructGPT RLHF.pdf]]"
source_location: "Secs. 3.2, 3.4, 3.5 (Reward modeling, Eq. 1), 4.1, 5.2-5.3, pp. 6-9, 12, 18-19; Appendix A.3 (Table 6), C.2, pp. 33, 41-42"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Discrete Choice Models]]"
  - "[[Generalized Linear Models]]"
used_by:
  - "[[RLHF and Instruction Tuning]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Reward Model
  - Preference Model
  - RM Training
  - Pairwise Preference Learning
  - Bradley-Terry Reward Model
---

# Reward Modeling from Human Preferences

> [!summary]
> The **reward model (RM)** is the statistical core of [[RLHF and Instruction Tuning|RLHF]]: a language model with its unembedding layer replaced by a scalar head, $r_\theta(x, y)$, trained so that the **difference in rewards equals the log-odds that a human prefers one response over another**. InstructGPT collects rankings of $K = 4$ to $9$ responses per prompt, converts each ranking to $\binom K2$ pairwise comparisons, and — crucially — trains on all comparisons from one prompt as a *single batch element* to avoid overfitting. The 6B RM predicts held-out labelers' preferences with $69.6 \pm 0.9\%$ accuracy, against inter-labeler agreement of about 73–77%, so it is close to the noise ceiling of the data.

## Overview

Humans are poor at writing down a reward function for "a good response" and only moderately consistent at scoring responses on an absolute scale, but they are comparatively good at saying *which of two responses is better*. Reward modelling exploits this: collect comparisons, fit a latent-utility model, then use the fitted utility as the reward in RL. Ouyang et al. follow Ziegler et al. (2019) and Stiennon et al. (2020), and change mainly the data-collection design (rank $K$ at once) and the batching.

Viewed from statistics, the RM is a **logistic paired-comparison (Bradley–Terry-type) model** in which the item "strength" is a deep function of the text rather than a free parameter per item. It is a two-alternative special case of the random-utility / softmax models in [[Discrete Choice Models]]: if each response has latent utility $r_\theta(x,y) + \varepsilon$ with Gumbel noise, the difference of noises is logistic and the choice probability is a sigmoid of the utility gap. (The paper states the log-odds interpretation; the Bradley–Terry and random-utility labels are standard terminology, not the paper's.)

## Main Content

> [!definition] Reward model and its loss (Sec. 3.5, Eq. 1) ^def-rm-loss
> Let $r_\theta(x, y)$ be the scalar output for prompt $x$ and completion $y$. For a labeled pair in which $y_w$ is preferred to $y_l$,
> $$
> \text{loss}(\theta) = -\frac{1}{\binom K2}\, \mathbb E_{(x,\, y_w,\, y_l) \sim D}\Big[ \log \sigma\big( r_\theta(x, y_w) - r_\theta(x, y_l) \big) \Big],
> $$
> where $\sigma$ is the logistic function and $D$ the dataset of human comparisons. Equivalently the model asserts
> $$
> \Pr(y_w \succ y_l \mid x) = \sigma\big(r_\theta(x, y_w) - r_\theta(x, y_l)\big),
> $$
> i.e. "the difference in rewards represents the log odds that one response will be preferred to the other by a human labeler". The loss is the negative Bernoulli log-likelihood — logistic regression ([[Generalized Linear Models]]) on the *difference* of two learned features.

**Identifiability.** Only reward *differences* enter the likelihood, so $r_\theta$ is identified up to an additive constant (per prompt, in principle). The paper fixes the constant after training: "since the RM loss is invariant to shifts in reward, we normalize the reward model using a bias so that the labeler demonstrations achieve a mean score of 0 before doing RL".

> [!algorithm] Data collection and batching ^alg-rm-training
> 1. For each prompt, sample $K \in \{4, \dots, 9\}$ responses from the current models (mostly SFT policies, some PPO).
> 2. A labeler **ranks** all $K$; this yields up to $\binom K2$ pairwise comparisons (ties are dropped). Ranking $K$ at once is much faster per comparison than showing pairs.
> 3. **Do not shuffle comparisons across prompts.** The $\binom K2$ comparisons from one prompt are highly correlated; each completion would otherwise appear in $K-1$ separate gradient updates, and "a single pass over the dataset caused the reward model to overfit".
> 4. Instead, treat all $\binom K2$ comparisons from a prompt as **one batch element**. This needs only $K$ forward passes (one per completion) rather than $\binom K2$, and "because it no longer overfits, it achieves much improved validation accuracy and log loss".
> 5. Train for a **single epoch** (lr $9\times10^{-6}$, cosine schedule, 64 prompts per batch, so up to $64 \times \binom 92 = 2{,}304$ comparisons per batch). Training is insensitive to learning rate but "quite sensitive to the number of epochs".

The batching issue is a clustered-data problem in disguise: comparisons within a prompt share completions and a labeler, so treating them as i.i.d. overstates the effective sample size.

**Size and initialisation.** RM training data: 33k prompts (6,623 labeler-written + 26,584 customer; Table 6). Only **6B** RMs are used, for every policy size: 175B RMs were unstable and "less suitable to be used as the value function during RL", and a 6B RM "led to equally strong PPO models". Architecturally the RM is an SFT-style model "with the final unembedding layer removed" and a scalar output. The final RM was actually initialised from a 6B GPT-3 fine-tuned on public NLP datasets (ARC, BoolQ, CoQA, DROP, MultiNLI and others) "mostly for historical reasons"; results were similar when initialising from GPT-3 or from the SFT model (Appendix C.2). In PPO the **value function is initialised from the RM**.

> [!theorem] Empirical findings — how good is the reward signal? ^thm-rm-quality
> - **Label noise ceiling.** Training labelers agree with each other $72.6 \pm 1.5\%$ of the time; held-out labelers $77.3 \pm 1.3\%$ (Sec. 3.4). For comparison, researcher–researcher agreement in Stiennon et al. was $73 \pm 4\%$.
> - **Generalisation across people.** In 5-fold cross-validation *over labeler groups* (train on 4 groups, test on the 5th), RMs predict held-out labelers' preferences with $69.6 \pm 0.9\%$ accuracy, versus $72.4 \pm 0.4\%$ on labelers in their training set (Sec. 4.1) — a small drop, so the RM is not merely memorising individual raters.
> - **Most comparisons are labeled once**, "for cost reasons" (Sec. 5.3), so disagreement is not observed at the item level.

> [!definition] Reward over-optimisation and the KL leash ^def-overoptimization
> The RM is an imperfect proxy fitted on samples from SFT-like policies. A policy optimised hard against it drifts to regions where $r_\theta$ is extrapolating and scores rise while true quality falls. InstructGPT counters this with the per-token KL penalty $-\beta \log\big(\pi^{\mathrm{RL}}_\phi(y\mid x)/\pi^{\mathrm{SFT}}(y\mid x)\big)$ "to mitigate over-optimization of the reward model", and by iterating steps 2–3 so that new comparisons are collected on the current policy's outputs.

**Whose utility? (Secs. 5.2–5.3).** The RM encodes the preferences of about 40 English-speaking contractors, filtered by a screening test and guided by researcher-written instructions. The authors flag that "aligning to the average labeler preference may not be desirable" — e.g. for text that disproportionately affects a minority group — and suggest labeling items multiple times to locate disagreement, or conditioning models on the preferences of particular groups.

**The RM as a cheap automated judge.** Inside the project the RM already serves as a stand-in for human evaluation: the final SFT checkpoint is selected by RM score on the validation set; the FLAN/T0 baselines use "the checkpoint which obtains the highest reward model score"; and the few-shot prefix for the "GPT-3 (prompted)" baseline was the winner of a prefix-finding competition scored by RM. This is the precursor of later model-as-judge evaluation — with the same caveat that the judge's accuracy against people is about 70%.

## Examples

**From a ranking to a loss.** A labeler ranks four responses to one prompt as $B \succ D \succ A \succ C$. This produces $\binom 42 = 6$ ordered pairs: $(B,D), (B,A), (B,C), (D,A), (D,C), (A,C)$. Suppose the RM currently outputs $r = \{A: 0.1,\ B: 1.3,\ C: -0.4,\ D: 0.2\}$. The contribution of pair $(D, A)$ is $-\log\sigma(0.2 - 0.1) = -\log(0.525) = 0.644$ — nearly a coin flip, so a large gradient; pair $(B, C)$ gives $-\log\sigma(1.7) = 0.168$. The prompt's loss is the mean over the six pairs, computed from just **four** forward passes.

```python
import torch, itertools
import torch.nn.functional as F

def rm_loss_one_prompt(rm, prompt, completions_ranked_best_first):
    # one forward pass per completion (K passes), not per pair (K choose 2)
    r = torch.stack([rm(prompt, y) for y in completions_ranked_best_first])      # shape [K]
    pairs = list(itertools.combinations(range(len(r)), 2))                        # (winner, loser)
    diffs = torch.stack([r[w] - r[l] for w, l in pairs])
    return -F.logsigmoid(diffs).mean()            # Eq. 1: -(1 / C(K,2)) * sum log sigma(r_w - r_l)
```

**Marketing analogue.** This is the same estimation problem as paired-comparison or choice-based conjoint: respondents choose between product profiles, a logit model recovers part-worth utilities, and the fitted utility drives a downstream optimisation (product line, price). The RLHF-specific lessons transfer directly: (i) cluster the likelihood by respondent/task, (ii) measure rater agreement to know the ceiling, (iii) do not optimise far outside the design region of the choice experiment without a regulariser.

## Connections

- [[RLHF and Instruction Tuning]] — consumes $r_\theta$ as the reward in a KL-regularised PPO objective.
- [[Discrete Choice Models]] and [[Random Coefficients Logit Model]] — random-utility foundations; heterogeneous-preference extensions are the natural answer to "whose preferences?".
- [[Logit Purchase Decision Model]] — the same logistic choice rule used as a behavioural primitive inside an ABM.
- [[Generalized Linear Models]] — Bernoulli likelihood with logit link on a utility difference.
- [[Overfitting and Information Criteria]] — single-epoch training, correlated comparisons, and over-optimisation of a proxy.
- [[Decision Analysis]] — a reward model is an *elicited utility function*; the quality of downstream decisions is bounded by the quality of that elicitation.
- [[Interactive Knowledge Elicitation Method]] and [[LLM Expert Elicitation for Bayesian Networks]] — elicitation of structure rather than utility, with the same concerns about expert selection and disagreement.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]]
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — human preference win rates as the primary metric, and the RM as an automated proxy.
- [[Bernoulli Bandit and Thompson Sampling Algorithm]] — binary-feedback learning where the unknown is a success probability per arm rather than a utility function over text.
- [[Multiple Testing Corrections]] — relevant when many model variants are compared on the same preference data.
