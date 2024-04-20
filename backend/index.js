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

db_connect();

app.use("/authpage", auth_routes);
app.use("/mainpage", main_routes);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
