/**
 * FitManager — Gestão Inteligente de Academias
 * Projeto Prático UC14 — Matheus Duarte & Miguel
 * Semântica HTML5, <dialog> nativo e Responsividade Automática Mobile-First
 */

const STORAGE_KEY = "fitmanager_state_v1";

// Estado inicial fiel ao Mockup do Figma (8 Telas)
const INITIAL_STATE = {
  baseMetrics: {
    activeStudentsBase: 242, // + 5 ativos na lista = 247 no KPI inicial
    instructorsBase: 9,      // + 3 na lista = 12 no KPI inicial
    monthlyEnrollmentsBase: 33, // + 5 na lista = 38 no KPI inicial
    monthlyRevenueBase: 41680.50 // somado às matrículas ativas = R$ 42.890
  },
  plans: [
    {
      id: "plan-mensal",
      name: "Plano Mensal",
      months: 1,
      price: 89.90,
      studentsCount: 64,
      featured: false,
      perks: ["Musculação Livre", "Sem fidelidade"]
    },
    {
      id: "plan-trimestral",
      name: "Plano Trimestral",
      months: 3,
      price: 239.90,
      studentsCount: 85,
      featured: true,
      perks: ["Musculação + Cardio", "Avaliação Física", "Acesso 7 dias"]
    },
    {
      id: "plan-semestral",
      name: "Plano Semestral",
      months: 6,
      price: 429.90,
      studentsCount: 42,
      featured: false,
      perks: ["Aulas Coletivas", "Treino no App"]
    },
    {
      id: "plan-anual",
      name: "Plano Anual",
      months: 12,
      price: 749.90,
      studentsCount: 56,
      featured: false,
      perks: ["Acesso Total VIP", "Convidados", "Avaliação Trimestral"]
    }
  ],
  instructors: [
    {
      id: "inst-rodrigo",
      name: "Prof. Rodrigo",
      shortSelectLabel: "Rodrigo (Musculação)",
      fullSelectLabel: "Prof. Rodrigo (Musculação)",
      cref: "CREF 012345-G/SP",
      specialty: "Musculação",
      studentsCount: 48
    },
    {
      id: "inst-juliana",
      name: "Prof.ª Juliana",
      shortSelectLabel: "Juliana (Pilates)",
      fullSelectLabel: "Prof.ª Juliana (Pilates)",
      cref: "CREF 054321-G/SP",
      specialty: "Pilates",
      studentsCount: 32
    },
    {
      id: "inst-alex",
      name: "Prof. Alex",
      shortSelectLabel: "Alex (Treino Funcional)",
      fullSelectLabel: "Prof. Alex (Treino Funcional)",
      cref: "CREF 098765-G/SP",
      specialty: "Treino Funcional",
      studentsCount: 29
    }
  ],
  students: [
    {
      id: "stu-ana",
      name: "Ana Silva",
      cpf: "234.567.890-11",
      phone: "(11) 98765-4321",
      email: "ana.silva@email.com",
      planName: "Plano Anual",
      instructorName: "Prof. Rodrigo",
      status: "Ativo"
    },
    {
      id: "stu-bruno",
      name: "Bruno Costa",
      cpf: "345.678.901-22",
      phone: "(11) 91234-5678",
      email: "bruno.costa@email.com",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      status: "Ativo"
    },
    {
      id: "stu-camila",
      name: "Camila Santos",
      cpf: "456.789.012-33",
      phone: "(11) 99876-5432",
      email: "camila.santos@email.com",
      planName: "Sem plano",
      instructorName: "Prof. Alex",
      status: "Inativo"
    },
    {
      id: "stu-lucas",
      name: "Lucas Lima",
      cpf: "567.890.123-44",
      phone: "(11) 97654-3210",
      email: "lucas.lima@email.com",
      planName: "Plano Anual",
      instructorName: "Prof. Rodrigo",
      status: "Ativo"
    },
    {
      id: "stu-beatriz",
      name: "Beatriz Santos",
      cpf: "678.901.234-55",
      phone: "(11) 96543-2109",
      email: "beatriz.santos@email.com",
      planName: "Plano Trimestral",
      instructorName: "Prof.ª Juliana",
      status: "Ativo"
    },
    {
      id: "stu-gabriel",
      name: "Gabriel Souza",
      cpf: "789.012.345-66",
      phone: "(11) 95432-1098",
      email: "gabriel.souza@email.com",
      planName: "Plano Mensal",
      instructorName: "Prof. Alex",
      status: "Ativo"
    },
    {
      id: "stu-marina",
      name: "Marina Sol",
      cpf: "890.123.456-77",
      phone: "(11) 94321-0987",
      email: "marina.sol@email.com",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      status: "Ativo"
    },
    {
      id: "stu-pedro",
      name: "Pedro Alves",
      cpf: "901.234.567-88",
      phone: "(11) 93210-9876",
      email: "pedro.alves@email.com",
      planName: "Plano Trimestral",
      instructorName: "Prof. Alex",
      status: "Inativo"
    }
  ],
  enrollments: [
    {
      id: "enr-1",
      studentName: "Lucas Lima",
      planName: "Plano Anual",
      instructorName: "Prof. Rodrigo",
      startDate: "15/01/2026",
      endDate: "15/01/2027",
      status: "Ativa",
      monthlyValue: 89.90,
      showInRecent: true
    },
    {
      id: "enr-2",
      studentName: "Marina Sol",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      startDate: "10/10/2026",
      endDate: "10/11/2026",
      status: "Pendente",
      monthlyValue: 89.90,
      showInRecent: false
    },
    {
      id: "enr-3",
      studentName: "Pedro Alves",
      planName: "Plano Trimestral",
      instructorName: "Prof. Alex",
      startDate: "01/05/2026",
      endDate: "01/08/2026",
      status: "Cancelada",
      monthlyValue: 79.96,
      showInRecent: false
    },
    {
      id: "enr-4",
      studentName: "Beatriz Santos",
      planName: "Plano Trimestral",
      instructorName: "Prof.ª Juliana",
      startDate: "20/09/2026",
      endDate: "20/12/2026",
      status: "Ativa",
      monthlyValue: 79.96,
      showInRecent: true
    },
    {
      id: "enr-5",
      studentName: "Gabriel Souza",
      planName: "Plano Mensal",
      instructorName: "Prof. Alex",
      startDate: "22/10/2026",
      endDate: "22/11/2026",
      status: "Pendente",
      monthlyValue: 89.90,
      showInRecent: true
    }
  ]
};

