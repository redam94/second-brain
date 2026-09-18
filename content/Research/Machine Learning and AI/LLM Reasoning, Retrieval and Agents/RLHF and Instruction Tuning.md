---
title: RLHF and Instruction Tuning
tags:
  - source/ingested
  - topic/machine-learning
  - topic/llm
  - topic/rlhf
  - topic/reinforcement-learning
  - type/method
  - doc/paper
source: "[[raw/Ouyang 2022 - InstructGPT RLHF.pdf]]"
source_location: "Secs. 1, 3.1-3.5, 4.1-4.2, 5.1-5.3, pp. 1-20; Appendix C.3-C.4, E.7, pp. 42, 56"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Transformers and LLM Foundations - Overview]]"
  - "[[In-Context Learning and Few-Shot Prompting]]"
  - "[[Reward Modeling from Human Preferences]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
aliases:
  - RLHF
  - Reinforcement Learning from Human Feedback
  - InstructGPT
  - Instruction Tuning
  - Supervised Fine-Tuning (SFT)
  - PPO-ptx
---

# RLHF and Instruction Tuning

> [!summary]
> **InstructGPT** (Ouyang et al., NeurIPS 2022) turns a pre-trained GPT-3 into an instruction follower in three steps: (1) **supervised fine-tuning (SFT)** on about 13k labeler-written demonstrations; (2) training a **reward model (RM)** on about 33k prompts' worth of human rankings of model outputs; (3) **reinforcement learning with PPO** against the RM, with a per-token **KL penalty** to the SFT policy and, in the **PPO-ptx** variant, a pre-training log-likelihood term that removes most of the "alignment tax". Outputs of the 1.3B InstructGPT are preferred by labelers to those of the 175B GPT-3 — a 100$\times$ parameter gap — and the whole procedure costs under 2% of GPT-3's pre-training compute.

## Overview

The paper's starting point is an objective mismatch: "predicting the next token on a webpage from the internet — is different from the objective 'follow the user's instructions helpfully and safely'"; the language-modelling objective is therefore **misaligned** (Sec. 1). A base model can be coaxed into following instructions by [[In-Context Learning and Few-Shot Prompting|few-shot prompting]], but this is brittle. The alternative is to change the weights using human data. Following Askell et al., the target is a model that is **helpful, honest and harmless**.

Two ingredients should be distinguished. *Instruction tuning* in the narrow sense is step 1 alone — supervised learning on (instruction, demonstration) pairs; FLAN and T0 do this with public NLP datasets recast as instructions. *RLHF* adds steps 2–3, replacing "imitate the demonstration" with "maximise a learned model of what humans prefer". The paper's evidence is that each step helps: GPT-3 $<$ few-shot-prompted GPT-3 $<$ SFT $<$ PPO (Fig. 1).

## Main Content

> [!algorithm] The three-step RLHF pipeline (Sec. 3.1, Fig. 2) ^alg-rlhf
> **Step 1 — SFT.** Labelers write demonstrations of desired behaviour for prompts sampled from the API and labeler-written prompts (about 13k training prompts). Fine-tune GPT-3 by supervised learning. (16 epochs, cosine decay, residual dropout 0.2; validation loss overfits after 1 epoch, yet more epochs improve both RM score and human preference. The checkpoint is selected by RM score.)
> **Step 2 — Reward model.** For each of about 33k prompts, sample $K \in [4, 9]$ outputs and have a labeler rank them. Train a 6B model $r_\theta(x, y)$ to predict the preferred output — see [[Reward Modeling from Human Preferences]].
> **Step 3 — PPO.** Initialise the policy from SFT and the value function from the RM. On about 31k unlabeled API prompts, sample a response, score it with $r_\theta$, and update with PPO (Schulman et al. 2017).
> Steps 2 and 3 can be iterated: collect comparisons on the current best policy, retrain the RM, retrain the policy.

