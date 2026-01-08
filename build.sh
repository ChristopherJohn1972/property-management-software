#!/bin/bash
# build.sh

echo "Building Property Management System..."

# Clean and compile
mvn clean compile

# Run tests
echo "Running tests..."
mvn test

# Package the application
echo "Packaging application..."
mvn package -DskipTests

echo "Build complete!"
echo "JAR file: target/property-management-system-1.0.0.jar"