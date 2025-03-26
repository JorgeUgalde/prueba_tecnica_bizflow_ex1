# API REST con Next.js y JSONPlaceholder

Aplicación web desarrollada con Next.js que implementa y consume la API REST de JSONPlaceholder, permitiendo operaciones CRUD (GET, POST, PATCH) para gestionar publicaciones.

## Características

- **Listado de Publicaciones**: Muestra publicaciones obtenidas de JSONPlaceholder API
- **Creación de Publicaciones**: Formulario para agregar nuevas publicaciones
- **Edición de Publicaciones**: Permite modificar publicaciones existentes
- **Manejo de Errores**: Gestión centralizada de errores en solicitudes a la API
- **Interfaz Responsive**: Diseño adaptable a distintos dispositivos utilizando TailwindCSS
- **Notificaciones**: Sistema de notificaciones para informar al usuario sobre resultado de operaciones

## Instrucciones de Instalación

### Requisitos Previos

- Node.js (v14.x o superior)
- npm o yarn

### Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JorgeUgalde/prueba_tecnica_bizflow_ex1.git
   cd prueba_tecnica_bizflow_ex1
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abrir el navegador en [http://localhost:3000](http://localhost:3000)

## Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción (debe ejecutarse después de `build`)
- `npm run lint`: Ejecuta el linter para verificar la calidad del código

## Ejecución con Docker

### Construir y ejecutar con Docker Compose

1. Construir y levantar los contenedores:
   ```bash
   docker-compose up -d --build
   ```

2. La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

3. Para detener los contenedores:
   ```bash
   docker-compose down
   ```

### Ejecutar solo con Docker

1. Construir la imagen:
   ```bash
   docker build -t nextjs-prueba_tecnica_bizflow_ex1.
   ```

2. Ejecutar el contenedor:
   ```bash
   docker run -p 3000:3000 nextjs-prueba_tecnica_bizflow_ex1
   ```

## Decisiones Técnicas

1. **Arquitectura del Proyecto**:
   - Se utilizó Next.js App Router para aprovechar las ventajas de Server Components
   - TailwindCSS para estilizar la aplicación de manera eficiente y responsive
   - TypeScript para mejorar la tipificación y proporcionar un desarrollo más robusto

2. **Capa de Servicios**:
   - Implementación de una capa de servicios centralizada para manejar todas las solicitudes HTTP
   - Gestión unificada de errores para mejorar la experiencia del usuario
   - Uso de interfaces para definir la estructura de los datos

3. **Componentes Reutilizables**:
   - Sistema de notificaciones para informar al usuario
   - Formulario reutilizable para crear y editar publicaciones
   - Diseño modular para facilitar el mantenimiento y escalabilidad

## Mejoras Propuestas

1. **Mejoras Técnicas**:
   - Implementar pruebas unitarias con Jest y Testing Library
   - Agregar validación de formularios más robusta con bibliotecas como Zod o Yup

2. **Características Adicionales**:
   - Agregar funcionalidad de eliminación de publicaciones (DELETE)
   - Implementar paginación para la lista de publicaciones
   - Añadir autenticación de usuarios
   - Implementar búsqueda y filtrado de publicaciones

3. **UI/UX**:
   - Añadir animaciones y transiciones para mejorar la experiencia de usuario
   - Implementar modo oscuro
   - Mejorar la accesibilidad de la aplicación
