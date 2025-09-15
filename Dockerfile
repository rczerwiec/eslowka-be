FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Dodaj verbose logging
RUN echo "=== Checking files ===" && ls -la
RUN echo "=== Checking package.json scripts ===" && cat package.json | grep -A 5 -B 5 "scripts"
RUN echo "=== Running build with verbose output ===" 
RUN npm run build --verbose || (echo "Build failed with exit code $?" && exit 1)

EXPOSE 3000
CMD ["node", "dist/main"]