let appState = loadState();
let currentScreen = "screen-login";
let screenHistory = ["screen-login"];
let studentFilter = "all";
let enrollmentFilter = "all";
let studentViewMode = "cards";
let pendingDeleteCallback = null;
let selectedEnrollmentStatus = "Ativa";

// ==========================================================================
// PERSISTÊNCIA LOCALSTORAGE
// ==========================================================================

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Erro ao carregar LocalStorage:", e);
  }
  return structuredClone(INITIAL_STATE);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn("Erro ao salvar LocalStorage:", e);
  }
}

function resetToFigmaState() {
  appState = structuredClone(INITIAL_STATE);
  saveState();
  renderAll();
  resetStudentFormDefaults();
  resetEnrollmentFormDefaults();
  showToast("Dados restaurados conforme o Mockup do Figma!");
}

// ==========================================================================
// FUNÇÕES UTILITÁRIAS E MÁSCARAS
// ==========================================================================

function getInitials(name, singleLetter = false) {
  if (!name) return "FM";
  const cleaned = name.replace(/^Prof\.ª?\s*/i, "").trim();
  if (singleLetter) return cleaned.charAt(0).toUpperCase();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}

function maskCPF(val) {
  return val
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(val) {
  const digits = val.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskDateBR(val) {
  return val
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

function addMonthsToDateBR(dateStr, monthsToAdd) {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return dateStr;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year) || year < 1900) return dateStr;

  const dateObj = new Date(year, month + Number(monthsToAdd), day);
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function escapeHTML(str) {
  const span = document.createElement("span");
  span.textContent = str ?? "";
  return span.innerHTML;
}

// ==========================================================================
// NAVEGAÇÃO ENTRE TELAS
// ==========================================================================

function navigateTo(screenId, pushHistory = true) {
  const target = document.getElementById(screenId);
  if (!target) return;

  document.querySelectorAll(".app-screen").forEach((sec) => {
    sec.classList.remove("active");
  });
  target.classList.add("active");

  if (pushHistory && currentScreen !== screenId) {
    screenHistory.push(screenId);
  }
  currentScreen = screenId;

  const isLogin = screenId === "screen-login";
  const bottomNav = document.getElementById("bottomNav");
  const desktopSidebar = document.getElementById("desktopSidebar");

  bottomNav.classList.toggle("hidden", isLogin);
  desktopSidebar.classList.toggle("hidden", isLogin);

  const navMapping = {
    "screen-dashboard": "screen-dashboard",
    "screen-students": "screen-students",
    "screen-add-student": "screen-students",
    "screen-plans": "screen-plans",
    "screen-enrollments": "screen-enrollments",
    "screen-new-enrollment": "screen-enrollments",
    "screen-instructors": "screen-instructors"
  };
  const activeNavKey = navMapping[screenId] || screenId;

  document.querySelectorAll(".bottom-nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === activeNavKey);
  });

  document.querySelectorAll(".sidebar-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === activeNavKey);
  });

  target.scrollTop = 0;
}

function goBack(fallbackScreen = "screen-dashboard") {
  if (screenHistory.length > 1) {
    screenHistory.pop();
    const prev = screenHistory[screenHistory.length - 1];
    if (prev && prev !== "screen-login") {
      navigateTo(prev, false);
      return;
    }
  }
  navigateTo(fallbackScreen, false);
}

// ==========================================================================
// RENDERIZAÇÃO SEMÂNTICA
// ==========================================================================

function renderAll() {
  renderDashboard();
  renderStudents();
  renderInstructors();
  renderPlans();
  renderEnrollments();
  populateFormSelects();
  updateEnrollmentAutomaticFields();
}

// 1. Dashboard
function renderDashboard() {
  const activeStudentsCount =
    appState.baseMetrics.activeStudentsBase +
    appState.students.filter((s) => s.status === "Ativo").length;
  const instructorsCount =
    appState.baseMetrics.instructorsBase + appState.instructors.length;
  const enrollmentsCount =
    appState.baseMetrics.monthlyEnrollmentsBase + appState.enrollments.length;

  const activeRevenueDelta = appState.enrollments
    .filter((e) => e.status === "Ativa")
    .reduce((acc, cur) => acc + (Number(cur.monthlyValue) || 89.9), 0);
  const totalRevenue = Math.round(appState.baseMetrics.monthlyRevenueBase + activeRevenueDelta * 6.72);

  document.getElementById("kpiActiveStudents").textContent = activeStudentsCount;
  document.getElementById("kpiInstructors").textContent = instructorsCount;
  document.getElementById("kpiMonthlyEnrollments").textContent = enrollmentsCount;
  document.getElementById("kpiMonthlyRevenue").textContent =
    "R$ " + totalRevenue.toLocaleString("pt-BR");

  document.getElementById("sideCountStudents").textContent = activeStudentsCount;
  document.getElementById("sideCountInstructors").textContent = instructorsCount;
  document.getElementById("sideCountPlans").textContent = appState.plans.length;
  document.getElementById("sideCountEnrollments").textContent = enrollmentsCount;

  const recentContainer = document.getElementById("dashboardRecentList");
  const recentItems = appState.enrollments
    .filter((e) => e.showInRecent)
    .concat(appState.enrollments.filter((e) => !e.showInRecent))
    .slice(0, 4);

  recentContainer.innerHTML = recentItems
    .map((enr) => {
      const initials = getInitials(enr.studentName);
      const badgeClass =
        enr.status === "Ativa"
          ? "emerald"
          : enr.status === "Pendente"
          ? "amber"
          : "danger";
      return `
        <article class="item-card card-row-main" data-open-enrollment="${enr.id}">
          <span class="avatar-circle" aria-hidden="true">${escapeHTML(initials)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(enr.studentName)}</h3>
            <p class="card-sub">${escapeHTML(enr.planName)} • ${escapeHTML(enr.instructorName)}</p>
          </hgroup>
          <span class="status-badge ${badgeClass}">${escapeHTML(enr.status)}</span>
        </article>
      `;
    })
    .join("");
}

