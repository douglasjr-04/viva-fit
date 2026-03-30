import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createT, useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonalInfoModal({ open, onOpenChange }: PersonalInfoModalProps) {
  const { personalInfo, preferences, updatePersonalInfo } = useUser();
  const t = createT(preferences.language);
  const { toast } = useToast();
  
  const [birthDate, setBirthDate] = useState(personalInfo.birthDate);
  const [gender, setGender] = useState(personalInfo.gender);
  const [weight, setWeight] = useState(personalInfo.weight);
  const [height, setHeight] = useState(personalInfo.height);

  useEffect(() => {
    if (open) {
      setBirthDate(personalInfo.birthDate);
      setGender(personalInfo.gender);
      setWeight(personalInfo.weight);
      setHeight(personalInfo.height);
    }
  }, [open, personalInfo]);

  const handleSave = () => {
    updatePersonalInfo({ birthDate, gender, weight, height });
    toast({
      title: t("toast.personalInfoSavedTitle"),
      description: t("toast.personalInfoSavedDesc"),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("modal.personalInfo.title")}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate">{t("profile.birthDate")}</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">{t("profile.gender")}</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder={t("common.select")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feminino">{t("gender.female")}</SelectItem>
                <SelectItem value="masculino">{t("gender.male")}</SelectItem>
                <SelectItem value="outro">{t("gender.other")}</SelectItem>
                <SelectItem value="prefiro-nao-dizer">{t("gender.noSay")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">{t("profile.weightKg")}</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="65"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">{t("profile.heightCm")}</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="165"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("common.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
