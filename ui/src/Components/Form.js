import "../Styles/Form.css";
import { Select, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
export function Form() {
  var [newErrors, setErrors] = useState({});
  var [wild, setWild] = useState([]);
  var [values, setValues] = useState({
    farmerId: "",
    //labNo: "",
    test: "",
    cluster: "",
    village: "",
    plotNo: "",
    drainage: "",
    soilType: "",
    waterType: "",
    irrigationSource: "",
    cultivationType: "",
    previousCrop: "",
    cropToBeGrown: "",
    dtOfSampling: "",
    dtOfSamplingReceipt: "",
    templateNo: "4",
    HEWFno: "",
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
            name: data.FARMER_NAME,
            MBLNO: data.MBLNO,
            PAddress: data.P_ADDRESS,
            labNo: data.LAB_TRAN_NO,
            village: data.VILLAGE_CD,
          });
        });
    }
  }, [values.farmerId]);
  useEffect(() => {
    try {
      fetch("https://localhost:5000/init", {
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
    fetch("http://localhost:5000/temp_no", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: e.target.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        setfarmInfo({ ...farmInfo, labNo: data.LAB_TRAN_NO });
      });
  }, [values.test]);

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
    //if (values.labNo === "") {
    //  newErrors.labNo = "Lab No is required";
    //}
    // if (values.village === "") {
    //   newErrors.village = "Village is required";
    // }
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
    if (values.cultivationType === "") {
      newErrors.cultivationType = "Cultivation Type is required";
    }
    if (values.previousCrop === "") {
      newErrors.previousCrop = "Previous Crop is required";
    }
    if (values.cropToBeGrown === "") {
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
              <option value="4">4</option>
              <option value="x">x</option>
            </Select>
          </div>
          <div className="item litspace">
            <label className="mLabel" htmlFor="labNo">
              Lab No:{farmInfo.labNo}
            </label>
            {/* <Select
              size="sm"
              id="labNo"
              placeholder='Select one...'
              variant="filled"
              onChange={(e) => {
                setValues({ ...values, labNo: e.target.value });
              }}
              value={values.labNo}
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>  */}
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
          <div className="item litspace">Sy No. xxxx</div>
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
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
            {newErrors.cluster && (
              <div className="error">{newErrors.cluster}</div>
            )}
          </div>
          <div className="item">Village: {farmInfo.village}</div>
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
                setValues({ ...values, plotNo: e.target.value });
              }}
              value={values.plotNo}
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
            {newErrors.plotNo && (
              <div className="error">{newErrors.plotNo}</div>
            )}
          </div>
          <div className="item morspace">
            <label className="mLabel" htmlFor="area">
              Area
            </label>
            <Select
              id="area"
              defaultValue="area1"
              disabled={isDisabled}
              variant="filled"
              size="sm"
              value={values.area}
            >
              <option value="area1">area1</option>
              <option value="area2">area2</option>
            </Select>
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
              <option value="good">Good</option>
              <option value="poor">Poor</option>
              <option value="none">none</option>
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
              <option value="x">x</option>
              <option value="y">y</option>
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
              <option value="x">x</option>
              <option value="y">y</option>
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
              <option value="x">x</option>
              <option value="y">y</option>
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
              <option value="x">x</option>
              <option value="y">y</option>
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
              <option value="x">x</option>
              <option value="y">y</option>
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
