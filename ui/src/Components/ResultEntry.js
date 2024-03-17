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
  var [addSug, setaddSug] = useState("");
  var navigate = useNavigate();
  var [forParams, setForParams] = useState([]);
  // var [Tab, setTab] = useState("");
  var [bool, setBool] = useState();

  var [suggestion, setSuggestion] = useState([]);
  var [Errors, setErrors] = useState({});
  var [toggle, setToggle] = useState(false);

  var [resValues, ressetValues] = useState([]);

  let values = sessionStorage.getItem("values");
  values = JSON.parse(values);
  let postData = () => {
    let com = {
      parameter: resValues,
      values: values,
    }
    const dataString = JSON.stringify(com);
  sessionStorage.setItem('combined', dataString);

    fetch("http://localhost:5000/api/result_entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataString),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("calculations", JSON.stringify(data));
      });
  
  }
  useEffect(() => {
    // let result = sessionStorage.getItem("result");
    // if (result) {
    //   ressetValues(JSON.parse(result));
    // }

    try {
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
          console.log(data);
        });
    } catch (error) {
      console.error("Parameters not found");
    }

    fetch("http://localhost:5000/suggestions", {
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
        setSuggestion(data);
      });
  }, [bool]);
  let setT = (e) => {
    let inputValue = e.target.value;
    setaddSug(inputValue);
  };
  let validate = () => {
    const Errors = {};
    for (const element of forParams) {
      if (!resValues[element.PARAMETER_ID]) {
        Errors[element.PARAMETER_ID] =
          "Please enter a value for " + element.PARAMETER_NAME;
      }
    }
    setErrors(Errors);
    console.log(Errors);
    return Object.keys(Errors).length === 0;
  };
  // let postData = () => {
  //   fetch("http://localhost:5000/api/result_entry", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(resValues),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCalc(data);
  //     });
  // };

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
                        {/* <Tr>
                          <Th>Parameters</Th>
                        </Tr> */}
                        <Tr>
                          <Th>Test Result</Th>
                          <Th></Th>
                          <Th isNumeric>Low</Th>
                          <Th isNumeric>Medium</Th>
                          <Th isNumeric>High</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {forParams.map((element) => {
                          if (element.PARAMETER_TYPE === "HEADING") {
                            return (
                              <Tr key={element.PARAMETER_ID}>
                                <Th>{element.PARAMETER_NAME}</Th>
                              </Tr>
                            );
                          }
                          if (element.PARAMETER_TYPE === "PARAMETER") {
                            return (
                              <Tr key={element.PARAMETER_ID}>
                                <Td>{element.PARAMETER_NAME}</Td>
                                <Td>
                                  <Input
                                    type="number"
                                    size="sm"
                                    id={element.PARAMETER_ID}
                                    htmlSize={4}
                                    width="auto"
                                    variant="filled"
                                    value={resValues[element.PARAMETER_ID]}
                                    onChange={(e) => {
                                      ressetValues({
                                        ...resValues,
                                        [element.PARAMETER_NAME]:
                                          e.target.value,
                                        [element.PARAMETER_ID]: e.target.value,
                                      });
                                    }}
                                  ></Input>
                                  {Errors[element.PARAMETER_ID] && (
                                    <p style={{ color: "red" }}>
                                      {Errors[element.PARAMETER_NAME]}
                                    </p>
                                  )}
                                </Td>
                                <Td>{element.PARAMETER_MIN}</Td>
                                <Td>{element.PARAMETER_MID}</Td>
                                <Td>{element.PARAMETER_MAX}</Td>
                              </Tr>
                            );
                          }
                        })}
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
                            {suggestion.map((element) => {
                              return (
                                <>
                                  <Tr border="1px solid #ddd">
                                    <Checkbox
                                      size="lg"
                                      id={element.SUGGESTION_ID}
                                      value={element.SUGGESTION_ID}
                                      onChange={(e) => {
                                        const updatedSuggestions =
                                          suggestion.map((s) =>
                                            s.SUGGESTION_ID ===
                                            element.SUGGESTION_ID
                                              ? {
                                                  ...s,
                                                  selected: e.target.checked,
                                                }
                                              : s
                                          );
                                        setSuggestion(updatedSuggestions);
                                      }}
                                    >
                                      {element.SUGGESTION_NAME}
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
                      <h3>Add Suggestions</h3>
                      <Textarea
                        placeholder="Multiline"
                        resize="none"
                        rows={1}
                        variant="filled"
                        onChange={setT}
                      />
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
                  postData();
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
                try {
                  fetch("http://localhost:5000/newSuggestion", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      newSuggestion: addSug,
                      test: values.test,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setBool(data.bool);
                    });
                } catch (error) {
                  console.log(error);
                }
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
