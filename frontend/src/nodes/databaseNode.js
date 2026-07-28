// databaseNode.js
import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

export const DatabaseNode = (props) => <BaseNode {...props} config={nodeConfigs.database} />;
