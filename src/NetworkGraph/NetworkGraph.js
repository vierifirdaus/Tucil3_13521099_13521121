import React from "react";
import Graph from "react-graph-vis";

function NetworkGraph() {
  const matrixString = "0 5 7 0 0 \n5 0 4 5 0 \n7 4 0 0 3 \n0 5 0 0 2 \n0 0 2 2 0";
  var { nodes, edges } = parseWeightedAdjacencyMatrix(matrixString);
  // var { nodes, edges } = colorEdgesBetweenNodes([1,2,3], {nodes:nodes,edges: edges,})
  const graph = {
    nodes:nodes,
    edges: edges,
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      width: 2,
      arrows: { to: { enabled: false } },
    },
    nodes: {
      shape: "circle", // Set shape to "dot"
      color: {
        background: "#D53F8C",
        border: "#000000",
      },
      font: {
        color: "#000000",
      },
      size: 20,
    },
  };

  return <Graph graph={graph} options={options} />;
}

export default NetworkGraph;


function parseWeightedAdjacencyMatrix(matrixString) {
  const rows = matrixString.trim().split('\n');
  const matrix = rows.map(row => row.split(' ').map(val => parseInt(val)));

  const nodes = matrix.map((row, index) => ({ id: index, label: `Node ${index}` }));
  const edges = [];

  var sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0 && matrix[i][j].toString() != 'NaN') {
        sum += matrix[i][j];
      }
    }
  }

  var pengali = 1;
  var rasio = sum / matrix.length;
  console.log(rasio);
  if (rasio < 5) {
    pengali = 30;
  } else if (rasio < 10) {
    pengali = 25;
  } else if (rasio < 15) {
    pengali = 20;
  } else if (rasio < 20) {
    pengali = 15;
  } else {
    pengali = 10;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0 && matrix[i][j].toString() != 'NaN') {
        edges.push({ from: i, to: j, label: matrix[i][j].toString(), length: matrix[i][j]*pengali});
      }
    }
  }

  return { nodes, edges };
}

function colorEdgesBetweenNodes(nodesList, graph) {
  const { nodes, edges } = graph;
  edges.forEach(edge => {
    if (nodesList.includes(edge.from) && nodesList.includes(edge.to)) {
      edge.color = 'red';
    }
  });
  return { nodes, edges };
}