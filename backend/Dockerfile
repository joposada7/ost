FROM node:25.8.1-bullseye

ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080

WORKDIR /backend

COPY . .
RUN npm ci

EXPOSE ${PORT}
CMD ["node", "."]
