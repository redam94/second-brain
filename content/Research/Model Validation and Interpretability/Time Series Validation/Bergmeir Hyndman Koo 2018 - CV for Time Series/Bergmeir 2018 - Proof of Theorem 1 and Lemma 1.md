---
title: "Bergmeir 2018 - Proof of Theorem 1 and Lemma 1"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - type/proof
  - type/theorem
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "Appendix A, Proof of Theorem 1, pp. 16-18: eq. (A.1)-(A.5) p. 16; Lemma 1 and proof, eq. (A.6)-(A.7), pp. 17-18"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
used_by:
  - "[[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]"
aliases:
  - Bergmeir Lemma 1
  - Proof of CV validity for autoregression
---

# Bergmeir 2018 - Proof of Theorem 1 and Lemma 1

> [!summary]
> Appendix A of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] proves that leave-one-out CV over rows of the embedded matrix is consistent. Following Burman & Nolan (1992), it decomposes both PE and its CV estimate into variance, squared-bias and noise terms. The noise and bias terms match asymptotically. The variance term of PE carries an extra **off-diagonal sum of error cross-products**. Lemma 1 shows that sum is a martingale whose normalised fourth moment vanishes, using Burkholder's inequality. This step needs the errors to be a martingale-difference sequence, which is why serially uncorrelated residuals are the crux.
^summary

## Overview

The proof is short and sketch-like, and it contains notation slips (switched indices, missing tildes, an $n^4$ bound looser than the argument needs); these are flagged in [[#Notation inconsistencies in the source proof]]. Several steps are stated as "with a bit of algebra" or "in the similar fashion as in the proof of Lemma 5.3 as in Burman and Nolan (1992)". Below, each step is given in the paper's notation, with comments where the original is terse. Notation follows [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]:
- $\tilde\varepsilon_j(\hat\theta)$ are errors on an independent copy of the process, evaluated at the full-sample fit;
- $\varepsilon_j(\hat\theta_{-t})$ are leave-one-out residuals;
- $F$ is the distribution of $\{\tilde y_k\}$;
- $F_n$ is the empirical distribution of the test sample.

## Main Content

### Step 1: decompose PE (eq. (A.1), p. 16)

Assume A1, so the AR order is $p$. Following Burman & Nolan (1992):
$$
\begin{aligned}
\mathrm{PE}&=\int\bigl[g(\tilde{\mathbf x},\hat\theta)-\tilde y\bigr]^2dF
\approx\int\bigl[g(\tilde{\mathbf x},\hat\theta)-g(\tilde{\mathbf x},\theta)\bigr]^2dF+\int\tilde\varepsilon^2\,dF\\
&=\int\bigl[g(\tilde{\mathbf x},\hat\theta)-Eg(\tilde{\mathbf x},\hat\theta)+Eg(\tilde{\mathbf x},\hat\theta)-g(\tilde{\mathbf x},\theta)\bigr]^2dF+\int\tilde\varepsilon^2\,dF .
\end{aligned}
$$
Expanding the square gives
$$
\mathrm{PE}\approx\underbrace{\int\bigl[g(\tilde{\mathbf x},\hat\theta)-Eg(\tilde{\mathbf x},\hat\theta)\bigr]^2dF}_{\text{variance}}+\underbrace{\int\bigl[Eg(\tilde{\mathbf x},\hat\theta)-g(\tilde{\mathbf x},\theta)\bigr]^2dF}_{\text{squared bias}}+\underbrace{\int\tilde\varepsilon^2\,dF}_{\text{noise}}.\tag{A.1}
$$
The $\approx$ in the first line drops the cross term between estimation error and the new noise $\tilde\varepsilon$. That cross term has mean zero because $\tilde\varepsilon$ is independent of $\hat\theta$.

### Step 2: decompose the CV estimate (eq. (A.2), p. 16)

In the same way:
$$
\widehat{\mathrm{PE}}\approx\frac{1}{n-p}\sum_{t=p+1}^{n}\bigl[g(\mathbf x_t,\hat\theta_{-t})-Eg(\mathbf x_t,\hat\theta_{-t})\bigr]^2+\int\bigl[Eg(\mathbf x,\hat\theta_{-t})-g(\mathbf x,\theta)\bigr]^2dF_n+\int\varepsilon^2\,dF_n .\tag{A.2}
$$
"The second and third terms of the above two equations, (A.1) and (A.2) are asymptotically identical" (p. 16), so only the first (variance) terms need comparison.

### Step 3: the extra off-diagonal term (eq. (A.3), p. 16)

The first term of (A.1) becomes
$$
\frac{1}{(n-p)^2}\sum_{t=p+1}^{n}\sum_{j=p+1}^{n}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)
=\frac{1}{n-p}\sum_{j=p+1}^{n}\tilde\varepsilon_j^2(\hat\theta)+\frac{1}{(n-p)(n-p-1)}\sum_{j=p+1}^{n}\sum_{\substack{t=p+1\\ t\neq j}}^{n}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta).\tag{A.3}
$$
The first term of (A.2) is $(n-p)^{-1}\sum_{j=p+1}^{n}\varepsilon_j^2(\hat\theta_{-t})$.
- **Diagonal parts.** The probability limit of the first term of (A.3) is asymptotically equivalent to that of the first term of (A.2).
- **Off-diagonal part.** "Due to leaving the entire row out, the second term of (A.3) is a martingale difference sequence that converges to zero in probability" (p. 16). This is Lemma 1.

