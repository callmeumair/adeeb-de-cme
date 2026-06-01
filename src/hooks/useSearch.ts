'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Product } from '@/types';

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: Product[];
  loading: boolean;
  error: string | null;
  clearResults: () => void;
}

export function useSearch(debounceMs: number = 400): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ q: searchQuery.trim() });
      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: { products: Product[] } = await response.json();
      setResults(data.products);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Request was cancelled, ignore
        return;
      }
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      fetchResults(query);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debounceMs, fetchResults]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clearResults = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setLoading(false);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults,
  };
}
