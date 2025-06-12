import { useState, useEffect, useRef } from "react";
import axios from "axios";
import api from "../services/api";

export default function CitySearch({ onResults }) {
  const [city, setCity] = useState("São Paulo");
  const timerRef = useRef(null);

  useEffect(() => {
    if (city.length < 3) {
      onResults([]);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
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

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
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
