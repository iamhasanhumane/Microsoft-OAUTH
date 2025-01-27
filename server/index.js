const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use("/api/v1/auth", require("./routes/authRoute"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to Microsoft Authentication</h1>");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
