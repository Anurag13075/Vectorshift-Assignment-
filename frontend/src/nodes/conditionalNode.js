
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const ConditionalNode = (props) => <BaseNode {...props} config={nodeConfigs.conditional} />;
