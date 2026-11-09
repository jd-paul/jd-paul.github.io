-- Experience table for the portfolio (public read, admin write via GitHub OAuth)
-- Mirrors the access model of the existing `projects` table.

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  dates text not null,
  highlights text not null,
  display_order int,
  created_at timestamptz not null default now()
);

-- Expose through the Data API (roles may not be granted automatically)
grant select on public.experience to anon, authenticated;
grant insert, update, delete on public.experience to authenticated;

alter table public.experience enable row level security;

-- Public read (portfolio is a public site)
create policy "experience_select_all" on public.experience
  for select to anon, authenticated
  using (true);

-- Writes restricted to the portfolio admin
create policy "experience_admin_all" on public.experience
  for all to authenticated
  using ((select auth.uid()) = '36b34aa4-4047-42f1-bdbf-295c5dfe4706'::uuid)
  with check ((select auth.uid()) = '36b34aa4-4047-42f1-bdbf-295c5dfe4706'::uuid);

-- Seed data (source of truth: kApply/Resume/LaTeX/Master/work-experience.tex)
insert into public.experience (role, company, dates, highlights, display_order) values
  (
    'Software Engineering Intern',
    'Pepsi Cola Products Philippines (PCPPI)',
    'Aug 2026 – Sep 2026',
    'Owned all four EHSS modules on Pepsi''s internal dashboard — 13+ CRUD modules with approval workflows, audit logs, and exports across 11 plants. Cut render delay ~4× (2,042 ms → 531 ms) and led recruitment for 3 intern hires.',
    1
  ),
  (
    'Full Stack Developer',
    'MedibleGo',
    'Dec 2025 – May 2026',
    'Built an end-to-end AI interviewing platform using OpenAI for script generation and ElevenLabs for voice-based agentic interviews, plus a privacy-first RAG WhatsApp chatbot with a custom data-redaction layer.',
    2
  ),
  (
    'Lead Full Stack Developer',
    'KCL Tech',
    'Sep 2024 – Sep 2026',
    'Redesigned the society platform with TypeScript and MongoDB (+30% engagement, 1,200+ monthly views). Organised Tech Summit 2025 (1,300+ sign-ups) and Hack London 2026 (600+ competitors).',
    3
  ),
  (
    'Full Stack Developer',
    'SmileShot',
    'Dec 2024 – May 2025',
    'Built a Google Drive-style image and file management platform on Azure Cosmos DB for a DentalTech startup — including a bulk upload pipeline reliably processing 100 images per batch.',
    4
  ),
  (
    'AV & IT Support Technician',
    'King''s College London',
    'Sep 2024 – Sep 2026',
    'Support 600+ teaching and event spaces across King''s campuses, delivering live AV for 70+ events weekly and first-line IT support for 500+ students.',
    5
  );
