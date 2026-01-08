import { useState, useEffect } from 'react';
import type { ShellUIConfig } from './types';

interface UseConfigReturn {
  config: ShellUIConfig;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to access ShellUI configuration
 * Handles loading and parsing of config injected by Vite
 * @returns {UseConfigReturn} Configuration object and loading state
 */
export function useConfig(): UseConfigReturn {
  const [config, setConfig] = useState({} as ShellUIConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    try {
      // __SHELLUI_CONFIG__ is replaced by Vite at build time
      // @ts-ignore - This is injected by Vite at build time
      if (typeof __SHELLUI_CONFIG__ !== 'undefined') {
        // @ts-ignore - This is injected by Vite at build time
        const configValue = __SHELLUI_CONFIG__;
        // If it's already an object, use it directly
        // Otherwise, parse it if it's a JSON string
        const parsedConfig: ShellUIConfig = typeof configValue === 'string' 
          ? JSON.parse(configValue) 
          : configValue;
        
        setConfig(parsedConfig);
      } else {
        // No config provided, use empty object
        setConfig({});
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to load ShellUI config:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setConfig({});
      setLoading(false);
    }
  }, []);

  return { config, loading, error };
}
