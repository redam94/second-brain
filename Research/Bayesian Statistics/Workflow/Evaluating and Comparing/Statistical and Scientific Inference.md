---
title: "Statistical and Scientific Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 10 intro, 10.1-10.2, pp. 175-181 (Figures 10.1, 10.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Causal Inference as Generalization]]"
  - "[[Model Selection and Overfitting]]"
used_by:
  - "[[Software Assisted Workflow]]"
  - "[[The Replication Crisis and Multiple Levels of Variation]]"
  - "[[Simulated-Data Experimentation as Virtual Replication]]"
aliases:
  - "Scientifically degenerate analysis"
  - "The virtuous tangle"
  - "Portuguese man o' war"
  - "Estimand estimator estimate"
---

# Statistical and Scientific Inference

> [!summary]
> The book's most conceptually ambitious chapter opens with the **Portuguese man o' war** — a colony of
> specialized animals, none of which makes sense alone — as the image for Bayesian data analysis: **"Each
> component can function and pass all diagnostic checks, but still not make sense as part of the whole."**
> It names the failure mode this produces, **scientifically degenerate analysis** (statistically valid,
> scientifically meaningless), gives four documented real examples, and proposes a **tangle** —
> theory → estimand → design → sample → estimator → estimate → target — as the structure a full scientific
> workflow needs, borrowing the visualization practice of formalized mathematical proofs.

## Overview

> [!important] The opening image (Ch. 10, p. 175)
> "**The Portuguese man o' war (Physalia physalis) is neither Portuguese nor a warship. It looks like a
> jellyfish, but it's not even an animal. Instead it's a colony of individual animals, each with a
> specialized job. Some sting, others feed, and yet others raise a sail to ride the waves. None of these
> individuals makes sense in isolation. Their function emerges from structure. They fuse together in
> cooperation to sail and sting their way across the ocean. Like a pirate ship made of jelly.**
>
> **Bayesian data analysis is similar. It comprises functionally integrated parts. Or at least it should.
> None of the parts makes much sense by itself. Each component can function and pass all diagnostic
> checks, but still not make sense as part of the whole.**"
>
> **Four instances of components that pass locally but fail globally:**
> - "a wrong model that badly overfits **can still pass a posterior predictive check for some test
>   variables**";
> - "in cross validation, **the consistency relies on conditional independence and stationarity of the
>   predictors**";
> - "in causal inference, **there are always untestable causal assumptions, no matter how many models we
>   have fit**";
> - "more generally, **statistics relies on some extrapolation, for which some assumption is always
>   needed.**"

> [!important] What this book has deliberately left out
> "This book focuses on how workflow serves data analysis … **But we have neglected equally important
> aspects of Bayesian statistics, including theory construction, design, measurement, and data collection
> (coming before the data analysis), as well as decision making and communication (coming after data
> analysis).**"
>
> "**Instead of treating each step and its diagnostics as an isolated laboratory, a full scientific workflow
> requires justifications and diagnostics that span the network of these models, data, theories, goals, and
> summaries. Some of these links are necessarily subjective and give meaning and shared strength to the
> objective algorithms embedded in them.**"
>
> **The stated aim:** "**We wish for a statistics that credibly serves scientific goals instead of the
> too-common substitution of statistical goals for scientific ones. We don't know yet exactly how to
> achieve this.**"

## Main Content

### Scientifically degenerate analyses

> [!definition] Scientifically degenerate (Ch. 10.1, p. 176)
> An analysis that is "**statistically valid but lack[s] the essential quality of scientific relevance.**"
>
> "One way to conduct data analysis is to **find some variables seemingly related to a research question,
> explore some associations among them, and then tell a story about how these associations address the
> original question. The statistical workflow in such a plan can be immaculate without leading to any
> scientific insights from the inference.** In the absence of transparent and auditable links between
> theories of phenomena and our statistical procedures and summaries, **results can be reliable and
> repeatable but also completely wrong.**"
>
> "**A mature scientific workflow attends not only to the internal coherence of statistical procedures, but
> also to the scientific coherence among generative models of scientific phenomena, queries about these
> models, measurements, estimators, and summaries of estimates.**"
^def-degenerate-analysis

