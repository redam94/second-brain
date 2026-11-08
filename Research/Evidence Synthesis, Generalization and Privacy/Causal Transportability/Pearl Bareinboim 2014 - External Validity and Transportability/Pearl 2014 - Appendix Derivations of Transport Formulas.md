---
title: "Pearl 2014 - Appendix Derivations of Transport Formulas"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Pearl 2014 - External Validity From Do-Calculus to Transportability.pdf]]"
source_location: "Appendix, arXiv pp. 15-16 (journal pp. 593-594), Eqs. A.1, A.2, derivations of Eqs. 5.9 and 5.10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Pearl Bareinboim 2014 - External Validity and Transportability"
doc_type: paper
depends_on:
  - "[[Pearl 2014 - S-Admissibility and the Graphical Criterion]]"
used_by:
  - "[[Pearl 2014 - Conclusions, Extensions and Limits]]"
aliases:
  - Transport formula derivation Fig 6d
  - Transport formula derivation Fig 7
  - Equation 5.9 and 5.10 derivation
---

# Pearl 2014 - Appendix Derivations of Transport Formulas

> [!summary]
> The Appendix derives, line by line, the transport formulas (5.9) for Fig. 6(d) and (5.10) for Fig. 7, justifying each step by a condition of Theorem 3 or a do-calculus rule. The pattern is always: condition on the S-admissible set, peel $do$-terms off $S$ using Rule 1 or 3, and finally replace $S$-conditioned terms with starred (target) distributions.

## Overview

Both derivations start from $P^*(y\mid do(x))=P(y\mid do(x),s)$ (for Fig. 7 with two selection variables, $s$ and $s'$). Read the result as a recipe for *what to measure where*: factors containing a $do$ are estimated in the source experiment; factors containing only observed variables and the $S$-node become starred factors estimated from the target's observational data.

The PDF text of the appendix is two-column and garbled in places; the justification annotations below follow the paper's printed order. The exact graph structure of Figs. 6(d) and 7 is drawn in the original; the roles of the variables below are inferred from the final formulas (so treat the role descriptions as a reading aid, not as a transcription of the figure).

## Main Content

### Derivation of (5.9), Fig. 6(d)

Variables: $X$ treatment, $Y$ outcome, $Z$ an S-admissible set, $W$ a set that separates $X$ from $Z$. Selection node $S$.

$$\begin{aligned}
P^*(y\mid do(x)) &= P(y\mid do(x),s)\\
&=\sum_z P(y\mid do(x),s,z)\,P(z\mid do(x),s)\\
&=\sum_z P(y\mid do(x),z)\,P(z\mid do(x),s)
&&\text{(Thm 3 condition 2: S-admissibility of }Z\text{ for the effect of }X\text{ on }Y)\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid do(x),w,s)\,P(w\mid do(x),s)\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid w,s)\,P(w\mid do(x),s)
&&\text{(Thm 3 condition 3: }(X\perp Z\mid W,S)\text{ in the }W\text{-modified graph)}\quad(A.1)\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid w,s)\,P(w\mid do(x))
&&\text{(Thm 3 condition 2: empty set S-admissible for }X\to W)\\
&=\sum_z P(y\mid do(x),z)\sum_w P^*(z\mid w)\,P(w\mid do(x)).
\end{aligned}$$

> [!theorem] Resulting formula (5.9)
> $$P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\sum_w P(w\mid do(x))\,P^*(z\mid w)$$
> Estimable pieces: $P(y\mid do(x),z)$ and $P(w\mid do(x))$ from the experiment on $\Pi$; $P^*(z\mid w)$ from observations on $\Pi^*$.
^thm-formula-5-9

### Derivation of (5.10), Fig. 7 (two selection nodes $S,S'$)

Reading from the final formula: $Z$ is S-admissible, $W$ separates $X$ from $Z$, and $T$ is a set that is S'-affected and S-admissible for the effect on $W$.

