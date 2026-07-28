
const icon = (path, viewBox = '0 0 24 24') => (
  <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
    {path}
  </svg>
);

export const nodeConfigs = {
  customInput: {
    type: 'customInput',
    label: 'Input',
    description: 'Entry point for external data',
    color: '#2FC7A6',
    icon: icon(
      <path
        d="M4 12h11m0 0-4-4m4 4-4 4M15 5v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        default: (id) => id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File'],
        default: 'Text',
      },
    ],
    handles: [{ type: 'source', id: 'value', position: 'right' }],
  },

  llm: {
    type: 'llm',
    label: 'LLM',
    description: 'Generates a response from a prompt',
    color: '#8B7FF0',
    icon: icon(
      <path
        d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2.1 2.1M8.6 15.4l-2.1 2.1m11-2.1 2.1 2.1M6.5 6.5l2.1 2.1M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [],
    note: 'Combines a system prompt and a user prompt into one response.',
    handles: [
      { type: 'target', id: 'system', position: 'left', label: 'system' },
      { type: 'target', id: 'prompt', position: 'left', label: 'prompt' },
      { type: 'source', id: 'response', position: 'right', label: 'response' },
    ],
  },

  text: {
    type: 'text',
    label: 'Text',
    description: 'Static or templated text',
    color: '#4DA3FF',
    icon: icon(
      <path
        d="M5 6h14M5 12h14M5 18h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
    fields: [],
    handles: [{ type: 'source', id: 'output', position: 'right' }],
  },

  customOutput: {
    type: 'customOutput',
    label: 'Output',
    description: 'Exit point for the pipeline result',
    color: '#E8A23D',
    icon: icon(
      <path
        d="M20 12H9m0 0 4-4m-4 4 4 4M9 5v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        default: (id) => id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image'],
        default: 'Text',
      },
    ],
    handles: [{ type: 'target', id: 'value', position: 'left' }],
  },

  // ---------------------------------------------------------------------
  // Five additional nodes, built purely from config, to demonstrate the
  // abstraction (Part 1).
  // ---------------------------------------------------------------------

  math: {
    type: 'math',
    label: 'Math',
    description: 'Combines two numeric inputs',
    color: '#E8639F',
    icon: icon(
      <path
        d="M6 8h5m-5 8h5M15 6l3 3-3 3m3-3H12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        options: ['Add', 'Subtract', 'Multiply', 'Divide'],
        default: 'Add',
      },
    ],
    handles: [
      { type: 'target', id: 'a', position: 'left', label: 'a' },
      { type: 'target', id: 'b', position: 'left', label: 'b' },
      { type: 'source', id: 'result', position: 'right' },
    ],
  },

  filter: {
    type: 'filter',
    label: 'Filter',
    description: 'Passes data through only if a condition holds',
    color: '#38BDD0',
    icon: icon(
      <path
        d="M4 5h16l-6 7.5V18l-4 2v-7.5L4 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
    fields: [
      { name: 'condition', label: 'Condition', type: 'text', default: 'value != null' },
    ],
    handles: [
      { type: 'target', id: 'input', position: 'left' },
      { type: 'source', id: 'output', position: 'right' },
    ],
  },

  apiRequest: {
    type: 'apiRequest',
    label: 'API Request',
    description: 'Calls an external HTTP endpoint',
    color: '#F0834A',
    icon: icon(
      <path
        d="M4 12a8 8 0 1 1 8 8m-8-8a8 8 0 0 1 8-8m-8 8h16M12 4a12 12 0 0 1 0 16 12 12 0 0 1 0-16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
      { name: 'url', label: 'URL', type: 'text', default: 'https://api.example.com' },
    ],
    handles: [
      { type: 'target', id: 'trigger', position: 'left' },
      { type: 'source', id: 'response', position: 'right' },
    ],
  },

  database: {
    type: 'database',
    label: 'Database',
    description: 'Runs a query against a data store',
    color: '#4FCB7A',
    icon: icon(
      <path
        d="M12 6c4.4 0 8-1.1 8-2.5S16.4 1 12 1 4 2.1 4 3.5 7.6 6 12 6Zm8-2.5V19c0 1.4-3.6 2.5-8 2.5S4 20.4 4 19V3.5M20 8.8c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5M20 14c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      { name: 'query', label: 'Query', type: 'textarea', default: 'SELECT * FROM table' },
    ],
    handles: [
      { type: 'target', id: 'input', position: 'left' },
      { type: 'source', id: 'rows', position: 'right' },
    ],
  },

  conditional: {
    type: 'conditional',
    label: 'Conditional',
    description: 'Routes data down one of two branches',
    color: '#E0C23D',
    icon: icon(
      <path
        d="M6 4v6a4 4 0 0 0 4 4h4m0 0-3-3m3 3-3 3M6 14v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    fields: [
      { name: 'condition', label: 'If', type: 'text', default: 'x > 0' },
    ],
    handles: [
      { type: 'target', id: 'input', position: 'left' },
      { type: 'source', id: 'true', position: 'right', label: 'true' },
      { type: 'source', id: 'false', position: 'right', label: 'false' },
    ],
  },
};

export const paletteOrder = [
  'customInput',
  'llm',
  'text',
  'customOutput',
  'math',
  'filter',
  'apiRequest',
  'database',
  'conditional',
];
