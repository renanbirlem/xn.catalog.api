FROM node:10-alpine

WORKDIR /home/beon/xn.catalog.api

# Install deps for production only
COPY ./package* ./
RUN npm install && \
    npm cache clean --force

# Copy builded source from the upper builder stage
COPY  . .

EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
