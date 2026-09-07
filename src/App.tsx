import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  ArrowDown, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Compass, Eye, GraduationCap, HandHeart, HeartHandshake,
  List, Menu, Play, Sparkles, Volume2, X,
} from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";

type PageKey = "inicio" | "inclusao" | "dicas" | "cultura" | "mitos" | "sobre";
type Page = { key: PageKey; href: string; label: string };

const pages: Page[] = [
  { key: "inicio", href: "/", label: "Início" },
  { key: "inclusao", href: "/inclusao", label: "Inclusão" },
  { key: "dicas", href: "/dicas", label: "Dicas práticas" },
  { key: "cultura", href: "/cultura", label: "Cultura" },
  { key: "mitos", href: "/mitos-verdades", label: "Mitos & verdades" },
  { key: "sobre", href: "/sobre", label: "O projeto" },
];

type LocalVideo = { src: string; poster: string; title: string; description: string; duration: string; context: string };
const localVideos: Record<string, LocalVideo> = {
  inclusion: {
    src: "/assets/videos/estrategias-para-autismo.mp4",
    poster: "/assets/video-posters/estrategias-para-autismo.jpg",
    title: "Estratégias para uma educação inclusiva",
    description: "Ideias para apoiar alunos com diferentes formas de comunicação e participação.",
    duration: "3 min 58 s",
    context: "Escola e aprendizagem",
  },
  convivencia: {
    src: "/assets/videos/videoplayback (1).mp4",
    poster: "/assets/video-posters/videoplayback-1.jpg",
    title: "Convivência e cordão de girassóis",
    description: "Uma conversa sobre identificação, acolhimento e necessidades que nem sempre são visíveis.",
    duration: "2 min 09 s",
    context: "Convivência",
  },
  communication: {
    src: "/assets/videos/videoplayback (3).mp4",
    poster: "/assets/video-posters/videoplayback-3.jpg",
    title: "Escuta, comunicação e respeito",
    description: "Um ponto de partida para observar diferentes maneiras de comunicar e responder.",
    duration: "1 min",
    context: "Comunicação",
  },
  myths: {
    src: "/assets/videos/videoplayback (2).mp4",
    poster: "/assets/video-posters/videoplayback-2.jpg",
    title: "Mitos e verdades sobre o autismo",
    description: "Informação introdutória para separar ideias comuns de conhecimento responsável.",
    duration: "1 min 03 s",
    context: "Checagem de informação",
  },
  learning: {
    src: "/assets/videos/videoplayback.mp4",
    poster: "/assets/video-posters/videoplayback.jpg",
    title: "Autismo: perguntas para continuar aprendendo",
    description: "Um convite a rever certezas e procurar informação com mais contexto.",
    duration: "5 min 08 s",
    context: "Educação",
  },
};

const books = [
  { title: "O Cérebro Autista", author: "Temple Grandin e Richard Panek", image: "/assets/photos/livros/o-cerebro-autista.jpg" },
  { title: "O Que Me Faz Pular", author: "Naoki Higashida", image: "/assets/photos/livros/o-que-me-faz-pular.jpg" },
  { title: "Neurotribes", author: "Steve Silberman", image: "/assets/photos/livros/neurotribes.jpg" },
  { title: "Meu Menino Vadio", author: "Luiz Fernando Vianna", image: "/assets/photos/livros/meu-menino-vadio.jpg" },
];

const series = [
  { title: "Atypical", kind: "Série", description: "Uma narrativa sobre autonomia, família e amadurecimento.", video: "/assets/videos/filmes/atypical-trailer.mp4", poster: "/assets/photos/filmes/atypical-trailer.jpg", duration: "2 min 24 s" },
  { title: "The Good Doctor", kind: "Série", description: "Uma conversa sobre competência, preconceito e pertencimento.", video: "/assets/videos/filmes/the-good-doctor-trailer.mp4", poster: "/assets/photos/filmes/the-good-doctor-trailer.jpg", duration: "2 min 25 s" },
  { title: "Amor no Espectro", kind: "Série documental", description: "Encontros, desejos e diferentes formas de construir relações.", video: "/assets/videos/filmes/amor-no-espectro-trailer.mp4", poster: "/assets/photos/filmes/amor-no-espectro-trailer.jpg", duration: "2 min 14 s" },
  { title: "Mary e Max", kind: "Animação", description: "Uma amizade improvável atravessada por afeto e neurodiversidade.", video: "/assets/videos/filmes/mary-e-max-trailer.mp4", poster: "/assets/photos/filmes/mary-e-max-trailer.jpg", duration: "2 min 31 s" },
];

