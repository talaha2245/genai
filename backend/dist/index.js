import express from "express";
const app = express();
app.get("/", (req, res) => {
    return res.json({
        msg: " connected"
    });
});
app.listen(3000, () => {
    console.log(" the app is running on the prot ");
});
