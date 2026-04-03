import { DesktopLayout } from "@/components/DesktopLayout";
import { createT, getLocale, useUser } from "@/context/UserContext";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import bendLogo from "@/assets/bend-logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getRecipeByCategoryAndSlug, getRecipeText, RecipeCategoryKey } from "@/data/recipes";

const isRecipeCategoryKey = (value: string | undefined): value is RecipeCategoryKey =>
  value === "detoxJuices" || value === "fitMeals" || value === "detoxTeas" || value === "personalDiet";

export default function ReceitaDetail() {
  const { profile, preferences } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryKey, recipeSlug } = useParams();
  const t = createT(preferences.language);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString(getLocale(preferences.language), options);
  const firstName = (profile.name || "").trim().split(" ")[0];

  const from = (location.state as { from?: string } | null)?.from;

  if (!isRecipeCategoryKey(categoryKey) || !recipeSlug) {
    navigate("/receitas", { replace: true });
    return null;
  }

  const recipe = getRecipeByCategoryAndSlug(categoryKey, recipeSlug);
  if (!recipe) {
    navigate(`/receitas/${categoryKey}`, { replace: true });
    return null;
  }
  const recipeText = getRecipeText(recipe, preferences.language);

  return (
    <DesktopLayout>
      <div className="pb-24 overflow-x-hidden">
        <div className="w-full flex justify-center mb-4 lg:hidden">
          <img src={bendLogo} alt="Viva Fit logo" className="h-10 lg:h-12 object-contain" />
        </div>

        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(from || `/receitas/${categoryKey}`)}
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
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{recipeText.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t(`recipes.category.${categoryKey}`)}</p>
        </section>

        <section className="mt-6 animate-fade-in">
          <div className="bg-card border border-border/50 rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-foreground">{t("recipes.ingredients")}</h3>
            <ul className="mt-3 space-y-2">
              {recipeText.ingredients.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-4 animate-fade-in">
          <div className="bg-card border border-border/50 rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-foreground">{t("recipes.preparation")}</h3>
            <ol className="mt-3 space-y-2 list-decimal list-inside">
              {recipeText.preparation.map((step, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </DesktopLayout>
  );
}
