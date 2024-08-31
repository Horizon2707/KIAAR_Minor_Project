const excel = require("excel4node");
const wb = new excel.Workbook();
const ws = wb.addWorksheet("Report");
// const { final_calc } = require("./calc.js");
const libre = require("libreoffice-convert");
const xlsx = require("xlsx");
const handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
libre.convertAsync = require("util").promisify(libre.convert);
// 😊

async function reportGen(
  values,
  parameter_names,
  farmerInformation,
  local,
  cdtonames,
  remarks,
  yield_targets,
  combination_cd,
  product_cd,
  time_apply_cd,
  crop_season_cd,
  final_calc
) {
  // console.log(JSON.stringify(final_calc, null, 2));
  time_apply_cd.push({ RECOM_APPLY_TIME_CD: 0, RECOM_APPLY_TIME: "Total" });
  time_apply_cd.sort((a, b) => a.RECOM_APPLY_TIME_CD - b.RECOM_APPLY_TIME_CD);
  function getCombinationName(code) {
    const found = combination_cd.find(
      (item) => item[`COMBINATION_CD`] === parseInt(code)
    );
    return found ? found["COMBINATION_NAME"] : "NOT FOUND";
  }
  function getProductName(code) {
    const found = product_cd.find((item) => item[`PRODUCT_CD`] === code);
    if (found) {
      return found["SW_PRODUCT_NAME"].replace("COMPLEX ", "");
    } else {
      return "NOT FOUND";
    }
  }

  function getSeasonName(code) {
    const found = crop_season_cd.find(
      (item) => item[`CROP_SEASON_CD`] === code
    );
    return found ? found["CROP_SEASON"] : "NOT FOUND";
  }
  function getTimeApply(code) {
    const found = time_apply_cd.find(
      (item) => item[`RECOM_APPLY_TIME_CD`] === code
    );
    return found ? found["RECOM_APPLY_TIME"] : "NOT FOUND";
  }
  // console.log(getCombinationName(12));
  // console.log(getProductName(22));
  // console.log(getSeasonName(1));
  // console.log(getTimeApply(1));
  // console.log(JSON.stringify(final_calc, null, 2));

  // Direct PDF generation
  const nutrients = final_calc[12];
  delete final_calc[12];
  let srNo = 1;
  const comb_cd = Object.keys(final_calc);
  const parameterData = parameter_names.map((e) => {
    if (e.PARAMETER_TYPE === "HEADING") {
      return {
        PARAMETER_NAME: e.PARAMETER_NAME,
        PARAMETER_TYPE: "HEADING",
      };
    } else {
      const paramId = e.PARAMETER_ID.toString();
      const paramValue =
        values.paramValues[paramId] !== undefined
          ? values.paramValues[paramId]
          : "N/A";
      const data = {
        sr_no: srNo,
        PARAMETER_NAME: e.PARAMETER_NAME.substring(2),
        PARAMETER_MIN: e.PARAMETER_MIN,
        PARAMETER_MID: e.PARAMETER_MID,
        PARAMETER_MAX: e.PARAMETER_MAX,
        PARAMETER_VALUE: paramValue,
      };
      srNo++; // Assign Sr No. and increment
      return data;
    }
  });
  // console.log(final_calc);

  let npk = [27, 28, 29];
  let npkdata = [];
  console.log(nutrients);
  npk.forEach((code) => {
    let valuesForCode = {};
    Object.keys(nutrients).forEach((level) => {
      valuesForCode[level] = nutrients[level][code]["1"];
    });
    npkdata.push({
      npkName: getProductName(code),
      npkvalues: valuesForCode,
    });
  });

  // const generateTableHeader = (comb_cd) => {
  //   let entire_name = `<div class='grid-item'><div class='item'>${getCombinationName(
  //     comb_cd
  //   )}</div></div><div class='grid-item'><div class='item'>Time Of Application</div>`;
  //   const season_cd = Object.keys(final_calc[comb_cd]);
  //   season_cd.forEach((season) => {
  //     const prod_cd = Object.keys(final_calc[comb_cd][season]);
  //     prod_cd.forEach((product) => {
  //       entire_name += `<div class='item'>${getProductName(
  //         parseInt(product)
  //       )}</div>`;
  //     });
  //   });
  //   entire_name += `</div>`;
  //   return new handlebars.SafeString(entire_name);
  // };

  // const generateTableBody = (comb_cd) => {
  //   let bodyStart = ``;
  //   let time_apply_cd = [];
  //   const season_cd = Object.keys(final_calc[comb_cd]);
  //   season_cd.forEach((season) => {
  //     const prod_cd = Object.keys(final_calc[comb_cd][season]);
  //     prod_cd.forEach((product) => {
  //       time_apply_cd = Object.keys(final_calc[comb_cd][season][product]);
  //     });
  //   });
  //   time_apply_cd.forEach((ta) => {
  //     bodyStart += `<div class='grid-item'><div class='item'>${getTimeApply(
  //       parseInt(ta)
  //     )}</div>`;
  //     season_cd.forEach((season) => {
  //       const prod_cd = Object.keys(final_calc[comb_cd][season]);
  //       prod_cd.forEach((product) => {
  //         bodyStart += `<div class='item'>${final_calc[comb_cd][season][product][ta]}</div>`;
  //       });
  //     });
  //     bodyStart += `</div>`;
  //   });
  //   return new handlebars.SafeString(bodyStart);
  // };
  const generateTableHeader = (comb_cd) => {
    let entire_name = `<tr><th>${getCombinationName(
      comb_cd
    )}</th></tr><tr><th>Time Of Application</th>`;
    const season_cd = Object.keys(final_calc[comb_cd]);
    season_cd.forEach((season) => {
      const prod_cd = Object.keys(final_calc[comb_cd][season]);
      prod_cd.forEach((product) => {
        entire_name += `<th>${getProductName(parseInt(product))}</th>`;
      });
    });
    entire_name += `</tr>`;
    return new handlebars.SafeString(entire_name);
  };

  const generateTableBody = (comb_cd) => {
    let bodyStart = ``;
    let time_apply_cd = [];
    const season_cd = Object.keys(final_calc[comb_cd]);
    season_cd.forEach((season) => {
      const prod_cd = Object.keys(final_calc[comb_cd][season]);
      prod_cd.forEach((product) => {
        time_apply_cd = Object.keys(final_calc[comb_cd][season][product]);
      });
    });
    time_apply_cd.forEach((ta) => {
      bodyStart += `<tr><td>${getTimeApply(parseInt(ta))}</td>`;
      season_cd.forEach((season) => {
        const prod_cd = Object.keys(final_calc[comb_cd][season]);
        prod_cd.forEach((product) => {
          bodyStart += `<td>${final_calc[comb_cd][season][product][ta]}</td>`;
        });
      });
      bodyStart += `</tr>`;
    });
    return new handlebars.SafeString(bodyStart);
  };

  let sr = 1;
  const micronutrients = (key) => {
    const arr = [6, 8, 9, 10, 47];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === parseInt(key)) {
        return true;
      }
    }
    return false;
  };
  // console.log(nutrients);
  const micro_data_func = () => {
    let data = [];
    Object.keys(nutrients[1]).forEach((key) => {
      if (micronutrients(key)) {
        const value = nutrients[1][key][1];
        const micro_name = getProductName(parseInt(key));
        const obj = {
          micro_value: value,
          micro_name: micro_name,
          srNo: sr,
        };
        data.push(obj);
        sr++;
      }
    });
    return data;
  };

  const micro_data = micro_data_func();
  // console.log(micro_data);
  const data = {
    parameterData: parameterData,
    remarksPara: remarks,
    npkdata: npkdata,
    yield_targets: yield_targets,
    comb_iter: comb_cd,
    micro_data: micro_data,
    values: values,
    farmerInformation: farmerInformation,
    local: local,
    cdtonames: cdtonames,
  };
  handlebars.registerHelper("parseInt", function (value) {
    // Use parseInt function to parse the value
    return parseInt(value);
  });
  handlebars.registerHelper("generateTableBody", generateTableBody);
  handlebars.registerHelper("generateTableHeader", generateTableHeader);
  handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });

  const templateHtml = fs.readFileSync("template.html", "utf8");
  const template = handlebars.compile(templateHtml);
  const html = template(data);

  const generatePDF = async (html) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html);
      const pdfBuffer = await page.pdf({ format: "A3" });
      fs.writeFileSync("output.pdf", pdfBuffer);
      console.log("PDF generated successfully!");
      await browser.close();
      return pdfBuffer;
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  final_calc[12] = nutrients;
  // const buffer = await wb.writeToBuffer(html);
  const pdfbuffer = await generatePDF(html);
  wb.write("output.xlsx", (err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Excel file created successfully!");

      return true;
    }
  });
  return pdfbuffer;
}

module.exports = { reportGen };
