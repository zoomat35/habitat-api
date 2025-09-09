export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Simulación de lectura desde Supabase o base de datos
  const datos = [
    { habitat_id: 1, temperatura: 26.5, humedad: 78, timestamp: new Date().toISOString() },
    { habitat_id: 2, temperatura: 24.1, humedad: 82, timestamp: new Date().toISOString() }
  ];

  res.status(200).json({ datos });
}
