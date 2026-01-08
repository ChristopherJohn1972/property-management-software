#!/bin/bash
# run.sh

echo "Starting Property Management System..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Starting PostgreSQL with Docker Compose..."
    docker-compose up -d postgres
    sleep 10
fi

# Run the application
java -jar target/property-management-system-1.0.0.jar