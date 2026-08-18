---
title: "Varieties of Bayesian Theory"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 1.2, pp. 7-9"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[Why Bayes - Benefits, Costs, and Borders]]"
used_by:
  - "[[Four Modeling Scenarios]]"
  - "[[Topology of Models]]"
  - "[[Stacking and Predictive Model Averaging]]"
  - "[[From Inference to Decision]]"
aliases:
  - "M-open vs M-closed"
  - "M-closed framework"
  - "M-open framework"
---

# Varieties of Bayesian Theory

> [!summary]
> The authors situate themselves explicitly: they **reject the globally Bayesian "M-closed"
> framework** in which the joint distribution is correct and candidate models are assigned
> probabilities inside a super-model. They work in an **M-open** framework where data analysis can
> motivate entirely new model classes. This single commitment is what licenses everything else in the
> book — model expansion, stacking rather than Bayes factors, and treating all inferences as
> conditional and provisional.

## Overview

Comparing Bayesian theory to Bayesian practice is tricky because there are many varieties of each —
"indeed going far beyond the eleven factors identified by Good (1971)." But there is a recognizable
spectrum, and discussing its extremes is useful.

## Main Content

### The M-closed / M-open distinction

> [!definition] M-closed framework (Bernardo and Smith 1994; Ch. 1.2, p. 7)
> One extreme form of Bayesian theory holds that **the joint distribution of parameters and data is
> correct and unchangeable**. In this "globally Bayesian" framework, multiple candidate models are
> each assigned probabilities as part of a **super-model**.
>
> This is the frame in which Bayes factors and posterior model probabilities are coherent.
^def-m-closed

> [!definition] M-open framework (Gelman and Shalizi 2013; Ch. 1.2, p. 8)
> The authors' position: data analysis can and often does **motivate development of completely new
> model classes** that were not in any pre-specified list.
>
> **Two reasons given for rejecting M-closed:**
> 1. *Practical* — "we know that our models often have serious flaws."
> 2. *Theoretical* — "the space of models that can be written down and computed is a tiny subset of
>    the space of all possible models."
> 3. *Methodological* — scientific method does not only test models with data analysis.
^def-m-open

> [!important] The weaker philosophy the book actually adopts
> "Inference can be performed conditional on a probability model or set of models, but **we must
> always be open to criticizing, expanding, and abandoning our models** as dictated by data and
> substantive understanding."
>
> This attitude is *operationalized* by the workflow steps of Figure 2.1 — see
> [[From Inference to Data Analysis to Workflow]]. Even within this pragmatic Bayesianism there
> remains a gap between theory and practice, because practice involves shortcuts in model building
> and computation.

**Downstream consequence:** because the true model is not assumed to be in the list, model comparison
in this book is done by predictive performance and stacking rather than by posterior model
probabilities — see [[Model Selection and Overfitting]] and
[[Stacking and Predictive Model Averaging]].

### A spectrum of practical environments

Just as theory has a range, so does practice:

| Environment | Character | Relation to Bayesian theory |
|---|---|---|
| **Elaborate analyses** | Months or years constructing a model for one applied problem | Closest to fully considered Bayes |
| **Intermediate** | Flexible work within a well-understood class (e.g. hierarchical regression) — much user input, but within known distributions | Middle |
| **Default analyses** | Clean problems of random sampling, experimentation, measurement | Simplest in practice but **furthest from pure Bayesian theory** — they often do not even attempt to approximate a data-generating process |

That default analyses are far from theory does not make them useless; it means we must be careful when
evaluating such procedures from a theoretical Bayesian standpoint.

### Foundations and interpretations of probability

The authors deny that probability has any unique foundation. It is a mathematical concept applying to
long-run frequencies, betting, uncertainty, decision making, and statistical inference — and **it is
not a perfect model for any of them**:

- long-run frequencies are in practice not stationary;
- betting depends on your knowledge of the counterparty;
- uncertainty includes both known and unknown unknowns;
- decision making is open-ended;
- statistical inference is conditional on assumptions that in practice will be false.

