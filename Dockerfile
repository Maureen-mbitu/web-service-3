# ===========================
# Stage 1: Builder
# ===========================
FROM node:20-alpine AS builder

RUN apk add --no-cache bash git python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ===========================
# Stage 2: Production Runner
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/components ./components
COPY --from=builder /app/assets ./assets

# Set correct permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port 8080 (matching the web service configuration)
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Start the application
CMD ["npm", "start"]


