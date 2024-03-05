import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";

export default function EmptyState({ value }: {value : string}) {
  return (
    <div className="w-full flex flex-col items-center text-center rounded-md px-6 py-8">
      <div className="mb-6 text-4xl text-zinc-500">
        <Image
          width={80}
          height={80}
          src={duckImage}
          alt="Yellow duck searching"
        />
      </div>
      <h3 className="font-bold tracking-tight text-xl mb-3">
        No {value} Found
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 ml-4 max-w-xs">
        There are no {value.toLowerCase()} available at this time. Check back
        again.
      </p>
    </div>
  );
}