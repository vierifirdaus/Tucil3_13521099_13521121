import {
  Tabs,
  TabList,
  Tab,
  Switch,
  VStack,
  Text,
  Spacer,
} from "@chakra-ui/react";

function SidebarAlgo(props) {
  const handleSwitchToggle = (event) => {
    props.onShowLabel(event.target.checked);
  }

  return (
    <Tabs
      orientation="vertical"
      isLazy
      onChange={(index) => {
        if (index !== 0) {
          props.onChange(props.tabs[index]);
        }
      }}
      zIndex="modal"
    >
      <TabList
        sx={{
          borderRadius: "xl",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
          overflow: "hidden",
          border: "none",
        }}
      >
        <VStack
          w="55px"
          h="80px"
          bgColor="white"
          borderBottom="5px solid black"
        >
          <Spacer />
          <Text fontSize="xs" m="0" fontWeight="medium" textAlign="center">
            Label
          </Text>
          <Switch size="md" colorScheme="teal" isChecked={props.showLabel} onChange={handleSwitchToggle}/>
          <Spacer />
        </VStack>
        {props.tabs.map((tab) => {
          if (tab === "UCS" || tab === "A*") {
            return (
              <Tab
                key={tab}
                _selected={{ bg: "teal.500", color: "white" }}
                sx={{
                  color: props.selected === tab ? "white" : "gray.500",
                  fontWeight: props.selected === tab ? "bold" : "normal",
                  bg: props.selected === tab ? "teal.500" : "white",
                  w: "55px",
                  h: "160px",
                }}
              >
                {tab}
              </Tab>
            );
          } else {
            return (
              <Tab
                // isDisabled
                // _focus={{ boxShadow: "none" }}
                // tabStyleProps={{ opacity: 1, pointerEvents: "none" }}
                _hover={{ cursor: "default" }}
                key={tab}
                bg="white"
                color="teal.500"
                // bg="black"
                // color="white"
                fontWeight="bold"
                w="55px"
                h="80px"
                borderBottom="5px solid black"
              >
                {tab}
              </Tab>
            );
          }
        })}
      </TabList>
    </Tabs>
  );
}

export default SidebarAlgo;
