/**
 * MaxFit Club — Sistema Integrado de Treinos e Gestão da Academia
 * Autores: Matheus Duarte & Miguel | UC14 (Senac)
 * Multi-páginas: index.html (Portal), login.html (Login), aluno.html (Aluno),
 * instrutor.html (Instrutor), admin.html (Administrador)
 * HTML5 Estritamente Semântico (Zero <div>), <dialog> nativo e Mobile-First
 */

const STORAGE_KEY = "maxfit_club_state_v3";

const WORKOUT_CATALOG = {
  A: {
    code: "A",
    title: "Peito + Tríceps",
    duration: "45–60 min",
    note: "Intervalo padrão de 60 segundos entre as séries. Foco na amplitude do movimento.",
    exercises: [
      { index: "01", name: "Supino reto", equipment: "Barra · Peitoral", sets: "4", reps: "12", load: "20 kg" },
      { index: "02", name: "Crucifixo", equipment: "Halteres · Peitoral", sets: "3", reps: "12", load: "10 kg" },
      { index: "03", name: "Tríceps pulley", equipment: "Polia · Tríceps", sets: "3", reps: "15", load: "15 kg" }
    ]
  },
  B: {
    code: "B",
    title: "Costas + Bíceps",
    duration: "45–60 min",
    note: "Mantenha as escápulas estabilizadas nas puxadas e controle a fase excêntrica.",
    exercises: [
      { index: "01", name: "Puxada frontal", equipment: "Polia · Costas", sets: "4", reps: "12", load: "25 kg" },
      { index: "02", name: "Remada baixa", equipment: "Polia · Costas", sets: "3", reps: "12", load: "20 kg" },
      { index: "03", name: "Rosca direta", equipment: "Barra · Bíceps", sets: "3", reps: "12", load: "10 kg" }
    ]
  },
  C: {
    code: "C",
    title: "Pernas + Ombros",
    duration: "45–60 min",
    note: "Aqueça bem as articulações antes do agachamento e respeite o alinhamento dos joelhos.",
    exercises: [
      { index: "01", name: "Agachamento", equipment: "Barra · Pernas", sets: "4", reps: "12", load: "20 kg" },
      { index: "02", name: "Leg press", equipment: "Máquina · Pernas", sets: "3", reps: "12", load: "60 kg" },
      { index: "03", name: "Desenvolvimento", equipment: "Halteres · Ombros", sets: "3", reps: "12", load: "8 kg" }
    ]
  }
};

const INITIAL_STATE = {
  baseMetrics: {
    activeStudentsBase: 241,
    instructorsBase: 8,
    monthlyEnrollmentsBase: 32,
    monthlyRevenueBase: 41590.60
  },
  activeStudentId: "stu-lucas-martins",
  instructorSelectedStudentId: "stu-lucas-martins",
  workoutChecks: {
    "a-ex-1": false,
    "a-ex-2": false,
    "a-ex-3": false,
    "b-ex-1": false,
    "b-ex-2": false,
    "b-ex-3": false,
    "c-ex-1": false,
    "c-ex-2": false,
    "c-ex-3": false
  },
  plans: [
    {
      id: "plan-mensal",
      name: "Plano Mensal",
      months: 1,
      price: 99.90,
      studentsCount: 64,
      featured: false,
      perks: ["Musculação Livre", "Treino no App MaxFit", "Sem fidelidade"]
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
      perks: ["Aulas Coletivas", "Acompanhamento MaxFit"]
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
      id: "inst-rafael",
      name: "Prof. Rafael Martins",
      shortSelectLabel: "Rafael Martins (Musculação)",
      fullSelectLabel: "Prof. Rafael Martins (Musculação)",
      cref: "CREF 045890-G/SP",
      specialty: "Musculação & Hipertrofia",
      studentsCount: 54
    },
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
      id: "stu-lucas-martins",
      code: "00128",
      name: "Lucas Martins",
      cpf: "123.987.456-10",
      phone: "(11) 99999-1234",
      email: "lucas@maxfit.com",
      planName: "Plano Mensal",
      instructorName: "Prof. Rafael Martins",
      goal: "Hipertrofia & Evolução (Ficha ABC)",
      currentSplit: "A",
      status: "Ativo"
    },
    {
      id: "stu-ana",
      code: "00129",
      name: "Ana Silva",
      cpf: "234.567.890-11",
      phone: "(11) 98765-4321",
      email: "ana.silva@maxfit.com",
      planName: "Plano Anual",
      instructorName: "Prof. Rodrigo",
      goal: "Fortalecimento & Definição (Ficha ABC)",
      currentSplit: "C",
      status: "Ativo"
    },
    {
      id: "stu-bruno",
      code: "00130",
      name: "Bruno Costa",
      cpf: "345.678.901-22",
      phone: "(11) 91234-5678",
      email: "bruno.costa@maxfit.com",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      goal: "Condicionamento & Força (Ficha ABC)",
      currentSplit: "B",
      status: "Ativo"
    },
    {
      id: "stu-camila",
      code: "00131",
      name: "Camila Santos",
      cpf: "456.789.012-33",
      phone: "(11) 99876-5432",
      email: "camila.santos@maxfit.com",
      planName: "Sem plano",
      instructorName: "Prof. Alex",
      goal: "Resistência Muscular (Ficha ABC)",
      currentSplit: "A",
      status: "Inativo"
    },
    {
      id: "stu-beatriz",
      code: "00132",
      name: "Beatriz Santos",
      cpf: "678.901.234-55",
      phone: "(11) 96543-2109",
      email: "beatriz.santos@maxfit.com",
      planName: "Plano Trimestral",
      instructorName: "Prof.ª Juliana",
      goal: "Membros Inferiores & Core (Ficha ABC)",
      currentSplit: "C",
      status: "Ativo"
    },
    {
      id: "stu-gabriel",
      code: "00133",
      name: "Gabriel Souza",
      cpf: "789.012.345-66",
      phone: "(11) 95432-1098",
      email: "gabriel.souza@maxfit.com",
      planName: "Plano Mensal",
      instructorName: "Prof. Alex",
      goal: "Hipertrofia Membros Superiores (Ficha ABC)",
      currentSplit: "A",
      status: "Ativo"
    },
    {
      id: "stu-marina",
      code: "00134",
      name: "Marina Sol",
      cpf: "890.123.456-77",
      phone: "(11) 94321-0987",
      email: "marina.sol@maxfit.com",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      goal: "Mobilidade & Tonificação (Ficha ABC)",
      currentSplit: "B",
      status: "Ativo"
    },
    {
      id: "stu-pedro",
      code: "00135",
      name: "Pedro Alves",
      cpf: "901.234.567-88",
      phone: "(11) 93210-9876",
      email: "pedro.alves@maxfit.com",
      planName: "Plano Trimestral",
      instructorName: "Prof. Alex",
      goal: "Recondicionamento Físico (Ficha ABC)",
      currentSplit: "A",
      status: "Inativo"
    }
  ],
  enrollments: [
    {
      id: "enr-1",
      studentName: "Lucas Martins",
      planName: "Plano Mensal",
      instructorName: "Prof. Rafael Martins",
      startDate: "10/10/2026",
      endDate: "10/11/2026",
      status: "Ativa",
      monthlyValue: 99.90,
      showInRecent: true
    },
    {
      id: "enr-2",
      studentName: "Ana Silva",
      planName: "Plano Anual",
      instructorName: "Prof. Rodrigo",
      startDate: "15/01/2026",
      endDate: "15/01/2027",
      status: "Ativa",
      monthlyValue: 62.49,
      showInRecent: true
    },
    {
      id: "enr-3",
      studentName: "Marina Sol",
      planName: "Plano Mensal",
      instructorName: "Prof.ª Juliana",
      startDate: "10/10/2026",
      endDate: "10/11/2026",
      status: "Pendente",
      monthlyValue: 99.90,
      showInRecent: false
    },
    {
      id: "enr-4",
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
      id: "enr-5",
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
      id: "enr-6",
      studentName: "Gabriel Souza",
      planName: "Plano Mensal",
      instructorName: "Prof. Alex",
      startDate: "22/10/2026",
      endDate: "22/11/2026",
      status: "Pendente",
      monthlyValue: 99.90,
      showInRecent: true
    }
  ]
};

