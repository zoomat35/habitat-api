// api/habitat.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gehwsxrjtgjecjikhhut.supabase.co', // ← tu URL de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaHdzeHJqdGdqZWNqaWtoaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODA5MzEsImV4cCI6MjA3Mjk1NjkzMX0.0sm4L2l3r8vsrg8S8Xy85ugwrTS5ilBIj_pZoLLeGVY' // ← tu anon key
);

export default async function handler(req, res) {
  // Cabeceras CORS para todas las respuestas
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de preflight
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { temperatura, humedad } = req.body;

  try {
    const { error } = await supabase
      .from('habitats')
      .insert([{ temperatura, humedad }]);

    if (error) throw error;

    res.status(200).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    console.error("Error al guardar datos:", err);
    res.status(500).json({ error: err.message });
  }
}
