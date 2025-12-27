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
  onDragEnd,
  rotation = 0
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const paperRef = useRef(null);

  // Refs for values needed in event handlers to avoid re-binding
  const positionRef = useRef({ x, y });
  const offsetRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(rotation);

  // Sync refs when props/state change
  useEffect(() => {
    positionRef.current = { x, y };
  }, [x, y]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    rotationRef.current = currentRotation;
  }, [currentRotation]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;
      
      // Add slight rotation based on movement
      const rotationChange = (e.clientX - offsetRef.current.x) * 0.05;
      const newRotation = rotation + rotationChange * 0.1;
      
      setCurrentRotation(newRotation);
      setPosition({ x: newX, y: newY });
      // Removed onDrag call to prevent excessive re-renders
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (onDragEnd) {
          onDragEnd(id, positionRef.current.x, positionRef.current.y, rotationRef.current);
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onDragEnd, rotation]); // Removed position and currentRotation dependencies

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  return (
    <div
      ref={paperRef}
      className="absolute cursor-grab active:cursor-grabbing transition-shadow duration-300 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        zIndex: isDragging ? 9999 : zIndex,
        transform: `rotate(${currentRotation}deg)`,
        borderRadius: '2px',
        touchAction: 'none',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default Paper;
