import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone } from 'lucide-react';

interface SupportContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportContactModal({ open, onOpenChange }: SupportContactModalProps) {
  const handleEmail = () => {
    window.open('mailto:suporte@iyoga.com.br?subject=Suporte i-yoga', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda com o app i-yoga', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Contato de suporte
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda? Entre em contato conosco através de um dos canais abaixo:
          </p>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              onClick={handleEmail}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Email</p>
                <p className="text-xs text-muted-foreground">suporte@iyoga.com.br</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-14"
              onClick={handleWhatsApp}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">+55 11 99999-9999</p>
              </div>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            Horário de atendimento: Seg-Sex, 9h às 18h
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
