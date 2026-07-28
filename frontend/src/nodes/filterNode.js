// filterNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const FilterNode = (props) => <BaseNode {...props} config={nodeConfigs.filter} />;
