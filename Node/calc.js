const oracledb = require("oracledb");
const dbConnection = require("./dbconnect.js");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const combination_list_fetch = async () => {
  const connection = await dbConnection;
  const comb_list_all = await connection.execute(
    `SELECT COMBINATION_CD,COMBINATION_NAME,PRODUCT_CD,SW_PRODUCT_NAME,RECOM_APPLY_TIME_CD,CROP_SEASON_CD,CROP_SEASON,RECOM_APPLY_TIME FROM GSMAGRI.SW_COMBINATION_LIST WHERE COMBINATION_CD = :code`,
    [103]
  );
  const comb_list = comb_list_all.rows.slice(0, 3);
  console.log(comb_list);
  const transformedObject = {};
  comb_list.forEach((item) => {
    const { COMBINATION_CD, CROP_SEASON_CD, PRODUCT_CD, RECOM_APPLY_TIME_CD } =
      item;

    if (!transformedObject[COMBINATION_CD]) {
      transformedObject[COMBINATION_CD] = {};
    }

    if (!transformedObject[COMBINATION_CD][CROP_SEASON_CD]) {
      transformedObject[COMBINATION_CD][CROP_SEASON_CD] = {};
    }

    if (!transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD]) {
      transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD] = {};
    }
    if (
      !transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD][
        RECOM_APPLY_TIME_CD
      ]
    ) {
      transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD][
        RECOM_APPLY_TIME_CD
      ] = 0;
    }
  });
  console.log(JSON.stringify(transformedObject, null, 2));

  // Sort the codes in ascending order
};
combination_list_fetch();
