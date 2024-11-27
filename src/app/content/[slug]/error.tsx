'use client';
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-6xl font-bold">Error</h1>
      <p className="mt-4">Something went wrong.</p>
      <button className="mt-8 bg-black/[.05] dark:bg-white/[.06] px-4 py-2 rounded" onClick={() => window.history.back()}>Go back</button>
    </div>
  );
}
