
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/c8fccb8b-88a4-469b-86ae-f671b65b4d93.png",
  "/lovable-uploads/c14e7506-61f2-4521-837d-35c215b6efd5.png",
  "/lovable-uploads/b74c88a8-5db0-44f4-8c24-4da9c058bba4.png",
  "/lovable-uploads/29fa9964-5a45-419f-a938-c29cbeb852ce.png"
];

const BackgroundCarousel = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      <Carousel 
        className="w-full h-full" 
        opts={{ 
          loop: true, 
          align: "start",
          duration: 40,
        }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Imagem de esporte ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BackgroundCarousel;
