import { CircleGraph } from "./svg/circle";
import { LineGraph } from "./svg/line";
import { Timeline } from "./svg/timeline";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      <h1 className="text-gray-900 dark:text-white text-lg font-medium tracking-tight mb-4">SVG Draw</h1>

      <div className="flex w-full gap-6 items-start justify-center flex-wrap">
        <CircleGraph />
        <LineGraph />
        <Timeline />
      </div>
    </main>
  );
}
