import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { habitat_id, temperatura, humedad } = req.body;

  if (typeof habitat_id !== 'number' || typeof temperatura !== 'number' || typeof humedad !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const { error } = await supabase.from('sensores').insert([
    {
      habitat_id,
      temperatura,
      humedad,
      timestamp: new Date().toISOString()
    }
  ]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ mensaje: 'Datos registrados correctamente' });
}
