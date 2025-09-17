import { useEffect, useState } from 'react';

export default function SensorEstado({ habitat_id }) {
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    fetch(`https://habitat-api.vercel.app/api/estado-sensores?habitat_id=${habitat_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("📡 Sensor recibido:", data);
        if (typeof data.temperatura === 'number' && typeof data.humedad === 'number') {
          setSensor(data);
        } else {
          setSensor(null);
        }
      })
      .catch(err => {
        console.error("❌ Error al obtener sensores:", err);
        setSensor(null);
      });
  }, [habitat_id]);

  if (!sensor) return <p>🔄 Cargando sensores...</p>;

  return (
    <div>
      <p>🌡️ Temp: {sensor.temperatura.toFixed(1)} °C</p>
      <p>💧 Hum: {sensor.humedad.toFixed(1)} %</p>
      <p>🕒 {new Date(sensor.timestamp).toLocaleString()}</p>
    </div>
  );
}
