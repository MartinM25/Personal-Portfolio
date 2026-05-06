export default function ProjectLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="w-full aspect-16/7 bg-pg-surface animate-pulse" />

      <div className="max-w-300 mx-auto px-[clamp(24px,7vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]
                        gap-[clamp(40px,5vw,72px)]
                        py-[clamp(48px,7vw,80px)]
                        items-start">

          {/* Left skeleton */}
          <div className="flex flex-col gap-10">
            {/* Tags */}
            <div>
              <div className="flex gap-2 mb-5">
                {[80, 100, 70].map((w, i) => (
                  <div key={i}
                    className="h-5.5 rounded-[2px] bg-pg-surface animate-pulse"
                    style={{ width: w }}
                  />
                ))}
              </div>
              {/* Title */}
              <div className="h-[clamp(2rem,6vw,4rem)] w-3/4 rounded-[3px]
                              bg-pg-surface animate-pulse mb-3" />
              <div className="h-[clamp(2rem,6vw,4rem)] w-1/2 rounded-[3px]
                              bg-pg-surface animate-pulse mb-6" />
              {/* Buttons */}
              <div className="flex gap-3">
                <div className="h-11 w-32 rounded-[2px] bg-pg-surface animate-pulse" />
                <div className="h-11 w-28 rounded-[2px] bg-pg-surface animate-pulse" />
              </div>
            </div>

            {/* Text blocks */}
            {[1, 2, 3].map(b => (
              <div key={b} className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-pg-surface animate-pulse rounded mb-4" />
                <div className="h-4 w-full bg-pg-surface animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-pg-surface animate-pulse rounded" />
                <div className="h-4 w-4/6 bg-pg-surface animate-pulse rounded" />
              </div>
            ))}

            {/* Screenshots placeholder */}
            <div>
              <div className="h-3 w-24 bg-pg-surface animate-pulse rounded mb-4" />
              <div className="aspect-video w-full bg-pg-surface animate-pulse
                              rounded-lg mb-3" />
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i}
                    className="aspect-9/16 bg-pg-surface animate-pulse rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="border border-pg-border rounded-lg overflow-hidden">
            <div className="h-10 bg-pg-surface border-b border-pg-border animate-pulse" />
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i}
                className="flex justify-between items-center px-4 py-3
                           border-b border-pg-border last:border-b-0">
                <div className="h-3 w-16 bg-pg-surface animate-pulse rounded" />
                <div className="h-3 w-20 bg-pg-surface animate-pulse rounded" />
              </div>
            ))}
            <div className="h-10 bg-pg-surface border-t border-pg-border animate-pulse" />
            {[1, 2, 3, 4].map(i => (
              <div key={i}
                className="flex justify-between items-center px-4 py-3
                           border-b border-pg-border last:border-b-0">
                <div className="h-3 w-14 bg-pg-surface animate-pulse rounded" />
                <div className="h-3 w-24 bg-pg-surface animate-pulse rounded" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
