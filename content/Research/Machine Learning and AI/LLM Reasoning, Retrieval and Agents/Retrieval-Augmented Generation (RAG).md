---
title: Retrieval-Augmented Generation (RAG)
tags:
  - source/ingested
  - topic/machine-learning
  - topic/llm
  - topic/retrieval
  - type/method
  - doc/paper
source: "[[raw/Lewis 2020 - Retrieval-Augmented Generation.pdf]]"
source_location: "Secs. 2-4, pp. 2-8; Appendix F-H, pp. 18-19"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/LLM Reasoning, Retrieval and Agents"
doc_type: paper
depends_on:
  - "[[Transformers and LLM Foundations - Overview]]"
used_by:
  - "[[LLM Reasoning, Retrieval and Agents - Overview]]"
  - "[[ReAct - Reasoning and Acting Agents]]"
  - "[[Tool Use and the Agent Loop]]"
  - "[[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]"
aliases:
  - RAG
  - Retrieval Augmented Generation
  - RAG-Sequence
  - RAG-Token
  - Parametric and Non-Parametric Memory
---

# Retrieval-Augmented Generation (RAG)

> [!summary]
> **RAG** (Lewis et al., NeurIPS 2020) couples a pre-trained seq2seq generator (BART-large, the **parametric memory**) with a dense vector index of Wikipedia accessed by a pre-trained neural retriever (DPR, the **non-parametric memory**). The retrieved passage $z$ is treated as a **latent variable**: the model marginalises the generator's output over the top-$K$ retrieved passages, either once per sequence (**RAG-Sequence**) or once per token (**RAG-Token**), and is trained end-to-end on input–output pairs with *no supervision on which documents to retrieve*. RAG set the state of the art on Natural Questions (44.5 EM), WebQuestions and CuratedTrec, generated text judged more factual than BART in 42.7% of pairs (vs 7.1% the other way), and its knowledge can be updated by **hot-swapping the index** without retraining.

## Overview

A pre-trained language model stores facts implicitly in its weights. Lewis et al. list three consequences (Sec. 1): such models "cannot easily expand or revise their memory, can't straightforwardly provide insight into their predictions, and may produce 'hallucinations'". Hybrid models address all three because the external memory can be edited, and the accessed passages can be inspected. Earlier hybrids (REALM, ORQA) only handled *extractive* QA; RAG brings the idea to general sequence-to-sequence generation, so one architecture covers open-domain QA, abstractive QA, question generation and fact verification.

The modern engineering usage of "RAG" — retrieve chunks, paste them into the prompt of a frozen LLM — is the degenerate case of this paper's model: concatenation is exactly how $z$ enters the generator (Sec. 2.3), but the marginalisation over documents and the gradient into the query encoder are usually dropped.

## Main Content

> [!definition] Components ^def-components
> - **Retriever** $p_\eta(z \mid x)$: a DPR bi-encoder,
> $$
> p_\eta(z \mid x) \propto \exp\!\big(\mathbf d(z)^{\top} \mathbf q(x)\big), \qquad \mathbf d(z) = \mathrm{BERT}_d(z), \quad \mathbf q(x) = \mathrm{BERT}_q(x).
> $$
> Finding $\text{top-}k\big(p_\eta(\cdot \mid x)\big)$ is a **Maximum Inner Product Search (MIPS)** problem, solved approximately in sub-linear time with a FAISS HNSW index.
> - **Generator** $p_\theta(y_i \mid x, z, y_{1:i-1})$: BART-large (400M parameters); $x$ and $z$ are simply concatenated.
> - **Non-parametric memory**: the December 2018 Wikipedia dump split into disjoint 100-word chunks, 21M documents, each embedded as a 728-dimensional vector (Sec. 3; Appendix G).

> [!definition] RAG-Sequence ^def-rag-sequence
> One latent document is responsible for the whole output. The generator scores the full sequence under each retrieved document and the results are mixed with the retriever's weights:
> $$
> p_{\text{RAG-Sequence}}(y \mid x) \approx \sum_{z \in \text{top-}k(p(\cdot \mid x))} p_\eta(z \mid x) \prod_{i=1}^{N} p_\theta(y_i \mid x, z, y_{1:i-1}).
> $$

