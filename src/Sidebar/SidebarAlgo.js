import { useState } from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

function SidebarAlgo({ tabs, selected, onChange }) {
  return (
    <Tabs
      orientation="vertical"
      isLazy
      onChange={(index) => {
        if (index !== 0) {
          onChange(tabs[index])}
        }
      }
        
      zIndex="modal"
      ml="auto"
      mt="auto"
      mb="auto"
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
        {tabs.map((tab) => {
          console.log(tab);
          if (tab === "UCS" || tab === "A*") {
            return (
              <Tab
                key={tab}
                _selected={{ bg: "teal.500", color: "white" }}
                sx={{
                  color: selected === tab ? "white" : "gray.500",
                  fontWeight: selected === tab ? "bold" : "normal",
                  bg: selected === tab ? "teal.500" : "white",
                  w: "45px",
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
                w="45px"
                h="60px"
                borderBottom="5px solid black"
              >
                {tab !== 0 && tab}
              </Tab>
            );
          }
        })}
      </TabList>
    </Tabs>
  );
}

export default SidebarAlgo;
