#!/bin/bash
# test-all.sh

echo "Running all tests..."

# Unit tests
echo "Running unit tests..."
mvn test -Dtest="*Test"

# Integration tests
echo "Running integration tests..."
mvn test -Dtest="*IT"

# Generate test coverage report
echo "Generating test coverage report..."
mvn jacoco:report

echo "All tests completed!"