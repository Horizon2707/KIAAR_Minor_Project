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

app.post("/farmerId", async (req, res) => {
  const { farmerId } = req.body;

  try {
    const connection = await dbConnection;
    const result = await connection.execute(
      `SELECT * FROM GSMAGRI.SW_TRAN_HEAD WHERE FARMER_ID =${farmerId}`
    );
    const farmer = result.rows[0];

    if (farmer) {
      console.log(farmer);
    } else {
      res.status(404).json({ message: "Farmer not found" });
    }
  } catch (error) {
    console.error("Error searching for farmer:", error);
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
