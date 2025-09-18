import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { habitat_id, rele } = req.query;

  let query = supabase
    .from('reles')
    .select('habitat_id, rele, estado')
    .order('timestamp', { ascending: false });

  if (habitat_id) query = query.eq('habitat_id', parseInt(habitat_id));
  if (rele) query = query.eq('rele', parseInt(rele));

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  // Consolidar el último estado por habitat_id + rele
  const vistos = new Set();
  const consolidados = data.filter(r => {
    const clave = `${r.habitat_id}-${r.rele}`;
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });

  res.status(200).json({ datos: consolidados });
}
