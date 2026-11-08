---
title: "Wang 2018 - Diagnostic Dataset"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Sec. 4 (Tables 2-3), Appendix E (Table 7, E.1-E.4), pp. 4-6, 14-20"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - GLUE - Overview]]"
  - "[[Wang 2018 - Task Suite and Selection Criteria]]"
used_by:
  - "[[Wang 2018 - Diagnostic Results and Analysis]]"
  - "[[Wang 2018 - Appendices and Implementation Details]]"
aliases:
  - GLUE diagnostic set
  - GLUE linguistic phenomena taxonomy
---

# Wang 2018 - Diagnostic Dataset

> [!summary]
> GLUE's diagnostic dataset is a small, manually curated NLI test (1,100 labeled examples from 550 sentence pairs, each labeled in both directions) tagged with linguistic phenomena under four coarse categories: Lexical Semantics, Predicate-Argument Structure, Logic, and Knowledge. It is deliberately *an analysis tool, not a benchmark*: scores are comparable across models within a category, not across categories. It was audited for annotation artifacts with hypothesis-only classifiers and given a human baseline (Fleiss kappa 0.73, mean $R_3$ 0.80).

## Overview

The main nine tasks follow an application-driven distribution of examples. The diagnostic set instead targets a pre-defined list of phenomena. It is inspired by the FraCaS suite (Cooper et al. 1996) and the Build-It-Break-It competition (Ettinger et al. 2017). NLI is chosen because it can test the full range of (ungrounded) sentence understanding, from syntactic ambiguity to pragmatic reasoning with world knowledge. Unlike FraCaS, which uses a minimal and uniform example set to test linguistic theories, the GLUE diagnostic uses naturally occurring sentences from several domains (news, Reddit, Wikipedia, academic papers).

## Main Content

### Taxonomy (Table 2)

| Coarse category | Fine-grained categories |
|---|---|
| Lexical Semantics | Lexical Entailment, Morphological Negation, Factivity, Symmetry/Collectivity, Redundancy, Named Entities, Quantifiers |
| Predicate-Argument Structure | Core Arguments, Prepositional Phrases, Ellipsis/Implicits, Anaphora/Coreference, Active/Passive, Nominalization, Genitives/Partitives, Datives, Relative Clauses, Coordination Scope, Intersectivity, Restrictivity |
| Logic | Negation, Double Negation, Intervals/Numbers, Conjunction, Disjunction, Conditionals, Universal, Existential, Temporal, Upward Monotone, Downward Monotone, Non-Monotone |
| Knowledge | Common Sense, World Knowledge |

The categories "are not based on any particular linguistic theory" but on issues linguists have often modeled. A single example can carry several tags (so category counts overlap).

### Annotation process

1. Begin with target phenomena (roughly those of FraCaS).
2. Find a sentence that can easily be made to demonstrate the phenomenon; edit it in two ways to produce a sentence pair, with **minimal modifications** to keep high lexical and structural overlap and limit superficial cues.
3. Label the inference relationship considering each sentence alternately as premise, **yielding two labeled examples per pair (1,100 total)**.
4. Where possible, produce several pairs with different labels from one source sentence, giving *minimal sets* that are lexically and structurally similar but differ in entailment.
5. Resulting label distribution: **42% entailment, 35% neutral, 23% contradiction**.

> [!definition] Diagnostic example
> A diagnostic example is a tuple (sentence 1, sentence 2, forward label, backward label, phenomenon tags) where forward (Fwd) is the NLI label with sentence 1 as premise and backward (Bwd) with sentence 2 as premise; labels in {entailment (E), neutral (N), contradiction (C)}. ^def-diagnostic-example

### Table 3 examples

