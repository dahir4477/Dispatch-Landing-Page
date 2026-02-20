import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns the Supabase client only when env vars are set.
 * Lazy-initialized so build (which has no .env) never calls createClient with empty URL.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

export type EarlyAccessLead = {
  id?: string;
  first_name: string;
  email: string;
  phone?: string;
  trucks?: string;
  weekly_revenue?: string;
  created_at?: string;
};
