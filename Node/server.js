const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { calculations } = require("./calculations.js");
const { reportGen } = require("./excel_gen.js");
const AWS = require("aws-sdk");

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

function extractUniqueValues(data, field) {
  let uniqueValues = new Set();
  data.forEach((obj) => {
    uniqueValues.add(obj[field]);
  });
  return Array.from(uniqueValues);
}
function convertDateFormat(dateStr) {
  const parts = dateStr.split("-");
  const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  console.log(formattedDate);
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
    const farmers = farmer_rows;
    const labtran = labtranno;
    const survey_no_t = new Set(farmers.map((item) => item.SY_NO));
    const survey_no = Array.from(survey_no_t);
    if (farmers.length > 0) {
      fieldsToExtract.forEach((field) => {
        dropdowns[field] = extractUniqueValues(farmers, field);
      });
    } else {
      return res.status(404).json({ message: "Farmer not found" });
    }
    const soil_types = soil_all;
    const irrigation_types = irrigation_all;
    const crop_list = crop_all;
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
  try {
    fetch("http://localhost:7000/tempNo", {
      method: "POST",
      body: JSON.stringify({ test_cd: test_cd }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
      });
  } catch (e) {
    console.error("Error searching for temp_no:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/clusterInfo", async (req, res) => {
  const { farmerId } = req.body;
  try {
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
  } catch (e) {
    console.error("Error searching for clusterInfo:", e);
    res.status(500).json({ message: "Internal server error" });
  }
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
    const { farmerId, clusterCd, villageCd, plotNo } = req.body;
    console.log(farmerId, clusterCd, villageCd, plotNo);
    fetch("http://localhost:7000/surveyNo", {
      method: "POST",
      body: JSON.stringify({
        farmerId: farmerId,
        clusterCd: clusterCd,
        villageCd: villageCd,
        plotNo: plotNo,
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
    let parameter_head = [];

    const res1 = await fetch("http://localhost:7000/parameter_head", {
      method: "POST",
      body: JSON.stringify({ test: testCd }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res1.headers.get("content-type")?.includes("application/json")) {
      const data = await res1.json();
      parameter_head = data;
    } else {
      const text = await res1.text();
    }
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

    const res_mid = await fetch("http://localhost:7000/para_range_mid", {
      method: "POST",
      body: JSON.stringify({ parameterIds: parameterIds }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        parameters_range_mid = data;
      });

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
    parameter_names = response_array;
    res.json(response_array);
  } catch (error) {
    console.error("Parameters not found");
  }
});

app.post("/suggestions", async (req, res) => {
  try {
    const { test } = req.body;
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
  } catch (error) {
    console.error("Suggestions not found");
  }
});
app.post("/newSuggestion", async (req, res) => {
  try {
    const { newSuggestion, test } = req.body;
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
    console.log(paramValues);
    for (const key in paramValues) {
      parameterValues[key] = parseFloat(paramValues[key], 10);
    }
    // console.log(parameterValues);
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
    remarks = finalRemarks;
    const tranNo = farmerValues.labNo;
    labTran = tranNo;
    const farmerId = farmerValues.farmerId;

    const { yield_target } = await get_yields();

    const yt_A = yield_target[0].TARGET_YIELD;
    const yt_P = yield_target[1].TARGET_YIELD;
    const yt_S = yield_target[2].TARGET_YIELD;
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
        console.log(user.season);
        const tran_head = await fetch(
          "http://localhost:7000/insert_tran_head",
          {
            method: "POST",
            body: JSON.stringify({
              values: values,
              local: local,
              season_cd: user.season,
              login_cd: user.login_cd,
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
          return 1;
        }

        console.log("Suggestion Tail Updated");
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
  try {
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
    // console.log(get_recomm_all);
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
    let gypsum = Number((parameterValues[27] * 0.85).toFixed(2));
    let sulphur = Number((parameterValues[27] * 0.16).toFixed(2));
    // console.log(JSON.stringify(final_calc, null, 2));
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
      final_calc,
      gypsum,
      sulphur
    );
    if (pdfbuffer) {
      res.send(pdfbuffer);
    } else {
      console.log("buffer not generated");
    }
  } catch (err) {
    console.error(err);
  }
});
app.post("/checkLabTran", async (req, res) => {
  try {
    const { labNo } = req.body;
    const checkLabTran = await fetch("http://localhost:7000/checkLabTran", {
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
  } catch (e) {
    console.log(e);
  }
});

app.get("/season", async (req, res) => {
  try {
    const season = await fetch("http://localhost:7000/season", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const season_data = await season.json();
    res.json(season_data);
  } catch (e) {
    console.log(e);
  }
});

const get_yields = async () => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};
const combination_cds = async () => {
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

const codeToName = async () => {
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
  parsedEndDate.setDate(parsedEndDate.getDate() + 1);
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
      Key: `uploads/${fileName}.pdf`,
      Body: buffer,
    };
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
    return next();
  }
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
  const { username, password } = req.body;
  const signUp = await fetch("http://localhost:7000/signUp", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (signUp.status === 201) {
    res.status(201).json({ message: "Signup Complete" });
  } else {
    res.status(501).json({ message: "Error in Signup" });
  }
});

app.listen(5000, () => {
  console.log("server");
});
