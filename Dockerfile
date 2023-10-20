FROM node:21-alpine
WORKDIR /app

# Install dependencies
COPY package.json .

RUN npm install

COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]