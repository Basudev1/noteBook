const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;
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