// 2. Alunos (screen-students)
function renderStudents() {
  const query = (document.getElementById("searchStudentsInput")?.value || "")
    .trim()
    .toLowerCase();

  const totalAll = appState.students.length;
  const totalActive = appState.students.filter((s) => s.status === "Ativo").length;
  const totalInactive = appState.students.filter((s) => s.status === "Inativo").length;

  const elAll = document.getElementById("countFilterAll");
  const elAct = document.getElementById("countFilterActive");
  const elInact = document.getElementById("countFilterInactive");
  if (elAll) elAll.textContent = totalAll;
  if (elAct) elAct.textContent = totalActive;
  if (elInact) elInact.textContent = totalInactive;

  const filtered = appState.students.filter((st) => {
    const matchesStatus =
      studentFilter === "all" ? true : st.status === studentFilter;
    const matchesQuery =
      !query ||
      st.name.toLowerCase().includes(query) ||
      st.planName.toLowerCase().includes(query) ||
      st.phone.toLowerCase().includes(query) ||
      st.instructorName.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const container = document.getElementById("studentsListContainer");
  const tableBody = document.getElementById("studentsTableBody");

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 1.75rem; cursor: default;">
        <p class="card-sub">Nenhum aluno encontrado para o filtro selecionado.</p>
      </article>
    `;
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Nenhum aluno encontrado.</td></tr>`;
    return;
  }

  container.innerHTML = filtered
    .map((st) => {
      const initials = getInitials(st.name);
      const isInactive = st.status === "Inativo";
      return `
        <article class="item-card card-row-main" data-open-student="${st.id}">
          <span class="avatar-circle ${isInactive ? "muted" : ""}" aria-hidden="true">${escapeHTML(initials)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(st.name)}</h3>
            <p class="card-sub">${escapeHTML(st.planName)}</p>
            <p class="card-meta">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${escapeHTML(st.phone)}</span>
            </p>
          </hgroup>
          <span class="status-badge ${isInactive ? "danger" : "emerald"}">${escapeHTML(st.status)}</span>
        </article>
      `;
    })
    .join("");

  tableBody.innerHTML = filtered
    .map((st) => {
      const isInactive = st.status === "Inativo";
      return `
        <tr data-open-student="${st.id}" style="cursor:pointer;">
          <td><strong>${escapeHTML(st.name)}</strong><br><small style="color:var(--text-muted)">${escapeHTML(st.email)}</small></td>
          <td>${escapeHTML(st.cpf)}<br><small style="color:var(--text-muted)">${escapeHTML(st.phone)}</small></td>
          <td>${escapeHTML(st.planName)}</td>
          <td>${escapeHTML(st.instructorName)}</td>
          <td><span class="status-badge ${isInactive ? "danger" : "emerald"}">${escapeHTML(st.status)}</span></td>
          <td class="text-right">
            <button type="button" class="btn-card-action" data-edit-student="${st.id}" title="Editar">✏️</button>
            <button type="button" class="btn-card-action delete" data-delete-student="${st.id}" title="Excluir">🗑️</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

// 3. Instrutores (screen-instructors)
function renderInstructors() {
  const query = (document.getElementById("searchInstructorsInput")?.value || "")
    .trim()
    .toLowerCase();

  const filtered = appState.instructors.filter((ins) => {
    return (
      !query ||
      ins.name.toLowerCase().includes(query) ||
      ins.cref.toLowerCase().includes(query) ||
      ins.specialty.toLowerCase().includes(query)
    );
  });

  const container = document.getElementById("instructorsListContainer");
  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 1.75rem; cursor: default;">
        <p class="card-sub">Nenhum instrutor encontrado.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((ins) => {
      const letter = getInitials(ins.name, true);
      return `
        <article class="item-card card-row-main" data-open-instructor="${ins.id}">
          <span class="avatar-circle" aria-hidden="true">${escapeHTML(letter)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(ins.name)}</h3>
            <p class="card-sub">${escapeHTML(ins.cref)}</p>
            <p class="instructor-tags-row">
              <span class="specialty-badge">${escapeHTML(ins.specialty)}</span>
              <small class="student-count-meta">• ${ins.studentsCount} alunos</small>
            </p>
          </hgroup>
        </article>
      `;
    })
    .join("");
}

// 4. Planos (screen-plans)
function renderPlans() {
  const container = document.getElementById("plansListContainer");
  container.innerHTML = appState.plans
    .map((plan) => {
      const durationText =
        plan.months === 1 ? "Duração: 1 mês" : `Duração: ${plan.months} meses`;
      const perks = plan.perks && plan.perks.length
        ? plan.perks
        : ["Musculação Livre", "Avaliação Física"];
      return `
        <article class="item-card plan-card ${plan.featured ? "featured" : ""}" data-open-plan="${plan.id}">
          <div class="plan-card-top">
            <hgroup class="card-info">
              <h3 class="card-title">${escapeHTML(plan.name)}</h3>
              <p class="card-sub">${durationText}</p>
            </hgroup>
            <footer class="plan-price-col">
              <strong class="plan-price-val">${formatBRL(plan.price)}</strong>
              <small class="plan-students-count">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                ${plan.studentsCount} alunos
              </small>
            </footer>
          </div>
          <div class="plan-perks-row">
            ${perks.map((pk) => `<span class="plan-perk-tag">✓ ${escapeHTML(pk)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

// 5. Matrículas (screen-enrollments)
function renderEnrollments() {
  const countAll = appState.enrollments.length;
  const countAct = appState.enrollments.filter((e) => e.status === "Ativa").length;
  const countPend = appState.enrollments.filter((e) => e.status === "Pendente").length;
  const countCanc = appState.enrollments.filter((e) => e.status === "Cancelada").length;

  const elAll = document.getElementById("countEnrAll");
  const elAct = document.getElementById("countEnrActive");
  const elPend = document.getElementById("countEnrPending");
  const elCanc = document.getElementById("countEnrCanceled");
  if (elAll) elAll.textContent = countAll;
  if (elAct) elAct.textContent = countAct;
  if (elPend) elPend.textContent = countPend;
  if (elCanc) elCanc.textContent = countCanc;

  const filtered = appState.enrollments.filter((enr) => {
    return enrollmentFilter === "all" ? true : enr.status === enrollmentFilter;
  });

  const container = document.getElementById("enrollmentsListContainer");
  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 1.75rem; cursor: default;">
        <p class="card-sub">Nenhuma matrícula encontrada neste status.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((enr) => {
      const badgeClass =
        enr.status === "Ativa"
          ? "emerald"
          : enr.status === "Pendente"
          ? "amber"
          : "danger";
      const progressWidth =
        enr.status === "Ativa" ? "75%" : enr.status === "Pendente" ? "40%" : "100%";
      return `
        <article class="item-card" data-open-enrollment="${enr.id}">
          <header class="enrollment-card-top">
            <hgroup class="card-info">
              <h3 class="card-title">${escapeHTML(enr.studentName)}</h3>
              <p class="card-sub">${escapeHTML(enr.planName)} • ${escapeHTML(enr.instructorName)}</p>
            </hgroup>
            <span class="status-badge ${badgeClass}">${escapeHTML(enr.status)}</span>
          </header>
          <footer class="enrollment-dates-row">
            <p class="date-col">
              <span>INÍCIO</span>
              <strong>${escapeHTML(enr.startDate)}</strong>
            </p>
            <p class="date-col right">
              <span>TÉRMINO</span>
              <strong>${escapeHTML(enr.endDate)}</strong>
            </p>
          </footer>
          <span class="contract-progress-track">
            <i class="contract-progress-fill ${badgeClass}" style="width: ${progressWidth}"></i>
          </span>
        </article>
      `;
    })
    .join("");
}

// 6. Popula Selects nos Formulários
function populateFormSelects() {
  const studentPlanSelect = document.getElementById("studentPlan");
  const studentInstructorSelect = document.getElementById("studentInstructor");
  const enrollStudentSelect = document.getElementById("enrollStudentSelect");
  const enrollPlanSelect = document.getElementById("enrollPlanSelect");
  const enrollInstructorSelect = document.getElementById("enrollInstructorSelect");

  const currentStuPlan = studentPlanSelect.value || "Plano Trimestral";
  const currentStuInst = studentInstructorSelect.value || "Prof. Rodrigo";
  const currentEnrStu = enrollStudentSelect.value || "Lucas Lima";
  const currentEnrPlan = enrollPlanSelect.value || "Plano Mensal";
  const currentEnrInst = enrollInstructorSelect.value || "Prof. Rodrigo";

  studentPlanSelect.innerHTML = appState.plans
    .map((p) => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)}</option>`)
    .join("");
  studentPlanSelect.value = appState.plans.some((p) => p.name === currentStuPlan)
    ? currentStuPlan
    : appState.plans[0]?.name || "";

  studentInstructorSelect.innerHTML = appState.instructors
    .map(
      (i) =>
        `<option value="${escapeHTML(i.name)}">${escapeHTML(
          i.fullSelectLabel || `${i.name} (${i.specialty})`
        )}</option>`
    )
    .join("");
  studentInstructorSelect.value = appState.instructors.some((i) => i.name === currentStuInst)
    ? currentStuInst
    : appState.instructors[0]?.name || "";

  const sortedStudentsForEnroll = [...appState.students].sort((a, b) =>
    a.name === "Lucas Lima" ? -1 : b.name === "Lucas Lima" ? 1 : 0
  );

  enrollStudentSelect.innerHTML = sortedStudentsForEnroll
    .map((s) => `<option value="${escapeHTML(s.name)}">${escapeHTML(s.name)}</option>`)
    .join("");
  enrollStudentSelect.value = appState.students.some((s) => s.name === currentEnrStu)
    ? currentEnrStu
    : sortedStudentsForEnroll[0]?.name || "";

  enrollPlanSelect.innerHTML = appState.plans
    .map((p) => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)}</option>`)
    .join("");
  enrollPlanSelect.value = appState.plans.some((p) => p.name === currentEnrPlan)
    ? currentEnrPlan
    : appState.plans[0]?.name || "";

  enrollInstructorSelect.innerHTML = appState.instructors
    .map(
      (i) =>
        `<option value="${escapeHTML(i.name)}">${escapeHTML(
          i.shortSelectLabel || `${i.name.replace(/^Prof\.ª?\s*/i, "")} (${i.specialty})`
        )}</option>`
    )
    .join("");
  enrollInstructorSelect.value = appState.instructors.some((i) => i.name === currentEnrInst)
    ? currentEnrInst
    : appState.instructors[0]?.name || "";
}

function updateEnrollmentAutomaticFields() {
  const planName = document.getElementById("enrollPlanSelect")?.value;
  const startDate = document.getElementById("enrollStartDate")?.value || "25/10/2026";
  const planObj =
    appState.plans.find((p) => p.name === planName) || appState.plans[0];

  if (!planObj) return;

  const endDate = addMonthsToDateBR(startDate, planObj.months);
  document.getElementById("enrollEndDate").value = endDate;

  const monthlyEq = planObj.price / planObj.months;
  const priceLabel =
    planObj.months === 1
      ? `${formatBRL(planObj.price)} / mês`
      : `${formatBRL(planObj.price)} (${formatBRL(monthlyEq)}/mês)`;

  document.getElementById("enrollEstimatedPrice").textContent = priceLabel;
}

// ==========================================================================
// CONTROLE DOS ELEMENTOS <dialog> NATIVOS DO HTML5
// ==========================================================================

function openModal(modalId) {
  const dlg = document.getElementById(modalId);
  if (dlg && typeof dlg.showModal === "function" && !dlg.open) {
    dlg.showModal();
  }
}

function closeModal(modalId) {
  const dlg = document.getElementById(modalId);
  if (dlg && dlg.open) {
    dlg.close();
  }
}

function confirmDelete(title, message, onConfirm) {
  document.getElementById("confirmDeleteTitle").textContent = title;
  document.getElementById("confirmDeleteText").textContent = message;
  pendingDeleteCallback = onConfirm;
  openModal("modalConfirmDelete");
}

function openStudentDetails(studentId) {
  const st = appState.students.find((s) => s.id === studentId);
  if (!st) return;

  document.getElementById("detailsSheetTitle").textContent = st.name;
  document.getElementById("detailsSheetBody").innerHTML = `
    <div class="detail-row"><dt>Status</dt><dd>${escapeHTML(st.status)}</dd></div>
    <div class="detail-row"><dt>CPF</dt><dd>${escapeHTML(st.cpf)}</dd></div>
    <div class="detail-row"><dt>Telefone</dt><dd>${escapeHTML(st.phone)}</dd></div>
    <div class="detail-row"><dt>E-mail</dt><dd>${escapeHTML(st.email)}</dd></div>
    <div class="detail-row"><dt>Plano Contratado</dt><dd>${escapeHTML(st.planName)}</dd></div>
    <div class="detail-row"><dt>Professor Responsável</dt><dd>${escapeHTML(st.instructorName)}</dd></div>
  `;

  document.getElementById("detailsSheetActions").innerHTML = `
    <button type="button" class="btn-secondary" id="sheetBtnEditStudent">Editar</button>
    <button type="button" class="btn-primary" id="sheetBtnEnrollStudent">Nova Matrícula</button>
    <button type="button" class="btn-danger" id="sheetBtnDeleteStudent">Excluir</button>
  `;

  openModal("modalDetailsSheet");

  document.getElementById("sheetBtnEditStudent").onclick = () => {
    closeModal("modalDetailsSheet");
    startEditStudent(st.id);
  };

  document.getElementById("sheetBtnEnrollStudent").onclick = () => {
    closeModal("modalDetailsSheet");
    resetEnrollmentFormDefaults();
    document.getElementById("enrollStudentSelect").value = st.name;
    if (st.planName && st.planName !== "Sem plano") {
      document.getElementById("enrollPlanSelect").value = st.planName;
    }
    if (st.instructorName) {
      document.getElementById("enrollInstructorSelect").value = st.instructorName;
    }
    updateEnrollmentAutomaticFields();
    navigateTo("screen-new-enrollment");
  };

  document.getElementById("sheetBtnDeleteStudent").onclick = () => {
    closeModal("modalDetailsSheet");
    confirmDelete(
      "Excluir Aluno",
      `Deseja realmente remover o aluno "${st.name}" do sistema?`,
      () => {
        appState.students = appState.students.filter((x) => x.id !== st.id);
        saveState();
        renderAll();
        showToast("Aluno excluído com sucesso.");
      }
    );
  };
}

function openInstructorDetails(instId) {
  const ins = appState.instructors.find((i) => i.id === instId);
  if (!ins) return;

  document.getElementById("detailsSheetTitle").textContent = ins.name;
  document.getElementById("detailsSheetBody").innerHTML = `
    <div class="detail-row"><dt>Registro CREF</dt><dd>${escapeHTML(ins.cref)}</dd></div>
    <div class="detail-row"><dt>Especialidade</dt><dd>${escapeHTML(ins.specialty)}</dd></div>
    <div class="detail-row"><dt>Alunos Vinculados</dt><dd>${ins.studentsCount} alunos</dd></div>
  `;

  document.getElementById("detailsSheetActions").innerHTML = `
    <button type="button" class="btn-secondary" id="sheetBtnEditInst">Editar</button>
    <button type="button" class="btn-danger" id="sheetBtnDeleteInst">Excluir</button>
  `;

  openModal("modalDetailsSheet");

  document.getElementById("sheetBtnEditInst").onclick = () => {
    closeModal("modalDetailsSheet");
    openInstructorModal(ins);
  };

  document.getElementById("sheetBtnDeleteInst").onclick = () => {
    closeModal("modalDetailsSheet");
    confirmDelete(
      "Excluir Instrutor",
      `Deseja remover "${ins.name}" do corpo técnico?`,
      () => {
        appState.instructors = appState.instructors.filter((x) => x.id !== ins.id);
        saveState();
        renderAll();
        showToast("Instrutor removido com sucesso.");
      }
    );
  };
}

function openPlanDetails(planId) {
  const plan = appState.plans.find((p) => p.id === planId);
  if (!plan) return;

  document.getElementById("detailsSheetTitle").textContent = plan.name;
  document.getElementById("detailsSheetBody").innerHTML = `
    <div class="detail-row"><dt>Duração</dt><dd>${plan.months} ${plan.months === 1 ? "mês" : "meses"}</dd></div>
    <div class="detail-row"><dt>Valor do Pacote</dt><dd>${formatBRL(plan.price)}</dd></div>
    <div class="detail-row"><dt>Alunos Ativos no Plano</dt><dd>${plan.studentsCount} alunos</dd></div>
  `;

  document.getElementById("detailsSheetActions").innerHTML = `
    <button type="button" class="btn-secondary" id="sheetBtnEditPlan">Editar</button>
    <button type="button" class="btn-primary" id="sheetBtnUsePlan">Matricular</button>
    <button type="button" class="btn-danger" id="sheetBtnDeletePlan">Excluir</button>
  `;

  openModal("modalDetailsSheet");

  document.getElementById("sheetBtnEditPlan").onclick = () => {
    closeModal("modalDetailsSheet");
    openPlanModal(plan);
  };

  document.getElementById("sheetBtnUsePlan").onclick = () => {
    closeModal("modalDetailsSheet");
    resetEnrollmentFormDefaults();
    document.getElementById("enrollPlanSelect").value = plan.name;
    updateEnrollmentAutomaticFields();
    navigateTo("screen-new-enrollment");
  };

  document.getElementById("sheetBtnDeletePlan").onclick = () => {
    closeModal("modalDetailsSheet");
    confirmDelete(
      "Excluir Plano",
      `Deseja excluir o "${plan.name}" da academia?`,
      () => {
        appState.plans = appState.plans.filter((x) => x.id !== plan.id);
        saveState();
        renderAll();
        showToast("Plano excluído com sucesso.");
      }
    );
  };
}

function openEnrollmentDetails(enrId) {
  const enr = appState.enrollments.find((e) => e.id === enrId);
  if (!enr) return;

  document.getElementById("detailsSheetTitle").textContent = `Matrícula • ${enr.studentName}`;
  document.getElementById("detailsSheetBody").innerHTML = `
    <div class="detail-row"><dt>Aluno(a)</dt><dd>${escapeHTML(enr.studentName)}</dd></div>
    <div class="detail-row"><dt>Plano Contratado</dt><dd>${escapeHTML(enr.planName)}</dd></div>
    <div class="detail-row"><dt>Instrutor Responsável</dt><dd>${escapeHTML(enr.instructorName)}</dd></div>
    <div class="detail-row"><dt>Data de Início</dt><dd>${escapeHTML(enr.startDate)}</dd></div>
    <div class="detail-row"><dt>Data de Término</dt><dd>${escapeHTML(enr.endDate)}</dd></div>
    <div class="detail-row"><dt>Status Atual</dt><dd>${escapeHTML(enr.status)}</dd></div>
  `;

  const nextStatus =
    enr.status === "Ativa"
      ? "Pendente"
      : enr.status === "Pendente"
      ? "Ativa"
      : "Ativa";

  document.getElementById("detailsSheetActions").innerHTML = `
    <button type="button" class="btn-secondary" id="sheetBtnToggleEnrStatus">Marcar ${nextStatus}</button>
    <button type="button" class="btn-danger" id="sheetBtnCancelEnr">${enr.status === "Cancelada" ? "Excluir" : "Cancelar Matrícula"}</button>
  `;

  openModal("modalDetailsSheet");

  document.getElementById("sheetBtnToggleEnrStatus").onclick = () => {
    enr.status = nextStatus;
    saveState();
    renderAll();
    closeModal("modalDetailsSheet");
    showToast(`Status da matrícula atualizado para ${nextStatus}!`);
  };

  document.getElementById("sheetBtnCancelEnr").onclick = () => {
    closeModal("modalDetailsSheet");
    if (enr.status !== "Cancelada") {
      enr.status = "Cancelada";
      saveState();
      renderAll();
      showToast("Matrícula marcada como Cancelada.");
    } else {
      confirmDelete(
        "Excluir Registro de Matrícula",
        `Deseja remover definitivamente a matrícula de "${enr.studentName}"?`,
        () => {
          appState.enrollments = appState.enrollments.filter((x) => x.id !== enr.id);
          saveState();
          renderAll();
          showToast("Matrícula excluída.");
        }
      );
    }
  };
}

// ==========================================================================
// FORMULÁRIOS DE CADASTRO E EDIÇÃO
// ==========================================================================

function resetStudentFormDefaults() {
  document.getElementById("studentEditId").value = "";
  document.getElementById("studentFormTitle").textContent = "Cadastrar Aluno";
  document.getElementById("studentFormSubtitle").textContent = "Novo registro";
  document.getElementById("studentName").value = "Matheus Duarte Silva";
  document.getElementById("studentCpf").value = "123.456.789-00";
  document.getElementById("studentPhone").value = "(11) 98765-4321";
  document.getElementById("studentEmail").value = "matheus@email.com";
  populateFormSelects();
  document.getElementById("studentPlan").value = "Plano Trimestral";
  document.getElementById("studentInstructor").value = "Prof. Rodrigo";
}

function startEditStudent(studentId) {
  const st = appState.students.find((s) => s.id === studentId);
  if (!st) return;

  populateFormSelects();
  document.getElementById("studentEditId").value = st.id;
  document.getElementById("studentFormTitle").textContent = "Editar Aluno";
  document.getElementById("studentFormSubtitle").textContent = st.name;
  document.getElementById("studentName").value = st.name;
  document.getElementById("studentCpf").value = st.cpf;
  document.getElementById("studentPhone").value = st.phone;
  document.getElementById("studentEmail").value = st.email;
  if (appState.plans.some((p) => p.name === st.planName)) {
    document.getElementById("studentPlan").value = st.planName;
  }
  if (appState.instructors.some((i) => i.name === st.instructorName)) {
    document.getElementById("studentInstructor").value = st.instructorName;
  }
  navigateTo("screen-add-student");
}

function resetEnrollmentFormDefaults() {
  document.getElementById("enrollmentEditId").value = "";
  populateFormSelects();
  document.getElementById("enrollStudentSelect").value = "Lucas Lima";
  document.getElementById("enrollPlanSelect").value = "Plano Mensal";
  document.getElementById("enrollInstructorSelect").value = "Prof. Rodrigo";
  document.getElementById("enrollStartDate").value = "25/10/2026";
  setEnrollmentStatusRadio("Ativa");
  updateEnrollmentAutomaticFields();
}

function setEnrollmentStatusRadio(statusVal) {
  selectedEnrollmentStatus = statusVal;
  document.querySelectorAll(".status-radio-pill").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.statusVal === statusVal);
  });
}

function openInstructorModal(inst = null) {
  document.getElementById("instructorEditId").value = inst ? inst.id : "";
  document.getElementById("modalInstructorTitle").textContent = inst
    ? "Editar Instrutor"
    : "Cadastrar Instrutor";
  document.getElementById("instructorName").value = inst ? inst.name : "";
  document.getElementById("instructorCref").value = inst ? inst.cref : "";
  document.getElementById("instructorSpecialty").value = inst ? inst.specialty : "";
  openModal("modalInstructor");
}

function openPlanModal(plan = null) {
  document.getElementById("planEditId").value = plan ? plan.id : "";
  document.getElementById("modalPlanTitle").textContent = plan
    ? "Editar Plano"
    : "Cadastrar Plano";
  document.getElementById("planName").value = plan ? plan.name : "";
  document.getElementById("planMonths").value = plan ? plan.months : 1;
  document.getElementById("planPrice").value = plan ? plan.price : 99.9;
  document.getElementById("planFeatured").checked = plan ? !!plan.featured : false;
  openModal("modalPlan");
}

function toggleTheme() {
  const html = document.documentElement;
  const nextTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", nextTheme);
  showToast(nextTheme === "dark" ? "Modo Escuro ativado" : "Modo Claro ativado");
}

// ==========================================================================
// TOAST NOTIFICATION SEMÂNTICO
// ==========================================================================

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("output");
  toast.className = "toast-item";
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${escapeHTML(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-0.5rem)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 220);
  }, 2800);
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  resetStudentFormDefaults();
  resetEnrollmentFormDefaults();
  renderAll();

  document.body.addEventListener("click", (e) => {
    const gotoBtn = e.target.closest("[data-goto]");
    if (gotoBtn) {
      const targetScreen = gotoBtn.dataset.goto;
      if (targetScreen === "screen-add-student" && currentScreen !== "screen-add-student") {
        resetStudentFormDefaults();
      }
      if (targetScreen === "screen-new-enrollment" && currentScreen !== "screen-new-enrollment") {
        resetEnrollmentFormDefaults();
      }
      navigateTo(targetScreen);
      return;
    }

    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      navigateTo(navBtn.dataset.nav);
      return;
    }

    const backBtn = e.target.closest("[data-back]");
    if (backBtn) {
      goBack(backBtn.dataset.back);
      return;
    }

    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }

    const editStuBtn = e.target.closest("[data-edit-student]");
    if (editStuBtn) {
      e.stopPropagation();
      startEditStudent(editStuBtn.dataset.editStudent);
      return;
    }

    const delStuBtn = e.target.closest("[data-delete-student]");
    if (delStuBtn) {
      e.stopPropagation();
      const st = appState.students.find((s) => s.id === delStuBtn.dataset.deleteStudent);
      if (st) {
        confirmDelete("Excluir Aluno", `Deseja remover "${st.name}"?`, () => {
          appState.students = appState.students.filter((x) => x.id !== st.id);
          saveState();
          renderAll();
          showToast("Aluno excluído com sucesso.");
        });
      }
      return;
    }

    const studentCard = e.target.closest("[data-open-student]");
    if (studentCard) {
      openStudentDetails(studentCard.dataset.openStudent);
      return;
    }

    const instCard = e.target.closest("[data-open-instructor]");
    if (instCard) {
      openInstructorDetails(instCard.dataset.openInstructor);
      return;
    }

    const planCard = e.target.closest("[data-open-plan]");
    if (planCard) {
      openPlanDetails(planCard.dataset.openPlan);
      return;
    }

    const enrCard = e.target.closest("[data-open-enrollment]");
    if (enrCard) {
      openEnrollmentDetails(enrCard.dataset.openEnrollment);
      return;
    }
  });

  // Fechar <dialog> ao clicar fora (no backdrop)
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!clickedInDialog) {
        dlg.close();
      }
    });
  });

  // Login Form
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();
    const emailErr = document.getElementById("loginEmailError");
    const passErr = document.getElementById("loginPasswordError");

    emailErr.textContent = "";
    passErr.textContent = "";

    if (!email || !email.includes("@")) {
      emailErr.textContent = "Informe um e-mail válido.";
      return;
    }
    if (pass.length < 4) {
      passErr.textContent = "A senha deve conter pelo menos 4 caracteres.";
      return;
    }

    const submitBtn = document.getElementById("btnLoginSubmit");
    const origText = submitBtn.textContent;
    submitBtn.textContent = "Autenticando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      navigateTo("screen-dashboard");
      showToast("Bem-vindo ao FitManager, Admin!");
    }, 300);
  });

  document.getElementById("btnTogglePassword").addEventListener("click", () => {
    const pwdInput = document.getElementById("loginPassword");
    const isPassword = pwdInput.type === "password";
    pwdInput.type = isPassword ? "text" : "password";
    document.getElementById("eyeIconClosed").classList.toggle("hidden", isPassword);
    document.getElementById("eyeIconOpen").classList.toggle("hidden", !isPassword);
  });

  document.getElementById("btnForgotPassword").addEventListener("click", () => {
    openModal("modalForgotPass");
  });

  document.getElementById("forgotPassForm").addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("modalForgotPass");
    showToast("Link de recuperação enviado para seu e-mail!");
  });

  document.getElementById("btnLogoutDesktop").addEventListener("click", () => {
    navigateTo("screen-login");
    showToast("Sessão encerrada.");
  });

  document.getElementById("btnQuickLogoutMobile").addEventListener("click", () => {
    navigateTo("screen-login");
    showToast("Sessão encerrada.");
  });

  document.getElementById("searchStudentsInput").addEventListener("input", renderStudents);

  document.getElementById("studentFilterPills").addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    studentFilter = pill.dataset.filter;
    document.querySelectorAll("#studentFilterPills .filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-selected", p === pill ? "true" : "false");
    });
    renderStudents();
  });

  document.getElementById("btnToggleStudentView").addEventListener("click", (e) => {
    studentViewMode = studentViewMode === "cards" ? "table" : "cards";
    e.currentTarget.classList.toggle("active", studentViewMode === "table");
    document
      .getElementById("studentsListContainer")
      .classList.toggle("hidden", studentViewMode === "table");
    document
      .getElementById("studentsTableContainer")
      .classList.toggle("hidden", studentViewMode !== "table");
  });

  document.getElementById("searchInstructorsInput").addEventListener("input", renderInstructors);

  document.getElementById("enrollmentFilterPills").addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    enrollmentFilter = pill.dataset.filter;
    document.querySelectorAll("#enrollmentFilterPills .filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-selected", p === pill ? "true" : "false");
    });
    renderEnrollments();
  });

  document.getElementById("studentCpf").addEventListener("input", (e) => {
    e.target.value = maskCPF(e.target.value);
  });
  document.getElementById("studentPhone").addEventListener("input", (e) => {
    e.target.value = maskPhone(e.target.value);
  });
  document.getElementById("enrollStartDate").addEventListener("input", (e) => {
    e.target.value = maskDateBR(e.target.value);
    updateEnrollmentAutomaticFields();
  });
  document.getElementById("enrollPlanSelect").addEventListener("change", () => {
    updateEnrollmentAutomaticFields();
  });

  document.getElementById("studentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("studentEditId").value;
    const name = document.getElementById("studentName").value.trim();
    const cpf = document.getElementById("studentCpf").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const planName = document.getElementById("studentPlan").value;
    const instructorName = document.getElementById("studentInstructor").value;

    document.getElementById("studentNameError").textContent = "";
    if (name.length < 3) {
      document.getElementById("studentNameError").textContent =
        "Informe o nome completo do aluno.";
      return;
    }

    if (editId) {
      const existing = appState.students.find((s) => s.id === editId);
      if (existing) {
        existing.name = name;
        existing.cpf = cpf || "000.000.000-00";
        existing.phone = phone || "(11) 90000-0000";
        existing.email = email || "aluno@email.com";
        existing.planName = planName;
        existing.instructorName = instructorName;
        existing.status = planName === "Sem plano" ? "Inativo" : "Ativo";
      }
      showToast(`Dados de ${name} atualizados!`);
    } else {
      const newStudent = {
        id: "stu-" + Date.now(),
        name,
        cpf: cpf || "000.000.000-00",
        phone: phone || "(11) 90000-0000",
        email: email || "aluno@email.com",
        planName,
        instructorName,
        status: "Ativo"
      };
      appState.students.unshift(newStudent);

      const planObj = appState.plans.find((p) => p.name === planName);
      if (planObj) planObj.studentsCount += 1;
      const instObj = appState.instructors.find((i) => i.name === instructorName);
      if (instObj) instObj.studentsCount += 1;

      showToast(`Aluno ${name} cadastrado com sucesso!`);
    }

    saveState();
    renderAll();
    navigateTo("screen-students");
  });

  document.querySelectorAll(".status-radio-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      setEnrollmentStatusRadio(pill.dataset.statusVal);
    });
  });

  document.getElementById("enrollmentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const studentName = document.getElementById("enrollStudentSelect").value;
    const planName = document.getElementById("enrollPlanSelect").value;
    const instructorName = document.getElementById("enrollInstructorSelect").value;
    const startDate = document.getElementById("enrollStartDate").value.trim() || "25/10/2026";
    const endDate = document.getElementById("enrollEndDate").value.trim() || "25/11/2026";

    const planObj = appState.plans.find((p) => p.name === planName);
    const monthlyVal = planObj ? planObj.price / planObj.months : 89.9;

    const newEnr = {
      id: "enr-" + Date.now(),
      studentName,
      planName,
      instructorName,
      startDate,
      endDate,
      status: selectedEnrollmentStatus,
      monthlyValue: monthlyVal,
      showInRecent: true
    };

    appState.enrollments.unshift(newEnr);

    const stuObj = appState.students.find((s) => s.name === studentName);
    if (stuObj) {
      stuObj.planName = planName;
      stuObj.instructorName = instructorName;
      stuObj.status = "Ativo";
    }

    saveState();
    renderAll();
    navigateTo("screen-enrollments");
    showToast(`Matrícula de ${studentName} confirmada!`);
  });

  document.getElementById("btnFabAddInstructor").addEventListener("click", () => openInstructorModal());
  document.getElementById("btnOpenAddInstructorDesktop").addEventListener("click", () => openInstructorModal());

  document.getElementById("instructorForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("instructorEditId").value;
    const name = document.getElementById("instructorName").value.trim();
    const cref = document.getElementById("instructorCref").value.trim();
    const specialty = document.getElementById("instructorSpecialty").value.trim();

    if (!name || !specialty) return;

    const formattedName = name.startsWith("Prof") ? name : `Prof. ${name}`;
    const shortName = formattedName.replace(/^Prof\.ª?\s*/i, "");

    if (editId) {
      const ins = appState.instructors.find((i) => i.id === editId);
      if (ins) {
        ins.name = formattedName;
        ins.cref = cref || "CREF 000000-G/SP";
        ins.specialty = specialty;
        ins.shortSelectLabel = `${shortName} (${specialty})`;
        ins.fullSelectLabel = `${formattedName} (${specialty})`;
      }
      showToast("Instrutor atualizado!");
    } else {
      appState.instructors.push({
        id: "inst-" + Date.now(),
        name: formattedName,
        shortSelectLabel: `${shortName} (${specialty})`,
        fullSelectLabel: `${formattedName} (${specialty})`,
        cref: cref || "CREF 000000-G/SP",
        specialty,
        studentsCount: 1
      });
      showToast(`Instrutor ${formattedName} cadastrado!`);
    }

    saveState();
    renderAll();
    closeModal("modalInstructor");
  });

  document.getElementById("btnFabAddPlan").addEventListener("click", () => openPlanModal());
  document.getElementById("btnOpenAddPlanDesktop").addEventListener("click", () => openPlanModal());

  document.getElementById("planForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("planEditId").value;
    const name = document.getElementById("planName").value.trim();
    const months = parseInt(document.getElementById("planMonths").value, 10) || 1;
    const price = parseFloat(document.getElementById("planPrice").value) || 89.9;
    const featured = document.getElementById("planFeatured").checked;

    if (!name) return;

    if (editId) {
      const plan = appState.plans.find((p) => p.id === editId);
      if (plan) {
        plan.name = name;
        plan.months = months;
        plan.price = price;
        plan.featured = featured;
      }
      showToast("Plano atualizado!");
    } else {
      appState.plans.push({
        id: "plan-" + Date.now(),
        name,
        months,
        price,
        studentsCount: 0,
        featured,
        perks: ["Musculação Livre", "Avaliação Física"]
      });
      showToast(`${name} criado com sucesso!`);
    }

    saveState();
    renderAll();
    closeModal("modalPlan");
  });

  document.getElementById("btnConfirmDeleteAction").addEventListener("click", () => {
    if (typeof pendingDeleteCallback === "function") {
      pendingDeleteCallback();
      pendingDeleteCallback = null;
    }
    closeModal("modalConfirmDelete");
  });

  document.getElementById("btnToggleThemeDesktop").addEventListener("click", toggleTheme);
  document.getElementById("btnToggleThemeMobile").addEventListener("click", toggleTheme);
  document.getElementById("btnResetData").addEventListener("click", resetToFigmaState);
});
