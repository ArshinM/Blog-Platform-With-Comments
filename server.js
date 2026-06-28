const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arshin@2007",
  database: "blogdb"
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) return res.json({ success: false });

      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false });
      }
    }
  );
});


app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY id DESC", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});


app.post("/posts", (req, res) => {
  const { title, content, user_id } = req.body;

  db.query(
    "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, user_id],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});


app.delete("/posts/:id", (req, res) => {
  db.query(
    "DELETE FROM posts WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.json({ success: false });
      res.json({ success: true });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});