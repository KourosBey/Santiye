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
              <div className="rounded-xl overflow-hidden shadow-lg bg-white">
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

      {/* Alt satır - Sağdan sola */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex flex-row-reverse">
          {items.map((src, i) => (
            <div
              key={`row2-${i}`}
              className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_25%] p-2"
            >
              <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                <Image
                  src={src}
                  alt={`Showcase ${i}`}
                  width={320}
                  height={240}
                  className="w-full h-32 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}