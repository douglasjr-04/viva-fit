import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { Play, Clock, Heart, Flame, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { getSessionBySlug, getSessionText, sessions, getAreaSessions, getProgramSessions, filterSessionsByLevel } from "@/data/sessions";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { SearchDrawer } from "@/components/SearchDrawer";
import { VideoCard } from "@/components/VideoCard";
import bendLogo from "@/assets/bend-logo.png";

const levelFilters = ["level.all", "level.beginner", "level.intermediate", "level.advanced"] as const;
const levelValues = ["Todos", "Iniciante", "Intermediário", "Avançado"] as const;
const tabs = [
  { id: "areas", labelKey: "tabs.byArea" },
  { id: "programas", labelKey: "tabs.programs" },
  { id: "favoritos", labelKey: "tabs.favorites" },
];
const bgColors = ["bg-secondary", "bg-muted", "bg-secondary", "bg-muted"];

export default function Sessions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { profile, preferences, savedSessions, toggleSavedSession } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const initialTab = searchParams.get("tab") || "areas";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const areaSessions = getAreaSessions();
  const programSessions = getProgramSessions();
  const areaSessionsPreview = areaSessions.slice(0, 4);
  const programSessionsPreview = programSessions.slice(0, 3);
  
  const favoriteSessions = useMemo(() => {
    return sessions.filter(s => savedSessions.includes(s.id));
  }, [savedSessions]);

  useEffect(() => {
    const tab = searchParams.get("tab") || "areas";
    setActiveTab(tab);
  }, [searchParams]);

  const displayedSessions = useMemo(() => {
    const list = activeTab === "areas" 
      ? areaSessions 
      : activeTab === "programas" 
        ? programSessions 
        : favoriteSessions;
    
    return filterSessionsByLevel(list, activeFilter);
  }, [activeTab, activeFilter, areaSessions, programSessions, favoriteSessions]);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];
  const wakeUp = getSessionBySlug("wake-up") || sessions[0];
  const lowerBack = getSessionBySlug("lower-back") || sessions[1];
  const wakeUpText = getSessionText(wakeUp, preferences.language);
  const lowerBackText = getSessionText(lowerBack, preferences.language);

  const wakeUpDesktop = { height: 380, right: -103, bottom: -291 };
  const lowerBackDesktop = { height: 360, right: -100, bottom: -280 };
  const wakeUpMobile = { height: 380, right: -92, bottom: -346 };
  const lowerBackMobile = { height: 360, right: -79, bottom: -304 };

  const wakeUpScaleDesktop = 2.36;
  const wakeUpScaleMobile = 2.36;
  const lowerBackScaleDesktop = 2.15;
  const lowerBackScaleMobile = 2.16;

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goToAllSessions = () => {
    window.requestAnimationFrame(() => {
      const el = document.getElementById("all-sessions");
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
              onClick={() => navigate("/home")}
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

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <section className="animate-slide-up">
            <div className="session-card h-[280px] lg:h-[320px] relative overflow-hidden rounded-3xl">
              <svg className="absolute top-0 right-0 w-40 h-40 opacity-20" viewBox="0 0 100 100">
                <circle cx="80" cy="20" r="50" fill="hsl(var(--primary))" />
              </svg>

              <div className="relative z-10 h-full flex">
                <div className="flex-1 flex flex-col justify-between py-2 pr-4">
                  <span className="inline-block bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full w-fit">
                    {t("yoga.badge.day01")}
                  </span>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">{wakeUpText.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-foreground/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {wakeUp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-primary" />
                        {wakeUp.calories}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/session/wake-up", {
                          state: { from: `${location.pathname}${location.search}` },
                        })
                      }
                      className="play-btn mt-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      {t("common.play")}
                    </button>
                  </div>
                </div>

                <div className="relative flex-1">
                    <img
                      src={wakeUp.image}
                      alt={wakeUpText.title}
                    className="absolute object-contain z-20"
                    style={{
                      height: `${(isMobile ? wakeUpMobile.height : wakeUpDesktop.height)}px`,
                      right: `${(isMobile ? wakeUpMobile.right : wakeUpDesktop.right)}px`,
                      bottom: `${(isMobile ? wakeUpMobile.bottom : wakeUpDesktop.bottom)}px`,
                      transform: `translateY(-20px) scale(${isMobile ? wakeUpScaleMobile : wakeUpScaleDesktop})`,
                      transformOrigin: "bottom right",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-card/30 rounded-b-3xl overflow-hidden">
                <div className="h-full bg-primary/80 w-1/4 rounded-r-full" />
              </div>
            </div>
          </section>

          <section className="animate-slide-up animate-delay-100">
            <div className="h-[280px] lg:h-[320px] relative overflow-hidden rounded-3xl bg-secondary p-5">
              <div className="relative z-10 h-full flex">
                <div className="flex-1 flex flex-col justify-between py-2 pr-4">
                  <span className="inline-block bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full w-fit">
                    {t("common.popular")}
                  </span>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground">{lowerBackText.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-foreground/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {lowerBack.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-primary" />
                        {lowerBack.calories}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/session/lower-back", {
                          state: { from: `${location.pathname}${location.search}` },
                        })
                      }
                      className="bg-foreground text-primary-foreground rounded-full flex items-center gap-2 px-4 py-2 font-medium text-sm mt-3 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      {t("common.play")}
                    </button>
                  </div>
                </div>

                <div className="relative flex-1">
                    <img
                      src={lowerBack.image}
                      alt={lowerBackText.title}
                    className="absolute object-contain z-20"
                    style={{
                      height: `${(isMobile ? lowerBackMobile.height : lowerBackDesktop.height)}px`,
                      right: `${(isMobile ? lowerBackMobile.right : lowerBackDesktop.right)}px`,
                      bottom: `${(isMobile ? lowerBackMobile.bottom : lowerBackDesktop.bottom)}px`,
                      transform: `translateY(-10px) scale(${isMobile ? lowerBackScaleMobile : lowerBackScaleDesktop})`,
                      transformOrigin: "bottom right",
                    }}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-card/30 rounded-b-3xl overflow-hidden">
                <div className="h-full bg-primary/80 w-2/5 rounded-r-full" />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 animate-fade-in animate-delay-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t("yoga.explore")}</h3>
            <button
              onClick={() => {
                setActiveTab("areas");
                setActiveFilter("Todos");
                goToAllSessions();
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
                title={getSessionText(session, preferences.language).title}
                duration={session.duration}
                calories={session.calories}
                bgColor={bgColors[index % 4]}
                size="lg"
                onClick={() =>
                  navigate(`/session/${session.slug}`, {
                    state: { from: `${location.pathname}${location.search}` },
                  })
                }
              />
            ))}
          </div>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t("yoga.recommended")}</h3>
            <button
              onClick={() => {
                setActiveTab("programas");
                setActiveFilter("Todos");
                goToAllSessions();
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
                onClick={() =>
                  navigate(`/session/${session.slug}`, {
                    state: { from: `${location.pathname}${location.search}` },
                  })
                }
                className="bg-muted rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={session.image} alt={getSessionText(session, preferences.language).title} className="w-full h-full object-cover" />
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
                  <h4 className="font-semibold text-foreground mt-1">{getSessionText(session, preferences.language).title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{getSessionText(session, preferences.language).description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="all-sessions" className="mt-10 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("nav.yoga")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("yoga.choose")}</p>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(tab.labelKey)}
                {tab.id === "favoritos" && savedSessions.length > 0 && (
                  <span className="ml-1.5 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    {savedSessions.length}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Filters */}
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

        {/* Sessions Grid */}
        <section className="mt-6 animate-fade-in animate-delay-200">
          {displayedSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {activeTab === "favoritos" 
                  ? t("favorites.yogaEmpty")
                  : t("list.empty")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSessions.map((session) => (
                <div 
                  key={session.id}
                onClick={() =>
                  navigate(`/session/${session.slug}`, {
                    state: { from: `${location.pathname}${location.search}` },
                  })
                }
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-36">
                    <img 
                      src={session.image} 
                      alt={getSessionText(session, preferences.language).title}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedSession(session.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${
                          savedSessions.includes(session.id) 
                            ? "fill-primary text-primary" 
                            : "text-foreground"
                        }`}
                      />
                    </button>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{getSessionText(session, preferences.language).title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{getSessionText(session, preferences.language).description}</p>
                    
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
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}
