const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
//Available Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`MyNotebook app listening at http://localhost:${port}`);
});
