import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ImageViewerModal } from './components/ImageViewerModal';
import { Sidebar } from './components/Sidebar';
import { SITE } from '../lib/site';
// Import local images
import presoterapiaImg from './resources/presoterapia.jpg';
import valentinImg from './resources/valentin.jpg';

import carrusel1Img from './resources/fotocarrusel1.jpeg';
import carrusel2Img from './resources/fotocarrusel2.jpeg';
import carrusel3Img from './resources/fotocarrusel3.jpeg';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPresoterapiaModalOpen, setIsPresoterapiaModalOpen] = useState(false);
  const [isHydrofaceModalOpen, setIsHydrofaceModalOpen] = useState(false);
  const [isValentinModalOpen, setIsValentinModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chico' | 'chica'>('chica');
  const [presoterapiaImageKey, setPresoterapiaImageKey] = useState(Date.now());
  const [hydrofaceImageKey, setHydrofaceImageKey] = useState(Date.now());
  const [depilacionImageKey, setDepilacionImageKey] = useState(Date.now());
  const [valentinImageKey, setValentinImageKey] = useState(Date.now());
  const [ofertasImageIndex, setOfertasImageIndex] = useState(0);

  const ofertasImages = [
    'https://res.cloudinary.com/dlddss5wv/image/upload/v1771521073/main-sample.jpg',
    'https://res.cloudinary.com/dlddss5wv/image/upload/v1771952041/main-sample_tlvkuc.png',
  ];
  // Imagen fiable para la tarjeta de Ofertas cuando no es San Valentín (Unsplash CDN)
  const ofertasCardImage =
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1080&q=80&fit=crop';

  // Carousel state
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [emblaApi]);

  const carouselImages = [
    carrusel1Img,
    carrusel2Img,
    carrusel3Img,
  ];

  // San Valentín: visible solo del 7 al 14 de febrero (el 15 a las 00:00 desaparece)
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));
  useEffect(() => {
    const scheduleNextMidnight = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const ms = next.getTime() - now.getTime();
      return setTimeout(() => {
        setToday(new Date().toISOString().slice(0, 10));
        scheduleNextMidnight();
      }, ms);
    };
    const t = scheduleNextMidnight();
    return () => clearTimeout(t);
  }, [today]);

  const isSanValentinPeriod = useMemo(() => {
    const [, m, d] = today.split('-').map(Number);
    if (m !== 2) return false;
    return d >= 7 && d <= 14;
  }, [today]);

  const wasSanValentinPeriod = useRef(isSanValentinPeriod);
  useEffect(() => {
    if (wasSanValentinPeriod.current && !isSanValentinPeriod && isValentinModalOpen) {
      setIsValentinModalOpen(false);
    }
    wasSanValentinPeriod.current = isSanValentinPeriod;
  }, [isSanValentinPeriod, isValentinModalOpen]);

  const services = [
    {
      id: 1,
      title: 'Depilación Láser Diodo',
      description: 'Tecnología de última generación para una depilación definitiva segura y efectiva. Resultados duraderos con el máximo confort.',
      image: 'https://images.unsplash.com/photo-1700760933574-9f0f4ea9aa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGhhaXIlMjByZW1vdmFsfGVufDF8fHx8MTc2NTk3NTAxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'Presoterapia',
      description: 'Tratamiento de drenaje linfático que mejora la circulación, reduce la retención de líquidos y combate la celulitis de forma natural.',
      image: presoterapiaImg,
    },
    {
      id: 3,
      title: 'Hydroface',
      description: 'Tratamiento facial profundo que combina hidratación, limpieza y rejuvenecimiento. Tu piel radiante y luminosa desde la primera sesión.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBiZWF1dHl8ZW58MXx8fHwxNzY1OTk0MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: 'var(--color-secondary)' }}>
      <Sidebar />

      {isSanValentinPeriod && (
        <button
          onClick={() => {
            document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-fade-in-up"
          aria-label="Ir a ofertas de San Valentín"
          style={{ 
            boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
          }}
        >
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      <section id="inicio" className="hero-section min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" style={{ zIndex: 10 }}></div>
        <div className="w-full text-center relative animate-fade-in-up" style={{ zIndex: 20 }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary mb-6 sm:mb-8 leading-tight tracking-tight">
            Esthetic Laser
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Depilación Láser Diodo Pamplona
            <span className="block text-primary mt-2">Profesional</span>
          </h2>
          <div className="w-full flex justify-center">
            <p className="max-w-3xl text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Descubre nuestros tratamientos de última generación en el corazón de Pamplona.
              Profesionalidad, tecnología avanzada y resultados garantizados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              className="btn-primary w-full sm:w-auto"
              href={SITE.whatsappBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reservar Cita
            </a>
            <button
              className="btn-secondary w-full sm:w-auto"
              onClick={() => {
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-separator w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Carousel Section */}
      <section id="galeria" className="carousel-section py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl border border-primary/10" ref={emblaRef}>
              <div className="flex gap-4">
                {carouselImages.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-2">
                    <div className="relative w-full">
                      <ImageWithFallback
                        src={image}
                        alt={`Carrusel ${index + 1}`}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg border border-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? 'bg-primary w-6'
                      : 'bg-primary/30 w-1.5'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-separator w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Services Grid */}
      <section id="servicios" className="services-section py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto">
              Tratamientos personalizados con la más alta tecnología para cuidar de tu belleza
            </p>
          </div>
          
          {/* Sección Ofertas: permanente; estética San Valentín solo del 7 al 14 feb */}
          <div className="mb-6 sm:mb-8">
            <div
              className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up cursor-pointer w-full ${
                isSanValentinPeriod
                  ? 'border-2 border-pink-400/50 hover:border-pink-500/70'
                  : 'border border-primary/10 hover:border-primary/30'
              }`}
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onClick={() => {
                setValentinImageKey(Date.now());
                setOfertasImageIndex(0);
                setIsValentinModalOpen(true);
              }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={isSanValentinPeriod ? valentinImg : ofertasCardImage}
                  alt={isSanValentinPeriod ? 'Ofertas San Valentín' : 'Ofertas'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                    {isSanValentinPeriod ? 'Ofertas de San Valentin' : 'Ofertas'}
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8 text-center">
                <button className={`w-full text-center text-sm sm:text-base rounded-lg font-medium py-2.5 transition-colors ${
                  isSanValentinPeriod
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600'
                    : 'btn-secondary'
                }`}>
                  Más información
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/10 hover:border-primary/30 animate-fade-in-up"
                style={{ backgroundColor: 'var(--color-secondary)', animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{service.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 text-center">
                  <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6 leading-relaxed min-h-[4.5rem] text-center">
                    {service.description}
                  </p>
                  <button
                    className="w-full btn-secondary text-center text-sm sm:text-base"
                    onClick={() => {
                      if (service.id === 1) {
                        setDepilacionImageKey(Date.now());
                        setIsModalOpen(true);
                      } else if (service.id === 2) {
                        setPresoterapiaImageKey(Date.now());
                        setIsPresoterapiaModalOpen(true);
                      } else if (service.id === 3) {
                        setHydrofaceImageKey(Date.now());
                        setIsHydrofaceModalOpen(true);
                      }
                    }}
                  >
                    Más información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-separator w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Contact & Location Section */}
      <section id="contacto" className="contact-section py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Visítanos</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-base sm:text-lg">Estamos aquí para cuidar de ti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">Información de Contacto</h3>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Dirección</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Ctra San Sebastian, km 1<br />
                        31013 Pamplona, Navarra.<br /> Dentro del centro comercial Eroski.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Teléfono</h4>
                      <p className="text-muted-foreground">682 19 35 35</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Email</h4>
                      <p className="text-muted-foreground">info@yoliestheticlaser.com</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Horario</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Lunes - Viernes: 9:00 - 21:00<br />
                        Sábados: 9:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  className="mt-6 w-full btn-primary"
                  href={SITE.whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reservar Cita
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2475.9206613749957!2d-1.6816700751958547!3d42.83408244265716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd508d5e64205763%3A0x2fc35ea8bde0ddeb!2sCtra%20San%20Sebastian%2C%20km%201%2C%2031013%20Pamplona%2C%20Navarra!5e1!3m2!1ses!2ses!4v1765998917418!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de ubicación - Centro Comercial Eroski, Ctra San Sebastian, km 1, 31013 Pamplona, Navarra"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="section-separator w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* --- MODAL DE PRECIOS DE DEPILACIÓN --- */}
      {isModalOpen && (
        <ImageViewerModal
          title="Precios de Depilación Láser"
          src={
            activeTab === 'chica'
              ? `https://res.cloudinary.com/dlddss5wv/image/upload/v1769547953/bonos_chica_oj6n9e.jpg?_cb=${depilacionImageKey}`
              : `https://res.cloudinary.com/dlddss5wv/image/upload/v1769547947/bonos_chico_reazdm.jpg?_cb=${depilacionImageKey}`
          }
          alt={activeTab === 'chica' ? 'Bonos chica' : 'Bonos chico'}
          onClose={() => setIsModalOpen(false)}
          toolbar={
            <div className="shrink-0 flex gap-4 px-4 sm:px-6 border-b border-primary/10">
              <button
                onClick={() => setActiveTab('chica')}
                className={`flex-1 pb-3 font-semibold border-b-2 transition-colors ${activeTab === 'chica' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
              >
                Bonos chica
              </button>
              <button
                onClick={() => setActiveTab('chico')}
                className={`flex-1 pb-3 font-semibold border-b-2 transition-colors ${activeTab === 'chico' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
              >
                Bonos chico
              </button>
            </div>
          }
        />
      )}

      {isPresoterapiaModalOpen && (
        <ImageViewerModal
          title="Presoterapia"
          src={`https://res.cloudinary.com/dlddss5wv/image/upload/v1769537090/oferta1_dya8qc.jpg?_cb=${presoterapiaImageKey}`}
          alt="Presoterapia"
          onClose={() => setIsPresoterapiaModalOpen(false)}
        />
      )}

      {isHydrofaceModalOpen && (
        <ImageViewerModal
          title="Hydroface"
          src={`https://res.cloudinary.com/dlddss5wv/image/upload/v1769537216/oferta2_jydxqc.jpg?_cb=${hydrofaceImageKey}`}
          alt="Hydroface"
          onClose={() => setIsHydrofaceModalOpen(false)}
        />
      )}

      {isValentinModalOpen && (
        <ImageViewerModal
          title={isSanValentinPeriod ? 'Ofertas de San Valentin' : 'Ofertas'}
          src={`${ofertasImages[ofertasImageIndex]}?_cb=${valentinImageKey}`}
          alt={`Oferta ${ofertasImageIndex + 1}`}
          onClose={() => setIsValentinModalOpen(false)}
          carousel={{
            index: ofertasImageIndex,
            total: ofertasImages.length,
            onPrev: () => setOfertasImageIndex((i) => (i === 0 ? ofertasImages.length - 1 : i - 1)),
            onNext: () => setOfertasImageIndex((i) => (i === ofertasImages.length - 1 ? 0 : i + 1)),
            onSelect: setOfertasImageIndex,
          }}
        />
      )}

      {/* Footer */}
      <footer className="footer-section bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-8 sm:py-10 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full mx-auto">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Esthetic Laser</h3>
            <p className="text-sm sm:text-base text-primary-foreground/90 mb-4 sm:mb-6 max-w-md mx-auto">
              Tu centro de belleza y estética profesional en Pamplona
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-xs sm:text-sm mb-2 font-medium">© 2024 Esthetic Laser - Todos los derechos reservados</p>
            <p className="text-xs sm:text-sm text-primary-foreground/80">Ctra San Sebastian, km 1, 31013 Pamplona, Navarra</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
