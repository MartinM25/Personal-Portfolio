"use client"

import { formatDate } from "@/utils/date";
import { getWork } from "@/sanity/actions";
import type { WorkType } from "@/sanity/types";
import { PortableText } from "@portabletext/react";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomPortableText } from "./custom-portable-text";

export default function Work() {
  const [work, setWork] = useState<WorkType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWork() {
      const workData = await getWork();
      setWork(workData);

      if (workData.length > 0) {
        setActiveTab(workData[0].companyName);
      }
      setLoading(false);
    }

    fetchWork();
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeTabElement = document.querySelector(`.tab.active`);
      if (activeTabElement && tabsRef.current) {
        const { offsetLeft, offsetWidth } = activeTabElement as HTMLButtonElement;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab, work]);

  return (
    <section className="mx-auto w-full">
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-8 bg-slate-800 w-[75%]" />

          <div className="flex lg:flex-row space-x-4">
            <div className="md:w-[30%] space-y-4">
              <Skeleton className="h-5 bg-slate-800" />
              <Skeleton className="h-5 bg-slate-800" />
              <Skeleton className="h-5 bg-slate-800" />
            </div>
            <div className="md:w-[70%]">
              <Skeleton className="h-24 bg-slate-800" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={tabsRef} className="relative overflow-x-auto">
            <div className="flex border-b-2 border-[#1e293b] ">
              {work.map((data) => (
                <button
                  key={data._id}
                  className={`tab px-4 py-2 cursor-pointer text-zinc-500 transition-colors duration-300 ease-in-out hover:bg-[#1e293b] ${activeTab === data.companyName ? "bg-[#1e293b] text-white active" : ""
                    }`}
                  onClick={() => setActiveTab(data.companyName)}
                >
                  {data.companyName}
                </button>
              ))}
              {/* Sliding Indicator */}
              <div
                className="absolute bottom-0 h-[2px]  bg-[#c55545] transition-all duration-300 ease"
                style={indicatorStyle}
              />
            </div>
          </div>

          <div className="pt-6">
            {work.map((data) => (
              activeTab === data.companyName && (
                <div key={data._id} className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-col gap-1 items-start md:w-[30%]">
                    <h3 className="text-xl font-semibold">{data.companyName}</h3>
                    <p>{data.jobTitle}</p>
                    <time className="mt-2 text-sm tracking-widest uppercase text-zinc-500">
                      {formatDate(data.startDate.toString())} - {data.endDate ? formatDate(data.endDate.toString()) : <span className="text-[green] dark:text-primary-color">Present</span>}
                    </time>
                  </div>

                  <div className="md:w-[70%] text-zinc-400">
                    <PortableText value={data.jobDescription} components={CustomPortableText} />
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      )
      }
    </section >
  );
}
