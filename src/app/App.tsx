import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
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
      image: 'https://images.unsplash.com/photo-1664549760921-2198b054a592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBiZWF1dHklMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzY1OTk2MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'Hydroface',
      description: 'Tratamiento facial profundo que combina hidratación, limpieza y rejuvenecimiento. Tu piel radiante y luminosa desde la primera sesión.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjB0cmVhdG1lbnQlMjBiZWF1dHl8ZW58MXx8fHwxNzY1OTk0MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[var(--color-secondary)] to-white w-full">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-primary/10 sticky top-0 z-50 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">Esthetic Laser</h1>
            <p className="text-muted-foreground text-lg font-medium">Tu belleza, nuestra pasión</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="w-full text-center relative z-10 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">Centro de Estética Profesional</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
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
            <button className="btn-secondary">
              Ver Servicios
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white w-full">
        <div className="w-full mx-auto">
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
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-primary/10 hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-72 overflow-hidden">
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
                  <button className="w-full btn-secondary text-center">
                    Más información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--color-secondary)] to-white w-full">
        <div className="w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Visítanos</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground text-lg">Estamos aquí para cuidar de ti</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-10 shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300">
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
                        31013 Pamplona, Navarra
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Teléfono</h4>
                      <p className="text-muted-foreground">+34 948 XXX XXX</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Email</h4>
                      <p className="text-muted-foreground">info@esteticapamplona.es</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 group text-center">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-lg">Horario</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Lunes - Viernes: 10:00 - 20:00<br />
                        Sábados: 10:00 - 14:00
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
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl border border-primary/10 hover:shadow-2xl transition-shadow duration-300">
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-12 px-4 sm:px-6 lg:px-8 mt-20 w-full">
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