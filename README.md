# 🏋️‍♂️ // MAXFIT — Sistema Integrado de Treinos e Gestão de Academias (`Atividade-App-Academia`)

Aplicação web **Mobile-First e Responsiva** desenvolvida para a atividade prática da **UC14 (Senac) — "Da Ideia ao Protótipo"**. O projeto parte da concepção em Wireframe, Mockup e Protótipo Interativo no Figma e evolui para um ecossistema completo sob a identidade visual **MaxFit Club (`//MAXFIT`)**, unificando **Área do Aluno**, **Painel do Instrutor** e **Gestão Administrativa (Admin)** com **HTML5 Estritamente Semântico (Zero `<div>`)**, **CSS3 Mobile-First (`rem` / `em`)** e **JavaScript (ES6+)**.

---

## 👥 Autores e Contexto Acadêmico

- **Autores:** Matheus Duarte e Miguel
- **Instituição:** Senac — Ensino Técnico
- **Unidade Curricular:** UC14 — Desenvolver interface de usuário e usabilidade de aplicação web
- **Docentes:** Professores Aline Francisca e Marcos Costa
- **Tema Escolhido:** Tema 04 — Academia (Relação entre Aluno, Plano Contratado, Ficha de Treino e Professor Responsável)

---

## 🎯 Sobre o Projeto

O **MaxFit Club (`//MAXFIT`)** simula um sistema real e integrado para academias de ginástica, dividido em **3 perfis de acesso** a partir de uma única tela de login:

1. **Perfil Aluno (`Área do Aluno MaxFit`):**
   - Acesso direto de teste para consulta do **Treino do Dia**, fichas **Treino A, B e C** com checklist interativo e barra de progresso em tempo real;
   - Visualização do **Plano Contratado**, benefícios inclusos e histórico de faturas;
   - Consulta de **Perfil Biométrico** (peso, altura, IMC calculado, objetivo e instrutor responsável) e central de **Ajuda / FAQ**.
2. **Perfil Instrutor (`Painel de Pista do Instrutor`):**
   - Acesso dedicado exclusivamente ao acompanhamento técnico: visualização dos **Alunos Atuais na Academia** (com busca e filtro de ativos/todos) e inspeção detalhada da **Ficha de Treino (Treinos A, B e C)** de cada aluno com séries, repetições, descanso, dicas de execução e progresso.
3. **Perfil Admin (`Gestão da Academia`):**
   - **Dashboard Executivo** com indicadores em tempo real (Alunos Ativos, Instrutores, Matrículas/Mês e Receita Mensal Estimada);
   - **Cadastro e consulta de Alunos** (com vínculo ao plano e ao instrutor responsável);
   - **Cadastro e consulta de Instrutores** (com registro CREF, especialidade e contagem de alunos);
   - **Cadastro e consulta de Planos** (Mensal, Trimestral, Semestral, Anual e novos pacotes);
   - **Controle de Matrículas** (com cálculo automático da data de término e valor mensal estimado conforme o plano contratado).

---

## 📱 Telas e Fluxo de Navegação

O sistema contempla **15 telas integradas**, conectadas por navegação fluida com histórico de retorno e barras de navegação adaptativas por perfil:

### 🔐 Autenticação
| # | Tela | ID no Código | Principais Funcionalidades |
| :-: | :--- | :--- | :--- |
| **01** | **Login Unificado (3 Perfis)** | `#screen-login` | Seletor de perfil (**Aluno**, **Instrutor** e **Admin**), preenchimento automático de credenciais de teste, botão exibir/ocultar senha e modal "Esqueceu a senha?". |

