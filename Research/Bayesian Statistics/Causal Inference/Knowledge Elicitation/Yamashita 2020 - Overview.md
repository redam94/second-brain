---
title: "Yamashita 2020 - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - type/overview
  - doc/paper
source: "[[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]]"
source_location: "pp. 437-446"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on: []
used_by:
  - "[[Causal Model - Cause Precondition Effect]]"
  - "[[Interactive Knowledge Elicitation Method]]"
  - "[[NLP Causal Extraction Methods]]"
aliases:
  - Yamashita 2020
---

# Yamashita 2020 - Overview

> [!summary]
> Yamashita, Kanno & Furuta (2020) propose an interactive workshop method for eliciting local causal knowledge from non-experts to build large causal networks for disaster scenario creation. The system combines a three-element causal model (cause, precondition, effect) with a GUI-based workshop procedure and NLP extraction to automate construction of a causal knowledge database.

## Research Question and Contribution

**Problem:** Creating effective disaster drill scenarios requires predicting causal chains of damage events — but non-experts struggle to do this manually, and purely automated NLP approaches lack accuracy and local specificity.

**Contribution:**
1. A simplified causal model (cause + precondition + effect) that is more practical than FRAM yet more expressive than simple cause-effect
2. An interactive GUI-based method for workshops that elicits causal knowledge through structured questioning
3. NLP techniques (Method A + B) for automatically extracting causal elements from free-text input
4. Word2Vec-based deduplication to handle paraphrase variation across participants

**Published:** HCII 2020, LNCS 12217, pp. 437–446. DOI: 10.1007/978-3-030-50334-5_30

## Paper Structure

| Section | Content |
|---------|---------|
| §1 Introduction | Problem motivation, two approaches to knowledge elicitation |
| §2 Causal Model | Cause-precondition-effect model; comparison to FRAM |
| §3 Method | GUI design, NLP extraction (Method A + B), duplication prevention |
| §4 Preliminary Experiment | Earthquake workshop with 2 participants; 20 events, 15 preconditions elicited |
| §5 Conclusion | Performance validation; limitations (no 3+ step chain support) |

## Key Results

- NLP verification on 100 sentences: Method A identified 46 correct causal relations, Method B identified 63, combined: 87 (out of 100)
- Preliminary workshop: 20 events and 15 preconditions (countermeasures) successfully elicited and integrated into database
- Participants' local knowledge (e.g., gas stove near carpet) successfully captured and complemented each other

## Limitations

- No support for evoking multi-step causal chains (3+ events deep)
- Designed and tested for Japanese language only
- Workshop requires human facilitation

## See Also

- [[Causal Model - Cause Precondition Effect]] — formal model definition
- [[Interactive Knowledge Elicitation Method]] — GUI and workshop procedure
- [[NLP Causal Extraction Methods]] — Method A, Method B, Word2Vec deduplication
- [[Shaposhnyk 2025 - Overview]] — related: LLM-based automated expert elicitation
