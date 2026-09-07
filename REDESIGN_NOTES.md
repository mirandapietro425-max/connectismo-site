# ConnecTismo — redesign editorial

Esta versão transforma o site em uma publicação digital: cada seção tem uma
fotografia própria, ritmo visual diferente e blocos de leitura mais curtos.

## O que mudou

- Hero inicial com imagem editorial, camadas de contraste e chamadas de ação.
- Headers internos com fotografia contextual por página e índice visual.
- Carrossel editorial com imagens diferentes das capas dos vídeos.
- Capas dos vídeos separadas dos headers usando imagens alternativas do acervo.
- Cards com microinterações, bordas assimétricas e uma linguagem híbrida entre
  revista, galeria e portal educativo.
- Link direto para o Instagram da autora na página Sobre.
- Layout responsivo, navegação existente e recursos de acessibilidade preservados.
- Barra de progresso de leitura para orientar a pessoa sem ocupar espaço.
- Carrossel com pausa por hover e foco, indicadores acionáveis e rótulos para
  leitores de tela.
- Preferências de fonte, contraste e movimento persistidas no navegador.
- Capas e imagens secundárias carregadas com mais leveza para melhorar a entrada
  no celular.

## Referências de UX e acessibilidade

O passe final considerou as recomendações do W3C para carrosséis acessíveis e os
princípios de percepção, operação, compreensão e robustez da WCAG 2.2:

- https://www.w3.org/WAI/tutorials/carousels
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel
- https://www.w3.org/WAI/standards-guidelines/wcag/
- https://www.nngroup.com/articles/ten-usability-heuristics/

## Como executar

```bash
npm install
npm run dev
```

Para validar a produção:

```bash
npm run typecheck
npm run build
```