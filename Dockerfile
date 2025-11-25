FROM node:24-bookworm-slim AS base

WORKDIR /app

RUN npm install -g pnpm && \
    apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

COPY package.json nest-cli.json tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# Install dependencies (lockfile will be generated if missing)
RUN pnpm install

# Generate Prisma client (doesn't need database connection, must happen before build)
RUN pnpm prisma generate

COPY src ./src

# Build the application
RUN pnpm build || (echo "❌ Build failed!" && exit 1)
RUN ls -la dist/ || (echo "❌ dist directory missing!" && exit 1)
RUN test -f dist/src/main.js || (echo "❌ dist/src/main.js missing!" && ls -la dist/ && exit 1)
RUN echo "✅ Build successful, dist/src/main.js exists"

FROM node:24-bookworm-slim AS runner
WORKDIR /app

RUN npm install -g pnpm && \
    apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN mkdir -p uploads/mechanics uploads/reviews

ENV NODE_ENV=production
ENV APP_PORT=3000

EXPOSE 3000

CMD ["node", "dist/src/main.js"]

