-- Create mini quotes table for streamlined quote requests
CREATE TABLE IF NOT EXISTS quote_requests_mini (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create full quotes table for detailed quote requests
CREATE TABLE IF NOT EXISTS quote_requests_full (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mini_quote_uuid UUID REFERENCES quote_requests_mini(id),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  square_footage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  services TEXT[] NOT NULL,
  additional_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quote_requests_mini ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests_full ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts on mini quotes"
  ON quote_requests_mini
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on full quotes"
  ON quote_requests_full
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_quote_requests_mini_submitted ON quote_requests_mini(submitted_at DESC);
CREATE INDEX idx_quote_requests_mini_source ON quote_requests_mini(source);
CREATE INDEX idx_quote_requests_full_submitted ON quote_requests_full(submitted_at DESC);
CREATE INDEX idx_quote_requests_full_mini_uuid ON quote_requests_full(mini_quote_uuid);
