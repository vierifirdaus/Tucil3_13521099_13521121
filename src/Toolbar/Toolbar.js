import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Switch,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

function Toolbar(props) {
  const handleSwitchToggle = (event) => {
    const newSwitchValue = event.target.checked;
    props.onSwitchToggle(newSwitchValue);
  };

  function openFileDialog() {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "text/plain";
    inputFile.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const contents = event.target.result;
        props.onReadFile(contents);
      };

      reader.readAsText(file);
    });
    inputFile.click();
  }

  return (
    <Box
      p={4}
      borderRadius="xl"
      mt={4}
      bgColor="white"
      shadow="base"
      minW="container.md"
      zIndex="modal"
    >
      <HStack spacing={4}>
        <Switch
          id="mapToggle"
          size="lg"
          colorScheme="teal"
          onChange={handleSwitchToggle}
        />
        <VStack align="start" spacing={0}>
          <Text fontSize="xs" m="0" fontWeight="bold">
            Use Map?
          </Text>
          <Text fontSize="xs" m="0">
            Turn on to use map
          </Text>
        </VStack>
        <Spacer />
        <Button colorScheme="teal" onClick={openFileDialog}>
          Choose File
        </Button>
        <IconButton
          colorScheme="teal"
          aria-label="center back"
          icon={<FaLocationArrow />}
          onClick={() => props.onSearch()}
        />
      </HStack>
    </Box>
  );
}

export default Toolbar;
