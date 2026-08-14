export const site = {
  name: "Aleph Hackathon San José",
  title: "Aleph Hackathon San José 2026",
  description:
    "Guía del chapter de San José, Costa Rica: 22 y 23 de agosto de 2026. Inscripción, agenda, lugar, setup y cómo entregar tu proyecto.",
  dates: "22–23 de agosto 2026",
  cupos: 25,
  timezone: "America/Costa_Rica",
  /** Check-in sábado. Offset -06:00 (Costa Rica, sin DST). */
  startsAt: "2026-08-22T09:00:00-06:00",
} as const;

export const links = {
  official: "https://alephhackathon.crecimiento.build/",
  apply:
    "https://airtable.com/appGGpgjSlDjntK7k/pagBL5Rcb1yhryRQl/form",
  luma: "https://luma.com/76w11xtx" as string,
  notion: "https://alephhackathon.notion.site",
  rules: "https://alephhackathon.notion.site/rules",
  dorahacks: "https://dorahacks.io/org/alephhackathon",
  telegram: "https://t.me/+sXWv0kpT7qo4ZTdk",
  twitter: "https://x.com/alephhackathon",
  github: "https://github.com/signup",
  telegramSignup: "https://telegram.org/apps",
  xSignup: "https://x.com/i/flow/signup",
  linkedinSignup: "https://www.linkedin.com/signup",
  maps: "https://www.google.com/maps/search/?api=1&query=Radisson+San+Jose+Costa+Rica%2C+Barrio+Tourn%C3%B3n%2C+San+Jos%C3%A9",
  /** Pegá el link del grupo cuando exista. Si queda vacío, no se muestra el CTA. */
  whatsapp: "" as string,
} as const;

export const venue = {
  name: "Hotel Radisson San José",
  line1: "Calle Central y Av. 15, Barrio Tournón",
  city: "San José, Costa Rica",
  copyText: "Hotel Radisson, Calle Central y Av. 15, Barrio Tournón, San José, Costa Rica",
} as const;

export type SocialKind =
  | "web"
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "discord"
  | "github"
  | "x"
  | "facebook";

export type SocialLink = {
  kind: SocialKind;
  href: string;
  label: string;
};

/**
 * Co-organizadores del chapter de San José.
 * `logo` es opcional: si subís un logo a /public/logos/, completá también
 * logoWidth/logoHeight con el tamaño real del archivo.
 * `socials` puede quedar vacío; los iconos aparecen solo si hay links.
 */
export const organizers: {
  name: string;
  role: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  socials: SocialLink[];
}[] = [
  {
    name: "Zeek",
    role: "Co-organización",
    socials: [],
  },
  {
    name: "Sebastián",
    role: "Co-organización",
    socials: [],
  },
  {
    name: "Mike.dev",
    role: "Co-organización",
    socials: [],
  },
];

export const nav = [
  { href: "#que-es", label: "Qué es" },
  { href: "#inscripcion", label: "Inscripción" },
  { href: "#lugar", label: "Lugar" },
  { href: "#agenda", label: "Agenda" },
  { href: "#setup", label: "Setup" },
  { href: "#entrega", label: "Entrega" },
  { href: "#faq", label: "FAQ" },
] as const;

export const agenda = [
  {
    id: "sabado",
    title: "Sábado 22 · Opening & Hacking Day · IRL San José",
    items: [
      { time: "09:00 – 09:30", label: "Registro y check-in" },
      { time: "09:30 – 10:30", label: "Desayuno & setup" },
      { time: "10:30 – 11:00", label: "Ceremonia de apertura" },
      { time: "11:00 – 12:30", label: "Hacking" },
      { time: "12:30 – 13:30", label: "Almuerzo" },
      { time: "15:30", label: "Coffee break" },
      { time: "21:30", label: "Cierre de la jornada presencial" },
    ],
  },
  {
    id: "domingo",
    title: "Domingo 23 · Hacking + submission & judging · Online",
    items: [
      { time: "09:00 – 10:00", label: "Online hacking" },
      { time: "12:00", label: "Deadline de submissions" },
      { time: "13:00", label: "Inicio del judging" },
      { time: "18:00", label: "Closing ceremony online" },
    ],
  },
] as const;

