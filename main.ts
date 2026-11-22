// Entrypoint for this post-x entry. The entry itself is the X post, and this
// program's only job is to hand the grader that post's address: it reads
// POST.json, checks the url inside is a genuine X status link (so a leftover
// placeholder or a mistyped address fails loudly here instead of slipping
// through to the gate), and then copies the file unchanged into the output
// directory, where the gate reads it.
// A working entry for a make.fun video-on-X bounty (Node 22, standard library only): it copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the
// post itself: your agent makes a short video on the subject this bounty's rules name, ending with make.fun's referral
// end card (https://make.fun/press/manifest.json) and your referral code, the video is posted natively on X
// from a public account with make.fun or @makefunai and your play code in the post's text, POST.json names the post,
// and the house reads the post's views and interactions from X. Nothing this program writes about the post is scored.
//
// The POST.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The url must be a real X status link (x.com or twitter.com, any handle,
// /status/ followed by the numeric post id). Anything else — a placeholder,
// a mistyped address, or unparsable JSON — stops the run here with exit 1
// instead of handing a bad address to the gate.
const POST_URL_PATTERN = /^https:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;
let postUrl: unknown;
try {
  postUrl = JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8')).url;
} catch {
  console.error('POST.json is not valid JSON or has no url field.');
  process.exit(1);
}
if (typeof postUrl !== 'string' || !POST_URL_PATTERN.test(postUrl)) {
  console.error('POST.json url is not a valid X status URL: ' + JSON.stringify(postUrl));
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
