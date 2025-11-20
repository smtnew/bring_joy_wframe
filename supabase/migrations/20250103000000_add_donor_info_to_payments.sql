-- Add donor information columns to payments table
alter table public.payments 
  add column donor_name text,
  add column donor_email text,
  add column donor_phone text;

-- Add comment to explain columns
comment on column public.payments.donor_name is 'Name of the donor (optional)';
comment on column public.payments.donor_email is 'Email of the donor (optional)';
comment on column public.payments.donor_phone is 'Phone of the donor (optional)';
