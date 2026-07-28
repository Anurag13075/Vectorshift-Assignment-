

import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './BaseNode.css';

const sidePositions = (count, index) => {
  
  if (count <= 1) return '50%';
  const margin = 18;
  const usable = 100 - margin * 2;
  return `${margin + (usable * index) / (count - 1)}%`;
};

const Field = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <label className="node-field">
        <span className="node-field__label">{field.label}</span>
        <select
          className="node-field__control"
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="node-field">
        <span className="node-field__label">{field.label}</span>
        <textarea
          className="node-field__control node-field__control--area"
          value={value}
          rows={3}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      </label>
    );
  }

  return (
    <label className="node-field">
      <span className="node-field__label">{field.label}</span>
      <input
        className="node-field__control"
        type="text"
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    </label>
  );
};

export const BaseNode = ({ id, config, data, children, extraHandles = [], selected }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  const [values, setValues] = useState(() => {
    const initial = {};
    config.fields.forEach((field) => {
      const fallback = typeof field.default === 'function' ? field.default(id) : field.default;
      initial[field.name] = data?.[field.name] ?? fallback;
    });
    return initial;
  });

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      updateNodeField(id, name, value);
    },
    [id, updateNodeField]
  );

  const targetHandles = config.handles.filter((h) => h.type === 'target');
  const sourceHandles = config.handles
    .filter((h) => h.type === 'source')
    .concat(extraHandles.filter((h) => h.type === 'source'));
  const extraTargets = extraHandles.filter((h) => h.type === 'target');
  const allTargets = targetHandles.concat(extraTargets);

  return (
    <div className={`node${selected ? ' node--selected' : ''}`} style={{ '--node-accent': config.color }}>
      {allTargets.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          style={{ top: sidePositions(allTargets.length, i) }}
          className="node-handle"
        >
          {h.label && <span className="node-handle__label node-handle__label--left">{h.label}</span>}
        </Handle>
      ))}

      <div className="node__header">
        <span className="node__icon">{config.icon}</span>
        <div className="node__heading">
          <span className="node__title">{config.label}</span>
          {config.description && <span className="node__subtitle">{config.description}</span>}
        </div>
      </div>

      {(config.fields.length > 0 || children) && (
        <div className="node__body">
          {config.fields.map((field) => (
            <Field key={field.name} field={field} value={values[field.name]} onChange={handleChange} />
          ))}
          {config.note && <p className="node__note">{config.note}</p>}
          {children}
        </div>
      )}

      {sourceHandles.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          style={{ top: sidePositions(sourceHandles.length, i) }}
          className="node-handle"
        >
          {h.label && <span className="node-handle__label node-handle__label--right">{h.label}</span>}
        </Handle>
      ))}
    </div>
  );
};