const questions = [
  { text: "O autismo é uma doença que precisa ser curada?", options: ["Sim, sempre precisa desaparecer.", "Não. É uma condição do neurodesenvolvimento e o apoio deve respeitar a pessoa.", "Apenas na infância."], answer: 1, feedback: "TEA é uma condição do neurodesenvolvimento. O cuidado deve ampliar participação, comunicação e bem-estar, sem apagar identidades." },
  { text: "Toda pessoa autista apresenta as mesmas características?", options: ["Sim, os sinais são iguais.", "Somente pessoas não verbais são autistas.", "Não. O espectro é amplo e cada pessoa tem uma forma singular de se comunicar e viver."], answer: 2, feedback: "A diversidade é parte do espectro. Necessidades de suporte, interesses, comunicação e autonomia variam." },
  { text: "Uma mudança na rotina pode ser apoiada de que forma?", options: ["Avisando antes, usando pistas visuais e explicando o que vai acontecer.", "Fazendo a mudança de surpresa.", "Ignorando o desconforto."], answer: 0, feedback: "Previsibilidade, avisos e recursos visuais tornam transições mais compreensíveis e acolhedoras." },
  { text: "A comunicação alternativa substitui necessariamente a fala?", options: ["Sim, por isso não deve ser oferecida.", "Não. Ela pode complementar ou oferecer outro caminho de comunicação.", "Só pode ser usada por profissionais."], answer: 1, feedback: "Comunicação é direito. Recursos alternativos e aumentativos podem complementar a fala ou ser o principal meio de expressão." },
];

function SectionKicker({ children }: { children: ReactNode }) {
  return <div className="section-kicker"><span className="eyebrow">{children}</span></div>;
}

function Header({ active }: { active: PageKey }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  return <header className="site-header">
    <a href="#conteudo" className="skip-link">Ir ao conteúdo</a>
    <div className="header-inner">
      <Link href="/" className="brand" data-testid="link-brand" aria-label="ConnecTismo, página inicial"><span>Connec</span><span className="brand-pill">Tismo</span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{pages.map((page) => <Link key={page.key} href={page.href} className="nav-link" data-testid={`link-nav-${page.key}`} aria-current={active === page.key ? "page" : undefined}>{page.label}</Link>)}</nav>
       <div className="header-actions"><JourneyLink href="/inclusao" className="button button-primary header-cta" dataTestId="link-header-start">Começar</JourneyLink><button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Fechar navegação" : "Abrir navegação"} data-testid="button-mobile-menu">{open ? <X size={19} /> : <Menu size={19} />}</button></div>
    </div>
    <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="Navegação móvel">{pages.map((page) => <Link key={page.key} href={page.href} className="nav-link" data-testid={`link-mobile-${page.key}`} aria-current={active === page.key ? "page" : undefined}>{page.label}</Link>)}</nav>
  </header>;
}

function Accessibility() {
  const [open, setOpen] = useState(false);
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => { document.body.classList.toggle("fonte-grande", large); return () => document.body.classList.remove("fonte-grande"); }, [large]);
  useEffect(() => { document.body.classList.toggle("alto-contraste", contrast); return () => document.body.classList.remove("alto-contraste"); }, [contrast]);
  useEffect(() => { document.body.classList.toggle("pausar-movimento", paused); return () => document.body.classList.remove("pausar-movimento"); }, [paused]);
  const choices = [{ label: "Aumentar fonte", value: large, set: setLarge }, { label: "Alto contraste", value: contrast, set: setContrast }, { label: "Pausar movimento", value: paused, set: setPaused }];
  return <div className="accessibility">
    {open && <div className="access-panel" role="dialog" aria-label="Opções de acessibilidade"><h3>Personalize sua leitura</h3>{choices.map((choice) => <button key={choice.label} className="access-choice" aria-pressed={choice.value} onClick={() => choice.set(!choice.value)} data-testid={`button-access-${choice.label.toLowerCase().replaceAll(" ", "-")}`}><span>{choice.label}</span><span className="toggle" aria-hidden="true" /></button>)}</div>}
    <button className="access-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} data-testid="button-accessibility"><Eye size={16} /> Acessibilidade</button>
  </div>;
}

function JourneyLink({ href, children, className = "", dataTestId }: { href: string; children: ReactNode; className?: string; dataTestId?: string }) {
  const [, navigate] = useLocation();
  const [launching, setLaunching] = useState(false);

  function startJourney(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (launching) return;
    setLaunching(true);
    window.setTimeout(() => navigate(href), 850);
  }

  return <>
    <a href={href} className={`${className} journey-link ${launching ? "is-launching" : ""}`} onClick={startJourney} aria-busy={launching} data-testid={dataTestId}>
      {children}
    </a>
    {launching && <div className="journey-transition" role="status" aria-live="polite">
      <div className="journey-orbit" aria-hidden="true" />
      <div className="journey-message"><strong>Vamos começar.</strong><span>Abrindo um novo caminho para você.</span></div>
    </div>}
  </>;
}