> [!example] Four documented cases
> **1. Conditioning on a post-treatment variable.** "A minimal example … is an analysis of a randomized
> experiment that **stratifies by a variable that is causally downstream of the treatment.** There is
> **nothing necessarily wrong with the statistical model** in this context. It is only that **the estimator
> is incompatible with the inferential goal** of estimating the total causal effect."
> *In the wild:* "**the widespread practice of conditioning on 'attention checks' in psychology**"
> (Montgomery, Nyhan, and Torres 2018).
>
> **2. Table 2 fallacy — reporting control coefficients as causal effects** (Westreich and Greenland 2013).
> "Suppose that one or more control variables are necessary to properly estimate a treatment effect. So …
> the estimator is properly matched to the scientific goal. **However the coefficients from these control
> variables are reported as total causal effects, just like the target treatment effect. This can be
> scientifically degenerate, because an estimator designed to yield the causal effect of a treatment does
> not automatically also yield causal effects for control variables.**" In Westreich and Greenland's
> examples, "**one must assume zero unobserved confounding of variables beyond the treatment and
> outcome.**"
>
> **3. The hot hand** (Gilovich, Vallone, and Tversky 1985 → Miller and Sanjurjo 2018). An early study
> "**failed to find evidence for the hot hand and concluded that the belief was a fallacy arising from flaws
> in human reasoning.** Despite some published criticisms … the view … persisted within academic psychology
> and economics until Miller and Sanjurjo (2018) showed that **the streak estimator … was systematically
> biased by selection. That earlier paper had no derivation or evaluation of the statistical properties of
> its procedure; it was merely justified by intuition. Once a proper estimator was derived using a
> generative model, evidence of the hot hand was found in the original data.**"
>
> > **"Nearly thirty years of confusion could have been avoided had the original researchers simply
> > conducted a simulation study of their own estimator."**
>
> Worked out in full in [[Simulated-Data Experimentation as Virtual Replication]].
>
> **4. Reproductive skew in population biology.** "Many papers have been written comparing reproductive
> skew by sex and species, often with scarce data. **Nearly all of these papers have used ad hoc estimators
> of skew that exhibit systematic bias at observed sample sizes**" (Ross, Jaeggi, et al. 2020). "**Only
> recently has the literature moved away from intuitive-but-degenerate estimators to estimators based upon
> and transparently derived from generative models of population dynamics**" (Ross, Hooper, Smith, et al.
> 2023).
>
> **Also named:** a "structurally analogous flaw" in routine **DNA methylation** analysis (Singer and
> Pachter 2015); **social network permutation procedures** that "fail to solve the problem that inspired
> them" (Hart et al. 2022); and **baseline adjustments** that "routinely cause more problems than they
> solve" (Glymour et al. 2005).

> [!warning] What the degenerate analyses have in common
> "**The degenerate hot hand and methylation analyses are reproducible and replicable. They look like
> science, but they lack any formal connection between a generative model of the phenomenon and the
> statistical approach.**"
>
> "**What these real examples have in common is a failure to transparently connect scientific goals to
> statistical procedures.**"
>
> **The prompt a scientific workflow would supply:** "**For each stratified variable, what is the scientific
> justification for its inclusion?**" And crucially: "**These assumptions do not have to be correct in order
> to be useful. They just have to be transparent and be used correctly in the design of the statistical
> model and the reporting of results.**"

### The proof analogy

> [!definition] Borrowing from formalized mathematics (Ch. 10.1, pp. 177-178)
> "**Consider the analogy of a mathematical proof. A proof has a target, the thing to be proved, and a set
> of axiomatic assumptions. In between, there may be many steps (lemmas), some taken in parallel, that
> converge on the target. Each step depends upon previous steps for its validity and requires its own
> justification. Linking all of these elements is a language, a set of procedures for combining
> intermediate results and assumptions into new results.**"
>
> **The tooling that exists for proofs, and what it provides:**
> - **Lean** (Lean Focused Research Organization 2024) "can assist with **the formal definition of each
>   step, as well as the justifications required to move among them. The framework demands logical
>   documentation for each definition and claim.**"
> - **Blueprint** (Massot 2024) "can **visualize the proof as a directed network and facilitate navigation
>   and inspection. This assists in constructing and completing the proof. And just as important, it helps
>   others examine and check the proof.**"
>
> "**Scientific data analysis is never really proven to be internally coherent. But the structural nature of
> the problem is similar. We require a representation of the analysis that helps us design, complete,
> validate, and transparently expose it to critique and modification.**"
^def-proof-analogy

