FROM node:lts-slim

# TODO: Port 8080 is hardwired in our ONTrackOperator,
# see https://git.asmgmt.hilti.com/infra/ontrack-operator/-/issues/3
ENV PORT=8080
ENV TIME_AND_ATTENDANCE_BASE_URI="env_missing-time_and_attendance_base_uri"

WORKDIR /app

COPY ["package.json", "package-lock.json", "index.js", "./"]

RUN apt-get update && \
    apt-get --no-install-recommends upgrade -y && \
    rm -rf /var/lib/apt/lists/* && \
    npm install --production

EXPOSE $PORT

CMD [ "node", "index.js" ]
