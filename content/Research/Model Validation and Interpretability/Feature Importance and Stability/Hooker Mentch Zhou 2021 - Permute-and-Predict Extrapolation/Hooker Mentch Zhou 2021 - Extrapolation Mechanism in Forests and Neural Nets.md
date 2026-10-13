---
title: "Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §4 'Extrapolation and Explanations' pp. 8-10, eq. (3), Figs. 4-6 (pp. 10-11)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Permute-and-Predict Extrapolation in Variable Importance]]"
  - "[[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]]"
  - "[[Honest Trees and Causal Forests]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
  - "[[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]"
aliases:
  - Potential Nearest Neighbours and Permutation Importance
  - Random forest extrapolation under permutation
  - Neural network extrapolation variance
---

# Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets

> [!summary]
> §4 explains **why** flexible learners inflate permutation importance of correlated features. In a two-feature example ($y=x_1+\varepsilon$, $x_1,x_2$ copula-correlated at 0.9, 200 points), the random forest reproduces the true **vertical** contours only inside the convex hull of the data. Outside it the contours turn **diagonal**, while the permuted query points fill the whole unit square. A tree predicts at a point by averaging the responses in its leaf. For an off-data permuted point, the **potential nearest neighbours** (pNN) are training points far away in both coordinates, so $\hat f(x^\pi)$ differs from $\hat f(x)$ and the irrelevant $x_2$ looks important. Neural networks fail differently: their predictions become **highly variable** away from the data (Gibbs-like oscillation), and that variance raises apparent importance.
^summary-hmz-extrapolation

## Overview

[[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1|Theorem 1]] establishes that, for linear models with standardized features, PaP importance reports squared coefficients. With uncorrelated features, RF PaP importance gives essentially the **same ranking** as linear PaP. So the over-emphasis of correlated features must come from what RF and NN do at the permuted locations, namely **extrapolation** (p. 9). The authors note the pattern had been documented before (e.g. Toloşi & Lengauer 2011) without reducing use of these diagnostics, and with little explanation of why it happens (p. 8).

## Main Content

### Two-feature experiment (§4, p. 9)

> [!example] Example: setup
> - Truth: $y=x_1+\varepsilon$, so $x_2$ has **no** effect; $\varepsilon\sim N(0,0.05)$ as printed, with signal-to-noise ratio $100/3$. The printed SNR only works if $0.05$ is the **standard deviation**: $\mathrm{Var}(x_1)=1/12$ for $U[0,1]$, so $\mathrm{SNR}=\mathrm{Var}(x_1)/\sigma^2=(1/12)/0.05^2=(1/12)/0.0025=100/3\approx33.3$. If $0.05$ were the variance, the SNR would be $(1/12)/0.05=5/3\approx1.67$. So read $\varepsilon\sim N(0,0.05^2)$, the same $N(\mu,\sigma^2)$ convention eq. (2) uses for $N(0,0.1^2)$.
> - Features: $(x_1,x_2)$ uniform marginals, Gaussian copula correlation 0.9.
> - Neural networks for Figs. 5-6: 100 single-hidden-layer networks with 20 hidden nodes, fit to the same data.
> - $N=200$ training points; random forest; **100 replications** to stabilize estimates and study between-fit variability.
^ex-two-feature-setup

**Figure 4** (p. 10), three panels:
- **Left**: data ('*'), the query points used for permutation importance of $x_2$ (dots), and contours of the average of 100 forests. Two observations follow:
  1. The true contours are vertical lines, but the forest reproduces them only **within the convex hull** of the data; outside it the contours become more **diagonal**.
  2. The data lie along the diagonal, but the permutation query points **fill out the unit square**.

  Much of the permutation-importance evaluation therefore happens far from the training data, where forests are poor at mimicking the generating function.
- **Middle**: leaf boundaries of 10 randomly chosen trees. In the top-left and bottom-right corners, splits extend either horizontally or vertically from the data at the adjacent corners. Each tree therefore predicts a **local average from one of the two corners**, based on either $x_1$ or $x_2$.
- **Right**: a single query. Permuting $x^\pi_{i1}$ moves the point from the data in the bottom-left to $x^\pi$ in the bottom-right, where there are very few observations.

