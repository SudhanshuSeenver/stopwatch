"use client";
import React from "react";
import { formatDuration } from "../../lib/stopwatch";
import ConfirmModal from "./ConfirmModal";

function LapRow({ lap, onDelete, onRename, onRequestDelete }) {
  return (
    <div className="p-3 border-b border-neutral-800 flex justify-between items-start">
      <div>
        <div className="font-mono text-sm text-neutral-300">
          {String(lap.number).padStart(2, "0")}
        </div>
        <div className="font-semibold">{lap.name}</div>
        <div className="text-xs text-neutral-400">
          {formatDuration(lap.elapsed)}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-neutral-300">
          Lap duration: {formatDuration(lap.duration)}
        </div>
        <div className="mt-2 flex gap-2 justify-end">
          <button
            className="rounded-lg bg-neutral-700 px-2 py-1 text-xs"
            onClick={() => onRename(lap)}
          >
            Rename
          </button>
          <button
            className="rounded-lg bg-red-600 px-2 py-1 text-xs"
            onClick={() => onRequestDelete(lap)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LapList({ laps = [], onDelete, onClear, onRename }) {
  const [deletingLap, setDeletingLap] = React.useState(null);

  return (
    <>
      <div className="bg-neutral-900 rounded-lg shadow-inner">
        <div className="p-4 flex items-center justify-between border-b border-neutral-800">
          <div className="font-semibold">Lap History</div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-neutral-400">{laps.length} laps</div>
            <button
              className="px-3 py-1 bg-red-600 rounded"
              onClick={() => {
                if (
                  laps.length &&
                  confirm("Clear all laps? This cannot be undone.")
                )
                  onClear();
              }}
            >
              Clear All
            </button>
          </div>
        </div>
        {laps.length === 0 ? (
          <div className="p-6 text-center text-neutral-400">
            No laps yet — start the stopwatch and record your first lap.
          </div>
        ) : (
          <div>
            {laps.map((lap, i) => (
              <LapRow
                key={lap.id}
                lap={lap}
                onDelete={onDelete}
                onRename={onRename}
                onRequestDelete={setDeletingLap}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        open={Boolean(deletingLap)}
        title="Delete this lap?"
        message="This action cannot be undone."
        confirmLabel="Delete Lap"
        onCancel={() => setDeletingLap(null)}
        onConfirm={() => {
          onDelete(deletingLap.id);
          setDeletingLap(null);
        }}
      />
    </>
  );
}
