# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose port 5173 to the outside world
EXPOSE 5173

# Command to run the app when the container is run
CMD ["npm", "run", "dev"]
