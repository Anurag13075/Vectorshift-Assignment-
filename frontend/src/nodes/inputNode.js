// inputNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const InputNode = (props) => <BaseNode {...props} config={nodeConfigs.customInput} />;
