import { useState, useEffect } from "react";
import axios from "axios";

export default function CitySearch({ onResults }) {
  const [city, setCity] = useState("São Paulo");

  useEffect(() => {
    if (city.length < 3) {
      onResults([]);
      return;
    }

    const delay = setTimeout(() => {
      axios
        .get(`http://localhost:3001/weather?city=${encodeURIComponent(city)}`)
        .then((res) => {
          console.log("Dados recebidos do backend:", res.data);
          onResults(res.data);
        })
        .catch((err) => {
          console.error("Erro na busca:", err);
          onResults([]);
        });
    }, 2000);

    return () => clearTimeout(delay); // Limpa o timeout antes de executar outro
  }, [city, onResults]);

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite o nome da cidade"
        style={{ padding: "0.5rem", fontSize: "1rem", width: "100%" }}
      />
    </div>
  );
}
