-- Create payments table
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  amount integer not null,
  payment_ref text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.payments enable row level security;

-- Public can read payments
create policy "Public can read payments"
  on public.payments for select 
  using (true);

-- No public inserts
create policy "No public inserts"
  on public.payments for insert 
  to anon 
  with check (false);

-- No public updates
create policy "No public updates"
  on public.payments for update 
  to anon 
  using (false) 
  with check (false);

-- No public deletes
create policy "No public deletes"
  on public.payments for delete 
  to anon 
  using (false);

-- Allow service role to do everything
create policy "Service role full access"
  on public.payments for all 
  to service_role 
  using (true) 
  with check (true);

-- Add suma_stransa column to children table
alter table public.children add column suma_stransa integer default 0;

-- Create function to update child sum
create or replace function update_child_sum()
returns trigger as $$
begin
  if TG_OP = 'DELETE' then
    update public.children
    set suma_stransa = (
      select coalesce(sum(amount), 0)
      from public.payments
      where child_id = old.child_id
    )
    where id = old.child_id;
    return old;
  else
    update public.children
    set suma_stransa = (
      select coalesce(sum(amount), 0)
      from public.payments
      where child_id = new.child_id
    )
    where id = new.child_id;
    return new;
  end if;
end;
$$ language plpgsql;

-- Create trigger to update child sum on payment changes
create trigger trg_update_child_sum
after insert or update or delete
on public.payments
for each row
execute procedure update_child_sum();
