-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'parent');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  parent_name TEXT,
  child_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- New user bootstrap
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, parent_name, child_name)
  VALUES (
    NEW.id,
    NEW.email,
    NULLIF(NEW.raw_user_meta_data ->> 'parent_name', ''),
    NULLIF(NEW.raw_user_meta_data ->> 'child_name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'parent')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Catalogue
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  thumbnail_key TEXT NOT NULL DEFAULT 'thumb1',
  level TEXT NOT NULL DEFAULT 'Beginner',
  category TEXT NOT NULL DEFAULT 'Beginner',
  duration TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 5,
  reviews INTEGER NOT NULL DEFAULT 0,
  language TEXT NOT NULL DEFAULT 'English + Arabic',
  teacher TEXT NOT NULL DEFAULT 'Ustadha Arabiyat',
  featured BOOLEAN NOT NULL DEFAULT false,
  outcomes TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.courses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses TO authenticated;
GRANT ALL ON public.courses TO service_role;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "courses_public_read" ON public.courses FOR SELECT USING (true);
CREATE POLICY "courses_admin_write" ON public.courses FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.modules TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.modules TO authenticated;
GRANT ALL ON public.modules TO service_role;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "modules_public_read" ON public.modules FOR SELECT USING (true);
CREATE POLICY "modules_admin_write" ON public.modules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  is_free BOOLEAN NOT NULL DEFAULT false,
  video_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- video_url is deliberately excluded from anon/authenticated read grants so paid
-- lesson links can only be fetched server-side after an enrolment check.
GRANT SELECT (id, module_id, title, description, duration, is_free, sort_order, created_at) ON public.lessons TO anon;
GRANT SELECT (id, module_id, title, description, duration, is_free, sort_order, created_at) ON public.lessons TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.lessons TO authenticated;
GRANT ALL ON public.lessons TO service_role;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lessons_public_read" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "lessons_admin_write" ON public.lessons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
GRANT SELECT, INSERT, DELETE ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrollments_select_own_or_admin" ON public.enrollments FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "enrollments_insert_own" ON public.enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "enrollments_admin_delete" ON public.enrollments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
GRANT SELECT, INSERT, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progress_select_own_or_admin" ON public.lesson_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "progress_insert_own" ON public.lesson_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_delete_own" ON public.lesson_progress FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Claim first admin when none exists
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RETURN false;
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN public.has_role(uid, 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- Seed catalogue
INSERT INTO public.courses (slug, title, tagline, description, thumbnail_key, level, category, duration, price, rating, reviews, featured, outcomes, sort_order) VALUES
('beginner-arabic-for-kids','Beginner Arabic for Kids','BEST FOR BEGINNERS','Start your child''s Arabic journey with simple lessons covering letters, pronunciation, numbers, vocabulary and everyday speaking.','thumb1','Beginner','Beginner','6+ hours',59,4.9,0,true,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],1),
('arabic-alphabet-for-kids','Arabic Alphabet for Kids','','Learn all 28 Arabic letters, their shapes and their correct sounds, one step at a time.','thumb2','Beginner','Alphabet','3.5 hours',39,4.8,0,false,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],2),
('arabic-numbers-and-counting','Arabic Numbers & Counting','','Count in Arabic with simple, playful examples children can use straight away.','thumb3','Beginner','Numbers','2.5 hours',29,4.8,0,false,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],3),
('beginner-arabic-speaking','Beginner Arabic Speaking','','Practice speaking Arabic out loud with guided repetition and gentle correction.','thumb4','Beginner','Speaking','4 hours',49,4.9,0,false,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],4),
('everyday-arabic-vocabulary','Everyday Arabic Vocabulary','','Family, food, colours, school and home — the words children use every single day.','thumb5','Beginner','Vocabulary','3 hours',35,4.7,0,false,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],5),
('basic-arabic-conversations','Basic Arabic Conversations','','Short, friendly conversations that build real confidence in young learners.','thumb6','Beginner','Kids','2.5 hours',45,4.8,0,false,
 ARRAY['Recognise and pronounce Arabic letters correctly','Count confidently from 1 to 10 in Arabic','Use everyday Arabic words at home','Understand simple Arabic sentences','Hold a short beginner conversation','Build a strong foundation for Qur''an reading later'],6);

DO $$
DECLARE
  c RECORD;
  m1 UUID; m2 UUID; m3 UUID; m4 UUID;
BEGIN
  FOR c IN SELECT id FROM public.courses ORDER BY sort_order LOOP
    INSERT INTO public.modules (course_id, title, sort_order) VALUES (c.id, 'Module 1 — Getting Started', 1) RETURNING id INTO m1;
    INSERT INTO public.modules (course_id, title, sort_order) VALUES (c.id, 'Module 2 — Arabic Letters', 2) RETURNING id INTO m2;
    INSERT INTO public.modules (course_id, title, sort_order) VALUES (c.id, 'Module 3 — Numbers', 3) RETURNING id INTO m3;
    INSERT INTO public.modules (course_id, title, sort_order) VALUES (c.id, 'Module 4 — Speaking', 4) RETURNING id INTO m4;

    INSERT INTO public.lessons (module_id, title, description, duration, is_free, video_url, sort_order) VALUES
      (m1, 'Lesson 1 — Introduction to Arabic', 'A gentle welcome to the Arabic language and how these lessons work.', '8 min', true, 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 1),
      (m1, 'Lesson 2 — Arabic Greetings', 'Learn to greet people warmly in Arabic.', '11 min', false, NULL, 2),
      (m2, 'Lesson 3 — Alif', 'The first letter and its sound.', '9 min', false, NULL, 1),
      (m2, 'Lesson 4 — Baa', 'Writing and pronouncing Baa.', '9 min', false, NULL, 2),
      (m2, 'Lesson 5 — Taa', 'Writing and pronouncing Taa.', '10 min', false, NULL, 3),
      (m3, 'Lesson 6 — Numbers 1–10', 'Count from one to ten in Arabic.', '12 min', false, NULL, 1),
      (m3, 'Lesson 7 — Counting Practice', 'Practice counting everyday objects.', '10 min', false, NULL, 2),
      (m4, 'Lesson 8 — Basic Arabic Words', 'Useful words for daily life.', '13 min', false, NULL, 1),
      (m4, 'Lesson 9 — Simple Sentences', 'Put words together into sentences.', '12 min', false, NULL, 2),
      (m4, 'Lesson 10 — Conversation Practice', 'A friendly first conversation.', '14 min', false, NULL, 3);
  END LOOP;
END $$;