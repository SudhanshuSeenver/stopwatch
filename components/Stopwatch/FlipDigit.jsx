"use client";
import React, { useEffect, useRef, useState } from "react";

function Digit({ char, className }) {
  return (
    <div
      className={`w-12 h-14 md:w-16 md:h-18 flex items-center justify-center text-3xl md:text-4xl font-mono ${className}`}
    >
      {char}
    </div>
  );
}

export default function FlipDigit({ digits = "00", label = "", small }) {
  const prevRef = useRef(digits);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== digits) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 250);
      prevRef.current = digits;
      return () => clearTimeout(t);
    }
  }, [digits]);

  return (
    <div className="flex items-end">
      <div className="flip-digit">
        <div
          className={`bg-neutral-900 text-white rounded-md px-2 py-1 shadow-lg flex gap-1 items-center ${small ? "scale-90" : "scale-100"}`}
        >
          {digits.split("").map((d, i) => (
            <div key={i} className="relative">
              <div
                className={`transform transition-transform duration-200 ${flipping ? "rotate-x-180" : ""}`}
              >
                <Digit char={d} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
