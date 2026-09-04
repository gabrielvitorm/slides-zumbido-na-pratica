# Slides dos cursos — Zumbido na Prática

App React (Vite + React Router) que exibe os slides dos cursos como uma apresentação online, com uma URL própria por curso/trilha/aula/slide. Navegável por teclado, clique ou setas na tela. Feito para rodar sozinho em `slides.dominio.com`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Rotas

```
/                                             -> redireciona para o curso/trilha padrão
/:curso/:trilha                               -> capa da trilha
/:curso/:trilha/aula1                         -> slide 1 da aula 1
/:curso/:trilha/aula1/3                       -> slide 3 da aula 1
/:curso/:trilha/aula4/2                       -> slide 2 da aula 4 (bloco 1, tecnica)
```

Exemplo real: `/zumbido-na-pratica/trafego/aula1`. Cada slide tem uma URL própria (dá pra compartilhar/voltar direto num ponto específico); setas do teclado, clique nas laterais e os botões ‹ › avançam a URL também.

Cada aula é um deck fechado: a navegação (setas, clique, teclado) fica limitada aos slides daquela aula só — chegar no último slide de uma aula não avança sozinho pra próxima. Pra ir de uma aula pra outra, é preciso trocar a URL (ex: compartilhar o link de cada aula separadamente).

## Adicionar/editar aulas de uma trilha existente

Cada trilha tem seu próprio arquivo em `src/content/courses/<curso>/<trilha>.js` (ex: `src/content/courses/zumbido-na-pratica/trafego.js`). É só dados — não precisa mexer em componentes React:

- `nonTechLesson(numero, titulo, pontos)` — gera `divider → agenda → (point → agenda) × N`. `pontos` é uma lista de `{ title, text }`.
- `techLesson(numero, titulo, blocos)` — gera `divider → agenda → tecnica` (um slide por bloco). Cada bloco é `{ title, steps: [...], shotBox?: false, note? }`. Para um bloco sem espaço de print (`shot-box`), use `shotBox: false`. Para um bloco que é só uma fala (sem passos técnicos), use `{ type: 'point', title, text }` em vez de `steps`.

O `slug` da aula na URL (`aula1`, `aula2`, ...) é gerado automaticamente a partir do número passado pra essas funções.

Tipos de slide disponíveis: `cover`, `divider`, `agenda`, `point`, `tecnica` (componentes em `src/components/`).

## Adicionar um curso ou trilha novo

1. Crie `src/content/courses/<novo-curso>/<nova-trilha>.js` seguindo o modelo de `trafego.js` (uma `cover` + um array `lessons` construído com `nonTechLesson`/`techLesson`).
2. Registre em `src/content/registry.js`, dentro de `courses`. A chave do curso e a chave da trilha viram os dois primeiros segmentos da URL.

Não precisa mexer em rotas, navegação ou CSS — tudo isso já é genérico por trilha.

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

Como agora tem rotas (uma por slide), o Nginx **precisa** do fallback pra `index.html` em qualquer caminho (já incluído no `deploy/nginx.conf.example`) — senão um link direto tipo `/zumbido-na-pratica/trafego/aula3/2` dá 404 ao recarregar a página.

### Atualizar depois de publicado

Sempre que editar o conteúdo de uma trilha em `src/content/courses/...`, rode `npm run build` de novo e substitua o conteúdo de `dist/` na VPS (ou automatize com um script de deploy simples).
