export interface Project {
  org: string;
  url: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface AboutParagraph {
  text: string;
  highlight: string;
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
}

export const en: PageContent = {
  lang: 'en',
  title: 'Dahiana Porto — low-code and AI Product Builder',
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
      text: "I'm a low-code and AI Product Builder. I started out in marketing and grew into a CMO role, where I explored every facet of the field. Over time, I realized I didn't just want to promote products. I wanted to build them.",
      highlight: "I'm a low-code and AI Product Builder.",
    },
    {
      text: "So for the past years, I've been developing products using Low-Code, AI and Automation as well as No-Code tools like Bubble, Webflow, WordPress, Framer, and n8n, while also diving into design, SEO/AEO strategy, and doing some teaching along the way.",
      highlight: 'Low-Code, AI and Automation',
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
      description: 'Served as CMO and taught classes for a digital marketing bootcamp.',
      image: 'keepcoding.io.png',
      imageAlt: 'KeepCoding website homepage, a digital marketing bootcamp where Dahiana served as CMO',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Built websites for the entire portfolio, including GG Hostel and Casa Lolita.',
      image: 'divino-hotels.png',
      imageAlt: 'Divino Hotels portfolio website, including GG Hostel and Casa Lolita, built by Dahiana',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Developed agentic workflows, AEO, and automation solutions.',
      image: 'www.fortnight.studio.png',
      imageAlt: 'Fortnight.Studio website homepage, where Dahiana developed agentic AEO and automation workflows',
    },
  ],
  servicesHeading: 'What I can help with',
  services: [
    {
      text: 'Building apps and MVPs with Bubble — from a first prototype to a working product.',
      tags: ['MVP', 'WEB APPS', 'LOW-CODE AI BUILDER'],
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
};

export const es: PageContent = {
  lang: 'es',
  title: 'Dahiana Porto — low-code and AI Product Builder',
  description:
    'Dahiana Porto es low-code and AI Product Builder. Productos, automatizaciones y SEO/AEO para Minimum, Inusual, Noctorial, KeepCoding, Divino Hotels y Fortnight.Studio.',
  greeting: 'Hola, soy Dahiana Porto',
  nav: {
    about: 'Sobre mí',
    work: 'Proyectos',
    services: 'Servicios',
    contact: 'Contacto',
  },
  about: [
    {
      text: 'Soy low-code and AI Product Builder. Empecé en marketing y acabé en un puesto de CMO, donde exploré cada faceta del sector. Con el tiempo me di cuenta de que no quería solo promocionar productos, sino construirlos.',
      highlight: 'Soy low-code and AI Product Builder',
    },
    {
      text: 'Así que en los últimos años he estado desarrollando productos con low-code, ia y automatización, además de herramientas no-code como Bubble, Webflow, WordPress, Framer y n8n, mientras profundizaba en diseño, estrategia seo/aeo y daba alguna clase por el camino.',
      highlight: 'low-code, ia y automatización',
    },
  ],
  projectsHeading: 'Algunos de los clientes con los que he trabajado',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Trabajé para uno de los mejores estudios de desarrollo del mundo y construí las bases de Yonder y The Village.',
      image: 'www.minimum.studio.png',
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
      description: 'Fui CMO y di clases en un bootcamp de marketing digital.',
      image: 'keepcoding.io.png',
      imageAlt: 'Página de inicio de KeepCoding, donde Dahiana fue CMO',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Construí los sitios web de todo el portfolio, incluyendo GG Hostel y Casa Lolita.',
      image: 'divino-hotels.png',
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
      text: 'Construir apps y MVPs con Bubble — desde un primer prototipo hasta un producto funcional.',
      tags: ['MVP', 'LOW-CODE AI BUILDER'],
    },
    {
      text: 'Crear páginas web y landing pages con Webflow, WordPress o Framer.',
      tags: ['DESARROLLO WEBFLOW', 'DESARROLLO WORDPRESS', 'DISEÑO Y MAQUETACIÓN'],
    },
    {
      text: 'Construir desde cero o mantener automatizaciones con n8n o IA, incluyendo workflows agénticos.',
      tags: ['AUTOMATIZACIÓN DE FLUJOS', 'AUTOMATIZACIÓN CON IA'],
    },
    {
      text: 'Estrategia SEO y AEO, marketing de contenido, y hacer que los sitios sean más fáciles de citar para motores de respuesta con IA.',
      tags: ['ESTRATEGIA SEO', 'OPTIMIZACIÓN AEO', 'MARKETING DE CONTENIDO'],
    },
  ],
  ctaText: 'Ya sea que estés empezando algo nuevo o mejorando lo que ya tienes, hablemos.',
  ctaEmail: 'hello@dahiana.work',
  copyLabel: 'Copiar dirección de email',
  copiedLabel: '¡Copiado!',
  statusLine: 'Disponible para nuevos proyectos.',
  langSwitchLabel: 'EN',
};
