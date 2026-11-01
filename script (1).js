/* ===== EDIT THESE ===== */
const FRIEND = { name: "Her Name", birthday: "Her Birthday" };
const FROM = "Your best friend";
/* ====================== */

const $ = s => document.querySelector(s);
const G = { // simple SVG glyphs, 100x100
  tower:'<path d="M38 90V35h24v55M32 35h36L50 12z M70 8l-10 22h10l-8 20"/>',
  priestess:'<circle cx="50" cy="35" r="14"/><path d="M30 90c0-30 10-38 20-38s20 8 20 38M22 20a20 20 0 0 0 0 30M78 20a20 20 0 0 1 0 30"/>',
  wheel:'<circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="8"/><path d="M50 16v68M16 50h68M26 26l48 48M74 26L26 74"/>',
  lovers:'<path d="M50 85C10 55 20 20 50 38c30-18 40 17 0 47z"/><circle cx="50" cy="14" r="6"/>',
  moon:'<path d="M62 12a38 38 0 1 0 0 76 30 30 0 1 1 0-76z"/><circle cx="76" cy="30" r="3"/><circle cx="82" cy="62" r="2"/>',
  star:'<path d="M50 8l9 28 29 1-23 18 8 29-23-17-23 17 8-29L12 37l29-1z"/>',
  world:'<ellipse cx="50" cy="50" rx="24" ry="36"/><path d="M26 50h48M50 14v72M16 20c20 25 48 25 68 0"/>',
  sun:'<circle cx="50" cy="50" r="18"/><path d="M50 8v16M50 76v16M8 50h16M76 50h16M20 20l11 11M69 69l11 11M80 20L69 31M31 69L20 80"/>'
};
const READINGS = [
 {pos:"The Past", sub:"What she has survived", card:"The Tower", g:"tower",
  text:"Once, the ground shook and the walls you trusted fell. You thought it was the end of the story. It was only the clearing of the stage. Every storm you walked through left you with a quiet strength that no one handed you. You were never broken, only rebuilt, wiser and softer in the right places."},
 {pos:"The Present", sub:"Her current energy", card:"The High Priestess", g:"priestess",
  text:"Right now you are standing at a threshold, listening. Your intuition is louder than it has been in years, and it is telling you the truth. Stillness is not waiting. It is gathering. Trust the whisper beneath the noise, for it has never once led you astray."},
 {pos:"The Future", sub:"What awaits her", card:"The Wheel of Fortune", g:"wheel",
  text:"The wheel is turning, and it is turning in your favor. A door you stopped knocking on will open from the other side. Unexpected paths, bright coincidences, and a season of doing things you once only dreamed of are coming. Say yes before you feel ready."},
 {pos:"Love", sub:"Her romantic journey", card:"The Lovers", g:"lovers",
  text:"Love finds you when you stop shrinking to be chosen. The heart you give is rare, and the one meant for you will recognize it at once. Until then, love yourself the way you love everyone else. What is yours will meet you gently, and it will feel like coming home."},
 {pos:"Hidden Truth", sub:"What she doesn't see", card:"The Moon", g:"moon",
  text:"You think you are only getting by. The moon sees what you cannot: that you are the light others navigate by. You have carried people through their darkest nights without knowing it. You are far more magnetic, brave, and loved than your own reflection admits."},
 {pos:"The Blessing", sub:"Her unexpected gift", card:"The Star", g:"star",
  text:"A gift arrives when you least expect it, in the shape of a kind word, a second chance, a quiet joy. Receive it without apology. After the long dark comes the star, and it has been shining on you the whole time. Hope returns, and this time it stays."},
 {pos:"The Universe's Message", sub:"Her birthday destiny", card:"The World", g:"world",
  text:"A circle closes, and a larger one begins. This year is your completion and your beginning at once. The universe has one thing to say: you are exactly where you are meant to be, and everything you have wanted is already on its way to you. Go and meet it."}
];
const FINAL = {card:"The Sun", g:"sun", text:"Joy. Clarity. Return of light. The brightest year of your life begins now."};
const LETTER = `Dear ${FRIEND.name},

The cards are only a story. The truth is simpler: I have watched you survive things that would have broken most people, and you kept laughing, kept caring, kept showing up for everyone else.

You are the person I am proudest to know. Thank you for every late night, every honest word, every time you made life feel lighter.

This year, I wish you love that feels like home, courage that surprises you, and every good thing you have quietly dreamed of.

Happy birthday. The stars are lucky to have you, and so am I.

With all my love,
${FROM}`;

/* ----- screens ----- */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$('#'+id).classList.add('active');scrollTo(0,0)}
$('#name').textContent = FRIEND.name;
$('#bday').textContent = FRIEND.birthday;

