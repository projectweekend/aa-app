FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./aa-app/ /var/www
