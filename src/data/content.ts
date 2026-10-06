/**
 * Contenido del template. Edita este archivo para adaptar la landing a cada dojo:
 * nombre, textos, programas, horarios, testimonios, FAQ y contacto.
 */

export type BeltKey = 'white' | 'yellow' | 'orange' | 'green' | 'blue' | 'brown' | 'black';
export type Level = 'INI' | 'INT' | 'AVZ' | 'TODOS';
export type DayKey = 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom';

export const site = {
  name: 'Dojo Academia',
  tagline: 'Karate tradicional',
  since: 2010,
  city: 'Tu ciudad',
  nav: [
    { label: 'Programas', href: '#programas' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'Preguntas', href: '#faq' },
  ],
  contact: {
    address: 'Av. Principal 123 y Calle Secundaria',
    city: 'Ciudad, País',
    phone: '+593 99 000 0000',
    email: 'hola@tudojo.com',
    whatsapp: 'https://wa.me/593990000000',
    mapsUrl: 'https://maps.google.com',
  },
  social: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
} as const;

export const hero = {
  badge: { tag: 'Nueva oferta', text: 'Tu primera clase es', highlight: '100% gratis' },
  title: ['Artes marciales', 'que valen el'],
  titleAccent: 'camino.',
  subtitle:
    'Forja una disciplina inquebrantable, domina técnicas de élite y honra una tradición milenaria. Tu camino hacia la excelencia empieza aquí.',
  primary: { label: 'Ver clases', href: '#programas' },
  secondary: { label: 'Agendar prueba', href: '#contacto' },
  kanji: '空手',
  kanjiReading: 'Karate · mano vacía',
} as const;

export const story = {
  eyebrow: 'Nuestra historia',
  title: ['Forjados en la tradición.', 'Hechos para hoy.'],
  paragraphs: [
    `Desde ${site.since}, ${site.name} es un referente local en artes marciales japonesas auténticas. Fundado por un sensei con formación certificada y años de entrenamiento con maestros de Okinawa.`,
    'Ya sea que busques defensa personal, alto rendimiento competitivo o crecimiento personal, nuestro dojo es tu casa. Cada alumno, de 5 a 55 años, recibe atención personalizada.',
  ],
  stats: [
    { value: '500+', label: 'Alumnos' },
    { value: '30+', label: 'Medallas' },
    { value: '8', label: 'Estilos' },
  ],
  badge: { value: '15+', label: 'Años de excelencia' },
  cta: { label: 'Únete ahora', href: '#contacto' },
  kanji: '道',
  kanjiReading: 'Dō — el camino',
} as const;

export const programs = {
  eyebrow: 'Programas',
  title: 'Encuentra tu camino.',
  link: { label: 'Todos los programas', href: '#horarios' },
  items: [
    {
      kanji: '子',
      title: 'Karate infantil (5–12)',
      text: 'Entrenamiento divertido y disciplinado, diseñado para pequeños artistas marciales.',
      belt: 'yellow',
      meta: '2 clases / semana',
    },
    {
      kanji: '型',
      title: 'Kata tradicional',
      text: 'Técnicas duras y suaves equilibradas, con movimientos circulares y precisión.',
      belt: 'blue',
      meta: 'Todas las edades',
    },
    {
      kanji: '組',
      title: 'Kumite y competencia',
      text: 'Estilo de contacto enfocado en fuerza, resistencia y espíritu de combate.',
      belt: 'black',
      meta: 'Intermedio – avanzado',
    },
  ] satisfies readonly { kanji: string; title: string; text: string; belt: BeltKey; meta: string }[],
} as const;

export const reasons = {
  eyebrow: 'Por qué entrenar con nosotros',
  title: ['Entrenamos diferente.', 'Formamos diferente.'],
  subtitle: 'Cada detalle de cómo enseñamos, a quién contratamos y cómo estructuramos tu progreso es intencional.',
  link: { label: 'Conoce al equipo', href: '#nosotros' },
  items: [
    {
      icon: 'award',
      title: 'Senseis certificados',
      text: 'Nuestros instructores son cinturones negro de 2.º a 6.º Dan, certificados por federaciones nacionales e internacionales.',
    },
    {
      icon: 'target',
      title: 'Progresión de cinturones estructurada',
      text: 'Currículo claro de blanco a negro, con exámenes periódicos y retroalimentación personalizada en cada paso.',
    },
    {
      icon: 'shield',
      title: 'Grupos reducidos',
      text: 'Proporción de 12 alumnos por instructor: atención enfocada e individual en cada sesión.',
    },
    {
      icon: 'star',
      title: 'Experiencia real en torneos',
      text: 'Nuestros alumnos han ganado más de 30 medallas a nivel local, regional y nacional en los últimos tres años.',
    },
    {
      icon: 'users',
      title: 'Dojo seguro y disciplinado',
      text: 'La etiqueta tradicional, el respeto mutuo y los protocolos de seguridad son pilares innegociables.',
    },
  ],
} as const;

export const days: { key: DayKey; label: string }[] = [
  { key: 'lun', label: 'Lunes' },
  { key: 'mar', label: 'Martes' },
  { key: 'mie', label: 'Miércoles' },
  { key: 'jue', label: 'Jueves' },
  { key: 'vie', label: 'Viernes' },
  { key: 'sab', label: 'Sábado' },
  { key: 'dom', label: 'Domingo' },
];

export type ClassSlot = { time: string; level: Level; course: string; coach: string };

