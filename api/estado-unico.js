import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { habitat_id, rele } = req.query;

  const { data, error } = await supabase
    .from('reles')
    .select('estado')
    .eq('habitat_id', Number(habitat_id))
    .eq('rele', Number(rele))
    .limit(1);

  if (error || data.length === 0) return res.status(404).json({ error: 'No encontrado' });

  res.status(200).json({ estado: data[0].estado });
}
