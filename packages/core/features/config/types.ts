export interface NavigationItem {
  label: string;
  path: string;
  url: string;
}

export interface ShellUIConfig {
  port?: number;
  title?: string;
  navigation?: NavigationItem[];
}
