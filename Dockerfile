# install dependencies
FROM node:18.12.1 AS build

WORKDIR /app

# copy package and lock file for install the dependencies
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# install only production dependencies
RUN npm install --frozen-lockfile

# copy source code to build
COPY . .

# build the project
RUN npm run build

# --------------------------------------------------------------------------

# deploy stage
FROM nginx:1.23-alpine AS deploy

# copy built application from build stage
COPY --from=build /app/dist /var/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80
