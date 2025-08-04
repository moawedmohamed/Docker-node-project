# ----------- Stage 1: development -----------
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ----------- Stage 2: Production -----------
FROM node:22-alpine AS production

WORKDIR /app

# فقط ننسخ الملفات الجاهزة من مرحلة البناء
COPY --from=development /app/dist ./dist
COPY package*.json ./

# تثبيت فقط production dependencies
RUN npm install --omit=dev

EXPOSE 5000

CMD ["node", "dist/index.js"]
