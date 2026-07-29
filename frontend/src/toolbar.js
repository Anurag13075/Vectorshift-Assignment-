// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfigs, paletteOrder } from './nodes/nodeConfigs';

import './toolbar.css';


export const PipelineToolbar = () => {
  function collapse(){
    
  }
  return (
    <aside className="sidebar" aria-label="Node palette">
      
      <div className="sidebar__header">
       
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
