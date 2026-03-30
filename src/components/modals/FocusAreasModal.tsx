import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Target } from 'lucide-react';

interface FocusAreasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const areas = [
  { id: 'flexibilidade', label: 'Flexibilidade' },
  { id: 'forca', label: 'Força' },
  { id: 'equilibrio', label: 'Equilíbrio' },
  { id: 'relaxamento', label: 'Relaxamento' },
  { id: 'postura', label: 'Postura' },
  { id: 'energia', label: 'Energia' },
  { id: 'meditacao', label: 'Meditação' },
  { id: 'respiracao', label: 'Respiração' },
];

export function FocusAreasModal({ open, onOpenChange }: FocusAreasModalProps) {
  const { preferences, updatePreferences } = useUser();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>(preferences.focusAreas);

  useEffect(() => {
    if (open) {
      setSelected(preferences.focusAreas);
    }
  }, [open, preferences.focusAreas]);

  const toggleArea = (areaId: string) => {
    setSelected(prev =>
      prev.includes(areaId)
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleSave = () => {
    updatePreferences({ focusAreas: selected });
    toast({
      title: "Áreas de foco salvas!",
      description: "Suas preferências foram atualizadas",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Áreas de foco
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Selecione as áreas que você deseja focar em suas práticas
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {areas.map((area) => (
              <div
                key={area.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selected.includes(area.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleArea(area.id)}
              >
                <Checkbox
                  id={area.id}
                  checked={selected.includes(area.id)}
                  onCheckedChange={() => toggleArea(area.id)}
                />
                <Label htmlFor={area.id} className="cursor-pointer font-normal">
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
