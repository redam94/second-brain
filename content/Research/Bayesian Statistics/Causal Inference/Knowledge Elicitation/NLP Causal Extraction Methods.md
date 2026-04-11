---
title: "NLP Causal Extraction Methods"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - topic/nlp
  - type/concept
  - doc/paper
source: "[[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]]"
source_location: "§3.1–3.2, pp. 441-444"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Causal Model - Cause Precondition Effect]]"
used_by:
  - "[[Interactive Knowledge Elicitation Method]]"
aliases:
  - Method A causal extraction
  - Method B causal extraction
---

# NLP Causal Extraction Methods

> [!summary]
> Two NLP methods extract causal relationships from Japanese free-text input. Method A uses clue expressions and dependency parsing (high precision, ~46% recall). Method B decomposes sentences into simple sub-sentences and treats ordering as causal direction (higher recall ~63%). Combined, they achieve 87% coverage on a 100-sentence test corpus.

## Overview

The system needs to automatically identify which part of a participant's free-text input is the **cause** and which is the **effect**. Two complementary methods are used, both relying on dependency analysis via **CaboCha** (Japanese NLP parser).

## Method A — Clue Expression Extraction

**Approach:** Searches for linguistic clue expressions that signal causality (e.g., "*No-de*" in Japanese, roughly equivalent to "because/as" in English). When a clue expression is found, dependency analysis determines sentence structure and identifies cause and effect phrases.

**Five sentence patterns recognized (from Sakaji et al.):**

| Pattern | Structure |
|---------|-----------|
| A | Cause phrase → Clue phrase → Effect phrase |
| B | Subject of result phrase → Cause phrase → Clue phrase → Predicate of result phrase |
| C | Result phrase → Cause phrase → Clue phrase |
| D | Sentence 1: Result phrase / Sentence 2: Cause phrase → Clue phrase |
| E | Sentence 1: Cause phrase / Sentence 2: Clue phrase → Result phrase |

**Limitation:** Many Japanese causal sentences do not use explicit clue expressions — this method cannot extract them.

## Method B — Sentence Decomposition

**Approach:** Divides compound sentences into simple sub-sentences. In Japanese, earlier sub-sentences tend to describe causes and later sub-sentences tend to describe effects.

**Algorithm (flowchart, Fig. 3 in paper):**
1. Run dependency analysis with CaboCha
2. For each predicate, check if it has a noun clause modifier (NC = noun clause)
3. If modifier is a noun clause → divide the sentence at that point
4. The first sub-sentence is assigned as "cause"; the following is assigned as "effect"
5. For 3+ sub-sentences: sentence 1 causes sentence 2, sentence 2 causes sentence 3 (chain)

**Trade-off:** Higher recall than Method A (extracts more causalities) but also higher false positive rate (extracts some non-causal sequences as causal).

## Combination Strategy

Both methods are applied independently. Their outputs are presented together to the participant in the GUI. The participant selects the correct causal pair (or enters one manually). The human confirmation step corrects false positives.

**Verification experiment results (Kyoto University Web Documentation Lead Corpus, 100 sentences):**

| Method | Correct identifications |
|--------|------------------------|
| Method A | 46 |
| Method B | 63 |
| Method A + B combined | 87 |

Both methods failed on the same 14 sentences, suggesting they have complementary strengths.

## Deduplication — Word2Vec Similarity

To prevent the same event being stored multiple times with different phrasing (e.g., "blackout occurs" vs. "electricity stops"), new sentences are compared to existing database entries using **Word2Vec** vector similarity.

**Procedure:**
1. Morphological analysis of sentence $s$ (using CaboCha)
2. Compute weighted average of morpheme vectors (weighting verb, adjective, noun morphemes)
3. Compare resulting vector $V$ against the database vector set $D_v$ using cosine distance
4. Sentences within a fixed distance threshold are flagged as potential duplicates and shown to the participant
5. If the participant confirms similarity → the existing entry is used; otherwise $s$ is added to $D$

**Key detail:** Only verb, adjective, and noun vectors are included (these carry the semantic content in Japanese); particles and other function words are excluded.

## Connections

- Provides the NLP backend for [[Interactive Knowledge Elicitation Method]]
- The human-in-the-loop confirmation in [[Interactive Knowledge Elicitation Method]] corrects false positives from Method B
- Compare to [[LLM Expert Elicitation for Bayesian Networks]] where LLMs replace rule-based NLP for causal structure extraction

## See Also

- [[Yamashita 2020 - Overview]] — paper context
- [[Interactive Knowledge Elicitation Method]] — how these methods are used in practice