export const checklist = [
  {
    id: "github",
    label: "Creá una cuenta de GitHub",
    href: links.github,
    hint: "El apply pide el link del perfil. El repo del proyecto, el domingo, tiene que ser público.",
  },
  {
    id: "socials",
    label: "Cuentas en redes",
    hint: "El apply pide Telegram, X/Twitter y LinkedIn. Creálas antes de mandar el form.",
    links: [
      { label: "Telegram", href: links.telegramSignup },
      { label: "X / Twitter", href: links.xSignup },
      { label: "LinkedIn", href: links.linkedinSignup },
    ],
  },
  {
    id: "apply",
    label: "Apply oficial de Aleph",
    href: links.apply,
    hint: "Obligatorio para competir y entregar en DoraHacks. Aceptan en tandas.",
    dialog: "apply-guide",
    dialogLabel: "Cómo llenar el form",
  },
  {
    id: "dorahacks",
    label: "Registrate en DoraHacks",
    href: links.dorahacks,
    hint: "Creá la cuenta ahora. El link para subir el proyecto de esta edición se publica cerca del evento.",
  },
  {
    id: "luma",
    label: "Anotate al cupo IRL de San José (Luma)",
    href: links.luma || undefined,
    hint: links.luma
      ? "Solo 25 lugares presenciales el sábado. No reemplaza el apply oficial."
      : "El link del Luma se publica pronto. Solo 25 lugares presenciales el sábado. No reemplaza el apply oficial.",
  },
] as const;

export const applyGuideFields = [
  {
    label: "Email",
    example: "tu@mail.com",
    hint: "Acá te llega la aceptación (en tandas). Usá uno que revisés.",
  },
  {
    label: "Nombre y apellido",
    example: "Ana Pérez",
    hint: "Como figurás en la cédula o en GitHub. Un apply por persona, aunque ya tengas equipo.",
  },
  {
    label: "País",
    example: "Costa Rica",
    hint: "El país desde el que aplicás.",
  },
  {
    label: "Ciudad",
    example: "San José",
    hint: "La ciudad desde la que participás.",
  },
  {
    label: "¿Dónde vas a hackear?",
    example: "IRL · chapter San José",
    hint: "Si venís a la sede el sábado, elegí presencial / chapter. Online es otra modalidad.",
  },
  {
    label: "GitHub",
    example: "https://github.com/tu-usuario",
    hint: "El perfil, no un repo. Por eso el paso 1 es crear la cuenta.",
  },
  {
    label: "Telegram",
    example: "@tuusuario",
    hint: "Con el @. Si te aceptan, el grupo privado llega por acá.",
  },
  {
    label: "X / Twitter",
    example: "https://x.com/tuusuario",
    hint: "Perfil público. Si no tenés, crealo antes de mandar el apply.",
  },
  {
    label: "LinkedIn",
    example: "https://linkedin.com/in/tu-perfil",
    hint: "El apply lo pide. Si no usás LinkedIn, armá uno mínimo con nombre y foto.",
  },
  {
    label: "¿Ya tenés equipo?",
    example: "Solo / Sí / Todavía no",
    hint: "Máximo 4. Cada integrante se anota por su cuenta (apply + Luma).",
  },
  {
    label: "Rol",
    example: "Developer, designer, estudiante…",
    hint: "No hace falta ser senior. Elegí lo que más se acerque a lo que vas a hacer el sábado.",
  },
  {
    label: "Código de conducta",
    example: "Hay que aceptarlo",
    hint: "Sin el tilde no entra el apply. Las reglas del chapter están más abajo en esta página.",
  },
] as const;

export const bring = [
  { icon: "laptop", text: "Laptop y cargador." },
  { icon: "plug", text: "Adaptadores o accesorios que uses para trabajar." },
  { icon: "ideas", text: "Ideas, o ganas de armar equipo el sábado." },
  {
    icon: "marker",
    text: "Marcadores de pizarra, al agua y borrables. No lleves permanentes: dañan las pizarras.",
  },
] as const;