const weekdayA: ClassSlot[] = [
  { time: '06:00 – 07:00', level: 'AVZ', course: 'Kata Shotokan', coach: 'Sensei Andrés' },
  { time: '17:00 – 18:00', level: 'INI', course: 'Karate infantil (5–8 años)', coach: 'Sensei Paula' },
  { time: '19:00 – 20:30', level: 'INT', course: 'Kumite', coach: 'Sensei Diego' },
];
const weekdayB: ClassSlot[] = [
  { time: '06:00 – 07:00', level: 'TODOS', course: 'Acondicionamiento físico', coach: 'Sensei Mateo' },
  { time: '18:00 – 19:00', level: 'INI', course: 'Defensa personal femenina', coach: 'Sensei Camila' },
  { time: '19:30 – 21:00', level: 'AVZ', course: 'Preparación para torneos', coach: 'Sensei Diego' },
];

export const schedule = {
  eyebrow: 'Horarios',
  title: 'Horario semanal',
  link: { label: 'Encuentra el turno que se ajuste a tu rutina', href: '#contacto' },
  byDay: {
    lun: weekdayA,
    mar: weekdayB,
    mie: weekdayA,
    jue: weekdayB,
    vie: weekdayA,
    sab: [
      { time: '08:00 – 09:30', level: 'TODOS', course: 'Clase abierta familiar', coach: 'Sensei Andrés' },
      { time: '10:00 – 11:30', level: 'INT', course: 'Kata y bunkai', coach: 'Sensei Paula' },
    ],
    dom: [{ time: '09:00 – 10:30', level: 'TODOS', course: 'Entrenamiento libre supervisado', coach: 'Sensei Mateo' }],
  } satisfies Record<DayKey, readonly ClassSlot[]>,
} as const;

export const testimonials = {
  eyebrow: 'Testimonios',
  title: ['Lo que dicen', 'nuestros alumnos.'],
  stats: [
    { value: '432+', label: 'Alumnos formados' },
    { value: '12+', label: 'Años de maestría' },
    { value: '24+', label: 'Medallas en torneos' },
    { value: '6', label: 'Disciplinas de karate' },
  ],
  promo: { eyebrow: 'Empieza hoy', title: 'Tu primera clase es completamente gratis.', cta: 'Reservar' },
  items: [
    {
      quote:
        'La disciplina y el enfoque que mi hijo ha aprendido aquí son notables. Un entrenamiento paciente pero firme que se refleja en su vida diaria.',
      name: 'María Fernanda L.',
      role: 'Madre de alumno · Cinturón naranja',
    },
    {
      quote:
        'Llegué sin experiencia y a los 35 años. Hoy entreno cuatro veces por semana y me siento más fuerte que nunca. El ambiente es increíble.',
      name: 'Carlos M.',
      role: 'Alumno adulto · Cinturón verde',
    },
    {
      quote:
        'El nivel técnico de los senseis es de otro nivel. Me prepararon para mi primer torneo nacional y volví con medalla.',
      name: 'Valentina R.',
      role: 'Competidora · Cinturón marrón',
    },
    {
      quote:
        'Grupos pequeños, atención real y mucho respeto. Es el único deporte que mis dos hijas quieren hacer sin que se lo pida.',
      name: 'Jorge P.',
      role: 'Padre de alumnas',
    },
  ],
} as const;

export const cta = {
  eyebrow: 'Empieza tu camino',
  title: '¿Listo para empezar a entrenar?',
  text: 'No necesitas experiencia. La primera clase es gratis. Solo ven, nosotros nos encargamos del resto.',
  primary: { label: 'Reserva tu clase gratis', href: site.contact.whatsapp },
  secondary: { label: 'Ver horarios', href: '#horarios' },
} as const;

export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Preguntas comunes',
  items: [
    {
      q: '¿Desde qué edad pueden empezar los niños?',
      a: 'Nuestro programa infantil está diseñado para niños desde los 5 años. Se enfoca en motricidad, concentración y disciplina en un ambiente divertido y estructurado.',
    },
    {
      q: '¿Necesito comprar el uniforme (karategi) de inmediato?',
      a: 'No. Las primeras clases puedes venir con ropa deportiva cómoda. Cuando decidas inscribirte te asesoramos para conseguir tu karategi.',
    },
    {
      q: 'Nunca he practicado artes marciales. ¿El karate es para principiantes?',
      a: 'Totalmente. La mayoría de nuestros alumnos empezaron desde cero. Tenemos grupos de nivel inicial con progresión gradual.',
    },
    {
      q: '¿Cómo funciona el sistema de cinturones?',
      a: 'Avanzas de cinturón blanco a negro mediante exámenes periódicos que evalúan técnica, kata, kumite y actitud. Cada etapa tiene objetivos claros.',
    },
    {
      q: '¿Preparan alumnos para competencias?',
      a: 'Sí. Contamos con un equipo de competencia con entrenamientos específicos de kata y kumite para torneos locales, regionales y nacionales.',
    },
    {
      q: '¿Cuánto duran las clases y con qué frecuencia debo asistir?',
      a: 'Las clases duran entre 60 y 90 minutos. Recomendamos de 2 a 3 sesiones por semana para un progreso constante.',
    },
    {
      q: '¿Qué incluye la clase de prueba gratuita?',
      a: 'Una clase completa con tu grupo de nivel, evaluación inicial con el sensei y una charla sobre el plan de entrenamiento que mejor te convenga.',
    },
    {
      q: '¿El combate (sparring) es obligatorio? Me preocupa lesionarme.',
      a: 'No es obligatorio. El kumite se introduce de forma progresiva, con equipo de protección y siempre supervisado. La seguridad es nuestra prioridad.',
    },
  ],
} as const;
