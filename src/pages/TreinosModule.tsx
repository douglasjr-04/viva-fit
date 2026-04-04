import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { SearchDrawer } from "@/components/SearchDrawer";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { workouts, WorkoutModuleId, WorkoutTopicId } from "@/data/workouts";
import bendLogo from "@/assets/bend-logo.png";
import { Search, ArrowLeft } from "lucide-react";
import yogaHip from "@/assets/yoga-hip.png";
import yogaBlackOutfit from "@/assets/yoga-black-outfit.png";
import yogaTealCurly from "@/assets/yoga-teal-curly.png";
import yogaBalance from "@/assets/yoga-balance.png";
import yogaShoulder from "@/assets/yoga-shoulder.png";
import yogaMorning from "@/assets/yoga-morning.png";
import yogaEvening from "@/assets/yoga-evening.png";

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

export default function TreinosModule() {
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleId } = useParams();
  const { profile, preferences } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];

  const module = modules.find(m => m.id === (moduleId as WorkoutModuleId));

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

  const genericSubmodules = useMemo(() => {
    const safeModuleId = moduleId as WorkoutModuleId;
    const topicIds = module?.items || [];
    return topicIds.map((topicId) => {
      const first = workouts.find((w) => w.moduleId === safeModuleId && w.topics.includes(topicId));
      return {
        topicId,
        titleKey: `topic.${topicId}`,
        image: first?.image || yogaBalance,
      };
    });
  }, [module?.items, moduleId]);

  const submodulesToRender =
    moduleId === "casa"
      ? casaSubmodules
      : moduleId === "academia"
        ? academiaSubmodules
        : moduleId === "mobilidade"
          ? mobilidadeSubmodules
          : genericSubmodules;

  return (
    <DesktopLayout>
      <div className="pb-24 overflow-x-hidden">
        <div className="w-full flex justify-center mb-4 lg:hidden">
          <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
        </div>

        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/treinos")}
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
          <div className={`session-card ${module?.gradient || "bg-card"} min-h-[220px]`}>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full w-fit">
                  {t("common.module")}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  {module?.titleKey ? t(module.titleKey) : t("common.module")}
                </h1>
              </div>

              <div className="pt-4">
                <p className="text-sm text-foreground/70">
                  {t("workouts.choose")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submodulesToRender.map((m) => (
              <button
                key={m.topicId}
                onClick={() =>
                  navigate(
                    `/treinos/modulo/${encodeURIComponent(moduleId || "")}/topico/${encodeURIComponent(m.topicId)}`,
                    { state: { from: `${location.pathname}${location.search}` } }
                  )
                }
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-card text-left min-h-[140px] hover:shadow-md transition-all duration-300"
              >
                <img
                  src={m.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent pointer-events-none" />
                <div className="relative z-10 p-5 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground leading-tight">{t(m.titleKey)}</h3>
                    <p className="text-xs text-primary-foreground/80 mt-1">
                      {t("home.count.workouts").replace(
                        "{count}",
                        String(workouts.filter((w) => w.moduleId === (moduleId as WorkoutModuleId) && w.topics.includes(m.topicId)).length)
                      )}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}
