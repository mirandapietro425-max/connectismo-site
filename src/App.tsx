import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  HeartHandshake,
  Menu,
  Pause,
  Play,
  Sparkles,
  Volume2,
  X,
} from 'lucide-react';

type PageKey = 'inicio' | 'inclusao' | 'dicas' | 'cultura' | 'mitos' | 'sobre';

const pages: Array<{ key: PageKey; href: string; label: string }> = [
  { key: 'inicio', href: '/', label: 'InÃ­cio' },
  { key: 'inclusao', href: '/inclusao', label: 'InclusÃ£o' },
  { key: 'dicas', href: '/dicas', label: 'Dicas prÃ¡ticas' },
  { key: 'cultura', href: '/cultura', label: 'Cultura & representatividade' },
  { key: 'mitos', href: '/mitos-verdades', label: 'Mitos & verdades' },
  { key: 'sobre', href: '/sobre', label: 'Sobre' },
];

const localVideos = {
  inclusao: '/assets/videos/estrategias-para-autismo.mp4',
  dicas: '/assets/videos/videoplayback (1).mp4',
  cultura: '/assets/videos/videoplayback.mp4',
  mitos: '/assets/videos/videoplayback (2).mp4',
  sobre: '/assets/videos/videoplayback (3).mp4',
};

const questions = [
  {
    text: 'O autismo Ã© uma doenÃ§a que precisa ser curada?',
    options: ['Sim, sempre precisa desaparecer.', 'NÃ£o. Ã‰ uma condiÃ§Ã£o do neurodesenvolvimento e o apoio deve respeitar a pessoa.', 'Apenas na infÃ¢ncia.'],
    answer: 1,
    feedback: 'TEA Ã© uma condiÃ§Ã£o do neurodesenvolvimento. O cuidado deve ampliar participaÃ§Ã£o, comunicaÃ§Ã£o e bem-estar, sem apagar identidades.',
  },
  {
    text: 'Toda pessoa autista apresenta as mesmas caracterÃ­sticas?',
    options: ['Sim, os sinais sÃ£o iguais.', 'Somente pessoas nÃ£o verbais sÃ£o autistas.', 'NÃ£o. O espectro Ã© amplo e cada pessoa tem uma forma singular de se comunicar e viver.'],
    answer: 2,
    feedback: 'A diversidade Ã© parte do espectro. Necessidades de suporte, interesses, comunicaÃ§Ã£o e autonomia variam.',
  },
  {
    text: 'Uma mudanÃ§a na rotina pode ser apoiada de que forma?',
    options: ['Avisando antes, usando pistas visuais e explicando o que vai acontecer.', 'Fazendo a mudanÃ§a de surpresa.', 'Ignorando o desconforto.'],
    answer: 0,
    feedback: 'Previsibilidade, avisos e recursos visuais tornam transiÃ§Ãµes mais compreensÃ­veis e acolhedoras.',
  },
  {
    text: 'A comunicaÃ§Ã£o alternativa substitui necessariamente a fala?',
    options: ['Sim, por isso nÃ£o deve ser oferecida.', 'NÃ£o. Ela pode complementar ou oferecer outro caminho de comunicaÃ§Ã£o.', 'SÃ³ pode ser usada por profissionais.'],
    answer: 1,
    feedback: 'ComunicaÃ§Ã£o Ã© direito. Recursos alternativos e aumentativos podem complementar a fala ou ser o principal meio de expressÃ£o.',
  },
];

function currentPage(): PageKey {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return pages.find((page) => page.href === path)?.key ?? 'inicio';
}

