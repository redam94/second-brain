---
title: "Granger 2003 - Spurious Regression Monte Carlo in Python"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/econometrics
  - topic/cointegration
  - topic/simulation
  - type/example
  - method/python
  - doc/paper
source: "[[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]"
source_location: "Illustrates Granger (2003) Nobel Lecture p. 363 (spurious regression, ECM remedy) and p. 361 (cointegration); designs follow Yule (1926) and Granger & Newbold (1974), citation only. Code and numbers are original to this vault (NumPy 2.2.6, SciPy 1.15.2), not from the lecture."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Granger 2003 - Spurious Regression and Cointegration"
doc_type: paper
depends_on:
  - "[[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]"
  - "[[Granger 2003 - Cointegration and the Error-Correction Representation]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Granger 2003 - Spurious Regression and Cointegration - Overview]]"
aliases:
  - Spurious Regression Simulation
  - Random Walk Regression Monte Carlo
  - Granger-Newbold Simulation in Python
---

# Granger 2003 - Spurious Regression Monte Carlo in Python

> [!summary]
> A single reproducible NumPy/SciPy script (seeded) that demonstrates every quantitative claim around Granger's p. 363 account of spurious regression: (1) independent random walks regressed in **levels** reject a true null 67-90% of the time at nominal 5%, with $|t|$ growing like $\sqrt{T}$, $R^2 \approx 0.24$ that never shrinks and DW $\to 0$, while **differencing** restores 4-6% size; (2) a Granger-Newbold design with 1-5 random-walk regressors at $T=50$ pushes the joint $F$-test rejection rate from 67% to 98%; (3) Yule's three shapes of the correlation distribution for $I(0)$, $I(1)$, $I(2)$ series; (4) the Engle-Granger residual test separates a spurious pair (4% rejection) from a cointegrated pair (100%); (5) the two-step ECM recovers adjustment speed $-0.5$ and short-run effect $2.0$. A companion plotting script draws a sample spurious pair, Yule's three histograms and the $\sqrt{T}$ growth of the spurious $t$.

## Overview

