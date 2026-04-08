import { DesktopLayout } from "@/components/DesktopLayout";
import { createT, useUser } from "@/context/UserContext";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InstallInstructions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences } = useUser();
  const t = createT(preferences.language);
  const from = (location.state as { from?: string } | null)?.from;

  return (
    <DesktopLayout>
      <div className="pb-24">
        <header className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => (from ? navigate(from) : navigate("/profile"))}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t("pwa.instructions.title")}</h1>
        </header>

        <div className="mt-6 space-y-4">
          <section className="bg-card rounded-2xl p-5 border border-border/50">
            <h2 className="text-lg font-semibold text-foreground">📱 Android (Chrome)</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Abra o app no navegador Google Chrome</li>
              <li>Toque nos três pontinhos no canto superior</li>
              <li>Toque em “Adicionar à tela inicial”</li>
              <li>Confirme a instalação</li>
            </ol>
          </section>

          <section className="bg-card rounded-2xl p-5 border border-border/50">
            <h2 className="text-lg font-semibold text-foreground">🍎 iPhone (Safari)</h2>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Abra o app no navegador Safari</li>
              <li>Toque no botão Compartilhar</li>
              <li>Toque em “Adicionar à Tela de Início”</li>
              <li>Confirme o nome e adicione</li>
            </ol>
          </section>

          <section className="bg-card rounded-2xl p-5 border border-border/50">
            <h2 className="text-lg font-semibold text-foreground">🧹 Como desinstalar o aplicativo</h2>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <div>
                <div className="font-medium text-foreground">Android</div>
                <div>Pressione e segure o ícone do app e toque em “Remover”/“Desinstalar” (varia por aparelho).</div>
              </div>
              <div>
                <div className="font-medium text-foreground">iPhone</div>
                <div>Pressione e segure o ícone do app e toque em “Remover App”.</div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl p-5 border border-border/50">
            <div className="text-sm text-muted-foreground">
              O app precisa estar em HTTPS e com os ícones configurados (apple-touch-icon e manifest).
            </div>
          </section>
        </div>
      </div>
    </DesktopLayout>
  );
}

