import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('reles')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    // Consolidar: solo el último por habitat_id + rele
    const mapa = new Map();
    for (const registro of data) {
      const clave = `${registro.habitat_id}-${registro.rele}`;
      if (!mapa.has(clave)) {
        mapa.set(clave, registro);
      }
    }

    res.status(200).json({ datos: Array.from(mapa.values()) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
