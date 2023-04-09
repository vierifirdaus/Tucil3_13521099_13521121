import React, { useState } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";

function NetworkGraph(props) {
  // start node -> idx: 0
  // end node   -> idx: 1
  const [startEndNodes, setStartEndNodes] = useState([-1, -1]);
  const [graphKey, setGraphKey] = useState(uuidv4());
  const [content, setContent] = useState("");
  var returnVal;
  // console.log(startEndNodes)
  if (props.content == "") {
    returnVal = null;
  } else {
    if (content != props.content) {
      setContent(props.content);
      setGraphKey(uuidv4());
      setStartEndNodes([-1, -1]);
    }
    var graph = parseWeightedAdjacencyMatrix(props.content);
    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: "#ffffff",
        width: 2,
        arrows: { to: { enabled: false } },
      },
      nodes: {
        shape: "circle", // Set shape to "dot"
        color: { background: "#319795", border: "#ffffff" },
        font: {
          color: "#ffffff",
        },
        size: 20,
      },
    };
    const handleNodeClick = (event) => {
      const { nodes } = event;
      const clickedNodeId = nodes[0];
      if (startEndNodes[0] == clickedNodeId) {
        setStartEndNodes([-1, startEndNodes[1]]);
      } else if (startEndNodes[1] == clickedNodeId) {
        setStartEndNodes([startEndNodes[0], -1]);
      } else if (startEndNodes[0] == -1) {
        setStartEndNodes([clickedNodeId, startEndNodes[1]]);
      } else if (startEndNodes[1] == -1) {
        startEndNodes[1] = clickedNodeId;
        setStartEndNodes([startEndNodes[0], clickedNodeId]);
      }
    };

    const modifiedNodes = graph.nodes.map((node) => {
      let color = "#319795";
      if (startEndNodes[0] == node.id) {
        // start
        color = "#38A169";
      } else if (startEndNodes[1] == node.id) {
        // end
        color = "#E53E3E";
      }
      // console.log(color);
      return {
        ...node,
        color: {
          background: color,
          border: "#ffffff",
        },
      };
    });

    const modifiedGraphData = {
      ...graph,
      nodes: modifiedNodes,
    };
    returnVal = (
      <Graph
        key={graphKey}
        graph={modifiedGraphData}
        options={options}
        events={{ selectNode: handleNodeClick }}
      />
    );
  }

  return returnVal;

  // var { nodes, edges } = colorEdgesBetweenNodes([1,2,3], {nodes:nodes,edges: edges,})
}

export default NetworkGraph;

function parseWeightedAdjacencyMatrix(matrixString) {
  const rows = matrixString.trim().split("\n");
  const matrix = rows.map((row) => row.split(" ").map((val) => parseInt(val)));

  const nodes = matrix.map((row, index) => ({
    id: index,
    label: `Node ${index}`,
  }));
  const edges = [];

  var sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0 && matrix[i][j].toString() != "NaN") {
        sum += matrix[i][j];
      }
    }
  }

  var pengali = 1;
  var rasio = sum / matrix.length;
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
      if (matrix[i][j] !== 0 && matrix[i][j].toString() != "NaN") {
        edges.push({
          from: i,
          to: j,
          label: matrix[i][j].toString(),
          length: matrix[i][j] * pengali,
        });
      }
    }
  }

  return { nodes: nodes, edges: edges };
}

function colorEdgesBetweenNodes(nodesList, graph) {
  const { nodes, edges } = graph;
  edges.forEach((edge) => {
    if (nodesList.includes(edge.from) && nodesList.includes(edge.to)) {
      edge.color = "red";
    }
  });
  return { nodes, edges };
}
