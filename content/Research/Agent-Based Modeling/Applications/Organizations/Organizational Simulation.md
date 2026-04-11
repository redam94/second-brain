---
title: Organizational Simulation
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/organizations
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7284-7285"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Applications/Organizations"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
used_by: []
aliases:
  - Business process simulation
  - Organizational ABM
---

# Organizational Simulation

> [!summary]
> Bonabeau (2002) describes ABM applications in organizational simulation including business process modeling, store layout optimization, and workforce management. ABM is particularly useful when modeling organizations because the mapping between agent interactions and organizational performance is complex, and small changes in individual behavior or process design can have outsized effects on aggregate outcomes.

## Overview

Organizations are complex systems where individual employees, managers, customers, and processes interact. ABM enables modeling these interactions to understand how organizational design choices affect performance.

## Main Content

### Business Process Simulation

ABM can model business processes as systems of interacting agents:
- Each agent (employee, department, system) performs tasks according to rules
- The interaction patterns between agents determine process throughput, bottleneck locations, and resource utilization
- ABM captures that "the mapping between agent interactions and overall performance is complex" — small process changes can have large aggregate effects

### Store Layout Optimization

Bonabeau describes a store management ABM:

> [!example] Example: Supermarket Layout Optimization (Bonabeau 2002)
> **Setup:** An ABM models how shoppers navigate a store, representing:
> - When or whether to visit a particular aisle
> - How to distribute shelf space among products
> - What is the tolerance level for wait times
> - When to extend operating hours
>
> **Key insight:** The model provides "an integrated picture of the environment and of all the interacting elements that come into play" — managers can identify, adjust, and watch the impact of management decisions such as shelf placement, staffing levels, and store hours.
>
> **Why ABM over spreadsheets?** "Within ABM, Macy's had the opportunity to use visualization to access data in a way that becomes informational and leads to validation. Spreadsheet data averages can be used to establish distributions of individual behavior, so the individual agents in the simulation are consistent with the available real-world data."

### Workforce and Operations

ABM is "particularly useful in this context because the mapping between agent performance and behaviors on the one hand, and the bank's performance (in terms of average waiting times, number of ATM transactions visited, total distance walked, etc.) on the other, is too complex to deal with by using mathematical techniques."

### Sainsbury's Example

Macy's and other retailers developed ABM models for:
- Understanding customer flow patterns
- Optimizing product placement and shelf space
- Managing dynamic tension between maximizing shopping time and minimizing checkout wait
- Predicting effects of layout changes before implementation

## Connections

- Organizational simulation uses [[ABM Methodology and Principles]] in a business context
- Employee and customer agents use [[Agent Decision Rules and Bounded Rationality|bounded rationality]]
- This is one of four application areas alongside [[Flow Simulation Applications]], [[Market and Financial Simulation]], and [[Operational Risk Modeling with ABM]]

## See Also
- [[ABM Methodology and Principles]] — the paradigm underlying organizational simulation
- [[ABM in Marketing Strategy]] — overlapping application in business contexts
