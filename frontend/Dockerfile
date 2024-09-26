# First stage: build the frontend application
FROM node AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install vite@5.4.1

RUN npm install

COPY . .

RUN npm run build

# Second stage: serve the application with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html