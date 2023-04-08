import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Text,
  Switch,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";


function Toolbar() {
  const [fileContent, setFileContent] = useState("");


  function openFileDialog() {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "text/plain";
    inputFile.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
        const contents = event.target.result;
        setFileContent(contents);
      };

      reader.readAsText(file);
    });
    inputFile.click();
  }

  return (
    <Box
      p={4}
      borderRadius="lg"
      mt={4}
      bgColor="white"
      shadow="base"
      minW="container.md"
      zIndex="modal"
    >
      <HStack spacing={4}>
        <Switch id="mapToggle" size="lg" colorScheme="pink" />
        <VStack align="start" spacing={0}>
          <Text fontSize="xs" m="0" fontWeight="bold">
            Use Map?
          </Text>
          <Text fontSize="xs" m="0">
            Turn on to use map
          </Text>
        </VStack>
        <Spacer />
        <Button colorScheme="pink" onClick={openFileDialog} >Choose File</Button>
        <IconButton
          colorScheme='pink'
          aria-label="center back"
          icon={<FaLocationArrow />}
          onClick={() => alert(123)}
        />
      </HStack>
    </Box>
  );
}

export default Toolbar;
