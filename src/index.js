const express = require("express");
const fs = require("fs");
const AWS = require("aws-sdk");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));

AWS.config.update({ region: "ap-southeast-1" });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

app.use("/upload-file", (req, res) => {

    const fileContent = fs.readFileSync(req.fileName);
    const s3params = {
        Bucket: "name",
        Key: "filename.jpg",
        Body: fileContent,
    };

    s3.upload(s3params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });

    return res.json({
        status: "ok",
        message: "File uploaded successfully.",
        data: data.Location,
    });
});

const port = process.env.PORT || 3001;

app.listen(port || 3001, () => {
    console.log(`Server is listening on port ${port}`);
});
