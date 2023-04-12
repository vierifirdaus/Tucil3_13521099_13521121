import { Box, Flex, Spacer } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import { UCS, parserInputUCS } from "./ShortestPath/UCS";
import { aStar, parserInputA, distance } from "./ShortestPath/Astar";
import SidebarAlgo from "./Sidebar/SidebarAlgo";
import PopoverHelp from "./PopoverHelp/PopoverHelp";
import SidebarMap from "./Sidebar/SidebarMap";
import mapItb from "./Asset/ITB.txt";
import mapBuahbatu from "./Asset/buahbatu.txt";
import mapPerumahan from "./Asset/perumahan.txt";
import mapPekanbaru from "./Asset/pekanbaru.txt";
import InvalidAlertDialog from "./InvalidAlertDialog/InvalidAlertDialog";
import checkInput from "./ShortestPath/checkInput";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [fileContent, setFileContent] = useState("");
  const [startEnd, setStartEnd] = useState([-1, -1]);
  const [selectedAlgo, setSelectedAlgo] = useState("UCS");
  const [showLabel, setShowLabel] = useState(true);
  const [selectedMap, setSelectedMap] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({title:"", desc:""});

  const onSwitchToggleHandle = (value) => {
    setShowLabel(true);
    setShowMap(value);
    setFileContent("");
    setSelectedMap("");
    resetGraph();
  };

  const onSwitchLabel = (value) => {
    setShowLabel(value);
  };

  const onReadFileHandler = (value) => {
    // console.log(value)
    if (checkInput(value, !showMap)) {
      setShowLabel(true);
      setSelectedMap("");
      resetGraph();
      setFileContent(value);
    } else {
      setIsAlertOpen(true)
      setAlertInfo({title:"Invalid File Input", desc: "The file input is not in the correct format. Please check README.md for the file format rules."})
    }
  };

  const onStartEndNodeClickHanlder = (value) => {
    setStartEnd(value);
  };

  const resetGraph = (value) => {
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
      resetGraph();
      setSelectedMap(value);
      if (value === "ITB") setFileContent(mapItb);
      else if (value === "Buah Batu") setFileContent(mapBuahbatu);
      else if (value === "Peru- mahan") setFileContent(mapPerumahan);
      else if (value === "Pekan- baru") setFileContent(mapPekanbaru);
    }
  };

  const onSearchPathHandler = (value) => {
    if (fileContent == "") {
      setIsAlertOpen(true);
      if (showMap) setAlertInfo({title: "Invalid Action", desc: "Please select a map from the left sidebar or input a map file."});
      else setAlertInfo({title: "Invalid Action", desc: "Please input a graph file."});
    } else if (startEnd[0] == -1 || startEnd[1] == -1) {
      setIsAlertOpen(true);
      setAlertInfo({title: "Invalid Action", desc: "Please select the starting and ending nodes by clicking on the desired node."})
    } else {
      let res;
      if (selectedAlgo == "UCS") {
        const parser = parserInputA(fileContent, !showMap);
        res = UCS(parser.matrix, startEnd[0], startEnd[1]);
      } else {
        const parser = parserInputA(fileContent, !showMap);
        res = aStar(parser, startEnd[0], startEnd[1], !showMap);
      }
      // console.log(startEnd[1], startEnd[0])
      // console.log(res.pathTotal)
      // console.log(res.pathTotal);
      setPath(res.pathTotal);
      setDistance(res.distanceMinimum.toFixed(1));
    }
  };

  return (
    <>
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
              tabs={["ITB", "Buah Batu", "Peru- mahan", "Pekan- baru"]}
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
      <InvalidAlertDialog isOpen={isAlertOpen} info={alertInfo} onClose={() => setIsAlertOpen(false)}/>
    </>
  );
}

export default App;