> [!important] Figure 10.1 — the dependency graph, not a workflow
> "**In this figure, the arrows do not indicate any order of operation or action. Instead they indicate
> logical and computational dependence.**"
>
> ```mermaid
> flowchart LR
>     T["Generative theories"] --> Q["Estimand<br/>(the question)"]
>     T --> D["Research design"]
>     Q --> D
>     D --> S["Sample"]
>     Q --> E["Estimator<br/>(the statistical model)"]
>     T --> E
>     S --> E
>     S --> P["Estimate<br/>(posterior distribution)"]
>     E --> P
>     P --> R["Reported target<br/>(prediction / causal effect)"]
>     Q --> R
>     TP["Target population /<br/>target context"] --> R
> ```
>
> Spelled out: "**Statistical estimates, such as posterior distributions, depend upon the sample and the
> estimator, the statistical model. The justification for the estimator depends upon a specific set of
> questions, the estimand, which itself depends upon some set of generative theories for its coherence and
> relevance. And ultimately any reported summary targets of inference, whether predictions or causal
> effects, depend upon the estimates and a target population that is consistent with the estimand.**"
> (Deffner et al. 2024 present a fully-coded example spanning theory development, estimation, and
> reporting.)

> [!example] Scurvy, traced through the graph (Ch. 10.1, p. 178)
> | Node | Content |
> |---|---|
> | **Theory** | "**we suspect that scurvy is caused by vitamin C deficiency**" — vaguely expressed |
> | **Estimand** | "**What is the effect of consuming one lemon per week over the course of two months on symptoms of scurvy among sailors in the Royal Navy?**" |
> | **Design** | "theory and estimand together justify a research design, perhaps **giving one lemon per week to all sailors on randomly selected vessels and recording scurvy symptoms upon return to port**" |
> | **Sample** | "**The coherence and relevance of the sample depend upon the design. But often there will be unanticipated aspects of the sample that were not part of the design**" |
> | **Estimator** | must handle those unanticipated features: **missing data** ("some sailors slip away without health exams") and **measurement error** ("who is doing the health examinations anyway?"). "**These real features can be treated in the statistical model for better characterization of uncertainty. At the minimum we require a clear justification for decisions regarding missing data**" |
> | **Estimate** | assuming effective randomization, "a simple model of treatments (lemon ships versus no-lemon ships) produces … **the posterior distribution of the symptoms in each treatment**" |
> | **Target** | "**This distribution together with the estimand and a target population of sailors over a target duration of service (the target context) justify an estimate of the causal effect**" |
>
> **Note where the estimator's dependence on theory enters even under randomization:** "**the estimator
> depends upon aspects of the generative theory and sample, if only to justify why confounding is or is not
> assumed.**"

> [!important] The graph as a peer-review instrument
> "**A reader could begin with a paper's summary of an inference, 'Vitamin C cures scurvy,' and follow the
> graph backward to identify or mark as absent logical and computational dependence that the conclusion
> requires. An analyst who provides an annotated graph with links to code and data makes it easier for peers
> to appreciate, critique, and build upon their work.**"

### The virtuous tangle

> [!definition] Tangle (Cartwright et al. 2023; Ch. 10.2, p. 179)
> "**We are making a distinction between statistical workflow and its virtuous result, a tangle of concepts
> that form a coherent and reliable scientific project.**
>
> **The graph of this analysis does not imply a workflow. Instead it conveys logical and computational
> dependence, not necessarily indicating a temporal order.** Sometimes an analysis begins with a sample and
> an initial estimand. Other times the question comes first, and we search for a sample that can address it,
> however imperfect. **Either way, the graph indicates which additional assumptions and calculations are
> needed to transparently justify and qualify any inference made from the sample and which estimands are
> compatible.**"
^def-tangle

