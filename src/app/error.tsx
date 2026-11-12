"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="eyebrow">{"// runtime error"}</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Something went wrong rendering this page.</h1>
        <button onClick={reset} className="focus-ring mt-8 rounded-full bg-electric-500 px-6 py-3 text-sm font-medium text-white">
          Try again
        </button>
      </div>
    </main>
  );
}
