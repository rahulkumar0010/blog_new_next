const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL, { useUnifiedTopology: true })
    .then(() => {
      console.log("Database connected 🥳🥳🥳🥳");
    })
    .catch((err) => {
      console.log("Connection failed ☹️☹️☹️☹️");
    });
}

module.exports= connectDb