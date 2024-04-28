require("dotenv/config");
const express = require("express");

const PORT = 7000;
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { userRouter, courseRouter } = require("./routers");
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// handling error
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || "Error";
  const dataErr = err.data || "Error";

  console.log(err);

  return res.status(statusCode).send({
    isError: true,
    message: statusMessage,
    data: dataErr,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
