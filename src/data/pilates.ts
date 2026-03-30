import yogaLowerBack from "@/assets/yoga-lower-back.png";
import yogaNeck from "@/assets/yoga-neck.png";
import yogaMorning from "@/assets/yoga-morning.png";
import yogaHip from "@/assets/yoga-hip.png";
import yogaShoulder from "@/assets/yoga-shoulder.png";
import yogaEvening from "@/assets/yoga-evening.png";
import { Language } from "@/context/UserContext";
import { Session } from "./sessions";

export interface PilatesSession extends Session {
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
    id: 201,
    slug: "pilates-matinal",
    title: "Pilates Matinal",
    description: "Sequência para ativar o core e alongar suavemente ao acordar.",
    duration: "15 min",
    calories: "220 kcal",
    level: "Iniciante",
    category: "destaque",
    image: yogaMorning,
    exercises: ["Respiração lateral", "Imprint & release", "Hundred leve", "Bridge", "Roll down"],
    i18n: {
      en: {
        title: "Morning Pilates",
        description: "Activate your core and stretch gently to start the day.",
        exercises: ["Lateral breathing", "Imprint & release", "Gentle hundred", "Bridge", "Roll down"],
      },
      es: {
        title: "Pilates Matutino",
        description: "Activa el core y estira suavemente para comenzar el día.",
        exercises: ["Respiración lateral", "Imprint & release", "Hundred suave", "Puente", "Roll down"],
      },
      fr: {
        title: "Pilates Matinal",
        description: "Activez le centre et étirez-vous en douceur pour commencer la journée.",
        exercises: ["Respiration latérale", "Imprint & release", "Hundred léger", "Pont", "Roll down"],
      },
    },
  },
  {
    id: 202,
    slug: "pilates-postural",
    title: "Pilates Postural",
    description: "Foco em alinhamento, estabilidade e consciência corporal.",
    duration: "12 min",
    calories: "160 kcal",
    level: "Iniciante",
    category: "destaque",
    image: yogaShoulder,
    exercises: ["Scapular setting", "Swan prep", "Swimming leve", "Single leg stretch", "Shell stretch"],
  },
  {
    id: 203,
    slug: "pilates-coluna",
    title: "Pilates para Coluna",
    description: "Fortaleça e mobilize a coluna de forma segura.",
    duration: "14 min",
    calories: "180 kcal",
    level: "Intermediário",
    category: "area",
    image: yogaLowerBack,
    exercises: ["Cat-cow pilates", "Spine twist", "Shoulder bridge", "Saw", "Roll up assistido"],
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
    exercises: ["Head nods", "Neck circles", "Scapular circles", "Arm openings", "Breathing"],
  },
  {
    id: 205,
    slug: "pilates-hip",
    title: "Quadril & Glúteos",
    description: "Estabilidade do quadril e ativação de glúteos.",
    duration: "16 min",
    calories: "230 kcal",
    level: "Intermediário",
    category: "programa",
    image: yogaHip,
    exercises: ["Clam", "Side kick front/back", "Hip circles", "Shoulder bridge single leg", "Stretch"],
  },
  {
    id: 206,
    slug: "pilates-relax",
    title: "Pilates Relaxante",
    description: "Controle de respiração e soltura para fechar o dia.",
    duration: "12 min",
    calories: "100 kcal",
    level: "Todos",
    category: "area",
    image: yogaEvening,
    exercises: ["Respiração 4-7-8", "Pelvic clock", "Knee sway", "Child's pose", "Relax"],
  },
];

export const getPilatesSessionBySlug = (slug: string) =>
  pilatesSessions.find((s) => s.slug === slug);
export const getAreaPilates = () => pilatesSessions.filter((s) => s.category === "area");
export const getProgramPilates = () => pilatesSessions.filter((s) => s.category === "programa");
export const filterPilatesByLevel = (list: PilatesSession[], level: string) =>
  level === "Todos" ? list : list.filter((s) => s.level === level);
