# First stage to build the backend
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files for the backend
COPY package.json yarn.lock ./

# Install the dependencies for the server using Yarn
RUN yarn install --frozen-lockfile

# Copy the source code for the backend
COPY . ./

# Build the project using Vite
RUN yarn build

# Copy the winedrops.db file to the dist folder
RUN cp src/core/db/winedrops.db dist/core/db/winedrops.db

# Debug: Check if the dist folder contains winedrops.db
RUN ls -la dist/core/db

# Second stage to run the app
FROM node:20-alpine

WORKDIR /app

# Copy built files from the first stage
COPY --from=builder /app/dist ./dist

# Copy necessary configuration files
COPY .env ./
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Start the Node.js application
CMD ["node", "dist/index.js"]
