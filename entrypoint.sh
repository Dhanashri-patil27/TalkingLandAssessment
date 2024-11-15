#!/bin/bash
# Exit immediately if any command fails
set -e

echo "Starting the application..."
echo "Environment variables:"
env
# Optional: Run database migrations
if [ "$NODE_ENV" = "development" ]; then
  echo "Running database migrations..."
  npx sequelize-cli db:migrate
fi

# Start the Node.js application
exec node server.js
