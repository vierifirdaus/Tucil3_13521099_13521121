const fs = require('fs');
const { Graph } = require('graphlib');
const { parse } = require('graphlib-dot');

// Read the GraphML file
const graphmlData = fs.readFileSync('san_francisco_drive.graphml', 'utf8');

// Parse the GraphML data using graphlib-dot
const graph = new Graph();
parse(graphmlData).forEach((statement) => {
  if (statement.type === 'node') {
    graph.setNode(statement.id);
    graph.node(statement.id).pos = [statement.attrs.x, statement.attrs.y];
  } else if (statement.type === 'edge') {
    graph.setEdge(statement.from, statement.to);
  }
});

// Get the adjacency matrix
const nodes = graph.nodes();
const adjMatrix = nodes.map((from) =>
  nodes.map((to) => (graph.hasEdge(from, to) ? 1 : 0)).join(' ')
);

// Write the adjacency matrix and node positions to a text file
const nodePositions = nodes
  .map((node) => `${graph.node(node).pos[1]} ${graph.node(node).pos[0]}`)
  .join('\n');

fs.writeFileSync('output.txt', `${adjMatrix.join('\n')}\n${nodePositions}`);