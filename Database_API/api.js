const express = require("express");
const cors = require("cors");
const session = require("express-session");
const oracledb = require("oracledb");
const dbConnection = require("./dbconnect.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(
  session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
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
let Values;
app.post("/farmerInfo", async (req, res) => {
  try {
    const { farmerId } = req.body;
    const connection = await dbConnection;
    const farmer_rows = await connection.execute(
      `SELECT * FROM KIAAR.SW_TRAN_HEAD WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    const personal = await connection.execute(
      `SELECT FARMER_NAME,F_ADDRESS,PHONE_NO FROM KIAAR.V_SW_FARMER_LIST WHERE FARMER_ID =:farmerId`,
      [farmerId]
    );
    const labtranno = await connection.execute(
      `SELECT MAX(LAB_TRAN_NO) + 1 AS LAB_TRAN FROM KIAAR.SW_TRAN_HEAD`
    );
    const soil_all = await connection.execute(
      `SELECT DISTINCT SOIL_TYPE_NAME,SOIL_TYPE_CD FROM KIAAR.SOIL_TYPE_DIR`
    );
    const irrigation_all = await connection.execute(
      `SELECT DISTINCT IRRIGATION_NAME,IRRIGATION_CD FROM KIAAR.IRRIGATION_DIR `
    );
    const crop_all = await connection.execute(
      `SELECT CROP_NAME FROM KIAAR.SW_CROP_DIR`
    );

    const response_obj = {
      farmer_rows: farmer_rows.rows,
      personal: personal.rows,
      labtranno: labtranno.rows,
      soil_all: soil_all.rows,
      irrigation_all: irrigation_all.rows,
      crop_all: crop_all.rows,
    };
    res.json(response_obj);
  } catch (error) {
    res.json(error);
  }
});

app.post("/testName", async (req, res) => {
  try {
    const connection = await dbConnection;
    const test_type_all = await connection.execute(
      `SELECT TEST_CD,TEST_NAME FROM KIAAR.SW_TEST_DIR`
    );
    let test_type = test_type_all.rows;

    res.json(test_type);
  } catch (error) {
    res.json(error);
  }
});

app.post("/tempNo", async (req, res) => {
  try {
    const { test_cd } = req.body;
    if (isNaN(test_cd)) {
      return res.status(200).json({ message: "" });
    }
    const connection = await dbConnection;
    const template_no = await connection.execute(
      `SELECT DISTINCT TEMPLATE_NO FROM KIAAR.SW_MAP_TEMPLATE WHERE TEST_CD = :test_cd`,
      [test_cd]
    );
    if (template_no) {
      res.json(template_no.rows);
    }
  } catch (error) {
    res.status(404).json({ message: "Template number not found" });
  }
});

app.post("/clusterInfo", async (req, res) => {
  try {
    const { farmerId } = req.body;
    const connection = await dbConnection;
    const cluster_cd = await connection.execute(
      `SELECT DISTINCT CLUSTER_CD,CLUSTER_NAME FROM KIAAR.v_sw_farmer_plots WHERE FARMER_ID = :farmerId`,
      [farmerId]
    );
    if (cluster_cd.rows.length > 0) {
      res.json(cluster_cd.rows);
    } else {
      res.status(404);
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/clusterName", async (req, res) => {
  try {
    const { cluster_cd } = req.body;
    const connection = await dbConnection;
    const cluster_codes = cluster_cd.rows.map((item) => item.CLUSTER_CD);
    let cluster_names = [];
    for (const i of cluster_codes) {
      const res = await connection.execute(
        `SELECT DISTINCT CLUSTER_NAME FROM KIAAR.FARMER_PLOTS WHERE CLUSTER_CD IN (:i)`,
        [i]
      );

      cluster_names.push(res.rows[0]);
    }
    res.json(cluster_names);
  } catch (e) {
    console.log(e);
  }
});
app.post("/villageInfo", async (req, res) => {
  try {
    const { clusterCd, farmerId } = req.body;

    const connection = await dbConnection;
    const village_names = await connection.execute(
      `SELECT DISTINCT VILLAGE_CD,VILLAGE_NAME FROM KIAAR.v_sw_farmer_plots WHERE FARMER_ID=:farmerId AND CLUSTER_CD=:clusterCd`,
      [farmerId, clusterCd]
    );
    res.json(village_names.rows);
  } catch (error) {
    console.error("Village not found");
  }
});
app.post("/surveyNo", async (req, res) => {
  try {
    const { farmerId, clusterCd, villageCd } = req.body;

    const connection = await dbConnection;
    const surveyno_all = await connection.execute(
      `SELECT DISTINCT SY_NO FROM KIAAR.v_sw_farmer_plots WHERE FARMER_ID=:farmerId AND CLUSTER_CD=:clusterCd AND VILLAGE_CD=:villageCd`,
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

    const connection = await dbConnection;
    const plot_nos = await connection.execute(
      `SELECT DISTINCT PLOT_NO FROM KIAAR.v_sw_farmer_plots WHERE FARMER_ID=:farmerId AND VILLAGE_CD=:villageCd`,
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
      `SELECT DISTINCT PLOT_AREA FROM KIAAR.v_sw_farmer_plots WHERE FARMER_ID=:farmerId AND VILLAGE_CD=:villageCd AND PLOT_NO = :plotNo`,
      [farmerId, villageCd, plotNo]
    );

    res.json(plot_area);
  } catch (error) {
    console.error("Plot area not found");
  }
});

app.post("/parameter_head", async (req, res) => {
  const { test } = req.body;
  try {
    const connection = await dbConnection;
    const parameter_head_all = await connection.execute(
      `SELECT PARAMETER_ID,PARAMETER_NAME,PARAMETER_TYPE FROM KIAAR.SW_PARAMETER_DIR_HEAD WHERE TEST_CD = :testCd`,
      [test]
    );

    res.json(parameter_head_all.rows);
  } catch (error) {
    console.error("Plot area not found");
  }
});
app.post("/para_range_min", async (req, res) => {
  const connection = await dbConnection;
  const { parameterIds } = req.body;
  parameters_range_min = [];
  for (const i of parameterIds) {
    const range_min = await connection.execute(
      `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM KIAAR.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 1`,
      [i]
    );
    parameters_range_min.push(range_min.rows[0]);
  }
  res.json(parameters_range_min);
});
app.post("/para_range_max", async (req, res) => {
  const connection = await dbConnection;
  const { parameterIds } = req.body;
  parameters_range_max = [];
  for (const i of parameterIds) {
    const range_max = await connection.execute(
      `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM KIAAR.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 2`,
      [i]
    );
    parameters_range_max.push(range_max.rows[0]);
  }
  res.json(parameters_range_max);
});
app.post("/para_range_mid", async (req, res) => {
  const connection = await dbConnection;
  const { parameterIds } = req.body;
  parameters_range_mid = [];
  for (const i of parameterIds) {
    const range_mid = await connection.execute(
      `SELECT DISTINCT VALUE_NAME,PARAMETER_ID FROM KIAAR.SW_PARAMETER_DIR_TAIL WHERE PARAMETER_ID =:i AND REF_RANGE_ID = 3`,
      [i]
    );
    parameters_range_mid.push(range_mid.rows[0]);
  }

  res.json(parameters_range_mid);
});
app.post("/suggestions", async (req, res) => {
  try {
    const { test } = req.body;
    const connection = await dbConnection;
    const suggestion_all = await connection.execute(
      `SELECT SUGGESTION_ID,SUGGESTION_NAME FROM KIAAR.SW_SUGGESTION_DIR WHERE TEST_CD=:test`,
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
    const connection = await dbConnection;
    const new_suggestion = await connection.execute(
      `INSERT INTO KIAAR.SW_SUGGESTION_DIR(
          SUGGESTION_ID,
          SUGGESTION_NAME,
          TYPE_OF_SUGGESTION,
          KF_SUGGESTION_NAME,
          TEST_CD
        )
      VALUES
        (
          (SELECT MAX(SUGGESTION_ID) + 1 FROM KIAAR.SW_SUGGESTION_DIR),
          :newSuggestion,
          'NORMAL',
          'NULL',
          :testCd
        )`,
      [newSuggestion, test]
    );
    await connection.execute("COMMIT");
    if (new_suggestion) {
      res.json({ bool: true });
    }
  } catch (error) {
    console.error("New Suggestion not added", error);
  }
});

app.post("/insert_tran_head", async (req, res) => {
  const { values, local, season_cd } = req.body;
  const connection = await dbConnection;

  try {
    let farmerValues = values;
    Values = values;
    const tran_head = await connection.execute(
      `INSERT INTO KIAAR.SW_TRAN_HEAD (
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
          :season_cd,
          SYSDATE,
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
          :cropToBeGrown,
          NULL,       
          23,
          SYSDATE,
          NULL,       
          NULL,       
          :sampling, 
          :samplingreciept, 
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
        parseInt(season_cd),
        parseInt(farmerValues.labNo),
        parseInt(farmerValues.farmerId),
        farmerValues.surveyNo,
        parseInt(farmerValues.cluster),
        parseInt(farmerValues.village),
        parseInt(farmerValues.plotNo),
        parseInt(farmerValues.irrigationSource),
        parseInt(farmerValues.soilType),
        farmerValues.cultivationType,
        farmerValues.drainage,
        farmerValues.previousCrop,
        farmerValues.cropToBeGrown,
        // parseInt(user.login_cd),
        formatDateAlt(farmerValues.dtOfSampling),
        formatDateAlt(farmerValues.dtOfSamplingReceipt),
        parseInt(farmerValues.test),
        parseInt(local.plotArea),
        parseInt(local.plotArea),
        //parseInt(tempNo),
      ].map((value, index) => {
        if (isNaN(value) && typeof value !== "string") {
          throw new Error(
            `Invalid value "${value}" at index ${index + 1}. Expected a number.`
          );
        }
        return value;
        // excelColor(values)
      })
    );
    console.log("Tran Head Triggered");
    await connection.execute("COMMIT");
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.log(e);
  }
});

app.post("/insert_suggestion_tail", async (req, res) => {
  const { suggestions, farmerValues } = req.body;
  const connection = await dbConnection;
  console.log("Suggestion Tail Triggered");
  try {
    let suggestion_tail;
    const selectedSuggestions = suggestions.filter(
      (suggestion) => suggestion.selected === true
    );
    let suggestions_all = selectedSuggestions;
    suggestions_all.map(async (suggestion) => {
      suggestion_tail = await connection.execute(
        `INSERT INTO KIAAR.SW_SUGGESTION_TAIL(
          lab_tran_no,
          suggestion_id,
          suggestion_name_value,
          type_of_suggestion,
          test_cd
      ) VALUES (
          :v0,
          :v1,
          :v2,
          :v3,
          :v4
      )`,
        [
          farmerValues.labNo,
          suggestion.SUGGESTION_ID,
          suggestion.SUGGESTION_NAME,
          "NORMAL",
          parseInt(farmerValues.test),
        ]
      );
    });

    await connection.execute("COMMIT");
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.log(e);
  }
});
app.post("/insert_tran_tail", async (req, res) => {
  const { paramValues, farmerValues } = req.body;
  const connection = await dbConnection;

  let parameterValues = {};
  for (const key in paramValues) {
    parameterValues[key] = parseInt(paramValues[key], 10);
  }
  try {
    let tran_tail;
    const parameterValuesArray = Object.keys(parameterValues);
    parameterValuesArray.map(async (key) => {
      tran_tail = await connection.execute(
        `INSERT INTO KIAAR.SW_TRAN_TAIL (
          lab_tran_no,
          parameter_id,
          test_method,
          result_value,
          parameter_id_slno,
          print_flag,
          test_cd
      ) VALUES (
          :v0,
          :v1,
          'NONE',
          :v3,
          0,
          :v5,
          :v6
      )`,
        [
          farmerValues.labNo,
          parseInt(key),
          parseInt(parameterValues[key]),
          "Y",
          parseInt(farmerValues.test),
        ]
      );
    });
    console.log("Tran Tail");
    await connection.execute("COMMIT");
    return res.status(200).json({ message: "OK" });
  } catch (e) {
    console.log(e);
  }
});
app.post("group_cd", async (req, res) => {
  const { product } = req.body;
  const connection = await dbConnection;
  try {
    const group_cd_all = connection.execute(
      `SELECT DISTINCT GROUP_CD FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
      [product]
    );
    res.status(group_cd_all);
  } catch (e) {
    console.log(e);
  }
});
app.post("/unit_id", async (req, res) => {
  const { product } = req.body;
  const connection = await dbConnection;
  try {
    const unit_id_all = connection.execute(
      `SELECT DISTINCT UNIT_NAME FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
      [product]
    );
    res.status(unit_id_all);
  } catch (e) {
    console.log(e);
  }
});
app.post("/unit_value", async (req, res) => {
  const { product } = req.body;
  const connection = await dbConnection;
  try {
    const unit_value_all = connection.execute(
      `SELECT DISTINCT UNIT_VALUE FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
      [product]
    );
    res.status(unit_value_all);
  } catch (e) {
    console.log(e);
  }
});
// app.post("/insert_recomm_tran", async (req, res) => {
//   const { final_calc, farmerValues } = req.body;

//   const connection = await dbConnection;
//   try {
//     const promises = [];

//     const comb_cd = Object.keys(final_calc);
//     comb_cd.forEach((comb) => {
//       const season_cd = Object.keys(final_calc[comb]);
//       season_cd.forEach((season) => {
//         const product_cd = Object.keys(final_calc[comb][season]);
//         product_cd.forEach(async (product) => {
//           const ta_cd = Object.keys(final_calc[comb][season][product]);
//           let value;
//           const group_cd_all = await connection.execute(
//             `SELECT DISTINCT GROUP_CD FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
//             [product]
//           );
//           const unit_id_all = await connection.execute(
//             `SELECT DISTINCT UNIT_NAME FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
//             [product]
//           );
//           const unit_value_all = await connection.execute(
//             `SELECT DISTINCT UNIT_VALUE FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
//             [product]
//           );

//           function execute(ta, value) {
//             try {
//               promises.push(
//                 Promise.all([group_cd_all, unit_id_all, unit_value_all]).then(
//                   async ([
//                     group_cd_all_result,
//                     unit_id_all_result,
//                     unit_value_all_result,
//                   ]) => {
//                     const group_cd = group_cd_all_result.rows;
//                     const unit_id = unit_id_all_result.rows;
//                     const unit_value = unit_value_all_result.rows;

//                     let res = await connection.execute(
//                       `INSERT INTO KIAAR.SW_RECOMMENDATION_TRAN (
//                     lab_tran_no,
//                     tran_date,
//                     sw_group_cd,
//                     sw_product_cd,
//                     combine_cd,
//                     product_value,
//                     option_value,
//                     ref_sw_product_cd,
//                     unit_value,
//                     unit_id,
//                     value_in_bags,
//                     convert_unit_name,
//                     test_cd,
//                     crop_season_cd,
//                     recom_apply_time_cd
//                 ) VALUES (
//                     :v0,
//                     SYSDATE,
//                     :v2,
//                     :v3,
//                     :v4,
//                     :v5,
//                     NULL,
//                     :v7,
//                     NULL,
//                     1,
//                     NULL,
//                     NULL,
//                     :v12,
//                     :v13,
//                     :v14
//                 )`,
//                       [
//                         farmerValues.labNo,
//                         parseInt(group_cd[0].GROUP_CD),
//                         parseInt(product),
//                         parseInt(comb),
//                         parseInt(value),
//                         (unit_value[0] && parseInt(unit_value[0].UNIT_VALUE)) ||
//                           1,
//                         parseInt(farmerValues.test),
//                         parseInt(season),
//                         parseInt(ta),
//                       ]
//                     );

//                     console.log(res);
//                     connection.execute("COMMIT");
//                   }
//                 )
//               );
//             } catch (e) {
//               console.log(e);
//             }
//           }

//           if (comb == 12) {
//             value = parseInt(final_calc[comb][season][product][1]);

//             execute(1, value);
//           } else {
//             ta_cd.forEach((ta) => {
//               value = parseInt(final_calc[comb][season][product][ta]);
//               execute(ta, value);
//             });
//           }
//         });
//       });
//     });
//     console.log(promises);
//     Promise.all(promises)
//       .then(async () => {
//         console.log("Recomm Tran");
//         await connection.execute("COMMIT");
//         return res.status(200);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   } catch (e) {
//     console.log(e);
//   }
// });
app.post("/insert_recomm_tran", async (req, res) => {
  const { final_calc, farmerValues } = req.body;

  const connection = await dbConnection;
  try {
    const promises = [];

    const comb_cd = Object.keys(final_calc);
    for (const comb of comb_cd) {
      const season_cd = Object.keys(final_calc[comb]);
      for (const season of season_cd) {
        const product_cd = Object.keys(final_calc[comb][season]);
        for (const product of product_cd) {
          const ta_cd = Object.keys(final_calc[comb][season][product]);

          const group_cd_all = connection.execute(
            `SELECT DISTINCT GROUP_CD FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
            [product]
          );
          const unit_id_all = connection.execute(
            `SELECT DISTINCT UNIT_NAME FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
            [product]
          );
          const unit_value_all = connection.execute(
            `SELECT DISTINCT UNIT_VALUE FROM KIAAR.SW_PRODUCT_DIR WHERE PRODUCT_CD = :productCd`,
            [product]
          );

          const execute = async (ta, value) => {
            try {
              const [
                group_cd_all_result,
                unit_id_all_result,
                unit_value_all_result,
              ] = await Promise.all([
                group_cd_all,
                unit_id_all,
                unit_value_all,
              ]);

              const group_cd = group_cd_all_result.rows;
              const unit_id = unit_id_all_result.rows;
              const unit_value = unit_value_all_result.rows;

              const result = await connection.execute(
                `INSERT INTO KIAAR.SW_RECOMMENDATION_TRAN (
                  lab_tran_no,
                  tran_date,
                  sw_group_cd,
                  sw_product_cd,
                  combine_cd,
                  product_value,
                  option_value,
                  ref_sw_product_cd,
                  unit_value,
                  unit_id,
                  value_in_bags,
                  convert_unit_name,
                  test_cd,
                  crop_season_cd,
                  recom_apply_time_cd
                ) VALUES (
                  :v0,
                  SYSDATE,
                  :v2,
                  :v3,
                  :v4,
                  :v5,
                  NULL,
                  :v7,
                  NULL,
                  1,
                  NULL,
                  NULL,
                  :v12,
                  :v13,
                  :v14
                )`,
                [
                  farmerValues.labNo,
                  parseInt(group_cd[0].GROUP_CD),
                  parseInt(product),
                  parseInt(comb),
                  parseInt(value),
                  (unit_value[0] && parseInt(unit_value[0].UNIT_VALUE)) || 1,
                  parseInt(farmerValues.test),
                  parseInt(season),
                  parseInt(ta),
                ]
              );
              // console.log(result);
            } catch (e) {
              console.error("Insert Error:", e);
              throw e;
            }
          };

          if (comb == 12) {
            const value = parseInt(final_calc[comb][season][product][1]);
            promises.push(execute(1, value));
          } else {
            for (const ta of ta_cd) {
              const value = parseInt(final_calc[comb][season][product][ta]);
              promises.push(execute(ta, value));
            }
          }
        }
      }
    }

    await Promise.all(promises);
    await connection.execute("COMMIT");

    console.log("Recommendation Transactions Inserted");
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (e) {
    console.error("Transaction Error:", e);
    res.status(500).json({ error: "An error occurred during the transaction" });
  }
});

app.post("/deleting", async (req, res) => {
  const { tranNo } = req.body;
  try {
    const connection = await dbConnection;
    const lab_tran_all = await connection.execute(
      `SELECT DISTINCT LAB_TRAN_NO FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO = :labNo`,
      [tranNo]
    );
    if (lab_tran_all.rows.length > 0) {
      await connection.execute(
        `DELETE FROM KIAAR.SW_TRAN_TAIL WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_SUGGESTION_TAIL WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO= :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_TRAN_HEAD WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute("COMMIT");
      console.log("Deleted" + tranNo);
      res.status(200).json({ message: "Lab number found and deleted" });
    } else {
      console.log("No such lab no found");
      res.status(200).json({ error: "No such lab number found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/delete_func", async (req, res) => {
  const { tranNo } = req.body;
  try {
    const connection = await dbConnection;
    const lab_tran_all = await connection.execute(
      `SELECT DISTINCT LAB_TRAN_NO FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO = :labNo`,
      [tranNo]
    );
    if (lab_tran_all.rows.length > 0) {
      await connection.execute(
        `DELETE FROM KIAAR.SW_TRAN_HEAD WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_TRAN_TAIL WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_SUGGESTION_TAIL WHERE LAB_TRAN_NO = :labNo`,
        [tranNo]
      );
      await connection.execute(
        `DELETE FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO= :labNo`,
        [tranNo]
      );
      await connection.execute("COMMIT");
      console.log("Deleted" + tranNo);
      res.status(200).json({ message: "Lab number found and deleted" });
    } else {
      console.log("No such lab no found");
      res.status(404).json({ error: "No such lab number found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/get_recomm_all", async (req, res) => {
  const { labTran } = req.body;

  const connection = await dbConnection;
  const recomm_tran_all = await connection.execute(
    `SELECT COMBINE_CD,CROP_SEASON_CD,SW_PRODUCT_CD,RECOM_APPLY_TIME_CD,PRODUCT_VALUE FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO = :tranNo`,
    [labTran]
  );

  res.json(recomm_tran_all.rows).status(200);
});

app.get("/season", async (req, res) => {
  const connection = await dbConnection;
  const season_all = await connection.execute(
    `SELECT DISTINCT SEASON_CD,SEASON_NAME,FROM_DATE,TO_DATE FROM KIAAR.SEASON_DIR`
  );
  const season = season_all.rows;
  const currentDate = new Date();

  const currentSeason = season.find(
    (season) =>
      currentDate >= new Date(season.FROM_DATE) &&
      currentDate <= new Date(season.TO_DATE)
  );
  let season_obj = {};
  if (currentSeason) {
    const currentIndex = season.findIndex((season) => season === currentSeason);
    const current_season_cd = currentSeason.SEASON_CD;
    // Initialize an array to hold the season names
    const seasonNames = [];
    const prevSeason = season.find(
      (season) => season.SEASON_CD == current_season_cd - 1
    );
    const nextSeason = season.find(
      (season) => season.SEASON_CD == current_season_cd + 1
    );
    // console.log(currentSeason, prevSeason, nextSeason);
    // Push the name of the current season into the array
    season_obj[prevSeason.SEASON_NAME] = prevSeason.SEASON_CD;
    season_obj[currentSeason.SEASON_NAME] = currentSeason.SEASON_CD;
    season_obj[nextSeason.SEASON_NAME] = nextSeason.SEASON_CD;
    // Push the name of the previous season if it exists
    // if (currentIndex > 0) {
    //   seasonNames.push(season[currentIndex - 1].SEASON_NAME);
    // }
    // seasonNames.push(currentSeason.SEASON_NAME);
    // Push the name of the next season if it exists
    // if (currentIndex < season.length - 1) {
    //   seasonNames.push(season[currentIndex + 1].SEASON_NAME);
    // }
    // console.log(season_obj);
    res.json(season_obj);
  } else {
    console.log("Current date does not fall within any season.");
  }
});

app.get("/get_yields", async (req, res) => {
  const connection = await dbConnection;
  const yield_target_all = await connection.execute(
    `SELECT * FROM KIAAR.SW_CROP_YIELDTARGET`
  );
  const yield_target = yield_target_all.rows;
  res.json(yield_target).status(200);
});

app.get("/combination_cds", async (req, res) => {
  const connection = await dbConnection;
  const combination_cd_all = await connection.execute(
    `SELECT DISTINCT COMBINATION_CD,COMBINATION_NAME FROM KIAAR.V_SW_COMBINATION_LIST`
  );
  const combination_cd = combination_cd_all.rows;

  const product_cd_all = await connection.execute(
    `SELECT DISTINCT PRODUCT_CD,SW_PRODUCT_NAME FROM KIAAR.V_SW_COMBINATION_LIST`
  );
  const product_cd = product_cd_all.rows;

  const crop_season_cd_all = await connection.execute(
    `SELECT DISTINCT CROP_SEASON_CD,CROP_SEASON FROM KIAAR.SW_CROP_SEASON_DIR`
  );
  const crop_season_cd = crop_season_cd_all.rows;

  const time_apply_cd_all = await connection.execute(
    `SELECT DISTINCT RECOM_APPLY_TIME_CD,RECOM_APPLY_TIME FROM KIAAR.SW_RECOM_APPLY_TIME_DIR`
  );
  const time_apply_cd = time_apply_cd_all.rows.slice(0, 5);
  res
    .status(200)
    .json({ combination_cd, product_cd, time_apply_cd, crop_season_cd });
});

app.post("/codeToName", async (req, res) => {
  const { farmerValues } = req.body;
  const connection = await dbConnection;
  const villageCd = parseInt(farmerValues.village);
  const clusterCd = parseInt(farmerValues.cluster);
  const soilTypeCd = parseInt(farmerValues.soilType);
  const irrigationCd = parseInt(farmerValues.irrigationSource);

  const villagename = await connection.execute(
    `SELECT DISTINCT VILLAGE_NAME FROM KIAAR.V_SW_FARMER_PLOTS WHERE VILLAGE_CD=:villagecd`,
    [villageCd]
  );
  const clustername = await connection.execute(
    `SELECT DISTINCT CLUSTER_NAME FROM KIAAR.V_SW_FARMER_PLOTS WHERE CLUSTER_CD=:clustercd`,
    [clusterCd]
  );
  const soilname = await connection.execute(
    `SELECT DISTINCT SOIL_TYPE_NAME FROM KIAAR.SOIL_TYPE_DIR WHERE SOIL_TYPE_CD=:soilcd`,
    [soilTypeCd]
  );
  const irrgationname = await connection.execute(
    `SELECT DISTINCT IRRIGATION_NAME FROM KIAAR.IRRIGATION_DIR WHERE IRRIGATION_CD=:irrgationcd`,
    [irrigationCd]
  );
  res.status(200).json({
    villageName: villagename.rows,
    clusterName: clustername.rows,
    soilName: soilname.rows,
    irrigationName: irrgationname.rows,
  });
});
app.post("/checkLabTran", async (req, res) => {
  const { labNo } = req.body;
  const connection = await dbConnection;
  console.log(labNo);
  const lab_tran_all = await connection.execute(
    `SELECT DISTINCT LAB_TRAN_NO FROM KIAAR.SW_RECOMMENDATION_TRAN WHERE LAB_TRAN_NO = :labNo`,
    [labNo]
  );
  // console.log(lab_tran_all.rows);
  if (lab_tran_all.rows.length > 0) {
    console.log(lab_tran_all.rows);
    res.json(lab_tran_all.rows).status(200);
  } else {
    res.status(404).json({ message: "Lab Tran not found" });
  }
});
app.post("/transaction", async (req, res) => {
  const { stDate, incrementedEndDate } = req.body;
  const connection = await dbConnection;
  const transaction_all = await connection.execute(
    `SELECT * FROM KIAAR.SW_TRAN_HEAD WHERE TRAN_DATE >= :stDate AND TRAN_DATE <=:edDate`,
    [stDate, incrementedEndDate]
  );
  const transactions = transaction_all.rows;
  res.json(transactions).status(200);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //
  try {
    const connection = await dbConnection;
    const user_all = await connection.execute(
      `SELECT LOGIN_CD,USER_NAME,PASSORD_ENC FROM KIAAR.U_LOGON_DATA WHERE USER_NAME = :username`,
      [username]
    );
    // console.log(user_all.rows);
    const user = user_all.rows;

    if (user.length !== 0) {
      const isPasswordValid = await bcrypt.compare(
        password,
        user[0].PASSORD_ENC
      );

      if (isPasswordValid) {
        req.session.user = req.body;

        return res.status(200).json({
          email: req.session.user.username,
          login_cd: user[0].LOGIN_CD,
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(500).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.post("/signUp", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await dbConnection;
    const new_user = await connection.execute(
      `INSERT INTO KIAAR.u_logon_data (
        login_cd,
        user_name,
        password,
        valid_from_date,
        valid_upto_date,
        user_type,
        user_group,
        counter,
        user_flag,
        last_logon_on,
        last_password1,
        last_password_on1,
        last_password2,
        last_password_on2,
        last_password3,
        last_password_on3,
        last_password4,
        last_password_on4,
        last_password5,
        last_password_on5,
        date_format,
        decimal_notation,
        canvas_color,
        add_by,
        add_date,
        alert_position,
        member_id,
        position_cd,
        user_tag,
        emp_cd,
        dept,
        passord_enc
    ) VALUES (
      (SELECT MAX(LOGIN_CD) + 1 FROM U_LOGON_DATA),
        :v1,
        :v2,
        :v3,
        '31-MAR-99',
        'P',
        'U',
        NULL,
        0,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'DD-MM-YYYY',
        NULL,
        NULL,
        4,
        SYSDATE,
        NULL,
        NULL,
        10,
        'EMPLOYEE',
        NULL,
        NULL,
        :hashed
    )`,
      [username, password, formatDate(today), hashedPassword]
    );
    await connection.execute("COMMIT");
    if (new_user) {
      res.status(201).json({ message: "U_LOGON Updated" });
    } else {
      res.status(400).json({ message: "U_LOGON not Updated" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    // res.sendStatus(500); // Internal Server Error
  }
});
app.listen(7000, () => {
  console.log("Server is running", 7000);
});
