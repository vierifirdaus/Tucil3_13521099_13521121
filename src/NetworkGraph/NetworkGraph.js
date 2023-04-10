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
  if (props.content === "") {
    returnVal = null;
  } else {
    if (content !== props.content) {
      setContent(props.content);
      setGraphKey(uuidv4());
      setStartEndNodes([-1, -1]);
      props.newGraph();
    }
    
    const graph = createGraph(props.content);
    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: "#ffffff",
        width: 2,
        arrows: { to: { enabled: false } },
      },
      physics: false,
      nodes: {
        shape: "circle", // Set shape to "dot"
        color: { background: "#319795", border: "#ffffff" },
        fixed: true,
        font: {
          color: "#ffffff",
        },
        size: 20,
      },
    };
    const handleNodeClick = (event) => {
      const { nodes } = event;
      const clickedNodeId = nodes[0];
      if (startEndNodes[0] === clickedNodeId) {
        setStartEndNodes([-1, startEndNodes[1]]);
        props.onStartEndNodeClick([-1, startEndNodes[1]]);
      } else if (startEndNodes[1] === clickedNodeId) {
        setStartEndNodes([startEndNodes[0], -1]);
        props.onStartEndNodeClick([startEndNodes[0], -1]);
      } else if (startEndNodes[0] === -1) {
        setStartEndNodes([clickedNodeId, startEndNodes[1]]);
        props.onStartEndNodeClick([clickedNodeId, startEndNodes[1]]);
      } else if (startEndNodes[1] === -1) {
        setStartEndNodes([startEndNodes[0], clickedNodeId]);
        props.onStartEndNodeClick([startEndNodes[0], clickedNodeId]);
      }
    };

    const modifiedNodes = graph.nodes.map((node) => {
      let color = "#319795";
      if (startEndNodes[0] === node.id) {
        // start
        color = "#38A169";
      } else if (startEndNodes[1] === node.id) {
        // end
        color = "#E53E3E";
      }
      return {
        ...node,
        color: {
          background: color,
          border: "#ffffff",
        },
      };
    });

    let modifiedGraphData = {
      ...graph,
      nodes: modifiedNodes,
    };
    if (props.path !== null) {
      modifiedGraphData = colorEdgesBetweenNodes(props.path, modifiedGraphData);
    }

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

function createGraph(adjacencyMatrixString) {
  // rekomendasi jarak antar node adalah > 10 supaya tidak terlihat terlalu dempet  
  const asArray = adjacencyMatrixString
    .split("\n")
    .map((row) => row.split(" ").map((val) => parseInt(val)));

  var n = -1;
  for (let i = 0; i < asArray.length; i++) {
    if (asArray[i].length === 1) {
      n = i;
    }
  }

  const adjacencyMatrix = asArray.slice(0, n+1);
  const coordinates = asArray.slice(n+1, asArray.length);

  // Create the nodes for the graph
  const nodes = coordinates.map((coord, index) => {
    return { id: index , x: coord[0]*10, y: coord[1]*10, label: "Node " + index};
  });

  // Create the edges for the graph
  const edges = [];
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    for (let j = i + 1; j < adjacencyMatrix[i].length; j++) {
      if (adjacencyMatrix[i][j] === 1) {
        const length = Math.sqrt(Math.pow(coordinates[j][0] - coordinates[i][0], 2) + Math.pow(coordinates[j][1] - coordinates[i][1], 2)).toFixed(1);
        edges.push({ from: i , to: j , label: length, length: length});
      }
    }
  }
  return { nodes, edges };
}

function colorEdgesBetweenNodes(nodesList, graph) {
  const { nodes, edges } = graph;
 
  edges.forEach((edge) => {
    edge.color = "#ffffff";
  });
  
  edges.forEach((edge) => {
    if (nodesList.includes(edge.from) && nodesList.includes(edge.to)) {
      edge.color = "red";
    }
  });
  return { nodes, edges };
}
