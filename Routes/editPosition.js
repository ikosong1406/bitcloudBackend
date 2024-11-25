const express = require("express");
const router = express.Router();
const Position = require("../Schemas/Position");
const upload = require("../utils/multer-config"); // Cloudinary and multer already configured

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { positionId, name } = req.body;

      // Prepare the update data dynamically
      const updateData = {};

      // Update name if provided
      if (typeof name === "string" && name.trim() !== "") {
        updateData.name = name.trim();
      }

      // Update image if provided
      if (req.files && req.files.image) {
        const imageFile = req.files.image[0]; // Multer's uploaded file
        const cloudinary = require("cloudinary").v2;

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(imageFile.path);

        // Save the URL from Cloudinary
        updateData.image = uploadResult.secure_url;
      }

      // Update the position in the database
      const updatedPosition = await Position.findOneAndUpdate(
        { _id: positionId },
        updateData,
        { new: true } // Return the updated document
      );

      if (!updatedPosition) {
        return res.status(404).json({ error: "Position not found" });
      }

      res.json({
        message: "Position updated successfully",
        status: "ok",
        data: updatedPosition,
      });
    } catch (error) {
      console.error("Error updating position:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
