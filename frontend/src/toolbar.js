// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfigs, paletteOrder } from './nodes/nodeConfigs';
import './toolbar.css';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__brand-mark">P</span>
        <span className="toolbar__brand-name">Pipeline Studio</span>
      </div>
      <div className="toolbar__divider" />
      <div className="toolbar__nodes">
        {paletteOrder.map((key) => {
          const config = nodeConfigs[key];
          return (
            <DraggableNode
              key={key}
              type={config.type}
              label={config.label}
              icon={config.icon}
              color={config.color}
            />
          );
        })}
      </div>
    </div>
  );
};
