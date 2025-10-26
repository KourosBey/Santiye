"use client";

import { useState, useEffect } from "react";
import { getShowcaseJobPosts } from "@/scripts/ajaxScript";
import type { ShowcasePost } from "@/types/showcasePost";
import { ShowcaseCard } from "@/components/home/ShowCaseCard";

export default function ShowcaseGrid() {
  const [showcasePosts, setShowcasePosts] = useState<ShowcasePost[]>([]);

  useEffect(() => {
    const onSuccess = (res: { data: unknown }) => {
      setShowcasePosts((res.data as ShowcasePost[]).slice(0, 12));
    };
    const onError = () => {
      throw new Error("Veriler yüklenemedi");
    };
    getShowcaseJobPosts({ onSuccess, onError });
  }, []);

  return (
    <div className="w-full">
      <div
        className="
          grid 
          gap-0
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
        "
      >
        {showcasePosts.map((item, i) => (
          <ShowcaseCard key={item.id} item={item} i={i} />
        ))}
      </div>
    </div>
  );
}