"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(
  key,
  initial,
  validate = (value) => value,
) {
  const [state, setState] = useState(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(validate(JSON.parse(raw)));
    } catch (e) {
      console.warn("localStorage parse error", e);
    } finally {
      setHydrated(true);
    }
  }, [key, validate]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("localStorage set error", e);
    }
  }, [key, state]);

  return [state, setState];
}
