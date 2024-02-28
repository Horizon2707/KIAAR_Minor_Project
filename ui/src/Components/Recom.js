import React from "react";
import "../Styles/Recom.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Recom({ data }) {
  var navigate = useNavigate();
  return (
    <>
      <div className="recomTable">
        <Table size="md" variant="simple">
          <TableCaption placement="top">
            Soil Test Based Nutrient Recommendations
            {data}
          </TableCaption>
          <Tr>
            <Th>Sugarcane Season</Th>
            <Th>Adsali</Th>
            <Th>Pre-Seasional</Th>
            <Th>Seasional</Th>
          </Tr>
          <Tbody>
            <Tr>
              <Th>Sugarcane Yield Target (tonne/acre)</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="md" variant="simple">
          <TableCaption placement="top">Nutrients (in kg/acre)</TableCaption>
          <Tbody>
            <Tr>
              <Th>Nitrogen</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>Phosphorus</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>Potash</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="md" variant="simple">
          <Tbody>
            <TableCaption placement="top">
              Recommended dose of straight and complex fertilizers (kg/acre)
            </TableCaption>
            <Tr>
              <Th>Sugarcane Season</Th>
              <Th colSpan="3" borderRight="1px solid #ddd" textAlign="center">
                Adsali
              </Th>
              <Th colSpan="3" borderRight="1px solid #ddd" textAlign="center">
                Pre-Seasional
              </Th>
              <Th colSpan="3" borderRight="1px solid #ddd" textAlign="center">
                Seasional
              </Th>
            </Tr>
            <Tr>
              <Th>Combination-01</Th>
            </Tr>
            <Tr>
              <Th>Time of application</Th>
              <Th>DAP</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>DAP</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>DAP</Th>
              <Th>MOP</Th>
              <Th>Urea</Th>
            </Tr>
            <Tr>
              <Th>Total</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>At Plantating</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>30-40</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>60-75</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>100-120</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>150-180</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>Combination-02</Th>
            </Tr>
            <Tr>
              <Th>Time of application</Th>
              <Th>SSP</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>SSP</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>SSP</Th>
              <Th>MOP</Th>
              <Th>Urea</Th>
            </Tr>
            <Tr>
              <Th>Total</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>At Plantating</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>30-40</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>60-75</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>100-120</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>150-180</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>Combination-03</Th>
            </Tr>
            <Tr>
              <Th>Time of application</Th>
              <Th>12:32:16</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>12:32:16</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>12:32:16</Th>
              <Th>MOP</Th>
              <Th>Urea</Th>
            </Tr>
            <Tr>
              <Th>Total</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>At Plantating</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>30-40</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>60-75</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>100-120</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>150-180</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>Combination-04</Th>
            </Tr>
            <Tr>
              <Th>Time of application</Th>
              <Th>10:26:26</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>10:26:26</Th>
              <Th>MOP</Th>
              <Th borderRight="1px solid #ddd">Urea</Th>
              <Th>10:26:26</Th>
              <Th>MOP</Th>
              <Th>Urea</Th>
            </Tr>
            <Tr>
              <Th>Total</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>At Plantating</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>30-40</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>60-75</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>100-120</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
            <Tr>
              <Th>150-180</Th>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td borderRight="1px solid #ddd">x</Td>
              <Td>x</Td>
              <Td>x</Td>
              <Td>x</Td>
            </Tr>
          </Tbody>
        </Table>
        <Table size="md" variant="simple">
          <TableCaption placement="top">Micronutrients</TableCaption>
          <Thead>
            <Tr>
              <Th>Sr no.</Th>
              <Th>Fertilizer</Th>
              <Th>Quantity(kg/acre)</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Zinc Sulphate</Td>
              <Td>10.00</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Ferrous Sulphate</Td>
              <Td>10.00</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Manganese Sulphate</Td>
              <Td>5.00</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>Copper Sulphate</Td>
              <Td>5.00</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>Boron</Td>
              <Td>2.00</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
      <br />
      <div className="buttongrp">
        <Button
          background="#CCE5FF"
          color="#000000"
          size="md"
          onClick={() => {
            navigate("/resultentry");
            console.log("Back to Result Entry");
          }}
        >
          Back to Result Entry
        </Button>
      </div>
      <br />
      <br />
    </>
  );
}

export default Recom;
