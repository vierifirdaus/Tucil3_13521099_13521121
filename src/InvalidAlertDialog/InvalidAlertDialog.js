import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

function InvalidAlertDialog(props) {
  const onClose = () => props.onClose();
  const cancelRef = useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={props.isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent alignSelf="flex-start" mt="10rem" borderRadius="xl" >
        <AlertDialogHeader fontWeight='bold' borderBottom="3px solid black" >{props.info.title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {props.info.desc}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" ref={cancelRef} onClick={onClose} >
            Okay
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InvalidAlertDialog;