| Tags | Sentence 1 | Sentence 2 | Fwd | Bwd |
|---|---|---|---|---|
| Lexical Entailment (LS), Downward Monotone (Logic) | The timing of the meeting has not been set, according to a Starbucks spokesperson. | The timing of the meeting has not been considered, according to a Starbucks spokesperson. | N | E |
| Universal (Logic), Quantifiers (LS) | Our deepest sympathies are with all those affected by this accident. | Our deepest sympathies are with a victim who was affected by this accident. | E | N |
| Quantifiers (LS), Double Negation (Logic) | I have never seen a hummingbird not flying. | I have never seen a hummingbird. | N | E |

### Evaluation: $R_3$

Because the class distribution is unbalanced, evaluation uses **$R_3$** (Gorodkin 2004), the $K$-category generalization of the Matthews correlation coefficient. For $K$ classes with confusion matrix $C$ (rows gold, columns predicted),
$$
R_K=\frac{c\,s-\sum_k p_k t_k}{\sqrt{\big(s^2-\sum_k p_k^2\big)\big(s^2-\sum_k t_k^2\big)}},
$$
where $c=\sum_k C_{kk}$ is the number of correct predictions, $s=\sum_{k,l}C_{kl}$ the total, $p_k$ the number of times class $k$ was predicted and $t_k$ the number of times it truly occurred. For $K=2$ it reduces to MCC. (The formula is Gorodkin's; the paper cites it without writing it out.)

> [!definition] Artifact audit
> Following Gururangan et al. (2018), two fastText classifiers trained on SNLI and on MNLI to predict the entailment label from the *hypothesis only* are evaluated on the diagnostic set. Near-chance accuracy (32.7% and 36.4%) shows the diagnostic set does not contain exploitable hypothesis-only cues. ^def-artifact-audit

### Human baseline

Six NLP researchers annotated 50 randomly sampled sentence pairs (100 entailment examples). Inter-annotator agreement is high: **Fleiss' kappa $=0.73$**; the average $R_3$ across annotators is **0.80**, much higher than any baseline (best 0.28).

### Intended use

"The diagnostic examples are hand-picked to address certain phenomena, and NLI is a task with no natural input distribution, so we do not expect performance on the diagnostic set to reflect overall performance or generalization in downstream applications. Performance on the analysis set should be compared between models but not between categories." Intended for error analysis, qualitative model comparison and development of adversarial examples.

### Appendix E: category definitions with examples

**Lexical Semantics.** *Lexical Entailment*: word-level entailment ("dog" entails "animal", contradicts "cat"). *Morphological Negation*: derived opposites ("affordable"/"unaffordable"; "ever"/"never"), also tagged Negation or Double Negation. *Factivity*: "I recognize that X" entails X (also under negation) while "I believe that X" does not; implicatives such as "I am refusing to do X" contradict "I am doing X"; intensional readings of existence ("I have found a unicorn" vs "I am looking for a unicorn"). *Symmetry/Collectivity*: "John married Gary" entails "Gary married John" but "John likes Gary" does not entail the converse; "John met Gary" entails "John and Gary met". *Redundancy*: a word removable without changing meaning. *Named Entities*: compositional structure and referents ("Baltimore Police" = "Police of the City of Baltimore"; "SNL" = "Saturday Night Live"). *Quantifiers*: interchangeability of "most", "many", etc.

**Predicate-Argument Structure.** Helps resolve syntactic ambiguity: *Relative Clauses* and *Coordination Scope* are ambiguity sources; *Prepositional Phrases* (attachment, semantic roles); *Core Arguments* (ergative alternation: "Jake broke the vase" entails "the vase broke" but not "Jake broke"); *Alternations*: Active/Passive ("I saw him" entails "He was seen"), Genitives/Partitives ("the elephant's foot" = "the foot of the elephant"), Nominalization ("I caused him to submit his resignation" entails "I caused the submission of his resignation"), Datives ("I baked him a cake" entails "I baked a cake for him" and "I baked a cake" but not "I baked him"); *Ellipsis/Implicits* (filling an elided argument correctly or incorrectly); *Anaphora/Coreference* (explicit co-referent phrases, e.g. "Theresa May" and "the British Prime Minister"); *Intersectivity* ("He is a violinist and an old surgeon" entails "He is an old violinist"; "skilled surgeon" or "fake surgeon" are non-intersective); *Restrictivity* ("I finished all of my homework due today" does not entail "I finished all of my homework"; non-restrictive "pesky bedbugs" does entail "bedbugs").

**Logic.** *Propositional Structure*: Negation ("The cat sat on the mat" contradicts "The cat did not sit on the mat"); Double Negation ("The market is not impossible to navigate" entails "The market is possible to navigate"); Conjunction; Disjunction; Conditionals (language use does not always mirror logic). *Quantification*: Universal ("All parakeets have two wings" entails, but is not entailed by, "My parakeet has two wings"); Existential. *Monotonicity*: Upward, Downward and Non-Monotone argument positions; with restrictor "pet squirrel": "a" is upward monotone, "no" downward monotone, "exactly one" non-monotone. *Richer Logical Structure*: Intervals/Numbers ("more than 2 drinks" entails "more than 1 drink"); Temporal ("Mary left before John entered" entails "John entered after Mary left").

**Knowledge.** *World Knowledge* (facts; e.g. "There are amazing hikes around Mt. Fuji" entails "...in Japan" but not "...in Nepal") and *Common Sense* (physical and social dynamics, lexical meaning).

### Table 7: coarse-category statistics

| Category | Count | % Neutral | % Contradiction | % Entailment |
|---|---|---|---|---|
| Lexical Semantics | 368 | 31.0 | 27.2 | 41.8 |
| Predicate-Argument Structure | 424 | 37.0 | 13.7 | 49.3 |
| Logic | 364 | 37.6 | 26.9 | 35.4 |
| Knowledge | 284 | 26.4 | 31.7 | 41.9 |

Counts sum to 1,440, more than 1,100, because examples can carry tags from multiple categories.

## Examples

> [!example] Monotonicity as a diagnostic of shortcut learning
> Consider "I have no pet squirrels" vs "I have no happy pet squirrels". "No" is downward monotone in its restrictor, so the entailment runs from the *more general* to the *more specific* restrictor: "no pets" entails "no pet squirrels" entails "no happy pet squirrels". A model using the shortcut "hypothesis is a subsequence/hyponym of the premise implies entailment" gets the direction wrong in downward-monotone contexts. Section 7 reports exactly this failure pattern ([[Wang 2018 - Diagnostic Results and Analysis]]). ^ex-monotonicity

```python
import numpy as np

def r_k(conf):
    """Gorodkin's R_K from a KxK confusion matrix (rows gold, cols predicted)."""
    C = np.asarray(conf, float)
    s = C.sum(); c = np.trace(C)
    t = C.sum(axis=1); p = C.sum(axis=0)
    num = c*s - (p*t).sum()
    den = np.sqrt((s**2 - (p**2).sum())*(s**2 - (t**2).sum()))
    return num/den if den else 0.0

print(r_k([[40,5,5],[10,25,0],[2,3,10]]))
print(r_k([[50,0],[0,50]]), r_k([[25,25],[25,25]]))   # 1.0 and 0.0 for perfect and chance
```

## Connections

- The minimal-set design echoes counterfactual perturbations (invariance and equivariance) used in [[Liang 2022 - The Seven Metrics]] for robustness and fairness.
- The "tool, not benchmark" stance is a guard against turning the diagnostic into another optimization target (Goodhart; see [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]).
- Hypothesis-only audit: a general technique for testing whether a test set can be passed without the intended skill.

**Relevance to marketing measurement.** A diagnostic suite with *tagged phenomena* is the right shape for validating an MMM or lift estimator: construct semi-synthetic cases that isolate one threat each (carryover, saturation, confounded promotion timing, interference) and report per-threat performance rather than one aggregate. Compare per-phenomenon, not across phenomena, exactly as the authors advise.

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Diagnostic Results and Analysis]]
