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
  const [fileContent, setFileContent] = useState("");
  const [startEnd, setStartEnd] = useState([-1, -1]);
  const [selectedAlgo, setSelectedAlgo] = useState("UCS");

  const onSwitchToggleHandle = (value) => {
    setShowMap(value);
    resetGraph();
  };

  const onReadFileHandler = (value) => {
    setFileContent("");
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
      if (!showMap) {
        const parser = parserInputA(fileContent);
        if (selectedAlgo == "UCS") {
          setPath(UCS(parser.matrix, startEnd[0], startEnd[1]).pathTotal);
        } else {
          setPath(
            aStar(parser.matrix, parser.coordinates, startEnd[0], startEnd[1])
              .pathTotal
          );
        }
      } else {
        const start = 3;
        const finish = 4;

        if (
          aStar(
            parserInputA(fileContent).matrix,
            parserInputA(fileContent).coordinates,
            start,
            finish
          ).pathTotal === null
        ) {
          setPath([]);
        } else {
          setPath(
            aStar(
              parserInputA(fileContent).matrix,
              parserInputA(fileContent).coordinates,
              start,
              finish
            ).pathTotal
          );
        }
      }
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
        {showMap && <Map />}
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
        tabs={["UCS", "A*"]}
        selected={selectedAlgo}
        onChange={handleAlgoChange}
        // ml="auto"
      />
    </Flex>
  );
}

export default App;
