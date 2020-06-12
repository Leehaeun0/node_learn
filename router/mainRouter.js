const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let data = {
    title: "이하은 만세",
    html: "<h2>EJS에서 왔습니다.</h2>",
  };
  res.render("main", { data });
});

router.post("/", async (req, res) => {
  res.send("포스트 메인");
});

module.exports = router;