> [!definition] RAG-Token ^def-rag-token
> A different latent document may be drawn for every target token, so the answer can combine content from several passages:
> $$
> p_{\text{RAG-Token}}(y \mid x) \approx \prod_{i=1}^{N} \sum_{z \in \text{top-}k(p(\cdot \mid x))} p_\eta(z \mid x)\, p_\theta(y_i \mid x, z, y_{1:i-1}).
> $$
> For classification (target length one) the two models coincide.

Statistically both are **finite mixture models** with input-dependent mixing weights $p_\eta(z\mid x)$ and mixture components given by the generator conditioned on each passage — the same structure as the mixtures in [[Monsters and Mixtures]], with the sum-vs-product ordering deciding whether the mixture is over sequences or over tokens.

> [!algorithm] Training (Sec. 2.4) ^alg-training
> 1. Given pairs $(x_j, y_j)$, minimise the negative marginal log-likelihood $\sum_j -\log p(y_j \mid x_j)$ with Adam, retrieving $k \in \{5, 10\}$ documents per query.
> 2. Gradients flow into the generator $\theta$ **and** the query encoder $\mathrm{BERT}_q$ through the mixing weights; no label says which document is correct.
> 3. The document encoder $\mathrm{BERT}_d$ and the index are kept **frozen** — re-embedding 21M passages during training (as REALM does) was found unnecessary.
> Total trainable parameters: 626M (Appendix G), versus 11B for the best closed-book model T5-11B.

> [!algorithm] Decoding (Sec. 2.5) ^alg-decoding
> - **RAG-Token** is an ordinary autoregressive model with transition probability $p'_\theta(y_i \mid x, y_{1:i-1}) = \sum_{z} p_\eta(z \mid x)\, p_\theta(y_i \mid x, z, y_{1:i-1})$; plug it into standard beam search.
> - **RAG-Sequence** does not factorise per token. Run beam search separately for each document $z$, pool the hypotheses into a set $Y$, then for each $y \in Y$ compute $\sum_z p_\eta(z\mid x)\,p_\theta(y \mid x, z)$. **Thorough decoding** runs extra forward passes for hypotheses missing from a document's beam; **fast decoding** approximates $p_\theta(y \mid x, z_i) \approx 0$ for those.

**Results (Sec. 4, Tables 1–2).**

| Task (metric) | Closed-book T5-11B+SSM | DPR (extractive) | RAG-Token | RAG-Seq. |
|---|---|---|---|---|
| Natural Questions (EM) | 36.6 | 41.5 | 44.1 | **44.5** |
| TriviaQA (EM, std / Wiki test) | – / 60.5 | 57.9 / – | 55.2 / 66.1 | 56.8 / **68.0** |
| WebQuestions (EM) | 44.7 | 41.1 | **45.5** | 45.2 |
| CuratedTrec (EM) | – | 50.6 | 50.0 | **52.2** |

- *Generation beats extraction.* RAG answers 11.8% of NQ questions correctly even when the answer string is in **none** of the retrieved documents — an extractive reader would score 0 (Sec. 4.1).
- *Abstractive QA and Jeopardy generation.* RAG-Sequence beats BART by 2.6 BLEU and 2.6 ROUGE-L on MS-MARCO; RAG-Token is best on Jeopardy question generation (Q-BLEU-1 22.2 vs 19.7 for BART), plausibly because Jeopardy clues combine two facts from different passages.
- *FEVER.* 72.5% (3-way) and 89.5% (2-way), within 4.3% and 2.7% of pipeline systems that use retrieval supervision RAG never sees. The top retrieved document comes from a gold evidence article in 71% of cases, and one is in the top 10 in 90%.
- *Diversity.* Distinct-to-total tri-gram ratio on Jeopardy: BART 32.4%, RAG-Token 46.8%, RAG-Sequence 53.8%, gold 90.0% (Table 5).

