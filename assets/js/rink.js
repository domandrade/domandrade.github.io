// ===== Hockey shootout mini-game =====
(function(){
  const canvas = document.getElementById('rink');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const scoreEl = document.getElementById('score');
  const shotsEl = document.getElementById('shots');
  const bestEl  = document.getElementById('best');
  const resetBtn = document.getElementById('reset-game');

  const MAX_SHOTS = 5;
  const GOAL = { x: W - 60, y: H/2 - 60, w: 18, h: 120 };

  const state = {
    puck: { x: 120, y: H/2, r: 10, vx: 0, vy: 0, moving: false },
    goalie: { x: GOAL.x - 18, y: H/2, w: 14, h: 60, dir: 1, speed: 2.2 },
    dragging: false, dragStart: null, dragEnd: null,
    score: 0, shots: 0, shotActive: false, roundOver: false,
    message: 'Drag from the puck to aim. Release to shoot.',
    messageTimer: 0,
  };

  const best = parseInt(localStorage.getItem('rinkBest') || '-1', 10);
  if (best >= 0) bestEl.textContent = `${best} / ${MAX_SHOTS}`;

  function resetPuck() {
    state.puck.x = 120; state.puck.y = H/2; state.puck.vx = 0; state.puck.vy = 0; state.puck.moving = false;
    state.shotActive = false;
  }
  function resetAll() {
    state.score = 0; state.shots = 0; state.roundOver = false;
    state.goalie.speed = 2.2;
    resetPuck();
    updateHud();
    setMsg('Drag from the puck to aim. Release to shoot.', 180);
  }
  function updateHud() {
    scoreEl.textContent = state.score;
    shotsEl.textContent = `${state.shots} / ${MAX_SHOTS}`;
  }
  function setMsg(m, frames=120) { state.message = m; state.messageTimer = frames; }

  function drawRink() {
    // ice
    ctx.fillStyle = '#eaf2ff'; ctx.fillRect(0,0,W,H);
    // boards
    ctx.strokeStyle = '#b4c8e4'; ctx.lineWidth = 2;
    ctx.strokeRect(6,6,W-12,H-12);
    // center red line
    ctx.strokeStyle = '#e44'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W/2, 8); ctx.lineTo(W/2, H-8); ctx.stroke();
    // blue lines
    ctx.strokeStyle = '#3a62c0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W*0.32, 8); ctx.lineTo(W*0.32, H-8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W*0.68, 8); ctx.lineTo(W*0.68, H-8); ctx.stroke();
    // center faceoff
    ctx.strokeStyle = '#2f4a98'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(W/2, H/2, 56, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#2f4a98'; ctx.beginPath(); ctx.arc(W/2, H/2, 6, 0, Math.PI*2); ctx.fill();
    // goal crease
    ctx.fillStyle = 'rgba(100,150,255,0.3)';
    ctx.beginPath();
    ctx.arc(GOAL.x, H/2, 56, -Math.PI/2, Math.PI/2);
    ctx.fill();
    // goal
    ctx.strokeStyle = '#c33'; ctx.lineWidth = 3;
    ctx.strokeRect(GOAL.x, GOAL.y, GOAL.w, GOAL.h);
    ctx.fillStyle = 'rgba(230,90,90,0.15)';
    ctx.fillRect(GOAL.x, GOAL.y, GOAL.w, GOAL.h);
  }

  function drawGoalie() {
    const g = state.goalie;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(g.x - g.w/2, g.y - g.h/2, g.w, g.h);
    ctx.fillStyle = '#e6c34e';
    ctx.fillRect(g.x - g.w/2, g.y - g.h/2, g.w, 10);
  }
  function drawPuck() {
    const p = state.puck;
    ctx.fillStyle = '#0b0b0b';
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r - 2, 0, Math.PI*2); ctx.stroke();
  }
  function drawAim() {
    if (!state.dragging || !state.dragStart || !state.dragEnd) return;
    const p = state.puck;
    const dx = state.dragStart.x - state.dragEnd.x;
    const dy = state.dragStart.y - state.dragEnd.y;
    const tx = p.x + dx, ty = p.y + dy;
    ctx.setLineDash([6,6]);
    ctx.strokeStyle = 'rgba(124,58,237,0.9)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(tx, ty); ctx.stroke();
    ctx.setLineDash([]);
    // arrow head
    const ang = Math.atan2(ty - p.y, tx - p.x);
    ctx.fillStyle = 'rgba(124,58,237,0.9)';
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx - 10*Math.cos(ang - 0.35), ty - 10*Math.sin(ang - 0.35));
    ctx.lineTo(tx - 10*Math.cos(ang + 0.35), ty - 10*Math.sin(ang + 0.35));
    ctx.closePath(); ctx.fill();
  }
  function drawMessage() {
    if (state.messageTimer <= 0) return;
    state.messageTimer--;
    ctx.fillStyle = 'rgba(15,10,26,0.85)';
    ctx.fillRect(W/2 - 180, 14, 360, 36);
    ctx.fillStyle = '#f5c451'; ctx.font = '600 16px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(state.message, W/2, 32);
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
  }

  function step() {
    // goalie movement
    const g = state.goalie;
    g.y += g.dir * g.speed;
    if (g.y < GOAL.y + g.h/2 + 2) { g.y = GOAL.y + g.h/2 + 2; g.dir = 1; }
    if (g.y > GOAL.y + GOAL.h - g.h/2 - 2) { g.y = GOAL.y + GOAL.h - g.h/2 - 2; g.dir = -1; }

    // puck
    const p = state.puck;
    if (p.moving) {
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.995; p.vy *= 0.995;
      // walls
      if (p.y - p.r < 8 || p.y + p.r > H - 8) { p.vy *= -0.7; p.y = Math.max(8+p.r, Math.min(H-8-p.r, p.y)); }
      if (p.x - p.r < 8) { p.vx *= -0.7; p.x = 8 + p.r; }
      // goalie collision
      if (p.x + p.r > g.x - g.w/2 && p.x - p.r < g.x + g.w/2 && p.y + p.r > g.y - g.h/2 && p.y - p.r < g.y + g.h/2) {
        p.vx *= -0.6; p.vy *= 0.9;
        p.x = g.x - g.w/2 - p.r - 1;
        if (!state.shotActive) return;
        state.shotActive = false;
        state.shots++;
        setMsg('🛡️  Save!', 100);
        endShot();
      }
      // goal check
      if (state.shotActive && p.x + p.r >= GOAL.x && p.y > GOAL.y && p.y < GOAL.y + GOAL.h) {
        state.shotActive = false;
        state.score++; state.shots++;
        setMsg('🚨  GOAL!', 100);
        endShot();
      }
      // off right side (missed)
      if (p.x > W + 20) {
        state.shotActive = false; state.shots++;
        setMsg('Wide.', 100);
        endShot();
      }
      // slowed to stop
      if (Math.hypot(p.vx, p.vy) < 0.08 && state.shotActive) {
        state.shotActive = false; state.shots++;
        setMsg('Out of gas.', 100);
        endShot();
      }
    }
  }

  function endShot() {
    updateHud();
    if (state.shots >= MAX_SHOTS) {
      state.roundOver = true;
      const prev = parseInt(localStorage.getItem('rinkBest') || '-1', 10);
      if (state.score > prev) {
        localStorage.setItem('rinkBest', String(state.score));
        bestEl.textContent = `${state.score} / ${MAX_SHOTS}`;
        setMsg(`Round over: ${state.score}/${MAX_SHOTS} — new best!`, 240);
      } else {
        setMsg(`Round over: ${state.score}/${MAX_SHOTS}. Hit Reset.`, 240);
      }
    } else {
      state.goalie.speed += 0.25;
      setTimeout(resetPuck, 700);
    }
  }

  function render() {
    drawRink();
    drawGoalie();
    drawPuck();
    drawAim();
    drawMessage();
  }
  function loop() {
    step(); render();
    requestAnimationFrame(loop);
  }

  // Input — pointer
  function toCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width, sy = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  }
  canvas.addEventListener('pointerdown', (e) => {
    if (state.puck.moving || state.roundOver) return;
    const p = toCanvas(e);
    const d = Math.hypot(p.x - state.puck.x, p.y - state.puck.y);
    if (d < 40) {
      state.dragging = true;
      state.dragStart = p; state.dragEnd = p;
      canvas.setPointerCapture(e.pointerId);
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!state.dragging) return;
    state.dragEnd = toCanvas(e);
  });
  canvas.addEventListener('pointerup', (e) => {
    if (!state.dragging) return;
    state.dragging = false;
    const dx = state.dragStart.x - state.dragEnd.x;
    const dy = state.dragStart.y - state.dragEnd.y;
    const power = Math.min(22, Math.hypot(dx, dy) / 10);
    if (power < 1.5) return; // too tiny
    const len = Math.hypot(dx, dy) || 1;
    state.puck.vx = (dx / len) * power;
    state.puck.vy = (dy / len) * power;
    state.puck.moving = true;
    state.shotActive = true;
  });

  resetBtn.addEventListener('click', resetAll);
  resetAll();
  loop();
})();
