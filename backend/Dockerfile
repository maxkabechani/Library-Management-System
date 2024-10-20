# Stage 1: Build stage
FROM node:23-alpine3.19

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .


# Expose the port your app will run on
EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

CMD ["npm", "run", "dev"]