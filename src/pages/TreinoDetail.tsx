import { useParams, useNavigate } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { ArrowLeft, Play, Clock, Flame, Heart, Share2 } from "lucide-react";
import { createT, useUser } from "@/context/UserContext";
import { getWorkoutBySlug, getWorkoutText, workouts } from "@/data/workouts";

export default function TreinoDetail() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { preferences, savedSessions, toggleSavedSession, addSessionToHistory } = useUser();
  const t = createT(preferences.language);

  const workout = getWorkoutBySlug(workoutId || "") || workouts[0];
  const workoutText = getWorkoutText(workout, preferences.language);
  const isSaved = savedSessions.includes(workout.id);

  const renderPlayer = () => {
    if (workout.videoUrl) {
      const isYouTube =
        workout.videoUrl.includes("youtube.com") || workout.videoUrl.includes("youtu.be");
      if (isYouTube) {
        return (
          <iframe
            className="w-full h-full"
            src={workout.videoUrl}
            title={workoutText.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video className="w-full h-full object-cover" src={workout.videoUrl} controls poster={workout.image} />
      );
    }
    return <img src={workout.image} alt={workoutText.title} className="w-full h-full object-cover" />;
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
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">{workoutText.title}</h1>
        </header>

        <section className="mt-6 animate-slide-up">
          <div className="relative rounded-3xl overflow-hidden h-56 lg:h-80 bg-muted">
            {renderPlayer()}
            <div className="absolute inset-0 pointer-events-none" />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => toggleSavedSession(workout.id)}
                className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart className={`w-5 h-5 ${isSaved ? "fill-primary text-primary" : "text-foreground"}`} />
              </button>
              <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {!workout.videoUrl && (
              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </button>
            )}
          </div>
        </section>

        <section className="mt-6 animate-fade-in animate-delay-100">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              {workout.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-primary" />
              {workout.calories}
            </span>
            <span>•</span>
            <span className="bg-secondary px-3 py-1 rounded-full text-xs font-medium">
              {t(
                workout.level === "Iniciante"
                  ? "level.beginner"
                  : workout.level === "Intermediário"
                    ? "level.intermediate"
                    : workout.level === "Avançado"
                      ? "level.advanced"
                      : "level.all"
              )}
            </span>
          </div>

          <p className="text-foreground/80 mt-4 leading-relaxed">
            {workoutText.description}
          </p>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t("detail.exercises")}</h3>
          <div className="space-y-3">
            {workoutText.exercises.map((exercise, index) => (
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

        <section className="mt-8 animate-fade-in animate-delay-300">
          <button
            onClick={() =>
              addSessionToHistory({
                sessionId: workout.id,
                sessionTitle: workout.title,
                duration: workout.duration,
                calories: workout.calories,
                activityType: "workout",
              })
            }
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            {t("workouts.start")}
          </button>
        </section>
      </div>
    </DesktopLayout>
  );
}
