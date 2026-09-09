"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const STORAGE_KEY = "stopwatch_v1";
const INITIAL_STORE = {
  version: 1,
  stopwatch: {
    accumulated: 0,
    startTimestamp: null,
    isRunning: false,
  },
  laps: [],
};

function validateStore(value) {
  if (
    !value ||
    value.version !== 1 ||
    !value.stopwatch ||
    !Array.isArray(value.laps)
  ) {
    return INITIAL_STORE;
  }

  const { accumulated, startTimestamp, isRunning } = value.stopwatch;
  if (
    !Number.isFinite(accumulated) ||
    (startTimestamp !== null && !Number.isFinite(startTimestamp)) ||
    typeof isRunning !== "boolean"
  ) {
    return INITIAL_STORE;
  }

  return {
    version: 1,
    stopwatch: { accumulated, startTimestamp, isRunning },
    laps: value.laps.filter(
      (lap) =>
        lap &&
        typeof lap.id === "string" &&
        typeof lap.name === "string" &&
        Number.isFinite(lap.elapsed) &&
        Number.isFinite(lap.duration),
    ),
  };
}

function now() {
  return Date.now();
}

export default function useStopwatch() {
  const [store, setStore] = useLocalStorage(
    STORAGE_KEY,
    INITIAL_STORE,
    validateStore,
  );

  const rafRef = useRef(null);
  const lastTick = useRef(now());
  const elapsedRef = useRef(0);
  const [, setTick] = useState(0);

  const getElapsed = useCallback(() => {
    const s = store.stopwatch;
    if (s.isRunning && s.startTimestamp) {
      return s.accumulated + (now() - s.startTimestamp);
    }
    return s.accumulated;
  }, [store]);

  useEffect(() => {
    elapsedRef.current = getElapsed();
  }, [getElapsed]);

  useEffect(() => {
    function frame() {
      const t = now();
      const dt = t - lastTick.current;
      lastTick.current = t;
      elapsedRef.current = getElapsed();
      setTick((n) => (n + 1) % 100000);
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [getElapsed]);

  const start = useCallback(() => {
    setStore((s) => {
      if (s.stopwatch.isRunning) return s;
      return {
        ...s,
        stopwatch: {
          ...s.stopwatch,
          isRunning: true,
          startTimestamp: now(),
        },
      };
    });
  }, [setStore]);

  const pause = useCallback(() => {
    setStore((s) => {
      if (!s.stopwatch.isRunning) return s;
      const elapsed =
        s.stopwatch.accumulated + (now() - s.stopwatch.startTimestamp);
      return {
        ...s,
        stopwatch: {
          accumulated: elapsed,
          startTimestamp: null,
          isRunning: false,
        },
      };
    });
  }, [setStore]);

  const reset = useCallback(() => {
    setStore((s) => ({
      ...s,
      stopwatch: { accumulated: 0, startTimestamp: null, isRunning: false },
    }));
  }, [setStore]);

  const snapshot = useCallback(() => {
    return getElapsed();
  }, [getElapsed]);

  const addLap = useCallback(
    (lap) => {
      setStore((s) => {
        const next = {
          id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
          number: s.laps.length + 1,
          name: lap.name,
          elapsed: lap.elapsed,
          duration: lap.duration,
          createdAt: Date.now(),
        };
        return { ...s, laps: [next, ...s.laps] };
      });
    },
    [setStore],
  );

  const deleteLap = useCallback(
    (id) => {
      setStore((s) => ({
        ...s,
        laps: s.laps
          .filter((l) => l.id !== id)
          .map((l, i) => ({ ...l, number: s.laps.length - i - 1 })),
      }));
    },
    [setStore],
  );

  const clearLaps = useCallback(() => {
    setStore((s) => ({ ...s, laps: [] }));
  }, [setStore]);

  const renameLap = useCallback(
    (id, name) => {
      setStore((s) => ({
        ...s,
        laps: s.laps.map((l) => (l.id === id ? { ...l, name } : l)),
      }));
    },
    [setStore],
  );

  return {
    store,
    elapsedRef,
    start,
    pause,
    reset,
    snapshot,
    addLap,
    deleteLap,
    clearLaps,
    renameLap,
  };
}
