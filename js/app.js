// ===================== STATE =====================
const STORAGE_KEY = "sb_learning_progress_v2";
const DARK_KEY = "sb_dark_mode";
let progressChart = null, phaseChart = null;
let aceEditors = {};

// ===================== PROGRESS =====================
function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

function markTopic(topicId, status) {
  const p = getProgress();
  p[topicId] = status;
  saveProgress(p);
  renderNav();
  updateAllCharts();
  renderPhaseCards();
  renderWelcomeStats();
}

function getTopicStatus(topicId) { const p = getProgress(); return p[topicId] || null; }

function resetProgress() {
  if (!confirm("⚠️ Xoá toàn bộ tiến độ học tập?")) return;
  localStorage.removeItem(STORAGE_KEY);
  renderNav();
  updateAllCharts();
  renderPhaseCards();
  renderWelcomeStats();
  document.getElementById("streak-count").textContent = "0";
  const active = document.querySelector(".topic-link.active");
  if (active) {
    active.click();
  } else {
    showWelcome();
  }
  showToast("Đã reset tiến độ", "info");
}

function calcPhaseProgress(topics) {
  let total = 0, passed = 0;
  topics.forEach(t => { total++; if (getTopicStatus(t.id) === "passed") passed++; });
  return { pct: total > 0 ? Math.round((passed / total) * 100) : 0, passed, total };
}

function calcOverall() {
  let total = 0, passed = 0;
  COURSE_DATA.forEach(p => p.topics.forEach(t => { total++; if (getTopicStatus(t.id) === "passed") passed++; }));
  return { pct: total > 0 ? Math.round((passed / total) * 100) : 0, passed, total };
}

// ===================== DARK MODE =====================
function toggleDark() {
  const html = document.documentElement;
  const isDark = !html.classList.contains("dark");
  html.classList.toggle("dark", isDark);
  localStorage.setItem(DARK_KEY, isDark ? "dark" : "light");
  document.getElementById("dark-label").textContent = isDark ? "Dark" : "Light";
  if (aceEditors) Object.values(aceEditors).forEach(e => e && e.setTheme(isDark ? "ace/theme/monokai" : "ace/theme/chrome"));
}
function initDark() {
  const saved = localStorage.getItem(DARK_KEY);
  const isDark = saved !== "light";
  document.documentElement.classList.toggle("dark", isDark);
  document.getElementById("dark-label").textContent = isDark ? "Dark" : "Light";
}

// ===================== SIDEBAR =====================
function toggleSidebar() { document.getElementById("sidebar").classList.toggle("open"); }

function renderNav() {
  const nav = document.getElementById("phase-nav");
  if (!nav) return;
  nav.innerHTML = "";
  COURSE_DATA.forEach((phase, pi) => {
    const div = document.createElement("div");
    div.className = "phase-group";

    const label = document.createElement("div");
    label.className = "phase-label";
    const { pct, passed, total } = calcPhaseProgress(phase.topics);
    const allDone = total > 0 && passed === total;
    label.innerHTML = `<span class="phase-icon">${phase.icon}</span>
      <span class="flex-1 truncate">${phase.title}</span>
      <span class="text-xs text-gray-500">${passed}/${total}</span>
      ${allDone ? '<span class="text-green-400 text-xs">✓</span>' : ''}
      <span class="arrow">▶</span>`;
    label.onclick = () => div.classList.toggle("open");
    div.appendChild(label);

    const topics = document.createElement("div");
    topics.className = "phase-topics";
    phase.topics.forEach(topic => {
      const link = document.createElement("a");
      link.className = "topic-link";
      const st = getTopicStatus(topic.id);
      const statusClass = st || "";
      link.innerHTML = `<span class="topic-status ${statusClass}"></span><span class="truncate">${topic.title}</span>`;
      link.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll(".topic-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        showTopic(phase.id, topic.id);
        if (window.innerWidth < 1024) toggleSidebar();
      };
      topics.appendChild(link);
    });
    div.appendChild(topics);
    nav.appendChild(div);
  });

  // Update counter
  const { passed, total } = calcOverall();
  document.getElementById("streak-count").textContent = passed;
}

// ===================== CHARTS =====================
function destroyChart(chart) { if (chart) { chart.destroy(); return null; } return null; }

