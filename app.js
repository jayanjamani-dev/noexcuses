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
const OVERRIDES_KEY = 'noexcuses:overrides:v1';
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
// ACTIVITY OVERRIDES — user-editable name / place / note per activity
// ---------------------------------------------------------------
let overrides = {}; // { [index]: { name, place, note } }

function loadOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') overrides = parsed;
  } catch (e) {
    console.warn('noexcuses: failed to load overrides', e);
  }
}

function saveOverrides() {
  try {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.warn('noexcuses: failed to save overrides', e);
  }
}

function getActivity(index) {
  const base = ACTIVITIES[index];
  const o = overrides[index];
  if (!o) return base;
  return {
    ...base,
    name: (o.name != null && o.name !== '') ? o.name : base.name,
    place: (o.place != null && o.place !== '') ? o.place : base.place,
    note: (o.note != null && o.note !== '') ? o.note : base.note,
  };
}

function setOverride(index, field, value) {
  if (!overrides[index]) overrides[index] = {};
  overrides[index][field] = value;
  saveOverrides();
}

// activities where the real activity isn't known until you ask someone —
// these lock in on landing but block cross-off until a name is filled in.
function needsFillIn(activity) {
  return activity.cat === 'mate' || activity.cat === 'stranger' || activity.tag === 'WILD';
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
const spinBtnLabel = $('spinBtnLabel');
const missionBar = $('missionBar');
const missionIcon = $('missionIcon');
const missionName = $('missionName');
const missionPlace = $('missionPlace');
const missionFillWrap = $('missionFillWrap');
const missionFillInput = $('missionFillInput');
const missionFillSaveBtn = $('missionFillSaveBtn');
const crossOffBtn = $('crossOffBtn');
const resultOverlay = $('resultOverlay');
const resultCard = $('resultCard');
const resultCloseBtn = $('resultCloseBtn');
const mysteryBox = $('mysteryBox');
const resultReveal = $('resultReveal');
const resultIcon = $('resultIcon');
const resultName = $('resultName');
const resultPlace = $('resultPlace');
const resultNote = $('resultNote');
const resultMateWrap = $('resultMateWrap');
const resultMateInput = $('resultMateInput');
const commitBtn = $('commitBtn');
const photoInput = $('photoInput');
const dayNum = $('dayNum');
const crossedCount = $('crossedCount');
const progressFill = $('progressFill');
const finaleOverlay = $('finaleOverlay');
const finaleResetBtn = $('finaleResetBtn');
const saveStoryFinaleBtn = $('saveStoryFinaleBtn');
const exportCanvas = $('exportCanvas');
const menuBtn = $('menuBtn');
const menuPanel = $('menuPanel');
const menuBackdrop = $('menuBackdrop');
const menuSaveStory = $('menuSaveStory');
const menuRecordClip = $('menuRecordClip');
const menuEditActivities = $('menuEditActivities');
const menuHistory = $('menuHistory');
const menuReset = $('menuReset');
const editOverlay = $('editOverlay');
const editCloseBtn = $('editCloseBtn');
const editList = $('editList');
const historyOverlay = $('historyOverlay');
const historyCloseBtn = $('historyCloseBtn');
const historyList = $('historyList');

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

    // label — icon + text on a single line, reading outward from hub
    const mid = start + WEDGE_ANGLE / 2;
    ctx.save();
    ctx.rotate(mid);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const labelR = r * 0.93;
    ctx.translate(labelR, 0);

    const iconSize = Math.round(r * 0.058);
    const textSize = Math.round(r * 0.042);
    ctx.font = `600 ${textSize}px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = isFlashing ? COLORS.ink : textColorFor(activity, isBone);
    const textWidth = ctx.measureText(activity.label).width;

    // draw label text first (rightmost/outermost), then icon just left of it
    ctx.fillText(activity.label, 0, 0);
    ctx.font = `${iconSize}px sans-serif`;
    ctx.fillText(activity.icon, -textWidth - iconSize * 0.35, 0);

    if (isDone && !isFlashing) {
      // vermilion strike-through across the whole label
      ctx.strokeStyle = COLORS.vermilion;
      ctx.lineWidth = Math.max(1.5, r * 0.012);
      ctx.beginPath();
      ctx.moveTo(-textWidth - iconSize * 1.1, 0);
      ctx.lineTo(r * 0.02, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  // outer rim — vermilion base with a thin gold accent ring just inside it
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.985, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(2, r * 0.02);
  ctx.strokeStyle = COLORS.vermilion;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, r * 0.985 - Math.max(2, r * 0.02) * 0.9, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1, r * 0.008);
  ctx.strokeStyle = COLORS.gold;
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
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2200;
    osc.type = 'triangle';
    osc.frequency.value = 340 + Math.random() * 40;
    gain.gain.setValueAtTime(0.001, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.06 * strength, ac.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.05);
    osc.connect(filter).connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.06);
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
    filter.Q.value = 0.6;
    filter.frequency.setValueAtTime(1200, ac.currentTime);
    filter.frequency.exponentialRampToValueAtTime(220, ac.currentTime + duration);

    const lowpass = ac.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 3200;

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, ac.currentTime + duration * 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);

    noise.connect(filter).connect(lowpass).connect(gain).connect(ac.destination);
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
    osc.frequency.setValueAtTime(120, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(42, ac.currentTime + 0.28);
    gain.gain.setValueAtTime(0.001, ac.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ac.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.32);
    osc.connect(gain).connect(ac.destination);
    osc.start();
    osc.stop(ac.currentTime + 0.34);
  } catch (e) { /* noop */ }
}

function playDing() {
  try {
    const ac = ensureAudio();
    if (!ac) return;
    // warm bell: fundamental + a couple of soft harmonics, gently detuned
    const partials = [
      { ratio: 1,    gain: 0.22, type: 'sine' },
      { ratio: 2.01, gain: 0.09, type: 'sine' },
      { ratio: 3.0,  gain: 0.045, type: 'sine' },
    ];
    const base = 880;
    const master = ac.createGain();
    master.gain.value = 1;
    master.connect(ac.destination);

    partials.forEach((p) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = p.type;
      osc.frequency.value = base * p.ratio;
      gain.gain.setValueAtTime(0.0001, ac.currentTime);
      gain.gain.linearRampToValueAtTime(p.gain, ac.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.9);
      osc.connect(gain).connect(master);
      osc.start(ac.currentTime + 0.04);
      osc.stop(ac.currentTime + 0.95);
    });
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
  if (spinBtnLabel) spinBtnLabel.textContent = 'rolling…';
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
  const spinMs = 3800 + Math.random() * 700; // ~3.8-4.5s spin

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
    spinBtn.disabled = false;
    if (spinBtnLabel) spinBtnLabel.textContent = 'spin';
    showResult(winner);
  }, 420);
}

// ---------------------------------------------------------------
// RESULT / COMMIT / CROSS-OFF
// ---------------------------------------------------------------
let currentResultIndex = -1;

const CONFETTI_EMOJI = ['🎉', '✨', '🔥', '💥', '⭐'];

function spawnConfetti(count = 10) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    p.textContent = CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
    resultCard.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

function showResult(index) {
  currentResultIndex = index;
  const base = ACTIVITIES[index];
  const a = getActivity(index);
  const isMystery = base.cat === 'mystery';
  const needsMate = needsFillIn(base);

  resultIcon.textContent = a.icon;
  resultName.textContent = isMystery ? 'mystery' : a.name;
  resultPlace.textContent = isMystery ? '' : a.place;
  resultNote.textContent = a.note; // notes never reveal identity even for mystery

  resultMateWrap.hidden = !needsMate;
  resultMateInput.value = '';
  resultMateInput.classList.remove('input-error');

  if (isMystery) {
    mysteryBox.hidden = false;
    mysteryBox.classList.remove('opening');
    resultReveal.hidden = true;
  } else {
    mysteryBox.hidden = true;
    resultReveal.hidden = false;
  }

  resultOverlay.hidden = false;
}

mysteryBox.addEventListener('click', () => {
  if (mysteryBox.classList.contains('opening')) return;
  mysteryBox.classList.add('opening');
  spawnConfetti();
  playDing();
  setTimeout(() => {
    mysteryBox.hidden = true;
    resultReveal.hidden = false;
  }, 420);
});

// pushes a landed wedge into state.committed as pending (done: false).
// no-ops if this index is already the pending mission (avoids duplicates
// if lock-in gets triggered twice for the same landing).
function lockInPending(index) {
  if (state.committed.some((c) => c.index === index && !c.done)) return;
  state.committed.push({
    index,
    done: false,
    committedAt: Date.now(),
    doneAt: null,
  });
  state.lastTag = ACTIVITIES[index].tag;
  saveState();
}

commitBtn.addEventListener('click', () => {
  if (currentResultIndex === -1) return;
  const base = ACTIVITIES[currentResultIndex];
  if (needsFillIn(base)) {
    const val = resultMateInput.value.trim();
    if (val) setOverride(currentResultIndex, 'name', val);
    // blank is fine — it locks in now and can be filled in later from the mission bar.
  }
  lockInPending(currentResultIndex);
  resultOverlay.hidden = true;
  currentResultIndex = -1;
  render();
});

resultCloseBtn.addEventListener('click', () => {
  if (currentResultIndex !== -1) {
    const base = ACTIVITIES[currentResultIndex];
    if (needsFillIn(base)) {
      // fill-in-required wedges (mate's pick, stranger, try a new activity)
      // lock in even if closed without an answer yet — you might need to
      // text a friend and get back to it later. it stays as the pending
      // mission (blocking a re-spin) until you fill it in and cross it off.
      const val = resultMateInput.value.trim();
      if (val) setOverride(currentResultIndex, 'name', val);
      lockInPending(currentResultIndex);
    }
  }
  // everything else: closing without committing keeps the landed wedge
  // available to spin again.
  resultOverlay.hidden = true;
  currentResultIndex = -1;
  render();
});

crossOffBtn.addEventListener('click', () => {
  const pending = pendingEntry();
  if (!pending) return;
  if (needsFillIn(ACTIVITIES[pending.index]) && !(overrides[pending.index] && overrides[pending.index].name)) {
    missionFillInput.focus();
    return;
  }
  pending.done = true;
  pending.doneAt = Date.now();
  saveState();
  render();
});

missionFillSaveBtn.addEventListener('click', () => {
  const pending = pendingEntry();
  if (!pending) return;
  const val = missionFillInput.value.trim();
  if (!val) { missionFillInput.focus(); return; }
  setOverride(pending.index, 'name', val);
  missionFillInput.value = '';
  render();
});

missionFillInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') missionFillSaveBtn.click();
});

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
    const base = ACTIVITIES[pending.index];
    const a = getActivity(pending.index);
    const revealed = base.cat !== 'mystery';
    missionIcon.textContent = a.icon;
    missionName.textContent = revealed ? a.name : 'mystery';
    missionPlace.textContent = revealed ? a.place : '';

    const hasOverrideName = !!(overrides[pending.index] && overrides[pending.index].name);
    const needsFill = needsFillIn(base) && !hasOverrideName;
    missionFillWrap.hidden = !needsFill;
    crossOffBtn.disabled = needsFill;
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
  const a = getActivity(index);
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

// tries the native share sheet first (one tap -> Instagram/anywhere else
// on supported mobile browsers), falls back to a plain download on
// desktop or when the browser doesn't support sharing files.
async function shareOrDownloadBlob(blob, filename, text) {
  if (navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], filename, { type: blob.type });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'noexcuses.', text });
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return; // user cancelled the share sheet
      // fall through to download on any other share failure
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

async function saveStory(index) {
  if (index == null || index < 0) return;
  try {
    await drawExport(index);
    const a = getActivity(index);
    const isMystery = ACTIVITIES[index].cat === 'mystery';
    const caption = `day ${String(currentDay()).padStart(2, '0')} of 30 — ${isMystery ? 'mystery' : a.name} #noexcuses #30daychallenge`;
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      shareOrDownloadBlob(blob, `noexcuses-day-${String(currentDay()).padStart(2, '0')}.png`, caption);
    }, 'image/png');
  } catch (e) {
    console.warn('noexcuses: story export failed', e);
  }
}

