---
title: "Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/theorem
  - type/definition
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§3 The theoretical result, pp. 4-7: eq. (3), Q(θ), q(θ̂), PE, PE-hat, Assumptions A1-A3 (pp. 5-6), strong-mixing conditions (a)-(b) p. 6, sufficient conditions for A2 p. 6, Theorem 1 eq. (4) p. 6, discussion of violations pp. 6-7"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]"
  - "[[Cross Validation Checking]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]"
  - "[[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
aliases:
  - Cross-Validation for Time Series Prediction
  - K-Fold CV for Autoregressive Models
  - Validity of Cross-Validation for Time Series
  - Bergmeir Theorem 1
---

# Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models

> [!summary]
> Theorem 1 of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] says that for a **stationary, ergodic, correctly specified nonlinear AR($p$)** model with a **consistent** leave-one-out estimator and **martingale-difference errors**, the leave-one-out CV estimate of mean squared prediction error, computed by deleting whole rows of the lag-embedded matrix, converges in probability to the true prediction error on an independent copy of the process. The same holds for K-fold CV. Serially uncorrelated errors are the load-bearing condition. A misspecified, underfitting model breaks it; an overfitting but flexible model does not.
^summary

## Overview

The theorem formalises the heuristic of [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]: if the residuals of the embedded regression are white, its rows behave like independent regression cases, and ordinary CV works. The authors use leave-one-out "without loss of generality" because "generalisation to the K-fold CV is straightforward" (p. 4). The proof is in [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]].

## Main Content

### Setup (§3, pp. 4-5)

Let $y_1,\dots,y_n$ be observations from a stationary process where each $y_t$ has distribution $P$ on $\mathbb R$.

> [!definition] Nonlinear regression form of the AR($p$) model (§3, eq. (3), p. 4)
> $$y_t=g(\mathbf x_t,\theta)+\varepsilon_t,\qquad \mathbf x_t=(y_{t-1},y_{t-2},\dots,y_{t-p})',$$
> where $g(\cdot)$ is continuous and differentiable in $\theta$ for all $\mathbf x_t$, and $\varepsilon_t$ is a regression error.
>
> **Estimator.** $\hat\theta=\arg\min_{\theta\in\Theta}Q(\theta)$ with
> $$Q(\theta)=\sum_{t=p+1}^{n}\bigl(y_t-g(\mathbf x_t,\theta)\bigr)^2 .$$
^def-nls-ar

> [!definition] Prediction error PE (§3, p. 5)
> Let $\{\tilde y_t\}_{t=1}^m$ be another process with the same distribution as the sample $\{y_t\}_{t=1}^n$, for example the future, with $\tilde{\mathbf x}_t=(\tilde y_{t-1},\dots,\tilde y_{t-p})$. Then
> $$\mathrm{PE}=E\{\tilde y-g(\tilde{\mathbf x},\hat\theta)\}^2,$$
> where $\hat\theta$ solves the estimating equations
> $$q(\hat\theta)=\sum_{t=p+1}^{n}\frac{\partial}{\partial\theta}g(\tilde{\mathbf x}_t,\hat\theta)\bigl(\tilde y_t-g(\tilde{\mathbf x}_t,\hat\theta)\bigr)=\sum_{t=p+1}^{n}\frac{\partial}{\partial\theta}g(\tilde{\mathbf x}_t,\hat\theta)\,\tilde\varepsilon_t(\hat\theta)=0,$$
> with $\tilde\varepsilon_t(\theta)=\tilde y_t-g(\tilde{\mathbf x}_t,\theta)$. By construction $\tilde\varepsilon_t$ has the same distribution as $\varepsilon_t$.
^def-pe

> [!definition] Leave-one-out CV estimator $\widehat{\mathrm{PE}}$ (§3, p. 5)
> The training sample is $\{(\mathbf x_j,y_j):j=p+1,\dots,n,\ j\neq t\}$ and the test sample is $\{(\mathbf x_t,y_t)\}$. The **entire row** of matrix (2) for $t$ is left out. Then
> $$\widehat{\mathrm{PE}}=\frac{1}{n-p}\sum_{t=p+1}^{n}\{y_t-g(\mathbf x_t,\hat\theta_{-t})\}^2,$$
> where $\hat\theta_{-t}$ solves
> $$q(\hat\theta_{-t})=\sum_{\substack{j=p+1\\ j\neq t}}^{n}\frac{\partial}{\partial\theta}g(\mathbf x_j,\hat\theta_{-t})\bigl(y_j-g(\mathbf x_j,\hat\theta_{-t})\bigr)=\sum_{\substack{j=p+1\\ j\neq t}}^{n}\frac{\partial}{\partial\theta}g(\mathbf x_j,\hat\theta_{-t})\,\varepsilon_j(\hat\theta_{-t})=0,$$
> obtained by differentiating $Q_{-t}(\theta)=\sum_{j=p+1,\,j\neq t}^{n}(y_j-g(\mathbf x_j,\theta))^2$.
>
> **Goal:** $\widehat{\mathrm{PE}}$ should approximate PE closely.
^def-pe-hat

