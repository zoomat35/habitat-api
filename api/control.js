import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { habitat_id, rele, estado } = req.body;

  const { error } = await supabase.from('reles').insert([
    { habitat_id, rele, estado, timestamp: new Date().toISOString() }
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ mensaje: 'Estado actualizado' });
}
