function isDirectedAcyclicGraph(nodeIds, edges) {
  const inDegree = {};
  const adjacency = {};

  for (const id of nodeIds) {
    inDegree[id] = 0;
    adjacency[id] = [];
  }

  for (const edge of edges) {
    const source = edge.source;
    const target = edge.target;
    if (source == null || target == null) continue;
    if (!(source in inDegree) || !(target in inDegree)) continue;
    adjacency[source].push(target);
    inDegree[target] += 1;
  }

  const queue = nodeIds.filter((id) => inDegree[id] === 0);
  let visitedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    visitedCount += 1;
    for (const neighbor of adjacency[current]) {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return visitedCount === nodeIds.length;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nodes = [], edges = [] } = req.body || {};
  const nodeIds = nodes.map((n) => n.id).filter((id) => id != null);

  return res.status(200).json({
    num_nodes: nodes.length,
    num_edges: edges.length,
    is_dag: isDirectedAcyclicGraph(nodeIds, edges),
  });
}
