import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createT, useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, Check } from 'lucide-react';

interface ExperienceLevelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const levels = [
  { id: 'iniciante', labelKey: 'exp.beginner.label', descKey: 'exp.beginner.desc' },
  { id: 'intermediario', labelKey: 'exp.intermediate.label', descKey: 'exp.intermediate.desc' },
  { id: 'avancado', labelKey: 'exp.advanced.label', descKey: 'exp.advanced.desc' },
];

export function ExperienceLevelModal({ open, onOpenChange }: ExperienceLevelModalProps) {
  const { preferences, updatePreferences } = useUser();
  const { toast } = useToast();
  const t = createT(preferences.language);

  const handleSelect = (level: string) => {
    updatePreferences({ experienceLevel: level });
    toast({
      title: t("toast.experienceUpdatedTitle"),
      description: t("toast.experienceUpdatedDesc"),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            {t("modal.experience.title")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {levels.map((level) => (
            <Button
              key={level.id}
              variant="outline"
              className={`w-full h-auto p-4 flex flex-col items-start gap-1 ${
                preferences.experienceLevel === level.id 
                  ? 'border-primary bg-primary/5' 
                  : ''
              }`}
              onClick={() => handleSelect(level.id)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{t(level.labelKey)}</span>
                {preferences.experienceLevel === level.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
              <span className="text-xs text-muted-foreground text-left font-normal">
                {t(level.descKey)}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
