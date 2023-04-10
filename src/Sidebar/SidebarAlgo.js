import { useState } from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

function SidebarAlgo({ tabs, selected, onChange }) {
  return (
    <Tabs
      orientation="vertical"
      isLazy
      onChange={(index) => onChange(tabs[index])}
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
        {tabs.map((tab) => (
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
        ))}
      </TabList>
    </Tabs>
  );
}

export default SidebarAlgo;
