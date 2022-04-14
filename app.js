const express = require("express");
const app = express();
const port = process.env.PORT || 9046;
const mongoose = require("mongoose");
const router = require("./routes/auth.js");

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
///////KvgDnLWgz9wc5VM2
mongoose
  .connect(
    "mongodb+srv://Finalproject1:KvgDnLWgz9wc5VM2@cluster0.d4i0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((data) => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is Running at Port " + port);
});
