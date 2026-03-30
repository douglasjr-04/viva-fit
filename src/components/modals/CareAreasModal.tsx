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
import { AlertTriangle } from 'lucide-react';

interface CareAreasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const areas = [
  { id: 'lombar', label: 'Lombar / Costas' },
  { id: 'pescoco', label: 'Pescoço' },
  { id: 'ombros', label: 'Ombros' },
  { id: 'joelhos', label: 'Joelhos' },
  { id: 'quadril', label: 'Quadril' },
  { id: 'punhos', label: 'Punhos' },
  { id: 'tornozelos', label: 'Tornozelos' },
  { id: 'nenhum', label: 'Nenhuma área específica' },
];

export function CareAreasModal({ open, onOpenChange }: CareAreasModalProps) {
  const { preferences, updatePreferences } = useUser();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>(preferences.careAreas);

  useEffect(() => {
    if (open) {
      setSelected(preferences.careAreas);
    }
  }, [open, preferences.careAreas]);

  const toggleArea = (areaId: string) => {
    if (areaId === 'nenhum') {
      setSelected(['nenhum']);
      return;
    }
    
    setSelected(prev => {
      const withoutNenhum = prev.filter(id => id !== 'nenhum');
      return withoutNenhum.includes(areaId)
        ? withoutNenhum.filter(id => id !== areaId)
        : [...withoutNenhum, areaId];
    });
  };

  const handleSave = () => {
    updatePreferences({ careAreas: selected });
    toast({
      title: "Áreas de cuidado salvas!",
      description: "Evitaremos exercícios que possam afetar essas áreas",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Áreas de cuidado
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Selecione áreas do corpo que precisam de atenção especial
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
                <Label htmlFor={area.id} className="cursor-pointer font-normal text-sm">
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
