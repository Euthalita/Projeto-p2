import { useState } from "react";
import CitySearch from "./components/CitySearch";

export default function App() {
  const [forecasts, setForecasts] = useState([]);

  return (
    <div className="p-4">
      <h1>Previsão do Tempo</h1>
      <CitySearch onResults={setForecasts} />

      <div className="mt-4">
        {forecasts.length === 0 ? (
          <p>Nenhuma previsão encontrada.</p>
        ) : (
          forecasts.map((f, i) => (
            <div key={i} className="mb-3 border p-3 rounded shadow-sm">
              <p><strong>Data:</strong> {f.date} </p>
              <p><strong>Temperatura Mínima:</strong> {f.temp_min} °C</p>
              <p><strong>Temperatura Máxima:</strong> {f.temp_max} °C</p>
              <p><strong>Umidade:</strong> {f.humidity}%</p>
              <img
                src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
                alt={f.description}
              />
              <p><strong>Descrição:</strong> {f.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
