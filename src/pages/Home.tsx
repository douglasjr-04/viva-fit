import { DesktopLayout } from "@/components/DesktopLayout";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import yogaWelcome from "@/assets/yoga-welcome.png";
import yogaHip from "@/assets/yoga-hip.png";
import yogaBlackOutfit from "@/assets/yoga-black-outfit.png";
import yogaTealCurly from "@/assets/yoga-teal-curly.png";
import yogaEvening from "@/assets/yoga-evening.png";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Dumbbell, Utensils, Sparkles, ArrowRight, ArrowLeft, Activity } from "lucide-react";
import { sessions } from "@/data/sessions";
import { workouts } from "@/data/workouts";
import { pilatesSessions } from "@/data/pilates";

function getActiveStreakDays(dateStrings: string[]) {
  const unique = Array.from(new Set(dateStrings)).filter(Boolean);
  if (unique.length === 0) return 0;
  const dates = unique
    .map((d) => new Date(`${d}T00:00:00`))
    .filter((d) => !Number.isNaN(d.getTime()))
    .sort((a, b) => b.getTime() - a.getTime());

  if (dates.length === 0) return 0;
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const mostRecent = dates[0];
  const daysFromToday = Math.round((todayStart.getTime() - mostRecent.getTime()) / 86400000);
  if (daysFromToday > 1) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = dates[i - 1];
    const cur = dates[i];
    const diffDays = Math.round((prev.getTime() - cur.getTime()) / 86400000);
    if (diffDays === 1) streak += 1;
    else if (diffDays > 1) break;
  }
  return streak;
}

function getWeekChart(languageLocale: string, dateStrings: string[]) {
  const countsByDate = new Map<string, number>();
  for (const date of dateStrings) {
    if (!date) continue;
    countsByDate.set(date, (countsByDate.get(date) || 0) + 1);
  }

  const toLocalDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diffToMonday);
  const formatter = new Intl.DateTimeFormat(languageLocale, { weekday: "short" });

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const dateKey = toLocalDateKey(d);
    const value = countsByDate.get(dateKey) || 0;
    return {
      label: formatter.format(d),
      value,
    };
  });

  const maxValue = Math.max(1, ...days.map((d) => d.value));
  return days.map((d) => ({
    ...d,
    percent: Math.round((d.value / maxValue) * 100),
  }));
}

