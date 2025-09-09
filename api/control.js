export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
//permite que el frontend React (aunque esté en otro dominio) pueda hacer peticiones sin ser bloqueado por el navegador.

// api/control.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { habitat_id, rele, estado } = req.body;

  // Validación básica
  if (
    typeof habitat_id !== 'number' ||
    typeof rele !== 'number' ||
    typeof estado !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const { error } = await supabase
      .from('reles')
      .insert([{ habitat_id, rele, estado }]);

    if (error) throw error;

    res.status(200).json({ mensaje: 'Relé actualizado correctamente' });
  } catch (err) {
    console.error("Error al insertar:", err);
    res.status(500).json({ error: err.message });
  }
 }
}