### Assumptions (§3, pp. 5-6)

> [!definition] Assumption A1: stationary nonlinear AR($p$) process
> The sequence $\{y_t\}_{t=1}^n$ is represented by the nonlinear AR($p$) process (3). The process is **stationary and ergodic**.
>
> **Role:** A1 fixes the model CV is applied to and "ensures that no misspecification is considered in our setup" (p. 6). The paper adds: "Note that (3) is a standard AR(p) process and our setup covers common applications of CV for dependent data" (p. 6). That is, the linear AR($p$) model is the special case $g(\mathbf x_t,\theta)=\phi_0+\sum_{i=1}^p\phi_i y_{t-i}$, and the authors present the nonlinear form as covering the usual uses of CV on dependent data. Under regularity conditions (Mokkadem 1988), $\{y_t\}$ is **strong mixing**:
> - (a) $|P(A\cap B)-P(A)P(B)|\le\alpha(k)P(A)$ for all $A\in\mathcal F_t$, $B\in\mathcal F_{t+k}$, any $t,k$;
> - (b) $\sum_{k\ge1}\alpha(k)<\infty$.
^asm-a1

> [!definition] Assumption A2: consistency of nonlinear least squares
> $\hat\theta_{-t}$ is a consistent estimator of $\theta$.
>
> By stationarity, the conditions for consistency of $\hat\theta$ and $\hat\theta_{-t}$ are equivalent. One sufficient set (following Andrews 1987):
> - (i) the parameter space $\Theta$ is a compact subset of $\mathbb R^k$;
> - (ii) $g(\cdot,\theta)$ is continuous and differentiable in $\theta$ for all $(y_t,\mathbf x_t)$;
> - (iii) $\frac{1}{n-p-1}Q_{-t}(\theta)\xrightarrow{p}Q(\theta)$ uniformly in $\theta$, where $Q(\theta)$ is a nonstochastic function with a unique minimum at $\theta=\theta_0$.
^asm-a2

> [!definition] Assumption A3: errors are a martingale difference sequence (MDS)
> The disturbances $\{\varepsilon_t\}$ satisfy:
> - (i) $\{\varepsilon_t,\mathcal F_t\}$ is a martingale difference sequence, where $\mathcal F_t$ is the sigma field generated by $\{\varepsilon_s,y_s;s\le t\}$. I.i.d. errors are an MDS.
> - (ii) $\operatorname{var}(\varepsilon_t\mid\mathbf x_t)=\sigma^2$ and $E|\varepsilon_t|^{4+\delta}<K$ for some $K<\infty$ and $\delta>0$.
> - (iii) $\{\varepsilon_t\}$ has an absolutely continuous distribution with respect to Lebesgue measure. This holds for the usual error distributions, including the normal.
>
> **Role:** "A3.(i) ensures that errors are serially uncorrelated, which will be the key component for the success of the cross-validation" (p. 6).
>
> **Strength:** A2 and A3 "are not strong assumptions but rather are standard ones, e.g., when Machine Learning methods are used for prediction" (p. 6).
>
> **Counterexample to A3:** "errors with discrete values, say $\varepsilon_t\in\{-1,1\}$ do not satisfy A3" (p. 6).
^asm-a3

### The theorem

> [!theorem] Theorem 1 (§3, eq. (4), p. 6)
> Suppose that Assumptions A1-A3 hold. Then
> $$\widehat{\mathrm{PE}}\xrightarrow{\;p\;}\mathrm{PE}.$$
> The same conclusion holds for K-fold CV over rows of the embedded matrix (the paper treats the extension as straightforward, p. 4).
>
> **Proof sketch** (full version in [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]):
> 1. Following Burman & Nolan (1992), write PE and $\widehat{\mathrm{PE}}$ each as a variance term, a squared-bias term and a noise term $\int\varepsilon^2$.
> 2. The bias and noise terms agree asymptotically.
> 3. The variance term of PE equals a diagonal sum $\frac{1}{n-p}\sum\tilde\varepsilon_j^2$ plus an off-diagonal double sum $\sum_{j\neq t}\tilde\varepsilon_j\tilde\varepsilon_t$.
> 4. Because whole rows are left out and the errors are an MDS, the off-diagonal sum is a martingale whose normalised fourth moment vanishes (Lemma 1). So it converges to zero in probability, and the diagonal sum matches $\widehat{\mathrm{PE}}$'s variance term.
^thm-1

### When the assumptions fail (pp. 6-7)

The CV method "makes use of features of residuals", so "residuals should emulate error terms for the success of this type of CV" (p. 6).

