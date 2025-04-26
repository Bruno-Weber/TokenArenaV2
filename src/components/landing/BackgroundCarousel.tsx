
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/2950d86e-9dd7-4535-846a-7965e7cccd45.png",
  "/lovable-uploads/6691d712-a62a-44d3-bbe5-da49ec8e8d51.png",
  "/lovable-uploads/634fb5a1-528a-452b-96aa-7b92c47626f5.png",
  "/lovable-uploads/de9fa12e-365b-4cdd-80e4-6c0160d9b46c.png"
];

const BackgroundCarousel = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Carousel className="w-full h-full" opts={{ 
        loop: true, 
        align: "start",
        duration: 40,
      }}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Imagem de esporte ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BackgroundCarousel;