> [!example] Figure 10.2 — how synthetic data creates the tangle
> "**Two commonplace workflows in which the tangle arises from revision and counter-flow are the use of
> model diagnostics and model development using synthetic data.**
>
> **When we design a statistical model, leading to the estimator in the diagram, we should use features of
> the generative theory, the estimand, and design and collection of the data. And then in order to test and
> create transparent confidence in the estimator, we can use these features again to simulate synthetic
> data, a sample which obeys the generative theory and sampling design. Then we can produce synthetic
> estimates and evaluate the performance of the estimator.**"
>
> **The consequence — diagnostics become ambiguous, and that is the point:**
> > "**This kind of workflow produces a tangle among many components of the analysis. When problems are
> > found, they could be caused by any or all of the components.** Ordinary diagnostics for stochastic
> > algorithms work similarly. **When diagnostics reveal poor mixing, the cause could be the estimator or
> > rather the generative theory or a mismatch between the estimand and the other components.**"
>
> **Each workflow component thickens the tangle:** "**the prior predictive check helps in developing the
> estimator, but it can also reveal important aspects of the generative model that were omitted. A posterior
> predictive check can similarly reveal inadequacies in the generative theory. But in light of specific
> scientific questions, not all flaws in posterior predictions are problematic.**"
>
> > **"A virtuously entangled scientific workflow must survive assault from many sides. But it also gains
> > strength from the tangle."**

> [!important] The irreducible subjectivity
> "**Many decisions about the adequacy of checks are necessarily subjective** … a model can pass a posterior
> predictive check on one criterion but fail on another. For example, **a model could capture the average
> treatment effect but fail to describe individual variation in outcomes. Whether or not such a model passes
> the posterior check depends upon our goals but also sometimes upon our subjective judgment of adequacy for
> those goals.**"

### Explicit and indirect strategies for justification

> [!definition] Explicit strategies (Ch. 10.2, p. 180)
> "**In mathematical proofs, the logical strategies that are used in each step must be explicit. And the
> Curry-Howard correspondence between computer programs and proofs extends this idea to algorithms. In data
> analysis workflows, this general approach of being explicit about the logic would also be of value.**"
>
> **The question the arrows should answer:** "**These arrows say that the estimator is compatible with the
> generative model (theory) and some question or goal (estimand). But which assumptions are required for
> this compatibility to hold?**"
>
> **What "explicit" demands:** "**some calculus (set of assumptions and rules) that licenses operations on
> models and assumptions and data. For example, a structural causal model and an estimand can be used with
> the back-door criterion to justify a set of variables to stratify an estimate by.**"
>
> **And the standard is transparency, not correctness:** "**the key issue isn't whether the calculus is
> correct but rather that it be explicit, so that others can trace the logic of the workflow and make up
> their own minds about its correctness and generality.**"
>
> Also: "**since reasons communicate assumptions in ways that assumptions do not, the augmentation of the
> workflow graph with explicit strategies that license the connections can also strengthen the tangle.**"

> [!definition] Indirect strategies — justification by simulation
> "**Another way to justify a workflow is to appeal to simulation tests of efficacy.**
>
> For example, **many analyses in population genetics make use of variance ratios. Sometimes it is not clear
> that these ratios are statistically sufficient, and we have good reason to think they might not be. But the
> approach may still lead to valid inferences, under certain constraints. This can be demonstrated with
> simulation studies. Speidel et al. (2025) actually drop data to get tighter confidence regions, and this is
> justified not with any logical proof but rather with intuition and simulation.**"
>
> **What distinguishes indirect from explicit justification:** "**if we derive an adjustment set for a linear
> regression, we might still test that the software works correctly. What is different in indirect
> justification is that the core logic of the approach is being (partly) validated through workflow steps
> that are usually seen only as error checks.**"
^def-indirect-justification

## Connections

- The tangle is the scientific-scale version of [[From Inference to Data Analysis to Workflow|Figure 2.1]]:
  where Figure 2.1 maps steps within data analysis, Figure 10.1 maps dependencies from theory to reported
  claim, with all of Figure 2.1 sitting inside the "estimator" node.
- "Degenerate analysis" names precisely the failure that
  [[Causal Inference as Generalization]] and [[Poststratification]] are designed to prevent: an estimator
  mismatched to its estimand.
- The subjectivity acknowledged here is the same one [[Specifying the Data Model and the Prior]] declines
  to argue about, preferring "transparency, consensus, impartiality…"

## See Also
- [[Software Assisted Workflow]] — what tooling would have to do to support the tangle
- [[Simulated-Data Experimentation as Virtual Replication]] — the hot hand worked out in full
- [[The Replication Crisis and Multiple Levels of Variation]] — the consequences of degenerate analyses at scale
- [[Model Selection and Overfitting]] — the severe-tests argument this chapter generalizes
