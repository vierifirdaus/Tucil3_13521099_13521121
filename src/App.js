import { Box, Flex } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import { UCS, parserInputUCS } from "./ShortestPath/UCS";
import { aStar, parserInputA, distance } from "./ShortestPath/Astar";
import SidebarAlgo from "./Sidebar/SidebarAlgo";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState(null);
  const [distance, setDistance] = useState(0);
  const [fileContent, setFileContent] = useState("");
  const [startEnd, setStartEnd] = useState([-1, -1]);
  const [selectedAlgo, setSelectedAlgo] = useState("UCS");

  const onSwitchToggleHandle = (value) => {
    setShowMap(value);
    setFileContent("");
    resetGraph();
  };

  const onReadFileHandler = (value) => {
    setFileContent(value);
  };

  const onStartEndNodeClickHanlder = (value) => {
    setStartEnd(value);
  };

  const resetGraph = (value) => {
    setPath(null);
  };

  const handleAlgoChange = (value) => {
    if (value !== selectedAlgo) {
      setSelectedAlgo(value);
    }
  };

  const onSearchPathHandler = (value) => {
    if (fileContent == "") {
      alert("Please input a file map.");
    } else if (startEnd[0] == -1 || startEnd[1] == -1) {
      alert("Please select the end and the start by clicking on the node.");
    } else {
      const parser = parserInputA(fileContent);
      let res;
      if (selectedAlgo == "UCS") {
        res = UCS(parser.matrix, startEnd[0], startEnd[1]);
      } else {
        res = aStar(parser, startEnd[0], startEnd[1]);
      }
      console.log(res.weight[startEnd[1]].toFixed(1));
      setPath(res.pathTotal);
      setDistance(res.weight[startEnd[1]].toFixed(1));
    }
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgPos="bottom"
      h="100vh"
      w="100vw"
      bgColor={"gray.800"}
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {showMap && (
          <Map
            content={fileContent}
            onStartEndNodeClick={onStartEndNodeClickHanlder}
          />
        )}
        {!showMap && (
          <NetworkGraph
            content={fileContent}
            path={path}
            newGraph={resetGraph}
            onStartEndNodeClick={onStartEndNodeClickHanlder}
          />
        )}
      </Box>
      <Toolbar
        onSwitchToggle={onSwitchToggleHandle}
        onReadFile={onReadFileHandler}
        onSearch={onSearchPathHandler}
      />
      <SidebarAlgo
        tabs={[distance, "UCS", "A*"]}
        selected={selectedAlgo}
        onChange={handleAlgoChange}
        // ml="auto"
      />
    </Flex>
  );
}

export default App;
