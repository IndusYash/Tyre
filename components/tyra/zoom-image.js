'use client';

import { useRef, useState } from 'react';

// A luxury image display with a magnifier lens on hover.
// Falls back gracefully on touch devices.
export function ZoomImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  lensSize = 180,
  zoomLevel = 2.6,
  padding = 32,
}) {
  const wrapperRef = useRef(null);
  const [lens, setLens] = useState({ show: false, x: 0, y: 0, w: 0, h: 0 });

  const onMove = (e) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    setLens({ show: true, x, y, w: rect.width, h: rect.height });
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setLens((l) => ({ ...l, show: false }))}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain ${imgClassName}`}
        style={{ padding }}
        draggable={false}
      />
      {lens.show && (
        <div
          className="zoom-lens hidden md:block"
          style={{
            width: lensSize,
            height: lensSize,
            left: lens.x - lensSize / 2,
            top: lens.y - lensSize / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * zoomLevel}px ${lens.h * zoomLevel}px`,
            backgroundPosition: `${-((lens.x / lens.w) * (lens.w * zoomLevel - lensSize))}px ${-((lens.y / lens.h) * (lens.h * zoomLevel - lensSize))}px`,
            backgroundColor: '#FCF8F0',
          }}
        />
      )}
    </div>
  );
}