const STUDENT_SCREENS = new Set([
  "screen-student-home",
  "screen-student-workouts",
  "screen-workout-a",
  "screen-workout-b",
  "screen-workout-c",
  "screen-student-plan",
  "screen-student-profile",
  "screen-student-help"
]);

const INSTRUCTOR_SCREENS = new Set([
  "screen-instructor-students",
  "screen-instructor-workout",
  "screen-instructor-profile"
]);

// Mapeamento de telas para os arquivos HTML correspondentes
const SCREEN_PAGE_MAP = {
  // Aluno
  "screen-student-home": "aluno.html",
  "screen-student-workouts": "aluno.html",
  "screen-workout-a": "aluno.html",
  "screen-workout-b": "aluno.html",
  "screen-workout-c": "aluno.html",
  "screen-student-plan": "aluno.html",
  "screen-student-profile": "aluno.html",
  "screen-student-help": "aluno.html",
  // Instrutor
  "screen-instructor-students": "instrutor.html",
  "screen-instructor-workout": "instrutor.html",
  "screen-instructor-profile": "instrutor.html",
  // Admin
  "screen-dashboard": "admin.html",
  "screen-students": "admin.html",
  "screen-add-student": "admin.html",
  "screen-instructors": "admin.html",
  "screen-plans": "admin.html",
  "screen-enrollments": "admin.html",
  "screen-new-enrollment": "admin.html",
  "screen-admin-profile": "admin.html",
  // Login
  "screen-login": "login.html"
};

let appState = loadState();
let currentScreen = "screen-dashboard";
let screenHistory = [];
let loginSelectedRole = "student"; // "student" | "instructor" | "admin"
let studentFilter = "all";
let instStudentFilter = "all";
let instActiveSplit = "A";
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
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(INITIAL_STATE),
        ...parsed,
        workoutChecks: {
          ...INITIAL_STATE.workoutChecks,
          ...(parsed.workoutChecks || {})
        }
      };
    }
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

function resetToMaxFitState() {
  appState = structuredClone(INITIAL_STATE);
  saveState();
  renderAll();
  resetStudentFormDefaults();
  resetEnrollmentFormDefaults();
  showToast("Dados originais MaxFit Club restaurados!");
}

// ==========================================================================
// FUNÇÕES UTILITÁRIAS E MÁSCARAS
// ==========================================================================

function $(id) {
  return document.getElementById(id);
}

function on(id, event, handler) {
  const el = $(id);
  if (el) el.addEventListener(event, handler);
}

function safeSetText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function safeSetHtml(id, html) {
  const el = $(id);
  if (el) el.innerHTML = html;
}

function safeToggleClass(id, className, force) {
  const el = $(id);
  if (el) el.classList.toggle(className, force);
}

function getInitials(name, singleLetter = false) {
  if (!name) return "MF";
  const cleaned = name.replace(/^Prof\.ª?\s*/i, "").trim();
  if (singleLetter) return cleaned.charAt(0).toUpperCase();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function cleanCoachName(name) {
  if (!name) return "Rafael Martins";
  return name.replace(/^Prof\.ª?\s*/i, "").trim();
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
// NAVEGAÇÃO ENTRE TELAS E PÁGINAS DO SISTEMA
// ==========================================================================

function navigateTo(screenId, pushHistory = true) {
  const target = document.getElementById(screenId);

  // Se a tela não estiver no documento HTML atual, redireciona para a página correspondente
  if (!target) {
    const targetPage = SCREEN_PAGE_MAP[screenId];
    if (targetPage) {
      window.location.href = targetPage + (screenId ? "#" + screenId : "");
    }
    return;
  }

  // Remove classe active das telas presentes
  document.querySelectorAll(".app-screen").forEach((sec) => {
    sec.classList.remove("active");
  });
  target.classList.add("active");

  if (pushHistory && currentScreen !== screenId) {
    screenHistory.push(screenId);
  }
  currentScreen = screenId;

  // Atualiza botões ativos no Admin
  const adminNavMapping = {
    "screen-dashboard": "screen-dashboard",
    "screen-students": "screen-students",
    "screen-add-student": "screen-students",
    "screen-plans": "screen-plans",
    "screen-enrollments": "screen-enrollments",
    "screen-new-enrollment": "screen-enrollments",
    "screen-instructors": "screen-instructors",
    "screen-admin-profile": "screen-admin-profile"
  };
  const activeAdminKey = adminNavMapping[screenId] || screenId;

  document.querySelectorAll("#bottomNav .bottom-nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === activeAdminKey);
  });
  document.querySelectorAll("#desktopSidebar .sidebar-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === activeAdminKey);
  });

  // Atualiza botões ativos no Instrutor
  const instNavMapping = {
    "screen-instructor-students": "screen-instructor-students",
    "screen-instructor-workout": "screen-instructor-workout",
    "screen-instructor-profile": "screen-instructor-profile"
  };
  const activeInstKey = instNavMapping[screenId] || screenId;

  document.querySelectorAll("#instructorBottomNav .bottom-nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.instNav === activeInstKey);
  });
  document.querySelectorAll("#instructorSidebar .sidebar-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.instNav === activeInstKey);
  });

  // Atualiza botões ativos no Aluno
  const studentNavMapping = {
    "screen-student-home": "screen-student-home",
    "screen-student-workouts": "screen-student-workouts",
    "screen-workout-a": "screen-student-workouts",
    "screen-workout-b": "screen-student-workouts",
    "screen-workout-c": "screen-student-workouts",
    "screen-student-plan": "screen-student-plan",
    "screen-student-profile": "screen-student-profile",
    "screen-student-help": "screen-student-home"
  };
  const activeStudentKey = studentNavMapping[screenId] || "screen-student-home";

  document.querySelectorAll("#studentBottomNav .bottom-nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.studentNav === activeStudentKey);
  });
  document.querySelectorAll("#studentSidebar .sidebar-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.studentNav === activeStudentKey);
  });

  const appMain = $("appMain");
  if (appMain) appMain.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack(fallbackScreen = "screen-dashboard") {
  if (screenHistory.length > 1) {
    screenHistory.pop();
    const prev = screenHistory[screenHistory.length - 1];
    if (prev) {
      navigateTo(prev, false);
      return;
    }
  }
  navigateTo(fallbackScreen, false);
}

// ==========================================================================
// CONFIGURAÇÃO DO SELETOR DE PERFIL DE LOGIN (login.html)
// ==========================================================================

const ROLE_CREDENTIALS = {
  student: {
    email: "lucas@maxfit.com",
    heroTitle: "O próximo passo<br />é seu<span class=\"red\">.</span>",
    heroSubtitle: "Acesse seus treinos, sua frequência e seu plano MaxFit.",
    eyebrow: "ÁREA DO ALUNO MAXFIT",
    btnText: "Entrar como Aluno",
    note: "Acesso teste Aluno: lucas@maxfit.com"
  },
  instructor: {
    email: "rafael@maxfit.com",
    heroTitle: "Acompanhe seus<br />alunos na pista<span class=\"red\">.</span>",
    heroSubtitle: "Consulte quem está na academia e inspecione as fichas A, B e C.",
    eyebrow: "PAINEL DO INSTRUTOR MAXFIT",
    btnText: "Entrar como Instrutor",
    note: "Acesso teste Instrutor: rafael@maxfit.com"
  },
  admin: {
    email: "admin@maxfit.com",
    heroTitle: "Gestão completa<br />da academia<span class=\"red\">.</span>",
    heroSubtitle: "Indicadores, matrículas, alunos, equipe e planos MaxFit.",
    eyebrow: "PAINEL ADMINISTRATIVO MAXFIT",
    btnText: "Entrar como Administrador",
    note: "Acesso teste Admin: admin@maxfit.com"
  }
};

