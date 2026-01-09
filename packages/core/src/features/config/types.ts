export interface NavigationItem {
  label: string;
  path: string;
  url: string;
  icon?: string;
}

export interface ShellUIConfig {
  port?: number;
  title?: string;
  navigation?: NavigationItem[];
}
