FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_GEMINI_KEY
ENV VITE_GEMINI_KEY=$VITE_GEMINI_KEY
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
COPY server.js ./
EXPOSE 8080
CMD ["node", "server.js"]