> [!definition] The RL environment is a contextual bandit ^def-bandit-env
> "The environment is a bandit environment which presents a random customer prompt and expects a response to the prompt. Given the prompt and response, it produces a reward determined by the reward model and ends the episode" (Sec. 3.5). The prompt $x$ is the context, the whole response $y$ is the arm, $r_\theta(x, y)$ is the reward; there is no state transition across episodes. Compare [[Contextual and Linear Bandits]] — but here the action space is all token sequences, and the policy is optimised by policy gradient rather than by posterior sampling or UCB.

> [!definition] The PPO-ptx objective (Eq. 2) ^def-objective
> $$
> \text{objective}(\phi) = \mathbb E_{(x,y) \sim D_{\pi_\phi^{\mathrm{RL}}}}\!\left[ r_\theta(x, y) - \beta \log \frac{\pi_\phi^{\mathrm{RL}}(y \mid x)}{\pi^{\mathrm{SFT}}(y \mid x)} \right] + \gamma\, \mathbb E_{x \sim D_{\text{pretrain}}}\!\left[ \log \pi_\phi^{\mathrm{RL}}(x) \right]
> $$
> - $\pi_\phi^{\mathrm{RL}}$: the learned policy; $\pi^{\mathrm{SFT}}$: the frozen supervised model.
> - $\beta$: **KL reward coefficient**. The penalty is applied per token "to mitigate over-optimization of the reward model". $\beta = 0.02$; the optimum is around 0.01–0.02 and both 0 and 2 perform poorly (Appendix C.4, E.7).
> - $\gamma$: **pre-training loss coefficient**. "PPO" models set $\gamma = 0$; "PPO-ptx" uses $\gamma = 27.8$ with 8$\times$ more pre-training examples than RL episodes. Unless stated otherwise, "InstructGPT" means PPO-ptx.
>
> Training: 256k episodes, batch 512 in 8 minibatches, one inner epoch, PPO clip ratio 0.2, no discounting, rollout temperature 1.

The expectation of the KL term is $\beta\,\mathrm{KL}\big(\pi_\phi^{\mathrm{RL}}(\cdot \mid x)\,\|\,\pi^{\mathrm{SFT}}(\cdot \mid x)\big)$, so the first bracket is a **KL-regularised reward maximisation**. Its population optimum has the familiar Gibbs form $\pi^{\star}(y\mid x) \propto \pi^{\mathrm{SFT}}(y \mid x)\exp\{r_\theta(x,y)/\beta\}$ — the SFT policy acts as a prior that is exponentially tilted by reward, which is why a learned, imperfect reward cannot drag the policy arbitrarily far. (This closed form is a standard consequence of the objective, not a statement made in the paper.)

> [!theorem] Empirical findings (Secs. 1, 4.1–4.2) ^thm-results
> - **Preference.** 175B InstructGPT outputs are preferred to 175B GPT-3 outputs $85 \pm 3\%$ of the time and to few-shot-prompted GPT-3 $71 \pm 4\%$ of the time. The 1.3B PPO-ptx model is preferred to the 175B GPT-3.
> - **Generalisation to held-out labelers.** Labelers who produced no training data prefer InstructGPT at about the same rate as training labelers.
> - **Truthfulness.** On TruthfulQA, InstructGPT gives truthful-and-informative answers about twice as often as GPT-3; on closed-domain API tasks the hallucination rate falls from 41% to 21%.
> - **Toxicity and bias.** About 25% fewer toxic outputs than GPT-3 *when prompted to be respectful*; no advantage without that prompt, and **more** toxic than GPT-3 when explicitly asked to be toxic. No significant improvement on Winogender or CrowS-Pairs.
> - **vs instruction tuning on public data.** 175B InstructGPT is preferred over the same model fine-tuned on FLAN $78 \pm 4\%$ and on T0 $79 \pm 4\%$ of the time. Reason given: classification and QA are only about 18% of real API use, whereas open-ended generation and brainstorming are about 57%.

> [!definition] Alignment tax and its mitigation ^def-alignment-tax
> Plain PPO causes regressions on public NLP benchmarks (SQuADv2, DROP, HellaSwag, WMT 2015 Fr$\to$En) — "an example of an 'alignment tax' since our alignment procedure comes at the cost of lower performance on certain tasks". Mixing in pre-training gradients (PPO-ptx) removes most of it and even surpasses GPT-3 on HellaSwag; simply increasing $\beta$ does **not** work — even at $\beta = 2.0$ (100$\times$ default) the regressions on DROP and SQuAD never fully recover while validation reward falls sharply (Sec. 4.2, Figs. 33–34).

