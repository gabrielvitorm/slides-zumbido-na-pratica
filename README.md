# Slides do curso — Tráfego Pago para Profissionais de Zumbido

App React (Vite) que exibe os slides do curso como uma apresentação online, navegável por teclado, clique ou setas na tela. Feito para rodar sozinho em `slides.dominio.com`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Adicionar/editar aulas

Todo o conteúdo das aulas fica em `src/content/aulas.js`, como dados — não precisa mexer em componentes React para adicionar uma aula nova.

- `nonTechLesson(numero, titulo, pontos)` — gera `divider → agenda → (point → agenda) × N` automaticamente. `pontos` é uma lista de `{ title, text }`.
- `techLesson(numero, titulo, blocos)` — gera `divider → agenda → tecnica` (um slide por bloco). Cada bloco é `{ title, steps: [...], shotBox?: false, note? }`. Para um bloco sem espaço de print (`shot-box`), use `shotBox: false`. Para um bloco que é só uma fala (sem passos técnicos), use `{ type: 'point', title, text }` em vez de `steps`.

Depois é só incluir a aula no array retornado por `buildDeck()`.

Tipos de slide disponíveis: `cover`, `divider`, `agenda`, `point`, `tecnica` (componentes em `src/components/`).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` com os arquivos estáticos prontos para publicar.

## Deploy na VPS (slides.dominio.com)

1. Na VPS, instale Node só se for buildar lá; senão, rode `npm run build` localmente e envie a pasta `dist/` pronta (via `scp`/`rsync`).
2. Coloque o conteúdo de `dist/` em algo como `/var/www/slides.dominio.com`.
3. Configure o Nginx (exemplo em `deploy/nginx.conf.example`) apontando para essa pasta, com `server_name slides.dominio.com;`.
4. Aponte o DNS do subdomínio `slides` para o IP da VPS.
5. (Opcional) HTTPS com Certbot: `certbot --nginx -d slides.dominio.com`.

Como é uma SPA sem rotas (é uma apresentação de slide único), não precisa de nenhuma regra especial de `try_files` além de servir `index.html`.

### Atualizar depois de publicado

Sempre que editar `src/content/aulas.js`, rode `npm run build` de novo e substitua o conteúdo de `dist/` na VPS (ou automatize com um script de deploy simples).
