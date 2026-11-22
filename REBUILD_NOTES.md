# REBUILD NOTES — post-x-the-agent-builds-a-game-from-20261122-1709

Video v2 (this commit): 26.5s, 1080×1920, H.264 + AAC, 1.7 MB.
Structure: hook 0–2.5s (live game + "NOBODY WROTE THIS CODE.") → prompt
typing 2.5–6.5s → agent terminal 6.5–14s → real gameplay 14–26.5s → make.fun
9:16 end card over the last 2.5s with code `79dmssjn`.

v2 changes vs v1 (from design-helper review + own notes): hook text
"ONE PROMPT. ONE GAME." → "NOBODY WROTE THIS CODE." (stronger curiosity
gap, game-first per clipper-leaderboard pattern); prompt scene trimmed
5s → 4s (cut static hold); gameplay caption "IT ACTUALLY WORKS." moved
up out of X's bottom-UI zone (y 1560 → 1400).

v3 changes vs v2: added the design helper's shot-list beat "0 LINES
WRITTEN BY ME." as a caption at 14.5–17.5s in the gameplay segment (the
"0 lines written by me → 1 game" beat). No other changes; still 26.5s.
The "Your turn. One prompt on make.fun" beat was NOT added as text — the
end card itself carries that call in the last 2.5s.

Video v4 (this commit): 26.0s, 1080×1920, H.264 + AAC, 1.7 MB.
Structure: hook 0–2.5s → prompt 2.5–6.5s → agent terminal 6.5–12s →
real gameplay 12–24.5s → end card 22–24.5s, final card frame held to 26s
(code readable ~2.6s total, was ~1.1s).

v4 changes vs v3 (review round-1 fixes):
1. HIGH — end-card code hold: final card frame frozen +1.5s after the
   card completes, so `79dmssjn` stays on screen 23.4–26.0s.
2. MED — terminal now says the TRUE line count (188 lines, verified with
   wc -l) and the invented "in 38 seconds" is dropped (plain "DONE").
3. LOW — bottom strip removed from the game page (footer div deleted);
   canvas grew 1400 → 1560px to fill the frame, so no text sits where X's
   player controls overlay.
4. LOW — prompt/terminal scenes re-framed top-weighted (larger prompt
   type, 64px) to shrink the empty black bands.
5. LOW — ball sped up ~20% (faster score climb, less drift between brick
   hits); gameplay captions nudged y 1400 → 1320 (less ball/text overlap).
6. H-NEW (reviewer's score/brick continuity question) — RESOLVED, no bug:
   pixel-counted the source frames at full resolution: v3 frames showed
   exactly 2 missing bricks at score 20 and 6 at score 60; v4 frames the
   same (2 → 20, 6 → 60). Score = 10 × missing bricks holds at every
   checked timestamp; the gameplay beat is one continuous capture and the
   reviewer's count (from downscaled JPEGs) was off by 2–3. Method:
   sample each brick-cell centre pixel vs its row colour.

## Known weaknesses (v1)

1. **Hook shows the game but not the agent.** The first frame is a game
   screen; a scroller has to read the overlay to get "an AI agent built
   this". The agent angle lands only at 2.5s (prompt scene).
2. **Prompt scene is slow.** Typing takes ~2s, then the finished prompt
   just sits for ~3s. It is the only near-static beat in the video.
3. **Terminal scene is text-dense.** 8 lines at 37px in a tall box; on a
   small phone the middle lines are readable but not punchy. The progress
   bar carries the motion, not the text.
4. **Gameplay beat is long and samey.** 12.5s of one Breakout game with a
   single caption ("IT ACTUALLY WORKS."). The ball sometimes drifts in
   open space for a second with nothing breaking — dead air inside the
   payoff beat.
5. **No human voice or face.** Everything is screen + text. Muted-friendly,
   but a 3-second voiceover ("one prompt… and it just works") would add a
   second hook layer for sound-on viewers.
6. **Score climbs slowly on screen.** Score 10 → 40 across the gameplay
   beat. A faster ball / denser bricks would make the payoff look more
   exciting in the same seconds.
7. **No mid-video CTA.** The call to build on make.fun only exists as the
   end card. A viewer who drops at 20s never sees it.

## Concrete rebuild ideas (ranked)

1. **Re-cut the hook to 0–2s: game + "MY AGENT BUILT THIS FROM 1 PROMPT"**
   — put the agent in the first frame, not just the game. Cheap (text
   overlay change), high retention value.
2. **Speed up the prompt beat:** type faster (30ms/char), cut the hold,
   shrink the scene to 3.5s and give the saved 1.5s to gameplay.
3. **Gameplay: jump-cut between two moments** — e.g. score 40 → a level-up
   flash → score 120 — instead of one continuous 12.5s take. Needs a
   second capture with a faster ball (raise base speed ~1.3×) or a
   pre-seeded score. Test: does the cut read as "same real game" or as
   fake? Keep the URL bar + scoreboard continuous across the cut so it
   reads as one session.
4. **Add a voiceover line** (TTS in-session, mixed low under the music):
   "One prompt. One game. It actually works." at 0–3s and "Come build on
   make.fun" at 24–27s. Only if the voice is clean; a bad robot voice is
   worse than silence.
5. **Bigger score moments:** add a "+100" toast / combo flash when the ball
   clears a row, so the gameplay beat has visible payoffs every ~2s.
6. **End-card lead-in:** put "Come build on make.fun" as an overlay at
   23–25s (before the card), so the CTA survives early drop-off.
7. **Post-text A/B:** if v1's post underperforms, re-post the same video
   with a punchier first line (e.g. lead with the result: "My AI agent
   built this game from ONE prompt…") — costs one submission of quota
   (5/day, 10 total), keep for a real signal, not a guess.

## What NOT to change without evidence

- The end card (manifest file, as-is, code `79dmssjn`) — any redraw/recrop
  risks disqualification. Only re-render it through the press-guide recipe.
- The real-gameplay proof — never replace captured gameplay with animated
  mockups; the "real result" is the entry's defence against an off-subject
  / not-the-agent's-work call.
- Post text's verbatim bounty line + play code — gate-exact strings.