export const codeOfConduct = [
  {
    title: "Respeto y cortesía",
    body: "Trato respetuoso entre todas las personas. Cero acoso verbal, físico o virtual por género, orientación, raza, religión, apariencia, discapacidad u otra característica.",
  },
  {
    title: "Ambiente seguro",
    body: "Nada de imágenes, actividades o materiales sexualizados. Vale para participantes, jurado, mentors, volunteers y organizadores.",
  },
  {
    title: "Si te piden parar, parás",
    body: "Ante una conducta inapropiada, se espera que pares de inmediato. Si no, te pueden echar del evento.",
  },
  {
    title: "Avisá si pasa algo",
    body: "Si te sentís mal o ves que alguien rompe estas reglas, hablá con un organizador o escribinos a",
    email: "hackathon@crecimiento.build",
  },
] as const;

export const eventRules = [
  {
    title: "Uso de materiales",
    body: "Las ideas se comparten. Si hay algo confidencial, es tu responsabilidad protegerlo. Lo que armes es tuyo; si usás APIs o software de partners, respetá sus licencias.",
  },
  {
    title: "Trabajo previo",
    body: "No se presentan proyectos ya hechos. El código arranca en el kickoff. Features de startups cuentan, pero el código tiene que ser de cero. Lo revisan.",
  },
  {
    title: "Fotos y grabación",
    body: "El evento se filma y se fotografían. Al venir, aceptás que usemos imagen y voz para difusión. Si no querés aparecer, avisá.",
  },
  {
    title: "Condiciones generales",
    body: "Participás bajo tu responsabilidad. No hay cobertura por lesiones, pérdidas o daños. Al anotarte, aceptás estas reglas.",
  },
] as const;

export const faqs = [
  {
    q: "¿Qué es una hackathon?",
    a: "Un fin de semana para construir un proyecto de cero — en equipo o solo — y presentarlo ante un jurado. No es una conferencia: se construye un proyecto. El sábado en San José arrancamos juntos; el domingo se entrega online.",
  },
  {
    q: "¿Necesito experiencia?",
    a: "No. El evento es gratis y está abierto a developers, designers, estudiantes, PMs y gente que recién empieza. El sábado hay opening, armado de equipos y gente alrededor para preguntar.",
  },
  {
    q: "¿El Luma alcanza para participar?",
    a: "No. Luma es el cupo presencial de San José (25 lugares). El apply oficial de Aleph es el que te habilita para DoraHacks, judging y premios. Son dos pasos distintos.",
  },
  {
    q: "¿Puedo ir solo?",
    a: "Sí. Podés hackear solo o armar equipo el sábado. Máximo 4 personas. Cada integrante tiene que estar anotado de forma individual.",
  },
  {
    q: "¿Hay almuerzo el sábado?",
    a: "Sí, está incluido. La organización pone desayuno a las 9:30, almuerzo a las 12:30 y coffee break a las 15:30.",
  },
  {
    q: "¿El domingo hay que ir a la sede?",
    a: "No. El domingo es 100% online: hacking, submission y judging desde donde estés.",
  },
  {
    q: "¿Puedo usar un proyecto que ya tengo?",
    a: "No. El trabajo arranca en el kickoff. Presentar un proyecto ya hecho te descalifica. Las reglas completas están más abajo.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí. La participación en Aleph es gratuita. El cupo IRL de San José es limitado.",
  },
] as const;

export const usefulLinks = [
  {
    name: "Apply oficial",
    href: links.apply,
    hint: "Formulario de Aleph / Crecimiento",
  },
  {
    name: "Luma San José",
    href: links.luma,
    hint: "Cupo IRL · 25 lugares",
  },
  {
    name: "Sitio oficial",
    href: links.official,
    hint: "Tracks, sponsors y FAQs globales",
  },
  {
    name: "Reglas y código de conducta",
    href: links.rules,
    hint: "Notion oficial",
  },
  {
    name: "DoraHacks",
    href: links.dorahacks,
    hint: "Acá se entrega el proyecto",
  },
  {
    name: "Telegram de Aleph",
    href: links.telegram,
    hint: "Canal oficial del hackathon",
  },
  {
    name: "GitHub",
    href: links.github,
    hint: "Creá la cuenta antes del sábado",
  },
  {
    name: "Cómo llegar",
    href: links.maps,
    hint: "San José, Costa Rica",
  },
].filter((item) => Boolean(item.href));
