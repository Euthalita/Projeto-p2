import React from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";

export default function ForecastList({ forecasts }) {
  if (!forecasts || forecasts.length === 0) {
    return <p>Nenhuma previsão encontrada.</p>;
  }

  return (
    <div className="grid">
      {forecasts.map((f, i) => (
        <div key={i} className="col-12 md:col-6 lg:col-4 mb-4">
          <Card title={new Date(f.date).toLocaleString("pt-BR")}>
            <div>
              <p><strong>Temperatura Mínima:</strong> {f.temp_min}°C</p>
              <p><strong>Temperatura Máxima:</strong> {f.temp_max}°C</p>
              <p><strong>Umidade:</strong> {f.humidity}%</p>
              <p><strong>Descrição:</strong> {f.description}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
                alt={f.description}
                width="80"
                preview
              />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
