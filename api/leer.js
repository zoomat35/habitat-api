import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { data, error } = await supabase
    .from('sensores')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ datos: data });
  }
}
