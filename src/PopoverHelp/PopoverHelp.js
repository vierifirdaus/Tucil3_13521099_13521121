import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Icon
} from '@chakra-ui/react';
import { TfiHelpAlt } from "react-icons/tfi";

const PopoverHelp = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onClose={handleClose} zIndex="modal">
      <PopoverTrigger >
        <Button ml="auto" mr="20px" mb="20px" onClick={handleOpen} borderRadius="full" bg="white" _hover={{ bg: "gray.300" }} _active={{ bg: "gray.400" }} p="0">
          <Icon as={TfiHelpAlt} color="teal.500" boxSize={6}  />
        </Button>
      </PopoverTrigger>
      <PopoverContent m="0 60px" >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" >Need some help?</PopoverHeader>
        <PopoverBody>
          To set the starting and ending nodes, simply click on the desired node, and then click the rightmost button located on the toolbar. Click the node again to unselect it.
          The path length is on top of the right sidebar.
          {props.map && " The label length is in meters while the total path length is in kilometers. You can pick a readily available map from the left sidebar. You can also upload your own from the input file"}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverHelp;