# Esthetic Laser

Sitio web de Esthetic Laser - Estética Profesional en Pamplona.

## Instalación

1. Instala las dependencias:
```bash
npm install
# o
pnpm install
# o
yarn install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

3. Abre tu navegador en `http://localhost:5173`

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Configuración de EmailJS

Para que el formulario de reserva funcione, necesitas configurar EmailJS:

1. **Crea una cuenta en EmailJS**: Ve a [https://www.emailjs.com/](https://www.emailjs.com/) y crea una cuenta gratuita.

2. **Crea un servicio de email**:
   - Ve a "Email Services" y crea un nuevo servicio
   - Conecta tu cuenta de Gmail, Outlook u otro proveedor
   - Copia el **Service ID**

3. **Crea un template de email**:
   - Ve a "Email Templates" y crea un nuevo template
   - Configura el template con estos campos:
     - `{{to_email}}` - Email destinatario (info@yoliestheticlaser.com)
     - `{{from_name}}` - Nombre del cliente
     - `{{from_email}}` - Email del cliente (si aplica)
     - `{{phone}}` - Teléfono del cliente (si aplica)
     - `{{message}}` - Mensaje con los detalles de la reserva
     - `{{subject}}` - Asunto del email
   - Copia el **Template ID**

4. **Obtén tu Public Key**:
   - Ve a "Account" > "General" > "API Keys"
   - Copia tu **Public Key**

5. **Configura las variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
   ```
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

6. **Reinicia el servidor de desarrollo** después de crear el archivo `.env`

## Tecnologías

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (iconos)
- EmailJS (envío de formularios)

