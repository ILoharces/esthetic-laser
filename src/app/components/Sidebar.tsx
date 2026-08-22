import { useCallback, useEffect, useState } from 'react';
import { Home, Images, MapPin, Menu, Newspaper, Sparkles, X } from 'lucide-react';

const SECTION_ITEMS = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'galeria', label: 'Galería', icon: Images },
  { id: 'servicios', label: 'Servicios', icon: Sparkles },
  { id: 'contacto', label: 'Visítanos', icon: MapPin },
] as const;

interface SidebarProps {
  onBookAppointment?: () => void;
  currentPage?: 'home' | 'blog';
}

export function Sidebar({ onBookAppointment, currentPage = 'home' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    currentPage === 'blog' ? 'blog' : 'inicio'
  );

  const close = useCallback(() => setIsOpen(false), []);

  const goHomeSection = useCallback((id: string) => {
    if (currentPage === 'home') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsOpen(false);
      return;
    }
    window.location.href = `/#${id}`;
  }, [currentPage]);

  const goBlog = useCallback(() => {
    if (currentPage === 'blog' && window.location.pathname.startsWith('/blog')) {
      if (window.location.pathname !== '/blog' && window.location.pathname !== '/blog/') {
        window.location.href = '/blog';
        return;
      }
      setIsOpen(false);
      return;
    }
    window.location.href = '/blog';
  }, [currentPage]);

  const goReserve = useCallback(() => {
    close();
    if (onBookAppointment) {
      onBookAppointment();
      return;
    }
    window.location.href = '/?reservar=1';
  }, [close, onBookAppointment]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75] }
    );

    SECTION_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white shadow-lg border border-primary/20 flex items-center justify-center transition-all duration-300"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        aria-controls="site-sidebar"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-55 bg-black/40 backdrop-blur-xs animate-fade-in"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        id="site-sidebar"
        className={`fixed inset-y-0 left-0 z-60 w-72 sm:w-80 flex flex-col shadow-2xl border-r border-primary/15 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-secondary)' }}
        aria-hidden={!isOpen}
      >
        <div className="px-6 pt-20 pb-6 border-b border-primary/10">
          <p className="text-xl font-bold text-primary tracking-tight">Esthetic Laser</p>
          <p className="text-sm text-muted-foreground mt-1">Estética profesional en Pamplona</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1" aria-label="Secciones de la web">
          {SECTION_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = currentPage === 'home' && activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => goHomeSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-primary/10'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={goBlog}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              currentPage === 'blog'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground hover:bg-primary/10'
            }`}
            aria-current={currentPage === 'blog' ? 'page' : undefined}
          >
            <Newspaper className="w-5 h-5 shrink-0" />
            <span className="font-medium">Blog</span>
          </button>
        </nav>

        <div className="px-4 pb-6 pt-4 border-t border-primary/10">
          <button type="button" className="btn-primary w-full" onClick={goReserve}>
            Reservar Cita
          </button>
        </div>
      </aside>
    </>
  );
}
