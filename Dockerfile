# ---------- stage 1: build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# ставим зависимости
COPY package*.json ./
RUN npm ci --ignore-scripts         # быстрее и чище

# копируем остальной код и собираем
COPY . .
RUN npm run build                   # создаёт .next

# ---------- stage 2: runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# устанавливаем только prod-deps
COPY package*.json ./
RUN npm ci --ignore-scripts --omit=dev

# копируем собранный артефакт + статику
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
# если есть env-файлы, скопируй их тоже (или используй secrets)

EXPOSE 3000
CMD ["npm", "start"]                 # next start