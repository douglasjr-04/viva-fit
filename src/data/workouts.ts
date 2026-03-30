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

export type WorkoutModuleId = "casa" | "academia" | "corpo-firme" | "mobilidade" | "core" | "funcional";

export type WorkoutTopicId =
  | "hypertrophy"
  | "weight_loss"
  | "glutes"
  | "challenges"
  | "strength_gain"
  | "full_body"
  | "dumbbells"
  | "flexibility"
  | "recovery"
  | "prevention"
  | "strength"
  | "stability"
  | "definition"
  | "conditioning"
  | "explosion";

export type WorkoutI18n = {
  title: string;
  description: string;
  exercises?: string[];
};

export interface Workout {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  calories: string;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Todos";
  category: "area" | "programa" | "destaque";
  moduleId: WorkoutModuleId;
  topics: WorkoutTopicId[];
  image: string;
  exercises: string[];
  videoUrl?: string;
  i18n?: Partial<Record<Language, WorkoutI18n>>;
}

export const workouts: Workout[] = [
  {
    id: 101,
    slug: "treino-matinal",
    title: "Treino Matinal",
    description: "Rotina rápida para acordar o corpo com foco em mobilidade e cardio leve.",
    duration: "15 min",
    calories: "350 kcal",
    level: "Iniciante",
    category: "destaque",
    moduleId: "casa",
    topics: ["weight_loss", "challenges"],
    image: yogaBlackOutfit,
    exercises: ["Polichinelos leves", "Mobilidade de ombros", "Agachamentos", "Prancha curta", "Alongamento geral"],
    videoUrl: "/videos/Polichinelo.mp4",
    i18n: {
      en: {
        title: "Morning Workout",
        description: "Quick routine to wake up your body with mobility and light cardio.",
        exercises: ["Light jumping jacks", "Shoulder mobility", "Squats", "Short plank", "Full-body stretch"],
      },
      es: {
        title: "Entrenamiento Matutino",
        description: "Rutina rápida para activar el cuerpo con movilidad y cardio suave.",
        exercises: ["Saltos suaves", "Movilidad de hombros", "Sentadillas", "Plancha corta", "Estiramiento general"],
      },
      fr: {
        title: "Entraînement Matinal",
        description: "Routine rapide pour réveiller le corps avec mobilité et cardio léger.",
        exercises: ["Jumping jacks légers", "Mobilité des épaules", "Squats", "Planche courte", "Étirement global"],
      },
    },
  },
  {
    id: 102,
    slug: "core-rapido",
    title: "Core Rápido",
    description: "Sequência objetiva para ativar abdômen e lombar.",
    duration: "12 min",
    calories: "180 kcal",
    level: "Iniciante",
    category: "destaque",
    moduleId: "core",
    topics: ["strength", "stability"],
    image: yogaTealCurly,
    exercises: ["Prancha", "Bicicleta", "Prancha lateral", "Dead bug", "Alongamento lombar"],
    videoUrl: "/videos/Prancha-isometrica.mp4",
    i18n: {
      en: {
        title: "Quick Core",
        description: "Straightforward sequence to activate abs and lower back.",
        exercises: ["Plank", "Bicycle", "Side plank", "Dead bug", "Lower-back stretch"],
      },
      es: {
        title: "Core Rápido",
        description: "Secuencia directa para activar abdomen y zona lumbar.",
        exercises: ["Plancha", "Bicicleta", "Plancha lateral", "Dead bug", "Estiramiento lumbar"],
      },
      fr: {
        title: "Core Rapide",
        description: "Séquence simple pour activer abdos et bas du dos.",
        exercises: ["Planche", "Bicycle", "Planche latérale", "Dead bug", "Étirement lombaire"],
      },
    },
  },
  {
    id: 103,
    slug: "membros-inferiores",
    title: "Membros Inferiores",
    description: "Foque em pernas e glúteos com movimentos simples.",
    duration: "14 min",
    calories: "220 kcal",
    level: "Intermediário",
    category: "area",
    moduleId: "academia",
    topics: ["hypertrophy", "strength_gain"],
    image: yogaHip,
    exercises: ["Agachamento", "Avanço", "Elevação pélvica", "Pistol assistido", "Alongamento posterior"],
    videoUrl: "/videos/Afundo.mp4",
    i18n: {
      en: {
        title: "Lower Body",
        description: "Focus on legs and glutes with simple movements.",
        exercises: ["Squat", "Lunge", "Hip bridge", "Assisted pistol squat", "Hamstring stretch"],
      },
      es: {
        title: "Tren Inferior",
        description: "Enfócate en piernas y glúteos con movimientos simples.",
        exercises: ["Sentadilla", "Zancada", "Puente de glúteos", "Pistol asistida", "Estiramiento de isquiotibiales"],
      },
      fr: {
        title: "Bas du Corps",
        description: "Travaillez jambes et fessiers avec des mouvements simples.",
        exercises: ["Squat", "Fente", "Pont fessier", "Pistol assisté", "Étirement des ischios"],
      },
    },
  },
  {
    id: 104,
    slug: "membros-superiores",
    title: "Membros Superiores",
    description: "Trabalhe braços, peito e costas sem equipamentos.",
    duration: "12 min",
    calories: "200 kcal",
    level: "Todos",
    category: "area",
    moduleId: "academia",
    topics: ["strength_gain", "hypertrophy"],
    image: yogaShoulder,
    exercises: ["Flexões", "Pike push-up", "Remada isométrica", "Prancha alta", "Alongamento de peito"],
    videoUrl: "/videos/Flexão-de-Braços-com-Apoio.mp4",
    i18n: {
      en: {
        title: "Upper Body",
        description: "Train arms, chest, and back with no equipment.",
        exercises: ["Push-ups", "Pike push-up", "Isometric row", "High plank", "Chest stretch"],
      },
      es: {
        title: "Tren Superior",
        description: "Trabaja brazos, pecho y espalda sin equipo.",
        exercises: ["Flexiones", "Pike push-up", "Remo isométrico", "Plancha alta", "Estiramiento de pecho"],
      },
      fr: {
        title: "Haut du Corps",
        description: "Travaillez bras, poitrine et dos sans matériel.",
        exercises: ["Pompes", "Pike push-up", "Row isométrique", "Planche haute", "Étirement pectoraux"],
      },
    },
  },
  {
    id: 105,
    slug: "condicionamento",
    title: "Condicionamento",
    description: "Sequência para elevar a frequência cardíaca de forma segura.",
    duration: "16 min",
    calories: "260 kcal",
    level: "Intermediário",
    category: "programa",
    moduleId: "funcional",
    topics: ["conditioning", "explosion"],
    image: yogaBalance,
    exercises: ["Mountain climbers", "Burpee sem salto", "Corrida estacionária", "Prancha dinâmica", "Resfriamento"],
    videoUrl: "/videos/agachamento-livre.mp4",
    i18n: {
      en: {
        title: "Conditioning",
        description: "Sequence to safely raise your heart rate.",
        exercises: ["Mountain climbers", "No-jump burpee", "High knees", "Dynamic plank", "Cool down"],
      },
      es: {
        title: "Acondicionamiento",
        description: "Secuencia para aumentar la frecuencia cardíaca de forma segura.",
        exercises: ["Mountain climbers", "Burpee sin salto", "Rodillas arriba", "Plancha dinámica", "Enfriamiento"],
      },
      fr: {
        title: "Conditionnement",
        description: "Séquence pour augmenter la fréquence cardiaque en toute sécurité.",
        exercises: ["Mountain climbers", "Burpee sans saut", "Montées de genoux", "Planche dynamique", "Retour au calme"],
      },
    },
  },
  {
    id: 106,
    slug: "forca-basica",
    title: "Força Básica",
    description: "Treino de força geral para corpo todo.",
    duration: "20 min",
    calories: "300 kcal",
    level: "Iniciante",
    category: "programa",
    moduleId: "corpo-firme",
    topics: ["dumbbells", "full_body"],
    image: yogaFlexibility,
    exercises: ["Agachamento", "Flexão joelhos no chão", "Remada toalha", "Prancha", "Alongamentos"],
    videoUrl: "/videos/Elevação-de-Quadril.mp4",
    i18n: {
      en: {
        title: "Basic Strength",
        description: "Full-body strength workout.",
        exercises: ["Squat", "Knee push-ups", "Towel row", "Plank", "Stretches"],
      },
      es: {
        title: "Fuerza Básica",
        description: "Entrenamiento de fuerza general para todo el cuerpo.",
        exercises: ["Sentadilla", "Flexiones con rodillas", "Remo con toalla", "Plancha", "Estiramientos"],
      },
      fr: {
        title: "Force de Base",
        description: "Entraînement de force global pour tout le corps.",
        exercises: ["Squat", "Pompes sur les genoux", "Row avec serviette", "Planche", "Étirements"],
      },
    },
  },
  {
    id: 107,
    slug: "aquecimento",
    title: "Aquecimento",
    description: "Prepare-se para treinos mais intensos.",
    duration: "10 min",
    calories: "120 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["prevention", "recovery"],
    image: yogaMorning,
    exercises: ["Mobilidade cervical", "Ombros", "Quadril", "Tornozelos", "Passadas dinâmicas"],
    i18n: {
      en: {
        title: "Warm-up",
        description: "Get ready for more intense workouts.",
        exercises: ["Neck mobility", "Shoulders", "Hips", "Ankles", "Dynamic lunges"],
      },
      es: {
        title: "Calentamiento",
        description: "Prepárate para entrenamientos más intensos.",
        exercises: ["Movilidad cervical", "Hombros", "Cadera", "Tobillos", "Zancadas dinámicas"],
      },
      fr: {
        title: "Échauffement",
        description: "Préparez-vous à des entraînements plus intenses.",
        exercises: ["Mobilité cervicale", "Épaules", "Hanches", "Chevilles", "Fentes dynamiques"],
      },
    },
  },
  {
    id: 108,
    slug: "resfriamento",
    title: "Resfriamento",
    description: "Desacelere e recupere após o treino.",
    duration: "12 min",
    calories: "100 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery", "flexibility"],
    image: yogaEvening,
    exercises: ["Respiração 4-7-8", "Alongamento posterior", "Torção suave", "Quadríceps", "Respiração final"],
    i18n: {
      en: {
        title: "Cool down",
        description: "Slow down and recover after your workout.",
        exercises: ["4-7-8 breathing", "Hamstring stretch", "Gentle twist", "Quadriceps", "Final breathing"],
      },
      es: {
        title: "Enfriamiento",
        description: "Baja el ritmo y recupérate después del entrenamiento.",
        exercises: ["Respiración 4-7-8", "Estiramiento posterior", "Torsión suave", "Cuádriceps", "Respiración final"],
      },
      fr: {
        title: "Retour au calme",
        description: "Ralentissez et récupérez après l’entraînement.",
        exercises: ["Respiration 4-7-8", "Étirement des ischios", "Torsion douce", "Quadriceps", "Respiration finale"],
      },
    },
  },
];

export function getWorkoutText(workout: Workout, language: Language) {
  const localized = workout.i18n?.[language];
  return {
    title: localized?.title ?? workout.title,
    description: localized?.description ?? workout.description,
    exercises: localized?.exercises ?? workout.exercises,
  };
}

export const getWorkoutBySlug = (slug: string): Workout | undefined => workouts.find(w => w.slug === slug);
export const getWorkoutById = (id: number): Workout | undefined => workouts.find(w => w.id === id);
export const getWorkoutsByCategory = (category: Workout["category"]): Workout[] =>
  workouts.filter(w => w.category === category);
export const getAreaWorkouts = (): Workout[] => getWorkoutsByCategory("area");
export const getProgramWorkouts = (): Workout[] => getWorkoutsByCategory("programa");
export const getFeaturedWorkouts = (): Workout[] => getWorkoutsByCategory("destaque");
export const filterWorkoutsByLevel = (list: Workout[], level: string): Workout[] =>
  level === "Todos" ? list : list.filter(w => w.level === level);