function renderWelcomeStats() {
  const el = document.getElementById("welcome-stats");
  if (!el) return;
  const { passed, total } = calcOverall();
  el.innerHTML = `
    <div class="text-center"><div class="text-2xl font-bold text-primary-400">${total}</div><div class="text-xs text-gray-500">Bài học</div></div>
    <div class="text-center"><div class="text-2xl font-bold text-green-400">${passed}</div><div class="text-xs text-gray-500">Hoàn thành</div></div>
    <div class="text-center"><div class="text-2xl font-bold text-yellow-400">${total - passed}</div><div class="text-xs text-gray-500">Còn lại</div></div>
  `;
}

function renderPhaseCards() {
  const container = document.getElementById("phase-cards");
  if (!container) return;
  container.innerHTML = "";
  COURSE_DATA.forEach(phase => {
    const { pct, passed, total } = calcPhaseProgress(phase.topics);
    const card = document.createElement("div");
    card.className = "phase-card animate-fade-in";
    card.innerHTML = `
      <div class="card-icon">${phase.icon}</div>
      <h3>${phase.title}</h3>
      <p class="mt-1">${phase.desc || ''}</p>
      <p class="mt-2 text-xs text-gray-500">${passed}/${total} bài học</p>
      <div class="card-progress"><div style="width:${pct}%"></div></div>
    `;
    card.onclick = () => {
      const groups = document.querySelectorAll(".phase-group");
      groups.forEach(g => g.classList.remove("open"));
      if (groups[COURSE_DATA.indexOf(phase)]) groups[COURSE_DATA.indexOf(phase)].classList.add("open");
      const link = groups[COURSE_DATA.indexOf(phase)]?.querySelector(".topic-link");
      if (link) link.click();
    };
    container.appendChild(card);
  });
}

function updateAllCharts() {
  // Donut chart
  const { pct, passed, total } = calcOverall();
  const ctx = document.getElementById("progress-chart");
  if (!ctx) return;
  progressChart = destroyChart(progressChart);
  progressChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Hoàn thành", "Còn lại"],
      datasets: [{ data: [passed, total - passed], backgroundColor: ["#22c55e", "#2d2d44"], borderWidth: 0 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "70%",
      plugins: {
        legend: { position: "bottom", labels: { color: "#9ca3af", font: { size: 11 } } }
      }
    }
  });

  // Phase bar chart
  const ctx2 = document.getElementById("phase-chart");
  if (!ctx2) return;
  phaseChart = destroyChart(phaseChart);
  phaseChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: COURSE_DATA.map(p => p.icon + " " + p.title.replace("Giai đoạn ", "P").replace(":", "")),
      datasets: [{
        label: "Hoàn thành",
        data: COURSE_DATA.map(p => calcPhaseProgress(p.topics).passed),
        backgroundColor: "#6366f1",
        borderRadius: 6
      }, {
        label: "Còn lại",
        data: COURSE_DATA.map(p => calcPhaseProgress(p.topics).total - calcPhaseProgress(p.topics).passed),
        backgroundColor: "#2d2d44",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { stacked: true, ticks: { color: "#9ca3af", font: { size: 10 } }, grid: { color: "rgba(255,255,255,0.05)" } },
        y: { stacked: true, ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } }
      },
      plugins: {
        legend: { position: "top", labels: { color: "#9ca3af", font: { size: 11 } } }
      }
    }
  });
}

// ===================== WELCOME =====================
function showWelcome() {
  document.getElementById("welcome").style.display = "block";
  document.getElementById("topic-content").style.display = "none";
  document.getElementById("phase-title").textContent = "Chào mừng đến với Spring Boot Junior";
  document.getElementById("phase-icon-header").textContent = "";
  document.getElementById("topic-counter").textContent = "";
  document.getElementById("home-btn").classList.add("hidden");
  document.querySelectorAll(".topic-link").forEach(l => l.classList.remove("active"));
  renderWelcomeStats();
  renderPhaseCards();
  updateAllCharts();
}

