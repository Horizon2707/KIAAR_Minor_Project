import React, { useEffect, useState } from "react";
import "../Styles/ResultEntry.css";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
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
  Tr,
  TableCaption,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Recom from "./Recom";

function ResultEntry() {

  var navigate = useNavigate();
  var [forParams, setForParams] = useState([]);
  useEffect(() => {
    let result = sessionStorage.getItem("result");
    if (result) {
      ressetValues(JSON.parse(result));
    }
    let values = sessionStorage.getItem("values");

    values = JSON.parse(values);
    console.log(values);
    if (values) {
      fetch("http://localhost:5000/parameters", {
 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          test: values.test,
        }),

      })
        .then((response) => response.json())
        .then((data) => {
          setForParams(data);

      })
    }
  });

          console.log(data);
        });
    }
  }, []);
  var sugArr = [
    {
      id: 1,
      name: "Suggestion 1",
      selected: 0,
    },
    {
      id: 2,
      name: "Suggestion 2",
      selected: 0,
    },
    {
      id: 3,
      name: "Suggestion 1",
      selected: 0,
    },
  ];
  var [forParams, setForParams] = useState([]);
  var [Remarks, setRemarks] = useState({
    suggestion: sugArr,
    final: "",
  });
  var [Errors, setErrors] = useState({});
  var [toggle, setToggle] = useState(false);

  var [resValues, ressetValues] = useState({
    soilph: "",
    electricalConductivity: "",
    organicCarbon: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    calcium: "",
    magnesium: "",
    sulphur: "",
    zinc: "",
    iron: "",
    manganese: "",
    copper: "",
  });
  let [calc, setCalc] = useState({});

  let validate = () => {
    const Errors = {};
    if (resValues.soilph === "") {
      Errors.soilph = "Soil pH is required";
    }
    if (resValues.electricalConductivity === "") {
      Errors.electricalConductivity = "Electrical Conductivity is required";
    }
    if (resValues.organicCarbon === "") {
      Errors.organicCarbon = "Organic Carbon is required";
    }
    if (resValues.nitrogen === "") {
      Errors.nitrogen = "Nitrogen is required";
    }
    if (resValues.phosphorus === "") {
      Errors.phosphorus = "Phosphorus is required";
    }
    if (resValues.potassium === "") {
      Errors.potassium = "Potassium is required";
    }
    if (resValues.calcium === "") {
      Errors.calcium = "Calcium is required";
    }
    if (resValues.magnesium === "") {
      Errors.magnesium = "Magnesium is required";
    }
    if (resValues.sulphur === "") {
      Errors.sulphur = "Sulphur is required";
    }
    if (resValues.zinc === "") {
      Errors.zinc = "Zinc is required";
    }
    if (resValues.iron === "") {
      Errors.iron = "Iron is required";
    }
    if (resValues.manganese === "") {
      Errors.manganese = "Manganese is required";
    }
    if (resValues.copper === "") {
      Errors.copper = "Copper is required";
    }
    setErrors(Errors);
    return Object.keys(Errors).length === 0;
  };
  let postData = () => {
    fetch("http://localhost:5000/api/result_entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setCalc(data);
      });
  };

  return (
    <>
      {toggle && (
        <>
          <Recom data={"from ResultEn"} />
        </>
      )}
      {!toggle && (
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
                <Tab>Result Entry</Tab>
                <Tab>Suggestions and Remarks</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TableContainer>
                    <Table size="sm" variant="simple">
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
                              value={resValues.soilph}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  soilph: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.soilph && (
                              <p style={{ color: "red" }}>{Errors.soilph}</p>
                            )}
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
                              value={resValues.electricalConductivity}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  electricalConductivity: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.electricalConductivity && (
                              <p style={{ color: "red" }}>
                                {Errors.electricalConductivity}
                              </p>
                            )}
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
                              value={resValues.organicCarbon}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  organicCarbon: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.organicCarbon && (
                              <p style={{ color: "red" }}>
                                {Errors.organicCarbon}
                              </p>
                            )}
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
                              value={resValues.nitrogen}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  nitrogen: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.nitrogen && (
                              <p style={{ color: "red" }}>{Errors.nitrogen}</p>
                            )}
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
                              value={resValues.phosphorus}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  phosphorus: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.phosphorus && (
                              <p style={{ color: "red" }}>
                                {Errors.phosphorus}
                              </p>
                            )}
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
                              value={resValues.potassium}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  potassium: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.potassium && (
                              <p style={{ color: "red" }}>{Errors.potassium}</p>
                            )}
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
                              value={resValues.calcium}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  calcium: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.calcium && (
                              <p style={{ color: "red" }}>{Errors.calcium}</p>
                            )}
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
                              value={resValues.magnesium}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  magnesium: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.magnesium && (
                              <p style={{ color: "red" }}>{Errors.magnesium}</p>
                            )}
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
                              value={resValues.sulphur}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  sulphur: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.sulphur && (
                              <p style={{ color: "red" }}>{Errors.sulphur}</p>
                            )}
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
                              value={resValues.zinc}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  zinc: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.zinc && (
                              <p style={{ color: "red" }}>{Errors.zinc}</p>
                            )}
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
                              value={resValues.iron}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  iron: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.iron && (
                              <p style={{ color: "red" }}>{Errors.iron}</p>
                            )}
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
                              value={resValues.manganese}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  manganese: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.manganese && (
                              <p style={{ color: "red" }}>{Errors.manganese}</p>
                            )}
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
                              value={resValues.copper}
                              onChange={(e) => {
                                ressetValues({
                                  ...resValues,
                                  copper: e.target.value,
                                });
                              }}
                            ></Input>
                            {Errors.copper && (
                              <p style={{ color: "red" }}>{Errors.copper}</p>
                            )}
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
                  <div className="panel">
                    <div className="Suggestions">
                      <TableContainer>
                        <Table size="md" variant="simple">
                          <TableCaption placement="top">
                            Suggestions
                          </TableCaption>
                          <Thead>
                            <Tr border="1px solid #ddd">
                              <Th border="1px solid #ddd"> Suggestions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {sugArr.map((suggestion) => {
                              return (
                                <>
                                  <Tr border="1px solid #ddd">
                                    <Checkbox
                                      size="lg"
                                      id={suggestion.id}
                                      value={suggestion.selected}
                                      onChange={(e) => {
                                        setRemarks({
                                          ...Remarks,
                                          suggestion: Remarks.suggestion.map(
                                            (s) =>
                                              s.id === suggestion.id
                                                ? {
                                                    ...s,
                                                    selected: e.target.checked,
                                                  }
                                                : s
                                          ),
                                        });
                                        console.log(Remarks);
                                      }}
                                    >
                                      {suggestion.name}
                                    </Checkbox>
                                  </Tr>
                                </>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div className="final">
                      <h3>Final Remarks</h3>
                      <Textarea
                        placeholder="Multiline"
                        resize="none"
                        rows={7} // Set the number of rows to 7
                        variant="filled"
                      />
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          <div className="buttongrp">
            <Button
              background="#CCE5FF"
              color="#000000"
              size="md"
              onClick={() => {
                if (validate()) {
                  //postData();
                  navigate("/recommendations");
                  sessionStorage.setItem("result", JSON.stringify(resValues));
                  setToggle(!toggle);
                }
              }}
            >
              Go to Recommendations
            </Button>
            <Button
              background="#CCE5FF"
              color="#000000"
              size="md"
              onClick={() => {
                console.log("Save");
              }}
            >
              Save
            </Button>
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default ResultEntry;
