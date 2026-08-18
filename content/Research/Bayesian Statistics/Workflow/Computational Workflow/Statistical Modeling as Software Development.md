---
title: "Statistical Modeling as Software Development"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 15, pp. 255-260"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Fit Fast, Fail Fast]]"
  - "[[SBC in the Workflow]]"
  - "[[Computational Tools and Probabilistic Programming]]"
used_by:
  - "[[Software Assisted Workflow]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Version control for models"
  - "Reproducibility"
  - "Modularity"
  - "Readable Stan code"
  - "Tests as controlled experiments"
---

# Statistical Modeling as Software Development

> [!summary]
> The book's expansion of the 2020 paper's software section (most of which, the acknowledgments note, was
> written by Bob Carpenter). Its most quotable line reframes what a test is: **software tests are
> "controlled experiments run on the implementation code," a principle which applies to statistical
> modeling as well as programming.** The practical core is four disciplines — **version control** (for
> reports, graphs, and data, not just code), **bottom-up testing paired with top-down design**,
> **essential reproducibility** via self-contained scripts, and **readability through naming rather than
> comments** — with the concrete Stan examples showing what each looks like.

## Overview

> [!definition] Four reasons the workflow involves a sequence of models (Ch. 15, p. 255)
> - "**Ignorance: we don't know ahead of time what model we want to fit.**"
> - "**Computation: sophisticated notions of 'warm start.'**"
> - "**Generalization: as we move to new problems and new data, we need to expand our models in different
>   ways.**"
> - "**Understanding: even if we were to know the true data-generating process, we would like to understand
>   the mapping from data to inference.**"
>
> "**Fitting a series of models is not always the most important part of an applied Bayesian analysis; rather,
> it is what separates Bayesian workflow from the earlier, more narrow concepts of Bayesian inference and
> Bayesian data analysis.**"
>
> **Why this makes modeling a software problem:** "**Developing a statistical model in a probabilistic
> programming language requires writing code and is thus a form of software development, with several
> stages: expressing and debugging the model itself; the pre-processing necessary to get the data into
> suitable form to be modeled; and the later steps of understanding, communicating, and using the resulting
> inferences.**
>
> **Developing software is hard. So many things can go wrong because there are so many moving parts that need
> to be carefully synchronized.**"
>
> **A warning about the field:** "**Software development practices are designed to mitigate the problems
> caused by the inherent complexity of writing computer programs. Unfortunately, many methodologies veer off
> into dogma, bean counting, or both.**" The two books recommended instead: Hunt and Thomas (1999) and
> McConnell (2004).

## Main Content

### Writing code for single or multiple uses

> [!important] Three levels of generality (Ch. 15.1, p. 256)
> "**There is a big difference between developing a method that works once for one problem, developing a
> method that we can use for our own applied research, and developing a method that can be used by strangers
> in unforeseen settings.**"
>
> "**Readability and modularity of software (the two are tightly related) are the biggest factors governing
> maintainability and extensibility.**"