saveStoryFinaleBtn.addEventListener('click', () => saveStory(BOSS_INDEX));

// ---------------------------------------------------------------
// OVERFLOW MENU — save story / record clip / reset
// ---------------------------------------------------------------
function openMenu() {
  menuPanel.hidden = false;
  menuBackdrop.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  menuPanel.hidden = true;
  menuBackdrop.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}
menuBtn.addEventListener('click', () => {
  if (menuPanel.hidden) openMenu(); else closeMenu();
});
menuBackdrop.addEventListener('click', closeMenu);

menuSaveStory.addEventListener('click', () => {
  closeMenu();
  // save whatever is currently relevant: an open result card, else the pending mission
  let index = -1;
  if (!resultOverlay.hidden && currentResultIndex !== -1) index = currentResultIndex;
  else {
    const pending = pendingEntry();
    if (pending) index = pending.index;
  }
  if (index === -1) {
    window.alert('spin and commit first — then you can save a story.');
    return;
  }
  saveStory(index);
});

menuReset.addEventListener('click', () => {
  closeMenu();
  confirmReset();
});

// ---------------------------------------------------------------
// OPTIONAL: record clip via MediaRecorder (feature-detected)
// ---------------------------------------------------------------
let recordArmed = false;
let recorder = null;
const recordSupported = ('MediaRecorder' in window) && !!canvas.captureStream;

