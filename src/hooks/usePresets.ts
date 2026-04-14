import { useState, useCallback, useEffect } from "react";

export interface Preset {
  name: string;
  items: string;
}

const STORAGE_KEY = "rp_presets";
const MAX_PRESETS = 10;

function load(): Preset[] {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }, [presets]);

  const save = useCallback((name: string, items: string) => {
    setPresets(prev => {
      const filtered = prev.filter(p => p.name !== name);
      return [{ name, items }, ...filtered].slice(0, MAX_PRESETS);
    });
  }, []);

  const remove = useCallback((name: string) => {
    setPresets(prev => prev.filter(p => p.name !== name));
  }, []);

  return { presets, save, remove };
}
