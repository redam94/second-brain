---
title: Value Loss and Entropy Search
tags:
  - source/ingested
  - topic/probabilistic-numerics
  - type/concept
  - type/theorem
  - doc/textbook
source: "[[raw/ProbabilisticNumerics.pdf]]"
source_location: "Ch. 32, pp. 259-265; Ch. 33.3, pp. 270-273"
date_ingested: 2026-07-01
folder: "Probabilistic Numerics/Optimisation"
doc_type: textbook
depends_on:
  - "[[Bayesian Optimisation]]"
  - "[[Gaussian Process Regression]]"
  - "[[Bayesian Quadrature]]"
used_by:
  - "[[Acquisition Functions]]"
  - "[[Further Topics in Global Optimisation]]"
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
aliases:
  - Value Loss
  - Entropy Search
  - Predictive Entropy Search
  - Multi-Step Look-Ahead
  - Information-Theoretic Acquisition
  - PES
  - MES
---
# Value Loss and Entropy Search
> [!summary]
> The **value loss (VL)** frames optimisation as uncovering the lowest function value; its canonical myopic acquisition is **Expected Improvement (EI)**, while **Knowledge Gradient (KG)** relaxes EI to value improvements in the *posterior mean* (a global rather than local method, more robust to noise). The **information-theoretic** losses instead value the *information* an evaluation yields about the optimiser: **entropy search / IAGO** and **predictive entropy search (PES)** target the minimiser $x_*$ (location-information loss), while **OPES / max-value entropy search (MES)** target the minimum value $y_*$ (value-information loss). These acquisitions are expected entropies — integrals over surrogate posteriors, connecting to the value-of-information integrals of [[Bayesian Quadrature]]. Truly overcoming myopia needs multi-step look-ahead: a Bellman/dynamic-programming problem, exponential in the horizon.

