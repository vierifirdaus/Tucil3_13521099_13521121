import { Box, Flex } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import { UCS, parserInput } from "./ShortestPath/UCS";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [startEnd, setStartEnd] = useState([]);

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

  const onSearchPathHandler = (value) => {
    if (!showMap) {
      setPath(UCS(parserInput(fileContent), startEnd[0], startEnd[1]).pathTotal);
    } else {
    }
  };

  const resetGraph = (value) => {
    setPath(null);
  }

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
        {!showMap && <NetworkGraph content={fileContent} path={path} newGraph={resetGraph} onStartEndNodeClick={onStartEndNodeClickHanlder}/>}
      </Box>
      <Toolbar
        onSwitchToggle={onSwitchToggleHandle}
        onReadFile={onReadFileHandler}
        onSearch={onSearchPathHandler}
      />
    </Flex>
  );
}

export default App;
