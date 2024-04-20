const express = require("express");
const app = express();
const port = 5000;
const db_connect = require("./db_connect");
const cors = require("cors");
const auth_routes = require("./authentication/auth_routes");
const main_routes = require("./main_routes/main_routes");
const { config } = require("dotenv");

app.use(express.json());
config();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

db_connect();

app.use("/authpage", auth_routes);
app.use("/mainpage", main_routes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
