FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
# Since we are using npm workspaces, we copy the root package.json and the workspace package.json
# For simplicity in this starter, we'll just install the web-ui deps directly
COPY apps/web-ui/package.json apps/web-ui/
RUN npm ci --workspace=apps/web-ui

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web-ui/node_modules ./apps/web-ui/node_modules
COPY . .

# Next.js telemetry disable
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app/apps/web-ui
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web-ui/public ./apps/web-ui/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-ui/.next/standalone ./apps/web-ui/
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-ui/.next/static ./apps/web-ui/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/web-ui/server.js"]
