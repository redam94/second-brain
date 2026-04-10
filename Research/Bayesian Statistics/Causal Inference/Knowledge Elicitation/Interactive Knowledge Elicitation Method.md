---
title: "Interactive Knowledge Elicitation Method"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - type/concept
  - doc/paper
source: "[[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]]"
source_location: "§3, pp. 440-441"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Causal Model - Cause Precondition Effect]]"
used_by: []
aliases:
  - Yamashita GUI method
  - workshop elicitation method
---

# Interactive Knowledge Elicitation Method

> [!summary]
> The interactive method uses a GUI-based workshop procedure to elicit causal knowledge from non-experts about disaster scenarios. Participants enter free-text descriptions of events and countermeasures; the system automatically extracts causal elements using NLP and asks users to confirm or correct them. Knowledge is accumulated and deduplicated into a shared causal network database.

## Overview

The method is designed for use in workshops by non-experts (e.g., organizational staff without disaster management expertise). It operationalizes the [[Causal Model - Cause Precondition Effect]] by guiding participants through structured questions.

## Workshop Procedure

### Phase 1: Event Elicitation

Participants enter possible events that can occur during a disaster (free-form text, unrestricted scope). The open format avoids anchoring bias from pre-populated categories.

### Phase 2: NLP Extraction and Confirmation

The entered sentences are processed by the NLP pipeline (see [[NLP Causal Extraction Methods]]). Candidate causal relationships are displayed in the GUI (Figure 1 in paper):

- The GUI shows the candidate cause and effect extracted from the input
- Participants choose: (a) the pair has a causal relationship, confirming the correct cause/effect, (b) no causal relationship, or (c) nothing appropriate — prompting manual entry
- This human-in-the-loop step corrects NLP errors and ensures accuracy

### Phase 3: Countermeasure Elicitation

For each confirmed cause-effect pair, participants enter countermeasures. These are treated as operationalizations of preconditions (see [[Causal Model - Cause Precondition Effect#def-precondition]]).

### Phase 4: Deduplication and Integration

New sentences are compared to existing database entries via Word2Vec similarity. If a sentence is sufficiently similar to an existing entry, the participant is shown the existing candidate and asked to confirm it is the same event. Otherwise, the new event is added to the database.

## GUI Design Principles

- Questions presented in Japanese (designed for Japanese workshops)
- Each session starts with the base disaster assumption (e.g., "an earthquake has occurred")
- Participants work independently, then knowledge is merged — one person's gaps are filled by another's local knowledge

## Preliminary Experiment Results

- 2 participants, earthquake scenario, knowledge about events in a single room
- **20 events** and **15 preconditions (countermeasures)** successfully elicited
- Local knowledge (e.g., gas stove near a carpet) captured that neither participant alone would have produced
- Participants' knowledge complemented each other (Person A: fire from gas stove; Person B: carpet catches fire)

## Limitation

The method does not proactively prompt users to think about causal chains extending beyond 2 steps. For example, if water outage is identified, users are not nudged to think about consequences of the water outage. A future improvement would present the growing causal network to participants during the workshop, prompting deeper chain reasoning.

## Connections

- Uses [[NLP Causal Extraction Methods]] for automated causal element extraction
- Based on [[Causal Model - Cause Precondition Effect]]
- Comparable motivation to [[LLM Expert Elicitation for Bayesian Networks]] — both seek to automate/assist expert knowledge acquisition for causal models

## See Also

- [[Yamashita 2020 - Overview]] — paper context
- [[NLP Causal Extraction Methods]] — the NLP backend
- [[LLM Expert Elicitation for Bayesian Networks]] — LLM-based alternative approach (Shaposhnyk 2025)
