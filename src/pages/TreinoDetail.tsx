import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DesktopLayout } from "@/components/DesktopLayout";
import { ArrowLeft, Play, Clock, Flame, Heart, Share2 } from "lucide-react";
import { createT, useUser } from "@/context/UserContext";
import { getWorkoutBySlug, getWorkoutText, workouts } from "@/data/workouts";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function TreinoDetail() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences, savedSessions, toggleSavedSession, addSessionToHistory, workoutLoadOverrides, setWorkoutLoadOverride } = useUser();
  const t = createT(preferences.language);
  const from = (location.state as { from?: string } | null)?.from;

  const workout = getWorkoutBySlug(workoutId || "") || workouts[0];
  const workoutText = getWorkoutText(workout, preferences.language);
  const isMobilidade = workout.moduleId === "mobilidade";
  const isSaved = savedSessions.includes(workout.id);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [exerciseVideoOpen, setExerciseVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ title: string; videoUrl?: string } | null>(null);

  const storageKey = useMemo(() => `viva_fit_active_workout_${workout.id}`, [workout.id]);
  const [activeStartMs, setActiveStartMs] = useState<number | null>(() => {
    const v = sessionStorage.getItem(storageKey);
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  });
  const [tick, setTick] = useState(0);
  const activeSeconds = useMemo(() => {
    void tick;
    return activeStartMs ? Math.max(0, Math.floor((Date.now() - activeStartMs) / 1000)) : 0;
  }, [activeStartMs, tick]);
  const isActive = activeStartMs !== null;

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [isActive]);

  const formatElapsed = (seconds: number) => {
    const s = Math.max(0, seconds);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    return `${m}:${String(ss).padStart(2, "0")}`;
  };

  const openVideo = (title: string, videoUrl?: string) => {
    setActiveVideo({ title, videoUrl });
    setExerciseVideoOpen(true);
  };

  const renderPlayer = () => {
    if (workout.videoUrl && !isMobilidade) {
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
        <video
          className="w-full h-full object-cover"
          src={workout.videoUrl}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster={workout.image}
          ref={videoRef}
        />
      );
    }
    if (workout.videoUrl && isMobilidade) {
      return <img src={workout.image} alt={workoutText.title} className="w-full h-full object-cover" />;
    }
    return (
      <div className="w-full h-full relative">
        <img src={workout.image} alt={workoutText.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-primary-foreground text-sm font-semibold">{t("video.placeholderTitle")}</p>
          <p className="text-primary-foreground/80 text-xs mt-1">{t("video.placeholderSubtitle")}</p>
        </div>
      </div>
    );
  };

  return (
    <DesktopLayout>
      <div className="pb-24 lg:pb-8">
        <header className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => (from ? navigate(from) : navigate("/treinos"))}
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

            {isMobilidade && workout.videoUrl ? (
              <button
                onClick={() => openVideo(workoutText.title, workout.videoUrl)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </button>
            ) : !workout.videoUrl ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
            ) : null}

            {isActive ? (
              <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-2 pointer-events-auto">
                <Clock className="w-3 h-3 text-primary" />
                <span>
                  {t("activity.activeTime")}: {formatElapsed(activeSeconds)}
                </span>
              </div>
            ) : null}
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
            {workout.exerciseItems?.length
              ? workout.exerciseItems.map((item, index) => {
                  const title = workoutText.exercises[index] ?? item.name;
                  const loadKey = `${workout.id}:${item.name}:${index}`;
                  const overriddenLoad = workoutLoadOverrides[loadKey];
                  const effectiveLoad = overriddenLoad ?? item.load ?? "";

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="text-foreground font-medium block">{title}</span>
                            <div className="text-xs text-muted-foreground mt-1 space-y-2">
                              {item.series ? (
                                <div className="whitespace-pre-line">
                                  {t("exercise.series")}: {item.series}
                                </div>
                              ) : null}

                              <div className="space-y-1">
                                <div className="whitespace-pre-line">
                                  {t("exercise.load")}:
                                </div>
                                <input
                                  value={effectiveLoad}
                                  onChange={(e) => setWorkoutLoadOverride(loadKey, e.target.value)}
                                  placeholder={item.load || ""}
                                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                                />
                              </div>

                              {item.interval ? (
                                <div className="whitespace-pre-line">
                                  {t("exercise.interval")}: {item.interval}
                                </div>
                              ) : null}

                              {item.instructions ? (
                                <div className="whitespace-pre-line">
                                  {t("exercise.instructions")}:
                                  {"\n"}
                                  {item.instructions}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <button
                            onClick={() => openVideo(title, item.videoUrl)}
                            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/15 transition-colors flex-shrink-0"
                          >
                            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              : isMobilidade && workout.videoUrl ? (
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-foreground font-medium block">
                            {workoutText.exercises[0] ?? workoutText.title}
                          </span>
                          {workoutText.exercises.length > 1 ? (
                            <span className="text-xs text-muted-foreground whitespace-pre-line block mt-1">
                              {workoutText.exercises.slice(1).join("\n")}
                            </span>
                          ) : null}
                        </div>
                        <button
                          onClick={() => openVideo(workoutText.title, workout.videoUrl)}
                          className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/15 transition-colors flex-shrink-0"
                        >
                          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              : workoutText.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-foreground font-medium whitespace-pre-line">{exercise}</span>
                  </div>
                ))}
          </div>
        </section>

        <section className="mt-8 animate-fade-in animate-delay-300">
          {!isActive ? (
            <button
              onClick={() => {
                const now = Date.now();
                setActiveStartMs(now);
                sessionStorage.setItem(storageKey, String(now));
                window.requestAnimationFrame(() => {
                  void videoRef.current?.play().catch(() => undefined);
                });
              }}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              {t("workouts.start")}
            </button>
          ) : (
            <button
              onClick={() => {
                const elapsed = activeSeconds;
                setActiveStartMs(null);
                sessionStorage.removeItem(storageKey);
                videoRef.current?.pause();
                addSessionToHistory({
                  sessionId: workout.id,
                  sessionTitle: workoutText.title,
                  duration: workout.duration,
                  calories: workout.calories,
                  activeSeconds: elapsed,
                  activityType: "workout",
                });
              }}
              className="w-full bg-foreground text-primary-foreground py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>{t("common.finish")}</span>
              <span className="text-sm font-medium opacity-90">{formatElapsed(activeSeconds)}</span>
            </button>
          )}
        </section>
      </div>
      <Dialog open={exerciseVideoOpen} onOpenChange={setExerciseVideoOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{activeVideo?.title || t("exercise.videoTitle")}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-4">
            {activeVideo?.videoUrl ? (
              <div className="rounded-xl overflow-hidden bg-muted">
                <video
                  className="w-full h-full"
                  src={activeVideo.videoUrl}
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ) : (
              <div className="rounded-xl bg-muted p-4">
                <p className="text-foreground font-medium">{t("exercise.noVideoTitle")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("exercise.noVideoText")}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DesktopLayout>
  );
}