- **A1 violated (misspecification).** "The residuals will no longer have zero serial correlation. Then, the violation of A3 follows naturally since $\varepsilon_t$ is no longer a MDS, which renders Lemma 1 in the appendix invalid. Therefore, the CV does not work any longer" (pp. 6-7).
- **A2 violated (inconsistent estimator).** The paper writes: "Because A2 ensures that $\widehat{\mathrm{PE}}$ approximates PE closely through consistency of the OLS estimator of φ, its violation invalidates the proposed CV not only for the dependent setup but also even for the independent setup" (p. 7).
  > [!warning] Notation slip in the source (p. 7)
  > The sentence speaks of "the OLS estimator of φ". The setup of §3 is **nonlinear least squares** for a generic parameter $\theta$ (A2 is titled "Consistency of the Nonlinear Least Squares", and $\hat\theta_{-t}$ solves the estimating equation $q(\hat\theta_{-t})=0$). "OLS" and "φ" belong to the linear AR($p$) special case, where $\theta=\phi$ and NLS reduces to OLS. Read the sentence as "consistency of the least-squares estimator $\hat\theta$ (and $\hat\theta_{-t}$)". This is the vault's reading; the paper does not comment on it.
- **A3 violated directly.** The paper's only explicit counterexample is **discrete errors**: "errors with discrete values, say $\varepsilon_t\in\{-1,1\}$ do not satisfy A3" (p. 6), because they break A3(iii). It also implies that serially correlated errors break A3(i) (through the A1 discussion above).
  - *Vault inference, not stated in the paper:* errors whose conditional variance changes with $\mathbf x_t$ (conditional heteroskedasticity) break A3(ii)'s $\operatorname{var}(\varepsilon_t\mid\mathbf x_t)=\sigma^2$, and heavy-tailed errors without a finite $4+\delta$ moment break A3(ii)'s moment bound. In either case the Burkholder step of Lemma 1 loses its justification as written. Whether CV actually fails in those cases is not studied in the paper. (Note that a GARCH-type error is still an MDS, so A3(i) alone would survive.)

> [!theorem] Scope of the result (§3, p. 7)
> Provided the errors are serially uncorrelated, Theorem 1 covers linear or nonlinear parametric regression. Its validity "is extended to models considered 'nonparametric' such as regression splines, smoothing splines, locally polynomial regression, and neural networks, which can all be represented by (3)" (p. 7).
>
> §4.4 (p. 9) adds that results "would not change much" for support vector regression or random forests. The argument concerns the residuals, whose features (zero mean, zero correlation) are universal across model families.
^thm-scope

### Overfitting vs underfitting: the asymmetry

Reading A1 and A3 together gives the paper's practical message (pp. 2-3):

| Situation | A1 (correct spec.) | A3 (white errors) | CV status |
|---|---|---|---|
| Model equals the DGP | ✓ | ✓ | valid |
| Model **nests** the DGP (too many lags, flexible learner) | ✓ (true $g$ inside the class) | ✓ | valid. CV can detect the overfitting |
| Model approximates the DGP well (e.g. AR($p$) for MA(1)) | approximately | approximately | works well empirically (Exp. 2) |
| Model **underfits** (missing seasonal lag, too few lags) | ✗ | ✗ (residual autocorrelation) | biased: CV underestimates error |
| Exogenous persistent regressors | outside eq. (3) | often ✗ | not covered. Use time-ordered evaluation |

The last row is not discussed in the paper. It is the vault's extension, developed in [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]].

## Examples

> [!example] Why underfitting breaks the MDS condition
> **Setup:** the DGP is $y_t=0.7y_{t-12}+u_t$ with i.i.d. $u_t$, and the fitted model is AR(1): $y_t=\phi y_{t-1}+e_t$.
>
> **Step 1, the fit:** the best AR(1) approximation has $\phi\approx\operatorname{corr}(y_t,y_{t-1})\approx0$, so $e_t\approx y_t$.
>
> **Step 2, the residuals:** $\operatorname{corr}(e_t,e_{t-12})\approx0.7$. The residuals are strongly autocorrelated at lag 12 and are not an MDS, so A3(i) fails.
>
> **Step 3, the leak:** a test row at time $t$ sits next to training rows at $t\pm12$ (and others) whose errors are correlated with its own. The flexible fit partly absorbs this shared component, so the held-out error looks smaller than true out-of-sample error.
>
> **Result:** CV is optimistic, as in Experiment 3 of [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] (5-fold CV MPAE from $-43.5$ to $-95.2$). A Ljung-Box test on the pooled out-of-fold residuals at 20+ lags flags the problem.
^ex-underfit-mds

## Connections

- [[Cross Validation Checking]]: LOO-CV in the exchangeable setting; this theorem is its dependent-data analogue.
- [[Model Testing and Specification]] and [[Single Marketing Time Series]]: residual whiteness diagnostics that make A3 checkable.
- [[Model Selection and Overfitting]]: CV as a guard against overfitting. The theorem shows the guard stays valid for autoregressions.
- [[Spurious Regression and Nonsense Correlations]]: what happens with persistent exogenous regressors, which are outside eq. (3).
- [[Q - Exchangeability and What Replaces It When It Fails]]: the broader map of exchangeability failures.

## See Also

- [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]: Appendix A.
- [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]: empirical confirmation and the counterexample.
- [[Out-of-Sample Validation for Time-Series Models]]: what to do when the conditions fail.
