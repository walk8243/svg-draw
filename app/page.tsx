import { CircleGraph } from "./svg/circle";

export default function Home() {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <h1 className="text-gray-900 dark:text-white text-lg font-medium tracking-tight mb-4">SVG Draw</h1>

      <div className="flex flex-col w-full gap-6 items-center">
        <CircleGraph />
      </div>
    </main>
  );
}
