import { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
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
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    
    // Add cache-busting parameter if enabled
    if (cacheBust && src) {
      try {
        const url = new URL(src);
        // Cloudinary URLs - add cache busting parameter
        url.searchParams.set('_cb', Date.now().toString());
        setImgSrc(url.toString());
      } catch (e) {
        // If URL parsing fails, use src as is
        setImgSrc(src);
      }
    } else {
      setImgSrc(src);
    }
  }, [src, cacheBust]);

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