$$\begin{aligned}
P^*(y\mid do(x)) &= P(y\mid do(x),s,s')\\
&=\sum_z P(y\mid do(x),s,s',z)\,P(z\mid do(x),s,s')\\
&=\sum_z P(y\mid do(x),z)\,P(z\mid do(x),s,s')
&&\text{(Thm 3 cond. 2, S-admissibility of }Z\text{)}\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid do(x),s,s',w)\,P(w\mid do(x),s,s')\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid s,s',w)\,P(w\mid do(x),s,s')
&&\text{(Thm 3 cond. 3, }(X\perp Z\mid W,S,S')\text{)}\quad(A.2)\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid s,s',w)\sum_t P(w\mid do(x),s,s',t)\,P(t\mid do(x),s,s')\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid s,s',w)\sum_t P(w\mid do(x),t)\,P(t\mid do(x),s,s')
&&\text{(Thm 3 cond. 2, S-admissibility of }T\text{ for }X\to W\text{)}\\
&=\sum_z P(y\mid do(x),z)\sum_w P(z\mid s,s',w)\sum_t P(w\mid do(x),t)\,P(t\mid s,s')
&&\text{(Thm 3 cond. 1 / Rule 3, }(X\perp T\mid S,S')\text{)}\\
&=\sum_z P(y\mid do(x),z)\sum_w P^*(z\mid w)\sum_t P(w\mid do(x),t)\,P^*(t).
\end{aligned}$$

> [!theorem] Resulting formula (5.10)
> $$P^*(y\mid do(x))=\sum_z P(y\mid do(x),z)\sum_w P^*(z\mid w)\sum_t P(w\mid do(x),t)\,P^*(t)$$
> Measurement plan stated by the authors: variables $U$ and $V$ (present in Fig. 7) need not be measured; $W$-specific causal effects need not be estimated in the experiment; only $P^*(z\mid w)$ and $P^*(t)$ are needed from the target.
^thm-formula-5-10

### Reading the derivation pattern

| Step type | Tool | Effect on $S$ |
|---|---|---|
| Condition on $Z$ (or $W$, $T$) | law of total probability | none |
| Drop $s$ from a $do$-term | Rule 1 + S-admissibility | removes $S$ from the experimental factor so it can come from $\Pi$ |
| Drop $do(x)$ from a non-$do$ term | Rule 3 or "$X\perp Z\mid W$" | converts the factor to observational form: $S$ stays as conditioning |
| Final replacement | definition of the $S$-node ($P(\cdot\mid s^*)=P^*(\cdot)$) | the factor becomes a target distribution |

This is exactly Theorem 1's criterion: $S$ ends up only as a conditioning variable in $do$-free terms.

> [!example] Python: Monte Carlo check of (5.9) on a toy chain
> Model: latent $U\to X$, $U\to Y$; $X\to W\to Z\to Y$; $S\to Z$, so only the mechanism $W\to Z$ differs in the target. Experimental pieces $P(y\mid do(x),z)$ and $P(w\mid do(x))$ are estimated from simulated *source* experiments; $P^*(z\mid w)$ from simulated *target observational* data; the answer is compared with the target ground truth (simulating $do(x)$ in the target) and with naively reusing the source effect.
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> N = 400_000
> def draw(n, tgt, do_x=None):
>     u = rng.random(n) < .5                                  # latent confounder of X and W,Y? (here U->X, U->Y)
>     x = (rng.random(n) < np.where(u, .7, .3)).astype(int) if do_x is None else np.full(n, do_x)
>     w = (rng.random(n) < .2 + .5*x).astype(int)              # X -> W (shared mechanism)
>     pz = (.5 + .3*w) if tgt else (.1 + .2*w)                 # W -> Z ; S -> Z changes this mechanism
>     z = (rng.random(n) < pz).astype(int)
>     y = (rng.random(n) < .2 + .5*z + .1*u).astype(int)       # Z -> Y (+ confounding by U), shared
>     return x, w, z, y
> # --- source experiment: estimate P(y|do(x),z) and P(w|do(x))
> est_y = {}; est_w = {}
> for x in (0, 1):
>     _, w, z, y = draw(N, tgt=False, do_x=x)
>     est_w[x] = w.mean()
>     for zz in (0, 1): est_y[(x, zz)] = y[z == zz].mean()
> # --- target observational data: estimate P*(z|w)
> x, w, z, y = draw(N, tgt=True)
> est_z = {ww: z[w == ww].mean() for ww in (0, 1)}             # P*(Z=1|w)
> def eq59(x):
>     tot = 0
>     for zz in (0, 1):
>         for ww in (0, 1):
>             pw = est_w[x] if ww else 1-est_w[x]
>             pz = est_z[ww] if zz else 1-est_z[ww]
>             tot += est_y[(x, zz)] * pz * pw
>     return tot
> # --- target ground truth by simulating do(x) in the target
> truth = {x: draw(N, tgt=True, do_x=x)[3].mean() for x in (0, 1)}
> naive = {x: draw(N, tgt=False, do_x=x)[3].mean() for x in (0, 1)}
> print("effect truth  :", round(truth[1]-truth[0], 3))
> print("effect Eq 5.9 :", round(eq59(1)-eq59(0), 3))
> print("effect naive  :", round(naive[1]-naive[0], 3))
> ```
> Output (seed 0, $N=400{,}000$): truth $0.075$, Eq. 5.9 $0.074$, naive source effect $0.051$. The formula recovers the target effect from source experiments plus target observations; carrying the source effect over understates it.
^example-formula-5-9-python

## Examples

> [!example] Measurement plan in a marketing rollout
> Suppose a retailer ran a geo test on paid social ($X$) with intermediate metric $W$ = site visits and $Z$ = add-to-cart rate, outcome $Y$ = purchases. If the new market differs only in how visits convert to add-to-cart (the $S\to Z$ story of Fig. 6d), (5.9) says: take $P(w\mid do(x))$ and $P(y\mid do(x),z)$ from the test, but measure $P^*(z\mid w)$ from the new market's *observational* funnel data. No new experiment needed. See [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## Connections

- Proof patterns reused in the multi-source derivations of [[Bareinboim 2016 - Transportability and Data Fusion]].
- Conceptually the same decomposition as mediation formulas in [[Instrumental Variables and Principal Stratification]] (post-treatment variables).
- Rules used: [[Pearl 2014 - Threats vs Licenses and SCM Preliminaries]] (Rules 1-3); criterion: [[Pearl 2014 - S-Admissibility and the Graphical Criterion]].

## See Also

- [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]
