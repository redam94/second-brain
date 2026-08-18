---
title: "Model Building and Expansion - Golf Putting"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 25, pp. 389-400 (Figures 25.1-25.10)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Model Expansion - Predictive Consistency and Coherence]]"
  - "[[Big Data Need Big Models]]"
  - "[[Choosing an Initial Model]]"
used_by:
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Golf putting"
  - "Geometry-based model"
  - "Fudge factor"
  - "Bigger data need bigger models"
---

# Model Building and Expansion — Golf Putting

> [!summary]
> The book's showcase for **building a model from first principles**: a **one-parameter geometric model**
> — the ball goes in if the shot angle is within $\sin^{-1}((R-r)/x)$, with angles normally distributed —
> fits far better than logistic regression. Years later, new and larger data break it, and the repair is
> instructive in an unexpected way: the model fails **because the sample sizes at short distances are
> enormous** (45,198 putts in the first bin), so the binomial likelihood forces a near-perfect fit there at
> the cost of everything else. The fix is a **multiplicative "fudge factor"** with no golf interpretation
> at all — the case study's stated moral being that **bigger data need bigger models.**

## Overview

**The data.** Success rate of putts by professional golfers as a function of (rounded) distance from the
hole; originally a small dataset from Berry (1996), later a much larger one from Broadie (2018) extending
to 75 feet.

## Main Content

### Model 1 — logistic regression, the default

$$
y_j \sim \text{binomial}\!\left(n_j,\ \text{logit}^{-1}(a + bx_j)\right)
$$

Fit with a uniform prior on $(a,b)$, "**which causes no problems given the large sample size**." Estimates
$a = 2.23$, $b = -0.26$.

### Model 2 — the geometry

> [!definition] One parameter, derived from a picture (Ch. 25.2, p. 390)
> A ball of radius $r$ must be hit within a threshold angle to fall in a hole of radius $R$ at distance $x$:
> $$
> \text{threshold angle} = \sin^{-1}\!\left(\frac{R-r}{x}\right)
> $$
>
> **The human-error model:** "**the golfer is attempting to hit the ball completely straight but … many small
> factors interfere with this goal, so that the actual angle follows a normal distribution centered at 0 with
> some standard deviation $\sigma$.**"
>
> $$
> \Pr(\text{success}) = \Pr\!\left(|\text{angle}| < \sin^{-1}((R-r)/x)\right) = 2\Phi\!\left(\frac{\sin^{-1}((R-r)/x)}{\sigma}\right) - 1
> $$
>
> ```stan
> transformed data {
>   vector[J] threshold_angle = asin((R-r) ./ x);
> }
> parameters {
>   real<lower=0> sigma;
> }
> model {
>   vector[J] p = 2*Phi(threshold_angle / sigma) - 1;
>   y ~ binomial(n, p);
> }
> generated quantities {
>   real sigma_degrees = sigma * 180 / pi();
> }
> ```
>
> **The result:** $\hat\sigma = 1.53$ degrees, se 0.02. "**The custom nonlinear model fits the data much
> better**" than logistic regression — **with one parameter instead of two.**
>
> "**This is not to say that the model is perfect — any experience of golf will reveal that the angle is not the
> only factor determining whether the ball goes in the hole — but it seems like a useful start, and it
> demonstrates the advantages of building up a model directly rather than simply working with a conventional
> form.**"
>
> Note the `generated quantities` line: **the parameter is fit on radians and reported in degrees**, so the
> reader never has to do the conversion.
^def-golf-geometry

### The new data break it

> [!example] Checking an already-fit model against data collected years later (Figure 25.5, Ch. 25.3, p. 391)
> Two discrepancies, with different explanations offered:
> - **Short putts:** "the success rate is similar for longer putts but is much higher than before for the short
>   putts. **This could be a measurement issue, if the distances to the hole are only approximate for the old
>   data, and it could also be that golfers are better than they used to be.**"
> - **Beyond 20 feet:** "the empirical success rates become **lower** than would be predicted by the old model.
>   **These are much more difficult attempts, even after accounting for the increased angular precision required
>   as distance goes up.**"
> - "**In addition, the new data look smoother, which perhaps is a reflection of more comprehensive data
>   collection.**"

