import express from "express";

export const app = express();
app.use(express.json());

//* Routes
app.get("/", (req, res) => {
  res.json("Server create running");
});
