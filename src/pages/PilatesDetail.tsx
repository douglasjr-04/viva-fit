import { useParams, useNavigate } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { ArrowLeft, Play, Clock, Flame, Heart, Share2 } from "lucide-react";
import { createT, useUser } from "@/context/UserContext";
import { getPilatesSessionBySlug, pilatesSessions } from "@/data/pilates";

export default function PilatesDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { preferences, savedSessions, toggleSavedSession, addSessionToHistory } = useUser();
  const t = createT(preferences.language);

  const session = getPilatesSessionBySlug(sessionId || "") || pilatesSessions[0];
  const isSaved = savedSessions.includes(session.id);

  const renderPlayer = () => {
    if (session.videoUrl) {
      const isYouTube = session.videoUrl.includes("youtube.com") || session.videoUrl.includes("youtu.be");
      if (isYouTube) {
        return (
          <iframe
            className="w-full h-full"
            src={session.videoUrl}
            title={session.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return <video className="w-full h-full object-cover" src={session.videoUrl} controls poster={session.image} />;
    }
    return <img src={session.image} alt={session.title} className="w-full h-full object-cover" />;
  };

  return (
    <DesktopLayout>
      <div className="pb-24 lg:pb-8">
        <header className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">{session.title}</h1>
        </header>

        <section className="mt-6 animate-slide-up">
          <div className="relative rounded-3xl overflow-hidden h-56 lg:h-80 bg-muted">
            {renderPlayer()}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => toggleSavedSession(session.id)}
                className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-primary text-primary" : "text-foreground"}`} />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6 animate-fade-in animate-delay-100">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              {session.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-primary" />
              {session.calories}
            </span>
            <span>•</span>
            <span className="bg-secondary px-3 py-1 rounded-full text-xs font-medium">
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

          <p className="text-foreground/80 mt-4 leading-relaxed">
            {session.description}
          </p>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-300">
          <button
            onClick={() =>
              addSessionToHistory({
                sessionId: session.id,
                sessionTitle: session.title,
                duration: session.duration,
                calories: session.calories,
                activityType: "pilates",
              })
            }
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            {t("pilates.start")}
          </button>
        </section>
      </div>
    </DesktopLayout>
  );
}