### Model 3 — adding distance control

> [!definition] The second physical constraint (Figure 25.6, Ch. 25.4, p. 392)
> Following Broadie (2018): the putt goes in if **(a)** the angle allows it **and (b)** the shot's potential
> distance $u$ lies in $(x, x+3)$ — "**the ball must be hit hard enough to reach the hole but not go too
> far.**"
>
> Assuming the golfer aims one foot past with multiplicative error, $u = (x+1)(1+\epsilon)$:
> $$
> u \sim \text{normal}\big(x+1,\ (x+1)\sigma_{\text{distance}}\big)
> $$
> $$
> \Pr(\text{success}) = \left[2\Phi\!\left(\frac{\sin^{-1}((R-r)/x)}{\sigma_{\text{angle}}}\right) - 1\right]\left[\Phi\!\left(\frac{2}{(x+1)\sigma_{\text{distance}}}\right) - \Phi\!\left(\frac{-1}{(x+1)\sigma_{\text{distance}}}\right)\right]
> $$
>
> `overshot` and `distance_tolerance` enter as **data** fixed at 1 and 3 feet: "**Later in this chapter we will
> estimate these as parameters, but these parameters could be difficult to identify from the data, and so we
> start by pinning them to these fixed values.**"
>
> **Two computational notes.** Flat priors gave "computationally unstable" results, so half-$\text{normal}(0,1)$
> priors were assigned. And even then, "**Running 4 chains, each with 2000 iterations, yields high values of
> $\hat{R}$ and low effective sample sizes, indicating multimodality.** **Initialization with Pathfinder solves
> the mixing issues**" — see [[Variational Inference and Pathfinder]].
^def-golf-distance-model

> [!warning] The diagnosis: huge sample sizes at short distances dominate the likelihood (Figure 25.7)
> "**The overall fit is not terrible, but there are problems in the middle of the curve, and after some thought
> we realized that the model is struggling because the likelihood is constraining it too strongly at the upper
> left part of the curve where the counts are higher. Look at how closely the fitted curve hugs the data at the
> very lowest values of $x$.**"
>
> The data explain why:
> | $x$ | $n$ | $y$ |
> |---|---|---|
> | 0.28 | **45,198** | 45,183 |
> | 0.97 | **183,020** | 182,899 |
> | 1.93 | **169,503** | 168,594 |
> | 2.92 | 113,094 | 108,953 |
> | 3.93 | 73,855 | 64,740 |
>
> "**Because of the very large sample sizes, the binomial model tries very hard to fit these probabilities as
> exactly as possible. The likelihood function gives by far its biggest weight to these first few data points.
> If we were sure the model was correct, this would be the right thing to do, but given inevitable model error,
> the result is a problematic fit to the entire curve.**"
>
> **A pure instance of the "bigger data need bigger models" argument** in
> [[Big Data Need Big Models]]: nothing is wrong with the physics; the problem is that with 183,000 putts in a
> bin, *any* misspecification becomes dominant.
^wrn-likelihood-too-strong

### Adding a fudge factor — two attempts

