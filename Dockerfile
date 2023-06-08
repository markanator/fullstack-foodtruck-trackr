FROM node:18.16.0-alpine as base
# build environment
FROM base as clientBuilder
COPY ./client .
WORKDIR /app
RUN npm ci
RUN npm run build

# production environment
FROM base as production
WORKDIR /app
COPY --from=clientBuilder dist ./dist
COPY backend ./
RUN npm ci --omit=dev
ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80
CMD ["npm", "run", "start"]
