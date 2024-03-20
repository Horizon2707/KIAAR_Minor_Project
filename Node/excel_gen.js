const excel = require("excel4node");
const wb = new excel.Workbook();
const ws = wb.addWorksheet("Report");
// Add data to cell A1

const headingText = "K.J. Somaiya Institute of Applied Agricultural Research";
const document_width = 121.8;

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
const border_all = { border: { bottom: { style: "thick" } } };
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
  ws.row(row).setHeight(24);
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
wb.write("output.xlsx", (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Excel file created successfully!");
  }
});

function topixel(value) {
  return value / 0.75;
}
