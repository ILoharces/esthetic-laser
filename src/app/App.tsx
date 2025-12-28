import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, X } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pricesData from './resources/pricesDepilacion.json';
// Import local images
import presoterapiaImg from './resources/presoterapia.jpg';
import oferta1Img from './resources/oferta1.jpeg';
import hydrafaceImg from './resources/hydraface.jpeg';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPresoterapiaModalOpen, setIsPresoterapiaModalOpen] = useState(false);
  const [isHydrofaceModalOpen, setIsHydrofaceModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chico' | 'chica'>('chica');
  
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
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>

      <section className="hero-section min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="w-full text-center relative z-10 animate-fade-in-up">
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

      {/* Services Grid */}
      <section id="servicios" className="services-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
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
                        setIsModalOpen(true);
                      } else if (service.id === 2) {
                        setIsPresoterapiaModalOpen(true);
                      } else if (service.id === 3) {
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
      <section className="contact-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
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
                        Sábados: 9:00 - 17:00
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
                style={{border:0}} 
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

      {/* Modal de Precios de Depilación */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-2 sm:m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground ml-1 sm:ml-2 md:ml-4 pr-2">Precios de Depilación Láser</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="px-2 sm:px-4 md:px-8 py-4 sm:py-6">
              {/* Tabs */}
              <div className="flex my-4 sm:my-6 border-b border-primary/20 mx-2 sm:mx-4 md:mx-6">
                <button
                  onClick={() => setActiveTab('chica')}
                  className={`flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 text-sm sm:text-base md:text-lg font-semibold transition-colors border-b-2 text-center ${
                    activeTab === 'chica'
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  Pack Bonos Chica
                </button>
                <button
                  onClick={() => setActiveTab('chico')}
                  className={`flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 text-sm sm:text-base md:text-lg font-semibold transition-colors border-b-2 text-center ${
                    activeTab === 'chico'
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  Pack Bonos Chico
                </button>
              </div>

              {/* Contenido de las tabs */}
              <div className="ml-1 sm:ml-2 md:ml-4 mr-1 sm:mr-2 md:mr-4">
                <div className="rounded-xl p-3 sm:p-4 md:p-6 lg:p-8" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  {(activeTab === 'chico' ? pricesData.packBonosChico : pricesData.packBonosChica).map((pack, index) => (
                    <div key={index} className={`my-4 sm:my-6 md:my-8 ${index > 0 ? "pt-6 sm:pt-8 md:pt-12 border-t border-foreground/10" : "pt-0"}`}>
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-4 sm:mb-6">{pack.zona}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                        {pack.opciones.map((opcion, opcionIndex) => (
                          <div key={opcionIndex} className="rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4">{opcion.sesiones} sesión{opcion.sesiones > 1 ? 'es' : ''}</div>
                            <div className="mb-3 sm:mb-4">
                              <span className="text-xs text-muted-foreground line-through">€{opcion.precioOriginal}</span>
                              <span className="text-lg sm:text-xl font-bold text-primary ml-2">€{opcion.precioFinal}</span>
                            </div>
                            <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold text-primary" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)' }}>
                              -{opcion.descuento}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button 
                className="btn-primary text-sm sm:text-base"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
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
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground ml-1 sm:ml-2 md:ml-4 pr-2">Presoterapia</h2>
              <button
                onClick={() => setIsPresoterapiaModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={oferta1Img}
                  alt="Presoterapia"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
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
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground ml-1 sm:ml-2 md:ml-4 pr-2">Hydroface</h2>
              <button
                onClick={() => setIsHydrofaceModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={hydrafaceImg}
                  alt="Hydroface"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
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
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Reservar Cita</h2>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>
            </div>

            <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-10 space-y-5 sm:space-y-6 md:space-y-8 lg:space-y-10">
              {/* Sección de contacto */}
              <div className="text-center space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground font-semibold leading-relaxed px-2">
                  Para reservar tu cita, llámanos al <span className="text-primary font-bold">682 19 35 35</span> o escríbenos a <span className="text-primary font-bold break-all">info@yoliestheticlaser.com</span>.
                </p>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">Te ayudaremos a elegir el mejor tratamiento y horario para ti.</p>
              </div>

              {/* Sección de Depilación Láser */}
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-primary/15 bg-primary/5 space-y-4 sm:space-y-5 md:space-y-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pb-2 border-b border-primary/10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Depilación Láser</h3>
                  <span className="text-xs sm:text-sm md:text-base text-primary font-medium">Bonos mujer y hombre</span>
                </div>
                <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground font-semibold mb-2 sm:mb-3">Packs Chica</div>
                    {pricesData.packBonosChica.map((pack, packIndex) => (
                      <div key={`chica-${packIndex}`} className="rounded-lg border border-primary/10 bg-white/40 px-3 sm:px-4 md:px-5 py-3 sm:py-4 space-y-2 sm:space-y-3 shadow-sm">
                        <div className="font-semibold text-foreground text-sm sm:text-base">{pack.zona}</div>
                        <div className="space-y-1.5 sm:space-y-2 pt-1">
                          {pack.opciones.map((opcion, opcionIndex) => (
                            <div key={`chica-${packIndex}-${opcionIndex}`} className="flex items-center justify-between text-xs sm:text-sm text-foreground/80 py-0.5 sm:py-1">
                              <span>{opcion.sesiones} sesión(es)</span>
                              <span className="font-semibold text-primary">€{opcion.precioFinal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground font-semibold mb-2 sm:mb-3">Packs Chico</div>
                    {pricesData.packBonosChico.map((pack, packIndex) => (
                      <div key={`chico-${packIndex}`} className="rounded-lg border border-primary/10 bg-white/40 px-3 sm:px-4 md:px-5 py-3 sm:py-4 space-y-2 sm:space-y-3 shadow-sm">
                        <div className="font-semibold text-foreground text-sm sm:text-base">{pack.zona}</div>
                        <div className="space-y-1.5 sm:space-y-2 pt-1">
                          {pack.opciones.map((opcion, opcionIndex) => (
                            <div key={`chico-${packIndex}-${opcionIndex}`} className="flex items-center justify-between text-xs sm:text-sm text-foreground/80 py-0.5 sm:py-1">
                              <span>{opcion.sesiones} sesión(es)</span>
                              <span className="font-semibold text-primary">€{opcion.precioFinal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sección de otros servicios */}
              <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
                <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-primary/15 bg-white/50 shadow-sm space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-primary/10">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Presoterapia</h3>
                    <span className="text-primary font-bold text-base sm:text-lg md:text-xl">€120</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground pt-1">Bono de 10 sesiones. Mejora la circulación y alivia la retención de líquidos.</p>
                </div>
                <div className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl border border-primary/15 bg-white/50 shadow-sm space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-primary/10">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">Hydroface</h3>
                    <span className="text-primary font-bold text-base sm:text-lg md:text-xl">€49</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground pt-1">1 sesión de limpieza profunda e hidratación para una piel luminosa.</p>
                </div>
              </div>

              {/* Botón de cerrar */}
              <div className="flex justify-center pt-2 sm:pt-3 md:pt-4 pb-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg w-full sm:w-auto"
                >
                  Cerrar
                </button>
              </div>
            </div>
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
