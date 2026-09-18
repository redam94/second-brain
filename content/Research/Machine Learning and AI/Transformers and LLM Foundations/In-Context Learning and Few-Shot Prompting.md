---
title: In-Context Learning and Few-Shot Prompting
tags:
  - source/ingested
  - topic/machine-learning
  - topic/large-language-models
  - topic/in-context-learning
  - topic/prompting
  - type/concept
  - doc/paper
source: "[[raw/Brown 2020 - Language Models are Few-Shot Learners.pdf]]"
source_location: "Sec. 1 (Figs. 1.1-1.3, footnote 1), pp. 3-6; Sec. 2 (Fig. 2.1) and Sec. 2.4, pp. 6-10; Sec. 3.1.2, 3.2, 3.7-3.9 (Tables 3.2, 3.3, 3.8, 3.9); Sec. 4; Sec. 5 Limitations, pp. 33-34"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Transformers and LLM Foundations"
doc_type: paper
depends_on:
  - "[[Autoregressive Language Modeling and Pretraining]]"
  - "[[Scaled Dot-Product and Multi-Head Attention]]"
  - "[[Neural Scaling Laws]]"
used_by:
  - "[[Transformers and LLM Foundations - Overview]]"
aliases:
  - In-Context Learning
  - Few-Shot Prompting
  - Few-Shot Learning with Language Models
  - Zero-Shot and One-Shot Prompting
  - GPT-3
  - Language Models are Few-Shot Learners
---

# In-Context Learning and Few-Shot Prompting

> [!summary]
> **In-context learning (ICL)** uses "the text input of a pretrained language model as a form of task specification": the model is conditioned on an instruction and/or a few input-output demonstrations and completes a new instance "simply by predicting what comes next", with **no gradient updates**. Brown et al. (2020) train GPT-3, a 175B-parameter [[Autoregressive Language Modeling and Pretraining|autoregressive Transformer]], and evaluate it on over two dozen datasets in **zero-shot**, **one-shot** and **few-shot** ($K \approx 10$-$100$ demonstrations) settings. Few-shot GPT-3 is sometimes competitive with fine-tuned state of the art (TriviaQA 71.2%, LAMBADA 86.4%), and the benefit of demonstrations *grows with model size*: "larger models are more proficient at in-context learning." Clear failures remain on sentence-comparison tasks (WiC at chance, ANLI), and whether ICL learns tasks "from scratch" or recognizes tasks seen in pretraining is left open.

## Overview

The pretrain-then-fine-tune paradigm needs "thousands to hundreds of thousands" of labelled examples per task. The paper names three problems with this (Sec. 1): collecting such data for every task is impractical; large models fine-tuned on narrow distributions can exploit spurious correlations and generalize poorly out of distribution; and humans need only "a brief directive in natural language" or "a tiny number of demonstrations".

The proposed alternative is framed as **meta-learning** (Fig. 1.1). The *outer loop* is ordinary pretraining by gradient descent, during which the model "develops a broad set of skills and pattern recognition abilities". The *inner loop*, in-context learning, "occurs within the forward-pass upon each sequence". The hypothesis, motivated by [[Neural Scaling Laws]], is that since ICL "involves absorbing many skills and tasks within the parameters of the model, it is plausible that in-context learning abilities might show similarly strong gains with scale."

## Main Content

> [!definition] The four settings ^def-settings
> (Sec. 2, Fig. 2.1.)
> - **Fine-tuning (FT).** Update the weights on a supervised task dataset. Strong benchmark performance; needs a new large dataset per task, with risk of poor out-of-distribution generalization. Not used for GPT-3 in this paper.
> - **Few-shot (FS).** Give $K$ demonstrations (context and completion) plus one final context; "no weight updates are allowed." $K$ is typically 10 to 100, bounded by the context window $n_{\text{ctx}} = 2048$.
> - **One-shot (1S).** $K = 1$ plus a natural-language task description; this "most closely matches the way in which some tasks are communicated to humans."
> - **Zero-shot (0S).** Task description only. Most convenient and most robust to spurious correlations, but sometimes "unfairly hard" because the format of the task may be ambiguous without an example.

Footnote 1 of the paper is careful about terminology. "Zero-shot" refers to zero gradient updates, and the terms "remain agnostic on the question of whether the model learns new tasks from scratch at inference time or simply recognizes patterns seen during training."

