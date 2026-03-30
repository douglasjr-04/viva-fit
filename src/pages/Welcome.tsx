import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import yogaGreenLotus from "@/assets/yoga-green-lotus.png";
import bendLogo from "@/assets/bend-logo.png";
import { createT, useUser } from "@/context/UserContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { preferences } = useUser();
  const t = createT(preferences.language);

  return (
    <div 
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: "var(--gradient-welcome)" }}
    >
      {/* Desktop: Left side image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
        {/* Logo acima da imagem (desktop) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+180px)]">
          <img 
            src={bendLogo} 
            alt="Viva Fit logo" 
            className="h-12 lg:h-14 object-contain"
          />
        </div>
        
        <div className="relative animate-scale-in">
          <svg 
            className="absolute inset-0 w-full h-full opacity-20" 
            viewBox="0 0 200 200"
          >
            <path
              d="M100,10 Q180,60 170,120 Q160,180 100,190 Q40,180 30,120 Q20,60 100,10"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
          <img 
            src={yogaGreenLotus} 
            alt="Mulher fazendo yoga" 
            className="w-96 h-auto object-contain relative z-10 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pb-10 pt-4 lg:pt-0 lg:justify-center lg:gap-12">
        {/* Logo no topo (mobile) */}
        <div className="w-full flex justify-center pt-4 lg:hidden">
          <img 
            src={bendLogo} 
            alt="Viva Fit logo" 
            className="h-12 lg:h-14 object-contain"
          />
        </div>

        {/* Mobile: Yoga Image */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-xs animate-scale-in lg:hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-full h-full opacity-30" 
              viewBox="0 0 200 200"
            >
              <path
                d="M100,10 Q180,60 170,120 Q160,180 100,190 Q40,180 30,120 Q20,60 100,10"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
          <img 
            src={yogaGreenLotus} 
            alt="Mulher fazendo yoga" 
            className="w-64 h-auto object-contain relative z-10 drop-shadow-xl"
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 animate-slide-up lg:max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-foreground">{t("auth.welcomeTitleA")}</span>
            <br />
            <span className="text-foreground">{t("auth.welcomeTitleB")} </span>
            <span className="text-primary">VIVA FIT</span>
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-[280px] lg:max-w-md mx-auto">
            {t("home.todaySubtitle")}
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md space-y-4 mt-8 animate-fade-in animate-delay-200">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-primary text-primary-foreground py-4 px-8 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("auth.getStarted")}
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <button 
              onClick={() => navigate("/login")}
              className="text-primary font-semibold hover:underline"
            >
              {t("auth.signIn")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
