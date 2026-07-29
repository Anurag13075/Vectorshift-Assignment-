// draggableNode.js

import './draggableNode.css';

export const DraggableNode = ({ type, label, icon, color, description }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.classList.add('palette-node--dragging');
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="palette-node"
      style={{ '--node-accent': color }}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => event.currentTarget.classList.remove('palette-node--dragging')}
      draggable
      title={description || label}
    >
      <span className="palette-node__icon">{icon}</span>
      <span className="palette-node__text">
        <span className="palette-node__label">{label}</span>
        {description && <span className="palette-node__desc">{description}</span>}
      </span>
      <span className="palette-node__grip" aria-hidden="true">
        <svg viewBox="0 0 8 14" width="8" height="14" fill="currentColor">
          <circle cx="2" cy="2" r="1.2" />
          <circle cx="6" cy="2" r="1.2" />
          <circle cx="2" cy="7" r="1.2" />
          <circle cx="6" cy="7" r="1.2" />
          <circle cx="2" cy="12" r="1.2" />
          <circle cx="6" cy="12" r="1.2" />
        </svg>
      </span>
    </div>
  );
};
