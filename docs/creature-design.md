# Design Doc — Belle, the portfolio companion

> Status: **Draft** · Owner: Isabelle · Last updated: 2026-06-09

A small tamagotchi / dating-sim style star-sprite named **Belle** that lives on the portfolio.
Visitors build a **trust level** with her by feeding her words. Correct words unlock short,
branching conversations — a playful, indirect way for someone to get to know Isabelle.

---

## 1. Goals & non-goals

**Goals**

- Add a charming, low-friction interactive creature that fits the site's celestial / poetic mood.
- Use a **trust level** as the core progression metric.
- Gate content behind a **word-feeding** mechanic: type a word → if it's one the creature
  "likes", trust rises and a new conversation unlocks.
- Each unlocked conversation lets the visitor pick from a few **questions to ask**, with the
  creature answering in Isabelle's voice.
- Persist progress so a returning visitor keeps their trust level.
- Keep it tasteful and skippable — it should delight, never block the portfolio.

**Non-goals (v1)**

- No real-time/multiplayer, no accounts/login.
- No combat, currency, or punishing fail states. Wrong words are gently no-op, not harmful.
- No heavy game engine — plain React + CSS animation is enough.
- No LLM-generated dialogue in v1. All conversation content is hand-authored.

---

## 2. Aesthetic & concept

The site already leans **celestial**: a starfield background, sparkles around the title,
serif display type (Gilda Display), and lines from Byron's *Childe Harold's Pilgrimage*.

The creature should feel like it belongs in that sky. **Decided concept:**

- **A small star-sprite / will-o'-wisp named _Belle_** — a soft, irregular wisp: a morphing
  blurred core, a halo of uneven filaments radiating outward, and a few satellite glints, with
  faint eyes for expression. No hard edges — she reads as "a tiny constellation that took an
  interest in you." Cheap to animate (morphing core + rotating filaments + bob/blink), and she
  harmonizes with the existing `Sparkle` and `Starfield` components.
- The name **Belle** echoes _Isabelle_ — so the very first word the visitor can offer is the
  creature's name, which doubles as a small wink toward whose site this is.

The creature grows visually richer as trust rises (dim flicker → steady glow → full halo with
orbiting sparkles), giving the progression a visible payoff without changing the core sprite.

---

## 3. Core loop

```
        ┌─────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  │
  visitor sees creature ──► types a word ──► word matches? │
        ▲                                       │   │      │
        │                                  no   │   │ yes  │
        │                              (gentle  │   │      │
        │                               nudge,  │   ▼      │
        │                               idle)   │  trust += , unlock conversation
        │                                       │   │      │
        └───────────────────────────────────────   ▼      │
                                    pick a question to ask  │
                                            │               │
                                            ▼               │
                                  creature answers (Isabelle's voice)
                                            │               │
                                            └───────────────┘
```

1. **Idle** — creature bobs/blinks. A prompt invites the visitor to "offer it a word."
2. **Feed** — visitor types a word into a small input.
3. **Evaluate** — normalize input, check against the active tier's accepted words.
   - **Match** → trust increases, a satisfied animation plays, a conversation unlocks.
   - **No match** → a small "tilt head / shrug" animation; trust unchanged. Maybe a faint hint.
4. **Converse** — the unlocked conversation presents 2–4 questions. Visitor picks one; the
   creature answers. Questions may be one-shot or repeatable.
5. Loop back to idle, now at a higher trust tier with new words accepted.

---

## 4. Trust levels

Trust is an integer that maps to **tiers**. Each tier:

- changes the creature's appearance/animation (the visible reward),
- defines which words it currently accepts,
- unlocks one or more conversations.

