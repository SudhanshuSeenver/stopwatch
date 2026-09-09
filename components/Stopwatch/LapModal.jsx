"use client";
import React, { useEffect, useRef, useState } from "react";

export default function LapModal({ open, initialName = "", onSave, onCancel }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setError("");
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    }
  }, [open, initialName]);

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter a name for this lap.");
      return;
    }
    onSave(trimmed);
  }

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
      if (e.key === "Escape") {
        onCancel();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, name, onSave, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#202322] p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lap-modal-title"
      >
        <h3 id="lap-modal-title" className="mb-2 text-xl font-semibold">
          {initialName ? "Rename lap" : "Name this lap"}
        </h3>
        <label
          htmlFor="lap-name"
          className="mb-2 block text-sm text-neutral-400"
        >
          What are you working on?
        </label>
        <input
          id="lap-name"
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="e.g. Number System Lecture 1"
          aria-describedby={error ? "lap-name-error" : undefined}
          aria-invalid={Boolean(error)}
          className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 outline-none transition focus:border-[#d7ff65]"
        />
        {error && (
          <p id="lap-name-error" className="mt-2 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-3 py-2 text-sm text-neutral-300 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="rounded-lg bg-[#d7ff65] px-3 py-2 text-sm font-semibold text-neutral-950 hover:bg-[#e3ff91]"
          >
            Save Lap
          </button>
        </div>
      </div>
    </div>
  );
}
