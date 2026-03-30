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
import { Activity } from 'lucide-react';

interface HealthConditionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const conditions = [
  { id: 'dor-cronica', label: 'Dor crônica' },
  { id: 'gestante', label: 'Gestante' },
  { id: 'pos-parto', label: 'Pós-parto' },
  { id: 'hipertensao', label: 'Hipertensão' },
  { id: 'problema-cardiaco', label: 'Problema cardíaco' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'artrite', label: 'Artrite' },
  { id: 'nenhuma', label: 'Nenhuma condição' },
];

export function HealthConditionsModal({ open, onOpenChange }: HealthConditionsModalProps) {
  const { preferences, updatePreferences } = useUser();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>(preferences.healthConditions);

  useEffect(() => {
    if (open) {
      setSelected(preferences.healthConditions);
    }
  }, [open, preferences.healthConditions]);

  const toggleCondition = (conditionId: string) => {
    if (conditionId === 'nenhuma') {
      setSelected(['nenhuma']);
      return;
    }
    
    setSelected(prev => {
      const withoutNenhuma = prev.filter(id => id !== 'nenhuma');
      return withoutNenhuma.includes(conditionId)
        ? withoutNenhuma.filter(id => id !== conditionId)
        : [...withoutNenhuma, conditionId];
    });
  };

  const handleSave = () => {
    updatePreferences({ healthConditions: selected });
    toast({
      title: "Condições de saúde salvas!",
      description: "Suas sessões serão adaptadas às suas necessidades",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Condições de saúde
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Informe condições de saúde para adaptar suas práticas
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {conditions.map((condition) => (
              <div
                key={condition.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selected.includes(condition.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => toggleCondition(condition.id)}
              >
                <Checkbox
                  id={condition.id}
                  checked={selected.includes(condition.id)}
                  onCheckedChange={() => toggleCondition(condition.id)}
                />
                <Label htmlFor={condition.id} className="cursor-pointer font-normal text-sm">
                  {condition.label}
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
