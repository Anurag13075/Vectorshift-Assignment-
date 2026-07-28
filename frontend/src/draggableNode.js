// draggableNode.js

import './draggableNode.css';

export const DraggableNode = ({ type, label, icon, color }) => {
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
      title={label}
    >
      <span className="palette-node__icon">{icon}</span>
      <span className="palette-node__label">{label}</span>
    </div>
  );
};
