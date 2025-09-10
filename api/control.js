import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // 🔧 CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Preflight OK
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { habitat_id, rele, estado } = req.body;

  const { error } = await supabase.from('reles').insert([
    { habitat_id, rele, estado, timestamp: new Date().toISOString() }
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ mensaje: 'Estado actualizado' });
}

