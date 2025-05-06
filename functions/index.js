const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors({origin: true}));

// Load mock data
const data = JSON.parse(fs.readFileSync(__dirname + "/db.json", "utf8"));

// GET /blog
app.get("/blog", (req, res) => {
  res.json(data.blog);
});

// GET /comments?postId=1
app.get("/comments", (req, res) => {
  const postId = parseInt(req.query.postId);
  if (postId) {
    const filtered = data.comments.filter((c) => c.postId === postId);
    res.json(filtered);
  } else {
    res.json(data.comments);
  }
});

exports.api = functions.https.onRequest(app);
