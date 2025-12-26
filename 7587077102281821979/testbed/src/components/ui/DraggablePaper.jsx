import React, { useState, useEffect } from 'react';

const DraggablePaper = ({ id, x, y, rotation, zIndex, imageSrc, onDrag, onFocus }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default drag behavior of images
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
    if (onFocus) onFocus(id);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        onDrag(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onDrag]);

  return (
    <div
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        zIndex: zIndex,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <img 
        src={imageSrc} 
        alt="Paper Element" 
        className="w-[160px] md:w-[220px] lg:w-[300px] h-auto pointer-events-none"
        draggable="false"
      />
    </div>
  );
};

export default DraggablePaper;
