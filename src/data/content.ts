export interface Project {
  org: string;
  url: string;
  description: string;
  image: string;
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
    {
      text: "I'm a low-code and AI builder. I started out in marketing and grew into a CMO role, where I explored every facet of the field. Over time, I realized I didn't just want to promote products. I wanted to build them.",
      highlight: "I'm a low-code and AI builder.",
    },
    {
      text: "So for the past four years, I've been developing products using Low-Code, AI and Automation, while also diving into design and doing some teaching along the way.",
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
      image: '/images/www.minimum.studio.png',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Created style guides, organized site structure, built landing pages, and optimized SEO from scratch.',
      image: '/images/inusual.com.png',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Handled various product team responsibilities: improving their Bubble app, documentation, and website.',
      image: '/images/noctorial.com.png',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Served as CMO and taught classes for a digital marketing bootcamp.',
      image: '/images/keepcoding.io.png',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Built websites for the entire portfolio, including GG Hostel and Casa Lolita.',
      image: '/images/divino-hotels.png',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Developed agentic workflows, AEO, and automation solutions.',
      image: '/images/www.fortnight.studio.png',
    },
  ],
  servicesHeading: 'What I can help with',
  services: [
    { text: 'Building apps and MVPs with Bubble.', tags: ['MVP', 'WEB APPS', 'LOW-CODE AI BUILDER'] },
    {
      text: 'Creating websites and landing pages with Webflow, WordPress, or Framer.',
      tags: ['WEBFLOW DEVELOPMENT', 'WEB DESIGN', 'DESIGN & LAYOUT'],
    },
    {
      text: 'Building automations from scratch with n8n.',
      tags: ['WORKFLOW AUTOMATION', 'N8N AUTOMATION', 'AGENTIC WORKFLOWS'],
    },
    {
      text: 'SEO, AEO, automations, content marketing, and more.',
      tags: ['SEO STRATEGY', 'AEO OPTIMIZATION', 'CONTENT MARKETING'],
    },
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
    {
      text: 'Soy constructora low-code y de IA. Empecé en marketing y crecí hasta un rol de CMO, donde exploré cada faceta del área. Con el tiempo, me di cuenta de que no solo quería promocionar productos: quería construirlos.',
      highlight: 'Soy constructora low-code y de IA.',
    },
    {
      text: 'Así que durante los últimos cuatro años he estado desarrollando productos con Low-Code, IA y Automatización, mientras profundizaba en diseño y enseñaba en el camino.',
      highlight: 'Low-Code, IA y Automatización',
    },
  ],
  projectsHeading: 'Algunos de los clientes con los que he trabajado',
  projects: [
    {
      org: 'Minimum',
      url: 'https://www.minimum.studio/',
      description:
        'Trabajé para uno de los mejores estudios de desarrollo del mundo y construí las bases de Yonder y The Village.',
      image: '/images/www.minimum.studio.png',
    },
    {
      org: 'Inusual',
      url: 'https://www.inusual.com/',
      description:
        'Creé guías de estilo, organicé la estructura del sitio, construí landing pages y optimicé el SEO desde cero.',
      image: '/images/inusual.com.png',
    },
    {
      org: 'Noctorial',
      url: 'https://noctorial.com/',
      description:
        'Me encargué de distintas responsabilidades de producto: mejorando su app en Bubble, la documentación y el sitio web.',
      image: '/images/noctorial.com.png',
    },
    {
      org: 'KeepCoding',
      url: 'https://keepcoding.io/',
      description: 'Fui CMO y di clases en un bootcamp de marketing digital.',
      image: '/images/keepcoding.io.png',
    },
    {
      org: 'Divino Hotels',
      url: 'https://www.gghostel.com/',
      description: 'Construí los sitios web de todo el portfolio, incluyendo GG Hostel y Casa Lolita.',
      image: '/images/divino-hotels.png',
    },
    {
      org: 'Fortnight.Studio',
      url: 'https://www.fortnight.studio/',
      description: 'Desarrollé workflows agénticos, AEO y soluciones de automatización.',
      image: '/images/www.fortnight.studio.png',
    },
  ],
  servicesHeading: 'En qué puedo ayudarte',
  services: [
    { text: 'Construir apps y MVPs con Bubble.', tags: ['MVP', 'LOW-CODE AI BUILDER'] },
    {
      text: 'Crear páginas web y landing pages con Webflow, WordPress o Framer.',
      tags: ['DESARROLLO WEBFLOW', 'DESARROLLO WORDPRESS', 'DISEÑO Y MAQUETACIÓN'],
    },
    {
      text: 'Construir desde cero o mantener automatizaciones con n8n o IA.',
      tags: ['AUTOMATIZACIÓN DE FLUJOS', 'AUTOMATIZACIÓN CON IA'],
    },
    {
      text: 'SEO, AEO, automatizaciones, marketing de contenido y más.',
      tags: ['ESTRATEGIA SEO', 'OPTIMIZACIÓN AEO', 'MARKETING DE CONTENIDO'],
    },
  ],
  ctaText: 'Ya sea que estés empezando algo nuevo o mejorando lo que ya tienes, hablemos.',
  ctaEmail: 'hello@dahiana.work',
  statusLine: 'Disponible para nuevos proyectos.',
  langSwitchLabel: 'EN',
};
