import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { habitat_id } = req.query;

  if (!habitat_id) {
    return res.status(400).json({ error: 'Falta habitat_id' });
  }

  const { data, error } = await supabase
    .from('sensores')
    .select('temperatura, humedad')
    .eq('habitat_id', parseInt(habitat_id))
    .order('timestamp', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return res.status(404).json({ error: 'No encontrado' });
  }

  res.status(200).json(data[0]);
}
