export const SITE = {
  name: 'Esthetic Laser',
  url: 'https://yoliestheticlaser.com',
  title: 'Esthetic Laser - Depilación Láser Diodo en Pamplona',
  description:
    'Centro de estética profesional en Pamplona. Depilación láser diodo, presoterapia e Hydroface en Ctra. San Sebastián, km 1 (Eroski). Reserva tu cita.',
  phone: '682193535',
  phoneDisplay: '682 19 35 35',
  email: 'info@yoliestheticlaser.com',
  whatsappBookingUrl:
    'https://wa.me/34682193535?text=Hola%2C%20quiero%20reservar%20una%20cita',
  street: 'Ctra San Sebastian, km 1',
  locality: 'Pamplona',
  region: 'Navarra',
  postalCode: '31013',
  country: 'ES',
};

export const SERVICE_LABELS = {
  depilacion: 'Depilación Láser Diodo',
  presoterapia: 'Presoterapia',
  hydroface: 'Hydroface',
  general: 'Nuestros servicios',
} as const;

export type ServiceKey = keyof typeof SERVICE_LABELS;

export function formatPostDate(date: Date) {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
