import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Search, Clock, Flame, Play } from 'lucide-react';
import { useUser, createT } from '@/context/UserContext';
import { getSessionText, sessions } from '@/data/sessions';

interface SearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDrawer({ open, onOpenChange }: SearchDrawerProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { preferences } = useUser();
  const t = createT(preferences.language);

  const filteredSessions = searchQuery.trim()
    ? sessions.filter(s => 
        getSessionText(s, preferences.language).title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getSessionText(s, preferences.language).description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sessions;

  const handleSessionClick = (slug: string) => {
    onOpenChange(false);
    navigate(`/session/${slug}`);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{t("search.title")}</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        <div className="px-4 pb-8 overflow-y-auto max-h-[60vh]">
          {filteredSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{t("search.empty")}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSessionClick(session.slug)}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={session.image} 
                      alt={getSessionText(session, preferences.language).title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                      <Play className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{getSessionText(session, preferences.language).title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {session.calories}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
