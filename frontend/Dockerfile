FROM node:22.14.0
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN npm ci

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start"]
