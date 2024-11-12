FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install @rollup/plugin-typescript --save-dev

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

CMD rm /etc/nginx/sites-available/default

COPY default /etc/nginx/sites-available/default

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