function PageHero({ eyebrow, title, text, image, imageAlt, links = [] }: { eyebrow: string; title: string; text: string; image?: string; imageAlt?: string; links?: { href: string; label: string }[] }) {
  return <section className="page-hero"><div className="container reveal"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{links.length > 0 && <nav className="section-nav" aria-label="Nesta página">{links.map((link) => <a href={link.href} key={link.href} data-testid={`link-section-${link.href.slice(1)}`}>{link.label}</a>)}</nav>}</div>{image && <div className="page-hero-image"><img src={image} alt={imageAlt ?? ""} /></div>}</section>;
}

function VideoCard({ video, className = "" }: { video: LocalVideo; className?: string }) {
  return <article className={`video-card ${className}`} data-testid={`video-card-${video.context.toLowerCase().replaceAll(" ", "-")}`}>
    <div className="video-head"><span className="path-icon"><Play size={17} fill="currentColor" /></span><div><div className="video-kicker">{video.context}</div><h3>{video.title}</h3><small>{video.description}</small></div></div>
    <div className="video-frame"><video controls preload="metadata" poster={video.poster} aria-label={`${video.title}. Duração aproximada: ${video.duration}`}><source src={video.src} type="video/mp4" />Seu navegador não consegue reproduzir este vídeo local.</video></div>
    <div className="video-meta"><span><Clock3 size={13} /> {video.duration}</span><span>Vídeo local do acervo</span></div>
  </article>;
}

function EditorialImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  return <figure className="context-image"><img src={src} alt={alt} /><figcaption>{label}</figcaption></figure>;
}

