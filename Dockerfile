FROM node:20.9.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install \
    && npm install -g sequelize-cli

# Copy application code
COPY . .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Expose the application port
EXPOSE 3000

# Use entrypoint.sh to start the application
ENTRYPOINT ["./entrypoint.sh"]
