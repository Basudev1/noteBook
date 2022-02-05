const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`MyNotebook app listening at http://localhost:${port}`);
});
