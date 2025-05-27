# ---------- Stage 1: Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Устанавливаем pnpm глобально
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. Копируем только файлы зависимостей (для лучшего кеширования)
COPY pnpm-lock.yaml package.json ./

# 3. Устанавливаем зависимости с кешированием
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --prod false

# 4. Копируем только необходимые для сборки файлы
COPY src ./src
COPY public ./public
COPY next.config.ts ./
COPY tsconfig.json ./
COPY *.env ./

# 5. Сборка проекта с кешированием
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm run build

# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 6. Устанавливаем pnpm в runtime-образ
RUN corepack enable

# 7. Копируем только production зависимости
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --prod

# 8. Копируем собранное приложение
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]                 # next start