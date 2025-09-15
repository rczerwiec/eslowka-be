# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Kopiuj package.json i package-lock.json
COPY package*.json ./

# Instaluj zależności
RUN npm ci --only=production

# Kopiuj kod źródłowy
COPY . .

# Zbuduj aplikację
RUN npm run build

# Otwórz port
EXPOSE 3000

# Uruchom aplikację
CMD ["node", "dist/main"]