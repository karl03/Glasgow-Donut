const path = require("path");
const express = require("express");
const app = express(); // create express app
const fileUpload  = require('express-fileUpload');
const fs = require("fs");

// add middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(express.json());
app.use(fileUpload());

app.use((req, res, next) => {
  if (/^\/api\//.test(req.originalUrl)) return void next();
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/api/change-data", function(req, res){
  console.log(req.body);
  fs.writeFileSync(path.join(__dirname, "Data.json"), JSON.stringify(req.body, null, 2));
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

app.get("/api/get-icon/:folder/:filename", (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
  if (!["Global_Ecological", "Global_Social", "Local_Ecological", "Local_Social"].includes(folder)) {
    return res.status(400).json({ msg: 'Folder does not exist' });
  }

  res.sendFile(`${__dirname}/Icons/${folder}/${filename}`, function(err) {
    if (err) {
      return res.status(400).json({ msg: 'Filename does not exist' });
    } else {
      console.log('Sent: ', filename);
    }
  });
});

app.get('/api/get-icon-filenames/:folder', (req, res) => {
  const folder = req.params.folder;
  let fileNames = [];
  fs.readdir(`${__dirname}/Icons/${folder}`, (err, files) => {
    if (err) {
      console.log('Error reading folder:', err);
      return res.status(500).send(err);
    }
    fileNames = files;
    res.send(fileNames);
  });
});

app.post('/api/upload-icon/:folder', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const folder = req.params.folder;
  const file = req.files.myfile;
  file.mv(`${__dirname}/Icons/${folder}/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/Icons/${folder}/${file.name}` });
  });
});

app.delete('/api/delete-all/:folder', (req, res) => {
  const folder = req.params.folder;
  const directory = `${__dirname}/${folder}`;

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal server error');
        }
        console.log(`Deleted ${file}`);
      });
    }

    res.status(200).send('All files deleted successfully');
  });
});

app.post('/api/upload-report', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.myfile;
  const fileExtension = file.name.split(".").pop()
  file.mv(`${__dirname}/Report/Report.${fileExtension}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/Report/Report.${fileExtension}` });
  });
});

app.get('/api/get-report-filename', (req, res) => {
  let fileName = [];
  fs.readdir(`${__dirname}/Report`, (err, files) => {
    if (err) {
      console.log('Error reading folder:', err);
      return res.status(500).send(err);
    }
    fileName = files;
    res.send(fileName);
  });
});

app.get('/api/download-report/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `${__dirname}/Report/${fileName}`;

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName);
  } else {
    res.status(404).send('File not found');
  }
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
