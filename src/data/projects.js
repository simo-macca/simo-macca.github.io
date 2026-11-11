import { Binary, Bot, Dices, Gamepad2, GraduationCap, Search, Ship } from '@lucide/vue'

/**
 * Projects and research, in display order.
 *
 * Schema (see `.agents/rules/state-logic.md`):
 * - `id`         unique kebab-case id
 * - `category`   'personal' | 'university' | 'thesis' (filter + context badge)
 * - `icon`       Lucide component shown in the card header
 * - `isFlagship` highlights the card
 * - `title`, `domain`, `role`, `context`, `summary`, `challenge`, `approach`: `{ en, it }` or string
 * - `highlights` short, factual results (array of `{ en, it }`)
 * - `tags`       technologies (strings or `{ en, it }`)
 * - `links`      `{ github, demo, pdf }`, each a URL or null
 *
 * A project without `links.github` is shown as "private source code".
 */

export const projectCategoryIds = Object.freeze(['all', 'personal', 'university', 'thesis'])

export const projects = Object.freeze([
  {
    id: 'pandoras-box',
    category: 'personal',
    icon: Dices,
    isFlagship: true,
    title: 'Frantic: Pandora’s Box Companion',
    domain: { en: 'Offline-First Web App', it: 'Web App Offline-First' },
    role: { en: 'Solo developer', it: 'Sviluppatore unico' },
    context: { en: 'Personal project · 2026', it: 'Progetto personale · 2026' },
    summary: {
      en: 'Installable scorekeeper and rules companion for the card game Frantic and its Pandora’s Box add-on.',
      it: 'Segnapunti installabile e guida alle regole per il gioco di carte Frantic e l’espansione Pandora’s Box.',
    },
    challenge: {
      en: 'Frantic scoring is error-prone on paper: every special card has its own value, and events such as Doomsday, Time Bomb, Identity Theft or Seppuku rewrite the scores of the whole table. Players also keep reaching for the rulebook to check what a card does.',
      it: 'Calcolare i punti di Frantic su carta è facile da sbagliare: ogni carta speciale ha un valore diverso ed eventi come Doomsday, Time Bomb, Identity Theft o Seppuku modificano i punteggi di tutto il tavolo. In più i giocatori consultano di continuo il regolamento.',
    },
    approach: {
      en: 'A React 18 + strict TypeScript single-page app with a typed game-state engine: pure scoring functions, undo snapshots for every action, and a sanitiser that validates saved state and imported backups. All data stays in localStorage (with JSON export/import), and a Workbox service worker precaches the app and the official rulebooks so it works fully offline. Built with Vite and Tailwind CSS 4 and deployed on Netlify behind a GitHub Actions CI.',
      it: 'Una single-page app in React 18 e TypeScript strict con un motore di stato tipizzato: funzioni di punteggio pure, snapshot di annullamento per ogni azione e una funzione che valida lo stato salvato e i backup importati. Tutti i dati restano nel localStorage (con export/import JSON) e un service worker Workbox mette in cache l’app e i regolamenti ufficiali, così funziona completamente offline. Realizzata con Vite e Tailwind CSS 4 e pubblicata su Netlify con CI su GitHub Actions.',
    },
    highlights: [
      {
        en: 'Round calculator for every card value plus table-wide events and free adjustments',
        it: 'Calcolatore di round per ogni valore di carta, eventi di tavolo e correzioni libere',
      },
      {
        en: 'Searchable dictionary of 94 cards in English, German, Italian and French',
        it: 'Dizionario consultabile di 94 carte in inglese, tedesco, italiano e francese',
      },
      {
        en: 'Installable PWA that works without a connection',
        it: 'PWA installabile che funziona senza connessione',
      },
      {
        en: '170 automated tests with Vitest and React Testing Library',
        it: '170 test automatici con Vitest e React Testing Library',
      },
    ],
    tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'PWA', 'Vitest', 'Netlify'],
    links: {
      github: 'https://github.com/simo-macca/pandoras-box-app',
      demo: 'https://pandoras-box-app.netlify.app/',
      pdf: null,
    },
  },
  {
    id: 'bachelor-thesis',
    category: 'thesis',
    icon: GraduationCap,
    isFlagship: false,
    title: {
      en: 'From Raw Data to Pedagogical Insights',
      it: 'Dai Dati Grezzi agli Insight Pedagogici',
    },
    domain: { en: 'Data Pipeline & Static Analysis', it: 'Pipeline di Dati & Analisi Statica' },
    role: { en: 'Author · Bachelor’s thesis', it: 'Autore · Tesi triennale' },
    context: {
      en: 'USI · supervised by Prof. Matthias Hauswirth · 2026',
      it: 'USI · relatore Prof. Matthias Hauswirth · 2026',
    },
    summary: {
      en: 'An analytics pipeline and offline dashboard that show PyTamaro-Web instructors how learners work through their activities.',
      it: 'Una pipeline di analisi e una dashboard offline che mostrano ai docenti di PyTamaro-Web come gli studenti affrontano le attività.',
    },
    challenge: {
      en: 'PyTamaro-Web records every code execution, but the raw telemetry is split between a relational database and notebook files on disk. Instructors had no way to see how users progress through an activity or where static errors keep appearing, and running a type checker on every submission is expensive.',
      it: 'PyTamaro-Web registra ogni esecuzione di codice, ma la telemetria grezza è divisa tra un database relazionale e file notebook su disco. I docenti non avevano modo di vedere come gli utenti procedono in un’attività o dove compaiono gli errori statici più frequenti, e analizzare ogni sottomissione con un type checker è costoso.',
    },
    approach: {
      en: 'A Python pipeline that joins PostgreSQL execution records with Jupyter notebook templates to rebuild anonymous user sessions, maps them to typed data models, and runs the ty static analyser in batches backed by a global cache. The results are rendered with Jinja2, Tailwind CSS and the Monaco Editor into a static HTML dashboard with execution timelines, side-by-side code diffs and error highlighting that runs without any server.',
      it: 'Una pipeline Python che unisce i record di esecuzione PostgreSQL ai template dei notebook Jupyter per ricostruire le sessioni anonime degli utenti, le mappa su modelli di dati tipizzati ed esegue l’analizzatore statico ty a batch con una cache globale. I risultati vengono generati con Jinja2, Tailwind CSS e Monaco Editor in una dashboard HTML statica, con timeline delle esecuzioni, diff del codice affiancati ed evidenziazione degli errori, che funziona senza alcun server.',
    },
    highlights: [
      {
        en: 'Static analysis scaled to 106,080 code executions',
        it: 'Analisi statica estesa a 106.080 esecuzioni di codice',
      },
      {
        en: 'Batching and a global cache skip about 29,000 redundant runs',
        it: 'Batching e cache globale evitano circa 29.000 esecuzioni ridondanti',
      },
      {
        en: 'Full dataset processed in about 76 seconds',
        it: 'Intero dataset elaborato in circa 76 secondi',
      },
      {
        en: 'Validated in a usability study with an instructor',
        it: 'Validata con uno studio di usabilità insieme a un docente',
      },
    ],
    tags: ['Python', 'PostgreSQL', 'ty', 'Jupyter', 'Jinja2', 'Tailwind CSS', 'Monaco Editor'],
    links: {
      github: null,
      demo: null,
      pdf: '/docs/thesis.pdf',
    },
  },
  {
    id: 'toc-movers-sat',
    category: 'university',
    icon: Binary,
    isFlagship: false,
    title: 'OptiMove: SAT-Based Logistics Planner',
    domain: { en: 'SAT Encoding & Planning', it: 'Codifica SAT & Pianificazione' },
    role: { en: 'Front-end lead · team of 7', it: 'Responsabile front end · team di 7' },
    context: { en: 'Theory of Computation course', it: 'Corso di Theory of Computation' },
    summary: {
      en: 'Finds the shortest schedule for movers carrying items between floors by encoding the problem as CNF and solving it with Glucose-3.',
      it: 'Trova il piano più breve per spostare persone e oggetti tra i piani di un edificio codificando il problema in CNF e risolvendolo con Glucose-3.',
    },
    challenge: {
      en: 'Movers can go up, go down or wait; items only travel downwards when a descending mover on the same floor carries them, one at a time. The goal is a provably minimal plan, which requires a correct propositional encoding and a search over the time horizon.',
      it: 'Le persone possono salire, scendere o restare ferme; gli oggetti scendono solo se trasportati da una persona sullo stesso piano, uno alla volta. L’obiettivo è un piano di lunghezza minima dimostrabile, che richiede una codifica proposizionale corretta e una ricerca sull’orizzonte temporale.',
    },
    approach: {
      en: 'Thirteen clause groups (A–M) encode initial and goal states, one-floor-per-step constraints, carrying rules and successor-state axioms with PySAT. An iterative-deepening runner starts from a proven lower bound, so the first satisfiable horizon is the optimum T*. Each solve runs in an isolated process with a hard timeout behind a FastAPI API with Pydantic validation and an LRU cache, plus a CLI. I led the Vue 3 front end: problem setup, an animated building visualiser with timeline playback, and DIMACS export.',
      it: 'Tredici gruppi di clausole (A–M) codificano con PySAT stato iniziale e obiettivo, il vincolo di un piano per passo, le regole di trasporto e gli assiomi di stato successore. Un solver ad approfondimento iterativo parte da un limite inferiore dimostrato, quindi il primo orizzonte soddisfacibile è l’ottimo T*. Ogni risoluzione gira in un processo isolato con timeout, dietro un’API FastAPI con validazione Pydantic e cache LRU, più una CLI. Ho guidato il front end in Vue 3: configurazione del problema, visualizzatore animato dell’edificio con timeline e export DIMACS.',
    },
    highlights: [
      {
        en: 'Guaranteed minimal plans via iterative deepening over T',
        it: 'Piani minimi garantiti tramite approfondimento iterativo su T',
      },
      {
        en: 'Process-isolated solver runs with a configurable hard timeout',
        it: 'Risoluzioni in processi isolati con timeout configurabile',
      },
      {
        en: 'DIMACS CNF and variable-mapping export for both SAT and UNSAT results',
        it: 'Export DIMACS CNF e mappatura delle variabili sia per risultati SAT che UNSAT',
      },
    ],
    tags: ['Python', 'PySAT (Glucose-3)', 'FastAPI', 'Vue 3', 'Tailwind CSS v4', 'Docker Compose'],
    links: {
      github: 'https://github.com/simo-macca/toc-movers-sat',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'meme-search-engine',
    category: 'university',
    icon: Search,
    isFlagship: false,
    title: 'WDYMEME: Meme Search Engine',
    domain: { en: 'Information Retrieval & Clustering', it: 'Information Retrieval & Clustering' },
    role: { en: 'Back-end lead · team of 2', it: 'Responsabile back end · team di 2' },
    context: { en: 'University project', it: 'Progetto universitario' },
    summary: {
      en: 'Crawls, deduplicates, indexes and clusters memes from four platforms, then serves faceted search through a Vue 3 interface.',
      it: 'Raccoglie, deduplica, indicizza e raggruppa meme da quattro piattaforme, offrendo una ricerca a faccette tramite un’interfaccia Vue 3.',
    },
    challenge: {
      en: 'Meme platforms load content dynamically with infinite scroll, the same meme appears on several sites, and there is no predefined taxonomy to group results by topic.',
      it: 'Le piattaforme di meme caricano i contenuti dinamicamente con scroll infinito, lo stesso meme compare su più siti e non esiste una tassonomia predefinita per raggruppare i risultati per argomento.',
    },
    approach: {
      en: 'A one-off back-end job crawls 9GAG, iFunny, Memedroid and Memes.com with Playwright and Scrapy, removes duplicates and caches raw data for seven days. It then recreates a SolrCloud collection, registers the schema and the Carrot2 Lingo clustering component, and indexes every document. Nginx serves the Vue 3 + Tailwind CSS v4 front end and proxies Solr on the same origin, so no CORS setup is needed. The whole stack runs with Docker Compose.',
      it: 'Un job di back end raccoglie i contenuti da 9GAG, iFunny, Memedroid e Memes.com con Playwright e Scrapy, rimuove i duplicati e tiene in cache i dati grezzi per sette giorni. Poi ricrea una collezione SolrCloud, registra lo schema e il componente di clustering Carrot2 Lingo e indicizza tutti i documenti. Nginx serve il front end in Vue 3 + Tailwind CSS v4 e fa da proxy verso Solr sulla stessa origine, senza configurare CORS. L’intero stack gira con Docker Compose.',
    },
    highlights: [
      {
        en: 'Topic clustering on tags with Carrot2 Lingo, computed by Solr',
        it: 'Clustering per argomento sui tag con Carrot2 Lingo, calcolato da Solr',
      },
      {
        en: 'Faceted search by keyword, media type, tag and topic',
        it: 'Ricerca a faccette per parola chiave, tipo di media, tag e argomento',
      },
      {
        en: 'Seven-day scrape cache keeps restarts fast',
        it: 'Cache di sette giorni per riavvii rapidi',
      },
    ],
    tags: [
      'Python',
      'Playwright',
      'Scrapy',
      'Apache Solr 9',
      'Carrot2 Lingo',
      'Vue 3',
      'Nginx',
      'Docker',
    ],
    links: {
      github: 'https://github.com/simo-macca/meme-search-engine',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'seworld',
    category: 'university',
    icon: Bot,
    isFlagship: false,
    title: 'SEWorld: AI-Assisted Learning Platform',
    domain: { en: 'Full-Stack & Local LLMs', it: 'Full-Stack & LLM Locali' },
    role: { en: 'Full-stack developer · team of ~20', it: 'Sviluppatore full-stack · team di ~20' },
    context: { en: 'Software Atelier 4 · USI · 2025', it: 'Software Atelier 4 · USI · 2025' },
    summary: {
      en: 'Learning platform for Software Engineering courses with auto-graded exercises and an AI tutor running on a local LLM.',
      it: 'Piattaforma didattica per i corsi di Ingegneria del Software con esercizi a correzione automatica e un tutor AI basato su un LLM locale.',
    },
    challenge: {
      en: 'Students need instant feedback and help, but AI-generated answers must stay under the instructor’s control, and a team of about twenty students had to deliver the platform in Scrum sprints.',
      it: 'Gli studenti hanno bisogno di feedback e aiuto immediati, ma le risposte generate dall’AI devono restare sotto il controllo del docente, e un team di circa venti studenti doveva consegnare la piattaforma in sprint Scrum.',
    },
    approach: {
      en: 'A layered Spring Boot 3.4 back end (Java 21) with OAuth2 / OpenID Connect login, Spring Data JPA on PostgreSQL 17 and Spring AI talking to Ollama (deepseek-llm), with a Vue 3 + Pinia front end using Chart.js. Instructors review AI-generated explanations before students see them. I built front-end and back-end features for LLM-based exercise evaluation, student statistics and dynamic feedback.',
      it: 'Un back end a livelli in Spring Boot 3.4 (Java 21) con login OAuth2 / OpenID Connect, Spring Data JPA su PostgreSQL 17 e Spring AI collegato a Ollama (deepseek-llm), con un front end Vue 3 + Pinia e Chart.js. I docenti approvano le spiegazioni generate dall’AI prima che gli studenti le vedano. Ho sviluppato funzionalità front end e back end per la valutazione degli esercizi tramite LLM, le statistiche degli studenti e il feedback dinamico.',
    },
    highlights: [
      {
        en: 'AI tutor and question variants generated by a local model',
        it: 'Tutor AI e varianti delle domande generate da un modello locale',
      },
      {
        en: 'Instructor review workflow for AI-generated content',
        it: 'Flusso di revisione dei contenuti AI da parte del docente',
      },
      {
        en: 'Student and class analytics with Chart.js',
        it: 'Statistiche per studenti e classi con Chart.js',
      },
    ],
    tags: ['Java 21', 'Spring Boot 3', 'Spring AI', 'Ollama', 'PostgreSQL 17', 'Vue 3', 'Docker'],
    links: {
      github: 'https://github.com/simo-macca/SEWorld',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'battleship',
    category: 'university',
    icon: Ship,
    isFlagship: false,
    title: 'Battleship in Java',
    domain: { en: 'OOP Design & Game AI', it: 'Design a Oggetti & Game AI' },
    role: { en: 'Software engineer · team of 2', it: 'Software engineer · team di 2' },
    context: { en: 'University project', it: 'Progetto universitario' },
    summary: {
      en: 'Desktop Battleship with drag-and-drop fleet placement, local multiplayer and a hunt-and-target computer opponent.',
      it: 'Battaglia navale desktop con posizionamento della flotta drag-and-drop, multigiocatore locale e un avversario computer hunt-and-target.',
    },
    challenge: {
      en: 'Many game phases (mode, difficulty, placement, weapon choice, targeting, hand-over) each react differently to input, while the game state should stay immutable and the rendering separate from the logic.',
      it: 'Molte fasi di gioco (modalità, difficoltà, posizionamento, scelta dell’arma, mira, passaggio del turno) reagiscono in modo diverso all’input, mentre lo stato deve restare immutabile e il rendering separato dalla logica.',
    },
    approach: {
      en: 'Written in Java 17 on the JTamaro functional graphics library: every input event returns a new immutable Game record. Each screen is a State-pattern phase; human, random and hunt-and-target players share one Player interface; a Visitor renders projectiles without instanceof checks. Quality is enforced with JUnit 4, JaCoCo coverage, PMD 7 and a GitHub Actions workflow.',
      it: 'Scritto in Java 17 con la libreria grafica funzionale JTamaro: ogni evento di input restituisce un nuovo record Game immutabile. Ogni schermata è una fase del pattern State; giocatore umano, casuale e hunt-and-target condividono un’unica interfaccia Player; un Visitor disegna i proiettili senza controlli instanceof. La qualità è garantita da JUnit 4, copertura JaCoCo, PMD 7 e un workflow GitHub Actions.',
    },
    highlights: [
      {
        en: 'Two AI levels: random and hunt-and-target',
        it: 'Due livelli di AI: casuale e hunt-and-target',
      },
      {
        en: 'Immutable game state with State and Visitor patterns',
        it: 'Stato di gioco immutabile con i pattern State e Visitor',
      },
    ],
    tags: ['Java 17', 'JTamaro', 'Design Patterns', 'JUnit', 'JaCoCo', 'PMD', 'Gradle'],
    links: {
      github: 'https://github.com/simo-macca/battleship',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'snake-racket',
    category: 'university',
    icon: Gamepad2,
    isFlagship: false,
    title: 'Snake in Racket',
    domain: { en: 'Functional Programming', it: 'Programmazione Funzionale' },
    role: { en: 'Developer · team of 2', it: 'Sviluppatore · team di 2' },
    context: {
      en: 'Functional Programming 1 course · 2023',
      it: 'Corso di Programmazione Funzionale 1 · 2023',
    },
    summary: {
      en: 'The classic Snake game written in purely functional Racket, with progressive speed, sprites and sound effects.',
      it: 'Il classico Snake scritto in Racket puramente funzionale, con velocità progressiva, sprite ed effetti sonori.',
    },
    challenge: {
      en: 'Collisions, growth, speed-ups and rotating sprites all have to be expressed without any mutable state.',
      it: 'Collisioni, crescita, accelerazioni e sprite che ruotano vanno espressi senza alcuno stato mutabile.',
    },
    approach: {
      en: 'Following the How to Design Programs design recipe, the whole game is one immutable struct rebuilt by big-bang on every clock tick and key press (2htdp/universe). A tick divider gives four speed levels, apples spawn only on free cells, reversing direction is blocked, and the score is drawn from digit sprites.',
      it: 'Seguendo la design recipe di How to Design Programs, l’intero gioco è una struttura immutabile ricostruita da big-bang a ogni tick e pressione di tasto (2htdp/universe). Un divisore di tick fornisce quattro livelli di velocità, le mele compaiono solo su celle libere, l’inversione di direzione è bloccata e il punteggio è disegnato con sprite delle cifre.',
    },
    highlights: [
      {
        en: '140 check-expect unit tests next to the functions they cover',
        it: '140 unit test check-expect accanto alle funzioni che verificano',
      },
    ],
    tags: ['Racket (ASL)', '2htdp/universe', 'HtDP', { en: 'Unit Testing', it: 'Unit Test' }],
    links: {
      github: 'https://github.com/simo-macca/snake-racket',
      demo: null,
      pdf: null,
    },
  },
])
