import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const yourUsername = "jackbauer_01";
const yourPassword = "IAmTheBest";
const yourAPIKey = "eb3426d9-5c7b-45f2-9bd0-8dfb49a37c87";
const yourBearerToken = "14c1f383-a3aa-480e-824a-dd52907da974";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
    const response= await axios.get(`${API_URL}random`);
    const result= response.data;
    res.render("index.ejs", {content: JSON.stringify(result)});
  }catch(error){
    res.send(error.message);
  }
});

app.get("/basicAuth",async(req, res) => {
  try{
    const response=await axios.get(`${API_URL}all?page=2`,{
    auth: {
      username: "jackbauer_01",
      password: "IAmTheBest",
    },
  });
  res.render("index.ejs", { content: JSON.stringify(response.data)});
  }catch(error){
    res.send(error.message);
  }
});

app.get("/apiKey", async(req, res) => {
   try{
    const response= await axios.get(`${API_URL}filter`,{
      params: {
        score: 5,
        apiKey: "eb3426d9-5c7b-45f2-9bd0-8dfb49a37c87",
      },
    });
    res.render("index.ejs", {content: JSON.stringify(response.data)});
   }catch(error){
    res.send(error.message);
   }
});

app.get("/bearerToken", async(req, res) => {
  try{
    const response = await axios.get(`${API_URL}secrets/42`,{
      headers: {
        Authorization: `Bearer ${"14c1f383-a3aa-480e-824a-dd52907da974"}`,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch(error){
    res.send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
