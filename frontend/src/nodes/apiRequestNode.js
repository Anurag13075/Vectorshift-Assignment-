// apiRequestNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const ApiRequestNode = (props) => <BaseNode {...props} config={nodeConfigs.apiRequest} />;