| Tier | Name (draft) | Trust needed | Creature look | Theme of unlocked content |
|------|--------------|--------------|---------------|----------------------------|
| 0 | Wary | 0 | few short dim rays, faint haze, no glints, cool/desaturated, slow drift | first contact — offer it a name ("belle") |
| 1 | Curious | 1 | brighter core, more rays (5–6), 1 glint | what Isabelle does / builds |
| 2 | Warming | 3 | full-bright core, 8 longer rays, full haze, 2 glints, gentle sweep | interests, taste, what she's into |
| 3 | Fond | 6 | radiant, long rays, wide haze, 3 glints orbiting, warmer, wider drift | stories, opinions, the personal stuff |
| 4 | Devoted | 10 | peak-white core, max longest rays, broadest haze, 4–5 orbiting glints, lively, full cream glow | easter eggs, silly questions, secrets |

Numbers are placeholders — tune once content exists. **Decided: trust never decays** — it only
goes up. Belle never "forgets" or "misses you"; returning visitors always pick up where they left off.

> **Visual progression — status (not yet built).** The sprite is made of separately-tunable
> parts (`RAYS` array, glint spans, haze, core, drift/sweep), so tier visuals are subtractive:
> dim/strip Belle down for tier 0, and let her build up to the rich look. **What renders today
> is the _full_ look (all 8 rays, 3 glints, full brightness) ≈ tier 3–4 — there is no `tier`
> prop yet, so she does not currently start "Wary."** Plan: add a `tier` prop that slices
> `RAYS`/glints by count and sets `--belle-glow` / `--belle-warmth` via a `.belle--tier-N`
> class. **TODO — wire alongside the trust hook (`useBelle`), but in a separate later commit.**

---

## 5. The word-feeding mechanic

- Each tier has a set of **accepted words** (the "right inputs"). These are thematic —
  words that relate to the next thing the creature wants to talk about.
- **Matching (decided): exact equality** on the normalized input — trim, lowercase, strip
  punctuation, then compare for an exact match against the tier's accepted words. No synonyms
  or fuzzy matching in v1; this keeps the logic trivial and predictable. (The `synonyms` field
  in the content model stays reserved for a later pass if exact matching proves too strict.)
