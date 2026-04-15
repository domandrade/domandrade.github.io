// ===== Crown Court — 6x6 "Queens-like" puzzle =====
(function(){
  const el = document.getElementById('puzzle');
  if (!el) return;
  const N = 6;
  const statusEl = document.getElementById('p-status');
  const timeEl = document.getElementById('p-time');
  const crownsEl = document.getElementById('p-crowns');
  const newBtn = document.getElementById('p-new');
  const hintBtn = document.getElementById('p-hint');

  // Pre-built puzzles. Each has a solution (col index per row) and a region map
  // derived from the solution by flood-seeding. All satisfy: 1 queen per row/col/region,
  // no two queens touching (incl. diagonally).
  // Region palette
  const PALETTES = [
    ['#fde68a','#fca5a5','#a7f3d0','#bae6fd','#c4b5fd','#fdba74'],
    ['#fbcfe8','#bbf7d0','#fdba74','#93c5fd','#fde68a','#d8b4fe'],
    ['#fecaca','#bfdbfe','#d9f99d','#fef08a','#e9d5ff','#fbcfe8'],
  ];

  // Valid solutions (columns per row) where no two are adjacent (incl. diagonally).
  // Picked so diagonal neighbors differ by >= 2.
  const SOLUTIONS = [
    [1,3,5,0,2,4],
    [2,4,0,3,5,1],
    [3,0,2,4,1,5],
    [4,1,3,5,0,2],
    [0,2,4,1,3,5],
    [5,2,0,3,1,4],
    [1,4,0,3,5,2],
    [3,5,2,0,4,1],
  ];

  let state = null;

  function genPuzzle() {
    const sol = SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)];
    const pal = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    // Assign each solution cell a distinct region id, then flood-grow.
    const region = Array.from({length: N}, () => new Array(N).fill(-1));
    const queue = [];
    for (let r=0; r<N; r++) {
      const c = sol[r];
      region[r][c] = r;
      queue.push([r,c,r]);
    }
    // BFS expansion: randomly expand each region
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let unfilled = N*N - N;
    while (unfilled > 0) {
      // shuffle queue
      for (let i=queue.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [queue[i],queue[j]]=[queue[j],queue[i]]; }
      const next = [];
      for (const [r,c,id] of queue) {
        for (const [dr,dc] of dirs) {
          if (Math.random() < 0.55) continue;
          const nr = r+dr, nc = c+dc;
          if (nr<0||nr>=N||nc<0||nc>=N) continue;
          if (region[nr][nc] !== -1) continue;
          region[nr][nc] = id;
          next.push([nr,nc,id]);
          unfilled--;
          if (unfilled <= 0) break;
        }
        if (unfilled <= 0) break;
      }
      if (next.length === 0) {
        // fallback: fill any leftover with nearest region
        for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (region[r][c] === -1) {
          let best = -1, bd = 999;
          for (let rr=0; rr<N; rr++) {
            const cc = sol[rr];
            const d = Math.abs(rr-r) + Math.abs(cc-c);
            if (d < bd) { bd = d; best = rr; }
          }
          region[r][c] = best; unfilled--;
        }
        break;
      }
      queue.length = 0; queue.push(...next);
    }
    return { sol, region, palette: pal };
  }

  function render() {
    el.innerHTML = '';
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r; cell.dataset.c = c;
      cell.style.setProperty('--c', state.palette[state.region[r][c]]);
      const v = state.grid[r][c];
      cell.textContent = v === 1 ? '👑' : v === 2 ? '✕' : '';
      cell.addEventListener('click', () => cycle(r,c));
      el.appendChild(cell);
    }
    validate();
  }

  function cycle(r,c) {
    if (state.won) return;
    state.grid[r][c] = (state.grid[r][c] + 1) % 3; // 0 empty, 1 crown, 2 flag
    render();
  }

  function validate() {
    let crowns = 0;
    const errs = new Set();
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (state.grid[r][c] === 1) crowns++;
    crownsEl.textContent = `${crowns} / ${N}`;

    // row/col/region conflicts
    const rowCount = new Array(N).fill(0), colCount = new Array(N).fill(0), regCount = new Array(N).fill(0);
    const rowPick = new Array(N).fill(null), colPick = new Array(N).fill(null), regPick = new Array(N).fill(null);
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (state.grid[r][c] === 1) {
      rowCount[r]++; colCount[c]++; regCount[state.region[r][c]]++;
      if (!rowPick[r]) rowPick[r] = []; rowPick[r].push([r,c]);
      if (!colPick[c]) colPick[c] = []; colPick[c].push([r,c]);
      if (!regPick[state.region[r][c]]) regPick[state.region[r][c]] = []; regPick[state.region[r][c]].push([r,c]);
    }
    const mark = (arr) => arr.forEach(([r,c]) => errs.add(r+','+c));
    rowCount.forEach((n,i) => { if (n>1) mark(rowPick[i]); });
    colCount.forEach((n,i) => { if (n>1) mark(colPick[i]); });
    regCount.forEach((n,i) => { if (n>1) mark(regPick[i]); });
    // adjacency
    for (let r=0;r<N;r++) for (let c=0;c<N;c++) if (state.grid[r][c] === 1) {
      for (let dr=-1; dr<=1; dr++) for (let dc=-1; dc<=1; dc++) {
        if (!dr && !dc) continue;
        const nr = r+dr, nc = c+dc;
        if (nr<0||nr>=N||nc<0||nc>=N) continue;
        if (state.grid[nr][nc] === 1) { errs.add(r+','+c); errs.add(nr+','+nc); }
      }
    }
    // paint errors
    el.querySelectorAll('.cell').forEach(cell => {
      const k = cell.dataset.r+','+cell.dataset.c;
      cell.classList.toggle('err', errs.has(k));
    });
    // win?
    const total = crowns === N && errs.size === 0;
    if (total) {
      state.won = true;
      stopTimer();
      statusEl.innerHTML = `✅ Solved in <strong>${timeEl.textContent}</strong>. Tap <em>New puzzle</em> for another.`;
      el.querySelectorAll('.cell').forEach(c => c.classList.add('good'));
    } else {
      statusEl.textContent = errs.size ? 'Something conflicts — check rows, columns, regions & neighbors.' : 'Looking clean. Keep going.';
    }
  }

  let timer = null, seconds = 0;
  function startTimer() {
    stopTimer(); seconds = 0; timeEl.textContent = '0:00';
    timer = setInterval(() => { seconds++; const m = Math.floor(seconds/60); const s = seconds%60; timeEl.textContent = `${m}:${String(s).padStart(2,'0')}`; }, 1000);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }

  function newPuzzle() {
    const p = genPuzzle();
    state = { ...p, grid: Array.from({length:N},()=>new Array(N).fill(0)), won: false };
    startTimer();
    render();
    statusEl.textContent = 'Good luck.';
  }

  function hint() {
    if (!state || state.won) return;
    // find a row whose queen isn't placed, reveal it briefly
    for (let r=0;r<N;r++) {
      const hasCrown = state.grid[r].some(v => v === 1);
      if (!hasCrown) {
        const c = state.sol[r];
        const cell = el.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
        if (cell) {
          cell.classList.add('good');
          setTimeout(() => cell.classList.remove('good'), 900);
        }
        statusEl.textContent = `Row ${r+1}, column ${c+1}.`;
        return;
      }
    }
    statusEl.textContent = 'All rows have a crown — look for conflicts.';
  }

  newBtn.addEventListener('click', newPuzzle);
  hintBtn.addEventListener('click', hint);
  newPuzzle();
})();
