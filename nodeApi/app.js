const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/index");
const {port} = config.get("app");
const app = express();
const http = require("http");
const server = http.createServer(app);
const userRoute = require("./routes/v1/user");


// Access-control origin
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
// parse application/json
app.use(bodyParser.json());

// combine routes
app.use('/api/v1/user',userRoute);


//datadase connection
db.mongoConnection();

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})