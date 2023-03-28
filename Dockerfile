FROM node:18-alpine3.16 as build
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

# docker build . -t chef-ui