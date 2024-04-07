const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
// oracledb.initOracleClient();
async function connectToDatabase() {
  try {
    // const connection = await oracledb.getConnection({
    //   user: "geoapp",
    //   password: "geoapp111",
    //   connectString: "192.168.5.20/gsmkk",
    // });
    // const result = await connection.execute(
    //   `SELECT UNIQUE CLIENT_DRIVER FROM V$SESSION_CONNECT_INFO WHERE
    //    SID = SYS_CONTEXT('USERENV', 'SID')`
    // );
    const connection = await oracledb.getConnection({
      user: "GSMAGRI",
      password: "gsmagri",
      connectString: "localhost/kiaarpdb",
    });
    // console.log(result);
    console.log("Connected to Oracle Database");
    return connection;
  } catch (error) {
    console.error("Error connecting to Oracle Database:", error);
    throw error;
  }
}
connectToDatabase();
module.exports = connectToDatabase();
