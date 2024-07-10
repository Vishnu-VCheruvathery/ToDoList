FROM node:18-alpine as build

#Declare build time environment variables
ARG VITE_APP_NODE_ENV
ARG VITE_APP_SERVER_BASE_URL

#Set defualt values for environment variables
ENV VITE_APP_NODE_ENV=$VITE_APP_NODE_ENV
ENV VITE_APP_SERVER_BASE_URL=$VITE_APP_SERVER_BASE_URL

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for the final stage
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