function setLoginRole(role) {
  if (!ROLE_CREDENTIALS[role]) return;
  loginSelectedRole = role;

  document.querySelectorAll(".role-tab").forEach((tab) => {
    const isActive = tab.dataset.loginRole === role;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const conf = ROLE_CREDENTIALS[role];
  safeSetHtml("loginHeroTitle", conf.heroTitle);
  safeSetText("loginHeroSubtitle", conf.heroSubtitle);
  safeSetText("loginEyebrow", conf.eyebrow);
  safeSetText("btnLoginSubmit", conf.btnText);
  safeSetText("loginDemoNote", conf.note);

  const emailInput = $("loginEmail");
  if (emailInput) emailInput.value = conf.email;
  const pwdInput = $("loginPassword");
  if (pwdInput) pwdInput.value = "12345678";
}

function getActiveStudent() {
  return (
    appState.students.find((s) => s.id === appState.activeStudentId) ||
    appState.students.find((s) => s.id === "stu-lucas-martins") ||
    appState.students[0]
  );
}

// ==========================================================================
// RENDERIZAÇÃO: ÁREA DO ALUNO (aluno.html)
// ==========================================================================

function renderStudentArea() {
  if (!$("studentHomeTitle") && !$("studentSidebar")) return;

  const st = getActiveStudent();
  if (!st) return;

  const firstName = st.name.split(" ")[0];
  const studentInitials = getInitials(st.name);
  const coachFull = st.instructorName || "Prof. Rafael Martins";
  const coachClean = cleanCoachName(coachFull);
  const coachInitials = getInitials(coachClean);

  const planObj =
    appState.plans.find((p) => p.name === st.planName) || appState.plans[0];
  const shortPlanLabel = (st.planName || "Plano Mensal").replace(/^Plano\s+/i, "");
  const priceFormatted = formatBRL(planObj ? planObj.price : 99.9);
  const memberCode = st.code || "00128";

  safeSetText("studentTopbarAvatar", studentInitials);
  safeSetText("studentSideCoachAvatar", coachInitials);
  safeSetText("studentSideCoachName", coachClean);

  safeSetText("studentHomeFirstName", firstName);
  safeSetText("studentQuickPlanName", shortPlanLabel);
  safeSetText("studentCoachCardAvatar", coachInitials);
  safeSetText("studentCoachCardName", coachClean);

  safeSetText("workoutNoteCoachAvatar", coachInitials);
  safeSetText("workoutNoteCoachName", coachClean);
  document.querySelectorAll(".workout-coach-name").forEach((el) => {
    el.textContent = coachClean;
  });

  safeSetText("studentCardMemberName", st.name);
  safeSetText("studentCardMemberId", `MF / ${memberCode}`);
  safeSetText("studentCardPlanTitle", shortPlanLabel.toUpperCase());
  safeSetText("studentBillingPrice", priceFormatted);
  safeSetText("studentProfileName", st.name);
  safeSetText("studentProfileAvatar", studentInitials);
  safeSetText("studentProfileCode", `#${memberCode}`);

  safeSetText("studentDataName", st.name);
  safeSetText("studentDataEmail", st.email || "aluno@maxfit.com");
  safeSetText("studentDataPhone", st.phone || "(11) 99999-1234");
  safeSetText("studentDataCpf", st.cpf || "123.987.456-10");
  safeSetText("studentDataPlan", st.planName || "Plano Mensal");
  safeSetText("studentDataCoach", coachFull);

  document.querySelectorAll(".student-pay-plan-name").forEach((el) => {
    el.textContent = st.planName || "Plano Mensal";
  });
  document.querySelectorAll(".student-pay-amount").forEach((el) => {
    el.textContent = priceFormatted;
  });

  syncWorkoutCheckboxes();
}

function syncWorkoutCheckboxes() {
  const letters = ["A", "B", "C"];
  letters.forEach((letter) => {
    const prefix = letter.toLowerCase();
    const toggles = Array.from(
      document.querySelectorAll(`.exercise-toggle[data-workout="${letter}"]`)
    );
    let doneCount = 0;

    toggles.forEach((chk) => {
      const savedVal = !!appState.workoutChecks[chk.id];
      chk.checked = savedVal;
      if (savedVal) doneCount += 1;
    });

    const total = toggles.length || 3;
    const pct = Math.round((doneCount / total) * 100);

    safeSetText(`progCount${letter}`, String(doneCount));
    const progBar = $(`progBar${letter}`);
    if (progBar) progBar.style.width = `${pct}%`;

    const progMsg = $(`progMsg${letter}`);
    if (progMsg) {
      progMsg.classList.toggle("visible", doneCount === total && total > 0);
    }
  });
}

// ==========================================================================
// RENDERIZAÇÃO: PAINEL DO INSTRUTOR (instrutor.html)
// ==========================================================================

function renderInstructorPanel() {
  const container = $("instructorStudentsListContainer");
  if (!container) return;

  const searchInput = $("searchInstructorStudentsInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const allCount = appState.students.length;
  const activeCount = appState.students.filter((s) => s.status === "Ativo").length;
  const inactiveCount = allCount - activeCount;

  safeSetText("instSideCountStudents", String(allCount));
  safeSetText("instKpiTotalStudents", String(allCount));
  safeSetText("instKpiActiveStudents", String(activeCount));
  safeSetText("instCountAll", String(allCount));
  safeSetText("instCountActive", String(activeCount));
  safeSetText("instCountInactive", String(inactiveCount));

  let filtered = appState.students.filter((st) => {
    if (instStudentFilter === "Ativo" && st.status !== "Ativo") return false;
    if (instStudentFilter === "Inativo" && st.status !== "Inativo") return false;
    if (query) {
      const matchName = st.name.toLowerCase().includes(query);
      const matchGoal = (st.goal || "").toLowerCase().includes(query);
      const matchPlan = (st.planName || "").toLowerCase().includes(query);
      return matchName || matchGoal || matchPlan;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 2rem; cursor: default;">
        <p class="card-sub">Nenhum aluno encontrado para o filtro pesquisado.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((st) => {
      const initials = getInitials(st.name);
      const isInactive = st.status === "Inativo";
      const planName = st.planName || "Plano Mensal";
      const goal = st.goal || "Hipertrofia & Evolução (Ficha ABC)";

      return `
        <article class="item-card instructor-student-card" data-inst-open-workout="${st.id}">
          <span class="avatar-circle ${isInactive ? "muted" : ""}" aria-hidden="true">${escapeHTML(initials)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(st.name)}</h3>
            <p class="card-sub">${escapeHTML(planName)} • Ficha ${escapeHTML(st.currentSplit || "A")}</p>
            <p class="card-meta">
              <span>🎯 ${escapeHTML(goal)}</span>
            </p>
          </hgroup>
          <section class="inst-card-actions">
            <span class="status-badge ${isInactive ? "danger" : "emerald"}">${isInactive ? "Inativo" : "Presente"}</span>
            <button type="button" class="btn-card-action view-btn" data-inst-open-workout="${st.id}" title="Ver Ficha de Treino">
              Ver Treino →
            </button>
          </section>
        </article>
      `;
    })
    .join("");
}

function openInstructorStudentWorkout(studentId, initialSplit = null) {
  appState.instructorSelectedStudentId = studentId;
  if (initialSplit) instActiveSplit = initialSplit;
  saveState();
  renderInstructorWorkoutDetail();
  navigateTo("screen-instructor-workout");
}

function renderInstructorWorkoutDetail() {
  const container = $("instWorkoutExercisesContainer");
  if (!container) return;

  const st =
    appState.students.find((s) => s.id === appState.instructorSelectedStudentId) ||
    appState.students[0];
  if (!st) return;

  safeSetText("instWorkoutStudentName", st.name);
  safeSetText(
    "instWorkoutStudentMeta",
    `${st.planName} • Objetivo: ${st.goal || "Hipertrofia & Força"}`
  );

  document.querySelectorAll("#instWorkoutSplitTabs .filter-pill").forEach((btn) => {
    const isCurrent = btn.dataset.splitTab === instActiveSplit;
    btn.classList.toggle("active", isCurrent);
    btn.setAttribute("aria-selected", isCurrent ? "true" : "false");
  });

  const workoutData = WORKOUT_CATALOG[instActiveSplit] || WORKOUT_CATALOG.A;
  safeSetText("instSplitEyebrow", `FICHA ${workoutData.code} · FOCO DO DIA`);
  safeSetText("instSplitTitle", workoutData.title);
  safeSetText("instSplitDuration", workoutData.duration);
  safeSetText("instSplitNote", workoutData.note);

  container.innerHTML = workoutData.exercises
    .map((ex) => {
      const isChecked = !!appState.workoutChecks[`${instActiveSplit.toLowerCase()}-ex-${parseInt(ex.index, 10)}`];
      return `
        <article class="panel exercise inst-exercise-card ${isChecked ? "completed-card" : ""}">
          <header class="exercise-heading">
            <span class="exercise-index">${ex.index}</span>
            <hgroup>
              <h2>${escapeHTML(ex.name)}</h2>
              <p>${escapeHTML(ex.equipment)}</p>
            </hgroup>
            ${
              isChecked
                ? `<span class="pill green" style="margin-left:auto;">Concluído</span>`
                : `<span class="pill amber" style="margin-left:auto;">Pendente</span>`
            }
          </header>
          <dl class="exercise-data">
            <section class="stat-pair"><dt>SÉRIES</dt><dd>${ex.sets}</dd></section>
            <section class="stat-pair"><dt>REPETIÇÕES</dt><dd>${ex.reps}</dd></section>
            <section class="stat-pair"><dt>CARGA</dt><dd>${ex.load}</dd></section>
          </dl>
        </article>
      `;
    })
    .join("");
}

// ==========================================================================
// RENDERIZAÇÃO: PAINEL ADMIN (admin.html)
// ==========================================================================

function renderAll() {
  renderDashboard();
  renderStudents();
  renderInstructors();
  renderPlans();
  renderEnrollments();
  populateFormSelects();
  updateEnrollmentAutomaticFields();
  renderStudentArea();
  renderInstructorPanel();
  renderInstructorWorkoutDetail();
}

function renderDashboard() {
  if (!$("kpiActiveStudents")) return;

  const activeStudentsCount =
    appState.baseMetrics.activeStudentsBase +
    appState.students.filter((s) => s.status === "Ativo").length;
  const instructorsCount =
    appState.baseMetrics.instructorsBase + appState.instructors.length;
  const enrollmentsCount =
    appState.baseMetrics.monthlyEnrollmentsBase + appState.enrollments.length;

  const activeRevenueDelta = appState.enrollments
    .filter((e) => e.status === "Ativa")
    .reduce((acc, curr) => acc + (curr.monthlyValue || 99.9), 0);
  const totalRevenue =
    appState.baseMetrics.monthlyRevenueBase + activeRevenueDelta;

  safeSetText("kpiActiveStudents", String(activeStudentsCount));
  safeSetText("kpiInstructors", String(instructorsCount));
  safeSetText("kpiMonthlyEnrollments", String(enrollmentsCount));
  safeSetText("kpiMonthlyRevenue", formatBRL(totalRevenue));

  safeSetText("sideCountStudents", String(appState.students.length));
  safeSetText("sideCountInstructors", String(appState.instructors.length));
  safeSetText("sideCountPlans", String(appState.plans.length));
  safeSetText("sideCountEnrollments", String(appState.enrollments.length));

  const now = new Date();
  const options = { weekday: "long", day: "2-digit", month: "long" };
  const dateFormatted = now.toLocaleDateString("pt-BR", options);
  safeSetText(
    "dashboardDateSubtitle",
    dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1)
  );

  const recentContainer = $("dashboardRecentList");
  if (!recentContainer) return;

  const recentList = appState.enrollments.slice(0, 4);
  recentContainer.innerHTML = recentList
    .map((enr) => {
      const isPend = enr.status === "Pendente";
      const isCanc = enr.status === "Cancelada";
      const badgeClass = isCanc ? "danger" : isPend ? "amber" : "emerald";

      return `
        <article class="item-card card-row-main" data-open-enrollment="${enr.id}">
          <span class="avatar-circle" aria-hidden="true">${escapeHTML(getInitials(enr.studentName))}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(enr.studentName)}</h3>
            <p class="card-sub">${escapeHTML(enr.planName)} • Início: ${escapeHTML(enr.startDate)}</p>
          </hgroup>
          <span class="card-amount">${formatBRL(enr.monthlyValue || 99.9)}/mês</span>
          <span class="status-badge ${badgeClass}">${escapeHTML(enr.status)}</span>
        </article>
      `;
    })
    .join("");
}

function renderStudents() {
  const container = $("studentsListContainer");
  const tableBody = $("studentsTableBody");
  if (!container || !tableBody) return;

  const searchInput = $("searchStudentsInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const allCount = appState.students.length;
  const activeCount = appState.students.filter((s) => s.status === "Ativo").length;
  const inactiveCount = allCount - activeCount;

  safeSetText("countFilterAll", String(allCount));
  safeSetText("countFilterActive", String(activeCount));
  safeSetText("countFilterInactive", String(inactiveCount));

  let filtered = appState.students.filter((st) => {
    if (studentFilter === "Ativo" && st.status !== "Ativo") return false;
    if (studentFilter === "Inativo" && st.status !== "Inativo") return false;
    if (query) {
      const matchName = st.name.toLowerCase().includes(query);
      const matchPhone = st.phone.toLowerCase().includes(query);
      const matchPlan = st.planName.toLowerCase().includes(query);
      const matchInst = st.instructorName.toLowerCase().includes(query);
      return matchName || matchPhone || matchPlan || matchInst;
    }
    return true;
  });

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
            <p class="card-sub">${escapeHTML(st.planName)} • ${escapeHTML(st.instructorName)}</p>
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

function renderInstructors() {
  const container = $("instructorsListContainer");
  if (!container) return;

  const searchInput = $("searchInstructorsInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = appState.instructors.filter((inst) => {
    if (!query) return true;
    return (
      inst.name.toLowerCase().includes(query) ||
      inst.specialty.toLowerCase().includes(query) ||
      inst.cref.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 1.75rem; cursor: default;">
        <p class="card-sub">Nenhum instrutor encontrado.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((inst) => {
      const initials = getInitials(inst.name);
      return `
        <article class="item-card card-row-main" data-open-instructor="${inst.id}">
          <span class="avatar-circle" aria-hidden="true">${escapeHTML(initials)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(inst.name)}</h3>
            <p class="card-sub">${escapeHTML(inst.cref)}</p>
            <p class="card-meta"><span>${escapeHTML(inst.specialty)}</span></p>
          </hgroup>
          <span class="card-amount">${inst.studentsCount || 0} alunos</span>
        </article>
      `;
    })
    .join("");
}

function renderPlans() {
  const container = $("plansListContainer");
  if (!container) return;

  container.innerHTML = appState.plans
    .map((plan) => {
      const monthlyPrice = plan.price / (plan.months || 1);
      return `
        <article class="item-card card-row-main ${plan.featured ? "card-featured" : ""}" data-open-plan="${plan.id}">
          <span class="plan-icon-square" aria-hidden="true">★</span>
          <hgroup class="card-info">
            <h3 class="card-title">
              ${escapeHTML(plan.name)}
              ${plan.featured ? `<span class="pill-featured">MAIS POPULAR</span>` : ""}
            </h3>
            <p class="card-sub">${plan.months} ${plan.months === 1 ? "mês" : "meses"} de vigência</p>
            <p class="card-meta"><span>${plan.studentsCount || 0} alunos ativos</span></p>
          </hgroup>
          <hgroup class="card-price-group">
            <strong class="card-amount">${formatBRL(plan.price)}</strong>
            <small class="card-subprice">${formatBRL(monthlyPrice)}/mês</small>
          </hgroup>
        </article>
      `;
    })
    .join("");
}

function renderEnrollments() {
  const container = $("enrollmentsListContainer");
  if (!container) return;

  const allCount = appState.enrollments.length;
  const activeCount = appState.enrollments.filter((e) => e.status === "Ativa").length;
  const pendCount = appState.enrollments.filter((e) => e.status === "Pendente").length;
  const cancCount = appState.enrollments.filter((e) => e.status === "Cancelada").length;

  safeSetText("countEnrAll", String(allCount));
  safeSetText("countEnrActive", String(activeCount));
  safeSetText("countEnrPending", String(pendCount));
  safeSetText("countEnrCanceled", String(cancCount));

  const filtered = appState.enrollments.filter((e) => {
    if (enrollmentFilter === "all") return true;
    return e.status === enrollmentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <article class="item-card" style="text-align:center; padding: 1.75rem; cursor: default;">
        <p class="card-sub">Nenhuma matrícula encontrada para o filtro selecionado.</p>
      </article>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((enr) => {
      const initials = getInitials(enr.studentName);
      const isPend = enr.status === "Pendente";
      const isCanc = enr.status === "Cancelada";
      const badgeClass = isCanc ? "danger" : isPend ? "amber" : "emerald";

      return `
        <article class="item-card card-row-main" data-open-enrollment="${enr.id}">
          <span class="avatar-circle" aria-hidden="true">${escapeHTML(initials)}</span>
          <hgroup class="card-info">
            <h3 class="card-title">${escapeHTML(enr.studentName)}</h3>
            <p class="card-sub">${escapeHTML(enr.planName)} • ${escapeHTML(enr.instructorName)}</p>
            <p class="card-meta">
              <span>Vigência: ${escapeHTML(enr.startDate)} até ${escapeHTML(enr.endDate)}</span>
            </p>
          </hgroup>
          <span class="card-amount">${formatBRL(enr.monthlyValue || 99.9)}/mês</span>
          <span class="status-badge ${badgeClass}">${escapeHTML(enr.status)}</span>
        </article>
      `;
    })
    .join("");
}

function populateFormSelects() {
  const studentPlanSel = $("studentPlan");
  const studentInstSel = $("studentInstructor");
  const enrollStudentSel = $("enrollStudentSelect");
  const enrollPlanSel = $("enrollPlanSelect");
  const enrollInstSel = $("enrollInstructorSelect");

  if (studentPlanSel) {
    studentPlanSel.innerHTML = `
      <option value="Sem plano">Sem plano cadastrado</option>
      ${appState.plans
        .map((p) => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)} (${formatBRL(p.price)})</option>`)
        .join("")}
    `;
  }

  if (studentInstSel) {
    studentInstSel.innerHTML = `
      ${appState.instructors
        .map((i) => `<option value="${escapeHTML(i.name)}">${escapeHTML(i.fullSelectLabel || i.name)}</option>`)
        .join("")}
    `;
  }

  if (enrollStudentSel) {
    enrollStudentSel.innerHTML = `
      ${appState.students
        .map((s) => `<option value="${escapeHTML(s.name)}">${escapeHTML(s.name)} (#${s.code || "MF"})</option>`)
        .join("")}
    `;
  }

  if (enrollPlanSel) {
    enrollPlanSel.innerHTML = `
      ${appState.plans
        .map((p) => `<option value="${escapeHTML(p.name)}">${escapeHTML(p.name)} — ${p.months}m por ${formatBRL(p.price)}</option>`)
        .join("")}
    `;
  }

  if (enrollInstSel) {
    enrollInstSel.innerHTML = `
      ${appState.instructors
        .map((i) => `<option value="${escapeHTML(i.name)}">${escapeHTML(i.fullSelectLabel || i.name)}</option>`)
        .join("")}
    `;
  }
}

function updateEnrollmentAutomaticFields() {
  const planSelect = $("enrollPlanSelect");
  const startDateInput = $("enrollStartDate");
  const endDateInput = $("enrollEndDate");
  const estOutput = $("enrollEstimatedPrice");
  if (!planSelect || !startDateInput || !endDateInput || !estOutput) return;

  const planObj = appState.plans.find((p) => p.name === planSelect.value) || appState.plans[0];
  const months = planObj ? planObj.months : 1;
  const price = planObj ? planObj.price : 99.9;
  const monthly = price / months;

  const currentStart = startDateInput.value.trim() || "06/11/2026";
  endDateInput.value = addMonthsToDateBR(currentStart, months);
  estOutput.textContent = `${formatBRL(monthly)} / mês`;
}

// ==========================================================================
// CONTROLE DE MODAIS (<dialog> NATIVO)
// ==========================================================================

function openModal(modalId) {
  const modal = $(modalId);
  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
  }
}

function closeModal(modalId) {
  const modal = $(modalId);
  if (modal && typeof modal.close === "function") {
    modal.close();
  }
}

function confirmDelete(title, message, onConfirm) {
  safeSetText("confirmDeleteTitle", title);
  safeSetText("confirmDeleteText", message);
  pendingDeleteCallback = onConfirm;
  openModal("modalConfirmDelete");
}

function openStudentDetails(studentId) {
  const st = appState.students.find((s) => s.id === studentId);
  if (!st) return;

  safeSetText("detailsSheetTitle", st.name);
  safeSetHtml(
    "detailsSheetBody",
    `
    <section class="detail-row"><dt>Status</dt><dd>${escapeHTML(st.status)}</dd></section>
    <section class="detail-row"><dt>CPF</dt><dd>${escapeHTML(st.cpf)}</dd></section>
    <section class="detail-row"><dt>Telefone</dt><dd>${escapeHTML(st.phone)}</dd></section>
    <section class="detail-row"><dt>E-mail</dt><dd>${escapeHTML(st.email)}</dd></section>
    <section class="detail-row"><dt>Plano Contratado</dt><dd>${escapeHTML(st.planName)}</dd></section>
    <section class="detail-row"><dt>Professor Responsável</dt><dd>${escapeHTML(st.instructorName)}</dd></section>
    `
  );

  safeSetHtml(
    "detailsSheetActions",
    `
    <button type="button" class="btn-primary" id="sheetBtnViewStudent" style="grid-column: 1 / -1;">👁️ Ver Visão do Aluno</button>
    <button type="button" class="btn-secondary" id="sheetBtnEditStudent">Editar</button>
    <button type="button" class="btn-primary" id="sheetBtnEnrollStudent">Nova Matrícula</button>
    <button type="button" class="btn-danger" id="sheetBtnDeleteStudent">Excluir</button>
    `
  );

  openModal("modalDetailsSheet");

  const viewBtn = $("sheetBtnViewStudent");
  if (viewBtn) {
    viewBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      appState.activeStudentId = st.id;
      saveState();
      window.location.href = "aluno.html";
    };
  }

  const editBtn = $("sheetBtnEditStudent");
  if (editBtn) {
    editBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      startEditStudent(st.id);
    };
  }

  const enrBtn = $("sheetBtnEnrollStudent");
  if (enrBtn) {
    enrBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      resetEnrollmentFormDefaults();
      const selStu = $("enrollStudentSelect");
      if (selStu) selStu.value = st.name;
      const selPlan = $("enrollPlanSelect");
      if (selPlan && st.planName && st.planName !== "Sem plano") {
        selPlan.value = st.planName;
      }
      const selInst = $("enrollInstructorSelect");
      if (selInst && st.instructorName) {
        selInst.value = st.instructorName;
      }
      updateEnrollmentAutomaticFields();
      navigateTo("screen-new-enrollment");
    };
  }

  const delBtn = $("sheetBtnDeleteStudent");
  if (delBtn) {
    delBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      confirmDelete(
        "Excluir Aluno",
        `Deseja realmente remover o aluno "${st.name}" do sistema MaxFit?`,
        () => {
          appState.students = appState.students.filter((x) => x.id !== st.id);
          saveState();
          renderAll();
          showToast("Aluno excluído com sucesso.");
        }
      );
    };
  }
}

function openInstructorDetails(instId) {
  const ins = appState.instructors.find((i) => i.id === instId);
  if (!ins) return;

  safeSetText("detailsSheetTitle", ins.name);
  safeSetHtml(
    "detailsSheetBody",
    `
    <section class="detail-row"><dt>Registro Profissional</dt><dd>${escapeHTML(ins.cref)}</dd></section>
    <section class="detail-row"><dt>Especialidade</dt><dd>${escapeHTML(ins.specialty)}</dd></section>
    <section class="detail-row"><dt>Alunos Vinculados</dt><dd>${ins.studentsCount || 0} alunos ativos</dd></section>
    `
  );

  safeSetHtml(
    "detailsSheetActions",
    `
    <button type="button" class="btn-secondary" id="sheetBtnEditInst">Editar</button>
    <button type="button" class="btn-danger" id="sheetBtnDeleteInst">Excluir</button>
    `
  );

  openModal("modalDetailsSheet");

  const editBtn = $("sheetBtnEditInst");
  if (editBtn) {
    editBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      openInstructorModal(ins);
    };
  }

  const delBtn = $("sheetBtnDeleteInst");
  if (delBtn) {
    delBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      confirmDelete(
        "Excluir Instrutor",
        `Deseja remover "${ins.name}" da equipe técnica?`,
        () => {
          appState.instructors = appState.instructors.filter((x) => x.id !== ins.id);
          saveState();
          renderAll();
          showToast("Instrutor removido com sucesso.");
        }
      );
    };
  }
}

function openPlanDetails(planId) {
  const plan = appState.plans.find((p) => p.id === planId);
  if (!plan) return;

  safeSetText("detailsSheetTitle", plan.name);
  safeSetHtml(
    "detailsSheetBody",
    `
    <section class="detail-row"><dt>Duração</dt><dd>${plan.months} meses</dd></section>
    <section class="detail-row"><dt>Valor Total</dt><dd>${formatBRL(plan.price)}</dd></section>
    <section class="detail-row"><dt>Mensalidade Estimada</dt><dd>${formatBRL(plan.price / plan.months)}/mês</dd></section>
    <section class="detail-row"><dt>Alunos Matriculados</dt><dd>${plan.studentsCount || 0} alunos</dd></section>
    <section class="detail-row"><dt>Destaque no Catálogo</dt><dd>${plan.featured ? "Sim (Selo Popular)" : "Não"}</dd></section>
    `
  );

  safeSetHtml(
    "detailsSheetActions",
    `
    <button type="button" class="btn-secondary" id="sheetBtnEditPlan">Editar</button>
    <button type="button" class="btn-primary" id="sheetBtnEnrollInPlan">Matricular Aluno</button>
    <button type="button" class="btn-danger" id="sheetBtnDeletePlan">Excluir</button>
    `
  );

  openModal("modalDetailsSheet");

  const editBtn = $("sheetBtnEditPlan");
  if (editBtn) {
    editBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      openPlanModal(plan);
    };
  }

  const enrollBtn = $("sheetBtnEnrollInPlan");
  if (enrollBtn) {
    enrollBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      resetEnrollmentFormDefaults();
      const selPlan = $("enrollPlanSelect");
      if (selPlan) selPlan.value = plan.name;
      updateEnrollmentAutomaticFields();
      navigateTo("screen-new-enrollment");
    };
  }

  const delBtn = $("sheetBtnDeletePlan");
  if (delBtn) {
    delBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      confirmDelete(
        "Excluir Plano",
        `Deseja remover o "${plan.name}" do catálogo da academia?`,
        () => {
          appState.plans = appState.plans.filter((x) => x.id !== plan.id);
          saveState();
          renderAll();
          showToast("Plano removido com sucesso.");
        }
      );
    };
  }
}

function openEnrollmentDetails(enrId) {
  const enr = appState.enrollments.find((e) => e.id === enrId);
  if (!enr) return;

  safeSetText("detailsSheetTitle", `Matrícula: ${enr.studentName}`);
  safeSetHtml(
    "detailsSheetBody",
    `
    <section class="detail-row"><dt>Status</dt><dd>${escapeHTML(enr.status)}</dd></section>
    <section class="detail-row"><dt>Plano Contratado</dt><dd>${escapeHTML(enr.planName)}</dd></section>
    <section class="detail-row"><dt>Instrutor Responsável</dt><dd>${escapeHTML(enr.instructorName)}</dd></section>
    <section class="detail-row"><dt>Data de Início</dt><dd>${escapeHTML(enr.startDate)}</dd></section>
    <section class="detail-row"><dt>Data de Término</dt><dd>${escapeHTML(enr.endDate)}</dd></section>
    <section class="detail-row"><dt>Valor Mensal</dt><dd>${formatBRL(enr.monthlyValue || 99.9)}</dd></section>
    `
  );

  safeSetHtml(
    "detailsSheetActions",
    `
    <button type="button" class="btn-secondary" id="sheetBtnToggleEnrStatus">
      ${enr.status === "Ativa" ? "Marcar como Pendente" : "Ativar Matrícula"}
    </button>
    <button type="button" class="btn-danger" id="sheetBtnDeleteEnr">Cancelar / Excluir</button>
    `
  );

  openModal("modalDetailsSheet");

  const toggleBtn = $("sheetBtnToggleEnrStatus");
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      enr.status = enr.status === "Ativa" ? "Pendente" : "Ativa";
      saveState();
      renderAll();
      showToast(`Status da matrícula alterado para "${enr.status}".`);
    };
  }

  const delBtn = $("sheetBtnDeleteEnr");
  if (delBtn) {
    delBtn.onclick = () => {
      closeModal("modalDetailsSheet");
      confirmDelete(
        "Excluir Matrícula",
        `Deseja realmente cancelar a matrícula de "${enr.studentName}"?`,
        () => {
          appState.enrollments = appState.enrollments.filter((x) => x.id !== enr.id);
          saveState();
          renderAll();
          showToast("Matrícula removida com sucesso.");
        }
      );
    };
  }
}

// ==========================================================================
// AUXILIARES DE FORMULÁRIO (RESET, EDIÇÃO E MÁSCARAS)
// ==========================================================================

function resetStudentFormDefaults() {
  const form = $("studentForm");
  if (!form) return;
  form.reset();
  safeSetText("studentFormTitle", "Cadastrar Aluno");
  safeSetText("studentFormSubtitle", "Novo registro");
  safeSetText("btnSaveStudent", "Salvar Aluno");
  const editId = $("studentEditId");
  if (editId) editId.value = "";

  const nameInput = $("studentName");
  if (nameInput) nameInput.value = "Matheus Duarte Silva";
  const cpfInput = $("studentCpf");
  if (cpfInput) cpfInput.value = "123.456.789-00";
  const phoneInput = $("studentPhone");
  if (phoneInput) phoneInput.value = "(11) 98765-4321";
  const emailInput = $("studentEmail");
  if (emailInput) emailInput.value = "matheus@maxfit.com";

  safeSetText("studentNameError", "");
  safeSetText("studentCpfError", "");
  safeSetText("studentPhoneError", "");
  safeSetText("studentEmailError", "");
}

function startEditStudent(studentId) {
  const st = appState.students.find((s) => s.id === studentId);
  if (!st) return;

  const editId = $("studentEditId");
  if (editId) editId.value = st.id;
  const nameInput = $("studentName");
  if (nameInput) nameInput.value = st.name;
  const cpfInput = $("studentCpf");
  if (cpfInput) cpfInput.value = st.cpf;
  const phoneInput = $("studentPhone");
  if (phoneInput) phoneInput.value = st.phone;
  const emailInput = $("studentEmail");
  if (emailInput) emailInput.value = st.email;

  const planSel = $("studentPlan");
  if (planSel) planSel.value = st.planName;
  const instSel = $("studentInstructor");
  if (instSel) instSel.value = st.instructorName;

  safeSetText("studentFormTitle", "Editar Aluno");
  safeSetText("studentFormSubtitle", `Editando: ${st.name}`);
  safeSetText("btnSaveStudent", "Atualizar Dados");
  navigateTo("screen-add-student");
}

function resetEnrollmentFormDefaults() {
  const form = $("enrollmentForm");
  if (!form) return;
  form.reset();
  const startInput = $("enrollStartDate");
  if (startInput) startInput.value = "06/11/2026";
  setEnrollmentStatusRadio("Ativa");
  updateEnrollmentAutomaticFields();
}

function setEnrollmentStatusRadio(statusVal) {
  selectedEnrollmentStatus = statusVal;
  document.querySelectorAll(".status-radio-pill").forEach((pill) => {
    const isCur = pill.dataset.statusVal === statusVal;
    pill.classList.toggle("active", isCur);
  });
}

function openInstructorModal(inst = null) {
  const modal = $("modalInstructor");
  if (!modal) return;
  const editId = $("instructorEditId");
  const nameInput = $("instructorName");
  const crefInput = $("instructorCref");
  const specInput = $("instructorSpecialty");
  const title = $("modalInstructorTitle");

  if (inst) {
    if (editId) editId.value = inst.id;
    if (nameInput) nameInput.value = inst.name;
    if (crefInput) crefInput.value = inst.cref;
    if (specInput) specInput.value = inst.specialty;
    if (title) title.textContent = "Editar Instrutor";
  } else {
    if (editId) editId.value = "";
    if (nameInput) nameInput.value = "";
    if (crefInput) crefInput.value = "";
    if (specInput) specInput.value = "";
    if (title) title.textContent = "Cadastrar Instrutor";
  }
  openModal("modalInstructor");
}

function openPlanModal(plan = null) {
  const modal = $("modalPlan");
  if (!modal) return;
  const editId = $("planEditId");
  const nameInput = $("planName");
  const monthsInput = $("planMonths");
  const priceInput = $("planPrice");
  const featInput = $("planFeatured");
  const title = $("modalPlanTitle");

  if (plan) {
    if (editId) editId.value = plan.id;
    if (nameInput) nameInput.value = plan.name;
    if (monthsInput) monthsInput.value = plan.months;
    if (priceInput) priceInput.value = plan.price;
    if (featInput) featInput.checked = !!plan.featured;
    if (title) title.textContent = "Editar Plano";
  } else {
    if (editId) editId.value = "";
    if (nameInput) nameInput.value = "";
    if (monthsInput) monthsInput.value = "1";
    if (priceInput) priceInput.value = "";
    if (featInput) featInput.checked = false;
    if (title) title.textContent = "Cadastrar Plano";
  }
  openModal("modalPlan");
}

// ==========================================================================
// TEMA ESCURO / CLARO & TOASTS
// ==========================================================================

function initTheme() {
  const saved = localStorage.getItem("maxfit_theme") || "dark";
  document.documentElement.dataset.theme = saved;
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("maxfit_theme", next);
  showToast(`Tema ${next === "dark" ? "Dark Carbon" : "Claro"} ativado.`);
}

function showToast(message) {
  const container = $("toastContainer");
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
// INICIALIZAÇÃO E EVENT LISTENERS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  resetStudentFormDefaults();
  resetEnrollmentFormDefaults();
  renderAll();

  // Verifica se há navegação via hash na URL (ex: aluno.html#screen-workout-a)
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && $(initialHash)) {
    navigateTo(initialHash, false);
  }

  // Se estiver na tela de login, configura o seletor de perfil conforme URL param ou padrão
  if ($("screen-login")) {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam && ROLE_CREDENTIALS[roleParam]) {
      setLoginRole(roleParam);
    } else {
      setLoginRole("student");
    }
  }

  // Delegação de cliques no body para botões reutilizáveis
  document.body.addEventListener("click", (e) => {
    const loginRoleBtn = e.target.closest("[data-login-role]");
    if (loginRoleBtn) {
      setLoginRole(loginRoleBtn.dataset.loginRole);
      return;
    }

    const studentNavBtn = e.target.closest("[data-student-nav]");
    if (studentNavBtn) {
      navigateTo(studentNavBtn.dataset.studentNav);
      return;
    }

    const instNavBtn = e.target.closest("[data-inst-nav]");
    if (instNavBtn) {
      navigateTo(instNavBtn.dataset.instNav);
      return;
    }

    const instOpenWorkoutBtn = e.target.closest("[data-inst-open-workout]");
    if (instOpenWorkoutBtn) {
      openInstructorStudentWorkout(instOpenWorkoutBtn.dataset.instOpenWorkout);
      return;
    }

    const splitTabBtn = e.target.closest("[data-split-tab]");
    if (splitTabBtn) {
      instActiveSplit = splitTabBtn.dataset.splitTab;
      renderInstructorWorkoutDetail();
      return;
    }

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
      e.preventDefault();
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

    const viewStuBtn = e.target.closest("[data-view-student]");
    if (viewStuBtn) {
      e.stopPropagation();
      appState.activeStudentId = viewStuBtn.dataset.viewStudent;
      saveState();
      window.location.href = "aluno.html";
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

  // Checkboxes dos Exercícios na Área do Aluno
  document.querySelectorAll(".exercise-toggle").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      appState.workoutChecks[checkbox.id] = checkbox.checked;
      saveState();
      syncWorkoutCheckboxes();
      const workoutLetter = checkbox.dataset.workout;
      const groupInputs = Array.from(
        document.querySelectorAll(`.exercise-toggle[data-workout="${workoutLetter}"]`)
      );
      if (groupInputs.every((i) => i.checked)) {
        showToast(`Treino ${workoutLetter} concluído! Excelente evolução.`);
      }
    });
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

  // Submissão do Login Unificado com 3 Opções
  on("loginForm", "submit", (e) => {
    e.preventDefault();
    const email = $("loginEmail")?.value.trim() || "";
    const pass = $("loginPassword")?.value.trim() || "";
    const emailErr = $("loginEmailError");
    const passErr = $("loginPasswordError");

    if (emailErr) emailErr.textContent = "";
    if (passErr) passErr.textContent = "";

    if (!email || !email.includes("@")) {
      if (emailErr) emailErr.textContent = "Informe um e-mail válido.";
      return;
    }
    if (pass.length < 4) {
      if (passErr) passErr.textContent = "A senha deve conter pelo menos 4 caracteres.";
      return;
    }

    const submitBtn = $("btnLoginSubmit");
    const origText = submitBtn ? submitBtn.textContent : "Entrar";
    if (submitBtn) {
      submitBtn.textContent = "Entrando na MaxFit...";
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.textContent = origText;
        submitBtn.disabled = false;
      }

      if (loginSelectedRole === "student") {
        window.location.href = "aluno.html";
      } else if (loginSelectedRole === "instructor") {
        window.location.href = "instrutor.html";
      } else {
        window.location.href = "admin.html";
      }
    }, 220);
  });

  on("btnTogglePassword", "click", () => {
    const pwdInput = $("loginPassword");
    if (!pwdInput) return;
    const isPassword = pwdInput.type === "password";
    pwdInput.type = isPassword ? "text" : "password";
    safeToggleClass("eyeIconClosed", "hidden", isPassword);
    safeToggleClass("eyeIconOpen", "hidden", !isPassword);
  });

  on("btnForgotPassword", "click", () => openModal("modalForgotPass"));

  on("forgotPassForm", "submit", (e) => {
    e.preventDefault();
    closeModal("modalForgotPass");
    showToast("Instruções de acesso enviadas para seu e-mail!");
  });

  // Botões de Logout (redirecionam para login.html pelo Perfil do usuário)
  const handleLogout = () => {
    window.location.href = "login.html";
  };

  on("btnLogoutStudentProfile", "click", handleLogout);
  on("btnLogoutInstructorProfile", "click", handleLogout);
  on("btnLogoutAdminProfile", "click", handleLogout);
  on("btnLogoutDesktop", "click", handleLogout);
  on("btnQuickLogoutMobile", "click", handleLogout);
  on("btnLogoutStudentSidebar", "click", handleLogout);
  on("btnLogoutInstructorSidebar", "click", handleLogout);
  on("btnLogoutInstructorMobile", "click", handleLogout);
  on("btnLogoutInstructorNav", "click", handleLogout);

  // Busca e Filtros do Instrutor
  on("searchInstructorStudentsInput", "input", renderInstructorPanel);

  on("instStudentFilterPills", "click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    instStudentFilter = pill.dataset.instFilter;
    document.querySelectorAll("#instStudentFilterPills .filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-selected", p === pill ? "true" : "false");
    });
    renderInstructorPanel();
  });

  // Busca e Filtros de Alunos (Admin)
  on("searchStudentsInput", "input", renderStudents);

  on("studentFilterPills", "click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    studentFilter = pill.dataset.filter;
    document.querySelectorAll("#studentFilterPills .filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-selected", p === pill ? "true" : "false");
    });
    renderStudents();
  });

  on("btnToggleStudentView", "click", (e) => {
    studentViewMode = studentViewMode === "cards" ? "table" : "cards";
    e.currentTarget.classList.toggle("active", studentViewMode === "table");
    safeToggleClass("studentsListContainer", "hidden", studentViewMode === "table");
    safeToggleClass("studentsTableContainer", "hidden", studentViewMode !== "table");
  });

  on("searchInstructorsInput", "input", renderInstructors);

  on("enrollmentFilterPills", "click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (!pill) return;
    enrollmentFilter = pill.dataset.filter;
    document.querySelectorAll("#enrollmentFilterPills .filter-pill").forEach((p) => {
      p.classList.toggle("active", p === pill);
      p.setAttribute("aria-selected", p === pill ? "true" : "false");
    });
    renderEnrollments();
  });

  // Máscaras de entrada
  on("studentCpf", "input", (e) => {
    e.target.value = maskCPF(e.target.value);
  });
  on("studentPhone", "input", (e) => {
    e.target.value = maskPhone(e.target.value);
  });
  on("enrollStartDate", "input", (e) => {
    e.target.value = maskDateBR(e.target.value);
    updateEnrollmentAutomaticFields();
  });
  on("enrollPlanSelect", "change", updateEnrollmentAutomaticFields);

  // Salvar Aluno
  on("studentForm", "submit", (e) => {
    e.preventDefault();
    const editId = $("studentEditId")?.value;
    const name = $("studentName")?.value.trim() || "";
    const cpf = $("studentCpf")?.value.trim() || "";
    const phone = $("studentPhone")?.value.trim() || "";
    const email = $("studentEmail")?.value.trim() || "";
    const planName = $("studentPlan")?.value || "Plano Mensal";
    const instructorName = $("studentInstructor")?.value || "Prof. Rafael Martins";

    const nameErr = $("studentNameError");
    if (nameErr) nameErr.textContent = "";

    if (name.length < 3) {
      if (nameErr) nameErr.textContent = "Informe o nome completo do aluno.";
      return;
    }

    if (editId) {
      const existing = appState.students.find((s) => s.id === editId);
      if (existing) {
        existing.name = name;
        existing.cpf = cpf || "000.000.000-00";
        existing.phone = phone || "(11) 90000-0000";
        existing.email = email || "aluno@maxfit.com";
        existing.planName = planName;
        existing.instructorName = instructorName;
        existing.status = planName === "Sem plano" ? "Inativo" : "Ativo";
      }
      showToast(`Dados de ${name} atualizados!`);
    } else {
      const nextCode = String(130 + appState.students.length).padStart(5, "0");
      const newStudent = {
        id: "stu-" + Date.now(),
        code: nextCode,
        name,
        cpf: cpf || "000.000.000-00",
        phone: phone || "(11) 90000-0000",
        email: email || "aluno@maxfit.com",
        planName,
        instructorName,
        goal: "Hipertrofia & Evolução (Ficha ABC)",
        currentSplit: "A",
        status: "Ativo"
      };
      appState.students.unshift(newStudent);

      const planObj = appState.plans.find((p) => p.name === planName);
      if (planObj) planObj.studentsCount += 1;
      const instObj = appState.instructors.find((i) => i.name === instructorName);
      if (instObj) instObj.studentsCount += 1;

      showToast(`Aluno ${name} cadastrado na MaxFit!`);
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

  // Confirmar Nova Matrícula
  on("enrollmentForm", "submit", (e) => {
    e.preventDefault();
    const studentName = $("enrollStudentSelect")?.value;
    const planName = $("enrollPlanSelect")?.value;
    const instructorName = $("enrollInstructorSelect")?.value;
    const startDate = $("enrollStartDate")?.value.trim() || "06/11/2026";
    const endDate = $("enrollEndDate")?.value.trim() || "06/12/2026";

    const planObj = appState.plans.find((p) => p.name === planName);
    const monthlyVal = planObj ? planObj.price / planObj.months : 99.9;

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
    showToast(`Matrícula MaxFit de ${studentName} confirmada!`);
  });

  // Modal Instrutor
  on("btnFabAddInstructor", "click", () => openInstructorModal());
  on("btnOpenAddInstructorDesktop", "click", () => openInstructorModal());

  on("instructorForm", "submit", (e) => {
    e.preventDefault();
    const editId = $("instructorEditId")?.value;
    const name = $("instructorName")?.value.trim();
    const cref = $("instructorCref")?.value.trim();
    const specialty = $("instructorSpecialty")?.value.trim();

    if (!name || !specialty) return;

    const formattedName = name.startsWith("Prof") ? name : `Prof. ${name}`;
    const shortName = cleanCoachName(formattedName);

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

  // Modal Plano
  on("btnFabAddPlan", "click", () => openPlanModal());
  on("btnOpenAddPlanDesktop", "click", () => openPlanModal());

  on("planForm", "submit", (e) => {
    e.preventDefault();
    const editId = $("planEditId")?.value;
    const name = $("planName")?.value.trim();
    const months = parseInt($("planMonths")?.value, 10) || 1;
    const price = parseFloat($("planPrice")?.value) || 99.9;
    const featured = $("planFeatured")?.checked || false;

    if (!name) return;

    if (editId) {
      const plan = appState.plans.find((p) => p.id === editId);
      if (plan) {
        plan.name = name;
        plan.months = months;
        plan.price = price;
        plan.featured = featured;
      }
      showToast("Plano MaxFit atualizado!");
    } else {
      appState.plans.push({
        id: "plan-" + Date.now(),
        name,
        months,
        price,
        studentsCount: 0,
        featured,
        perks: ["Musculação Livre", "Treino no App MaxFit"]
      });
      showToast(`${name} criado com sucesso!`);
    }

    saveState();
    renderAll();
    closeModal("modalPlan");
  });

  on("btnConfirmDeleteAction", "click", () => {
    if (typeof pendingDeleteCallback === "function") {
      pendingDeleteCallback();
      pendingDeleteCallback = null;
    }
    closeModal("modalConfirmDelete");
  });

  // Alternância de Tema em todas as páginas
  on("btnToggleThemeDesktop", "click", toggleTheme);
  on("btnToggleThemeMobile", "click", toggleTheme);
  on("btnToggleThemeStudent", "click", toggleTheme);
  on("btnToggleThemeInstructor", "click", toggleTheme);
  on("btnToggleThemeInstMobile", "click", toggleTheme);
  on("btnToggleThemeLogin", "click", toggleTheme);
  on("btnToggleThemeLanding", "click", toggleTheme);

  // Restaurar dados originais
  on("btnResetData", "click", resetToMaxFitState);
});
