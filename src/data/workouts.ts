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
    id: 109,
    slug: "massa-em-casa",
    title: "Massa em Casa",
    description: "Treino com foco em volume e controle de tempo para estimular hipertrofia sem equipamentos.",
    duration: "18 min",
    calories: "260 kcal",
    level: "Intermediário",
    category: "programa",
    moduleId: "casa",
    topics: ["hypertrophy"],
    image: yogaTealCurly,
    exercises: ["Flexões", "Agachamento lento", "Avanço alternado", "Prancha alta", "Alongamento final"],
    videoUrl: "/videos/Flexão-de-Braços-com-Apoio.mp4",
    i18n: {
      en: {
        title: "Build Muscle at Home",
        description: "Volume-focused workout using tempo control to stimulate hypertrophy with no equipment.",
        exercises: ["Push-ups", "Slow squats", "Alternating lunges", "High plank", "Final stretch"],
      },
      es: {
        title: "Masa Muscular en Casa",
        description: "Entrenamiento enfocado en volumen y control del ritmo para estimular hipertrofia sin equipo.",
        exercises: ["Flexiones", "Sentadilla lenta", "Zancadas alternas", "Plancha alta", "Estiramiento final"],
      },
      fr: {
        title: "Muscle à la Maison",
        description: "Séance axée sur le volume et le tempo pour stimuler l’hypertrophie sans matériel.",
        exercises: ["Pompes", "Squats lents", "Fentes alternées", "Planche haute", "Étirement final"],
      },
    },
  },
  {
    id: 110,
    slug: "emagrecimento-em-casa",
    title: "Emagrecimento em Casa",
    description: "Cardio e força combinados para queimar calorias com segurança.",
    duration: "16 min",
    calories: "300 kcal",
    level: "Intermediário",
    category: "programa",
    moduleId: "casa",
    topics: ["weight_loss"],
    image: yogaBalance,
    exercises: ["Polichinelos", "Agachamentos", "Mountain climbers", "Prancha dinâmica", "Resfriamento"],
    videoUrl: "/videos/Polichinelo.mp4",
    i18n: {
      en: {
        title: "Weight Loss at Home",
        description: "Cardio + strength combo to burn calories safely.",
        exercises: ["Jumping jacks", "Squats", "Mountain climbers", "Dynamic plank", "Cool down"],
      },
      es: {
        title: "Adelgazamiento en Casa",
        description: "Combinación de cardio y fuerza para quemar calorías de forma segura.",
        exercises: ["Saltos", "Sentadillas", "Mountain climbers", "Plancha dinámica", "Enfriamiento"],
      },
      fr: {
        title: "Perte de Poids à la Maison",
        description: "Cardio + renforcement pour brûler des calories en toute sécurité.",
        exercises: ["Jumping jacks", "Squats", "Mountain climbers", "Planche dynamique", "Retour au calme"],
      },
    },
  },
  {
    id: 111,
    slug: "gluteos-em-casa",
    title: "Glúteos em Casa",
    description: "Ativação de glúteos com ênfase em estabilidade e amplitude.",
    duration: "14 min",
    calories: "240 kcal",
    level: "Intermediário",
    category: "area",
    moduleId: "casa",
    topics: ["glutes"],
    image: yogaHip,
    exercises: ["Elevação de quadril", "Afundo", "Agachamento", "Ponte unilateral", "Alongamento"],
    videoUrl: "/videos/Elevação-de-Quadril.mp4",
    i18n: {
      en: {
        title: "Glutes at Home",
        description: "Glute activation focused on stability and range of motion.",
        exercises: ["Hip bridge", "Lunge", "Squat", "Single-leg bridge", "Stretch"],
      },
      es: {
        title: "Glúteos en Casa",
        description: "Activación de glúteos con énfasis en estabilidad y amplitud.",
        exercises: ["Puente de glúteos", "Zancada", "Sentadilla", "Puente a una pierna", "Estiramiento"],
      },
      fr: {
        title: "Fessiers à la Maison",
        description: "Activation des fessiers avec focus sur stabilité et amplitude.",
        exercises: ["Pont fessier", "Fente", "Squat", "Pont une jambe", "Étirement"],
      },
    },
  },
  {
    id: 112,
    slug: "desafio-secar-definir",
    title: "Desafio Secar e Definir",
    description: "Um desafio curto com treinos objetivos para elevar o gasto calórico e definir.",
    duration: "20 min",
    calories: "340 kcal",
    level: "Todos",
    category: "programa",
    moduleId: "casa",
    topics: ["challenges", "weight_loss"],
    image: yogaBlackOutfit,
    exercises: ["Agachamento", "Polichinelos", "Prancha", "Afundo", "Alongamento final"],
    videoUrl: "/videos/agachamento-livre.mp4",
    i18n: {
      en: {
        title: "Cut & Define Challenge",
        description: "Short challenge with focused workouts to boost calorie burn and definition.",
        exercises: ["Squat", "Jumping jacks", "Plank", "Lunge", "Final stretch"],
      },
      es: {
        title: "Desafío para Secar y Definir",
        description: "Desafío corto con entrenamientos enfocados para aumentar el gasto calórico y definir.",
        exercises: ["Sentadilla", "Saltos", "Plancha", "Zancada", "Estiramiento final"],
      },
      fr: {
        title: "Défi Sécher & Définir",
        description: "Défi court avec des séances ciblées pour augmenter la dépense et la définition.",
        exercises: ["Squat", "Jumping jacks", "Planche", "Fente", "Étirement final"],
      },
    },
  },
  {
    id: 120,
    slug: "alongamento-pescoco-2",
    title: "Alongamento de Pescoço II",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "6 min",
    calories: "60 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaNeck,
    exercises: ["Alongamento de Pescoço II", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Neck Stretch II",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Neck Stretch II", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Cuello II",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de Cuello II", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement du Cou II",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement du Cou II", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 121,
    slug: "alongamento-triceps",
    title: "Alongamento de Tríceps",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "6 min",
    calories: "60 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaShoulder,
    exercises: ["Alongamento de Tríceps", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Triceps Stretch",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Triceps Stretch", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Tríceps",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de Tríceps", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Triceps",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des Triceps", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 122,
    slug: "alongamento-punho-1",
    title: "Alongamento de Punho I",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "6 min",
    calories: "60 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaShoulder,
    exercises: ["Alongamento de Punho I", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Wrist Stretch I",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Wrist Stretch I", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Muñeca I",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de Muñeca I", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement du Poignet I",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement du Poignet I", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 123,
    slug: "alongamento-posteriores-7",
    title: "Alongamento de Posteriores VII",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaFlexibility,
    exercises: ["Alongamento de Posteriores VII", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hamstring Stretch VII",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hamstring Stretch VII", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Isquiotibiales VII",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de Isquiotibiales VII", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Ischios VII",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des Ischios VII", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 124,
    slug: "alongamento-quadriceps-7",
    title: "Alongamento de Quadríceps VII",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaEvening,
    exercises: ["Alongamento de Quadríceps VII", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Quadriceps Stretch VII",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Quadriceps Stretch VII", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Cuádriceps VII",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de Cuádriceps VII", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Quadriceps VII",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des Quadriceps VII", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 125,
    slug: "anterior-quadril-flexao-tronco",
    title: "Anterior Quadril com Flexão de Tronco",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaHip,
    exercises: ["Anterior Quadril com Flexão de Tronco", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hip Flexor with Forward Fold",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hip flexor + forward fold", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Flexor de Cadera con Flexión de Tronco",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Flexor de cadera + flexión de tronco", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Fléchisseur de Hanche + Flexion du Buste",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Fléchisseur de hanche + flexion", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 126,
    slug: "alongamento-abdomen",
    title: "Alongamento Abdômen",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "6 min",
    calories: "60 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaMorning,
    exercises: ["Alongamento Abdômen", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Ab Stretch",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Ab stretch", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Abdomen",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de abdomen", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Abdos",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des abdos", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 127,
    slug: "alongamento-posteriores-4",
    title: "Alongamento de Posteriores IV",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaFlexibility,
    exercises: ["Alongamento de Posteriores IV", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hamstring Stretch IV",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hamstring Stretch IV", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Isquiotibiales IV",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de isquiotibiales IV", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Ischios IV",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des ischios IV", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 128,
    slug: "alongamento-posterior-2",
    title: "Alongamento de Posterior II",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["flexibility"],
    image: yogaFlexibility,
    exercises: ["Alongamento de Posterior II", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hamstring Stretch II",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hamstring Stretch II", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Isquiotibiales II",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de isquiotibiales II", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement des Ischios II",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement des ischios II", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 129,
    slug: "alongamento-peitoral-espaldar-2",
    title: "Alongamento de Peitoral Espaldar II",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "7 min",
    calories: "70 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaShoulder,
    exercises: ["Alongamento de Peitoral Espaldar II", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Chest & Back Stretch II",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Chest & Back Stretch II", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Pecho y Espalda II",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de pecho y espalda II", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Poitrine & Dos II",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement poitrine & dos II", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 130,
    slug: "alongamento-panturrilha-espaldar",
    title: "Alongamento de Panturrilha Espaldar",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "7 min",
    calories: "70 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaEvening,
    exercises: ["Alongamento de Panturrilha Espaldar", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Calf & Back Stretch",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Calf & Back Stretch", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Pantorrilla y Espalda",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de pantorrilla y espalda", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Mollet & Dos",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement mollet & dos", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 131,
    slug: "alongamento-adutor-espaldar",
    title: "Alongamento Adutor Espaldar",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "7 min",
    calories: "70 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaHip,
    exercises: ["Alongamento Adutor Espaldar", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Adductor & Back Stretch",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Adductor & Back Stretch", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Aductor y Espalda",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de aductor y espalda", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Adducteurs & Dos",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement adducteurs & dos", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 132,
    slug: "alongamento-peitoral-espaldar-1",
    title: "Alongamento de Peitoral Espaldar",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "7 min",
    calories: "70 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaShoulder,
    exercises: ["Alongamento de Peitoral Espaldar", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Chest & Back Stretch",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Chest & Back Stretch", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Pecho y Espalda",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento de pecho y espalda", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Poitrine & Dos",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement poitrine & dos", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 133,
    slug: "alongamento-posteriores-espaldar-2",
    title: "Alongamento de Posteriores Espaldar II",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaFlexibility,
    exercises: ["Alongamento de Posteriores Espaldar II", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hamstrings & Back Stretch II",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hamstrings & Back Stretch II", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Isquiotibiales y Espalda II",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Isquiotibiales y espalda II", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Ischios & Dos II",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Ischios & dos II", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 134,
    slug: "alongamento-posteriores-espaldar-1",
    title: "Alongamento de Posteriores Espaldar I",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "8 min",
    calories: "80 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaFlexibility,
    exercises: ["Alongamento de Posteriores Espaldar I", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Hamstrings & Back Stretch I",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Hamstrings & Back Stretch I", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento de Isquiotibiales y Espalda I",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Isquiotibiales y espalda I", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement Ischios & Dos I",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Ischios & dos I", "10–15 secondes", "Respiration contrôlée"],
      },
    },
  },
  {
    id: 135,
    slug: "alongamento-dorsal-espaldar-4",
    title: "Alongamento Dorsal Espaldar IV",
    description: "Execute o exercício uma vez, mantendo o movimento por 10 a 15 segundos.",
    duration: "7 min",
    calories: "70 kcal",
    level: "Todos",
    category: "area",
    moduleId: "mobilidade",
    topics: ["recovery"],
    image: yogaLowerBack,
    exercises: ["Alongamento Dorsal Espaldar IV", "10–15 segundos", "Respiração controlada"],
    i18n: {
      en: {
        title: "Back Stretch IV",
        description: "Perform the exercise once, holding the movement for 10 to 15 seconds.",
        exercises: ["Back Stretch IV", "10–15 seconds", "Controlled breathing"],
      },
      es: {
        title: "Estiramiento Dorsal IV",
        description: "Realiza el ejercicio una vez, manteniendo el movimiento durante 10 a 15 segundos.",
        exercises: ["Estiramiento dorsal IV", "10–15 segundos", "Respiración controlada"],
      },
      fr: {
        title: "Étirement du Dos IV",
        description: "Faites l’exercice une fois, en maintenant le mouvement 10 à 15 secondes.",
        exercises: ["Étirement du dos IV", "10–15 secondes", "Respiration contrôlée"],
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
    topics: ["hypertrophy", "strength_gain", "glutes"],
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
    id: 113,
    slug: "emagrecimento-academia",
    title: "Emagrecimento na Academia",
    description: "Cardio com esteira e exercícios complementares para acelerar a queima.",
    duration: "18 min",
    calories: "340 kcal",
    level: "Intermediário",
    category: "programa",
    moduleId: "academia",
    topics: ["weight_loss"],
    image: yogaBalance,
    exercises: ["Esteira rápida", "Agachamento", "Mountain climbers", "Prancha", "Resfriamento"],
    videoUrl: "/videos/agachamento-livre.mp4",
    i18n: {
      en: {
        title: "Gym Weight Loss",
        description: "Treadmill cardio plus complementary drills to boost fat burn.",
        exercises: ["Fast treadmill", "Squats", "Mountain climbers", "Plank", "Cool down"],
      },
      es: {
        title: "Adelgazamiento en el Gimnasio",
        description: "Cardio en cinta y ejercicios complementarios para acelerar la quema.",
        exercises: ["Cinta rápida", "Sentadillas", "Mountain climbers", "Plancha", "Enfriamiento"],
      },
      fr: {
        title: "Perte de Poids en Salle",
        description: "Cardio sur tapis et exercices complémentaires pour accélérer la dépense.",
        exercises: ["Tapis rapide", "Squats", "Mountain climbers", "Planche", "Retour au calme"],
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
