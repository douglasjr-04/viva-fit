import yogaLowerBack from "@/assets/yoga-lower-back.png";
import yogaNeck from "@/assets/yoga-neck.png";
import yogaMorning from "@/assets/yoga-morning.png";
import yogaHip from "@/assets/yoga-hip.png";
import yogaShoulder from "@/assets/yoga-shoulder.png";
import yogaEvening from "@/assets/yoga-evening.png";
import yogaBalance from "@/assets/yoga-balance.png";
import yogaFlexibility from "@/assets/yoga-flexibility.png";
import yogaBlackOutfit from "@/assets/yoga-black-outfit.png";
import yogaTealCurly from "@/assets/yoga-teal-curly.png";
import { Language } from "@/context/UserContext";

export type SessionI18n = {
  title: string;
  description: string;
  exercises?: string[];
};

export interface Session {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  calories: string;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Todos";
  category: "area" | "programa" | "destaque";
  image: string;
  exercises: string[];
  videoUrl?: string;
  i18n?: Partial<Record<Language, SessionI18n>>;
}

export const sessions: Session[] = [
  // Destaques (cards principais da Home)
  {
    id: 1,
    slug: "wake-up",
    title: "Wake Up",
    description: "Sessão matinal para despertar o corpo e a mente com energia positiva.",
    duration: "15 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "destaque",
    image: yogaBlackOutfit,
    exercises: ["Respiração profunda", "Espreguiçar consciente", "Saudação ao sol leve", "Alongamento de pescoço", "Torção suave"],
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    i18n: {
      en: {
        title: "Wake Up",
        description: "Morning session to wake up body and mind with positive energy.",
        exercises: ["Deep breathing", "Mindful stretch", "Gentle sun salutation", "Neck stretch", "Gentle twist"],
      },
      es: {
        title: "Wake Up",
        description: "Sesión matutina para despertar cuerpo y mente con energía positiva.",
        exercises: ["Respiración profunda", "Estiramiento consciente", "Saludo al sol suave", "Estiramiento de cuello", "Torsión suave"],
      },
      fr: {
        title: "Wake Up",
        description: "Séance matinale pour réveiller le corps et l’esprit avec une énergie positive.",
        exercises: ["Respiration profonde", "Étirement conscient", "Salutation au soleil douce", "Étirement du cou", "Torsion douce"],
      },
    },
  },
  {
    id: 2,
    slug: "lower-back",
    title: "Lower Back",
    description: "Exercícios focados no alívio da tensão lombar e fortalecimento da região.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Iniciante",
    category: "destaque",
    image: yogaTealCurly,
    exercises: ["Postura do gato-vaca", "Joelhos ao peito", "Torção deitada", "Ponte", "Criança prolongada"],
    i18n: {
      en: {
        title: "Lower Back",
        description: "Exercises focused on relieving lower-back tension and strengthening the area.",
        exercises: ["Cat-cow", "Knees to chest", "Supine twist", "Bridge", "Extended child's pose"],
      },
      es: {
        title: "Zona Lumbar",
        description: "Ejercicios para aliviar la tensión lumbar y fortalecer la zona.",
        exercises: ["Gato-vaca", "Rodillas al pecho", "Torsión tumbado", "Puente", "Postura del niño prolongada"],
      },
      fr: {
        title: "Bas du Dos",
        description: "Exercices pour soulager les tensions lombaires et renforcer la zone.",
        exercises: ["Chat-vache", "Genoux à la poitrine", "Torsion au sol", "Pont", "Posture de l’enfant prolongée"],
      },
    },
  },

  // Explorar por Área
  {
    id: 3,
    slug: "lombar",
    title: "Lombar",
    description: "Sessão completa para cuidar da saúde da sua coluna lombar.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaLowerBack,
    exercises: ["Postura do gato-vaca", "Joelhos ao peito", "Torção deitada", "Ponte", "Criança prolongada"],
    i18n: {
      en: {
        title: "Lower Back",
        description: "Complete session to support your lower-back health.",
        exercises: ["Cat-cow", "Knees to chest", "Supine twist", "Bridge", "Extended child's pose"],
      },
      es: {
        title: "Zona Lumbar",
        description: "Sesión completa para cuidar la salud de tu zona lumbar.",
        exercises: ["Gato-vaca", "Rodillas al pecho", "Torsión tumbado", "Puente", "Postura del niño prolongada"],
      },
      fr: {
        title: "Lombaires",
        description: "Séance complète pour prendre soin de votre bas du dos.",
        exercises: ["Chat-vache", "Genoux à la poitrine", "Torsion au sol", "Pont", "Posture de l’enfant prolongée"],
      },
    },
  },
  {
    id: 4,
    slug: "pescoco",
    title: "Pescoço",
    description: "Alivie a tensão do pescoço e ombros acumulada no dia a dia.",
    duration: "10 min",
    calories: "120 kcal",
    level: "Todos",
    category: "area",
    image: yogaNeck,
    exercises: ["Rotação de cabeça", "Inclinação lateral", "Alongamento do trapézio", "Liberação de ombros", "Respiração relaxante"],
    i18n: {
      en: {
        title: "Neck",
        description: "Relieve neck and shoulder tension from day-to-day life.",
        exercises: ["Head rotation", "Side tilt", "Trapezius stretch", "Shoulder release", "Relaxing breathing"],
      },
      es: {
        title: "Cuello",
        description: "Alivia la tensión del cuello y hombros del día a día.",
        exercises: ["Rotación de cabeza", "Inclinación lateral", "Estiramiento del trapecio", "Liberación de hombros", "Respiración relajante"],
      },
      fr: {
        title: "Cou",
        description: "Soulagez les tensions du cou et des épaules au quotidien.",
        exercises: ["Rotation de la tête", "Inclinaison latérale", "Étirement du trapèze", "Relâchement des épaules", "Respiration relaxante"],
      },
    },
  },
  {
    id: 5,
    slug: "matinal",
    title: "Matinal",
    description: "Comece o dia com energia e disposição através de movimentos suaves.",
    duration: "15 min",
    calories: "200 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaMorning,
    exercises: ["Respiração solar", "Saudação ao sol", "Guerreiro I", "Triângulo", "Árvore"],
    i18n: {
      en: {
        title: "Morning",
        description: "Start your day with energy through gentle movements.",
        exercises: ["Sun breathing", "Sun salutation", "Warrior I", "Triangle", "Tree"],
      },
      es: {
        title: "Mañana",
        description: "Empieza el día con energía con movimientos suaves.",
        exercises: ["Respiración solar", "Saludo al sol", "Guerrero I", "Triángulo", "Árbol"],
      },
      fr: {
        title: "Matin",
        description: "Commencez la journée avec énergie grâce à des mouvements doux.",
        exercises: ["Respiration solaire", "Salutation au soleil", "Guerrier I", "Triangle", "Arbre"],
      },
    },
  },
  {
    id: 6,
    slug: "quadril",
    title: "Quadril",
    description: "Libere a tensão do quadril e aumente sua mobilidade.",
    duration: "14 min",
    calories: "160 kcal",
    level: "Intermediário",
    category: "area",
    image: yogaHip,
    exercises: ["Borboleta", "Pomba", "Lagarto", "Agulha", "Sapo"],
    i18n: {
      en: {
        title: "Hips",
        description: "Release hip tension and improve mobility.",
        exercises: ["Butterfly", "Pigeon", "Lizard", "Thread the needle", "Frog"],
      },
      es: {
        title: "Cadera",
        description: "Libera la tensión de la cadera y mejora tu movilidad.",
        exercises: ["Mariposa", "Paloma", "Lagarto", "Enhebrar la aguja", "Rana"],
      },
      fr: {
        title: "Hanches",
        description: "Libérez les tensions des hanches et améliorez votre mobilité.",
        exercises: ["Papillon", "Pigeon", "Lézard", "Enfiler l’aiguille", "Grenouille"],
      },
    },
  },
  {
    id: 7,
    slug: "ombros",
    title: "Ombros",
    description: "Relaxe e fortaleça seus ombros com esta sessão focada.",
    duration: "10 min",
    calories: "140 kcal",
    level: "Todos",
    category: "area",
    image: yogaShoulder,
    exercises: ["Rotação de ombros", "Águia", "Vaca face", "Alongamento de braços", "Liberação escapular"],
    i18n: {
      en: {
        title: "Shoulders",
        description: "Relax and strengthen your shoulders with this focused session.",
        exercises: ["Shoulder rolls", "Eagle arms", "Cow face", "Arm stretch", "Scapular release"],
      },
      es: {
        title: "Hombros",
        description: "Relaja y fortalece los hombros con esta sesión.",
        exercises: ["Rotación de hombros", "Brazos de águila", "Cara de vaca", "Estiramiento de brazos", "Liberación escapular"],
      },
      fr: {
        title: "Épaules",
        description: "Détendez et renforcez vos épaules avec cette séance ciblée.",
        exercises: ["Rotations d’épaules", "Bras d’aigle", "Face de vache", "Étirement des bras", "Relâchement scapulaire"],
      },
    },
  },
  {
    id: 8,
    slug: "noturno",
    title: "Noturno",
    description: "Prepare seu corpo e mente para uma noite de sono tranquilo.",
    duration: "18 min",
    calories: "220 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração 4-7-8", "Pernas na parede", "Torção relaxante", "Criança", "Savasana guiado"],
    i18n: {
      en: {
        title: "Evening",
        description: "Prepare your body and mind for a restful night's sleep.",
        exercises: ["4-7-8 breathing", "Legs up the wall", "Relaxing twist", "Child's pose", "Guided savasana"],
      },
      es: {
        title: "Noche",
        description: "Prepara cuerpo y mente para una noche de sueño tranquilo.",
        exercises: ["Respiración 4-7-8", "Piernas en la pared", "Torsión relajante", "Postura del niño", "Savasana guiado"],
      },
      fr: {
        title: "Soir",
        description: "Préparez le corps et l’esprit pour une nuit de sommeil paisible.",
        exercises: ["Respiration 4-7-8", "Jambes au mur", "Torsion relaxante", "Posture de l’enfant", "Savasana guidé"],
      },
    },
  },
  {
    id: 9,
    slug: "equilibrio",
    title: "Equilíbrio",
    description: "Melhore sua estabilidade e concentração com poses de equilíbrio.",
    duration: "16 min",
    calories: "190 kcal",
    level: "Intermediário",
    category: "area",
    image: yogaBalance,
    exercises: ["Árvore", "Guerreiro III", "Meia lua", "Dançarino", "Corvo preparatório"],
    i18n: {
      en: {
        title: "Balance",
        description: "Improve stability and focus with balance poses.",
        exercises: ["Tree", "Warrior III", "Half moon", "Dancer", "Crow prep"],
      },
      es: {
        title: "Equilibrio",
        description: "Mejora tu estabilidad y concentración con posturas de equilibrio.",
        exercises: ["Árbol", "Guerrero III", "Media luna", "Bailarín", "Preparación para cuervo"],
      },
      fr: {
        title: "Équilibre",
        description: "Améliorez stabilité et concentration avec des postures d’équilibre.",
        exercises: ["Arbre", "Guerrier III", "Demi-lune", "Danseur", "Préparation du corbeau"],
      },
    },
  },
  {
    id: 10,
    slug: "flexibilidade",
    title: "Flexibilidade",
    description: "Aumente sua flexibilidade de forma progressiva e segura.",
    duration: "20 min",
    calories: "250 kcal",
    level: "Avançado",
    category: "area",
    image: yogaFlexibility,
    exercises: ["Splits preparatório", "Rã profunda", "Cachorro olhando para baixo", "Pinça sentada", "Ponte completa"],
    i18n: {
      en: {
        title: "Flexibility",
        description: "Increase flexibility progressively and safely.",
        exercises: ["Split prep", "Deep frog", "Downward dog", "Seated forward fold", "Full bridge"],
      },
      es: {
        title: "Flexibilidad",
        description: "Aumenta tu flexibilidad de forma progresiva y segura.",
        exercises: ["Preparación de split", "Rana profunda", "Perro boca abajo", "Pinza sentado", "Puente completo"],
      },
      fr: {
        title: "Souplesse",
        description: "Augmentez votre souplesse de manière progressive et sûre.",
        exercises: ["Préparation du grand écart", "Grenouille profonde", "Chien tête en bas", "Pince assise", "Pont complet"],
      },
    },
  },

  // Programas (Recomendados)
  {
    id: 11,
    slug: "rotina-matinal",
    title: "Rotina Matinal Completa",
    description: "Uma sessão completa para energizar todo o seu dia.",
    duration: "20 min",
    calories: "280 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaMorning,
    exercises: ["Respiração energizante", "Saudação ao sol A", "Saudação ao sol B", "Guerreiro flow", "Meditação final"],
    i18n: {
      en: {
        title: "Complete Morning Routine",
        description: "A complete session to energize your whole day.",
        exercises: ["Energizing breathing", "Sun salutation A", "Sun salutation B", "Warrior flow", "Final meditation"],
      },
      es: {
        title: "Rutina Matutina Completa",
        description: "Sesión completa para energizar todo tu día.",
        exercises: ["Respiración energizante", "Saludo al sol A", "Saludo al sol B", "Flujo guerrero", "Meditación final"],
      },
      fr: {
        title: "Routine Matinale Complète",
        description: "Une séance complète pour dynamiser toute votre journée.",
        exercises: ["Respiration énergisante", "Salutation au soleil A", "Salutation au soleil B", "Flow guerrier", "Méditation finale"],
      },
    },
  },
  {
    id: 12,
    slug: "relaxamento-profundo",
    title: "Relaxamento Profundo",
    description: "Sessão restaurativa para aliviar o estresse e relaxar completamente.",
    duration: "25 min",
    calories: "150 kcal",
    level: "Todos",
    category: "programa",
    image: yogaEvening,
    exercises: ["Respiração diafragmática", "Corpo scan", "Pernas na parede", "Torção suportada", "Savasana prolongado"],
    i18n: {
      en: {
        title: "Deep Relaxation",
        description: "Restorative session to reduce stress and fully relax.",
        exercises: ["Diaphragmatic breathing", "Body scan", "Legs up the wall", "Supported twist", "Extended savasana"],
      },
      es: {
        title: "Relajación Profunda",
        description: "Sesión restaurativa para aliviar el estrés y relajarte por completo.",
        exercises: ["Respiración diafragmática", "Escaneo corporal", "Piernas en la pared", "Torsión con apoyo", "Savasana prolongado"],
      },
      fr: {
        title: "Relaxation Profonde",
        description: "Séance restaurative pour réduire le stress et se détendre pleinement.",
        exercises: ["Respiration diaphragmatique", "Scan corporel", "Jambes au mur", "Torsion soutenue", "Savasana prolongé"],
      },
    },
  },
  {
    id: 13,
    slug: "forca-core",
    title: "Força do Core",
    description: "Fortaleça seu centro e melhore sua postura.",
    duration: "18 min",
    calories: "300 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaBalance,
    exercises: ["Prancha", "Barco", "Bicicleta", "Prancha lateral", "Ponte com elevação"],
    i18n: {
      en: {
        title: "Core Strength",
        description: "Strengthen your center and improve posture.",
        exercises: ["Plank", "Boat pose", "Bicycle", "Side plank", "Bridge with lift"],
      },
      es: {
        title: "Fuerza del Core",
        description: "Fortalece tu centro y mejora tu postura.",
        exercises: ["Plancha", "Barco", "Bicicleta", "Plancha lateral", "Puente con elevación"],
      },
      fr: {
        title: "Force du Core",
        description: "Renforcez votre centre et améliorez votre posture.",
        exercises: ["Planche", "Posture du bateau", "Bicycle", "Planche latérale", "Pont avec élévation"],
      },
    },
  },
  {
    id: 14,
    slug: "saudacao-sol",
    title: "Saudação ao Sol",
    description: "Alongamento completo para todo o corpo.",
    duration: "30 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaBlackOutfit,
    exercises: ["Saudação ao sol A", "Saudação ao sol B", "Variações", "Flow dinâmico", "Savasana"],
    i18n: {
      en: {
        title: "Sun Salutation",
        description: "Full-body stretch for the whole body.",
        exercises: ["Sun salutation A", "Sun salutation B", "Variations", "Dynamic flow", "Savasana"],
      },
      es: {
        title: "Saludo al Sol",
        description: "Estiramiento completo para todo el cuerpo.",
        exercises: ["Saludo al sol A", "Saludo al sol B", "Variaciones", "Flujo dinámico", "Savasana"],
      },
      fr: {
        title: "Salutation au Soleil",
        description: "Étirement complet pour tout le corps.",
        exercises: ["Salutation au soleil A", "Salutation au soleil B", "Variations", "Flow dynamique", "Savasana"],
      },
    },
  },
  {
    id: 15,
    slug: "despertar-matinal",
    title: "Despertar Matinal",
    description: "Comece o dia com energia e vitalidade.",
    duration: "20 min",
    calories: "280 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaMorning,
    exercises: ["Respiração energizante", "Saudação ao sol", "Guerreiro flow", "Equilíbrio", "Meditação ativa"],
    i18n: {
      en: {
        title: "Morning Awakening",
        description: "Start your day with energy and vitality.",
        exercises: ["Energizing breathing", "Sun salutation", "Warrior flow", "Balance", "Active meditation"],
      },
      es: {
        title: "Despertar Matutino",
        description: "Empieza el día con energía y vitalidad.",
        exercises: ["Respiración energizante", "Saludo al sol", "Flujo guerrero", "Equilibrio", "Meditación activa"],
      },
      fr: {
        title: "Réveil Matinal",
        description: "Commencez la journée avec énergie et vitalité.",
        exercises: ["Respiration énergisante", "Salutation au soleil", "Flow guerrier", "Équilibre", "Méditation active"],
      },
    },
  },
  {
    id: 16,
    slug: "yoga-intensivo",
    title: "Yoga Intensivo",
    description: "Desafie seus limites com posturas avançadas e fluxos intensos.",
    duration: "35 min",
    calories: "450 kcal",
    level: "Avançado",
    category: "programa",
    image: yogaFlexibility,
    exercises: ["Aquecimento dinâmico", "Crow pose", "Headstand", "Wheel pose", "Arm balances", "Cool down"],
    i18n: {
      en: {
        title: "Intense Yoga",
        description: "Challenge your limits with advanced poses and intense flows.",
        exercises: ["Dynamic warm-up", "Crow pose", "Headstand", "Wheel pose", "Arm balances", "Cool down"],
      },
      es: {
        title: "Yoga Intensivo",
        description: "Desafía tus límites con posturas avanzadas y flujos intensos.",
        exercises: ["Calentamiento dinámico", "Postura del cuervo", "Parada de cabeza", "Rueda", "Equilibrios en brazos", "Enfriamiento"],
      },
      fr: {
        title: "Yoga Intensif",
        description: "Repoussez vos limites avec des postures avancées et des flows intenses.",
        exercises: ["Échauffement dynamique", "Posture du corbeau", "Équilibre sur la tête", "Posture de la roue", "Équilibres sur les bras", "Retour au calme"],
      },
    },
  }
];

// Helpers
export const getSessionBySlug = (slug: string): Session | undefined => {
  return sessions.find(s => s.slug === slug);
};

export const getSessionById = (id: number): Session | undefined => {
  return sessions.find(s => s.id === id);
};

export const getSessionsByCategory = (category: Session["category"]): Session[] => {
  return sessions.filter(s => s.category === category);
};

export const getAreaSessions = (): Session[] => getSessionsByCategory("area");
export const getProgramSessions = (): Session[] => getSessionsByCategory("programa");
export const getFeaturedSessions = (): Session[] => getSessionsByCategory("destaque");

export const filterSessionsByLevel = (sessionList: Session[], level: string): Session[] => {
  if (level === "Todos") return sessionList;
  return sessionList.filter(s => s.level === level);
};

export function getSessionText(session: Session, language: Language) {
  const localized = session.i18n?.[language];
  return {
    title: localized?.title ?? session.title,
    description: localized?.description ?? session.description,
    exercises: localized?.exercises ?? session.exercises,
  };
}
