# install dependencies
FROM node:19.6-alpine AS build

WORKDIR /app

# copy source code to build
COPY . .

# install dependencies
RUN npm install --frozen-lockfile

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
