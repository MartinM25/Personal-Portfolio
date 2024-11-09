"use client"

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Image from 'next/image';

type Image = {
  alt: string;
  image: string;
}

type ImageCarouselProps = {
  images: Image[];
};



const ImageCarousel = ({ images }: ImageCarouselProps) => {
  
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-[80%] mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[350px] overflow-hidden bg-[#1e293b] rounded">
                <Image
                  className="rounded-xl object-contain"
                  layout="fill"
                  src={image.image}
                  alt={image.alt}
                  quality={100}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="pt-1 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </>
  )
}

export default ImageCarousel

