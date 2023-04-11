import { Box, Flex } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import { UCS, parserInputUCS } from "./ShortestPath/UCS";
import { aStar, parserInputA, distance } from "./ShortestPath/Astar";
import SidebarAlgo from "./Sidebar/SidebarAlgo";
import PopoverHelp from "./PopoverHelp/PopoverHelp";

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
    setDistance(0);
    setStartEnd([-1, -1]);
  };

  const handleAlgoChange = (value) => {
    if (value !== selectedAlgo) {
      setSelectedAlgo(value);
    }
  };

  const onSearchPathHandler = (value) => {
    if (fileContent == "") {
      alert("Please input a map file.");
    } else if (startEnd[0] == -1 || startEnd[1] == -1) {
      alert("Please select the starting and ending nodes by clicking on the desired node.");
    } else {
      let keterangan=true // jika pake input manual true, jika pake peta false 
      let res;
      if (selectedAlgo == "UCS") {
        const parser = parserInputA(fileContent,keterangan);
        res = UCS(parser.matrix, startEnd[0], startEnd[1]);
      } else {
        const parser = parserInputA(fileContent,keterangan);
        res = aStar(parser, startEnd[0], startEnd[1],keterangan);
      }
      console.log(res.distanceMinimum.toFixed(1));
      setPath(res.pathTotal);
      setDistance(res.distanceMinimum.toFixed(1));
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
      <PopoverHelp />
    </Flex>
  );
}

export default App;