// ===================== TOPIC DISPLAY =====================
function showTopic(phaseId, topicId) {
  const phase = COURSE_DATA.find(p => p.id === phaseId);
  if (!phase) return;
  const topic = phase.topics.find(t => t.id === topicId);
  if (!topic) return;

  document.getElementById("welcome").style.display = "none";
  const area = document.getElementById("topic-content");
  area.style.display = "block";
  document.getElementById("home-btn").classList.remove("hidden");
  document.getElementById("phase-icon-header").textContent = phase.icon;
  document.getElementById("phase-title").textContent = phase.title + " — " + topic.title;

  const pi = COURSE_DATA.indexOf(phase);
  const ti = phase.topics.indexOf(topic);
  document.getElementById("topic-counter").textContent = `Bài ${ti + 1}/${phase.topics.length} · Phase ${pi + 1}`;

  let html = `<div class="lesson-section animate-fade-in">`;
  // Lesson content
  topic.lesson.forEach(block => {
    if (block.type === "p") { html += `<p>${block.text}</p>`; }
    else if (block.type === "ul") { html += `<ul>${block.items.map(i => `<li>${i}</li>`).join("")}</ul>`; }
    else if (block.type === "ol") { html += `<ol>${block.items.map(i => `<li>${i}</li>`).join("")}</ol>`; }
    else if (block.type === "code") { html += `<pre><code>${escapeHtml(block.text)}</code></pre>`; }
  });

  // Sources
  if (topic.sources && topic.sources.length > 0) {
    html += `<div style="margin-top:20px;padding-top:16px;border-top:1px solid #374151">
      <p style="font-size:13px;color:#9ca3af;margin-bottom:8px"><i class="fas fa-book-open mr-1"></i> Tham khảo thêm:</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">`;
    topic.sources.forEach(s => {
      html += `<a href="${s.url}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:6px;font-size:12px;background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);text-decoration:none;transition:all .15s" onmouseover="this.style.background='rgba(99,102,241,0.2)'" onmouseout="this.style.background='rgba(99,102,241,0.1)'">
        <i class="fas fa-external-link-alt" style="font-size:10px"></i> ${s.name}
      </a>`;
    });
    html += `</div></div>`;
  }

  // Exercises
  if (topic.exercises && topic.exercises.length > 0) {
    html += `<h3 style="margin-top:24px">📝 Bài tập</h3>`;
    html += `<p style="font-size:13px;color:#9ca3af;margin-bottom:12px">🎯 Mức độ: <span class="ex-diff-basic">● Cơ bản</span> · <span class="ex-diff-intermediate">● Trung cấp</span> · <span class="ex-diff-advanced">● Vận dụng cao</span></p>`;
    topic.exercises.forEach((ex, i) => {
      html += renderExercise(ex, topic.id, i, topic.exercises.length);
    });
  }

  html += `</div>`;
  area.innerHTML = html;
  area.scrollTop = 0;

  // Setup exercises
  topic.exercises.forEach((ex, i) => {
    setupExercise(ex, topic.id, i);
  });
}

function escapeHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ===================== EXERCISE RENDERERS =====================
function renderExercise(ex, topicId, idx, total) {
  const id = `ex-${topicId}-${idx}`;
  let badgeClass = "";
  if (ex.type === "code") badgeClass = "code-writing";
  else if (ex.type === "order") badgeClass = "ordering";
  else if (ex.type === "truefalse") badgeClass = "truefalse";
  else if (ex.type === "fill") badgeClass = "fill";

  // Difficulty label
  const diffMap = {basic:"Cơ bản",intermediate:"Trung cấp",advanced:"Vận dụng cao"};
  const diffColor = {basic:"#22c55e",intermediate:"#f59e0b",advanced:"#ef4444"};
  const diff = ex.difficulty || "basic";

  let html = `<div class="exercise" id="${id}">`;
  // Progress dots
  if (total > 1) {
    html += `<div class="ex-progress">`;
    for (let j = 0; j < total; j++) {
      html += `<span class="dot ${j === idx ? 'active' : ''}"></span>`;
    }
    html += `</div>`;
  }
  html += `<div class="ex-header" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
    <span class="ex-badge ${badgeClass}">${ex.badge || "Bài tập"}</span>
    <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:12px;background:${diffColor[diff]}20;color:${diffColor[diff]};border:1px solid ${diffColor[diff]}40">${diffMap[diff]}</span>
  </div>`;
  html += `<div class="ex-question">${ex.question}</div>`;

  if (ex.type === "mcq") {
    html += `<div class="ex-options">`;
    ex.options.forEach((opt, oi) => {
      html += `<label><input type="radio" name="${id}" value="${oi}"> ${opt}</label>`;
    });
    html += `</div>`;
  } else if (ex.type === "fill") {
    html += `<input type="text" class="ex-input" placeholder="Nhập câu trả lời..." data-id="${id}">`;
  } else if (ex.type === "truefalse") {
    html += `<div class="tf-buttons"><button class="tf-btn tf-true" data-id="${id}">✅ Đúng</button><button class="tf-btn tf-false" data-id="${id}">❌ Sai</button></div>`;
  } else if (ex.type === "code") {
    html += `<div class="ace-editor-wrapper"><div class="ace-editor" id="ace-${id}" style="height:${Math.max(150, (ex.template?.split('\n').length || 10) * 20 + 20)}px">${escapeHtml(ex.template || '')}</div></div>`;
    if (ex.hint) html += `<div class="ex-hint">💡 ${ex.hint}</div>`;
  } else if (ex.type === "order") {
    html += `<ul class="sortable-list" id="sort-${id}">`;
    ex.items.forEach((item, oi) => {
      html += `<li class="sortable-item" data-idx="${oi}"><span class="drag-handle">⠿</span> <code>${escapeHtml(item)}</code></li>`;
    });
    html += `</ul>`;
  }

  html += `<button class="ex-btn" data-id="${id}" data-topic="${topicId}" data-idx="${idx}"><i class="fas fa-check-circle mr-1"></i> Kiểm tra</button>`;
  html += `<div class="ex-result" data-id="${id}"></div>`;
  html += `</div>`;
  return html;
}