function HomePage() {
  return <>
     <section className="hero" aria-labelledby="hero-title"><div className="container"><div className="hero-content reveal"><span className="eyebrow" style={{ color: "var(--sun)" }}>Portal educativo sobre autismo</span><h1 id="hero-title">Conexão além do espectro.</h1><p className="lede">Informação acolhedora, ciência e caminhos práticos para construir mais compreensão no cotidiano.</p><div className="hero-actions"><JourneyLink href="/inclusao" className="button button-primary" dataTestId="link-explore">Começar a explorar <ArrowDown size={16} /></JourneyLink><Link href="/sobre" className="button button-quiet" data-testid="link-project">Conheça o projeto</Link></div><div className="hero-tags" aria-label="Para quem é o portal"><span className="tag">Famílias</span><span className="tag">Educadores</span><span className="tag">Profissionais</span><span className="tag">Pessoas autistas</span></div></div><div className="hero-side-note"><strong>01</strong>Um lugar para perguntar, aprender e encontrar próximos passos.</div></div></section>
    <div className="marquee" aria-label="Temas do portal"><div className="marquee-track"><span>escuta <i /> acessibilidade <i /> autonomia <i /> representatividade <i /> informação confiável <i /> escuta <i /> acessibilidade <i /> autonomia <i /> representatividade <i /></span></div></div>
    <section className="feature-section" id="destaques"><div className="container"><div className="section-intro"><div><SectionKicker>Destaques</SectionKicker><h2>Comece pelo que você precisa agora.</h2></div><p className="lede">Três portas de entrada para entender, apoiar e ampliar a participação — sem transformar uma pessoa em um diagnóstico.</p></div><div className="feature-grid">
      <Link href="/inclusao" className="feature-card feature-card-large" data-testid="card-feature-educacao"><img src="/assets/editorial/official/inclusao/inclusao_escolar.png" alt="Duas pessoas colaboram em uma atividade de aprendizagem" /><div className="feature-overlay"><span className="eyebrow">01 / educação</span><h3>Aprender é participar.</h3><p>Da sala de aula ao trabalho, acessibilidade começa antes da barreira aparecer.</p><span className="text-link">Ler sobre inclusão <ArrowRight size={15} /></span></div></Link>
      <Link href="/dicas" className="feature-card" data-testid="card-feature-acessibilidade"><img src="/assets/editorial/official/dicas/ambiente_sensorial.png" alt="Ambiente preparado para oferecer uma pausa sensorial" /><div className="feature-overlay"><span className="eyebrow">02 / acessibilidade</span><h3>Apoio que cabe na vida real.</h3><p>Comunicação, rotina e sensorialidade em pequenas mudanças possíveis.</p><span className="text-link">Ver dicas <ArrowRight size={15} /></span></div></Link>
      <Link href="/cultura" className="feature-card" data-testid="card-feature-representacao"><img src="/assets/editorial/official/cultura/cultura_arte_livros.png" alt="Livros e materiais de cultura sobre uma mesa" /><div className="feature-overlay"><span className="eyebrow">03 / representação</span><h3>Mais de uma narrativa.</h3><p>Livros, filmes e vozes autorais para ampliar o repertório.</p><span className="text-link">Explorar cultura <ArrowRight size={15} /></span></div></Link>
    </div></div></section>
    <section className="home-intro" id="primeiro-passo"><div className="container intro-grid"><div><SectionKicker>Primeiro passo</SectionKicker><h2>Conhecer muda o encontro.</h2><p className="intro-aside">TEA não é uma receita sobre como alguém será. É um ponto de partida para perguntar de que apoio cada pessoa precisa.</p></div><div className="intro-copy"><p>O Transtorno do Espectro Autista é uma condição do neurodesenvolvimento. O espectro reúne experiências diversas de comunicação, interação, sensibilidade, interesses e necessidades de apoio.</p><p>Diagnóstico não define quem alguém é — mas pode abrir portas para suporte, acessibilidade e pertencimento. A pergunta mais útil não é “o que esta pessoa não consegue?”, e sim “que apoio torna possível sua participação?”.</p><div className="intro-signature"><span /> informação que chega com cuidado</div></div></div><div className="container intro-photo-row"><figure className="editorial-panel editorial-panel-wide"><img src="/assets/editorial/official/inicio/inicio_conexao.png" alt="Pessoas conversando e colaborando em torno de uma mesa" /><figcaption>Conexão começa quando há espaço para cada jeito de participar.</figcaption></figure><figure className="editorial-panel editorial-panel-tall"><img src="/assets/editorial/official/inicio/inicio_espectro.png" alt="Ilustração com pessoas vivendo diferentes experiências sensoriais e de comunicação" /><figcaption>Um espectro, muitas experiências.</figcaption></figure></div></section>
    <section className="signs-section" id="sinais"><div className="container signs-grid"><div><SectionKicker>Observar sem rotular</SectionKicker><h2>Sinais pedem escuta, não conclusões rápidas.</h2><p className="lede">Diferenças na comunicação, na interação, no processamento sensorial ou na necessidade de previsibilidade podem aparecer de muitos modos. Uma lista não diagnostica ninguém.</p><Link href="/sobre" className="button button-dark" data-testid="link-signs-about">Entender o projeto <ArrowRight size={16} /></Link></div><div className="signs-list"><div><span className="number">01</span><p>Formas próprias de comunicar, brincar, aprender ou demonstrar interesse.</p></div><div><span className="number">02</span><p>Maior ou menor sensibilidade a sons, luzes, cheiros, texturas e movimento.</p></div><div><span className="number">03</span><p>Necessidade de previsibilidade, repetição ou tempo diferente para transições.</p></div><small>Se houver preocupação com desenvolvimento ou bem-estar, procure avaliação e orientação profissional.</small></div></div></section>
    <section className="home-band" id="suporte"><div className="container band-grid"><div><SectionKicker>Um espectro, muitas experiências</SectionKicker><h2>Suporte não mede valor.</h2><p className="lede">Os níveis de suporte indicam quanto apoio uma pessoa pode precisar em diferentes contextos. Não são rótulos fixos e não medem inteligência, potencial ou importância.</p></div><div className="stat-row"><div className="stat"><strong>01</strong><span>pode requerer suporte</span><small>em alguns contextos</small></div><div className="stat"><strong>02</strong><span>pode requerer suporte substancial</span><small>de forma mais frequente</small></div><div className="stat"><strong>03</strong><span>pode requerer suporte muito substancial</span><small>em diferentes ambientes</small></div></div></div><div className="container crossing-strip"><img src="/assets/editorial/variadas/inicio/variadas_inicio_caminhos.png" alt="Pessoas seguindo juntas por um caminho" /><span>participar é um caminho compartilhado</span></div></section>
    <section className="identity-section"><div className="container identity-grid"><img src="/assets/editorial/official/inicio/cordao_girassois.png" alt="Cordão de girassóis usado como símbolo de necessidades não aparentes" /><div><SectionKicker>Identificação</SectionKicker><h2>Nem toda necessidade é visível.</h2><p>O cordão de girassóis é um símbolo adotado por algumas pessoas com deficiências ocultas para sinalizar que podem precisar de mais tempo, informação clara ou ajuda. Usá-lo é uma escolha individual; não é obrigação nem substitui perguntar com respeito.</p><Link href="/inclusao" className="text-link dark-link" data-testid="link-identity-inclusion">Ver inclusão na prática <ArrowRight size={15} /></Link></div></div></section>
    <section className="quote-section"><div className="container quote-wrap"><blockquote className="quote"><span className="quote-mark">“</span> Acessibilidade não é um favor. É uma forma de tornar a participação possível.</blockquote><p className="quote-note">O ambiente também precisa mudar. Pergunte, não presuma; ofereça alternativas; repare as barreiras.</p></div></section>
    <section className="home-footer-cta"><div className="container"><SectionKicker>Continue a conversa</SectionKicker><h2>Uma dúvida pode ser o primeiro passo.</h2><div className="cta-row"><Link href="/mitos-verdades" className="button button-dark" data-testid="link-home-quiz">Testar ideias <CircleHelp size={16} /></Link><Link href="/dicas" className="button button-quiet" data-testid="link-home-tips">Ir para dicas <ArrowRight size={16} /></Link></div></div></section>
  </>;
}

