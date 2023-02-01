const path = require("path");
const express = require("express");
const app = express(); // create express app
const fileUpload  = require('express-fileUpload');
const fs = require("fs");

// add middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
  if (/^\/api\//.test(req.originalUrl)) return void next();
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/api/change-data", function(req, res){
  console.log(req.body);
  fs.writeFileSync(path.join(__dirname, "Data.json"), JSON.stringify(req.body));
  console.log("Wrote file" /*, new data: ", JSON.stringify(req.body)*/);
  res.status(200).send("Success");
});

app.get("/api/get-data", function(request, response){
  fs.readFile(path.join(__dirname, "Data.json"), function(Error, Buffer){
    const Data = JSON.parse(Buffer.toString());
    console.log(Data);
  
    response.send(JSON.stringify(Data)); 
  });
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