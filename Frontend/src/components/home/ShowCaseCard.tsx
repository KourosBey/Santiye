import Image from "next/image";
import { useState } from "react";
import { showcasePost } from "@/types/showcasePost";

export function ShowcaseCard({ item, i }: { item: showcasePost, i: number}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      key={item.id}
      className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] p-2"
    >
      <div className="rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-white/40 p-4 flex flex-col justify-center items-center gap-4">
        {item.logo && !imgError ? (
          <Image
            src={item.logo}
            alt={item.company}
            width={360}
            height={220}
            className="w-full h-20 object-contain"
            priority={i === 0}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="h-20 flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-200">
            {item.company.charAt(0)}
          </span>
        )}

        <span className="py-2 px-4 bg-gray-100 border border-gray-200 dark:border-black dark:bg-black/25 rounded-lg text-sm font-medium">
          {item.title}
        </span>
      </div>
    </div>
  );
}