The lecture describes the Granger-Newbold result in words only ("a small simulation published in 1974", p. 363). This note turns it — and the surrounding theory in [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] and [[Granger 2003 - Cointegration and the Error-Correction Representation]] — into a simulation study, written in the aims / data-generating mechanisms / estimands / methods / performance-measures structure of [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

| ADEMP element | This study |
|---|---|
| **Aims** | Show the size distortion of OLS inference with independent $I(1)$ series; show that differencing and cointegration-based methods fix it |
| **Data-generating mechanisms** | Gaussian random walks $x_t=\sum_{s\le t}\varepsilon_s$; $T\in\{10,50,100,200,500\}$; independent pairs, $k=1..5$ independent regressors, once/twice-cumulated noise, and a cointegrated pair $y_t = 1 + 2x_t + u_t$, $u_t = 0.5u_{t-1}+\varepsilon_t$ |
| **Estimands** | slope $\beta$ (true 0 for spurious pairs, 2 for the cointegrated pair); ECM adjustment $\gamma=-0.5$ and impact $\delta=2$ |
| **Methods** | OLS in levels; OLS in first differences; joint $F$-test; sample correlation; Engle-Granger residual ADF test; two-step ECM |
| **Performance measures** | rejection rate (empirical size/power), median $\lvert t\rvert$, mean $R^2$, median DW, $\Pr(R^2>DW)$, mean and SD of estimates |

Replications: 5,000 (Exp. 1-2), 20,000 (Exp. 3), 2,000 (Exp. 4-5). Monte Carlo SE of a rejection rate $p$ is $\sqrt{p(1-p)/R}$, e.g. $\sqrt{0.67\cdot0.33/5000}\approx 0.007$; all differences discussed below are many MC SEs apart.

## Main Content

### The script

Save as `spurious_sim.py` and run `python spurious_sim.py` (requires `numpy`, `scipy`). Output is printed as markdown table rows.

```python
import numpy as np
import scipy.stats as st

def ols(y, X):
    """OLS with intercept already in X. Returns beta, t-stats, R2, DW."""
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    resid = y - X @ beta
    n, k = X.shape
    s2 = resid @ resid / (n - k)
    se = np.sqrt(s2 * np.diag(np.linalg.inv(X.T @ X)))
    r2 = 1 - resid @ resid / np.sum((y - y.mean()) ** 2)
    dw = np.sum(np.diff(resid) ** 2) / (resid @ resid)
    return beta, beta / se, r2, dw, resid

def add_const(*cols):
    return np.column_stack([np.ones(len(cols[0]))] + list(cols))

# ---- Experiment 1: two independent random walks, levels vs differences ----
def exp1(n, reps=5000, seed=0):
    rng = np.random.default_rng(seed)
    rows = {"levels": [], "differences": []}
    for _ in range(reps):
        x = np.cumsum(rng.standard_normal(n))
        y = np.cumsum(rng.standard_normal(n))
        _, t, r2, dw, _ = ols(y, add_const(x))
        rows["levels"].append((t[1], r2, dw))
        _, t, r2, dw, _ = ols(np.diff(y), add_const(np.diff(x)))
        rows["differences"].append((t[1], r2, dw))
    for k, v in rows.items():
        t, r2, dw = map(np.array, zip(*v))
        print(f"| {n} | {k} | {np.mean(np.abs(t) > 1.96):.2f} | {np.median(np.abs(t)):.2f} | "
              f"{r2.mean():.2f} | {np.median(dw):.2f} | {np.mean(r2 > dw):.2f} |")

# ---- Experiment 2: Granger-Newbold style, k independent random-walk regressors, T=50 ----
def exp2(n=50, reps=5000, seed=1):
    rng = np.random.default_rng(seed)
    for k in range(1, 6):
        rej, r2s, dws = [], [], []
        for _ in range(reps):
            y = np.cumsum(rng.standard_normal(n))
            Xs = np.cumsum(rng.standard_normal((n, k)), axis=0)
            X = add_const(*Xs.T)
            beta, t, r2, dw, resid = ols(y, X)
            # joint F test of all slopes = 0
            rss1 = resid @ resid
            rss0 = np.sum((y - y.mean()) ** 2)
            F = ((rss0 - rss1) / k) / (rss1 / (n - k - 1))
            rej.append(F)
            r2s.append(r2); dws.append(dw)
        crit = st.f.ppf(0.95, k, n - k - 1)
        print(f"| {k} | {np.mean(np.array(rej) > crit):.2f} | {np.mean(r2s):.2f} | {np.median(dws):.2f} |")

# ---- Experiment 3: Yule-style sampling distribution of correlation ----
def exp3(n=10, reps=20000, seed=2):
    rng = np.random.default_rng(seed)
    for order, name in [(0, "white noise I(0)"), (1, "random walk I(1)"), (2, "twice-cumulated I(2)")]:
        rs = []
        for _ in range(reps):
            x = rng.standard_normal(n); y = rng.standard_normal(n)
            for _ in range(order):
                x = np.cumsum(x); y = np.cumsum(y)
            rs.append(np.corrcoef(x, y)[0, 1])
        rs = np.array(rs)
        print(f"| {name} | {n} | {np.mean(np.abs(rs) > 0.5):.2f} | {np.mean(np.abs(rs) > 0.9):.2f} | {np.std(rs):.2f} |")

# ---- Experiment 4: a genuinely cointegrated pair vs spurious pair (Engle-Granger step 2) ----
def adf_t(e, lags=1):
    """Dickey-Fuller t on residuals: de_t = rho e_{t-1} + sum gamma de_{t-j}; no constant."""
    de = np.diff(e)
    Y = de[lags:]
    cols = [e[lags:-1]] + [de[lags - j:-j] for j in range(1, lags + 1)]
    X = np.column_stack(cols)
    beta, *_ = np.linalg.lstsq(X, Y, rcond=None)
    r = Y - X @ beta
    s2 = r @ r / (len(Y) - X.shape[1])
    se = np.sqrt(s2 * np.linalg.inv(X.T @ X)[0, 0])
    return beta[0] / se

def exp4(n=200, reps=2000, seed=3, crit=-3.37):
    # crit: approx. 5% Engle-Granger critical value, 2 variables with constant (MacKinnon), T~200
    rng = np.random.default_rng(seed)
    res = {"independent RWs": [], "cointegrated (y = 2x + AR(1) error)": []}
    for _ in range(reps):
        x = np.cumsum(rng.standard_normal(n))
        y_ind = np.cumsum(rng.standard_normal(n))
        u = np.zeros(n)
        eps = rng.standard_normal(n)
        for t in range(1, n):
            u[t] = 0.5 * u[t - 1] + eps[t]
        y_coint = 1.0 + 2.0 * x + u
        for k, y in [("independent RWs", y_ind), ("cointegrated (y = 2x + AR(1) error)", y_coint)]:
            beta, t, r2, dw, e = ols(y, add_const(x))
            res[k].append((beta[1], r2, dw, adf_t(e) < crit))
    for k, v in res.items():
        b, r2, dw, rej = map(np.array, zip(*v))
        print(f"| {k} | {np.median(b):.2f} | {np.std(b):.3f} | {r2.mean():.2f} | {np.median(dw):.2f} | {rej.mean():.2f} |")


# ---- Experiment 5: two-step Engle-Granger ECM on the cointegrated pair ----
def exp5(n=200, reps=2000, seed=4):
    rng = np.random.default_rng(seed)
    out = []
    for _ in range(reps):
        x = np.cumsum(rng.standard_normal(n))
        u = np.zeros(n); eps = rng.standard_normal(n)
        for t in range(1, n):
            u[t] = 0.5 * u[t - 1] + eps[t]
        y = 1.0 + 2.0 * x + u
        b = ols(y, add_const(x))[0]
        z = y - b[0] - b[1] * x                       # step 1: equilibrium error
        dy, dx = np.diff(y), np.diff(x)
        beta, t, r2, dw, _ = ols(dy, add_const(z[:-1], dx))   # step 2: ECM
        out.append((beta[1], beta[2], t[1]))
    g, d, tg = map(np.array, zip(*out))
    print(f"| gamma (adjustment, true -0.5) | {g.mean():.3f} | {g.std():.3f} |")
    print(f"| delta (short-run, true 2.0) | {d.mean():.3f} | {d.std():.3f} |")
    print(f"| median t(gamma) | {np.median(tg):.2f} | |")

if __name__ == "__main__":
    print("Exp1"); [exp1(n) for n in (50, 100, 500)]
    print("Exp2"); exp2()
    print("Exp3"); exp3()
    print("Exp4"); exp4()
    print("Exp5"); exp5()
```

### Experiment 1 — levels vs differences ($T = 50, 100, 500$; 5,000 reps; seed 0)

> [!example] Independent random walks, OLS of $y$ on $x$ ^ex-sim-exp1
> | $T$ | Regression | $\Pr(\lvert t\rvert>1.96)$ | median $\lvert t\rvert$ | mean $R^2$ | median DW | $\Pr(R^2>DW)$ |
> |---|---|---|---|---|---|---|
> | 50 | levels | 0.67 | 3.14 | 0.24 | 0.30 | 0.31 |
> | 50 | differences | 0.06 | 0.69 | 0.02 | 2.00 | 0.00 |
> | 100 | levels | 0.76 | 4.62 | 0.25 | 0.15 | 0.55 |
> | 100 | differences | 0.05 | 0.69 | 0.01 | 2.00 | 0.00 |
> | 500 | levels | 0.90 | 10.01 | 0.24 | 0.03 | 0.80 |
> | 500 | differences | 0.04 | 0.67 | 0.00 | 2.00 | 0.00 |
>
> **Interpretation:** matches Phillips' asymptotics ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-phillips|theorem]]): size distortion grows with $T$; median $|t|$ scales like $\sqrt T$ (ratio 10.01/4.62 = 2.17 vs $\sqrt5 = 2.24$); $R^2$ converges to a non-degenerate distribution (mean $\approx 0.24$); DW $\to 0$; the $R^2>DW$ flag ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-r2-dw|rule of thumb]]) catches more spurious fits as $T$ grows. Differenced regressions have correct size (0.04-0.06), median $|t| \approx 0.67$ (the $|N(0,1)|$ median is 0.674) and DW $= 2$.

### Experiment 2 — Granger-Newbold design with $k$ regressors ($T = 50$; 5,000 reps; seed 1)

> [!example] One random walk on $k$ independent random walks; joint $F$-test of all slopes $= 0$ at 5% ^ex-sim-exp2
> | $k$ regressors | rejection rate | mean $R^2$ | median DW |
> |---|---|---|---|
> | 1 | 0.67 | 0.25 | 0.30 |
> | 2 | 0.85 | 0.40 | 0.42 |
> | 3 | 0.92 | 0.51 | 0.55 |
> | 4 | 0.95 | 0.58 | 0.68 |
> | 5 | 0.98 | 0.65 | 0.80 |
>
> **Interpretation:** the qualitative Granger-Newbold (1974) finding — rejection of a true null in most replications with one regressor, approaching certainty with five — is reproduced; mean $R^2$ climbs to 0.65 from pure noise. DW rises with $k$ only because more regressors absorb more of the wandering; it stays far below 2 and the $R^2>DW$ pattern is typical.

### Experiment 3 — Yule's correlation shapes ($T = 10$; 20,000 reps; seed 2)

> [!example] Sampling distribution of $r(x,y)$ for independent series of three integration orders ^ex-sim-exp3
> | Series type | $T$ | $\Pr(\lvert r\rvert>0.5)$ | $\Pr(\lvert r\rvert>0.9)$ | SD of $r$ |
> |---|---|---|---|---|
> | white noise $I(0)$ | 10 | 0.14 | 0.00 | 0.33 |
> | random walk $I(1)$ | 10 | 0.43 | 0.02 | 0.52 |
> | twice-cumulated $I(2)$ | 10 | 0.84 | 0.50 | 0.82 |
>
> **Interpretation:** Yule's (1926) three cases (described in [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]): concentrated around 0 for random series; spread over most of $(-1,1)$ once cumulated; U-shaped with half the mass beyond $|r|>0.9$ when cumulated twice. Yule's 0.95 church-marriage/mortality correlation is ordinary under the $I(2)$-like row.

### Experiment 4 — Engle-Granger test, spurious vs cointegrated ($T = 200$; 2,000 reps; seed 3)

> [!example] Levels OLS plus ADF(1) test on residuals, 5% critical value $\approx -3.37$ ^ex-sim-exp4
> *Critical value:* $-3.37$ is the finite-sample ($T \approx 200$) Engle-Granger/MacKinnon 5% value for two variables with a constant. The asymptotic value, about $-3.34$, is the one quoted in [[Granger 2003 - Cointegration and the Error-Correction Representation#^alg-engle-granger|the Engle-Granger algorithm]].
>
> | Pair | median $\hat\beta$ | SD of $\hat\beta$ | mean $R^2$ | median DW | EG rejects "no cointegration" |
> |---|---|---|---|---|---|
> | independent RWs (true $\beta = 0$) | 0.02 | 0.621 | 0.24 | 0.07 | 0.04 |
> | cointegrated, $y=1+2x+u$, $u\sim AR(1)$, $\phi=0.5$ | 2.00 | 0.032 | 0.98 | 1.04 | 1.00 |
>
> **Interpretation:** $\hat\beta$ in the spurious case is centred near 0 but with SD 0.62 that does **not** shrink with $T$ (Phillips); in the cointegrated case it is **superconsistent** (SD 0.03). The residual unit-root test, with Engle-Granger rather than Dickey-Fuller critical values (approximately the MacKinnon value for two variables with a constant), holds its size (0.04) and has full power here. DW alone would not separate them perfectly at small $T$, but the gap (0.07 vs 1.04) is large.

### Experiment 5 — two-step ECM on the cointegrated pair ($T = 200$; 2,000 reps; seed 4)

> [!example] $\Delta y_t = \mu + \gamma \hat z_{t-1} + \delta \Delta x_t + \varepsilon_t$ with $\hat z_t = y_t - \hat\alpha - \hat\beta x_t$ ^ex-sim-exp5
> | Parameter | Mean estimate | SD |
> |---|---|---|
> | $\gamma$ (adjustment, true $-0.5$) | $-0.522$ | 0.063 |
> | $\delta$ (short-run, true $2.0$) | 1.999 | 0.074 |
> | median $t(\hat\gamma)$ | $-8.25$ | — |
>
> **Interpretation:** the [[Granger 2003 - Cointegration and the Error-Correction Representation#^alg-engle-granger|Engle-Granger two-step]] recovers the error-correction dynamics with a small finite-sample bias in $\gamma$ (about $-0.02$, from using estimated $\hat z$). This is Granger's "Putting the analysis in the form of an error-correction model resolves many of the difficulties found with spurious regression" (p. 363) in numbers.

### Figures — what Granger chose not to draw

Granger replaced diagrams with "internal visualization" (p. 360; see [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]]). The three figures below make the simulation's claims visible. A second, self-contained script produces them: save it as `spurious_plots.py` and run `python spurious_plots.py <output_dir>` (requires `numpy`, `matplotlib`; about 15 s). Figure 2 uses the same seed and generator as Experiment 3, so its numbers match that table exactly.

```python
"""Figures for the spurious-regression note. Requires numpy, matplotlib.
Writes three PNGs into the directory given as argv[1] (default: current dir)."""
import sys, os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = sys.argv[1] if len(sys.argv) > 1 else "."
BLUE, ORANGE = "#2a78d6", "#eb6834"
INK, MUTED, SURFACE, GRID = "#0b0b0b", "#52514e", "#fcfcfb", "#e4e3df"
plt.rcParams.update({
    "figure.facecolor": SURFACE, "axes.facecolor": SURFACE,
    "axes.edgecolor": MUTED, "axes.labelcolor": INK, "text.color": INK,
    "xtick.color": MUTED, "ytick.color": MUTED, "axes.grid": True,
    "grid.color": GRID, "grid.linewidth": 0.8, "axes.spines.top": False,
    "axes.spines.right": False, "font.size": 10,
})

def ols_t(y, x):
    X = np.column_stack([np.ones_like(x), x])
    b, *_ = np.linalg.lstsq(X, y, rcond=None)
    e = y - X @ b
    s2 = e @ e / (len(y) - 2)
    se = np.sqrt(s2 * np.linalg.inv(X.T @ X)[1, 1])
    r2 = 1 - e @ e / np.sum((y - y.mean()) ** 2)
    return b, b[1] / se, r2

# Figure 1: one spurious pair (first draw from seed 0; not selected for drama
# beyond taking the first draw of the generator)
rng = np.random.default_rng(0)
T = 100
x = np.cumsum(rng.standard_normal(T)); y = np.cumsum(rng.standard_normal(T))
b, t, r2 = ols_t(y, x)
fig, ax = plt.subplots(1, 2, figsize=(10, 3.8))
ax[0].plot(x, color=BLUE, lw=2, label="x (random walk)")
ax[0].plot(y, color=ORANGE, lw=2, label="y (independent random walk)")
ax[0].set_xlabel("t"); ax[0].set_ylabel("level"); ax[0].legend(frameon=False)
ax[0].set_title("Two independent random walks, T = 100", loc="left")
ax[1].scatter(x, y, s=16, color=BLUE, edgecolor=SURFACE, linewidth=0.8)
xs = np.linspace(x.min(), x.max(), 2)
ax[1].plot(xs, b[0] + b[1] * xs, color=INK, lw=2)
ax[1].set_xlabel("x"); ax[1].set_ylabel("y")
ax[1].set_title(f"Levels OLS: slope {b[1]:.2f}, t = {t:.1f}, R² = {r2:.2f}", loc="left")
fig.tight_layout(); fig.savefig(os.path.join(OUT, "Granger 2003 - spurious pair.png"), dpi=150)
print(f"Fig1 slope={b[1]:.3f} t={t:.2f} R2={r2:.3f}")

# Figure 2: Yule's three shapes (same generator as Experiment 3: seed 2, 20,000 reps, T=10)
rng = np.random.default_rng(2)
n, reps = 10, 20000
fig, ax = plt.subplots(1, 3, figsize=(10, 3.2), sharey=True)
for i, (order, name) in enumerate([(0, "white noise I(0)"), (1, "random walk I(1)"),
                                   (2, "twice-cumulated I(2)")]):
    rs = np.empty(reps)
    for r in range(reps):
        a = rng.standard_normal(n); c = rng.standard_normal(n)
        for _ in range(order):
            a = np.cumsum(a); c = np.cumsum(c)
        rs[r] = np.corrcoef(a, c)[0, 1]
    ax[i].hist(rs, bins=np.linspace(-1, 1, 41), color=BLUE, edgecolor=SURFACE, linewidth=1)
    ax[i].set_title(f"{name}\nSD(r) = {rs.std():.2f}", loc="left")
    ax[i].set_xlabel("sample correlation r (T = 10)")
    print(f"Fig2 {name}: P(|r|>0.9)={np.mean(np.abs(rs)>0.9):.2f} SD={rs.std():.2f}")
ax[0].set_ylabel("count of 20,000 pairs")
fig.tight_layout(); fig.savefig(os.path.join(OUT, "Granger 2003 - Yule correlation shapes.png"), dpi=150)

# Figure 3: median |t| in levels vs differences against T, with sqrt(T) reference
rng = np.random.default_rng(5)
Ts = [25, 50, 100, 200, 400, 800]
lev, dif = [], []
for T in Ts:
    tl, td = [], []
    for _ in range(2000):
        x = np.cumsum(rng.standard_normal(T)); y = np.cumsum(rng.standard_normal(T))
        tl.append(abs(ols_t(y, x)[1])); td.append(abs(ols_t(np.diff(y), np.diff(x))[1]))
    lev.append(np.median(tl)); dif.append(np.median(td))
    print(f"Fig3 T={T}: median|t| levels={lev[-1]:.2f} differences={dif[-1]:.2f}")
fig, ax = plt.subplots(figsize=(6.5, 4))
ax.plot(Ts, lev, "o-", color=BLUE, lw=2, ms=8, label="levels (spurious)")
ax.plot(Ts, dif, "o-", color=ORANGE, lw=2, ms=8, label="first differences")
ref = lev[0] * np.sqrt(np.array(Ts) / Ts[0])
ax.plot(Ts, ref, "--", color=MUTED, lw=1.5, label="∝ √T reference")
ax.axhline(1.96, color=MUTED, lw=1, ls=":")
ax.text(Ts[-1], 1.75, "|t| = 1.96", color=MUTED, ha="right")
ax.set_xscale("log"); ax.set_yscale("log")
ax.set_xticks(Ts); ax.set_xticklabels([str(t) for t in Ts])
ax.set_xlabel("sample size T (log scale)"); ax.set_ylabel("median |t| (log scale)")
ax.set_title("Spurious t grows like √T; differenced t does not", loc="left")
ax.legend(frameon=False)
fig.tight_layout(); fig.savefig(os.path.join(OUT, "Granger 2003 - t growth with T.png"), dpi=150)
```

Printed output (NumPy 2.2.6, Matplotlib 3.10.3):

```text
Fig1 slope=-0.270 t=-6.75 R2=0.318
Fig2 white noise I(0): P(|r|>0.9)=0.00 SD=0.33
Fig2 random walk I(1): P(|r|>0.9)=0.02 SD=0.52
Fig2 twice-cumulated I(2): P(|r|>0.9)=0.50 SD=0.82
Fig3 T=25: median|t| levels=2.20 differences=0.70
Fig3 T=50: median|t| levels=3.25 differences=0.67
Fig3 T=100: median|t| levels=4.42 differences=0.68
Fig3 T=200: median|t| levels=6.66 differences=0.70
Fig3 T=400: median|t| levels=9.16 differences=0.67
Fig3 T=800: median|t| levels=12.56 differences=0.69
```

> [!example] Figure 1 — one spurious pair ^fig-sim-pair
> ![[Granger 2003 - spurious pair.png]]
> **Reading:** the first draw from seed 0, not a selected example. Two independent random walks of length 100 wander apart: $x$ drifts up and $y$ drifts down. The levels regression reports slope $-0.27$, $t = -6.8$ and $R^2 = 0.32$, a "highly significant" negative relationship between series that share nothing. The scatter shows the cause: consecutive points are joined in time, so the cloud is a few long excursions, not 100 independent observations. That is Granger's string of pearls (p. 360).

> [!example] Figure 2 — Yule's three correlation shapes ($T = 10$, 20,000 pairs each) ^fig-sim-yule
> ![[Granger 2003 - Yule correlation shapes.png]]
> **Reading:** the histograms behind [[#^ex-sim-exp3|Experiment 3]]. White noise gives a hump centred on 0 (SD 0.33, close to $1/\sqrt{10-1}$). Random walks give an almost flat distribution over $(-1, 1)$ (SD 0.52). Twice-cumulated series give a U shape with half the mass beyond $|r| > 0.9$ (SD 0.82). These are the bell, flat and U shapes Yule (1926) reported for random series, conjunct series with random differences, and conjunct series with conjunct differences; his own SDs were about 0.32 and 0.51-0.55 for the first two ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]).

> [!example] Figure 3 — the spurious $t$ grows like $\sqrt{T}$ (2,000 pairs per $T$, seed 5) ^fig-sim-tgrowth
> ![[Granger 2003 - t growth with T.png]]
> **Reading:** on log-log axes the median levels $|t|$ follows the dashed $\sqrt{T}$ reference line from 2.2 at $T = 25$ to 12.6 at $T = 800$, as [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-phillips|Phillips (1986)]] predicts. The differenced regression stays flat near 0.67-0.70, the median of $|N(0,1)|$. More data makes the spurious finding *more* convincing, which is why a larger sample is no protection.

## Examples

> [!example] Adapting the script as a persistence-matched null for a real analysis ^ex-sim-adapt
> **Setup:** an MMM or driver regression of a weekly KPI ($T \approx 104$) on a candidate series returns $t = 5.1$ in levels.
>
> **Steps:** (1) fit an AR(1) or ARIMA(0,1,0) to the candidate series; (2) generate 2,000 surrogate candidates from that fitted process, independent of the KPI; (3) rerun the *same* regression (same controls, same transformations) with each surrogate; (4) report where 5.1 falls in the surrogate distribution of $|t|$. With random-walk-like candidates at $T \approx 100$, the median surrogate $|t|$ is about 4.6 (Exp. 1), so $t = 5.1$ is unremarkable — evidence comparable to a coin flip, not to $p < 10^{-6}$.
>
> **Why it works:** the null distribution inherits the persistence that invalidates the textbook $t$ distribution. The same logic (calibrate a procedure on data where the truth is known) underlies [[Designing Simulated-Data Experiments]] and [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]].

## Connections

- Theory being illustrated: [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]], [[Granger 2003 - Cointegration and the Error-Correction Representation]].
- Simulation-study design and Monte Carlo error: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Designing Simulated-Data Experiments]].
- Time-ordered validation as the out-of-sample counterpart: [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Forecast Evaluation and Backtesting]].
- Marketing time-series modelling with unit roots: [[Single Marketing Time Series]], [[Multivariate Persistence and Cointegration]].

## See Also
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]] — source map
- [[Researcher Degrees of Freedom]] — why screening many trending candidates multiplies false positives