function InclusionPage() {
  return <><PageHero eyebrow="Inclusão" title="Não basta estar presente." text="Inclusão é ter acesso, voz, escolhas, apoio e o direito de participar sem precisar esconder quem se é." image="/assets/editorial/novas/inclusao/connectismo_inclusao.png" links={[{ href: "#contextos", label: "Contextos" }, { href: "#direitos", label: "Direitos" }, { href: "#atitudes", label: "Atitudes" }]} /><section className="page-body"><div className="container page-layout"><aside className="page-sticky"><SectionKicker>Participação</SectionKicker><h2>O mundo também pode se adaptar.</h2><p className="lede">A escola, o trabalho e os espaços sociais ficam melhores quando diferentes formas de estar são previstas desde o início.</p><div className="reading-progress"><span>Você está em</span><strong>Inclusão</strong><small>1 de 5 temas</small></div></aside><div className="page-copy"><VideoCard video={localVideos.inclusion} /><div className="content-heading" id="contextos"><SectionKicker>Onde acontece</SectionKicker><h2>O contexto muda. O direito de participar, não.</h2></div><div className="image-topic-grid"><EditorialImage src="/assets/editorial/official/inclusao/inclusao_escolar.png" alt="Pessoa aprendendo em um ambiente escolar colaborativo" label="Escola: diferentes formas de demonstrar o que se aprendeu." /><EditorialImage src="/assets/editorial/official/inclusao/inclusao_trabalho.png" alt="Pessoas colaborando em um ambiente profissional" label="Trabalho: combinar expectativas e reduzir barreiras." /><EditorialImage src="/assets/editorial/official/inclusao/inclusao_social.png" alt="Pessoas convivendo em uma situação social" label="Vida social: escutar preferências e respeitar pausas." /></div><div className="support-grid"><article className="support-item"><span className="number">01</span><h3>Inclusão escolar</h3><p>Planejar acessibilidade, comunicação clara e diferentes formas de demonstrar o que se aprendeu.</p></article><article className="support-item"><span className="number">02</span><h3>Mercado de trabalho</h3><p>Combinar expectativas, reduzir barreiras sensoriais e reconhecer talentos sem exigir máscaras sociais.</p></article><article className="support-item"><span className="number">03</span><h3>Vida social e familiar</h3><p>Escutar preferências, respeitar pausas e construir redes de apoio que não deixem ninguém sozinho.</p></article></div><div id="direitos" className="content-heading"><SectionKicker>Direitos</SectionKicker><h2>Informação fortalece escolhas.</h2></div><p>O Estatuto da Pessoa com Deficiência e a Lei nº 12.764/2012 asseguram direitos fundamentais às pessoas autistas, incluindo educação, saúde, trabalho, acessibilidade e proteção contra discriminação.</p><div className="callout"><strong>A CipTEA</strong><span>A Carteira de Identificação da Pessoa com TEA facilita o acesso a prioridades e serviços. Conhecer a legislação fortalece a autonomia para reivindicar direitos.</span></div><div id="atitudes" className="content-heading"><SectionKicker>Agora</SectionKicker><h2>Três atitudes possíveis hoje.</h2></div><ol className="number-list"><li><span className="number">01</span><span><strong>Pergunte, não presuma.</strong><br />A pessoa é a melhor fonte sobre suas necessidades.</span></li><li><span className="number">02</span><span><strong>Ofereça alternativas.</strong><br />Mais de um caminho pode levar à participação.</span></li><li><span className="number">03</span><span><strong>Repare as barreiras.</strong><br />O ambiente também precisa mudar.</span></li></ol><NextPath href="/dicas" label="Próximo tema" title="Apoio no cotidiano" /></div></div></section></>;
}

