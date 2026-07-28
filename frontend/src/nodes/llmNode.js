// llmNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const LLMNode = (props) => <BaseNode {...props} config={nodeConfigs.llm} />;
