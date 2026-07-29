import { useState } from 'react';
import { FiSidebar } from 'react-icons/fi';
import { DraggableNode } from './draggableNode';
import { nodeConfigs, paletteOrder } from './nodes/nodeConfigs';

import './toolbar.css';

export const PipelineToolbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ' sidebar--collapsed'}`} aria-label="Node palette">
      <div className="sidebar__header">
        <button
          type="button"
          className="sidebar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <FiSidebar className="sidebar__toggle-icon" />
        </button>
        <span className="sidebar__title">Nodes</span>
        <span className="sidebar__hint">Drag to canvas</span>
      </div>
      <div className="sidebar__nodes">
        {paletteOrder.map((key) => {
          const config = nodeConfigs[key];
          return (
            <DraggableNode
              key={key}
              type={config.type}
              label={config.label}
              icon={config.icon}
              color={config.color}
              description={config.description}
            />
          );
        })}
      </div>
    </aside>
  );
};
