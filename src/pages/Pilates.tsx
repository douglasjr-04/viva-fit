import { useLocation, useNavigate } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { Play, Clock, Flame, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { useMemo, useState } from "react";
import { PilatesGroupId, getPilatesByGroup, getAreaPilates, getProgramPilates, pilatesSessions } from "@/data/pilates";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import { PilatesSearchDrawer } from "@/components/PilatesSearchDrawer";
import { getSessionText } from "@/data/sessions";

const tabs = [
  { id: "grupos", labelKey: "tabs.byGroup" },
  { id: "areas", labelKey: "tabs.byArea" },
  { id: "programas", labelKey: "tabs.programs" },
  { id: "favoritos", labelKey: "tabs.favorites" },
] as const;

const pilatesGroups: Array<{ id: PilatesGroupId; titleKey: string; descriptionKey: string }> = [
  { id: "respiracao_base", titleKey: "pilates.group.respiracao_base.title", descriptionKey: "pilates.group.respiracao_base.desc" },
  { id: "comece_o_dia", titleKey: "pilates.group.comece_o_dia.title", descriptionKey: "pilates.group.comece_o_dia.desc" },
  { id: "fortalecimento", titleKey: "pilates.group.fortalecimento.title", descriptionKey: "pilates.group.fortalecimento.desc" },
  { id: "core_abdomen", titleKey: "pilates.group.core_abdomen.title", descriptionKey: "pilates.group.core_abdomen.desc" },
  { id: "postura_dores", titleKey: "pilates.group.postura_dores.title", descriptionKey: "pilates.group.postura_dores.desc" },
  { id: "mobilidade_flexibilidade", titleKey: "pilates.group.mobilidade_flexibilidade.title", descriptionKey: "pilates.group.mobilidade_flexibilidade.desc" },
  { id: "em_pe", titleKey: "pilates.group.em_pe.title", descriptionKey: "pilates.group.em_pe.desc" },
  { id: "desafios_rapidos", titleKey: "pilates.group.desafios_rapidos.title", descriptionKey: "pilates.group.desafios_rapidos.desc" },
];

export default function Pilates() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, preferences, savedSessions } = useUser();
  const t = createT(preferences.language);
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("grupos");
  const [activeGroup, setActiveGroup] = useState<PilatesGroupId | null>(null);

  const areaList = getAreaPilates();
  const programList = getProgramPilates();
  const programSessionsPreview = programList.slice(0, 3);

  const favoriteSessions = useMemo(() => {
    return pilatesSessions.filter(s => savedSessions.includes(s.id));
  }, [savedSessions]);

  const displayedSessions = useMemo(() => {
    const list =
      activeTab === "grupos"
        ? activeGroup
          ? getPilatesByGroup(activeGroup)
          : []
        : activeTab === "areas"
          ? areaList
          : activeTab === "programas"
            ? programList
            : favoriteSessions;
    return list;
  }, [activeGroup, activeTab, areaList, favoriteSessions, programList]);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];
  const levelKeyFor = (level: string) =>
    level === "Iniciante"
      ? "level.beginner"
      : level === "Intermediário"
        ? "level.intermediate"
        : level === "Avançado"
          ? "level.advanced"
          : "level.all";

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

        <section className="mt-8 animate-fade-in animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t("pilates.recommended")}</h3>
            <button
              onClick={() => {
                setActiveTab("programas");
                goToAll();
              }}
              className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"
            >
              {t("common.seeAll")}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {programSessionsPreview.map((session) => {
              const sessionText = getSessionText(session, preferences.language);
              return (
                <div
                  key={session.id}
                  onClick={() =>
                    navigate(`/pilates/${session.slug}`, {
                      state: { from: `${location.pathname}${location.search}` },
                    })
                  }
                  className="bg-muted rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={session.image} alt={sessionText.title} className="w-full h-full object-cover" />
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
                  <h4 className="font-semibold text-foreground mt-1">{sessionText.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{sessionText.description}</p>
                </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="all-pilates" className="mt-10 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("nav.pilates")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("pilates.choose")}</p>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="flex gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== "grupos") setActiveGroup(null);
                }}
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

        {activeTab === "grupos" && (
          <section className="mt-6 animate-fade-in">
            {activeGroup ? (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{t("pilates.modules")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(pilatesGroups.find(g => g.id === activeGroup)?.titleKey || "pilates.modules")}
                  </p>
                </div>
                <button
                  onClick={() => setActiveGroup(null)}
                  className="bg-card text-muted-foreground border border-border rounded-full px-4 py-2 text-sm hover:border-primary/50 transition-colors"
                >
                  {t("common.back")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pilatesGroups.map((g) => {
                  const first = pilatesSessions.find(s => s.groupIds?.includes(g.id));
                  const count = pilatesSessions.filter(s => s.groupIds?.includes(g.id)).length;
                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        setActiveGroup(g.id);
                        window.requestAnimationFrame(() => {
                          const el = document.getElementById("all-pilates");
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        });
                      }}
                      className="relative overflow-hidden rounded-2xl border border-border/50 bg-card text-left min-h-[140px] hover:shadow-md transition-all duration-300"
                    >
                      {first ? (
                        <img
                          src={first.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 pointer-events-none"
                          draggable={false}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent pointer-events-none" />
                      <div className="relative z-10 p-5 flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary-foreground leading-tight">{t(g.titleKey)}</h3>
                          <p className="text-xs text-primary-foreground/80 mt-1 line-clamp-2">{t(g.descriptionKey)}</p>
                          <p className="text-xs text-primary-foreground/80 mt-2">
                            {t("home.count.sessions").replace("{count}", String(count))}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        <section className="mt-6 animate-fade-in animate-delay-200">
          {activeTab === "grupos" && !activeGroup ? null : displayedSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("list.empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedSessions.map((session) => {
                const sessionText = getSessionText(session, preferences.language);
                return (
                  <div
                    key={session.id}
                    onClick={() =>
                      navigate(`/pilates/${session.slug}`, {
                        state: { from: `${location.pathname}${location.search}` },
                      })
                    }
                    className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-36">
                      <img src={session.image} alt={sessionText.title} className="w-full h-full object-cover" />
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground">{sessionText.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sessionText.description}</p>
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
                        {t(levelKeyFor(session.level))}
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
      <PilatesSearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}
