import Stopwatch from "../components/Stopwatch/Stopwatch";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-8 sm:px-8 sm:py-12">
      <header className="mx-auto mb-10 flex w-full max-w-5xl items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d7ff65]">
            Study session
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#f4f1ea] sm:text-4xl">
            Focus, one lap at a time.
          </h1>
        </div>
        <span className="hidden text-right text-xs uppercase tracking-[0.2em] text-neutral-500 sm:block">
          Precise timing
          <br />
          Local only
        </span>
      </header>
      <Stopwatch />
    </main>
  );
}
