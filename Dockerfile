# Multi-stage Dockerfile for Next.js (Node 20 Alpine)

# 1) Base image
FROM node:20-alpine AS base
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
# Helpful on Alpine for some native deps
RUN apk add --no-cache libc6-compat

# 2) Dependencies layer
FROM base AS deps
WORKDIR /app

# Install dependencies only (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# 3) Builder layer
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# 4) Runner layer
FROM base AS runner
WORKDIR /app

# Set a non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy production node_modules and build output
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Minimal runtime files
COPY package.json ./package.json
COPY next.config.mjs ./next.config.mjs
COPY tailwind.config.ts ./tailwind.config.ts
COPY postcss.config.mjs ./postcss.config.mjs
COPY tsconfig.json ./tsconfig.json
COPY vercel.json ./vercel.json

# Default port for `next start`
ENV PORT=3000
EXPOSE 3000

USER nextjs

CMD ["npm", "run", "start"]
