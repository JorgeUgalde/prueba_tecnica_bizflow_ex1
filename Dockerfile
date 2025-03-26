FROM node:18-alpine AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
# Comprobar https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine para entender por qué se necesitan libc6-compat
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependencias basadas en el gestor de paquetes preferido
COPY package.json package-lock.json* ./
RUN npm ci

# Reconstruir el código fuente solo cuando sea necesario
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js recolecta datos de telemetría completamente anónimos sobre uso general.
# Aprende más aquí: https://nextjs.org/telemetry
# Descoméntalo siguiendo en caso de querer deshabilitar la telemetría durante la compilación.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Imagen de producción, copiar todos los archivos y ejecutar next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Descoméntalo siguiendo en caso de querer deshabilitar la telemetría durante el tiempo de ejecución.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Configurar automáticamente los permisos correctos en la carpeta .next/standalone/.next/static
RUN mkdir -p .next/standalone/.next/static && chown -R nextjs:nodejs .next

# Necesitas copiar .next/standalone y .next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# establecer hostname a localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 