export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
//permite que el frontend React (aunque esté en otro dominio) pueda hacer peticiones sin ser bloqueado por el navegador.

// api/habitat.js
import { createClient } from '@supabase/supabase-js';

// Diagnóstico: verificar si las variables de entorno están presentes
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

// Crear cliente Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // Diagnóstico: método HTTP
  console.log("Método recibido:", req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { temperatura, humedad } = req.body;

  // Diagnóstico: datos recibidos
  console.log("Datos recibidos:", { temperatura, humedad });

  // Validación de tipos
  if (typeof temperatura !== 'number' || typeof humedad !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos: se esperan números' });
  }

  try {
    // Intentar insertar en Supabase
    const { error } = await supabase
      .from('habitats')
      .insert([{ temperatura, humedad }]);

    // Diagnóstico: resultado de la inserción
    if (error) {
      console.error("Error al insertar en Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Inserción exitosa");
    res.status(200).json({ mensaje: 'Datos guardados correctamente' });
  } catch (err) {
    // Diagnóstico: error inesperado
    console.error("Error inesperado:", err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
 }
}
