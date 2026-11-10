# 🏋️‍♂️ // MAXFIT — Sistema Integrado de Treinos e Gestão de Academias (`Atividade-App-Academia`)

Aplicação web **Mobile-First e Responsiva** desenvolvida para a atividade prática da **UC14 (Senac) — "Da Ideia ao Protótipo"**. O projeto parte da concepção em Wireframe, Mockup e Protótipo Interativo no Figma e evolui para um ecossistema completo sob a identidade visual **MaxFit Club (`//MAXFIT`)**, estruturado em **5 páginas HTML independentes**, com **HTML5 Estritamente Semântico (Zero `<div>`)**, **CSS3 Mobile-First (`rem` / `em`)** e **JavaScript Vanilla (ES6+)**.

---

## 👥 Autores e Contexto Acadêmico

- **Autores:** Matheus Duarte e Miguel
- **Instituição:** Senac — Ensino Técnico
- **Unidade Curricular:** UC14 — Desenvolver interface de usuário e usabilidade de aplicação web
- **Docentes:** Professores Aline Francisca e Marcos Costa
- **Tema Escolhido:** Tema 04 — Academia (Relação entre Aluno, Plano Contratado, Ficha de Treino e Professor Responsável)

---

## 🎯 Sobre o Projeto

O **MaxFit Club (`//MAXFIT`)** é uma solução completa para academias de ginástica, dividida em **5 páginas HTML dedicadas**:

1. **`index.html` (Início da Aplicação / Tela de Login Unificada):**
   - Ponto de entrada padrão ao executar o projeto (`http://localhost:5500/` ou `index.html`);
   - Carrega diretamente a tela de login unificada da MaxFit com seleção entre os 3 perfis;
   - Possui atalho para o portal institucional (`portal.html`).

2. **`login.html` (Tela de Login Unificada com 3 Perfis):**
   - Seletor rápido de perfil: **Aluno**, **Instrutor** e **Admin**;
   - Preenchimento automático de credenciais de teste ao alternar entre os perfis;
   - Alternância de exibição de senha (mostrar/ocultar senha);
   - Modal nativo `<dialog>` de recuperação de senha;
   - Redirecionamento automático pós-login para a página correspondente (`aluno.html`, `instrutor.html` ou `admin.html`).

3. **`aluno.html` (Área do Aluno MaxFit):**
   - **Início:** Saudação personalizada, resumo de treinos semanais, card em destaque do **Treino do Dia** com capa oficial;
   - **Fichas de Treino (Treino A, B e C):** Checklist interativo em tempo real, barra de progresso, séries, repetições, carga, tempo de descanso e dicas do instrutor;
   - **Meu Plano:** Status da assinatura, vigência, valor do plano e histórico de faturas;
   - **Meu Perfil & Biometria:** Dados cadastrais, métricas corporais, objetivo e instrutor responsável;
   - **Ajuda & FAQ:** Central de suporte com orientações da academia;
   - Sidebar desktop, Topbar com avatar e Bottom Nav mobile.

4. **`instrutor.html` (Painel de Pista do Instrutor):**
   - **Alunos Atuais na Academia:** Lista em tempo real com busca por nome ou objetivo, filtros de presença ("Todos" e "Ativos/Presentes") e resumo estatístico;
   - **Treino do Aluno:** Inspeção detalhada da ficha individual de treino do aluno selecionado, com alternância entre **Treino A**, **Treino B** e **Treino C**, séries, repetições, carga recomendada e orientações de execução;
   - **Meu Perfil do Instrutor:** Dados profissionais, CREF e botão inferior para deslogar;
   - Sidebar desktop e Bottom Nav mobile dedicados.

5. **`admin.html` (Gestão da Academia / Painel Admin):**
   - **Dashboard Executivo:** Indicadores em tempo real (Alunos Ativos, Instrutores, Matrículas no Mês e Receita Mensal Estimada), atalhos rápidos e lista de Matrículas Recentes;
   - **Gestão de Alunos:** Busca instantânea, filtros por status (Todos, Ativos, Inativos), alternância de visualização entre Cards e Tabela, edição, exclusão e atalho "Ver Visão do Aluno" (que abre a visão real do aluno em `aluno.html`);
   - **Cadastro / Edição de Alunos:** Formulário com máscaras de CPF e Telefone, vínculo com plano e professor responsável;
   - **Gestão de Instrutores:** Cadastro e edição via modal com registro CREF, especialidade e contagem de alunos;
   - **Planos da Academia:** Catálogo de pacotes com duração, preço e selo "Mais Popular";
   - **Controle de Matrículas:** Gestão de contratos ativos/pendentes/cancelados;
   - **Nova Matrícula:** Seleção dinâmica com cálculo automático de data de término e valor mensal estimado;
   - **Perfil do Administrador:** Dados executivos de gestão e botão inferior para deslogar.

6. **`portal.html` (Portal Institucional / Landing Page):**
   - Apresentação visual da academia, infraestrutura e metodologia de treino;
   - Apresentação do ecossistema digital e dos 3 ambientes;
   - Vitrine de modalidades, planos, corpo docente e FAQ semântico com `<details>` e `<summary>`.

---

## 📂 Estrutura de Arquivos

