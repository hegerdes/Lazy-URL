FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node . /app
RUN npm install --only=production && chown -R node:node node_modules

# Run as non root
USER node

# Save DB file
VOLUME [ "/app/data" ]

ENTRYPOINT [ "node", "index.js" ]