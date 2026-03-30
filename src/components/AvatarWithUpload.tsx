import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import avatarEmma from '@/assets/avatar-emma.png';

interface AvatarWithUploadProps {
  size?: 'sm' | 'md' | 'lg';
  showEditButton?: boolean;
  className?: string;
}

export function AvatarWithUpload({ 
  size = 'md', 
  showEditButton = true,
  className = '' 
}: AvatarWithUploadProps) {
  const { profile, updateProfile } = useUser();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Escolha uma imagem menor que 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updateProfile({ avatarUrl: dataUrl });
        toast({
          title: "Foto atualizada!",
          description: "Sua nova foto de perfil foi salva",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarSrc = profile.avatarUrl || avatarEmma;

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="w-full h-full rounded-full bg-secondary overflow-hidden">
        <img 
          src={avatarSrc} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {showEditButton && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md transition-all duration-200 ${
              isHovering ? 'scale-110' : ''
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </div>
  );
}
