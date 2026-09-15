// src/lib/blog-data.ts
// SEO-targeted blog posts for ArabiyatLearn
// All posts are authored by Ustadha Arabiyat

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Rich HTML-safe markdown content
  category: string;
  tags: string[];
  publishedAt: string; // ISO date
  updatedAt: string;
  readingTime: string;
  author: string;
  authorTitle: string;
  coverImage: string; // placeholder, can be swapped
  featured?: boolean;
};

export const blogCategories = [
  "All",
  "Learning Tips",
  "Arabic for Kids",
  "Parent Guide",
  "Methods & Tools",
  "Quran & Faith",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-teach-arabic-to-kids-at-home",
    title: "How to Teach Arabic to English-Speaking Kids at Home",
    excerpt:
      "Practical, proven strategies parents can start using today to help their English-speaking children learn Arabic — even without knowing the language themselves.",
    category: "Parent Guide",
    tags: ["arabic for kids", "home learning", "english speaking children", "arabic tips"],
    publishedAt: "2026-08-01",
    updatedAt: "2026-09-01",
    readingTime: "7 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/teach-arabic-home.jpg",
    featured: true,
    content: `
## The Challenge Parents Face

Many Muslim parents in English-speaking countries desperately want their children to learn Arabic, but face a huge obstacle: they don't speak Arabic themselves. You want your child to connect with the Quran, with their heritage, with their faith — but you don't know where to start.

The good news? You don't need to speak Arabic to help your child learn it.

## 1. Create a Consistent Learning Routine

Children thrive on routine. Set aside 20–30 minutes per day dedicated to Arabic. This consistency matters far more than long, sporadic sessions. Choose a time when your child is naturally alert — usually mid-morning or late afternoon.

**Practical tip:** Link Arabic time to something your child already loves. "After cartoons, we do our Arabic practice."

## 2. Start with the Alphabet, Not Grammar

Many parents make the mistake of wanting children to "speak Arabic" immediately. But Arabic has a unique script — children must first recognise letters before anything else makes sense. The Arabic alphabet has 28 letters, each with up to four different forms depending on their position in a word.

Begin with a few letters each week. Focus on recognition and sound first, writing second.

## 3. Use Visual and Audio Learning Together

Arabic is a phonetic language — words are (mostly) spelled exactly as they sound. This is actually great news for young learners! Use flashcards, songs, and recordings so children hear correct pronunciation alongside what they see.

Our courses combine visuals with Ustadha's voice so every lesson reinforces both skills simultaneously.

## 4. Keep It Joyful — Not Stressful

The number one reason children give up on Arabic is that it felt like a chore. Keep sessions short, celebrate small wins, and never force a resistant child into a lesson. A five-minute joyful session is worth more than a thirty-minute tearful one.

## 5. Hire a Qualified Teacher for the Foundation

Even one lesson per week with a patient, qualified Arabic teacher sets the phonetic foundation correctly. Once children can hear and reproduce sounds accurately, self-study becomes far more effective.

ArabiyatLearn offers 1-on-1 and small group live sessions specifically designed for English-speaking children. [Book a free demo](/contact) to see if it's right for your child.

## 6. Surround the Child with Arabic

Learning accelerates when the language appears naturally around the child:
- Play Islamic nasheeds and Arabic children's songs during car journeys
- Label objects at home with their Arabic names (باب = door, كتاب = book)
- Watch short Arabic children's videos on YouTube with Arabic subtitles
- Read simple Arabic picture books together at bedtime

## The Bottom Line

You don't need to be fluent in Arabic to raise an Arabic-speaking child. What you need is: **a consistent routine, the right teacher, and a home environment that normalises the language.** Start small, stay consistent, and celebrate every word your child learns.
    `.trim(),
  },
  {
    slug: "best-age-to-start-arabic-for-children",
    title: "The Best Age to Start Arabic Lessons for Children",
    excerpt:
      "Is 4 too young? Is 10 too old? We break down exactly what age is best to begin Arabic lessons — and what to focus on at each stage of a child's development.",
    category: "Arabic for Kids",
    tags: ["arabic lessons age", "when to start arabic", "arabic for toddlers", "arabic for beginners"],
    publishedAt: "2026-08-05",
    updatedAt: "2026-09-01",
    readingTime: "6 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/best-age-arabic.jpg",
    featured: true,
    content: `
## When Is the Right Time to Start?

Parents often ask: "My child is 5, is that too young? My child is 12, have we missed the window?"

The honest answer is: **any age is a good age to start**, but different ages call for different approaches.

## Ages 3–5: Exposure & Sound

At this age, children are in their "language sponge" phase — their brains are actively wiring themselves for phonetics. You won't teach them grammar, but you can:
- Introduce simple Arabic greetings (As-salamu Alaykum, Bismillah)
- Sing Arabic alphabet songs
- Name colours and numbers in Arabic through play

Don't expect reading or writing at this stage. Pure auditory exposure is enough.

## Ages 5–8: The Golden Window

This is widely considered the optimal window for introducing a second language formally. Children at this age:
- Are learning to read in their native language (making Arabic script a natural companion skill)
- Have longer attention spans than toddlers
- Can follow structured short lessons (15–20 minutes)

At ArabiyatLearn, our structured courses are primarily designed for this age group — starting with the alphabet and building to reading simple words and phrases.

## Ages 8–12: Structure and Progress

Children in this age group may not acquire Arabic as effortlessly as younger children, but they learn with more intentionality. They understand the "why" behind learning and can make meaningful progress with 2–3 lessons per week.

Tip: Frame Arabic around their faith identity. "Learning Arabic means you can understand your Salah" is deeply motivating for children who pray.

## Ages 12+: Teens and Adults Can Still Learn

It's a common myth that past puberty, language learning becomes impossible. It doesn't — it simply changes. Teenagers and adults learn differently: more consciously, with more grammar awareness, and with stronger reading skills.

A 14-year-old who has never studied Arabic can reach functional reading level in 12–18 months with dedicated practice.

## Our Recommendation

**Start as early as 4–5 years old with exposure and sound.** Begin structured lessons at **6–7 years old.** If you're starting later, don't be discouraged — meaningful progress is always possible.

[Book a free demo class](/contact) and we'll assess exactly where your child is and create a plan that's right for them.
    `.trim(),
  },
  {
    slug: "arabic-alphabet-for-kids-complete-guide",
    title: "Arabic Alphabet for Kids: A Complete Guide for Parents",
    excerpt:
      "Everything a parent needs to know about the Arabic alphabet — the 28 letters, why it's different, the four forms of each letter, and how to help your child master it step by step.",
    category: "Arabic for Kids",
    tags: ["arabic alphabet", "arabic letters kids", "arabic script", "learn arabic alphabet"],
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-01",
    readingTime: "8 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/arabic-alphabet-guide.jpg",
    content: `
## Why the Arabic Alphabet Feels Difficult

For English-speaking families, the Arabic alphabet looks like an impenetrable wall of curves and dots. Parents worry their children will never crack it. But here's a reassuring truth: the Arabic alphabet is actually very systematic — and children often learn it faster than adults expect.

## The Basics: 28 Letters, Right to Left

Arabic has 28 letters, compared to English's 26. It's written from **right to left**, which is the first thing children need to get used to. This usually clicks within a week of consistent practice.

Unlike English, Arabic letters are almost always pronounced consistently — what you see is (mostly) what you say. This makes it significantly easier to learn to read once the letters are known.

## The Four Forms of Each Letter

Here's where Arabic differs most from English: almost every Arabic letter changes its shape depending on where it appears in a word:
1. **Isolated** — the letter standing alone
2. **Initial** — at the beginning of a word
3. **Medial** — in the middle of a word
4. **Final** — at the end of a word

This might sound daunting, but children absorb these naturally through reading practice. Most letters have only slight variations across the four forms.

## The Dots: The Key to Reading Arabic

Many Arabic letters are distinguished **only by the number and position of dots** above or below the letter. For example:
- ب (Baa) — one dot below
- ت (Taa) — two dots above
- ث (Thaa) — three dots above

Teaching children to pay attention to dots from the very beginning is critical.

## Short and Long Vowels

Arabic has three short vowels (Fatha, Kasra, Damma) written as small marks above or below letters. In children's books and the Quran, these vowel marks (harakat) are usually printed — making it much easier to read correctly. In everyday adult Arabic text, they are often omitted.

**Start children with fully-voweled text** (like the Quran or Arabic children's books). Move to unvoweled text only once they're confident with letter recognition.

## A Realistic Timeline for Children

- **2–3 weeks:** Recognise all 28 letters in isolated form
- **4–6 weeks:** Read letters in initial, medial and final position
- **6–10 weeks:** Begin sounding out simple three-letter words
- **3–6 months:** Reading simple Arabic sentences with vowel marks

These timelines assume 20–30 minutes of daily practice with a qualified teacher.

## How ArabiyatLearn Teaches the Alphabet

Our Arabic Alphabet & Phonics Playground course takes children through the 28 letters in a logical sequence — starting with letters that are easier to distinguish, then adding more complex ones. Each letter is introduced with:
- A visual illustration
- Ustadha's pronunciation recording
- Writing practice
- A mini-story using words with that letter

[See the full course](/courses/arabic-alphabet-phonics) — or [book a free trial class](/contact) to see how it works live.
    `.trim(),
  },
  {
    slug: "online-arabic-classes-vs-textbooks-kids",
    title: "Why Online Arabic Classes Work Better Than Textbooks for Young Learners",
    excerpt:
      "Textbooks alone rarely succeed for children learning Arabic. Here's the science behind why live, interactive classes — especially online — produce dramatically better outcomes for young learners.",
    category: "Methods & Tools",
    tags: ["online arabic classes", "arabic textbooks", "arabic learning methods", "arabic for children"],
    publishedAt: "2026-08-15",
    updatedAt: "2026-09-01",
    readingTime: "5 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/online-classes-vs-textbooks.jpg",
    content: `
## The Textbook Problem

Walk into any Islamic bookshop and you'll find Arabic textbooks for children. Many families buy them with great enthusiasm — and abandon them within three months.

Why? Because Arabic is a **spoken and heard** language before it's a read language. Textbooks are silent. They can't correct your child's pronunciation. They can't respond when a child is confused. They can't make a letter come alive.

## What Actually Makes Children Learn Languages

Research in child language acquisition consistently shows that children learn languages best through:
1. **Comprehensible input** — hearing language that's just slightly above their current level
2. **Interaction** — back-and-forth conversation with a real speaker
3. **Immediate feedback** — correction in the moment, not days later
4. **Emotional safety** — a supportive relationship with the teacher

None of these happen with a textbook.

## Why Live Online Classes Win

A live video class with a qualified teacher provides everything a textbook cannot:
- **Real pronunciation modelling** — children hear correct Arabic sounds from a native or trained teacher
- **Real-time correction** — mispronunciations are gently fixed the moment they happen
- **Interaction** — the teacher asks questions, children respond, vocabulary embeds naturally
- **Relationship** — children who like their teacher actually look forward to lessons

## The Convenience of Online Learning

Families used to think "live class" meant commuting to a mosque or community centre. Online learning eliminates that entirely. Our students join from their bedroom, living room, or kitchen — wearing pyjamas if they want. No travel time means lessons actually happen consistently.

Consistent lessons produce consistent progress.

## When Textbooks Are Useful

This isn't an argument against all written materials. Once children have a foundation in sounds and can read Arabic, workbooks and writing practice sheets are genuinely valuable. They reinforce what's been taught in live classes.

The sequence matters: **live classes first, written practice to reinforce.**

## What Parents Tell Us

*"We tried three different Arabic books. Nothing stuck. After six weeks with ArabiyatLearn, our daughter is reading Arabic words."* — Parent of a 7-year-old student.

[Book a free demo class](/contact) to experience the difference for yourself.
    `.trim(),
  },
  {
    slug: "10-arabic-words-every-child-should-learn-first",
    title: "10 Simple Arabic Words Every Child Should Learn First",
    excerpt:
      "Before your child learns a single letter of the Arabic alphabet, these 10 words will build their confidence, deepen their connection to Islam, and make Arabic feel welcoming.",
    category: "Learning Tips",
    tags: ["arabic words for kids", "first arabic words", "arabic vocabulary", "easy arabic"],
    publishedAt: "2026-08-20",
    updatedAt: "2026-09-01",
    readingTime: "4 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/first-arabic-words.jpg",
    content: `
## Start with Words That Matter

The best Arabic words to teach children first are not random vocabulary items — they're words that already appear naturally in your child's life: in Salah, in Islamic greetings, at home.

These words build a bridge between your child's existing world and Arabic.

## The 10 Essential First Words

### 1. مَرْحَبًا — Marhaban (Hello / Welcome)
The universal Arabic greeting. Teach it alongside As-salamu Alaykum (السَّلَامُ عَلَيْكُمْ) for a double dose of warmth.

### 2. شُكْرًا — Shukran (Thank you)
One of the most-used words across all Arabic-speaking countries. Children can start using this immediately in daily life.

### 3. نَعَمْ — Na'am (Yes)
Simple, essential, universal.

### 4. لَا — La (No)
Equally essential, and usually the first word children want to learn in any language!

### 5. مَاء — Ma' (Water)
A daily essential. Helps children see that Arabic isn't abstract — it names real things in their world.

### 6. خُبْز — Khubz (Bread)
Food vocabulary embeds quickly because children are emotionally connected to it.

### 7. أُمّ — Umm (Mum / Mother)
Arabic for "mother" resonates immediately with children. It's also a root word that appears throughout Arabic vocabulary.

### 8. أَبّ / أَبُو — Abb / Abu (Dad / Father)
Again, family vocabulary is deeply motivating for young children.

### 9. كِتَاب — Kitab (Book)
A child's most familiar school object — and one of the most important root words in Arabic.

### 10. اللّٰه — Allah
Many Muslim children already know this word deeply. Connecting it to Arabic script is a meaningful moment that often sparks a child's genuine desire to learn more.

## How to Teach These Words

Don't present them as a flashcard list to memorise. Instead:
- Use them naturally in daily conversation ("Shall we have some ماء?")
- Write them on Post-it notes and stick them to objects around the house
- Ask your child to teach these words to a younger sibling or toy — teaching reinforces memory

## The Next Step

Once your child knows these 10 words, they're ready for the Arabic alphabet — because now they know what reading will unlock for them.

[Explore our beginner courses](/courses/) — or [book a free demo](/contact) to start your child's Arabic journey properly.
    `.trim(),
  },
  {
    slug: "how-to-make-arabic-fun-for-kids",
    title: "How to Make Arabic Fun for Kids Who Don't Want to Study",
    excerpt:
      "Tried everything and your child still refuses Arabic lessons? These evidence-based, teacher-approved strategies transform resistant learners into curious ones — without battles.",
    category: "Parent Guide",
    tags: ["arabic motivation kids", "arabic fun activities", "reluctant arabic learners", "arabic games"],
    publishedAt: "2026-08-25",
    updatedAt: "2026-09-01",
    readingTime: "6 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/arabic-fun-kids.jpg",
    content: `
## The Resistance Problem

"My child cries every time I suggest Arabic." "She says it's too hard." "He refuses to open the book."

This is the most common problem parents bring to me. And here's what I've learned after years of teaching: **the problem is almost never the child's ability.** It's the approach.

## Why Children Resist

Children resist Arabic (or any subject) for a few clear reasons:
1. **It feels like punishment** — another "work" obligation on top of school homework
2. **Previous experiences felt overwhelming** — they tried and failed, or were corrected harshly
3. **There's no visible reward** — they can't see what Arabic will give them
4. **It's abstract** — just symbols on a page, disconnected from anything real

## Strategy 1: Remove the "Lesson" Frame

Stop calling it "Arabic lesson time." Instead, try:
- "Arabic game time"
- "Let's do our secret language practice"
- "Quran skill building"

The reframe works because it removes the schoolwork association that triggers resistance.

## Strategy 2: Start with Their Interests

Does your child love dinosaurs? Find the Arabic words for dinosaur (ديناصور — dinasur) and the words around it. Love football? Learn football vocabulary. The language is just a vehicle — the content is what they care about.

In our lessons at ArabiyatLearn, Ustadha carefully adapts conversations to each child's interests. A child who talks about Minecraft will learn Arabic *through* Minecraft conversations.

## Strategy 3: Make It Social

Children who resist solitary study often thrive in small groups. Even one study partner — a sibling or friend — transforms the experience. Small group classes (2–4 children) are often better than 1-on-1 for reluctant learners.

## Strategy 4: Connect It to Faith Identity

For children in Muslim families, a powerful motivation is: "Arabic is the language of Quran. When you know Arabic, Salah comes alive for you — you'll understand every word you say to Allah."

This isn't pressure — it's meaning. Meaning drives motivation.

## Strategy 5: Celebrate Micro-Progress

"You just read an Arabic word" is huge. Celebrate it like it's huge. Certificate, sticker chart, a special treat — whatever matters to your child. The celebrating builds the identity: "I am someone who learns Arabic."

## Strategy 6: Find the Right Teacher

The single biggest factor in a reluctant learner's transformation is finding a teacher they **like**. A patient, warm, playful teacher who doesn't make children feel stupid for getting things wrong changes everything.

This is why we always offer a free demo class — so your child meets Ustadha before committing to anything. [Book yours here](/contact).
    `.trim(),
  },
  {
    slug: "quran-arabic-vs-modern-arabic-for-children",
    title: "Quranic Arabic vs. Modern Arabic: Which Should Your Child Learn First?",
    excerpt:
      "Parents often face this confusing choice: Quranic Arabic (Classical) or Modern Standard Arabic (MSA)? This guide explains the differences clearly and gives a definitive recommendation for children.",
    category: "Quran & Faith",
    tags: ["quranic arabic", "modern standard arabic", "arabic for muslims", "arabic children quran"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-05",
    readingTime: "7 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/quran-arabic-vs-modern.jpg",
    featured: true,
    content: `
## Understanding the Question

Arabic is not one language — it's a family of closely related languages and dialects. The major divisions that parents hear about are:

1. **Quranic Arabic (Classical Arabic / Fusha)** — the language of the Quran and classical Islamic texts, unchanged for 1,400 years
2. **Modern Standard Arabic (MSA / Fusha al-Haditha)** — the formal written Arabic used in news, education and formal writing across Arab countries today
3. **Colloquial Arabic** — regional spoken dialects (Egyptian, Levantine, Gulf, Moroccan, etc.) that vary dramatically between countries

For Muslim families in English-speaking countries, the choice is almost always between #1 and #2.

## The Differences

Quranic Arabic and MSA share the same alphabet, most of the same grammar, and a huge amount of vocabulary. They are closely related — reading one gives you significant access to the other.

The key differences:
- **Vocabulary:** Quranic Arabic uses some archaic words not found in MSA; MSA has modern coinages for technology and concepts that didn't exist in classical times
- **Grammar:** Quranic Arabic grammar is more complex and precise; MSA simplifies some structures
- **Style:** Quranic Arabic is poetic, dense and often requires deep knowledge to fully understand; MSA is more direct

## The Definitive Recommendation for Muslim Families

**For Muslim children, start with Quranic Arabic.**

Here's why:

### 1. Motivation Through Salah
If your child prays five times daily, they recite Quranic Arabic every single day. Understanding those words is an immediate, daily reward that MSA doesn't provide.

### 2. The Foundation Transfers
A child who learns Quranic Arabic has direct access to MSA. The reverse is also true but less reliable — MSA sometimes teaches vocabulary and structures that don't appear in Quran.

### 3. Spiritual Connection
The Quran is the primary text of Islam. Helping a child connect to it through understanding its language is an act of worship in itself, according to many Islamic scholars.

### 4. Practical Tajweed
Children learning to read Quranic Arabic naturally also learn Tajweed (correct Quranic recitation rules). This is a skill many Muslim families desperately want for their children.

## What ArabiyatLearn Teaches

Our curriculum begins with Arabic alphabet and phonics — foundational to both Quranic and Modern Arabic. We then move into reading and understanding Quranic vocabulary, building a foundation that naturally supports MSA learning later.

Our Quranic Arabic Basics & Reading Fluency course is specifically designed for children who want to understand Salah and read the Quran confidently.

[Explore the course](/courses/quranic-arabic-basics) — or [book a free demo](/contact).
    `.trim(),
  },
  {
    slug: "arabic-apps-vs-live-classes-what-works",
    title: "Arabic Learning Apps vs. Live Classes: What Actually Works for Kids",
    excerpt:
      "Duolingo, Memorise, Arabee — there are dozens of Arabic learning apps. We give you an honest, teacher's perspective on when apps help, when they fail, and why nothing replaces a real teacher.",
    category: "Methods & Tools",
    tags: ["arabic learning apps", "duolingo arabic", "arabic app review", "arabic live classes children"],
    publishedAt: "2026-09-05",
    updatedAt: "2026-09-08",
    readingTime: "6 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/arabic-apps-vs-classes.jpg",
    content: `
## The Honest Answer About Arabic Apps

Before I share my perspective as a teacher, let me say this: I believe apps have a place in Arabic learning. But they are **supplements, not substitutes.**

## What Apps Do Well

### Gamification and Habit Building
Apps like Duolingo are brilliantly designed to build daily habits. The streak system, the rewards, the short sessions — they work to keep children (and adults) logging in daily.

### Vocabulary Reinforcement
Once vocabulary has been introduced by a teacher, apps are great for spaced repetition — showing you words at the right interval to cement them in long-term memory.

### Accessibility
Apps are always there. No scheduling, no internet connection requirements (for downloaded content), no waiting for lesson day. For busy families, this flexibility matters.

## Where Apps Fail for Children

### Pronunciation Without Feedback
Arabic has sounds that don't exist in English — letters like ح (a deep, breathy H), غ (a sound from the back of the throat), ع (a unique Arabic sound with no English equivalent). Apps cannot reliably teach these sounds because they can't **hear** your child and correct them.

Children who learn only from apps often develop incorrect pronunciation habits that take months to unlearn.

### No Real Interaction
Language acquisition research is clear: children learn languages through interaction, not passive consumption. Apps present content; they don't converse.

### Limited Quranic Content
Most mainstream apps teach Modern Standard Arabic or Egyptian dialect. For Muslim families wanting Quranic Arabic, options are limited and often shallow.

### Attention and Distraction
For young children, a phone or tablet is also a portal to YouTube, games, and social media. Keeping focused on an Arabic app requires significant parental monitoring.

## The Ideal Combination

**Live teacher-led classes 2–3 times per week + an app for daily practice on off-days.**

The teacher handles:
- Pronunciation correction
- Explanation of concepts the child doesn't understand
- Motivation and relationship (children who like their teacher practise more)
- Curriculum sequencing

The app handles:
- Vocabulary drilling
- Daily habit maintenance
- Fun reinforcement

## Our Recommendation

Start with a qualified teacher. Once your child has a solid phonetic foundation (typically 2–3 months), add an app as a daily supplement.

[Book a free demo class at ArabiyatLearn](/contact) — we'll assess exactly where your child is and recommend the best approach.
    `.trim(),
  },
  {
    slug: "how-long-does-it-take-a-child-to-learn-arabic",
    title: "How Long Does It Take a Child to Learn Arabic?",
    excerpt:
      "The question every parent asks — with a straight, honest answer. We break down realistic timelines for different levels of Arabic proficiency and what factors make the biggest difference.",
    category: "Learning Tips",
    tags: ["how long to learn arabic", "arabic timeline children", "arabic fluency kids", "arabic progress"],
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-10",
    readingTime: "5 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/how-long-arabic.jpg",
    content: `
## The Honest Answer

"How long will it take?" is the most common question parents ask me. The answer depends on what you mean by "learn Arabic" — but here are realistic benchmarks.

## Level 1: Read the Arabic Alphabet

**Timeline: 4–8 weeks** (for children aged 6–10, practising 20 min/day)

This means: recognising all 28 letters, knowing their sounds, and beginning to sound out simple words with vowel marks.

This is the absolute foundation — nothing else is possible without it.

## Level 2: Read Simple Arabic Words and Phrases

**Timeline: 3–6 months** from Level 1

This means: fluently reading short Arabic words with vowel marks (like those in children's books and the Quran with harakat), beginning to understand common vocabulary.

## Level 3: Reading Quran with Tajweed (Foundational Level)

**Timeline: 6–18 months** from Level 2

This means: reading Quranic text at a basic to intermediate pace with correct pronunciation rules. Understanding the words is a separate (longer) journey.

## Level 4: Conversational Arabic (Asking and Answering Simple Questions)

**Timeline: 1–2 years** of consistent instruction

This means: holding simple conversations — greetings, asking for things, describing family members, talking about daily routines.

## Level 5: Understanding Quran Without Translation

**Timeline: 3–5+ years** of serious study

This is a significant goal requiring dedicated vocabulary and grammar study over multiple years. Achievable, absolutely — but not a short journey.

## The Factors That Matter Most

### 1. Consistency
A child who studies 20 minutes every day will learn in 6 months what a child studying once a week learns in 3 years.

### 2. Age of Starting
Children who start between 5–8 typically absorb pronunciation and phonics significantly faster than those starting at 12+.

### 3. Teacher Quality
A skilled, patient teacher who explains concepts clearly and maintains a child's motivation cuts learning time dramatically. A poor teacher (or no teacher) dramatically extends it.

### 4. Home Environment
Families that use Arabic phrases at home, play Arabic audio, and normalise the language accelerate their children's learning noticeably.

## A Realistic 12-Month Plan

With ArabiyatLearn's structured programme and 3 classes per week:
- **Month 1–2:** Alphabet mastered, beginning to read simple words
- **Month 3–6:** Reading simple Quranic text, basic vocabulary building
- **Month 6–12:** Reading confidently with Tajweed, beginning conversations

[Start your child's Arabic journey today](/contact) — and let's set realistic goals together.
    `.trim(),
  },
  {
    slug: "what-to-expect-in-childs-first-arabic-class",
    title: "What to Expect in Your Child's First Arabic Class",
    excerpt:
      "First class jitters? We walk you through exactly what happens in a first Arabic lesson at ArabiyatLearn — so both you and your child know what to look forward to.",
    category: "Parent Guide",
    tags: ["first arabic class", "arabic class for kids", "arabic demo class", "what to expect arabic"],
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    readingTime: "4 min read",
    author: "Ustadha Arabiyat",
    authorTitle: "Certified Arabic Teacher",
    coverImage: "/blog/first-arabic-class.jpg",
    content: `
## Before the First Class: What to Prepare

You don't need to prepare much. Seriously.

Make sure your child has:
- A device with a working camera and microphone (tablet, laptop or desktop)
- A stable internet connection
- A quiet space for 30–45 minutes
- A notebook and pencil (for writing practice, if they're old enough)

That's it. No prior knowledge of Arabic is needed — or expected.

## The First 5 Minutes: Meeting Ustadha

The first class always begins with introductions and a chat. Ustadha will ask your child:
- What's your name?
- How old are you?
- Do you know any Arabic words already?
- What do you like to do?

This isn't small talk — it's assessment and rapport-building. Understanding what a child already knows and what they enjoy is essential to teaching them effectively.

Children who are shy at first almost always open up within the first 10 minutes when they realise Ustadha is warm, patient and genuinely interested in them.

## The First Assessment

Ustadha will gently test what your child already knows about Arabic:
- Can they recognise any letters?
- Can they write any letters?
- What Arabic they might have picked up from Islamic school or Quran classes?

This is never a "test" in the scary sense — it's a gentle conversation. The goal is simply to know where to start.

## The First Lesson Content

Based on the assessment, Ustadha will begin at the right point. For most beginners this means:
1. Introduction to what Arabic is and why it's special
2. The first 2–3 letters of the alphabet (usually Alif, Baa, Taa)
3. The sounds each letter makes
4. Simple writing practice (tracing the letters)

Children leave their first class having learned something real — and that feeling of achievement is carefully engineered to make them want to come back.

## For Parents: What You'll Notice

You'll see your child:
- Be more relaxed than you expected
- Light up when they successfully identify a letter
- Use what they learned almost immediately ("Mama, that's an Arabic letter!")

## After the Class: How to Reinforce It

Do a quick 5-minute review the next day:
- Ask your child to show you the letters they learned
- Write them together on a piece of paper
- Celebrate the fact that they can read Arabic letters

This review session doubles retention without any significant time investment.

## Ready to Book Your Child's First Class?

Every journey with ArabiyatLearn begins with a free demo lesson. No pressure, no commitment — just a chance for your child to meet Ustadha and experience what learning Arabic can feel like.

[Book a free demo class today](/contact) — we'd love to welcome your child.
    `.trim(),
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter((p) => p.featured);

export const getPostsByCategory = (category: BlogCategory): BlogPost[] =>
  category === "All" ? blogPosts : blogPosts.filter((p) => p.category === category);

export const getRecentPosts = (count = 3): BlogPost[] =>
  [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, count);
