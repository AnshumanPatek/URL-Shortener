const express = require("express");
const app = express();
const path = require("path");
const {connectMongodb} = require("./connection");
const urlModel = require("./models/url"); 

const urlRouter = require("./routes/url");
const staticRoter = require("./routes/staticRouter");
// const userRoute = require("./routes/user");

connectMongodb("mongodb://localhost:27017/Urlshotner")
.then(() => {
    console.log("Connection Successfull");
}).catch((err) => {
    console.log("Not Able to Connect ", err);
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoter);
// app.user("/user", userRoute);
app.use("/url", urlRouter);

app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid;
    try {
        const entry = await urlModel.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );
        res.redirect(entry.redirectUrl);
    } catch (err) {
        return res.json({ msg: "Error" });
    }
})

app.listen(8000, () => {
    console.log(`Server Start on 8000`);
})
