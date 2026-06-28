const express = require("express");
const router = express.Router();
const db = require("../db");


router.post("/create", (req, res) => {
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    return res.send("Missing fields");
  }

  db.query(
    "INSERT INTO posts (title, content, user_id) VALUES (?,?,?)",
    [title, content, user_id],
    (err, result) => {
      if (err) {
        console.log("Create Post Error:", err);
        res.send("DB Error");
      } else {
        res.send("Post Created");
      }
    }
  );
});


router.get("/", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log("Fetch Posts Error:", err);
      res.send("DB Error");
    } else {
      res.json(result);
    }
  });
});




router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM posts WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("DB Error");
      } else {
        res.json(result);
      }
    }
  );
});


// =========================
// DELETE POST
// =========================
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM posts WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("Delete Error:", err);
        res.send("DB Error");
      } else {
        res.send("Post Deleted");
      }
    }
  );
});

module.exports = router;