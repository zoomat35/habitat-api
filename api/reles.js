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