> [!example] Attempt 1 — an additive error term (Ch. 25.5, p. 394)
> "**To allow for a model that can fit reasonably well to all the data without being required to have a
> hyper-precise fit to the data at the shortest distances**":
> $$
> \frac{y_j}{n_j} \sim \text{normal}\!\left(p_j,\ \sqrt{p_j(1-p_j)/n_j + \sigma_y^2}\right)
> $$
>
> **Why not a beta-binomial**, the obvious overdispersed alternative: "**this would not be appropriate here
> because the variance for each data point $j$ would still be roughly inversely proportional to the sample size
> $n_j$, and our whole point here is to get away from that assumption and allow for model misspecification.**"
>
> **Estimates:** $\sigma_{\text{angle}} = 1.02°$, $\sigma_{\text{distance}} = 0.08$ ("shots can be hit to an
> uncertainty of about 8% in distance"), $\sigma_y = 0.003$ ("the geometric model fits the aggregate success
> rate as a function of distance to an accuracy of 0.3 percentage points").
>
> "**This model has its own problems and would fall apart if the counts in any cell were small enough, but it is
> easy to set up and code, so we try it out, with the understanding that we can clean it later if necessary.**"

> [!important] The reader comment that produced the better fix (Ch. 25.5, p. 396)
> Posted online, the analysis drew this response:
> > "*The problem seems rooted in the model needing the shortest putts probability to be very close to 1 in
> > order to fit the rest of the data. Before the normal hack, the (poorly sampled) model estimates the
> > probability of the shortest putts to be $10^9$ in logit space. The normal hack applies to probability space,
> > and there the error is tiny, so it works fine. But if you look at the error in logit space, the fit remains
> > really bad.*"
>
> "**This made us realize how we could solve the problem: instead of additive errors centered at zero (on some
> scale), we include a multiplicative error term that scales the probabilities down from 1.**"
> ```stan
> parameters {
>   real<lower=0> sigma_epsilon;
>   vector<lower=0, upper=1>[J] epsilon;
> }
> model {
>   vector[J] p = p_angle .* p_distance .* (1 - epsilon);
>   epsilon ~ exponential(1/sigma_epsilon);
> }
> ```
> "**The key is to make each element of the multiplier vector `(1 - epsilon)` positive and less than 1. This
> eliminates the problem with the boundary and the need for the logit.**" ($\epsilon \sim \text{normal}(0,
> \sigma_\epsilon)$ half-normal "gave essentially the same results.")
>
> The distinction is subtle and worth internalizing: **an additive error near a boundary is not the same as a
> multiplicative one**, because "small" on the probability scale can be enormous on the logit scale.
^imp-multiplicative-error

> [!example] Freeing the fixed constants, one at a time (Figures 25.9-25.10)
> The residual plot for the multiplicative model shows "**for short distances the model overestimates the
> probabilities. This pattern could be explained by sensitivity to `distance_tolerance` and `overshot`
> parameters that were fixed.**"
>
> **Free `distance_tolerance`**, with a $\text{lognormal}(\log 3,\ 0.2)$ prior — "**to include that expert
> information while still allowing some flexibility for this parameter to be fit from data.**" Result: "**The
> residuals are now smaller with the standard deviation halved, and there is no obvious pattern.**"
>
> **Free `overshot` too**, $\text{lognormal}(\log 1,\ 0.2)$: "**Examining the posterior reveals that
> `distance_tolerance` and `overshot` have high posterior dependence, and thus allowing `overshot` to be fit
> from the data did not further improve the model fit.**"
>
> **Compared by integrated PSIS-LOO** (needed because there is one $\epsilon_j$ per observation — the same
> device as [[LOO Model Checking and Comparison - Roaches]]):
> ```
>                                                  elpd_diff se_diff
> Distance tolerance and overshot parameters             0.0     0.0
> Distance tolerance parameter and overshot fixed       -0.6     0.3
> Distance tolerance and overshot fixed                -13.0     4.5
> ```
> "**including `distance_tolerance` clearly improves the performance, but adding the `overshot` parameter does
> not give much improvement. However we prefer the model with both … as the resulting posterior gives
> information on what can be learned about this aspect of the model.**"
>
> **A model kept despite no predictive gain, for what its posterior tells you** — a decision the elpd criterion
> alone cannot make.

### Simplifying at the end

