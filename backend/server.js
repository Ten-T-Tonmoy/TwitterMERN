import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hola migo");
});

app.listen(8000, () => {
  console.log("server running bitches");
});
