import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Toolbar from "./Toolbar/Toolbar";
import Map from "./Map/Map";

function App() {
  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      bgPos="bottom"
      h="100vh"
      w="100vw"
      // bgColor={"teal"}
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <Map />
      </Box>
      <Toolbar />
    </Flex>
  );
}

export default App;
