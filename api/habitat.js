// api/habitat.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://TU_URL.supabase.co',     // ← reemplaza con tu URL de Supabase
  'TU_ANON_KEY'                     // ← reemplaza con tu anon key
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { temperatura, humedad } = req.body;

  const { error } = await supabase
    .from('habitats')
    .insert([{ temperatura, humedad }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ mensaje: 'Datos guardados correctamente' });
}