if (!recordSupported) {
  menuRecordClip.hidden = true;
} else {
  menuRecordClip.addEventListener('click', () => {
    recordArmed = !recordArmed;
    menuRecordClip.querySelector('.menu-item-icon').textContent = recordArmed ? '⏺️' : '🎥';
    menuRecordClip.lastChild.textContent = recordArmed ? 'armed — spin now' : 'record clip';
    if (recordArmed) closeMenu();
  });
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
// EDIT ACTIVITIES — in-app editable name / place / note per activity
// ---------------------------------------------------------------
function buildEditRow(index) {
  const a = getActivity(index);
  const row = document.createElement('div');
  row.className = 'edit-row';

  const idx = document.createElement('div');
  idx.className = 'edit-row-index';
  idx.textContent = String(index + 1).padStart(2, '0');

  const icon = document.createElement('div');
  icon.className = 'edit-row-icon';
  icon.textContent = a.icon;

  const fields = document.createElement('div');
  fields.className = 'edit-row-fields';

  const tag = document.createElement('div');
  tag.className = 'edit-row-tag';
  tag.textContent = `${a.tag} · ${a.type}`;
  fields.appendChild(tag);

  const nameLabel = document.createElement('div');
  nameLabel.className = 'edit-row-label';
  nameLabel.textContent = 'activity';
  fields.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.className = 'edit-input';
  nameInput.type = 'text';
  nameInput.value = a.name;
  nameInput.addEventListener('input', () => {
    setOverride(index, 'name', nameInput.value.trim());
    render();
  });
  fields.appendChild(nameInput);

  const placeLabel = document.createElement('div');
  placeLabel.className = 'edit-row-label';
  placeLabel.textContent = 'place';
  fields.appendChild(placeLabel);

  const placeInput = document.createElement('input');
  placeInput.className = 'edit-input edit-input-place';
  placeInput.type = 'text';
  placeInput.value = a.place;
  placeInput.addEventListener('input', () => {
    setOverride(index, 'place', placeInput.value.trim());
    render();
  });
  fields.appendChild(placeInput);

  const noteLabel = document.createElement('div');
  noteLabel.className = 'edit-row-label';
  noteLabel.textContent = 'note';
  fields.appendChild(noteLabel);

  const noteInput = document.createElement('textarea');
  noteInput.className = 'edit-input edit-textarea';
  noteInput.value = a.note;
  noteInput.rows = 2;
  noteInput.addEventListener('input', () => {
    setOverride(index, 'note', noteInput.value.trim());
    render();
  });
  fields.appendChild(noteInput);

  row.appendChild(idx);
  row.appendChild(icon);
  row.appendChild(fields);
  return row;
}

function populateEditList() {
  editList.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 30; i++) frag.appendChild(buildEditRow(i));
  editList.appendChild(frag);
}

