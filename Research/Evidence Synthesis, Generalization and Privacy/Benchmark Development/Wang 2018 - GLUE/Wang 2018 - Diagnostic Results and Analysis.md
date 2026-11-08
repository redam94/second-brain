---
title: "Wang 2018 - Diagnostic Results and Analysis"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Sec. 7 Analysis, Table 5, Sec. 8 Conclusion, pp. 8-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - Diagnostic Dataset]]"
  - "[[Wang 2018 - Baselines and Benchmark Results]]"
used_by:
  - "[[Wang 2018 - GLUE - Overview]]"
aliases:
  - GLUE diagnostic results
  - GLUE Table 5
  - GLUE conclusion
---

# Wang 2018 - Diagnostic Results and Analysis

> [!summary]
> Each baseline's MNLI classifier is run on the diagnostic set (Table 5, $R_3\times100$). Absolute performance is poor (best overall 28 vs human 80). Models do best on Predicate-Argument Structure and worst on Logic; attention matters more than ELMo or CoVe for the diagnostic; models handle universal quantification and morphological negation through lexical cues but fail on double negation (without ELMo), restrictivity and downward monotonicity, where they apply the subsequence shortcut in the wrong direction.

## Overview

Applying the NLI classifier trained on MNLI (single-task) or the multi-task model's MNLI head to the diagnostic data gives a profile of linguistic strengths and weaknesses that the aggregate score hides.

## Main Content

### Table 5: diagnostic results ($R_3 \times 100$)

Coarse categories: Lexical Semantics (LS), Predicate-Argument Structure (PAS), Logic (L), Knowledge (K). Fine-grained examples: Universal Quantification (UQuant), Morphological Negation (MNeg), Double Negation (2Neg), Anaphora/Coreference (Coref), Restrictivity (Restr), Downward Monotone (Down).

| Model | All | LS | PAS | L | K | UQuant | MNeg | 2Neg | Coref | Restr | Down |
|---|---|---|---|---|---|---|---|---|---|---|---|
| *Single-task training* | | | | | | | | | | | |
| BiLSTM | 21 | 25 | 24 | 16 | 16 | 70 | 53 | 4 | 21 | -15 | 12 |
| +ELMo | 20 | 20 | 21 | 14 | 17 | 70 | 20 | 42 | 33 | -26 | -3 |
| +CoVe | 21 | 19 | 23 | 20 | 18 | 71 | 47 | -1 | 33 | -15 | 8 |
| +Attn | 25 | 24 | 30 | 20 | 14 | 50 | 47 | 21 | 38 | -8 | -3 |
| +Attn, ELMo | 28 | 30 | 35 | 23 | 14 | 85 | 20 | 42 | 33 | -26 | -3 |
| +Attn, CoVe | 24 | 29 | 29 | 18 | 12 | 77 | 50 | 1 | 18 | -1 | 12 |
| *Multi-task training* | | | | | | | | | | | |
| BiLSTM | 20 | 13 | 24 | 14 | 22 | 71 | 17 | -8 | 31 | -15 | 8 |
| +ELMo | 21 | 20 | 21 | 19 | 21 | 71 | 60 | 2 | 22 | 0 | 12 |
| +CoVe | 18 | 15 | 11 | 18 | 27 | 71 | 40 | 7 | 40 | 0 | 8 |
| +Attn | 18 | 13 | 24 | 11 | 16 | 71 | 1 | -12 | 31 | -15 | 8 |
| +Attn, ELMo | 22 | 18 | 26 | 13 | 19 | 70 | 27 | 5 | 31 | -26 | -3 |
| +Attn, CoVe | 18 | 16 | 25 | 16 | 13 | 71 | 26 | -8 | 33 | 9 | 8 |
| *Pre-trained sentence representation* | | | | | | | | | | | |
| CBoW | 9 | 6 | 13 | 5 | 10 | 3 | 0 | 13 | 28 | -15 | -11 |
| Skip-Thought | 12 | 2 | 23 | 11 | 9 | 61 | 6 | -2 | 30 | -15 | 0 |
| InferSent | 18 | 20 | 20 | 15 | 14 | 77 | 50 | -20 | 15 | -15 | -9 |
| DisSent | 16 | 16 | 19 | 13 | 15 | 70 | 43 | -11 | 20 | -36 | -9 |
| GenSen | 20 | 28 | 26 | 14 | 12 | 78 | 57 | 2 | 21 | -15 | 12 |

