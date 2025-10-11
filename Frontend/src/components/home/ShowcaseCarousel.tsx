"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import { getShowcaseJobPosts } from "@/scripts/ajaxScript";
import { showcasePost } from "@/types/showcasePost"
import { ShowcaseCard } from "@/components/home/ShowCaseCard"

export default function ShowcaseCarousel() {
  const [showcasePosts, setShowcasePosts] = useState<showcasePost[]>([]);

  useEffect(() => {
      const onSuccess = (res: any) => {
        setShowcasePosts(res.data);
      }
      const onError = () => {
        throw new Error("Veriler yüklenemedi");
      }
      getShowcaseJobPosts({ onSuccess: onSuccess, onError: onError });
  }, []);

  const [emblaRef1] = useEmblaCarousel({ loop: true, direction: "ltr" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  
  const [emblaRef2] = useEmblaCarousel({ loop: true, direction: "rtl" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <div className="space-y-4">
      {/* Üst satır - Soldan sağa */}
      <div className="overflow-hidden" ref={emblaRef1}>
        <div className="flex">
          {showcasePosts.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>

      {/* Alt satır - Sağdan sola */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex flex-row-reverse">
          {showcasePosts.reverse().map((item, i) => (
            <ShowcaseCard key={item.id} item={item} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}