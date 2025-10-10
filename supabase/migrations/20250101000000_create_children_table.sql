-- Create children table
create table children (
  id uuid primary key default gen_random_uuid(),
  nume text not null,
  text_scurt text not null,
  text_scrisoare text not null,
  poza_url text not null,
  suma integer not null,
  comunitate text not null,
  status text not null default 'raising' check (status in ('raising', 'reserved', 'finished')),
  payment_id text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table children enable row level security;

-- Public can read children
create policy "Public can read children"
  on children for select 
  using (true);

-- No public inserts
create policy "No public inserts"
  on children for insert 
  to anon 
  with check (false);

-- No public updates
create policy "No public updates"
  on children for update 
  to anon 
  using (false) 
  with check (false);

-- No public deletes
create policy "No public deletes"
  on children for delete 
  to anon 
  using (false);

-- Allow service role to do everything
create policy "Service role full access"
  on children for all 
  to service_role 
  using (true) 
  with check (true);
