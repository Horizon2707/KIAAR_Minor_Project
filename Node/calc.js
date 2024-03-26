const oracledb = require("oracledb");
const dbConnection = require("./dbconnect.js");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const { calculations } = require("./calculations.js");

const combination_list_fetch = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await dbConnection;
      const comb_list_all = await connection.execute(
        `SELECT COMBINATION_CD,COMBINATION_NAME,PRODUCT_CD,SW_PRODUCT_NAME,RECOM_APPLY_TIME_CD,CROP_SEASON_CD,CROP_SEASON,RECOM_APPLY_TIME FROM GSMAGRI.SW_COMBINATION_LIST`
      );
      const comb_list = comb_list_all.rows;

      const transformedObject = {};
      comb_list.forEach((item) => {
        let {
          COMBINATION_CD,
          CROP_SEASON_CD,
          PRODUCT_CD,
          RECOM_APPLY_TIME_CD,
        } = item;

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
          RECOM_APPLY_TIME_CD = ((RECOM_APPLY_TIME_CD - 1) % 5) + 1;

          transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD][
            RECOM_APPLY_TIME_CD
          ] = 0;
        }
        if (COMBINATION_CD !== 12) {
          transformedObject[COMBINATION_CD][CROP_SEASON_CD][PRODUCT_CD][
            "TOT"
          ] = 0;
        }
      });

      resolve(transformedObject);
    } catch (err) {
      reject(err);
    }
  });
};
let final_calc = {};
combination_list_fetch()
  .then((transformedObject) => {
    const comb_values = transformedObject;
    const comb_formulae = calculations(8.33, 203, 117.9, 70, 50, 40);
    // console.log(JSON.stringify(comb_formulae, null, 2));
    // console.log(JSON.stringify(comb_values, null, 2));
    // for (const combId in comb_formulae) {
    //   if (
    //     comb_formulae.hasOwnProperty(combId) &&
    //     comb_values.hasOwnProperty(combId)
    //   ) {
    //     const cropSeasons = comb_formulae[combId];
    //     const combValues = comb_values[combId];

    //     Object.assign(combValues, cropSeasons);
    //   }
    // }

    for (var key1 in comb_formulae) {
      if (comb_formulae.hasOwnProperty(key1)) {
        var comb_arr = comb_formulae[key1];
        final_calc[key1] = {};
        for (var key2 in comb_arr) {
          if (comb_arr.hasOwnProperty(key2)) {
            var season_arr = comb_arr[key2];
            final_calc[key1][key2] = {};
            for (var key3 in season_arr) {
              if (season_arr.hasOwnProperty(key3)) {
                var product_arr = season_arr[key3];
                final_calc[key1][key2][key3] = {};
                for (var key4 in product_arr) {
                  if (product_arr.hasOwnProperty(key4)) {
                    var toa = product_arr[key4];
                    final_calc[key1][key2][key3][key4] = toa;
                  }
                }
              }
            }
          }
        }
      }
    }

    // var final_calc = {};
    // for (var key1 in recomm) {
    //   if (recomm.hasOwnProperty(key1)) {
    //     var innerObj1 = recomm[key1];
    //     final_calc[key1] = {};
    //     for (var key2 in innerObj1) {
    //       if (innerObj1.hasOwnProperty(key2)) {
    //         var innerObj2 = innerObj1[key2];
    //         final_calc[key1][key2] = {};
    //         for (var key3 in innerObj2) {
    //           if (innerObj2.hasOwnProperty(key3)) {
    //             var value = innerObj2[key3];
    //             final_calc[key1][key2][key3] = value;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // Output the updated comb_values
  })
  .catch((err) => {
    console.error(err);
  });

// console.log(comb_values);
// const values = JSON.parse(calculations.calc(8.33, 203, 117.9, 70, 50, 40));
// console.log(values);
module.exports = { final_calc };
