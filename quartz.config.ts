import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Second Brain",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "redam94.github.io/second-brain",
    ignorePatterns: ["private", "templates", ".obsidian", "Dream", ".claude", "node_modules", "quartz", "Clippings"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f6f5ee",       // warm off-white with slight green tint
          lightgray: "#e4e3d8",   // warm light gray
          gray: "#9a9a80",        // warm mid gray
          darkgray: "#3a3a28",    // warm near-black
          dark: "#1e1e14",        // rich warm dark
          secondary: "#5c6b22",   // olive green (links, interactive)
          tertiary: "#8a9e4a",    // lighter olive / sage (hover, visited)
          highlight: "rgba(92, 107, 34, 0.1)",   // olive-tinted code bg
          textHighlight: "#c8d46688",             // soft yellow-olive selection
        },
        darkMode: {
          light: "#1a1c12",       // deep olive-dark background
          lightgray: "#2e3120",   // dark olive border
          gray: "#6a6a50",        // muted olive gray
          darkgray: "#c8c8a8",    // warm light text
          dark: "#e8e8cc",        // near-white warm
          secondary: "#a8b850",   // bright olive (links in dark)
          tertiary: "#7a9e60",    // sage green (hover, visited in dark)
          highlight: "rgba(140, 160, 60, 0.15)",  // olive-tinted code bg
          textHighlight: "#8b9a3a88",             // muted olive selection
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.LLMs({
        description:
          "A structured knowledge base covering Bayesian statistics, econometrics, causal inference, market response modeling, Bayesian experimental design, and agent-based modeling.",
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