/* ----- sky: stars + particles ----- */
const cv=$('#sky'),cx=cv.getContext('2d');let W,H,stars=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;stars=Array.from({length:Math.min(160,W/6)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,p:Math.random()*6,v:Math.random()*.25+.05,gold:Math.random()<.3}))}
addEventListener('resize',size);size();
(function draw(t){cx.clearRect(0,0,W,H);for(const s of stars){s.y-=s.v*.3;if(s.y<-5)s.y=H+5;
 cx.globalAlpha=.35+.65*Math.abs(Math.sin(t/1200+s.p));cx.fillStyle=s.gold?'#d4af6a':'#fff';cx.beginPath();cx.arc(s.x,s.y,s.r,0,7);cx.fill()}
 requestAnimationFrame(draw)})(0);

/* ----- ambient music (generated, starts on click) ----- */
let ac,master,muted=false;
function startMusic(){
 if(ac)return;ac=new (window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=0;master.connect(ac.destination);
 master.gain.linearRampToValueAtTime(.12,ac.currentTime+4);
 const chords=[[110,164.8,220,261.6],[87.3,130.8,174.6,220],[98,146.8,196,246.9],[110,164.8,207.6,277.2]];
 const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=900;lp.connect(master);
 function play(c){c.forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain(),n=ac.currentTime;
  o.type=i%2?'triangle':'sine';o.frequency.value=f;o.detune.value=(Math.random()-.5)*10;
  g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(.25,n+3);g.gain.linearRampToValueAtTime(0,n+8);
  o.connect(g).connect(lp);o.start(n);o.stop(n+8.2)})}
 let i=0;play(chords[0]);setInterval(()=>play(chords[++i%4]),6000);
 setInterval(()=>{if(muted)return;const o=ac.createOscillator(),g=ac.createGain(),n=ac.currentTime;o.type='sine';
  o.frequency.value=[523,659,784,988,1175][Math.random()*5|0];g.gain.setValueAtTime(.05,n);g.gain.exponentialRampToValueAtTime(.0001,n+3);
  o.connect(g).connect(master);o.start(n);o.stop(n+3)},3500);
}
$('#mute').onclick=e=>{muted=!muted;master.gain.setTargetAtTime(muted?0:.12,ac.currentTime,.3);e.target.classList.toggle('off',muted)};

/* ----- card factory ----- */
function cardEl(label){const b=document.createElement('button');b.className='card';b.setAttribute('aria-label',label);
 b.innerHTML='<span class="back"></span><span class="face"></span>';return b}
function fill(el,r,sub){el.querySelector('.face').innerHTML=`<svg viewBox="0 0 100 100">${G[r.g]}</svg><b>${r.card}</b><em>${sub||''}</em>`}

/* ----- tarot table ----- */
let drawn=0,pendingFlip=false;
function buildDeck(){
 drawn=0;$('#deck').innerHTML='';$('#reading').innerHTML='';$('#next').hidden=true;
 $('#hint').textContent='Choose a card. Let it choose you.';
 for(let i=0;i<7;i++){const c=cardEl('Face-down card '+(i+1));
  c.onclick=()=>flip(c);$('#deck').append(c)}
}
function flip(c){
 if(c.classList.contains('flipped')||pendingFlip)return;
 pendingFlip=true;const r=READINGS[drawn];fill(c,r,r.pos);c.classList.add('flipped');
 document.querySelectorAll('.card:not(.flipped)').forEach(x=>x.classList.add('done'));
 setTimeout(()=>{
  $('#reading').innerHTML=`<h3>${r.card}</h3><small>${r.pos}: ${r.sub}</small><p></p>`;
  type($('#reading p'),r.text);
  drawn++;pendingFlip=false;
  document.querySelectorAll('.card:not(.flipped)').forEach(x=>x.classList.remove('done'));
  $('#hint').textContent=drawn<7?`${7-drawn} card${drawn<6?'s':''} remain. Choose again.`:'The seven have spoken.';
  if(drawn===7){$('#next').textContent='Open Your Birthday Message';$('#next').hidden=false}
 },900);
}
function type(el,t){let i=0;(function s(){el.textContent=t.slice(0,i+=2);if(i<t.length)setTimeout(s,18);else el.textContent=t})()}
$('#next').onclick=()=>{show('final');birthday()};

/* ----- final ----- */
function birthday(){
 const h=$('#happy');h.innerHTML=[...h.dataset.t||(h.dataset.t=h.textContent)].map((ch,i)=>`<span style="animation-delay:${i*.06}s">${ch===' '?'&nbsp;':ch}</span>`).join('');
 $('#letter').textContent='';$('#surprise').innerHTML='';$('#reveal').hidden=false;
 $('#letter').textContent=LETTER;
}
$('#reveal').onclick=e=>{
 e.target.hidden=true;const c=cardEl('Final surprise card');fill(c,FINAL,FINAL.text);$('#surprise').append(c);
 setTimeout(()=>{c.classList.add('flipped');burst()},300);
};
function burst(){for(let i=0;i<90;i++)stars.push({x:W/2,y:H/2,r:Math.random()*2+1,p:0,v:-(Math.random()*4+1),gold:true,dx:(Math.random()-.5)*10})}
$('#again').onclick=()=>{buildDeck();show('table')};

/* ----- flow ----- */
$('#begin').onclick=()=>{startMusic();$('#mute').hidden=false;show('intro')};
$('#toCards').onclick=()=>{buildDeck();show('table')};
