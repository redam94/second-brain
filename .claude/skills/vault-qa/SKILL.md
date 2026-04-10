---
name: vault-qa
description: "Answer questions using the vault knowledge base and save the answers as richly cross-linked Obsidian markdown notes in the Questions-and-Answers folder. Use when the user asks a question about their knowledge base and wants the answer preserved as a permanent, interconnected note that strengthens the vault's knowledge graph. Also use when the user explicitly says /vault-qa or asks to 'save the answer' or 'add to Q&A'."
user-invocable: true
argument-hint: "[question]"
---

# Vault Q&A Skill

Answer questions by searching the vault knowledge base, then save the answer as a richly cross-linked Obsidian markdown note in the `Questions-and-Answers/` folder. Every answer note becomes a new node in the knowledge graph, linking back to source notes and forward to related concepts.

## Skill Dependencies

| Skill | When to use |
|-------|-------------|
| **vault-ingest** | Query mode — search the vault knowledge base for relevant information |
| **obsidian-markdown** | All note formatting — wikilinks, callouts, frontmatter, LaTeX |
| **obsidian-cli** | Note creation and vault search when Obsidian is running |

## Workflow

### Step 1: Parse the Question

Extract from the user's message:
- **The question** itself (use `$ARGUMENTS` if provided, otherwise parse from conversation)
- **Key concepts/terms** to search for
- **Scope**: specific folder/topic, or whole vault?

### Step 2: Search the Vault

Use the **vault-ingest** skill's Query mode strategy:

1. **Check indexes first** — read `_Vault_Index.md` and follow routing summaries to the right area
2. **Full-text search** — use `obsidian search` (obsidian-cli) or Grep/Glob as fallback
3. **Traverse the concept graph** — follow `depends_on` and `used_by` frontmatter links from found notes
4. **Follow crosslinks** — read wikilinked notes for additional context
5. **Trace to raw sources** — use `source_location` properties to verify claims against original PDFs/files

Collect:
- All relevant notes (paths and key content)
- Raw source references with page/section numbers
- Related notes that provide context even if not directly answering the question

### Step 3: Compose the Answer

Write a complete, self-contained answer that:
- Directly answers the question with precision
- Includes formal definitions, theorems, or examples from the vault where relevant
- Cites every claim with wikilinks to source notes and raw files
- Uses LaTeX for any mathematical content (`$...$` inline, `$$...$$` display)
- Identifies gaps where the vault lacks information

### Step 4: Create the Q&A Note

#### 4a. Folder setup

Ensure `Questions-and-Answers/` exists at the vault root. Create it if needed.

#### 4b. Generate filename

Use a descriptive, concise filename derived from the question:
- Format: `Q - <Short Question Summary>.md`
- Example: `Q - How Does Partial Pooling Handle Multiple Comparisons.md`
- Keep under 80 characters
- Title Case, no special characters except hyphens

#### 4c. Write the note

Use the **obsidian-markdown** skill conventions. Every note MUST follow this template:

```markdown
---
title: "Q: <Full Question>"
tags:
  - type/qa
  - topic/<domain>
  - topic/<sub-domain>
date_asked: YYYY-MM-DD
answered_from:
  - "[[Source Note 1]]"
  - "[[Source Note 2]]"
related_questions:
  - "[[Q - Related Question]]"
aliases:
  - <alternate phrasing of the question>
---

# <Full Question>

> [!summary]
> 2-3 sentence direct answer. This should stand alone — a reader
> (or LLM) should get the core answer from just this callout.

## Answer

The full, detailed answer organized with clear headings.

Each claim cites its source with wikilinks:
"Partial pooling shrinks estimates toward the group mean ([[Partial Pooling as Multiple Comparisons Correction]], [[raw/multiple2f.pdf|Gelman et al. 2009, Sec. 3.2]])."

Use callouts for formal content pulled from source notes:

> [!theorem] Theorem: Name ([[Source Note#^thm-id]])
> Full statement reproduced or embedded.

> [!example] Example: Name ([[Source Note#^example-id]])
> Worked example with setup, solution, interpretation.

### Practical Implications

What this means in practice — actionable takeaways.

## Source Notes

| Note | Relevance |
|------|-----------|
| [[Note A]] | Main source for X |
| [[Note B]] | Provides context on Y |
| [[raw/file.pdf]] | Original source, Ch. 3 pp. 45-52 |

## Related Concepts

- [[Concept A]] — how it connects to this question
- [[Concept B]] — related but distinct idea
- [[Q - Related Question]] — related Q&A entry

## Gaps

If the vault doesn't fully cover the question:
- "No vault coverage of X — consider ingesting sources on this topic."
- Or: "Partial coverage — [[Note]] covers the basics but lacks advanced treatment."

## Follow-Up Questions

- Suggested questions the user might want to explore next
- These become candidates for future `/vault-qa` invocations
```

### Step 5: Update Source Notes with Backlinks

For each note referenced in `answered_from`, check if it has a `used_by` property. If so, add the new Q&A note to that list:

```yaml
used_by:
  - "[[Q - How Does Partial Pooling Handle Multiple Comparisons]]"
```

This creates bidirectional links, strengthening the knowledge graph. Only add backlinks to notes that already have `used_by` in their frontmatter — do not add the property to notes that lack it.

### Step 6: Update the Q&A Index

Create or update `Questions-and-Answers/_Index.md`:

```markdown
---
title: "Index: Questions and Answers"
tags:
  - type/index
date_updated: YYYY-MM-DD
question_count: N
---

# Questions and Answers

> [!abstract] Routing Summary
> Answered questions from the vault knowledge base. Each answer is cross-linked
> to its source notes and related concepts.
> Browse by topic below or search for keywords.

## By Topic

### <Topic A>
- [[Q - Question 1]] — brief answer summary
- [[Q - Question 2]] — brief answer summary

### <Topic B>
- [[Q - Question 3]] — brief answer summary

## Recent Questions

| Question | Date | Key Sources |
|----------|------|-------------|
| [[Q - Question 1]] | YYYY-MM-DD | [[Source A]], [[Source B]] |

## All Questions

- [[Q - Question 1]] — one-line summary
- [[Q - Question 2]] — one-line summary
```

When updating an existing index:
- Re-read it first to avoid overwriting
- Merge new entries into the appropriate topic section
- Add to the Recent Questions table
- Update `question_count` and `date_updated`

### Step 7: Report to User

After saving, report:
- The answer (displayed in conversation)
- Path to the saved note
- Number of cross-links created
- Any gaps identified
- Suggested follow-up questions

## Rules

1. **Always search before answering** — never answer from general knowledge alone when vault content exists
2. **Always cite sources** with wikilinks and location references
3. **Be honest about gaps** — clearly mark what the vault covers vs. what it doesn't
4. **Maximize cross-links** — the primary goal beyond answering is to increase graph connectivity. Link to:
   - Source notes (in `answered_from` and inline)
   - Related Q&A entries (in `related_questions`)
   - Concept notes mentioned in the answer
   - Raw source files with page numbers
5. **Use consistent tags** — always include `type/qa` plus relevant `topic/` tags from the vault's existing tag taxonomy
6. **Don't duplicate content** — embed or link to existing notes rather than copying large blocks. Use `![[Note#Section]]` for key passages.
7. **Integrate with the obsidian-markdown skill** for all formatting decisions
