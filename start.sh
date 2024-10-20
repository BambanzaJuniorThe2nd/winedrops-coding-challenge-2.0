#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

# Function to check if a container exists
container_exists() {
  docker ps -a --format '{{.Names}}' | grep -q "^$1$"
}

# Function to check if a network exists
network_exists() {
  docker network ls --format '{{.Name}}' | grep -q "^$1$"
}

# Function to stop and remove a container if it exists
stop_and_remove_container() {
  if container_exists $1; then
    echo "Stopping and removing existing ${1}..."
    docker stop $1 2>/dev/null || true
    docker rm $1 2>/dev/null || true
  fi
}

# Variables
NETWORK_NAME=winedrops_network
BACKEND_IMAGE=wine_app_backend:latest
FRONTEND_IMAGE=wine_app_frontend:latest
BACKEND_CONTAINER=backend_container
FRONTEND_CONTAINER=frontend_container
BACKEND_PORT=5000
FRONTEND_PORT=80

# Stop and remove existing containers
stop_and_remove_container $BACKEND_CONTAINER
stop_and_remove_container $FRONTEND_CONTAINER

# Remove existing network and create a new one
if network_exists $NETWORK_NAME; then
  echo "Removing existing network: ${NETWORK_NAME}"
  docker network rm $NETWORK_NAME
fi

echo "Creating network: ${NETWORK_NAME}"
docker network create $NETWORK_NAME

# Build the latest images
echo "Building latest backend image..."
docker build --no-cache -t $BACKEND_IMAGE ./backend

echo "Building latest frontend image..."
docker build --no-cache -t $FRONTEND_IMAGE ./frontend

# Run the backend container
echo "Running backend container..."
docker run -d --network $NETWORK_NAME -p $BACKEND_PORT:$BACKEND_PORT \
  -e BASE_URL=0.0.0.0 \
  -e PORT=$BACKEND_PORT \
  -e DB_PATH=./dist/core/db/winedrops.db \
  --name $BACKEND_CONTAINER \
  $BACKEND_IMAGE

# Run the frontend container
echo "Running frontend container..."
docker run -d --network $NETWORK_NAME -p $FRONTEND_PORT:$FRONTEND_PORT \
  --name $FRONTEND_CONTAINER \
  $FRONTEND_IMAGE

# Show running containers
echo "Running containers:"
docker ps

echo "Setup complete. You can access the application at http://localhost"