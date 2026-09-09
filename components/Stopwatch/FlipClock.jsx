"use client";
import React from "react";

export default function FlipClock({ value }) {
  const { h, m, s } = value;
  return (
    <div
      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-8 shadow-inner sm:gap-4 sm:px-8"
      aria-label={`${h} hours, ${m} minutes, ${s} seconds`}
    >
      <span className="watch-number">{h}</span>
      <span className="watch-separator">:</span>
      <span className="watch-number">{m}</span>
      <span className="watch-separator">:</span>
      <span className="watch-number">{s}</span>
    </div>
  );
}
