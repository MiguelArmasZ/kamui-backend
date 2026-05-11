FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN DATABASE_URL=postgresql://dummy:dummy@localhost/dummy pnpm prisma generate
RUN pnpm build

EXPOSE 3001
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/index.mjs"]
