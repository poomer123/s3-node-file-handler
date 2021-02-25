const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));

app.use("/upload-file", (req, res) => {
    return res.json({
        status: "ok",
    });
});

const port = process.env.PORT || 3001;

app.listen(port || 3001, () => {
    console.log(`Server is listening on port ${port}`);
});
