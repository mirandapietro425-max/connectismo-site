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
  { key: 'inicio', href: '/', label: 'Início' },
  { key: 'inclusao', href: '/inclusao', label: 'Inclusão' },
  { key: 'dicas', href: '/dicas', label: 'Dicas práticas' },
  { key: 'cultura', href: '/cultura', label: 'Cultura & representatividade' },
  { key: 'mitos', href: '/mitos-verdades', label: 'Mitos & verdades' },
  { key: 'sobre', href: '/sobre', label: 'Sobre' },
];

const localVideos = {
  inclusao: '/assets/videos/Estratégias para Autismo_ Como INCLUIR ALUNOS VERBAIS e NÃO-VERBAIS.mp4',
  dicas: '/assets/videos/videoplayback (1).mp4',
  cultura: '/assets/videos/videoplayback.mp4',
  mitos: '/assets/videos/videoplayback (2).mp4',
  sobre: '/assets/videos/videoplayback (3).mp4',
};

const questions = [
  {
    text: 'O autismo é uma doença que precisa ser curada?',
    options: ['Sim, sempre precisa desaparecer.', 'Não. É uma condição do neurodesenvolvimento e o apoio deve respeitar a pessoa.', 'Apenas na infância.'],
    answer: 1,
    feedback: 'TEA é uma condição do neurodesenvolvimento. O cuidado deve ampliar participação, comunicação e bem-estar, sem apagar identidades.',
  },
  {
    text: 'Toda pessoa autista apresenta as mesmas características?',
    options: ['Sim, os sinais são iguais.', 'Somente pessoas não verbais são autistas.', 'Não. O espectro é amplo e cada pessoa tem uma forma singular de se comunicar e viver.'],
    answer: 2,
    feedback: 'A diversidade é parte do espectro. Necessidades de suporte, interesses, comunicação e autonomia variam.',
  },
  {
    text: 'Uma mudança na rotina pode ser apoiada de que forma?',
    options: ['Avisando antes, usando pistas visuais e explicando o que vai acontecer.', 'Fazendo a mudança de surpresa.', 'Ignorando o desconforto.'],
    answer: 0,
    feedback: 'Previsibilidade, avisos e recursos visuais tornam transições mais compreensíveis e acolhedoras.',
  },
  {
    text: 'A comunicação alternativa substitui necessariamente a fala?',
    options: ['Sim, por isso não deve ser oferecida.', 'Não. Ela pode complementar ou oferecer outro caminho de comunicação.', 'Só pode ser usada por profissionais.'],
    answer: 1,
    feedback: 'Comunicação é direito. Recursos alternativos e aumentativos podem complementar a fala ou ser o principal meio de expressão.',
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
      <a className="skip-link" href="#conteudo">Ir ao conteúdo</a>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="ConnecTismo, página inicial">
          <span>Connec</span><span className="brand-pill">Tismo</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
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
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-label="Navegação móvel">
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
      {open && <div className="accessibility-panel" role="dialog" aria-label="Opções de acessibilidade">
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
      <div className="video-frame"><video controls preload="metadata" width="100%"><source src={src} type="video/mp4" />Seu navegador não consegue reproduzir este vídeo local.</video></div>
      <p className="caption">Vídeo local do acervo enviado para o ConnecTismo.</p>
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></div>;
}

function Welcome() {
  return <section className="hero" aria-labelledby="hero-title"><div className="hero-content reveal">
    <span className="eyebrow" style={{ color: '#F5A623' }}>Portal educativo sobre autismo</span>
    <h1 id="hero-title">Conexão além do espectro.</h1>
    <p>Informação acolhedora, ciência e caminhos práticos para construir mais compreensão no cotidiano.</p>
    <div className="hero-meta"><a className="button button-primary" href="#tea">Começar a explorar <ArrowDown size={16} /></a><a className="button button-ghost" href="/sobre">Conheça o projeto</a></div>
    <div className="hero-meta" aria-label="Para quem é o portal"><span className="meta-chip">Famílias</span><span className="meta-chip">Educadores</span><span className="meta-chip">Profissionais</span><span className="meta-chip">Pessoas autistas</span></div>
  </div></section>;
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const slides = [
    { title: 'Educação que considera todos os caminhos', text: 'Aprender pode acontecer com imagens, movimento, interesse, repetição, silêncio e tempo.', href: '/inclusao', art: 'one' },
    { title: 'Acessibilidade é uma prática diária', text: 'O ambiente pode acolher diferenças sensoriais, comunicacionais e de ritmo.', href: '/dicas', art: 'two' },
    { title: 'Representatividade também educa', text: 'Quando pessoas autistas contam suas próprias histórias, ampliamos o que imaginamos ser possível.', href: '/cultura', art: 'three' },
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
    <div className="carousel-controls"><button aria-label="Slide anterior" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}><ArrowLeft size={17} /></button><button aria-label={playing ? 'Pausar carrossel' : 'Reproduzir carrossel'} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><button aria-label="Próximo slide" onClick={() => setIndex((index + 1) % slides.length)}><ArrowRight size={17} /></button></div>
  </section>;
}

function TeaContent() {
  return <section id="tea" className="section-paper" aria-labelledby="tea-title"><div className="container">
    <div className="section-head"><div><span className="eyebrow">Primeiro passo</span><h2 id="tea-title">Entender é uma forma de cuidar.</h2><p className="lede">O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento. Informação de qualidade abre espaço para escuta, direitos e participação.</p></div><span className="eyebrow" style={{ color: 'var(--coral)' }}>01 / 03</span></div>
    <div className="editorial-grid"><div className="reading-column"><h3>O que é o TEA?</h3><p>O autismo acompanha a pessoa ao longo da vida e se manifesta de formas diversas. Ele pode influenciar a comunicação, a interação social, o processamento sensorial, os interesses e a maneira de lidar com mudanças.</p><p>Falar em espectro não significa falar em uma escala simples. Cada pessoa tem uma combinação própria de características, apoios, habilidades e modos de participar do mundo. Diagnóstico não define quem alguém é — mas pode abrir portas para suporte, acessibilidade e pertencimento.</p><div className="callout"><strong>Uma lente, não uma sentença</strong><span>O diagnóstico descreve necessidades e possibilidades em determinado momento. Ele não limita o futuro nem substitui a escuta da própria pessoa.</span></div><h3>Sinais precoces</h3><p>Diferenças na comunicação, no contato social, na resposta a estímulos, nos gestos, no brincar e na flexibilidade podem aparecer na infância. Um sinal isolado não confirma autismo. A observação cuidadosa e a avaliação feita por equipe especializada são essenciais.</p></div><aside className="visual-note"><Sparkles size={28} /><h3 style={{ marginTop: 32 }}>Não existe uma única maneira de ser autista.</h3><p>A pergunta mais útil não é “o que esta pessoa não consegue?”, e sim “que apoio torna possível sua participação?”.</p><div className="note-stat">1 <small>espectro, muitas experiências</small></div></aside></div>
  </div></section>;
}

function Levels() {
  return <section className="section-tint" aria-labelledby="levels-title"><div className="container"><div className="levels"><div><span className="eyebrow">Apoio sem rótulos rígidos</span><h2 id="levels-title">Três níveis. Um objetivo: apoiar você.</h2><p className="lede">Os níveis de suporte indicam quanto apoio uma pessoa pode precisar em diferentes contextos. Eles não medem valor, inteligência ou potencial.</p></div><div className="level-list"><div className="level"><span className="level-dot" /><div><h3>Nível 1 — requer suporte</h3><p>Desafios na comunicação social, organização e flexibilidade podem exigir adaptações.</p></div></div><div className="level"><span className="level-dot" /><div><h3>Nível 2 — requer suporte substancial</h3><p>Diferenças mais marcantes podem demandar apoio consistente e comunicação acessível.</p></div></div><div className="level"><span className="level-dot" /><div><h3>Nível 3 — requer suporte muito substancial</h3><p>Necessidades intensas de apoio tornam essenciais estratégias individualizadas e rede articulada.</p></div></div></div></div><div className="symbol-band"><div className="symbol-shape" aria-hidden="true" /><div><span className="eyebrow" style={{ color: 'var(--lilas)' }}>Símbolos de identificação</span><h3>Identificar para acolher — nunca para limitar.</h3><p>O cordão de girassóis e outros símbolos podem sinalizar uma necessidade não aparente. Eles não são obrigatórios e não substituem conversa, privacidade ou consentimento.</p></div></div></div></section>;
}

function HomePage() {
  return <><Welcome /><Carousel /><TeaContent /><Levels /><Explore links={['/inclusao', '/dicas', '/mitos-verdades']} labels={['Inclusão escolar, social e profissional', 'Dicas práticas de convivência', 'Mitos & verdades']} /></>;
}

function InclusionPage() {
  const areas = [
    ['Inclusão escolar', 'Planejar acessibilidade, comunicação clara e diferentes formas de demonstrar o que se aprendeu.'],
    ['Mercado de trabalho', 'Combinar expectativas, reduzir barreiras sensoriais e reconhecer talentos sem exigir máscaras sociais.'],
    ['Inclusão social e familiar', 'Escutar preferências, respeitar pausas e construir redes de apoio que não deixem ninguém sozinho.'],
  ];
  return <><PageHero eyebrow="Inclusão" title="Inclusão Escolar, Social e Profissional" text="Não basta estar presente. Inclusão é ter acesso, voz, escolhas, apoio e o direito de participar sem precisar esconder quem se é." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.inclusao} title="Inclusão para alunos verbais e não verbais" description="Estratégias práticas para uma educação inclusiva." /><div className="support-grid light-support">{areas.map(([title, text], i) => <article className="support-item" key={title}><span className="number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="editorial-grid page-copy"><div className="reading-column"><h3>Direitos no Brasil</h3><p>O Estatuto da Pessoa com Deficiência e a Lei nº 12.764/2012 asseguram direitos fundamentais às pessoas autistas, incluindo educação, saúde, trabalho, acessibilidade e proteção contra discriminação.</p><div className="callout"><strong>A CipTEA</strong><span>A Carteira de Identificação da Pessoa com TEA facilita o acesso a prioridades e serviços. Conhecer a legislação fortalece a autonomia para reivindicar direitos.</span></div></div><div><h3>Três atitudes possíveis hoje</h3><ol className="number-list"><li><span className="number">01</span><span><strong>Pergunte, não presuma.</strong><br />A pessoa é a melhor fonte sobre suas necessidades.</span></li><li><span className="number">02</span><span><strong>Ofereça alternativas.</strong><br />Mais de um caminho pode levar à participação.</span></li><li><span className="number">03</span><span><strong>Repare as barreiras.</strong><br />O ambiente também precisa mudar.</span></li></ol></div></div></div></section></>;
}

function TipsPage() {
  const tips = [
    ['Comunicação clara e direta', 'Use frases curtas, concretas e literais. Dê instruções passo a passo, confirme a compreensão e aceite diferentes formas de resposta.', 'var(--coral)', <Volume2 size={18} />],
    ['Rotina e previsibilidade', 'Avise com antecedência quando algo for mudar. Calendários, imagens e combinados ajudam a tornar as transições mais compreensíveis.', 'var(--solar)', <Play size={18} />],
    ['Ambiente sensorial', 'Observe sons, luzes, cheiros e texturas. Ofereça pausas, fones, luz mais baixa ou um lugar tranquilo — sem transformar apoio em obrigação.', 'var(--menta)', <HeartHandshake size={18} />],
    ['Autonomia', 'Ofereça tempo, pistas, ferramentas e oportunidades para que a pessoa participe do próprio cuidado, da rotina e das decisões.', 'var(--lilas)', <Sparkles size={18} />],
  ] as const;
  return <><PageHero eyebrow="Dicas práticas" title="Apoio que cabe na vida real." text="Pequenas adaptações fazem diferença quando são construídas com a pessoa, e não aplicadas sobre ela." /><section className="section-tint"><div className="container"><VideoBlock src={localVideos.dicas} title="Dicas de convivência" description="Acolhimento, comunicação e suporte no cotidiano." /><div className="tiles">{tips.map(([title, text, color, icon]) => <article className="tile" key={title}><div className="tile-mark" style={{ background: color }}>{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="callout page-callout"><strong>Antes de intervir, observe</strong><span>Um comportamento pode comunicar dor, cansaço, sobrecarga, necessidade de pausa ou dificuldade de entender uma situação. Olhar para o contexto muda a resposta.</span></div></div></section></>;
}

function CulturePage() {
  return <><PageHero eyebrow="Cultura & representatividade" title="Arte, cinema e literatura no espectro." text="A representatividade amplia a compreensão do autismo quando inclui as vozes e experiências de pessoas autistas." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.cultura} title="Autismo na arte e na cultura" description="Representatividade e expressão neurodiversa." /><div className="culture-grid"><div><h3>Livros para começar</h3><div className="book-list"><div className="book"><strong>O Cérebro Autista</strong><span>Temple Grandin e Richard Panek</span></div><div className="book"><strong>O Que Me Faz Pular</strong><span>Naoki Higashida</span></div><div className="book"><strong>Neurotribes</strong><span>Steve Silberman</span></div><div className="book"><strong>Meu Menino Vadio</strong><span>Luiz Fernando Vianna</span></div></div></div><div><h3>Filmes e séries</h3><div className="book-list"><div className="book"><strong>Atypical</strong><span>Série</span></div><div className="book"><strong>The Good Doctor</strong><span>Série</span></div><div className="book"><strong>Amor no Espectro</strong><span>Série documental</span></div><div className="book"><strong>Mary e Max</strong><span>Animação</span></div></div></div></div><div className="editorial-grid page-copy"><div className="reading-column"><h3>Representatividade importa</h3><p>Temple Grandin é uma cientista e ativista que transformou sua experiência e seu conhecimento em contribuições para a ciência e para a comunidade autista. A produção cultural autista contemporânea é ainda mais ampla, diversa e autoral.</p></div><div className="callout"><strong>Olhar crítico</strong><span>Uma obra pode abrir conversas, mas não substitui a escuta de pessoas autistas nem deve ser tomada como retrato universal do espectro.</span></div></div></div></section></>;
}

function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const submit = () => { if (Object.keys(answers).length < questions.length) return; setScore(questions.reduce((sum, question, i) => sum + (answers[i] === question.answer ? 1 : 0), 0)); setSubmitted(true); };
  return <><PageHero eyebrow="Mitos & verdades" title="Ciência contra a desinformação." text="A informação precisa ajuda a combater preconceitos e construir uma participação mais justa." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.mitos} title="Mitos e verdades sobre o autismo" description="O que a ciência diz sobre o TEA." /><div className="quiz-shell"><div className="quiz-intro"><span className="eyebrow">Teste seus conhecimentos</span><h2>Informação também se pratica.</h2><p className="lede">Não é prova: é um convite para rever ideias e continuar aprendendo.</p><div className="score-note">{submitted ? `${score}/${questions.length}` : questions.length}<small>{submitted ? 'pontuação final' : 'perguntas para pensar'}</small></div></div><div><div className="quiz-result" aria-live="polite"><strong>{submitted ? `Você acertou ${score} de ${questions.length}.` : 'Antes de responder'}</strong><p>{submitted ? (score >= 3 ? 'Ótimo ponto de partida. Continue ouvindo as experiências da comunidade.' : 'Toda resposta é uma oportunidade de aprender.') : 'Escolha uma alternativa para cada questão. O feedback aparece depois do envio.'}</p></div>{questions.map((question, i) => <fieldset className={`question ${submitted ? answers[i] === question.answer ? 'correct' : 'incorrect' : ''}`} key={question.text}><legend>{i + 1}. {question.text}</legend><div className="options">{question.options.map((option, oi) => <label className="option" key={option}><input type="radio" name={`question-${i}`} checked={answers[i] === oi} onChange={() => setAnswers({ ...answers, [i]: oi })} />{option}</label>)}</div>{submitted && <div className="quiz-feedback"><strong>{answers[i] === question.answer ? 'Resposta correta. ' : 'Vale revisar. '}</strong>{question.feedback}</div>}</fieldset>)}<button className="button button-blue" onClick={submit}><Check size={17} /> Ver meu resultado</button>{Object.keys(answers).length < questions.length && <p className="caption">Responda todas as perguntas para ver o resultado.</p>}</div></div></div></section></>;
}

function AboutPage() {
  return <><PageHero eyebrow="Sobre o projeto" title="Feito com pesquisa. Guiado por escuta." text="O ConnecTismo nasceu como Trabalho de Conclusão de Curso de Emilly Ravanello para aproximar informação confiável de quem vive o TEA em suas muitas dimensões." /><section className="section-paper"><div className="container"><VideoBlock src={localVideos.sobre} title="A importância da conscientização" description="Por que falar sobre TEA transforma vidas." /><div className="about-layout"><figure className="portrait"><img src="/assets/photos/p/Foto de Pietro Miranda (15).jpg" alt="Registro fotográfico do acervo próprio do projeto" /><figcaption className="caption">Imagem do acervo próprio enviado para o projeto.</figcaption></figure><div className="reading-column"><h3>Uma publicação educativa autoral</h3><p>O portal reúne conteúdos sobre sinais precoces, níveis de suporte, inclusão escolar e profissional, comunicação, rotina, ambiente sensorial, autonomia, cultura e direitos.</p><p>A metodologia combinou revisão bibliográfica, análise da legislação brasileira sobre TEA e atenção às experiências da comunidade. Informação precisa não precisa ser fria: ela pode acolher sem perder rigor.</p><div className="values"><div className="value"><strong>Empatia</strong><p>Começar pelo lugar e pela experiência da pessoa.</p></div><div className="value"><strong>Precisão</strong><p>Buscar fontes científicas, legislação e contexto.</p></div><div className="value"><strong>Inclusão</strong><p>Transformar presença em participação real.</p></div><div className="value"><strong>Neurodiversidade</strong><p>Celebrar diferentes formas de funcionar.</p></div></div><div className="callout"><strong>Fontes para continuar</strong><span>DSM-5; Lei nº 12.764/2012; Lei nº 13.977/2020; Lei Brasileira de Inclusão; CID-11/OMS; Associação Brasileira de Autismo.</span></div><a className="button button-primary" href="mailto:contato@connectismo.com.br">Falar com o projeto <ArrowRight size={16} /></a></div></div></div></section></>;
}

function Explore({ links, labels }: { links: string[]; labels: string[] }) {
  return <div className="container explore"><span className="eyebrow">Continue explorando</span><div className="explore-links">{links.map((href, i) => <a className="explore-link" href={href} key={href}>{labels[i]} <ArrowRight size={14} /></a>)}</div></div>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-grid"><div><a className="brand" href="/" style={{ color: 'white' }}><span>Connec</span><span className="brand-pill">Tismo</span></a><p style={{ maxWidth: 280, marginTop: 18 }}>Informação precisa para construir uma sociedade mais empática com a comunidade autista.</p></div><div><h3>Navegação</h3><ul>{pages.map((page) => <li key={page.key}><a href={page.href}>{page.label}</a></li>)}</ul></div><div><h3>Conteúdo</h3><ul><li><a href="/inclusao">Inclusão escolar</a></li><li><a href="/dicas">Dicas de comunicação</a></li><li><a href="/cultura">Livros e filmes</a></li><li><a href="/mitos-verdades">Quiz TEA</a></li></ul></div><div><h3>Contato</h3><p>Tem uma dúvida, sugestão ou história para compartilhar?</p><a href="mailto:contato@connectismo.com.br" style={{ color: 'var(--solar)', fontWeight: 700 }}>contato@connectismo.com.br</a><p style={{ marginTop: 14 }}>Projeto TCC de Emilly Ravanello.</p></div></div><div className="footer-bottom"><span>© 2026 ConnecTismo. Todos os direitos reservados.</span><a href="/">Voltar ao início <ArrowDown size={13} style={{ transform: 'rotate(180deg)', verticalAlign: 'middle' }} /></a></div></div></footer>;
}

function App() {
  const activePage = currentPage();
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  useEffect(() => {
    const titles: Record<PageKey, string> = { inicio: 'ConnecTismo — Universo TEA', inclusao: 'Inclusão — ConnecTismo', dicas: 'Dicas práticas — ConnecTismo', cultura: 'Cultura & representatividade — ConnecTismo', mitos: 'Mitos & verdades — ConnecTismo', sobre: 'Sobre o projeto — ConnecTismo' };
    document.title = titles[activePage];
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePage]);
  const content = activePage === 'inicio' ? <HomePage /> : activePage === 'inclusao' ? <InclusionPage /> : activePage === 'dicas' ? <TipsPage /> : activePage === 'cultura' ? <CulturePage /> : activePage === 'mitos' ? <QuizPage /> : <AboutPage />;
  return <><Header activePage={activePage} onAccessibility={() => setAccessibilityOpen(true)} /><main id="conteudo">{content}</main><Footer /><Accessibility forceOpen={accessibilityOpen} /></>;
}

export default App;