export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // ← permite acceso desde cualquier dominio
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Tu lógica original aquí...

// api/habitat.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://gehwsxrjtgjecjikhhut.supabase.co',     // ← reemplaza con tu URL de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaHdzeHJqdGdqZWNqaWtoaHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODA5MzEsImV4cCI6MjA3Mjk1NjkzMX0.0sm4L2l3r8vsrg8S8Xy85ugwrTS5ilBIj_pZoLLeGVY'                     // ← reemplaza con tu anon key
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { temperatura, humedad } = req.body;

  const { error } = await supabase
    .from('habitats')
    .insert([{ temperatura, humedad }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ mensaje: 'Datos guardados correctamente' });
 }
}
