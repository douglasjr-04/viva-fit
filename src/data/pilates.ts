import yogaLowerBack from "@/assets/yoga-lower-back.png";
import yogaNeck from "@/assets/yoga-neck.png";
import yogaMorning from "@/assets/yoga-morning.png";
import yogaHip from "@/assets/yoga-hip.png";
import yogaShoulder from "@/assets/yoga-shoulder.png";
import yogaEvening from "@/assets/yoga-evening.png";
import yogaBalance from "@/assets/yoga-balance.png";
import { Language } from "@/context/UserContext";
import { Session } from "./sessions";

export type PilatesGroupId =
  | "respiracao_base"
  | "comece_o_dia"
  | "fortalecimento"
  | "core_abdomen"
  | "postura_dores"
  | "mobilidade_flexibilidade"
  | "em_pe"
  | "desafios_rapidos";

export interface PilatesSession extends Session {
  groupIds?: PilatesGroupId[];
  i18n?: Partial<
    Record<
      Language,
      {
        title: string;
        description: string;
        exercises?: string[];
      }
    >
  >;
}

export const pilatesSessions: PilatesSession[] = [
  {
    id: 203,
    slug: "pilates-dores-nas-costas",
    title: "Dores nas Costas",
    description: "Alívio e fortalecimento para região lombar com movimentos controlados.",
    duration: "14 min",
    calories: "120 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    groupIds: ["postura_dores"],
    exercises: ["Respiração", "Pelvic clock", "Knee sway", "Child's pose", "Relax"],
    i18n: {
      en: {
        title: "Back Pain Relief",
        description: "Relief and strengthening for the lower back with controlled movements.",
        exercises: ["Breathing", "Pelvic clock", "Knee sway", "Child's pose", "Relax"],
      },
      es: {
        title: "Dolor de Espalda",
        description: "Alivio y fortalecimiento para la zona lumbar con movimientos controlados.",
        exercises: ["Respiración", "Reloj pélvico", "Balanceo de rodillas", "Postura del niño", "Relajación"],
      },
      fr: {
        title: "Douleurs au Dos",
        description: "Soulagement et renforcement du bas du dos avec des mouvements contrôlés.",
        exercises: ["Respiration", "Horloge pelvienne", "Bascule des genoux", "Posture de l’enfant", "Relaxation"],
      },
    },
  },
  {
    id: 204,
    slug: "pilates-pescoco",
    title: "Pescoço e Ombros",
    description: "Descompressão e fortalecimento para região cervical e ombros.",
    duration: "12 min",
    calories: "120 kcal",
    level: "Todos",
    category: "area",
    image: yogaNeck,
    groupIds: ["postura_dores"],
    exercises: ["Head nods", "Neck circles", "Scapular circles", "Arm openings", "Breathing"],
    i18n: {
      en: {
        title: "Neck & Shoulders",
        description: "Decompression and strengthening for the neck and shoulders.",
        exercises: ["Head nods", "Neck circles", "Scapular circles", "Arm openings", "Breathing"],
      },
      es: {
        title: "Cuello y Hombros",
        description: "Descompresión y fortalecimiento para cuello y hombros.",
        exercises: ["Inclinaciones de cabeza", "Círculos de cuello", "Círculos escapulares", "Aperturas de brazos", "Respiración"],
      },
      fr: {
        title: "Cou et Épaules",
        description: "Décompression et renforcement pour le cou et les épaules.",
        exercises: ["Hochements de tête", "Cercles du cou", "Cercles scapulaires", "Ouvertures des bras", "Respiration"],
      },
    },
  },
  {
    id: 207,
    slug: "pilates-respiracao",
    title: "Respiração e Controle",
    description: "Aprenda a respiração do Pilates e o controle do centro com movimentos simples.",
    duration: "10 min",
    calories: "80 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaMorning,
    groupIds: ["respiracao_base"],
    exercises: ["Respiração lateral", "Ativação do centro", "Imprint", "Mobilidade suave", "Relaxamento"],
    i18n: {
      en: {
        title: "Breathing & Control",
        description: "Learn Pilates breathing and core control with simple movements.",
        exercises: ["Lateral breathing", "Core activation", "Imprint", "Gentle mobility", "Relaxation"],
      },
      es: {
        title: "Respiración y Control",
        description: "Aprende la respiración de Pilates y el control del centro con movimientos simples.",
        exercises: ["Respiración lateral", "Activación del core", "Imprint", "Movilidad suave", "Relajación"],
      },
      fr: {
        title: "Respiration & Contrôle",
        description: "Apprenez la respiration Pilates et le contrôle du centre avec des mouvements simples.",
        exercises: ["Respiration latérale", "Activation du centre", "Imprint", "Mobilité douce", "Relaxation"],
      },
    },
  },
  {
    id: 208,
    slug: "pilates-exercicio-pelvico",
    title: "Exercício Pélvico",
    description: "Estabilidade e consciência pélvica para melhorar postura e controle.",
    duration: "10 min",
    calories: "90 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaHip,
    groupIds: ["respiracao_base", "core_abdomen"],
    exercises: ["Pelvic clock", "Imprint & release", "Bridge leve", "Knee folds", "Respiração"],
    i18n: {
      en: {
        title: "Pelvic Stability",
        description: "Pelvic stability and awareness to improve posture and control.",
        exercises: ["Pelvic clock", "Imprint & release", "Light bridge", "Knee folds", "Breathing"],
      },
      es: {
        title: "Estabilidad Pélvica",
        description: "Estabilidad y conciencia pélvica para mejorar postura y control.",
        exercises: ["Reloj pélvico", "Imprint & release", "Puente suave", "Elevación de rodillas", "Respiración"],
      },
      fr: {
        title: "Stabilité Pelvienne",
        description: "Stabilité et conscience pelviennes pour améliorer posture et contrôle.",
        exercises: ["Horloge pelvienne", "Imprint & release", "Pont léger", "Montées de genoux", "Respiration"],
      },
    },
  },
  {
    id: 209,
    slug: "pilates-no-chao-de-casa",
    title: "Pilates no Chão de Casa",
    description: "Base para iniciantes com estabilidade e movimentos no solo.",
    duration: "12 min",
    calories: "120 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaShoulder,
    groupIds: ["respiracao_base"],
    exercises: ["Respiração", "Hundred leve", "Single leg stretch", "Bridge", "Alongamento final"],
    i18n: {
      en: {
        title: "At-Home Mat Pilates",
        description: "Beginner-friendly foundations with stability and mat movements.",
        exercises: ["Breathing", "Gentle hundred", "Single leg stretch", "Bridge", "Final stretch"],
      },
      es: {
        title: "Pilates en el Suelo (Casa)",
        description: "Base para principiantes con estabilidad y movimientos en el suelo.",
        exercises: ["Respiración", "Hundred suave", "Single leg stretch", "Puente", "Estiramiento final"],
      },
      fr: {
        title: "Pilates au Sol (Maison)",
        description: "Bases pour débutants avec stabilité et mouvements au sol.",
        exercises: ["Respiration", "Hundred léger", "Single leg stretch", "Pont", "Étirement final"],
      },
    },
  },
  {
    id: 210,
    slug: "pilates-comece-o-dia",
    title: "Comece o Dia",
    description: "Sessão curta para acordar o corpo e melhorar a mobilidade pela manhã.",
    duration: "10 min",
    calories: "140 kcal",
    level: "Iniciante",
    category: "programa",
    image: yogaMorning,
    videoUrl: "https://www.youtube.com/embed/hW9y2INnNrQ",
    groupIds: ["comece_o_dia", "mobilidade_flexibilidade"],
    exercises: ["Respiração", "Mobilidade de coluna", "Quadril", "Ombros", "Alongamento"],
    i18n: {
      en: {
        title: "Start Your Day",
        description: "A short session to wake up the body and improve morning mobility.",
        exercises: ["Breathing", "Spine mobility", "Hips", "Shoulders", "Stretching"],
      },
      es: {
        title: "Empieza el Día",
        description: "Sesión corta para despertar el cuerpo y mejorar la movilidad por la mañana.",
        exercises: ["Respiración", "Movilidad de columna", "Cadera", "Hombros", "Estiramiento"],
      },
      fr: {
        title: "Commencez la Journée",
        description: "Séance courte pour réveiller le corps et améliorer la mobilité le matin.",
        exercises: ["Respiration", "Mobilité de la colonne", "Hanches", "Épaules", "Étirement"],
      },
    },
  },
  {
    id: 211,
    slug: "pilates-comece-o-dia-com-energia",
    title: "Comece o Dia com Energia",
    description: "Ativação mais intensa para dar energia e estabilidade no início do dia.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaMorning,
    videoUrl: "https://www.youtube.com/embed/Oqmv45F8fJw",
    groupIds: ["comece_o_dia", "fortalecimento"],
    exercises: ["Hundred", "Bridge", "Plank prep", "Side kicks", "Alongamento"],
    i18n: {
      en: {
        title: "Start Your Day with Energy",
        description: "A more intense activation to boost energy and stability in the morning.",
        exercises: ["Hundred", "Bridge", "Plank prep", "Side kicks", "Stretching"],
      },
      es: {
        title: "Empieza el Día con Energía",
        description: "Activación más intensa para aportar energía y estabilidad al inicio del día.",
        exercises: ["Hundred", "Puente", "Preparación de plancha", "Patadas laterales", "Estiramiento"],
      },
      fr: {
        title: "Commencez avec Énergie",
        description: "Activation plus intense pour donner énergie et stabilité le matin.",
        exercises: ["Hundred", "Pont", "Préparation de planche", "Battements latéraux", "Étirement"],
      },
    },
  },
  {
    id: 212,
    slug: "pilates-fortaleca-abdomen",
    title: "Fortaleça Abdomen",
    description: "Fortalecimento do centro com foco em controle e estabilidade.",
    duration: "14 min",
    calories: "200 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaLowerBack,
    groupIds: ["fortalecimento", "core_abdomen"],
    exercises: ["Dead bug", "Single leg stretch", "Criss-cross", "Plank prep", "Stretch"],
    i18n: {
      en: {
        title: "Strengthen Abdomen",
        description: "Core strengthening focused on control and stability.",
        exercises: ["Dead bug", "Single leg stretch", "Criss-cross", "Plank prep", "Stretch"],
      },
      es: {
        title: "Fortalece el Abdomen",
        description: "Fortalecimiento del core con foco en control y estabilidad.",
        exercises: ["Dead bug", "Single leg stretch", "Criss-cross", "Preparación de plancha", "Estiramiento"],
      },
      fr: {
        title: "Renforcer l’Abdomen",
        description: "Renforcement du centre avec focus sur contrôle et stabilité.",
        exercises: ["Dead bug", "Single leg stretch", "Criss-cross", "Préparation de planche", "Étirement"],
      },
    },
  },
  {
    id: 213,
    slug: "pilates-fortaleca-braco",
    title: "Fortaleça Braço",
    description: "Treino de membros superiores com estabilidade do tronco.",
    duration: "14 min",
    calories: "190 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaShoulder,
    groupIds: ["fortalecimento"],
    exercises: ["Scapular setting", "Push-up prep", "Triceps press", "Plank holds", "Stretch"],
    i18n: {
      en: {
        title: "Strengthen Arms",
        description: "Upper-body workout with trunk stability.",
        exercises: ["Scapular setting", "Push-up prep", "Triceps press", "Plank holds", "Stretch"],
      },
      es: {
        title: "Fortalece Brazos",
        description: "Entrenamiento de tren superior con estabilidad del tronco.",
        exercises: ["Activación escapular", "Preparación de flexión", "Press de tríceps", "Plancha", "Estiramiento"],
      },
      fr: {
        title: "Renforcer les Bras",
        description: "Séance haut du corps avec stabilité du tronc.",
        exercises: ["Placement scapulaire", "Préparation de pompe", "Extension triceps", "Planche", "Étirement"],
      },
    },
  },
  {
    id: 214,
    slug: "pilates-fortaleca-perna",
    title: "Fortaleça Perna",
    description: "Fortalecimento de pernas com controle e alinhamento.",
    duration: "14 min",
    calories: "210 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaHip,
    groupIds: ["fortalecimento"],
    exercises: ["Leg circles", "Side kicks", "Bridge", "Squat prep", "Stretch"],
    i18n: {
      en: {
        title: "Strengthen Legs",
        description: "Leg strengthening with control and alignment.",
        exercises: ["Leg circles", "Side kicks", "Bridge", "Squat prep", "Stretch"],
      },
      es: {
        title: "Fortalece Piernas",
        description: "Fortalecimiento de piernas con control y alineación.",
        exercises: ["Círculos de pierna", "Patadas laterales", "Puente", "Preparación de sentadilla", "Estiramiento"],
      },
      fr: {
        title: "Renforcer les Jambes",
        description: "Renforcement des jambes avec contrôle et alignement.",
        exercises: ["Cercles de jambe", "Battements latéraux", "Pont", "Préparation de squat", "Étirement"],
      },
    },
  },
  {
    id: 215,
    slug: "pilates-fortaleca-ombro",
    title: "Fortaleça Ombro",
    description: "Estabilidade escapular e fortalecimento do ombro com segurança.",
    duration: "12 min",
    calories: "170 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaShoulder,
    groupIds: ["fortalecimento", "postura_dores"],
    exercises: ["Scapular circles", "Arm openings", "Swan prep", "Shoulder stability", "Stretch"],
    i18n: {
      en: {
        title: "Strengthen Shoulders",
        description: "Scapular stability and safe shoulder strengthening.",
        exercises: ["Scapular circles", "Arm openings", "Swan prep", "Shoulder stability", "Stretch"],
      },
      es: {
        title: "Fortalece Hombros",
        description: "Estabilidad escapular y fortalecimiento seguro de hombros.",
        exercises: ["Círculos escapulares", "Aperturas de brazos", "Preparación de cisne", "Estabilidad de hombro", "Estiramiento"],
      },
      fr: {
        title: "Renforcer les Épaules",
        description: "Stabilité scapulaire et renforcement sûr des épaules.",
        exercises: ["Cercles scapulaires", "Ouvertures des bras", "Préparation du cygne", "Stabilité de l’épaule", "Étirement"],
      },
    },
  },
  {
    id: 216,
    slug: "pilates-exercicios-abdominal",
    title: "Exercícios Abdominais",
    description: "Sequência de exercícios focados em abdômen e estabilidade.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaLowerBack,
    groupIds: ["core_abdomen"],
    exercises: ["Hundred", "Single leg stretch", "Criss-cross", "Plank prep", "Stretch"],
    i18n: {
      en: {
        title: "Abdominal Exercises",
        description: "A sequence focused on abdomen and stability.",
        exercises: ["Hundred", "Single leg stretch", "Criss-cross", "Plank prep", "Stretch"],
      },
      es: {
        title: "Ejercicios Abdominales",
        description: "Secuencia enfocada en abdomen y estabilidad.",
        exercises: ["Hundred", "Single leg stretch", "Criss-cross", "Preparación de plancha", "Estiramiento"],
      },
      fr: {
        title: "Exercices Abdominaux",
        description: "Séquence axée sur l’abdomen et la stabilité.",
        exercises: ["Hundred", "Single leg stretch", "Criss-cross", "Préparation de planche", "Étirement"],
      },
    },
  },
  {
    id: 217,
    slug: "pilates-10-exercicios-braco",
    title: "10 Exercícios de Braço",
    description: "Rotina para fortalecer braços com estabilidade do core.",
    duration: "12 min",
    calories: "170 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaShoulder,
    groupIds: ["core_abdomen", "fortalecimento"],
    exercises: ["Scapular setting", "Arm series", "Plank prep", "Triceps", "Stretch"],
    i18n: {
      en: {
        title: "10 Arm Exercises",
        description: "Arm routine with core stability.",
        exercises: ["Scapular setting", "Arm series", "Plank prep", "Triceps", "Stretch"],
      },
      es: {
        title: "10 Ejercicios de Brazo",
        description: "Rutina para fortalecer brazos con estabilidad del core.",
        exercises: ["Activación escapular", "Serie de brazos", "Preparación de plancha", "Tríceps", "Estiramiento"],
      },
      fr: {
        title: "10 Exercices de Bras",
        description: "Routine bras avec stabilité du centre.",
        exercises: ["Placement scapulaire", "Série bras", "Préparation de planche", "Triceps", "Étirement"],
      },
    },
  },
  {
    id: 219,
    slug: "pilates-alongamento-mobilidade",
    title: "Alongamento e Mobilidade",
    description: "Rotina para aumentar mobilidade e prevenir lesões.",
    duration: "12 min",
    calories: "100 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    videoUrl: "https://www.youtube.com/embed/hYCS5ZsYRSs",
    groupIds: ["mobilidade_flexibilidade"],
    exercises: ["Mobilidade de coluna", "Quadril", "Ombros", "Alongamentos", "Respiração"],
    i18n: {
      en: {
        title: "Stretching & Mobility",
        description: "Routine to improve mobility and help prevent injuries.",
        exercises: ["Spine mobility", "Hips", "Shoulders", "Stretching", "Breathing"],
      },
      es: {
        title: "Estiramiento y Movilidad",
        description: "Rutina para aumentar movilidad y prevenir lesiones.",
        exercises: ["Movilidad de columna", "Cadera", "Hombros", "Estiramientos", "Respiración"],
      },
      fr: {
        title: "Étirements & Mobilité",
        description: "Routine pour améliorer la mobilité et prévenir les blessures.",
        exercises: ["Mobilité de la colonne", "Hanches", "Épaules", "Étirements", "Respiration"],
      },
    },
  },
  {
    id: 220,
    slug: "pilates-com-esta-mobilidade",
    title: "Com esta Mobilidade",
    description: "Sessão focada em flexibilidade e soltura para o corpo todo.",
    duration: "14 min",
    calories: "110 kcal",
    level: "Todos",
    category: "programa",
    image: yogaEvening,
    groupIds: ["mobilidade_flexibilidade"],
    exercises: ["Spine twist", "Saw", "Hip stretch", "Shoulder opening", "Relax"],
    i18n: {
      en: {
        title: "Boost Your Mobility",
        description: "Flexibility-focused session to loosen the whole body.",
        exercises: ["Spine twist", "Saw", "Hip stretch", "Shoulder opening", "Relax"],
      },
      es: {
        title: "Mejora tu Movilidad",
        description: "Sesión enfocada en flexibilidad y soltura para todo el cuerpo.",
        exercises: ["Torsión de columna", "Saw", "Estiramiento de cadera", "Apertura de hombros", "Relajación"],
      },
      fr: {
        title: "Améliorez votre Mobilité",
        description: "Séance axée sur la souplesse pour délier tout le corps.",
        exercises: ["Torsion de la colonne", "Saw", "Étirement des hanches", "Ouverture des épaules", "Relaxation"],
      },
    },
  },
  {
    id: 221,
    slug: "pilates-exercicio-em-pe",
    title: "Exercício em Pé",
    description: "Pilates funcional em pé para equilíbrio e estabilidade.",
    duration: "12 min",
    calories: "160 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaBalance,
    videoUrl: "https://www.youtube.com/embed/6mYE8KGGJIc",
    groupIds: ["em_pe"],
    exercises: ["Alinhamento", "Equilíbrio", "Agachamento controlado", "Estabilidade", "Alongamento"],
    i18n: {
      en: {
        title: "Standing Pilates",
        description: "Functional standing pilates for balance and stability.",
        exercises: ["Alignment", "Balance", "Controlled squat", "Stability", "Stretching"],
      },
      es: {
        title: "Pilates de Pie",
        description: "Pilates funcional de pie para equilibrio y estabilidad.",
        exercises: ["Alineación", "Equilibrio", "Sentadilla controlada", "Estabilidad", "Estiramiento"],
      },
      fr: {
        title: "Pilates Debout",
        description: "Pilates fonctionnel debout pour l’équilibre et la stabilité.",
        exercises: ["Alignement", "Équilibre", "Squat contrôlé", "Stabilité", "Étirement"],
      },
    },
  },
  {
    id: 222,
    slug: "pilates-desafio-rapido-core",
    title: "Desafio Rápido: Abdomen",
    description: "Desafio curto para ativar o abdômen e melhorar estabilidade.",
    duration: "7 min",
    calories: "120 kcal",
    level: "Intermediário",
    category: "destaque",
    image: yogaLowerBack,
    groupIds: ["desafios_rapidos", "core_abdomen"],
    exercises: ["Hundred", "Plank prep", "Dead bug", "Criss-cross", "Stretch"],
    i18n: {
      en: {
        title: "Quick Challenge: Abdomen",
        description: "Short challenge to activate the abdomen and improve stability.",
        exercises: ["Hundred", "Plank prep", "Dead bug", "Criss-cross", "Stretch"],
      },
      es: {
        title: "Desafío Rápido: Abdomen",
        description: "Desafío corto para activar el abdomen y mejorar la estabilidad.",
        exercises: ["Hundred", "Preparación de plancha", "Dead bug", "Criss-cross", "Estiramiento"],
      },
      fr: {
        title: "Défi Rapide : Abdomen",
        description: "Défi court pour activer l’abdomen et améliorer la stabilité.",
        exercises: ["Hundred", "Préparation de planche", "Dead bug", "Criss-cross", "Étirement"],
      },
    },
  },
  {
    id: 223,
    slug: "pilates-desafio-rapido-mobilidade",
    title: "Desafio Rápido: Mobilidade",
    description: "Sequência rápida para soltar o corpo e ganhar mobilidade.",
    duration: "6 min",
    calories: "90 kcal",
    level: "Todos",
    category: "destaque",
    image: yogaEvening,
    groupIds: ["desafios_rapidos", "mobilidade_flexibilidade"],
    exercises: ["Spine twist", "Hip circles", "Arm openings", "Saw", "Breathing"],
    i18n: {
      en: {
        title: "Quick Challenge: Mobility",
        description: "Quick sequence to loosen the body and improve mobility.",
        exercises: ["Spine twist", "Hip circles", "Arm openings", "Saw", "Breathing"],
      },
      es: {
        title: "Desafío Rápido: Movilidad",
        description: "Secuencia rápida para soltar el cuerpo y ganar movilidad.",
        exercises: ["Torsión de columna", "Círculos de cadera", "Aperturas de brazos", "Saw", "Respiración"],
      },
      fr: {
        title: "Défi Rapide : Mobilité",
        description: "Séquence rapide pour délier le corps et gagner en mobilité.",
        exercises: ["Torsion de la colonne", "Cercles de hanches", "Ouvertures des bras", "Saw", "Respiration"],
      },
    },
  },
  {
    id: 224,
    slug: "pilates-desafio-rapido-postura",
    title: "Desafio Rápido: Postura",
    description: "Ative escápulas e alongue para melhorar sua postura rapidamente.",
    duration: "6 min",
    calories: "90 kcal",
    level: "Todos",
    category: "destaque",
    image: yogaShoulder,
    groupIds: ["desafios_rapidos", "postura_dores"],
    exercises: ["Scapular setting", "Swan prep", "Arm openings", "Breathing", "Stretch"],
    i18n: {
      en: {
        title: "Quick Challenge: Posture",
        description: "Activate your shoulder blades and stretch to improve posture quickly.",
        exercises: ["Scapular setting", "Swan prep", "Arm openings", "Breathing", "Stretch"],
      },
      es: {
        title: "Desafío Rápido: Postura",
        description: "Activa escápulas y estira para mejorar la postura rápidamente.",
        exercises: ["Activación escapular", "Preparación de cisne", "Aperturas de brazos", "Respiración", "Estiramiento"],
      },
      fr: {
        title: "Défi Rapide : Posture",
        description: "Activez les omoplates et étirez-vous pour améliorer la posture rapidement.",
        exercises: ["Placement scapulaire", "Préparation du cygne", "Ouvertures des bras", "Respiration", "Étirement"],
      },
    },
  },
];

export const getPilatesSessionBySlug = (slug: string) =>
  pilatesSessions.find((s) => s.slug === slug);
export const getAreaPilates = () => pilatesSessions.filter((s) => s.category === "area");
export const getProgramPilates = () => pilatesSessions.filter((s) => s.category === "programa");
export const getPilatesByGroup = (groupId: PilatesGroupId) =>
  pilatesSessions.filter((s) => s.groupIds?.includes(groupId));
export const filterPilatesByLevel = (list: PilatesSession[], level: string) =>
  level === "Todos" ? list : list.filter((s) => s.level === level);