> [!example] The Euclidean-line analogy (Ch. 1.2, p. 8)
> Defining probability by an imperfect real-world counterpart (betting, long-run frequency) "makes
> about as much sense as defining a line in Euclidean space as the edge of a perfectly straight piece
> of metal, or as the space occupied by a very thin thread that is pulled taut."
>
> **Interpretation:** a line is a mathematical object *analogized* with different real-world
> phenomena; so is probability. It is fitting that so important a concept is compatible with several
> real-world analogies, none of which is perfect — which is why the book never argues from
> foundations and always argues from what the model does.

### Bayesian inference and decision making

**The optimality reading.** Bayesian inference is optimal *if the assumed generative model is true*,
in the sense that averaging over the prior predictive distribution makes Bayesian posteriors correct
probability statements. In real life neither data nor prior match reality, so statistical properties
would ideally be evaluated by averaging over all datasets the model would be applied to. Any
theoretical analysis then involves both the Bayesian model $p(\theta,y) = p(\theta)p(y|\theta)$ and a
**true unknown predictive distribution $f(y)$**.

**The coherence reading, and how the book repurposes it.** Coherent decision making is "more of an
ideal than a reality, given that we are continuing to tinker with our models as new data and
information come in; from the standpoint of workflow, our priors are not coherent and do not
correspond to a generative model."

> [!important] Turning the bug into a feature
> Because fully Bayesian inference *enforces* coherence of uncertainty and decision statements, **it
> should be possible to trace any incoherence back to a problem with the model, which can then be
> fixed.** Incoherence becomes a diagnostic rather than an embarrassment.
>
> The old line that Bayesian probabilities represent subjective beliefs "just pushes the problem back
> one step, as it is not clear where a numerical expression of your subjective belief would come
> from, other than in idealized settings such as coin flips and rolls of a die."

**Institutional decision analysis (BDA3 Ch. 9).** A formal decision analysis is a *mapping* from
assumptions and data to decisions, and the mapping runs in **both directions**:

1. Forward: obtain data-informed decision recommendations.
2. Backward: ask what assumptions would be required to recommend some particular decision.

If an analysis recommends a decision that doesn't make sense, bounce it back and ask which aspects of
the model are unjustified.

> [!important] Decision theory is two things
> 1. *Immediately*, a tool for making decisions under uncertainty in tangled settings where human
>    intuition fails.
> 2. *At the next level*, a tool for **identifying incoherence** — contradictions between beliefs and
>    actions that are implicit until you work out their implications.
>
> "Finding incoherence is not the ultimate goal here — we're animals, not machines, and we'll be
> incoherent in all sorts of ways. Rather, the point in identifying incoherence is to be able to go
> back and find problems with our underlying assumptions. We are not trying to attain 'a foolish
> consistency'; rather, checking for inconsistency is a tool that allows us to investigate our
> assumptions."

**Imperfection does not always hurt.** A Gaussian data model can serve simply as a machine for
inferring expectations even when residuals are distinctly non-Gaussian. The usefulness of a model
"is not unitary but depends upon which inferences or predictions we wish to make" — which in turn
shapes how we critique and expand it. The clinical trial case study deliberately specifies obviously
incorrect models and explores how they are nevertheless useful, especially as comparisons.

## Connections

- The M-open commitment is the hidden premise behind [[Topology of Models]]: if the true model were
  in the list, you would compute its posterior probability rather than map a topology of alternatives.
- It also explains why the book prefers [[Stacking and Predictive Model Averaging]] over Bayesian
  model averaging by marginal likelihood.
- The two-directional reading of decision analysis reappears concretely in [[From Inference to Decision]].
- The optimality/coherence discussion is the theoretical counterpart of
  [[Statistical and Scientific Inference]].

## See Also
- [[Why Bayes - Benefits, Costs, and Borders]] — the borders that motivate the M-open stance
- [[Four Modeling Scenarios]] — the practical ladder that replaces "is the model true?"
- [[There Is No Safe Haven]] — no default choice is exempt from these commitments
- [[Decision Analysis]] — the BDA3 treatment of institutional decision analysis
