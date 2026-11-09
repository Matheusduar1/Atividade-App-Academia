# // MAXFIT — Sistema Integrado de Treinos e Gestão de Academia

Aplicação web responsiva (**Mobile-First + Desktop Adaptive**) com identidade visual **MaxFit Club** (`Dark Carbon + Red Accent` e variante `Light Mode`), construída **100% em HTML5 semântico** (sem uso de tags `<div>` genéricas) e unificando **3 perfis de acesso**:

1. **Aluno (`lucas@maxfit.com` / `12345678`)**:
   - Login de teste direto (sem seletor dropdown).
   - **Início**: Saudação personalizada, resumo da sequência de treinos, card em destaque do treino do dia e lista das fichas **Treino A, B e C**.
   - **Ficha de Treino**: Checklist interativo com barra de progresso em tempo real, séries, repetições, descanso e dica de execução.
   - **Meu Plano**: Status da assinatura, benefícios inclusos e histórico de faturas.
   - **Perfil & Ajuda**: Dados biométricos (peso, altura, IMC), frequência, FAQ em acordeão (`<details>`/`<summary>`) e canais de suporte.

2. **Instrutor (`rafael@maxfit.com` / `12345678`)**:
   - Acesso focado exclusivamente no acompanhamento de pista:
     - **Alunos Atuais na Academia**: Lista de alunos com busca por nome/objetivo e filtro por status (**Ativos na academia** / **Todos**).
     - **Ficha de Treino do Aluno**: Visualização completa das fichas **Treino A**, **Treino B** e **Treino C** de cada aluno (exercícios, séries, repetições, descanso, dicas e progresso atual).

3. **Admin (`admin@maxfit.com` / `12345678`)**:
   - **Dashboard**: KPIs em tempo real (alunos ativos, matrículas vigentes, instrutores, planos e receita mensal estimada).
   - **CRUD Completo**: Gerenciamento de **Alunos**, **Instrutores**, **Planos** e **Matrículas** com persistência em `localStorage`.

---

## Arquitetura Semântica HTML5

O projeto utiliza exclusivamente elementos semânticos do HTML5:
- `<aside>`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<hgroup>`
- `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<output>`, `<meter>`
- `<dl>`, `<dt>`, `<dd>`, `<figure>`, `<blockquote>`, `<details>`, `<summary>`, `<dialog>`, `<footer>`

---

## Estrutura de Arquivos

- `index.html` — Estrutura semântica HTML5 unificada (Login com 3 perfis, Painel Admin, Painel do Instrutor e Área do Aluno MaxFit).
- `style.css` — Design System MaxFit (`Barlow Condensed` + `Inter`/`Plus Jakarta Sans`, variáveis CSS, grid responsivo sem overflow mobile).
- `script.js` — Estado persistente em `localStorage`, autenticação por perfil (`student`, `instructor`, `admin`), CRUD administrativo e fichas de treino A/B/C.
- `assets/` — Fonte display `barlow-condensed.ttf` e imagem de capa `treino.jpg`.
