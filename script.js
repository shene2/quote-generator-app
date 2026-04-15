let saved = [];
let currentQuote = "";
let currentAuthor = "";
let currentMood = "all";

async function getQuote() {
  const qEl = document.getElementById('quote');
  const aEl = document.getElementById('author');

  qEl.classList.add('fading');
  aEl.classList.add('fading');
  await new Promise(r => setTimeout(r, 350));

  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    const data = await res.json();
    currentQuote = data.quote;
    currentAuthor = data.author;
    qEl.textContent = currentQuote;
    aEl.textContent = '— ' + currentAuthor;
  } catch {
    qEl.textContent = 'Unable to reach the source of wisdom.';
    aEl.textContent = '';
  }

  qEl.classList.remove('fading');
  aEl.classList.remove('fading');
  document.getElementById('saveBtn').classList.remove('saved');
}

function saveQuote() {
  if (!currentQuote) return;
  if (saved.find(s => s.quote === currentQuote)) return;
  saved.push({ quote: currentQuote, author: currentAuthor });
  document.getElementById('saveBtn').classList.add('saved');
  renderFavorites();
}

function renderFavorites() {
  const list = document.getElementById('favList');
  if (!saved.length) {
    list.innerHTML = '<p class="empty-fav">No quotes saved yet.</p>';
    return;
  }
  list.innerHTML = saved.map(s => `
    <div class="fav-item">
      <p>${s.quote}</p>
      <span>${s.author}</span>
    </div>
  `).join('');
}

document.getElementById('getBtn').addEventListener('click', getQuote);
document.getElementById('saveBtn').addEventListener('click', saveQuote);
document.getElementById('favBtn').addEventListener('click', () => {
  document.getElementById('favPanel').classList.toggle('open');
  renderFavorites();
});

document.getElementById('moods').addEventListener('click', e => {
  if (!e.target.classList.contains('mood-btn')) return;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentMood = e.target.dataset.mood;
  getQuote();
});