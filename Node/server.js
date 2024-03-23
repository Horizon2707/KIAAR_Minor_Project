const express = require("express");
const session = require("express-session");
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
app.use(
  session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: true,
  })
);
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
let dropdowns = {};
function extractUniqueValues(data, field) {
  let uniqueValues = new Set();
  data.forEach((obj) => {
    uniqueValues.add(obj[field]);
  });
  return Array.from(uniqueValues);
}

// Assuming dateStr is in yyyy-mm-dd format
function convertDateFormat(dateStr) {
  // Split the date string by '-' to get the year, month, and day parts
  const parts = dateStr.split("-");

  // Reorder the parts to dd mm yyyy format
  const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

  console.log(formattedDate);
}

// Example usage:

let farmerValues;
let parameterValues;

app.post("/farmerId", async (req, res) => {
  const { farmerId } = req.body;

  try {
    const connection = await dbConnection;
    //Farermer ID Retreival
    const farmer_rows = await connection.execute(
      `SELECT * FROM GSMAGRI.SW_TRAN_HEAD WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    //Farmer Information Retreival
    //handle not found
    if (farmer_rows <= 0) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const personal = await connection.execute(
      `SELECT FARMER_NAME,F_ADDRESS,PHONE_NO FROM FARMER_LIST WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    personal_info = personal.rows;
    if (personal_info) {
      console.log(personal_info);
    } else {
      console.log("Personal info not found");
    }

    const farmers = farmer_rows.rows;
    //Lab Tran Numbers
    const labtranno = await connection.execute(
      `SELECT MAX(LAB_TRAN_NO) + 1 AS LAB_TRAN FROM SW_TRAN_HEAD`
    );
    const labtran = labtranno.rows;
    console.log(labtran);
    //Survey Numbers
    const survey_no_t = new Set(farmers.map((item) => item.SY_NO));
    const survey_no = Array.from(survey_no_t);
    console.log(survey_no);
    //DropDown Information Retreival
    if (farmers.length > 0) {
      fieldsToExtract.forEach((field) => {
        dropdowns[field] = extractUniqueValues(farmers, field);
      });
      console.log("FARMER ID");
      console.log(dropdowns);
    } else {
      return res.status(404).json({ message: "Farmer not found" });
    }

    //Soil Type CD to Name

    const soilTypes = dropdowns.SOIL_TYPE_CD;

    // if (soilTypes) {
    //   for (let i = 0; i < soilTypes.length; i++) {
    //     j = soilTypes[i];
    //     const res = await connection.execute(
    //       `SELECT DISTINCT SOIL_TYPE_NAME FROM GSMAGRI.SOIL_TYPE_DIR WHERE SOIL_TYPE_CD =:j`,
    //       [j]
    //     );
    //     soil_types.push(res.rows[0]);
    //   }
    // }
    const soil_all = await connection.execute(
      `SELECT DISTINCT SOIL_TYPE_NAME,SOIL_TYPE_CD FROM GSMAGRI.SOIL_TYPE_DIR`
    );
    const soil_types = soil_all.rows;
    if (soil_types) {
      console.log(soil_types);
    } else {
      console.log("Soil type not found");
    }
    //Irrigation Type CD to Name
    const irrigationTypes = dropdowns.IRRIGATION_CD;

    // if (irrigationTypes) {
    //   for (let i = 0; i < irrigationTypes.length; i++) {
    //     j = irrigationTypes[i];
    //     const res = await connection.execute(
    //       `SELECT DISTINCT IRRIGATION_NAME FROM GSMAGRI.IRRIGATION_DIR WHERE IRRIGATION_CD IN (:i)`,
    //       [j]
    //     );
    //     irrigation_types.push(res.rows[0]);
    //   }
    // }
    const irrigation_all = await connection.execute(
      `SELECT DISTINCT IRRIGATION_NAME,IRRIGATION_CD FROM GSMAGRI.IRRIGATION_DIR `
    );
    const irrigation_types = irrigation_all.rows;
    if (irrigation_types) {
      console.log(irrigation_types);
    } else {
      console.log("Irrigation not found");
    }
    //Previous Crop
    const crop_all = await connection.execute(
      `SELECT CROP_NAME FROM GSMAGRI.SW_CROP_DIR`
    );
    const crop_list = crop_all.rows;
    if (crop_list) {
      console.log(crop_list);
    }
    //Response Object
    const response_obj = {
      farmer_name: personal_info[0]?.FARMER_NAME ?? null,
      farmer_address: personal_info[0]?.F_ADDRESS ?? null,
      phone_no: personal_info[0]?.PHONE_NO ?? null,
      tran_nos: labtran ?? null,
      survey_nos: survey_no ?? null,
      drainage: dropdowns.DRAINAGE ?? null,
      type_of_cultivation: dropdowns.TYPE_OF_CULTIVATION ?? null,
      previous_crop: crop_list ?? null,
      crop_to_be_grown: crop_list ?? null,
      soil_types: soil_types ?? null,
      irrigation_types: irrigation_types ?? null,
    };

    res.json(response_obj);
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
      res.json(template_no.rows);
    } else {
      console.log("TEST CD not found");
    }
  } catch (error) {
    console.error("Error searching for tets_cd:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/clusterInfo", async (req, res) => {
  const { farmerId } = req.body;
  try {
    //Cluster Codes
    const connection = await dbConnection;
    const cluster_cd = await connection.execute(
      `SELECT DISTINCT CLUSTER_CD,CLUSTER_NAME FROM GSMAGRI.FARMER_PLOTS WHERE FARMER_ID = :farmerId`,
      [farmerId]
    );
    res.json(cluster_cd.rows);
    //Cluster Codes to Names

    const cluster_codes = cluster_cd.rows.map((item) => item.CLUSTER_CD);
    let cluster_names = [];
    for (const i of cluster_codes) {
      const res = await connection.execute(
        `SELECT DISTINCT CLUSTER_NAME FROM GSMAGRI.FARMER_PLOTS WHERE CLUSTER_CD IN (:i)`,
        [i]
      );

      cluster_names.push(res.rows[0]);
    }
    console.log(cluster_names);
  } catch (error) {
    console.error("Cluster not found");
  }
});
app.post("/villageInfo", async (req, res) => {
  try {
    const { clusterCd, farmerId } = req.body;

    const connection = await dbConnection;
    const village_names = await connection.execute(
      `SELECT DISTINCT VILLAGE_CD,VILLAGE_NAME FROM FARMER_PLOTS WHERE FARMER_ID=:farmerId AND CLUSTER_CD=:clusterCd`,
      [farmerId, clusterCd]
    );
    res.json(village_names.rows);
  } catch (error) {
    console.error("Village not found");
  }
});

app.post("/surveyno", async (req, res) => {
  try {
    const { farmerId, clusterCd, villageCd } = req.body;

    const connection = await dbConnection;
    const surveyno_all = await connection.execute(
      `SELECT DISTINCT SY_NO FROM FARMER_PLOTS WHERE FARMER_ID=:farmerId AND CLUSTER_CD=:clusterCd AND VILLAGE_CD=:villageCd`,
      [farmerId, clusterCd, villageCd]
    );
    res.json(surveyno_all.rows);
  } catch (error) {
    console.log(error);
  }
});
app.post("/plotNo", async (req, res) => {
  try {
    const { villageCd, farmerId } = req.body;
    console.log(villageCd, farmerId);
    const connection = await dbConnection;
    const plot_nos = await connection.execute(
      `SELECT DISTINCT PLOT_NO FROM FARMER_PLOTS WHERE FARMER_ID=:farmerId AND VILLAGE_CD=:villageCd`,
      [farmerId, villageCd]
    );
    console.log(plot_nos.rows);
    res.json(plot_nos.rows);
  } catch (error) {
    console.error("Plots  not found");
  }
});
app.post("/plotArea", async (req, res) => {
  try {
    const { farmerId, villageCd, plotNo } = req.body;
    const connection = await dbConnection;
    const plot_area = await connection.execute(
      `SELECT DISTINCT PLOT_AREA FROM FARMER_PLOTS WHERE FARMER_ID=:farmerId AND VILLAGE_CD=:villageCd AND PLOT_NO = :plotNo`,
      [farmerId, villageCd, plotNo]
    );

    res.json(plot_area.rows[0].PLOT_AREA);
  } catch (error) {
    console.error("Plot area not found");
  }
});
app.post("/parameters", async (req, res) => {
  try {
    const { test } = req.body;

    let testCd = parseInt(test);
    const connection = await dbConnection;
    const parameter_head_all = await connection.execute(
      `SELECT PARAMETER_ID,PARAMETER_NAME,PARAMETER_TYPE FROM GSMAGRI.SW_PARAMETER_DIR_HEAD WHERE TEST_CD = :testCd`,
      [testCd]
    );
    let parameter_head = parameter_head_all.rows;
    parameter_head.sort((a, b) => a.PARAMETER_ID - b.PARAMETER_ID);

    const parameterIds = parameter_head
      .filter((item) => item.PARAMETER_TYPE === "PARAMETER")
      .map((item) => item.PARAMETER_ID);

    parameters_range_min = [];
    parameters_range_max = [];
    parameters_range_mid = [];
    //Min
    for (const i of parameterIds) {
      const range_min = await connection.execute(
        `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM GSMAGRI.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 1`,
        [i]
      );

      parameters_range_min.push(range_min.rows[0]);
      // parameter = parameter_head.find((j) => j.PARAMETER_ID === i);
      // if (parameter) {
      //   parameter_head.PARAMETER_MIN = range_min.rows[0].VALUE_NAME;
      // }
    }
    //Max
    for (const i of parameterIds) {
      const range_max = await connection.execute(
        `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM GSMAGRI.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 2`,
        [i]
      );

      parameters_range_max.push(range_max.rows[0]);
      // parameter = parameter_head.find((j) => j.PARAMETER_ID === i);
      // if (parameter) {
      //   parameter_head.PARAMETER_MAX = range_max.rows[0].VALUE_NAME;
      // }
    }
    //Mid
    for (const i of parameterIds) {
      const range_mid = await connection.execute(
        `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM GSMAGRI.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 3`,
        [i]
      );

      parameters_range_mid.push(range_mid.rows[0]);
      // parameter = parameter_head.find((j) => j.PARAMETER_ID === i);
      // if (parameter) {
      //   parameter_head.PARAMETER_MID = range_mid.rows[0].VALUE_NAME;
      // }
    }

    const response_obj = {
      parameter_head: parameter_head,
      parameter_min: parameters_range_min,
      parameter_max: parameters_range_max,
      parameter_mid: parameters_range_mid,
    };

    const response_array = response_obj.parameter_head.map((paramHead) => {
      const paramMin = response_obj.parameter_min.find(
        (paramMin) => paramMin.PARAMETER_ID === paramHead.PARAMETER_ID
      );
      const paramMax = response_obj.parameter_max.find(
        (paramMax) => paramMax.PARAMETER_ID === paramHead.PARAMETER_ID
      );
      const paramMid = response_obj.parameter_mid.find(
        (paramMid) => paramMid.PARAMETER_ID === paramHead.PARAMETER_ID
      );

      return {
        PARAMETER_ID: paramHead.PARAMETER_ID,
        PARAMETER_NAME: paramHead.PARAMETER_NAME,
        PARAMETER_TYPE: paramHead.PARAMETER_TYPE,
        PARAMETER_MIN: paramMin ? paramMin.VALUE_NAME : null,
        PARAMETER_MAX: paramMax ? paramMax.VALUE_NAME : null,
        PARAMETER_MID: paramMid ? paramMid.VALUE_NAME : null,
      };
    });
    res.json(response_array);
  } catch (error) {
    console.error("Parameters not found");
  }
});

app.post("/suggestions", async (req, res) => {
  try {
    const { test } = req.body;

    const connection = await dbConnection;
    const suggestion_all = await connection.execute(
      `SELECT SUGGESTION_ID,SUGGESTION_NAME FROM GSMAGRI.SW_SUGGESTION_DIR WHERE TEST_CD=:test`,
      [test]
    );
    const suggestions = suggestion_all.rows;
    suggestions.sort((a, b) => a.SUGGESTION_ID - b.SUGGESTION_ID);
    res.json(suggestions);
  } catch (error) {
    console.error("Suggestions not found");
  }
});
app.post("/newSuggestion", async (req, res) => {
  try {
    const { newSuggestion, test } = req.body;
    const testCd = parseInt(test);
    const connection = await dbConnection;
    console.log(testCd);
    const new_suggestion = await connection.execute(
      `INSERT INTO GSMAGRI.SW_SUGGESTION_DIR(
        SUGGESTION_ID,
        SUGGESTION_NAME,
        TYPE_OF_SUGGESTION,
        KF_SUGGESTION_NAME,
        TEST_CD
      )
    VALUES
      (
        (SELECT MAX(SUGGESTION_ID) + 1 FROM GSMAGRI.SW_SUGGESTION_DIR),
        :newSuggestion,
        'NORMAL',
        'NULL',
        :testCd
      )`,
      [newSuggestion, testCd]
    );
    await connection.execute("COMMIT");
    if (new_suggestion) {
      res.json({ bool: true });
    }
  } catch (error) {
    console.error("New Suggestion not added", error);
  }
});
app.post("/values", async (req, res) => {
  try {
    const { values, paramValues, suggestions } = req.body;
    console.log(suggestions);
    farmerValues = values;
    parameterValues = {};
    for (const key in paramValues) {
      parameterValues[key] = parseInt(paramValues[key], 10);
    }

    let tranNo = farmerValues.labNo[0].LAB_TRAN;
    let farmerId = farmerValues.farmerId;
    let tempNo = farmerValues.templateNo[0].TEMPLATE_NO;

    convertDateFormat(farmerValues.dtOfSampling);
    console.log(farmerValues);
    console.log(parameterValues);

    const connection = await dbConnection;
    const tran_head = await connection.execute(
      `INSERT INTO GSMAGRI.SW_TRAN_HEAD (
        COMPANY_CD,
        SEASON_CD,
        TRAN_DATE,
        LAB_TRAN_NO,
        FARMER_ID,
        SY_NO,
        CLUSTER_CD,
        VILLAGE_CD,
        PLOT_NO,
        IRRIGATION_CD,
        SOIL_TYPE_CD,
        TYPE_OF_CULTIVATION,
        DRAINAGE,
        PREVIOUS_CROP,
        CROPS_TO_BE_GROWN,
        REMARKS,
        ADD_BY,
        ADD_DATE,
        RECOMMENTATION_REMARKS,
        SUGESSTION_REMARKS,
        DATE_OF_SAMPLING,
        DATE_OF_SAMPLE_RECEIPT,
        TEST_CD,
        PLOT_AREA,
        PLOT_AREA_IN_GUNTA,
        TEMPLATE_NO,
        LATTITUDE,
        LONGITUDE,
        GEO_CODE,
        GBL_KHATE_ID,
        GBL_PLOT_ID,
        SF_SOIL_ID,
        SMS_SENT_FLAG,
        HEWF_ORDER_NO,
        SYNC_STATUS,
        SYNC_REMARKS,
        WATER_TYPE_CD
      )
      VALUES (
        1,
        21,
        '20-03-24',
        :tranNo,
        :farmerId,
        :surveyNo,
        :clusterCd,
        :villageCd,
        :plotNo,
        :irrigationCd,
        :soiltype,
        :culType,
        :drainage,
        :prevCrop,
        'SUNFLOWER',
        NULL,       
        290,
        '20-03-24',
        NULL,       
        NULL,       
        '20-03-24', 
        '20-03-24', 
        :testCd,
        :pltArea,
        :gunta,
        2,
        NULL,       
        NULL,       
        NULL,       
        10,
        51,
        NULL,       
        'N',
        NULL,       
        'N',
        NULL,
        17
      )
      `,
      [
        //convertDateFormat(new Date().toISOString().split("T")[0]),
        parseInt(tranNo),
        parseInt(farmerId),
        farmerValues.surveyNo,
        parseInt(farmerValues.cluster),
        parseInt(farmerValues.village),
        parseInt(farmerValues.plotNo),
        parseInt(farmerValues.irrigationSource),
        parseInt(farmerValues.soilType),
        farmerValues.cultivationType,
        farmerValues.drainage,
        farmerValues.previousCrop,
        //farmerValues.cropsToBeGrown,
        //convertDateFormat(new Date().toISOString().split("T")[0]),
        //convertDateFormat(farmerValues.dtOfSampling),
        //convertDateFormat(farmerValues.dtOfSamplingReceipt),
        parseInt(farmerValues.test),
        parseInt(farmerValues.area),
        parseInt(farmerValues.area),
        //parseInt(tempNo),
      ].map((value, index) => {
        if (isNaN(value) && typeof value !== "string") {
          throw new Error(
            `Invalid value "${value}" at index ${index + 1}. Expected a number.`
          );
        }
        return value;
      })
    );
    console.log(tran_head);
  } catch (error) {
    console.log(error);
  }
});

// Authentication methods
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    return next();
  }
  // User is not authenticated, redirect or send an error response
  res.status(401).send("Unauthorized");
}
app.get("/authenticate", isAuthenticated, (req, res) => {
  res.status(200).send("Authorized");
});
app.get("/session", isAuthenticated, (req, res) => {
  res.json({ user: req.session.user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // db connection
    const connection = await dbConnection;

    const user_all = await connection.execute(
      `SELECT USER_ID,EMAIL,PASSWORD,NAME FROM GSMAGRI.SW_USER_DATA WHERE EMAIL = :email`,
      [email]
    );
    const user = user_all.rows;

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user[0].PASSWORD);
      console.log(isPasswordValid);
      if (isPasswordValid) {
        req.session.user = req.body;
        console.log(req.session.user.email);
        return res.status(200).json({
          email: req.session.user.email,
          name: user[0].NAME,
        });
      } else {
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(401).send("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.post("/signUp", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await dbConnection;
    const new_user = await connection.execute(
      `INSERT INTO gsmagri.sw_user_data (
      user_id,
      email,
      password,
      is_active,
      name
  ) VALUES (
      (SELECT MAX(user_id) + 1 FROM gsmagri.sw_user_data),
      :email,
      :hashedPassword,
      1,
      :name
  )`,
      [email, hashedPassword, fullName]
    );
    await connection.execute("COMMIT");
    if (new_user) {
      res.sendStatus(201);
    }
    // Created
  } catch (error) {
    console.error("Error creating user:", error);
    res.sendStatus(500); // Internal Server Error
  }
});

app.post("/calc", (req, res) => {
  const { parameters } = req.body;

  const nitr = parameters.nitr;
  const phos = parameters.phos;
  const pota = parameters.pota;
  console.log(nitr);
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
