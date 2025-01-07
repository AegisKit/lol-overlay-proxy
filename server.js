const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

// CORSを許可する
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// プロキシルート
app.get("/asia/*", async (req, res) => {
  const apiUrl = req.url.replace("/asia", ""); // '/api'を削除して外部APIのURLを作成
  try {
    const response = await axios.get(`https://asia.api.riotgames.com${apiUrl}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from external API" });
  }
});

app.get("/jp1/*", async (req, res) => {
  const apiUrl = req.url.replace("/jp1", ""); // '/api'を削除して外部APIのURLを作成
  try {
    const response = await axios.get(`https://jp1.api.riotgames.com${apiUrl}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from external API" });
  }
});

app.get("/opgg/*", async (req, res) => {
  const apiUrl = req.url.replace("/opgg", ""); // '/api'を削除して外部APIのURLを作成
  try {
    const response = await axios.get(`https://www.op.gg${apiUrl}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from external API" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