### Step 4: the Burman-Nolan condition (eq. (A.4)-(A.5), p. 16)

The argument is "compatible with the condition Burman and Nolan (1992) provide under their setup", namely, for any $t<j$,
$$
E\bigl(\varepsilon_t\varepsilon_j\mid\mathbf x_1,\dots,\mathbf x_j\bigr)=0.\tag{A.4}
$$
Standard CV is therefore valid as long as
$$
E\sum_{t=p+1}^{n}\sum_{j=p+1}^{n}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)\approx E\sum_{j=p+1}^{n}\varepsilon_j^2(\hat\theta_{-t}),\tag{A.5}
$$
"which follows from Lemma 1".

### Lemma 1 (pp. 17-18)

> [!theorem] Lemma 1 (Appendix A, p. 17)
> Suppose that A1-A3 hold. Then there exists an arbitrarily small constant $c>0$ such that
> $$
> E\Bigl[\sum_{t=p+1}^{n}\sum_{j=p+1}^{n}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)-\sum_{j=p+1}^{n}\varepsilon_j^2(\hat\theta_{-t})\Bigr]^4\le c\,n^4 .
> $$
> Dividing the bracket by $n$ makes its fourth moment at most $c$, and $c$ can be taken arbitrarily small. By Markov's inequality, the normalised difference then converges to zero in probability, which gives (A.5) and Theorem 1. (How this "arbitrarily small $c$" phrasing relates to the actual rates is discussed in [[#^warn-n4]].)
^lemma-1

**Proof of Lemma 1.**

*Split (eq. (A.6), p. 17).*
$$
\sum_{t}\sum_{j}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)-\sum_j\varepsilon_j^2(\hat\theta_{-t})
=\underbrace{\sum_{j=p+1}^{n}\tilde\varepsilon_j^2(\hat\theta)-\sum_{j=p+1}^{n}\varepsilon_j^2(\hat\theta_{-t})}_{\text{A.6.1}}+\underbrace{\sum_{j=p+1}^{n}\sum_{\substack{t=p+1\\ j\neq t}}^{n}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)}_{\text{A.6.2}} .
$$

*Diagonal piece A.6.1.* Centre each sum:
$$
\text{A.6.1}=\underbrace{\sum_j\bigl(\tilde\varepsilon_j^2(\hat\theta)-E\tilde\varepsilon_j^2(\hat\theta)\bigr)}_{\text{A.6.1.1}}-\underbrace{\sum_j\bigl(\varepsilon_j^2(\hat\theta_{-t})-E\varepsilon_j^2(\hat\theta_{-t})\bigr)}_{\text{A.6.1.2}}+\underbrace{\sum_j\bigl(E\tilde\varepsilon_j^2(\hat\theta)-E\varepsilon_j^2(\hat\theta_{-t})\bigr)}_{\text{A.6.1.3}} .
$$
- **A.6.1.3** is of smaller order. $\tilde\varepsilon_j(\hat\theta)$ and $\varepsilon_j(\hat\theta_{-t})$ have the same distribution as long as both $\hat\theta$ and $\hat\theta_{-t}$ are consistent (A1, A2).
- **A.6.1.1** has martingale-difference summands. Burkholder's inequality gives (cleaned-up notation; see the warning below for the source's exact form)
$$
E\Bigl(\sum_{j=p+1}^{n}\bigl(\tilde\varepsilon_j^2(\hat\theta)-E\tilde\varepsilon_j^2(\hat\theta)\bigr)\Bigr)^4\le c\,E\Bigl(\sum_{j=p+1}^{n}\bigl(\tilde\varepsilon_j^2(\hat\theta)-E\tilde\varepsilon_j^2(\hat\theta)\bigr)^2\Bigr)^2\le c\,n^2 .
$$
  The $4+\delta$ moment in A3(ii) keeps the squared summands' second moments bounded.
