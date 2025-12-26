import React, { useState, useRef, useEffect } from 'react';

const Paper = ({ 
  id, 
  x, 
  y, 
  width, 
  height, 
  color, 
  children, 
  zIndex, 
  onDrag,
  rotation = 0
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const paperRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      
      // Add slight rotation based on movement
      const rotationChange = (e.clientX - offset.x) * 0.05;
      setCurrentRotation(rotation + rotationChange * 0.1);
      
      setPosition({ x: newX, y: newY });
      if (onDrag) {
        onDrag(id, newX, newY, currentRotation);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset, id, onDrag, rotation]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  return (
    <div
      ref={paperRef}
      className="absolute cursor-grab active:cursor-grabbing transition-all duration-300 ease-out paper-shadow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        zIndex: isDragging ? 1000 : zIndex,
        transform: `rotate(${currentRotation}deg)`,
        borderRadius: '2px',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

export default Paper;