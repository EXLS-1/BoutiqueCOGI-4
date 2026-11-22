-- Manual Supabase migration for the Prisma 8 contract.
-- Run this script in Supabase Dashboard > SQL Editor.

BEGIN;

CREATE TABLE IF NOT EXISTS public.users (
  id         SERIAL NOT NULL PRIMARY KEY,
  email      text NOT NULL,
  username   text,
  name       text,
  created_at timestamptz(3) NOT NULL DEFAULT now(),
  updated_at timestamptz(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.posts (
  id         SERIAL NOT NULL PRIMARY KEY,
  title      text NOT NULL,
  content    text,
  author_id  integer NOT NULL,
  created_at timestamptz(3) NOT NULL DEFAULT now(),
  updated_at timestamptz(3) NOT NULL
);

-- The Prisma contract declares email as a named unique constraint.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'users_email_key'
      AND conrelid = 'public.users'::regclass
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END
$$;

-- The Prisma planner creates this index for the relation field.
CREATE INDEX IF NOT EXISTS posts_author_id_idx_f3862461
  ON public.posts (author_id);

-- Add the relation only when it is not already present.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'posts_author_id_fkey'
      AND conrelid = 'public.posts'::regclass
  ) THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_author_id_fkey
      FOREIGN KEY (author_id)
      REFERENCES public.users (id);
  END IF;
END
$$;

-- The current Prisma contract does not declare RLS policies.
-- Disable RLS so the live schema matches that contract.
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

COMMIT;

-- Verification: both rows should exist after the migration.
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'posts')
ORDER BY table_name;
