
import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const handleConfetti = (event: CustomEvent) => {
      const { x, y } = event.detail;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
          x: x / window.innerWidth, 
          y: y / window.innerHeight 
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'],
      });
    };

    // Add event listener
    window.addEventListener('triggerConfetti', handleConfetti as EventListener);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('triggerConfetti', handleConfetti as EventListener);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 100
      }} 
    />
  );
};

export default Confetti;
