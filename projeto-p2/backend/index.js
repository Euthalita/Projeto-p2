const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Cidade é obrigatória.' });
  }

  try {
    const apiKey = process.env.OWM_API_KEY;
    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        q: city,
        appid: apiKey,
        units: "metric", 
        lang: "pt_br"
      },
    });

    const forecasts = response.data.list.map(f => ({
      date: f.dt_txt,
      temp_min: f.main.temp_min,
      temp_max: f.main.temp_max,
      humidity: f.main.humidity,
      icon: f.weather[0].icon,
      description: f.weather[0].description,
    }));

    res.json(forecasts);
  } catch (error) {
    console.error('Erro na requisição à API:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da previsão.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
