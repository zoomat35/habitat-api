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

  const { habitat_id } = req.query;

  const { data, error } = await supabase
    .from('sensores')
    .select('temperatura, humedad, timestamp')
    .eq('habitat_id', Number(habitat_id))
    .order('timestamp', { ascending: false })
    .limit(1);

  if (error || data.length === 0) return res.status(404).json({ error: 'No hay datos' });

  res.status(200).json({ datos: data[0] });

}
