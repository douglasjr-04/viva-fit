import { DesktopLayout } from "@/components/DesktopLayout";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, CupSoda, Leaf, Utensils } from "lucide-react";
import { getRecipeText, getRecipesByCategory, RecipeCategoryKey } from "@/data/recipes";

const categoryIcons: Record<RecipeCategoryKey, { icon: typeof Leaf; color: string }> = {
  detoxJuices: { icon: CupSoda, color: "bg-secondary" },
  fitMeals: { icon: Utensils, color: "bg-muted" },
  detoxTeas: { icon: Leaf, color: "bg-secondary" },
  personalDiet: { icon: ClipboardList, color: "bg-muted" },
};

const isRecipeCategoryKey = (value: string | undefined): value is RecipeCategoryKey =>
  value === "detoxJuices" || value === "fitMeals" || value === "detoxTeas" || value === "personalDiet";

export default function ReceitasCategory() {
  const { profile, preferences } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryKey } = useParams();
  const t = createT(preferences.language);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];

  if (!isRecipeCategoryKey(categoryKey)) {
    navigate("/receitas", { replace: true });
    return null;
  }

  const recipes = getRecipesByCategory(categoryKey);
  const Icon = categoryIcons[categoryKey].icon;
  const color = categoryIcons[categoryKey].color;
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
              onClick={() => navigate(from || "/receitas")}
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
        </header>

        <section className="mt-6 animate-fade-in">
          <div className={`rounded-3xl p-5 ${color} border border-border/50 flex items-center gap-4`}>
            <div className="w-12 h-12 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {t(`recipes.category.${categoryKey}`)}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{t(`recipes.desc.${categoryKey}`)}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 animate-fade-in">
          {recipes.length === 0 ? (
            <div className="bg-card border border-border/50 rounded-2xl p-5">
              <h4 className="font-semibold text-foreground">{t("common.comingSoonTitle")}</h4>
              <p className="text-sm text-muted-foreground mt-1">{t("common.comingSoonText")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {recipes.map((r) => {
                const recipeText = getRecipeText(r, preferences.language);
                return (
                <div
                  key={r.id}
                  className="rounded-3xl p-5 bg-card border border-border/50 hover:shadow-md transition-all cursor-pointer"
                  onClick={() =>
                    navigate(`/receitas/${categoryKey}/${r.slug}`, {
                      state: { from: `${location.pathname}${location.search}` },
                    })
                  }
                >
                  <h3 className="text-lg font-semibold text-foreground">{recipeText.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("recipes.tapToOpen")}
                  </p>
                </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </DesktopLayout>
  );
}
