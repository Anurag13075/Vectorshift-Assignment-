// outputNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const OutputNode = (props) => <BaseNode {...props} config={nodeConfigs.customOutput} />;
