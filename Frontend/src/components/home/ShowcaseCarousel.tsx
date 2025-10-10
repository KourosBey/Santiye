"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ShowcaseCarousel() {
  const [emblaRef1] = useEmblaCarousel({ loop: true, direction: "ltr" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  
  const [emblaRef2] = useEmblaCarousel({ loop: true, direction: "rtl" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const items = [
    "/images/logos/techcorp.png",
    "/images/logos/lego-logo.png",
    "/images/logos/creative-studio.png",
    "/images/logos/adidas-logo.png",
    "/images/logos/teknosa-logo.png",
    "/images/logos/techcorp.png",
    "/images/logos/lego-logo.png",
    "/images/logos/creative-studio.png",
    "/images/logos/adidas-logo.png",
    "/images/logos/teknosa-logo.png",
  ];

  return (
    <div className="space-y-4">
      {/* Üst satır - Soldan sağa */}
      <div className="overflow-hidden" ref={emblaRef1}>
        <div className="flex">
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] p-2"
            >
              <div className="rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-white/10 p-4 flex flex-col justify-center items-center gap-4">
                <Image
                  src={src}
                  alt={`Showcase ${i}`}
                  width={240}
                  height={160}
                  className="w-full h-24 object-contain"
                  priority={i === 0}
                />
                <span className="py-2 px-4 bg-gray-100 border border-gray-200 dark:border-black dark:bg-black/25 rounded-lg text-sm font-medium">İş arkadaşları arıyor</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alt satır - Sağdan sola */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex flex-row-reverse">
          {items.map((src, i) => (
            <div
              key={`row2-${i}`}
              className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] p-2"
            >
              <div className="rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-white/10 p-4 flex flex-col justify-center items-center gap-4">
                <Image
                  src={src}
                  alt={`Showcase ${i}`}
                  width={240}
                  height={160}
                  className="w-full h-24 object-contain"
                />
                <span className="py-2 px-4 bg-gray-100 border border-gray-200 dark:border-black dark:bg-black/25 rounded-lg text-sm font-medium">İş arkadaşları arıyor</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}