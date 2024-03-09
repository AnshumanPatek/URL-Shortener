const shortid = require("shortid");
const urlMode = require("../models/url");

async function handleGenrateNewshortUrl(req, res) {
    const shortId = shortid();
    const body = req.body;
    if (!body.url)
        return res.status(400).json({ error: "url is required" });
    
    await urlMode.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    })

    return res.render("home", {
        id : shortId,
    });
}

async function handlegetAnalytics(req, res){
    const shortId = req.params.shortid;
    const result = await urlMode.findOne(shortId);
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}


module.exports = {
    handleGenrateNewshortUrl,
    handlegetAnalytics,
};