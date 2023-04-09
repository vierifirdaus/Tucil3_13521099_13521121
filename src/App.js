import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";
import { useState } from "react";
import NetworkGraph from "./NetworkGraph/NetworkGraph";

function App() {
  const [showMap, setShowMap] = useState(false);
  const [fileContent, setFileContent] = useState("");

  const handleOnSwitchToggle = (value) => {
    setFileContent("");
    setShowMap(value);
  }

  var handleOnReadFile;

  if (!showMap) {
    handleOnReadFile = (value) => {
      setFileContent(value);
    }    
  } else {

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
        {!showMap && <NetworkGraph content={fileContent} />}
      </Box>
      <Toolbar onSwitchToggle={handleOnSwitchToggle} onReadFile={handleOnReadFile}/>
    </Flex>
  );
}

export default App;
