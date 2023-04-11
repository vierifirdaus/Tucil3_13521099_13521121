import { Skeleton } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
  Circle,
  
} from "@react-google-maps/api";
import { useState } from "react";

function Map(props) {
  const [center, setCenter] = useState({ lat: -6.8911125, lng: 107.6101353 });
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [content, setContent] = useState("");  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });
  
  if (!isLoaded) {
    return <Skeleton />;
  }

  const options = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const markerIcon = {
    path: window.google.maps.SymbolPath.CIRCLE,
    fillColor: "#319795",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
    scale: 10,
  };

  const polylineOptions = {
    strokeColor: "#FFFFFF",
    strokeOpacity: 1,
    strokeWeight: 3,
  };




  if (content !== props.content) {
    setContent(props.content);
    
    const graphData = props.content.split("\n");
    const graphMatrix = graphData.map(row => row.split(" ").map(val => parseFloat(val)));
    let n = 0;
    for (let i = 0; i < graphMatrix.length; i++) {
      if (graphMatrix[i].length === 1) {
        n = i;
      }
    }

    const adjacencyMatrix = graphMatrix
      .slice(0, n);

    const nodeCoords = graphMatrix
      .slice(n+1);  

    const nodes = nodeCoords.map((coord, index) => ({
      id: index,
      latitude: coord[0],
      longitude: coord[1],
    }));

    let edges = [];
    for (let i = 0; i < adjacencyMatrix.length; i++) {
      for (let j = i + 1; j < adjacencyMatrix[i].length; j++) {
        if (adjacencyMatrix[i][j]) {
          edges.push({
            id: `${i}-${j}`,
            start: { latitude: nodeCoords[i][0], longitude: nodeCoords[i][1] },
            end: { latitude: nodeCoords[j][0], longitude: nodeCoords[j][1] },
          });
        }
      }
    }

    // console.log({ nodes, edges });
    setCenter({ lat: edges[0].start.latitude, lng: edges[0].start.longitude });
    setGraph({ nodes, edges });    
  }





  return (
    <GoogleMap
      center={center}
      zoom={17}
      mapContainerStyle={mapContainerStyle}
      options={options}
    >
      {graph.nodes.map((node) => (
        <Marker
          key={node.id}
          position={{ lat: node.latitude, lng: node.longitude }}
          icon={markerIcon}
        />
      ))}
      {graph.edges.map((edge) => (
        <Polyline
          key={edge.id}
          path={[
            { lat: edge.start.latitude, lng: edge.start.longitude },
            { lat: edge.end.latitude, lng: edge.end.longitude },
          ]}
          options={polylineOptions}
        />
      ))}
    </GoogleMap>
  );
}

export default Map;
