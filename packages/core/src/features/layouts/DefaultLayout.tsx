import { Link, useLocation, Outlet } from 'react-router-dom';
import { useMemo } from 'react';
import type { NavigationItem } from '../config/types';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface DefaultLayoutProps {
  title?: string;
  navigation: NavigationItem[];
}

// Helper function to get icon component from string name
const getIconComponent = (iconName: string | undefined) => {
  if (!iconName || typeof iconName !== 'string') return null;
  
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  
  // First try the name as-is (in case it's already correct like "BookOpen")
  if (icons[iconName]) {
    return icons[iconName];
  }
  
  // Convert kebab-case or snake_case to PascalCase
  // e.g., "book-open" -> "BookOpen", "book_open" -> "BookOpen"
  const normalizedName = iconName
    .split(/[-_]/)
    .map(part => {
      // Handle already PascalCase parts
      if (part.charAt(0) === part.charAt(0).toUpperCase()) {
        return part;
      }
      // Convert to PascalCase
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
  
  // Try to find the icon with normalized name
  return icons[normalizedName] || null;
};

const NavigationContent = ({ navigation }: { navigation: NavigationItem[] }) => {
  const location = useLocation();

  // Check if at least one navigation item has an icon
  const hasAnyIcons = useMemo(() => {
    return navigation.some(item => getIconComponent(item.icon) !== null);
  }, [navigation]);

  return (
    <SidebarMenu>
      {navigation.map((item) => {
        const pathPrefix = `/${item.path}`;
        const isActive = location.pathname === pathPrefix || location.pathname.startsWith(`${pathPrefix}/`);
        const IconComponent = getIconComponent(item.icon);
        
        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "w-full",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Link to={`/${item.path}`} className="flex items-center gap-2 w-full">
                {IconComponent ? (
                  <IconComponent className="h-4 w-4 shrink-0" />
                ) : hasAnyIcons ? (
                  <span className="h-4 w-4 shrink-0" />
                ) : null}
                <span className="truncate">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export const DefaultLayout = ({ title, navigation }: DefaultLayoutProps) => {

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border pb-4">
            {title && (
              <Link to="/" className="text-lg font-semibold text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors">
                {title}
              </Link>
            )}
          </SidebarHeader>
          
          <SidebarContent>
            <NavigationContent navigation={navigation} />
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-background relative">
          <div className="absolute top-4 left-4 z-[9999]">
            <SidebarTrigger />
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};
