import "../Styles/Form.css";
import { Select, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export function Form() {
  const navigate = useNavigate();
  const obj = {
    width: "20vh",
  };

  return (
    <>
      <div className="container">
        <div className="row1 common">
          <div className=" item">
            <h4>
              <label htmlFor="test">Test Type</label>
            </h4>
            <Select
              style={obj}
              variant="filled"
              size="md"
              placeholder="Select one..."
              id="test"
            >
              <option value="waterTest">Water Test</option>
              <option value="soilTest">Soil Test</option>
            </Select>
          </div>
          <div className="item">
            <h4>
              <label>Tamplete No:-</label>
            </h4>
            x
          </div>
          <div className="item">
            <h4>
              <label htmlFor="labNo">Lab No.</label>
            </h4>
            xx
          </div>
        </div>
        <div className="row2 common">
          <div className="farmer_id item centering">
            <h4>
              <label htmlFor="farmerId">Farmer ID</label>
            </h4>
            <Input
              size="md"
              variant="filled"
              placeholder="Enter 6 digits Farmer Id"
            />
          </div>
          <div className="item">
            <h4>xnxxxaxxxxmxxex</h4>
          </div>
          <div className="item">
            <h4>MOBIL no. :</h4>
            <h4>xxxxxxxxxx</h4>
          </div>
        </div>
        <div className="row3 common">
          <div className="item">
            P Address:
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
        </div>
        <div className="row4 common">
          <div className="item">Cluster:xxxxxxxxxxxx</div>
          <div className="item">Village:xxxxxxxxxxxxx</div>
          <div className="item">Plot No.:xxxxxx</div>
          <div className="item">Area:xxxxx</div>
        </div>
        <div className="row5 common">
          <div className="item">
            <h4>Drainage : xxxx</h4>
          </div>
          <div className="item">
            <h4>Soil Type : xxxx</h4>
          </div>
          <div className="item">
            <h4>Water Type : xxxx</h4>
          </div>
          <div className="item">
            <h4>Irrigation Source : xxxx</h4>
          </div>
          <div className="item">
            <h4>Cultivation Type : xxxx</h4>
          </div>
        </div>
        <div className="row6 common">
          <div className="item">
            <h4>Previous Crop : xxxx</h4>
          </div>
          <div className="item">
            <h4>Crop to be grown : xxxx</h4>
          </div>
          <div className="item">
            <h4>Dt of Sampling : xxxx</h4>
          </div>
          <div className="item">
            <h4>Dt of Sampling Receipt : xxxx</h4>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="centering">
        <Button
          onClick={() => {
            navigate("/recommendations");
          }}
          colorScheme="whatsapp"
          size="md"
        >
          Go
        </Button>
        <Button
          onClick={() => {
            navigate("/crops");
          }}
          colorScheme="whatsapp"
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