function TipsPage() {
  const tips = [
    { title: "Comunicação clara e direta", text: "Use frases curtas, concretas e literais. Dê instruções passo a passo, confirme a compreensão e aceite diferentes formas de resposta.", icon: <Volume2 size={18} />, image: "/assets/editorial/official/dicas/comunicacao_escuta.png" },
    { title: "Rotina e previsibilidade", text: "Avise com antecedência quando algo for mudar. Calendários, imagens e combinados ajudam a tornar as transições mais compreensíveis.", icon: <List size={18} />, image: "/assets/editorial/official/dicas/rotina_previsibilidade.png" },
    { title: "Ambiente sensorial", text: "Observe sons, luzes, cheiros e texturas. Ofereça pausas, fones, luz mais baixa ou um lugar tranquilo — sem transformar apoio em obrigação.", icon: <HeartHandshake size={18} />, image: "/assets/editorial/official/dicas/ambiente_sensorial.png" },
    { title: "Autonomia", text: "Ofereça tempo, pistas, ferramentas e oportunidades para que a pessoa participe do próprio cuidado, da rotina e das decisões.", icon: <HandHeart size={18} />, image: "/assets/editorial/official/dicas/autonomia_apoio.png" },
  ];
  return <><PageHero eyebrow="Dicas práticas" title="Apoio que cabe na vida real." text="Pequenas adaptações fazem diferença quando são construídas com a pessoa, e não aplicadas sobre ela." image="/assets/editorial/novas/dicas/connectismo_dicas.png" links={[{ href: "#estrategias", label: "Estratégias" }, { href: "#videos", label: "Vídeos" }, { href: "#sobrecarga", label: "Sobrecarga" }]} /><section className="page-body"><div className="container page-layout"><aside className="page-sticky"><SectionKicker>No cotidiano</SectionKicker><h2>Observe primeiro. Ajuste depois.</h2><p className="lede">Não existe uma receita única. O apoio bom é individualizado, negociado e pode mudar com o contexto.</p><div className="reading-progress"><span>Você está em</span><strong>Dicas práticas</strong><small>2 de 5 temas</small></div></aside><div className="page-copy"><div id="estrategias" className="content-heading"><SectionKicker>Quatro pistas</SectionKicker><h2>O que ajuda depende da pessoa.</h2></div><div className="tip-grid">{tips.map((tip, index) => <article className="tip-card tip-card-editorial" key={tip.title} data-testid={`card-tip-${index}`}><img src={tip.image} alt="" /><div className="tip-card-content"><span className="path-icon">{tip.icon}</span><h3>{tip.title}</h3><p>{tip.text}</p></div></article>)}</div><div id="videos" className="video-pair"><VideoCard video={localVideos.convivencia} /><VideoCard video={localVideos.communication} /></div><div className="callout"><strong>Uma pista importante</strong><span>Comportamentos são comunicação. Antes de perguntar “como faço parar?”, vale perguntar “o que esta reação está tentando dizer?”</span></div><div id="sobrecarga" className="content-heading"><SectionKicker>Quando a sobrecarga chega</SectionKicker><h2>Segurança e recuperação vêm antes da cobrança.</h2></div><p>Reduza estímulos, fale menos, ofereça tempo e preserve a dignidade. Nem toda crise precisa de explicação imediata. Observe o que ajuda a pessoa a recuperar-se e combine estratégias em um momento tranquilo.</p><NextPath href="/cultura" label="Próximo tema" title="Histórias e representatividade" /></div></div></section></>;
}