## Overview
[[Bayesian Optimisation|BO]] offers three loss framings (VL, LIL, VIL). This note develops the VL and its relatives (EI, KG) — Ch. 32 — and the information-theoretic acquisitions derived from LIL and VIL — §33.3. It also treats **noisy EI** (the winner's curse) and the **multi-step look-ahead** needed to escape myopia (§32.4). Concrete closed forms are consolidated in [[Acquisition Functions]].

## Main Content
### Expected Improvement (VL, myopic)
> [!definition] Expected Improvement as a myopic VL
> At step $n$ with $\mathcal{D}_n=\{(x_i,f(x_i))\}_{i<n}$, GP posterior $p(f\mid\mathcal{D}_n)=\mathcal{GP}(f;m,\mathbb{V})$, and best-so-far $\eta:=\min_{i<n}f(x_i)$, EI approximates the VL by $\lambda_{\text{VL}}\simeq\lambda_{\text{EI}}(\mathcal{D}_{n+1})=\min\{\eta,f(x_n)\}$ (restricting the returned point to evaluated locations, removing dependence on $x_N$). The expected loss (minus the constant $\eta$) is
> $$
> \alpha_{\text{EI}}(x_n)=\int_{-\infty}^{\eta}\big(f(x_n)-\eta\big)\,p(f(x_n)\mid\mathcal{D}_n)\,\mathrm{d}f(x_n).\tag{32.1}
> $$
> With $p(f(x_n)\mid\mathcal{D}_n)=\mathcal{N}(f(x_n);m(x_n),\mathbb{V}(x_n))$ and Gaussian CDF $\Phi(x;a,b^2)$, this has the **closed form**
> $$
> \alpha_{\text{EI}}(x_n)=-\mathbb{V}(x_n)\,\mathcal{N}\big(\eta;m(x_n),\mathbb{V}(x_n)\big)+\big(m(x_n)-\eta\big)\,\Phi\big(\eta;m(x_n),\mathbb{V}(x_n)\big).\tag{32.2}
> $$
> Low (desirable) where $m(x_n)$ is small (exploitation) and/or $\mathbb{V}(x_n)$ large (exploration). EI is cheap, multimodal, admits gradient/Hessian, but is empirically **under-exploratory**: a model believing few evaluations remain feels it cannot afford exploration.
^def-ei

### Knowledge Gradient (VL variant, global)
> [!definition] Knowledge Gradient
> KG relaxes EI's restriction that $x_N$ lie among evaluated points. After the $n$th step it takes $x_N=\arg\min_{x'} m_{n+1}(x')$ — the minimiser of the *posterior mean after the next evaluation* $\mathcal{D}_{n+1}$. Defining $\check x_{n+1}:=\arg\min_{x'}m_{n+1}(x')$ with $m_{n+1}(x')=\mathbb{E}(f(x')\mid\mathcal{D}_{n+1})$, the KG loss is $\lambda_{\text{KG}}(\mathcal{D}_{n+1})=f(\check x_{n+1})$ (32.3), giving acquisition
> $$
> \alpha_{\text{KG}}(x_n)=\int\min_{x'} m_{n+1}(x')\,p\big(f(x_n)\mid\mathcal{D}_n\big)\,\mathrm{d}f(x_n).
> $$
> KG values **improvements in the posterior mean** rather than in the evaluations — a *global* method (it values impact on beliefs at *all* locations), where VL/EI are *local*. It need not evaluate at the minimum (e.g. a quadratic's minimum is known exactly after 3 evaluations). It is **not closed-form** (inner minimisation inside the integral) but useful approximations exist. KG introduces risk: the returned $f(x_N)$ may be poorly resolved (high posterior variance), so it may return an unreliable putative minimum.
^def-kg

### Noisy Expected Improvement and the winner's curse
> [!theorem] Winner's curse for noisy EI
> Managing noise in optimisation is *not* as benign as in regression. Taking the returned value to be the lowest *noisy* evaluation commits to returning a value known to be noise-corrupted; in fact the lowest evaluation is probably *more* noise-corrupted than others — a **winner's curse** (Thaler 1988). Hence EI is problematic for substantially noisy objectives. **KG is less sensitive**: rewarding improvements in the (smoothed) posterior mean ameliorates large negative noise contributions. Osborne, Garnett & Roberts (2009) constrain the returned $f(x_N)$ to be no greater than a threshold, avoiding returning an *uncertain* putative minimum. Information-theoretic approaches (§33.3) provide a natural solution to noise (Exercise 32.2 quantifies the curse via $p(\epsilon)\ne p(\epsilon\mid y)$).
^thm-winners-curse

### Information-theoretic acquisitions (LIL / VIL)
The **location-information loss (LIL)** and **value-information loss (VIL)** select observations that best yield information about the minimiser $x_*$ and minimum $y_*=f(x_*)$ respectively. Every information-theoretic evaluation is in a sense *exploratory* — its worth is the information it yields, not its value — and all are relatively **robust to noise** (prospective observations enter only through entropy terms).
> [!definition] Entropy Search (ES) / IAGO
> Under the myopic LIL, $\lambda_{\text{LIL}}(\mathcal{D}_{n+1})=\mathbb{H}(x_*\mid\mathcal{D}_{n+1})$, the acquisition is the expected posterior entropy of the minimiser:
> $$
> \alpha_{\text{IAGO}}(x_n)=\alpha_{\text{ES}}(x_n)=\int\mathbb{H}(x_*\mid\mathcal{D}_{n+1})\,p(y_n\mid x_n,\mathcal{D}_n)\,\mathrm{d}y_n=\mathbb{E}_{y_n}\big(\mathbb{H}(x_*\mid y_n,x_n,\mathcal{D}_n)\big),
> $$
> a **conditional entropy**. Since $x_*$ on a continuous domain has intractable $p(x_*)$ (and finite mass at boundaries), all implementations **discretise** $x_*$, computing $\mathbb{H}(x_*\mid\mathcal{D}_{n+1})=-\sum_i P(x_{*,i}\mid\mathcal{D}_{n+1})\log P(x_{*,i}\mid\mathcal{D}_{n+1})$ (differential entropy would not be reparameterisation-invariant and is hard to compute). IAGO (Villemonteix et al.) and ES (Hennig & Schuler) differ only in implementation.
^def-es

> [!definition] Predictive Entropy Search (PES)
> PES rearranges the LIL acquisition using symmetry of **mutual information**. Since the prior entropy $\mathbb{H}(x_*\mid\mathcal{D}_n)$ is independent of $x_n$,
> $$
> \arg\min_{x_n}\mathbb{E}_{y_n}\big(\mathbb{H}(x_*\mid y_n,x_n,\mathcal{D}_n)\big)=\arg\max_{x_n}\Big(\mathbb{H}(x_*\mid\mathcal{D}_n)-\mathbb{E}_{y_n}\mathbb{H}(x_*\mid y_n,x_n,\mathcal{D}_n)\Big),
> $$
> and via $I(x_*;y_n)=\mathbb{H}(x_*\mid\mathcal{D}_n)-\mathbb{E}_{y_n}\mathbb{H}(x_*\mid\cdot)=\mathbb{H}(y_n\mid x_n,\mathcal{D}_n)-\mathbb{E}_{x_*}\mathbb{H}(y_n\mid x_*,x_n,\mathcal{D}_n)$ (33.4),
> $$
> \alpha_{\text{PES}}(x_n)=-\mathbb{H}(y_n\mid x_n,\mathcal{D}_n)+\mathbb{E}_{x_*}\big(\mathbb{H}(y_n\mid x_*,x_n,\mathcal{D}_n)\big).
> $$
> PES selects identical evaluations to ES/IAGO but the rearrangement (following BALD, Houlsby et al. 2011) is cheaper: $\mathbb{H}(y_n\mid x_n,\mathcal{D}_n)$ is a univariate-Gaussian entropy; the second term conditions on $x_*$ being a minimiser (heuristics: zero gradient, positive curvature at $x_*$). Advantage over ES: $P(x_*\mid\mathcal{D}_n)$ is built once per step, not afresh for each candidate $x_n$.
^def-pes

> [!definition] Output-space entropy search (OPES) / Max-value entropy search (MES)
> The **VIL** targets the minimum *value* $y_*=f(x_*)$. OPES (Hoffman & Ghahramani 2015) and MES (Wang & Jegelka 2017) modify PES by replacing the minimiser $x_*$ with the minimum $y_*$:
> $$
> \alpha_{\text{OPES}}=\alpha_{\text{MES}}=-\mathbb{H}(y_n\mid x_n,\mathcal{D}_n)+\mathbb{E}_{y_*}\big(\mathbb{H}(y_n\mid y_*,x_n,\mathcal{D}_n)\big).
> $$
> Implementation advantage over PES: the posterior over the minimum $p(y_*\mid\mathcal{D}_n)$ is **univariate**, whereas the minimiser posterior $P(x_*\mid\mathcal{D}_n)$ has the dimension of the search domain.
^def-opes-mes

### Overcoming myopia — multi-step look-ahead (§32.4)
> [!theorem] Full VL as sequential decision-making
> Myopia causes under-exploration; ideally an optimiser shifts from explorative to exploitative as its budget depletes, but a myopic strategy is *static*. The full VL requires marginalising $N+1$ values $y_0,\dots,y_N$ and $N$ locations $x_1,\dots,x_N$, where each location follows from optimal future decisions:
> $$
> p(x_i\mid\mathcal{D}_i)=\delta\Big(x_i-\arg\min_x\mathbb{E}\big(\lambda_{\text{VL}}(x)\mid\mathcal{D}_i\big)\Big).\tag{32.4}
> $$
> This interleaves numerical **integration** over $y_i$ with **optimisation** over $x_i$ — a sequential decision problem solvable in principle by **dynamic programming (Bellman equation)**, but with cost **exponential in the horizon** $N-n$. Progress is limited to specialisations: independent discrete-valued evaluations (Gittins 1979), 1-D Markov objectives, active search, and batch approximations (González et al. 2016; Jiang et al. 2020) considering $\lesssim 20$ future steps, which set aside nesting in favour of a *batch* model (all locations chosen at once).
^thm-multistep

## Examples
> [!example] EI's under-exploration on a multimodal GP (Fig. 32.1)
> On a multimodal GP posterior, $\alpha_{\text{EI}}(x)$ (32.2) shows the expected improvement over $\eta$ at each $x$; its maximiser gives the next evaluation. EI concentrates near the current best mode — visibly under-exploratory — because myopically it acts as though few evaluations remain and must secure immediate value.

> [!example] KG needs no evaluation at the minimum
> For an objective known to be quadratic, three evaluations pin down the minimum exactly. EI would still waste a sample evaluating *at* the minimum to lower $\eta$; KG, valuing the posterior-mean minimiser $\check x_{n+1}$, recognises the minimum is already resolved and spends the sample elsewhere.

## Connections
- Specialises the loss/acquisition machinery of [[Bayesian Optimisation]]; closed forms tabulated in [[Acquisition Functions]].
- EI (32.1) is the global-scale relative of the univariate line-search EI in [[Probabilistic Step-Size Selection and Line Searches]].
- Entropy/expected-entropy acquisitions are value-of-information integrals over [[Gaussian Process Regression|GP]] posteriors — the same integral structure as active [[Bayesian Quadrature]].
- Multi-step look-ahead's batch relaxation feeds [[Further Topics in Global Optimisation|batch BO]].

## See Also
- [[Acquisition Functions]] — PI, EI, UCB, KG closed forms side by side.
- [[Bayesian Optimisation]] — the loss framings (VL/LIL/VIL) and myopic reduction.
- [[Bayesian Quadrature]] — value-of-information/entropy integrals in integration.
- [[Further Topics in Global Optimisation]] — batch, multi-fidelity, high-dimensional extensions.
