import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import { UCS, parserInputUCS } from "./ShortestPath/UCS";
import { aStar, parserInputA, distance,distance_map } from "./ShortestPath/Astar";
import SidebarAlgo from "./Sidebar/SidebarAlgo";
import PopoverHelp from "./PopoverHelp/PopoverHelp";
import SidebarMap from "./Sidebar/SidebarMap";
import { useEffect } from "react";
import mapItb from './Asset/ITB.txt';
import mapBuahbatu from './Asset/buahbatu.txt';
import mapPerumahan from './Asset/perumahan.txt';

function App() {
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [fileContent, setFileContent] = useState("");
  const [startEnd, setStartEnd] = useState([-1, -1]);
  const [selectedAlgo, setSelectedAlgo] = useState("UCS");
  const [showLabel, setShowLabel] = useState(true);
  const [selectedMap, setSelectedMap] = useState("");

  const onSwitchToggleHandle = (value) => {
    setShowMap(value);
    setFileContent("");
    setSelectedMap("");
    resetGraph();
  };

  const onSwitchLabel = (value) => {
    setShowLabel(value);
  };

  const onReadFileHandler = (value) => {
    console.log("test")
    setSelectedMap("");
    resetGraph();
    setFileContent(value);
  };

  const onStartEndNodeClickHanlder = (value) => {
    setStartEnd(value);
  };

  const resetGraph = (value) => {
    setShowLabel(true);
    setPath([]);
    setDistance(0);
    setStartEnd([-1, -1]);
  };

  const handleAlgoChange = (value) => {
    if (value !== selectedAlgo) {
      setSelectedAlgo(value);
    }
  };

  const handleMapChange = (value) => {
        // console.log('value')
    if (value !== selectedMap) {
      setSelectedMap(value);
      if (value === "ITB") setFileContent(mapItb);
      else if (value === "Buah Batu") setFileContent(mapBuahbatu);
      else if (value === "Peru- mahan") setFileContent(mapPerumahan);
    }
  };

  const onSearchPathHandler = (value) => {
    if (fileContent == "") {
      alert("Please input a map file.");
    } else if (startEnd[0] == -1 || startEnd[1] == -1) {
      alert(
        "Please select the starting and ending nodes by clicking on the desired node."
      );
    } else {
      let res;
      if (selectedAlgo == "UCS") {
        const parser = parserInputA(fileContent, false);
        res = UCS(parser.matrix, startEnd[0], startEnd[1]);
        // 231 232 233 380 16 6 489
        console.log(parser.matrix[411][16])
        console.log(parser.matrix[411][380])
        console.log(parser.matrix[411][407])
        console.log(parser.matrix[16][407])
        console.log(parser.matrix[16][380])
        console.log(parser.matrix[380][407])
        // console.log(distance(parser.coordinates[411], parser.coordinates[16],false))
        // console.log(parser.matrix[380][16])
        // console.log(parser.matrix[16][6])
        // console.log(parser.matrix[6][489])
      } else {
        const parser = parserInputA(fileContent, !showMap);
        res = aStar(parser, startEnd[0], startEnd[1], !showMap);
      }
      console.log(startEnd[1], startEnd[0])
      console.log(res.pathTotal)
      
      setPath(res.pathTotal);
      setDistance(res.distanceMinimum.toFixed(1));
    }
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
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
            path={path}
            showLabel={showLabel}
          />
        )}
        {!showMap && (
          <NetworkGraph
            content={fileContent}
            path={path}
            newGraph={resetGraph}
            onStartEndNodeClick={onStartEndNodeClickHanlder}
            showLabel={showLabel}
          />
        )}
      </Box>
      <Toolbar
        onSwitchToggle={onSwitchToggleHandle}
        onReadFile={onReadFileHandler}
        onSearch={onSearchPathHandler}
      />
      <Flex direction="row" mt="auto" mb="auto" alignItems="center">
        {showMap && (
          <SidebarMap
            tabs={["ITB", "Buah Batu", "Peru- mahan"]}
            onChange={handleMapChange}
            selected={selectedMap}
          />
        )}
        <Spacer />
        <SidebarAlgo
          tabs={[distance, "UCS", "A*"]}
          selected={selectedAlgo}
          onChange={handleAlgoChange}
          onShowLabel={onSwitchLabel}
          showLabel={showLabel}
        />
      </Flex>
      <PopoverHelp map={showMap} />
    </Flex>
  );
}

export default App;

