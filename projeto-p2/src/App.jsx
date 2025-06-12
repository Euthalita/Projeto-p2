import { useState } from "react";
import CitySearch from "./components/CitySearch";
import ForecastList from "./components/ForecastList";

export default function App() {
  const [forecasts, setForecasts] = useState([]);

  return (
    <div className="p-4">
      <h2>Previsão do Tempo</h2>
      <CitySearch onResults={setForecasts} />
      <ForecastList forecasts={forecasts} />
    </div>
  );
}
