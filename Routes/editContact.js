const express = require("express");
const router = express.Router();
const Contact = require("../Schemas/Contact");
const upload = require("../utils/multer-config"); // Cloudinary and multer already configured

router.post("/", upload.fields(), async (req, res) => {
  const { id, phone, email, secretariate } = req.body;
  try {
    // Prepare the update data dynamically
    const updateData = {};

    // Update name if provided
    if (typeof phone === "string" && phone.trim() !== "") {
      updateData.phone = phone.trim();
    }
    if (typeof email === "string" && email.trim() !== "") {
      updateData.email = email.trim();
    }
    if (typeof secretariate === "string" && secretariate.trim() !== "") {
      updateData.secretariate = secretariate.trim();
    }

    // Update the position in the database
    const updatedPosition = await Contact.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedPosition) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({
      message: "Contact updated successfully",
      status: "ok",
    });
  } catch (error) {
    console.error("Error updating position:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
