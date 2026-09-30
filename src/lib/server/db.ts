import 'server-only';
import { createClient } from '@supabase/supabase-js';
export function db() {
  const url = process.env.HUB_SUPABASE_URL;
  const key = process.env.HUB_SUPABASE_SERVICE_KEY;
  if (!url || !key)
    throw new Error(
      'Supabase baru belum dikonfigurasi. Isi HUB_SUPABASE_URL dan HUB_SUPABASE_SERVICE_KEY di server.',
    );
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
