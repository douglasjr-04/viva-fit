import { DesktopLayout } from "@/components/DesktopLayout";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import { useNavigate } from "react-router-dom";
import { Apple, CupSoda, Leaf, Utensils, ClipboardList, ArrowLeft } from "lucide-react";

export default function Receitas() {
  const { profile, preferences } = useUser();
  const navigate = useNavigate();
  const t = createT(preferences.language);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = profile.name?.split(" ")[0] || "Oi";

  const categories = [
    {
      key: "detoxJuices",
      icon: CupSoda,
      color: "bg-secondary",
    },
    { key: "fitMeals", icon: Utensils, color: "bg-muted" },
    {
      key: "detoxTeas",
      icon: Leaf,
      color: "bg-secondary",
    },
    {
      key: "personalDiet",
      icon: ClipboardList,
      color: "bg-muted",
    },
  ];

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
              <p className="text-xl lg:text-2xl font-semibold text-foreground">{t("common.hello")}, {firstName}</p>
              <p className="text-sm text-muted-foreground capitalize">{formattedDate}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
          </div>
        </header>

        <section className="mt-6 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("recipes.title")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("recipes.chooseCategory")}</p>
        </section>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 animate-fade-in">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                className={`rounded-3xl p-5 ${cat.color} border border-border/50 hover:shadow-md transition-all cursor-pointer flex items-center gap-4`}
                onClick={() => navigate("/receitas")}
              >
                <div className="w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{t(`recipes.category.${cat.key}`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`recipes.desc.${cat.key}`)}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-10 animate-fade-in">
          <div className="bg-card border border-border/50 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Apple className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">{t("common.comingSoonTitle")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("common.comingSoonText")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DesktopLayout>
  );
}
