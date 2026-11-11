/**
 * English UI strings.
 *
 * Rich paragraphs are arrays of segments rendered by `RichText.vue`:
 * a plain string is normal text, `{ strong: '...' }` is emphasised text.
 * Keep the shape of this file identical to `it.js`.
 */
export default {
  meta: {
    title: 'Simone Maccario | Data Systems & Software Engineering',
    description:
      'Portfolio of Simone Maccario, MSc Computer Science student at ETH Zurich (Data Management & Machine Intelligence): data pipelines, static analysis, search systems and full-stack applications.',
  },
  a11y: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    homeLink: 'Simone Maccario, back to top',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    backToTop: 'Back to top',
    githubProfile: 'Simone Maccario on GitHub',
    linkedinProfile: 'Simone Maccario on LinkedIn',
    opensInNewTab: '(opens in a new tab)',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    cv: 'CV',
    cvLong: 'Download CV (PDF)',
    language: 'Language',
  },
  languageSwitcher: {
    label: 'Language selector',
    enLabel: 'Switch to English',
    itLabel: 'Passa all’italiano',
  },
  hero: {
    sectionLabel: 'Introduction',
    availability: 'Open to internships & part-time roles',
    academicBadgeOrg: 'ETH Zurich',
    academicBadgeDegree: 'MSc in Computer Science',
    academicBadgeTrack: 'Data Management & Machine Intelligence',
    titlePrefix: 'Engineering Reliable',
    titleGradient: 'Data Systems & Software',
    pitch: [
      'Hi, I’m ',
      { strong: 'Simone Maccario' },
      '. I build data pipelines, analysis tools and full-stack applications, from static analysis over 100,000+ student code runs to offline-first web apps used at the game table.',
    ],
    chips: [
      'Data Engineering',
      'Static Analysis',
      'Information Retrieval',
      'Full-Stack Development',
    ],
    exploreProjects: 'Explore Projects',
    getInTouch: 'Get in Touch',
    scrollHint: 'Scroll to the about section',
  },
  about: {
    sectionLabel: 'About',
    eyebrow: 'About',
    sectionTitle: 'Background & Approach',
    sectionSubtitle: 'Where data systems meet carefully engineered software.',
    profileAlt: 'Portrait of Simone Maccario',
    journeyTitle: 'Journey',
    educationLabel: 'Education',
    experienceLabel: 'Experience',
    downloadCv: 'Download Curriculum Vitae (PDF)',
    cvAriaLabel: 'Download Simone Maccario’s Curriculum Vitae in English (PDF)',
    narrative: [
      [
        'I am a ',
        { strong: 'Master’s student in Computer Science at ETH Zurich' },
        ', specialising in ',
        { strong: 'Data Management and Machine Intelligence' },
        '. I am interested in how data is stored, processed and turned into decisions, and in the software that makes this reliable.',
      ],
      [
        'I graduated magna cum laude in Informatics at USI Lugano. For my Bachelor’s thesis I built an analytics pipeline that reconstructs learner sessions from PostgreSQL telemetry and runs static analysis on more than 100,000 code executions. As a ',
        { strong: 'Data Engineering Intern at Brightside Capital' },
        ', I automated the import and validation of banking data from AWS.',
      ],
      [
        'I also enjoy shipping polished products: from interfaces built with ',
        { strong: 'React, Vue 3 and Tailwind CSS' },
        ' to back ends with ',
        { strong: 'Spring Boot, FastAPI and Docker' },
        ', I aim for software that is modular, tested and easy to maintain.',
      ],
    ],
    pillars: [
      {
        title: 'Data Pipelines & Analysis',
        description:
          'Python pipelines over relational data, batch processing with caching, and static code analysis at scale.',
      },
      {
        title: 'Search & Formal Reasoning',
        description:
          'Information retrieval with Solr and Carrot2 clustering, and planning problems encoded as SAT.',
      },
      {
        title: 'Full-Stack Products',
        description:
          'Responsive web apps (React, Vue 3), REST back ends (Spring Boot, FastAPI), automated tests and CI/CD.',
      },
    ],
  },
  skills: {
    sectionLabel: 'Skills',
    eyebrow: 'Toolbox',
    sectionTitle: 'Technical Skills',
    sectionSubtitle:
      'The languages, frameworks and tools I use across data, back-end and front-end work.',
  },
  projects: {
    sectionLabel: 'Projects',
    eyebrow: 'Selected work',
    sectionTitle: 'Projects & Research',
    sectionSubtitle:
      'Personal and university projects, from SAT-based planners and search engines to my Bachelor’s thesis.',
    filterLabel: 'Filter projects by category',
    categories: {
      all: 'All',
      personal: 'Personal',
      university: 'University',
      thesis: 'Thesis',
    },
    flagshipBadge: 'Featured',
    contextBadges: {
      personal: 'Personal Project',
      university: 'University Project',
      thesis: 'Bachelor’s Thesis',
    },
    privateCode: 'Private source code',
    privateCodeHint: 'The source code belongs to an institutional project and is not public.',
    openDetails: 'Details',
    openDetailsAria: 'Open the details for',
    closeDialog: 'Close details',
    challengeTitle: 'The challenge',
    approachTitle: 'Approach & architecture',
    highlightsTitle: 'Key results',
    stackTitle: 'Tech stack',
    moreTags: 'more',
    sourceCode: 'Source code',
    sourceCodeAria: 'View the source code of',
    readThesis: 'Read thesis',
    readThesisAria: 'Read the thesis PDF for',
    liveDemo: 'Live demo',
    liveDemoAria: 'Open the live demo of',
    emptyState: 'No projects found in this category.',
  },
  contact: {
    sectionLabel: 'Contact',
    eyebrow: 'Contact',
    sectionTitlePrefix: 'Let’s Work',
    sectionTitleHighlight: 'Together',
    sectionSubtitle:
      'I’m open to internships, part-time roles and interesting technical conversations. Feel free to reach out!',
    formTitle: 'Send Me a Message',
    formSubtitle:
      'Have an opportunity, a project idea or a question? I’d be glad to hear from you.',
    formAria: 'Contact form',
    nameLabel: 'Your Name',
    namePlaceholder: 'Jane Doe',
    emailLabel: 'Email Address',
    emailPlaceholder: 'jane.doe@example.com',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Tell me about the role, project or question you have in mind…',
    footerNote: 'I usually reply within 24–48 hours.',
    successMessage: 'Thanks for your message! I’ll get back to you soon.',
    methods: {
      email: 'Drop me an email anytime',
      github: 'Browse my repositories',
      linkedin: 'Let’s connect professionally',
      locationTitle: 'Location',
      locationValue: 'Zurich, Switzerland',
      location: 'Master’s student at ETH Zurich',
    },
    validation: {
      nameRequired: 'Please enter your name.',
      nameMin: 'Your name must be at least 2 characters long.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      messageRequired: 'Please enter a message.',
      messageMin: 'Your message must be at least 10 characters long.',
      captchaRequired: 'Please complete the captcha verification.',
      submitFailed: 'Your message could not be sent. Please try again or email me directly.',
    },
    button: {
      idle: 'Send Message',
      loading: 'Sending…',
      success: 'Message Sent!',
      error: 'Failed, Please Try Again',
    },
  },
  footer: {
    builtWith: 'Built with Vue 3 & Tailwind CSS.',
  },
}
