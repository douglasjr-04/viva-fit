import { ReactNode } from "react";
import { Home, HeartPulse, Dumbbell, Utensils, User, X, Download } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { createT, useUser } from "@/context/UserContext";

interface DesktopLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export function DesktopLayout({ children, showNav = true }: DesktopLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences, pwaIsInstalled, pwaCanInstall, pwaIsIOS, pwaBannerDismissed, dismissPwaBanner, promptPwaInstall } = useUser();
  const t = createT(preferences.language);

  const showPwaBanner = !pwaIsInstalled && !pwaBannerDismissed;
  const bannerBottomClass = showNav ? "bottom-24" : "bottom-4";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="flex min-h-screen">
        <main className="flex-1 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
            {children}
          </div>

          {showPwaBanner ? (
            <div className={`fixed left-0 right-0 ${bannerBottomClass} z-50 flex justify-center px-4`}>
              <div className="w-full max-w-[560px] bg-card border border-border/60 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{t("pwa.banner.text")}</p>
                </div>
                <button
                  onClick={async () => {
                    if (pwaCanInstall) {
                      await promptPwaInstall();
                      return;
                    }
                    navigate("/instalar-app", { state: { from: `${location.pathname}${location.search}` } });
                  }}
                  className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-sm font-semibold flex items-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  {t("pwa.banner.installNow")}
                </button>
                <button
                  onClick={() => dismissPwaBanner()}
                  className="w-9 h-9 rounded-xl border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center shrink-0"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          ) : null}

          {showNav && <MobileBottomNav />}
        </main>
      </div>
    </div>
  );
}

function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { preferences } = useUser();
  const t = createT(preferences.language);

  const navItems = [
    { icon: Home, label: t("nav.home"), path: "/home" },
    { icon: HeartPulse, label: t("nav.yoga"), path: "/sessions" },
    { icon: Dumbbell, label: t("nav.workouts"), path: "/treinos" },
    { icon: Utensils, label: t("nav.recipes"), path: "/receitas" },
    { icon: User, label: t("nav.profile"), path: "/profile" },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <nav className="bg-foreground py-3 px-6 flex items-center justify-around rounded-[24px] shadow-lg w-[calc(100%-2rem)] max-w-[560px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                if (isActive) return;
                navigate(item.path);
              }}
              className="flex flex-col items-center gap-1 transition-all duration-200"
            >
              <div className={cn(
                "transition-all duration-300 rounded-full",
                isActive
                  ? "bg-primary text-primary-foreground p-2"
                  : "p-2 text-muted"
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-medium text-primary-foreground transition-opacity",
                isActive ? "opacity-100" : "opacity-0"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
