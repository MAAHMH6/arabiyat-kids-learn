CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Arabic Worksheets',
  description text NOT NULL DEFAULT '',
  file_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resources TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resources TO authenticated;
GRANT ALL ON public.resources TO service_role;

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY resources_public_read ON public.resources FOR SELECT USING (true);
CREATE POLICY resources_admin_write ON public.resources FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.resources (title, category, description, sort_order) VALUES
  ('Arabic Numbers 1-10', 'Arabic Worksheets', 'A printable worksheet for practising Arabic numerals.', 1),
  ('My First 50 Arabic Words', 'Vocabulary', 'Everyday words with English meaning and pronunciation.', 2),
  ('Counting Practice Sheet', 'Numbers', 'Count and write Arabic numbers with simple pictures.', 3),
  ('Arabic Alphabet Flashcards', 'Flashcards', 'Printable letter cards with correct sounds.', 4),
  ('Greetings Role-Play Cards', 'Practice Activities', 'Fun activity cards for practising greetings at home.', 5),
  ('Family Words in Arabic', 'Vocabulary', 'Mother, father, brother, sister and more.', 6);