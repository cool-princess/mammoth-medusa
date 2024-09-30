FROM public.ecr.aws/docker/library/node:20 as base

WORKDIR /app
COPY package.json .yarnrc.yml yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

FROM base as dev
ENV NODE_ENV=development
CMD [ "yarn", "dev" ]

FROM base as prod
ENV NODE_ENV=production
RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 9000 7001
