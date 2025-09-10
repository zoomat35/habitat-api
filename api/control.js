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

  const { habitat_id, rele, estado } = req.body;

  // Buscar registro existente
  const { data, error: errorBuscar } = await supabase
    .from('reles')
    .select('id')
    .eq('habitat_id', habitat_id)
    .eq('rele', rele)
    .limit(1);

  if (errorBuscar) return res.status(500).json({ error: errorBuscar.message });

  if (data.length > 0) {
    // Actualizar si existe
    const { error: errorActualizar } = await supabase
      .from('reles')
      .update({ estado, timestamp: new Date().toISOString() })
      .eq('id', data[0].id);

    if (errorActualizar) return res.status(500).json({ error: errorActualizar.message });

    return res.status(200).json({ mensaje: 'Estado actualizado (UPDATE)' });
  } else {
    // Insertar si no existe
    const { error: errorInsertar } = await supabase.from('reles').insert([
      { habitat_id, rele, estado, timestamp: new Date().toISOString() }
    ]);

    if (errorInsertar) return res.status(500).json({ error: errorInsertar.message });

    return res.status(200).json({ mensaje: 'Estado creado (INSERT)' });
  }
}
