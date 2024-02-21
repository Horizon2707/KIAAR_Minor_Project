import React from "react";
import "../Styles/Recommendations.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
} from "@chakra-ui/react";
function Recommendations() {
  const obj = {
    fontSize: "4vh",
    fontWeight: "bold",
  };
  const o = {
    fontSize: "3vh",
    fontWeight: "bold",
    marginTop: "2vh",
  };
  return (
    <>
      <h3 style={{ marginTop: "0.5vh", color: "black" }}>
        Soil Water Test Entry Form
      </h3>
      <div className="recom">
        <Tabs
          align="center"
          size="lg"
          isFitted
          variant="solid-rounded"
          colorScheme="blue"
        >
          <TabList>
            <Tab>Recommendations</Tab>
            <Tab>Suggestions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="spaced">
                <label style={o} htmlFor="soilphH">
                  Soil pH(2:5)
                </label>
                <Input
                  size="md"
                  id="soilph"
                  htmlSize={4}
                  width="auto"
                  variant="filled"
                  placeholder="Enter pH"
                />
              </div>
              <div className="spaced">
                <label style={o} htmlFor="electricalConductivity">
                  Electrical Conductivity
                </label>
                <Input
                  size="md"
                  id="electricalConductivity"
                  width="auto"
                  variant="filled"
                  placeholder="in dS/m"
                />
              </div>
              <div className="spaced">
                <label style={o} htmlFor="organicCarbon">
                  Organic Carbon
                </label>
                <Input
                  size="md"
                  id="organicCarbon"
                  width="auto"
                  variant="filled"
                  placeholder="in %"
                />
              </div>
              <h2
                style={{
                  marginTop: "2vh",
                  marginLeft: "auto",
                }}
              >
                Primary Nutrients
              </h2>
              <div className="spaced">
                <label style={o} htmlFor="nitrogen">
                  Nitrogen
                </label>
                <Input
                  size="md"
                  id="nitrogen"
                  width="auto"
                  variant="filled"
                  placeholder="in kg/acre"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <h1>UNDER CONSTRUCTION</h1>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div className="gridForClass">
        <h3
          style={{
            textAlign: "center",
            fontSize: "5vh",
            fontWeight: "bold",
            marginTop: "3vh",
          }}
        >
          Range of values
        </h3>
        <div className="head">
          <h4 style={obj}>Component Name</h4>
          <h4 style={obj}>Low</h4>
          <h4 style={obj}>Medium</h4>
          <h4 style={obj}>High</h4>
        </div>
        <div className=" similar">
          <div>
            <h4>Soil pH</h4>
          </div>
          <div>
            <h4>&lt;6.5</h4>
          </div>
          <div>
            <h4>6.5-7.5</h4>
          </div>
          <div>
            <h4>&gt;7.5</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recommendations;
