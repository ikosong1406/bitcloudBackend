const express = require("express");
const router = express.Router();
const Location = require("../Schemas/Location");

router.post("/", async (req, res) => {
  const { ip, country, region, city } = req.body;

  try {
    const newLocation = await Location.create({
      city: city,
      country: country,
      ip: ip,
      region: region,
    });

    return res.status(200).json({
      status: "ok",
      data: "Location Created",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
