import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY — check .env.local and rebuild."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);