function CulturePage() {
  const [bookIndex, setBookIndex] = useState(0);
  const visibleBooks = books.map((_, index) => books[(bookIndex + index) % books.length]);
  return <><PageHero eyebrow="Cultura & representatividade" title="Histórias abrem janelas." text="Livros, filmes e séries podem ampliar repertórios — quando vistos com curiosidade, contexto e olhar crítico." image="/assets/editorial/novas/cultura/connectismo_cultura.png" links={[{ href: "#livros", label: "Livros" }, { href: "#filmes", label: "Filmes e séries" }]} /><section className="page-body"><div className="container page-layout"><aside className="page-sticky"><SectionKicker>Acervo editorial</SectionKicker><h2>Leia com curiosidade. Assista com contexto.</h2><p className="lede">Uma obra pode abrir conversas, mas não substitui a escuta de pessoas autistas nem deve ser tomada como retrato universal do espectro.</p><div className="reading-progress"><span>Você está em</span><strong>Cultura</strong><small>3 de 5 temas</small></div></aside><div className="page-copy"><EditorialImage src="/assets/editorial/variadas/cultura/variadas_cultura_colagem.png" alt="Colagem editorial de livros, filmes e referências culturais" label="Repertório é uma forma de abrir espaço para outras vozes." /><div id="livros" className="content-heading shelf-heading"><div><SectionKicker>Leitura</SectionKicker><h2>Livros para começar.</h2><p className="muted">Perspectivas científicas, autobiográficas e culturais.</p></div><div className="shelf-controls"><button className="icon-button" onClick={() => setBookIndex((bookIndex + books.length - 1) % books.length)} aria-label="Livros anteriores" data-testid="button-books-previous"><ChevronLeft size={17} /></button><button className="icon-button" onClick={() => setBookIndex((bookIndex + 1) % books.length)} aria-label="Próximos livros" data-testid="button-books-next"><ChevronRight size={17} /></button></div></div><div className="culture-shelf">{visibleBooks.map((book) => <article className="book-card" key={book.title}><img src={book.image} alt={`Capa do livro ${book.title}`} /><div className="book-info"><h3>{book.title}</h3><p>{book.author}</p></div></article>)}</div><div id="filmes" className="content-heading"><SectionKicker>Em movimento</SectionKicker><h2>Filmes e séries.</h2><p className="muted">Quatro trailers para assistir com atenção às escolhas de roteiro e representação.</p></div><div className="series-list">{series.map((item) => <article className="series-row" key={item.title}><video controls preload="metadata" poster={item.poster} aria-label={`${item.title}, trailer. Duração aproximada: ${item.duration}`}><source src={item.video} type="video/mp4" />Seu navegador não consegue reproduzir este vídeo local.</video><div className="series-copy"><small>{item.kind} · {item.duration}</small><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><div className="callout"><strong>Representatividade importa</strong><span>A produção cultural autista contemporânea é ampla, diversa e autoral. Procure vozes em primeira pessoa e desconfie de uma única narrativa.</span></div><NextPath href="/mitos-verdades" label="Próximo tema" title="Rever certezas" /></div></div></section></>;
}

function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = questions.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  return <><PageHero eyebrow="Mitos & verdades" title="Ciência contra a desinformação." text="A informação precisa ajuda a combater preconceitos e construir uma participação mais justa." image="/assets/editorial/novas/mitos-verdades/connectismo_mitos.png" links={[{ href: "#contexto", label: "Contexto" }, { href: "#quiz", label: "Quiz TEA" }]} /><section className="page-body"><div className="container page-layout"><aside className="page-sticky"><SectionKicker>Teste seus conhecimentos</SectionKicker><h2>Informação também se pratica.</h2><p className="lede">Não é prova: é um convite para rever ideias e continuar aprendendo.</p><div className="score-note"><span>{submitted ? `${score}/${questions.length}` : questions.length}</span><small>{submitted ? "pontuação final" : "perguntas para pensar"}</small></div><div className="reading-progress"><span>Você está em</span><strong>Mitos & verdades</strong><small>4 de 5 temas</small></div></aside><div className="page-copy"><div id="contexto" className="myths-video-grid"><VideoCard video={localVideos.myths} /><VideoCard video={localVideos.learning} /></div><div className="myths-context"><img src="/assets/editorial/variadas/mitos-verdades/variadas_mitos_laboratorio.png" alt="Mesa com materiais de pesquisa e anotações" /><div><SectionKicker>Antes do quiz</SectionKicker><h2>Uma boa pergunta checa a fonte.</h2><p>Procure informação que reconheça a diversidade do espectro e evite promessas fáceis. Experiência pessoal, pesquisa e orientação profissional podem ocupar lugares diferentes — nenhum deles deve ser usado para apagar a pessoa.</p></div></div><div id="quiz" className="quiz-shell"><div><SectionKicker>Quiz TEA</SectionKicker><h2>Repare nas ideias que chegam até você.</h2><p className="lede">Escolha uma alternativa para cada questão. O feedback aparece depois do envio.</p></div><div><div className="quiz-result" aria-live="polite"><strong>{submitted ? `Você acertou ${score} de ${questions.length}.` : "Antes de responder"}</strong><p>{submitted ? (score >= 3 ? "Ótimo ponto de partida. Continue ouvindo as experiências da comunidade." : "Toda resposta é uma oportunidade de aprender.") : "Responda todas as questões para ver o resultado."}</p></div>{questions.map((question, index) => <fieldset className={`question ${submitted ? answers[index] === question.answer ? "correct" : "incorrect" : ""}`} key={question.text}><legend>{index + 1}. {question.text}</legend><div className="options">{question.options.map((option, optionIndex) => <label className="quiz-option" key={option}><input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} onChange={() => { setSubmitted(false); setAnswers((current) => ({ ...current, [index]: optionIndex })); }} />{option}</label>)}</div>{submitted && <div className="quiz-feedback"><strong>{answers[index] === question.answer ? "Resposta correta. " : "Vale revisar. "}</strong>{question.feedback}</div>}</fieldset>)}<button className="button button-primary" onClick={() => { if (Object.keys(answers).length === questions.length) setSubmitted(true); }} disabled={Object.keys(answers).length < questions.length} data-testid="button-submit-quiz"><Check size={17} /> Ver meu resultado</button></div></div><NextPath href="/sobre" label="Último tema" title="Conheça os critérios do projeto" /></div></div></section></>;
}

