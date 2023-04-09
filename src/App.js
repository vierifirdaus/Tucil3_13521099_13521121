import { Box, Flex } from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import {UCS,parserInputUCS} from "./ShortestPath/UCS";
import {aStar,parserInputA } from "./ShortestPath/Astar";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState([]);
  const [fileContent, setFileContent] = useState("");

  const onSwitchToggleHandle = (value) => {
    setFileContent("");
    setShowMap(value);
  };

  const onReadFileHandler = (value) => {
    setFileContent(value);
  };

  const onSearchPathHandler = (value) => {
    if (!showMap) {
      const start=1
      const finish=4

      if(UCS(parserInputUCS(fileContent), start, finish).pathTotal===null){
        setPath([])
      }
      else{
        setPath(UCS(parserInputUCS(fileContent), start, finish).pathTotal)
      }

    } else {
      const start=3
      const finish=4

      if(aStar(parserInputA(fileContent).matrix,parserInputA(fileContent).coordinates,start,finish).pathTotal===null){
        setPath([])
      }
      else{
        setPath(aStar(parserInputA(fileContent).matrix,parserInputA(fileContent).coordinates,start,finish).pathTotal)
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
        {!showMap && <NetworkGraph content={fileContent} path={path} />}
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
