const express = require("express");
const router = express.Router();
const Gallery = require("../Schemas/Gallery");
const upload = require("../utils/multer-config");

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    const { description } = req.body;

    try {
      const image = req.files["image"] ? req.files["image"][0].path : null;

      const newAlumni = await Gallery.create({
        image: image,
        description: description,
      });

      return res.status(200).json({
        status: "ok",
        data: "Gallery Added",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