- **A.6.1.2** is analogous.

*Off-diagonal piece A.6.2.* By symmetry of the covariance matrix,
$$
\sum_{j}\sum_{t\neq j}\tilde\varepsilon_j(\hat\theta)\tilde\varepsilon_t(\hat\theta)=2\sum_{j=p+2}^{n}\tilde\varepsilon_j(\hat\theta)\sum_{t=p+1}^{j-1}\tilde\varepsilon_t(\hat\theta).
$$
The proof "boils down to showing that the impact of the covariance terms, that is, sum of the off-diagonal elements of the variance-covariance matrix becomes negligible" (p. 17):
$$
E\Bigl(\sum_j\sum_{t\neq j}\varepsilon_j(\hat\theta)\varepsilon_t(\hat\theta)\Bigr)^2=2E\Bigl[\sum_{j=p+2}^{n}\tilde\varepsilon_j(\hat\theta)\sum_{t=p+1}^{j-1}\tilde\varepsilon_t(\hat\theta)\Bigr]^2\le c\,n^4 .\tag{A.7}
$$
- $\{\tilde\varepsilon_t\}$ and $\{\varepsilon_t\}$ are stationary martingale difference sequences.
- A linear combination of martingales on the same filtration is again a martingale.
- "The proposed CV method exactly works towards ensuring the uncorrelatedness between residuals" (p. 18).

After omitting rows and applying the law of iterated expectations, (A.7) holds as in Lemma 5.3 of Burman & Nolan (1992). ∎

### Notation inconsistencies in the source proof

The printed appendix has several slips. The cleaned-up equations above silently harmonise some of them; this section records exactly what the PDF prints so the reader can check (p. 17).

> [!warning] Slips in the A.6.1.1 Burkholder chain (p. 17)
> As printed, the chain reads
> $$
> E\Bigl(\sum_{j=p+1}^{n}\tilde\varepsilon_j^2(\hat\theta)-E\varepsilon_j^2(\hat\theta)\Bigr)^4\le cE\Bigl(\sum_{t=1}^{n}\bigl(\tilde\varepsilon_j^2(\hat\theta)-E\tilde\varepsilon_j^2(\hat\theta)\bigr)^2\Bigr)^2\le cn^2 .
> $$
> - The **centring term switches** from $E\varepsilon_j^2(\hat\theta)$ (no tilde, left side) to $E\tilde\varepsilon_j^2(\hat\theta)$ (tilde, middle). A.6.1.1 was defined with $E\tilde\varepsilon_j^2(\hat\theta)$, so the tilde is intended throughout.
> - The **summation index switches** from $j=p+1,\dots,n$ to $t=1,\dots,n$ while the summand is still indexed by $j$. The intended sum is over $j=p+1,\dots,n$ (the rows of the embedded matrix).
> - The bound $cn^2$ is internally consistent: Burkholder gives $E|S_n|^4\le c\,E(\sum X_j^2)^2$, and with bounded second moments of $X_j^2$ (from the $4+\delta$ moment in A3(ii)) the right side is $O(n^2)$.
^warn-burkholder

