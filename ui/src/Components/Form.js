import "../Styles/Form.css";
import { Select, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import Alert from "@mui/joy/Alert";
import { useState } from "react";
export function Form() {
  const [errors, setErrors] = useState({});
  const [farmer_id, setFarmer_id] = useState();
  const navigate = useNavigate();
  const o = {
    marginTop: "2vh",
  };
  const [isDisabled, setIsDisabled] = useState(true);

  const handleEnableElement = () => {
    setIsDisabled(!isDisabled);
  };
  const lStyle = {
    fontSize: "2.2vh",
    fontWeight: "550",
  };

  return (
    <>
      <h3 style={{ marginTop: "0.5vh", color: "black" }}>
        Soil Water Test Entry Form
      </h3>
      <div className="container">
        {/* <form action="#"> */}
        <div className="common">
          <div className="litspace item">
            <label style={lStyle} htmlFor="test">
              Test Type
            </label>
            <Select
              size="sm"
              variant="filled"
              placeholder="Select one..."
              id="test"
            >
              <option value="waterTest">Water Test</option>
              <option value="soilTest">Soil Test</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="templateNo">
              Templete No:-
            </label>
            <Select size="sm" defaultValue="4" variant="filled" id="templateNo">
              <option value="4">4</option>
              <option value="x">x</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="labNo">
              Lab No.
            </label>
            xx
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="HEWFno">
              HEWF no.
            </label>
            <Input id="HEWFno" size="sm" style={{ width: "10vh" }}></Input>
          </div>
        </div>
        <div className="common">
          <div className="farmer_id item centering">
            <label style={lStyle} htmlFor="farmerId">
              Farmer ID
            </label>
            <Input
              type="number"
              size="md"
              variant="filled"
              placeholder="Enter 6 digits Farmer Id"
              onChange={(e) => setFarmer_id(e.target.value)}
            />
          </div>
          <div className="item litspace">
            <h5>xnxxxaxxxxmxxex</h5>
          </div>
          <div className="item litspace">
            <h5>Mbl. :</h5>
            <h5>xxxxxxxxxx</h5>
          </div>
          <div className="item litspace">Sy No. xxxx</div>
        </div>
        <div className="common">
          <div className="item">
            P Address:
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
        </div>
        <div className="common ">
          <div className="item morspace">
            <label style={lStyle} htmlFor="cluster">
              Cluster
            </label>
            <Select
              size="sm"
              id="cluster"
              placeholder="Select one..."
              variant="filled"
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item morspace">
            <label style={lStyle} htmlFor="village">
              Village
            </label>
            <Select
              id="village"
              placeholder="Select one..."
              size="sm"
              variant="filled"
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item morspace">
            <label style={lStyle} htmlFor="plotNo">
              Plot No.
            </label>
            <Select
              id="plotNo"
              size="sm"
              placeholder="Select one..."
              variant="filled"
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item morspace">
            <label style={lStyle} htmlFor="area">
              Area
            </label>
            <Select
              id="area"
              defaultValue="area1"
              disabled={isDisabled}
              variant="filled"
              size="sm"
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
            <label style={lStyle} htmlFor="drainage">
              Drainage
            </label>
            <Select
              size="sm"
              id="drainage"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="good">Good</option>
              <option value="poor">Poor</option>
              <option value="none">none</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="soilType">
              Soil Type
            </label>
            <Select
              size="sm"
              id="soilType"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="waterType">
              Water Type
            </label>
            <Select
              size="sm"
              id="waterType"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="irrigationSource">
              Irrigation Source
            </label>
            <Select
              size="sm"
              id="irrigationSource"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="cultivationType">
              Cultivation Type
            </label>
            <Select
              size="sm"
              id="cultivationType"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
        </div>
        <div className="common">
          <div className="item litspace">
            <label style={lStyle} htmlFor="previousCrop">
              Previous Crop
            </label>
            <Select
              size="sm"
              id="previousCrop"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item lispace">
            <label style={lStyle} htmlFor="cropToBeGrown">
              Crop to be grown{" "}
            </label>
            <Select
              size="sm"
              id="cropToBeGrown"
              variant="filled"
              placeholder="Select one..."
            >
              <option value="x">x</option>
              <option value="y">y</option>
            </Select>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="dtOfSampling">
              Dt of Sampling
            </label>
            <Input type="date" size="sm" id="dtOfSampling"></Input>
          </div>
          <div className="item litspace">
            <label style={lStyle} htmlFor="dtOfSamplingReceipt">
              Dt of Sampling Receipt
            </label>
            <Input type="date" size="sm" id="dtOfSamplingReceipt"></Input>
          </div>
        </div>
        {/* </form> */}
      </div>
      <div style={o} className="centering">
        <Button
          onClick={() => {
            navigate("/recommendations");
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
