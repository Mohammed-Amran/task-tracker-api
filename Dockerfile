# 1. Using the official Node.js lightweight image as our base Operating System:
FROM node:18-alpine

# 2. Setting our working directory inside the container:
WORKDIR /app

# 3. Copying only the package.json files first ( which this makes our future builds much faster):
COPY package*.json ./

# 4. Installing the exact dependencies that are needed for the production:
RUN npm install 

# 5. Copying the rest of our application code into the container:
COPY . .

# 6. Expose the port that our app runs on:
EXPOSE 3000

# 7. This is the command to run, when the container starts:
CMD ["node", "server.js"]