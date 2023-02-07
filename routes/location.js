const express = require("express");
const router = express.Router();

const { getLocationInfo } = require("../controllers/locationControl");

router.get("/user/location", getLocationInfo);

module.exports = router;
