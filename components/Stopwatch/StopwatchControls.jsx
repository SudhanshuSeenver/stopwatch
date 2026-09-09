"use client";
import React from "react";

export default function StopwatchControls({
  isRunning,
  onStart,
  onPause,
  onStop,
  onReset,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {!isRunning ? (
        <button
          aria-label="Start"
          onClick={onStart}
          className="min-h-11 rounded-xl bg-[#d7ff65] px-5 py-2 text-sm font-bold tracking-wide text-neutral-950 transition hover:bg-[#e3ff91] active:scale-95"
        >
          START
        </button>
      ) : (
        <button
          aria-label="Pause"
          onClick={onPause}
          className="min-h-11 rounded-xl bg-[#f2c14e] px-5 py-2 text-sm font-bold tracking-wide text-neutral-950 transition hover:bg-[#ffd978] active:scale-95"
        >
          PAUSE
        </button>
      )}
      <button
        aria-label="Stop"
        onClick={onStop}
        className="min-h-11 rounded-xl border border-red-400/20 px-5 py-2 text-sm font-bold tracking-wide text-red-300 transition hover:bg-red-400/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        STOP
      </button>
      <button
        aria-label="Reset"
        onClick={onReset}
        className="min-h-11 rounded-xl border border-red-400/20 px-5 py-2 text-sm font-bold tracking-wide text-red-300 transition hover:bg-red-400/10 active:scale-95"
      >
        RESET
      </button>
    </div>
  );
}
