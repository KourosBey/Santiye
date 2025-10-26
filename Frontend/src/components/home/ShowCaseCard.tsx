import Image from "next/image";
import { useState } from "react";
import type { ShowcasePost } from "@/types/showcasePost";

export function ShowcaseCard({ item, i }: { item: ShowcasePost; i: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      key={item.id}
      className="
        w-full 
        aspect-square
        p-2
        cursor-pointer
      "
      title={`${item.company} - ${item.title}`}
    >
      <div
        className="
          w-full h-full
          rounded-xl overflow-hidden shadow-md
          bg-white/90 dark:bg-white/40
          flex flex-col justify-center gap-2 items-center
          p-4 text-center
          transition-all duration-200 hover:shadow-xl hover:scale-[1.02]
        "
      >
        {/* Logo veya fallback */}
        <div className="flex justify-center items-center h-20">
          {item.logo && !imgError ? (
            <Image
              src={item.logo}
              alt={item.company}
              width={160}
              height={80}
              className="max-h-20 w-auto object-contain"
              priority={i === 0}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-gray-200">
              {item.company.charAt(0)}
            </span>
          )}
        </div>

        {/* Başlık */}
        <span className="mt-2 py-2 px-3 bg-gray-100 border border-gray-200 dark:border-black dark:bg-black/25 rounded-lg text-xs sm:text-sm font-medium truncate w-full">
          {item.title}
        </span>
      </div>
    </div>
  );
}