import { useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageViewerModalProps {
  title: string;
  src: string;
  alt: string;
  onClose: () => void;
  toolbar?: ReactNode;
  carousel?: {
    index: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onSelect: (index: number) => void;
  };
}

export function ImageViewerModal({
  title,
  src,
  alt,
  onClose,
  toolbar,
  carousel,
}: ImageViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
      if (event.key === 'ArrowLeft') carousel?.onPrev();
      if (event.key === 'ArrowRight') carousel?.onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen, onClose, carousel]);

  const image = (
    <ImageWithFallback
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-contain"
    />
  );

  const navButtons = carousel ? (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          carousel.onPrev();
        }}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-primary/20 z-10"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          carousel.onNext();
        }}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-primary/20 z-10"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>
    </>
  ) : null;

  const dots = carousel ? (
    <div className="shrink-0 flex justify-center gap-2 py-3">
      {Array.from({ length: carousel.total }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => carousel.onSelect(index)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            carousel.index === index ? 'bg-primary w-6' : 'bg-primary/30 w-1.5'
          }`}
          aria-label={`Ir a imagen ${index + 1}`}
        />
      ))}
    </div>
  ) : null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl h-[90dvh] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--color-secondary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b border-primary/20">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">{title}</h2>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Ver en pantalla completa"
                title="Pantalla completa"
              >
                <Maximize2 className="w-5 h-5 text-foreground" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>

          {toolbar}

          <div className="relative flex-1 min-h-0 mx-10 sm:mx-14 my-3">
            {navButtons}
            {image}
          </div>

          {dots}
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[70] bg-black flex flex-col"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              aria-label="Salir de pantalla completa"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div
            className="relative flex-1 min-h-0 mx-10 sm:mx-16 my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {navButtons}
            {image}
          </div>
          {carousel && (
            <div className="shrink-0 flex justify-center gap-2 pb-5" onClick={(e) => e.stopPropagation()}>
              {Array.from({ length: carousel.total }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => carousel.onSelect(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    carousel.index === index ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
