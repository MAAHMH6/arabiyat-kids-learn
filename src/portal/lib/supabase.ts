import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env['VITE_SUPABASE_URL'] ||
  'https://vtmonswknfdrnridiiis.supabase.co';

const supabaseAnonKey =
  import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
  import.meta.env['VITE_SUPABASE_ANON_KEY'] ||
  'sb_publishable_ByV1JCqtqkY_GiOcfxsojQ_LCwNK28X';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

