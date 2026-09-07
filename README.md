# ConnecTismo — versão alinhada ao site de referência

Front-end estático em React + Vite, com seis rotas:

- `/` — início
- `/inclusao` — inclusão
- `/dicas` — dicas práticas
- `/cultura` — cultura e representatividade
- `/mitos-verdades` — quiz de mitos e verdades
- `/sobre` — o projeto

O layout, a hierarquia editorial, a navegação, os textos, os estados de acessibilidade
e os componentes das páginas foram alinhados ao site de referência. Também foram
incluídos caminhos locais para todas as imagens e pôsteres de vídeo usados pelo
layout, evitando imagens quebradas quando o projeto é executado fora do ambiente
original.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
```

## Validar e gerar a versão final

```bash
npm run typecheck
npm run build
```

O build gera `dist/public`, pronto para hospedagem estática em Netlify, Vercel,
GitHub Pages, cPanel ou serviço equivalente.