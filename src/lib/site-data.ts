import thumb1 from "@/assets/course-thumb-1.jpg";
import thumb2 from "@/assets/course-thumb-2.jpg";
import thumb3 from "@/assets/course-thumb-3.jpg";
import thumb4 from "@/assets/course-thumb-4.jpg";
import thumb5 from "@/assets/course-thumb-5.jpg";
import thumb6 from "@/assets/course-thumb-6.jpg";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  free: boolean;
  videoUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  level: "Beginner" | "Intermediate";
  category: "Beginner" | "Speaking" | "Vocabulary" | "Numbers" | "Alphabet" | "Kids";
  lessons: number;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  language: string;
  teacher: string;
  featured?: boolean;
  outcomes: string[];
  modules: Module[];
};

const baseModules: Module[] = [
  {
    id: "m1",
    title: "Module 1 — Getting Started",
    lessons: [
      {
        id: "l1",
        title: "Lesson 1 — Introduction to Arabic",
        description: "A gentle welcome to the Arabic language and how these lessons work.",
        duration: "8 min",
        free: true,
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: "l2",
        title: "Lesson 2 — Arabic Greetings",
        description: "Learn to greet people warmly in Arabic.",
        duration: "11 min",
        free: false,
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2 — Arabic Letters",
    lessons: [
      { id: "l3", title: "Lesson 3 — Alif", description: "The first letter and its sound.", duration: "9 min", free: false },
      { id: "l4", title: "Lesson 4 — Baa", description: "Writing and pronouncing Baa.", duration: "9 min", free: false },
      { id: "l5", title: "Lesson 5 — Taa", description: "Writing and pronouncing Taa.", duration: "10 min", free: false },
    ],
  },
  {
    id: "m3",
    title: "Module 3 — Numbers",
    lessons: [
      { id: "l6", title: "Lesson 6 — Numbers 1–10", description: "Count from one to ten in Arabic.", duration: "12 min", free: false },
      { id: "l7", title: "Lesson 7 — Counting Practice", description: "Practice counting everyday objects.", duration: "10 min", free: false },
    ],
  },
  {
    id: "m4",
    title: "Module 4 — Speaking",
    lessons: [
      { id: "l8", title: "Lesson 8 — Basic Arabic Words", description: "Useful words for daily life.", duration: "13 min", free: false },
      { id: "l9", title: "Lesson 9 — Simple Sentences", description: "Put words together into sentences.", duration: "12 min", free: false },
      { id: "l10", title: "Lesson 10 — Conversation Practice", description: "A friendly first conversation.", duration: "14 min", free: false },
    ],
  },
];

const outcomes = [
  "Recognise and pronounce Arabic letters correctly",
  "Count confidently from 1 to 10 in Arabic",
  "Use everyday Arabic words at home",
  "Understand simple Arabic sentences",
  "Hold a short beginner conversation",
  "Build a strong foundation for Qur'an reading later",
];

export const courses: Course[] = [
  {
    slug: "beginner-arabic-for-kids",
    title: "Beginner Arabic for Kids",
    tagline: "BEST FOR BEGINNERS",
    description:
      "Start your child's Arabic journey with simple lessons covering letters, pronunciation, numbers, vocabulary and everyday speaking.",
    thumbnail: thumb1,
    level: "Beginner",
    category: "Beginner",
    lessons: 32,
    duration: "6+ hours",
    price: 59,
    rating: 4.9,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    featured: true,
    outcomes,
    modules: baseModules,
  },
  {
    slug: "arabic-alphabet-for-kids",
    title: "Arabic Alphabet for Kids",
    description: "Learn all 28 Arabic letters, their shapes and their correct sounds, one step at a time.",
    tagline: "",
    thumbnail: thumb2,
    level: "Beginner",
    category: "Alphabet",
    lessons: 20,
    duration: "3.5 hours",
    price: 39,
    rating: 4.8,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    outcomes,
    modules: baseModules,
  },
  {
    slug: "arabic-numbers-and-counting",
    title: "Arabic Numbers & Counting",
    description: "Count in Arabic with simple, playful examples children can use straight away.",
    tagline: "",
    thumbnail: thumb3,
    level: "Beginner",
    category: "Numbers",
    lessons: 14,
    duration: "2.5 hours",
    price: 29,
    rating: 4.8,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    outcomes,
    modules: baseModules,
  },
  {
    slug: "beginner-arabic-speaking",
    title: "Beginner Arabic Speaking",
    description: "Practice speaking Arabic out loud with guided repetition and gentle correction.",
    tagline: "",
    thumbnail: thumb4,
    level: "Beginner",
    category: "Speaking",
    lessons: 24,
    duration: "4 hours",
    price: 49,
    rating: 4.9,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    outcomes,
    modules: baseModules,
  },
  {
    slug: "everyday-arabic-vocabulary",
    title: "Everyday Arabic Vocabulary",
    description: "Family, food, colours, school and home — the words children use every single day.",
    tagline: "",
    thumbnail: thumb5,
    level: "Beginner",
    category: "Vocabulary",
    lessons: 18,
    duration: "3 hours",
    price: 35,
    rating: 4.7,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    outcomes,
    modules: baseModules,
  },
  {
    slug: "basic-arabic-conversations",
    title: "Basic Arabic Conversations",
    description: "Short, friendly conversations that build real confidence in young learners.",
    tagline: "",
    thumbnail: thumb6,
    level: "Beginner",
    category: "Kids",
    lessons: 16,
    duration: "2.5 hours",
    price: 45,
    rating: 4.8,
    reviews: 0,
    language: "English + Arabic",
    teacher: "Ustadha Arabiyat",
    outcomes,
    modules: baseModules,
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const courseFilters = ["All", "Beginner", "Speaking", "Vocabulary", "Numbers", "Alphabet", "Kids"] as const;

export const learningTopics = [
  { title: "Arabic Alphabet", body: "Learn Arabic letters and their correct pronunciation.", icon: "letters" },
  { title: "Numbers & Counting", body: "Learn how to count in Arabic with simple examples.", icon: "numbers" },
  { title: "Everyday Vocabulary", body: "Learn useful Arabic words children can use every day.", icon: "book" },
  { title: "Speaking Arabic", body: "Practice simple Arabic sentences and conversations.", icon: "speak" },
  { title: "Pronunciation", body: "Learn how Arabic words should actually sound.", icon: "sound" },
  { title: "Beginner Conversations", body: "Build confidence through simple conversations.", icon: "kids" },
];

export const howItWorks = [
  { step: "01", title: "Choose a Course", body: "Find the Arabic course that matches your child's level." },
  { step: "02", title: "Enroll", body: "Purchase the course securely online." },
  { step: "03", title: "Watch & Practice", body: "Watch recorded lessons and practice along with the teacher." },
  { step: "04", title: "Learn at Your Own Pace", body: "Children can pause, replay and revisit lessons whenever they need." },
];

export const parentReasons = [
  { emoji: "👩‍🏫", title: "Teacher-Led Lessons", body: "Lessons are taught by an experienced Arabic teacher." },
  { emoji: "🎥", title: "Recorded Classes", body: "Watch lessons anytime from anywhere." },
  { emoji: "🔁", title: "Replay Anytime", body: "Children can repeat difficult lessons as many times as needed." },
  { emoji: "🧒", title: "Designed for Kids", body: "Simple explanations and engaging activities." },
  { emoji: "🌍", title: "English-Friendly", body: "Arabic is explained in a way English-speaking children can understand." },
  { emoji: "🔐", title: "Safe Learning Environment", body: "A trusted environment designed specifically for children and families." },
];

export const faqs = [
  {
    q: "What age group are the courses for?",
    a: "Courses are designed primarily for beginner children and are organised by level, so you can pick the right starting point for your child's age and ability.",
  },
  { q: "Does my child need to know Arabic already?", a: "No. Beginner courses start from the absolute basics." },
  { q: "Are the lessons live or recorded?", a: "The main courses are recorded lessons that students can watch anytime." },
  { q: "Can my child replay lessons?", a: "Yes — lessons can be replayed as many times as needed." },
  {
    q: "Are lessons taught in English?",
    a: "Arabic is taught with English support so English-speaking children can fully understand the lessons.",
  },
  { q: "How long do courses take?", a: "There is no deadline. Students learn at their own pace with lifetime access." },
  { q: "Can parents track progress?", a: "Yes, through the parent dashboard you can see lessons completed and learning time." },
];

export const testimonials = [
  { text: "My daughter really enjoys the lessons and has started using Arabic words at home.", author: "Parent" },
  { text: "The lessons are calm and clear. My son can replay anything he finds tricky.", author: "Parent" },
  { text: "Finally an Arabic course that explains things in English my child understands.", author: "Parent" },
];

export const resources = [
  { category: "Arabic Worksheets", title: "Arabic Numbers 1–10", body: "A printable worksheet for practising Arabic numerals." },
  { category: "Vocabulary", title: "My First 50 Arabic Words", body: "Everyday words with English meaning and pronunciation." },
  { category: "Numbers", title: "Counting Practice Sheet", body: "Count and write Arabic numbers with simple pictures." },
  { category: "Flashcards", title: "Arabic Alphabet Flashcards", body: "Printable letter cards with correct sounds." },
  { category: "Practice Activities", title: "Greetings Role-Play Cards", body: "Fun activity cards for practising greetings at home." },
  { category: "Vocabulary", title: "Family Words in Arabic", body: "Mother, father, brother, sister and more." },
];

export const resourceCategories = ["All", "Arabic Worksheets", "Vocabulary", "Numbers", "Flashcards", "Practice Activities"];

export const practiceWords = [
  { arabic: "مَرْحَبًا", roman: "Marhaban", english: "Hello" },
  { arabic: "شُكْرًا", roman: "Shukran", english: "Thank you" },
  { arabic: "مَعَ السَّلَامَة", roman: "Ma'a as-salama", english: "Goodbye" },
];
