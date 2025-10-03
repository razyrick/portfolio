// Common/shared types
// Utility types, enums, and general-purpose interfaces

export type ThemeMode = 'light' | 'dark' | 'system';

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ErrorInfo {
  message: string;
  code?: string | number;
}
