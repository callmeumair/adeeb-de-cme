'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'adeeb-recently-viewed';
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((s): s is string => typeof s === 'string'));
        }
      }
    } catch {
      // Silently ignore malformed localStorage data
    }
  }, []);

  const addSlug = useCallback((slug: string) => {
    setSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, MAX_ITEMS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Silently ignore storage quota errors
      }

      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSlugs([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silently ignore
    }
  }, []);

  return {
    slugs,
    addSlug,
    clearAll,
  };
}
