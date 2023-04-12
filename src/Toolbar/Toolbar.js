import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Switch,
  VStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

function Toolbar(props) {
  const handleSwitchToggle = (event) => {
    props.onSwitchToggle(event.target.checked);
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
        console.log(contents);
      };

      reader.readAsText(file);
    });
    inputFile.click();
  }

  return (
    <Flex zIndex="modal">
      <HStack
        flexBasis={{base: "90%", sm: "85%", md: "70%", lg: "70%"}}
        maxW="container.md"
        spacing={4}
        w="container.sm"
        p={4}
        borderRadius="xl"
        bgColor="white"
        shadow="base"
        ml="auto"
        mr="auto"
        mt={4}
      >
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
    </Flex>
  );
}

export default Toolbar;
