# Pipeline Studio — VectorShift Frontend Assessment

## Running it

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Runs on `http://localhost:8000`.

**Frontend**
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`.

Start the backend first (or at least before hitting "Run pipeline") — the frontend calls it directly.

## Part 1 — Node abstraction

`src/nodes/nodeConfigs.js` is the single source of truth for every node: its label, icon,
accent color, fields (text / select / textarea), and handles. `src/nodes/BaseNode.js` reads
that config and renders the full card — header, fields, and evenly-spaced handles on both
sides — so a new node is usually just a config entry plus a one-line wrapper component
(see `mathNode.js`, `filterNode.js`, `apiRequestNode.js`, `databaseNode.js`,
`conditionalNode.js` — the five new nodes added to demonstrate the abstraction).

Nodes with real custom logic, like `TextNode`, still render through `BaseNode` (for the
shell and handle layout) and only override the body/handles they actually need to.

## Part 2 — Styling

Design system lives in `src/index.css` as CSS variables: a dark graphite canvas, one
signature indigo-violet accent, `Space Grotesk` for headings/labels, `Inter` for body
text, and `JetBrains Mono` for anything code-like (variable chips, query fields). The
toolbar and submit button float over a full-bleed dotted canvas rather than boxing the
canvas in, closer to how tools like n8n/Zapier/VectorShift itself lay things out.

## Part 3 — Text node logic

`src/nodes/textNode.js`:
- Grows in both width and height as you type — height from `scrollHeight`, width by
  measuring the text in a hidden mirror element with identical font metrics, both
  clamped to sane min/max bounds.
- Scans the text for `{{ variableName }}` (valid JS identifier), and renders one target
  Handle per unique variable on the left edge, labeled with the variable name, so it can
  be wired to another node's output.

## Part 4 — Backend integration

- `submit.js` POSTs `{ nodes, edges }` (straight from the zustand store) to
  `POST /pipelines/parse`.
- `backend/main.py` counts nodes/edges and checks whether the graph is a DAG using
  Kahn's algorithm (repeatedly remove zero-in-degree nodes; if every node gets removed,
  there's no cycle). Returns `{ num_nodes, num_edges, is_dag }`.
- The frontend shows the result in `src/components/ResultModal.js` — a styled modal
  (rather than a native `alert()`) with the counts and a clear DAG / not-a-DAG state.
  CORS is enabled on the backend so the two dev servers (3000 / 8000) can talk.

## Other fixes made along the way

- `zustand` was used throughout the original code but missing from `package.json`.
- `index.js` was missing its `import React from 'react'`.
- `store.js`'s `updateNodeField` mutated node objects in place; now returns new objects.
- The old `/pipelines/parse` endpoint expected `Form` data via GET; it's now a proper
  `POST` with a JSON body and a Pydantic response model.
