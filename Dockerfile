###########################
# 1) DEPENDENCIES STAGE
###########################
FROM node:20-alpine AS deps
WORKDIR /app
# Install system dependencies (Alpine packages)
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    vips-dev \
    pkgconfig
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install --include=optional --no-audit --no-fund && \
    npm cache clean --force
###########################
# 2) BUILDER STAGE
###########################
FROM node:20-alpine AS builder
WORKDIR /app
# Accept build arguments
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_CLOUDFRONT_HOSTNAME
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_CLOUDFRONT_HOSTNAME=$NEXT_PUBLIC_CLOUDFRONT_HOSTNAME
# Install minimal build dependencies
RUN apk add --no-cache libc6-compat
# Environment variables for build
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Create cache directory with proper permissions
RUN mkdir -p .next/cache/images
# Build the application
# Note: ESLint errors won't fail build due to ignoreDuringBuilds: true when CI=true
RUN npm run build
###########################
# 3) RUNTIME STAGE
###########################
FROM node:20-alpine AS runner
WORKDIR /app
# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
# Install minimal runtime dependencies
RUN apk add --no-cache \
    vips \
    curl
# Create nextjs user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
# Create necessary directories
RUN mkdir .next && \
    chown nextjs:nodejs .next
# Copy built application from builder stage
COPY --from=builder /app/public ./public
# Copy standalone output (this is the key for optimization)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Create and set permissions for cache
RUN mkdir -p .next/cache/images && \
    chown -R nextjs:nodejs .next/cache
# Switch to non-root user
USER nextjs
# Expose port
EXPOSE 3000
# Start the application
CMD ["node", "server.js"]