```text
Atividade-App-Academia/
├── assets/
│   ├── barlow-condensed.ttf   # Fonte display oficial da identidade visual //MAXFIT
│   ├── OFL-Barlow.txt         # Licença da tipografia Barlow Condensed
│   └── treino.jpg             # Imagem oficial de treinos e hero banner
├── index.html                 # 1. Ponto de entrada (inicia direto na Tela de Login)
├── login.html                 # 2. Tela de Login unificada com seletor de 3 perfis
├── aluno.html                 # 3. Área do Aluno (Início, Fichas A/B/C, Plano, Perfil)
├── instrutor.html             # 4. Painel do Instrutor (Alunos na Academia, Fichas e Perfil)
├── admin.html                 # 5. Gestão Administrativa (Dashboard, Alunos, Planos, Matrículas e Perfil)
├── portal.html                # 6. Portal Institucional / Landing Page com planos e modalidades
├── style.css                  # Design System MaxFit Mobile-First em rem/em, temas Dark/Light
├── script.js                  # Lógica compartilhada, persistência LocalStorage, rotas e CRUD
└── README.md                  # Documentação acadêmica e técnica do projeto
```

---

## 🛠️ Arquitetura Técnica e Boas Práticas

### 1. HTML5 Estritamente Semântico (Zero `<div>`)
Todas as páginas HTML (`index.html`, `login.html`, `aluno.html`, `instrutor.html`, `admin.html`, `portal.html`) e os templates gerados via JavaScript foram construídos **sem nenhuma tag `<div>`**, priorizando a acessibilidade e a semântica exigidas na UC14:
- `<aside>`, `<header>`, `<hgroup>`, `<nav>` e `<footer>` para cabeçalhos, sidebars e navegação;
- `<main>` e `<section>` para o delimitador principal e as seções de cada página;
- `<article>` para cada card de plano, indicador, aluno, instrutor e exercício;
- `<form>`, `<fieldset>`, `<legend>`, `<label>` e `<output>` para agrupamento lógico de campos e valores calculados;
- `<figure>` e `<figcaption>` para imagens e fotografias institucionais;
- `<details>` e `<summary>` para o acordeão nativo de dúvidas frequentes (FAQ);
- `<dialog>` nativo do HTML5 (`.showModal()` e `.close()`) combinado com `<dl>`, `<dt>` e `<dd>` para os modais de cadastro e bottom sheets.

### 2. Design System MaxFit Club & CSS3 Mobile-First
- **Abordagem Mobile-First:** O layout padrão foi desenvolvido para dispositivos móveis (`< 48rem / 768px`) com barras inferiores fixas (`nav.bottom-nav`), botões flutuantes (`+ FAB`) e grids adaptativos. Em telas maiores (`>= 48rem`), a interface se transforma automaticamente para layout de desktop com sidebars laterais fixas.
- **Tipografia Esportiva:** A fonte display condensada `Barlow Condensed` é utilizada nos títulos, métricas e logotipo, combinada com `Plus Jakarta Sans` para o corpo de texto.
- **Temas Escuro e Claro:** Paleta oficial **MaxFit Dark Carbon** (`#101112`, `#1b1d1f`, vermelho energia `#ff5145`) com suporte instantâneo à alternância para o modo claro via variáveis CSS.

### 3. JavaScript Vanilla (ES6+) e Roteamento Híbrido
- **Navegação Entre Páginas e Telas:** O sistema suporta navegação direta entre as 5 páginas HTML e também navegação interna entre abas/telas via IDs (`navigateTo`), com histórico e suporte a âncoras na URL (`#screen-...`).
- **Persistência em `localStorage`:** Alunos cadastrados, novos planos, matrículas confirmadas e marcações de exercícios concluídos permanecem salvos entre sessões e entre páginas.
- **Botão de Reset:** No painel do Admin, é possível restaurar o estado padrão da academia MaxFit a qualquer momento.
- **Feedback Visual (Toast Notifications):** Alertas dinâmicos via `<output role="status">` para confirmação de ações em todas as telas.

---

## 🚀 Como Executar o Projeto

1. Clone este repositório ou baixe os arquivos na sua máquina:
   ```bash
   git clone <url-do-repositorio>
   cd Atividade-App-Academia
   ```
2. Abra o arquivo [`index.html`](index.html) diretamente no seu navegador de preferência ou utilize a extensão **Live Server** no VS Code.
3. Para acessar os ambientes fechados, clique em **"Área de Membros / Login"** ou abra diretamente [`login.html`](login.html).
4. **Credenciais de Teste Rápidas (pré-preenchidas na tela de login):**
   - **Aluno:** `lucas@maxfit.com` | Senha: `12345678` ➔ Redireciona para [`aluno.html`](aluno.html)
   - **Instrutor:** `rafael@maxfit.com` | Senha: `12345678` ➔ Redireciona para [`instrutor.html`](instrutor.html)
   - **Admin:** `admin@maxfit.com` | Senha: `12345678` ➔ Redireciona para [`admin.html`](admin.html)
5. **Testando a Responsividade:**
   Pressione `F12` (ou `Ctrl + Shift + M`) no navegador e redimensione a largura da tela abaixo e acima de `768px` para observar a transição entre a versão mobile e desktop em qualquer uma das 5 páginas.
