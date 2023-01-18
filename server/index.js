const path = require("path");
const express = require("express");
const app = express(); // create express app
const fileUpload  = require('express-fileUpload');

// add middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  if (/^\/api\//.test(req.originalUrl)) return void next();
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use(fileUpload());
app.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.myfile;
  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
