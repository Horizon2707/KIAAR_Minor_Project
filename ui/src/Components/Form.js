import "../Styles/Form.css";
import { Select, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
export function Form() {
  var [newErrors, setErrors] = useState({});
  var [wild, setWild] = useState([]);
  var [surveyNo, setSurveyNo] = useState([]);
  var [drainage, setdrainage] = useState([]);
  var [cultivationType, setCultivationType] = useState([]);
  var [cropToBeGrown, setCropToBeGrown] = useState([]);
  var [irrigationSources, setIrrigationSources] = useState([]);
  var [soilTypes, setSoilTypes] = useState([]);
  var [previousCrop, setPreviousCrop] = useState([]);
  var [cluster, setCluster] = useState([]);
  var [village, setVillage] = useState([]);
  var [plotNo, setplotNo] = useState([]);
  var [plotArea, setPlotArea] = useState([]);
  var [values, setValues] = useState({
    farmerId: "",
    //labNo: "",
    test: "",
    surveyNo: [],
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
  var [farmInfo, setfarmInfo] = useState({
    name: "",
    MBLNO: "",
    PAddress: "",
    village: "",
    labNo: "",
  });

  useEffect(() => {
    const maxLength = 6;
    if (values.farmerId.length === maxLength) {
      setValues({ ...values, farmerId: values.farmerId });
      fetch("http://localhost:5000/farmerId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farmerId: values.farmerId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setfarmInfo({
            name: data.farmer_name,
            MBLNO: data.phone_no,
            PAddress: data.farmer_address,
            labNo: data.tran_nos,
          });
          setdrainage({
            drainage: data.drainage,
          });
          setCultivationType({ cultivationType: data.type_of_cultivation });
          setCropToBeGrown({ cropToBeGrown: data.crop_to_be_grown });
          setIrrigationSources(data.irrigation_types);
          setSoilTypes(data.soil_types);
          setPreviousCrop(data.previous_crop);
          setSurveyNo(data.survey_nos);
        });
      fetch("http://localhost:5000/clusterInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farmerId: values.farmerId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCluster(data);
        });
    }
  }, [values.farmerId]);
  useEffect(() => {
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
        });
    } catch (error) {
      console.error("Error:", error);
    }
  });
  useEffect(() => {
    console.log(values.test);
    fetch("http://localhost:5000/temp_no", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test_cd: values.test }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValues({ ...values, templateNo: data });
      });
  }, [values.test]);
  useEffect(() => {
    fetch("http://localhost:5000/villageInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clusterCd: values.cluster,
        farmerId: values.farmerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVillage(data);
      });
  }, [values.cluster]);
  useEffect(() => {
    console.log(values.village);
    fetch("http://localhost:5000/plotNo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerId: values.farmerId,
        villageCd: values.village,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setplotNo(data);
      });
  }, [values.village]);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/plotArea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmerId: values.farmerId,
          plotNo: values.plotNo,
          villageCd: values.village,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPlotArea(data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }, [values.plotNo]);

  var navigate = useNavigate();
  const o = {
    marginTop: "2vh",
  };
  var [isDisabled, setIsDisabled] = useState(true);

  let handleEnableElement = () => {
    setIsDisabled(!isDisabled);
  };

  let validate = () => {
    const newErrors = {};
    if (values.farmerId.length !== 6) {
      if (values.farmerId === "") {
        newErrors.farmerId = "Farmer Id is required";
      } else {
        newErrors.farmerId = "Farmer Id should be 6 digits";
      }
    } else if (isNaN(values.farmerId)) {
      newErrors.farmerId = "Farmer Id should be a number";
    }
    if (values.test === "") {
      newErrors.test = "Test type is required";
    }
    if (values.cluster === "") {
      newErrors.cluster = "Cluster is required";
    }
    if (values.plotNo === "") {
      newErrors.plotNo = "Plot No is required";
    }
    if (values.drainage === "") {
      newErrors.drainage = "Drainage is required";
    }
    if (values.soilType === "") {
      newErrors.soilType = "Soil Type is required";
    }
    if (values.waterType === "") {
      newErrors.waterType = "Water Type is required";
    }
    if (values.irrigationSource === "") {
      newErrors.irrigationSource = "Irrigation Source is required";
    }
    if (values.cultivationType.length === 0) {
      newErrors.cultivationType = "Cultivation Type is required";
    }

    if (values.previousCrop === "") {
      newErrors.previousCrop = "Previous Crop is required";
    }
    if (values.cropToBeGrown.length === 0) {
      newErrors.cropToBeGrown = "Crop to be grown is required";
    }
    if (values.dtOfSampling === "") {
      newErrors.dtOfSampling = "Date of Sampling is required";
    } // else if (values.dtOfSampling > values.dtOfSamplingReceipt) {
    //   newErrors.dtOfSampling =
    //     "Date of Sampling should be less than Date of Sampling Receipt";
    // }
    if (values.dtOfSamplingReceipt === "") {
      newErrors.dtOfSamplingReceipt = "Date of Sampling Receipt is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  let sessionPush = () => {
    sessionStorage.setItem("values", JSON.stringify(values));
    console.log(values);
  };

  return (
    <>
      <h1 style={{ marginTop: "0.5vh", color: "black" }}>
        Soil Water Test Entry Form
      </h1>
      <div className="container">
        {/* <form action="#"> */}
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
                setValues({ ...values, test: e.target.value });
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
                setValues({ ...values, templateNo: e.target.value });
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
            <label className="mLabel" htmlFor="labNo">
              Lab No:X
            </label>
            {newErrors.labNo && <div className="error">{newErrors.labNo}</div>}
          </div>
          <div className="item litspace">
            <label className="mLabel" htmlFor="HEWFno">
              HEWF no.
            </label>
            <Input
              onChange={(e) => {
                setValues({ ...values, HEWFno: e.target.value });
              }}
              value={values.HEWFno}
              type="number"
              id="HEWFno"
              size="sm"
              style={{ width: "10vh" }}
            ></Input>
          </div>
        </div>
        <div className="common">
          <div className=" item centering">
            <label className="mLabel" htmlFor="farmerId">
              Farmer ID
            </label>
            <Input
              onChange={(e) => {
                setValues({ ...values, farmerId: e.target.value });
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

          <div className="item morspace">
            <label className="mLabel" htmlFor="surveyNo">
              SY No.
            </label>
            <Select
              size="sm"
              id="surveyNo"
              placeholder="Select one..."
              variant="filled"
              onChange={(e) => {
                setValues({ ...values, surveyNo: e.target.value });
              }}
              value={values.surveyNo}
            >
              {surveyNo.map((surveyNo, index) => (
                <option key={index} value={surveyNo}>
                  {surveyNo}
                </option>
              ))}
            </Select>
            {newErrors.cluster && (
              <div className="error">{newErrors.cluster}</div>
            )}
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
                setValues({ ...values, cluster: e.target.value });
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
              id="cluster"
              placeholder="Select one..."
              variant="filled"
              onChange={(e) => {
                setValues({ ...values, village: e.target.value });
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
                setValues({
                  ...values,
                  plotNo: parseInt(e.target.value),
                });
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
            <label className="mLabel" htmlFor="area">
              Area
            </label>
            <Input size="sm" htmlSize={3} variant='filled' id="area" value={plotArea} defaultValue={plotArea.PLOT_AREA} disabled={isDisabled}></Input>
            
            <button onClick={handleEnableElement}>
              <EditIcon />
            </button>
          </div>
        </div>
        <div className="row5">
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
                setValues({ ...values, drainage: e.target.value });
              }}
              value={values.drainage}
            >
              {/* {drainage.drainage &&
                drainage.drainage.map((item) => {
                  return <option value={item}>{item}</option>;
                })} */}
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="None">None</option>
            </Select>
            {newErrors.drainage && (
              <div className="error">{newErrors.drainage}</div>
            )}
          </div>
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
                setValues({ ...values, soilType: e.target.value });
              }}
              value={values.soilType}
            >
              {soilTypes.map((soilType, index) => (
                <option key={index} value={soilType.SOIL_TYPE_NAME}>
                  {soilType.SOIL_TYPE_NAME}
                </option>
              ))}
            </Select>
            {newErrors.soilType && (
              <div className="error">{newErrors.soilType}</div>
            )}
          </div>
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
                setValues({ ...values, waterType: e.target.value });
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
                setValues({ ...values, irrigationSource: e.target.value });
              }}
              value={values.irrigationSource}
            >
              {irrigationSources.map((irrigationType, index) => (
                <option key={index} value={irrigationType.IRRIGATION_NAME}>
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
                setValues({ ...values, cultivationType: e.target.value });
              }}
              value={values.cultivationType}
            >
              <option value="Irrigated">Irrigated</option>
              <option value="Rained">Rained</option>
              <option value="None">None</option>
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
                setValues({ ...values, previousCrop: e.target.value });
              }}
              value={values.previousCrop}
            >
              {previousCrop.map((crop, index) =>
                crop ? (
                  <option key={index} value={crop}>
                    {crop}
                  </option>
                ) : null
              )}
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
              {cropToBeGrown.cropToBeGrown &&
                cropToBeGrown.cropToBeGrown.map((item) => {
                  return <option value={item}>{item}</option>;
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
        {/* </form> */}
      </div>
      <div style={o} className="centering">
        <Button
          onClick={() => {
            if (validate()) {
              navigate("/resultentry");
              sessionPush();
            }
          }}
          background="#CCE5FF"
          color="#000000"
          size="md"
          type="submit"
        >
          Go
        </Button>
        <Button
          onClick={() => {
            navigate("/crops");
          }}
          background="#CCE5FF"
          color="#000000"
          size="md"
        >
          Show the crop to be grown
        </Button>
        <br />
        <br />
      </div>
    </>
  );
}
