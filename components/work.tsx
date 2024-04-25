"use client"

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { Slide } from "./animation";
import { getWork } from "@/sanity/actions";
import type { WorkType } from "@/sanity/types";
import { formatDate } from "@/utils/date";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { CustomPortableText } from "./custom-portable-text";
import { PortableText } from "@portabletext/react"

export default function Work() {
  const [work, setWork] = useState<WorkType[]>([]);
  const [defaultTabValue, setDefaultTabValue] = useState<string>("");

  useEffect(() => {
    async function fetchWork() {
      const workData = await getWork();
      setWork(workData);

      if (workData.length > 0) {
        console.log("Setting default tab value:", workData[0].companyName);
        setDefaultTabValue(workData[0].companyName);
      }
    }
    console.log("Default tab value:", defaultTabValue);

    fetchWork();
  }, []);

  return (
    <section className="">
      <Slide delay={0.18}>
        {work.length > 0 && (
         <Tabs orientation="vertical" defaultValue={work[0].companyName}>
          <TabsList className="bg-[#1e293b] border border-[#1e293b]">
            {work.map((data) => (
              <TabsTrigger  
                key={data._id} 
                value={data.companyName}
                 
              >
                {data.companyName}
              </TabsTrigger>
            ))}
          </TabsList>
          
         <div className="pt-6">
           {work.map((data) => (
              <TabsContent key={data._id} value={data.companyName}>
                <div className="flex flex-col md:flex-row gap-y-6 w-full">
                  <div className="flex flex-col gap-y-1 items-start md:w-[30%]">
                    <h3 className="text-xl font-semibold">{data.companyName}</h3>
                    <p>{data.jobTitle}</p>
                    <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">{formatDate(data.startDate.toString())} - {data.endDate ? formatDate(data.endDate.toString()) : <span className="dark:text-primary-color text-[green]">Present</span>}</time>  
                  </div>

                  <div className="md:w-[70%] text-zinc-400">
                    <PortableText value={data.jobDescription} components={CustomPortableText} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
       </Tabs> 
        )}
        
      </Slide>
    </section>
  );
}











// import Link from "next/link";
// import Image from "next/image";

// import { Slide } from "./animation";
// import { getWork } from "@/sanity/actions";
// import type { WorkType } from "@/sanity/types";
// import { formatDate } from "@/utils/date";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default async function Work() {
//   const work: WorkType[] = await getWork();

//   return (
//     <section className="">
//       <Slide delay={0.18}>


//         <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
//           {work.map((data) => (
//             <div
//               key={data._id}
//               className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
//             >
//               <Link
//                 href={data.url}
//                 rel="noreferrer noopener"
//                 target="_blank"
//                 className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative"
//               >
//                 <Image
//                   src={data.logo}
//                   className="object-cover duration-300"
//                   alt={`${data.companyName} logo`}
//                   width={50}
//                   height={50}
//                 />
//               </Link>
//               <div className="flex flex-col items-start">
//                 <h3 className="text-xl font-semibold">{data.companyName}</h3>
//                 <p>{data.jobTitle}</p>
//                 <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
//                   {formatDate(data.startDate.toString())} -{" "}
//                   {data.endDate ? (
//                     formatDate(data.endDate.toString())
//                   ) : (
//                     <span className="dark:text-primary-color text-[green]">
//                       Present
//                     </span>
//                   )}
//                 </time>
//                 <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
//                   {data.jobDescription}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Slide>
//     </section>
//   );
// }
