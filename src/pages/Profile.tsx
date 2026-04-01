import { DesktopLayout } from "@/components/DesktopLayout";
import { User, Bell, Volume2, ChevronRight, Dumbbell, Target, AlertTriangle, Activity, MessageCircle, Palette, Check, ArrowLeft, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { createT, Language, useUser, ThemeType } from "@/context/UserContext";
import { AvatarWithUpload } from "@/components/AvatarWithUpload";
import { EditProfileModal } from "@/components/modals/EditProfileModal";
import { PersonalInfoModal } from "@/components/modals/PersonalInfoModal";
import { RemindersModal } from "@/components/modals/RemindersModal";
import { ExperienceLevelModal } from "@/components/modals/ExperienceLevelModal";
import { FocusAreasModal } from "@/components/modals/FocusAreasModal";
import { CareAreasModal } from "@/components/modals/CareAreasModal";
import { HealthConditionsModal } from "@/components/modals/HealthConditionsModal";
import { SupportContactModal } from "@/components/modals/SupportContactModal";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const accountSettings = [
  { icon: User, labelKey: "profile.personalInfo", modal: "personalInfo" },
  { icon: Bell, labelKey: "profile.reminders", modal: "reminders" },
];

const preferences = [
  { icon: Dumbbell, labelKey: "profile.experienceLevel", modal: "experienceLevel" },
  { icon: Target, labelKey: "profile.focusAreas", modal: "focusAreas" },
  { icon: AlertTriangle, labelKey: "profile.careAreas", modal: "careAreas" },
  { icon: Activity, labelKey: "profile.healthConditions", modal: "healthConditions" },
];

const support = [
  { icon: MessageCircle, labelKey: "profile.supportContact", modal: "support" },
];

const themes: { id: ThemeType; nameKey: string; colors: { primary: string; secondary: string; muted: string } }[] = [
  { 
    id: 'default', 
    nameKey: 'theme.default', 
    colors: { 
      primary: 'bg-[hsl(80,69%,44%)]', 
      secondary: 'bg-[hsl(34,92%,94%)]', 
      muted: 'bg-[hsl(203,86%,93%)]'
    } 
  },
  { 
    id: 'coral', 
    nameKey: 'theme.coral', 
    colors: { 
      primary: 'bg-[hsl(12,76%,58%)]', 
      secondary: 'bg-[hsl(45,90%,94%)]', 
      muted: 'bg-[hsl(270,60%,94%)]'
    } 
  },
  { 
    id: 'lavender', 
    nameKey: 'theme.lavender', 
    colors: { 
      primary: 'bg-[hsl(265,65%,58%)]', 
      secondary: 'bg-[hsl(320,50%,92%)]', 
      muted: 'bg-[hsl(200,50%,92%)]'
    } 
  },
  { 
    id: 'amber', 
    nameKey: 'theme.amber', 
    colors: { 
      primary: 'bg-[hsl(38,92%,50%)]', 
      secondary: 'bg-[hsl(25,60%,92%)]', 
      muted: 'bg-[hsl(180,40%,92%)]'
    } 
  },
];

type ModalType = "editProfile" | "personalInfo" | "reminders" | "experienceLevel" | "focusAreas" | "careAreas" | "healthConditions" | "support" | null;

export default function Profile() {
  const { profile, preferences: userPrefs, updatePreferences } = useUser();
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const navigate = useNavigate();
  const t = createT(userPrefs.language);

  const handleSupportClick = (modal: string) => {
    setOpenModal(modal as ModalType);
  };

  return (
    <DesktopLayout>
      <div className="pb-24 lg:pb-8">
        {/* Header */}
        <header className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t("nav.profile")}</h1>
        </header>

        {/* Desktop: Two column layout */}
        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            {/* User Card */}
            <section className="animate-slide-up">
              <div className="bg-card rounded-2xl p-6 border border-border/50 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                  <AvatarWithUpload size="md" />
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">{profile.location}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setOpenModal("editProfile")}
                  className="w-full mt-4 px-4 py-2 bg-muted border border-border rounded-full text-sm font-medium text-foreground hover:shadow-md transition-all duration-300"
                >
                  {t("profile.editProfile")}
                </button>

                {/* Theme Selector */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    {t("profile.theme")}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 justify-center lg:justify-start">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updatePreferences({ theme: theme.id })}
                        className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          userPrefs.theme === theme.id 
                            ? 'border-primary shadow-md' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {userPrefs.theme === theme.id && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="flex gap-1">
                          <div className={`w-5 h-5 rounded-full ${theme.colors.primary}`} />
                          <div className={`w-5 h-5 rounded-full ${theme.colors.secondary}`} />
                          <div className={`w-5 h-5 rounded-full ${theme.colors.muted}`} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{t(theme.nameKey)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Support - Desktop only */}
            <section className="hidden lg:block mt-6 animate-fade-in animate-delay-300">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {t("profile.support")}
              </h3>
              
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
                {support.map((item) => (
                  <button
                    key={item.labelKey}
                    onClick={() => handleSupportClick(item.modal)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{t(item.labelKey)}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-6">
                Viva Fit v1.0.0
              </p>
            </section>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2">
            {/* Account Settings */}
            <section className="animate-fade-in animate-delay-100">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {t("profile.accountSettings")}
              </h3>
              
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
                {accountSettings.map((item, index) => (
                  <button
                    key={item.labelKey}
                    onClick={() => setOpenModal(item.modal as ModalType)}
                    className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                      index < accountSettings.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{t(item.labelKey)}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
                
                {/* Sound Toggle */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{t("profile.sound")}</span>
                  </div>
                  <Switch
                    checked={userPrefs.soundEnabled}
                    onCheckedChange={(checked) => updatePreferences({ soundEnabled: checked })}
                    className="toggle-green"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="mt-6 animate-fade-in animate-delay-200">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {t("profile.preferences")}
              </h3>
              
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
                <div className="w-full flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{t("profile.language")}</span>
                  </div>
                  <div className="w-40">
                    <Select
                      value={userPrefs.language}
                      onValueChange={(value) => updatePreferences({ language: value as Language })}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">{t("language.pt")}</SelectItem>
                        <SelectItem value="en">{t("language.en")}</SelectItem>
                        <SelectItem value="es">{t("language.es")}</SelectItem>
                        <SelectItem value="fr">{t("language.fr")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {preferences.map((item, index) => (
                  <button
                    key={item.labelKey}
                    onClick={() => setOpenModal(item.modal as ModalType)}
                    className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                      index < preferences.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{t(item.labelKey)}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </section>

            {/* Support - Mobile only */}
            <section className="lg:hidden mt-6 animate-fade-in animate-delay-300">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {t("profile.support")}
              </h3>
              
              <div className="bg-card rounded-2xl overflow-hidden border border-border/50">
                {support.map((item) => (
                  <button
                    key={item.labelKey}
                    onClick={() => handleSupportClick(item.modal)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground">{t(item.labelKey)}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-6">
                Viva Fit v1.0.0
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal open={openModal === "editProfile"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <PersonalInfoModal open={openModal === "personalInfo"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <RemindersModal open={openModal === "reminders"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <ExperienceLevelModal open={openModal === "experienceLevel"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <FocusAreasModal open={openModal === "focusAreas"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <CareAreasModal open={openModal === "careAreas"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <HealthConditionsModal open={openModal === "healthConditions"} onOpenChange={(open) => !open && setOpenModal(null)} />
      <SupportContactModal open={openModal === "support"} onOpenChange={(open) => !open && setOpenModal(null)} />
    </DesktopLayout>
  );
}
