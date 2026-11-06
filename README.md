# 🏋️‍♂️ FitManager — Gestão Inteligente de Academias (`Atividade-App-Academia`)

Aplicação web **Mobile-First** e **Responsiva** desenvolvida para a atividade prática da **UC14 (Senac)** — *"Da Ideia ao Protótipo"*. O projeto parte da concepção em **Wireframe, Mockup e Protótipo Interativo no Figma** e evolui para uma aplicação funcional construída com **HTML5 Semântico**, **CSS3 Mobile-First (`rem` / `em`)** e **JavaScript (ES6+)**.

---

## 👥 Autores e Contexto Acadêmico

- **Autores:** Matheus Duarte e Miguel
- **Instituição:** Senac — Ensino Técnico
- **Unidade Curricular:** UC14 — *Desenvolver interface de usuário e usabilidade de aplicação web*
- **Docentes:** Professores Aline Francisca e Marcos Costa
- **Tema Escolhido:** Tema 04 — **Academia** (*Relação entre Aluno, Plano Contratado e Professor Responsável*)

---

## 🎯 Sobre o Projeto

O **FitManager** simula um sistema real de gestão para academias de ginástica, permitindo administrar de forma integrada:

1. **Cadastro e consulta de Alunos** (com vínculo ao plano e ao instrutor responsável);
2. **Cadastro e consulta de Instrutores** (com registro CREF, especialidade e contagem de alunos);
3. **Cadastro e consulta de Planos** (Mensal, Trimestral, Semestral, Anual e novos pacotes);
4. **Controle de Matrículas** (com cálculo automático da data de término e valor mensal estimado conforme o plano contratado).

---

## 📱 Telas e Fluxo de Navegação (Baseado no Mockup Figma)

O sistema contempla as **8 telas** planejadas no protótipo do Figma, conectadas por navegação fluida com histórico de retorno:

| # | Tela | ID no Código | Principais Funcionalidades |
| :-: | :--- | :--- | :--- |
| **01** | **Login** | `#screen-login` | Autenticação do administrador, botão para exibir/ocultar senha, validação de campos e modal *"Esqueceu a senha?"*. |
| **02** | **Dashboard** | `#screen-dashboard` | Saudação ao usuário, grid de indicadores (*Alunos Ativos*, *Instrutores*, *Matrículas/Mês*, *Receita Mensal*), atalhos de acesso rápido e lista de *Matrículas Recentes*. |
| **03** | **Alunos** | `#screen-students` | Busca em tempo real por nome, telefone, plano ou instrutor; abas de filtro (*Todos*, *Ativos*, *Inativos*); alternância entre visualização em **Cards** e **Tabela**; detalhes em *Bottom Sheet*. |
| **04** | **Cadastrar / Editar Aluno** | `#screen-add-student` | Formulário com máscaras automáticas de **CPF** e **Telefone**, seleção dinâmica de **Plano** e **Instrutor Responsável**, botões *Salvar*, *Cancelar* e *Voltar*. |
| **05** | **Instrutores** | `#screen-instructors` | Busca de professores, cards com inicial, CREF, modalidade (*Musculação*, *Pilates*, *Treino Funcional*) e total de alunos vinculados, além de modal de cadastro/edição. |
| **06** | **Planos da Academia** | `#screen-plans` | Listagem de pacotes com destaque visual (*Plano Trimestral*), duração em meses, valor em reais (`R$`), total de alunos ativos e atalho para matricular diretamente no plano. |
| **07** | **Controle de Matrículas** | `#screen-enrollments` | Gestão de contratos com filtros por status (*Todas*, *Ativas*, *Pendentes*, *Canceladas*) e visualização das datas de **Início** e **Término**. |
| **08** | **Nova Matrícula** | `#screen-new-enrollment` | Seleção integrada de Aluno, Plano e Instrutor, **cálculo automático da Data de Término** e do card **VALOR ESTIMADO**, definição de status inicial (*Ativa* / *Pendente*) e confirmação. |

---

## 🛠️ Arquitetura Técnica e Boas Práticas

