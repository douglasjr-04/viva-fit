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
    videoUrl: "/videos/yoga-matinal.mp4",
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
    videoUrl: "/videos/yoga-lombar.mp4",
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
    videoUrl: "/videos/yoga-lombar.mp4",
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
    videoUrl: "/videos/yoga-relaxamento-2.mp4",
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
    videoUrl: "/videos/yoga-matinal.mp4",
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
    videoUrl: "/videos/yoga-alongamento.mp4",
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
    videoUrl: "/videos/yoga-relaxamento-4.mp4",
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
    videoUrl: "/videos/yoga-relaxamento.mp4",
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
    videoUrl: "/videos/yoga-desafio-3.mp4",
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
    videoUrl: "/videos/yoga-alongamento-4.mp4",
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
    videoUrl: "/videos/yoga-matinal-2.mp4",
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
    slug: "relaxamento",
    title: "Relaxamento",
    description: "Sessão restaurativa para aliviar o estresse e relaxar completamente.",
    duration: "25 min",
    calories: "150 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração diafragmática", "Corpo scan", "Pernas na parede", "Torção suportada", "Savasana prolongado"],
    videoUrl: "/videos/yoga-relaxamento.mp4",
    i18n: {
      en: {
        title: "Relaxation",
        description: "Restorative session to reduce stress and fully relax.",
        exercises: ["Diaphragmatic breathing", "Body scan", "Legs up the wall", "Supported twist", "Extended savasana"],
      },
      es: {
        title: "Relajación",
        description: "Sesión restaurativa para aliviar el estrés y relajarte por completo.",
        exercises: ["Respiración diafragmática", "Escaneo corporal", "Piernas en la pared", "Torsión con apoyo", "Savasana prolongado"],
      },
      fr: {
        title: "Relaxation",
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
    videoUrl: "/videos/yoga-desafio.mp4",
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
    slug: "alongamento",
    title: "Alongamento",
    description: "Alongamento completo para todo o corpo.",
    duration: "30 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaBalance,
    exercises: ["Saudação ao sol A", "Saudação ao sol B", "Variações", "Flow dinâmico", "Savasana"],
    videoUrl: "/videos/yoga-alongamento.mp4",
    i18n: {
      en: {
        title: "Stretching",
        description: "Full-body stretch for the whole body.",
        exercises: ["Sun salutation A", "Sun salutation B", "Variations", "Dynamic flow", "Savasana"],
      },
      es: {
        title: "Estiramiento",
        description: "Estiramiento completo para todo el cuerpo.",
        exercises: ["Saludo al sol A", "Saludo al sol B", "Variaciones", "Flujo dinámico", "Savasana"],
      },
      fr: {
        title: "Étirement",
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
    videoUrl: "/videos/yoga-matinal-3.mp4",
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
    slug: "desafio",
    title: "Desafio",
    description: "Desafie seus limites com posturas avançadas e fluxos intensos.",
    duration: "35 min",
    calories: "450 kcal",
    level: "Avançado",
    category: "area",
    image: yogaBlackOutfit,
    exercises: ["Aquecimento dinâmico", "Crow pose", "Headstand", "Wheel pose", "Arm balances", "Cool down"],
    videoUrl: "/videos/yoga-desafio.mp4",
    i18n: {
      en: {
        title: "Challenge",
        description: "Challenge your limits with advanced poses and intense flows.",
        exercises: ["Dynamic warm-up", "Crow pose", "Headstand", "Wheel pose", "Arm balances", "Cool down"],
      },
      es: {
        title: "Desafío",
        description: "Desafía tus límites con posturas avanzadas y flujos intensos.",
        exercises: ["Calentamiento dinámico", "Postura del cuervo", "Parada de cabeza", "Rueda", "Equilibrios en brazos", "Enfriamiento"],
      },
      fr: {
        title: "Défi",
        description: "Repoussez vos limites avec des postures avancées et des flows intenses.",
        exercises: ["Échauffement dynamique", "Posture du corbeau", "Équilibre sur la tête", "Posture de la roue", "Équilibres sur les bras", "Retour au calme"],
      },
    },
  }
  ,
  {
    id: 17,
    slug: "alongamento-2",
    title: "Alongamento 2",
    description: "Alongamento completo para todo o corpo.",
    duration: "30 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaBalance,
    exercises: ["Saudação ao sol A (2)", "Saudação ao sol B (2)", "Variações (2)", "Flow dinâmico (2)", "Savasana (2)"],
    videoUrl: "/videos/yoga-alongamento-1.mp4",
    i18n: {
      en: {
        title: "Stretching 2",
        description: "Full-body stretch for the whole body.",
        exercises: ["Sun salutation A (2)", "Sun salutation B (2)", "Variations (2)", "Dynamic flow (2)", "Savasana (2)"],
      },
      es: {
        title: "Estiramiento 2",
        description: "Estiramiento completo para todo el cuerpo.",
        exercises: ["Saludo al sol A (2)", "Saludo al sol B (2)", "Variaciones (2)", "Flujo dinámico (2)", "Savasana (2)"],
      },
      fr: {
        title: "Étirement 2",
        description: "Étirement complet pour tout le corps.",
        exercises: ["Salutation au soleil A (2)", "Salutation au soleil B (2)", "Variations (2)", "Flow dynamique (2)", "Savasana (2)"],
      },
    },
  },
  {
    id: 18,
    slug: "alongamento-3",
    title: "Alongamento 3",
    description: "Alongamento completo para todo o corpo.",
    duration: "30 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaBalance,
    exercises: ["Saudação ao sol A (3)", "Saudação ao sol B (3)", "Variações (3)", "Flow dinâmico (3)", "Savasana (3)"],
    videoUrl: "/videos/yoga-alongamento-4.mp4",
    i18n: {
      en: {
        title: "Stretching 3",
        description: "Full-body stretch for the whole body.",
        exercises: ["Sun salutation A (3)", "Sun salutation B (3)", "Variations (3)", "Dynamic flow (3)", "Savasana (3)"],
      },
      es: {
        title: "Estiramiento 3",
        description: "Estiramiento completo para todo el cuerpo.",
        exercises: ["Saludo al sol A (3)", "Saludo al sol B (3)", "Variaciones (3)", "Flujo dinámico (3)", "Savasana (3)"],
      },
      fr: {
        title: "Étirement 3",
        description: "Étirement complet pour tout le corps.",
        exercises: ["Salutation au soleil A (3)", "Salutation au soleil B (3)", "Variations (3)", "Flow dynamique (3)", "Savasana (3)"],
      },
    },
  },
  {
    id: 19,
    slug: "matinal-2",
    title: "Matinal 2",
    description: "Comece o dia com energia e disposição através de movimentos suaves.",
    duration: "15 min",
    calories: "200 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaMorning,
    exercises: ["Respiração solar (2)", "Saudação ao sol (2)", "Guerreiro I (2)", "Triângulo (2)", "Árvore (2)"],
    videoUrl: "/videos/yoga-matinal-1.mp4",
    i18n: {
      en: {
        title: "Morning 2",
        description: "Start your day with energy through gentle movements.",
        exercises: ["Sun breathing (2)", "Sun salutation (2)", "Warrior I (2)", "Triangle (2)", "Tree (2)"],
      },
      es: {
        title: "Mañana 2",
        description: "Empieza el día con energía con movimientos suaves.",
        exercises: ["Respiración solar (2)", "Saludo al sol (2)", "Guerrero I (2)", "Triángulo (2)", "Árbol (2)"],
      },
      fr: {
        title: "Matin 2",
        description: "Commencez la journée avec énergie grâce à des mouvements doux.",
        exercises: ["Respiration solaire (2)", "Salutation au soleil (2)", "Guerrier I (2)", "Triangle (2)", "Arbre (2)"],
      },
    },
  },
  {
    id: 20,
    slug: "matinal-3",
    title: "Matinal 3",
    description: "Comece o dia com energia e disposição através de movimentos suaves.",
    duration: "15 min",
    calories: "200 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaMorning,
    exercises: ["Respiração solar (3)", "Saudação ao sol (3)", "Guerreiro I (3)", "Triângulo (3)", "Árvore (3)"],
    videoUrl: "/videos/yoga-matinal-2.mp4",
    i18n: {
      en: {
        title: "Morning 3",
        description: "Start your day with energy through gentle movements.",
        exercises: ["Sun breathing (3)", "Sun salutation (3)", "Warrior I (3)", "Triangle (3)", "Tree (3)"],
      },
      es: {
        title: "Mañana 3",
        description: "Empieza el día con energía con movimientos suaves.",
        exercises: ["Respiración solar (3)", "Saludo al sol (3)", "Guerrero I (3)", "Triángulo (3)", "Árbol (3)"],
      },
      fr: {
        title: "Matin 3",
        description: "Commencez la journée avec énergie grâce à des mouvements doux.",
        exercises: ["Respiration solaire (3)", "Salutation au soleil (3)", "Guerrier I (3)", "Triangle (3)", "Arbre (3)"],
      },
    },
  },
  {
    id: 21,
    slug: "matinal-4",
    title: "Matinal 4",
    description: "Comece o dia com energia e disposição através de movimentos suaves.",
    duration: "15 min",
    calories: "200 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaMorning,
    exercises: ["Respiração solar (4)", "Saudação ao sol (4)", "Guerreiro I (4)", "Triângulo (4)", "Árvore (4)"],
    videoUrl: "/videos/yoga-matinal-3.mp4",
    i18n: {
      en: {
        title: "Morning 4",
        description: "Start your day with energy through gentle movements.",
        exercises: ["Sun breathing (4)", "Sun salutation (4)", "Warrior I (4)", "Triangle (4)", "Tree (4)"],
      },
      es: {
        title: "Mañana 4",
        description: "Empieza el día con energía con movimientos suaves.",
        exercises: ["Respiración solar (4)", "Saludo al sol (4)", "Guerrero I (4)", "Triángulo (4)", "Árbol (4)"],
      },
      fr: {
        title: "Matin 4",
        description: "Commencez la journée avec énergie grâce à des mouvements doux.",
        exercises: ["Respiration solaire (4)", "Salutation au soleil (4)", "Guerrier I (4)", "Triangle (4)", "Arbre (4)"],
      },
    },
  },
  {
    id: 22,
    slug: "relaxamento-2",
    title: "Relaxamento 2",
    description: "Sessão restaurativa para aliviar o estresse e relaxar completamente.",
    duration: "25 min",
    calories: "150 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração diafragmática (2)", "Corpo scan (2)", "Pernas na parede (2)", "Torção suportada (2)", "Savasana prolongado (2)"],
    videoUrl: "/videos/yoga-relaxamento-2.mp4",
    i18n: {
      en: {
        title: "Relaxation 2",
        description: "Restorative session to reduce stress and fully relax.",
        exercises: ["Diaphragmatic breathing (2)", "Body scan (2)", "Legs up the wall (2)", "Supported twist (2)", "Extended savasana (2)"],
      },
      es: {
        title: "Relajación 2",
        description: "Sesión restaurativa para aliviar el estrés y relajarte por completo.",
        exercises: ["Respiración diafragmática (2)", "Escaneo corporal (2)", "Piernas en la pared (2)", "Torsión con apoyo (2)", "Savasana prolongado (2)"],
      },
      fr: {
        title: "Relaxation 2",
        description: "Séance restaurative pour réduire le stress et se détendre pleinement.",
        exercises: ["Respiration diaphragmatique (2)", "Scan corporel (2)", "Jambes au mur (2)", "Torsion soutenue (2)", "Savasana prolongé (2)"],
      },
    },
  },
  {
    id: 23,
    slug: "relaxamento-3",
    title: "Relaxamento 3",
    description: "Sessão restaurativa para aliviar o estresse e relaxar completamente.",
    duration: "25 min",
    calories: "150 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração diafragmática (3)", "Corpo scan (3)", "Pernas na parede (3)", "Torção suportada (3)", "Savasana prolongado (3)"],
    videoUrl: "/videos/yoga-relaxamento-3.mp4",
    i18n: {
      en: {
        title: "Relaxation 3",
        description: "Restorative session to reduce stress and fully relax.",
        exercises: ["Diaphragmatic breathing (3)", "Body scan (3)", "Legs up the wall (3)", "Supported twist (3)", "Extended savasana (3)"],
      },
      es: {
        title: "Relajación 3",
        description: "Sesión restaurativa para aliviar el estrés y relajarte por completo.",
        exercises: ["Respiración diafragmática (3)", "Escaneo corporal (3)", "Piernas en la pared (3)", "Torsión con apoyo (3)", "Savasana prolongado (3)"],
      },
      fr: {
        title: "Relaxation 3",
        description: "Séance restaurative pour réduire le stress et se détendre pleinement.",
        exercises: ["Respiration diaphragmatique (3)", "Scan corporel (3)", "Jambes au mur (3)", "Torsion soutenue (3)", "Savasana prolongé (3)"],
      },
    },
  },
  {
    id: 24,
    slug: "relaxamento-4",
    title: "Relaxamento 4",
    description: "Sessão restaurativa para aliviar o estresse e relaxar completamente.",
    duration: "25 min",
    calories: "150 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração diafragmática (4)", "Corpo scan (4)", "Pernas na parede (4)", "Torção suportada (4)", "Savasana prolongado (4)"],
    videoUrl: "/videos/yoga-relaxamento-4.mp4",
    i18n: {
      en: {
        title: "Relaxation 4",
        description: "Restorative session to reduce stress and fully relax.",
        exercises: ["Diaphragmatic breathing (4)", "Body scan (4)", "Legs up the wall (4)", "Supported twist (4)", "Extended savasana (4)"],
      },
      es: {
        title: "Relajación 4",
        description: "Sesión restaurativa para aliviar el estrés y relajarte por completo.",
        exercises: ["Respiración diafragmática (4)", "Escaneo corporal (4)", "Piernas en la pared (4)", "Torsión con apoyo (4)", "Savasana prolongado (4)"],
      },
      fr: {
        title: "Relaxation 4",
        description: "Séance restaurative pour réduire le stress et se détendre pleinement.",
        exercises: ["Respiration diaphragmatique (4)", "Scan corporel (4)", "Jambes au mur (4)", "Torsion soutenue (4)", "Savasana prolongé (4)"],
      },
    },
  },
  {
    id: 25,
    slug: "lombar-2",
    title: "Lombar 2",
    description: "Sessão completa para cuidar da saúde da sua coluna lombar.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaLowerBack,
    exercises: ["Postura do gato-vaca (2)", "Joelhos ao peito (2)", "Torção deitada (2)", "Ponte (2)", "Criança prolongada (2)"],
    videoUrl: "/videos/yoga-lombar-2.mp4",
    i18n: {
      en: {
        title: "Lower Back 2",
        description: "Complete session to support your lower-back health.",
        exercises: ["Cat-cow (2)", "Knees to chest (2)", "Supine twist (2)", "Bridge (2)", "Extended child's pose (2)"],
      },
      es: {
        title: "Zona Lumbar 2",
        description: "Sesión completa para cuidar la salud de tu zona lumbar.",
        exercises: ["Gato-vaca (2)", "Rodillas al pecho (2)", "Torsión tumbado (2)", "Puente (2)", "Postura del niño prolongada (2)"],
      },
      fr: {
        title: "Lombaires 2",
        description: "Séance complète pour prendre soin de votre bas du dos.",
        exercises: ["Chat-vache (2)", "Genoux à la poitrine (2)", "Torsion au sol (2)", "Pont (2)", "Posture de l’enfant prolongée (2)"],
      },
    },
  },
  {
    id: 26,
    slug: "lombar-3",
    title: "Lombar 3",
    description: "Sessão completa para cuidar da saúde da sua coluna lombar.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Iniciante",
    category: "area",
    image: yogaLowerBack,
    exercises: ["Postura do gato-vaca (3)", "Joelhos ao peito (3)", "Torção deitada (3)", "Ponte (3)", "Criança prolongada (3)"],
    videoUrl: "/videos/yoga-lombar-3.mp4",
    i18n: {
      en: {
        title: "Lower Back 3",
        description: "Complete session to support your lower-back health.",
        exercises: ["Cat-cow (3)", "Knees to chest (3)", "Supine twist (3)", "Bridge (3)", "Extended child's pose (3)"],
      },
      es: {
        title: "Zona Lumbar 3",
        description: "Sesión completa para cuidar la salud de tu zona lumbar.",
        exercises: ["Gato-vaca (3)", "Rodillas al pecho (3)", "Torsión tumbado (3)", "Puente (3)", "Postura del niño prolongada (3)"],
      },
      fr: {
        title: "Lombaires 3",
        description: "Séance complète pour prendre soin de votre bas du dos.",
        exercises: ["Chat-vache (3)", "Genoux à la poitrine (3)", "Torsion au sol (3)", "Pont (3)", "Posture de l’enfant prolongée (3)"],
      },
    },
  },
  {
    id: 27,
    slug: "desafio-2",
    title: "Desafio 2",
    description: "Desafie seus limites com posturas avançadas e fluxos intensos.",
    duration: "35 min",
    calories: "450 kcal",
    level: "Avançado",
    category: "area",
    image: yogaBlackOutfit,
    exercises: ["Aquecimento dinâmico (2)", "Crow pose (2)", "Headstand (2)", "Wheel pose (2)", "Arm balances (2)", "Cool down (2)"],
    videoUrl: "/videos/yoga-desafio-2.mp4",
    i18n: {
      en: {
        title: "Challenge 2",
        description: "Challenge your limits with advanced poses and intense flows.",
        exercises: ["Dynamic warm-up (2)", "Crow pose (2)", "Headstand (2)", "Wheel pose (2)", "Arm balances (2)", "Cool down (2)"],
      },
      es: {
        title: "Desafío 2",
        description: "Desafía tus límites con posturas avanzadas y flujos intensos.",
        exercises: ["Calentamiento dinámico (2)", "Postura del cuervo (2)", "Parada de cabeza (2)", "Rueda (2)", "Equilibrios en brazos (2)", "Enfriamiento (2)"],
      },
      fr: {
        title: "Défi 2",
        description: "Repoussez vos limites avec des postures avancées et des flows intenses.",
        exercises: ["Échauffement dynamique (2)", "Posture du corbeau (2)", "Équilibre sur la tête (2)", "Posture de la roue (2)", "Équilibres sur les bras (2)", "Retour au calme (2)"],
      },
    },
  },
  {
    id: 28,
    slug: "desafio-3",
    title: "Desafio 3",
    description: "Desafie seus limites com posturas avançadas e fluxos intensos.",
    duration: "35 min",
    calories: "450 kcal",
    level: "Avançado",
    category: "area",
    image: yogaBlackOutfit,
    exercises: ["Aquecimento dinâmico (3)", "Crow pose (3)", "Headstand (3)", "Wheel pose (3)", "Arm balances (3)", "Cool down (3)"],
    videoUrl: "/videos/yoga-desafio-3.mp4",
    i18n: {
      en: {
        title: "Challenge 3",
        description: "Challenge your limits with advanced poses and intense flows.",
        exercises: ["Dynamic warm-up (3)", "Crow pose (3)", "Headstand (3)", "Wheel pose (3)", "Arm balances (3)", "Cool down (3)"],
      },
      es: {
        title: "Desafío 3",
        description: "Desafía tus límites con posturas avanzadas y flujos intensos.",
        exercises: ["Calentamiento dinámico (3)", "Postura del cuervo (3)", "Parada de cabeza (3)", "Rueda (3)", "Equilibrios en brazos (3)", "Enfriamiento (3)"],
      },
      fr: {
        title: "Défi 3",
        description: "Repoussez vos limites avec des postures avancées et des flows intenses.",
        exercises: ["Échauffement dynamique (3)", "Posture du corbeau (3)", "Équilibre sur la tête (3)", "Posture de la roue (3)", "Équilibres sur les bras (3)", "Retour au calme (3)"],
      },
    },
  },
  {
    id: 29,
    slug: "desafio-4",
    title: "Desafio 4",
    description: "Desafie seus limites com posturas avançadas e fluxos intensos.",
    duration: "35 min",
    calories: "450 kcal",
    level: "Avançado",
    category: "area",
    image: yogaBlackOutfit,
    exercises: ["Aquecimento dinâmico (4)", "Crow pose (4)", "Headstand (4)", "Wheel pose (4)", "Arm balances (4)", "Cool down (4)"],
    videoUrl: "/videos/yoga-desafio-4.mp4",
    i18n: {
      en: {
        title: "Challenge 4",
        description: "Challenge your limits with advanced poses and intense flows.",
        exercises: ["Dynamic warm-up (4)", "Crow pose (4)", "Headstand (4)", "Wheel pose (4)", "Arm balances (4)", "Cool down (4)"],
      },
      es: {
        title: "Desafío 4",
        description: "Desafía tus límites con posturas avanzadas y flujos intensos.",
        exercises: ["Calentamiento dinámico (4)", "Postura del cuervo (4)", "Parada de cabeza (4)", "Rueda (4)", "Equilibrios en brazos (4)", "Enfriamiento (4)"],
      },
      fr: {
        title: "Défi 4",
        description: "Repoussez vos limites avec des postures avancées et des flows intenses.",
        exercises: ["Échauffement dynamique (4)", "Posture du corbeau (4)", "Équilibre sur la tête (4)", "Posture de la roue (4)", "Équilibres sur les bras (4)", "Retour au calme (4)"],
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

export const getAreaSessions = (): Session[] => {
  const areaSlugs = [
    "alongamento",
    "alongamento-2",
    "alongamento-3",
    "matinal",
    "matinal-2",
    "matinal-3",
    "matinal-4",
    "relaxamento",
    "relaxamento-2",
    "relaxamento-3",
    "relaxamento-4",
    "lombar",
    "lombar-2",
    "lombar-3",
    "desafio",
    "desafio-2",
    "desafio-3",
    "desafio-4",
  ];
  return areaSlugs.map((slug) => getSessionBySlug(slug)).filter(Boolean) as Session[];
};
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
