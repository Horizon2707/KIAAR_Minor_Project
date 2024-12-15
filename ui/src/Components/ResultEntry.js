import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/ResultEntry.css";
import { Button } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Nav from "./Nav";
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
  Alert,
  AlertIcon,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useRef } from "react";
import PdfViewerComponent from "./PdfViewerComponent";
function ResultEntry() {
  const alertRef = useRef(null);
  const [pdf, setPdf] = useState();
  var [addSug, setaddSug] = useState("");
  var [forParams, setForParams] = useState([]);
  var [bool, setBool] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  var [suggestion, setSuggestion] = useState([]);
  var [Errors, setErrors] = useState({});
  var [toggle, setToggle] = useState(false);
  const [alertTog, setalertTog] = useState(false);
  var [resValues, ressetValues] = useState([]);
  const [finalRemarks, setFinalRemarks] = useState("");
  // const [blob, setBlob] = useState();
  let values = sessionStorage.getItem("values");
  let local = sessionStorage.getItem("local");
  let userI = sessionStorage.getItem("user");
  values = JSON.parse(values);
  local = JSON.parse(local);
  userI = JSON.parse(userI);
  const [missing, setMissing] = useState(false);
  const scrollToAlert = () => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  let postData = () => {
    let com = {
      finalRemarks: finalRemarks,
      farmerInfo: local.farmInfo,
      paramValues: resValues,
      values: values,
      suggestions: suggestion,
      local: local,
      user: userI,
    };
    const dataString = JSON.stringify(com);
    sessionStorage.setItem("combined", dataString);
    console.log(com);
    try {
      fetch("http://localhost:5000/values", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(com),
      })
        .then((response) => response.json())
        .then(() => {
          try {
            fetch("http://localhost:5000/getValues", {
              method: "GET",
              responseType: "arraybuffer",
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.arrayBuffer();
              })
              .then((arrayBuffer) => {
                const blob = new Blob([arrayBuffer], {
                  type: "application/pdf",
                });
                // setBlob(blob);
                const blobUrl = URL.createObjectURL(blob);
                setPdf(blobUrl);
                console.log(blobUrl);
                console.log(blob);
              })

              .catch((error) => {
                console.error(
                  "There was a problem with the fetch operation:",
                  error
                );
              });
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const setin = sessionStorage.getItem("paramValues");
  useEffect(() => {
    // if (values) {
    //   alert("Please select a farmer detail form first");
    //   setTimeout(() => {
    //     navigate("/form");
    //   }, 2000);
    // } else {
    let sessData = sessionStorage.getItem("forParams");
    if (sessData) {
      setForParams(JSON.parse(sessData));
    }
    let suggestion = sessionStorage.getItem("sandr");
    if (suggestion) {
      const data = JSON.parse(suggestion);
      setSuggestion(data);
    }
    // }
  }, [location.pathname]);

  useEffect(() => {
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
          sessionStorage.setItem("forParams", JSON.stringify(data));
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
        sessionStorage.setItem("sandr", JSON.stringify(data));
      });
  }, []);

  let setT = (e) => {
    let inputValue = e.target.value;
    setaddSug(inputValue);
  };
  let validate = () => {
    const Errors = {};
    for (const element of forParams) {
      if (element.PARAMETER_TYPE !== "HEADING") {
        if (!resValues[element.PARAMETER_ID]) {
          Errors[element.PARAMETER_ID] =
            "Please enter a value for " + element.PARAMETER_NAME;
        } else {
          const value = parseFloat(resValues[element.PARAMETER_ID]);
          if (isNaN(value)) {
            Errors[element.PARAMETER_ID] =
              "Please enter a valid number for " + element.PARAMETER_NAME;
          } else if (value < 0 || value > 999) {
            Errors[element.PARAMETER_ID] =
              "Please enter a value between 0 and 999 for " +
              element.PARAMETER_NAME;
          } else if (element.PARAMETER_ID === 11) {
            if (value < 0.5 || value > 14) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0.5 and 14 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 12) {
            if (value <= 0 || value >= 30) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 30 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 14) {
            if (value <= 0 || value > 5) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 5 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 15) {
            if (value <= 0 || value >= 750) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 10 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 16) {
            if (value <= 0 || value >= 300) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 300 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 17) {
            if (value <= 0 || value >= 2000) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 2000 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 21) {
            if (value <= 0 || value >= 3000) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 3000 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 19) {
            if (value <= 0 || value >= 60) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 60 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 20) {
            if (value <= 0 || value >= 40) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 40 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 26) {
            if (value <= 0 || value >= 20) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 20 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 25) {
            if (value <= 0 || value >= 50) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 50 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 24) {
            if (value <= 0 || value >= 30) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 30 for " +
                element.PARAMETER_NAME;
            }
          } else if (element.PARAMETER_ID === 23) {
            if (value <= 0 || value >= 15) {
              Errors[element.PARAMETER_ID] =
                "Please enter a value between 0 and 15 for " +
                element.PARAMETER_NAME;
            }
          }
        }
      }
    }
    setErrors(Errors);
    if (Errors.length === 0) {
      setMissing(true);
    }
    console.log(Errors);
    return Object.keys(Errors).length === 0;
  };

  return (
    <>
      {alertTog && (
        <>
          {setTimeout(() => {
            <Alert status="success">
              <AlertIcon />
              Data uploaded to the server.
            </Alert>;
          }, 300)}
          {pdf ? (
            <>
              <iframe
                src={pdf}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "85%",
                  border: "none",
                }}
              ></iframe>
              <div className="last1">
                <Button
                  size="sm"
                  onClick={() => {
                    const fileName = `${values.farmerId}`;
                    const anchor = document.createElement("a");
                    anchor.href = pdf;
                    anchor.download = fileName;
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                    fetch("http://localhost:5000/savePDF", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        fileName: fileName,
                      }),
                    });
                  }}
                >
                  Download & Save PDF
                </Button>
              </div>
            </>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </>
      )}
      {!toggle && (
        <>
          {missing && (
            <>
              <div ref={alertRef} className="stickyAlert">
                <Alert status="warning">
                  <AlertIcon />
                  Please fill in all accurate values.
                </Alert>
              </div>
            </>
          )}
          <Nav />
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
                          <Th>Test Result</Th>
                          <Th>Input</Th>
                          <Th isNumeric>Low</Th>
                          <Th isNumeric>Medium</Th>
                          <Th isNumeric>High</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {forParams &&
                          forParams.map((element) => {
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
                                      type="text"
                                      size="sm"
                                      id={element.PARAMETER_ID}
                                      htmlSize={4}
                                      width="auto"
                                      variant="filled"
                                      value={
                                        resValues[element.PARAMETER_ID] || ""
                                      }
                                      onChange={(e) => {
                                        const { id, value } = e.target;
                                        ressetValues((prevValues) => ({
                                          ...prevValues,
                                          [id]: value,
                                        }));
                                        // ressetValues({
                                        //   ...resValues,
                                        //   // [element.PARAMETER_NAME]:
                                        //   //   e.target.value,
                                        //   [element.PARAMETER_ID]:
                                        //     e.target.value,
                                        // });
                                        console.log(resValues);
                                        if (setin) {
                                          let data = JSON.parse(setin);
                                          data[element.PARAMETER_ID] =
                                            e.target.value;
                                          sessionStorage.setItem(
                                            "paramValues",
                                            JSON.stringify(data)
                                          );
                                        } else {
                                          let data = {};
                                          data[element.PARAMETER_ID] =
                                            e.target.value;
                                          sessionStorage.setItem(
                                            "paramValues",
                                            JSON.stringify(data)
                                          );
                                        }
                                      }}
                                    ></Input>
                                    {Errors[element.PARAMETER_ID] && (
                                      <p style={{ color: "red" }}>
                                        {Errors[element.PARAMETER_ID]}
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
                    <div className="olo">
                      <h3>Add Suggestions</h3>
                      <div className="ok">
                        <Textarea
                          placeholder="Add new suggestions here"
                          resize="none"
                          rows={1}
                          variant="filled"
                          onChange={setT}
                          id="clear"
                        />
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
                                  finalRemarks: finalRemarks,
                                }),
                              })
                                .then((response) => response.json())
                                .then((data) => {
                                  setBool(data.bool);
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
                                      document.getElementById("clear").value =
                                        "";
                                    });
                                });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="final">
                      <h3>Final Remarks</h3>
                      <Textarea
                        placeholder="Add final remarks here"
                        resize="none"
                        rows={2} // Set the number of rows to 7
                        variant="filled"
                        onChange={(e) => {
                          setFinalRemarks(e.target.value);
                        }}
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
                console.log(resValues);
                if (validate()) {
                  const dataString = JSON.stringify(resValues);
                  sessionStorage.setItem("result", dataString);
                  setToggle(!toggle);
                  setalertTog(true);
                  setMissing(false);
                  postData();
                  console.log(userI);
                } else {
                  setMissing(true);
                  scrollToAlert();
                }
              }}
            >
              Go To Report Page
            </Button>
            <Button
              background="#CCE5FF"
              color="#000000"
              size="md"
              onClick={() => {
                navigate("/form");
              }}
            >
              Go Back
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
