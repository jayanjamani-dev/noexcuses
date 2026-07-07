// ============================================================
// noexcuses. — 30-day spin-the-wheel fitness challenge
// ============================================================

(() => {
'use strict';

// ---------------------------------------------------------------
// DATA — the 30 activities
// ---------------------------------------------------------------
const ACTIVITIES = [
  { label: '1000 STEPS',    icon: '⛰️', name: '1000 steps',                     tag: 'LEGS',     type: 'Hill',       cat: 'locked',   place: 'Kokoda Track, Dandenongs · x2', note: 'up and down till your legs quit. film the top.' },
  { label: '10KM RUN',      icon: '🏃', name: '10km run',                       tag: 'CARDIO',   type: 'Run',        cat: 'locked',   place: 'River or city loop',            note: 'just run it. no story needed.' },
  { label: '1000 PUSHUPS',  icon: '💪', name: '1000 push-ups',                  tag: 'UPPER',    type: 'Reps',       cat: 'locked',   place: 'Pick a landmark',               note: 'pick a spot, drop and knock them out in sets.' },
  { label: 'TAN+ANDERSON',  icon: '🧗', name: 'tan day / anderson hill',        tag: 'LEGS',     type: 'Run',        cat: 'locked',   place: 'The Tan + Anderson St',         note: 'loop the tan then send anderson st flat out.' },
  { label: 'SANDBAG 4KM',   icon: '🎒', name: '4km sandbag carry',              tag: 'FULL',     type: 'Carry',      cat: 'locked',   place: 'Anywhere',                      note: 'load it, sling it, walk it out. no putting it down.' },
  { label: 'HILL SPRINTS',  icon: '⚡', name: 'sunset hill sprints',            tag: 'LEGS',     type: 'Sprints',    cat: 'locked',   place: 'Point Ormond',                  note: 'sunset, sprint up, walk down, repeat till empty.' },
  { label: 'FARMERS 32KG',  icon: '🧳', name: '32kg farmers carry',             tag: 'FULL',     type: 'Carry',      cat: 'locked',   place: 'The Tan loop',                  note: 'grab the weight, walk the loop, don\'t stop to think.' },
  { label: 'TRAIL SLOG',    icon: '🥾', name: 'trail slog',                     tag: 'LEGS',     type: 'Trail',      cat: 'locked',   place: 'Anywhere',                      note: 'mud, roots, no pace. just keep moving.' },
  { label: 'MYSTERY',       icon: '🎁', name: 'marathon',                       tag: 'CARDIO',   type: 'Run',        cat: 'mystery',  place: 'you pick the route',            note: 'you already know what this is. don\'t say it out loud.' },
  { label: 'CLIMB',         icon: '🧗', name: 'rock climbing / bouldering',     tag: 'ARMS',     type: 'Grip',       cat: 'locked',   place: 'Gym wall or real rock',         note: 'chalk up. gym wall or real rock, your call.' },
  { label: 'CALISTHENICS',  icon: '🤸', name: 'calisthenics',                   tag: 'UPPER',    type: 'Bodyweight', cat: 'locked',   place: 'Elwood Beach or Princes Park bars', note: 'bars only. bodyweight, no shortcuts.' },
  { label: 'BEACH RUN',     icon: '🏖️', name: 'beach run',                      tag: 'FULL',     type: 'Run',        cat: 'locked',   place: 'St Kilda beach',                note: 'sand\'s harder than road. feel it.' },
  { label: 'GYM DAY',       icon: '🏋️', name: 'heavy gym day',                  tag: 'FULL',     type: 'Lift',       cat: 'locked',   place: 'Gym',                           note: 'heavy. leave nothing on the bar.' },
  { label: 'YOGA',          icon: '🧘', name: 'yoga & mobility',                tag: 'RECOVERY', type: 'Mobility',   cat: 'locked',   place: 'Home / studio',                 note: 'slow it down. your body needs this one.' },
  { label: 'BEAR CRAWL',    icon: '🐻', name: '3km bear crawl',                 tag: 'FULL',     type: 'Crawl',      cat: 'locked',   place: "Gosch's Paddock",               note: '3km on all fours. yes, really.' },
  { label: 'MOUNTAIN RUN',  icon: '🏔️', name: 'mountain run',                   tag: 'LEGS',     type: 'Hill',       cat: 'locked',   place: 'Mt Macedon / Sassafras',        note: 'up the mountain, straight down. lungs will hate you.' },
  { label: 'BIKE + RED',    icon: '🐕', name: 'bike ride + coffee + red',       tag: 'LEGS',     type: 'Ride',       cat: 'locked',   place: 'Anywhere',                      note: 'ride it, earn the coffee, earn the red.' },
  { label: 'BROAD JUMPS',   icon: '🦘', name: 'burpee broad jumps',             tag: 'FULL',     type: 'Plyo',       cat: 'locked',   place: 'Anywhere',                      note: 'burpee into a jump. repeat till your legs are gone.' },
  { label: 'SUMMIT WALK',   icon: '🌅', name: 'sunrise summit walk',            tag: 'LEGS',     type: 'Trail',      cat: 'locked',   place: 'Anywhere',                      note: 'before sunrise. get up there for the light.' },
  { label: 'TRAIL RUN',     icon: '🌲', name: 'trail run',                      tag: 'CARDIO',   type: 'Trail',      cat: 'locked',   place: 'Yarra Bend',                    note: 'dirt under your feet. no pavement today.' },
  { label: 'COUNTRY SESH',  icon: '🌾', name: 'country sesh',                   tag: 'FULL',     type: 'Endurance',  cat: 'locked',   place: 'Ballarat / Bendigo',            note: 'get out of the city and put in the work.' },
  { label: '5KM+PUSHUPS',   icon: '🥵', name: '5km run + push-ups every 100m',  tag: 'FULL',     type: 'Run+reps',   cat: 'locked',   place: 'TBC',                           note: 'run 5km, drop for push-ups every 100m. no skipping.' },
  { label: 'MYSTERY',       icon: '🎁', name: 'mountain bike',                  tag: 'LEGS',     type: 'Mystery',    cat: 'mystery',  place: 'you set it',                    note: 'set it yourself. tell no one.' },
  { label: 'MYSTERY',       icon: '🎁', name: 'kayak: seaford → frankston',     tag: 'FULL',     type: 'Mystery',    cat: 'mystery',  place: "life vest on, calm morning only (can't swim)", note: 'life vest on. calm morning only. you can\'t swim.' },
  { label: "MATE'S PICK",   icon: '🤝', name: "mate's pick",                    tag: 'PICK',     type: 'Wildcard',   cat: 'mate',     place: 'TBC',                           note: 'hand your phone to a mate. their call, your workout.' },
  { label: "MATE'S PICK",   icon: '🤝', name: "mate's pick",                    tag: 'PICK',     type: 'Wildcard',   cat: 'mate',     place: 'TBC',                           note: 'hand your phone to a mate. their call, your workout.' },
  { label: "MATE'S PICK",   icon: '🤝', name: "mate's pick",                    tag: 'PICK',     type: 'Wildcard',   cat: 'mate',     place: 'TBC',                           note: 'hand your phone to a mate. their call, your workout.' },
  { label: 'NEW THING',     icon: '✨', name: 'try a new activity',             tag: 'WILD',     type: 'First-timer',cat: 'locked',   place: 'TBC',                           note: 'something you\'ve never done before. today\'s the day.' },
  { label: 'MATE SESH',     icon: '👯', name: 'workout with a mate',            tag: 'PICK',     type: 'Social',     cat: 'mate',     place: 'TBC',                           note: 'drag a mate along. two people, one session.' },
  { label: 'STRANGER',      icon: '👋', name: 'workout with a stranger',        tag: 'PICK',     type: 'Social',     cat: 'stranger', place: 'TBC',                           note: 'find someone new and train together. that\'s the brief.' },
];

// TODO(boss finish): flag any index below as the day-30 "boss" to give the
// challenge a peak finish. Currently hard-wired to the last activity (index 29).
// To customize, change BOSS_INDEX and extend the finale copy in showFinale().
const BOSS_INDEX = 29;

const COLORS = {
  ink: '#14130F', panel: '#1C1A15', bone: '#EDE7D9',
  vermilion: '#E5461F', gold: '#E9B21C', forest: '#1B4332', ash: '#6E6A60',
};

const STORAGE_KEY = 'noexcuses:v1';
const WEDGE_ANGLE = (Math.PI * 2) / 30;

// ---------------------------------------------------------------
// STATE + PERSISTENCE
// ---------------------------------------------------------------
let state = {
  version: 1,
  committed: [],   // [{ index, done, committedAt, doneAt }] in commit order
  lastTag: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && Array.isArray(parsed.committed)) {
      state = parsed;
    }
  } catch (e) {
    console.warn('noexcuses: failed to load state', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('noexcuses: failed to save state', e);
  }
}

function committedIndices() {
  return new Set(state.committed.map(c => c.index));
}
function doneCount() {
  return state.committed.filter(c => c.done).length;
}
function pendingEntry() {
  return state.committed.find(c => !c.done) || null;
}
function currentDay() {
  return Math.min(doneCount() + 1, 30);
}

// ---------------------------------------------------------------
// DOM
// ---------------------------------------------------------------
const $ = id => document.getElementById(id);
const wheelWrap = $('wheelWrap');
const canvas = $('wheelCanvas');
const ctx = canvas.getContext('2d');
const pointerEl = $('pointer');
const shockwaveEl = $('shockwave');
const spinBtn = $('spinBtn');
const missionBar = $('missionBar');
const missionIcon = $('missionIcon');
const missionName = $('missionName');
const missionPlace = $('missionPlace');
const crossOffBtn = $('crossOffBtn');
const saveStoryMissionBtn = $('saveStoryMissionBtn');
const resultOverlay = $('resultOverlay');
const resultIcon = $('resultIcon');
const resultName = $('resultName');
const resultPlace = $('resultPlace');
const resultNote = $('resultNote');
const commitBtn = $('commitBtn');
const saveStoryResultBtn = $('saveStoryResultBtn');
const dayNum = $('dayNum');
const crossedCount = $('crossedCount');
const progressFill = $('progressFill');
const resetBtn = $('resetBtn');
const finaleOverlay = $('finaleOverlay');
const finaleResetBtn = $('finaleResetBtn');
const saveStoryFinaleBtn = $('saveStoryFinaleBtn');
const exportCanvas = $('exportCanvas');

// ---------------------------------------------------------------
// WHEEL RENDERING
// ---------------------------------------------------------------
let wheelRotation = 0;     // radians, monotonically increasing across spins
let flashIndex = -1;       // wedge to flash gold during finish flourish
let dpr = Math.max(1, window.devicePixelRatio || 1);

function resizeCanvas() {
  const rect = wheelWrap.getBoundingClientRect();
  const size = Math.round(rect.width);
  dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  drawWheel();
}

function textColorFor(activity, wedgeIsBone) {
  if (activity.cat === 'mystery') return COLORS.vermilion;
  if (activity.cat === 'mate' || activity.cat === 'stranger') return COLORS.gold;
  return wedgeIsBone ? COLORS.ink : COLORS.bone;
}

function drawWheel() {
  const size = canvas.width;
  const r = size / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(r, r);
  ctx.rotate(wheelRotation);

  const committed = committedIndices();

  for (let i = 0; i < 30; i++) {
    const activity = ACTIVITIES[i];
    const start = i * WEDGE_ANGLE;
    const end = start + WEDGE_ANGLE;
    const isBone = i % 2 === 0;
    const isDone = committed.has(i) && state.committed.find(c => c.index === i).done;
    const isFlashing = i === flashIndex;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r * 0.985, start, end);
    ctx.closePath();
    ctx.fillStyle = isFlashing ? COLORS.gold : (isBone ? COLORS.bone : COLORS.panel);
    ctx.globalAlpha = isDone && !isFlashing ? 0.32 : 1;
    ctx.fill();
    ctx.globalAlpha = 1;

    // hairline separators
    ctx.strokeStyle = 'rgba(20,19,15,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // label
    const mid = start + WEDGE_ANGLE / 2;
    ctx.save();
    ctx.rotate(mid);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = `500 ${Math.round(r * 0.052)}px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = isFlashing ? COLORS.ink : textColorFor(activity, isBone);

    const labelR = r * 0.93;
    ctx.translate(labelR, 0);
    ctx.fillText(activity.icon, 0, -Math.round(r * 0.045));
    ctx.font = `600 ${Math.round(r * 0.04)}px 'Space Grotesk', sans-serif`;
    ctx.fillText(activity.label, 0, Math.round(r * 0.05));

    if (isDone && !isFlashing) {
      // vermilion strike-through across the label
      ctx.strokeStyle = COLORS.vermilion;
      ctx.lineWidth = Math.max(1.5, r * 0.012);
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, 0);
      ctx.lineTo(r * 0.02, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  // outer rim
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.985, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(2, r * 0.02);
  ctx.strokeStyle = COLORS.vermilion;
  ctx.stroke();

  ctx.restore();
}

window.addEventListener('resize', resizeCanvas);

// ---------------------------------------------------------------
// AUDIO — Web Audio API, all wrapped in try/catch
// ---------------------------------------------------------------
let audioCtx = null;
function ensureAudio() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) { /* audio unavailable, fail silent */ }
  return audioCtx;
}

function playTick(strength = 1) {
  try {
    const ac = ensureAudio();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'square';
    osc.frequency.value = 520 + Math.random() * 60;
    gain.gain.setValueAtTime(0.05 * strength, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.06);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.07);
  } catch (e) { /* noop */ }
}

function playWhoosh(duration = 1.4) {
  try {
    const ac = ensureAudio();
    if (!ac) return;
    const bufferSize = Math.floor(ac.sampleRate * duration);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ac.createBufferSource();
    noise.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(1800, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ac.currentTime + duration);

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.22, ac.currentTime + duration * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);

    noise.connect(filter).connect(gain).connect(ac.destination);
    noise.start();
    noise.stop(ac.currentTime + duration + 0.05);
  } catch (e) { /* noop */ }
}

function playThud() {
  try {
    const ac = ensureAudio();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ac.currentTime + 0.25);
    gain.gain.setValueAtTime(0.5, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.3);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.32);
  } catch (e) { /* noop */ }
}

function playDing() {
  try {
    const ac = ensureAudio();
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ac.currentTime);
    gain.gain.setValueAtTime(0.001, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ac.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.5);
    osc.connect(gain).connect(ac.destination);
    osc.start(ac.currentTime + 0.05);
    osc.stop(ac.currentTime + 0.55);
  } catch (e) { /* noop */ }
}

// ---------------------------------------------------------------
// SPIN LOGIC
// ---------------------------------------------------------------
let spinning = false;

function pickWinner() {
  const committed = committedIndices();
  let available = [];
  for (let i = 0; i < 30; i++) if (!committed.has(i)) available.push(i);

  if (available.length === 0) return -1;

  if (state.lastTag) {
    const noRepeat = available.filter(i => ACTIVITIES[i].tag !== state.lastTag);
    if (noRepeat.length > 0) available = noRepeat;
  }
  return available[Math.floor(Math.random() * available.length)];
}

function normalizeAngle(a) {
  const twoPi = Math.PI * 2;
  return ((a % twoPi) + twoPi) % twoPi;
}

function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }
function easeInQuad(t) { return t * t; }

function spin() {
  if (spinning) return;
  const winner = pickWinner();
  if (winner === -1) return;
  spinning = true;
  spinBtn.disabled = true;
  ensureAudio();

  const wedgeCenterLocal = (winner + 0.5) * WEDGE_ANGLE;
  const jitter = (Math.random() - 0.5) * WEDGE_ANGLE * 0.55;
  const localAngle = wedgeCenterLocal + jitter;

  const desiredMod = normalizeAngle(-Math.PI / 2 - localAngle);
  const currentMod = normalizeAngle(wheelRotation);
  let delta = normalizeAngle(desiredMod - currentMod);
  const extraTurns = 6 + Math.floor(Math.random() * 2); // 6 or 7
  const startRotation = wheelRotation;
  const spinRotation = startRotation + delta + extraTurns * Math.PI * 2;

  const windupAngle = 0.18;
  const windupMs = 240;
  const spinMs = 3400 + Math.random() * 500;

  let lastTickWedge = Math.floor(normalizeAngle(startRotation) / WEDGE_ANGLE);
  const t0 = performance.now();

  function windupFrame(now) {
    const t = Math.min(1, (now - t0) / windupMs);
    wheelRotation = startRotation - windupAngle * Math.sin(t * Math.PI / 2);
    drawWheel();
    if (t < 1) {
      requestAnimationFrame(windupFrame);
    } else {
      const t1 = performance.now();
      requestAnimationFrame((n) => spinFrame(n, t1));
    }
  }

  function spinFrame(now, t1) {
    const t = Math.min(1, (now - t1) / spinMs);
    const eased = easeOutQuint(t);
    const from = startRotation - windupAngle;
    wheelRotation = from + (spinRotation - from) * eased;
    drawWheel();

    // ratchet ticks as wedge boundaries are crossed
    const currentWedge = Math.floor(normalizeAngle(wheelRotation) / WEDGE_ANGLE);
    if (currentWedge !== lastTickWedge) {
      lastTickWedge = currentWedge;
      const speedFactor = 1 - t; // louder/faster early
      playTick(0.4 + speedFactor * 0.6);
    }

    // swoosh volume tied to speed — trigger once near the fast-middle section
    if (t > 0.02 && t < 0.04) playWhoosh(spinMs / 1000 * 0.7);

    if (t < 1) {
      requestAnimationFrame((n) => spinFrame(n, t1));
    } else {
      wheelRotation = spinRotation;
      drawWheel();
      finishFlourish(winner);
    }
  }

  requestAnimationFrame(windupFrame);
}

function finishFlourish(winner) {
  flashIndex = winner;
  drawWheel();
  wheelWrap.classList.add('shaking');
  pointerEl.classList.add('recoil');
  shockwaveEl.classList.remove('play');
  // eslint-disable-next-line no-unused-expressions
  void shockwaveEl.offsetWidth; // reflow to restart animation
  shockwaveEl.classList.add('play');
  playThud();
  setTimeout(playDing, 90);

  setTimeout(() => {
    wheelWrap.classList.remove('shaking');
    pointerEl.classList.remove('recoil');
  }, 550);

  setTimeout(() => {
    flashIndex = -1;
    drawWheel();
    spinning = false;
    showResult(winner);
  }, 420);
}

// ---------------------------------------------------------------
// RESULT / COMMIT / CROSS-OFF
// ---------------------------------------------------------------
let currentResultIndex = -1;

function showResult(index) {
  currentResultIndex = index;
  const a = ACTIVITIES[index];
  const revealed = a.cat !== 'mystery';
  resultIcon.textContent = a.icon;
  resultName.textContent = revealed ? a.name : 'mystery';
  resultPlace.textContent = revealed ? a.place : '';
  resultNote.textContent = revealed ? a.note : a.note; // notes never reveal identity even for mystery
  resultOverlay.hidden = false;
}

commitBtn.addEventListener('click', () => {
  if (currentResultIndex === -1) return;
  state.committed.push({
    index: currentResultIndex,
    done: false,
    committedAt: Date.now(),
    doneAt: null,
  });
  state.lastTag = ACTIVITIES[currentResultIndex].tag;
  saveState();
  resultOverlay.hidden = true;
  render();
});

crossOffBtn.addEventListener('click', () => {
  const pending = pendingEntry();
  if (!pending) return;
  pending.done = true;
  pending.doneAt = Date.now();
  saveState();
  render();
});

resetBtn.addEventListener('click', () => confirmReset());
finaleResetBtn.addEventListener('click', () => confirmReset());

function confirmReset() {
  if (window.confirm('reset the whole 30-day challenge? this cannot be undone.')) {
    state = { version: 1, committed: [], lastTag: null };
    saveState();
    wheelRotation = 0;
    render();
  }
}

// ---------------------------------------------------------------
// RENDER (top-level UI sync from state)
// ---------------------------------------------------------------
function render() {
  drawWheel();

  const done = doneCount();
  const pending = pendingEntry();
  const finished = done >= 30;

  dayNum.textContent = String(currentDay()).padStart(2, '0');
  crossedCount.textContent = String(done);
  progressFill.style.width = `${(done / 30) * 100}%`;

  finaleOverlay.hidden = !finished;

  if (finished) {
    spinBtn.hidden = true;
    missionBar.hidden = true;
    return;
  }

  if (pending) {
    spinBtn.hidden = true;
    missionBar.hidden = false;
    const a = ACTIVITIES[pending.index];
    const revealed = a.cat !== 'mystery';
    missionIcon.textContent = a.icon;
    missionName.textContent = revealed ? a.name : 'mystery';
    missionPlace.textContent = revealed ? a.place : '';
  } else {
    spinBtn.hidden = false;
    spinBtn.disabled = false;
    missionBar.hidden = true;
  }
}

// ---------------------------------------------------------------
// STORY EXPORT — 1080x1920 PNG
// ---------------------------------------------------------------
async function drawExport(index) {
  await (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());

  const ec = exportCanvas.getContext('2d');
  const W = 1080, H = 1920;
  ec.clearRect(0, 0, W, H);

  // background
  ec.fillStyle = COLORS.ink;
  ec.fillRect(0, 0, W, H);

  const vignette = ec.createRadialGradient(W / 2, H * 0.45, H * 0.15, W / 2, H * 0.45, H * 0.75);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.55)');

  // top: wordmark + day
  ec.textAlign = 'left';
  ec.fillStyle = COLORS.bone;
  ec.font = `900 64px Fraunces, serif`;
  ec.fillText('noexcuses', 70, 150);
  const wmWidth = ec.measureText('noexcuses').width;
  ec.fillStyle = COLORS.vermilion;
  ec.fillText('.', 70 + wmWidth, 150);

  ec.font = `400 26px 'Space Grotesk', sans-serif`;
  ec.fillStyle = COLORS.ash;
  ec.fillText('by the mind game', 72, 190);

  ec.textAlign = 'right';
  ec.font = `700 30px 'Courier Prime', monospace`;
  ec.fillStyle = COLORS.ash;
  ec.fillText('DAY', W - 220, 130);
  ec.font = `700 64px 'Courier Prime', monospace`;
  ec.fillStyle = COLORS.vermilion;
  ec.fillText(String(currentDay()).padStart(2, '0'), W - 70, 150);
  ec.font = `400 26px 'Courier Prime', monospace`;
  ec.fillStyle = COLORS.ash;
  ec.fillText('/ 30', W - 70, 190);

  // wheel snapshot — render the live canvas at its landed rotation
  const wheelSize = 860;
  const wx = (W - wheelSize) / 2;
  const wy = 280;
  ec.save();
  ec.beginPath();
  ec.arc(wx + wheelSize / 2, wy + wheelSize / 2, wheelSize / 2, 0, Math.PI * 2);
  ec.closePath();
  ec.drawImage(canvas, wx, wy, wheelSize, wheelSize);
  ec.restore();

  // pointer for export
  ec.fillStyle = COLORS.vermilion;
  ec.beginPath();
  ec.moveTo(wx + wheelSize / 2 - 26, wy - 8);
  ec.lineTo(wx + wheelSize / 2 + 26, wy - 8);
  ec.lineTo(wx + wheelSize / 2, wy + 42);
  ec.closePath();
  ec.fill();

  // rim highlight ring
  ec.beginPath();
  ec.arc(wx + wheelSize / 2, wy + wheelSize / 2, wheelSize / 2 + 6, 0, Math.PI * 2);
  ec.lineWidth = 8;
  ec.strokeStyle = COLORS.vermilion;
  ec.stroke();

  ec.fillStyle = vignette;
  ec.fillRect(0, 0, W, H);

  // bottom card
  const a = ACTIVITIES[index];
  const revealed = a.cat !== 'mystery';
  const cardY = wy + wheelSize + 90;
  ec.fillStyle = COLORS.panel;
  roundRect(ec, 60, cardY, W - 120, H - cardY - 90, 34);
  ec.fill();
  ec.strokeStyle = COLORS.vermilion;
  ec.lineWidth = 4;
  roundRect(ec, 60, cardY, W - 120, H - cardY - 90, 34);
  ec.stroke();

  ec.textAlign = 'left';
  ec.font = `700 28px 'Courier Prime', monospace`;
  ec.fillStyle = COLORS.ash;
  ec.fillText(`DAY ${String(currentDay()).padStart(2, '0')} / 30`, 110, cardY + 70);

  ec.font = `64px sans-serif`;
  ec.fillText(revealed ? a.icon : '🎁', 110, cardY + 160);

  ec.font = `900 52px Fraunces, serif`;
  ec.fillStyle = COLORS.bone;
  ec.fillText(revealed ? a.name : 'mystery', 220, cardY + 150);

  ec.font = `400 30px 'Space Grotesk', sans-serif`;
  ec.fillStyle = COLORS.gold;
  ec.fillText(revealed ? a.place : '', 220, cardY + 195);

  ec.textAlign = 'right';
  ec.font = `700 26px 'Courier Prime', monospace`;
  ec.fillStyle = COLORS.gold;
  ec.fillText('©noexcuses', W - 110, cardY + (H - cardY - 90) - 40);

  return exportCanvas;
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

async function saveStory(index) {
  if (index == null || index < 0) return;
  try {
    await drawExport(index);
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `noexcuses-day-${String(currentDay()).padStart(2, '0')}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, 'image/png');
  } catch (e) {
    console.warn('noexcuses: story export failed', e);
  }
}

