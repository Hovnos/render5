const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

//hashpass
const bcrypt = require("bcrypt");
//token signup
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

app.get("/comments", async (req, res) => {
  try {
    const comments = await pool.query(`select * from comments`);
    res.json(comments.rows);
  } catch (err) {
    console.error(err);
  }
});

app.delete(`/comments/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteComment = await pool.query(
      `delete from comments where id=$1;`,
      [id]
    );
    res.json(deleteComment);
  } catch (err) {
    console.log(err);
  }
});

app.post("/comments", async (req, res) => {
  const { c_nick, c_text } = req.body;

  try {
    const newComment = await pool.query(
      `insert into comments(c_nick, c_text) values ($1, $2)`,
      [c_nick, c_text]
    );
    res.json(newComment);
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  const { c_nick, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hashSync(password, salt);
  try {
    const signup = await pool.query(
      "INSERT INTO users (u_nick, hashed_password) VALUES ($1, $2)",
      [c_nick, hashed_password]
    );
    const token = jwt.sign({ c_nick }, "secret", { expiresIn: "1hr" });

    res.json({ c_nick, token });
  } catch (err) {
    console.error(err);
  }
});
app.post("/login", async (req, res) => {
  const { c_nick, password } = req.body;
  try {
    const users = await pool.query("select * from users where u_nick = $1", [
      c_nick,
    ]);

    if (!users.rows.length) return res.json({ detail: "User not existanto" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ c_nick }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ c_nick /*c_nick: users.rows[0].c_nick*/, token });
    } else {
      res.json({ detail: "login failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`server frci no porte ${PORT}`));
