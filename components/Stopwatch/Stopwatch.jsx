"use client";
import React, { useEffect, useRef, useState } from "react";
import useStopwatch from "../../hooks/useStopwatch";
import FlipClock from "./FlipClock";
import StopwatchControls from "./StopwatchControls";
import LapModal from "./LapModal";
import LapList from "./LapList";
import ConfirmModal from "./ConfirmModal";
import { formatSplit } from "../../lib/stopwatch";

export default function Stopwatch() {
  const {
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
  } = useStopwatch();
  const [display, setDisplay] = useState(formatSplit(0));
  const rafRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const pendingLap = useRef(null);
  const [editingLap, setEditingLap] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  useEffect(() => {
    function loop() {
      const val = elapsedRef.current;
      setDisplay(formatSplit(val));
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [elapsedRef]);

  useEffect(() => {
    function onKey(e) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        store.stopwatch.isRunning ? pause() : start();
      }
      if (e.key.toLowerCase() === "l") {
        handleLap();
      }
      if (e.key.toLowerCase() === "r") {
        handleReset();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [store, pause, start]);

  function handleLap(resetAfterSave = false) {
    if (store.stopwatch.isRunning) pause();
    pendingLap.current = {
      previous: store.laps.length ? store.laps[0].elapsed : 0,
      resetAfterSave,
    };
    setEditingLap(null);
    setModalOpen(true);
  }

  function saveLap(name) {
    if (editingLap) {
      renameLap(editingLap.id, name);
      setEditingLap(null);
      setModalOpen(false);
      return;
    }
    const lapData = pendingLap.current;
    if (!lapData) return;
    const elapsed = snapshot();
    addLap({
      name,
      elapsed,
      duration: elapsed - lapData.previous,
    });
    if (lapData.resetAfterSave) reset();
    pendingLap.current = null;
    setModalOpen(false);
  }

  function cancelLap() {
    pendingLap.current = null;
    setEditingLap(null);
    setModalOpen(false);
  }

  function handleRename(lap) {
    if (store.stopwatch.isRunning) pause();
    pendingLap.current = null;
    setEditingLap(lap);
    setModalOpen(true);
  }

  function handleReset() {
    setResetConfirmOpen(true);
  }

  function handleStop() {
    handleLap(true);
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
      <div className="relative flex w-full items-center justify-center">
        <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-[#1a1d1c] p-4 shadow-2xl sm:p-8">
          <FlipClock value={display} />
          <div className="mt-6 flex justify-center">
            <StopwatchControls
              isRunning={store.stopwatch.isRunning}
              onStart={start}
              onPause={pause}
              onStop={handleStop}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <LapList
          laps={store.laps}
          onDelete={deleteLap}
          onClear={clearLaps}
          onRename={handleRename}
        />
      </div>

      <LapModal
        open={modalOpen}
        initialName={editingLap ? editingLap.name : ""}
        onSave={saveLap}
        onCancel={cancelLap}
      />
      <ConfirmModal
        open={resetConfirmOpen}
        title="Reset stopwatch?"
        message="The timer will return to zero. Your saved laps will remain."
        confirmLabel="Reset Timer"
        onCancel={() => setResetConfirmOpen(false)}
        onConfirm={() => {
          reset();
          setResetConfirmOpen(false);
        }}
      />
    </div>
  );
}
