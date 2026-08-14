export interface Project {
  org: string;
  url: string;
  description: string;
  image: string;
  imageAlt: string;
  links?: AboutLink[];
}

export interface AboutLink {
  anchor: string;
  href: string;
  label: string;
}

export interface AboutParagraph {
  text: string;
  highlight: string;
  links?: AboutLink[];
}

export interface Service {
  text: string;
  tags: string[];
}

export interface NavLabels {
  about: string;
  work: string;
  services: string;
  contact: string;
}

export interface CookieRow {
  name: string;
  provider: string;
  duration: string;
  description: string;
}

export interface CookieCategoryCopy {
  title: string;
  description: string;
  cookies: CookieRow[];
}

export interface CookieConsentCopy {
  title: string;
  description: string;
  acceptAllBtn: string;
  acceptNecessaryBtn: string;
  showPreferencesBtn: string;
  closeIconLabel: string;
  preferencesTitle: string;
  savePreferencesBtn: string;
  cookieTableHeaders: {
    name: string;
    provider: string;
    duration: string;
    description: string;
  };
  necessary: CookieCategoryCopy;
  analytics: CookieCategoryCopy;
  marketing: CookieCategoryCopy;
}

export interface CookiePolicyCopy {
  backHomeLabel: string;
  heading: string;
  intro: string;
  whatAreCookiesHeading: string;
  whatAreCookiesBody: string;
  typesHeading: string;
  typesBody: string;
  disableHeading: string;
  disableBody: string;
  browserLinks: { label: string; href: string }[];
  tableHeading: string;
  manageHeading: string;
  manageBody: string;
  manageButton: string;
  contactBody: string;
}

export interface PageContent {
  lang: 'en' | 'es';
  title: string;
  description: string;
  greeting: string;
  nav: NavLabels;
  about: AboutParagraph[];
  projectsHeading: string;
  projects: Project[];
  servicesHeading: string;
  services: Service[];
  ctaText: string;
  ctaEmail: string;
  copyLabel: string;
  copiedLabel: string;
  statusLine: string;
  langSwitchLabel: string;
  cookieConsent: CookieConsentCopy;
  cookiePolicy: CookiePolicyCopy;
}

