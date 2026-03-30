import { useNavigate } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { Play, Clock, Flame, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { useMemo, useState } from "react";
import { pilatesSessions, getAreaPilates, getProgramPilates, filterPilatesByLevel } from "@/data/pilates";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import { PilatesSearchDrawer } from "@/components/PilatesSearchDrawer";
import { VideoCard } from "@/components/VideoCard";

const levelFilters = ["level.all", "level.beginner", "level.intermediate", "level.advanced"] as const;
const levelValues = ["Todos", "Iniciante", "Intermediário", "Avançado"] as const;
const tabs = [
  { id: "areas", labelKey: "tabs.byArea" },
  { id: "programas", labelKey: "tabs.programs" },
  { id: "favoritos", labelKey: "tabs.favorites" },
] as const;
const bgColors = ["bg-secondary", "bg-muted", "bg-secondary", "bg-muted"];

export default function Pilates() {
  const navigate = useNavigate();
  const { profile, preferences, savedSessions } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("areas");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const areaList = getAreaPilates();
  const programList = getProgramPilates();
  const areaSessionsPreview = areaList.slice(0, 4);
  const programSessionsPreview = programList.slice(0, 3);

  const favoriteSessions = useMemo(() => {
    return pilatesSessions.filter(s => savedSessions.includes(s.id));
  }, [savedSessions]);

  const displayedSessions = useMemo(() => {
    const list = activeTab === "areas" ? areaList : activeTab === "programas" ? programList : favoriteSessions;
    return filterPilatesByLevel(list, activeFilter);
  }, [activeTab, activeFilter, areaList, favoriteSessions, programList]);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = profile.name?.split(" ")[0] || "Oi";

  const goToAll = () => {
    window.requestAnimationFrame(() => {
      const el = document.getElementById("all-pilates");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <DesktopLayout>
      <div className="pb-24 overflow-x-hidden">
        <div className="w-full flex justify-center mb-4 lg:hidden">
          <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
        </div>

        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="lg:hidden">
              <AvatarWithUpload size="sm" showEditButton={false} />
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-semibold text-foreground">{t("common.hello")}, {firstName}</p>
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

        <section className="mt-8 animate-fade-in animate-delay-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t("pilates.explore")}</h3>
            <button
              onClick={() => {
                setActiveTab("areas");
                setActiveFilter("Todos");
                goToAll();
              }}
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
            >
              {t("common.seeAll")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areaSessionsPreview.map((session, index) => (
              <VideoCard
                key={session.id}
                image={session.image}
                title={session.title}
                duration={session.duration}
                calories={session.calories}
                bgColor={bgColors[index % 4]}
                size="lg"
                onClick={() => navigate(`/pilates/${session.slug}`)}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t("pilates.recommended")}</h3>
            <button
              onClick={() => {
                setActiveTab("programas");
                setActiveFilter("Todos");
                goToAll();
              }}
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
            >
              {t("common.seeAll")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {programSessionsPreview.map((session) => (
              <div
                key={session.id}
                onClick={() => navigate(`/pilates/${session.slug}`)}
                className="bg-muted rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-card/30">
                    <div className="h-full bg-primary w-0 rounded-r-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{session.duration}</span>
                    <span>•</span>
                    <Flame className="w-3 h-3" />
                    <span>{session.calories}</span>
                  </div>
                  <h4 className="font-semibold text-foreground mt-1">{session.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{session.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="all-pilates" className="mt-10 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Pilates</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("pilates.choose")}</p>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(tab.labelKey)}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 animate-fade-in animate-delay-100">
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

        <section className="mt-6 animate-fade-in animate-delay-200">
          {displayedSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("list.empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => navigate(`/pilates/${session.slug}`)}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-36">
                    <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{session.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{session.description}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {session.calories}
                      </span>
                      <span>•</span>
                      <span className="bg-secondary px-2 py-0.5 rounded-full">
                        {t(
                          session.level === "Iniciante"
                            ? "level.beginner"
                            : session.level === "Intermediário"
                              ? "level.intermediate"
                              : session.level === "Avançado"
                                ? "level.advanced"
                                : "level.all"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <PilatesSearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}