export default function Home() {
  const navigate = useNavigate();
  const { profile, preferences, sessionHistory } = useUser();
  const t = createT(preferences.language);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];
  const yogaCount = sessions.length;
  const workoutsCount = workouts.length;
  const recipesCount = 4;
  const pilatesCount = pilatesSessions.length;
  const streakDays = getActiveStreakDays(sessionHistory.map((s) => s.date));
  const weekChart = getWeekChart(getLocale(preferences.language), sessionHistory.map((s) => s.date));

  return (
    <DesktopLayout>
      <div className="pb-24 overflow-x-hidden">
        {/* Logo no topo (mobile only) */}
        <div className="w-full flex justify-center mb-4 lg:hidden">
          <img 
            src={bendLogo} 
            alt="Viva Fit logo" 
            className="h-10 lg:h-12 object-contain"
          />
        </div>

        {/* Header */}
        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
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
          
          {/* Logo centralizado (desktop/tablet) */}
          <div className="hidden lg:flex items-center justify-center">
            <img 
              src={bendLogo} 
              alt="Viva Fit logo" 
              className="h-10 lg:h-12 object-contain"
            />
          </div>
        </header>

        <section className="mt-6 animate-slide-up">
          <div className="session-card min-h-[180px] flex items-center justify-between gap-6">
            <div className="space-y-3 max-w-[520px]">
              <div className="inline-flex items-center gap-2 bg-card/70 backdrop-blur-sm rounded-full px-3 py-1 border border-border/40 w-fit">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{t("home.todayBadge")}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {t("home.todayTitle")}
              </h2>
              <p className="text-sm text-foreground/80">
                {t("home.todaySubtitle")}
              </p>
            </div>
            <div className="hidden md:block relative w-[220px] h-[160px]">
              <div className="absolute -top-6 -right-8 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
              <img
                src={yogaWelcome}
                alt="Viva Fit"
                className="absolute right-0 bottom-0 h-[180px] object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </section>

        <section className="mt-4 animate-fade-in animate-delay-75">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left bg-card border border-border/50 rounded-2xl p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary/15 blur-2xl" />
            <div className="flex items-center justify-between gap-4 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("nav.progress")}</p>
                  <p className="text-lg font-semibold text-foreground">{t("dashboard.streak")}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground tabular-nums">{streakDays}</span>
                <span className="text-sm text-muted-foreground">{t("common.days")}</span>
              </div>
            </div>
            <div className="mt-4 bg-muted/30 rounded-2xl p-4 border border-border/50 relative">
              <div className="flex items-end justify-between gap-2">
                {weekChart.map((d, idx) => (
                  <div key={`${d.label}-${idx}`} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-full overflow-hidden" style={{ height: 100 }}>
                      <div
                        className="w-full bg-primary rounded-full transition-all duration-500"
                        style={{ height: `${d.percent}%`, marginTop: `${100 - d.percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between relative">
              <span className="text-sm text-muted-foreground">{t("home.progress.view")}</span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                {t("common.open")} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in animate-delay-100">
          <button
            onClick={() => navigate("/pilates")}
            className="group rounded-3xl p-5 bg-gradient-to-br from-accent/30 via-accent/15 to-background border border-border/50 hover:shadow-md transition-all text-left relative overflow-hidden"
          >
            <img
              src={yogaHip}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/70 to-background pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-accent/40 blur-2xl z-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/60 flex items-center justify-center mb-3">
                <Activity className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t("nav.pilates")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.card.pilatesDesc")}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("home.count.sessions").replace("{count}", String(pilatesCount))}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {t("common.open")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/sessions")}
            className="group rounded-3xl p-5 bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-border/50 hover:shadow-md transition-all text-left relative overflow-hidden"
          >
            <img
              src={yogaBlackOutfit}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/75 to-background pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/20 blur-2xl z-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-3">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t("nav.yoga")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.card.yogaDesc")}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("home.count.sessions").replace("{count}", String(yogaCount))}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {t("common.open")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/treinos")}
            className="group rounded-3xl p-5 bg-gradient-to-br from-secondary/60 via-secondary/25 to-background border border-border/50 hover:shadow-md transition-all text-left relative overflow-hidden"
          >
            <img
              src={yogaTealCurly}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/75 to-background pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-secondary/50 blur-2xl z-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-secondary/70 flex items-center justify-center mb-3">
                <Dumbbell className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t("nav.workouts")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.card.workoutsDesc")}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("home.count.workouts").replace("{count}", String(workoutsCount))}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {t("common.open")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/receitas")}
            className="group rounded-3xl p-5 bg-gradient-to-br from-accent/45 via-accent/15 to-background border border-border/50 hover:shadow-md transition-all text-left relative overflow-hidden"
          >
            <img
              src={yogaEvening}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/75 to-background pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-accent/50 blur-2xl z-0 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/70 flex items-center justify-center mb-3">
                <Utensils className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t("nav.recipes")}</h3>
              <p className="text-sm text-muted-foreground">{t("home.card.recipesDesc")}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{t("home.count.categories").replace("{count}", String(recipesCount))}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  {t("common.open")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </button>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-200">
          <div className="bg-card border border-border/50 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t("common.tipTitle")}</p>
              <p className="text-base font-semibold text-foreground">
                {t("home.tipText")}
              </p>
            </div>
            <button
              onClick={() => navigate("/sessions")}
              className="shrink-0 bg-foreground text-primary-foreground rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t("home.goYoga")}
            </button>
          </div>
        </section>
      </div>
    </DesktopLayout>
  );
}
