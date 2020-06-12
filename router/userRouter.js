const express = require("express");
const router = express.Router();
const db = require("../model/db");

/* GET user page. */
router.get("/", function (req, res, next) {
  res.render("user");
});

router.post("/create", async (req, res) => {
  const { user_name, user_phone } = req.body;
  await db.users.create({ user_name, user_phone });
  res.send({ status: 200, message: "success" });
});

router.get("/list", async (req, res) => {
  const user_full = await db.users.findAll();
  const user_detail = await db.users.findOne({ where: { id: 1 } });
  res.json({ status: 200, user_full, user_detail });
});

router.post("/update", async (req, res) => {
  const { update_phone, user_id } = req.body;
  await db.users.update(
    {
      user_phone: update_phone,
    },
    {
      where: {
        id: user_id,
      },
    }
  );
  res.send({ status: 200 });
});

module.exports = router;
