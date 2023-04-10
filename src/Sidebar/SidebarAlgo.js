import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

function SidebarAlgo() {
  return (
    <Tabs>
      <TabList isFitted>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default SidebarAlgo;