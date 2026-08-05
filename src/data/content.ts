export interface Project {
  org: string;
  url: string;
  description: string;
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
  about: string[];
  projectsHeading: string;
  projects: Project[];
  servicesHeading: string;
  services: string[];
  ctaText: string;
  ctaEmail: string;
  statusLine: string;
  langSwitchLabel: string;
}

export const en: PageContent = {
  lang: 'en',
  title: 'Dahiana Porto — Low-code & AI builder',
  description:
    "Dahiana Porto is a low-code and AI builder. Products, automations, and SEO/AEO for Minimum, Inusual, Noctorial, KeepCoding, Divino Hotels, and Fortnight.Studio.",
  greeting: "Hey, I'm Dahiana Porto",
  nav: {
    about: 'About',
    work: 'Work',
    services: 'Services',
    contact: 'Contact',
  },
  about: [
    "I'm a low-code and AI builder. I started out in marketing and grew into a CMO role, where I explored every facet of the field. Over time, I realized I didn't just want to promote products. I wanted to build them.",
    "So for the past four years, I've been developing products using low-code tools, while also diving into design and doing some teaching along the way.",
  ],
  projectsHeading: 'Some of the projects I’ve worked on',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Worked for one of the best development studios in the world and built the foundations of Yonder and The Village.',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Created style guides, organized site structure, built landing pages, and optimized SEO from scratch.',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Handled various product team responsibilities: improving their Bubble app, documentation, and website.',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Served as CMO and taught classes for a digital marketing bootcamp.',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Built websites for the entire portfolio, including GG Hostel and Casa Lolita.',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Developed agentic workflows, AEO, and automation solutions.',
    },
  ],
  servicesHeading: 'What I can help with',
  services: [
    'Building apps and MVPs with Bubble.',
    'Creating websites and landing pages with Webflow, WordPress, or Framer.',
    'Building automations from scratch with n8n.',
    'SEO, AEO, automations, content marketing, and more.',
  ],
  ctaText: "Whether you're starting something new or improving what you have, let's chat.",
  ctaEmail: 'hello@dahiana.work',
  statusLine: 'Available for new projects.',
  langSwitchLabel: 'ES',
};

export const es: PageContent = {
  lang: 'es',
  title: 'Dahiana Porto — Constructora low-code y de IA',
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
    'Soy constructora low-code y de IA. Empecé en marketing y crecí hasta un rol de CMO, donde exploré cada faceta del área. Con el tiempo, me di cuenta de que no solo quería promocionar productos: quería construirlos.',
    'Así que durante los últimos cuatro años he estado desarrollando productos con herramientas low-code, mientras profundizaba en diseño y enseñaba en el camino.',
  ],
  projectsHeading: 'Algunos de los proyectos en los que he trabajado',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Trabajé para uno de los mejores estudios de desarrollo del mundo y construí las bases de Yonder y The Village.',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Creé guías de estilo, organicé la estructura del sitio, construí landing pages y optimicé el SEO desde cero.',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Me encargué de distintas responsabilidades de producto: mejorando su app en Bubble, la documentación y el sitio web.',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Fui CMO y di clases en un bootcamp de marketing digital.',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Construí los sitios web de todo el portfolio, incluyendo GG Hostel y Casa Lolita.',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Desarrollé workflows agénticos, AEO y soluciones de automatización.',
    },
  ],
  servicesHeading: 'En qué puedo ayudarte',
  services: [
    'Construir apps y MVPs con Bubble.',
    'Crear sitios web y landing pages con Webflow, WordPress o Framer.',
    'Construir automatizaciones desde cero con n8n.',
    'SEO, AEO, automatizaciones, marketing de contenido y más.',
  ],
  ctaText: 'Ya sea que estés empezando algo nuevo o mejorando lo que ya tienes, hablemos.',
  ctaEmail: 'hello@dahiana.work',
  statusLine: 'Disponible para nuevos proyectos.',
  langSwitchLabel: 'EN',
};