// ===================== EXERCISE SETUP =====================
function setupExercise(ex, topicId, idx) {
  const id = `ex-${topicId}-${idx}`;
  const container = document.getElementById(id);
  if (!container) return;

  const btn = container.querySelector(".ex-btn");
  if (!btn) return;

  // Ace Editor setup
  if (ex.type === "code") {
    const editorEl = document.getElementById(`ace-${id}`);
    if (editorEl && typeof ace !== "undefined") {
      const editor = ace.edit(editorEl.id);
      editor.setTheme("ace/theme/monokai");
      const langMode = ex.language === "sql" ? "ace/mode/sql" : "ace/mode/java";
      editor.session.setMode(langMode);
      editor.setOptions({
        fontSize: "13px",
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        minLines: 5,
        maxLines: 30,
        wrap: true
      });
      editor.session.setUseWorker(false);
      aceEditors[id] = editor;
    }
  }

  // SortableJS setup
  if (ex.type === "order") {
    const sortEl = document.getElementById(`sort-${id}`);
    if (sortEl && typeof Sortable !== "undefined") {
      new Sortable(sortEl, {
        animation: 200,
        handle: ".drag-handle",
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        delay: 100
      });
    }
  }

  // True/False buttons
  if (ex.type === "truefalse") {
    const trueBtn = container.querySelector(".tf-true");
    const falseBtn = container.querySelector(".tf-false");
    if (trueBtn && falseBtn) {
      trueBtn.onclick = () => { trueBtn.classList.add("selected-true"); falseBtn.classList.remove("selected-false"); trueBtn.dataset.selected = "true"; falseBtn.dataset.selected = ""; };
      falseBtn.onclick = () => { falseBtn.classList.add("selected-false"); trueBtn.classList.remove("selected-true"); falseBtn.dataset.selected = "true"; trueBtn.dataset.selected = ""; };
    }
  }

  // Main check handler
  btn.onclick = () => {
    const resultDiv = container.querySelector(".ex-result");
    let correct = false;

    if (ex.type === "mcq") {
      const selected = container.querySelector(`input[type="radio"]:checked`);
      if (!selected) { showResult(resultDiv, false, "Vui lòng chọn một đáp án."); return; }
      correct = parseInt(selected.value) === ex.answer;
      container.querySelectorAll("label").forEach(l => l.classList.remove("selected"));
      selected.closest("label").classList.add("selected");
      container.querySelectorAll("input[type='radio']").forEach(r => r.disabled = true);
      container.querySelectorAll("label").forEach(l => l.style.cursor = "default");
    } else if (ex.type === "fill") {
      const input = container.querySelector(".ex-input");
      const val = input.value.trim();
      if (!val) { showResult(resultDiv, false, "Vui lòng nhập câu trả lời."); return; }
      correct = ex.expectedKeywords.some(kw => {
        const normalize = s => s.toLowerCase().replace(/[\s"';(){}\[\]]/g, "").trim();
        const nv = normalize(val), nk = normalize(kw);
        return nv.includes(nk) || nv === nk || nk.includes(nv);
      });
      input.disabled = true;
    } else if (ex.type === "truefalse") {
      const selectedVal = container.querySelector(".tf-true")?.dataset.selected === "true" ? "true"
        : container.querySelector(".tf-false")?.dataset.selected === "true" ? "false" : null;
      if (selectedVal === null) { showResult(resultDiv, false, "Vui lòng chọn Đúng hoặc Sai."); return; }
      correct = (selectedVal === "true") === ex.answer;
      container.querySelectorAll(".tf-btn").forEach(b => b.disabled = true);
    } else if (ex.type === "code") {
      const editor = aceEditors[id];
      if (!editor) { showResult(resultDiv, false, "Lỗi khởi tạo editor."); return; }
      const code = editor.getValue();
      if (!code.trim()) { showResult(resultDiv, false, "Vui lòng viết code."); return; }
      const checks = ex.checks || [];
      const failures = checks.filter(c => !new RegExp(c.regex, "m").test(code));
      if (failures.length > 0) {
        const hints = failures.map(f => f.hint).join("; ");
        showResult(resultDiv, false, `❌ Chưa đúng. Gợi ý: ${hints}<div class="ex-explanation">${ex.explanation}</div>`);
        return;
      }
      correct = true;
      editor.setReadOnly(true);
      editor.container.style.opacity = "0.8";
    } else if (ex.type === "order") {
      const sortEl = document.getElementById(`sort-${id}`);
      const items = sortEl.querySelectorAll(".sortable-item");
      const currentOrder = Array.from(items).map(li => parseInt(li.dataset.idx));
      correct = JSON.stringify(currentOrder) === JSON.stringify(ex.answer);
      sortEl.querySelectorAll(".sortable-item").forEach(li => li.style.cursor = "default");
    }

    showResult(resultDiv, correct, ex.explanation);

    if (correct) {
      markTopic(topicId, "passed");
      // Confetti
      const rect = btn.getBoundingClientRect();
      createConfetti(rect.left + rect.width/2, rect.top);
      showToast("🎉 Chính xác! Bài tập hoàn thành!", "success");
    } else {
      markTopic(topicId, "failed");
      showToast("❌ Sai rồi, xem giải thích và thử lại!", "error");
    }

    btn.disabled = true;
    btn.innerHTML = correct ? '✓ Đã hoàn thành' : '✗ Xem giải thích';
    btn.style.opacity = correct ? "0.6" : "0.6";
  };
}

function showResult(el, passed, explanation) {
  el.className = `ex-result show ${passed ? "pass" : "fail"}`;
  el.innerHTML = passed
    ? `✅ <b>Pass!</b> <span class="ex-explanation">${explanation || ""}</span>`
    : `❌ <b>Fail!</b> <span class="ex-explanation">${explanation || ""}</span>`;
}

// ===================== CONFETTI =====================
function createConfetti(cx, cy) {
  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#ec4899", "#06b6d4", "#a855f7"];
  const count = 40;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed; width:8px; height:8px; border-radius:2px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${cx}px; top:${cy}px; pointer-events:none; z-index:9999;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(el);
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 150 + Math.random() * 200;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 100;
    el.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${vx}px, ${vy + 300}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0,.5,.5,1)" }).onfinish = () => el.remove();
  }
}

