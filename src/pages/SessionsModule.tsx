import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { getAreaSessions, getSessionBySlug, getSessionText } from "@/data/sessions";
import bendLogo from "@/assets/bend-logo.png";
import { ArrowLeft, Search } from "lucide-react";
import { VideoCard } from "@/components/VideoCard";
import { SearchDrawer } from "@/components/SearchDrawer";

export default function SessionsModule() {
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

  const prefix = (moduleId || "").trim();
  const base = getSessionBySlug(prefix);
  const baseText = base ? getSessionText(base, preferences.language) : null;

  const moduleSessions = useMemo(() => {
    const list = getAreaSessions();
    return list.filter((s) => s.slug === prefix || s.slug.startsWith(`${prefix}-`));
  }, [prefix]);

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
              onClick={() => (from ? navigate(from) : navigate("/sessions"))}
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

        <section className="mt-6 animate-fade-in">
          <div className="bg-card border border-border/50 rounded-3xl p-5">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{baseText?.title ?? prefix}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("home.count.sessions").replace("{count}", String(moduleSessions.length))}
            </p>
          </div>
        </section>

        <section className="mt-6 animate-fade-in animate-delay-100">
          {moduleSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("list.empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {moduleSessions.map((session) => (
                <VideoCard
                  key={session.id}
                  image={session.image}
                  title={getSessionText(session, preferences.language).title}
                  duration={session.duration}
                  calories={session.calories}
                  bgColor="bg-secondary"
                  size="lg"
                  onClick={() =>
                    navigate(`/session/${session.slug}`, {
                      state: { from: `${location.pathname}${location.search}` },
                    })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </DesktopLayout>
  );
}

