"use strict";
/* ===== CONFIGURATION — edit here ===== */
const CONFIG = {
  senderName: "Pawan Kumar",          // बदलने के लिए अपना नाम लिखें (या लिंक में ?from=नाम जोड़ें)
  siteUrl: "",                        // वैकल्पिक: अपनी GitHub Pages URL, जैसे "https://username.github.io/chhath-puja/"
  songFile: "assets/chhath-song.mp3", // आपके पास वैध रूप से उपलब्ध MP3
  loop: true,
  volume: 0.6
};
const $ = s => document.querySelector(s);
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const from = new URLSearchParams(location.search).get("from");
const sender = (from && from.trim().slice(0, 40)) || CONFIG.senderName;
$("#sender").textContent = sender;

/* ---- toast ---- */
let tt;
function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 3500); }

/* ---- loader ---- */
const t0 = performance.now();
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), Math.max(0, 1500 - (performance.now() - t0))));

/* ---- greeting text / share / copy ---- */
function greeting(url) {
  return "🌅 शुभ छठ पूजा 🌅\nजय छठी मैया | जय सूर्य देव\n\n" + $("#msg").textContent + "\n\n— " + sender + (url ? "\n\n" + url : "");
}
function liveUrl() {
  if (CONFIG.siteUrl) return CONFIG.siteUrl;
  const h = location.hostname;
  if (!h || h === "localhost" || h === "127.0.0.1" || h.endsWith(".local") || location.protocol === "file:") return "";
  return location.origin + location.pathname;
}
$("#share").addEventListener("click", () => {
  const u = liveUrl();
  if (!u) toast("यह लोकल है — GitHub Pages पर deploy करें या CONFIG.siteUrl भरें, तब लिंक जुड़ेगा।");
  window.open("https://wa.me/?text=" + encodeURIComponent(greeting(u)), "_blank", "noopener");
});
$("#copy").addEventListener("click", async () => {
  const txt = greeting(liveUrl());
  try { await navigator.clipboard.writeText(txt); toast("शुभकामना कॉपी हो गई ✅"); }
  catch (e) {
    const a = document.createElement("textarea"); a.value = txt; a.style.position = "fixed"; a.style.opacity = "0";
    document.body.appendChild(a); a.select();
    try { document.execCommand("copy"); toast("शुभकामना कॉपी हो गई ✅"); } catch (_) { toast("कॉपी नहीं हो सका, कृपया हाथ से चुनकर कॉपी करें।"); }
    a.remove();
  }
});

/* ---- music ---- */
const au = new Audio(); au.preload = "none"; au.loop = CONFIG.loop; au.volume = CONFIG.volume;
$("#vol").value = CONFIG.volume; $("#loop").checked = CONFIG.loop;
const playBtn = $("#play"), eq = $("#eq"), mm = $("#mmsg");
function ui() {
  const on = !au.paused;
  eq.classList.toggle("on", on); playBtn.setAttribute("aria-pressed", on);
  playBtn.textContent = on ? "⏸ संगीत रोकें" : "🎵 संगीत चलाएं";
  $("#mute").textContent = au.muted || au.volume === 0 ? "🔇" : "🔊";
  $("#mute").setAttribute("aria-label", au.muted ? "आवाज़ चालू करें" : "आवाज़ बंद करें");
}
function missing() { ui(); mm.textContent = "संगीत फ़ाइल नहीं मिली। assets/chhath-song.mp3 जोड़ें — तब तक वेबसाइट बिना संगीत के चलेगी 🙏"; }
playBtn.addEventListener("click", () => {
  if (!au.paused) { au.pause(); return; }
  if (!au.src) au.src = CONFIG.songFile;
  au.play().then(() => { mm.textContent = "🎵 पहिले-पहिले हम कईनी छठी मइया व्रत तोहार — शारदा सिन्हा जी"; ui(); }).catch(missing);
});
au.addEventListener("error", missing);
["play", "pause", "ended", "volumechange"].forEach(e => au.addEventListener(e, ui));
$("#mute").addEventListener("click", () => { au.muted = !au.muted; });
$("#vol").addEventListener("input", e => { au.volume = +e.target.value; au.muted = false; });
$("#loop").addEventListener("change", e => { au.loop = e.target.checked; });

