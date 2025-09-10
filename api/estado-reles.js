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

  const { data, error } = await supabase
    .from('reles')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  const mapa = new Map();
  for (const r of data) {
    const clave = `${r.habitat_id}-${r.rele}`;
    if (!mapa.has(clave)) mapa.set(clave, r);
  }

  res.status(200).json({ datos: Array.from(mapa.values()) });
}
