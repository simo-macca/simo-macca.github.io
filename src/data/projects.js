export const getProjectCategories = (lang = 'en') => [
  { id: 'all', label: lang === 'it' ? 'Tutti' : 'All' },
  {
    id: 'personal',
    label: lang === 'it' ? 'Progetti Personali' : 'Personal Projects',
  },
  {
    id: 'university',
    label: lang === 'it' ? 'Progetti Universitari' : 'University Projects',
  },
  {
    id: 'thesis',
    label: lang === 'it' ? 'Tesi Triennale' : "Bachelor's Thesis",
  },
]

export const getProjects = (lang = 'en') => {
  if (lang === 'it') {
    return [
      {
        id: 'pandoras-box',
        title: "Pandora's Box / Frantic Companion",
        category: 'personal',
        role: 'Sviluppatore & Architetto Unico',
        domain: 'Applicazione Web Interattiva',
        contextBadge: 'Progetto Personale',
        isFlagship: true,
        noSourceCode: false,
        summary:
          'Companion digitale e segnapunti interattivo per giochi di carte con monitoraggio reattivo dello stato client-side.',
        challenge:
          'I giochi di carte da tavolo Frantic e Pandora’s Box presentano regole di punteggio articolate, penalità crescenti nei turni a eliminazione e interazioni complesse tra carte che richiedono una costante verifica del regolamento.',
        architecture:
          'Progettata un’applicazione offline-first con gestione reattiva dello stato client-side (Pinia), dizionari modulari delle carte con ricerca multilingue, calcolo del punteggio a latenza zero e una pipeline di continuous deployment su Netlify con Vite.',
        tags: ['TypeScript', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Vite', 'Netlify CI/CD'],
        links: {
          github: 'https://github.com/simo-macca/pandoras-box-app',
          demo: 'https://pandoras-box-app.netlify.app/',
          pdf: null,
        },
      },
      {
        id: 'bachelor-thesis',
        title: 'PyTamaro-Web: Pedagogical Analytics & Static Code Analysis',
        category: 'thesis',
        role: 'Ricercatore per la Tesi Triennale',
        domain: 'Analisi Statica del Codice & Analytics',
        contextBadge: 'Tesi Triennale',
        isFlagship: false,
        noSourceCode: true,
        summary:
          'Pipeline automatizzata di analisi statica di AST Python per diagnosticare gli ostacoli di programmazione degli studenti in dashboard didattiche interattive.',
        challenge:
          '"Dai dati grezzi agli insight pedagogici." Gli ambienti didattici universitari per i corsi introduttivi di programmazione raccolgono enormi volumi di sottomissioni ed errori a runtime senza fornire ai docenti feedback diagnostici strutturati.',
        architecture:
          'Progettata e sviluppata una pipeline di analisi statica che interroga un ampio database per recuperare ed effettuare il parsing delle sottomissioni di codice degli studenti, individua pattern ricorrenti di errori concettuali e strutturali, e visualizza la progressione dell’apprendimento in una dashboard pedagogica interattiva realizzata con Tailwind CSS e Jinja2.',
        tags: ['Python', 'Analisi Statica', 'Jinja2', 'Tailwind CSS'],
        links: {
          github: null,
          demo: null,
          pdf: '/docs/thesis.pdf',
        },
      },
      {
        id: 'seworld',
        title: 'Software Engineering World (SEWorld)',
        category: 'university',
        role: 'Lead Full-Stack & Lavoro di Gruppo',
        domain: 'Sistemi Full-Stack & Potenziati da AI',
        contextBadge: 'Progetto Universitario',
        isFlagship: false,
        noSourceCode: false,
        summary:
          'Piattaforma didattica full-stack potenziata da intelligenza artificiale con monitoraggio del piano di studi, esercizi interattivi a tentativi multipli e tutoraggio contestuale via LLM.',
        challenge:
          'Gestire la progressione didattica degli studenti, la correzione automatica in tempo reale degli esercizi e l’authoring dei corsi da parte dei docenti, integrando un tutor generativo contestuale e pipeline sicure di valutazione con LLM nel rispetto dell’integrità accademica.',
        architecture:
          'Sviluppato un backend a livelli in Spring Boot 3.4 (Java 21) con autenticazione Spring Security OAuth2 (integrazione SWITCH Edu-ID via Keycloak), PostgreSQL 17 tramite Spring Data JPA e orchestrazione di LLM in locale con Spring AI e Ollama (deepseek-llm). Realizzata un’interfaccia reattiva in Vue 3 (Pinia, Bootstrap 5, Chart.js, editor Markdown) containerizzata con Docker Compose e test automatizzati con JUnit 5 e Zonky Embedded Postgres.',
        tags: [
          'Java 21',
          'Spring Boot 3',
          'Spring AI',
          'Ollama (DeepSeek)',
          'PostgreSQL 17',
          'Vue 3',
          'Docker',
          'OAuth2',
        ],
        links: {
          github: 'https://github.com/simo-macca/SEWorld',
          demo: null,
          pdf: null,
        },
      },
      {
        id: 'meme-search-engine',
        title: 'Meme Search Engine',
        category: 'university',
        role: 'Lead Back-End & Team in Coppia',
        domain: 'Information Retrieval & Clustering',
        contextBadge: 'Progetto Universitario',
        isFlagship: false,
        noSourceCode: false,
        summary:
          'Piattaforma end-to-end di Information Retrieval multimodale con web scraper dinamici, cluster di ricerca Apache Solr e clustering tematico Carrot2 Lingo.',
        challenge:
          'Acquisire media multimodali non strutturati da piattaforme social dinamiche, eliminare i meme duplicati e identificare al volo tematiche umoristiche emergenti senza tassonomie predefinite o etichette di addestramento.',
        architecture:
          'Sviluppata una pipeline di ingestion effimera che combina Scrapy e browser headless Playwright con deduplicazione automatica tra sorgenti e caching a 7 giorni. Configurato un cluster Apache Solr 9 Cloud che integra l’algoritmo Carrot2 Lingo per l’estrazione dinamica dei cluster di tag. Realizzato un frontend in Vue 3 e Tailwind CSS v4 servito tramite reverse proxy Nginx per eliminare l’overhead CORS del browser.',
        tags: [
          'Python 3.12',
          'Apache Solr 9',
          'Carrot2 Lingo',
          'Playwright',
          'Scrapy',
          'Vue 3',
          'Tailwind CSS v4',
          'Docker Compose',
          'Nginx',
        ],
        links: {
          github: 'https://github.com/simo-macca/meme-search-engine',
          demo: null,
          pdf: null,
        },
      },
      {
        id: 'toc-movers-sat',
        title: 'TOC Movers SAT Solver',
        category: 'university',
        role: 'Lead Front-End & Lavoro di Gruppo',
        domain: 'Teoria della Computazione & Pianificazione SAT',
        contextBadge: 'Progetto Universitario',
        isFlagship: false,
        noSourceCode: false,
        summary:
          'Risolutore per la pianificazione logistica multi-agente ottimale che riduce i vincoli di movimento e trasporto a formule CNF risolte con Glucose-3.',
        challenge:
          'La logistica di movimento e trasporto oggetti tra i piani di un edificio da parte di agenti multipli è un problema di pianificazione combinatoria NP-completo, in cui una ricerca ingenua nello spazio degli stati incorre in un’esplosione combinatoria esponenziale.',
        architecture:
          'Formulata una riduzione formale in tempo polinomiale che codifica il movimento e il trasporto di carichi esclusivamente verso il basso su 13 gruppi di vincoli (A–M) in formule CNF proposizionali usando PySAT IDPool. Sviluppato un risolutore ad approfondimento iterativo con Glucose-3 che garantisce l’orizzonte temporale minimo T*, isolato in processi worker con timeout di 118s. Creato un backend REST in FastAPI e un visualizzatore interattivo dell’edificio in Vue 3 con esportazione in formato DIMACS CNF.',
        tags: [
          'Python',
          'FastAPI',
          'PySAT (Glucose-3)',
          'Propositional CNF',
          'Vue 3',
          'Tailwind CSS v4',
          'Docker',
        ],
        links: {
          github: 'https://github.com/simo-macca/toc-movers-sat',
          demo: null,
          pdf: null,
        },
      },
      {
        id: 'battleship',
        title: 'Battleship Engine & Graphical AI',
        category: 'university',
        role: 'Software Engineer & Team in Coppia',
        domain: 'Architettura ad Oggetti & Game AI',
        contextBadge: 'Progetto Universitario',
        isFlagship: false,
        noSourceCode: false,
        summary:
          'Motore modulare per il gioco Battleship su desktop con separazione rigorosa Model-View, design pattern classici e avversario AI con euristica hunt-and-target.',
        challenge:
          'Disaccoppiare transizioni di stato del gioco, interazioni tra proiettili, posizionamento drag-and-drop della flotta ed euristiche dell’avversario dal rendering grafico della GUI, preservando l’immutabilità dello stato.',
        architecture:
          'Sviluppato in Java 17 con rigorosa separazione Model-View tramite la libreria grafica funzionale JTamaro. Implementati lo State Pattern per le transizioni di fase (posizionamento, selezione armi, puntamento, passaggio turno), lo Strategy Pattern per gli avversari AI (Random vs. LogicComputer con ricerca hunt-and-target) e il Visitor Pattern per il rendering dei proiettili. Qualità del codice verificata con suite JUnit, JaCoCo, PMD 7 e CPD.',
        tags: [
          'Java 17',
          'State Pattern',
          'Strategy Pattern',
          'Visitor Pattern',
          'JTamaro GUI',
          'JUnit',
          'PMD & JaCoCo',
          'Gradle',
        ],
        links: {
          github: 'https://github.com/simo-macca/battleship',
          demo: null,
          pdf: null,
        },
      },
      {
        id: 'snake-racket',
        title: 'Snake in Functional Racket',
        category: 'university',
        role: 'Software Engineer & Team in Coppia',
        domain: 'Paradigmi di Programmazione Funzionale',
        contextBadge: 'Progetto Universitario',
        isFlagship: false,
        noSourceCode: false,
        summary:
          'Classico arcade Snake puramente funzionale sviluppato in Racket (ASL) mediante stati del mondo ricorsivi immutabili e il motore reattivo 2htdp/universe.',
        challenge:
          'Implementare collisioni fisiche in tempo reale, incremento dinamico della difficoltà, rotazione degli sprite e crescita del serpente interamente senza variabili mutabili o effetti collaterali.',
        architecture:
          'Sviluppato in Racket seguendo la metodologia How to Design Programs (HtDP). Stati di gioco modellati come strutture dati immutabili valutate tramite il ciclo di eventi big-bang di 2htdp/universe. Implementati scalamento dinamico della velocità tramite clock divider, rilevamento ricorsivo di autocollisione, blocco dell’inversione a 180°, generazione delle mele in coordinate libere e rendering a sprite per il punteggio numerico, con verifica completa tramite 140 unit test check-expect.',
        tags: [
          'Racket (ASL)',
          'Functional Programming',
          '2htdp/universe',
          'HtDP Design Recipe',
          'Unit Testing',
        ],
        links: {
          github: 'https://github.com/simo-macca/snake-racket',
          demo: null,
          pdf: null,
        },
      },
    ]
  }

  return [
    {
      id: 'pandoras-box',
      title: "Pandora's Box / Frantic Companion",
      category: 'personal',
      role: 'Solo Developer & Architect',
      domain: 'Interactive Web Application',
      contextBadge: 'Personal Project',
      isFlagship: true,
      noSourceCode: false,
      summary:
        'Interactive digital companion and scorekeeper for card games with client-side reactive state tracking.',
      challenge:
        'Tabletop card games Frantic and Pandora’s Box involve intricate scoring rules, escalating penalty points across elimination rounds, and non-trivial card interaction effects requiring continuous rulebook verification.',
      architecture:
        'Engineered an offline-first companion application with client-side reactive state tracking (Pinia), modular card dictionaries with multi-lingual search, zero-latency scorekeeping math, and an automated continuous deployment pipeline targeting Netlify with Vite.',
      tags: ['TypeScript', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Vite', 'Netlify CI/CD'],
      links: {
        github: 'https://github.com/simo-macca/pandoras-box-app',
        demo: 'https://pandoras-box-app.netlify.app/',
        pdf: null,
      },
    },
    {
      id: 'bachelor-thesis',
      title: 'PyTamaro-Web: Pedagogical Analytics & Static Code Analysis',
      category: 'thesis',
      role: "Bachelor's Thesis Researcher",
      domain: 'Static Code Analysis & Analytics',
      contextBadge: "Bachelor's Thesis",
      isFlagship: false,
      noSourceCode: true,
      summary:
        'Automated Python AST static analysis pipeline diagnosing student programming hurdles into interactive instructor dashboards.',
      challenge:
        '"From Raw Data to Pedagogical Insights." University introductory programming environments accumulate vast volumes of student code attempts and runtime errors without structured diagnostic feedback for instructors.',
      architecture:
        'Designed and engineered an automated static analysis pipeline that queries a large database to retrieve and parse student code submissions, extracts common misconception patterns and structural errors, and visualizes aggregate learning progression in an interactive pedagogical dashboard with Tailwind CSS and Jinja2.',
      tags: ['Python', 'Static Analysis', 'Jinja2', 'Tailwind CSS'],
      links: {
        github: null,
        demo: null,
        pdf: '/docs/thesis.pdf',
      },
    },
    {
      id: 'seworld',
      title: 'Software Engineering World (SEWorld)',
      category: 'university',
      role: 'Full-Stack Lead & Group Team',
      domain: 'Full-Stack & AI-Augmented Systems',
      contextBadge: 'University Project',
      isFlagship: false,
      noSourceCode: false,
      summary:
        'Full-stack AI-augmented educational platform providing curriculum tracking, multi-attempt interactive exercises, and contextual LLM tutoring.',
      challenge:
        'Managing student progression, real-time exercise grading, and instructor course authoring while integrating contextual generative AI tutoring and safe LLM evaluation pipelines without compromising academic integrity.',
      architecture:
        'Engineered a layered Spring Boot 3.4 backend (Java 21) with Spring Security OAuth2 (SWITCH Edu-ID Keycloak integration), PostgreSQL 17 via Spring Data JPA, and local LLM orchestration using Spring AI and Ollama (deepseek-llm). Built a reactive Vue 3 UI (Pinia, Bootstrap 5, Chart.js, Markdown editor) containerized via Docker Compose with automated JUnit 5 and Zonky Embedded Postgres testing.',
      tags: [
        'Java 21',
        'Spring Boot 3',
        'Spring AI',
        'Ollama (DeepSeek)',
        'PostgreSQL 17',
        'Vue 3',
        'Docker',
        'OAuth2',
      ],
      links: {
        github: 'https://github.com/simo-macca/SEWorld',
        demo: null,
        pdf: null,
      },
    },
    {
      id: 'meme-search-engine',
      title: 'Meme Search Engine',
      category: 'university',
      role: 'Back-End Lead & Duo Team',
      domain: 'Information Retrieval & Clustering',
      contextBadge: 'University Project',
      isFlagship: false,
      noSourceCode: false,
      summary:
        'End-to-end multimodal Information Retrieval platform with dynamic web scrapers, Apache Solr search cluster, and Carrot2 Lingo topic clustering.',
      challenge:
        'Acquiring unstructured multimodal media across dynamic social platforms, eliminating duplicate memes, and discovering emergent humor themes on-the-fly without pre-labeled taxonomy or training labels.',
      architecture:
        'Engineered an ephemeral ingestion pipeline combining Scrapy and Playwright headless browsers with automated cross-source deduplication and 7-day caching. Provisioned an Apache Solr 9 Cloud cluster integrating the Carrot2 Lingo clustering algorithm for dynamic tag clustering. Built a Vue 3 and Tailwind CSS v4 frontend served through an Nginx reverse proxy to eliminate browser CORS overhead.',
      tags: [
        'Python 3.12',
        'Apache Solr 9',
        'Carrot2 Lingo',
        'Playwright',
        'Scrapy',
        'Vue 3',
        'Tailwind CSS v4',
        'Docker Compose',
        'Nginx',
      ],
      links: {
        github: 'https://github.com/simo-macca/meme-search-engine',
        demo: null,
        pdf: null,
      },
    },
    {
      id: 'toc-movers-sat',
      title: 'TOC Movers SAT Solver',
      category: 'university',
      role: 'Front-End Lead & Group Team',
      domain: 'Theory of Computation & SAT Planning',
      contextBadge: 'University Project',
      isFlagship: false,
      noSourceCode: false,
      summary:
        'Optimal multi-agent logistics planning solver reducing movement and item carrying constraints to CNF with Glucose-3 SAT solving.',
      challenge:
        'Multi-agent movement and item logistics across building floors is an NP-complete combinatorial planning problem where naive state space search suffers exponential combinatorial explosion.',
      architecture:
        'Formulated a formal polynomial-time reduction encoding movement and downwards-only carrying logistics across 13 constraint groups (A–M) into Propositional CNF using PySAT IDPool. Engineered an iterative deepening solver with Glucose-3 guaranteeing minimal time horizon T*, isolated in child worker processes with 118s timeouts. Developed a FastAPI REST backend and a Vue 3 animated building visualizer with DIMACS CNF export.',
      tags: [
        'Python',
        'FastAPI',
        'PySAT (Glucose-3)',
        'Propositional CNF',
        'Vue 3',
        'Tailwind CSS v4',
        'Docker',
      ],
      links: {
        github: 'https://github.com/simo-macca/toc-movers-sat',
        demo: null,
        pdf: null,
      },
    },
    {
      id: 'battleship',
      title: 'Battleship Engine & Graphical AI',
      category: 'university',
      role: 'Software Engineer & Duo Team',
      domain: 'Object-Oriented Architecture & Game AI',
      contextBadge: 'University Project',
      isFlagship: false,
      noSourceCode: false,
      summary:
        'Modular desktop Battleship game engine built with strict Model-View separation, classic design patterns, and an intelligent hunt-and-target AI.',
      challenge:
        'Decoupling game state transitions, projectile interactions, drag-and-drop fleet positioning, and intelligent opponent heuristics from GUI rendering while maintaining immutability.',
      architecture:
        'Built on Java 17 with strict Model-View separation powered by the JTamaro functional GUI library. Implemented the State Pattern for phase transitions (placement, weapon selection, targeting, post-attack handover), Strategy Pattern for AI opponents (Random vs. LogicComputer hunt-and-target search), and Visitor Pattern for projectile rendering. Enforced quality via JUnit suites, JaCoCo, PMD 7, and CPD.',
      tags: [
        'Java 17',
        'State Pattern',
        'Strategy Pattern',
        'Visitor Pattern',
        'JTamaro GUI',
        'JUnit',
        'PMD & JaCoCo',
        'Gradle',
      ],
      links: {
        github: 'https://github.com/simo-macca/battleship',
        demo: null,
        pdf: null,
      },
    },
    {
      id: 'snake-racket',
      title: 'Snake in Functional Racket',
      category: 'university',
      role: 'Software Engineer & Duo Team',
      domain: 'Functional Programming Paradigms',
      contextBadge: 'University Project',
      isFlagship: false,
      noSourceCode: false,
      summary:
        'Pure functional arcade Snake game developed in Racket (ASL) using immutable recursive world states and the 2htdp/universe reactive engine.',
      challenge:
        'Implementing real-time collision physics, dynamic difficulty scaling, sprite rotation, and growing entity state entirely without mutable variables or side effects.',
      architecture:
        'Developed in Racket following the How to Design Programs (HtDP) design recipe. Modeled game states as immutable structs evaluated through 2htdp/universe big-bang event loops. Implemented dynamic speed scaling via clock dividers, recursive self-collision detection, 180° reverse-turn locks, available-position apple placement, and custom digit sprite score rendering, fully verified by 140 check-expect unit tests.',
      tags: [
        'Racket (ASL)',
        'Functional Programming',
        '2htdp/universe',
        'HtDP Design Recipe',
        'Unit Testing',
      ],
      links: {
        github: 'https://github.com/simo-macca/snake-racket',
        demo: null,
        pdf: null,
      },
    },
  ]
}

export const projectCategories = getProjectCategories('en')
export const projects = getProjects('en')
