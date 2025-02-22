/// <reference lib="webworker" />

interface GridCalculationParams {
  containerWidth: number;
  containerHeight: number;
  imageSize: number;
  totalImages: number;
}

interface GridPosition {
  xPos: number;
  yPos: number;
  xOffset: number;
  yOffset: number;
  animationDelay: number;
  animationDuration: number;
}

addEventListener('message', ({ data }: MessageEvent<GridCalculationParams>) => {
  const { containerWidth, containerHeight, imageSize, totalImages } = data;
  
  const columns = Math.ceil(containerWidth / (imageSize * 1.2));
  const rows = Math.ceil(containerHeight / (imageSize * 1.2));
  const totalCells = columns * rows;
  
  const positions: GridPosition[] = [];
  
  for (let i = 0; i < totalCells; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const xPos = col * imageSize * 1.2;
    const yPos = row * imageSize * 1.2;
    
    const randomOffset = imageSize * 0.25;
    const xOffset = (Math.random() - 0.5) * randomOffset;
    const yOffset = (Math.random() - 0.5) * randomOffset;
    
    positions.push({
      xPos,
      yPos,
      xOffset,
      yOffset,
      animationDelay: Math.random() * 8, // Increased delay for more variation
      animationDuration: 5 + Math.random() * 4 // Slower animation (5-9 seconds)
    });
  }
  
  postMessage(positions);
}); 