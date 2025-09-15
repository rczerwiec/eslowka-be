FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Sprawdź co jest skopiowane
RUN echo "=== Files in container ===" && ls -la

# Sprawdź czy są pliki konfiguracyjne
RUN echo "=== Config files ===" 
RUN test -f tsconfig.json && echo "tsconfig.json OK" || echo "tsconfig.json MISSING!"
RUN test -f nest-cli.json && echo "nest-cli.json OK" || echo "nest-cli.json MISSING!"

# Sprawdź scripts w package.json
RUN echo "=== Package.json scripts ===" && cat package.json | grep -A 10 '"scripts"'

# Spróbuj build z większą ilością informacji
RUN echo "=== Running build ===" && npm run build 2>&1 || echo "BUILD FAILED"

EXPOSE 3000
CMD ["node", "dist/main"]