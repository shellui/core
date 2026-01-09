export interface NavigationItem {
  label: string;
  path: string;
  url: string;
  icon?: string; // Path to SVG icon file (e.g., '/icons/book-open.svg')
}

export interface ShellUIConfig {
  port?: number;
  title?: string;
  navigation?: NavigationItem[];
  settingsUrl?: string; // URL to display in the settings modal iframe (e.g., 'http://localhost:3000/settings')
}