> [!example] The final model: one constant $\epsilon$ (Ch. 25.5, pp. 397-398)
> "**What if we simply allow $\epsilon$ to be a constant — the probability of completely botching the shot,
> independent of distance from the hole?**"
>
> The edits are minimal: `epsilon` becomes `real` rather than `vector`; `.*` becomes `*`; and the prior becomes
> `epsilon ~ exponential(10)` — "**this prior distribution with mean 0.1 keeps $\epsilon$ from drifting to very
> high values but is only weakly informative in that, based on previous analyses, we expect $\epsilon$ to be
> less than 0.01.**"
>
> ```
>  variable            mean median     sd     q5     q95 rhat ess_bulk
>  sigma_degrees     0.8730 0.8726 0.0079 0.8602  0.8863 1.00      864
>  sigma_distance    0.1326 0.1325 0.0088 0.1184  0.1471 1.01      754
>  distance_tolerance 4.3540 4.3459 0.3415 3.8103  4.9144 1.01      748
>  overshot          1.0545 1.0504 0.1075 0.8865  1.2361 1.01      757
>  epsilon           0.0006 0.0006 0.0001 0.0005  0.0007 1.00     1244
> ```
>
> > "**Based on this model, golfers are estimated to hit their shots to an accuracy of approximately 0.9 degrees
> > in angle and 13% in distance, aiming for a spot 1 foot past the hole, and with a 6/10,000 chance of botching
> > the shot entirely.**"
>
> "**The estimate of `epsilon` is very close to zero, but it is enough to fix the fitting problem that appeared
> in Figure 25.7. It is satisfying when we can fix a model just by adding one more parameter in the right
> place.**"
>
> Note the computational technique used to get there: "**we use Pathfinder to get starting points when fitting
> the second and third models, in each case using the inference from the previous model as initial values for
> Pathfinder**" — chaining initializations through a model sequence.
^ex-golf-final-model

> [!important] Why keep the *worse*-scoring simpler model
> "**The new model does not perform as well according to leave-one-out cross validation; the differences in
> predicted probabilities of success are very small, but this still shows up as a deficit in prediction accuracy
> when counting the very large number of shots at the shortest distances.**
>
> **Why, then, do we prefer the simpler model here? Beyond the direct interpretability of its parameters, this
> model should be easier to expand, for example by allowing the three parameters … to vary by golfer or course
> conditions in a multilevel model.**"
>
> **Expandability as a model-selection criterion** — nowhere else stated so plainly in the book, and a direct
> counterweight to elpd.
>
> "**In retrospect we could have jumped straight to this model with constant error rate, but we have kept the
> intermediate steps to demonstrate the way in which statistical workflow — and scientific workflow more
> generally — often works its way through more complicated intermediate states until ending up at a cleaner
> solution.**"

## Examples

> [!example] General lessons (Ch. 25.6, pp. 398-399)
> "**A simple one-parameter model fit the initial dataset, and then the new data were fit by adding just one more
> parameter** … **With the large sample size of the new data, the likelihood was too strong and made it
> difficult for the model to fit all the data at once. Such problems of stickiness — which appear in the
> computation as well as with the inference — are implicit in any Bayesian model, but they can become more
> prominent as sample size increases.**
>
> > **This is an example of the general principle that bigger data need bigger models.**
>
> **In this case, we expanded our second model by adding an error term which had no underlying golf
> interpretation, but allowed the model to flexibly fit the data. This is similar to how, in a multicenter
> trial, we might allow the treatment effect to vary by area, even if we are not particularly interested in
> this variation, just because this can capture otherwise unexplained aspects of the data, and it is also
> similar to the idea in classical analysis of variance of including a fully saturated interaction term to
> represent residual error.**
>
> **And then we saw how, once we were able to fit the data in a satisfactory way, we were able to simplify to a
> more understandable model.**"

## Connections

- The chapter is the book's best argument for
  [[Choosing an Initial Model|building from substantive principles]] rather than from the regression menu: one
  physical parameter beats two statistical ones.
- The failure mode — enormous $n$ in a few bins overwhelming everything else — is the concrete mechanism behind
  [[Big Data Need Big Models]], and the "fudge factor" repair is exactly the model expansion that section
  prescribes.
- Pathfinder used both to fix multimodality and to chain initializations across a model sequence is the most
  extensive use of [[Variational Inference and Pathfinder]] in the case studies apart from Ch. 27.

## See Also
- [[Model Expansion - Predictive Consistency and Coherence]] — expansion, and the argument against parsimony
- [[Big Data Need Big Models]] — the principle this case study names
- [[Variational Inference and Pathfinder]] — initialization for a multimodal posterior
- [[LOO Model Checking and Comparison - Roaches]] — integrated PSIS-LOO, used here for the per-observation $\epsilon_j$
