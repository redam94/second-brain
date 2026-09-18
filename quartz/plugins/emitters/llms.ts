import fs from "fs"
import path from "path"
import { QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"
import { BuildCtx } from "../../util/ctx"
import {
  FilePath,
  FullSlug,
  getFileExtension,
  joinSegments,
  slugifyFilePath,
} from "../../util/path"
import { write } from "./helpers"

interface Options {
  /** One-paragraph summary of the site shown at the top of the root llms.txt */
  description: string
  /** Max characters of each note's description in the listings */
  descriptionLength: number
  /** How many levels of subfolders each llms.txt lists */
  treeDepth: number
}

const defaultOptions: Options = {
  description: "",
  descriptionLength: 220,
  treeDepth: 2,
}

type Note = {
  slug: FullSlug
  title: string
  description: string
  dir: string // real (un-slugified) folder path relative to content root, "" for root
  isFolderIndex: boolean
}

type Folder = {
  dir: string
  notes: Note[]
  children: Set<string>
  total: number // notes in this folder and all descendants
  index?: Note
}

const wikilinkRegex = /(!?)\[\[([^\[\]|#\\]*)(#[^\[\]|\\]*)?(?:\\?\|([^\[\]]*))?\]\]/g
const fencedCodeRegex = /(^```[\s\S]*?^```|^~~~[\s\S]*?^~~~)/gm
const imageExts = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".bmp"])

function collapse(text: string, limit: number): string {
  const flat = text.replace(/\s+/g, " ").trim()
  return flat.length > limit ? flat.slice(0, limit - 1).trimEnd() + "…" : flat
}

/**
 * Resolves wikilink targets the way Obsidian does: exact path, then relative to the
 * linking note, then the shortest path whose trailing segments match.
 */
function buildResolver(allSlugs: FullSlug[]) {
  const exact = new Set<string>(allSlugs)
  const bySuffix = new Map<string, string[]>()
  const index = (key: string, slug: string) => {
    const bucket = bySuffix.get(key)
    if (bucket) bucket.push(slug)
    else bySuffix.set(key, [slug])
  }
  for (const slug of allSlugs) {
    const segments = slug.split("/")
    const ext = getFileExtension(slug)
    for (let i = 0; i < segments.length; i++) {
      const suffix = segments.slice(i).join("/").toLowerCase()
      index(suffix, slug)
      // attachments are sometimes linked without their extension
      if (ext) index(suffix.slice(0, -ext.length), slug)
    }
  }

  const sharedPrefix = (a: string, b: string) => {
    const [as, bs] = [a.split("/"), b.split("/")]
    let i = 0
    while (i < as.length && i < bs.length && as[i] === bs[i]) i++
    return i
  }

  return (target: string, fromSlug: FullSlug): string | undefined => {
    const targetSlug = slugifyFilePath(target.trim() as FilePath)
    if (targetSlug === "") return undefined
    if (exact.has(targetSlug)) return targetSlug

    const relative = path.posix.normalize(path.posix.join(path.posix.dirname(fromSlug), targetSlug))
    if (exact.has(relative)) return relative

    const stripped = targetSlug.replace(/^(\.\.?\/)+/, "").toLowerCase()
    const candidates = bySuffix.get(stripped)
    if (!candidates) return undefined
    // closest to the linking note first, then shortest path
    return [...candidates].sort(
      (a, b) =>
        sharedPrefix(b, fromSlug) - sharedPrefix(a, fromSlug) ||
        a.split("/").length - b.split("/").length,
    )[0]
  }
}

export const LLMs: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  async function* emitAll(ctx: BuildCtx, content: ProcessedContent[]): AsyncGenerator<FilePath> {
    const cfg = ctx.cfg.configuration
    const base = `https://${cfg.baseUrl ?? ""}`
    // parentheses are legal in URLs but terminate markdown link targets early
    const urlFor = (slug: string) =>
      joinSegments(base, encodeURI(slug).replace(/\(/g, "%28").replace(/\)/g, "%29"))
    const resolve = buildResolver(ctx.allSlugs)
    const published = new Set<string>(content.map(([_, file]) => file.data.slug!))

    const linkFor = (slug: string) => (published.has(slug) ? `${urlFor(slug)}.md` : urlFor(slug))

    // rewrite [[wikilinks]] into absolute markdown links so the raw notes are
    // navigable by anything that can fetch a URL
    const rewriteLinks = (src: string, fromSlug: FullSlug): string =>
      src
        .split(fencedCodeRegex)
        .map((chunk, i) => {
          if (i % 2 === 1) return chunk
          return chunk.replace(
            wikilinkRegex,
            (match, embed: string, target = "", anchor = "", alias?: string) => {
              if (target.trim() === "") return match
              const slug = resolve(target, fromSlug)
              if (!slug) return match

              const heading = anchor.replace(/^#\^?/, "").trim()
              const name = path.posix.basename(target.trim()).replace(/\.md$/, "")
              const label = alias?.trim() || (heading ? `${name} > ${heading}` : name)
              const href = linkFor(slug) + (heading ? `#${encodeURIComponent(heading)}` : "")
              const isImage = imageExts.has(getFileExtension(slug) ?? "")
              return `${embed && isImage ? "!" : ""}[${label}](${href})`
            },
          )
        })
        .join("")

    const notes: Note[] = []
    for (const [_, file] of content) {
      const slug = file.data.slug!
      const relativePath = file.data.relativePath!
      const source = await fs.promises.readFile(file.data.filePath!, "utf-8")
      yield write({
        ctx,
        content: rewriteLinks(source, slug),
        slug,
        ext: ".md",
      })

      const basename = path.posix.basename(slug)
      const dir = path.posix.dirname(relativePath)
      const frontmatterDescription = file.data.frontmatter?.description
      notes.push({
        slug,
        title: file.data.frontmatter?.title ?? basename,
        description: collapse(
          typeof frontmatterDescription === "string"
            ? frontmatterDescription
            : (file.data.description ?? ""),
          opts.descriptionLength,
        ),
        dir: dir === "." ? "" : dir,
        isFolderIndex: slug !== "index" && (basename === "_Index" || basename === "index"),
      })
    }

    const folders = new Map<string, Folder>()
    const getFolder = (dir: string): Folder => {
      let folder = folders.get(dir)
      if (!folder) {
        folder = { dir, notes: [], children: new Set(), total: 0 }
        folders.set(dir, folder)
        if (dir !== "") {
          const parent = path.posix.dirname(dir)
          getFolder(parent === "." ? "" : parent).children.add(dir)
        }
      }
      return folder
    }

    for (const note of notes) {
      const folder = getFolder(note.dir)
      if (note.isFolderIndex) folder.index = note
      else folder.notes.push(note)
      for (
        let dir = note.dir;
        ;
        dir = path.posix.dirname(dir) === "." ? "" : path.posix.dirname(dir)
      ) {
        getFolder(dir).total++
        if (dir === "") break
      }
    }

    const folderSlug = (dir: string) => slugifyFilePath(dir as FilePath, true)
    const folderName = (folder: Folder) => path.posix.basename(folder.dir)
    const folderIndexUrl = (dir: string) => urlFor(joinSegments(folderSlug(dir), "llms.txt"))
    const sorted = (dirs: Iterable<string>) => [...dirs].sort((a, b) => a.localeCompare(b))
    const noteLine = (note: Note) =>
      `- [${note.title}](${urlFor(note.slug)}.md)${note.description ? `: ${note.description}` : ""}`

    // listings only go `treeDepth` levels deep to stay small; deeper folders are
    // reachable through their parent's llms.txt
    const folderTree = (dir: string, depth: number): string[] =>
      depth >= opts.treeDepth
        ? []
        : sorted(getFolder(dir).children).flatMap((child) => {
            const folder = getFolder(child)
            return [
              `${"  ".repeat(depth)}- [${folderName(folder)}](${folderIndexUrl(child)}) (${folder.total} notes)`,
              ...folderTree(child, depth + 1),
            ]
          })

    for (const folder of folders.values()) {
      if (folder.dir === "") continue
      const parent = path.posix.dirname(folder.dir)
      const lines = [
        `# ${cfg.pageTitle} — ${folder.dir}`,
        "",
        `> ${folder.total} notes. Every link below is the raw markdown of a note; links inside notes are absolute URLs to other notes.`,
        "",
        `Up: [${parent === "." ? cfg.pageTitle : parent}](${parent === "." ? urlFor("llms.txt") : folderIndexUrl(parent)})`,
        "",
      ]
      if (folder.index) {
        lines.push("## Overview", "", noteLine(folder.index), "")
      }
      if (folder.children.size > 0) {
        lines.push("## Subfolders", "", ...folderTree(folder.dir, 0), "")
      }
      if (folder.notes.length > 0) {
        const byTitle = [...folder.notes].sort((a, b) => a.title.localeCompare(b.title))
        lines.push("## Notes", "", ...byTitle.map(noteLine), "")
      }
      yield write({
        ctx,
        content: lines.join("\n"),
        slug: joinSegments(folderSlug(folder.dir), "llms") as FullSlug,
        ext: ".txt",
      })
    }

    const root = getFolder("")
    const rootLines = [
      `# ${cfg.pageTitle}`,
      "",
      ...(opts.description ? [`> ${opts.description}`, ""] : []),
      `This site is an Obsidian vault of ${root.total} cross-linked notes published for both people and language models.`,
      "",
      "## How to use this knowledge base",
      "",
      "- Every folder below links to its own `llms.txt` listing its subfolders and the notes inside it with one-line descriptions. Start here, drill into the relevant folder, then open the notes you need.",
      `- Every note is available as raw markdown: append \`.md\` to its page URL (e.g. ${urlFor("index")}.md). Prefer the \`.md\` URL over the HTML page.`,
      "- Links inside the raw markdown are absolute URLs to other notes, so follow them to explore prerequisites (`depends_on`), downstream uses (`used_by`) and related concepts.",
      "- Folder overviews (`_Index` notes) are routing pages that summarize a topic and point to its key notes.",
      `- To search by keyword, fetch the full-text index (large JSON, all notes): ${urlFor("static/contentIndex.json")}`,
      `- When citing a note to a person, link the HTML page (the URL without \`.md\`).`,
      "",
      "## Folders",
      "",
      ...folderTree("", 0),
      "",
      ...(root.notes.length > 0 ? ["## Top-level notes", "", ...root.notes.map(noteLine), ""] : []),
      "## Optional",
      "",
      `- [Sitemap](${urlFor("sitemap.xml")}): every page URL with last-modified dates`,
      `- [RSS feed](${urlFor("index.xml")}): most recently updated notes`,
      "",
    ]
    yield write({
      ctx,
      content: rootLines.join("\n"),
      slug: "llms" as FullSlug,
      ext: ".txt",
    })
  }

  return {
    name: "LLMs",
    emit: (ctx, content) => emitAll(ctx, content),
    partialEmit: (ctx, content) => emitAll(ctx, content),
  }
}
