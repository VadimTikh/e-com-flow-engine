ARG NODE_VERSION=20-alpine

# Build deps (includes devDeps for build)
FROM node:${NODE_VERSION} AS build_deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM build_deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN rm -rf dist && npm run build

# Production
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

USER node

ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/server.js"]