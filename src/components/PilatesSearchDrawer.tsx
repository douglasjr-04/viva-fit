import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Search, Clock, Flame, Play } from 'lucide-react';
import { useUser, createT } from '@/context/UserContext';
import { pilatesSessions } from '@/data/pilates';
import { useNavigate } from 'react-router-dom';

interface PilatesSearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PilatesSearchDrawer({ open, onOpenChange }: PilatesSearchDrawerProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { preferences } = useUser();
  const t = createT(preferences.language);

  const filteredSessions = searchQuery.trim()
    ? pilatesSessions.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pilatesSessions;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{t("pilates.searchTitle")}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="pl-10"
              autoFocus
            />
          </div>

          {filteredSessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{t("search.empty")}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => {
                    onOpenChange(false);
                    navigate(`/pilates/${session.slug}`);
                  }}
                  className="w-full bg-card border border-border/50 rounded-xl p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center">
                      <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{session.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {session.calories}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
