import express from "express";
import fs from "fs";
import cors from "cors";
globalThis.app = express();

app.use(cors());
//TODO: Add static website file server for production server

app.get("/", async function(request, response){
  let File = "";
  try{
    File = (await fs.promises.readFile("./Server/Main.mjs")).toString();
  }catch(e){
    console.warn("Error while reading file\n", e);
  }
  response.send(File);
});

app.listen(8080, function(){
  console.log("Started server");
});