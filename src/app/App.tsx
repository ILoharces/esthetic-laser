import { useState, useEffect, useCallback, useMemo } from 'react';
import { MapPin, Phone, Mail, Clock, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import emailjs from '@emailjs/browser';
import useEmblaCarousel from 'embla-carousel-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pricesData from './resources/pricesDepilacion.json';
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chico' | 'chica'>('chica');
  const [presoterapiaImageKey, setPresoterapiaImageKey] = useState(Date.now());
  const [hydrofaceImageKey, setHydrofaceImageKey] = useState(Date.now());
  const [depilacionImageKey, setDepilacionImageKey] = useState(Date.now());
  const [valentinImageKey, setValentinImageKey] = useState(Date.now());

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactType: 'email' as 'email' | 'phone',
    email: '',
    phone: '',
    selectedServices: [] as string[],
    depilacionSelections: [] as Array<{ tipo: 'chica' | 'chico', zona: string, sesiones: number, precio: number }>,
  });

  // Email sending state
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  useEffect(() => {
    if (!isSanValentinPeriod && isValentinModalOpen) setIsValentinModalOpen(false);
  }, [isSanValentinPeriod, isValentinModalOpen]);

  // Función para formatear las selecciones de depilación
  const formatDepilacionSelections = () => {
    if (formData.depilacionSelections.length === 0) return 'Ninguna selección';

    const grouped = formData.depilacionSelections.reduce((acc, sel) => {
      const key = `${sel.tipo}-${sel.zona}`;
      if (!acc[key]) {
        acc[key] = { tipo: sel.tipo, zona: sel.zona, opciones: [] };
      }
      acc[key].opciones.push(`${sel.sesiones} sesión${sel.sesiones > 1 ? 'es' : ''} - €${sel.precio}`);
      return acc;
    }, {} as Record<string, { tipo: string, zona: string, opciones: string[] }>);

    return Object.values(grouped).map(group => {
      const tipoLabel = group.tipo === 'chica' ? 'Pack Bonos Chica' : 'Pack Bonos Chico';
      return `${tipoLabel} - ${group.zona}:\n${group.opciones.join(', ')}`;
    }).join('\n\n');
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus('idle');

    try {
      // Formatear los servicios seleccionados
      const serviciosText = formData.selectedServices.join(', ');

      // Formatear las selecciones de depilación
      const depilacionText = formData.depilacionSelections.length > 0
        ? formatDepilacionSelections()
        : 'Ninguna selección específica';

      // Información de contacto
      const contacto = formData.contactType === 'email'
        ? `Email: ${formData.email}`
        : `Teléfono: ${formData.phone}`;

      // Preparar el mensaje
      const message = `
Nueva Reserva de Cita

Nombre completo: ${formData.fullName}
${contacto}

Servicios seleccionados: ${serviciosText}

${formData.selectedServices.includes('Depilación Láser') ? `Detalles de Depilación Láser:\n${depilacionText}` : ''}
      `.trim();

      // Configuración de EmailJS
      // NOTA: Configura estas variables de entorno en un archivo .env
      // VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validar que las credenciales estén configuradas
      if (!serviceId || !templateId || !publicKey ||
        serviceId === 'YOUR_SERVICE_ID' ||
        templateId === 'YOUR_TEMPLATE_ID' ||
        publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('Las credenciales de EmailJS no están configuradas. Por favor, configura las variables de entorno VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY');
      }

      // Parámetros del template de EmailJS
      // Asegúrate de que tu template en EmailJS tenga estos campos
      const templateParams = {
        to_email: 'info@yoliestheticlaser.com',
        from_name: formData.fullName,
        from_email: formData.contactType === 'email' ? formData.email : 'no-email@example.com',
        phone: formData.contactType === 'phone' ? formData.phone : '',
        message: message,
        subject: 'Nueva Reserva de Cita - Esthetic Laser',
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSendStatus('success');

      // Limpiar el formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          fullName: '',
          contactType: 'email',
          email: '',
          phone: '',
          selectedServices: [],
          depilacionSelections: [],
        });
        setSendStatus('idle');
        setIsBookingModalOpen(false);
      }, 2000);

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

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

      <section className="hero-section min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" style={{ zIndex: 10 }}></div>
        <div className="w-full text-center relative animate-fade-in-up" style={{ zIndex: 20 }}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary mb-6 sm:mb-8 leading-tight tracking-tight px-2">
            Esthetic Laser
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Servicios de Estética
            <span className="block text-primary mt-2">Profesional</span>
          </h2>
          <div className="w-full flex justify-center px-4">
            <p className="max-w-3xl text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Descubre nuestros tratamientos de última generación en el corazón de Pamplona.
              Profesionalidad, tecnología avanzada y resultados garantizados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button
              className="btn-primary w-full sm:w-auto"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Reservar Cita
            </button>
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
      <section className="carousel-section py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
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
      <section id="servicios" className="services-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-base sm:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              Tratamientos personalizados con la más alta tecnología para cuidar de tu belleza
            </p>
          </div>
          
          {isSanValentinPeriod && (
            <div className="mb-6 sm:mb-8">
              <div
                className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/10 hover:border-primary/30 animate-fade-in-up cursor-pointer w-full"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                onClick={() => {
                  setValentinImageKey(Date.now());
                  setIsValentinModalOpen(true);
                }}
              >
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={valentinImg}
                    alt="Valentin"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Ofertas de San Valentin</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 text-center">
                  <button className="w-full btn-secondary text-center text-sm sm:text-base">
                    Más información
                  </button>
                </div>
              </div>
            </div>
          )}

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
      <section className="contact-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full relative" style={{ backgroundColor: 'var(--color-secondary)', zIndex: 10 }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 mt-4 sm:mt-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 px-2">Visítanos</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-base sm:text-lg px-4">Estamos aquí para cuidar de ti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="rounded-2xl p-4 sm:p-6 md:p-10 shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">Información de Contacto</h3>

                <div className="space-y-6 sm:space-y-8">
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

                <button
                  className="mt-6 sm:mt-8 md:mt-10 w-full btn-primary"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Reservar Cita
                </button>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Fijo */}
            <div className="flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7 border-b border-primary/10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Precios de Depilación Láser</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido con Scroll y Padding Interno */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="flex gap-4 border-b border-primary/10 mb-8">
                <button
                  onClick={() => setActiveTab('chica')}
                  className={`flex-1 pb-4 font-semibold border-b-2 transition-colors ${activeTab === 'chica' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                  Bonos chica
                </button>
                <button
                  onClick={() => setActiveTab('chico')}
                  className={`flex-1 pb-4 font-semibold border-b-2 transition-colors ${activeTab === 'chico' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                  Bonos chico
                </button>
              </div>

              <div className="flex justify-center items-center w-full">
                <ImageWithFallback
                  key={`depilacion-${activeTab}-${depilacionImageKey}`}
                  src={activeTab === 'chica' 
                    ? `https://res.cloudinary.com/dlddss5wv/image/upload/v1769547953/bonos_chica_oj6n9e.jpg?_cb=${depilacionImageKey}`
                    : `https://res.cloudinary.com/dlddss5wv/image/upload/v1769547947/bonos_chico_reazdm.jpg?_cb=${depilacionImageKey}`
                  }
                  alt={activeTab === 'chica' ? 'Bonos chica' : 'Bonos chico'}
                  className="max-w-full max-h-[calc(95vh-200px)] w-auto h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Presoterapia */}
      {isPresoterapiaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsPresoterapiaModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-2 sm:m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground pr-2">Presoterapia</h2>
              <button
                onClick={() => setIsPresoterapiaModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10">
              <div className="flex justify-center items-center w-full">
                <ImageWithFallback
                  key={`presoterapia-${presoterapiaImageKey}`}
                  src={`https://res.cloudinary.com/dlddss5wv/image/upload/v1769537090/oferta1_dya8qc.jpg?_cb=${presoterapiaImageKey}`}
                  alt="Presoterapia"
                  className="max-w-full max-h-[calc(95vh-200px)] w-auto h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button
                className="btn-primary text-sm sm:text-base"
                onClick={() => setIsPresoterapiaModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Hydroface */}
      {isHydrofaceModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsHydrofaceModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-2 sm:m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground pr-2">Hydroface</h2>
              <button
                onClick={() => setIsHydrofaceModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10">
              <div className="flex justify-center items-center w-full">
                <ImageWithFallback
                  key={`hydroface-${hydrofaceImageKey}`}
                  src={`https://res.cloudinary.com/dlddss5wv/image/upload/v1769537216/oferta2_jydxqc.jpg?_cb=${hydrofaceImageKey}`}
                  alt="Hydroface"
                  className="max-w-full max-h-[calc(95vh-200px)] w-auto h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button
                className="btn-primary text-sm sm:text-base"
                onClick={() => setIsHydrofaceModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Valentin (solo visible en periodo San Valentín) */}
      {isSanValentinPeriod && isValentinModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsValentinModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-2 sm:m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground pr-2">Ofertas de San Valentin</h2>
              <button
                onClick={() => setIsValentinModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10">
              <div className="flex justify-center items-center w-full">
                <ImageWithFallback
                  key={`valentin-${valentinImageKey}`}
                  src={`https://res.cloudinary.com/dlddss5wv/image/upload/v1770380804/main-sample.png?_cb=${valentinImageKey}`}
                  alt="Valentin"
                  className="max-w-full max-h-[calc(95vh-200px)] w-auto h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button
                className="btn-primary text-sm sm:text-base"
                onClick={() => setIsValentinModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reserva de Cita */}
      {isBookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsBookingModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl my-2 sm:my-4 max-h-[calc(100vh-1rem)] sm:max-h-[95vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12 py-5 sm:py-6 md:py-7 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Reservar Cita</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
            </div>

            <form
              className="px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 space-y-5 sm:space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Campo Nombre Completo */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-foreground">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              {/* Selección de tipo de contacto */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-foreground mb-3">
                  Contacto *
                </label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactType"
                      value="email"
                      checked={formData.contactType === 'email'}
                      onChange={() => setFormData({ ...formData, contactType: 'email', phone: '' })}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm sm:text-base text-foreground">Correo electrónico</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactType"
                      value="phone"
                      checked={formData.contactType === 'phone'}
                      onChange={() => setFormData({ ...formData, contactType: 'phone', email: '' })}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm sm:text-base text-foreground">Teléfono</span>
                  </label>
                </div>

                {/* Campo Email o Teléfono */}
                {formData.contactType === 'email' ? (
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                    placeholder="correo@ejemplo.com"
                  />
                ) : (
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                    placeholder="682 19 35 35"
                  />
                )}
              </div>

              {/* Selección de Servicios */}
              <div className="space-y-3">
                <label className="block text-sm sm:text-base font-semibold text-foreground">
                  Servicios disponibles *
                </label>
                <div className="space-y-3">
                  {/* Depilación Láser con opciones del JSON */}
                  <div className="rounded-lg border border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <label className="flex items-start gap-3 p-4 cursor-pointer hover:bg-primary/5 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes('Depilación Láser')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              selectedServices: [...formData.selectedServices, 'Depilación Láser']
                            });
                          } else {
                            setFormData({
                              ...formData,
                              selectedServices: formData.selectedServices.filter(s => s !== 'Depilación Láser'),
                              depilacionSelections: []
                            });
                          }
                        }}
                        className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-medium text-foreground">Depilación Láser</span>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tecnología de última generación para una depilación definitiva</p>
                      </div>
                    </label>

                    {/* Opciones de Depilación cuando está seleccionado */}
                    {formData.selectedServices.includes('Depilación Láser') && (
                      <div className="px-4 pb-4 space-y-4 border-t border-primary/10 pt-4">
                        {/* Pack Bonos Chica */}
                        <div className="space-y-3">
                          <h4 className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground font-semibold">Pack Bonos Chica</h4>
                          {pricesData.packBonosChica.map((pack, packIndex) => (
                            <div key={`chica-${packIndex}`} className="space-y-2">
                              <div className="text-sm font-medium text-foreground">{pack.zona}</div>
                              <div className="space-y-2 pl-4">
                                {pack.opciones.map((opcion, opcionIndex) => {
                                  const selectionKey = `chica-${packIndex}-${opcionIndex}`;
                                  const isSelected = formData.depilacionSelections.some(
                                    s => s.tipo === 'chica' && s.zona === pack.zona && s.sesiones === opcion.sesiones
                                  );
                                  return (
                                    <label key={selectionKey} className="flex items-center gap-3 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setFormData({
                                              ...formData,
                                              depilacionSelections: [
                                                ...formData.depilacionSelections,
                                                { tipo: 'chica', zona: pack.zona, sesiones: opcion.sesiones, precio: opcion.precioFinal }
                                              ]
                                            });
                                          } else {
                                            setFormData({
                                              ...formData,
                                              depilacionSelections: formData.depilacionSelections.filter(
                                                s => !(s.tipo === 'chica' && s.zona === pack.zona && s.sesiones === opcion.sesiones)
                                              )
                                            });
                                          }
                                        }}
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                      />
                                      <span className="text-xs sm:text-sm text-foreground">
                                        {opcion.sesiones} sesión{opcion.sesiones > 1 ? 'es' : ''} - €{opcion.precioFinal}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Pack Bonos Chico */}
                        <div className="space-y-3 pt-4 border-t border-primary/10">
                          <h4 className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground font-semibold">Pack Bonos Chico</h4>
                          {pricesData.packBonosChico.map((pack, packIndex) => (
                            <div key={`chico-${packIndex}`} className="space-y-2">
                              <div className="text-sm font-medium text-foreground">{pack.zona}</div>
                              <div className="space-y-2 pl-4">
                                {pack.opciones.map((opcion, opcionIndex) => {
                                  const selectionKey = `chico-${packIndex}-${opcionIndex}`;
                                  const isSelected = formData.depilacionSelections.some(
                                    s => s.tipo === 'chico' && s.zona === pack.zona && s.sesiones === opcion.sesiones
                                  );
                                  return (
                                    <label key={selectionKey} className="flex items-center gap-3 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setFormData({
                                              ...formData,
                                              depilacionSelections: [
                                                ...formData.depilacionSelections,
                                                { tipo: 'chico', zona: pack.zona, sesiones: opcion.sesiones, precio: opcion.precioFinal }
                                              ]
                                            });
                                          } else {
                                            setFormData({
                                              ...formData,
                                              depilacionSelections: formData.depilacionSelections.filter(
                                                s => !(s.tipo === 'chico' && s.zona === pack.zona && s.sesiones === opcion.sesiones)
                                              )
                                            });
                                          }
                                        }}
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                      />
                                      <span className="text-xs sm:text-sm text-foreground">
                                        {opcion.sesiones} sesión{opcion.sesiones > 1 ? 'es' : ''} - €{opcion.precioFinal}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                    style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <input
                      type="checkbox"
                      checked={formData.selectedServices.includes('Presoterapia')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            selectedServices: [...formData.selectedServices, 'Presoterapia']
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedServices: formData.selectedServices.filter(s => s !== 'Presoterapia')
                          });
                        }
                      }}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base font-medium text-foreground">Presoterapia</span>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tratamiento de drenaje linfático que mejora la circulación</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                    style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <input
                      type="checkbox"
                      checked={formData.selectedServices.includes('Hydroface')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            selectedServices: [...formData.selectedServices, 'Hydroface']
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedServices: formData.selectedServices.filter(s => s !== 'Hydroface')
                          });
                        }
                      }}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base font-medium text-foreground">Hydroface</span>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tratamiento facial profundo de hidratación y limpieza</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Mensajes de estado */}
              {sendStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                  <p className="text-sm sm:text-base font-medium">¡Reserva enviada con éxito!</p>
                  <p className="text-xs sm:text-sm mt-1">Te contactaremos pronto.</p>
                </div>
              )}

              {sendStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
                  <p className="text-sm sm:text-base font-medium">Error al enviar la reserva</p>
                  <p className="text-xs sm:text-sm mt-1">Por favor, inténtalo de nuevo o contáctanos directamente.</p>
                </div>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSending || sendStatus === 'success'}
                  className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg w-full sm:flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Enviando...' : sendStatus === 'success' ? 'Enviado ✓' : 'Enviar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setSendStatus('idle');
                  }}
                  disabled={isSending}
                  className="btn-secondary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-section bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full mx-auto">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Esthetic Laser</h3>
            <p className="text-sm sm:text-base text-primary-foreground/90 mb-4 sm:mb-6 max-w-md mx-auto px-2">
              Tu centro de belleza y estética profesional en Pamplona
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-xs sm:text-sm mb-2 font-medium px-2">© 2024 Esthetic Laser - Todos los derechos reservados</p>
            <p className="text-xs sm:text-sm text-primary-foreground/80 px-2">Ctra San Sebastian, km 1, 31013 Pamplona, Navarra</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