// ===================== TOAST =====================
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const icons = { success: "✅", error: "❌", info: "ℹ️" };
  const colors = { success: "border-green-500/30 bg-green-500/10 text-green-400", error: "border-red-500/30 bg-red-500/10 text-red-400", info: "border-blue-500/30 bg-blue-500/10 text-blue-400" };
  toast.innerHTML = `<div class="toast-content ${colors[type] || colors.info}">${icons[type] || "ℹ️"} ${message}</div>`;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===================== EXPORT / IMPORT =====================
function exportProgress() {
  const data = getProgress();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "spring-boot-progress.json"; a.click();
  URL.revokeObjectURL(url);
  showToast("📥 Đã export tiến độ!", "success");
}

function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      saveProgress(data);
      renderNav();
      updateAllCharts();
      renderPhaseCards();
      renderWelcomeStats();
      showToast("📥 Đã import tiến độ!", "success");
      const active = document.querySelector(".topic-link.active");
      if (active) active.click();
    } catch {
      showToast("❌ File không hợp lệ!", "error");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  initDark();
  renderNav();
  showWelcome();
  // Open first phase by default
  const firstGroup = document.querySelector(".phase-group");
  if (firstGroup) firstGroup.classList.add("open");
  // Keyboard shortcut
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (window.innerWidth < 1024) document.getElementById("sidebar").classList.remove("open"); }
  });
});
