
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/084ee4bc-0d55-483e-a621-b27275889446.png",
  "/lovable-uploads/1e691277-1cdd-4566-a409-1d1a15740b74.png",
  "/lovable-uploads/70d2e87c-8ddb-4295-a669-e43c17a409cd.png",
  "/lovable-uploads/8d5523a0-6060-424a-b0a8-fff1555ab27e.png",
  "/lovable-uploads/961ed993-263c-4b01-b82a-d1bfa3989617.png",
  "/lovable-uploads/a72c4e1b-602c-431c-b2f3-9b01473dd103.png"
];

const BackgroundCarousel = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Carousel className="w-full h-full" opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Sport image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BackgroundCarousel;
