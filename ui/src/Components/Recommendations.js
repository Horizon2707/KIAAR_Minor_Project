import React from "react";
import "../Styles/Recommendations.css";
import { Button } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
function Recommendations() {
  return (
    <>
      <h1
        style={{
          fontSize: "x-large",
          marginTop: "1.5vh",
          color: "black",
          textAlign: "left",
          marginLeft: "5vh",
        }}
      >
        Soil Water Test Entry Form
      </h1>
      <div className="recom">
        <Tabs
          align="center"
          size="sm"
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
              <TableContainer>
                <Table colorScheme="red" size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Parameters</Th>
                    </Tr>
                    <Tr>
                      <Th>Chemical Parameters</Th>
                      <Th>Test Result</Th>
                      <Th isNumeric>Low</Th>
                      <Th isNumeric>Medium</Th>
                      <Th isNumeric>High</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Soil pH(2:5)</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="soilph"
                          htmlSize={4}
                          width="auto"
                          variant="filled"
                          placeholder="Enter pH"
                        ></Input>
                      </Td>
                      <Td>&lt;6.5</Td>
                      <Td>6.5-7.5</Td>
                      <Td>&gt;7.5</Td>
                    </Tr>
                    <Tr>
                      <Td>Electrical Conductivity</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="electricalConductivity"
                          htmlSize={4}
                          width="auto"
                          variant="filled"
                          placeholder="in dS/m"
                        ></Input>
                      </Td>
                      <Td>&lt;1</Td>
                      <Td>1-2</Td>
                      <Td>&gt;2</Td>
                    </Tr>
                    <Tr>
                      <Td>Organic Carbon(OC)</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="organicCarbon"
                          htmlSize={4}
                          width="auto"
                          variant="filled"
                          placeholder="in %"
                        ></Input>
                      </Td>
                      <Td>&lt;0.5</Td>
                      <Td>0.5-7.5</Td>
                      <Td>&gt;7.5</Td>
                    </Tr>
                    <Tr>
                      <Th>Primary Nutrients</Th>
                    </Tr>
                    <Tr>
                      <Td>Nitrogen</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="nitrogen"
                          width="auto"
                          variant="filled"
                          placeholder="in kg/acre"
                        ></Input>
                      </Td>
                      <Td>&lt;112</Td>
                      <Td>112-224</Td>
                      <Td>&gt;224</Td>
                    </Tr>
                    <Tr>
                      <Td>Phosphorus</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="phosphorus"
                          width="auto"
                          variant="filled"
                          placeholder="in kg/acre"
                        ></Input>
                      </Td>
                      <Td>&lt;8.0</Td>
                      <Td>8.0-20.0</Td>
                      <Td>&gt;20.0</Td>
                    </Tr>
                    <Tr>
                      <Td>Potassium</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="potassium"
                          width="auto"
                          variant="filled"
                          placeholder="in kg/acre"
                        ></Input>
                      </Td>
                      <Td>&lt;45.0</Td>
                      <Td>45.0-136</Td>
                      <Td>&gt;136.0</Td>
                    </Tr>
                    <Tr>
                      <Th>Secondary Nutrients</Th>
                    </Tr>
                    <Tr>
                      <Td>Calcium</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="calcium"
                          width="auto"
                          variant="filled"
                          placeholder="in m.e/100g"
                        ></Input>
                      </Td>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td>-</Td>
                    </Tr>
                    <Tr>
                      <Td>Magnesium</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="magnesium"
                          width="auto"
                          variant="filled"
                          placeholder="in m.e/100g"
                        ></Input>
                      </Td>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td>-</Td>
                    </Tr>
                    <Tr>
                      <Td>Sulphur</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="sulphur"
                          width="auto"
                          variant="filled"
                          placeholder="in ppm"
                        ></Input>
                      </Td>
                      <Td>&lt;10</Td>
                      <Td>10-20</Td>
                      <Td>&gt;20</Td>
                    </Tr>
                    <Tr>
                      <Th>Micro Nutrients</Th>
                    </Tr>
                    <Tr>
                      <Td>Zinc</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="zinc"
                          width="auto"
                          variant="filled"
                          placeholder="in ppm"
                        ></Input>
                      </Td>
                      <Td>&lt;0.6</Td>
                      <Td>0.6-1.5</Td>
                      <Td>&gt;1.5</Td>
                    </Tr>
                    <Tr>
                      <Td>Iron</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="iron"
                          width="auto"
                          variant="filled"
                          placeholder="in ppm"
                        ></Input>
                      </Td>
                      <Td>&lt;2.5</Td>
                      <Td>2.5-4.5</Td>
                      <Td>&gt;4.5</Td>
                    </Tr>
                    <Tr>
                      <Td>Manganese</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="manganese"
                          width="auto"
                          variant="filled"
                          placeholder="in ppm"
                        ></Input>
                      </Td>
                      <Td>&lt;2</Td>
                      <Td>2-4</Td>
                      <Td>&gt;4</Td>
                    </Tr>
                    <Tr>
                      <Td>Copper</Td>
                      <Td>
                        <Input
                          type="number"
                          size="sm"
                          id="copper"
                          width="auto"
                          variant="filled"
                          placeholder="in ppm"
                        ></Input>
                      </Td>
                      <Td>&lt;0.2</Td>
                      <Td>0.2-0.5</Td>
                      <Td>&gt;0.5</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <h1 style={{ fontSize: "10vh" }}>UNDER CONSTRUCTION</h1>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div className="buttongrp">
        <Button
          background="#CCE5FF"
          color="#000000"
          size="md"
          type="submit"
          onClick={() => {
            console.log("Save Button Clicked");
          }}
        >
          Save
        </Button>
   
        <Button
          background="#CCE5FF"
          color="#000000"
          size="md"
          onClick={() => {
            console.log("Print Button Clicked");
          }}
        >
         Print
        </Button>
      </div>
      <br /><br />
    </>
  );
}

export default Recommendations;
