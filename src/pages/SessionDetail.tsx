import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { ArrowLeft, Play, Clock, Flame, Heart, Share2 } from "lucide-react";
import { createT, useUser } from "@/context/UserContext";
import { getSessionBySlug, getSessionText, sessions } from "@/data/sessions";

export default function SessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences, savedSessions, toggleSavedSession, addSessionToHistory } = useUser();
  const t = createT(preferences.language);
  const from = (location.state as { from?: string } | null)?.from;

  const session = getSessionBySlug(sessionId || "") || sessions[0];
  const sessionText = getSessionText(session, preferences.language);
  const isSaved = savedSessions.includes(session.id);
  const levelKey =
    session.level === "Iniciante"
      ? "level.beginner"
      : session.level === "Intermediário"
        ? "level.intermediate"
        : session.level === "Avançado"
          ? "level.advanced"
          : "level.all";

  const renderPlayer = () => {
    if (session.videoUrl) {
      const isYouTube =
        session.videoUrl.includes("youtube.com") || session.videoUrl.includes("youtu.be");
      if (isYouTube) {
        return (
          <iframe
            className="w-full h-full"
            src={session.videoUrl}
            title={sessionText.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video
          className="w-full h-full object-cover"
          src={session.videoUrl}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster={session.image}
        />
      );
    }
    return (
      <>
        <img 
          src={session.image} 
          alt={sessionText.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-card/30">
          <div className="h-full bg-primary w-0 rounded-r-full" />
        </div>
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
          <Play className="w-8 h-8 ml-1" fill="currentColor" />
        </button>
      </>
    );
  };

  return (
    <DesktopLayout>
      <div className="pb-24 lg:pb-8">
        {/* Header */}
        <header className="flex items-center gap-4 animate-fade-in">
          <button 
            onClick={() => (from ? navigate(from) : navigate("/sessions"))}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">{sessionText.title}</h1>
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
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-primary text-primary' : 'text-foreground'}`} />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </section>

        {/* Session Info */}
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
              {t(levelKey)}
            </span>
          </div>

          <p className="text-foreground/80 mt-4 leading-relaxed">
            {sessionText.description}
          </p>
        </section>

        {/* Exercises List */}
        <section className="mt-8 animate-fade-in animate-delay-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t("detail.exercises")}</h3>
          <div className="space-y-3">
            {sessionText.exercises.map((exercise, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="text-foreground font-medium">{exercise}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Start Button */}
        <section className="mt-8 animate-fade-in animate-delay-300">
          <button
            onClick={() =>
              addSessionToHistory({
                sessionId: session.id,
                sessionTitle: sessionText.title,
                duration: session.duration,
                calories: session.calories,
                activityType: "yoga",
              })
            }
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            {t("yoga.start")}
          </button>
        </section>
      </div>
    </DesktopLayout>
  );
}
