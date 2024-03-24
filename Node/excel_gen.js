const excel = require("excel4node");
const wb = new excel.Workbook();
const ws = wb.addWorksheet("Report");

//😞
// Add data to cell A1
const parametersNames_fetch = async () => {
  return fetch("http://localhost:5000/parameters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ test: 1 }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw error; // Rethrow the error to handle it outside this function if needed
    });
};
const all_values_fetch = () => {};

const headingText = "K.J. Somaiya Institute of Applied Agricultural Research";
const document_width = 121.8;
const th = {
  font: { bold: true, size: 16 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};
const heading = {
  font: { bold: true, size: 22 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};

const padding = {
  alignment: {
    wrapText: true,
    horizontal: "center",
    vertical: "center",
  },
};

const h2 = {
  font: { bold: true, size: 14 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
  border: {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  },
};
const h2_r2 = {
  font: { bold: true, size: 14 },
  alignment: {
    horizontal: "center",
    vertical: "center",
  },
};

const h1 = {
  font: { bold: true, size: 16 },
  alignment: {
    vertical: "center",
  },
};

const bottom_border = { border: { bottom: { style: "thick" } } };
const border_all = { border: { bottom: { style: "thin" } } };
const text = {
  font: { size: 14 },
  border: {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  },
  alignment: {
    vertical: "center",
    horizontal: "center",
  },
};
//Page Width
ws.column(1).setWidth(7.4);
ws.column(2).setWidth(13.1);
ws.column(3).setWidth(13.1);

//Heading
ws.row(1).setHeight(36);
ws.cell(1, 1, 1, 10, true).string(headingText).style(heading);

//Taluka District
ws.row(2).setHeight(24);
ws.cell(2, 1, 2, 3, true)
  .string("Taluk: Rabakavi-Banahatti")
  .style(h2_r2)
  .style(bottom_border);
ws.cell(2, 4, 2, 7, true)
  .string("Sameerwadi-587 316")
  .style(h2_r2)
  .style(bottom_border);
ws.cell(2, 8, 2, 10, true)
  .string("Dt: Bagalkot")
  .style(h2_r2)
  .style(bottom_border);

//Row 3
ws.row(3).setHeight(14);

//Name Farmer ID
for (let row = 4; row <= 90; row++) {
  if (row === 10) {
    continue;
  } else {
    ws.row(row).setHeight(24);
  }
}
ws.cell(4, 1, 4, 2, true).string("Farmer Name").style(h2);
ws.cell(4, 3, 4, 5, true).string("Name of the farmer").style(text);
ws.cell(4, 6, 4, 8, true).string("Cultivator Code").style(h2);
ws.cell(4, 9, 4, 10, true).number(153227).style(text);

//Cluster/village
ws.cell(5, 1, 5, 2, true).string("Cluster/Village").style(h2);
ws.cell(5, 3, 5, 10, true).string("Cluster Name").style(text);

//Sy Plot  Area
ws.cell(6, 1, 6, 2, true).string("Survey No.").style(h2);
ws.cell(6, 3).string("B 93").style(text);
ws.cell(6, 4, 6, 5, true).string("Plot no.").style(h2);
ws.cell(6, 6).number(4).style(text);
ws.cell(6, 7, 6, 8, true).string("Area").style(h2);
ws.cell(6, 9, 6, 10, true).number(10).style(text);

//Soil and Next crop
ws.cell(7, 1, 7, 3, true).string("Soil Type").style(h2);
ws.cell(7, 4, 7, 5, true).string("XXXX").style(text);
ws.cell(7, 6, 7, 8, true).string("Next Crop").style(h2);
ws.cell(7, 9, 7, 10, true).string("XXXX").style(text);

// Iirgation and dt of sam
ws.cell(8, 1, 8, 3, true).string("Irrigation Source").style(h2);
ws.cell(8, 4, 8, 5, true).string("XXX").style(text);
ws.cell(8, 6, 8, 8, true).string("Date Of Sampling").style(h2);
ws.cell(8, 9, 8, 10, true).string("XXX").style(text);

//labNo and date of report
ws.cell(9, 1, 9, 3, true).string("Lab No.").style(h2);
ws.cell(9, 4, 9, 5, true).number(9999).style(text);
ws.cell(9, 6, 9, 8, true).string("Date Of Report").style(h2);
ws.cell(9, 9, 9, 10, true).string("XXX").style(text);

// Soil Test Results
ws.row(10).setHeight(30);
ws.cell(10, 1, 10, 10, true)
  .string("Soil Test Result")
  .style(th)
  .style(border_all);

//row 11
// SL No.1
ws.cell(11, 1).string("Sr No.").style(h2);
// Parameter 3
ws.cell(11, 2, 11, 4, true).string("Parameter Name").style(h2);
// test Result 2
ws.cell(11, 5, 11, 6, true).string("Test Value").style(h2);
//low 1
ws.cell(11, 7).string("Low").style(h2);
//med 2
ws.cell(11, 8, 11, 9, true).string("Medium").style(h2);
//high 1
ws.cell(11, 10).string("High").style(h2);

parametersNames_fetch().then((data) => {
  const parameters = data;
  console.log(parameters);
  let i = 12;
  let j = 1;
  mappingParameters(i, j, parameters);
  fetchingAll().then((data) => {
    console.log(data);
  });
  writeBack();
});

function mappingParameters(i, j, parameters) {
  parameters.forEach((e) => {
    if (e.PARAMETER_TYPE === "HEADING") {
      ws.row(i).setHeight(30);
      ws.cell(i, 1, i, 10, true)
        .string(e.PARAMETER_NAME)
        .style(th)
        .style(border_all);
      i++;
    } else {
      ws.cell(i, 1).number(j).style(h2);
      ws.cell(i, 2, i, 4, true).string(e.PARAMETER_NAME).style(h2);
      //test values
      ws.cell(i, 7).string(e.PARAMETER_MIN).style(h2);
      ws.cell(i, 8, i, 9, true).string(e.PARAMETER_MID).style(h2);
      ws.cell(i, 10).string(e.PARAMETER_MAX).style(h2);
      i++;
      j++;
    }
  });
}
async function fetchingAll() {
  return fetch("http://localhost:5000/getValues", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
function writeBack() {
  wb.write("output.xlsx", (err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Excel file created successfully!");
    }
  });
}
function topixel(value) {
  return value / 0.75;
}
