import React from "react";
import Nav from "./Nav";
import "../Styles/Form.css";
import { useState, useEffect } from "react";
import { Input, Button, Select } from "@chakra-ui/react";
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
function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [fire, setFire] = useState(false);
  const [datePicker, setDatePicker] = useState(true);
  return (
    <>
      <Nav />
      <br />
      <div className="tran2">
        {datePicker && (
          <>
            <div className="tran1">
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  setDatePicker(!datePicker);
                }}
              >
                Pick Date instead
              </Button>
            </div>
            <div className="tran1">
              <label htmlFor="start">Enter Start Date</label>
              <Input
                onChange={async (e) => {
                  const startDate1 = e.target.value;
                  setStartDate(startDate1);
                  // setFire(false);
                }}
                value={startDate}
                type="date"
                size="sm"
                id="start"
              ></Input>
            </div>
            <div className="tran1">
              <label htmlFor="end">Enter End Date</label>
              <Input
                onChange={async (e) => {
                  const endDate1 = e.target.value;
                  setEndDate(endDate1);
                }}
                value={endDate}
                type="date"
                size="sm"
                id="end"
              ></Input>
            </div>
          </>
        )}
        {!datePicker && (
          <>
            <div className="tran1">
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  setDatePicker(!datePicker);
                }}
              >
                Pick start date and end date instead
              </Button>
            </div>
            <div className="tran1">
              <label htmlFor="last">Select no. of days</label>
              <Select
                size="sm"
                id="last"
                variant="filled"
                placeholder="Select one..."
                onChange={(e) => {
                  const days = e.target.value;
                  const today = new Date();
                  const year = today.getFullYear();
                  const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1
                  const day = today.getDate();
                  const formattedDate = `${year}-${
                    month < 10 ? "0" : ""
                  }${month}-${day < 10 ? "0" : ""}${day}`;
                  setEndDate(formattedDate);
                  today.setDate(today.getDate() - days);
                  const year1 = today.getFullYear();
                  const month1 = today.getMonth() + 1;
                  const day1 = today.getDate();
                  const formattedDate1 = `${year1}-${
                    month1 < 10 ? "0" : ""
                  }${month1}-${day1 < 10 ? "0" : ""}${day1}`;
                  setStartDate(formattedDate1);
                }}
              >
                <option value="10">last 10 days</option>
                <option value="30">last 30 days</option>
                <option value="180">last 180 days</option>
              </Select>
            </div>
          </>
        )}
        <div className="tran1">
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => {
              if (startDate !== "" || endDate !== "") {
                fetch("http://localhost:5000/transactions", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setTransactions(data);
                    console.log(data);
                  });
              }
            }}
          >
            Show records
          </Button>
        </div>
      </div>
      <br />
      <div className="c1">
        <TableContainer>
          <Table variant="simple" colorScheme="blue" size="lg">
            <TableCaption>Transaction Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Sr No.</Th>
                <Th>Tran Date</Th>
                <Th>Lab Tran No.</Th>
                <Th>Farmer ID</Th>
                <Th>Added By</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Transaction;
