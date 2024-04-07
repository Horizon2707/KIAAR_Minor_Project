const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
app.use(bodyParser.json());
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
const dbConnection = require("./dbconnect.js");
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    return next();
  }
  // User is not authenticated, redirect or send an error response
  res.status(401).send("Unauthorized");
}
app.get("/authenticate", isAuthenticated, (req, res) => {
  res.status(200).send("Authorized");
});
app.get("/session", isAuthenticated, (req, res) => {
  res.json({ user: req.session.user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // db connection
    const connection = await dbConnection;
    const user_all = await connection.execute(
      `SELECT USER_ID,EMAIL,PASSWORD FROM GSMAGRI.SW_USER_DATA WHERE EMAIL = :email`,
      [email]
    );
    const user = user_all.rows;
    if (user) {
      const isPasswordValid = bcrypt.compare(password, user.PASSWORD);
      if (isPasswordValid) {
        req.session.user = req.body;
        console.log(req.session.user.email);
        return res.status(200).json({ error: "Login Succesfull" });
      } else {
        console.log("Here");
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(401).send("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});
