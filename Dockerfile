FROM node:20.9.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install \
    && npm install -g dotenv sequelize sequelize-cli

# Check that dotenv is installed
RUN ls -l /app/node_modules | grep dotenv

# Copy application code
COPY . .

# Ensure .env file is copied
COPY .env .env

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose the application port
EXPOSE 3000

# Use entrypoint.sh to start the application
ENTRYPOINT ["./entrypoint.sh"]
