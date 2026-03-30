import { Play, Clock, Flame, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  image: string;
  title: string;
  duration: string;
  calories?: string;
  className?: string;
  bgColor?: string;
  size?: "sm" | "md" | "lg";
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onClick?: () => void;
}

export function VideoCard({
  image,
  title,
  duration,
  calories,
  className,
  bgColor = "bg-secondary",
  size = "md",
  showFavorite = false,
  isFavorite = false,
  onFavoriteClick,
  onClick,
}: VideoCardProps) {
  const sizeClasses = {
    sm: "w-40",
    md: "w-52",
    lg: "w-full",
  };

  const imageSizes = {
    sm: "h-24",
    md: "h-32",
    lg: "h-40",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "video-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
        bgColor,
        sizeClasses[size],
        className
      )}
    >
      {/* Image with player overlay */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={cn("w-full object-cover", imageSizes[size])}
        />
        
        {/* Play button */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
        </button>

        {/* Favorite button */}
        {showFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick?.();
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorite ? "fill-primary text-primary" : "text-foreground"
              )}
            />
          </button>
        )}

        {/* Fake progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-card/30">
          <div className="h-full bg-primary w-1/3 rounded-r-full" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{duration}</span>
          {calories && (
            <>
              <span>•</span>
              <Flame className="w-3 h-3" />
              <span>{calories}</span>
            </>
          )}
        </div>
        <h4 className="font-semibold text-foreground mt-1 text-sm">{title}</h4>
      </div>
    </div>
  );
}
