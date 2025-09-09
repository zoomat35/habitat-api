// api/habitat.js
import { createClient } from '@supabase/supabase-js';

// Conexión segura usando variables de entorno
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Solo aceptar método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { temperatura, humedad } = req.body;

  // Validación básica de datos
  if (typeof temperatura !== 'number' || typeof humedad !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos: se esperan números' });
  }

  // Inserción en la tabla 'habitats'
  const { error } = await supabase
    .from('habitats')
    .insert([{ temperatura, humedad }]);

  // Manejo de errores
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Respuesta exitosa
  res.status(200).json({ mensaje: 'Datos guardados correctamente' });
}
