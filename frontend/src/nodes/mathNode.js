// mathNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const MathNode = (props) => <BaseNode {...props} config={nodeConfigs.math} />;
