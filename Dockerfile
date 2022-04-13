FROM node:lts-slim

ENV PORT=4000
ENV TIME_AND_ATTENDANCE_BASE_URI="localhost"

WORKDIR /app

COPY ["package.json", "package-lock.json", "index.js", "./"]

RUN npm install --production

EXPOSE $PORT

CMD [ "node", "index.js" ]