export const en: PageContent = {
  lang: 'en',
  title: 'Dahiana Porto | Low-code and AI Product Builder',
  description:
    "Dahiana Porto is a low-code and AI product builder. Products, automations, and SEO/AEO for Minimum, Inusual, Noctorial, KeepCoding, Divino Hotels, and Fortnight.Studio.",
  greeting: "Hey, I'm Dahiana Porto",
  nav: {
    about: 'About',
    work: 'Work',
    services: 'Services',
    contact: 'Contact',
  },
  about: [
    {
      text: "I'm a low-code and AI Product Builder. I used to work in marketing. At some point I realised I didn't just want to promote products, I wanted to build them. So I moved into no/low-code development, bringing along everything my time as a CMO taught me about strategy, customer journey, and running projects and teams.",
      highlight: "I'm a low-code and AI Product Builder.",
      links: [
        {
          anchor: 'CMO',
          href: 'https://www.linkedin.com/in/low-code-ai-automation-dahiana-porto/',
          label: "Dahiana Porto's LinkedIn profile",
        },
      ],
    },
    {
      text: "That's what I've been doing for the last few years: building digital products of all kinds with Bubble, Webflow, WordPress, Supabase and automations with AI and n8n.",
      highlight: '',
      links: [
        {
          anchor: 'n8n',
          href: 'https://n8n.io/creators/mssporto/',
          label: "Dahiana Porto's n8n creator profile",
        },
      ],
    },
    {
      text: "I also know my way around design, SEO/AEO, and I've done a fair bit of teaching.",
      highlight: '',
    },
    {
      text: "So if you need a low-code product developer who thinks about the business side too, I'm your person.",
      highlight: '',
    },
  ],
  projectsHeading: 'Some of the clients I’ve worked with',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Worked for one of the best development studios in the world and built the foundations of Yonder and The Village.',
      image: 'www.minimum.studio.png',
      links: [
        {
          anchor: 'Yonder',
          href: 'https://www.liveyonder.co/',
          label: 'Yonder website homepage, a product Dahiana helped build the foundations of',
        },
        {
          anchor: 'The Village',
          href: 'https://www.thevillagechildren.com/',
          label: 'The Village website homepage, a product Dahiana helped build the foundations of',
        },
      ],
      imageAlt: 'Minimum Studio website homepage, a development studio site Dahiana helped build the foundations of',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Created style guides, organized site structure, built landing pages, and optimized SEO from scratch.',
      image: 'inusual.com.png',
      imageAlt: 'Inusual website homepage, built with a style guide and SEO structure created from scratch',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Handled various product team responsibilities: improving their Bubble app, documentation, and website.',
      image: 'noctorial.com.png',
      imageAlt: 'Noctorial website homepage, a Bubble app product Dahiana improved alongside its documentation',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Worked as CMO. Also, created a digital marketing bootcamp and taught classes in it.',
      image: 'keepcoding.io.png',
      imageAlt: 'KeepCoding website homepage, a digital marketing bootcamp where Dahiana served as CMO',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Built Webflow websites for their portfolio, using Client First approach, including GG Hostel and Casa Lolita.',
      image: 'divino-hotels.png',
      imageAlt: 'Divino Hotels portfolio website, including GG Hostel and Casa Lolita, built by Dahiana',
      links: [
        {
          anchor: 'GG Hostel',
          href: 'https://www.gghostel.com/',
          label: 'GG Hostel website homepage, a product Dahiana helped build the foundations of',
        },
        {
          anchor: 'Casa Lolita',
          href: 'https://www.casalolita.es/',
          label: 'Casa Lolita website homepage, a product Dahiana helped build the foundations of',
        },
      ],
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Developed agentic workflows and automation solutions on content generation, document organization.',
      image: 'www.fortnight.studio.png',
      imageAlt: 'Fortnight.Studio website homepage, where Dahiana developed agentic AEO and automation workflows',
    },
  ],
  servicesHeading: 'What I can help with',
  services: [
    {
      text: 'Building apps and MVPs with Bubble — from a first prototype to a working product.',
      tags: ['BUBBLE','MVP', 'WEB APPS', 'LOW-CODE AI BUILDER'],
    },
    {
      text: 'Creating websites and landing pages with Webflow, WordPress, or Framer.',
      tags: ['WEBFLOW DEVELOPMENT', 'WEB DESIGN', 'DESIGN & LAYOUT'],
    },
    {
      text: 'Building automations from scratch with n8n, including AI/agentic workflows.',
      tags: ['WORKFLOW AUTOMATION', 'N8N AUTOMATION', 'AGENTIC WORKFLOWS'],
    },
    {
      text: 'SEO and AEO strategy, content marketing, and making sites easier for AI answer engines to cite.',
      tags: ['SEO STRATEGY', 'AEO OPTIMIZATION', 'CONTENT MARKETING'],
    },
  ],
  ctaText: "Whether you're starting something new or improving what you have, let's chat.",
  ctaEmail: 'hello@dahiana.work',
  copyLabel: 'Copy email address',
  copiedLabel: 'Copied!',
  statusLine: 'Available for new projects.',
  langSwitchLabel: 'ES',
  cookieConsent: {
    title: 'Cookie preferences',
    description:
      'I use a few cookies to understand how people use this site. Nothing gets tracked until you say yes, and you can change your mind anytime. Check out the <a href="/cookies/" target="_blank" rel="noopener noreferrer">cookie policy</a>.',
    acceptAllBtn: 'Accept all',
    acceptNecessaryBtn: 'Reject',
    showPreferencesBtn: 'Manage preferences',
    closeIconLabel: 'Close',
    preferencesTitle: 'Cookie preferences',
    savePreferencesBtn: 'Save preferences',
    cookieTableHeaders: {
      name: 'Cookie',
      provider: 'Provider',
      duration: 'Duration',
      description: 'Purpose',
    },
    necessary: {
      title: 'Necessary',
      description: 'Required to remember your cookie choice. Always on.',
      cookies: [
        {
          name: 'cc_cookie',
          provider: 'dahiana.work (own)',
          duration: '6 months',
          description: 'Stores your cookie preferences so this banner doesn’t show again on every visit.',
        },
      ],
    },
    analytics: {
      title: 'Analytics',
      description: 'Helps me understand which pages and links people actually use, via Google Analytics.',
      cookies: [
        {
          name: '_ga',
          provider: 'Google Analytics',
          duration: '2 years',
          description: 'Distinguishes unique visitors to measure site usage.',
        },
        {
          name: '_ga_XS2FF5S29E',
          provider: 'Google Analytics',
          duration: '2 years',
          description: 'Persists session state for this site’s Google Analytics 4 property.',
        },
      ],
    },
    marketing: {
      title: 'Marketing',
      description:
        'Not currently used on this site, reserved for future advertising or retargeting tools, if any are ever added.',
      cookies: [],
    },
  },
  cookiePolicy: {
    backHomeLabel: 'Back to home',
    heading: 'Cookie policy',
    intro:
      'This page explains what cookies dahiana.work uses, why, and how you can change your mind at any time.',
    whatAreCookiesHeading: 'What are cookies?',
    whatAreCookiesBody:
      'Cookies are small files a website can store in your browser. They let a site remember information about your visit (like a preference you set) so it doesn’t have to ask again.',
    typesHeading: 'What this site actually uses',
    typesBody:
      'This site keeps things minimal: one first-party cookie to remember your consent choice, and, only if you opt in, two Google Analytics cookies to understand which pages and links get used. There is no advertising or retargeting on this site today (the "Marketing" category exists in the consent settings only in case that ever changes), and nothing is stored under it right now.',
    disableHeading: 'Blocking or deleting cookies',
    disableBody:
      'You can allow, block, or delete cookies at any time through your browser settings, or by revisiting your preferences on this site below. Blocking the necessary cookie means this banner will show again on every visit.',
    browserLinks: [
      { label: 'Chrome', href: 'https://support.google.com/accounts/answer/61416' },
      { label: 'Firefox', href: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
      { label: 'Safari', href: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
      { label: 'Microsoft Edge', href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
    ],
    tableHeading: 'Cookies used on this site',
    manageHeading: 'Change your choice',
    manageBody: 'You can update or withdraw your consent at any time.',
    manageButton: 'Manage cookie preferences',
    contactBody: 'Questions about this policy? Email hello@dahiana.work.',
  },
};

export const es: PageContent = {
  lang: 'es',
  title: 'Dahiana Porto | Low-code y AI Product Builder',
  // description intentionally stays close to the English version (brand terms like
  // "low-code" and "AI" read the same in both languages) — not an untranslated leftover.
  description:
    'Dahiana Porto es constructora low-code y de IA. Productos, automatizaciones y SEO/AEO para Minimum, Inusual, Noctorial, KeepCoding, Divino Hotels y Fortnight.Studio.',
  greeting: 'Hola, soy Dahiana Porto',
  nav: {
    about: 'Sobre mí',
    work: 'Proyectos',
    services: 'Servicios',
    contact: 'Contacto',
  },
  about: [
    {
      text: 'Low-code y AI Product Builder. Antes me dedicaba al marketing. Un día me di cuenta de que no quería solo promocionar productos. Quería construirlos. Así me convertí en desarrolladora no-code y low-code.',
      highlight: 'Low-code y AI Product Builder',
    },
    {
      text: 'A eso llevo dedicándome estos últimos años: a construir productos digitales de todo tipo con Bubble, Webflow, WordPress, Framer y n8n, aplicando además todo lo que había aprendido en mi rol anterior como CMO: estrategia, customer journey, sacar proyectos adelante y llevar equipos.',
      highlight: '',
      links: [
        {
          anchor: 'n8n',
          href: 'https://n8n.io/creators/mssporto/',
          label: 'Perfil de creadora de Dahiana Porto en n8n',
        },
        {
          anchor: 'CMO',
          href: 'https://www.linkedin.com/in/low-code-ai-automation-dahiana-porto/',
          label: 'Perfil de LinkedIn de Dahiana Porto',
        },
      ],
    },
    {
      text: 'Y por el camino también me he ido metiendo en diseño y en SEO/AEO, y he dado unas cuantas clases.',
      highlight: '',
    },
    {
      text: 'Si buscas a alguien que tenga el conocimiento técnico y la visión de negocio para construir productos digitales, cuenta conmigo.',
      highlight: '',
    },
  ],
  projectsHeading: 'Algunos de los clientes con los que he trabajado',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Trabajé con uno de los mejores estudios de desarrollo del mundo y construí las bases de Yonder y The Village.',
      image: 'www.minimum.studio.png',
      links: [
        {
          anchor: 'Yonder',
          href: 'https://www.liveyonder.co/',
          label: 'Página de inicio de Yonder, un producto cuyas bases ayudó a construir Dahiana',
        },
        {
          anchor: 'The Village',
          href: 'https://www.thevillagechildren.com/',
          label: 'Página de inicio de The Village, un producto cuyas bases ayudó a construir Dahiana',
        },
      ],
      imageAlt: 'Página de inicio de Minimum Studio, un estudio de desarrollo cuyas bases ayudó a construir Dahiana',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Creé guías de estilo, organicé la estructura del sitio, construí landing pages y optimicé el SEO desde cero.',
      image: 'inusual.com.png',
      imageAlt: 'Página de inicio de Inusual, construida con una guía de estilo y estructura SEO creadas desde cero',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Me encargué de distintas responsabilidades de producto: mejorando su app en Bubble, la documentación y el sitio web.',
      image: 'noctorial.com.png',
      imageAlt: 'Página de inicio de Noctorial, un producto en Bubble que Dahiana mejoró junto con su documentación',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Fui CMO. Creé un bootcamp de marketing digital desde cero e impartí clases en él.',
      image: 'keepcoding.io.png',
      imageAlt: 'Página de inicio de KeepCoding, un bootcamp de marketing digital donde Dahiana fue CMO',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Construí los sitios web de todo el portfolio, incluyendo GG Hostel y Casa Lolita.',
      image: 'divino-hotels.png',
      links: [
        {
          anchor: 'GG Hostel',
          href: 'https://www.gghostel.com/',
          label: 'Página de inicio de GG Hostel, un producto cuyas bases ayudó a construir Dahiana',
        },
        {
          anchor: 'Casa Lolita',
          href: 'https://www.casalolita.es/',
          label: 'Página de inicio de Casa Lolita, un producto cuyas bases ayudó a construir Dahiana',
        },
      ],
      imageAlt: 'Sitio web del portfolio de Divino Hotels, incluyendo GG Hostel y Casa Lolita, construido por Dahiana',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Creé agentic workflows y automatizaciones.',
      image: 'www.fortnight.studio.png',
      imageAlt: 'Página de inicio de Fortnight.Studio, donde Dahiana desarrolló agentic workflows y automatizaciones',
    },
  ],
  servicesHeading: 'En qué puedo ayudarte',
  services: [
    {
      text: 'Construir apps y MVPs con Bubble, desde un primer prototipo hasta un producto funcional.',
      tags: ['BUBBLE','MVP', 'WEB APPS', 'LOW-CODE AI BUILDER'],
    },
    {
      text: 'Crear páginas web y landing pages con Webflow, WordPress o Framer.',
      tags: ['DESARROLLO WEBFLOW', 'DESARROLLO WORDPRESS', 'DISEÑO Y MAQUETACIÓN'],
    },
    {
      text: 'Construir desde cero o mantener automatizaciones con n8n o IA, incluyendo workflows agénticos.',
      tags: ['MANTENIMIENTO DE FLUJOS', 'AUTOMATIZACIÓN CON IA'],
    },
    {
      text: 'Estrategia SEO y AEO, marketing de contenido, y hacer que los sitios sean más fáciles de citar para motores de respuesta con IA.',
      tags: ['ESTRATEGIA SEO', 'OPTIMIZACIÓN AEO', 'MARKETING DE CONTENIDO'],
    },
  ],
  ctaText: 'Tanto si estás empezando algo nuevo como si quieres mejorar lo que ya tienes, hablemos.',
  ctaEmail: 'hello@dahiana.work',
  copyLabel: 'Copiar dirección de email',
  copiedLabel: '¡Copiado!',
  statusLine: 'Disponible para nuevos proyectos.',
  langSwitchLabel: 'EN',
  cookieConsent: {
    title: 'Preferencias de Cookies',
    description:
      'Este sitio usa cookies para entender cómo lo utilizas. No se activará ningún seguimiento hasta que las aceptes, y puedes cambiar de opinión cuando quieras. Lee la <a href="/es/cookies/" target="_blank" rel="noopener noreferrer">Política de Cookies</a>.',
    acceptAllBtn: 'Aceptar todo',
    acceptNecessaryBtn: 'Rechazar todo',
    showPreferencesBtn: 'Gestionar preferencias',
    closeIconLabel: 'Cerrar',
    preferencesTitle: 'Preferencias de cookies',
    savePreferencesBtn: 'Guardar preferencias',
    cookieTableHeaders: {
      name: 'Cookie',
      provider: 'Proveedor',
      duration: 'Duración',
      description: 'Finalidad',
    },
    necessary: {
      title: 'Necesarias',
      description: 'Son necesarias para recordar tu elección sobre las cookies. Siempre activas.',
      cookies: [
        {
          name: 'cc_cookie',
          provider: 'dahiana.work (propia)',
          duration: '6 meses',
          description: 'Guarda tu elección sobre las cookies para que este aviso no vuelva a aparecer en cada visita.',
        },
      ],
    },
    analytics: {
      title: 'Analítica',
      description: 'Me ayuda a entender qué páginas visitas y qué enlaces usas, a través de Google Analytics.',
      cookies: [
        {
          name: '_ga',
          provider: 'Google Analytics',
          duration: '2 años',
          description: 'Distingue a los usuarios únicos para medir el uso del sitio.',
        },
        {
          name: '_ga_XS2FF5S29E',
          provider: 'Google Analytics',
          duration: '2 años',
          description: 'Mantiene el estado de sesión para la propiedad de Google Analytics 4 de este sitio.',
        },
      ],
    },
    marketing: {
      title: 'Marketing',
      description:
        'De momento no se usan. Está reservado por si en el futuro se añaden herramientas de publicidad o retargeting.',
      cookies: [],
    },
  },
  cookiePolicy: {
    backHomeLabel: 'Volver al inicio',
    heading: 'Política de cookies',
    intro:
      'Esta página explica qué cookies usa dahiana.work, para qué, y cómo puedes cambiar de opinión en cualquier momento.',
    whatAreCookiesHeading: '¿Qué son las cookies?',
    whatAreCookiesBody:
      'Las cookies son pequeños archivos que un sitio web puede guardar en tu navegador. Permiten que el sitio recuerde información sobre tu visita, como una preferencia que elegiste, para no tener que volver a preguntarla.',
    typesHeading: 'Qué usa realmente este sitio',
    typesBody:
      'Este sitio mantiene las cosas mínimas: una cookie propia para recordar tu elección de consentimiento y, solo si lo aceptas, dos cookies de Google Analytics para entender qué páginas y enlaces se usan. Hoy no hay publicidad ni retargeting en este sitio; la categoría "Marketing" existe en las preferencias solo por si eso cambia en el futuro, y de momento no se guarda nada en ella.',
    disableHeading: 'Bloquear o eliminar cookies',
    disableBody:
      'Puedes permitir, bloquear o eliminar las cookies en cualquier momento desde la configuración de tu navegador, o volviendo a tus preferencias en este sitio más abajo. Bloquear la cookie necesaria hará que este aviso vuelva a aparecer en cada visita.',
    browserLinks: [
      { label: 'Chrome', href: 'https://support.google.com/accounts/answer/61416?hl=es' },
      { label: 'Firefox', href: 'https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox' },
      { label: 'Safari', href: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
      { label: 'Microsoft Edge', href: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
    ],
    tableHeading: 'Cookies usadas en este sitio',
    manageHeading: 'Cambia tu elección',
    manageBody: 'Puedes actualizar o retirar tu consentimiento en cualquier momento.',
    manageButton: 'Gestionar preferencias de cookies',
    contactBody: '¿Dudas sobre esta política? Escribe a hello@dahiana.work.',
  },
};
