import { useState, useEffect } from 'react';

type ImageSrc = string | { src: string };

function resolveSrc(src: ImageSrc): string {
  return typeof src === 'string' ? src : src.src;
}

interface ImageWithFallbackProps {
  src: ImageSrc;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  cacheBust?: boolean;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible',
  cacheBust = false
}: ImageWithFallbackProps) {
  const resolved = resolveSrc(src);
  const [imgSrc, setImgSrc] = useState(resolved);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    
    // Add cache-busting parameter if enabled
    if (cacheBust && resolved) {
      try {
        const url = new URL(resolved, window.location.origin);
        // Cloudinary URLs - add cache busting parameter
        url.searchParams.set('_cb', Date.now().toString());
        setImgSrc(url.toString());
      } catch (e) {
        // If URL parsing fails, use src as is
        setImgSrc(resolved);
      }
    } else {
      setImgSrc(resolved);
    }
  }, [resolved, cacheBust]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      key={imgSrc}
    />
  );
}