/* ---- Chhath video: play two short clips in sequence ---- */
const chhathVideo = $("#chhathVideo");
const videoPlay = $("#videoPlay");
const videoClips = ["assets/scene-1.mp4", "assets/scene-2.mp4"];
let activeClip = 0;
function setVideoButton(playing) {
  videoPlay.textContent = playing ? "Ⅱ" : "▶";
  videoPlay.classList.toggle("playing", playing);
  videoPlay.setAttribute("aria-label", playing ? "वीडियो रोकें" : "वीडियो चलाएं");
}
async function startChhathVideo() {
  try { await chhathVideo.play(); setVideoButton(true); }
  catch (_) { setVideoButton(false); toast("वीडियो चलाने के लिए ▶ दबाएं।"); }
}
videoPlay.addEventListener("click", () => {
  if (chhathVideo.paused) startChhathVideo();
  else { chhathVideo.pause(); setVideoButton(false); }
});
chhathVideo.addEventListener("click", () => {
  if (chhathVideo.paused) startChhathVideo();
  else { chhathVideo.pause(); setVideoButton(false); }
});
chhathVideo.addEventListener("play", () => setVideoButton(true));
chhathVideo.addEventListener("pause", () => setVideoButton(false));
chhathVideo.addEventListener("ended", () => {
  if (activeClip === 0) {
    activeClip = 1;
    $("#filmLabel").textContent = "छठ घाट • अर्घ्य का पावन दृश्य";
    chhathVideo.src = videoClips[activeClip];
    chhathVideo.load();
    startChhathVideo();
  } else {
    activeClip = 0;
    $("#filmLabel").textContent = "छठ घाट की एक झलक";
    chhathVideo.src = videoClips[activeClip];
    chhathVideo.load();
    setVideoButton(false);
  }
});
chhathVideo.addEventListener("error", () => {
  setVideoButton(false);
  $("#filmLabel").textContent = "वीडियो फ़ाइल उपलब्ध नहीं है";
});