### 🛡️ Visão 01: Gestão da Academia (Perfil Admin)
| # | Tela | ID no Código | Principais Funcionalidades |
| :-: | :--- | :--- | :--- |
| **02** | **Dashboard** | `#screen-dashboard` | Saudação ao gestor, grid de indicadores (Alunos Ativos, Instrutores, Matrículas/Mês, Receita Mensal), atalhos rápidos e lista de Matrículas Recentes. |
| **03** | **Alunos** | `#screen-students` | Busca em tempo real por nome, telefone, plano ou instrutor; abas de filtro (Todos, Ativos, Inativos); alternância Cards/Tabela; detalhes em Bottom Sheet e atalho direto para a visão do aluno. |
| **04** | **Cadastrar / Editar Aluno** | `#screen-add-student` | Formulário com máscaras automáticas de CPF e Telefone, seleção dinâmica de Plano e Instrutor Responsável, botões Salvar, Cancelar e Voltar. |
| **05** | **Instrutores** | `#screen-instructors` | Busca de professores, cards com inicial, CREF, modalidade (Musculação, Pilates, Treino Funcional, Cross Training) e total de alunos vinculados, além de modal de cadastro/edição. |
| **06** | **Planos da Academia** | `#screen-plans` | Listagem de pacotes com destaque visual (`MAIS POPULAR`), duração em meses, valor em reais (`R$`), total de alunos ativos e atalho para matricular diretamente no plano. |
| **07** | **Controle de Matrículas** | `#screen-enrollments` | Gestão de contratos com filtros por status (Todas, Ativas, Pendentes, Canceladas) e visualização das datas de Início e Término. |
| **08** | **Nova Matrícula** | `#screen-new-enrollment` | Seleção integrada de Aluno, Plano e Instrutor, cálculo automático da Data de Término e do card `VALOR ESTIMADO`, definição de status inicial e confirmação. |

### 📋 Visão 02: Painel do Instrutor (Perfil Instrutor)
| # | Tela | ID no Código | Principais Funcionalidades |
| :-: | :--- | :--- | :--- |
| **09** | **Alunos na Academia** | `#screen-instructor-students` | Listagem dos alunos presentes/ativos na academia com busca por nome ou objetivo, resumo de alunos ativos vs. total e acesso rápido ao treino de cada aluno. |
| **10** | **Treino do Aluno (Instrutor)** | `#screen-instructor-workout` | Consulta completa da ficha individual do aluno selecionado, alternância entre **Treino A**, **Treino B** e **Treino C**, progresso atual e detalhamento técnico de cada exercício. |

### 🔥 Visão 03: Área do Aluno MaxFit (Perfil Aluno)
| # | Tela | ID no Código | Principais Funcionalidades |
| :-: | :--- | :--- | :--- |
| **11** | **Início (Área do Aluno)** | `#screen-student-home` | Saudação personalizada, resumo da sequência de treinos, card em destaque do **Treino de Hoje** e lista completa das fichas **Treino A, B e C**. |
| **12** | **Ficha de Treino Interativa** | `#screen-student-workout` | Checklist interativo de exercícios com barra de progresso em tempo real, séries, repetições, tempo de descanso, dica técnica e botão de conclusão do treino. |
| **13** | **Meu Plano** | `#screen-student-plan` | Status da assinatura do aluno, vigência, valor mensal, lista de benefícios inclusos na MaxFit e histórico de faturas pagas. |
| **14** | **Meu Perfil** | `#screen-student-profile` | Avatar, dados cadastrais, métricas corporais (Peso, Altura e IMC calculado automaticamente), objetivo, instrutor responsável e botão de encerramento de sessão. |
| **15** | **Central de Ajuda & Suporte** | `#screen-student-help` | Perguntas frequentes em acordeão nativo (`<details>` / `<summary>`) e canais de contato da recepção MaxFit. |

---

## 🛠️ Arquitetura Técnica e Boas Práticas

### 1. HTML5 Estritamente Semântico (Zero `<div>`)
A marcação em [`index.html`](index.html) e os templates dinâmicos em [`script.js`](script.js) foram construídos **sem nenhuma tag `<div>`**, priorizando acessibilidade e significado estrutural:
- `<aside>`, `<header>`, `<hgroup>`, `<nav>` e `<footer>` para a estrutura das sidebars desktop e barras inferiores mobile de cada perfil;
- `<main>` e `<section>` para delimitar o container principal e cada uma das 15 telas da aplicação;
- `<article>` para cada card de indicador, aluno, instrutor, plano, matrícula e exercício de treino;
- `<form>`, `<fieldset>`, `<legend>`, `<label>` e `<output>` para agrupamento lógico de campos, seletores de perfil e resultados calculados;
- `<details>` e `<summary>` para o acordeão nativo de dúvidas frequentes (FAQ);
- `<dialog>` nativo do HTML5 (`.showModal()` e `.close()`) combinado com listas de definição (`<dl>`, `<dt>`, `<dd>`) para os modais de cadastro, exclusão, recuperação de senha e bottom sheets de detalhes.

