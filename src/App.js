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

  const handleOnSwitchToggle = (newSwitchValue) => {
    setShowMap(newSwitchValue);
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgPos="bottom"
      h="100vh"
      w="100vw"
      bgColor={"white"}
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {showMap && <Map />}
        {!showMap && <NetworkGraph />}
      </Box>
      <Toolbar onSwitchToggle={handleOnSwitchToggle}/>
    </Flex>
  );
}

export default App;