/* ---- canvas effects: diyas, flowers, sparks, fireworks ---- */
const cv = $("#fx"), cx = cv.getContext("2d");
let W, H, diyas = [], flowers = [], sparks = [], fw = [], burstUntil = 0, nextFw = 0, raf = 0;
const small = innerWidth < 600, rnd = (a, b) => a + Math.random() * (b - a);
function init() {
  const d = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
  diyas = Array.from({ length: small ? 8 : 16 }, () => ({ x: rnd(0, W), y: rnd(H * .72, H * .96), s: rnd(6, 11), v: rnd(.1, .35), p: rnd(0, 6) }));
  flowers = RM ? [] : Array.from({ length: small ? 8 : 16 }, () => newFlower(true));
  sparks = RM ? [] : Array.from({ length: small ? 22 : 45 }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(1, 2.6), v: rnd(.2, .7), p: rnd(0, 6) }));
}
function newFlower(any) { return { x: rnd(0, W), y: any ? rnd(-H, H) : -20, s: rnd(5, 10), r: rnd(0, 6), vr: rnd(-.02, .02), vy: rnd(.4, 1), p: rnd(0, 6), c: Math.random() < .6 ? "#ff9f1c" : "#ffd34d" }; }
function drawDiya(d, t) {
  const y = d.y + Math.sin(t / 900 + d.p) * 3;
  cx.save(); cx.translate(d.x, y);
  const g = cx.createRadialGradient(0, -6, 1, 0, -6, d.s * 3); g.addColorStop(0, "rgba(255,200,80,.85)"); g.addColorStop(1, "rgba(255,140,0,0)");
  cx.fillStyle = g; cx.beginPath(); cx.arc(0, -6, d.s * 3, 0, 7); cx.fill();
  cx.fillStyle = "#8a3b12"; cx.beginPath(); cx.ellipse(0, 0, d.s, d.s * .5, 0, 0, Math.PI); cx.fill();
  cx.fillStyle = "#ffd24d"; cx.beginPath(); cx.ellipse(0, -d.s * .6, d.s * .22 * (1 + Math.sin(t / 120 + d.p) * .2), d.s * .55, 0, 0, 7); cx.fill();
  cx.restore();
}
function drawFlower(f) {
  cx.save(); cx.translate(f.x, f.y); cx.rotate(f.r); cx.fillStyle = f.c;
  for (let i = 0; i < 6; i++) { cx.rotate(Math.PI / 3); cx.beginPath(); cx.ellipse(0, f.s * .6, f.s * .35, f.s * .6, 0, 0, 7); cx.fill(); }
  cx.fillStyle = "#b45309"; cx.beginPath(); cx.arc(0, 0, f.s * .28, 0, 7); cx.fill(); cx.restore();
}
function burst(x, y) {
  const hue = rnd(25, 50), n = small ? 28 : 46;
  for (let i = 0; i < n; i++) { const a = rnd(0, 6.283), v = rnd(1, 4.2); fw.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, c: "hsl(" + (hue + rnd(-12, 12)) + ",100%,65%)" }); }
}
function tick(t) {
  cx.clearRect(0, 0, W, H);
  sparks.forEach(s => { s.y -= s.v; s.x += Math.sin(t / 1000 + s.p) * .3; if (s.y < -5) { s.y = H + 5; s.x = rnd(0, W); } cx.globalAlpha = .4 + .4 * Math.sin(t / 400 + s.p); cx.fillStyle = "#ffd56a"; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fill(); });
  cx.globalAlpha = 1;
  flowers.forEach((f, i) => { f.y += f.vy; f.r += f.vr; f.x += Math.sin(t / 900 + f.p) * .5; if (f.y > H * .75) flowers[i] = newFlower(false); drawFlower(f); });
  diyas.forEach(d => { d.x += d.v; if (d.x > W + 30) d.x = -30; drawDiya(d, t); });
  if (t > nextFw) { burst(rnd(W * .15, W * .85), rnd(H * .1, H * .4)); nextFw = t + (t < burstUntil ? 900 : 6000); }
  fw = fw.filter(p => p.l > 0);
  fw.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .045; p.vx *= .985; p.l -= .014; cx.globalAlpha = Math.max(p.l, 0); cx.fillStyle = p.c; cx.fillRect(p.x, p.y, 2.4, 2.4); });
  cx.globalAlpha = 1;
  raf = requestAnimationFrame(tick);
}
function start() { cancelAnimationFrame(raf); init(); if (RM) { cx.clearRect(0, 0, W, H); diyas.forEach(d => drawDiya(d, 0)); } else raf = requestAnimationFrame(tick); }
addEventListener("resize", () => { clearTimeout(start.t); start.t = setTimeout(start, 200); });
document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else if (!RM) raf = requestAnimationFrame(tick); });
document.addEventListener("click", e => { if (!RM && !e.target.closest("button,input,label")) burst(e.clientX, e.clientY); });
start();
if (!RM) burstUntil = performance.now() + 14000;

/* ---- parallax ---- */
if (!RM) addEventListener("pointermove", e => document.body.style.setProperty("--px", (e.clientX / innerWidth - .5).toFixed(3)), { passive: true });

/* ---- replay (alternates sunrise / sunset) ---- */
function restart(el) { el.style.animation = "none"; void el.offsetHeight; el.style.animation = ""; }
$("#replay").addEventListener("click", () => {
  const b = document.body, rise = b.classList.contains("sunrise");
  b.classList.toggle("sunrise", !rise); b.classList.toggle("sunset", rise);
  restart($("#sunwrap")); restart($("#card"));
  if (!RM) { burstUntil = performance.now() + 9000; nextFw = 0; }
  toast(rise ? "🌇 सूर्यास्त — संध्या अर्घ्य" : "🌅 सूर्योदय — उषा अर्घ्य");
});
