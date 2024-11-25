const express = require("express");
const router = express.Router();
const News = require("../Schemas/News");
const upload = require("../utils/multer-config");

router.post(
  "/",
  upload.fields([{ name: "cover", maxCount: 1 }]),
  async (req, res) => {
    const { heading, body } = req.body;

    try {
      const cover = req.files["cover"] ? req.files["cover"][0].path : null;

      const newNews = await News.create({
        cover: cover,
        heading: heading,
        body: body,
      });

      return res.status(200).json({
        status: "ok",
        data: "News Created",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
