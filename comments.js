const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/add", (req, res) => {
  const { comment, post_id, user_id } = req.body;

  db.query(
    "INSERT INTO comments (comment, post_id, user_id) VALUES (?,?,?)",
    [comment, post_id, user_id],
    (err) => {
      if (err) res.send(err);
      else res.send("Comment Added");
    }
  );
});

router.get("/:post_id", (req, res) => {
  db.query(
    "SELECT * FROM comments WHERE post_id=?",
    [req.params.post_id],
    (err, result) => {
      if (err) res.send(err);
      else res.json(result);
    }
  );
});

module.exports = router;