// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { ApiRequestNode } from './nodes/apiRequestNode';
import { DatabaseNode } from './nodes/databaseNode';
import { ConditionalNode } from './nodes/conditionalNode';

import 'reactflow/dist/style.css';
import './ui.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  apiRequest: ApiRequestNode,
  database: DatabaseNode,
  conditional: ConditionalNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="canvas" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        connectionLineType="smoothstep"
        defaultEdgeOptions={{ type: 'smoothstep' }}
        fitView
        minZoom={0.2}
        maxZoom={1.6}
      >
        <Background variant={BackgroundVariant.Dots} color="var(--grid-dot)" gap={gridSize} size={1.4} />
        <Controls className="canvas__controls" showInteractive={false} />
        <MiniMap
          className="canvas__minimap"
          pannable
          zoomable
          nodeColor={(n) => n.data?.color || '#4DA3FF'}
          maskColor="rgba(10, 12, 17, 0.65)"
        />

        {nodes.length === 0 && (
          <div className="canvas__empty">
            <div className="canvas__empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <rect x="3" y="8" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="13" y="8" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="canvas__empty-title">Your pipeline is empty</p>
            <p className="canvas__empty-body">
              Drag a node from the sidebar and drop it here to start building your workflow.
            </p>
            <span className="canvas__empty-hint">
              <span className="canvas__empty-hint-dot" />
              Try starting with Input
            </span>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};
