export const personalInfo = {
  name: "Isaac Escobar Vega",
  title: "Ingeniero de Sistemas y Computación",
  subtitle: "Desarrollador Full Stack",
  bio: "Ingeniero de Sistemas y Computación apasionado por crear soluciones tecnológicas innovadoras. Me especializo en el desarrollo de aplicaciones web modernas, con un enfoque en código limpio, rendimiento y experiencia de usuario excepcional.",
  location: "Barranquilla, Colombia",
  email: "issac10.es@gmail.com",
  phone: "+57 300 190 0438",
  availability: "Disponible para nuevas oportunidades",
};

export const socialLinks = {
  github: "https://github.com/isaacescobar0100",
  linkedin: "https://www.linkedin.com/in/isaac-escobar-vega-9884a8220/",
  email: "mailto:issac10.es@gmail.com",
  cv: "/cv.pdf",
};

export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "JavaScript", level: 95 },
    { name: "HTML5/CSS3", level: 95 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Responsive Design", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "SQL", level: 85 },
    { name: "REST APIs", level: 90 },
  ],
  tools: [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "Scrum/Agile", level: 85 },
    { name: "Design Patterns", level: 80 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Sistema de Gestión para Restaurantes",
    description: "Plataforma web completa para restaurantes con sistema de pedidos a domicilio. Incluye módulos de administración, cocina, caja y meseros. Desplegado en servidor VPS (Hostinger) con administración mediante SSH.",
    image: "/projects/restaurant.jpg",
    technologies: ["Python", "Flask", "MySQL", "Redis", "Docker", "Nginx", "Wompi"],
    github: "#",
    demo: "https://demo.vxplay.online/",
    featured: true,
  },
  {
    id: 2,
    title: "SevenJois - Red Social para Cineastas",
    description: "Red social para cineastas amateurs con procesamiento de video (FFmpeg), subtítulos automáticos con IA, y monetización integrada. Incluye soporte móvil con Capacitor.",
    image: "/projects/sevenfilms.jpg",
    technologies: ["React 18", "Vite", "Tailwind", "Supabase", "Zustand", "Capacitor"],
    github: "#",
    demo: "https://sevenfilms.vercel.app/",
    featured: true,
    warning: "La demo puede demorar en cargar y algunas funcionalidades de la red social no estarán disponibles debido a que Supabase está temporalmente suspendido por inactividad.",
  },
  {
    id: 3,
    title: "ServiYa - App de Servicios Técnicos",
    description: "Aplicación móvil para conectar usuarios con técnicos y profesionales de diferentes oficios. Permite solicitar servicios de plomería, electricidad, carpintería y más de forma rápida y segura.",
    image: "/projects/serviya.PNG",
    images: ["/projects/serviya.PNG", "/projects/serviya2.PNG"],
    technologies: ["En desarrollo"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "GlowBeauty Caro - Landing Page",
    description: "Página web desarrollada para un cliente con negocio de estética y belleza. Diseño elegante y responsive con información de servicios, galería y contacto.",
    image: "/projects/amiga.PNG",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/isaacescobar0100/GlowBeauty-Caro",
    demo: "https://dev.vxplay.online/glowbeautycaro/index.html",
    featured: false,
  },
  {
    id: 5,
    title: "Sistema de Matrículas",
    description: "Sistema web para gestión de matrículas académicas. Permite el registro y administración de estudiantes, cursos y procesos de inscripción.",
    image: "/projects/matriculas.PNG",
    technologies: ["React", "Vite", "Tailwind CSS", "PHP", "MySQL", "JWT", "Wompi"],
    github: "https://github.com/isaacescobar0100/sistema-matriculas",
    demo: "https://dev.vxplay.online/matriculas/",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    role: "Desarrollador Full Stack Independiente",
    company: "Freelance",
    period: "Presente",
    description: "Desarrollo de aplicaciones web completas para clientes, incluyendo sistemas de gestión, redes sociales y landing pages. Manejo de todo el ciclo de desarrollo desde el diseño hasta el despliegue en servidores VPS.",
    technologies: ["React", "Python", "Flask", "MySQL", "Redis", "Docker", "Nginx", "Wompi", "PHP", "Tailwind CSS", "VPS/SSH"],
  },
  {
    id: 2,
    role: "Practicante de Desarrollo de Software",
    company: "SENA",
    period: "6 meses",
    description: "Práctica profesional en desarrollo de aplicaciones, participando en proyectos reales aplicando metodologías ágiles y buenas prácticas de programación.",
    technologies: ["React", "JavaScript", "MySQL", "PHP", "HTML", "CSS"],
  },
];

export const education = {
  degree: "Ingeniería de Sistemas y Computación",
  institution: "Corporación Universitaria Latinoamericana (CUL)",
  period: "",
  description: "Formación integral en desarrollo de software, bases de datos, redes y sistemas computacionales.",
};

export const navLinks = [
  { name: "Inicio", href: "#inicio" },
  { name: "Sobre Mí", href: "#sobre-mi" },
  { name: "Experiencia", href: "#experiencia" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Habilidades", href: "#habilidades" },
  { name: "Contacto", href: "#contacto" },
];