> [!warning] Off-label use, and where it breaks
> "**Often a statistical model, or method, or software, will be developed in one setting and then used 'off
> label' elsewhere. This is not a bad thing; as noted above, statistical ideas and methods are supposed to be
> portable. But at each step away from a method's original use, new problems can arise.**
>
> **For a very simple example, you might have data analysis code where a logarithm is taken. But then it fails
> when it is applied to data that contain negative values.**
>
> **More complicated problems arise with Bayesian models that miss important aspects of the data, are well
> identified and can be computed easily with some datasets but not others, or where the strength of the prior
> changes as the dimensionality of the problem increases.**"
>
> The last case is [[Prior Predictive Checking#Weak priors become strong as dimension increases]] recast as a
> software-portability hazard.

> [!important] Exploratory graphics and presentation graphics are not so different
> "**Data visualization and exploratory analysis have often been thought to be unrelated to or in competition
> with statistical modeling. When thought of in terms of workflow, though, exploration and modeling are
> closely related.**
>
> Tukey (1972): exploratory analysis produces "**graphs intended to let us see what may be happening over and
> above what we have already described.**"
>
> **"Lurking behind the unexpected is the expected, and indeed the better we can model our data, the more we
> can learn from our data graphics. Models guide our explanations; conversely, exploratory discoveries can be
> viewed as model checks**" (Gelman 2003; Hullman and Gelman 2021).
>
> **"Exploratory graphics are for researchers using a model, and presentation graphics are for end users — but
> these two audiences are not so different! Developers should understand the goals of end users, and users'
> trust in a model should be enhanced by understanding where it fails."**
>
> **And the same for code:** "**any code is implicitly bounded by the set of cases where it will or should be
> applied. We understand code by breaking it, and this will be most valuable in the settings where the code
> is used.**" Stan development uses **agile coding** (Beck et al. 2001), "**which was originally largely about
> smallest useful coding units and keeping everything ready to release at any time.**"

### Version control

> [!definition] Not just for code (Ch. 15.2, p. 257)
> "**Version control software, such as Git, should be the first piece of infrastructure put in place for a
> project.** It may seem like a big investment to learn version control, but it's well worth it to be able to
> type a single command to revert to a previously working version or to get the difference between the
> current version and an old version."
>
> **Three uses specific to model workflow:**
> 1. **Keep different models in different files.** "**While version control keeps track of smaller changes in
>    one model, it is useful to keep the clearly different models in different files to allow easy comparison
>    of the models.**"
> 2. **Record the decisions, not just the code.** "**Version control also helps to keep notes on the findings
>    and decisions in the iterative model building, increasing transparency of the process.**"
> 3. **Cover reports, graphs, and data.** "**Version control is a critical part of ensuring that all of these
>    components are synchronized and that it is possible to rewind the project to a previous state**" — and
>    "**for its ability to package up and label 'release candidate' versions of models and data that
>    correspond to milestone reports and publications and to store them in the same directory without
>    resorting to the dreaded `_final_final_161020.pdf`-style naming conventions.**"
>
> **For policy work:** "**When working on models that are used to guide policy decision making, a public
> version control repository increases transparency about what model, data, inference parameters, and scripts
> were used for specific reports.** An example is the Imperial College repository for models and scripts to
> estimate deaths and cases for COVID-19" (Flaxman et al. 2020).
^def-version-control

### Testing as you go

> [!definition] Tests as controlled experiments (Soules and Ward 2025)
> The problem, quoted in full:
> > "**Most builders of research software believe they should write tests for their tools, yet many struggle
> > to do so efficiently and effectively. Formal strategies like Test-Driven Design may seem intimidating or
> > inaccessible, while developers relying on an ad-hoc approach can suffer from 'blank page syndrome' and
> > struggle to provide efficient, complete coverage of essential functionality. Sometimes this leads to
> > tests which actually spend more time testing mathematical properties or theories rather than the
> > implementation, wasting both compute time and developer time; in other cases, developers fall back to
> > manual tests, leading to developer anxiety and questionable software reliability.**"
>
> **The reframing:** "**In their perspective, software tests are 'controlled experiments run on the
> implementation code,' a principle which applies to statistical modeling as well as programming.**"
^def-tests-as-experiments

> [!important] Top-down design, bottom-up development
> "**Software design ideally proceeds top down from the goals of the end user back to the technical machinery
> required to implement it. For a Bayesian statistical model, top-down design involves at least the data
> input format, the probabilistic model for the data, and the prior, but may also involve predictive checks
> and simulation-based calibration checking.**
>
> **Software development ideally works bottom up from well-tested foundational functions to larger functional
> modules. That way, development proceeds through a series of well-tested steps, at each stage building only
> on tested pieces.**
>
> **The advantage to working this way as opposed to building a large program and then debugging it is the
> same as for incremental model development — it's easier to track where the development went wrong, and you
> have more confidence at each step working with well-tested foundations.**"
>
> **But sequence by risk, not only by level:** "**the fit fast, fail fast approach is relevant for choosing
> where to invest time and attention first. Start by developing the pieces with the highest risk of problems:
> if it turns out that they cannot be built or become intractable computationally, you have not wasted time
> on other components. For similar reasons, it is useful to find ways to expose our modeling assumptions to
> contact with reality as soon as possible.**"

> [!example] The standardization function, and why "simple" is not simple (Ch. 15.3, p. 258)
> "**The key to computational development … is modularity. Big tangled functions are hard to document, harder
> to read, extraordinarily difficult to debug, and nearly impossible to maintain or modify.** … **Whenever
> code fragments are repeated, they should be encapsulated as functions.**"
>
> **The worked example:** rescaling predictors by $z(v) = (v - \text{mean}(v))/\text{sd}(v)$.
> "**Although this function seems simple, subtleties arise, starting with the `sd` function, which is
> sometimes defined as**
> $$
> \text{sd}(v) = \sqrt{\frac{\sum_{i=1}^n (v_i - \text{mean}(v))^2}{n}} \quad\text{and sometimes as}\quad \sqrt{\frac{\sum_{i=1}^n (v_i - \text{mean}(v))^2}{n-1}}
> $$
> **If this isn't sorted out at the level of the standardization function, it can produce mysterious biases
> during inference. Simple tests that don't rely on the `sd()` function will sort this out during function
> development.**
>
> **If the choice is the estimate that divides by $n-1$, there needs to be a decision of what to do when $v$
> is a vector of length 1.**
>
> **In cases where there are illegal inputs, it helps to put checks in the input-output routines that let
> users know when the problem arises rather than allowing errors to percolate through to mysterious
> divide-by-zero errors later.**"
>
> **Higher-level functions are harder still:** an implementation of cubic splines or an Euler ODE solver
> "**should be tested before it is used. As functions get more complicated, they become harder to test because
> of issues with boundary-condition combinatorics, more general inputs such as functions to integrate,
> numerical instability or imprecision over regions of their domain which may or may not be acceptable
> depending on the application, the need for stable derivatives, etc.**"

### Making it essentially reproducible

> [!definition] The limited but vital goal (Ch. 15.4, p. 258)
> "**This is not the type of reproducibility that is considered in scientific fields, where the desire is to
> ensure that an effect is confirmed by new future data (nowadays often called 'replicability'). Instead this
> is the more limited (but still vital) goal of ensuring that one particular analysis is consistently
> done.**
>
> **In particular, we would want to be able to produce analyses and figures that are essentially equivalent to
> the original document. Bit-level reproducibility may not be possible, but we would still want equivalence
> at a practical level.**"
>
> **The implicit robustness test:** "**In the event that this type of reproduction changes the outcome of a
> paper (beyond variation in non-significant digits), we would argue that the original results were not
> particularly robust.**" — which connects directly to
> [[How Many Digits to Report#Replicability of stochastic computation]].
^def-essential-reproducibility

> [!important] Scripts, and what "self-contained" means
> "**Rather than entering commands on the command line when running models or entering commands directly into
> an interactive programming language such as R or Python, we recommend expressing all steps within scripts
> that run the data through the models and produce whatever posterior analyses are needed.**
>
> **The script should be self-contained in the sense that it should run in a completely clean environment or,
> ideally, on a different computer. This means that the script(s) must not depend on global variables having
> been set, other data being read in, or anything else that is not in the script.**"
>
> **Scripts as documentation:** "**It may seem like overkill if running the project is only a single line of
> code, but the script provides not only a way to run the code, but also a form of concrete documentation for
> what is being run. For complex projects, we often find that a well-constructed series of scripts can be
> more practical than one large markdown document or Jupyter notebook.**"
>
> **Pipeline tools:** `targets` (Landau 2021) and **Snakemake** (Mölder et al. 2021) "**are useful to improve
> reproducibility of the simulation or data analysis workflow steps, while recomputing only the required
> steps.**" See [[Software Assisted Workflow]].
>
> **The honest limit on bit-level reproducibility:** "**To guarantee bit-level reproducibility, and sometimes
> even just to get a program to run, everything from hardware, to the operating system, to every piece of
> software and setting must be specified with their version number. As time passes … bit-level
> reproducibility can be almost impossible to achieve even if the environment is shipped with the script, as
> in a Docker container.**"

### Making it readable and maintainable

> [!important] Readable code beats commented code (Ch. 15.5, p. 259)
> "**Readability of code is not just about comments — it is also about naming and organization for
> readability. Indeed, comments can make code less readable. The best approach is to write readable code, not
> opaque code with comments.**"
>
> **Two Stan examples.** Don't write:
> ```stan
> real x17;  // oxygen level, should be positive
> ```
> when you can write:
> ```stan
> real<lower=0> oxygen_level;
> ```
> Don't write:
> ```stan
> target += -0.5 * (y - mu)^2 / sigma^2;  // y distributed normal(mu, sigma)
> ```
> when you can write:
> ```stan
> target += normal_lpdf(y | mu, sigma);
> ```
>
> **"As the above examples illustrate, clean code is facilitated by programming languages that give users the
> tools they need to use."** This was a design goal of Stan: "**to make models self-documenting in terms of
> variable usage (identifying them explicitly as data or parameters), types … and sizes. This allows us to
> write code in Stan … to be understandable without the context of the data to which it is applied.**"
^imp-readable-not-commented

> [!important] Where documentation *does* belong
> "**User-facing functions should be documented at the function level in terms of their argument types, return
> types, error conditions, and behavior — that's the application programming interface (API) that users see
> instead of code internals.**
>
> **The problem with inline code comments aimed at developers is that they quickly go stale during development
> and wind up doing more harm than good. Instead, rather than documenting the actual code inline, functions
> should be reduced to manageable size and names should be chosen so that the code is readable.**
>
> **Longer variable names are not always better, as they can make the structure of the code harder to scan.**
> Code documentation "**is only called for when the code strays from idiomatic usage of the language or
> involves complex algorithms that need external documentation.**
>
> **When tempted to add a comment to a long expression or block of code, instead consider replacing it with a
> well-named function.**"

> [!warning] Copying code across models is an error-prone process
> "**When fitting a series of similar models, a lot of modules will be shared between them and so will be the
> corresponding code. If we simply copy the code each time we write a new model, then every time we discover
> an error in one of the shared modules, we need to go back and fix the code in all the models. This is an
> error-prone process.**
>
> **Instead, it can be sensible not only to build models in a modular manner but also to keep the corresponding
> code modular and load it into the models as needed. That way, fixing an error in a module requires changing
> code in just one rather than many places. Errors and other requirements for later changes will inevitably
> occur as we move through the workflow, and it will save us a lot of time if we prepare our modeling code
> accordingly.**"
>
> Note that this is the *code* version of the modular model-building advice in
> [[Choosing an Initial Model#Components as placeholders]] — and the two should be kept in correspondence.

## Examples

> [!example] Exercise 15.1 — the honesty game as a software problem (Ch. 15.6, p. 260)
> Taking the random-allocation-game model of [[Bioassay - A First Probabilistic Program|Exercise 3.1]]:
> **(a)** Write it as a general function taking $n$ (players) and $y$ (prize claims).
> **(b)** "**Check that your function returns reasonable answers for various examples of extreme data (for
> example, $y=0$ or $y=n$ or $y=n=0$) and that it appropriately returns an error for impossible data (for
> example, negative or non-integer values, or $y > n$).**"
> **(c)** "**It is possible to get data that are theoretically possible but in practice would imply that there
> was some data recording error or problem with the experiment, for example if $n = 200$ and $y = 50$. How
> should your program handle such a situation?**"
>
> Part (c) is the interesting one: it has no purely software answer. The boundary between *impossible* and
> *implausible* is a modeling judgment.

> [!example] Exercise 15.3 — make it worse, on purpose
> "**Take a Stan program from one of the case studies and rewrite it so that it is still fully functional but
> it is less readable. Explain what you did.**" — the readability analogue of "breaking the model" in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#Section 4.5]].

> [!example] Exercise 15.4 — pedantic mode, from three angles
> **(a)** Choose three coding patterns pedantic mode flags that will not necessarily cause failure; explain
> the motivation and how each error could arise.
> **(b)** "**Come up with an example of a model that is flagged by pedantic mode but is actually doing what you
> want it to do. Then rewrite the program so it still works, but altering it so that it does not violate the
> pedantic prescriptions.**"
> **(c)** "**Come up with an example of a common coding error that is not currently caught by pedantic mode.
> Define it explicitly so it could be parsed before compilation.**"

## Connections

- "Tests are controlled experiments on the implementation" is the same epistemology as
  [[Designing Simulated-Data Experiments]] and [[SBC in the Workflow]] — and SBC is precisely the test for a
  whole model rather than a function.
- Modularity in code mirrors modularity in models ([[Choosing an Initial Model]]) and is what makes the model
  sequence of [[Comparing Models Visually]] maintainable rather than a pile of copies.
- This chapter supplies the *engineering* discipline; [[Software Assisted Workflow]] asks for a layer of
  *scientific* logic on top of it.

## See Also
- [[SBC in the Workflow]] — model-level testing
- [[Fit Fast, Fail Fast]] — sequencing development by risk
- [[How Many Digits to Report]] — replicability of stochastic computation
- [[Modeling as Software Development]] — the 2020 paper's shorter treatment
