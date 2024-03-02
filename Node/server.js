const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const oracledb = require("oracledb");

const calculations = require("./calculations.js");
const dbConnection = require("./dbconnect.js");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

let fieldsToExtract = [
  "CLUSTER_CD",
  "VILLAGE_CD",
  "PLOT_NO",
  "DRAINAGE",
  "SOIL_TYPE_CD",
  "WATER_TYPE_CD",
  "IRRIGATION_CD",
  "TYPE_OF_CULTIVATION",
  "PREVIOUS_CROP",
  "CROPS_TO_BE_GROWN",
];

function extractUniqueValues(data, field) {
  let uniqueValues = new Set();
  data.forEach((obj) => {
    uniqueValues.add(obj[field]);
  });
  return Array.from(uniqueValues);
}

app.post("/farmerId", async (req, res) => {
  const { farmerId, plotId } = req.body;

  try {
    const connection = await dbConnection;
    const farmer_info = await connection.execute(
      `SELECT * FROM GSMAGRI.FARMER_LIST WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    const result = await connection.execute(
      `SELECT * FROM GSMAGRI.SW_TRAN_HEAD WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    const farmers_info = farmer_info.rows;
    const farmers = result.rows;
    let uniqueValuesList = {};
    if (farmers.length > 0) {
      fieldsToExtract.forEach((field) => {
        uniqueValuesList[field] = extractUniqueValues(farmers, field);
      });
      console.log("FARMER ID");
      res.json(uniqueValuesList);
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error searching for farmer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/init", async (req, res) => {
  try {
    const connection = await dbConnection;
    const test_type = await connection.execute(
      `SELECT TEST_CD,TEST_NAME FROM GSMAGRI.SW_TEST_DIR`
    );
    if (test_type) {
      const arr_test_type = test_type.rows.map((item) => item.TEST_NAME);
      res.json(test_type.rows);
    } else {
      console.log("Test type not found");
    }
  } catch (error) {
    console.error("Error searching for test_type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/temp_no", async (req, res) => {
  const { test_cd } = req.body;
  try {
    const connection = await dbConnection;
    const template_no = await connection.execute(
      `SELECT DISTINCT TEMPLATE_NO FROM SW_MAP_TEMPLATE WHERE TEST_CD = :test_cd`,
      [test_cd]
    );
    if (template_no) {
      console.log(template_no.rows);
    } else {
      console.log("TEST CD not found");
    }
  } catch (error) {
    console.error("Error searching for tets_cd:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api", (req, res) => {
  const parameters = req.body;

  const nitr = parameters.nitr;
  const phos = parameters.phos;
  const pota = parameters.pota;

  const SYT_A = 70;
  const SYT_P = 50;
  const SYT_S = 40;

  // const recomm_obj = calculations(8.33,203.04,117.9,40,50,70)
  const recomm_obj = calculations(phos, pota, nitr, SYT_S, SYT_P, SYT_A);
  res.json(recomm_obj);
});

app.listen(5000, () => {
  console.log("server");
});
