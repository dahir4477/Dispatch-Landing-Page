-- Early access leads table for AI Dispatch landing page
-- Run this in your Supabase SQL Editor or via Supabase CLI

CREATE TABLE IF NOT EXISTS early_access_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  trucks TEXT,
  weekly_revenue TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: enable RLS and allow anonymous inserts for the anon key
ALTER TABLE early_access_leads ENABLE ROW LEVEL SECURITY;

-- Policy: allow insert for anon (used by landing page form)
CREATE POLICY "Allow anonymous insert for early_access_leads"
  ON early_access_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: restrict select/update/delete to service role only (no public read)
CREATE POLICY "Service role only for select"
  ON early_access_leads
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role only for update"
  ON early_access_leads
  FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role only for delete"
  ON early_access_leads
  FOR DELETE
  TO service_role
  USING (true);

-- Index for looking up by email
CREATE INDEX IF NOT EXISTS idx_early_access_leads_email ON early_access_leads (email);
CREATE INDEX IF NOT EXISTS idx_early_access_leads_created_at ON early_access_leads (created_at DESC);
