'use client';
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function CarouselCustomNavigation({ list }) {
  return (
    <Carousel
      autoplay
      loop
      className="bg-black"
      navigation={({ setActiveIndex, activeIndex }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {list?.length > 0 && list?.map((_, i) => (
            <button
              key={i}
              className={`block h-1 w-4 cursor-pointer rounded-2xl transition-all ${activeIndex === i ? "bg-white w-8" : "bg-white/50"
                }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    >
      {list?.length > 0 && list?.map((item, i) => (
        <Link href={item.link} key={i} target="_blank" className="h-full w-full">
          <Image
            width={5000}
            height={5000}
            key={i}
            src={item.img}
            alt={"image_" + i}
            className="h-full w-full object-contain"
          />
        </Link>
      ))}
    </Carousel>
  );
}