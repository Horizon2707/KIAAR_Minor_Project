const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const oracledb = require("oracledb");
const { calculations } = require("./calculations.js");
// const { final_calc } = require("./calc.js");
// const dbConnection = require("./dbconnect.js");
const { reportGen } = require("./excel_gen.js");
// const fs = require("fs");
// const { formatWithOptions } = require("util");
const AWS = require("aws-sdk");
// const multer = require("multer");
AWS.config.update({
  accessKeyId: "AKIA5FTY7W63IQSVYTEC",
  secretAccessKey: "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",
  region: "ap-south-1",
});
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const jsonFilePath = "../Node/assests/data.json";

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
function formatDate(date) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
function formatDateAlt(originalDate) {
  const dateParts = originalDate.split("-");
  const year = dateParts[0];
  const month = new Date(originalDate)
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = dateParts[2];

  return `${day}-${month}-${year}`;
}
const today = new Date();
// Example usage:

let farmerValues;
let parameterValues = {};
let suggestions_all;
let parameters;
let report_values;
let parameter_names;
let farmerInformation;
let all_local;
let remarks;
let formulae;
let labTran;
let pdfbuffer;
app.post("/farmerId", async (req, res) => {
  const { farmerId } = req.body;

  // try {
  //   const connection = await dbConnection;
  //   const farmer_rows = await connection.execute(
  //     `SELECT * FROM GSMAGRI.SW_TRAN_HEAD WHERE FARMER_ID =:farmerId`,
  //     [farmerId]
  //   );
  //   if (farmer_rows <= 0) {
  //     return res.status(404).json({ message: "Farmer not found" });
  //   }

  //   const personal = await connection.execute(
  //     `SELECT FARMER_NAME,F_ADDRESS,PHONE_NO FROM FARMER_LIST WHERE FARMER_ID =:farmerId`,
  //     [farmerId]
  //   );
  //   personal_info = personal.rows;
  //   if (personal_info) {
  //     console.log(personal_info);
  //   } else {
  //     console.log("Personal info not found");
  //   }
  //   const farmers = farmer_rows.rows;
  //   const labtranno = await connection.execute(
  //     `SELECT MAX(LAB_TRAN_NO) + 1 AS LAB_TRAN FROM SW_TRAN_HEAD`
  //   );
  //   const labtran = labtranno.rows;
  //   console.log(labtran);
  //   const survey_no_t = new Set(farmers.map((item) => item.SY_NO));
  //   const survey_no = Array.from(survey_no_t);
  //   console.log(survey_no);
  //   if (farmers.length > 0) {
  //     fieldsToExtract.forEach((field) => {
  //       dropdowns[field] = extractUniqueValues(farmers, field);
  //     });
  //     console.log("FARMER ID");
  //     console.log(dropdowns);
  //   } else {
  //     return res.status(404).json({ message: "Farmer not found" });
  //   }
  //   const soilTypes = dropdowns.SOIL_TYPE_CD;
  //   const soil_all = await connection.execute(
  //     `SELECT DISTINCT SOIL_TYPE_NAME,SOIL_TYPE_CD FROM GSMAGRI.SOIL_TYPE_DIR`
  //   );
  //   const soil_types = soil_all.rows;
  //   if (soil_types) {
  //     console.log(soil_types);
  //   } else {
  //     console.log("Soil type not found");
  //   }
  //   //Irrigation Type CD to Name
  //   const irrigationTypes = dropdowns.IRRIGATION_CD;

  //   const irrigation_all = await connection.execute(
  //     `SELECT DISTINCT IRRIGATION_NAME,IRRIGATION_CD FROM GSMAGRI.IRRIGATION_DIR `
  //   );
  //   const irrigation_types = irrigation_all.rows;
  //   if (irrigation_types) {
  //     console.log(irrigation_types);
  //   } else {
  //     console.log("Irrigation not found");
  //   }
  //   //Previous Crop
  //   const crop_all = await connection.execute(
  //     `SELECT CROP_NAME FROM GSMAGRI.SW_CROP_DIR`
  //   );
  //   const crop_list = crop_all.rows;
  //   if (crop_list) {
  //     console.log(crop_list);
  //   }
  //   //Response Object
  //   const response_obj = {
  //     farmer_name: personal_info[0]?.FARMER_NAME ?? null,
  //     farmer_address: personal_info[0]?.F_ADDRESS ?? null,
  //     phone_no: personal_info[0]?.PHONE_NO ?? null,
  //     tran_nos: labtran ?? null,
  //     survey_nos: survey_no ?? null,
  //     drainage: dropdowns.DRAINAGE ?? null,
  //     type_of_cultivation: dropdowns.TYPE_OF_CULTIVATION ?? null,
  //     previous_crop: crop_list ?? null,
  //     crop_to_be_grown: crop_list ?? null,
  //     soil_types: soil_types ?? null,
  //     irrigation_types: irrigation_types ?? null,
  //   };

  //   res.json(response_obj);
  // } catch (error) {
  //   console.error("Error searching for farmer:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
  try {
    let data = 0;
    let dropdowns = {};
    let res1 = await fetch("http://localhost:7000/farmerInfo", {
      method: "POST",
      body: JSON.stringify({ farmerId: farmerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res1.ok) {
      data = await res1.json();
    }
    let {
      farmer_rows,
      personal,
      labtranno,
      soil_all,
      irrigation_all,
      crop_all,
    } = data;
    if (farmer_rows <= 0) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    personal_info = personal;
    if (personal_info) {
      console.log(personal_info);
    } else {
      console.log("Personal info not found");
    }
    const farmers = farmer_rows;
    const labtran = labtranno;
    const survey_no_t = new Set(farmers.map((item) => item.SY_NO));
    const survey_no = Array.from(survey_no_t);
    if (farmers.length > 0) {
      fieldsToExtract.forEach((field) => {
        dropdowns[field] = extractUniqueValues(farmers, field);
      });

      console.log(dropdowns);
    } else {
      return res.status(404).json({ message: "Farmer not found" });
    }
    // const soilTypes = dropdowns.SOIL_TYPE_CD;
    const soil_types = soil_all;
    if (soil_types) {
      console.log(soil_types);
    } else {
      console.log("Soil type not found");
    }
    const irrigation_types = irrigation_all;
    if (irrigation_types) {
      console.log(irrigation_types);
    } else {
      console.log("Irrigation not found");
    }
    const crop_list = crop_all;
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
  } catch (e) {
    console.error("Error searching for farmer:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/init", async (req, res) => {
  //   try {
  //     const connection = await dbConnection;
  //     const test_type = await connection.execute(
  //       `SELECT TEST_CD,TEST_NAME FROM GSMAGRI.SW_TEST_DIR`
  //     );
  //     if (test_type) {
  //       const arr_test_type = test_type.rows.map((item) => item.TEST_NAME);
  //       res.json(test_type.rows);
  //     } else {
  //       console.log("Test type not found");
  //     }
  //   } catch (error) {
  //     console.error("Error searching for test_type:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }
  try {
    fetch("http://localhost:7000/testName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          console.log("Test type not found");
        }
      });
  } catch (e) {
    console.error("Error searching for test_type:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/temp_no", async (req, res) => {
  const { test_cd } = req.body;
  // try {
  //   const connection = await dbConnection;
  //   const template_no = await connection.execute(
  //     `SELECT DISTINCT TEMPLATE_NO FROM SW_MAP_TEMPLATE WHERE TEST_CD = :test_cd`,
  //     [test_cd]
  //   );
  //   if (template_no) {
  //     res.json(template_no.rows);
  //   } else {
  //     console.log("TEST CD not found");
  //   }
  // } catch (error) {
  //   console.error("Error searching for tets_cd:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
  fetch("http://localhost:7000/tempNo", {
    method: "POST",
    body: JSON.stringify({ test_cd: test_cd }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // const { template_no } = data;
      res.json(data);
    });
});

app.post("/clusterInfo", async (req, res) => {
  const { farmerId } = req.body;
  // try {
  //   //Cluster Codes
  //   const connection = await dbConnection;
  //   const cluster_cd = await connection.execute(
  //     `SELECT DISTINCT CLUSTER_CD,CLUSTER_NAME FROM GSMAGRI.FARMER_PLOTS WHERE FARMER_ID = :farmerId`,
  //     [farmerId]
  //   );
  //   if (cluster_cd.rows.length > 0) {
  //     res.json(cluster_cd.rows);
  //   } else {
  //     res.status(404);
  //   }
  //   //Cluster Codes to Names

  // const cluster_codes = cluster_cd.rows.map((item) => item.CLUSTER_CD);
  //   let cluster_names = [];
  //   for (const i of cluster_codes) {
  //     const res = await connection.execute(
  //       `SELECT DISTINCT CLUSTER_NAME FROM GSMAGRI.FARMER_PLOTS WHERE CLUSTER_CD IN (:i)`,
  //       [i]
  //     );

  //     cluster_names.push(res.rows[0]);
  //   }
  //   console.log(cluster_names);
  // } catch (error) {
  //   console.error("Cluster not found");
  // }

  fetch("http://localhost:7000/clusterInfo", {
    method: "POST",
    body: JSON.stringify({ farmerId: farmerId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    });
});
app.post("/villageInfo", async (req, res) => {
  try {
    const { clusterCd, farmerId } = req.body;
    fetch("http://localhost:7000/villageInfo", {
      method: "POST",
      body: JSON.stringify({ clusterCd: clusterCd, farmerId: farmerId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    console.error("Village not found");
  }
});

app.post("/surveyno", async (req, res) => {
  try {
    const { farmerId, clusterCd, villageCd } = req.body;
    fetch("http://localhost:7000/surveyNo", {
      method: "POST",
      body: JSON.stringify({
        farmerId: farmerId,
        clusterCd: clusterCd,
        villageCd: villageCd,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    console.log(error);
  }
});
app.post("/plotNo", async (req, res) => {
  try {
    const { villageCd, farmerId } = req.body;
    fetch("http://localhost:7000/plotNo", {
      method: "POST",
      body: JSON.stringify({ villageCd: villageCd, farmerId: farmerId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
      });
  } catch (error) {
    console.error("Plots  not found");
  }
});
app.post("/plotArea", async (req, res) => {
  try {
    const { farmerId, villageCd, plotNo } = req.body;
    // const connection = await dbConnection;
    // const plot_area = await connection.execute(
    //   `SELECT DISTINCT PLOT_AREA FROM FARMER_PLOTS WHERE FARMER_ID=:farmerId AND VILLAGE_CD=:villageCd AND PLOT_NO = :plotNo`,
    //   [farmerId, villageCd, plotNo]
    // );
    fetch("http://localhost:7000/plotArea", {
      method: "POST",
      body: JSON.stringify({
        farmerId: farmerId,
        villageCd: villageCd,
        plotNo: plotNo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data.rows[0].PLOT_AREA);
      });
  } catch (error) {
    console.error("Plot area not found");
  }
});
app.post("/parameters", async (req, res) => {
  try {
    const { test } = req.body;

    let testCd = parseInt(test);
    //Parameter head

    // const connection = await dbConnection;
    // const parameter_head_all = await connection.execute(
    //   `SELECT PARAMETER_ID,PARAMETER_NAME,PARAMETER_TYPE FROM GSMAGRI.SW_PARAMETER_DIR_HEAD WHERE TEST_CD = :testCd`,
    //   [testCd]
    // );
    // let parameter_head = parameter_head_all.rows;
    // parameter_head.sort((a, b) => a.PARAMETER_ID - b.PARAMETER_ID);
    let parameter_head = [];
    // fetch("http://localhost:7000/parameter_head", {
    //   method: "POST",
    //   body: JSON.stringify({ test: testCd }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     res.json(data);
    //   })
    //   .catch((error) => {
    //     console.error("Parameters not found", error);
    //   });

    const res1 = await fetch("http://localhost:7000/parameter_head", {
      method: "POST",
      body: JSON.stringify({ test: testCd }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res1.headers.get("content-type")?.includes("application/json")) {
      const data = await res1.json();
      // console.log("Parsed JSON Data:", data);
      parameter_head = data;
    } else {
      const text = await res1.text();
    }
    // console.log(res1);
    // const data = await res1.json();
    // parameter_head = data;
    // console.log(data);
    // res.send("OK");
    const parameterIds = parameter_head
      .filter((item) => item.PARAMETER_TYPE === "PARAMETER")
      .map((item) => item.PARAMETER_ID);
    let parameters_range_min = [];
    let parameters_range_max = [];
    let parameters_range_mid = [];

    //Min

    const res_min = await fetch("http://localhost:7000/para_range_min", {
      method: "POST",
      body: JSON.stringify({ parameterIds: parameterIds }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        parameters_range_min = data;
      });
    const res_max = await fetch("http://localhost:7000/para_range_max", {
      method: "POST",
      body: JSON.stringify({ parameterIds: parameterIds }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        parameters_range_max = data;
      });
    // fetch("http://localhost:7000/para_range_mid", {
    //   method: "POST",
    //   body: JSON.stringify({ parameterIds: parameterIds }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     parameters_range_mid = data;
    //   });
    const res_mid = await fetch("http://localhost:7000/para_range_mid", {
      method: "POST",
      body: JSON.stringify({ parameterIds: parameterIds }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        parameters_range_mid = data;
      });
    //Max
    // for (const i of parameterIds) {
    //   const range_max = await connection.execute(
    //     `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM GSMAGRI.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 2`,
    //     [i]
    //   );

    // parameters_range_max.push(range_max.rows[0]);
    // parameter = parameter_head.find((j) => j.PARAMETER_ID === i);
    // if (parameter) {
    //   parameter_head.PARAMETER_MAX = range_max.rows[0].VALUE_NAME;
    // }

    //Mid
    // for (const i of parameterIds) {
    //   const range_mid = await connection.execute(
    //     `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM GSMAGRI.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 3`,
    //     [i]
    //   );

    //   parameters_range_mid.push(range_mid.rows[0]);
    //   // parameter = parameter_head.find((j) => j.PARAMETER_ID === i);
    //   // if (parameter) {
    //   //   parameter_head.PARAMETER_MID = range_mid.rows[0].VALUE_NAME;
    //   // }
    // }

    const response_obj = {
      parameter_head: parameter_head,
      parameter_min: parameters_range_min,
      parameter_max: parameters_range_max,
      parameter_mid: parameters_range_mid,
    };
    // console.log(response_obj);
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
    parameter_names = response_array;
    res.json(response_array);
  } catch (error) {
    console.error("Parameters not found");
  }
});

app.post("/suggestions", async (req, res) => {
  try {
    const { test } = req.body;

    // const connection = await dbConnection;
    // const suggestion_all = await connection.execute(
    //   `SELECT SUGGESTION_ID,SUGGESTION_NAME FROM GSMAGRI.SW_SUGGESTION_DIR WHERE TEST_CD=:test`,
    //   [test]
    // );
    fetch("http://localhost:7000/suggestions", {
      method: "POST",
      body: JSON.stringify({ test: test }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
      });
    // const suggestions = suggestion_all.rows;
    // suggestions.sort((a, b) => a.SUGGESTION_ID - b.SUGGESTION_ID);
    // res.json(suggestions);
  } catch (error) {
    console.error("Suggestions not found");
  }
});
app.post("/newSuggestion", async (req, res) => {
  try {
    const { newSuggestion, test } = req.body;
    // const testCd = parseInt(test);
    // const connection = await dbConnection;
    // console.log(testCd);
    // const new_suggestion = await connection.execute(
    //   `INSERT INTO GSMAGRI.SW_SUGGESTION_DIR(
    //     SUGGESTION_ID,
    //     SUGGESTION_NAME,
    //     TYPE_OF_SUGGESTION,
    //     KF_SUGGESTION_NAME,
    //     TEST_CD
    //   )
    // VALUES
    //   (
    //     (SELECT MAX(SUGGESTION_ID) + 1 FROM GSMAGRI.SW_SUGGESTION_DIR),
    //     :newSuggestion,
    //     'NORMAL',
    //     'NULL',
    //     :testCd
    //   )`,
    //   [newSuggestion, testCd]
    // );
    // await connection.execute("COMMIT");
    fetch("http://localhost:7000/newSuggestion", {
      method: "POST",
      body: JSON.stringify({ newSuggestion: newSuggestion, test: test }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.bool) {
          res.json({ bool: true });
        }
      });
  } catch (error) {
    console.error("New Suggestion not added", error);
  }
});

app.post("/values", async (req, res) => {
  try {
    const {
      values,
      paramValues,
      suggestions,
      farmerInfo,
      local,
      finalRemarks,
      user,
    } = req.body;
    farmerValues = values;
    parameterValues = {};
    for (const key in paramValues) {
      parameterValues[key] = parseInt(paramValues[key], 10);
    }
    //      calculations(parameterValues.phos, parameterValues.pota, parameterValues.nitr, 40, 50, 70);
    const micro = {
      zincSulphate: parameterValues[26],
      ferrousSulphate: parameterValues[25],
      copperSulphate: parameterValues[23],
      sodium: parameterValues[27],
      manganeseSulphate: parameterValues[24],
    };

    const npk = {
      nitrogen: parameterValues[15],
      phosphorus: parameterValues[16],
      potassium: parameterValues[17],
    };

    farmerInformation = farmerInfo;
    all_local = local;
    // const selectedSuggestions = suggestions.filter(
    //   (suggestion) => suggestion.selected === true
    // );
    // let suggestions_all = selectedSuggestions;
    remarks = finalRemarks;
    const tranNo = farmerValues.labNo;
    labTran = tranNo;
    // const tranNo = farmerValues.labNo[0].LAB_TRAN || farmerValues.labNo;
    const farmerId = farmerValues.farmerId;

    const { yield_target } = await get_yields();

    const yt_A = yield_target[0].TARGET_YIELD;
    const yt_P = yield_target[1].TARGET_YIELD;
    const yt_S = yield_target[2].TARGET_YIELD;
    // console.log(parameterValues);
    // console.log(tranNo, farmerId);
    // console.log(parameterValues[15], parameterValues[16], parameterValues[17]);
    const final_calc = calculations(
      npk.phosphorus,
      npk.potassium,
      npk.nitrogen,
      yt_A,
      yt_P,
      yt_S,
      micro.zincSulphate,
      micro.copperSulphate,
      micro.sodium,
      micro.ferrousSulphate,
      micro.manganeseSulphate
    );

    const updateTables = async () => {
      try {
        const recommendation_tran = await fetch(
          "http://localhost:7000/insert_recomm_tran",
          {
            method: "POST",
            body: JSON.stringify({
              final_calc: final_calc,
              farmerValues: farmerValues,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!recommendation_tran.ok) {
          console.error("Recommendation Tran not updated");
          return 3;
        } else {
          console.log("Recomm Inserted");
        }

        const tran_head = await fetch(
          "http://localhost:7000/insert_tran_head",
          {
            method: "POST",
            body: JSON.stringify({
              values: values,
              local: local,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Inside updateTables");
        if (!tran_head.ok) {
          const errorData = await tran_head.json();
          console.error("Error from insert_tran_head:", errorData);
          return 0;
          // return res
          //   .status(500)
          //   .json({ message: "Internal server error from insert_tran_head" });
        } else {
          console.log("Tran Head Updated");
        }

        const suggestion_tail = await fetch(
          "http://localhost:7000/insert_suggestion_tail",
          {
            method: "POST",
            body: JSON.stringify({
              suggestions: suggestions,
              farmerValues: farmerValues,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!suggestion_tail.ok) {
          const errorData = await suggestion_tail.json();
          console.error("Error from insert_suggestion_tail:", errorData);
          // return res.status(500).json({
          //   message: "Internal server error from insert_suggestion_tail",
          // });
          return 1;
        }

        console.log("Suggestion Tail Updated");

        // let tran_tail;
        // const parameterValuesArray = Object.keys(parameterValues);
        // parameterValuesArray.map(async (key) => {
        //   tran_tail = await connection.execute(
        //     `INSERT INTO gsmagri.sw_tran_tail (
        //       lab_tran_no,
        //       parameter_id,
        //       test_method,
        //       result_value,
        //       parameter_id_slno,
        //       print_flag,
        //       test_cd
        //   ) VALUES (
        //       :v0,
        //       :v1,
        //       'NONE',
        //       :v3,
        //       NULL,
        //       :v5,
        //       :v6
        //   )`,
        //     [
        //       tranNo,
        //       parseInt(key),
        //       parseInt(parameterValues[key]),
        //       "Y",
        //       parseInt(farmerValues.test),
        //     ]
        //   );
        // });
        const tran_tail = await fetch(
          "http://localhost:7000/insert_tran_tail",
          {
            method: "POST",
            body: JSON.stringify({
              farmerValues: farmerValues,
              paramValues: paramValues,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!tran_tail.ok) {
          console.error("Tran Tail not updated");
          return 2;
        } else {
          console.log("Tran Tail Updated");
        }
      } catch (error) {
        console.error(error.message);
        // return res.status(500).json({ message: error.message });
      }
    };

    const delete_tran = await fetch("http://localhost:7000/deleting", {
      method: "POST",
      body: JSON.stringify({ tranNo: tranNo }),
      headers: { "Content-Type": "application/json" },
    });
    if (delete_tran.ok) {
      console.log("BRUH");
      let a = await updateTables();
      return res.status(200).json({ message: "Success" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/getValues", async (req, res) => {
  const values_all = {
    values: farmerValues,
    paramValues: parameterValues,
    suggestions: suggestions_all,
  };
  report_values = values_all;
  const { yield_target } = await get_yields();
  const cdtonames = await codeToName();
  const { combination_cd, product_cd, time_apply_cd, crop_season_cd } =
    await combination_cds();
  console.log("This is before");
  // const connection = await dbConnection;
  // const get_recomm_all = await connection.execute(
  //   `SELECT COMBINE_CD,CROP_SEASON_CD,SW_PRODUCT_CD,RECOM_APPLY_TIME_CD,PRODUCT_VALUE FROM SW_RECOMMENDATION_TRAN_NEW WHERE LAB_TRAN_NO = :tranNo`,
  //   [labTran]
  // );
  const get_recomm_all_req = await fetch(
    "http://localhost:7000/get_recomm_all",
    {
      method: "POST",
      body: JSON.stringify({ labTran: labTran }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const get_recomm_all = await get_recomm_all_req.json();
  let final_calc = {};
  console.log(get_recomm_all);
  get_recomm_all.forEach((row) => {
    if (!final_calc[row.COMBINE_CD]) {
      final_calc[row.COMBINE_CD] = {};
    }
    if (!final_calc[row.COMBINE_CD][row.CROP_SEASON_CD]) {
      final_calc[row.COMBINE_CD][row.CROP_SEASON_CD] = {};
    }
    if (!final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD]) {
      final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD] = {};
    }
    final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD][
      row.RECOM_APPLY_TIME_CD
    ] = parseInt(row.PRODUCT_VALUE);
  });
  // console.log(final_calc);
  pdfbuffer = await reportGen(
    values_all,
    parameter_names,
    farmerInformation,
    all_local,
    cdtonames,
    remarks,
    yield_target,
    combination_cd,
    product_cd,
    time_apply_cd,
    crop_season_cd,
    final_calc
  );
  if (pdfbuffer) {
    console.log("buffer generated");

    res.send(pdfbuffer);
  } else {
    console.log("buffer not generated");
  }
  // console.log("This is After", status);

  // res.json(response_obj);
});

// app.post("/test", async (req, res) => {
//   const { labTran } = req.body;
//   try {
//     const connection = await dbConnection;
//     const get_recomm_all = await connection.execute(
//       `SELECT COMBINE_CD,CROP_SEASON_CD,SW_PRODUCT_CD,RECOM_APPLY_TIME_CD,PRODUCT_VALUE FROM SW_RECOMMENDATION_TRAN_NEW WHERE LAB_TRAN_NO = :tranNo`,
//       [labTran]
//     );
//     // console.log(get_recomm_all.rows);
//     let final_calc = {};
//     get_recomm_all.rows.forEach((row) => {
//       if (!final_calc[row.COMBINE_CD]) {
//         final_calc[row.COMBINE_CD] = {};
//       }
//       if (!final_calc[row.COMBINE_CD][row.CROP_SEASON_CD]) {
//         final_calc[row.COMBINE_CD][row.CROP_SEASON_CD] = {};
//       }
//       if (!final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD]) {
//         final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD] = {};
//       }
//       final_calc[row.COMBINE_CD][row.CROP_SEASON_CD][row.SW_PRODUCT_CD][
//         row.RECOM_APPLY_TIME_CD
//       ] = row.PRODUCT_VALUE;
//     });
//     console.log(JSON.stringify(final_calc, null, 2));
//   } catch (e) {
//     console.log(e);
//   }
// });
// app.post("/yield_target", async (req, res) => {
//   const connection = await dbConnection;
//   const yield_target_all = await connection.execute(
//     `SELECT * FROM GSMAGRI.CROP_NAME_YT`
//   );
//   const yield_target = yield_target_all.rows;
//   console.log(yield_target);
// });
// app.post("/npk", async (req, res) => {
//   try {
//     const res_obj = {
//       nitrogen: parameterValues[15],
//       phosphorus: parameterValues[16],
//       potash: parameterValues[17],
//     };
//     res.json(res_obj);
//   } catch (e) {
//     console.log(e);
//   }
// });

app.post("/checkLabTran", async (req, res) => {
  const { labNo } = req.body;
  const checkLabTran = fetch("http://localhost:7000/checkLabTran", {
    method: "POST",
    body: JSON.stringify({ labNo: labNo }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(checkLabTran);
  if (checkLabTran.ok) {
    const data = await checkLabTran.json();
    res.json(data).status(200);
  } else {
    console.log("Error in fetching labTran");
    res.status(404).json({ message: "Lab Tran not found" });
  }
});

app.get("/season", async (req, res) => {
  const season = await fetch("http://localhost:7000/season", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const season_data = await season.json();
  res.json(season_data);
});

const get_yields = async () => {
  // const connection = await dbConnection;
  // const yield_target_all = await connection.execute(
  //   `SELECT * FROM GSMAGRI.CROP_NAME_YT`
  // );
  // const yield_target = yield_target_all.rows;
  // return { yield_target };
  const yield_target_all = await fetch("http://localhost:7000/get_yields", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (yield_target_all.ok) {
    const yield_target_data = await yield_target_all.json();
    data = { yield_target: yield_target_data };
    return data;
  } else {
    console.log("Error in fetching yield target");
  }
};
const combination_cds = async () => {
  // const connection = await dbConnection;
  // const combination_cd_all = await connection.execute(
  //   `SELECT DISTINCT COMBINATION_CD,COMBINATION_NAME FROM GSMAGRI.SW_COMBINATION_LIST`
  // );
  // const combination_cd = combination_cd_all.rows;

  // const product_cd_all = await connection.execute(
  //   `SELECT DISTINCT PRODUCT_CD,SW_PRODUCT_NAME FROM GSMAGRI.SW_COMBINATION_LIST`
  // );
  // const product_cd = product_cd_all.rows;

  // const crop_season_cd_all = await connection.execute(
  //   `SELECT DISTINCT CROP_SEASON_CD,CROP_SEASON FROM GSMAGRI.SW_CROP_SEASON_DIR`
  // );
  // const crop_season_cd = crop_season_cd_all.rows;

  // const time_apply_cd_all = await connection.execute(
  //   `SELECT DISTINCT RECOM_APPLY_TIME_CD,RECOM_APPLY_TIME FROM GSMAGRI.SW_RECOM_APPLY_TIME_DIR`
  // );
  // const time_apply_cd = time_apply_cd_all.rows.slice(0, 5);

  // return { combination_cd, product_cd, time_apply_cd, crop_season_cd };
  const combination_cd_all = await fetch(
    "http://localhost:7000/combination_cds",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (combination_cd_all.ok) {
    const combination_cds = await combination_cd_all.json();
    return combination_cds;
  } else {
    console.log("Error in fetching combination_cds");
  }
};
// app.post("/combination_cds", async (req, res) => {
//   const connection = await dbConnection;
//   const combination_cd_all = await connection.execute(
//     `SELECT DISTINCT COMBINATION_CD,COMBINATION_NAME FROM GSMAGRI.SW_COMBINATION_LIST`
//   );
//   const combination_cd = combination_cd_all.rows;

//   const product_cd_all = await connection.execute(
//     `SELECT DISTINCT PRODUCT_CD,SW_PRODUCT_NAME FROM GSMAGRI.SW_COMBINATION_LIST`
//   );
//   const product_cd = product_cd_all.rows;

//   const crop_season_cd_all = await connection.execute(
//     `SELECT DISTINCT CROP_SEASON_CD,CROP_SEASON FROM GSMAGRI.SW_CROP_SEASON_DIR`
//   );
//   const crop_season_cd = crop_season_cd_all.rows;

//   const time_apply_cd_all = await connection.execute(
//     `SELECT DISTINCT RECOM_APPLY_TIME_CD,RECOM_APPLY_TIME FROM GSMAGRI.SW_RECOM_APPLY_TIME_DIR`
//   );
//   const time_apply_cd = time_apply_cd_all.rows.slice(0, 5);

//   console.log(combination_cd, product_cd, time_apply_cd, crop_season_cd);
// });

const codeToName = async () => {
  // const connection = await dbConnection;
  // const villageCd = parseInt(farmerValues.village);
  // const clusterCd = parseInt(farmerValues.cluster);
  // const soilTypeCd = parseInt(farmerValues.soilType);
  // const irrigationCd = parseInt(farmerValues.irrigationSource);

  // const villagename = await connection.execute(
  //   `SELECT DISTINCT VILLAGE_NAME FROM GSMAGRI.FARMER_PLOTS WHERE VILLAGE_CD=:villagecd`,
  //   [villageCd]
  // );
  // const clustername = await connection.execute(
  //   `SELECT DISTINCT CLUSTER_NAME FROM GSMAGRI.FARMER_PLOTS WHERE CLUSTER_CD=:clustercd`,
  //   [clusterCd]
  // );
  // const soilname = await connection.execute(
  //   `SELECT DISTINCT SOIL_TYPE_NAME FROM GSMAGRI.SOIL_TYPE_DIR WHERE SOIL_TYPE_CD=:soilcd`,
  //   [soilTypeCd]
  // );
  // const irrgationname = await connection.execute(
  //   `SELECT DISTINCT IRRIGATION_NAME FROM GSMAGRI.IRRIGATION_DIR WHERE IRRIGATION_CD=:irrgationcd`,
  //   [irrigationCd]
  // );
  // return {
  //   villageName: villagename.rows,
  //   clusterName: clustername.rows,
  //   soilName: soilname.rows,
  //   irrigationName: irrgationname.rows,
  // };
  const ctn = await fetch("http://localhost:7000/codeToName", {
    method: "POST",
    body: JSON.stringify({
      farmerValues: farmerValues,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (ctn.ok) {
    const ctn_data = await ctn.json();
    return ctn_data;
  } else {
    console.log("Error in fetching code to name");
  }
};
app.post("/transactions", async (req, res) => {
  const { startDate, endDate } = req.body;
  let stDate = formatDateAlt(startDate);
  let edDate = formatDateAlt(endDate);
  console.log(edDate, stDate);
  let parsedEndDate = new Date(edDate.replace(/-/g, " "));

  // Increment the day by 1
  parsedEndDate.setDate(parsedEndDate.getDate() + 1);

  // Format the incremented date back to the required format
  let incrementedDay = parsedEndDate.getDate();
  let incrementedMonth = parsedEndDate
    .toLocaleString("default", {
      month: "short",
    })
    .toUpperCase();
  let incrementedYear = parsedEndDate.getFullYear();
  let incrementedEndDate = `${incrementedDay}-${incrementedMonth}-${incrementedYear}`;

  console.log(incrementedEndDate, stDate);
  try {
    // const connection = await dbConnection;
    // const transaction_all = await connection.execute(
    //   `SELECT * FROM GSMAGRI.SW_TRAN_HEAD WHERE TRAN_DATE >= :stDate AND TRAN_DATE <=:edDate`,
    //   [stDate, incrementedEndDate]
    // );
    // const transactions = transaction_all.rows;
    // res.json(transactions);
    const transactions = await fetch("http://localhost:7000/transactions", {
      method: "POST",
      body: JSON.stringify({ startDate: stDate, endDate: incrementedEndDate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (transactions.ok) {
      const transactions_data = await transactions.json();
      return res.send(transactions_data);
    } else {
      console.log("Error in fetching transactions");
      return res.status(500);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/delete", async (req, res) => {
  const { tranNo } = req.body;
  console.log(tranNo);
  try {
    let delete_tran = await fetch("http://localhost:7000/delete_func", {
      method: "POST",
      body: JSON.stringify({ tranNo: tranNo }),
      headers: { "Content-Type": "application/json" },
    });
    if (delete_tran.ok) {
      console.log("DELETED");
      res.status(200).json({ message: "Success" });
    } else {
      console.log(404);
      res.status(404).json({ error: "No such lab number found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/savePDF", (req, res) => {
  const { fileName } = req.body;
  console.log(fileName);
  try {
    const s3 = new AWS.S3();
    const listObjectsParams = {
      Bucket: "pddf-bucket",
      Prefix: "uploads/",
    };
    const buffer = Buffer.from(pdfbuffer);
    const uploadParams = {
      Bucket: "pddf-bucket",
      Key: `uploads/${fileName}.pdf`, // Specify the folder path and filename
      Body: buffer,
    };
    // s3.listObjects(listObjectsParams, function (err, data) {
    //   if (err) {
    //     console.error("Error listing objects: ", err);
    //   } else {
    //     console.log("Objects in the bucket: ", data.Contents);
    //   }
    // });
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully. Location:", data.Location);
      }
    });
  } catch (err) {
    console.log(err);
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
  const { username, password } = req.body;
  try {
    const response = await fetch("http://localhost:7000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Error from authentication service" });
    }
    const data = await response.json();
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/signUp", async (req, res) => {
  const { fullName, username, password } = req.body;
  const signUp = fetch("http://localhost:7000/signUp", {
    method: "POST",
    body: JSON.stringify({
      fullName: fullName,
      username: username,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (signUp.status === 201) {
    res.status(201);
  } else {
    console.error("Error creating user:", error);
    res.status(501);
  }
});

app.listen(5000, () => {
  console.log("server");
});