function Header({ activePage, onAccessibility }: { activePage: PageKey; onAccessibility: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Ir ao conteÃºdo</a>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="ConnecTismo, pÃ¡gina inicial">
          <span>Connec</span><span className="brand-pill">Tismo</span>
        </a>
        <nav className="desktop-nav" aria-label="NavegaÃ§Ã£o principal">
          {pages.map((page) => (
            <a key={page.key} className="nav-link" href={page.href} aria-current={activePage === page.key ? 'page' : undefined}>
              {page.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={onAccessibility} aria-label="Abrir painel de acessibilidade"><Eye size={18} /></button>
          <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-label="NavegaÃ§Ã£o mÃ³vel">
        {pages.map((page) => (
          <a key={page.key} className="nav-link" href={page.href} aria-current={activePage === page.key ? 'page' : undefined} onClick={() => setMobileOpen(false)}>
            {page.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Accessibility({ forceOpen = false }: { forceOpen?: boolean }) {
  const [open, setOpen] = useState(forceOpen);
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [paused, setPaused] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  useEffect(() => { if (forceOpen) setOpen(true); }, [forceOpen]);
  useEffect(() => { document.body.classList.toggle('fonte-grande', large); }, [large]);
  useEffect(() => { document.body.classList.toggle('alto-contraste', contrast); }, [contrast]);
  useEffect(() => { document.body.classList.toggle('pausar-movimento', paused); }, [paused]);
  const choices = [
    { label: 'Aumentar fonte', value: large, set: setLarge },
    { label: 'Alto contraste', value: contrast, set: setContrast },
    { label: 'Pausar movimento', value: paused, set: setPaused },
  ];
  return (
    <div className="accessibility">
      <button className="button button-blue" onClick={() => setOpen(!open)} aria-expanded={open}><Eye size={17} /> Acessibilidade</button>
      {open && <div className="accessibility-panel" role="dialog" aria-label="OpÃ§Ãµes de acessibilidade">
        <h3>Personalize sua leitura</h3>
        {choices.map((choice) => <button key={choice.label} className="accessibility-option" aria-pressed={choice.value} onClick={() => choice.set(!choice.value)}>
          <span>{choice.label}</span><span className="toggle" aria-hidden="true" />
        </button>)}
      </div>}
    </div>
  );
}

function VideoBlock({ src, title, description }: { src: string; title: string; description: string }) {
  return (
    <div className="video-bloco">
      <div className="video-cabecalho">
        <div className="video-icone" aria-hidden="true"><Play size={20} /></div>
        <div><h3>{title}</h3><small>{description}</small></div>
      </div>
      <div className="video-frame"><video controls preload="metadata" width="100%"><source src={src} type="video/mp4" />Seu navegador nÃ£o consegue reproduzir este vÃ­deo local.</video></div>
      <p className="caption">VÃ­deo local do acervo enviado para o ConnecTismo.</p>
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></div>;
}

function Welcome() {
  return <section className="hero" aria-labelledby="hero-title"><div className="hero-content reveal">
    <span className="eyebrow" style={{ color: '#F5A623' }}>Portal educativo sobre autismo</span>
    <h1 id="hero-title">ConexÃ£o alÃ©m do espectro.</h1>
    <p>InformaÃ§Ã£o acolhedora, ciÃªncia e caminhos prÃ¡ticos para construir mais compreensÃ£o no cotidiano.</p>
    <div className="hero-meta"><a className="button button-primary" href="#tea">ComeÃ§ar a explorar <ArrowDown size={16} /></a><a className="button button-ghost" href="/sobre">ConheÃ§a o projeto</a></div>
    <div className="hero-meta" aria-label="Para quem Ã© o portal"><span className="meta-chip">FamÃ­lias</span><span className="meta-chip">Educadores</span><span className="meta-chip">Profissionais</span><span className="meta-chip">Pessoas autistas</span></div>
  </div></section>;
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const slides = [
    { title: 'EducaÃ§Ã£o que considera todos os caminhos', text: 'Aprender pode acontecer com imagens, movimento, interesse, repetiÃ§Ã£o, silÃªncio e tempo.', href: '/inclusao', art: 'one' },
    { title: 'Acessibilidade Ã© uma prÃ¡tica diÃ¡ria', text: 'O ambiente pode acolher diferenÃ§as sensoriais, comunicacionais e de ritmo.', href: '/dicas', art: 'two' },
    { title: 'Representatividade tambÃ©m educa', text: 'Quando pessoas autistas contam suas prÃ³prias histÃ³rias, ampliamos o que imaginamos ser possÃ­vel.', href: '/cultura', art: 'three' },
  ];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 5200);
    return () => window.clearInterval(timer);
  }, [playing, slides.length]);
  return <section className="carousel" aria-label="Destaques editoriais" onMouseEnter={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)}>
    <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>{slides.map((slide, i) => <article className="slide" key={slide.title}>
      <div className="slide-copy"><span className="eyebrow" style={{ color: 'var(--solar)' }}>Destaque {String(i + 1).padStart(2, '0')}</span><h3>{slide.title}</h3><p>{slide.text}</p><a className="button button-ghost" href={slide.href}>Explorar tema <ArrowRight size={15} /></a></div>
      <div className={`slide-art ${slide.art}`} aria-hidden="true" />
    </article>)}</div>
    <div className="carousel-controls"><button aria-label="Slide anterior" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}><ArrowLeft size={17} /></button><button aria-label={playing ? 'Pausar carrossel' : 'Reproduzir carrossel'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><button aria-label="PrÃ³ximo slide" onClick={() => setIndex((index + 1) % slides.length)}><ArrowRight size={17} /></button></div>
  </section>;
}

function TeaContent() {
  return <section id="tea" className="section-paper" aria-labelledby="tea-title"><div className="container">
    <div className="section-head"><div><span className="eyebrow">Primeiro passo</span><h2 id="tea-title">Entender Ã© uma forma de cuidar.</h2><p className="lede">O Transtorno do Espectro Autista (TEA) Ã© uma condiÃ§Ã£o do neurodesenvolvimento. InformaÃ§Ã£o de qualidade abre espaÃ§o para escuta, direitos e participaÃ§Ã£o.</p></div><span className="eyebrow" style={{ color: 'var(--coral)' }}>01 / 03</span></div>
    <div className="editorial-grid"><div className="reading-column"><h3>O que Ã© o TEA?</h3><p>O autismo acompanha a pessoa ao longo da vida e se manifesta de formas diversas. Ele pode influenciar a comunicaÃ§Ã£o, a interaÃ§Ã£o social, o processamento sensorial, os interesses e a maneira de lidar com mudanÃ§as.</p><p>Falar em espectro nÃ£o significa falar em uma escala simples. Cada pessoa tem uma combinaÃ§Ã£o prÃ³pria de caracterÃ­sticas, apoios, habilidades e modos de participar do mundo. DiagnÃ³stico nÃ£o define quem alguÃ©m Ã© â€” mas pode abrir portas para suporte, acessibilidade e pertencimento.</p><div className="callout"><strong>Uma lente, nÃ£o uma sentenÃ§a</strong><span>O diagnÃ³stico descreve necessidades e possibilidades em determinado momento. Ele nÃ£o limita o futuro nem substitui a escuta da prÃ³pria pessoa.</span></div><h3>Sinais precoces</h3><p>DiferenÃ§as na comunicaÃ§Ã£o, no contato social, na resposta a estÃ­mulos, nos gestos, no brincar e na flexibilidade podem aparecer na infÃ¢ncia. Um sinal isolado nÃ£o confirma autismo. A observaÃ§Ã£o cuidadosa e a avaliaÃ§Ã£o feita por equipe especializada sÃ£o essenciais.</p></div><aside className="visual-note"><Sparkles size={28} /><h3 style={{ marginTop: 32 }}>NÃ£o existe uma Ãºnica maneira de ser autista.</h3><p>A pergunta mais Ãºtil nÃ£o Ã© â€œo que esta pessoa nÃ£o consegue?â€, e sim â€œque apoio torna possÃ­vel sua participaÃ§Ã£o?â€.</p><div className="note-stat">1 <small>espectro, muitas experiÃªncias</small></div></aside></div>
  </div></section>;
}

function Levels() {
  return <section className="section-tint" aria-labelledby="levels-title"><div className="container"><div className="levels"><div><span className="eyebrow">Apoio sem rÃ³tulos rÃ­gidos</span><h2 id="levels-title">TrÃªs nÃ­veis. Um objetivo: apoiar vocÃª.</h2><p className="lede">Os nÃ­veis de suporte indicam quanto apoio uma pessoa pode precisar em diferentes contextos. Eles nÃ£o medem valor, inteligÃªncia ou potencial.</p></div><div className="level-list"><div className="level"><span className="level-dot" /><div><h3>NÃ­vel 1 â€” requer suporte</h3><p>Desafios na comunicaÃ§Ã£o social, organizaÃ§Ã£o e flexibilidade podem exigir adaptaÃ§Ãµes.</p></div></div><div className="level"><span className="level-dot" /><div><h3>NÃ­vel 2 â€” requer suporte substancial</h3><p>DiferenÃ§as mais marcantes podem demandar apoio consistente e comunicaÃ§Ã£o acessÃ­vel.</p></div></div><div className="level"><span className="level-dot" /><div><h3>NÃ­vel 3 â€” requer suporte muito substancial</h3><p>Necessidades intensas de apoio tornam essenciais estratÃ©gias individualizadas e rede articulada.</p></div></div></div></div><div className="symbol-band"><div className="symbol-shape" aria-hidden="true" /><div><span className="eyebrow" style={{ color: 'var(--lilas)' }}>SÃ­mbolos de identificaÃ§Ã£o</span><h3>Identificar para acolher â€” nunca para limitar.</h3><p>O cordÃ£o de girassÃ³is e outros sÃ­mbolos podem sinalizar uma necessidade nÃ£o aparente. Eles nÃ£o sÃ£o obrigatÃ³rios e nÃ£o substituem conversa, privacidade ou consentimento.</p></div></div></div></section>;
}

function HomePage() {
  return <><Welcome /><Carousel /><TeaContent /><Levels /><Explore links={['/inclusao', '/dicas', '/mitos-verdades']} labels={['InclusÃ£o escolar, social e profissional', 'Dicas prÃ¡ticas de convivÃªncia', 'Mitos & verdades']} /></>;
}

function InclusionPage() {
  const areas = [
    ['InclusÃ£o escolar', 'Planejar acessibilidade, comunicaÃ§Ã£o clara e diferentes formas de demonstrar o que se aprendeu.'],
    ['Mercado de trabalho', 'Combinar expectativas, reduzir barreiras sensoriais e reconhecer talentos sem exigir mÃ¡scaras sociais.'],
    ['InclusÃ£o social e familiar', 'Escutar preferÃªncias, respeitar pausas e construir redes de apoio que nÃ£o deixem ninguÃ©m sozinho.'],
  ];
  return <><PageHero eyebrow="InclusÃ£o" title="InclusÃ£o Escolar, Social e Profissional" text="NÃ£o basta estar presente. InclusÃ£o Ã© ter acesso, voz, escolhas, apoio e o direito de participar sem precisar esconder quem se Ã©." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.inclusao} title="InclusÃ£o para alunos verbais e nÃ£o verbais" description="EstratÃ©gias prÃ¡ticas para uma educaÃ§Ã£o inclusiva." /><div className="support-grid light-support">{areas.map(([title, text], i) => <article className="support-item" key={title}><span className="number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="editorial-grid page-copy"><div className="reading-column"><h3>Direitos no Brasil</h3><p>O Estatuto da Pessoa com DeficiÃªncia e a Lei nÂº 12.764/2012 asseguram direitos fundamentais Ã s pessoas autistas, incluindo educaÃ§Ã£o, saÃºde, trabalho, acessibilidade e proteÃ§Ã£o contra discriminaÃ§Ã£o.</p><div className="callout"><strong>A CipTEA</strong><span>A Carteira de IdentificaÃ§Ã£o da Pessoa com TEA facilita o acesso a prioridades e serviÃ§os. Conhecer a legislaÃ§Ã£o fortalece a autonomia para reivindicar direitos.</span></div></div><div><h3>TrÃªs atitudes possÃ­veis hoje</h3><ol className="number-list"><li><span className="number">01</span><span><strong>Pergunte, nÃ£o presuma.</strong><br />A pessoa Ã© a melhor fonte sobre suas necessidades.</span></li><li><span className="number">02</span><span><strong>OfereÃ§a alternativas.</strong><br />Mais de um caminho pode levar Ã  participaÃ§Ã£o.</span></li><li><span className="number">03</span><span><strong>Repare as barreiras.</strong><br />O ambiente tambÃ©m precisa mudar.</span></li></ol></div></div></div></section></>;
}

function TipsPage() {
  const tips = [
    ['ComunicaÃ§Ã£o clara e direta', 'Use frases curtas, concretas e literais. DÃª instruÃ§Ãµes passo a passo, confirme a compreensÃ£o e aceite diferentes formas de resposta.', 'var(--coral)', <Volume2 size={18} />],
    ['Rotina e previsibilidade', 'Avise com antecedÃªncia quando algo for mudar. CalendÃ¡rios, imagens e combinados ajudam a tornar as transiÃ§Ãµes mais compreensÃ­veis.', 'var(--solar)', <Play size={18} />],
    ['Ambiente sensorial', 'Observe sons, luzes, cheiros e texturas. OfereÃ§a pausas, fones, luz mais baixa ou um lugar tranquilo â€” sem transformar apoio em obrigaÃ§Ã£o.', 'var(--menta)', <HeartHandshake size={18} />],
    ['Autonomia', 'OfereÃ§a tempo, pistas, ferramentas e oportunidades para que a pessoa participe do prÃ³prio cuidado, da rotina e das decisÃµes.', 'var(--lilas)', <Sparkles size={18} />],
  ] as const;
  return <><PageHero eyebrow="Dicas prÃ¡ticas" title="Apoio que cabe na vida real." text="Pequenas adaptaÃ§Ãµes fazem diferenÃ§a quando sÃ£o construÃ­das com a pessoa, e nÃ£o aplicadas sobre ela." /><section className="section-tint"><div className="container"><VideoBlock src={localVideos.dicas} title="Dicas de convivÃªncia" description="Acolhimento, comunicaÃ§Ã£o e suporte no cotidiano." /><div className="tiles">{tips.map(([title, text, color, icon]) => <article className="tile" key={title}><div className="tile-mark" style={{ background: color }}>{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="callout page-callout"><strong>Antes de intervir, observe</strong><span>Um comportamento pode comunicar dor, cansaÃ§o, sobrecarga, necessidade de pausa ou dificuldade de entender uma situaÃ§Ã£o. Olhar para o contexto muda a resposta.</span></div></div></section></>;
}

function CulturePage() {
  return <><PageHero eyebrow="Cultura & representatividade" title="Arte, cinema e literatura no espectro." text="A representatividade amplia a compreensÃ£o do autismo quando inclui as vozes e experiÃªncias de pessoas autistas." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.cultura} title="Autismo na arte e na cultura" description="Representatividade e expressÃ£o neurodiversa." /><div className="culture-grid"><div><h3>Livros para comeÃ§ar</h3><div className="book-list"><div className="book"><strong>O CÃ©rebro Autista</strong><span>Temple Grandin e Richard Panek</span></div><div className="book"><strong>O Que Me Faz Pular</strong><span>Naoki Higashida</span></div><div className="book"><strong>Neurotribes</strong><span>Steve Silberman</span></div><div className="book"><strong>Meu Menino Vadio</strong><span>Luiz Fernando Vianna</span></div></div></div><div><h3>Filmes e sÃ©ries</h3><div className="book-list"><div className="book"><strong>Atypical</strong><span>SÃ©rie</span></div><div className="book"><strong>The Good Doctor</strong><span>SÃ©rie</span></div><div className="book"><strong>Amor no Espectro</strong><span>SÃ©rie documental</span></div><div className="book"><strong>Mary e Max</strong><span>AnimaÃ§Ã£o</span></div></div></div></div><div className="editorial-grid page-copy"><div className="reading-column"><h3>Representatividade importa</h3><p>Temple Grandin Ã© uma cientista e ativista que transformou sua experiÃªncia e seu conhecimento em contribuiÃ§Ãµes para a ciÃªncia e para a comunidade autista. A produÃ§Ã£o cultural autista contemporÃ¢nea Ã© ainda mais ampla, diversa e autoral.</p></div><div className="callout"><strong>Olhar crÃ­tico</strong><span>Uma obra pode abrir conversas, mas nÃ£o substitui a escuta de pessoas autistas nem deve ser tomada como retrato universal do espectro.</span></div></div></div></section></>;
}

function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const submit = () => { if (Object.keys(answers).length < questions.length) return; setScore(questions.reduce((sum, question, i) => sum + (answers[i] === question.answer ? 1 : 0), 0)); setSubmitted(true); };
  return <><PageHero eyebrow="Mitos & verdades" title="CiÃªncia contra a desinformaÃ§Ã£o." text="A informaÃ§Ã£o precisa ajuda a combater preconceitos e construir uma participaÃ§Ã£o mais justa." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.mitos} title="Mitos e verdades sobre o autismo" description="O que a ciÃªncia diz sobre o TEA." /><div className="quiz-shell"><div className="quiz-intro"><span className="eyebrow">Teste seus conhecimentos</span><h2>InformaÃ§Ã£o tambÃ©m se pratica.</h2><p className="lede">NÃ£o Ã© prova: Ã© um convite para rever ideias e continuar aprendendo.</p><div className="score-note">{submitted ? `${score}/${questions.length}` : questions.length}<small>{submitted ? 'pontuaÃ§Ã£o final' : 'perguntas para pensar'}</small></div></div><div><div className="quiz-result" aria-live="polite"><strong>{submitted ? `VocÃª acertou ${score} de ${questions.length}.` : 'Antes de responder'}</strong><p>{submitted ? (score >= 3 ? 'Ã“timo ponto de partida. Continue ouvindo as experiÃªncias da comunidade.' : 'Toda resposta Ã© uma oportunidade de aprender.') : 'Escolha uma alternativa para cada questÃ£o. O feedback aparece depois do envio.'}</p></div>{questions.map((question, i) => <fieldset className={`question ${submitted ? answers[i] === question.answer ? 'correct' : 'incorrect' : ''}`} key={question.text}><legend>{i + 1}. {question.text}</legend><div className="options">{question.options.map((option, oi) => <label className="option" key={option}><input type="radio" name={`question-${i}`} checked={answers[i] === oi} onChange={() => setAnswers({ ...answers, [i]: oi })} />{option}</label>)}</div>{submitted && <div className="quiz-feedback"><strong>{answers[i] === question.answer ? 'Resposta correta. ' : 'Vale revisar. '}</strong>{question.feedback}</div>}</fieldset>)}<button className="button button-blue" onClick={submit}><Check size={17} /> Ver meu resultado</button>{Object.keys(answers).length < questions.length && <p className="caption">Responda todas as perguntas para ver o resultado.</p>}</div></div></div></section></>;
}

function AboutPage() {
  return <><PageHero eyebrow="Sobre o projeto" title="Feito com pesquisa. Guiado por escuta." text="O ConnecTismo nasceu como Trabalho de ConclusÃ£o de Curso de Emilly Ravanello para aproximar informaÃ§Ã£o confiÃ¡vel de quem vive o TEA em suas muitas dimensÃµes." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.sobre} title="A importÃ¢ncia da conscientizaÃ§Ã£o" description="Por que falar sobre TEA transforma vidas." /><div className="about-layout"><figure className="portrait"><img src="/assets/photos/p/Foto de Pietro Miranda (15).jpg" alt="Registro fotogrÃ¡fico do acervo prÃ³prio do projeto" /><figcaption className="caption">Imagem do acervo prÃ³prio enviado para o projeto.</figcaption></figure><div className="reading-column"><h3>Uma publicaÃ§Ã£o educativa autoral</h3><p>O portal reÃºne conteÃºdos sobre sinais precoces, nÃ­veis de suporte, inclusÃ£o escolar e profissional, comunicaÃ§Ã£o, rotina, ambiente sensorial, autonomia, cultura e direitos.</p><p>A metodologia combinou revisÃ£o bibliogrÃ¡fica, anÃ¡lise da legislaÃ§Ã£o brasileira sobre TEA e atenÃ§Ã£o Ã s experiÃªncias da comunidade. InformaÃ§Ã£o precisa nÃ£o precisa ser fria: ela pode acolher sem perder rigor.</p><div className="values"><div className="value"><strong>Empatia</strong><p>ComeÃ§ar pelo lugar e pela experiÃªncia da pessoa.</p></div><div className="value"><strong>PrecisÃ£o</strong><p>Buscar fontes cientÃ­ficas, legislaÃ§Ã£o e contexto.</p></div><div className="value"><strong>InclusÃ£o</strong><p>Transformar presenÃ§a em participaÃ§Ã£o real.</p></div><div className="value"><strong>Neurodiversidade</strong><p>Celebrar diferentes formas de funcionar.</p></div></div><div className="callout"><strong>Fontes para continuar</strong><span>DSM-5; Lei nÂº 12.764/2012; Lei nÂº 13.977/2020; Lei Brasileira de InclusÃ£o; CID-11/OMS; AssociaÃ§Ã£o Brasileira de Autismo.</span></div><a className="button button-primary" href="mailto:contato@connectismo.com.br">Falar com o projeto <ArrowRight size={16} /></a></div></div></div></section></>;
}

function Explore({ links, labels }: { links: string[]; labels: string[] }) {
  return <div className="container explore"><span className="eyebrow">Continue explorando</span><div className="explore-links">{links.map((href, i) => <a className="explore-link" href={href} key={href}>{labels[i]} <ArrowRight size={14} /></a>)}</div></div>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-grid"><div><a className="brand" href="/" style={{ color: 'white' }}><span>Connec</span><span className="brand-pill">Tismo</span></a><p style={{ maxWidth: 280, marginTop: 18 }}>InformaÃ§Ã£o precisa para construir uma sociedade mais empÃ¡tica com a comunidade autista.</p></div><div><h3>NavegaÃ§Ã£o</h3><ul>{pages.map((page) => <li key={page.key}><a href={page.href}>{page.label}</a></li>)}</ul></div><div><h3>ConteÃºdo</h3><ul><li><a href="/inclusao">InclusÃ£o escolar</a></li><li><a href="/dicas">Dicas de comunicaÃ§Ã£o</a></li><li><a href="/cultura">Livros e filmes</a></li><li><a href="/mitos-verdades">Quiz TEA</a></li></ul></div><div><h3>Contato</h3><p>Tem uma dÃºvida, sugestÃ£o ou histÃ³ria para compartilhar?</p><a href="mailto:contato@connectismo.com.br" style={{ color: 'var(--solar)', fontWeight: 700 }}>contato@connectismo.com.br</a><p style={{ marginTop: 14 }}>Projeto TCC de Emilly Ravanello.</p></div></div><div className="footer-bottom"><span>Â© 2026 ConnecTismo. Todos os direitos reservados.</span><a href="/">Voltar ao inÃ­cio <ArrowDown size={13} style={{ transform: 'rotate(180deg)', verticalAlign: 'middle' }} /></a></div></div></footer>;
}

function App() {
  const activePage = currentPage();
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  useEffect(() => {
    const titles: Record<PageKey, string> = { inicio: 'ConnecTismo â€” Universo TEA', inclusao: 'InclusÃ£o â€” ConnecTismo', dicas: 'Dicas prÃ¡ticas â€” ConnecTismo', cultura: 'Cultura & representatividade â€” ConnecTismo', mitos: 'Mitos & verdades â€” ConnecTismo', sobre: 'Sobre o projeto â€” ConnecTismo' };
    document.title = titles[activePage];
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePage]);
  const content = activePage === 'inicio' ? <HomePage /> : activePage === 'inclusao' ? <InclusionPage /> : activePage === 'dicas' ? <TipsPage /> : activePage === 'cultura' ? <CulturePage /> : activePage === 'mitos' ? <QuizPage /> : <AboutPage />;
  return <><Header activePage={activePage} onAccessibility={() => setAccessibilityOpen(true)} /><main id="conteudo">{content}</main><Footer /><Accessibility forceOpen={accessibilityOpen} /></>;
}

export default App;
