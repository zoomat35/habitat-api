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
      .from('habitat_info')
      .select('*');

    if (error) throw error;

    res.status(200).json({ datos: data });
  } catch (err) {
    console.error("Error al obtener info del hábitat:", err);
    res.status(500).json({ error: err.message });
  }
}
