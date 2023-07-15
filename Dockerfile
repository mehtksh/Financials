# STAGE 1

FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 3002

# CMD [ "npm", "start" ]

RUN npm run build

# STAGE 2

FROM nginx:alpine AS server

RUN addgroup -S nonrootbeat \
    && adduser -S nonrootbeat -G nonrootbeat

USER nonrootbeat

RUN addgroup -S nonrootbeat \
    && adduser -S nonrootbeat -G nonrootbeat

USER nonrootbeat

WORKDIR /app

COPY --from=development /app/dist /usr/share/nginx/html

COPY --from=development ./app/nginx.conf /etc/nginx/conf.d/default.conf

ENV PORT=3002

EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]