import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { SearchDrawer } from "@/components/SearchDrawer";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { getWorkoutText, workouts, WorkoutModuleId, WorkoutTopicId, filterWorkoutsByLevel } from "@/data/workouts";
import bendLogo from "@/assets/bend-logo.png";
import { Play, Clock, Flame, Search, ArrowLeft } from "lucide-react";
import yogaHip from "@/assets/yoga-hip.png";
import yogaBlackOutfit from "@/assets/yoga-black-outfit.png";
import yogaTealCurly from "@/assets/yoga-teal-curly.png";
import yogaBalance from "@/assets/yoga-balance.png";
import yogaShoulder from "@/assets/yoga-shoulder.png";
import yogaMorning from "@/assets/yoga-morning.png";
import yogaEvening from "@/assets/yoga-evening.png";

const levelFilters = ["level.all", "level.beginner", "level.intermediate", "level.advanced"] as const;
const levelValues = ["Todos", "Iniciante", "Intermediário", "Avançado"] as const;

const modules = [
  {
    id: "casa" as WorkoutModuleId,
    titleKey: "module.casa.title",
    items: ["hypertrophy", "weight_loss", "glutes", "challenges"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-primary/25 via-secondary/25 to-background",
  },
  {
    id: "academia" as WorkoutModuleId,
    titleKey: "module.academia.title",
    items: ["hypertrophy", "strength_gain", "weight_loss"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-secondary/70 via-secondary/30 to-background",
  },
  {
    id: "corpo-firme" as WorkoutModuleId,
    titleKey: "module.corpo-firme.title",
    items: ["dumbbells", "full_body"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-accent/50 via-accent/20 to-background",
  },
  {
    id: "mobilidade" as WorkoutModuleId,
    titleKey: "module.mobilidade.title",
    items: ["flexibility", "recovery", "prevention"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-muted via-primary/10 to-background",
  },
  {
    id: "core" as WorkoutModuleId,
    titleKey: "module.core.title",
    items: ["strength", "stability", "definition"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-primary/20 via-background to-secondary/20",
  },
  {
    id: "funcional" as WorkoutModuleId,
    titleKey: "module.funcional.title",
    items: ["strength", "conditioning", "explosion"] as WorkoutTopicId[],
    gradient: "bg-gradient-to-br from-secondary/40 via-background to-accent/25",
  },
] as const;

const casaSubmodules: Array<{ topicId: WorkoutTopicId; titleKey: string; image: string }> = [
  { topicId: "glutes", titleKey: "casa.banner.glutes", image: yogaHip },
  { topicId: "challenges", titleKey: "casa.banner.challenges", image: yogaBlackOutfit },
  { topicId: "hypertrophy", titleKey: "casa.banner.hypertrophy", image: yogaTealCurly },
  { topicId: "weight_loss", titleKey: "casa.banner.weight_loss", image: yogaBalance },
];
const academiaSubmodules: Array<{ topicId: WorkoutTopicId; titleKey: string; image: string }> = [
  { topicId: "glutes", titleKey: "academia.banner.glutes_posterior", image: yogaHip },
  { topicId: "strength_gain", titleKey: "academia.banner.arms", image: yogaShoulder },
  { topicId: "hypertrophy", titleKey: "academia.banner.hypertrophy", image: yogaTealCurly },
  { topicId: "weight_loss", titleKey: "academia.banner.weight_loss", image: yogaBalance },
];
const mobilidadeSubmodules: Array<{ topicId: WorkoutTopicId; titleKey: string; image: string }> = [
  { topicId: "flexibility", titleKey: "mobilidade.banner.mob1", image: yogaMorning },
  { topicId: "recovery", titleKey: "mobilidade.banner.mob2", image: yogaEvening },
];

function getTopicTitleKey(moduleId: WorkoutModuleId, topicId: WorkoutTopicId) {
  const found =
    (moduleId === "casa" ? casaSubmodules : moduleId === "academia" ? academiaSubmodules : moduleId === "mobilidade" ? mobilidadeSubmodules : [])
      .find((m) => m.topicId === topicId)?.titleKey;
  return found || `topic.${topicId}`;
}

export default function TreinosTopic() {
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleId, topicId } = useParams();
  const { profile, preferences } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];

  const safeModuleId = (moduleId || "") as WorkoutModuleId;
  const safeTopicId = (topicId || "") as WorkoutTopicId;
  const module = modules.find((m) => m.id === safeModuleId);
  const topicTitleKey = module ? getTopicTitleKey(module.id, safeTopicId) : `topic.${safeTopicId}`;

  const moduleWorkouts = useMemo(() => {
    if (!module) return [];
    const base = workouts.filter((w) => w.moduleId === module.id);
    const byTopic = base.filter((w) => w.topics.includes(safeTopicId));
    return filterWorkoutsByLevel(byTopic, activeFilter);
  }, [activeFilter, module, safeTopicId]);

  const from = (location.state as { from?: string } | null)?.from;

  return (
    <DesktopLayout>
      <div className="pb-24 overflow-x-hidden">
        <div className="w-full flex justify-center mb-4 lg:hidden">
          <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
        </div>

        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (from ? navigate(from) : navigate(`/treinos/modulo/${encodeURIComponent(safeModuleId)}`))}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="lg:hidden">
              <AvatarWithUpload size="sm" showEditButton={false} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-semibold text-foreground">
                {t("common.hello")}
                {firstName ? `, ${firstName}` : ""}
              </p>
              <p className="text-sm text-muted-foreground capitalize">{formattedDate}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>
        </header>

        <section className="mt-6 animate-slide-up">
          <div className={`session-card ${module?.gradient || "bg-card"} min-h-[200px]`}>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full w-fit">
                  {t("common.module")}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  {module?.titleKey ? t(module.titleKey) : t("common.module")}
                </h1>
                <p className="text-sm text-foreground/70">{t(topicTitleKey)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="flex justify-center gap-1.5 sm:gap-2 lg:gap-2">
            {levelFilters.map((filterKey, idx) => (
              <button
                key={filterKey}
                onClick={() => setActiveFilter(levelValues[idx])}
                className={`px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeFilter === levelValues[idx]
                    ? "bg-foreground text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                }`}
              >
                {t(filterKey)}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 animate-fade-in animate-delay-100">
          {moduleWorkouts.length === 0 ? (
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground">{t("common.comingSoonTitle")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("common.comingSoonText")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moduleWorkouts.map((w) => {
                const workoutText = getWorkoutText(w, preferences.language);
                return (
                  <div
                    key={w.id}
                    onClick={() =>
                      navigate(`/treino/${w.slug}`, {
                        state: { from: `${location.pathname}${location.search}` },
                      })
                    }
                    className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-36">
                      <img src={w.image} alt={workoutText.title} className="w-full h-full object-cover" />
                      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-foreground">{workoutText.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{workoutText.description}</p>

                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {w.duration}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {w.calories}
                        </span>
                        <span>•</span>
                        <span className="bg-secondary px-2 py-0.5 rounded-full">
                          {t(
                            w.level === "Iniciante"
                              ? "level.beginner"
                              : w.level === "Intermediário"
                                ? "level.intermediate"
                                : w.level === "Avançado"
                                  ? "level.advanced"
                                  : "level.all"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}

