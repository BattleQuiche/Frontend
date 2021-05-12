FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN yarn global add http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

COPY . .
RUN cp dist/index.html  dist/404.html

EXPOSE 80
CMD [ "http-server", "dist", "-p", "80" ]
