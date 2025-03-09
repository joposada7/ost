FROM node:22.14.0 AS base
ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=3000
EXPOSE 3000

# Build
FROM base AS build
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

# Development
FROM base AS development
WORKDIR /app

COPY --from=build /app .

CMD ["npm", "run", "dev"]

# Production
FROM base AS production
WORKDIR /app

COPY --from=build /app .

RUN npm run build
CMD ["npm", "run", "start"]
