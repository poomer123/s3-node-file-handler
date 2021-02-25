const express = require('express');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb', extended: true }));

AWS.config.update({ region: 'ap-southeast-1' });

const s3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

app.post('/upload-file', (req, res) => {
	const fileContent = fs.readFileSync(path.resolve('src', 'mobile.jpg'));
	const s3params = {
		Bucket: process.env.PUBLIC_BUCKET_NAME,
		Key: 'newfilename.jpg',
		Body: fileContent,
	};

	s3.upload(s3params, (err, data) => {
		if (err) {
			throw err;
		}
		console.log(`File uploaded successfully. ${data.Location}`);
	});

	return res.json({
		status: 'ok',
		message: 'File uploaded successfully.',
		data: data.Location,
	});
});

const port = process.env.PORT || 3001;

app.listen(port || 3001, () => {
	console.log(`Server is listening on port ${port}`);
});
