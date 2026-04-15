// ===== Shared site script =====
(function(){
  const d = document;

  // Year
  const y = d.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Theme
  const root = d.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  const toggle = d.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', cur);
      localStorage.setItem('theme', cur);
    });
  }

  // Cursor glow
  const glow = d.querySelector('.cursor-glow');
  if (glow && matchMedia('(hover:hover)').matches) {
    let tx = -9999, ty = -9999, cx = tx, cy = ty;
    window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function raf(){
      cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
      requestAnimationFrame(raf);
    })();
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  d.querySelectorAll('.reveal, .skills').forEach(el => io.observe(el));

  // Count-up stats
  const nums = d.querySelectorAll('.num[data-count]');
  const numIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1200;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const v = Math.floor(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = el.dataset.raw === 'true' ? String(v) : v.toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      numIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => numIO.observe(n));

  // Typed name
  const typed = d.getElementById('typed-name');
  if (typed) {
    const words = ['Dominic', 'Dom', 'Dominic Andrade'];
    let wi = 0, ci = 0, dir = 1, pause = 0;
    typed.textContent = '';
    const step = () => {
      if (pause > 0) { pause--; return setTimeout(step, 40); }
      const w = words[wi];
      ci += dir;
      typed.textContent = w.slice(0, ci);
      if (ci === w.length) { dir = -1; pause = 40; }
      else if (ci === 0 && dir === -1) { dir = 1; wi = (wi + 1) % words.length; pause = 10; }
      setTimeout(step, dir === 1 ? 90 : 45);
    };
    step();
  }

  // Experience filter
  d.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      d.querySelectorAll('.chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected','false'); });
      chip.classList.add('active'); chip.setAttribute('aria-selected','true');
      const f = chip.dataset.filter;
      d.querySelectorAll('.tl-item').forEach(it => {
        const tags = (it.dataset.tags || '').split(/\s+/);
        it.hidden = !(f === 'all' || tags.includes(f));
      });
    });
  });

  // Contact form -> mailto
  const form = d.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const body = `From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`;
      window.location.href = `mailto:domhg30@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(body)}`;
    });
  }

  // Command palette
  const palette = d.getElementById('palette');
  const pInput = d.getElementById('palette-input');
  const pList = d.getElementById('palette-list');
  const items = [
    { label: 'Home', sub: 'index.html', href: './index.html' },
    { label: 'Experience', sub: 'experience.html', href: './experience.html' },
    { label: 'Contact', sub: 'contact.html', href: './contact.html' },
    { label: 'The Rink 🏒', sub: 'shootout mini-game', href: './rink.html' },
    { label: 'Arcade 🧩', sub: 'crown court puzzle', href: './arcade.html' },
    { label: 'Email Dominic', sub: 'domhg30@gmail.com', href: 'mailto:domhg30@gmail.com' },
    { label: 'LinkedIn', sub: '/in/dominic-andrade', href: 'https://www.linkedin.com/in/dominic-andrade-235722251' },
    { label: 'Toggle theme', sub: 'light / dark', action: () => toggle && toggle.click() },
  ];
  let sel = 0;
  const render = (q = '') => {
    const ql = q.toLowerCase();
    const filtered = items.filter(i => i.label.toLowerCase().includes(ql) || (i.sub||'').toLowerCase().includes(ql));
    pList.innerHTML = filtered.map((i, idx) =>
      `<li data-idx="${idx}" class="${idx===sel?'sel':''}"><span>${i.label}</span><small>${i.sub||''}</small></li>`
    ).join('');
    pList._filtered = filtered;
  };
  const open = () => { if(!palette) return; palette.hidden = false; pInput.value=''; sel=0; render(); pInput.focus(); };
  const close = () => { if(palette) palette.hidden = true; };
  const run = (i) => {
    close();
    if (!i) return;
    if (i.action) i.action();
    else if (i.href) window.location.href = i.href;
  };

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); palette && palette.hidden ? open() : close(); }
    else if (e.key === 'Escape') close();
    else if (!palette || palette.hidden) return;
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min((pList._filtered||[]).length-1, sel+1); render(pInput.value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel-1); render(pInput.value); }
    else if (e.key === 'Enter') { e.preventDefault(); run((pList._filtered||[])[sel]); }
  });
  if (pInput) pInput.addEventListener('input', () => { sel = 0; render(pInput.value); });
  if (pList) pList.addEventListener('click', (e) => {
    const li = e.target.closest('li'); if (!li) return;
    run((pList._filtered||[])[parseInt(li.dataset.idx,10)]);
  });
  if (palette) palette.addEventListener('click', (e) => { if (e.target === palette) close(); });
})();