> [!warning] Slips in (A.7) (p. 17)
> As printed, (A.7) reads
> $$
> E\Bigl|\sum_{j=p+1}^{n}\sum_{\substack{t=1\\ j\neq t}}^{n}\varepsilon_j(\hat\theta)\varepsilon_t(\hat\theta)\Bigr|^2=2E\Bigl[\sum_{j=p+2}^{n}\tilde\varepsilon_j(\hat\theta)\sum_{t=p+1}^{t<j}\tilde\varepsilon_t(\hat\theta)\Bigr]^2\le cn^4 .
> $$
> - The **left side uses $\varepsilon$**, not $\tilde\varepsilon$, while the right side and A.6.2 use $\tilde\varepsilon$.
> - The **inner sum on the left starts at $t=1$**; A.6.2 and the right side start at $t=p+1$.
> - The **factor 2 is misplaced**: $\bigl(\sum_{j\neq t}\bigr)^2=\bigl(2\sum_j\sum_{t<j}\bigr)^2=4\bigl(\sum_j\sum_{t<j}\bigr)^2$, so the constant should be 4 (harmless, as it is absorbed into $c$).
> - **The bound is a second moment bounded by $cn^4$**, while Lemma 1 bounds a *fourth* moment by $cn^4$.
^warn-a7

> [!warning] Reconciling the $n^4$ bound with the $O(n^2)$ argument
> The vault example below ([[#^ex-row-leave-out]]) argues that the second moment of the off-diagonal sum is $O(n^2)$: each summand $\tilde\varepsilon_j\sum_{t<j}\tilde\varepsilon_t$ is an MDS term with variance $\sigma^2\cdot(j-p-1)\sigma^2=O(n)$, the cross terms vanish, and there are $O(n)$ summands. The paper prints $cn^4$. How the two fit together:
> 1. **$O(n^2)$ implies $\le cn^4$** for large $n$, so the printed inequality is *true* but very loose.
> 2. **It is too loose to do the job by itself.** What the theorem needs is that the off-diagonal part of (A.3), which carries the factor $\frac{1}{(n-p)(n-p-1)}\approx n^{-2}$, vanishes. With the $O(n^2)$ second moment, the normalised term has second moment $O(n^{-2})\to0$. With only the printed $cn^4$ bound, the normalised term has second moment $\le c$, which does not go to zero unless "$c$ arbitrarily small" carries the argument, as the paper's Lemma 1 statement asserts.
> 3. **The same issue affects Lemma 1's statement.** A fourth moment $\le cn^4$ for the *unnormalised* bracket means the bracket is $O_p(n)$; divided by $n-p$ (the normalisation of $\widehat{\mathrm{PE}}$) it is $O_p(1)$, and convergence to zero again rests on "$c$ arbitrarily small" rather than on a rate.
>
> **Vault reading (not in the paper):** the sharper MDS calculation ($O(n^2)$ for the second moment of the off-diagonal sum; $O(n^2)$ for the fourth moment of the centred diagonal sums via Burkholder) is what actually delivers the result, and the printed $n^4$ exponents look like typographical overstatements. The conclusion of Theorem 1 is unaffected, but a reader checking the algebra should rely on the rate argument, not the printed constants.
^warn-n4

## Examples

> [!example] Why "leave the entire row out" matters for A.6.2
> Each summand $\tilde\varepsilon_j\sum_{t<j}\tilde\varepsilon_t$ is a martingale difference with respect to $\mathcal F_{j-1}$: given the past, $E[\tilde\varepsilon_j\mid\mathcal F_{j-1}]=0$ while $\sum_{t<j}\tilde\varepsilon_t$ is $\mathcal F_{j-1}$-measurable. Cross terms between different $j$ therefore have zero expectation, and the second moment is a sum of $O(n)$ terms of size $O(n)$, i.e. $O(n^2)$.
>
> Two things would break this:
> - **Correlated errors** (misspecification). Then $E[\tilde\varepsilon_j\mid\mathcal F_{j-1}]\neq0$, so the cross terms no longer cancel and the off-diagonal sum adds a non-vanishing bias.
> - **Deleting raw values instead of rows.** The test value $y_t$ would be removed from the predictors of rows $t+1,\dots,t+p$, so the training rows would no longer be the same regression problem. This is the mechanism behind naive CV's failure (§2, p. 2).
^ex-row-leave-out

## Connections

- The proof adapts Burman & Nolan (1992), "Data-dependent estimation of prediction functions", *J. Time Series Analysis* 13(3):189-207 (citation only, not in the vault).
- The variance-bias-noise decomposition parallels the expected-prediction-error decomposition behind [[Model Selection and Overfitting]] and [[Model Selection Using Predictive Performance]].
- Martingale-difference errors are the time-series counterpart of the exchangeability assumption discussed in [[Q - Exchangeability and What Replaces It When It Fails]].

## See Also

- [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]: statement and assumptions.
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]: the whole paper.
