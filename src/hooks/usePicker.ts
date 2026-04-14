import { useState, useCallback, useEffect, useRef } from "react";

const STORAGE_KEYS = {
  items: "rp_items",
  noRepeats: "rp_noRepeats",
  removed: "rp_removed",
  history: "rp_history",
};

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function usePicker() {
  const [rawText, setRawText] = useState(() => loadJSON<string>(STORAGE_KEYS.items, ""));
  const [noRepeats, setNoRepeats] = useState(() => loadJSON<boolean>(STORAGE_KEYS.noRepeats, false));
  const [removed, setRemoved] = useState<string[]>(() => loadJSON(STORAGE_KEYS.removed, []));
  const [history, setHistory] = useState<string[]>(() => loadJSON(STORAGE_KEYS.history, []));
  const [result, setResult] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState<string | null>(null);
  const animRef = useRef<number | null>(null);

  // Persist
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(rawText)); }, [rawText]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.noRepeats, JSON.stringify(noRepeats)); }, [noRepeats]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.removed, JSON.stringify(removed)); }, [removed]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history)); }, [history]);

  const allItems = rawText.split("\n").map(s => s.trim()).filter(Boolean);
  const availableItems = noRepeats ? allItems.filter(i => !removed.includes(i)) : allItems;
  const entryCount = allItems.length;

  const pick = useCallback(() => {
    if (availableItems.length === 0 || isAnimating) return;
    setIsAnimating(true);
    const finalIndex = Math.floor(Math.random() * availableItems.length);
    const finalPick = availableItems[finalIndex];

    let step = 0;
    const totalSteps = 15;
    const animate = () => {
      if (step < totalSteps) {
        const randIdx = Math.floor(Math.random() * availableItems.length);
        setDisplayText(availableItems[randIdx]);
        step++;
        const delay = 40 + step * 15;
        animRef.current = window.setTimeout(animate, delay);
      } else {
        setDisplayText(finalPick);
        setResult(finalPick);
        setIsAnimating(false);
        setHistory(prev => [finalPick, ...prev].slice(0, 5));
        if (noRepeats) {
          setRemoved(prev => [...prev, finalPick]);
        }
      }
    };
    animate();
  }, [availableItems, isAnimating, noRepeats]);

  const clearList = useCallback(() => {
    setRawText("");
    setResult(null);
    setDisplayText(null);
    setRemoved([]);
    setHistory([]);
  }, []);

  const resetPicks = useCallback(() => {
    setRemoved([]);
  }, []);

  const loadDemo = useCallback(() => {
    setRawText("Alex\nJordan\nTaylor\nChris\nSam\nMorgan\nCasey\nRiley");
    setRemoved([]);
    setResult(null);
    setDisplayText(null);
  }, []);

  const setItems = useCallback((text: string) => {
    setRawText(text);
    setRemoved([]);
  }, []);

  return {
    rawText, setRawText: setItems, entryCount, availableItems,
    noRepeats, setNoRepeats, removed,
    result, displayText, isAnimating,
    history, pick, clearList, resetPicks, loadDemo,
  };
}