> [!algorithm] Few-shot evaluation protocol ^alg-protocol
> (Sec. 2.4.)
> 1. For each test example, draw $K$ demonstrations at random from the task's **training set** (from the development set for LAMBADA and StoryCloze, which have no training set), delimited by 1 or 2 newlines.
> 2. Choose $K$ on the development set when one exists: "Larger values of $K$ are usually but not always better."
> 3. **Multiple choice.** Compare the language-model likelihood of each candidate completion, normalized per token. On ARC, OpenBookQA and RACE, instead score
>
> $$
> \frac{P(\text{completion} \mid \text{context})}{P(\text{completion} \mid \text{answer context})},
> $$
>
> where the answer context is a generic string such as "Answer: ", which corrects for the unconditional probability of the completion.
> 4. **Binary classification.** Give the classes meaningful names ("True"/"False") and treat the task as multiple choice.
> 5. **Free-form completion.** Beam search with width 4 and length penalty $\alpha = 0.6$; score by F1, BLEU or exact match.

> [!theorem] Empirical findings on in-context learning ^thm-icl-findings
> These are empirical results, not theorems.
> 1. **ICL improves with scale faster than zero-shot does.** Across 42 accuracy benchmarks, "while zero-shot performance improves steadily with model size, few-shot performance increases more rapidly" (Fig. 1.3). "The gap between zero-, one-, and few-shot performance often grows with model capacity, perhaps suggesting that larger models are more proficient meta-learners."
> 2. **In-context learning curves.** On a symbol-removal task, accuracy rises with the number of examples $K$ and with a task description, and the curves are steeper for larger models (Fig. 1.2).
> 3. **Demonstrations specify format as well as content.** On LAMBADA, a fill-in-the-blank framing lets the model "infer from examples that a completion of exactly one word is desired": zero-shot 76.2%, few-shot 86.4% (previous state of the art 68.0%). The same framing *hurts* the smallest model by almost 20%, and one-shot is worse than zero-shot, "perhaps ... because all models still require several examples to recognize the pattern."
> 4. **Loss keeps following the power law.** Validation loss follows the [[Neural Scaling Laws|Kaplan et al.]] compute trend for two further orders of magnitude "with only small deviations" (Fig. 3.1), and these loss gains "lead to consistent performance gains across a broad spectrum of natural language tasks."

### Selected results for GPT-3 175B

| Task | Zero-shot | One-shot | Few-shot | Reference |
|---|---|---|---|---|
| LAMBADA (accuracy) | 76.2 | 72.5 | 86.4 | previous SOTA 68.0 |
| TriviaQA (closed-book) | 64.3 | 68.0 | 71.2 | fine-tuned open-domain RAG 68.0 |
| Natural Questions | 14.6 | 23.0 | 29.9 | fine-tuned T5-11B+SSM 36.6 |
| CoQA (F1) | 81.5 | 84.0 | 85.0 | a few points below fine-tuned SOTA |
| 2-digit addition | 76.9 | 99.6 | 100.0 | 13B model: about half correct |
| 3-digit addition | 34.2 | 65.5 | 80.4 | |
| 5-digit addition | 0.7 | 3.5 | 9.3 | |
| 2-digit multiplication | 19.8 | 27.4 | 29.2 | |
| SuperGLUE average ($K = 32$) | | | 71.8 | fine-tuned BERT-Large 69.0; SOTA 89.0 |
| WiC | | | 49.4 | chance is 50 |

(Tables 3.2, 3.3, 3.8, 3.9; Sec. 1.) Arithmetic shows an abrupt size dependence, "a significant jump from the second largest model (GPT-3 13B) to the largest model", and a memorization spot-check found only 17 of 2,000 three-digit addition problems (0.8%) in the training data, with errors such as failing to carry a 1 suggesting actual computation. On SuperGLUE, GPT-3 "requires less than eight total examples per task to outperform a fine-tuned BERT-Large".

### Limitations (Sec. 5)

- **Comparison tasks.** GPT-3 "does little better than chance when evaluated one-shot or even few-shot" on WiC and ANLI, and lags on some reading comprehension (RACE, QuAC). The authors suspect the lack of bidirectional context in an autoregressive model.
- **What is being learned?** It is ambiguous "whether few-shot learning actually learns new tasks 'from scratch' at inference time, or if it simply recognizes and identifies tasks that it has learned during training." The possibilities lie on a spectrum and vary by task: translation "clearly must be learned during pretraining", while word-scrambling and nonsense-word tasks "seem especially likely to be learned de novo".
- **Calibration and interpretability.** Decisions "are not easily interpretable", the model "is not necessarily well-calibrated in its predictions on novel inputs", and it "retains the biases of the data it has been trained on."
- **Contamination.** Benchmarks may appear in web training data; Sec. 4 measures overlap and flags affected results. A filtering bug left some overlaps in place.
- **Cost.** Inference at 175B scale is "expensive and inconvenient"; distillation is suggested. [[Compute-Optimal Training (Chinchilla)]] later showed that a 70B model trained on more tokens beats GPT-3 by a wide margin (MMLU 5-shot 67.6% compared with 43.9%).

