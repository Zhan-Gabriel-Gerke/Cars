# ===========================================
# Stage 1: Install Dependencies
# ===========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Add a dummy DATABASE_URL so `prisma generate` passes the get-config wasm validation
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm ci
RUN npx prisma generate

# ===========================================
# Stage 2: Build the Application
# ===========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Provide dummy DATABASE_URL again so Next.js build doesn't fail if it imports Prisma
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm run build

# ===========================================
# Stage 3: Production Runner
# ===========================================
FROM node:20-alpine AS runner
# Prisma requires openssl and libc6-compat for its query engine
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets and give nextjs user ownership of the uploads directory
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma schema + generated client for runtime
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# For Render deployment: run prisma db push to apply schema, then start the server
# --accept-data-loss ensures it doesn't block waiting for interactive input on schema changes
CMD npx prisma db push --accept-data-loss && node server.js