(Transcription note: the DisSent "Down" cell is printed "-09" in the source PDF and is read here as -9.)

### Findings (Sec. 7)

**Coarse categories.**
- Overall performance is low for every model; the highest total score, 28, "still denotes poor absolute performance".
- Performance tends to be higher on Predicate-Argument Structure and lower on Logic, though numbers are not closely comparable across categories.
- Unlike the main benchmark, multi-task models are almost always outperformed by their single-task counterparts on the diagnostic: likely "destructive interference between MNLI and the other tasks" under the simple multi-task regime.
- Models trained on GLUE tasks largely outperform pre-trained sentence-representation models, except GenSen.
- Attention has a larger influence on diagnostic scores than ELMo or CoVe, taken to indicate attention is especially important for generalization in NLI.

**Fine-grained.**
- *Universal quantification* is handled relatively well (scores around 70, best 85 for single-task +Attn,ELMo): lexical cues such as "all" often suffice. Morphological negation likewise has strong lexical cues.
- *Double negation* is especially hard for GLUE-trained models that use only GloVe; ELMo (42), and to some degree CoVe, ameliorates this.
- *Attention* has mixed effects and models with attention tend to struggle with **downward monotonicity**: they are sensitive to hypernym/hyponym substitution and word deletion as a signal of entailment, but predict it in the *wrong direction*, as if the changed word were in an upward-monotone context. This agrees with McCoy and Linzen (2019): systems use the subsequence relation between premise and hypothesis as a heuristic shortcut.
- *Restrictivity* examples, which often depend on quantifier scope nuances, are especially difficult for almost all models (negative scores of -15 to -36 for most).

**Interpretation.** Attention may help out-of-domain performance, and transfer methods like ELMo and CoVe encode linguistic information specific to their supervision signal; but increased representational capacity may lead to overfitting, as with attention models in downward-monotone contexts.

### Conclusion (Sec. 8)

GLUE is a platform and collection of resources for evaluating and analyzing NLU systems. Models trained jointly on its tasks outperform the combined performance of per-task models in aggregate. Attention and transfer methods such as ELMo combine to beat the best sentence-representation model but "still leave room for improvement". On the diagnostic set models "fail (often spectacularly) on many linguistic phenomena". "The question of how to design general-purpose NLU models remains unanswered, and we believe that GLUE can provide fertile soil for addressing this challenge."

## Examples

> [!example] Reading a negative $R_3$
> A diagnostic score of $-26$ on Restrictivity (single-task +ELMo) is *worse than chance* ($0$): the model is systematically anticorrelated with the gold labels. This pattern signals a confident wrong heuristic, not mere ignorance. Because chance-corrected correlation can be negative whereas accuracy cannot be below the worst class rate, MCC-style metrics expose this. Five of six single-task models score at or below $-8$ on Restrictivity. ^ex-negative-r3

```python
import numpy as np
# fraction of models with negative R3 on Restrictivity, from Table 5
restr = [-15,-26,-15,-8,-26,-1, -15,0,0,-15,-26,9, -15,-15,-15,-36,-15]
print(sum(r<0 for r in restr)/len(restr), np.median(restr))
```

## Connections

- The shortcut-learning finding (subsequence heuristic) motivates adversarial and contrast-set evaluations; see robustness and equivariance in [[Liang 2022 - The Seven Metrics]].
- Averages versus profiles: the main-task macro-average ([[Wang 2018 - Evaluation Protocol and Scoring]]) ranks multi-task above single-task, whereas the diagnostic profile reverses this ordering. A single score can mislead.
- Overfitting due to increased capacity relates to [[Researcher Degrees of Freedom]] and benchmark-level overfitting in [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].

**Relevance to marketing measurement.** The ranking reversal between aggregate and diagnostic is a cautionary example for MMM selection: a model that wins the average hold-out error may fail systematically on a specific regime (for example promotional weeks), and only a tagged diagnostic set reveals it.

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Diagnostic Dataset]]
- [[Wang 2018 - Baselines and Benchmark Results]]
