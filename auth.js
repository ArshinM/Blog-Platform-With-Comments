const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (err) => {
      if (err) res.send(err);
      else res.send("User Registered");
    }
  );
});


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) res.send(err);
      else if (result.length > 0)
        res.json({ message: "Login Success", user: result[0] });
      else res.send("Invalid Credentials");
    }
  );
});

module.exports = router;