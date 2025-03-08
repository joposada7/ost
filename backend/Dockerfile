FROM node:22.14.0

WORKDIR /backend

COPY . .
RUN npm ci

ENV PORT=8080
EXPOSE 8080

CMD ["node", "."]
