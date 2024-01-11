FROM node:16.3.0-alpine
WORKDIR /app/frontend
COPY  ./package*.json /app/frontend/
RUN npm install
COPY ./ /app/frontend/
RUN npm run build

FROM nginx:1.15.2-alpine
COPY --from=0 /app/frontend/dist/ /usr/share/nginx/html
COPY --from=0 /app/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5400
CMD ["nginx","-g","daemon off;"]