saveStoryResultBtn.addEventListener('click', () => saveStory(currentResultIndex));
saveStoryMissionBtn.addEventListener('click', () => {
  const pending = pendingEntry();
  if (pending) saveStory(pending.index);
});
saveStoryFinaleBtn.addEventListener('click', () => saveStory(BOSS_INDEX));

// ---------------------------------------------------------------
// OPTIONAL: record clip via MediaRecorder (feature-detected)
// ---------------------------------------------------------------
let recordArmed = false;
let recorder = null;

function maybeAddRecordButton() {
  if (!('MediaRecorder' in window) || !canvas.captureStream) return;
  const btn = document.createElement('button');
  btn.textContent = '🎥 record clip';
  btn.type = 'button';
  btn.className = 'btn-story';
  btn.style.marginTop = '8px';
  btn.style.fontSize = '11px';
  btn.style.padding = '8px 12px';
  btn.addEventListener('click', () => {
    recordArmed = !recordArmed;
    btn.style.opacity = recordArmed ? '1' : '0.55';
    btn.textContent = recordArmed ? '🎥 armed — spin now' : '🎥 record clip';
  });
  btn.style.opacity = '0.55';
  $('controls').appendChild(btn);
}

function maybeStartRecording() {
  if (!recordArmed) return;
  try {
    const stream = canvas.captureStream(30);
    recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `noexcuses-day-${String(currentDay()).padStart(2, '0')}-clip.webm`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    };
    recorder.start();
    setTimeout(() => { if (recorder && recorder.state !== 'inactive') recorder.stop(); }, 5000);
    recordArmed = false;
  } catch (e) {
    console.warn('noexcuses: record clip unavailable', e);
  }
}

// ---------------------------------------------------------------
// PWA — service worker registration
// ---------------------------------------------------------------
function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch((e) => {
        console.warn('noexcuses: service worker registration failed', e);
      });
    });
  }
}

// ---------------------------------------------------------------
// INIT
// ---------------------------------------------------------------
spinBtn.addEventListener('click', () => {
  maybeStartRecording();
  spin();
});

function init() {
  loadState();
  resizeCanvas();
  render();
  registerSW();
  maybeAddRecordButton();
}

init();

})();
