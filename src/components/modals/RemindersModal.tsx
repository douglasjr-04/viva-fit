import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { createT, useUser } from '@/context/UserContext';
import { Bell } from 'lucide-react';

interface RemindersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemindersModal({ open, onOpenChange }: RemindersModalProps) {
  const { preferences, reminders, updateReminder } = useUser();
  const t = createT(preferences.language);

  const getReminderLabel = (id: string) =>
    id === '1' ? t('reminder.morning') : id === '2' ? t('reminder.afternoon') : t('reminder.evening');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t('modal.reminders.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            {t('modal.reminders.desc')}
          </p>
          
          <div className="space-y-3">
            {reminders.map((reminder) => (
              <div 
                key={reminder.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{reminder.time}</span>
                  </div>
                  <span className="font-medium text-foreground">{getReminderLabel(reminder.id)}</span>
                </div>
                <Switch
                  checked={reminder.enabled}
                  onCheckedChange={(enabled) => updateReminder(reminder.id, enabled)}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
