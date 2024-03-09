const express = require("express");
const { handleGenrateNewshortUrl,
        handlegetAnalytics } = require("../controllers/url");
const urlMode = require("../models/url");
const router = express.Router();

router.post("/", handleGenrateNewshortUrl);

router.get("/analytics/:shortId", handlegetAnalytics);

router.get("/test", async (req, res) => {
    const allUrl = await urlMode.find({});
    return res.render("home", {
        url:allUrl,
    });
});

module.exports = router;