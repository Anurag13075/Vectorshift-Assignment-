

import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { useStore } from '../store';
import './TextNode.css';

const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const MIN_WIDTH = 240;
const MAX_WIDTH = 420;
const MIN_HEIGHT = 88;
const MAX_HEIGHT = 320;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text ?? '{{input}}');
  const [size, setSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const variables = useMemo(() => {
    const seen = new Set();
    for (const match of text.matchAll(VARIABLE_PATTERN)) {
      seen.add(match[1]);
    }
    return Array.from(seen);
  }, [text]);

  useEffect(() => {
    const el = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!el || !mirror) return;

   
    el.style.height = 'auto';
    const nextHeight = Math.min(Math.max(el.scrollHeight + 4, MIN_HEIGHT), MAX_HEIGHT);

    
    mirror.textContent = text || ' ';
    const nextWidth = Math.min(Math.max(mirror.scrollWidth + 48, MIN_WIDTH), MAX_WIDTH);

    setSize({ width: nextWidth, height: nextHeight });
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    updateNodeField(id, 'text', value);
  };

  const extraHandles = variables.map((name) => ({
    type: 'target',
    id: `var-${name}`,
    position: 'left',
    label: name,
  }));

  return (
    <div style={{ width: size.width }}>
      <BaseNode id={id} config={nodeConfigs.text} data={data} extraHandles={extraHandles}>
        <div className="text-node">
          <textarea
            ref={textareaRef}
            className="text-node__input"
            style={{ height: size.height }}
            value={text}
            spellCheck={false}
            onChange={handleChange}
            placeholder="Type text, use {{variable}} to add an input"
          />
          <span ref={mirrorRef} className="text-node__mirror" aria-hidden="true" />
          {variables.length > 0 && (
            <div className="text-node__vars">
              {variables.map((name) => (
                <span className="text-node__var-chip" key={name}>
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </BaseNode>
    </div>
  );
};
