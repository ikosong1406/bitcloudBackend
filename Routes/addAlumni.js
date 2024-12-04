const express = require("express");
const router = express.Router();
const Alumni = require("../Schemas/Alumni");
const upload = require("../utils/multer-config");

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    const { name, position } = req.body;

    try {
      const image = req.files["image"] ? req.files["image"][0].path : null;

      const newAlumni = await Alumni.create({
        image: image,
        name: name,
        position: position,
      });

      return res.status(200).json({
        status: "ok",
        data: "Alumni Created",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
