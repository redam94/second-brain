---
title: "Software Assisted Workflow"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 10.3, p. 181"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Statistical and Scientific Inference]]"
  - "[[Computational Tools and Probabilistic Programming]]"
used_by:
  - "[[Modeling as Software Development]]"
aliases:
  - "targets package"
  - "Workflow pipelines"
  - "A layer of scientific logic"
---

# Software Assisted Workflow

> [!summary]
> A short section with a specific proposal: existing pipeline tools (`targets` and similar) track which
> inputs changed and which outputs need updating, but **an entangled workflow "goes beyond this by asking
> for additional links and inputs that are not technically required for a successful final summary."** The
> missing layer is **scientific logic** — the estimator understood as an *output* of theory, sample,
> estimand, and combining rules; the final summary understood as requiring a **formal link to the
> estimand**. The minimal viable version is modest: **let users label each step with its justification**,
> even if the software cannot check it.

## Overview

> [!important] Why individual-model tooling already works (Ch. 10.3, p. 181)
> "**Tools for simplifying and checking individual models are relatively common and advanced.** These tools
> help researchers build and test and report individual models. **Most of us are so used to software assisted
> statistical modeling that the modeling assumptions and algorithmic details fade into the background.
> Inverting a large design matrix is not trivial. Manually managing a large number of predictors and
> contrasts can be difficult and introduce error.**"
>
> **The criterion for good tooling, stated generally:** "**When effective, tools help the analyst focus on
> model design and interpretation, pushing calculations that can be safely automated out of the foreground.
> This frees up attention and time for focusing on what cannot (yet) be safely automated.**"

> [!warning] The complexity problem
> "**Like mathematical proofs, statistical workflows can very quickly become complex. The stylized workflow
> in Figure 10.2 is already complicated.** Adding … **strategies for justifying and deriving links between
> components makes the whole even more complex. This complexity is reflected within each piece of the
> workflow, since any individual model is also a complex web of assumptions and calculations.**"

## Main Content

### What existing pipeline tools do

> [!definition] The minimal version (Ch. 10.3, p. 181)
> "**Software assisted workflow minimally links functional inputs and outputs of each step. For example,
> data and estimator are inputs and the posterior distribution is an output. The posterior distribution
> could then be an input to a graphing function that outputs a visual summary.**
>
> **There are a number of packages and frameworks to assist with this kind of structured workflow, tracking
> which inputs have changed and then which outputs must be updated.**"
>
> The named example is **`targets`** (Landau 2021) — see
> [[Computational Tools and Probabilistic Programming]], where it is listed as the tool "**for automating
> re-running only necessary workflow steps in a fixed workflow if data change.**"
^def-pipeline-minimal

### What an entangled workflow would add

> [!definition] Links that are not technically required (Ch. 10.3, p. 181)
> "**An entangled workflow goes beyond this by asking for additional links and inputs that are not
> technically required for a successful final summary.**
>
> For example:
> - "**the estimator is in principle an output emerging from a set of inputs — a generative model, the nature
>   of the sample, an estimand, and a set of operations for combining them**";
> - "**a final summary function requires in principle a formal link to the estimand, to guarantee that it
>   addresses the research question.**"
>
> "**In addition to logical connections that justify and produce calculation steps, diagnostic nodes that
> further connect steps provide additional chances to find errors and strengthen the entire network.**"
^def-entangled-tooling

Note the inversion: in ordinary pipeline tooling the **estimator is something you write**; here it is an
**output** of upstream nodes, which is what makes the "why is this variable in the adjustment set?" question
mechanically answerable — the failure mode catalogued in
[[Statistical and Scientific Inference#Scientifically degenerate analyses]].

> [!important] The pragmatic ladder of ambition
> "**In principle, existing workflow packages could be augmented to support this approach. In practice, users
> may need higher-level support.**"
>
> | Level | What the software does |
> |---|---|
> | **Minimal** | "**allow users to simply label each step with justifications for its construction.** For example, a statistical model can be justified by the assumption of no unobserved confounding. **The software does not need to check the inputs** to see whether the combination of the estimand and the generative model requires that assumption nor whether it is sufficient" |
> | **Sometimes possible** | "**it is possible to semi-automate checking of adjustment sets in simple causal models, and many packages already support this. But they are not typically integrated with structured workflow**" |
>
> Even the minimal level does real work: an unlabeled step is visibly unlabeled, which is the whole point of
> the [[Statistical and Scientific Inference#The proof analogy|Blueprint-style]] visualization — a reader
> can "**follow the graph backward to identify or mark as absent logical and computational dependence.**"

> [!important] What is being asked for, precisely
> "**What we have in mind goes well beyond constructing and visualizing pipelines. Packages such as `targets`
> provide a lot of value in supporting and maintaining pipelines. What is needed on top of such tools is a
> layer of scientific logic that documents assumptions and uses this logic with the graph structure to
> provide additional diagnostics and automation of logically appropriate next steps.**"
>
> Three deliverables in that sentence: **documentation of assumptions**, **additional diagnostics derived
> from the graph**, and **automation of the next appropriate step.** The last is the one no current tool
> attempts.

## Connections

- This section is the tooling counterpart of the aspiration stated in
  [[From Inference to Data Analysis to Workflow]]: "**steps like model fitting and comparison can be partly
  automated to aid analysts**" — while model checking and revision "**is not automated nor could it be.**"
  The proposal here is to automate the *bookkeeping of justifications*, not the judgments.
- The "layer of scientific logic" is what would let a tool detect the post-treatment-conditioning and
  Table 2 fallacies of [[Statistical and Scientific Inference]] mechanically.
- Complementary to [[Modeling as Software Development]], which addresses the *engineering* discipline
  (version control, testing, reproducibility) rather than the *scientific* dependency structure.

## See Also
- [[Statistical and Scientific Inference]] — the tangle this tooling would support
- [[Computational Tools and Probabilistic Programming]] — the packages that exist today
- [[Modeling as Software Development]] — the software-engineering half of the same concern
