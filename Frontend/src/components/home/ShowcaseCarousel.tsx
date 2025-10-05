"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function ShowcaseCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  const items = [
    "/images/logos/techcorp.png",
    "/images/logos/creative-studio.png",
    "/images/logos/techcorp.png",
    "/images/logos/creative-studio.png",
    "/images/logos/techcorp.png",
    "/images/logos/creative-studio.png",
    "/images/logos/techcorp.png",
    "/images/logos/creative-studio.png",
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((src, i) => (
          <div
            key={i}
            className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] p-2"
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`Showcase ${i}`}
                width={320}
                height={240}
                className="w-full h-32 object-contain"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