### A statistical reading (interpretive, not from the paper)

Let $\tau$ index a latent task. Pretraining on documents that each reflect some task fits a marginal predictive $p(y \mid x, \mathcal D_K) = \int p(y \mid x, \tau)\, p(\tau \mid \mathcal D_K)\, d\tau$, where $\mathcal D_K$ is the set of $K$ demonstrations in the prompt. On this reading:

- ICL is approximate **posterior predictive** inference over tasks, with pretraining supplying the prior. The spectrum from "recognizing" to "learning" a task corresponds to a prior that is concentrated or diffuse around the demonstrated task.
- It mirrors **partial pooling** in [[Hierarchical Models]]: a population distribution learned from many groups, then sharpened for a new group by a few observations. More demonstrations shrink the prediction towards the task-specific answer.
- It is a form of **amortized inference**: one network, trained once, maps any small dataset to predictions in a single forward pass, as in [[Simulation-Based and Amortized Inference]]. The cost of adapting is moved from inference time to training time.
- Mechanically, all of this must be implemented by [[Scaled Dot-Product and Multi-Head Attention|attention]] from the query position back to the demonstrations. No other route exists for information to flow between positions.

The caveat from the paper stands: nothing guarantees that the implied "posterior" is calibrated.

## Examples

**Prompt formats used in the paper.**

```text
# Few-shot cloze framing for LAMBADA (Sec. 3.1.2)
Alice was friends with Bob. Alice went to visit her friend ____. -> Bob
George bought some baseball equipment, a ball, a glove, and a ____. ->

# Arithmetic (Sec. 3.9.1)
Q: What is 48 plus 76? A: 124
Q: What is 34 minus 53? A: -19
Q: What is 24 times 42? A:

# Grammar correction (Sec. 3.9.6)
Poor English input: I eated the purple berries.
Good English output: I ate the purple berries.
Poor English input: The mentioned changes have done.
Good English output:
```

**Few-shot classification by likelihood comparison.**

```python
def few_shot_classify(lm, demos, x, labels, K=32, template="{x}\nAnswer: {y}"):
    shots = random.sample(demos, K)                       # drawn from the training split
    prefix = "\n\n".join(template.format(x=d.x, y=d.y) for d in shots)
    context = prefix + "\n\n" + template.format(x=x, y="").rstrip()
    def score(y):                                         # per-token log-likelihood
        toks = lm.tokenize(" " + y)
        return lm.logprob(toks, given=context) / len(toks)
    return max(labels, key=score)
```

Practical implications for applied work: results depend on $K$, on which demonstrations are drawn and on label wording, so an ICL-based pipeline should be evaluated like any estimator, with held-out data, repeated draws of demonstrations and explicit calibration checks. The vault's [[Code vs Text Prompt Evaluation]] and [[Code Prompt Aspects Analysis]] notes report exactly this kind of prompt-format sensitivity for causal reasoning tasks.

## Connections

- [[Autoregressive Language Modeling and Pretraining]]: ICL is conditioning of the pretrained next-token distribution, with no new objective and no parameter change.
- [[Scaled Dot-Product and Multi-Head Attention]]: the mechanism through which demonstrations affect the prediction.
- [[Neural Scaling Laws]]: GPT-3 was sized by these laws; the paper extends the loss-compute trend and shows downstream and ICL gains track it.
- [[Compute-Optimal Training (Chinchilla)]]: shows GPT-3's 300B-token budget was far from compute-optimal.
- [[LLM Expert Elicitation for Bayesian Networks]] and [[LLM-BN Decision Support Application]]: zero- and few-shot prompting of LLMs for causal structure, a direct application of ICL.
- [[LLM Causal Reasoning Tasks]] and [[Code Prompts for Causal Structure]]: zero-shot generation tasks where prompt format (code compared with text) changes performance.
- [[Hierarchical Models]]: partial pooling as the Bayesian analogue of adapting from few examples given a learned population distribution.
- [[Simulation-Based and Amortized Inference]]: training-time amortization of inference-time adaptation.

## See Also

- [[Transformers and LLM Foundations - Overview]]
- [[Transformer Architecture and Positional Encoding]]
- [[Fine-tuning on Conditional Statements]]: the fine-tuning alternative to ICL, applied to causal reasoning.
- [[Code vs Text Prompt Evaluation]] and [[Code Prompt Aspects Analysis]]
- [[Posterior Predictive Checking]]: checking a predictive distribution against held-out data, the discipline that ICL outputs also require.
- [[Chain-of-Thought Prompting]] — chain-of-thought extends few-shot prompting