menuEditActivities.addEventListener('click', () => {
  closeMenu();
  populateEditList();
  editOverlay.hidden = false;
});

editCloseBtn.addEventListener('click', () => {
  editOverlay.hidden = true;
});

// ---------------------------------------------------------------
// HISTORY — what you've actually completed, in order
// ---------------------------------------------------------------
function formatHistoryDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// the history log is a private record, so unlike the live mission bar /
// result card it fully reveals mystery + fill-in activities: "mystery —
// marathon", "mate's pick — kickboxing at the local gym", etc.
function historyLabel(index) {
  const base = ACTIVITIES[index];
  const o = overrides[index];
  const overrideName = o && o.name;
  if (base.cat === 'mystery') {
    return { name: `mystery — ${base.name}`, place: base.place };
  }
  if (needsFillIn(base)) {
    const prefix = base.cat === 'mate' ? "mate's pick" : base.cat === 'stranger' ? 'stranger' : 'try a new activity';
    return { name: overrideName ? `${prefix} — ${overrideName}` : prefix, place: base.place };
  }
  const a = getActivity(index);
  return { name: a.name, place: a.place };
}

// ---------------------------------------------------------------
// MEDIA — photos + videos per completed activity, stored in IndexedDB
// (localStorage's ~5-10MB quota can't hold multiple photos let alone
// video, so blobs live in IndexedDB and state.committed just stays small)
// ---------------------------------------------------------------
const MEDIA_DB_NAME = 'noexcuses-media';
const MEDIA_STORE = 'media';
let mediaDBPromise = null;