**Cost (Sec. 5.1).** 175B SFT requires 4.9 petaflop/s-days and 175B PPO-ptx 60, against 3,640 for GPT-3 pre-training. The authors' conclusion: RLHF is "more so than a 100x model size increase" effective at making models helpful, so "increasing investments in alignment of existing language models is more cost-effective than training larger models" for this task distribution.

**Who is being aligned to? (Secs. 3.4, 5.2–5.3).** About 40 contractors (Upwork, ScaleAI) selected by a screening test; the data is over 96% English. Training labels prioritise helpfulness; final evaluation prioritises truthfulness and harmlessness. The procedure "aligns the behavior of GPT-3 to the stated preferences of a specific group of people (mostly our labelers and researchers), rather than any broader notion of 'human values'". Residual failures: following instructions with false premises, over-hedging, making up facts, and complying with harmful instructions.

## Examples

Figure 8 of the paper shows the behavioural change. Prompt: a Python function `binomial_coefficient(n, r)` followed by "What is the purpose of the list C in the code below?"

- **GPT-3 175B** continues the *document*: it emits multiple-choice options "A. to store the value of C[0]  B. to store the value of C[1] ..." — a plausible web-page continuation, not an answer.
- **InstructGPT 175B** answers the *question*: "The list C in this code is used to store the values of the binomial coefficient as the function iterates through the values of n and r ..." (the paper notes the answer "isn't quite correct" — alignment to intent is not correctness).

A schematic PPO-ptx step mirroring [[#^def-objective]]:

```python
def ppo_ptx_step(policy, sft_ref, reward_model, prompts, pretrain_batch, beta=0.02, gamma=27.8):
    y, logp_tokens = policy.sample(prompts, temperature=1.0)          # rollouts
    with no_grad():
        ref_logp_tokens = sft_ref.logprob(prompts, y)
        r_final = reward_model(prompts, y)                            # scalar per episode
    rewards = -beta * (logp_tokens - ref_logp_tokens)                 # per-token KL penalty
    rewards[:, -1] += r_final                                         # RM reward at episode end
    loss_rl = ppo_clip_loss(policy, prompts, y, rewards, clip=0.2)    # value fn initialised from RM
    loss_ptx = -gamma * policy.logprob(pretrain_batch).mean()         # keep pre-training abilities
    (loss_rl + loss_ptx).backward()
```

## Connections

- [[Reward Modeling from Human Preferences]] — step 2 in detail: the pairwise logistic loss, $\binom K2$ batching, labeler agreement and RM generalisation.
- [[Contextual and Linear Bandits]], [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the RL "environment" is a one-step contextual bandit; RLHF differs in using a learned reward and on-policy gradient updates instead of explicit exploration bonuses or posterior sampling.
- [[Q-learning]] and [[Optimal Regime via Dynamic Programming]] — value-based sequential decision methods; PPO is policy-gradient, and with single-step episodes no backward induction is needed.
- [[Overfitting and Information Criteria]] — reward over-optimisation is overfitting to a proxy objective; the KL term is the regulariser.
- [[In-Context Learning and Few-Shot Prompting]] — the "GPT-3 (prompted)" baseline; RLHF internalises what the few-shot prefix was doing.
- [[ReAct - Reasoning and Acting Agents]] — instruction-tuned `text-davinci-002` outperforms PaLM-540B under ReAct prompting; ReAct's authors name RL as the route to stronger agents.
- [[Fine-tuning on Conditional Statements]] — another small, targeted fine-tune (about 4,000 instances) that shifts a specific capability.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]]
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — win rates, Likert scores, TruthfulQA, RealToxicityPrompts.
- [[Decision Analysis]] — choosing a utility function; RLHF *estimates* one from revealed labeler choices.
- [[Transformers and LLM Foundations - Overview]] — the pre-trained base model that all three steps start from.
