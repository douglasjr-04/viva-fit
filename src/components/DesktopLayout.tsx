import { ReactNode } from "react";
import { Home, HeartPulse, Dumbbell, Utensils, User } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="flex min-h-screen">
        <main className="flex-1 min-h-screen">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 pb-28">
            {children}
          </div>

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
