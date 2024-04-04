const express = require("express");
const mysql = require("mysql");

const database = require("./config/db");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/getuniversity", async (req, res) => {
  axios
    .get(`http://universities.hipolabs.com/search?country=INDIA`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: "Failed to fetch universities" });
    });
});

app.post("/favouriteuniversity", async (req, res) => {
  const { name, state_province, web_pages } = req.body;
  try {
    const query = `INSERT INTO favourites (name, state_province, web_pages) VALUES(?,?,?)`;
    database.query(query, [name, state_province, web_pages], (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ resp });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
});
app.listen(8080, () => {
  console.log(`Server Running At 8080`);
});