> [!theorem] Empirical finding — learned retrieval matters, and the index is swappable ^thm-ablations
> (Table 6, dev set.) Replacing DPR with BM25 drops NQ from 44.0 to 31.8 EM (RAG-Sequence); freezing the query encoder drops it to 41.2. The exception is FEVER, where BM25 is *best* (75.1 vs 74.5), "perhaps since FEVER claims are heavily entity-centric". **Index hot-swapping** (Sec. 4.5): for 82 world leaders who changed between 2016 and 2018, RAG answers 70% correctly with the 2016 index on 2016 leaders and 68% with the 2018 index on 2018 leaders, but only 12% and 4% with mismatched indices — world knowledge lives in the index and is updated by replacing it.

**How the two memories cooperate (Sec. 4.3, Fig. 2).** For the input "Hemingway", the RAG-Token document posterior $p(z_i \mid x, y_i, y_{-i})$ spikes on the passage mentioning *The Sun Also Rises* when the token "Sun" is generated, then **flattens**: once the title is started, BART's parametric memory can finish it. Retrieval cues; parameters complete.

**Failure modes (Appendix F, H).** A learned "null document" for cases where retrieval is useless did not help. On tasks with weak factual requirements (story generation) the retriever can **collapse**, returning the same documents for every input, after which the generator learns to ignore them and RAG degenerates to BART. Retrieving more documents at test time helps RAG-Sequence monotonically but RAG-Token peaks at 10 (Fig. 3).

## Examples

A RAG-Sequence scoring pass, written to mirror [[#^def-rag-sequence]]:

```python
import numpy as np

def rag_sequence_logprob(x, y, q_enc, index, generator, k=5):
    q = q_enc(x)                                   # BERT_q(x)
    doc_ids, scores = index.search(q, k)           # MIPS over d(z); scores = d(z)^T q(x)
    log_p_z = scores - np.logaddexp.reduce(scores) # softmax over the top-k only
    log_p_y_given_z = np.array([
        generator.sequence_logprob(y, context=index.text(z) + " // " + x)
        for z in doc_ids
    ])
    return np.logaddexp.reduce(log_p_z + log_p_y_given_z)   # log sum_z p(z|x) p(y|x,z)
```

Training minimises the negative of this quantity; because `log_p_z` depends on `q_enc`, the query encoder learns to up-weight passages under which the gold answer is likely. The per-document responsibilities $p(z \mid x, y) \propto p_\eta(z \mid x)\,p_\theta(y \mid x, z)$ are exactly the E-step posteriors of a mixture model.

Applied sketch: index a measurement team's experiment read-outs and MMM model cards as 100-word chunks; a question such as "what lift did we see for paid social in Q3 geo tests?" retrieves the relevant read-outs, and the generator answers with provenance. Updating the knowledge base after a new test is an index write, not a fine-tune.

## Connections

- [[Transformers and LLM Foundations - Overview]] — BART and BERT are transformer encoder(-decoder) models; RAG leaves their architecture untouched.
- [[ReAct - Reasoning and Acting Agents]] — replaces the single up-front retrieval with *iterative, reasoning-directed* retrieval through a search API; evaluated on the same FEVER benchmark and cites RAG as the supervised state of the art there.
- [[Tool Use and the Agent Loop]] — a retriever is the prototypical tool; RAG is "one tool call, made before generation".
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — exact match, BLEU/ROUGE/Q-BLEU, and the pairwise human factuality/specificity protocol.
- [[Monsters and Mixtures]] — latent-class mixture structure underlying the marginalisation over documents.
- [[In-Context Learning and Few-Shot Prompting]] — retrieved passages are conditioning context, the same channel that few-shot exemplars use.

## See Also

- [[LLM Reasoning, Retrieval and Agents - Overview]] — cluster map.
- [[RLHF and Instruction Tuning]] — the complementary, *parametric* route to reducing hallucination (closed-domain hallucination 41% $\to$ 21%).
- [[Interactive Knowledge Elicitation Method]] and [[NLP Causal Extraction Methods]] — building a structured, human-editable knowledge base from text; RAG's raw-text memory is the unstructured counterpart ("human-readable" and "human-writable", Sec. 5).
- [[LLM-BN Decision Support Application]] — decision support in which LLM output must be grounded and auditable.
