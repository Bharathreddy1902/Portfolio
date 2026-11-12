import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="eyebrow">{"// 404"}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">This route isn&apos;t in the graph.</h1>
        <Link href="/" className="focus-ring mt-8 inline-block rounded-full bg-electric-500 px-6 py-3 text-sm font-medium text-white">
          Back to home
        </Link>
      </div>
    </main>
  );
}
