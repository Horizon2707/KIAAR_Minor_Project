const fs = require("fs");
const jsreport = require("jsreport")();
const path = require("path");

jsreport
  .init()
  .then(async () => {
    const templateContent = fs.readFileSync(
      path.join(__dirname, "templates", "report.html"),
      "utf8"
    );
    const report = await jsreport.render({
      template: {
        content: templateContent,
        engine: "jsrender",
        recipe: "html-to-xlsx",
      },
      data: {
        rows: [
          { name: "John", age: 30, gender: "Male" },
          { name: "Alice", age: 25, gender: "Female" },
          { name: "Bob", age: 35, gender: "Male" },
        ],
      },
    });
    fs.writeFileSync(
      path.join(__dirname, "output", "report6.xlsx"),
      report.content
    );
    console.log("PDF Report generated successfully!");
  })
  .catch((err) => {
    console.error("Error generating PDF report:", err);
  });