**Figure 4, approximate readings** (p. 10, rendered at 300 dpi and enlarged; positions are read by eye to about ±0.02). The true surface is $f(x_1,x_2)=x_1$, so every true contour at level $c$ is the vertical line $x_1=c$.

*Left panel: contours of the average of 100 forests.* Nine labelled contours (0.1-0.9). The table gives where each one meets the plot boundary and where it crosses the data diagonal $x_1=x_2$, inside the convex hull of the data.

| Contour level | Upper/left end | Lower/right end | Crossing of the diagonal | Shape |
|---|---|---|---|---|
| 0.1 | left edge at $x_2\approx0.25$ | bottom edge at $x_1\approx0.10$ | $\approx0.10$ | short arc around the bottom-left data corner |
| 0.2 | left edge at $x_2\approx0.48$ | bottom at $x_1\approx0.26$ | $\approx0.20$ | vertical near the data, bends to the left (upward) |
| 0.3 | left edge at $x_2\approx0.73$ | bottom at $x_1\approx0.41$ | $\approx0.29$ | vertical near the data, diagonal at both ends |
| 0.4 | top at $x_1\approx0.14$ | bottom at $x_1\approx0.51$ | $\approx0.40$ | |
| 0.5 | top at $x_1\approx0.37$ | bottom at $x_1\approx0.63$ | $\approx0.50$ | |
| 0.6 | top at $x_1\approx0.50$ | bottom at $x_1\approx0.86$ | $\approx0.60$ | most strongly tilted in the lower right |
| 0.7 | top at $x_1\approx0.58$ | right edge at $x_2\approx0.28$ | $\approx0.70$ | |
| 0.8 | top at $x_1\approx0.73$ | right edge at $x_2\approx0.49$ | $\approx0.80$ | |
| 0.9 | top at $x_1\approx0.89$ | ends at about $(0.96,0.76)$ | $\approx0.92$ | small arc around the top-right data corner |

What the readings show:
- **On the diagonal** every contour sits within about 0.02 of its true position ($x_1=c$), so the forest is accurate where there are data.
- **Off the diagonal** the contours tilt to run roughly along the anti-diagonal. Bottom-right corner $(x_1,x_2)\approx(0.95,0.05)$, truth 0.95: it lies beyond the 0.6 contour (bottom end 0.86) and below the 0.7 contour (right end at $x_2\approx0.28$), so the averaged forest predicts about **0.6-0.7**, an error of about 0.3. Top-left corner $(0.05,0.9)$, truth 0.05: it lies between the 0.3 contour (left end at $x_2\approx0.73$) and the 0.4 contour (top end at $x_1\approx0.14$), so the prediction is about **0.3-0.4**, also an error of about 0.3. In both corners the forest predicts close to the average of $y$ along the diagonal near $x_1+x_2\approx1$, so $x_2$ appears to matter.
- The query dots used for $\mathrm{VI}^\pi_2$ form a dense regular grid of light grey points covering the **entire** unit square, including both empty corners, while the about 200 '*' training points occupy a band of width roughly 0.2-0.3 around the diagonal.

*Middle panel: leaf boundaries of 10 trees* (no contour labels; the grey shading is the averaged forest surface, darker = larger prediction, with the same tilted iso-bands in the empty corners).
- Small rectangles are concentrated along the diagonal band, where the data are. They are finest in the bottom-left ($x_1,x_2<0.3$) and top-right ($x_1,x_2>0.8$) corners, where points are densest.
- The off-diagonal corners contain no small cells. They are crossed only by long boundaries that run the full height of the square (vertical $x_1$-splits, densest for $x_1\approx0.4$-$0.95$) or the full width (horizontal $x_2$-splits, densest for $x_2\approx0.3$-$0.95$). A query in an empty corner therefore falls in a long thin leaf that reaches back to the data at **one** adjacent corner. That leaf's mean depends on $x_1$ if the leaf is a vertical strip and on $x_2$ if it is a horizontal strip, which is the caption's "local averages based either on $x_1$ or $x_2$".
- The positions of individual splits cannot be read reliably from the figure (100+ overlapping line segments), so no split table is given.

*Right panel: schematic, no axis scale.* About 17 data points rise along the diagonal. A query point (purple) in the lower left is moved by an arrow to the permuted location in the lower right. Two shaded rectangles are drawn: a horizontal strip from the data near the original point to the permuted point, and a vertical strip from the permuted point up to the data in the top-right. Both contain the query, so the points they cover are pNNs, from the bottom-left and the top-right ends of the data respectively.
^fig4-readings

