# noexcuses. v2 — from solo 30-day PWA to an ongoing social challenge platform

*Draft PRD — for discussion, not yet scoped into build phases.*

## 1. Why change anything

Today `noexcuses` is a single-player, single-cycle, local-only PWA: one person, one 30-day wheel, one phone, no accounts, no backend. It's great at what it does (the spin ritual, the "no re-spin, this is the workout" honesty, the mystery concealment) but it can't do the things you're now asking for:

- run it again and again, cycle after cycle, and see your history across cycles
- have friends on it — see what they did, comment, cheer them on
- build a *different* wheel (mindfulness, creative, nutrition, whatever) instead of just this fitness one
- let other people build their own wheel and share it as a template
- log in, so progress lives somewhere other than one phone's `localStorage`

That's a real platform, not a static site. This doc lays out what that platform is, borrowing visual language from the reference screens you sent, without copying them outright.

## 2. Design language pulled from your references

- **Bold, flat, saturated color-blocked cards** instead of subtle gradients — each card (challenge, plan item, stat) gets its own solid hero color, high-contrast black type on top.
- **Day-strip selector**: a horizontal row of pill-shaped day buttons (Sun–Sat) with a filled/inverted pill for "today" — good fit for jumping around *within* a challenge's calendar instead of only scrolling a flat list.
- **Calendar heat-view for history**: a month grid where each day is shaded by activity intensity/completion, tap a day to drill into that day's detail (photos, notes) — this replaces "scroll a long list" with "see your month at a glance," and is a much better fit now that people will run *many* cycles over time.
- **Duo card layout for "today's plan"**: two cards side by side (e.g. today's activity + a secondary stat/social card) rather than one full-width block.
- **Pill-shaped bottom nav** with a circular white "active" bubble around the current tab icon.
- **Onboarding**: one idea per screen, full-bleed solid color, big rounded headline, single primary CTA, secondary "already have an account" link, social auth buttons (Google/Apple) up top of the credentials screen.
- **Avatar stacks** ("+4" overflow bubble) to show at-a-glance who else is in on a challenge — directly useful for group challenges and friend activity.

None of the reference art assets get reused directly — we build our own icon/illustration set in the existing `noexcuses` brand (the film-grain/vignette dark editorial look), just borrowing the *layout patterns* above.

## 3. Feature areas

### A. Accounts & profiles
- Email/password + Google + Apple sign-in
- Profile: avatar, handle, bio, join date
- Public stats: challenges completed, current streak, longest streak, total days crossed off
- Privacy setting per profile: public / friends-only / private

### B. Challenges as a first-class, repeatable object
Today "the wheel" is hardcoded. In v2, a **Challenge** is data:
- name, duration (e.g. 21/30/60/90 days), category, cover art, list of activities (the wedges), visibility (private / friends / public template)
- a user can run the *same* challenge multiple times (new cycle = new run, old runs kept in history)
- a user can run *multiple challenges concurrently* (e.g. a fitness wheel and a creativity wheel at once) if we want to allow that — worth deciding, see open questions

### C. Template gallery
Starter templates to seed the library (style/tone should stay editable per user):

| Template | Duration | Category | Concept |
|---|---|---|---|
| No Excuses | 30 days | Fitness | the current wheel — hill sprints, carries, mystery runs |
| Reset 21 | 21 days | Habit | short habit-formation cycle, lighter daily lift |
| Strength Build 60 | 60 days | Fitness | progressive lifting-focused wedges |
| Stillness | 30 days | Mindfulness/Recovery | breathwork, yoga, journaling, cold exposure wedges |
| Duo Challenge | 30 days | Social | every wedge is a two-person activity, built for a friend pair |
| Office Wellness | 21 days | Team | lunchtime-friendly, low-equipment, built for a workplace group |
| Creative Spark | 30 days | Creativity | writing/drawing/music prompts instead of workouts |
| Bucket List Outdoors | 30 days | Adventure | one outdoor "must-do" per wedge, region-agnostic |
| Nutrition Reset | 21 days | Nutrition | meal-prep and food-habit wedges |

Each template ships with: name, icon set, wedge list (with mystery/mate's-pick slots preserved as a mechanic, not fitness-specific), suggested duration. Users can **clone → customize** (same as today's "edit activities") or **publish their own** template for others to discover and clone.

### D. Ongoing tracking & history
- Calendar heat-view (per active challenge, and a combined view across all challenges)
- Cross-cycle stats: "you've now run *No Excuses* 3 times", streaks, personal bests
- The existing activity-detail modal (photos, notes, date/time, share) carries over unchanged — it already does the right thing, it just needs to work across cycles/challenges instead of one fixed 30-slot array
- Badges/milestones (first cycle complete, 100 days logged, etc.) — nice-to-have, not core

### E. Social
- Friends: search by handle, send/accept friend requests
- Activity feed: friends' completions (respecting privacy setting), each with photo, caption, comments, reactions
- Comments on any completed activity (yours or a friend's, if visibility allows)
- Group challenges: invite friends into the *same* challenge run, see each other's progress side by side (avatar stack + per-person completion state), optional simple leaderboard (days crossed off)
- "Mate's pick" wedge mechanic extends naturally here: a friend inside the app can fill in the activity for you, not just "hand them your phone"

### F. Media
- Multi-photo/video per entry (already built) moves from local IndexedDB to cloud storage so it's visible to friends and survives a device change
- In-app sharing to the feed, plus the existing native share-sheet export for Instagram stories

### G. Notifications
- Daily reminder to spin
- Friend activity (comment, reaction, joined your challenge)
- Streak-risk nudge ("you'll lose your streak if you don't cross off today")

### H. Monetization (flag for later, not needed for MVP)
- Free: personal challenges, limited friends, standard templates
- Paid: premium/curated templates, group challenges beyond N friends, custom branding for trainers/communities running challenges with clients

## 4. Data model sketch (high level)

```
User        { id, handle, email, avatar, bio, privacy }
Challenge   { id, ownerId, name, category, durationDays, visibility, wedgeList, coverArt, sourceTemplateId? }
ChallengeRun{ id, challengeId, userId, startedAt, status(active/complete/abandoned) }
Entry       { id, runId, wedgeIndex, committedAt, doneAt, comment, mediaIds[] }
Media       { id, entryId, url, type }
Friendship  { userIdA, userIdB, status(pending/accepted) }
Comment     { id, entryId, authorId, text, createdAt }
GroupRun    { id, challengeId, memberUserIds[], createdAt }
```

This is the shape that lets "history" become "every `Entry` across every `ChallengeRun` you've ever had," which is what makes the calendar heat-view and cross-cycle stats possible.

## 5. Technical shift required

The current app is 100% static (no build step, no backend, `localStorage` + `IndexedDB` only). None of section 3 works without:

- **Auth** (e.g. Supabase Auth, Firebase Auth, or Clerk)
- **Database** for the entities above (Postgres via Supabase/Neon, or Firestore)
- **Object storage** for media (S3-compatible / Cloudflare R2 / Supabase Storage) — replacing local IndexedDB blobs
- **API layer** — could be serverless functions (Vercel/Cloudflare Workers) sitting in front of the DB, or a BaaS SDK talking to the DB directly from the client with row-level security
- **Push notifications** — needs either a real native/Capacitor wrapper (APNs/FCM) or web push, which is weaker on iOS Safari

**App store presence**: "launched on an app" likely means real iOS/Android app store listings, not just Add-to-Home-Screen. Two paths:
- **Wrap the existing web app with Capacitor** — keep the HTML/CSS/JS you already have, get native push notifications, App Store/Play Store listings, same codebase. Fastest path given what already exists.
- **Rebuild native (React Native / SwiftUI+Kotlin)** — more work, but better long-term native feel and performance for a social feed. Worth it only once the social feature set is proven out.

My recommendation: **Capacitor wrap + Supabase (auth+DB+storage) + Vercel/Cloudflare for any custom API routes**. It reuses everything already built (wheel canvas, spin animation, detail modal, share flow) and gets you to "real app" fastest, while leaving the door open to a native rebuild later if the social feed outgrows a WebView.

## 6. Suggested phased roadmap

1. **Backend foundation** — auth, DB schema, migrate local state (state/overrides/media) to per-user cloud records. No new user-facing features yet, just moving the ground under the existing app.
2. **Challenges & templates** — turn the hardcoded `ACTIVITIES` array into a `Challenge` object, build the template gallery + clone/publish flow, support multiple concurrent challenges and repeat cycles.
3. **History v2** — calendar heat-view, cross-cycle stats, badges.
4. **Social graph** — friends, profiles, privacy settings.
5. **Feed & comments** — activity feed, reactions, comments.
6. **Group challenges** — shared runs, avatar stacks, simple leaderboard.
7. **Notifications** — daily reminder, friend activity, streak risk.
8. **App store packaging** — Capacitor wrap, push notification wiring, store listings.

Each phase is shippable/testable on its own; nothing here needs to land all at once.

## 7. Open questions for you

1. Can one user run **multiple challenges at the same time**, or one active challenge at a time (simpler, matches today's "one wheel" mental model)?
2. Should **mystery/mate's-pick concealment** be a mechanic every template can opt into, or specific to certain categories?
3. How public is public — can anyone browse anyone's profile/feed by default, or is everything friends-only unless explicitly made public?
4. Backend preference — happy to default to Supabase (fastest, generous free tier, Postgres), or is there a stack you already use elsewhere I should match?
5. Priority: do you want the social layer first, or the "repeatable challenges + template gallery" first? They're somewhat independent and phase 2/3 could be reordered before phase 4/5/6.
