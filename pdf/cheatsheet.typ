// ==========================================================
// RegexSheet.com — Printable Cheat Sheet Template (Typst)
// Clean, modern typography matching Tailwind v4 aesthetics
// ==========================================================

// Load data payload passed to the template
#let data = json("current-sheet.json")

#set page(
  paper: "a4",
  margin: (x: 1.6cm, top: 1.4cm, bottom: 1.6cm),
  footer: context [
    #line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
    #v(4pt)
    #grid(
      columns: (1fr, 1.2fr, 1fr),
      align: (left + horizon, center + horizon, right + horizon),
      text(size: 7.5pt, fill: rgb("#64748b"))[*regexsheet.com*],
      text(size: 7.5pt, fill: rgb("#64748b"))[
        Interactive guide: #text(weight: "bold")[https:\/\/regexsheet.com#data.targetPage]
      ],
      text(size: 7.5pt, fill: rgb("#64748b"), weight: "bold")[
        Page #counter(page).display() of #data.categories.len()
      ]
    )
    #v(4pt)
  ]
)

// Base typography
#set text(
  font: ("Segoe UI", "Arial", "Roboto", "Liberation Sans", "sans-serif"),
  size: 9.5pt,
  fill: rgb("#0f172a") // slate-900
)

// Render each category on its own page (1 table per page)
#for (index, category) in data.categories.enumerate() {
  if index > 0 {
    pagebreak()
  }

  // --- Category Page Header ---
  grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    [
      #text(size: 8pt, weight: "bold", fill: rgb("#5b21b6"))[#upper(data.title)]
      #v(-3pt)
      #text(size: 17pt, weight: 800, fill: rgb("#0f172a"))[#category.title]
    ],
    [
      #box(
        fill: rgb("#ede9fe"),
        inset: (x: 8pt, y: 3.5pt),
        radius: 99pt,
        text(size: 7.5pt, weight: "bold", fill: rgb("#5b21b6"))[#data.badge]
      )
    ]
  )

  v(4pt)
  line(length: 100%, stroke: 1.5pt + rgb("#5b21b6"))
  v(8pt)

  // --- Category Table (1 per page) ---
  table(
    columns: (1.45fr, 2.55fr),
    stroke: (x, y) => if y == 0 { (bottom: 1.5pt + rgb("#cbd5e1")) } else { (bottom: 0.5pt + rgb("#f1f5f9")) },
    fill: (col, row) => if row == 0 { rgb("#f8fafc") } else if calc.even(row) { rgb("#fafafa") } else { none },
    align: (left, top),
    inset: (x: 8pt, y: 6pt),
    
    // Header Row
    table.header(
      text(weight: "bold", size: 8pt, fill: rgb("#475569"))[PATTERN / SYNTAX],
      text(weight: "bold", size: 8pt, fill: rgb("#475569"))[DESCRIPTION & EXAMPLE]
    ),
    
    // Map entries
    ..category.entries.map(entry => (
      [
        #set text(fill: rgb("#5b21b6"), size: 8pt, font: ("JetBrains Mono", "Consolas", "Courier New"))
        #highlight(
          fill: rgb("#f3f0ff"),
          radius: 2.5pt,
          top-edge: "ascender",
          bottom-edge: "descender",
          entry.syntax
        )
      ],
      [
        #text(weight: 500, fill: rgb("#1e293b"), size: 8.8pt)[#entry.description]
        #if "example" in entry and entry.example != none and entry.example != "" [
          #v(2pt)
          #text(size: 7pt, weight: "bold", fill: rgb("#64748b"))[EXAMPLE: ]
          #highlight(
            fill: rgb("#ecfdf5"),
            radius: 2.5pt,
            top-edge: "ascender",
            bottom-edge: "descender",
            text(fill: rgb("#047857"), size: 7.5pt, font: ("JetBrains Mono", "Consolas", "Courier New"))[#entry.example]
          )
        ]
      ]
    )).flatten()
  )
}