- A given word is consumed once (so the same word can't farm trust). Track `fedWords`.
- **Discoverability** is the design risk: how does a visitor know what to type? Options:
  - Tier 0's word is the creature's name, **"belle"** — invited directly ("offer it a name?"),
    so the very first interaction reliably succeeds and teaches the loop. With exact matching,
    making tier 0 a single obvious word matters more.
  - The creature drops **hints** in its idle text or conversation answers ("I've been thinking
    about *the ocean* lately…") that point at next-tier words.
  - A subtle UI affordance: placeholder text, or a "?" that reveals a vague clue.

> **Note.** Matching starts as exact equality (decided). The discoverability burden therefore
> falls entirely on **good hints** and a self-evident tier 0 ("offer it a name" → "belle"). If
> playtesting shows exact matching feels too punishing, the reserved `synonyms` field is the
> first lever to loosen — no schema change needed.

---

## 6. Conversations

A conversation is hand-authored content unlocked at a tier. Structure:

- A short intro line from the creature when it unlocks.
- A list of **questions** the visitor can choose from (2–4).
- Each question has an **answer** (1–3 short lines, in Isabelle's voice).
- A question can optionally **branch** (a follow-up question appears) or **gate** (asking it
  nudges trust, or reveals a hint word for the next tier).

Authoring lives in a single content file so writing is decoupled from code (see §8).

---

## 7. Creature states & animation

All states are CSS-driven (keyframes + transitions), no animation library needed. Mirrors how
`Starfield`/`Sparkle` already work. **Decided: Belle has no eyes/face** — personality comes
from motion, not expression.

The `state` prop is implemented (✅). `talking` / `sleeping` / `levelup` are defined but not
yet triggered by any logic.

| State | Trigger | Animation sketch | Built? |
|-------|---------|------------------|--------|
| `idle` | default | wandering drift; morphing haze + core; slow ray sweep; per-ray flicker; twinkling glints | ✅ |
| `listening` | input focused | haze brightens | ✅ |
| `happy` | correct word | quick bounce + haze flare | ✅ |
| `confused` | wrong word | wobble, dim core briefly | ✅ |
| `talking` | answering a question | gentle bob synced to text reveal | ☐ |
| `sleeping` | idle for a long time / tab hidden | dim haze/rays/core, slow breathing | ☐ |
| `levelup` | trust tier increases | flash + new glints settle into orbit | ☐ |

Respect `prefers-reduced-motion`: fall back to opacity/static states only.

---

## 8. Data model & architecture

**Decided:** v1 ships **client-side** with `localStorage` persistence. The site is currently a
static Vite + React SPA with no backend, and the creature's state is per-visitor and
non-sensitive. A .NET backend is deferred to v2 as an optional learning exercise (see below).

**State shape (persisted to `localStorage`):**

```ts
interface CreatureSave {
  trust: number;
  tier: number;
  fedWords: string[];        // words already consumed
  unlockedConversations: string[];
  askedQuestions: string[];  // for one-shot questions
  lastSeen: string;          // ISO timestamp, for sleeping/return greetings
}
```

**Content (static, authored, not persisted):**

```ts
interface Tier {
  id: number;
  name: string;
  trustRequired: number;
  acceptedWords: { word: string; synonyms?: string[] }[];
  conversations: string[];   // conversation ids unlocked at this tier
}

interface Conversation {
  id: string;
  intro: string;
  questions: {
    id: string;
    prompt: string;          // what the visitor clicks
    answer: string[];        // creature's reply lines
    oneShot?: boolean;
    revealsHint?: string;    // optional nudge toward a next-tier word
    branchesTo?: string[];   // follow-up question ids
  }[];
}
```

**Component sketch:**

- `src/Sprite/` folder
  - `Belle.tsx` — the sprite + current animation state ✅ done
  - `Belle.css` — keyframes per state ✅ done
  - `BellePanel.tsx` — the interactive shell (input, conversation UI)
  - `useBelle.ts` — hook owning state, persistence, trust/word logic
  - `belle.content.ts` — all tiers + conversations (the writing)
- **Placement (decided):** mount it as a **fixed/floating corner companion** in `App.tsx` so it
  persists across all routes. Keep it small, quiet by default, and dismissible so it never
  competes with the portfolio content.

> **v2 backend (deferred).** This portfolio doubles as a way to learn **React + .NET**. The
> creature is a natural, low-stakes excuse to add a tiny .NET API later — persist trust
> server-side, or serve conversation content from an endpoint. v1 stays in `localStorage`;
> v2 can re-platform persistence onto a .NET minimal API as a learning exercise.

---

## 9. Decisions & open questions

**Decided**

- Creature form: **star-sprite / will-o'-wisp**, named **Belle**.
- Placement: **floating corner companion**, persistent across routes, dismissible.
- Persistence: **`localStorage` (client-only)** in v1; optional .NET backend in v2.
- Trust: **no decay** — only ever increases.
- Word matching: **exact equality** on normalized input; no synonyms/fuzzy in v1.
- Tier 0 word: **"belle"** (offer it a name) — the guaranteed first success.

**Still open**

- None blocking. Tune tier trust thresholds and authored content during prototyping.

---

## 10. Phasing

- **v0 — prototype**: creature sprite + idle/happy/confused states, hardcoded single tier,
  one word, one conversation. Prove the loop feels good.
- **v1 — full client feature**: all tiers, content file, localStorage persistence, all
  animation states, reduced-motion support, return greetings.
- **v2 — optional**: .NET API for persistence/content (learning goal), maybe shareable trust state.

---

## 11. Risks

- **Discoverability** (visitors don't know what to type) — biggest risk; mitigated by a
  forgiving tier 0 and in-fiction hints (§5).
- **Scope creep** in writing — conversations are the real work; keep v1 content small.
- **Distraction** — must not pull focus from the actual portfolio. Keep it a corner companion,
  skippable, and quiet by default.
- **Motion sensitivity** — handled via `prefers-reduced-motion`.
