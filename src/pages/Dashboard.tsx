import { DesktopLayout } from "@/components/DesktopLayout";
import { Flame, Clock, Calendar, Activity, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { getSessionText, sessions } from "@/data/sessions";
import { getWorkoutText, workouts } from "@/data/workouts";
import { pilatesSessions } from "@/data/pilates";

export default function Dashboard() {
  const { preferences, sessionHistory } = useUser();
  const [activeTab, setActiveTab] = useState<"status" | "history">("status");
  const progressPercent = 70;
  const navigate = useNavigate();
  const t = createT(preferences.language);

  // Calcular estatísticas reais
  const stats = useMemo(() => {
    const totalSessions = sessionHistory.length;

    const totalActiveSeconds = sessionHistory.reduce((acc, session) => {
      if (typeof session.activeSeconds === "number") return acc + Math.max(0, session.activeSeconds);
      const minutes = parseInt(session.duration.replace(/\D/g, "")) || 0;
      return acc + minutes * 60;
    }, 0);

    const totalCalories = sessionHistory.reduce((acc, session) => {
      const calories = parseInt(session.calories.replace(/\D/g, '')) || 0;
      return acc + calories;
    }, 0);

    return { totalSessions, totalMinutes: Math.round(totalActiveSeconds / 60), totalCalories };
  }, [sessionHistory]);

  // Calcular posição da bolinha do indicador dinamicamente
  const indicatorPosition = useMemo(() => {
    // O arco vai de 180° a 0° (da esquerda para direita)
    const angle = 180 - (progressPercent / 100) * 180;
    const angleRad = (angle * Math.PI) / 180;
    const centerX = 60;
    const centerY = 70;
    const radius = 50;
    
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY - radius * Math.sin(angleRad)
    };
  }, [progressPercent]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(getLocale(preferences.language), { day: '2-digit', month: 'short' });
  };

  const getHistoryTitle = (entry: { sessionId: number; sessionTitle: string; activityType?: string }) => {
    if (entry.activityType === "workout") {
      const workout = workouts.find(w => w.id === entry.sessionId);
      return workout ? getWorkoutText(workout, preferences.language).title : entry.sessionTitle;
    }
    if (entry.activityType === "pilates") {
      const pilates = pilatesSessions.find(s => s.id === entry.sessionId);
      return pilates ? getSessionText(pilates, preferences.language).title : entry.sessionTitle;
    }
    const yoga = sessions.find(s => s.id === entry.sessionId);
    if (yoga) return getSessionText(yoga, preferences.language).title;
    const workout = workouts.find(w => w.id === entry.sessionId);
    if (workout) return getWorkoutText(workout, preferences.language).title;
    return entry.sessionTitle;
  };

  const weekDays = useMemo(() => {
    const locale = getLocale(preferences.language);
    const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const today = new Date();
    const diffToMonday = (today.getDay() + 6) % 7;
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diffToMonday);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      return formatter.format(d);
    });
  }, [preferences.language]);

  const weekActivity = useMemo(() => {
    const toDateKey = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const today = new Date();
    const diffToMonday = (today.getDay() + 6) % 7;
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diffToMonday);
    const weekKeys = Array.from({ length: 7 }, (_, i) =>
      toDateKey(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
    );

    const secondsByDate = new Map<string, number>();
    for (const k of weekKeys) secondsByDate.set(k, 0);

    for (const entry of sessionHistory) {
      if (!secondsByDate.has(entry.date)) continue;
      const sec =
        typeof entry.activeSeconds === "number"
          ? Math.max(0, entry.activeSeconds)
          : (parseInt(entry.duration.replace(/\D/g, "")) || 0) * 60;
      secondsByDate.set(entry.date, (secondsByDate.get(entry.date) || 0) + sec);
    }

    const secondsArr = weekKeys.map((k) => secondsByDate.get(k) || 0);
    const maxSec = Math.max(1, ...secondsArr);
    const streakData = secondsArr.map((s) => s / maxSec);
    const totalWeekMinutes = Math.round(secondsArr.reduce((a, b) => a + b, 0) / 60);

    return { streakData, totalWeekMinutes };
  }, [sessionHistory]);

  return (
    <DesktopLayout>
      <div className="pb-24 lg:pb-8">
        {/* Header */}
        <header className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
        </header>

        {/* Tabs */}
        <section className="mt-6 animate-fade-in">
          <div className="bg-card rounded-full p-1 flex border border-border max-w-xs mx-auto lg:mx-0">
            <button
              onClick={() => setActiveTab("status")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "status"
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t("dashboard.status")}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "history"
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t("dashboard.history")}
            </button>
          </div>
        </section>

        {activeTab === "status" ? (
          /* Status Tab Content */
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            {/* Left Column - Gauge and Streak */}
            <div>
              {/* Progress Gauge */}
              <section className="flex justify-center animate-slide-up">
                <div className="relative w-56 h-40">
                  <svg className="w-full h-full" viewBox="0 0 120 90">
                    {/* Background arc */}
                    <path
                      d="M 10 70 A 50 50 0 0 1 110 70"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* Progress arc */}
                    <path
                      d="M 10 70 A 50 50 0 0 1 110 70"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${progressPercent * 1.57} 157`}
                      className="transition-all duration-1000"
                    />
                    {/* Indicator circle - positioned dynamically */}
                    <circle
                      cx={indicatorPosition.x}
                      cy={indicatorPosition.y}
                      r="6"
                      fill="hsl(var(--card))"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                    <span className="text-4xl font-bold text-foreground">{progressPercent}%</span>
                    <span className="text-sm text-muted-foreground mt-1">{t("dashboard.weekGoal")}</span>
                  </div>
                </div>
              </section>

              {/* Active Streak */}
              <section className="mt-8 animate-fade-in animate-delay-200">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.streak")}</h3>
                
                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <div className="flex items-end justify-between gap-2">
                    {weekDays.map((day, index) => (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-primary/20 rounded-full overflow-hidden"
                          style={{ height: '100px' }}
                        >
                          <div 
                            className="w-full bg-primary rounded-full transition-all duration-500"
                            style={{ 
                              height: `${Math.max(weekActivity.streakData[index] * 100, 5)}%`,
                              marginTop: `${(1 - Math.max(weekActivity.streakData[index], 0.05)) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Stats */}
            <div>
              <section className="animate-fade-in animate-delay-100">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.myStats")}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sessions Card */}
                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">{t("dashboard.activities")}</span>
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {stats.totalSessions}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Time Card */}
                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">{t("dashboard.totalTime")}</span>
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {stats.totalMinutes} <span className="text-sm font-normal text-muted-foreground">{t("dashboard.minutes")}</span>
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Calories Card */}
                  <div className="stats-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">{t("dashboard.calories")}</span>
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {stats.totalCalories} <span className="text-sm font-normal text-muted-foreground">{t("dashboard.kcal")}</span>
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* History Tab Content */
          <div className="mt-8 animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t("dashboard.recentActivity")}</h3>
            
            {sessionHistory.length === 0 ? (
              <div className="bg-card rounded-2xl p-8 text-center border border-border/50">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">{t("dashboard.emptyHistoryTitle")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("dashboard.emptyHistorySubtitle")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessionHistory.map((session) => (
                  <div 
                    key={session.id}
                    className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{getHistoryTitle(session)}</h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>{formatDate(session.date)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.max(
                            1,
                            Math.round(
                              (typeof session.activeSeconds === "number"
                                ? session.activeSeconds
                                : (parseInt(session.duration.replace(/\D/g, "")) || 0) * 60) / 60
                            )
                          )}{" "}
                          {t("dashboard.minutes")}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {session.calories}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}