function AboutPage() {
  return <><PageHero eyebrow="O projeto" title="Um guia feito para aproximar." text="ConnecTismo reúne educação, escuta e repertório para tornar conversas sobre autismo mais informadas, respeitosas e possíveis." image="/assets/editorial/official/sobre/sobre_bastidores.png" links={[{ href: "#metodo", label: "Método" }, { href: "#navegar", label: "Como navegar" }]} /><section className="page-body"><div className="container page-layout"><aside className="page-sticky"><SectionKicker>Por que existe</SectionKicker><h2>Informação também é acessibilidade.</h2><p className="lede">Este portal foi pensado como uma biblioteca viva: direta o bastante para o cotidiano, cuidadosa o bastante para não reduzir ninguém a uma definição.</p><div className="reading-progress"><span>Você está em</span><strong>O projeto</strong><small>5 de 5 temas</small></div></aside><div className="page-copy"><div className="about-note"><h2>Uma publicação educativa aberta à conversa.</h2><p>O projeto organiza conteúdos sobre inclusão, cotidiano, cultura e desinformação em uma experiência visual acolhedora. Não substitui avaliação clínica, orientação jurídica ou acompanhamento profissional.</p></div><div id="metodo" className="about-values"><article className="value-card"><span className="eyebrow">01 / método</span><h3>Pesquisa antes da opinião</h3><p>Textos de referência e linguagem clara ajudam a transformar informação em escolha.</p></article><article className="value-card"><span className="eyebrow">02 / escuta</span><h3>Nada sobre pessoas sem pessoas</h3><p>Experiências são diversas. O portal convida à escuta da pessoa autista como fonte essencial.</p></article><article className="value-card"><span className="eyebrow">03 / prática</span><h3>Próximos passos possíveis</h3><p>Uma boa ideia precisa caber na escola, em casa, no trabalho e nas relações.</p></article></div><div id="navegar" className="content-heading"><SectionKicker>Como navegar por aqui</SectionKicker><h2>Volte quando o momento mudar.</h2></div><p>Comece pelo tema que mais se aproxima do seu momento. Consulte as dicas quando precisar de uma estratégia concreta. Visite cultura para ampliar repertórios e use o quiz para desmontar certezas rápidas.</p><div className="callout"><strong>Um compromisso simples</strong><span>Construir um espaço sem infantilização, sem generalizações e sem transformar diferença em defeito.</span></div><div className="about-route-grid"><Link href="/inclusao" data-testid="link-about-inclusion"><GraduationCap size={18} /> Inclusão e direitos <ArrowRight size={15} /></Link><Link href="/dicas" data-testid="link-about-tips"><Compass size={18} /> Apoio cotidiano <ArrowRight size={15} /></Link><Link href="/cultura" data-testid="link-about-culture"><BookOpen size={18} /> Repertório cultural <ArrowRight size={15} /></Link></div></div></div></section></>;
}

function NextPath({ href, label, title }: { href: string; label: string; title: string }) {
  return <Link href={href} className="next-path" data-testid={`link-next-${href.slice(1).replaceAll("/", "-")}`}><span>{label}</span><strong>{title}</strong><ArrowRight size={19} /></Link>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-grid"><div><Link href="/" className="brand" data-testid="link-footer-brand"><span>Connec</span><span className="brand-pill">Tismo</span></Link><p style={{ marginTop: "1.2rem" }}>Um portal português sobre autismo, inclusão, apoio cotidiano e representação.</p></div><div><h3>Explorar</h3><ul>{pages.slice(1, 5).map((page) => <li key={page.key}><Link href={page.href} data-testid={`link-footer-${page.key}`}>{page.label}</Link></li>)}</ul></div><div><h3>Projeto</h3><ul><li><Link href="/sobre" data-testid="link-footer-about">Sobre o projeto</Link></li><li><a href="#conteudo" data-testid="link-footer-top">Voltar ao início</a></li></ul></div></div><div className="footer-bottom"><span>© 2026 ConnecTismo. Conteúdo educativo.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="button-scroll-top">Voltar ao início <ArrowDown size={13} style={{ transform: "rotate(180deg)" }} /></button></div></div></footer>;
}

function Shell() {
  const [location] = useLocation();
  const active = pages.find((page) => page.href === location)?.key ?? "inicio";
  useEffect(() => {
    const titles: Record<PageKey, string> = { inicio: "ConnecTismo — conexão além do espectro", inclusao: "Inclusão — ConnecTismo", dicas: "Dicas práticas — ConnecTismo", cultura: "Cultura & representatividade — ConnecTismo", mitos: "Mitos & verdades — ConnecTismo", sobre: "O projeto — ConnecTismo" };
    document.title = titles[active];
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [active]);
  return <div className="site-shell"><Header active={active} /><main id="conteudo"><Switch><Route path="/" component={HomePage} /><Route path="/inclusao" component={InclusionPage} /><Route path="/dicas" component={TipsPage} /><Route path="/cultura" component={CulturePage} /><Route path="/mitos-verdades" component={QuizPage} /><Route path="/sobre" component={AboutPage} /><Route><PageHero eyebrow="Página não encontrada" title="Este caminho ainda não existe." text="Volte ao início para continuar explorando o portal." /><div className="page-body"><div className="container"><Link href="/" className="button button-primary" data-testid="link-not-found-home">Ir para o início <ArrowRight size={16} /></Link></div></div></Route></Switch></main><Footer /><Accessibility /></div>;
}

function App() {
  return <Shell />;
}

export default App;