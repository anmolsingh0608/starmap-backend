const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./src/routes/users");
const bodyParser = require("body-parser");
const CORS = require("cors");
const style = require("./src/routes/styles");
const map = require("./src/routes/maps");

const app = express();
const port = 5000;

app.use(CORS());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))


//connect to db
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


//routes
app.use('/users/', user);
app.use('/api/styles', style);
app.use('/api/map', map);


const root = require("path").join(__dirname, "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(port, () => console.log(`server running on port ${port}`));