### Tree predictions and potential nearest neighbours

> [!definition] Definition: Tree prediction as a weighted average; potential nearest neighbours (eq. (3), p. 9)
> A tree's prediction at $x$ is
> $$
> \hat f(x)=\sum_{i=1}^N w_iy_i,\qquad w_i=\begin{cases}1/|L(x)|,& x_i\in L(x)\\0,&\text{otherwise,}\end{cases}
> $$
> where $L(x)$ is the set of training observations in the same leaf as $x$. (The source prints the condition as "$x\in L(x)$"; it means observation $i$ is in $x$'s leaf.) The training observations that can receive non-zero weight across possible trees are the **potential nearest neighbours (pNN)** of $x$.
^def-pnn

**The mechanism** (pp. 9-10):
- With **correlated** features, the pNNs of a permuted point $x^\pi$ include observations far from the original $x$ in **both** coordinates, and this happens often across the forest's trees. Then $\hat f(x^\pi)$ is likely far from $\hat f(x)$, and the feature gets a large perceived importance even when it is irrelevant. (The text names "$x_1$" at this point while the experiment permutes the irrelevant $x_2$, an apparent slip in the source.)
- With features spread **uniformly**, the pNNs of $x^\pi$ lie close to it and share the original point's value of the unpermuted coordinate, so $f(x^\pi)$ is a fair comparison with $f(x)$.
- In the right panel almost **any** data point is a pNN of $x^\pi$: many rectangles reach both the data and the empty corner. Rectangles that contain few data points plus the query must run along an edge, which restricts the pNNs to points with **larger values of both** $x_1$ and $x_2$ (or smaller, for queries above the diagonal).

> [!theorem] Claim: Joint inflation of a symmetric correlated pair (§4, p. 10)
> The pNN argument explains the contour shift and the increased importance of the **irrelevant** $x_2$ in Fig. 4. It does **not** by itself explain why **both** $x_1$ and $x_2$ gain importance when they have symmetric effects, as in §2-3. The extra ingredient: concentrating observations on the diagonal raises the total signal **jointly** attributed to the pair, so at least one of the two is chosen for more splits.
^claim-joint-inflation

### Neural networks: variance instead of bias (p. 11)

- **Figure 5** (p. 11). Left: contours of the average of 100 neural networks with 20 hidden nodes, trained on the same correlated data with response $x_1+\varepsilon$; '*' is data, dots are VI query points. Right: **standard deviation** across the 100 networks.
- NN extrapolation is characterized "simply in terms of increased variability". The authors suspect a phenomenon like the **Gibbs effects** seen when fitting high-dimensional polynomials, with large oscillations outside the data range.
- Variance rises sharply away from the data, and those fluctuations inflate apparent importance and destabilize PD plots.

> [!note] Gibbs effects, briefly
> When a high-degree polynomial (or truncated Fourier series) is fit to data, it can match the data closely but **oscillate with large amplitude** just outside the data range or near discontinuities. The authors borrow the name for the analogous NN behaviour. Vault gloss: nothing in the training loss constrains a 20-node network off the data band, so different random initializations settle on very different off-band surfaces. For RF the off-data error is mainly a systematic **bias** (averages from distant leaves); for NN it is mainly **variance** across fits. Averaged over many fits the NN error partly cancels, which is why the Fig. 5 mean surface looks less wrong than any single network would.
^note-gibbs-effects

**Figure 5, approximate readings** (p. 11, read from contour labels; the true surface is $E[y\mid x]=x_1$, which ranges over $[0,1]$):

| Region of the unit square | Mean of 100 NNs (left panel) | SD across 100 NNs (right panel) |
|---|---|---|
| Inside the data band (along the diagonal) | Contours roughly **vertical**, labelled 0.2 to 0.9 at about the right $x_1$ positions, so close to the truth | No contour crosses the band; the lowest drawn contour is 1, so SD < 1 there and visibly small |
| Top-left corner ($x_1$ small, $x_2$ large; truth about 0-0.3) | Contours bend and crowd; a closed bump labelled **1.1** near $(x_1,x_2)\approx(0.3,0.85)$, where the truth is about 0.3; contours 0.6-0.9 run along the left edge where the truth is about 0 | Contours **1 to 7** packed toward the corner; SD about **7** near $(0.05,0.85)$ |
| Bottom-right corner ($x_1$ large, $x_2$ small; truth about 0.7-1) | Contours turn **horizontal**: about 0.5-0.6 at $x_2\approx0.15$-0.2, falling to **0.1 and then about −0.1** near $(1,0)$, where the truth is about 1 | Contours **1 to 5** (plus one more unlabelled) toward the corner; SD about **5-6** near $(1,0)$ |

Off the data the between-network SD is therefore **5-7 times the whole range of the response**, and even the averaged surface is wrong by up to about 1 unit (the full range of $y$). Permuted query points that land in these corners, which Fig. 4 shows they often do, contribute large and highly variable squared-error changes to $\mathrm{VI}^\pi_2$.

### ICE under extrapolation (Figure 6, p. 11)

Example ICE plots for $y=x_1+\varepsilon$: the left pair is from neural networks, the right pair from random forests. Thick black lines show PD and thin blue lines the theoretical model.
- ICE curves track the truth reasonably well **where the data support them** and can be very different outside.
- NN: greater variability.
- RF: extrapolation-induced inflation is the bigger worry, suggesting more significance for $x_2$ than expected.

**Figure 6, approximate readings** (p. 11; four panels; ICE curves in red, solid where supported by data and dotted outside; thin blue line = truth, $x_1$ for the $x_1$ panels and a constant of about 0.5 for the $x_2$ panels):

| Panel | Partial dependence (thick black) | ICE behaviour |
|---|---|---|
| NN, ICE in $x_1$ | Near the truth; slightly above it for $x_1\in(0.4,0.9)$; levels off at about 1.0 | Supported parts lie on the truth. Unsupported parts overshoot to about **1.25-1.28** for $x_1\approx0.6$-0.8 and dip to about 0.75-0.8 near $x_1=1$ |
| NN, ICE in $x_2$ (irrelevant) | About **0.7** at $x_2\approx0.05$, falling to about 0.5 by $x_2\approx0.5$, then flat, with a dip below 0.45 at $x_2=1$ | Supported parts are flat, as they should be. Unsupported parts at small $x_2$ rise to about **1.25**, and some fall below 0 near $x_2=1$; the irrelevant feature gets a spurious PD swing of about 0.2 |
| RF, ICE in $x_1$ | About 0.2 at $x_1=0$ to about 0.8 at $x_1=1$: **attenuated** (slope about 0.6 against 1) | Supported segments track the truth; unsupported dotted parts are flattened toward local averages |
| RF, ICE in $x_2$ (irrelevant) | Rises steadily from about **0.37 to 0.63**: a spurious slope of about 0.26 for a feature with no effect | Every curve, supported or not, slopes upward by about 0.2-0.3 |

Vault gloss: the RF $x_2$ panel is the visual counterpart of the inflated $\mathrm{VI}^\pi_2$. Because $x_2$ is a near-proxy for $x_1$, the forest's splits give it a genuine-looking slope, and permutation converts that slope into importance. The NN panels show variance instead: right where supported, erratic off support.

## Examples

> [!example] Example: a seasonal driver model (generic illustration)
> A random forest predicts weekly sales from temperature and a holiday-season indicator. Over 156 weeks the two move together: warm weeks are rarely holiday weeks. To score temperature, permutation places warm temperatures inside holiday weeks. No tree has a leaf built from such weeks, so each tree takes an average from whichever data corner its splits extend from. The sales difference this produces is credited to temperature, even if the true temperature effect is small.
^ex-seasonal-driver

## Connections

- Forest predictions as adaptive nearest-neighbour weights are the basis of [[Honest Trees and Causal Forests]] and [[Asymptotic Normality and Inference for Forests]].
- The same off-support querying undermines interventional SHAP: [[Problems with Shapley-Value Feature Importance]].
- Extrapolation risk for any diagnostic queried off the data is a general model-validation concern: [[Model Risk Management (SR 11-7)]], which requires knowing the limits of a model's applicability.

## See Also
- [[Hooker Mentch Zhou 2021 - Linear Simulation Design and Theorem 1]] — the empirical symptom
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] — measures that stay on the data
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