### 1. HTML5 Estritamente Semântico (Sem `<div>` desnecessárias)
A marcação em [`index.html`](./index.html) foi construída priorizando acessibilidade e significado estrutural:
- `<aside>`, `<header>`, `<hgroup>`, `<nav>` e `<footer>` para a estrutura de navegação lateral e barra inferior mobile;
- `<main>` e `<section>` para delimitar cada uma das 8 telas da aplicação;
- `<article>` para cada card de indicador, aluno, instrutor, plano e matrícula;
- `<form>`, `<fieldset>`, `<legend>`, `<label>` e `<output>` para agrupamento lógico de campos e resultados calculados;
- `<dialog>` nativo do HTML5 (`.showModal()` e `.close()`) combinado com listas de definição (`<dl>`, `<dt>`, `<dd>`) para os modais de cadastro, exclusão e *bottom sheets* de detalhes.

### 2. CSS3 Mobile-First & Unidades Relativas (`rem` e `em`)
A estilização em [`style.css`](./style.css) segue a abordagem **Mobile-First**:
- **Modo App Mobile (`< 48rem` / `768px`):** Ao abrir no smartphone ou redimensionar a janela pelo DevTools (`F12`), a interface assume automaticamente o comportamento de aplicativo mobile com barra de navegação inferior fixa (`nav.bottom-nav`), botões de ação flutuantes (`+` FAB) e rolagem suave.
- **Modo Desktop (`>= 48rem` / `768px`):** Em monitores maiores, a barra inferior oculta-se automaticamente e dá lugar à **Sidebar Lateral (`aside.desktop-sidebar`)**, expandindo os indicadores para 4 colunas, os cards para grids responsivos (`auto-fill`) e os formulários para campos lado a lado.
- **Temas Escuro e Claro:** Paleta original do Figma em modo escuro (`#0b0f19`, `#131c2e`, verde esmeralda `#10b981`) com suporte à alternância instantânea para o modo claro via variáveis CSS (`--bg-screen`, `--bg-surface`, etc.).

### 3. JavaScript Vanilla (ES6+) e Persistência
O arquivo [`script.js`](./script.js) gerencia toda a interatividade do protótipo sem dependências externas:
- **CRUD Completo:** Criação, leitura, edição, alteração de status e exclusão (com modal de confirmação) para Alunos, Instrutores, Planos e Matrículas;
- **Persistência em `localStorage`:** Todas as alterações feitas pelo usuário permanecem salvas no navegador, contando também com um botão no topo do Dashboard para **Restaurar os Dados Originais do Figma** a qualquer momento;
- **Máscaras e Cálculos Automáticos:** Formatação em tempo real para CPF (`000.000.000-00`), Telefone (`(00) 00000-0000`) e Data (`DD/MM/AAAA`), além de soma automática de meses na vigência da matrícula;
- **Feedback Visual (*Toast Notifications*):** Avisos dinâmicos a cada ação realizada no sistema.

---

## 📂 Estrutura de Arquivos

```text
Atividade-App-Academia/
├── index.html   # Estrutura semântica HTML5 com as 8 telas e modais <dialog>
├── style.css    # Estilos Mobile-First em rem/em, temas Dark/Light e Media Queries
├── script.js    # Lógica de navegação, CRUD, máscaras, cálculos e LocalStorage
└── README.md    # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

1. Clone este repositório ou baixe os arquivos na sua máquina:
   ```bash
   git clone <url-do-repositorio>
   cd Atividade-App-Academia
   ```
2. Abra o arquivo [`index.html`](./index.html) diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari) ou utilize a extensão **Live Server** no VS Code.
3. Na tela de **Login**, utilize as credenciais já preenchidas (ou qualquer e-mail válido e senha com 4+ caracteres):
   - **E-mail:** `admin@fitmanager.com`
   - **Senha:** `12345678`
4. **Testando a Responsividade (Mobile ↔ Desktop):**
   - Pressione `F12` no navegador (ou `Ctrl + Shift + M` para ativar a barra de dispositivos móveis) e redimensione a largura da tela abaixo e acima de **`768px`** para observar a adaptação automática entre **App Mobile** e **Sistema Desktop**.
