require('dotenv').config(); // Carrega variáveis do .env

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001; // Usa a porta 3001 ou a porta do ambiente

// Endpoint principal
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'Cidade é obrigatória.' });
  }

  try {
    const apiKey = process.env.OWM_API_KEY;

    // Chamada para OpenWeatherMap
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'pt'
      }
    });

    // Processa e filtra os dados
    const forecasts = response.data.list.map(f => ({
      min: f.main.temp_min,
      max: f.main.temp_max,
      humidity: f.main.humidity,
      icon: f.weather[0].icon,
      description: f.weather[0].description
    }));

    res.json(forecasts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da previsão.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
