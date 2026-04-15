let saved = [], current = { q: '', a: '' }, count = 0;

function setMoodTheme(btn) {
  document.getElementById('qbox').style.background = btn.dataset.color;
  document.getElementById('bigq').style.color = btn.dataset.accent;
  document.getElementById('b1').style.background = btn.dataset.blob;
}

async function getQuote() {
  const q = document.getElementById('quote');
  const a = document.getElementById('author');
  const box = document.getElementById('qbox');

  q.classList.add('out');
  a.classList.add('out');
  await new Promise(r => setTimeout(r, 280));

  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const d = await res.json();
    current = { q: d.quote, a: d.author };
    q.textContent = d.quote;
    a.textContent = '— ' + d.author;
    count++;
    document.getElementById('counter').textContent = count + ' shown';
  } catch {
    q.textContent = 'Could not fetch a quote right now.';
    a.textContent = '';
  }

  q.classList.remove('out');
  a.classList.remove('out');
  box.classList.remove('pop');
  void box.offsetWidth;
  box.classList.add('pop');
  document.getElementById('saveBtn').classList.remove('saved');
}

function burst(el) {
  const rect = el.getBoundingClientRect();
  const card = document.getElementById('card').getBoundingClientRect();
  const cx = rect.left - card.left + rect.width / 2;
  const cy = rect.top - card.top + rect.height / 2;
  const colors = ['#ffe066', '#ff7eb3', '#80ffe8', '#7c3aed', '#ffa94d'];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (Math.PI * 2 / 8) * i;
    const dist = 40 + Math.random() * 30;
    p.style.cssText = `left:${cx}px;top:${cy}px;background:${colors[i % colors.length]};--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px;`;
    document.getElementById('card').appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}

function saveQuote() {
  if (!current.q || saved.find(s => s.q === current.q)) return;
  saved.push({ ...current });
  const btn = document.getElementById('saveBtn');
  btn.classList.add('saved');
  burst(btn);
  renderFavs();
}

function renderFavs() {
  const list = document.getElementById('favList');
  if (!saved.length) {
    list.innerHTML = '<div class="empty">Nothing saved yet.</div>';
    return;
  }
  list.innerHTML = saved.map(s =>
    `<div class="fav-item"><p>${s.q}</p><span>${s.a}</span></div>`
  ).join('');
}

document.getElementById('getBtn').addEventListener('click', () => { burst(document.getElementById('getBtn')); getQuote(); });
document.getElementById('saveBtn').addEventListener('click', saveQuote);
document.getElementById('favBtn').addEventListener('click', () => {
  document.getElementById('favPanel').classList.toggle('open');
  renderFavs();
});

document.getElementById('moods').addEventListener('click', e => {
  const btn = e.target.closest('.mood-btn');
  if (!btn) return;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  setMoodTheme(btn);
  getQuote();
});