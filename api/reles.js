export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
//permite que el frontend React (aunque esté en otro dominio) pueda hacer peticiones sin ser bloqueado por el navegador.

// api/reles.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { data, error } = await supabase
      .from('reles')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(20); // puedes ajustar el límite según lo que necesites

    if (error) throw error;

    res.status(200).json({ datos: data });
  } catch (err) {
    console.error("Error al leer relés:", err);
    res.status(500).json({ error: err.message });
  }
 }
}
