# ConnecTismo — Universo TEA (somente o site)

Esta pasta contém **apenas o front-end** do projeto ConnecTismo — o site em si (React + Vite), com todo o CSS, JavaScript/TSX, fotos e vídeos originais, exatamente como estavam no projeto. Toda a parte de servidor (banco de dados, API, backend) foi removida, pois o site **não faz nenhuma chamada a servidor** — ele é 100% estático.

## O que foi removido
- `lib/db` — conexão e schema do banco de dados (Postgres/Drizzle)
- `lib/api-spec` — especificação OpenAPI da API
- `lib/api-zod` — validações Zod usadas pelo backend
- `lib/api-client-react` — cliente de API (não era usado em nenhum lugar do código do site)
- Configurações internas do Replit (`.replit`, `.replit-artifact`, etc.)

## O que continua 100% igual
- Todo o código em `src/` (componentes, páginas, hooks, estilos)
- `index.html`, `src/index.css`, todo o JavaScript/TypeScript
- Todas as fotos e vídeos em `public/assets`
- `favicon.svg`, `robots.txt`, `components.json`

## O que foi ajustado (só a "encanação" do projeto, não o site em si)
Como o site fazia parte de um monorepo (pnpm workspace), alguns arquivos de configuração dependiam dessa estrutura maior. Para o site funcionar sozinho, sem o resto do projeto, foi preciso:
- Fixar as versões das dependências no `package.json` (antes elas apontavam para um "catálogo" compartilhado do monorepo, que não existe mais aqui)
- Remover a dependência não usada `@workspace/api-client-react`
- Copiar o `tsconfig.base.json` para dentro da pasta (antes ficava na raiz do monorepo)
- Definir `PORT` e `BASE_PATH` diretamente nos scripts do `package.json` (antes vinham do ambiente do Replit)

Nada disso muda o funcionamento, aparência ou comportamento do site — só permite que ele rode fora do monorepo original. Isso foi testado: `npm install` + `npm run build` rodam sem erros e geram o site completo.

## Como rodar

```bash
npm install
npm run dev      # roda em modo desenvolvimento (http://localhost:5173)
```

## Como gerar a versão final (arquivos prontos para hospedar)

```bash
npm run build
```

Isso vai gerar a pasta `dist/public` com os arquivos finais (HTML, CSS, JS otimizados) prontos para subir em qualquer hospedagem de site estático (Netlify, Vercel, GitHub Pages, cPanel, etc.).
