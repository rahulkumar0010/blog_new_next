const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

global.appRoot = path.resolve(__dirname);


const app = express();


const port = process.env.PORT;

app.use(express.json({extended: false}));

app.use("/uploads", express.static("uploads"));
app.use(cors());
// Routes


app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
});