### 2. Identidade Visual MaxFit Club & CSS3 Mobile-First (`rem` e `em`)
A estilização em [`style.css`](style.css) adota o Design System **MaxFit (`//MAXFIT`)** com abordagem Mobile-First:
- **Tipografia Esportiva:** Fonte display condensada `Barlow Condensed` (para títulos, métricas e logotipo `//MAXFIT`) combinada com `Plus Jakarta Sans` / `Inter` para leitura de interface;
- **Modo App Mobile (`< 48rem / 768px`):** Ao abrir no smartphone ou redimensionar pelo DevTools (`F12`), a interface opera como aplicativo nativo com barra de navegação inferior fixa (`nav.bottom-nav`), botões de ação flutuantes (`+ FAB`) e seletor de perfil em 3 colunas livre de overflow;
- **Modo Desktop (`>= 48rem / 768px`):** Em monitores maiores, a barra inferior oculta-se automaticamente e dá lugar à Sidebar Lateral específica do perfil logado (`#desktopSidebar`, `#instructorSidebar` ou `#studentSidebar`), expandindo indicadores e cards em grids responsivos;
- **Temas Escuro e Claro:** Paleta oficial **MaxFit Dark Carbon** (`#0f0f10`, `#18181a`, vermelho energia `#ff5145`) com suporte à alternância instantânea para o modo claro via variáveis CSS (`--bg-screen`, `--bg-surface`, `--accent-primary`, etc.).

### 3. JavaScript Vanilla (ES6+) e Persistência
O arquivo [`script.js`](script.js) gerencia toda a interatividade do protótipo sem dependências externas:
- **Autenticação Multi-Perfil:** Controle de sessão e roteamento específico para **Aluno**, **Instrutor** e **Admin**;
- **CRUD Completo (Admin) + Checklist de Treinos (Aluno):** Criação, leitura, edição, alteração de status e exclusão para Alunos, Instrutores, Planos e Matrículas, além de marcação em tempo real dos exercícios concluídos nas fichas A, B e C;
- **Persistência em `localStorage`:** Todas as alterações feitas no sistema e o progresso dos treinos permanecem salvos no navegador, contando também com botão para **Restaurar os Dados Originais** a qualquer momento;
- **Máscaras e Cálculos Automáticos:** Formatação em tempo real para CPF (`000.000.000-00`), Telefone (`(00) 00000-0000`) e Data (`DD/MM/AAAA`), além de cálculo automático de IMC e soma de meses na vigência da matrícula;
- **Feedback Visual (Toast Notifications):** Avisos dinâmicos em `<output role="status">` a cada ação realizada no sistema.

---

## 📂 Estrutura de Arquivos

```text
Atividade-App-Academia/
├── assets/
│   ├── barlow-condensed.ttf   # Fonte display oficial da identidade visual //MAXFIT
│   ├── OFL-Barlow.txt         # Licença da tipografia Barlow Condensed
│   └── treino.jpg             # Imagem de capa do card de treino da Área do Aluno
├── index.html                 # Estrutura 100% HTML5 Semântico (Zero <div>) com 15 telas e modais <dialog>
├── style.css                  # Design System MaxFit Mobile-First em rem/em, temas Dark/Light e Media Queries
├── script.js                  # Controle dos 3 perfis (Aluno, Instrutor, Admin), treinos A/B/C, CRUD e localStorage
└── README.md                  # Documentação acadêmica e técnica do projeto
```

---

## 🚀 Como Executar o Projeto

1. Clone este repositório ou baixe os arquivos na sua máquina:
   ```bash
   git clone <url-do-repositorio>
   cd Atividade-App-Academia
   ```
2. Abra o arquivo [`index.html`](index.html) diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari) ou utilize a extensão **Live Server** no VS Code.
3. Na tela de **Login**, escolha um dos **3 perfis de acesso** (as credenciais de teste já são preenchidas automaticamente ao clicar em cada opção):
   - **Perfil Aluno:** `lucas@maxfit.com` | Senha: `12345678`
   - **Perfil Instrutor:** `rafael@maxfit.com` | Senha: `12345678`
   - **Perfil Admin:** `admin@maxfit.com` | Senha: `12345678`
4. **Testando a Responsividade (Mobile ↔ Desktop):**
   Pressione `F12` no navegador (ou `Ctrl + Shift + M` para ativar a barra de dispositivos móveis) e redimensione a largura da tela abaixo e acima de `768px` para observar a adaptação automática entre **App Mobile** e **Sistema Desktop** nos 3 perfis.
