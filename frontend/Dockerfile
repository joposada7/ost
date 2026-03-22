FROM node:25.8.1-bullseye AS base
ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

# Build
FROM base AS build
WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .

# Development
FROM base AS development
WORKDIR /app

COPY --from=build /app .

EXPOSE ${PORT}
CMD ["npm", "run", "dev"]

# Production
FROM base AS production
WORKDIR /app

COPY --from=build /app .

RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start"]
