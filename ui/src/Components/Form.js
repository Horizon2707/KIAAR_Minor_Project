import "../Styles/Form.css";
import Nav from "./Nav";
import { Select, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function Form() {
  let ref = useRef();
  let ref1 = useRef();
  const location = useLocation();
  const [newErrors, setErrors] = useState({});
  const [wild, setWild] = useState([]);
  const [surveyNo, setSurveyNo] = useState("");
  const [drainage, setdrainage] = useState([]);
  const [cultivationType, setCultivationType] = useState([]);
  const [cropToBeGrown, setCropToBeGrown] = useState([]);
  const [irrigationSources, setIrrigationSources] = useState([]);
  const [soilTypes, setSoilTypes] = useState([]);
  const [previousCrop, setPreviousCrop] = useState([]);
  const [cluster, setCluster] = useState([]);
  const [village, setVillage] = useState([]);
  const [plotNo, setplotNo] = useState([]);
  const [plotArea, setPlotArea] = useState();
  const [labTran, setLabTran] = useState([]);
  const [notfoundFarmer, setnotFoundFarmer] = useState(false);
  const [values, setValues] = useState({
    farmerId: "",
    labNo: "",
    test: "",
    surveyNo: "",
    cluster: [],
    village: [],
    plotNo: [],
    drainage: [],
    soilType: "",
    waterType: "",
    irrigationSource: "",
    cultivationType: [],
    previousCrop: "",
    cropToBeGrown: [],
    dtOfSampling: new Date().toISOString().split("T")[0],
    dtOfSamplingReceipt: new Date().toISOString().split("T")[0],
    templateNo: [],
    HEWFno: "",
    area: "",
  });
  const [farmInfo, setfarmInfo] = useState({
    name: "",
    MBLNO: "",
    PAddress: "",
    village: "",
    labNo: "",
  });
  const [testEx, setestEx] = useState(false);

  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const localDataPush = () => {
    const locals = {
      values: values,
      watVar: watVar,
      soilVar: soilVar,
      farmInfo: farmInfo,
      cropToBeGrown: cropToBeGrown,
      irrigationSources: irrigationSources,
      soilTypes: soilTypes,
      previousCrop: previousCrop,
      labTran: labTran,
      cluster: cluster,
      village: village,
      plotNo: plotNo,
      plotArea: plotArea,
      wild: wild,
      surveyNo: surveyNo,
    };

    const localpush = JSON.stringify(locals);
    sessionStorage.setItem("local", localpush);
  };

  const showingData = () => {
    if (location.pathname === "/form") {
      const localData = sessionStorage.getItem("local");
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          setValues(parsedData.values);
          setfarmInfo(parsedData.farmInfo);
          setdrainage(parsedData.drainage);
          setCultivationType(parsedData.cultivationType);
          setCropToBeGrown(parsedData.cropToBeGrown);
          setIrrigationSources(parsedData.irrigationSources);
          setSoilTypes(parsedData.soilTypes);
          setPreviousCrop(parsedData.previousCrop);
          setLabTran(parsedData.labTran);
          setCluster(parsedData.cluster);
          setVillage(parsedData.village);
          setplotNo(parsedData.plotNo);
          setPlotArea(parsedData.plotArea);
          setWild(parsedData.wild);
          setSurveyNo(parsedData.surveyNo);
          setwatVar(parsedData.watVar);
          setSoilVar(parsedData.soilVar);
          console.log(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.log("No data found in sessionStorage.");
      }
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("local") !== null) {
      if (location.pathname === "/form") {
        showingData();
        const ok = sessionStorage.getItem("reset");
        const reset = JSON.parse(ok);
        setReset(reset);
      }
    }
  }, [location.pathname]);
  const [watVar, setwatVar] = useState(true);
  const [soilVar, setSoilVar] = useState(true);

  let sessionPush = async () => {
    await new Promise((resolve) => {
      sessionStorage.setItem("values", JSON.stringify(values));
      resolve();
    });
    console.log(values);
  };
  const fetchPlotarea = (plotNo, farmerId, villageCd) => {
    fetch("http://localhost:5000/plotArea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plotNo: plotNo,
        farmerId: values.farmerId || farmerId,
        villageCd: values.village || villageCd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlotArea(data);
      })
      .then(() => {
        ref.current.value = plotArea;
      });
  };

  const fetchSurveyNo = (villageCd, plotNo, farmerId, clusterCd) => {
    fetch("http://localhost:5000/surveyno", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: values.farmerId || farmerId,
        villageCd: villageCd,
        clusterCd: values.cluster || clusterCd,
        plotNo: plotNo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSurveyNo(data.SY_NO);
      })
      .then(() => {
        ref1.current.value = surveyNo;
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("editLabTran") !== null) {
      const labNo = JSON.parse(sessionStorage.getItem("editLabTran"));
      setforUpd(labNo);
      // setValues({ ...values, labNo: labNo });
      // showingData();
    }
  }, []);
  const fetchInit = () => {
    try {
      fetch("http://localhost:5000/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setWild(data);
          console.log(data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchFarmerInfo = async (farmerId) => {
    try {
      const response = await fetch("http://localhost:5000/farmerId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farmerId: values.farmerId || farmerId }),
      });

      if (response.status === 404) {
        setnotFoundFarmer(true);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setnotFoundFarmer(false);

        setfarmInfo({
          name: data.farmer_name,
          MBLNO: data.phone_no,
          PAddress: data.farmer_address,
        });
        setdrainage({
          drainage: data.drainage,
        });
        setCultivationType({ cultivationType: data.type_of_cultivation });
        setCropToBeGrown(data.crop_to_be_grown);
        setIrrigationSources(data.irrigation_types);
        setSoilTypes(data.soil_types);
        setPreviousCrop(data.previous_crop);
        setLabTran(forUpd ? forUpd : data.tran_nos[0].LAB_TRAN);
        setValues({
          ...values,
          labNo: forUpd ? forUpd : data.tran_nos[0].LAB_TRAN,
        });
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching farmer info:", error);
    }
  };

  const fetchClusterInfo = async (farmerId) => {
    const response = await fetch("http://localhost:5000/clusterInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ farmerId: values.farmerId || farmerId }),
    });

    if (response.status === 404) {
      setnotFoundFarmer(true);
      return;
    }

    if (response.ok) {
      setnotFoundFarmer(false);

      const data = await response.json();
      setCluster(data);
    } else {
      throw new Error("Network response was not ok.");
    }
  };
  const fetchVillageInfo = (farmerId, clusterCd) => {
    try {
      fetch("http://localhost:5000/villageInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clusterCd: values.cluster || clusterCd,
          farmerId: values.farmerId || farmerId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setVillage(data);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPlotNo = (farmerId, villageCd) => {
    try {
      fetch("http://localhost:5000/plotNo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmerId: values.farmerId || farmerId,
          villageCd: values.village || villageCd,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setplotNo(data);
        });
    } catch (e) {
      console.error(e);
    }
  };
  let [forUpd, setforUpd] = useState("");
  const [forDel, setforDel] = useState("");
  const navigate = useNavigate();
  const o = {
    marginTop: "2vh",
  };
  const [reset, setReset] = useState(false);
  let validate = () => {
    const errors = {};
    if (values.farmerId.length !== 6) {
      if (values.farmerId === "") {
        errors.farmerId = "Farmer Id is required";
      } else {
        errors.farmerId = "Farmer Id should be 6 digits";
      }
    } else if (isNaN(values.farmerId)) {
      errors.farmerId = "Farmer Id should be a number";
    }
    if (values.test === "") {
      errors.test = "Test type is required";
    }
    if (values.cluster.length === 0) {
      errors.cluster = "Cluster is required";
    }
    if (values.village.length === 0) {
      errors.village = "Village is required";
    }
    // if (values.surveyNo.length === 0) {
    //   errors.surveyNo = "Survey number is required";
    // }
    if (values.plotNo.length === 0) {
      errors.plotNo = "Plot number is required";
    }
    if (values.drainage.length === 0) {
      errors.drainage = "Drainage is required";
    }
    if (values.soilType === "" && soilVar) {
      errors.soilType = "Soil Type is required";
    }
    if (values.waterType === "" && watVar) {
      errors.waterType = "Water Type is required";
    }
    if (values.irrigationSource === "") {
      errors.irrigationSource = "Irrigation Source is required";
    }
    if (values.cultivationType.length === 0) {
      errors.cultivationType = "Cultivation Type is required";
    }
    if (values.previousCrop.length === 0) {
      errors.previousCrop = "Previous Crop is required";
    }
    if (values.cropToBeGrown.length === 0) {
      errors.cropToBeGrown = "Crop to be grown is required";
    }
    if (values.dtOfSampling === "") {
      errors.dtOfSampling = "Date of Sampling is required";
    }
    if (values.dtOfSamplingReceipt === "") {
      errors.dtOfSamplingReceipt = "Date of Sampling Receipt is required";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const fetchTempNo = (test) => {
    fetch("http://localhost:5000/temp_no", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test_cd: test }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "") {
          console.log("No data found");
          return;
        }
        setValues({ ...values, test: test, templateNo: data });
        if (test === "1") {
          setwatVar(false);
          setSoilVar(true);
        }
        if (test === "2") {
          setwatVar(true);
          setSoilVar(false);
        }
      });
  };
  const handleTestType = (e) => {
    const test = e.target.value;
    fetchTempNo(test);
  };
  useEffect(() => {
    fetchInit();
  }, []);
  useEffect(() => {
    if (values.farmerId !== "" && values.village.length > 0) {
      fetchPlotNo(values.farmerId, values.village);
      console.log("Plot for no reason");
    } else {
      console.log("Bina matlab plot");
    }
  }, [values.village]);
  useEffect(() => {
    const maxLength = 6;
    if (values.farmerId.length === maxLength) {
      setValues({ ...values, farmerId: values.farmerId });
      fetchFarmerInfo(values.farmerId);
      fetchClusterInfo(values.farmerId);
    }
  }, [values.farmerId]);
  useEffect(() => {
    if (values.farmerId !== "" && values.cluster.length > 0) {
      fetchVillageInfo(values.farmerId, values.cluster);
      console.log("Village Info for no reason");
    } else {
      console.log("Bina matlab village");
    }
  }, [values.cluster]);

  const widthC = {
    width: " 100 %",
  };
  return (
    <>
      <Nav />
      {notfoundFarmer && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>No such farmer found</AlertTitle>
        </Alert>
      )}
      <div style={widthC}>
        <div className="container">
          <div className="common">
            <div className="litspace item">
              <label className="mLabel" htmlFor="test">
                Test Type
              </label>
              <Select
                size="sm"
                variant="filled"
                placeholder="Select one..."
                id="test"
                value={values.test}
                onChange={(e) => {
                  console.log("Onchange");
                  handleTestType(e);
                }}
              >
                {wild.map((item) => {
                  return <option value={item.TEST_CD}>{item.TEST_NAME}</option>;
                })}
              </Select>
              {newErrors.test && <div className="error">{newErrors.test}</div>}
            </div>
            <div className="item litspace">
              <label className="mLabel" htmlFor="templateNo">
                Templete No:-
              </label>
              <Select
                size="sm"
                value={values.templateNo}
                onChange={(e) => {
                  const templateNo = e.target.value;
                  setValues({ ...values, templateNo: templateNo });
                }}
                variant="filled"
                id="templateNo"
              >
                {values.templateNo.map((item) => {
                  return (
                    <option value={item.TEMPLATE_NO}>{item.TEMPLATE_NO}</option>
                  );
                })}
              </Select>
            </div>
            <div className="item litspace">
              <Modal
                isOpen={isOpenModal1}
                onClose={() => {
                  sessionStorage.removeItem("values");
                  sessionStorage.removeItem("forParams");
                  sessionStorage.removeItem("result");
                  sessionStorage.removeItem("local");
                  sessionStorage.removeItem("reset");
                  sessionStorage.removeItem("sandr");
                  sessionStorage.removeItem("combined");
                  sessionStorage.removeItem("paramValues");
                  sessionStorage.removeItem("editLabTran");
                  window.location.reload();
                  onCloseModal1();
                }}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div className="space">
                      <label className="mLabel" htmlFor="labNo">
                        Lab No:
                      </label>
                      <Input
                        onChange={(e) => {
                          let labNo = e.target.value;
                          labNo = labNo.replace(/\D/g, "").slice(0, 10);
                          setforUpd(parseInt(labNo));
                        }}
                        value={forUpd}
                        type="text"
                        id="labNo"
                        size="sm"
                        maxLength={10}
                        style={{ width: "10vh" }}
                      />{" "}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {!testEx && (
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                          fetch("http://localhost:5000/checkLabTran", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ labNo: forUpd }),
                          }).then((res) => {
                            if (res.status !== 200) {
                              alert("No such lab number found");
                            } else if (res.status === 200) {
                              alert("Lab number found");
                              sessionStorage.setItem(
                                "editLabTran",
                                JSON.stringify(parseInt(forUpd))
                              );
                              setestEx(true);
                              sessionStorage.removeItem("values");
                              sessionStorage.removeItem("forParams");
                              sessionStorage.removeItem("result");
                              sessionStorage.removeItem("reset");
                              sessionStorage.removeItem("local");
                              sessionStorage.removeItem("sandr");
                              sessionStorage.removeItem("combined");
                              sessionStorage.removeItem("paramValues");
                              window.location.reload();
                              onCloseModal1();
                            }
                          });
                        }}
                      >
                        Test
                      </Button>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {forUpd ? (
                <>
                  <label className="mLabel" htmlFor="labNo">
                    Lab No:{forUpd}
                  </label>
                </>
              ) : (
                <>
                  <label className="mLabel" htmlFor="labNo">
                    Lab No:{labTran}
                  </label>
                </>
              )}
            </div>
            <div className="item litspace">
              <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div className="space">
                      <label className="mLabel" htmlFor="l1">
                        Lab No:
                      </label>
                      <Input
                        onChange={(e) => {
                          let labNo = e.target.value;
                          setforDel(parseInt(labNo));
                          // console.log(e.target.value);
                        }}
                        value={forDel}
                        type="number"
                        id="l1"
                        size="sm"
                        style={{ width: "10vh" }}
                      ></Input>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        fetch("http://localhost:5000/delete", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ tranNo: forDel }),
                        })
                          .then((res) => {
                            if (res.status === 200) {
                              alert("Lab number found and deleted");
                              sessionStorage.removeItem("values");
                              sessionStorage.removeItem("forParams");
                              sessionStorage.removeItem("result");
                              sessionStorage.removeItem("reset");
                              sessionStorage.removeItem("local");
                              sessionStorage.removeItem("sandr");
                              sessionStorage.removeItem("combined");
                              sessionStorage.removeItem("paramValues");
                              window.location.reload();
                              onCloseModal2();
                            } else if (res.status === 404) {
                              alert("No such lab number found");
                            } else {
                              console.error("Unexpected error occurred");
                            }
                          })
                          .catch((error) => {
                            console.error("Fetch error:", error);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <div className="item litspace">
              <label className="mLabel" htmlFor="HEWFno">
                HEWF no.
              </label>
              <Input
                onChange={(e) => {
                  const HEWFno = e.target.value;
                  setValues({ ...values, HEWFno: HEWFno });
                }}
                value={values.HEWFno}
                type="number"
                id="HEWFno"
                size="sm"
                style={{ width: "10vh" }}
              ></Input>
              <Button
                color="CCE5FF"
                background="#ffffff"
                size="sm"
                onClick={() => {
                  if (forUpd) {
                    sessionStorage.removeItem("editLabTran");
                    sessionStorage.removeItem("values");
                    sessionStorage.removeItem("forParams");
                    sessionStorage.removeItem("result");
                    sessionStorage.removeItem("local");
                    sessionStorage.removeItem("reset");
                    sessionStorage.removeItem("sandr");
                    sessionStorage.removeItem("combined");
                    sessionStorage.removeItem("paramValues");
                    window.location.reload();
                  } else {
                    onOpenModal1();
                    // sessionStorage.removeItem("updateMode");
                  }
                }}
              >
                {forUpd ? "Create New" : "Update Existing"}
              </Button>
              {!forUpd && (
                <Button
                  color="CCE5FF"
                  background="#ffffff"
                  size="sm"
                  onClick={() => {
                    if (forDel) {
                      sessionStorage.removeItem("editLabTran");
                      sessionStorage.removeItem("values");
                      sessionStorage.removeItem("forParams");
                      sessionStorage.removeItem("result");
                      sessionStorage.removeItem("local");
                      sessionStorage.removeItem("reset");
                      sessionStorage.removeItem("sandr");
                      sessionStorage.removeItem("combined");
                      sessionStorage.removeItem("paramValues");
                      window.location.reload();
                    } else {
                      onOpenModal2();
                    }
                  }}
                >
                  Delete Existing
                </Button>
              )}
            </div>
          </div>
          <div className="common">
            <div className=" item centering">
              <label className="mLabel" htmlFor="farmerId">
                Farmer ID
              </label>
              <Input
                onChange={(e) => {
                  const farmerId = e.target.value;
                  setValues({ ...values, farmerId: farmerId });
                }}
                value={values.farmerId}
                id="farmerId"
                size="md"
                variant="filled"
                maxLength={6}
                placeholder="Enter 6 digits Farmer Id"
              />
              {newErrors.farmerId && (
                <div className="error">{newErrors.farmerId}</div>
              )}
            </div>
            <div className="item litspace">
              <h5>{farmInfo.name}</h5>
            </div>
            <div className="item litspace">
              <h5>Mbl. :</h5>
              <h5>{farmInfo.MBLNO}</h5>
            </div>
          </div>
          <div className="common">
            <div className="item">
              P Address:
              {farmInfo.PAddress}
            </div>
          </div>
          <div className="common ">
            <div className="item morspace">
              <label className="mLabel" htmlFor="cluster">
                Cluster
              </label>
              <Select
                size="sm"
                id="cluster"
                placeholder="Select one..."
                variant="filled"
                onChange={(e) => {
                  const cluster = e.target.value;
                  setValues({ ...values, cluster: cluster });
                }}
                value={values.cluster}
              >
                {cluster.map((element) => {
                  return (
                    <option value={element.CLUSTER_CD}>
                      {element.CLUSTER_NAME}
                    </option>
                  );
                })}
              </Select>
              {newErrors.cluster && (
                <div className="error">{newErrors.cluster}</div>
              )}
            </div>
            <div className="item morspace">
              <label className="mLabel" htmlFor="cluster">
                Village
              </label>
              <Select
                size="sm"
                id="village"
                placeholder="Select one..."
                variant="filled"
                onChange={(e) => {
                  const village = e.target.value;
                  setValues({ ...values, village: village });
                  //fetchSurveyNo(village);
                }}
                value={values.village}
              >
                {village.map((element) => {
                  return (
                    <option value={element.VILLAGE_CD}>
                      {element.VILLAGE_NAME}
                    </option>
                  );
                })}
              </Select>
              {newErrors.village && (
                <div className="error">{newErrors.village}</div>
              )}
            </div>
            <div className="item morspace">
              <label className="mLabel" htmlFor="plotNo">
                Plot No.
              </label>
              <Select
                id="plotNo"
                size="sm"
                placeholder="Select one..."
                variant="filled"
                onChange={(e) => {
                  const plotNo = parseInt(e.target.value);
                  setValues({
                    ...values,
                    plotNo: plotNo,
                  });
                  fetchPlotarea(plotNo);
                  fetchSurveyNo(
                    values.village,
                    plotNo,
                    values.farmerId,
                    values.cluster
                  );
                }}
                value={values.plotNo}
              >
                {plotNo
                  .sort((a, b) => parseInt(a.PLOT_NO) - parseInt(b.PLOT_NO))
                  .map((plot, index) => (
                    <option key={index} value={parseInt(plot.PLOT_NO)}>
                      {parseInt(plot.PLOT_NO)}
                    </option>
                  ))}
              </Select>
              {newErrors.plotNo && (
                <div className="error">{newErrors.plotNo}</div>
              )}
            </div>
            <div className="item morspace">
              <label className="mLabel" htmlFor="surveyNo">
                SY No.
              </label>
              {/* <Select
                size="sm"
                id="surveyNo"
                placeholder="Select one..."
                variant="filled"
                onChange={(e) => {
                  const surveyNo = e.target.value;
                  setValues({ ...values, surveyNo: surveyNo });
                }}
                value={values.surveyNo}
              >
                {surveyNo.map((surveyNo, index) => (
                  <option key={index} value={surveyNo.SY_NO}>
                    {surveyNo.SY_NO}
                  </option>
                ))}
              </Select>
              {newErrors.surveyNo && (
                <div className="error">{newErrors.surveyNo}</div>
              )} */}
              <Input
                size="sm"
                htmlSize={3}
                variant="filled"
                id="surveyNo"
                ref={ref1}
                value={surveyNo}
                onChange={(e) => {
                  const surveyNo = e.target.value;
                  setValues({ ...values, surveyNo: surveyNo });
                }}
              ></Input>
            </div>
            <div className="item morspace">
              <label className="mLabel" htmlFor="area">
                Area
              </label>
              <Input
                size="sm"
                htmlSize={3}
                variant="filled"
                id="area"
                ref={ref}
                value={plotArea}
                onChange={(e) => {
                  const area = e.target.value;
                  setValues({ ...values, area: area });
                }}
              ></Input>
              {/* <button onClick={handleEnableElement}>
              <EditIcon />
            </button> */}
            </div>
          </div>
          <div className="row5 common">
            <div className="item litspace">
              <label className="mLabel" htmlFor="drainage">
                Drainage
              </label>
              <Select
                size="sm"
                id="drainage"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  const drainage = e.target.value;
                  setValues({ ...values, drainage: drainage });
                }}
                value={values.drainage}
              >
                {/* {drainage.drainage &&
                drainage.drainage.map((item) => {
                  return <option value={item}>{item}</option>;
                })} */}
                <option value="GOOD">Good</option>
                <option value="POOR">Poor</option>
                <option value="NONE">None</option>
                {/* <option value="NOT KNOWN">NOT KNOWN</option> */}
              </Select>
              {newErrors.drainage && (
                <div className="error">{newErrors.drainage}</div>
              )}
            </div>
            {soilVar && (
              <div className="item litspace">
                <label className="mLabel" htmlFor="soilType">
                  Soil Type
                </label>
                <Select
                  size="sm"
                  id="soilType"
                  variant="filled"
                  placeholder="Select one..."
                  onChange={(e) => {
                    const soil_type = e.target.value;
                    setValues({ ...values, soilType: soil_type });
                  }}
                  value={values.soilType}
                >
                  {soilTypes.map((soilType, index) => (
                    <option key={index} value={soilType.SOIL_TYPE_CD}>
                      {soilType.SOIL_TYPE_NAME}
                    </option>
                  ))}
                </Select>
                {newErrors.soilType && (
                  <div className="error">{newErrors.soilType}</div>
                )}
              </div>
            )}
            {watVar && (
              <div className="item litspace">
                <label className="mLabel" htmlFor="waterType">
                  Water Type
                </label>
                <Select
                  size="sm"
                  id="waterType"
                  variant="filled"
                  placeholder="Select one..."
                  onChange={(e) => {
                    const waterType = e.target.value;
                    setValues({ ...values, waterType: waterType });
                  }}
                  value={values.waterType}
                >
                  <option value="x">x</option>
                  <option value="y">y</option>
                </Select>
                {newErrors.waterType && (
                  <div className="error">{newErrors.waterType}</div>
                )}
              </div>
            )}
            <div className="item litspace">
              <label className="mLabel" htmlFor="irrigationSource">
                Irrigation Source
              </label>
              <Select
                size="sm"
                id="irrigationSource"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  const irrigationSource = e.target.value;
                  setValues({ ...values, irrigationSource: irrigationSource });
                }}
                value={values.irrigationSource}
              >
                {irrigationSources.map((irrigationType, index) => (
                  <option key={index} value={irrigationType.IRRIGATION_CD}>
                    {irrigationType.IRRIGATION_NAME}
                  </option>
                ))}
              </Select>
              {newErrors.irrigationSource && (
                <div className="error">{newErrors.irrigationSource}</div>
              )}
            </div>
            <div className="item litspace">
              <label className="mLabel" htmlFor="cultivationType">
                Cultivation Type
              </label>
              <Select
                size="sm"
                id="cultivationType"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  const cultivation_type = e.target.value;
                  setValues({ ...values, cultivationType: cultivation_type });
                }}
                value={values.cultivationType}
              >
                <option value="IRRIGATED">Irrigated</option>
                <option value="RAINFED">Rainfed</option>
                <option value="NONE">None</option>
              </Select>
              {newErrors.cultivationType && (
                <div className="error">{newErrors.cultivationType}</div>
              )}
            </div>
          </div>
          <div className="common">
            <div className="item litspace">
              <label className="mLabel" htmlFor="previousCrop">
                Previous Crop
              </label>
              <Select
                size="sm"
                id="previousCrop"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  const previous_crop = e.target.value;
                  setValues({ ...values, previousCrop: previous_crop });
                }}
                value={values.previousCrop}
              >
                {previousCrop.map((element) => {
                  return (
                    <option value={element.CROP_NAME}>
                      {element.CROP_NAME}
                    </option>
                  );
                })}
              </Select>
              {newErrors.previousCrop && (
                <div className="error">{newErrors.previousCrop}</div>
              )}
            </div>
            <div className="item lispace">
              <label className="mLabel" htmlFor="cropToBeGrown">
                Crop to be grown
              </label>
              <Select
                size="sm"
                id="cropToBeGrown"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  setValues({ ...values, cropToBeGrown: e.target.value });
                }}
                value={values.cropToBeGrown}
              >
                {cropToBeGrown.map((element) => {
                  return (
                    <option value={element.CROP_NAME}>
                      {element.CROP_NAME}
                    </option>
                  );
                })}
              </Select>
              {newErrors.cropToBeGrown && (
                <div className="error">{newErrors.cropToBeGrown}</div>
              )}
            </div>
            <div className="item litspace">
              <label className="mLabel" htmlFor="dtOfSampling">
                Dt of Sampling
              </label>
              <Input
                onChange={(e) => {
                  setValues({ ...values, dtOfSampling: e.target.value });
                }}
                value={values.dtOfSampling}
                type="date"
                size="sm"
                id="dtOfSampling"
              ></Input>
              {newErrors.dtOfSampling && (
                <div className="error">{newErrors.dtOfSampling}</div>
              )}
            </div>
            <div className="item litspace">
              <label className="mLabel" htmlFor="dtOfSamplingReceipt">
                Dt of Sampling Receipt
              </label>
              <Input
                onChange={(e) => {
                  setValues({ ...values, dtOfSamplingReceipt: e.target.value });
                }}
                value={values.dtOfSamplingReceipt}
                type="date"
                size="sm"
                id="dtOfSamplingReceipt"
              ></Input>
              {newErrors.dtOfSamplingReceipt && (
                <div className="error">{newErrors.dtOfSamplingReceipt}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={o} className="centering">
        <Button
          onClick={() => {
            const obj = newErrors;
            console.log(obj);
            if (validate()) {
              navigate("/resultentry");
              sessionPush();
              localDataPush();
              setReset(true);
              sessionStorage.setItem("reset", true);
            }
          }}
          background="#CCE5FF"
          color="#000000"
          size="md"
        >
          Go to ResultEntry
        </Button>
        {/* <Button
          background="#CCE5FF"
          color="#000000"
          size="md"
          onClick={() => {
            navigate("/transaction");
          }}
        >
          Check Previous Transaction
        </Button> */}
        {reset && (
          <Button
            onClick={() => {
              if (reset) {
                sessionStorage.removeItem("values");
                sessionStorage.removeItem("forParams");
                sessionStorage.removeItem("result");
                sessionStorage.removeItem("local");
                sessionStorage.removeItem("reset");
                sessionStorage.removeItem("sandr");
                sessionStorage.removeItem("combined");
                sessionStorage.removeItem("paramValues");
                sessionStorage.removeItem("editLabTran");
                window.location.reload();
              }
            }}
            background="#CCE5FF"
            color="#000000"
            size="md"
          >
            Reset
          </Button>
        )}
      </div>
    </>
  );
}
export default Form;