function getMediaDB() {
  if (!('indexedDB' in window)) return Promise.reject(new Error('indexedDB unavailable'));
  if (!mediaDBPromise) {
    mediaDBPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(MEDIA_DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(MEDIA_STORE)) {
          const store = db.createObjectStore(MEDIA_STORE, { keyPath: 'id' });
          store.createIndex('entryKey', 'entryKey', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }).catch((e) => { mediaDBPromise = null; throw e; });
  }
  return mediaDBPromise;
}

async function addMedia(entryKey, type, blob) {
  const db = await getMediaDB();
  const id = `${entryKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readwrite');
    tx.objectStore(MEDIA_STORE).put({ id, entryKey, type, blob, createdAt: Date.now() });
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

async function getMediaForEntry(entryKey) {
  try {
    const db = await getMediaDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(MEDIA_STORE, 'readonly');
      const req = tx.objectStore(MEDIA_STORE).index('entryKey').getAll(IDBKeyRange.only(entryKey));
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    return [];
  }
}

function compressImageToBlob(file, maxDim = 1080, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxDim) {
        height = Math.round(height * (maxDim / width));
        width = maxDim;
      } else if (height > maxDim) {
        width = Math.round(width * (maxDim / height));
        height = maxDim;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/jpeg', quality);
    };
    img.onerror = reject;
    img.src = url;
  });
}

const MAX_VIDEO_BYTES = 60 * 1024 * 1024; // 60MB — guard against accidentally picking a huge 4K clip
let pendingPhotoEntry = null;

function triggerPhotoAdd(entry) {
  pendingPhotoEntry = entry;
  photoInput.value = '';
  photoInput.click();
}

photoInput.addEventListener('change', async () => {
  const files = Array.from(photoInput.files || []);
  const entry = pendingPhotoEntry;
  pendingPhotoEntry = null;
  if (!files.length || !entry) return;
  for (const file of files) {
    try {
      if (file.type.startsWith('video/')) {
        if (file.size > MAX_VIDEO_BYTES) {
          console.warn('noexcuses: video too large, skipping', file.name, file.size);
          continue;
        }
        await addMedia(entry.committedAt, 'video', file);
      } else if (file.type.startsWith('image/')) {
        const blob = await compressImageToBlob(file);
        await addMedia(entry.committedAt, 'photo', blob);
      }
    } catch (e) {
      console.warn('noexcuses: failed to attach media', e);
    }
  }
  populateHistoryList();
});

let galleryObjectUrls = [];
function revokeGalleryUrls() {
  galleryObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  galleryObjectUrls = [];
}

async function renderGallery(galleryEl, entry) {
  const items = await getMediaForEntry(entry.committedAt);
  galleryEl.innerHTML = '';
  items.forEach((item) => {
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    const url = URL.createObjectURL(item.blob);
    galleryObjectUrls.push(url);
    if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = url;
      vid.muted = true;
      vid.playsInline = true;
      thumb.appendChild(vid);
      const playIcon = document.createElement('span');
      playIcon.className = 'gallery-thumb-play';
      playIcon.textContent = '▶';
      thumb.appendChild(playIcon);
    } else {
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      thumb.appendChild(img);
    }
    galleryEl.appendChild(thumb);
  });
  const addBtn = document.createElement('div');
  addBtn.className = 'gallery-thumb gallery-thumb-add';
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => triggerPhotoAdd(entry));
  galleryEl.appendChild(addBtn);
}

function buildHistoryRow(entry, dayIndex) {
  const a = getActivity(entry.index);
  const label = historyLabel(entry.index);

  const row = document.createElement('div');
  row.className = 'history-row';

  const top = document.createElement('div');
  top.className = 'history-row-top';

  const day = document.createElement('div');
  day.className = 'history-row-day';
  day.textContent = `DAY ${String(dayIndex).padStart(2, '0')}`;

  const icon = document.createElement('div');
  icon.className = 'history-row-icon';
  icon.textContent = a.icon;

  const main = document.createElement('div');
  main.className = 'history-row-main';
  const name = document.createElement('div');
  name.className = 'history-row-name';
  name.textContent = label.name;
  const place = document.createElement('div');
  place.className = 'history-row-place';
  place.textContent = label.place || '';
  main.appendChild(name);
  main.appendChild(place);

  const date = document.createElement('div');
  date.className = 'history-row-date';
  date.textContent = formatHistoryDate(entry.doneAt);

  top.appendChild(day);
  top.appendChild(icon);
  top.appendChild(main);
  top.appendChild(date);

  const gallery = document.createElement('div');
  gallery.className = 'history-row-gallery';

  row.appendChild(top);
  row.appendChild(gallery);

  renderGallery(gallery, entry);

  return row;
}

function populateHistoryList() {
  revokeGalleryUrls();
  historyList.innerHTML = '';
  const done = state.committed.filter(c => c.done);
  if (done.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'nothing crossed off yet — go spin.';
    historyList.appendChild(empty);
    return;
  }
  const frag = document.createDocumentFragment();
  done.forEach((entry, i) => frag.appendChild(buildHistoryRow(entry, i + 1)));
  historyList.appendChild(frag);
}

menuHistory.addEventListener('click', () => {
  closeMenu();
  populateHistoryList();
  historyOverlay.hidden = false;
});

historyCloseBtn.addEventListener('click', () => {
  historyOverlay.hidden = true;
});

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
  loadOverrides();
  resizeCanvas();
  render();
  registerSW();
}

init();

})();
