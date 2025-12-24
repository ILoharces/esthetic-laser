import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, X } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import pricesData from './resources/pricesDepilacion.json';

// Import local images
import presoterapiaImg from './resources/presoterapia.jpg';
import oferta1Img from './resources/oferta1.jpg';
import hydrafaceImg from './resources/hydraface.jpg';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPresoterapiaModalOpen, setIsPresoterapiaModalOpen] = useState(false);
  const [isHydrofaceModalOpen, setIsHydrofaceModalOpen] = useState(false);
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
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-primary mb-8 leading-tight tracking-tight">
            Esthetic Laser
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Servicios de Estética
            <span className="block text-primary mt-2">Profesional</span>
          </h2>
          <div className="w-full flex justify-center">
            <p className="max-w-3xl text-lg text-muted-foreground mb-8 leading-relaxed">
              Descubre nuestros tratamientos de última generación en el corazón de Pamplona. 
              Profesionalidad, tecnología avanzada y resultados garantizados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary">
              Reservar Cita
            </button>
            <button 
              className="btn-secondary"
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
      <section id="servicios" className="services-section py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
              Tratamientos personalizados con la más alta tecnología para cuidar de tu belleza
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/10 hover:border-primary/30 animate-fade-in-up"
                style={{ backgroundColor: 'var(--color-secondary)', animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-72 overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <p className="text-foreground/70 mb-6 leading-relaxed min-h-[4.5rem] text-center">
                    {service.description}
                  </p>
                  <button 
                    className="w-full btn-secondary text-center"
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
      <section className="contact-section py-24 px-4 sm:px-6 lg:px-12 xl:px-16 w-full" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16 mt-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Visítanos</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg">Estamos aquí para cuidar de ti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="rounded-2xl p-10 shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Información de Contacto</h3>
                
                <div className="space-y-8">
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

                <button className="mt-10 w-full btn-primary">
                  Reservar Cita
                </button>
              </div>
            </div>

            {/* Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300" style={{ backgroundColor: 'var(--color-secondary)' }}>
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-2 md:ml-4">Precios de Depilación Láser</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="px-4 md:px-8 py-6">
              {/* Tabs */}
              <div className="flex my-6 border-b border-primary/20 mx-4 md:mx-6">
                <button
                  onClick={() => setActiveTab('chica')}
                  className={`flex-1 px-6 md:px-8 py-6 md:py-7 text-base md:text-lg font-semibold transition-colors border-b-2 text-center ${
                    activeTab === 'chica'
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  Pack Bonos Chica
                </button>
                <button
                  onClick={() => setActiveTab('chico')}
                  className={`flex-1 px-6 md:px-8 py-6 md:py-7 text-base md:text-lg font-semibold transition-colors border-b-2 text-center ${
                    activeTab === 'chico'
                      ? 'text-primary border-primary'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }`}
                >
                  Pack Bonos Chico
                </button>
              </div>

              {/* Contenido de las tabs */}
              <div className="ml-2 md:ml-4 mr-2 md:mr-4">
                <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  {(activeTab === 'chico' ? pricesData.packBonosChico : pricesData.packBonosChica).map((pack, index) => (
                    <div key={index} className={`my-8 ${index > 0 ? "pt-12 border-t border-foreground/10" : "pt-0"}`}>
                      <h4 className="text-base md:text-lg font-semibold text-foreground mb-6">{pack.zona}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {pack.opciones.map((opcion, opcionIndex) => (
                          <div key={opcionIndex} className="rounded-lg p-5 md:p-6 text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <div className="text-sm font-medium text-muted-foreground mb-4">{opcion.sesiones} sesión{opcion.sesiones > 1 ? 'es' : ''}</div>
                            <div className="mb-4">
                              <span className="text-xs text-muted-foreground line-through">€{opcion.precioOriginal}</span>
                              <span className="text-xl font-bold text-primary ml-2">€{opcion.precioFinal}</span>
                            </div>
                            <div className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-primary" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)' }}>
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
            <div className="sticky bottom-0 px-4 md:px-8 py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button 
                className="btn-primary"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsPresoterapiaModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-2 md:ml-4">Presoterapia</h2>
              <button
                onClick={() => setIsPresoterapiaModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={oferta1Img}
                  alt="Presoterapia"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-4 md:px-8 py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button 
                className="btn-primary"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsHydrofaceModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl shadow-2xl m-4"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-6 border-b border-primary/20" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground ml-2 md:ml-4">Hydroface</h2>
              <button
                onClick={() => setIsHydrofaceModalOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="flex justify-center">
                <ImageWithFallback
                  src={hydrafaceImg}
                  alt="Hydroface"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="sticky bottom-0 px-4 md:px-8 py-5 md:py-6 border-t border-primary/20 flex justify-end" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <button 
                className="btn-primary"
                onClick={() => setIsHydrofaceModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-section bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Esthetic Laser</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-md mx-auto">
              Tu centro de belleza y estética profesional en Pamplona
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
            <p className="mb-2 font-medium">© 2024 Esthetic Laser - Todos los derechos reservados</p>
            <p className="text-primary-foreground/80">Ctra San Sebastian, km 1, 31013 Pamplona, Navarra</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
