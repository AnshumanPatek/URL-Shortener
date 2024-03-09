const express = require("express");
const router = express.Router();
const urlMode = require("../models/url");

router.get("/", async (req, res) => {
    const allUrl = await urlMode.find({});

    return res.render("home", {
        urls:allUrl,
    });
})



module.exports = router;