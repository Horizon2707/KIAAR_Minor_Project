const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function connectToDatabase() {
  try {
    const connection = await oracledb.getConnection({
      user: "geoapp",
      password: "geoapp111",
      connectString: "192.168.5.20/gsmkk",
    });
    console.log("Connected to Oracle Database");
    return connection;
  } catch (error) {
    console.error("Error connecting to Oracle Database:", error);
    throw error;
  }
}
connectToDatabase();
module.exports = connectToDatabase();
