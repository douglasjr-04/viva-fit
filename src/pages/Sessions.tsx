import { useLocation, useNavigate } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { Play, Clock, Flame, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { getSessionBySlug, getSessionText, sessions, getAreaSessions } from "@/data/sessions";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { SearchDrawer } from "@/components/SearchDrawer";
import bendLogo from "@/assets/bend-logo.png";

const bgColors = ["bg-secondary", "bg-muted", "bg-secondary", "bg-muted"];

export default function Sessions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, preferences } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);

  const areaSessions = getAreaSessions();
  
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];
  const matinal = getSessionBySlug("matinal") || sessions[0];
  const lombar = getSessionBySlug("lombar") || sessions[1];
  const wakeUp = getSessionBySlug("wake-up") || sessions[0];
  const lowerBack = getSessionBySlug("lower-back") || sessions[1];
  const matinalText = getSessionText(matinal, preferences.language);
  const lombarText = getSessionText(lombar, preferences.language);

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

  const yogaModules = useMemo(() => {
    const byPrefix = (prefix: string) => areaSessions.filter((s) => s.slug === prefix || s.slug.startsWith(`${prefix}-`));
    return [
      { id: "alongamento", sessions: byPrefix("alongamento") },
      { id: "matinal", sessions: byPrefix("matinal") },
      { id: "relaxamento", sessions: byPrefix("relaxamento") },
      { id: "lombar", sessions: byPrefix("lombar") },
      { id: "desafio", sessions: byPrefix("desafio") },
    ] as const;
  }, [areaSessions]);

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

        <section id="all-sessions" className="mt-6 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("nav.yoga")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("yoga.choose")}</p>
        </section>

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
                    <h2 className="text-3xl font-bold text-foreground">{matinalText.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-foreground/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {matinal.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-primary" />
                        {matinal.calories}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/session/matinal", {
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
                      alt={matinalText.title}
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
                    <h2 className="text-3xl font-bold text-foreground">{lombarText.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-foreground/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        {lombar.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-primary" />
                        {lombar.calories}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/session/lombar", {
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
                      alt={lombarText.title}
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
            <h3 className="text-lg font-semibold text-foreground">{t("common.modules")}</h3>
            <button
              onClick={() => {
                goToAllSessions();
              }}
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
            >
              {t("common.seeAll")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yogaModules.map((m, idx) => {
              const base = getSessionBySlug(m.id);
              const baseText = base ? getSessionText(base, preferences.language) : null;
              return (
                <button
                  key={m.id}
                  onClick={() =>
                    navigate(`/sessions/modulo/${encodeURIComponent(m.id)}`, {
                      state: { from: `${location.pathname}${location.search}` },
                    })
                  }
                  className={`relative overflow-hidden rounded-2xl border border-border/50 text-left min-h-[140px] hover:shadow-md transition-all duration-300 ${bgColors[idx % 4]}`}
                >
                  {base ? (
                    <img
                      src={base.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 pointer-events-none"
                      draggable={false}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent pointer-events-none" />
                  <div className="relative z-10 p-5 flex items-end justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-primary-foreground leading-tight">{baseText?.title ?? m.id}</h4>
                      <p className="text-xs text-primary-foreground/80 mt-1 line-clamp-2">
                        {t("home.count.sessions").replace("{count}", String(m.sessions.length))}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}
