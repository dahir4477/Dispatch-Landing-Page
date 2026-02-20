import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EarlyAccessLead = {
  id?: string;
  first_name: string;
  email: string;
  phone?: string;
  trucks?: string;
  weekly_revenue?: string;
  created_at?: string;
};
